"use client";

/**
 * HeroCubes — Interactive glass cube cluster
 *
 * Physics implemented manually (zero extra libraries):
 *  - Spring force pulls each cube back to its floating origin
 *  - Repulsion force pushes cubes away from the mouse cursor
 *  - Click burst: temporary spike in repulsion radius + strength
 *  - Rotation speed increases when cubes are disturbed
 *  - All Vector3 ops use pre-allocated objects (no GC pressure)
 */

import { useRef, useCallback, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Cube layout ───────────────────────────────────────────────────────────
// [x, y, z, rotSeed, floatDelay]
const CUBES: [number, number, number, number, number][] = [
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

// ── Shared GPU resources — ONE geometry + ONE material for ALL cubes ──────
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

// ── Global interaction state (mutable, avoids React re-renders) ───────────
const MOUSE = new THREE.Vector3(9999, 9999, 0); // 3-D world position
const INTERACT = {
  pressed:   false,
  burstTime: -999, // set to clock.elapsedTime on click (synced inside useFrame)
  clickPending: false, // flag for MouseTracker to grab the clock time
};

// ── Tracks real-world mouse position via raycasting ───────────────────────
const _raycaster = new THREE.Raycaster();
const _plane     = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // z=0

function MouseTracker() {
  const { camera } = useThree();

  useFrame(({ pointer, clock }) => {
    _raycaster.setFromCamera(pointer, camera);
    _raycaster.ray.intersectPlane(_plane, MOUSE);
    // Sync burst time with Three.js clock when click is pending
    if (INTERACT.clickPending) {
      INTERACT.burstTime    = clock.elapsedTime;
      INTERACT.clickPending = false;
    }
  });

  return null;
}

// ── Single interactive cube ───────────────────────────────────────────────
function GlassCube({
  origin,
  rotSeed,
  delay,
}: {
  origin: [number, number, number];
  rotSeed: number;
  delay: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);

  // Per-cube physics state — pre-allocated, no GC
  const phys = useRef({
    pos:    new THREE.Vector3(...origin),
    vel:    new THREE.Vector3(),
    orig:   new THREE.Vector3(...origin),
    // temp vectors
    _tgt:   new THREE.Vector3(),
    _spr:   new THREE.Vector3(),
    _rep:   new THREE.Vector3(),
  });

  useFrame(({ clock }) => {
    const p  = phys.current;
    const t  = clock.elapsedTime * 0.35 + delay;
    const dt = clock.getDelta();          // ~0.016 at 60fps

    // ── 1. Spring target = original pos + gentle sine float ─────────────
    p._tgt.copy(p.orig);
    p._tgt.y += Math.sin(t) * 0.18;

    // ── 2. Spring force (Hooke) ──────────────────────────────────────────
    p._spr.copy(p._tgt).sub(p.pos).multiplyScalar(0.065);
    p.vel.add(p._spr);

    // ── 3. Mouse repulsion ───────────────────────────────────────────────
    const sinceClick  = clock.elapsedTime - INTERACT.burstTime;
    const inBurst     = sinceClick < 0.5;           // 500ms burst window
    const repelRadius = inBurst ? 5.0 : 2.4;
    const repelStrength = inBurst
      ? 0.18 * (1 - sinceClick / 0.5)              // fade out burst
      : (INTERACT.pressed ? 0.08 : 0.032);

    p._rep.copy(p.pos).sub(MOUSE);
    const dist = p._rep.length();

    if (dist < repelRadius && dist > 0.05) {
      p._rep
        .normalize()
        .multiplyScalar(repelStrength / Math.max(dist * 0.35, 0.15));
      p.vel.add(p._rep);
    }

    // ── 4. Damping + integrate ───────────────────────────────────────────
    p.vel.multiplyScalar(0.87);
    p.pos.addScaledVector(p.vel, 60 * dt); // frame-rate independent

    // ── 5. Apply to mesh ─────────────────────────────────────────────────
    mesh.current.position.copy(p.pos);

    const speed = p.vel.length();
    mesh.current.rotation.x += 0.10 * 0.35 + speed * 3.0;
    mesh.current.rotation.y += 0.07 * 0.35 + speed * 2.0;
  });

  return (
    <mesh
      ref={mesh}
      position={origin}
      geometry={GEO}
      material={MAT}
    />
  );
}

// ── Main scene ────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={1.6} />
      <directionalLight position={[6, 8, 5]}  intensity={3.5} color="#ffffff" />
      <pointLight      position={[-4, -3, 4]} intensity={5.0} color="#47c4ff" />
      <pointLight      position={[ 5,  4,-3]} intensity={4.0} color="#4466ff" />
      <pointLight      position={[ 0,  0, 7]} intensity={2.0} color="#99ccff" />

      <MouseTracker />

      {CUBES.map(([x, y, z, rs, delay], i) => (
        <GlassCube key={i} origin={[x, y, z]} rotSeed={rs} delay={delay} />
      ))}
    </>
  );
}

// ── Canvas wrapper ────────────────────────────────────────────────────────
export default function HeroCubes() {
  const [cursor, setCursor] = useState<"grab" | "grabbing">("grab");

  const onDown = useCallback(() => {
    INTERACT.pressed      = true;
    INTERACT.clickPending = true; // MouseTracker grabs the clock on next frame
    setCursor("grabbing");
  }, []);

  const onUp = useCallback(() => {
    INTERACT.pressed = false;
    setCursor("grab");
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
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      style={{
        background:  "transparent",
        width:       "100%",
        height:      "100%",
        cursor:      cursor,
        touchAction: "none",
      }}
    >
      <Scene />
    </Canvas>
  );
}
