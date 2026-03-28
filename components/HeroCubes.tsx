"use client";

/**
 * HeroCubes — Interactive glass cube cluster
 *
 * Physics: critically-damped spring (no oscillation) + mouse repulsion
 * Uses useFrame delta param (not clock.getDelta) to be frame-rate safe.
 * Rotation uses an accumulator in phys ref — no unbounded +=.
 */

import { useRef, useCallback, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Layout ────────────────────────────────────────────────────────────────
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

// ── Global interaction state ──────────────────────────────────────────────
const MOUSE = new THREE.Vector3(9999, 9999, 0);
const INTERACT = { pressed: false, burstPending: false, burstTime: -999 };

// ── Mouse tracker (inside Canvas, has access to camera + clock) ───────────
const _ray   = new THREE.Raycaster();
const _plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

function MouseTracker() {
  const { camera } = useThree();
  useFrame(({ pointer, clock }) => {
    _ray.setFromCamera(pointer, camera);
    _ray.ray.intersectPlane(_plane, MOUSE);
    if (INTERACT.burstPending) {
      INTERACT.burstTime    = clock.elapsedTime;
      INTERACT.burstPending = false;
    }
  });
  return null;
}

// ── Single cube with spring-damper physics ────────────────────────────────
function GlassCube({
  origin,
  rotSeed,
  floatDelay,
}: {
  origin: [number, number, number];
  rotSeed: number;
  floatDelay: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);

  const phys = useRef({
    pos:  new THREE.Vector3(...origin),
    vel:  new THREE.Vector3(),
    orig: new THREE.Vector3(...origin),
    // rotation accumulator (degrees equivalent, but in radians)
    rotX: rotSeed,
    rotY: rotSeed * 0.8,
    // base spin rate (radians/sec), will lerp up when disturbed
    spinX: 0.18 + rotSeed * 0.05,
    spinY: 0.14 + rotSeed * 0.04,
    // pre-allocated temp vectors
    _tgt: new THREE.Vector3(),
    _disp: new THREE.Vector3(),
    _rep:  new THREE.Vector3(),
  });

  useFrame(({ clock }, rawDelta) => {
    const p  = phys.current;
    // Cap delta — prevents explosion after tab switch / focus loss
    const dt = Math.min(rawDelta, 0.05);
    const t  = clock.elapsedTime * 0.35 + floatDelay;

    // ── 1. Spring target = origin + float offset ─────────────────────────
    p._tgt.copy(p.orig);
    p._tgt.y += Math.sin(t) * 0.18;

    // ── 2. Critically-damped spring  F = -k·x - c·v ──────────────────────
    //   Critical damping: c = 2√(k·m), m=1  →  c = 2√k
    //   k=4, c_crit=4  →  slightly overdamped = no oscillation
    const k = 4.0, c = 5.0;
    p._disp.copy(p.pos).sub(p._tgt);          // displacement from target
    p.vel.addScaledVector(p._disp, -k * dt);  // spring
    p.vel.addScaledVector(p.vel,   -c * dt);  // damping

    // ── 3. Mouse repulsion ────────────────────────────────────────────────
    const sinceClick    = clock.elapsedTime - INTERACT.burstTime;
    const inBurst       = sinceClick < 0.4;
    const repelRadius   = inBurst ? 4.8 : (INTERACT.pressed ? 3.0 : 2.2);
    const repelStrength = inBurst
      ? 6.0 * (1 - sinceClick / 0.4)   // burst fades over 400ms
      : (INTERACT.pressed ? 1.5 : 0.5);

    p._rep.copy(p.pos).sub(MOUSE);
    const dist = p._rep.length();
    if (dist < repelRadius && dist > 0.05) {
      // Force proportional to 1/dist, capped for stability
      const mag = repelStrength / Math.max(dist, 0.5);
      p.vel.addScaledVector(p._rep.normalize(), mag * dt);
    }

    // ── 4. Integrate position ─────────────────────────────────────────────
    p.pos.addScaledVector(p.vel, dt);
    mesh.current.position.copy(p.pos);

    // ── 5. Rotation — accumulator, not unbounded += ───────────────────────
    const speed = p.vel.length();
    // Target spin rate rises with disturbance, returns to base slowly
    const targetSpinX = 0.18 + rotSeed * 0.05 + speed * 2.5;
    const targetSpinY = 0.14 + rotSeed * 0.04 + speed * 1.8;
    p.spinX = THREE.MathUtils.lerp(p.spinX, targetSpinX, 0.08);
    p.spinY = THREE.MathUtils.lerp(p.spinY, targetSpinY, 0.08);
    p.rotX += p.spinX * dt;
    p.rotY += p.spinY * dt;
    mesh.current.rotation.x = p.rotX;
    mesh.current.rotation.y = p.rotY;
  });

  return <mesh ref={mesh} position={origin} geometry={GEO} material={MAT} />;
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
        <GlassCube key={i} origin={[x, y, z]} rotSeed={rs} floatDelay={fd} />
      ))}
    </>
  );
}

// ── Canvas ────────────────────────────────────────────────────────────────
export default function HeroCubes() {
  const [cursor, setCursor] = useState<"grab" | "grabbing">("grab");

  const onDown = useCallback(() => {
    INTERACT.pressed      = true;
    INTERACT.burstPending = true;
    setCursor("grabbing");
  }, []);

  const onUp = useCallback(() => {
    INTERACT.pressed = false;
    setCursor("grab");
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 11], fov: 48 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance", stencil: false }}
      dpr={1}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      style={{
        background:  "transparent",
        width:       "100%",
        height:      "100%",
        cursor,
        touchAction: "none",
      }}
    >
      <Scene />
    </Canvas>
  );
}
