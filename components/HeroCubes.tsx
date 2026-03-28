"use client";

/**
 * HeroCubes — Glass cube cluster hero element
 *
 * Optimizations vs original:
 * - No @react-three/drei (removes ~300KB from chunk)
 * - No MeshTransmissionMaterial (removes 6-pass render loop)
 * - No Environment HDR download
 * - Shared BoxGeometry + MeshPhysicalMaterial (created once for all cubes)
 * - Fixed dpr=1 (no retina doubling)
 * - 15 cubes instead of 22
 */

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Cluster positions ─────────────────────────────────────────────────────
// [x, y, z, rotationSeed, floatDelay]
const CUBES: [number, number, number, number, number][] = [
  // Core
  [ 0.0,  0.0,  0.0,  0.50, 0.00],
  [ 1.1,  0.0,  0.3,  1.20, 0.50],
  [-1.1,  0.0,  0.2,  0.80, 1.00],
  [ 0.0,  1.1,  0.1,  0.30, 0.70],
  [ 0.0, -1.1,  0.3,  1.50, 0.30],
  [ 1.1,  1.1, -0.2,  0.90, 1.20],
  [-1.1,  1.1,  0.4,  0.60, 0.80],
  [ 1.1, -1.1,  0.1,  1.10, 0.40],
  [-1.1, -1.1, -0.1,  0.40, 0.90],
  // Mid ring
  [ 2.2,  0.0, -0.3,  1.30, 0.60],
  [-2.2,  0.0,  0.2,  0.70, 1.10],
  [ 0.0,  2.2,  0.1,  1.00, 0.20],
  [ 2.2,  1.1,  0.5,  1.60, 0.70],
  // Outliers
  [ 3.0,  0.5,  0.4,  0.90, 0.30],
  [-2.0,  1.8,  0.3,  0.60, 1.10],
];

// ── Shared instances — created ONCE, reused by every cube ─────────────────
const sharedGeo = new THREE.BoxGeometry(0.78, 0.78, 0.78);

const sharedMat = new THREE.MeshPhysicalMaterial({
  color:       new THREE.Color(0x2299ff),
  metalness:   0.08,
  roughness:   0.03,
  transparent: true,
  opacity:     0.78,
  side:        THREE.DoubleSide,
  depthWrite:  false,
});

// ── Single cube — uses shared geo + mat ───────────────────────────────────
function GlassCube({
  position,
  rotSeed,
  delay,
}: {
  position: [number, number, number];
  rotSeed: number;
  delay: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const baseY = position[1];

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.35 + delay;
    mesh.current.position.y = baseY + Math.sin(t) * 0.18;
    mesh.current.rotation.x = rotSeed + t * 0.10;
    mesh.current.rotation.y = rotSeed * 0.8 + t * 0.07;
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      geometry={sharedGeo}
      material={sharedMat}
    />
  );
}

// ── Scene: lights + mouse-reactive group ──────────────────────────────────
function Scene() {
  const group = useRef<THREE.Group>(null!);
  const { mouse } = useThree();

  useFrame(() => {
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y, mouse.x * 0.45, 0.04
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x, -mouse.y * 0.25, 0.04
    );
  });

  return (
    <>
      {/* Base ambient */}
      <ambientLight intensity={1.6} />

      {/* Key light — warm white top-right */}
      <directionalLight position={[6, 8, 5]}  intensity={3.5} color="#ffffff" />

      {/* Blue rim lights — brand tertiary #47c4ff */}
      <pointLight position={[-4, -3, 4]}  intensity={5} color="#47c4ff" />
      <pointLight position={[ 5,  4, -3]} intensity={4} color="#4466ff" />
      <pointLight position={[ 0,  0,  7]} intensity={2} color="#99ccff" />

      <group ref={group}>
        {CUBES.map(([x, y, z, rs, delay], i) => (
          <GlassCube key={i} position={[x, y, z]} rotSeed={rs} delay={delay} />
        ))}
      </group>
    </>
  );
}

// ── Canvas ────────────────────────────────────────────────────────────────
export default function HeroCubes() {
  return (
    <Canvas
      camera={{ position: [0, 0, 11], fov: 48 }}
      gl={{
        alpha:            true,
        antialias:        true,
        powerPreference: "high-performance",
        // Disable expensive features we don't need
        stencil:          false,
        depth:            true,
      }}
      dpr={1}          // fixed — no retina doubling
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <Scene />
    </Canvas>
  );
}
