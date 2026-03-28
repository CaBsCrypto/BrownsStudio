"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

// ── Cluster diamond pattern — mixed grid + outliers ──────────────────────
// [x, y, z, rotationSeed, floatDelay]
const CUBES: [number, number, number, number, number][] = [
  // Core cluster
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
  [ 0.0, -2.2, -0.2,  0.50, 1.40],
  [ 2.2,  1.1,  0.5,  1.60, 0.70],
  [-2.2, -1.1, -0.3,  0.30, 1.30],
  [ 1.1,  2.2,  0.3,  0.80, 0.50],
  [-1.1, -2.2,  0.1,  1.20, 1.00],
  // Scattered outliers for depth
  [ 3.3,  0.5,  0.6,  0.90, 0.30],
  [-3.0,  1.1, -0.2,  0.60, 0.80],
  [ 0.5, -3.1,  0.4,  1.10, 0.60],
  [ 2.5,  2.5, -0.5,  0.45, 1.10],
  [-2.5,  2.0,  0.5,  1.25, 0.40],
];

// ── Single glass cube ─────────────────────────────────────────────────────
function GlassCube({
  position,
  rotSeed,
  delay,
  size = 0.78,
}: {
  position: [number, number, number];
  rotSeed: number;
  delay: number;
  size?: number;
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
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[size, size, size]} />
      <MeshTransmissionMaterial
        backside
        samples={6}
        thickness={0.45}
        roughness={0.04}
        transmission={0.93}
        chromaticAberration={0.07}
        color={new THREE.Color("#3a9dff")}
        attenuationColor={new THREE.Color("#1155dd")}
        attenuationDistance={1.8}
        envMapIntensity={2.0}
        ior={1.5}
      />
    </mesh>
  );
}

// ── Scene: lights + mouse-reactive group ──────────────────────────────────
function Scene() {
  const group = useRef<THREE.Group>(null!);
  const { mouse } = useThree();

  useFrame(() => {
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mouse.x * 0.45,
      0.035
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -mouse.y * 0.25,
      0.035
    );
  });

  return (
    <>
      {/* Ambient + key light */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[6, 8, 5]} intensity={2.5} color="#ffffff" />

      {/* Colored fills — blue/cyan to match brand */}
      <pointLight position={[-5, -4, 3]} intensity={3} color="#47c4ff" />
      <pointLight position={[5,  4, -3]} intensity={2} color="#4466ff" />
      <pointLight position={[0,  0,  8]} intensity={1} color="#aaccff" />

      {/* HDR environment for reflections */}
      <Environment preset="city" />

      <group ref={group}>
        {CUBES.map(([x, y, z, rs, delay], i) => {
          const isFar = Math.abs(x) > 2.8 || Math.abs(y) > 2.8;
          return (
            <GlassCube
              key={i}
              position={[x, y, z]}
              rotSeed={rs}
              delay={delay}
              size={isFar ? 0.55 : 0.78}
            />
          );
        })}
      </group>
    </>
  );
}

// ── Canvas export — transparent bg, lazy-loaded ───────────────────────────
export default function HeroCubes() {
  return (
    <Canvas
      camera={{ position: [0, 0, 11], fov: 48 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <Scene />
    </Canvas>
  );
}
