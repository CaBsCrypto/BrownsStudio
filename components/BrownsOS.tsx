"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Palette ───────────────────────────────────────────────────────────────────
const C_CYAN = new THREE.Color(0x00f0ff);
const C_RED  = new THREE.Color(0xff003c);

// ── Data Ocean ────────────────────────────────────────────────────────────────
const OCEAN_POS   = new THREE.Vector3(0, -7, -8);
const OCEAN_ROT_X = -1.22;

function DataOcean({ scrollRef, isMobile, visibleRef }: {
  scrollRef: React.MutableRefObject<number>;
  isMobile: boolean;
  visibleRef: React.MutableRefObject<boolean>;
}) {
  const { camera } = useThree();
  const mouseNDC  = useRef({ x: 0, y: 0 });
  const origXY    = useRef<Float32Array>(null!);
  const frameSkip = useRef(0);

  const SEGS = isMobile ? 10 : 90;  // mobile: 121 verts vs desktop: 8281

  const oceanGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(80, 80, SEGS, SEGS);
    const pos = geo.attributes.position.array as Float32Array;
    origXY.current = new Float32Array(pos.length);
    for (let i = 0; i < pos.length; i++) origXY.current[i] = pos[i];
    return geo;
  }, []);

  const pointsMat = useMemo(() => new THREE.PointsMaterial({
    size: 0.055, color: 0x00f0ff, transparent: true, opacity: 0.22,
    sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
  }), []);

  const wireMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.028,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }), []);

  const worldPlane = useMemo(() => {
    const normal = new THREE.Vector3(0, 0, 1)
      .applyMatrix4(new THREE.Matrix4().makeRotationX(OCEAN_ROT_X));
    return new THREE.Plane().setFromNormalAndCoplanarPoint(normal, OCEAN_POS);
  }, []);

  const invOceanMatrix = useMemo(() => {
    const m = new THREE.Matrix4().compose(
      OCEAN_POS,
      new THREE.Quaternion().setFromEuler(new THREE.Euler(OCEAN_ROT_X, 0, 0)),
      new THREE.Vector3(1, 1, 1)
    );
    return m.invert();
  }, []);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const hitWorld  = useMemo(() => new THREE.Vector3(), []);
  const hitLocal  = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    if (isMobile) return; // no mouse on mobile
    const onMove = (e: MouseEvent) => {
      mouseNDC.current.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouseNDC.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMobile]);

  useFrame(({ clock, invalidate }) => {
    // Pause when canvas is not visible (scrolled away)
    if (!visibleRef.current) return;

    // ~12fps cap on mobile
    if (isMobile) {
      frameSkip.current = (frameSkip.current + 1) % 5;
      if (frameSkip.current !== 0) return;
    }

    const t    = clock.elapsedTime;
    const s    = scrollRef.current;
    const arr  = oceanGeo.attributes.position.array as Float32Array;
    const orig = origXY.current;
    const n    = arr.length / 3;

    if (isMobile) {
      for (let i = 0; i < n; i++) {
        const i3 = i * 3;
        const x  = orig[i3], y = orig[i3 + 1];
        arr[i3 + 2] = Math.sin(x * 0.12 + t * 0.5) * Math.cos(y * 0.09 + t * 0.3) * (0.7 + s * 2.8);
      }
    } else {
      raycaster.setFromCamera(mouseNDC.current as THREE.Vector2, camera);
      raycaster.ray.intersectPlane(worldPlane, hitWorld);
      hitLocal.copy(hitWorld).applyMatrix4(invOceanMatrix);
      const mx = hitLocal.x, my = hitLocal.y;
      for (let i = 0; i < n; i++) {
        const i3 = i * 3;
        const x  = orig[i3], y = orig[i3 + 1];
        const dx = x - mx, dy = y - my;
        const d2 = dx*dx + dy*dy;
        const pull = d2 < 64 ? (1 - Math.sqrt(d2) / 8) * 3.2 : 0;
        arr[i3 + 2] = Math.sin(x * 0.12 + t * 0.5) * Math.cos(y * 0.09 + t * 0.3) * (0.7 + s * 2.8) + pull;
      }
    }
    oceanGeo.attributes.position.needsUpdate = true;
    pointsMat.opacity = 0.12 + s * 0.28;
    if (!isMobile) wireMat.opacity = 0.018 + s * 0.042;
    invalidate();
  });

  return (
    <group rotation={[-1.22, 0, 0]} position={[0, -7, -8]}>
      <points geometry={oceanGeo} material={pointsMat} />
      {!isMobile && <mesh geometry={oceanGeo} material={wireMat} />}
    </group>
  );
}

// ── Quantum Core — Fibonacci Points Sphere ────────────────────────────────────
// Single Points object, group rotation only — zero vertex updates, one draw call
function QuantumCore({ scrollRef, glitchRef, isMobile, visibleRef }: {
  scrollRef: React.MutableRefObject<number>;
  glitchRef: React.MutableRefObject<boolean>;
  isMobile: boolean;
  visibleRef: React.MutableRefObject<boolean>;
}) {
  const groupRef  = useRef<THREE.Group>(null!);
  const r1Ref     = useRef<THREE.LineSegments>(null!);
  const r2Ref     = useRef<THREE.LineSegments>(null!);
  const tgt       = useRef(new THREE.Vector3());
  const frameSkip = useRef(0);

  const COUNT     = isMobile ? 80  : 320;
  const RING_SEGS = isMobile ? 32  : 72;

  // Soft circular dot texture — prevents square WebGL points
  const dotTexture = useMemo(() => {
    const size = isMobile ? 32 : 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    grad.addColorStop(0,   "rgba(0,240,255,1)");
    grad.addColorStop(0.4, "rgba(0,240,255,0.6)");
    grad.addColorStop(1,   "rgba(0,240,255,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
    ctx.fill();
    return new THREE.CanvasTexture(canvas);
  }, []);

  // Fibonacci sphere distribution — evenly spaced points on a sphere surface
  const { sphereGeo, sphereMat } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const golden    = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
      const y     = 1 - (i / (COUNT - 1)) * 2;
      const r     = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      positions[i*3]   = Math.cos(theta) * r;
      positions[i*3+1] = y;
      positions[i*3+2] = Math.sin(theta) * r;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      size: isMobile ? 0.14 : 0.11,
      color: 0x00f0ff,
      map: dotTexture,
      transparent: true,
      opacity: 0.90,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      alphaTest: 0.01,
    });
    return { sphereGeo: geo, sphereMat: mat };
  }, [COUNT, isMobile, dotTexture]);

  // Orbital rings as LineSegments
  const ringMat = useMemo(() => new THREE.LineBasicMaterial({
    color: 0x00f0ff, transparent: true,
    opacity: isMobile ? 0.30 : 0.18,
    blending: THREE.AdditiveBlending,
  }), [isMobile]);

  const makeRingGeo = (r: number, segs: number) => {
    const pts: number[] = [];
    for (let i = 0; i < segs; i++) {
      const a1 = (i / segs) * Math.PI * 2;
      const a2 = ((i + 1) / segs) * Math.PI * 2;
      pts.push(Math.cos(a1)*r, Math.sin(a1)*r, 0, Math.cos(a2)*r, Math.sin(a2)*r, 0);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
    return geo;
  };

  const ring1Geo = useMemo(() => makeRingGeo(1.55, RING_SEGS), [RING_SEGS]);
  const ring2Geo = useMemo(() => makeRingGeo(2.10, RING_SEGS), [RING_SEGS]);

  useFrame(({ clock, invalidate }, dt) => {
    if (!groupRef.current || !visibleRef.current) return;

    if (isMobile) {
      frameSkip.current = (frameSkip.current + 1) % 5;
      if (frameSkip.current !== 0) return;
    }

    const t = clock.elapsedTime;
    const s = scrollRef.current;

    // ── Scroll choreography ───────────────────────────────────────────────
    if (isMobile) {
      if      (s < 0.05) tgt.current.set(0, 0, 0);
      else if (s < 0.30) { const p=(s-0.05)/0.25; tgt.current.set(p*1.5, -p*0.5, 0); }
      else if (s < 0.60) { const p=(s-0.30)/0.30; tgt.current.set(1.5-p*3, -0.5-p*0.5, -p*0.5); }
      else if (s < 0.85) { const p=(s-0.60)/0.25; tgt.current.set(-1.5+p*1.5, -1.0+p*0.5, -0.5+p); }
      else               tgt.current.set(0, -0.5, 0.5);
    } else {
      if      (s < 0.05) tgt.current.set(0, 0, 0);
      else if (s < 0.25) { const p=(s-0.05)/0.20; tgt.current.set(p*4, -p*0.8, 0); }
      else if (s < 0.55) { const p=(s-0.25)/0.30; tgt.current.set(4+p*2, -0.8-p*1.2, -p*1.5); }
      else if (s < 0.80) { const p=(s-0.55)/0.25; tgt.current.set(6-p*14, -2.0+p, -1.5+p*2.5); }
      else               { const p=(s-0.80)/0.20; tgt.current.set(-8+p*8, -1.0+p*1.5, 1.0+p*5); }
    }
    groupRef.current.position.lerp(tgt.current, 0.05);

    // ── Whole-group rotation — single matrix op, no vertex updates ────────
    const spinBoost = glitchRef.current ? 5 : 1;
    groupRef.current.rotation.y += dt * 0.28 * spinBoost;
    groupRef.current.rotation.x += dt * 0.11;

    // Rings rotate independently for orbital feel
    if (r1Ref.current) r1Ref.current.rotation.z += dt * 0.55;
    if (r2Ref.current) r2Ref.current.rotation.x += dt * 0.38;

    // Pulse size + opacity
    const pulse = 1 + Math.sin(t * 2.4) * 0.06;
    groupRef.current.scale.setScalar(pulse);
    sphereMat.opacity = 0.72 + Math.sin(t * 2.4) * 0.13;

    // Color glitch
    if (glitchRef.current) {
      sphereMat.color.copy(C_RED);
      ringMat.color.copy(C_RED);
    } else {
      sphereMat.color.lerp(C_CYAN, 0.08);
      ringMat.color.lerp(C_CYAN, 0.08);
    }
    invalidate();
  });

  return (
    <group ref={groupRef}>
      <points geometry={sphereGeo} material={sphereMat} />
      <lineSegments ref={r1Ref} geometry={ring1Geo} material={ringMat} rotation={[Math.PI/3, 0.3, 0]} />
      <lineSegments ref={r2Ref} geometry={ring2Geo} material={ringMat} rotation={[0.2, Math.PI/4, Math.PI/5]} />
    </group>
  );
}

// ── Star Field ────────────────────────────────────────────────────────────────
function StarField({ visibleRef, isMobile }: {
  visibleRef: React.MutableRefObject<boolean>;
  isMobile: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const COUNT = isMobile ? 150 : 420;

  const { geo, mat } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 10 + Math.random() * 24;
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i*3+2] = r * Math.cos(phi);
      if (Math.random() > 0.55) {
        col[i*3] = 0; col[i*3+1] = 0.94; col[i*3+2] = 1.0;
      } else {
        const v = 0.55 + Math.random() * 0.45;
        col[i*3] = v; col[i*3+1] = v; col[i*3+2] = v;
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color",    new THREE.BufferAttribute(col, 3));
    const m = new THREE.PointsMaterial({
      size: isMobile ? 0.06 : 0.09, vertexColors: true,
      transparent: true, opacity: isMobile ? 0.45 : 0.55,
      sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    return { geo: g, mat: m };
  }, [COUNT, isMobile]);

  useFrame(() => {
    if (!visibleRef.current || !groupRef.current) return;
    groupRef.current.rotation.y += 0.00018;
    groupRef.current.rotation.x += 0.00007;
  });

  return (
    <group ref={groupRef}>
      <points geometry={geo} material={mat} />
    </group>
  );
}

// ── Cursor Ghost ───────────────────────────────────────────────────────────────
function CursorGhost({ visibleRef }: { visibleRef: React.MutableRefObject<boolean> }) {
  const meshRef  = useRef<THREE.Mesh>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);
  const tgt      = useRef(new THREE.Vector3(0, 0, 2));
  const mouseNDC = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseNDC.current.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouseNDC.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ clock }) => {
    if (!visibleRef.current) return;
    // Unproject mouse to world at Z=2
    const v = new THREE.Vector3(mouseNDC.current.x, mouseNDC.current.y, 0.5);
    v.unproject(camera);
    const dir = v.sub(camera.position).normalize();
    const dist = (2 - camera.position.z) / dir.z;
    tgt.current.copy(camera.position).addScaledVector(dir, dist);
    meshRef.current.position.lerp(tgt.current, 0.07);
    lightRef.current.position.copy(meshRef.current.position);
    const pulse = 0.8 + Math.sin(clock.elapsedTime * 4) * 0.2;
    meshRef.current.scale.setScalar(pulse);
    lightRef.current.intensity = 0.7 * pulse;
  });

  return (
    <group>
      <pointLight ref={lightRef} color={0x00f0ff} distance={12} decay={2} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshBasicMaterial color={0x00f0ff} transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

// ── Cursor Trail ──────────────────────────────────────────────────────────────
const TRAIL_COUNT = 80;
function CursorTrail({ visibleRef }: { visibleRef: React.MutableRefObject<boolean> }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const geoRef    = useRef<THREE.BufferGeometry>(null!);
  const positions = useRef(new Float32Array(TRAIL_COUNT * 3));
  const opacities = useRef(new Float32Array(TRAIL_COUNT)); // life 0→1
  const head      = useRef(0);
  const mouseNDC  = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  const mat = useMemo(() => new THREE.PointsMaterial({
    size: 0.22, color: 0x00f0ff, transparent: true, opacity: 1,
    sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
    vertexColors: false,
  }), []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseNDC.current.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouseNDC.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      // Unproject to world Z=2
      const v = new THREE.Vector3(mouseNDC.current.x, mouseNDC.current.y, 0.5);
      v.unproject(camera);
      const dir = v.sub(camera.position).normalize();
      const dist = (2 - camera.position.z) / dir.z;
      const world = new THREE.Vector3().copy(camera.position).addScaledVector(dir, dist);
      const i = head.current % TRAIL_COUNT;
      positions.current[i*3]   = world.x + (Math.random() - 0.5) * 0.3;
      positions.current[i*3+1] = world.y + (Math.random() - 0.5) * 0.3;
      positions.current[i*3+2] = world.z + (Math.random() - 0.5) * 0.3;
      opacities.current[i] = 1.0;
      head.current++;
      if (geoRef.current) geoRef.current.attributes.position.needsUpdate = true;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [camera]);

  useFrame((_, dt) => {
    if (!visibleRef.current) return;
    let anyAlive = false;
    for (let i = 0; i < TRAIL_COUNT; i++) {
      if (opacities.current[i] > 0) {
        opacities.current[i] -= dt * 1.4;
        if (opacities.current[i] < 0) opacities.current[i] = 0;
        // Drift upward
        positions.current[i*3+1] += dt * 0.08;
        anyAlive = true;
      }
    }
    if (anyAlive && geoRef.current) {
      geoRef.current.attributes.position.needsUpdate = true;
      // Fade by scaling size
      const avgLife = opacities.current.reduce((a, b) => a + b, 0) / TRAIL_COUNT;
      mat.opacity = Math.min(avgLife * 2, 0.65);
    }
  });

  useEffect(() => {
    if (!geoRef.current) return;
    geoRef.current.setAttribute(
      "position",
      new THREE.BufferAttribute(positions.current, 3)
    );
  }, []);

  return (
    <points ref={pointsRef} material={mat}>
      <bufferGeometry ref={geoRef} />
    </points>
  );
}

// ── Scene ─────────────────────────────────────────────────────────────────────
function Scene({ scrollRef, glitchRef, isMobile, visibleRef }: {
  scrollRef: React.MutableRefObject<number>;
  glitchRef: React.MutableRefObject<boolean>;
  isMobile: boolean;
  visibleRef: React.MutableRefObject<boolean>;
}) {
  const { camera } = useThree();
  const camTgt = useRef(new THREE.Vector3(0, 0, 14));
  useFrame(({ invalidate }) => {
    if (!visibleRef.current) return;
    const s = scrollRef.current;
    camTgt.current.set(0, -s * 2.8, 14 - s * 2.2);
    camera.position.lerp(camTgt.current, 0.028);
    (camera as THREE.PerspectiveCamera).lookAt(0, -s * 1.6, 0);
    invalidate();
  });
  return (
    <>
      {!isMobile && <ambientLight intensity={0.06} color={0x001a2e} />}
      <DataOcean   scrollRef={scrollRef} isMobile={isMobile} visibleRef={visibleRef} />
    </>
  );
}

// ── Aurora blobs ──────────────────────────────────────────────────────────────
function AuroraBlobs({ scrollRef, isMobile }: {
  scrollRef: React.MutableRefObject<number>;
  isMobile: boolean;
}) {
  const blobARef = useRef<HTMLDivElement>(null);
  const blobCRef = useRef<HTMLDivElement>(null);
  const blobDRef = useRef<HTMLDivElement>(null);
  const mTgt = useRef({ x: 0.5, y: 0.5 });
  const aPos = useRef({ x: 0, y: 0 });
  const cPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e: MouseEvent) => {
      mTgt.current.x = e.clientX / window.innerWidth;
      mTgt.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);
    let rafId: number;
    const loop = () => {
      const ax = (mTgt.current.x - 0.5) * 240;
      const ay = (mTgt.current.y - 0.5) * 180;
      aPos.current.x += (ax - aPos.current.x) * 0.032;
      aPos.current.y += (ay - aPos.current.y) * 0.032;
      if (blobARef.current)
        blobARef.current.style.transform = `translate(${aPos.current.x}px, ${aPos.current.y}px)`;
      const cx = (0.5 - mTgt.current.x) * 140;
      const cy = (0.5 - mTgt.current.y) * 100;
      cPos.current.x += (cx - cPos.current.x) * 0.016;
      cPos.current.y += (cy - cPos.current.y) * 0.016;
      if (blobCRef.current)
        blobCRef.current.style.transform = `translate(${cPos.current.x}px, ${cPos.current.y}px)`;
      const s = scrollRef.current;
      if (blobDRef.current) {
        blobDRef.current.style.transform = `translateY(${-s * 35}vh)`;
        blobDRef.current.style.opacity   = String(0.6 + s * 0.4);
      }
      rafId = requestAnimationFrame(loop);
    };
    loop();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafId); };
  }, [isMobile]);

  if (isMobile) {
    // Single fixed div with stacked radial-gradients — GPU composited, no repaint on scroll
    return (
      <div aria-hidden style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        transform: "translateZ(0)",
        background: `
          radial-gradient(ellipse 120% 55% at 50% -5%,  rgba(0,10,70,0.90)   0%, transparent 65%),
          radial-gradient(ellipse 80%  45% at 15% 20%,  rgba(0,240,255,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 70%  40% at 85% 15%,  rgba(40,0,110,0.12)  0%, transparent 60%),
          radial-gradient(ellipse 100% 40% at 50% 105%, rgba(0,60,100,0.22)  0%, transparent 65%),
          radial-gradient(ellipse 60%  30% at 50% 50%,  rgba(0,240,255,0.03) 0%, transparent 70%)
        `,
      }} />
    );
  }

  const BASE: React.CSSProperties = { position:"fixed", pointerEvents:"none", borderRadius:"50%", filter:"blur(100px)", zIndex:0 };
  return (
    <>
      <div aria-hidden style={{ ...BASE, width:"110vw", height:"90vh", top:"-30vh", left:"-20vw", background:"radial-gradient(ellipse, rgba(0,15,80,0.55) 0%, transparent 70%)" }} />
      <div aria-hidden ref={blobARef} style={{ ...BASE, width:"80vw", height:"70vh", top:"-15vh", left:"10vw", background:"radial-gradient(ellipse, rgba(0,240,255,0.07) 0%, transparent 65%)", willChange:"transform" }} />
      <div aria-hidden ref={blobCRef} style={{ ...BASE, width:"75vw", height:"75vh", top:"-20vh", right:"-10vw", background:"radial-gradient(ellipse, rgba(45,0,120,0.13) 0%, transparent 70%)", willChange:"transform" }} />
      <div aria-hidden ref={blobDRef} style={{ ...BASE, width:"140vw", height:"55vh", bottom:"5vh", left:"-20vw", background:"radial-gradient(ellipse, rgba(0,75,95,0.28) 0%, transparent 70%)", willChange:"transform, opacity" }} />
      <div aria-hidden style={{ ...BASE, width:"60vw", height:"60vh", top:"20vh", left:"20vw", background:"radial-gradient(ellipse, rgba(0,240,255,0.045) 0%, transparent 70%)", animation:"aurora-pulse 9s ease-in-out infinite" }} />
    </>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────
export default function BrownsOS() {
  const scrollRef  = useRef(0);
  const glitchRef  = useRef(false);
  const visibleRef = useRef(true);
  const canvasRef  = useRef<HTMLDivElement>(null);
  const isMobile   = typeof window !== "undefined" && window.innerWidth < 768;

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      scrollRef.current = max > 0 ? el.scrollTop / max : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver — pause Three.js when canvas leaves viewport
  useEffect(() => {
    if (!canvasRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, []);

  // Click → glitch (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const trigger = () => {
      glitchRef.current = true;
      setTimeout(() => { glitchRef.current = false; }, 320);
    };
    document.addEventListener("click", trigger);
    return () => document.removeEventListener("click", trigger);
  }, [isMobile]);

  return (
    <>
      <AuroraBlobs scrollRef={scrollRef} isMobile={isMobile} />

      {!isMobile && (
        <div aria-hidden className="pointer-events-none fixed inset-0" style={{ zIndex:1, background:"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.011) 2px, rgba(0,240,255,0.011) 4px)" }} />
      )}
      {!isMobile && (
        <div aria-hidden className="pointer-events-none fixed bottom-5 right-5" style={{ zIndex:2, fontFamily:"var(--font-jet-brains-mono), 'Courier New', monospace", fontSize:"9px", lineHeight:"1.7", letterSpacing:"0.1em", color:"rgba(0,240,255,0.3)", textAlign:"right" }}>
          <div>MEM: 10,000 NODES</div>
          <div>V_2.0.26</div>
        </div>
      )}

      {/* Wrapper div for IntersectionObserver */}
      <div ref={canvasRef} style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }}>
        <Canvas
          camera={{ position: [0, 0, 14], fov: isMobile ? 65 : 55 }}
          gl={{ alpha:true, antialias:false, powerPreference:"low-power", stencil:false, depth:false }}
          dpr={isMobile ? 0.75 : Math.min(window.devicePixelRatio, 1.5)}
          frameloop="demand"
          style={{ width:"100%", height:"100%", background:"transparent" }}
        >
          <Scene scrollRef={scrollRef} glitchRef={glitchRef} isMobile={isMobile} visibleRef={visibleRef} />
        </Canvas>
      </div>
    </>
  );
}
