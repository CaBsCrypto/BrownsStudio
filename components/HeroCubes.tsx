"use client";

/**
 * HeroCubes — Individual cube grab & throw + BS formation mode
 *
 * Interaction model:
 *  - Hover  → cursor becomes "grab"
 *  - Drag a cube → that cube follows your mouse; release = throw
 *  - Other cubes are NOT affected while dragging
 *  - forming=true → cubes lerp into the shape of "BS"
 */

import { useRef, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Grid spacing ──────────────────────────────────────────────────────────────
const S  = 1.22;   // cell size (cube 0.78 + gap 0.44 — cubes clearly separated)
const BX = -2.2;   // B letter centre-x
const SX =  2.2;   // S letter centre-x

// ── BS formation positions (24 cubes, indices 0-23) ───────────────────────────
//
//   B (13 cubes) — 3 FULL horizontal bars, same visual weight as S:
//     ███   row 0  ← full top bar
//     █·█   row 1  ← upper bump (spine + right tip)
//     ███   row 2  ← full midbar  (divides the two bumps — essential for B)
//     █·█   row 3  ← lower bump (spine + right tip)
//     ███   row 4  ← full bottom bar
//
//   S (11 cubes):
//     ███   row 0  ← full top
//     █··   row 1  ← top-left curve
//     ███   row 2  ← full mid
//     ··█   row 3  ← bottom-right curve
//     ███   row 4  ← full bottom
//
//   Both letters have 3 anchoring horizontal bars — consistent visual weight.
//   B is distinguished by bilateral right-side bumps (rows 1+3 both have col2).
//   S is distinguished by diagonal single cubes (row1=left, row3=right).
//
const BS_POSITIONS: [number, number, number][] = [
  // ── B (indices 0-12) ───────────────────────────────────────────────────────
  // row 0 : ███  full top bar
  [BX - S,  2 * S, 0], [BX,  2 * S, 0], [BX + S,  2 * S, 0],
  // row 1 : █·█  spine + upper-bump tip
  [BX - S,      S, 0],                   [BX + S,      S, 0],
  // row 2 : ███  full midbar — divides upper and lower bumps
  [BX - S,      0, 0], [BX,      0, 0], [BX + S,      0, 0],
  // row 3 : █·█  spine + lower-bump tip
  [BX - S,     -S, 0],                   [BX + S,     -S, 0],
  // row 4 : ███  full bottom bar
  [BX - S, -2 * S, 0], [BX, -2 * S, 0], [BX + S, -2 * S, 0],

  // ── S (indices 13-23) ──────────────────────────────────────────────────────
  // row 0 : ███
  [SX - S,  2 * S, 0], [SX,  2 * S, 0], [SX + S,  2 * S, 0],
  // row 1 : █··
  [SX - S,      S, 0],
  // row 2 : ███
  [SX - S,      0, 0], [SX,      0, 0], [SX + S,      0, 0],
  // row 3 : ··█
  [SX + S,     -S, 0],
  // row 4 : ███
  [SX - S, -2 * S, 0], [SX, -2 * S, 0], [SX + S, -2 * S, 0],
];

// ── Float positions (24 cubes) ────────────────────────────────────────────────
//  x      y      z    rotSeed  delay
const FLOAT_POS: [number, number, number, number, number][] = [
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
  [ 2.2, -1.1,  0.2,  0.80, 0.50],
  [-2.2, -1.1,  0.3,  1.10, 0.90],
  [ 0.0, -2.2,  0.1,  0.50, 1.30],
  [ 3.0, -0.5,  0.2,  1.20, 0.60],
  [-3.0,  0.5,  0.3,  0.70, 0.40],
  [ 1.1,  2.2, -0.2,  1.40, 1.00],
  [-0.5, -3.0,  0.3,  0.95, 0.75],
  [ 2.5,  2.5, -0.1,  0.85, 0.35],   // #23 — for B's 2 extra cubes
  [-2.5, -2.5,  0.4,  1.15, 0.55],   // #24
];

// ── Shared GPU resources ──────────────────────────────────────────────────────
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

// ── Global state ──────────────────────────────────────────────────────────────
const MOUSE_WORLD = new THREE.Vector3(9999, 9999, 0);
const MOUSE_VEL   = new THREE.Vector3();
const _PREV_MOUSE = new THREE.Vector3();
const GRABBED     = { index: -1 };
const FORMATION   = { active: false };

// ── Mouse tracker ─────────────────────────────────────────────────────────────
const _ray   = new THREE.Raycaster();
const _plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

function MouseTracker() {
  const { camera } = useThree();
  useFrame(({ pointer }, rawDt) => {
    const dt = Math.max(rawDt, 0.001);
    _PREV_MOUSE.copy(MOUSE_WORLD);
    _ray.setFromCamera(pointer, camera);
    _ray.ray.intersectPlane(_plane, MOUSE_WORLD);
    MOUSE_VEL.copy(MOUSE_WORLD).sub(_PREV_MOUSE).divideScalar(dt);
  });
  return null;
}

// ── Formation controller ──────────────────────────────────────────────────────
function FormationController({ forming }: { forming: boolean }) {
  useEffect(() => { FORMATION.active = forming; }, [forming]);
  return null;
}

// ── Single interactive cube ───────────────────────────────────────────────────
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

  // All physics state pre-allocated — zero GC per frame
  const p = useRef({
    pos:       new THREE.Vector3(...origin),
    vel:       new THREE.Vector3(),
    orig:      new THREE.Vector3(...origin),   // lerps between float and BS target
    floatOrig: new THREE.Vector3(...origin),   // immutable float anchor
    bsOrig:    new THREE.Vector3(...BS_POSITIONS[index]), // immutable BS target
    rotX:      rotSeed,
    rotY:      rotSeed * 0.8,
    spinX:     0.2  + rotSeed * 0.05,
    spinY:     0.15 + rotSeed * 0.04,
    _tgt:      new THREE.Vector3(),
    _disp:     new THREE.Vector3(),
  }).current;

  useFrame(({ clock }, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const t  = clock.elapsedTime * 0.35 + floatDelay;
    const isGrabbed = GRABBED.index === index;
    const forming   = FORMATION.active;

    // ── Animate p.orig between float position and BS letter position ──────────
    if (forming) {
      p.orig.lerp(p.bsOrig,    0.08);  // faster assembly
    } else {
      p.orig.lerp(p.floatOrig, 0.06);
    }

    // ── Position update ───────────────────────────────────────────────────────
    if (isGrabbed) {
      p.pos.lerp(MOUSE_WORLD, 0.22);
      p.vel.lerp(MOUSE_VEL,   0.25);
      mesh.current.scale.lerp({ x: 1.08, y: 1.08, z: 1.08 } as any, 0.15);
    } else {
      p._tgt.copy(p.orig);
      if (!forming) p._tgt.y += Math.sin(t) * 0.18; // gentle float only when scattered

      p._disp.copy(p.pos).sub(p._tgt);
      p.vel.addScaledVector(p._disp, -4.5 * dt); // spring force
      p.vel.addScaledVector(p.vel,   -5.5 * dt); // overdamped — no oscillation
      p.pos.addScaledVector(p.vel, dt);

      mesh.current.scale.lerp({ x: 1.0, y: 1.0, z: 1.0 } as any, 0.15);
    }

    mesh.current.position.copy(p.pos);

    // ── Rotation ──────────────────────────────────────────────────────────────
    // In formation mode: exponential decay to 0 (reaches ~0 in ~0.4s)
    // Free mode: lerp toward speed-driven target
    const speed   = p.vel.length();
    const grabbed = isGrabbed ? 4.0 : 0.0;

    if (forming && !isGrabbed) {
      p.spinX *= 0.82;  // fast decay — (0.82)^30 ≈ 0.004 at 60fps → stopped in 0.5s
      p.spinY *= 0.82;
    } else {
      const targetSpinX = 0.18 + rotSeed * 0.05 + speed * 2.5 + grabbed;
      const targetSpinY = 0.14 + rotSeed * 0.04 + speed * 1.8 + grabbed;
      p.spinX = THREE.MathUtils.lerp(p.spinX, targetSpinX, 0.07);
      p.spinY = THREE.MathUtils.lerp(p.spinY, targetSpinY, 0.07);
    }
    p.rotX += p.spinX * dt;
    p.rotY += p.spinY * dt;
    mesh.current.rotation.x = p.rotX;
    mesh.current.rotation.y = p.rotY;
  });

  // ── Mesh events — r3f handles raycasting internally ───────────────────────
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

// ── Scene ─────────────────────────────────────────────────────────────────────
function Scene({ forming }: { forming: boolean }) {
  return (
    <>
      <ambientLight intensity={1.6} />
      <directionalLight position={[6, 8, 5]}  intensity={3.5} color="#ffffff" />
      <pointLight      position={[-4,-3, 4]}  intensity={5.0} color="#47c4ff" />
      <pointLight      position={[ 5, 4,-3]}  intensity={4.0} color="#4466ff" />
      <pointLight      position={[ 0, 0, 7]}  intensity={2.0} color="#99ccff" />
      <MouseTracker />
      <FormationController forming={forming} />
      {FLOAT_POS.map(([x, y, z, rs, fd], i) => (
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

// ── Canvas ────────────────────────────────────────────────────────────────────
export default function HeroCubes({ forming = false }: { forming?: boolean }) {
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
      <Scene forming={forming} />
    </Canvas>
  );
}
