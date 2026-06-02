import React, { useRef } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Self-contained 3D scene — NO drei imports
const Scene: React.FC = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Stable particle positions (computed once)
  const positions = React.useMemo(() => {
    const count = 150;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  // Build the Points object imperatively to avoid r3f v9 JSX bufferAttribute API breaking change
  const particlePoints = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: "#7dd3fc",
      size: 0.055,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    return new THREE.Points(geo, mat);
  }, [positions]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.4;
      sphereRef.current.rotation.x = Math.sin(t * 0.25) * 0.15;
      sphereRef.current.position.y = Math.sin(t * 0.7) * 0.12;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5;
      ring1Ref.current.rotation.y = t * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.3;
      ring2Ref.current.rotation.z = t * 0.35;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.08;
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-4, -4, -4]} intensity={1.2} color="#00d2ff" />
      <pointLight position={[4, 4, 2]} intensity={0.6} color="#38bdf8" />

      {/* Central glowing sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#00d2ff"
          emissive="#006699"
          emissiveIntensity={0.9}
          roughness={0.05}
          metalness={0.95}
        />
      </mesh>

      {/* Orbit ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[3.0, 0.018, 16, 120]} />
        <meshBasicMaterial color="#00d2ff" transparent opacity={0.45} />
      </mesh>

      {/* Orbit ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.9, 0.012, 16, 120]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>

      {/* Particle cloud — built imperatively to avoid r3f v9 bufferAttribute API issues */}
      <primitive ref={pointsRef} object={particlePoints} />
    </>
  );
};

export const DentalPipeline3D: React.FC = () => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      {/* 3D WebGL Canvas */}
      <ThreeCanvas width={width} height={height} camera={{ position: [0, 0, 7], fov: 55 }}>
        <Scene />
      </ThreeCanvas>

      {/* Overlay text — sits on top of the canvas */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: "160px" }}>
        <div
          style={{
            backgroundColor: "rgba(2, 6, 23, 0.7)",
            padding: "32px 56px",
            borderRadius: "24px",
            border: "1px solid rgba(0, 210, 255, 0.35)",
          }}
        >
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "62px",
              color: "#ffffff",
              margin: 0,
              textAlign: "center",
            }}
          >
            IA <span style={{ color: "#00d2ff" }}>+</span> Agenda Clínica
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "32px",
              color: "#94a3b8",
              margin: "12px 0 0 0",
              textAlign: "center",
            }}
          >
            Recordatorios Automáticos · Cero Ausentismo
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
