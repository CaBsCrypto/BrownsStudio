import {
  CylinderGeometry, DirectionalLight, ExtrudeGeometry, Group, HemisphereLight,
  Mesh, MeshStandardMaterial, NoToneMapping, PerspectiveCamera, Scene, Shape,
  SphereGeometry, SRGBColorSpace, Vector3, WebGLRenderer,
} from 'three';

export type ProcessReliefEngine = {
  resize(): void;
  highlight(index: number): void;
  play(onFinish: () => void): void;
  stop(): void;
  setActive(active: boolean): void;
  dispose(): void;
};

type CardBounds = { x: number; y: number; width: number; height: number };
type Route = { points: Vector3[]; lengths: number[]; length: number };

const padding = 28;
const perspective = 1600;
const radians = Math.PI / 180;
const stepDuration = .68;
const up = new Vector3(0, 1, 0);

function supportGeometry(width: number, height: number) {
  const halfWidth = (width + 4) / 2;
  const halfHeight = (height + 4) / 2;
  const radius = Math.min(8, halfWidth, halfHeight);
  const shape = new Shape();
  shape.moveTo(-halfWidth + radius, -halfHeight);
  shape.lineTo(halfWidth - radius, -halfHeight);
  shape.quadraticCurveTo(halfWidth, -halfHeight, halfWidth, -halfHeight + radius);
  shape.lineTo(halfWidth, halfHeight - radius);
  shape.quadraticCurveTo(halfWidth, halfHeight, halfWidth - radius, halfHeight);
  shape.lineTo(-halfWidth + radius, halfHeight);
  shape.quadraticCurveTo(-halfWidth, halfHeight, -halfWidth, halfHeight - radius);
  shape.lineTo(-halfWidth, -halfHeight + radius);
  shape.quadraticCurveTo(-halfWidth, -halfHeight, -halfWidth + radius, -halfHeight);
  const geometry = new ExtrudeGeometry(shape, {
    depth: 16, steps: 1, bevelEnabled: true,
    bevelThickness: 1, bevelSize: 1, bevelSegments: 2, curveSegments: 4,
  });
  // The near face stays behind the opaque HTML card.
  geometry.translate(0, 0, -18);
  return geometry;
}

function boundsWithin(card: HTMLElement, host: HTMLElement): CardBounds {
  let x = 0;
  let y = 0;
  let element: HTMLElement | null = card;
  while (element && element !== host) {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent as HTMLElement | null;
  }
  return { x, y, width: card.offsetWidth, height: card.offsetHeight };
}

export function createProcessRelief(
  mount: HTMLElement,
  host: HTMLElement,
  cards: HTMLElement[],
  onFailure: () => void,
): ProcessReliefEngine {
  host.dataset.processRelief = 'static';
  host.dataset.processMotion = 'idle';
  host.dataset.activeStep = '';
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  const context = canvas.getContext('webgl2', {
    alpha: true, antialias: true, depth: true,
    premultipliedAlpha: true, powerPreference: 'low-power',
  });
  if (!context) {
    onFailure();
    return {
      resize() {}, highlight() {}, play(onFinish) { onFinish(); },
      stop() {}, setActive() {}, dispose() {},
    };
  }

  const renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: true });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = NoToneMapping;
  renderer.setClearColor(0x000000, 0);
  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, .1, 2500);
  camera.position.z = perspective;
  const faceMaterial = new MeshStandardMaterial({ color: '#789bfa', roughness: .85, metalness: 0 });
  const edgeMaterial = new MeshStandardMaterial({ color: '#365ed4', roughness: .76, metalness: .015 });
  const connectorMaterial = new MeshStandardMaterial({ color: '#7192e3', roughness: .88, metalness: 0 });
  const signalMaterial = new MeshStandardMaterial({
    color: '#dce9ff', emissive: '#7497fa', emissiveIntensity: .32,
    roughness: .66, metalness: 0,
  });
  const connectorGeometry = new CylinderGeometry(1, 1, 1, 8, 1);
  const signalGeometry = new SphereGeometry(3.4, 12, 8);
  const signal = new Mesh(signalGeometry, signalMaterial);
  signal.visible = false;
  scene.add(signal);
  const connections = new Group();
  scene.add(connections);
  const supports = cards.map(() => {
    const body = new Group();
    scene.add(body);
    return body;
  });
  const slabs: Array<Mesh<ExtrudeGeometry, MeshStandardMaterial[]>> = [];
  const geometryCache = new Map<string, ExtrudeGeometry>();
  const currentLifts = cards.map(() => 0);
  const targetLifts = cards.map(() => 0);
  let bounds: CardBounds[] = [];
  let routes: Route[] = [];
  let width = 0;
  let height = 0;
  scene.add(new HemisphereLight('#ffffff', '#b3c1dc', 1.4));
  const key = new DirectionalLight('#ffffff', 1.3);
  key.position.set(-360, 420, 900);
  scene.add(key);
  const fill = new DirectionalLight('#c9d9ff', .35);
  fill.position.set(500, -240, 500);
  scene.add(fill);
  mount.appendChild(canvas);

  let disposed = false;
  let active = true;
  let frame: number | null = null;
  let lastTime = 0;
  let selected = -1;
  let playing = false;
  let elapsed = 0;
  let onComplete: (() => void) | null = null;
  const direction = new Vector3();

  function cancelFrame() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelFrame();
    onComplete = null;
    canvas.removeEventListener('webglcontextlost', contextLost);
    document.removeEventListener('visibilitychange', visibilityChanged);
    for (const geometry of geometryCache.values()) geometry.dispose();
    geometryCache.clear();
    connectorGeometry.dispose();
    signalGeometry.dispose();
    faceMaterial.dispose();
    edgeMaterial.dispose();
    connectorMaterial.dispose();
    signalMaterial.dispose();
    renderer.dispose();
    if (!context!.isContextLost()) renderer.forceContextLoss();
    canvas.remove();
    for (const card of cards) card.style.transform = '';
    host.dataset.processRelief = 'static';
    host.dataset.processMotion = 'idle';
    host.dataset.activeStep = '';
  }

  function fail() {
    dispose();
    onFailure();
  }

  function contextLost(event: Event) {
    event.preventDefault();
    fail();
  }

  function choose(index: number) {
    selected = index;
    host.dataset.activeStep = index >= 0 ? String(index + 1) : '';
    for (let i = 0; i < targetLifts.length; i++) targetLifts[i] = i === index ? 4 : 0;
  }

  function pointOnRoute(route: Route, progress: number) {
    let distance = Math.max(0, Math.min(1, progress)) * route.length;
    for (let i = 0; i < route.lengths.length; i++) {
      if (distance <= route.lengths[i] || i === route.lengths.length - 1) {
        signal.position.lerpVectors(route.points[i], route.points[i + 1], distance / (route.lengths[i] || 1));
        return;
      }
      distance -= route.lengths[i];
    }
  }

  function applyPose() {
    for (let i = 0; i < supports.length; i++) {
      const card = bounds[i];
      if (!card) continue;
      const lift = currentLifts[i];
      // HTML only translates vertically; its readable face never rotates.
      cards[i].style.transform = lift > .001 ? `translateY(${(-lift).toFixed(3)}px)` : '';
      supports[i].position.set(card.x + card.width / 2 - width / 2 + 3, height / 2 - card.y - card.height / 2 - 4 + lift, 0);
      supports[i].rotation.set(.018 + lift * .003, -.018, 0);
    }
    signal.visible = selected >= 0 && !!bounds[selected];
    if (!signal.visible) return;
    const card = bounds[selected];
    signal.position.set(card.x + card.width - width / 2 + 9, height / 2 - card.y - 14 + currentLifts[selected], -3);
    if (playing && selected < routes.length) {
      const part = (elapsed % stepDuration) / stepDuration;
      // Hold briefly at the card, then carry the small signal to the next step.
      if (part > .58) pointOnRoute(routes[selected], (part - .58) / .42);
    }
  }

  function render() {
    applyPose();
    renderer.render(scene, camera);
    host.dataset.processRelief = 'webgl';
  }

  function tick(now: number) {
    frame = null;
    if (disposed) return;
    if (!active || document.hidden) {
      host.dataset.processMotion = 'paused';
      return;
    }
    const elapsedDelta = Math.max((now - lastTime) / 1000, 0);
    const delta = Math.min(elapsedDelta, .06);
    lastTime = now;
    let finished: (() => void) | null = null;
    if (playing) {
      elapsed += elapsedDelta;
      if (elapsed >= cards.length * stepDuration) {
        playing = false;
        choose(-1);
        finished = onComplete;
        onComplete = null;
      } else {
        const nextStep = Math.floor(elapsed / stepDuration);
        if (selected !== nextStep) choose(nextStep);
      }
    }
    const amount = 1 - Math.exp(-delta * 15);
    let settled = true;
    for (let i = 0; i < currentLifts.length; i++) {
      currentLifts[i] += (targetLifts[i] - currentLifts[i]) * amount;
      if (Math.abs(targetLifts[i] - currentLifts[i]) < .006) currentLifts[i] = targetLifts[i];
      else settled = false;
    }
    try { render(); }
    catch { fail(); return; }
    if (playing || !settled) frame = requestAnimationFrame(tick);
    else host.dataset.processMotion = 'idle';
    finished?.();
  }

  function requestFrame() {
    if (disposed || frame !== null) return;
    if (!active || document.hidden) {
      host.dataset.processMotion = 'paused';
      return;
    }
    host.dataset.processMotion = 'moving';
    lastTime = performance.now();
    frame = requestAnimationFrame(tick);
  }

  function visibilityChanged() {
    if (disposed) return;
    if (document.hidden) {
      cancelFrame();
      host.dataset.processMotion = 'paused';
    } else if (active) requestFrame();
  }

  function createConnections() {
    connections.clear();
    routes = [];
    const centers = bounds.map(card => new Vector3(card.x + card.width / 2 - width / 2, height / 2 - card.y - card.height / 2, -10));
    for (let i = 0; i < centers.length - 1; i++) {
      const a = bounds[i];
      const b = bounds[i + 1];
      let points: Vector3[];
      if (Math.abs(a.y - b.y) < 8 || Math.abs(a.x - b.x) < 8) {
        points = [centers[i].clone(), centers[i + 1].clone()];
      } else {
        // The wrap from card 3 to 4 travels through the gap between rows.
        const gapY = height / 2 - (a.y + a.height + b.y) / 2;
        points = [
          centers[i].clone(), new Vector3(centers[i].x, gapY, -10),
          new Vector3(centers[i + 1].x, gapY, -10), centers[i + 1].clone(),
        ];
      }
      const lengths: number[] = [];
      for (let j = 0; j < points.length - 1; j++) {
        direction.subVectors(points[j + 1], points[j]);
        const length = direction.length();
        lengths.push(length);
        if (length < .1) continue;
        const connector = new Mesh(connectorGeometry, connectorMaterial);
        connector.position.copy(points[j]).add(points[j + 1]).multiplyScalar(.5);
        connector.quaternion.setFromUnitVectors(up, direction.normalize());
        connector.scale.set(1.15, length, 1.15);
        connections.add(connector);
      }
      routes.push({ points, lengths, length: lengths.reduce((total, length) => total + length, 0) });
    }
  }

  function resize() {
    if (disposed || host.offsetWidth <= 0 || host.offsetHeight <= 0) return;
    width = host.offsetWidth;
    height = host.offsetHeight;
    bounds = cards.map(card => boundsWithin(card, host));
    const needed = new Set<string>();
    for (let i = 0; i < supports.length; i++) {
      const card = bounds[i];
      const cacheKey = `${card.width}:${card.height}`;
      needed.add(cacheKey);
      let geometry = geometryCache.get(cacheKey);
      if (!geometry) {
        geometry = supportGeometry(card.width, card.height);
        geometryCache.set(cacheKey, geometry);
      }
      if (slabs[i]) slabs[i].geometry = geometry;
      else {
        const slab = new Mesh(geometry, [faceMaterial, edgeMaterial]);
        slabs[i] = slab;
        supports[i].add(slab);
      }
    }
    for (const [cacheKey, geometry] of geometryCache) {
      if (!needed.has(cacheKey)) {
        geometry.dispose();
        geometryCache.delete(cacheKey);
      }
    }
    createConnections();
    const canvasWidth = width + padding * 2;
    const canvasHeight = height + padding * 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(canvasWidth, canvasHeight, false);
    camera.aspect = canvasWidth / canvasHeight;
    camera.fov = 2 * Math.atan(canvasHeight / (2 * perspective)) / radians;
    camera.updateProjectionMatrix();
    if (active && !document.hidden) {
      try {
        render();
      } catch { fail(); }
    }
  }

  function stop() {
    if (disposed) return;
    playing = false;
    onComplete = null;
    elapsed = 0;
    choose(-1);
    requestFrame();
  }

  canvas.addEventListener('webglcontextlost', contextLost);
  document.addEventListener('visibilitychange', visibilityChanged);
  try { resize(); }
  catch { fail(); }
  return {
    resize,
    highlight(index) {
      if (disposed) return;
      playing = false;
      onComplete = null;
      elapsed = 0;
      choose(Number.isInteger(index) && index >= 0 && index < cards.length ? index : -1);
      requestFrame();
    },
    play(onFinish) {
      if (disposed) { onFinish(); return; }
      if (!cards.length) { onFinish(); return; }
      playing = true;
      elapsed = 0;
      onComplete = onFinish;
      choose(0);
      requestFrame();
    },
    stop,
    setActive(nextActive) {
      if (disposed || active === nextActive) return;
      active = nextActive;
      if (active) requestFrame();
      else {
        cancelFrame();
        host.dataset.processMotion = 'paused';
      }
    },
    dispose,
  };
}
