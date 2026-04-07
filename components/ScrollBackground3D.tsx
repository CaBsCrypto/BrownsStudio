"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Config ────────────────────────────────────────────────────────────────────
const COUNT    = 200;   // particle count
const BRAND    = new THREE.Color(0x47c4ff);
const ACCENT   = new THREE.Color(0x4466ff);

// ── Generate formation targets ────────────────────────────────────────────────
function buildFormations(): Float32Array[] {
  // 0 — Hero: random scatter
  const scatter = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    scatter[i * 3]     = (Math.random() - 0.5) * 18;
    scatter[i * 3 + 1] = (Math.random() - 0.5) * 10;
    scatter[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }

  // 1 — Portfolio: wave grid
  const grid = new Float32Array(COUNT * 3);
  const cols = 16, rows = Math.ceil(COUNT / cols);
  for (let i = 0; i < COUNT; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    grid[i * 3]     = (c / (cols - 1) - 0.5) * 14;
    grid[i * 3 + 1] = (r / (rows - 1) - 0.5) * 8;
    grid[i * 3 + 2] = Math.sin(c * 0.7 + r * 0.5) * 1.2;
  }

  // 2 — SobreMi/Pricing: fibonacci sphere
  const sphere = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const phi   = Math.acos(-1 + (2 * i) / COUNT);
    const theta = Math.sqrt(COUNT * Math.PI) * phi;
    const r = 5;
    sphere[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    sphere[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    sphere[i * 3 + 2] = r * Math.cos(phi);
  }

  // 3 — Proceso/FAQ: double helix
  const helix = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const t   = (i / COUNT) * Math.PI * 8;
    const r   = 4;
    const y   = (i / COUNT - 0.5) * 12;
    const strand = i % 2 === 0 ? 0 : Math.PI; // two strands
    helix[i * 3]     = r * Math.cos(t + strand);
    helix[i * 3 + 1] = y;
    helix[i * 3 + 2] = r * Math.sin(t + strand);
  }

  // 4 — CTA: vortex converging to center
  const vortex = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const t = (i / COUNT) * Math.PI * 10;
    const r = (1 - i / COUNT) * 6;
    vortex[i * 3]     = r * Math.cos(t);
    vortex[i * 3 + 1] = (i / COUNT - 0.5) * 5;
    vortex[i * 3 + 2] = r * Math.sin(t);
  }

  return [scatter, grid, sphere, helix, vortex];
}

const FORMATIONS = buildFormations();

// Map scroll 0→1 to chapter index + blend factor
function scrollToChapter(s: number): [number, number, number] {
  const chapters = FORMATIONS.length - 1; // 4 transitions
  const raw  = s * chapters;
  const from = Math.min(Math.floor(raw), chapters - 1);
  const to   = Math.min(from + 1, chapters);
  const t    = raw - from;
  return [from, to, t];
}

// ── Particle system ───────────────────────────────────────────────────────────
function Particles({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const pointsRef  = useRef<THREE.Points>(null!);
  const { camera } = useThree();

  // Current positions buffer (lerped each frame)
  const positions = useMemo(() => new Float32Array(COUNT * 3), []);
  const colors    = useMemo(() => {
    const c = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const mix = i / COUNT;
      const col = BRAND.clone().lerp(ACCENT, mix);
      c[i * 3]     = col.r;
      c[i * 3 + 1] = col.g;
      c[i * 3 + 2] = col.b;
    }
    return c;
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    // Start at scatter positions
    for (let i = 0; i < COUNT * 3; i++) positions[i] = FORMATIONS[0][i];
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
    return g;
  }, [positions, colors]);

  const mat = useMemo(() => new THREE.PointsMaterial({
    size:         0.08,
    vertexColors: true,
    transparent:  true,
    opacity:      0.75,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  // Camera target for smooth mouse parallax
  const camTarget = useRef(new THREE.Vector3(0, 0, 14));
  const mouse     = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ clock }, dt) => {
    const s = scrollRef.current;
    const [from, to, t] = scrollToChapter(s);

    // Lerp each particle toward the blended formation target
    const speed = Math.min(dt * 2.5, 0.1);
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      for (let axis = 0; axis < 3; axis++) {
        const target =
          FORMATIONS[from][i3 + axis] * (1 - t) +
          FORMATIONS[to][i3 + axis]   * t;
        positions[i3 + axis] += (target - positions[i3 + axis]) * speed;
      }
    }
    geo.attributes.position.needsUpdate = true;

    // Slow global rotation driven by scroll
    if (pointsRef.current) {
      pointsRef.current.rotation.y = s * Math.PI * 0.5 + clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = Math.sin(s * Math.PI) * 0.2;
    }

    // Camera subtle parallax from mouse
    camTarget.current.set(
      mouse.current.x * 1.2,
      -mouse.current.y * 0.8,
      14
    );
    camera.position.lerp(camTarget.current, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return <points ref={pointsRef} geometry={geo} material={mat} />;
}

// ── Connecting lines (visible near scroll 0.25 and 0.75) ─────────────────────
function Lines({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const lineRef = useRef<THREE.LineSegments>(null!);
  const opacity = useRef(0);

  // Build a sparse set of connections between nearby scatter points
  const geo = useMemo(() => {
    const pts: number[] = [];
    const src = FORMATIONS[1]; // grid formation
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = src[i*3] - src[j*3];
        const dy = src[i*3+1] - src[j*3+1];
        const dz = src[i*3+2] - src[j*3+2];
        const d2 = dx*dx + dy*dy + dz*dz;
        if (d2 < 1.2) {
          pts.push(src[i*3], src[i*3+1], src[i*3+2]);
          pts.push(src[j*3], src[j*3+1], src[j*3+2]);
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
    return g;
  }, []);

  const mat = useMemo(() => new THREE.LineBasicMaterial({
    color: 0x47c4ff,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  useFrame((_, dt) => {
    const s = scrollRef.current;
    // Lines appear near grid formation (scroll ~0.25) and sphere (scroll ~0.5)
    const targetOpacity = (s > 0.15 && s < 0.55) ? 0.12 : 0;
    opacity.current += (targetOpacity - opacity.current) * Math.min(dt * 3, 0.15);
    mat.opacity = opacity.current;
    if (lineRef.current) {
      lineRef.current.rotation.y = s * Math.PI * 0.5;
    }
  });

  return <lineSegments ref={lineRef} geometry={geo} material={mat} />;
}

// ── Scene ─────────────────────────────────────────────────────────────────────
function Scene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 10]} intensity={2} color="#47c4ff" />
      <Lines    scrollRef={scrollRef} />
      <Particles scrollRef={scrollRef} />
    </>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────
export default function ScrollBackground3D() {
  const scrollRef = useRef(0);

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

  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 55 }}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
        stencil: false,
      }}
      dpr={Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5)}
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        0,
        pointerEvents: "none",
        background:    "transparent",
      }}
    >
      <Scene scrollRef={scrollRef} />
    </Canvas>
  );
}
