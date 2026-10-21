import {
  DirectionalLight, ExtrudeGeometry, Group, HemisphereLight, Mesh,
  MeshStandardMaterial, NoToneMapping, PerspectiveCamera, Scene,
  Shape, SRGBColorSpace, WebGLRenderer,
} from 'three';

export type CardReliefEngine = {
  resize(width: number, height: number): void;
  setPointer(x: number, y: number): void;
  setActive(active: boolean): void;
  dispose(): void;
};

const padding = 48;
const perspective = 1100;
const radians = Math.PI / 180;
const clamp = (value: number) => Math.max(-1, Math.min(1, value));

function supportGeometry(width: number, height: number) {
  const halfWidth = (width + 10) / 2;
  const halfHeight = (height + 10) / 2;
  const radius = 3;
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
    depth: 22, steps: 1, bevelEnabled: true,
    bevelThickness: 1, bevelSize: 1, bevelSegments: 2, curveSegments: 4,
  });
  // Near face at z=0, behind the native HTML document; all depth is negative.
  geometry.translate(0, 0, -23);
  return geometry;
}

export function createCardRelief(
  mount: HTMLElement,
  front: HTMLElement,
  host: HTMLElement,
  onFailure: () => void,
): CardReliefEngine {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  const context = canvas.getContext('webgl2', {
    alpha: true, antialias: true, depth: true,
    premultipliedAlpha: true, powerPreference: 'low-power',
  });
  if (!context) throw new Error('WebGL2 is unavailable');

  const renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: true });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = NoToneMapping;
  renderer.setClearColor(0x000000, 0);
  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, .1, 2300);
  camera.position.z = perspective;
  const body = new Group();
  const faceMaterial = new MeshStandardMaterial({ color: '#3564e6', roughness: .72, metalness: .06 });
  const edgeMaterial = new MeshStandardMaterial({ color: '#193bb9', roughness: .52, metalness: .09 });
  let width = front.offsetWidth;
  let height = front.offsetHeight;
  let geometry = supportGeometry(width, height);
  const slab = new Mesh(geometry, [faceMaterial, edgeMaterial]);
  body.add(slab);
  scene.add(body);
  scene.add(new HemisphereLight('#ffffff', '#6a82bd', 1.05));
  const key = new DirectionalLight('#ffffff', 1.1);
  key.position.set(-240, 320, 700);
  scene.add(key);
  mount.appendChild(canvas);

  let disposed = false;
  let active = true;
  let frame: number | null = null;
  let lastTime = 0;
  const current = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };

  function applyPose() {
    const rotateX = 3 + current.y * 3;
    const rotateY = -6 - current.x * 4;
    const translateX = current.x * 4;
    const translateY = current.y * 4;
    // CSS uses downward Y; Three uses upward Y. Both matrices compose XYZ.
    front.style.transform = `translate3d(${translateX.toFixed(3)}px,${translateY.toFixed(3)}px,0) rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg) rotateZ(-2deg)`;
    body.position.set(translateX, -translateY, 0);
    body.rotation.set(-rotateX * radians, rotateY * radians, 2 * radians, 'XYZ');
    key.position.set(-240 + current.x * 130, 320 - current.y * 100, 700);
  }

  function cancelFrame() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelFrame();
    canvas.removeEventListener('webglcontextlost', contextLost);
    geometry.dispose();
    faceMaterial.dispose();
    edgeMaterial.dispose();
    renderer.dispose();
    if (!context!.isContextLost()) renderer.forceContextLoss();
    canvas.remove();
    front.style.transform = '';
    host.dataset.relief = 'static';
    host.dataset.motion = 'idle';
  }

  function contextLost(event: Event) {
    event.preventDefault();
    dispose();
    onFailure();
  }

  function render() {
    applyPose();
    renderer.render(scene, camera);
  }

  function tick(now: number) {
    frame = null;
    if (disposed || !active || document.hidden) {
      host.dataset.motion = 'paused';
      return;
    }
    const delta = Math.min((now - lastTime) / 1000, .06);
    lastTime = now;
    const amount = 1 - Math.exp(-delta * 12);
    current.x += (target.x - current.x) * amount;
    current.y += (target.y - current.y) * amount;
    const settled = Math.abs(target.x - current.x) < .001 && Math.abs(target.y - current.y) < .001;
    if (settled) { current.x = target.x; current.y = target.y; }
    try { render(); }
    catch { dispose(); onFailure(); return; }
    if (settled) host.dataset.motion = 'idle';
    else frame = requestAnimationFrame(tick);
  }

  function requestFrame() {
    if (disposed || !active || document.hidden || frame !== null) return;
    host.dataset.motion = 'moving';
    lastTime = performance.now();
    frame = requestAnimationFrame(tick);
  }

  function resize(nextWidth: number, nextHeight: number) {
    if (disposed || nextWidth <= 0 || nextHeight <= 0) return;
    if (nextWidth !== width || nextHeight !== height) {
      width = nextWidth;
      height = nextHeight;
      geometry.dispose();
      geometry = supportGeometry(width, height);
      slab.geometry = geometry;
    }
    const canvasWidth = width + padding * 2;
    const canvasHeight = height + padding * 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(canvasWidth, canvasHeight, false);
    camera.aspect = canvasWidth / canvasHeight;
    camera.fov = 2 * Math.atan(canvasHeight / (2 * perspective)) / radians;
    camera.updateProjectionMatrix();
    if (active && !document.hidden) render();
  }

  canvas.addEventListener('webglcontextlost', contextLost);
  try {
    resize(width, height);
    host.dataset.relief = 'webgl';
    host.dataset.motion = 'idle';
  } catch (error) {
    dispose();
    throw error;
  }

  return {
    resize,
    setPointer(x, y) {
      if (disposed) return;
      target.x = clamp(x);
      target.y = clamp(y);
      requestFrame();
    },
    setActive(nextActive) {
      if (disposed || active === nextActive) return;
      active = nextActive;
      if (active) requestFrame();
      else { cancelFrame(); host.dataset.motion = 'paused'; }
    },
    dispose,
  };
}
