"use client";

/**
 * HeroCubes — Individual cube grab & throw
 *
 * Interaction model:
 *  - Hover  → cursor becomes "grab"
 *  - Click + drag on a SPECIFIC cube → that cube follows your mouse
 *  - Release → cube gets thrown with mouse velocity, then springs back
 *  - Other cubes are NOT affected while dragging
 *
 * Uses react-three-fiber's built-in mesh raycasting (onPointerDown/Up/Enter/Leave)
 * so no manual ray intersection is needed for per-cube clicks.
 */

import { useRef, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Cube positions ────────────────────────────────────────────────────────
const CUBES: [number, number, number, number, number][] = [
  //  x      y      z    rotSeed  delay
  [ 0.0,  0.0,  0.0,  0.50, 0.00],
  [ 1.1,  0.0,  0.3,  1.20, 0.50],
  [-1.1,  0.0,  0.2,  0.80, 1.00],
  [ 0.0,  1.1,  0.1,  0.30, 0.70],
  [ 0.0, -1.1,  0.3,  1.50, 0.30],
  [ 1.1,  1.1, -0.2,  0.90, 1.20],
  [-1.1,  1.1,  0.4,  0.60, 0.80],
  [ 1.1, -1.1,  0.1,  1.10, 0.40],
  [-1.1, -1.1, -0.1,  0.40, 0.90],
  [ 2.2,  0.0, -0.3,  1.30, 0.60],
  [-2.2,  0.0,  0.2,  0.70, 1.10],
  [ 0.0,  2.2,  0.1,  1.00, 0.20],
  [ 2.2,  1.1,  0.5,  1.60, 0.70],
  [ 3.0,  0.5,  0.4,  0.90, 0.30],
  [-2.0,  1.8,  0.3,  0.60, 1.10],
];

// ── Shared GPU resources ──────────────────────────────────────────────────
const GEO = new THREE.BoxGeometry(0.78, 0.78, 0.78);
const MAT = new THREE.MeshPhysicalMaterial({
  color:       new THREE.Color(0x2299ff),
  metalness:   0.08,
  roughness:   0.03,
  transparent: true,
  opacity:     0.80,
  side:        THREE.DoubleSide,
  depthWrite:  false,
});

// ── Global state ──────────────────────────────────────────────────────────
const MOUSE_WORLD = new THREE.Vector3(9999, 9999, 0); // 3D mouse position
const MOUSE_VEL   = new THREE.Vector3();               // mouse velocity (for throw)
const _PREV_MOUSE = new THREE.Vector3();
const GRABBED     = { index: -1 };                     // which cube is being dragged

// ── Mouse tracker — runs inside Canvas ───────────────────────────────────
const _ray   = new THREE.Raycaster();
const _plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // z=0 plane

function MouseTracker() {
  const { camera } = useThree();

  useFrame(({ pointer }, rawDt) => {
    const dt = Math.max(rawDt, 0.001);
    _PREV_MOUSE.copy(MOUSE_WORLD);
    _ray.setFromCamera(pointer, camera);
    _ray.ray.intersectPlane(_plane, MOUSE_WORLD);
    // Mouse velocity for throw-on-release (world units / second)
    MOUSE_VEL.copy(MOUSE_WORLD).sub(_PREV_MOUSE).divideScalar(dt);
  });

  return null;
}

// ── Single interactive cube ───────────────────────────────────────────────
function GlassCube({
  index,
  origin,
  rotSeed,
  floatDelay,
}: {
  index:      number;
  origin:     [number, number, number];
  rotSeed:    number;
  floatDelay: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);

  // Per-cube physics state — all pre-allocated (no GC)
  const p = useRef({
    pos:   new THREE.Vector3(...origin),
    vel:   new THREE.Vector3(),
    orig:  new THREE.Vector3(...origin),
    rotX:  rotSeed,
    rotY:  rotSeed * 0.8,
    spinX: 0.2  + rotSeed * 0.05,   // radians/sec
    spinY: 0.15 + rotSeed * 0.04,
    _tgt:  new THREE.Vector3(),
    _disp: new THREE.Vector3(),
  }).current;

  useFrame(({ clock }, rawDt) => {
    const dt = Math.min(rawDt, 0.05); // cap to prevent explosion on tab-switch
    const t  = clock.elapsedTime * 0.35 + floatDelay;
    const isGrabbed = GRABBED.index === index;

    if (isGrabbed) {
      // ── GRABBED: smooth follow mouse ──────────────────────────────────
      p.pos.lerp(MOUSE_WORLD, 0.22);
      // Track mouse velocity so throw works on release
      p.vel.lerp(MOUSE_VEL, 0.25);

      // Scale up slightly — tactile grab feedback
      mesh.current.scale.lerp({ x: 1.08, y: 1.08, z: 1.08 } as any, 0.15);
    } else {
      // ── FREE: critically-damped spring toward floating origin ─────────
      p._tgt.copy(p.orig);
      p._tgt.y += Math.sin(t) * 0.18; // gentle float

      p._disp.copy(p.pos).sub(p._tgt);
      p.vel.addScaledVector(p._disp, -4.5 * dt); // spring force
      p.vel.addScaledVector(p.vel,   -5.5 * dt); // damping  (overdamped → no oscillation)
      p.pos.addScaledVector(p.vel, dt);

      mesh.current.scale.lerp({ x: 1.0, y: 1.0, z: 1.0 } as any, 0.15);
    }

    mesh.current.position.copy(p.pos);

    // ── Rotation — accumulator (no unbounded +=) ──────────────────────
    const speed  = p.vel.length();
    const grabbed = isGrabbed ? 4.0 : 0.0;
    p.spinX = THREE.MathUtils.lerp(p.spinX, 0.18 + rotSeed * 0.05 + speed * 2.5 + grabbed, 0.07);
    p.spinY = THREE.MathUtils.lerp(p.spinY, 0.14 + rotSeed * 0.04 + speed * 1.8 + grabbed, 0.07);
    p.rotX += p.spinX * dt;
    p.rotY += p.spinY * dt;
    mesh.current.rotation.x = p.rotX;
    mesh.current.rotation.y = p.rotY;
  });

  // ── Mesh events — r3f handles raycasting internally ───────────────────
  const onDown = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation();   // prevent canvas from firing its own onPointerDown
    GRABBED.index = index;
    document.body.style.cursor = "grabbing";
  }, [index]);

  const onUp = useCallback(() => {
    if (GRABBED.index === index) {
      GRABBED.index = -1;
      // vel is already loaded with MOUSE_VEL from useFrame → throw works naturally
      document.body.style.cursor = "grab";
    }
  }, [index]);

  const onEnter = useCallback(() => {
    if (GRABBED.index === -1) document.body.style.cursor = "grab";
  }, []);

  const onLeave = useCallback(() => {
    if (GRABBED.index === -1) document.body.style.cursor = "default";
  }, []);

  return (
    <mesh
      ref={mesh}
      position={origin}
      geometry={GEO}
      material={MAT}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    />
  );
}

// ── Scene ─────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={1.6} />
      <directionalLight position={[6, 8, 5]}  intensity={3.5} color="#ffffff" />
      <pointLight      position={[-4,-3, 4]}  intensity={5.0} color="#47c4ff" />
      <pointLight      position={[ 5, 4,-3]}  intensity={4.0} color="#4466ff" />
      <pointLight      position={[ 0, 0, 7]}  intensity={2.0} color="#99ccff" />
      <MouseTracker />
      {CUBES.map(([x, y, z, rs, fd], i) => (
        <GlassCube
          key={i}
          index={i}
          origin={[x, y, z]}
          rotSeed={rs}
          floatDelay={fd}
        />
      ))}
    </>
  );
}

// ── Canvas ────────────────────────────────────────────────────────────────
export default function HeroCubes() {
  // Global pointer-up fallback (fires if mouse releases outside the cube)
  const onUp = useCallback(() => {
    GRABBED.index = -1;
    document.body.style.cursor = "default";
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 11], fov: 48 }}
      gl={{
        alpha:           true,
        antialias:       true,
        powerPreference: "high-performance",
        stencil:         false,
      }}
      dpr={1}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      style={{
        background:  "transparent",
        width:       "100%",
        height:      "100%",
        touchAction: "none",
      }}
    >
      <Scene />
    </Canvas>
  );
}
