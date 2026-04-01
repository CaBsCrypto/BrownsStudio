"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Desktop: 20 cubos — zona derecha (x > 1.5) + 4 acentos borde izq lejano ──
const FLOATS_DESKTOP: [number, number, number, number, number][] = [
  [ 2.0,  0.2,  0.0,  0.50, 0.00],
  [ 3.2,  1.0,  0.5,  1.20, 0.55],
  [ 1.8,  1.8,  0.3,  0.80, 1.10],
  [ 2.5, -0.8,  0.2,  0.30, 0.70],
  [ 4.0,  0.5,  0.4,  1.50, 0.35],
  [ 3.5,  2.2, -0.3,  0.90, 1.25],
  [ 1.5, -2.0,  0.5,  0.60, 0.85],
  [ 4.5,  1.2,  0.2,  1.10, 0.40],
  [ 3.0, -1.5, -0.2,  0.40, 0.95],
  [ 2.2,  2.8, -0.4,  1.30, 0.60],
  [ 4.8, -0.8,  0.3,  0.70, 1.15],
  [ 1.6,  0.8,  0.2,  1.00, 0.25],
  [ 3.8, -2.5,  0.6,  1.60, 0.75],
  [ 5.2,  0.2,  0.5,  0.90, 0.30],
  [ 2.8,  1.5,  0.4,  0.60, 1.10],
  [ 4.2, -1.8,  0.3,  0.80, 0.50],
  [ 5.5,  2.5,  0.4,  1.10, 0.90],
  [ 5.8, -1.0,  0.2,  0.50, 1.35],
  [ 6.0,  0.8, -0.3,  1.25, 0.65],
  [ 5.6, -2.8, -0.3,  1.40, 1.05],
];

// ── Móvil: 8 cubos en columna derecha (texto ocupa 70% → cubos en x ≈ 1.3–1.7)
const FLOATS_MOBILE: [number, number, number, number, number][] = [
  [ 1.4,  3.8,  0.5,  1.10, 0.40],
  [ 1.5,  2.8,  0.0,  0.50, 0.00],
  [ 1.3,  1.8,  0.3,  0.80, 1.10],
  [ 1.6,  0.8,  0.2,  1.25, 0.65],
  [ 1.4, -0.2, -0.2,  0.40, 0.95],
  [ 1.6, -1.2,  0.4,  1.20, 0.55],
  [ 1.5, -2.2,  0.3,  1.50, 0.35],
  [ 1.7, -3.2,  0.2,  0.90, 1.25],
];

// ── Shared GPU resources ──────────────────────────────────────────────────────
const GEO = new THREE.BoxGeometry(0.48, 0.48, 0.48);
const MAT = new THREE.MeshPhysicalMaterial({
  color:       new THREE.Color(0x2299ff),
  metalness:   0.08,
  roughness:   0.03,
  transparent: true,
  opacity:     0.82,
  side:        THREE.DoubleSide,
  depthWrite:  false,
});

// ── Global drag state ─────────────────────────────────────────────────────────
const MOUSE_WORLD = new THREE.Vector3(9999, 9999, 0);
const MOUSE_VEL   = new THREE.Vector3();
const _PREV       = new THREE.Vector3();
const GRABBED     = { index: -1 };

// ── Mouse tracker ─────────────────────────────────────────────────────────────
const _ray   = new THREE.Raycaster();
const _plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

function MouseTracker() {
  const { camera } = useThree();
  useFrame(({ pointer }, rawDt) => {
    const dt = Math.max(rawDt, 0.001);
    _PREV.copy(MOUSE_WORLD);
    _ray.setFromCamera(pointer, camera);
    _ray.ray.intersectPlane(_plane, MOUSE_WORLD);
    MOUSE_VEL.copy(MOUSE_WORLD).sub(_PREV).divideScalar(dt);
  });
  return null;
}

// ── Single cube ───────────────────────────────────────────────────────────────
type FloatEntry = [number, number, number, number, number];

function FloatCube({ index, entry }: { index: number; entry: FloatEntry }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [ox, oy, oz, rotSeed, delay] = entry;

  const p = useRef({
    pos:  new THREE.Vector3(ox, oy, oz),
    vel:  new THREE.Vector3(),
    orig: new THREE.Vector3(ox, oy, oz),
    rotX: rotSeed,
    rotY: rotSeed * 0.8,
    spinX: 0.18 + rotSeed * 0.05,
    spinY: 0.14 + rotSeed * 0.04,
    _tgt:  new THREE.Vector3(),
    _disp: new THREE.Vector3(),
  }).current;

  // Reset origin when entry changes (responsive switch)
  useEffect(() => {
    p.orig.set(ox, oy, oz);
  }, [ox, oy, oz, p]);

  useFrame(({ clock }, rawDt) => {
    const dt        = Math.min(rawDt, 0.05);
    const t         = clock.elapsedTime * 0.3 + delay;
    const isGrabbed = GRABBED.index === index;

    if (isGrabbed) {
      p.pos.lerp(MOUSE_WORLD, 0.22);
      p.vel.lerp(MOUSE_VEL, 0.25);
      mesh.current.scale.lerp({ x: 1.1, y: 1.1, z: 1.1 } as any, 0.15);
    } else {
      // Gentle float — sine on Y, slow drift
      p._tgt.copy(p.orig);
      p._tgt.y += Math.sin(t) * 0.22;
      p._tgt.x += Math.cos(t * 0.7) * 0.08;

      p._disp.copy(p.pos).sub(p._tgt);
      p.vel.addScaledVector(p._disp, -4.5 * dt);
      p.vel.addScaledVector(p.vel,   -5.5 * dt);
      p.pos.addScaledVector(p.vel, dt);

      mesh.current.scale.lerp({ x: 1.0, y: 1.0, z: 1.0 } as any, 0.12);
    }

    mesh.current.position.copy(p.pos);

    // Rotation — speeds up on grab/throw
    const speed  = p.vel.length();
    const boost  = isGrabbed ? 4.0 : 0.0;
    const tSpinX = 0.18 + rotSeed * 0.05 + speed * 2.5 + boost;
    const tSpinY = 0.14 + rotSeed * 0.04 + speed * 1.8 + boost;
    p.spinX = THREE.MathUtils.lerp(p.spinX, tSpinX, 0.07);
    p.spinY = THREE.MathUtils.lerp(p.spinY, tSpinY, 0.07);
    p.rotX += p.spinX * dt;
    p.rotY += p.spinY * dt;
    mesh.current.rotation.x = p.rotX;
    mesh.current.rotation.y = p.rotY;
  });

  const onDown = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    GRABBED.index = index;
    document.body.style.cursor = "grabbing";
  }, [index]);

  const onUp = useCallback(() => {
    if (GRABBED.index === index) {
      GRABBED.index = -1;
      document.body.style.cursor = "grab";
    }
  }, [index]);

  return (
    <mesh
      ref={mesh}
      position={[ox, oy, oz]}
      geometry={GEO}
      material={MAT}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerEnter={() => { if (GRABBED.index === -1) document.body.style.cursor = "grab"; }}
      onPointerLeave={() => { if (GRABBED.index === -1) document.body.style.cursor = "default"; }}
    />
  );
}

// ── Scene ─────────────────────────────────────────────────────────────────────
function Scene({ floats }: { floats: FloatEntry[] }) {
  return (
    <>
      <ambientLight intensity={1.6} />
      <directionalLight position={[6, 8, 5]}  intensity={3.5} color="#ffffff" />
      <pointLight      position={[-4,-3, 4]}  intensity={5.0} color="#47c4ff" />
      <pointLight      position={[ 5, 4,-3]}  intensity={4.0} color="#4466ff" />
      <pointLight      position={[ 0, 0, 7]}  intensity={2.0} color="#99ccff" />
      <MouseTracker />
      {floats.map((entry, i) => <FloatCube key={i} index={i} entry={entry} />)}
    </>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────
export default function HeroCubes() {
  const [floats, setFloats] = useState<FloatEntry[]>(FLOATS_DESKTOP);

  useEffect(() => {
    const update = () =>
      setFloats(window.innerWidth < 1024 ? FLOATS_MOBILE : FLOATS_DESKTOP);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const onUp = useCallback(() => {
    GRABBED.index = -1;
    document.body.style.cursor = "default";
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance", stencil: false }}
      dpr={1}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      style={{ background: "transparent", width: "100%", height: "100%", touchAction: "none" }}
    >
      <Scene floats={floats} />
    </Canvas>
  );
}
