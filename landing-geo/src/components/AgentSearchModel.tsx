'use client';

import { useEffect, useRef } from 'react';
import type * as Three from 'three';

export type SearchPhase = 'question' | 'agent' | 'search' | 'company' | 'return' | 'delivery' | 'answer';
export type SearchAnchors = Record<'person' | 'agent' | 'competitor' | 'company', { x: number; y: number }>;

type AgentSearchModelProps = {
  className?: string;
  playing: boolean;
  reduced: boolean;
  onPhase: (phase: SearchPhase) => void;
  onAnchors: (anchors: SearchAnchors) => void;
  onReady: (ready: boolean) => void;
};

type Playback = { playing: boolean; reduced: boolean };
type ModelController = { sync: () => void; dispose: () => void };

const CYCLE_SECONDS = 24;

/** Decorative enhancement: the parent owns all readable content and controls. */
export default function AgentSearchModel({ className, playing, reduced, onPhase, onAnchors, onReady }: AgentSearchModelProps) {
  const host = useRef<HTMLDivElement>(null);
  const playback = useRef<Playback>({ playing, reduced });
  const callbacks = useRef({ onPhase, onAnchors, onReady });
  const initialize = useRef<(() => void) | null>(null);
  const controller = useRef<ModelController | null>(null);

  useEffect(() => {
    callbacks.current = { onPhase, onAnchors, onReady };
  }, [onPhase, onAnchors, onReady]);

  useEffect(() => {
    const mountedElement = host.current;
    if (!mountedElement) return;
    const element: HTMLDivElement = mountedElement;
    let disposed = false;
    let requested = false;
    let localController: ModelController | null = null;

    const load = async () => {
      if (requested || disposed) return;
      requested = true;
      element.dataset.modelStatus = 'loading';
      try {
        const [T, { RoundedBoxGeometry }] = await Promise.all([
          import('three'),
          import('three/addons/geometries/RoundedBoxGeometry.js'),
        ]);
        if (disposed) return;

        const geometries = new Set<Three.BufferGeometry>();
        const materials = new Set<Three.Material>();
        const textures = new Set<Three.Texture>();
        let renderer: Three.WebGLRenderer | null = null;
        let observer: ResizeObserver | null = null;
        let lost = false;
        let running = false;
        let ready = false;
        let width = 0;
        let height = 0;
        let elapsed = 0;
        let lastTime = 0;
        let lastPhase: SearchPhase | null = null;

        const setReady = (value: boolean) => {
          if (disposed || ready === value) return;
          ready = value;
          element.dataset.ready = String(value);
          callbacks.current.onReady(value);
        };
        const geometry = <G extends Three.BufferGeometry>(value: G): G => {
          geometries.add(value);
          return value;
        };
        const material = <M extends Three.Material>(value: M): M => {
          materials.add(value);
          return value;
        };
        const stop = () => {
          renderer?.setAnimationLoop(null);
          running = false;
          lastTime = 0;
        };
        const cleanup = () => {
          stop();
          observer?.disconnect();
          renderer?.domElement.removeEventListener('webglcontextlost', contextLost);
          renderer?.domElement.removeEventListener('webglcontextrestored', contextRestored);
          geometries.forEach((value) => value.dispose());
          materials.forEach((value) => value.dispose());
          textures.forEach((value) => value.dispose());
          if (renderer) {
            renderer.dispose();
            renderer.forceContextLoss();
            renderer.domElement.remove();
          }
        };

        // Align local ground axes with the fixed camera so labels can use its projection.
        const right = new T.Vector3(10, 0, -6).normalize();
        const depth = new T.Vector3(-6, 0, -10).normalize();
        const facing = new T.Vector3(6, 7, 10).normalize();
        const at = (r: number, d: number, y = 0) => new T.Vector3(
          right.x * r + depth.x * d,
          y,
          right.z * r + depth.z * d,
        );
        const stationPositions = { person: at(-2.65, -.75), agent: at(-.85, .45), competitor: at(.66, .98), company: at(2.25, -.8) };
        const labelPositions = { person: at(-2.65, -.75, 2.05), agent: at(-.85, -.65, .08), competitor: at(1.35, 1.5, 1.95), company: at(2.25, -1.48, .02) };
        const scene = new T.Scene();
        const camera = new T.OrthographicCamera(-3.9, 3.9, 3, -3, .1, 40);
        camera.position.set(6, 7.3, 10);
        camera.lookAt(0, .3, 0);
        camera.updateMatrixWorld();
        scene.add(new T.HemisphereLight(0xf6f9ff, 0xc9d7ec, 1.65));
        const key = new T.DirectionalLight(0xffffff, 2);
        key.position.set(-3, 7, 5);
        scene.add(key);

        const white = material(new T.MeshStandardMaterial({ color: 0xffffff, roughness: .7 }));
        const pale = material(new T.MeshStandardMaterial({ color: 0xe7effb, roughness: .78 }));
        const gray = material(new T.MeshStandardMaterial({ color: 0xc2cddd, roughness: .8 }));
        const grayDetail = material(new T.MeshStandardMaterial({ color: 0x9babbe, roughness: .8 }));
        const blue = material(new T.MeshStandardMaterial({ color: 0x2f5ce5, roughness: .35, metalness: .12, emissive: 0x183897, emissiveIntensity: .1 }));
        const prepared = material(new T.MeshStandardMaterial({ color: 0x2f5ce5, roughness: .46, metalness: .08, emissive: 0x2f5ce5, emissiveIntensity: .08 }));
        const lightBlue = material(new T.MeshStandardMaterial({ color: 0x9dc3ff, roughness: .5 }));
        const railMaterial = material(new T.MeshStandardMaterial({ color: 0xb5cbeb, roughness: .68 }));
        const signalMaterial = material(new T.MeshBasicMaterial({ color: 0x2f5ce5 }));
        const personMaterial = material(new T.MeshStandardMaterial({ color: 0x5a8ee8, roughness: .72, emissive: 0x83b8ff, emissiveIntensity: .04 }));

        const box = (parent: Three.Object3D, size: [number, number, number], position: [number, number, number], surface: Three.Material, radius = .07) => {
          const mesh = new T.Mesh(geometry(new RoundedBoxGeometry(...size, 2, radius)), surface);
          mesh.position.set(...position);
          parent.add(mesh);
          return mesh;
        };
        const makeStation = (position: Three.Vector3, w: number, d: number) => {
          const group = new T.Group();
          group.position.copy(position);
          group.rotation.y = Math.atan2(-right.z, right.x) + .38;
          scene.add(group);
          box(group, [w, .12, d], [0, .08, 0], lightBlue, .05);
          box(group, [w, .16, d], [0, .2, 0], white, .06);
          return group;
        };

        // One shared, small radial texture supplies soft contact shadows without shadow maps.
        const shadowCanvas = document.createElement('canvas');
        shadowCanvas.width = shadowCanvas.height = 64;
        const shadowContext = shadowCanvas.getContext('2d');
        let shadowMap: Three.CanvasTexture | undefined;
        if (shadowContext) {
          const gradient = shadowContext.createRadialGradient(32, 32, 2, 32, 32, 32);
          gradient.addColorStop(0, 'rgba(48,77,115,.18)');
          gradient.addColorStop(.55, 'rgba(48,77,115,.07)');
          gradient.addColorStop(1, 'rgba(48,77,115,0)');
          shadowContext.fillStyle = gradient;
          shadowContext.fillRect(0, 0, 64, 64);
          shadowMap = new T.CanvasTexture(shadowCanvas);
          textures.add(shadowMap);
        }
        const shadowMaterial = material(new T.MeshBasicMaterial({ map: shadowMap, color: shadowMap ? 0xffffff : 0x9babbe, transparent: true, opacity: shadowMap ? 1 : .08, depthWrite: false }));
        const shadowGeometry = geometry(new T.PlaneGeometry(2.1, 1.7));
        for (const position of Object.values(stationPositions)) {
          const shadow = new T.Mesh(shadowGeometry, shadowMaterial);
          shadow.rotation.x = -Math.PI / 2;
          shadow.position.copy(position).y = .012;
          scene.add(shadow);
        }
        const floor = new T.Group();
        floor.position.copy(at(-.05, .1, -.1));
        floor.rotation.y = Math.atan2(-right.z, right.x) + .22;
        scene.add(floor);
        const floorMaterial = material(new T.MeshStandardMaterial({ color: 0xedf3ff, emissive: 0xc4dcff, emissiveIntensity: .22, roughness: .8 }));
        box(floor, [6.4, .16, 3.7], [0, 0, 0], floorMaterial, .14);

        const personStation = makeStation(stationPositions.person, .9, .86);
        const person = new T.Group();
        person.scale.setScalar(1.4);
        person.position.y = -.112;
        personStation.add(person);
        const torso = new T.Mesh(geometry(new T.CapsuleGeometry(.14, .18, 4, 10)), personMaterial);
        torso.position.set(0, .68, 0);
        person.add(torso);
        const head = new T.Mesh(geometry(new T.SphereGeometry(.16, 16, 12)), white);
        const expression = new T.Group();
        expression.position.set(0, 1, 0);
        expression.add(head);
        person.add(expression);
        const trousers = material(new T.MeshStandardMaterial({ color: 0x58759f, roughness: .8 }));
        const legGeometry = geometry(new T.CylinderGeometry(.058, .068, .23, 8));
        for (const x of [-.09, .09]) {
          const leg = new T.Mesh(legGeometry, trousers);
          leg.position.set(x, .395, 0);
          person.add(leg);
          box(person, [.14, .08, .19], [x, .32, .04], trousers, .025);
        }
        const limbGeometry = geometry(new T.CylinderGeometry(.045, .045, 1, 8));
        const localUp = new T.Vector3(0, 1, 0);
        const limb = (from: Three.Vector3, to: Three.Vector3) => {
          const segment = new T.Mesh(limbGeometry, white);
          const direction = to.clone().sub(from);
          segment.position.copy(from).lerp(to, .5);
          segment.scale.y = direction.length();
          segment.quaternion.setFromUnitVectors(localUp, direction.normalize());
          person.add(segment);
        };
        const raisedHand = new T.Vector3(.39, .85, .14);
        const raisedElbow = new T.Vector3(.28, .73, .08);
        limb(new T.Vector3(.16, .83, .02), raisedElbow);
        limb(raisedElbow, raisedHand);
        const loweredHand = new T.Vector3(-.21, .52, .13);
        const loweredElbow = new T.Vector3(-.25, .64, .04);
        limb(new T.Vector3(-.16, .8, .02), loweredElbow);
        limb(loweredElbow, loweredHand);
        const handGeometry = geometry(new T.SphereGeometry(.06, 10, 8));
        for (const position of [raisedHand, loweredHand]) {
          const hand = new T.Mesh(handGeometry, white);
          hand.position.copy(position);
          person.add(hand);
        }
        const faceMaterial = material(new T.MeshBasicMaterial({ color: 0x526477 }));
        const eyeGeometry = geometry(new T.SphereGeometry(.015, 8, 6));
        for (const x of [-.053, .053]) {
          const eye = new T.Mesh(eyeGeometry, faceMaterial);
          eye.position.set(x, .02, .151);
          expression.add(eye);
        }
        personStation.updateMatrixWorld(true);
        const personCore = person.localToWorld(new T.Vector3(0, .68, 0));
        const handPort = person.localToWorld(raisedHand.clone());

        const agent = makeStation(stationPositions.agent, 1.28, 1.14);
        box(agent, [.6, .16, .6], [0, .35, 0], pale, .06);
        const orbCenter = stationPositions.agent.clone().add(new T.Vector3(0, .97, 0));
        const orb = new T.Mesh(geometry(new T.SphereGeometry(.36, 24, 16)), blue);
        orb.position.copy(orbCenter);
        scene.add(orb);
        const spark = new T.Group();
        spark.position.copy(orbCenter).addScaledVector(facing, .355);
        spark.quaternion.setFromUnitVectors(new T.Vector3(0, 0, 1), facing);
        scene.add(spark);
        const diamondGeometry = geometry(new T.BoxGeometry(.08, .08, .035));
        for (const [x, y] of [[0, .11], [-.11, 0], [.11, 0], [0, -.11]]) {
          const diamond = new T.Mesh(diamondGeometry, white);
          diamond.position.set(x, y, 0);
          diamond.rotation.z = Math.PI / 4;
          spark.add(diamond);
        }
        const competitor = makeStation(stationPositions.competitor, 1.08, .92);
        box(competitor, [.72, .62, .62], [0, .61, 0], gray, .055);
        box(competitor, [.82, .1, .72], [0, .96, 0], pale, .045);
        const smallWindow = geometry(new T.BoxGeometry(.12, .16, .015));
        for (const x of [-.18, .18]) {
          const window = new T.Mesh(smallWindow, grayDetail);
          window.position.set(x, .66, .319);
          competitor.add(window);
        }

        const company = makeStation(stationPositions.company, 1.46, 1.18);
        const facade = material(new T.MeshStandardMaterial({ color: 0xffffff, roughness: .7, emissive: 0x83b8ff, emissiveIntensity: 0 }));
        box(company, [.98, .82, .82], [0, .72, 0], facade, .055);
        box(company, [1.12, .14, .96], [0, 1.2, 0], prepared, .055);
        box(company, [.12, .82, .88], [-.4, .72, 0], prepared, .035);
        box(company, [.9, .075, .92], [0, .36, 0], lightBlue, .025);
        const panelGeometry = geometry(new T.BoxGeometry(.18, .22, .022));
        const panels: Three.MeshStandardMaterial[] = [];
        for (const x of [-.24, 0, .24]) {
          const surface = material(prepared.clone());
          panels.push(surface);
          const panel = new T.Mesh(panelGeometry, surface);
          panel.position.set(x, .83, .426);
          company.add(panel);
        }
        box(company, [.18, .34, .025], [0, .51, .428], lightBlue, .02);
        company.updateMatrixWorld(true);
        const companyCore = company.localToWorld(new T.Vector3(0, .8, 0));
        const incoming = new T.CatmullRomCurve3([
          personCore, handPort, at(-1.45, -.2, 1.03), orbCenter,
        ], false, 'centripetal');
        const rail = new T.CatmullRomCurve3([
          orbCenter, at(-.75, -.4, .92), at(.1, -.65, .7), at(1.05, -.7, .7), companyCore,
        ], false, 'centripetal');
        scene.add(new T.Mesh(geometry(new T.TubeGeometry(incoming, 48, .018, 6, false)), railMaterial));
        scene.add(new T.Mesh(geometry(new T.TubeGeometry(rail, 80, .023, 6, false)), railMaterial));

        // One traveling core enters each actor; a short trail conveys returned information.
        const signal = new T.Mesh(geometry(new T.SphereGeometry(.09, 16, 12)), signalMaterial);
        scene.add(signal);
        const trailPoints = new Float32Array(8 * 3);
        const trailGeometry = geometry(new T.BufferGeometry());
        trailGeometry.setAttribute('position', new T.BufferAttribute(trailPoints, 3));
        const trailMaterial = material(new T.LineBasicMaterial({ color: 0x83b8ff, transparent: true, opacity: .6 }));
        const trail = new T.Line(trailGeometry, trailMaterial);
        trail.frustumCulled = false;
        scene.add(trail);
        const trailPoint = new T.Vector3();

        const haloCanvas = document.createElement('canvas');
        haloCanvas.width = haloCanvas.height = 64;
        const haloContext = haloCanvas.getContext('2d');
        if (haloContext) {
          const glow = haloContext.createRadialGradient(32, 32, 0, 32, 32, 32);
          glow.addColorStop(0, 'rgba(255,255,255,.8)');
          glow.addColorStop(.3, 'rgba(131,184,255,.55)');
          glow.addColorStop(1, 'rgba(47,92,229,0)');
          haloContext.fillStyle = glow;
          haloContext.fillRect(0, 0, 64, 64);
        }
        const haloMap = new T.CanvasTexture(haloCanvas);
        haloMap.colorSpace = T.SRGBColorSpace;
        textures.add(haloMap);
        const haloMaterial = material(new T.SpriteMaterial({ map: haloMap, transparent: true, depthWrite: false, opacity: .55 }));
        const halo = new T.Sprite(haloMaterial);
        halo.scale.setScalar(.52);
        signal.add(halo);
        const agentGlowMaterial = material(new T.SpriteMaterial({ map: haloMap, transparent: true, depthWrite: false, opacity: 0 }));
        const agentGlow = new T.Sprite(agentGlowMaterial);
        agentGlow.position.copy(orbCenter).addScaledVector(facing, .39);
        agentGlow.scale.setScalar(1.22);
        scene.add(agentGlow);
        const projected = new T.Vector3();

        const smooth = (value: number) => { const u = Math.max(0, Math.min(1, value)); return u * u * (3 - 2 * u); };
        const energyBetween = (t: number, start: number, end: number, edge = .4) => smooth((t - start) / edge) * smooth((end - t) / edge);
        const positionAt = (t: number, target: Three.Vector3) => {
          if (t < 2) target.copy(personCore);
          else if (t < 4.5) incoming.getPointAt(smooth((t - 2) / 2.5), target);
          else if (t < 6.5) target.copy(orbCenter);
          else if (t < 10.5) rail.getPointAt(smooth((t - 6.5) / 4), target);
          else if (t < 14.5) target.copy(companyCore);
          else if (t < 18) rail.getPointAt(1 - smooth((t - 14.5) / 3.5), target);
          else if (t < 19.5) target.copy(orbCenter);
          else if (t < 21.5) incoming.getPointAt(1 - smooth((t - 19.5) / 2), target);
          else target.copy(personCore);
        };

        const frame = (seconds: number) => {
          const t = playback.current.reduced ? 12 : seconds % CYCLE_SECONDS;
          const phase: SearchPhase = t < 4.5 ? 'question' : t < 6.5 ? 'agent' : t < 10.5 ? 'search' : t < 14.5 ? 'company' : t < 19.5 ? 'return' : t < 21.5 ? 'delivery' : 'answer';
          if (phase !== lastPhase) {
            lastPhase = phase;
            element.dataset.phase = phase;
            callbacks.current.onPhase(phase);
          }
          const reduced = playback.current.reduced;
          const pulse = reduced ? 0 : .5 + .5 * Math.sin(t / CYCLE_SECONDS * Math.PI * 32);
          const personEnergy = Math.max(energyBetween(t, -.5, 2.4), energyBetween(t, 20.4, CYCLE_SECONDS + .5));
          const agentEnergy = Math.max(energyBetween(t, 4.1, 7), energyBetween(t, 17.6, 20));
          const companyEnergy = energyBetween(t, 10, 15, .5);
          prepared.emissiveIntensity = .08 + companyEnergy * (.17 + pulse * .35);
          facade.emissiveIntensity = companyEnergy * (.08 + pulse * .12);
          blue.emissiveIntensity = .1 + agentEnergy * (.15 + pulse * .4);
          personMaterial.emissiveIntensity = .04 + personEnergy * (.08 + pulse * .42);
          expression.rotation.z = reduced ? 0 : personEnergy * Math.sin(t / CYCLE_SECONDS * Math.PI * 14) * .055;
          torso.scale.setScalar(reduced ? 1 : 1 + personEnergy * pulse * .025);
          orb.scale.setScalar(1 + agentEnergy * pulse * .075);
          spark.position.copy(orbCenter).addScaledVector(facing, .355 * orb.scale.x);
          agentGlowMaterial.opacity = reduced ? 0 : agentEnergy * (.16 + pulse * .25);
          panels.forEach((surface, index) => {
            const reading = energyBetween(t, 10.5 + index * 1.2, 12.1 + index * 1.2, .25);
            surface.emissiveIntensity = reduced ? .2 : .08 + companyEnergy * (.14 + reading * .5);
          });
          // Inside opaque actors the core disappears; their glow shows reception and analysis.
          const traveling = t >= 2 && t < 4.5 || t >= 6.5 && t < 10.5 || t >= 14.5 && t < 18 || t >= 19.5 && t < 21.5;
          signal.visible = !reduced && traveling;
          trail.visible = signal.visible;
          signalMaterial.color.setHex(t >= 14.5 ? 0x637bea : 0x2f5ce5);
          positionAt(t, signal.position);
          for (let index = 0; index < 8; index++) {
            positionAt(Math.max(0, t - index * .055), trailPoint);
            trailPoints[index * 3] = trailPoint.x;
            trailPoints[index * 3 + 1] = trailPoint.y;
            trailPoints[index * 3 + 2] = trailPoint.z;
          }
          trailGeometry.attributes.position.needsUpdate = true;
        };
        const render = () => {
          if (disposed || lost || !renderer || width === 0 || height === 0) return;
          frame(elapsed);
          renderer.render(scene, camera);
          element.dataset.modelStatus = 'ready';
          setReady(true);
        };
        const sync = () => {
          if (disposed || lost || !renderer) return;
          if (playback.current.reduced || !playback.current.playing || width === 0 || height === 0) {
            stop();
            render();
            return;
          }
          if (running) return;
          running = true;
          lastTime = 0;
          renderer.setAnimationLoop((time) => {
            if (!running || disposed || lost) return;
            if (lastTime !== 0) elapsed += Math.min(.25, Math.max(0, (time - lastTime) / 1000));
            lastTime = time;
            render();
          });
        };
        const resize = () => {
          if (disposed || lost || !renderer) return;
          const rect = element.getBoundingClientRect();
          width = Math.round(rect.width);
          height = Math.round(rect.height);
          if (width < 1 || height < 1) {
            width = height = 0;
            stop();
            return;
          }
          const aspect = width / height;
          const viewHeight = Math.max(4.85, 7.8 / aspect);
          camera.left = -viewHeight * aspect / 2;
          camera.right = viewHeight * aspect / 2;
          camera.top = viewHeight / 2;
          camera.bottom = -viewHeight / 2;
          camera.updateProjectionMatrix();
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
          renderer.setSize(width, height, false);

          const anchors = {} as SearchAnchors;
          for (const name of ['person', 'agent', 'competitor', 'company'] as const) {
            projected.copy(labelPositions[name]).project(camera);
            anchors[name] = { x: (projected.x + 1) * 50, y: (1 - projected.y) * 50 };
          }
          callbacks.current.onAnchors(anchors);
          render();
          sync();
        };
        function contextLost(event: Event) {
          event.preventDefault();
          lost = true;
          stop();
          element.dataset.modelStatus = 'context-lost';
          setReady(false);
        }
        function contextRestored() {
          if (disposed) return;
          lost = false;
          resize();
        }

        localController = { sync, dispose: cleanup };
        controller.current = localController;
        try {
          renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
          renderer.outputColorSpace = T.SRGBColorSpace;
          renderer.toneMapping = T.ACESFilmicToneMapping;
          renderer.toneMappingExposure = 1.1;
          renderer.setClearColor(0xffffff, 0);
          renderer.domElement.setAttribute('aria-hidden', 'true');
          renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;pointer-events:none';
          renderer.domElement.addEventListener('webglcontextlost', contextLost);
          renderer.domElement.addEventListener('webglcontextrestored', contextRestored);
          element.append(renderer.domElement);
          observer = new ResizeObserver(resize);
          observer.observe(element);
          resize();
        } catch {
          cleanup();
          controller.current = localController = null;
          element.dataset.modelStatus = 'unsupported';
          element.dataset.ready = 'false';
          callbacks.current.onReady(false);
        }
      } catch {
        if (!disposed) {
          element.dataset.modelStatus = 'error';
          element.dataset.ready = 'false';
          callbacks.current.onReady(false);
        }
      }
    };
    initialize.current = () => { void load(); };
    if (playback.current.playing || playback.current.reduced) initialize.current();

    return () => {
      disposed = true;
      localController?.dispose();
      controller.current = null;
      initialize.current = null;
    };
  }, []);

  useEffect(() => {
    playback.current = { playing, reduced };
    if (playing || reduced) initialize.current?.();
    controller.current?.sync();
  }, [playing, reduced]);

  return <div ref={host} className={className} aria-hidden="true" data-model="agent-search" data-model-status="idle" data-ready="false" style={{ pointerEvents: 'none' }} />;
}
