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

const CYCLE_SECONDS = 18;
const RAIL_RADIUS = .014;

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
        const stationPositions = { person: at(-2.15, -.5), agent: at(-.05, .3), competitor: at(1.15, 1.7), company: at(2.05, -.5) };
        const labelPositions = { person: at(-2.15, -.5, 2.04), agent: at(-.05, -.7, .04), competitor: at(1.2, 1.7, 1.55), company: at(2.05, -1.38, .02) };
        const scene = new T.Scene();
        const camera = new T.OrthographicCamera(-3.9, 3.9, 3, -3, .1, 40);
        camera.position.set(6, 6.8, 10);
        camera.lookAt(0, .45, 0);
        camera.updateMatrixWorld();
        scene.add(new T.HemisphereLight(0xf6f9ff, 0xb6c9e5, 1.1));
        const key = new T.DirectionalLight(0xffffff, 1.9);
        key.position.set(-3, 7, 5);
        scene.add(key);
        const rim = new T.DirectionalLight(0x9dbbff, 1.1);
        rim.position.set(4, 3, -6);
        scene.add(rim);

        const white = material(new T.MeshStandardMaterial({ color: 0xf4f7fd, roughness: .62 }));
        const pale = material(new T.MeshStandardMaterial({ color: 0xe7effb, roughness: .78 }));
        const gray = material(new T.MeshStandardMaterial({ color: 0xe1e7ef, roughness: .8 }));
        const grayDetail = material(new T.MeshStandardMaterial({ color: 0xc3cfdf, roughness: .8 }));
        const blue = material(new T.MeshPhysicalMaterial({ color: 0x2f5ce5, roughness: .24, metalness: .05, clearcoat: .8, clearcoatRoughness: .18, emissive: 0x183897, emissiveIntensity: .1 }));
        const prepared = material(new T.MeshStandardMaterial({ color: 0x2f5ce5, roughness: .46, metalness: .08, emissive: 0x2f5ce5, emissiveIntensity: .08 }));
        const lightBlue = material(new T.MeshStandardMaterial({ color: 0xb0cbff, roughness: .45, metalness: .05 }));
        const railMaterial = material(new T.MeshStandardMaterial({ color: 0x91b3ec, roughness: .55, metalness: .1 }));
        const signalMaterial = material(new T.MeshBasicMaterial({ color: 0x2f5ce5, toneMapped: false }));
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
          box(group, [w, .09, d], [0, .08, 0], lightBlue, .045);
          box(group, [w, .18, d], [0, .19, 0], white, .075);
          return group;
        };

        // One shared, small radial texture supplies soft contact shadows without shadow maps.
        const shadowCanvas = document.createElement('canvas');
        shadowCanvas.width = shadowCanvas.height = 64;
        const shadowContext = shadowCanvas.getContext('2d');
        let shadowMap: Three.CanvasTexture | undefined;
        if (shadowContext) {
          const gradient = shadowContext.createRadialGradient(32, 32, 2, 32, 32, 32);
          gradient.addColorStop(0, 'rgba(48,77,115,.23)');
          gradient.addColorStop(.55, 'rgba(48,77,115,.08)');
          gradient.addColorStop(1, 'rgba(48,77,115,0)');
          shadowContext.fillStyle = gradient;
          shadowContext.fillRect(0, 0, 64, 64);
          shadowMap = new T.CanvasTexture(shadowCanvas);
          textures.add(shadowMap);
        }
        const shadowMaterial = material(new T.MeshBasicMaterial({ map: shadowMap, color: shadowMap ? 0xffffff : 0x9babbe, transparent: true, opacity: shadowMap ? 1 : .08, depthWrite: false }));
        const shadowGeometry = geometry(new T.PlaneGeometry(2.1, 1.7));
        const shadows: Three.Mesh[] = [];
        for (const position of Object.values(stationPositions)) {
          const shadow = new T.Mesh(shadowGeometry, shadowMaterial);
          shadow.rotation.x = -Math.PI / 2;
          shadow.position.copy(position).y = .012;
          scene.add(shadow);
          shadows.push(shadow);
        }
        const floor = new T.Group();
        floor.position.copy(at(-.05, .1, -.1));
        floor.rotation.y = Math.atan2(-right.z, right.x) + .22;
        scene.add(floor);
        const floorMaterial = material(new T.MeshStandardMaterial({ color: 0xf0f4fc, roughness: .76 }));
        box(floor, [6.1, .14, 3.65], [0, 0, 0], floorMaterial, .18);
        // A narrow blue edge gives the shared workbench depth without another card.
        box(floor, [5.9, .035, 3.45], [0, -.085, 0], lightBlue, .14);

        const personStation = makeStation(stationPositions.person, .9, .86);
        const person = new T.Group();
        person.scale.setScalar(1.5);
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
        const trousers = material(new T.MeshStandardMaterial({ color: 0x314866, roughness: .8 }));
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
        const hair = new T.Mesh(geometry(new T.SphereGeometry(.164, 16, 10, 0, Math.PI * 2, 0, 1.1)), trousers);
        hair.position.y = .025;
        expression.add(hair);
        // The person carries a small phone: the query starts at a real interaction point.
        const phone = box(person, [.14, .24, .055], [.4, .85, .17], trousers, .025);
        phone.rotation.z = -.1;
        box(person, [.108, .17, .012], [.4, .86, .203], lightBlue, .012);
        personStation.updateMatrixWorld(true);
        const personCore = person.localToWorld(new T.Vector3(0, .68, 0));
        const handPort = person.localToWorld(raisedHand.clone());

        const agent = makeStation(stationPositions.agent, 1.34, 1.2);
        box(agent, [.85, .11, .79], [0, .34, 0], pale, .06);
        box(agent, [.6, .1, .57], [0, .445, 0], lightBlue, .06);
        const orbCenter = stationPositions.agent.clone().add(new T.Vector3(0, .97, 0));
        const orb = new T.Mesh(geometry(new T.SphereGeometry(.4, 32, 20)), blue);
        orb.position.copy(orbCenter);
        scene.add(orb);
        const spark = new T.Group();
        spark.position.copy(orbCenter).addScaledVector(facing, .395);
        spark.quaternion.setFromUnitVectors(new T.Vector3(0, 0, 1), facing);
        scene.add(spark);
        const diamondGeometry = geometry(new T.BoxGeometry(.08, .08, .035));
        for (const [x, y] of [[0, .11], [-.11, 0], [.11, 0], [0, -.11]]) {
          const diamond = new T.Mesh(diamondGeometry, white);
          diamond.position.set(x, y, 0);
          diamond.rotation.z = Math.PI / 4;
          spark.add(diamond);
        }
        const competitor = makeStation(stationPositions.competitor, .94, .8);
        box(competitor, [.65, .5, .55], [0, .55, 0], gray, .055);
        box(competitor, [.73, .085, .63], [0, .85, 0], pale, .045);
        const smallWindow = geometry(new T.BoxGeometry(.12, .16, .015));
        for (const x of [-.18, .18]) {
          const window = new T.Mesh(smallWindow, grayDetail);
          window.position.set(x, .59, .284);
          competitor.add(window);
        }

        const company = makeStation(stationPositions.company, 1.48, 1.18);
        const facade = material(new T.MeshStandardMaterial({ color: 0xf8faff, roughness: .64, emissive: 0x83b8ff, emissiveIntensity: 0 }));
        // A small information hub, with three visible data rows instead of an opaque cube.
        box(company, [1.04, .95, .65], [0, .78, 0], facade, .075);
        box(company, [1.16, .11, .77], [0, 1.29, 0], prepared, .05);
        box(company, [.13, .93, .7], [-.43, .78, 0], prepared, .035);
        box(company, [.98, .075, .78], [0, .34, 0], lightBlue, .025);
        const panelGeometry = geometry(new RoundedBoxGeometry(.66, .13, .035, 2, .025));
        const panels: Three.MeshStandardMaterial[] = [];
        for (const y of [1.05, .83, .61]) {
          const surface = material(lightBlue.clone());
          surface.emissive.setHex(0x2f5ce5);
          panels.push(surface);
          const panel = new T.Mesh(panelGeometry, surface);
          panel.position.set(.04, y, .346);
          company.add(panel);
          box(company, [.05, .05, .02], [-.2, y, .373], prepared, .012);
          box(company, [.32, .025, .02], [.07, y, .373], white, .008);
        }
        company.updateMatrixWorld(true);
        const companyCore = company.localToWorld(new T.Vector3(0, .8, 0));
        const incoming = new T.CatmullRomCurve3([
          personCore, handPort, at(-1.15, -.1, 1.08), orbCenter,
        ], false, 'centripetal');
        const rail = new T.CatmullRomCurve3([
          orbCenter, at(.32, -.38, .86), at(.92, -.7, .68), at(1.46, -.65, .73), companyCore,
        ], false, 'centripetal');
        const incomingRail = new T.Mesh(geometry(new T.TubeGeometry(incoming, 48, RAIL_RADIUS, 6, false)), railMaterial);
        const companyRail = new T.Mesh(geometry(new T.TubeGeometry(rail, 64, RAIL_RADIUS, 6, false)), railMaterial);
        scene.add(incomingRail, companyRail);

        // One traveling core enters each actor; a short trail conveys returned information.
        const signal = new T.Mesh(geometry(new T.SphereGeometry(.105, 16, 12)), signalMaterial);
        scene.add(signal);
        const trailPoints = new Float32Array(14 * 3);
        const trailColors = new Float32Array(14 * 4);
        const trailGeometry = geometry(new T.BufferGeometry());
        trailGeometry.setAttribute('position', new T.BufferAttribute(trailPoints, 3));
        // Four channels retain the single trail while fading its tail into the scene.
        trailGeometry.setAttribute('color', new T.BufferAttribute(trailColors, 4));
        const trailMaterial = material(new T.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: .9, depthWrite: false, toneMapped: false }));
        const trail = new T.Line(trailGeometry, trailMaterial);
        trail.frustumCulled = false;
        scene.add(trail);
        const trailPoint = new T.Vector3();
        const trailColor = new T.Color();
        const trailTailColor = new T.Color(0xc8ddff);

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
          if (t < 1.2) target.copy(personCore);
          else if (t < 3) incoming.getPointAt(smooth((t - 1.2) / 1.8), target);
          else if (t < 5) target.copy(orbCenter);
          else if (t < 8) rail.getPointAt(smooth((t - 5) / 3), target);
          else if (t < 11) target.copy(companyCore);
          else if (t < 13.5) rail.getPointAt(1 - smooth((t - 11) / 2.5), target);
          else if (t < 14) target.copy(orbCenter);
          else if (t < 16) incoming.getPointAt(1 - smooth((t - 14) / 2), target);
          else target.copy(personCore);
        };

        const frame = (seconds: number) => {
          const t = playback.current.reduced ? 9.5 : seconds % CYCLE_SECONDS;
          const phase: SearchPhase = t < 3 ? 'question' : t < 5 ? 'agent' : t < 8 ? 'search' : t < 11 ? 'company' : t < 14 ? 'return' : t < 16 ? 'delivery' : 'answer';
          if (phase !== lastPhase) {
            lastPhase = phase;
            element.dataset.phase = phase;
            callbacks.current.onPhase(phase);
          }
          const reduced = playback.current.reduced;
          const pulse = reduced ? 0 : .5 + .5 * Math.sin(t / CYCLE_SECONDS * Math.PI * 18);
          const personEnergy = Math.max(energyBetween(t, -.5, 1.7), energyBetween(t, 15.5, CYCLE_SECONDS + .5));
          const agentEnergy = Math.max(energyBetween(t, 2.7, 5.4), energyBetween(t, 13.1, 14.4));
          const companyEnergy = energyBetween(t, 7.7, 11.4, .4);
          prepared.emissiveIntensity = .08 + companyEnergy * (.17 + pulse * .35);
          facade.emissiveIntensity = companyEnergy * (.08 + pulse * .12);
          blue.emissiveIntensity = .1 + agentEnergy * (.15 + pulse * .4);
          personMaterial.emissiveIntensity = .04 + personEnergy * (.08 + pulse * .42);
          expression.rotation.z = reduced ? 0 : personEnergy * Math.sin(t / CYCLE_SECONDS * Math.PI * 14) * .055;
          torso.scale.setScalar(reduced ? 1 : 1 + personEnergy * pulse * .025);
          orb.scale.setScalar(1 + agentEnergy * pulse * .075);
          spark.position.copy(orbCenter).addScaledVector(facing, .395 * orb.scale.x);
          agentGlow.position.copy(orbCenter).addScaledVector(facing, .43);
          agentGlowMaterial.opacity = reduced ? 0 : agentEnergy * (.16 + pulse * .25);
          panels.forEach((surface, index) => {
            const reading = energyBetween(t, 8 + index * .8, 9.2 + index * .8, .22);
            surface.emissiveIntensity = reduced ? .2 : .08 + companyEnergy * (.14 + reading * .5);
          });
          // Inside opaque actors the core disappears; their glow shows reception and analysis.
          const traveling = t >= 1.2 && t < 3 || t >= 5 && t < 8 || t >= 11 && t < 13.5 || t >= 14 && t < 16;
          signal.visible = !reduced && traveling;
          trail.visible = signal.visible;
          signalMaterial.color.setHex(t >= 11 ? 0x637bea : 0x2f5ce5);
          positionAt(t, signal.position);
          for (let index = 0; index < 14; index++) {
            positionAt(Math.max(0, t - index * .04), trailPoint);
            trailPoints[index * 3] = trailPoint.x;
            trailPoints[index * 3 + 1] = trailPoint.y;
            trailPoints[index * 3 + 2] = trailPoint.z;
            const tail = index / 13;
            trailColor.copy(signalMaterial.color).lerp(trailTailColor, tail * .65);
            trailColors[index * 4] = trailColor.r;
            trailColors[index * 4 + 1] = trailColor.g;
            trailColors[index * 4 + 2] = trailColor.b;
            trailColors[index * 4 + 3] = (1 - tail) ** 1.4;
          }
          trailGeometry.attributes.position.needsUpdate = true;
          trailGeometry.attributes.color.needsUpdate = true;
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
            if (lastTime !== 0) elapsed += Math.min(.1, Math.max(0, (time - lastTime) / 1000));
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
          const compact = width < 440;
          // Keep the same story on a phone, with a tighter, slightly staggered workbench.
          stationPositions.person.copy(at(compact ? -1.75 : -2.15, -.5));
          stationPositions.agent.copy(at(compact ? -.1 : -.05, compact ? .65 : .3));
          stationPositions.competitor.copy(at(compact ? .9 : 1.15, compact ? 1.85 : 1.7));
          stationPositions.company.copy(at(compact ? 1.7 : 2.05, -.5));
          personStation.position.copy(stationPositions.person);
          agent.position.copy(stationPositions.agent);
          competitor.position.copy(stationPositions.competitor);
          company.position.copy(stationPositions.company);
          personStation.updateMatrixWorld(true);
          company.updateMatrixWorld(true);
          personCore.copy(person.localToWorld(new T.Vector3(0, .68, 0)));
          handPort.copy(person.localToWorld(raisedHand.clone()));
          orbCenter.copy(stationPositions.agent).y += .97;
          orb.position.copy(orbCenter);
          companyCore.copy(company.localToWorld(new T.Vector3(0, .8, 0)));
          incoming.points[2].copy(at(compact ? -.95 : -1.15, -.1, 1.08));
          rail.points[1].copy(at(compact ? .2 : .32, -.38, .86));
          rail.points[2].copy(at(compact ? .7 : .92, -.7, .68));
          rail.points[3].copy(at(compact ? 1.2 : 1.46, -.65, .73));
          incoming.updateArcLengths();
          rail.updateArcLengths();
          // Resize owns these two tube geometries. Retire them before replacing them.
          for (const [mesh, curve, segments] of [[incomingRail, incoming, 48], [companyRail, rail, 64]] as const) {
            geometries.delete(mesh.geometry);
            mesh.geometry.dispose();
            mesh.geometry = geometry(new T.TubeGeometry(curve, segments, RAIL_RADIUS, 6, false));
          }
          Object.values(stationPositions).forEach((position, index) => { shadows[index].position.copy(position).y = .012; });
          floor.scale.x = compact ? .87 : 1;
          labelPositions.person.copy(at(compact ? -1.75 : -2.15, -.5, 1.65));
          labelPositions.agent.copy(at(compact ? -.1 : -.05, compact ? -.2 : -.7, .04));
          labelPositions.competitor.copy(at(compact ? 1.0 : 1.2, compact ? 1.85 : 1.7, 1.6));
          labelPositions.company.copy(at(compact ? 1.7 : 2.05, -1.42, .02));
          const viewHeight = Math.max(4.9, (compact ? 5.7 : 6.7) / aspect);
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
          renderer.toneMappingExposure = 1;
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
