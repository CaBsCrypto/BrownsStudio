"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Palette ───────────────────────────────────────────────────────────────────
const C_CYAN = new THREE.Color(0x00f0ff);
const C_RED  = new THREE.Color(0xff003c);

// ── Data Ocean ────────────────────────────────────────────────────────────────
// Ocean group constants — must match the JSX <group> below
const OCEAN_POS = new THREE.Vector3(0, -7, -8);
const OCEAN_ROT_X = -1.22;

function DataOcean({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const mouseNDC = useRef({ x: 0, y: 0 });
  const origXY   = useRef<Float32Array>(null!);

  const oceanGeo = useMemo(() => {
    const SEGS = 90;
    const geo  = new THREE.PlaneGeometry(80, 80, SEGS, SEGS);
    const pos  = geo.attributes.position.array as Float32Array;
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

  // Plane in world space matching the ocean group transform
  const worldPlane = useMemo(() => {
    const normal = new THREE.Vector3(0, 0, 1)
      .applyMatrix4(new THREE.Matrix4().makeRotationX(OCEAN_ROT_X));
    return new THREE.Plane().setFromNormalAndCoplanarPoint(normal, OCEAN_POS);
  }, []);

  // Inverse of the ocean group world matrix — to convert hit → local coords
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
    const onMove = (e: MouseEvent) => {
      mouseNDC.current.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouseNDC.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ clock }) => {
    const t   = clock.elapsedTime;
    const s   = scrollRef.current;
    const arr = oceanGeo.attributes.position.array as Float32Array;
    const orig = origXY.current;
    const n   = arr.length / 3;

    // Raycast mouse → ocean plane → local coords
    raycaster.setFromCamera(mouseNDC.current as THREE.Vector2, camera);
    raycaster.ray.intersectPlane(worldPlane, hitWorld);
    hitLocal.copy(hitWorld).applyMatrix4(invOceanMatrix);
    const mx = hitLocal.x;
    const my = hitLocal.y;

    for (let i = 0; i < n; i++) {
      const i3 = i * 3;
      const x  = orig[i3], y = orig[i3 + 1];
      const dx = x - mx,   dy = y - my;
      const d2 = dx*dx + dy*dy;
      const pull = d2 < 64 ? (1 - Math.sqrt(d2) / 8) * 3.2 : 0;
      const wave = Math.sin(x * 0.12 + t * 0.5) * Math.cos(y * 0.09 + t * 0.3) * (0.7 + s * 2.8);
      arr[i3 + 2] = wave + pull;
    }
    oceanGeo.attributes.position.needsUpdate = true;
    pointsMat.opacity = 0.12 + s * 0.28;
    wireMat.opacity   = 0.018 + s * 0.042;
  });

  return (
    <group rotation={[-1.22, 0, 0]} position={[0, -7, -8]}>
      <points geometry={oceanGeo} material={pointsMat} />
      <mesh   geometry={oceanGeo} material={wireMat}   />
    </group>
  );
}

// ── Quantum Core ──────────────────────────────────────────────────────────────
function QuantumCore({
  scrollRef,
  glitchRef,
}: {
  scrollRef: React.MutableRefObject<number>;
  glitchRef: React.MutableRefObject<boolean>;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const coreRef  = useRef<THREE.Mesh>(null!);
  const shellRef = useRef<THREE.Mesh>(null!);
  const r1Ref    = useRef<THREE.Mesh>(null!);
  const r2Ref    = useRef<THREE.Mesh>(null!);
  const r3Ref    = useRef<THREE.Mesh>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);
  const tgt      = useRef(new THREE.Vector3());

  const coreMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x00f0ff, emissive: 0x00f0ff, emissiveIntensity: 0.55,
    metalness: 0.85, roughness: 0.08, transparent: true, opacity: 0.92,
  }), []);

  const shellMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.22,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }), []);

  const ringMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.16,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }), []);

  useFrame(({ clock }, dt) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    const s = scrollRef.current;

    // ── Scroll choreography — 4 chapters, starts moving at s=0.05 ────────
    if (s < 0.05) {
      // Hero resting — centered
      tgt.current.set(0, 0, 0);
    } else if (s < 0.25) {
      // Chapter 1 — drifts right quickly (Hero → Portfolio)
      const p = (s - 0.05) / 0.20;
      tgt.current.set(p * 4, -p * 0.8, 0);
    } else if (s < 0.55) {
      // Chapter 2 — travels right + slightly back (Portfolio → Pricing)
      const p = (s - 0.25) / 0.30;
      tgt.current.set(4 + p * 2, -0.8 - p * 1.2, -p * 1.5);
    } else if (s < 0.80) {
      // Chapter 3 — sweeps left across screen (Proceso → FAQ)
      const p = (s - 0.55) / 0.25;
      tgt.current.set(6 - p * 14, -2.0 + p * 1.0, -1.5 + p * 2.5);
    } else {
      // Chapter 4 — CTA: rushes toward camera from center
      const p = (s - 0.80) / 0.20;
      tgt.current.set(-8 + p * 8, -1.0 + p * 1.5, 1.0 + p * 5);
    }
    groupRef.current.position.lerp(tgt.current, 0.05);

    const spinBoost = glitchRef.current ? 4 : 1;
    if (coreRef.current) {
      coreRef.current.rotation.x += dt * 0.32 * spinBoost;
      coreRef.current.rotation.y += dt * 0.52 * spinBoost;
    }
    if (shellRef.current) {
      shellRef.current.rotation.x -= dt * 0.18;
      shellRef.current.rotation.y += dt * 0.78;
    }
    if (r1Ref.current) r1Ref.current.rotation.x += dt * 0.88;
    if (r2Ref.current) r2Ref.current.rotation.y += dt * 0.65;
    if (r3Ref.current) r3Ref.current.rotation.z += dt * 0.45;

    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 2.6) * 0.055;
      coreRef.current.scale.setScalar(pulse);
    }

    if (lightRef.current) {
      if (glitchRef.current) {
        coreMat.emissive.copy(C_RED);
        coreMat.color.copy(C_RED);
        shellMat.color.copy(C_RED);
        lightRef.current.color.copy(C_RED);
        lightRef.current.intensity = 5;
      } else {
        coreMat.emissive.lerp(C_CYAN, 0.09);
        coreMat.color.lerp(C_CYAN, 0.09);
        shellMat.color.lerp(C_CYAN, 0.09);
        lightRef.current.color.lerp(C_CYAN, 0.09);
        lightRef.current.intensity = THREE.MathUtils.lerp(
          lightRef.current.intensity,
          1.6 + Math.sin(t * 3.1) * 0.4,
          0.08
        );
      }
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight ref={lightRef} color={0x00f0ff} intensity={1.6} distance={28} decay={1.6} />
      <mesh ref={coreRef}  material={coreMat}>  <icosahedronGeometry args={[1, 1]} />     </mesh>
      <mesh ref={shellRef} material={shellMat}> <icosahedronGeometry args={[1.55, 2]} />  </mesh>
      <mesh ref={r1Ref} rotation={[Math.PI / 3, 0.25, 0]}         material={ringMat}> <torusGeometry args={[2.5, 0.014, 3, 80]} /> </mesh>
      <mesh ref={r2Ref} rotation={[0.1, Math.PI / 4, Math.PI / 5]} material={ringMat}> <torusGeometry args={[3.1, 0.011, 3, 80]} /> </mesh>
      <mesh ref={r3Ref} rotation={[Math.PI / 6, Math.PI / 3, 0.55]} material={ringMat}> <torusGeometry args={[3.7, 0.009, 3, 80]} /> </mesh>
    </group>
  );
}

// ── Scene ─────────────────────────────────────────────────────────────────────
function Scene({ scrollRef, glitchRef }: { scrollRef: React.MutableRefObject<number>; glitchRef: React.MutableRefObject<boolean> }) {
  const { camera } = useThree();
  const camTgt     = useRef(new THREE.Vector3(0, 0, 14));
  useFrame(() => {
    const s = scrollRef.current;
    camTgt.current.set(0, -s * 2.8, 14 - s * 2.2);
    camera.position.lerp(camTgt.current, 0.028);
    (camera as THREE.PerspectiveCamera).lookAt(0, -s * 1.6, 0);
  });
  return (
    <>
      <ambientLight intensity={0.06} color={0x001a2e} />
      <DataOcean   scrollRef={scrollRef} />
      <QuantumCore scrollRef={scrollRef} glitchRef={glitchRef} />
    </>
  );
}

// ── Boot sequence ─────────────────────────────────────────────────────────────
const BOOT_LOGS = [
  "INIT.SYS // BROWNS_STUDIO_2026",
  "LOADING KERNEL MODULES...",
  "MOUNT /dev/reality → /browns/core",
  "QUANTUM_BRIDGE: ONLINE",
  "NEURAL_NET: 10,000 NODES ACTIVE",
  "ESTABILIZANDO CONEXIÓN...",
  "SYS_READY ██████████ 100%",
];

// ── Aurora blobs ──────────────────────────────────────────────────────────────
function AuroraBlobs({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const blobARef = useRef<HTMLDivElement>(null);  // cyan — mouse follows
  const blobCRef = useRef<HTMLDivElement>(null);  // indigo — mouse counter
  const blobDRef = useRef<HTMLDivElement>(null);  // teal — scroll driven

  // Mouse target (normalised)
  const mTgt = useRef({ x: 0.5, y: 0.5 });
  // Lerped positions (in px offset from base)
  const aPos = useRef({ x: 0, y: 0 });
  const cPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mTgt.current.x = e.clientX / window.innerWidth;
      mTgt.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);

    let rafId: number;
    const loop = () => {
      // Blob A: follows mouse, range ±120px / ±90px
      const ax = (mTgt.current.x - 0.5) * 240;
      const ay = (mTgt.current.y - 0.5) * 180;
      aPos.current.x += (ax - aPos.current.x) * 0.032;
      aPos.current.y += (ay - aPos.current.y) * 0.032;
      if (blobARef.current)
        blobARef.current.style.transform = `translate(${aPos.current.x}px, ${aPos.current.y}px)`;

      // Blob C: counter-mouse, subtle
      const cx = (0.5 - mTgt.current.x) * 140;
      const cy = (0.5 - mTgt.current.y) * 100;
      cPos.current.x += (cx - cPos.current.x) * 0.016;
      cPos.current.y += (cy - cPos.current.y) * 0.016;
      if (blobCRef.current)
        blobCRef.current.style.transform = `translate(${cPos.current.x}px, ${cPos.current.y}px)`;

      // Blob D: rises as you scroll, fades at bottom of page
      const s = scrollRef.current;
      if (blobDRef.current) {
        blobDRef.current.style.transform = `translateY(${-s * 35}vh)`;
        blobDRef.current.style.opacity   = String(0.6 + s * 0.4);
      }

      rafId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []); // scrollRef is stable (useRef)

  const BASE: React.CSSProperties = {
    position:      "fixed",
    pointerEvents: "none",
    borderRadius:  "50%",
    filter:        "blur(100px)",
    zIndex:        0,
  };

  return (
    <>
      {/* B — deep navy left (static, provides depth) */}
      <div aria-hidden style={{
        ...BASE,
        width: "110vw", height: "90vh",
        top: "-30vh", left: "-20vw",
        background: "radial-gradient(ellipse, rgba(0,15,80,0.55) 0%, transparent 70%)",
      }} />

      {/* A — cyan horizon (mouse reactive) */}
      <div aria-hidden ref={blobARef} style={{
        ...BASE,
        width: "80vw", height: "70vh",
        top: "-15vh", left: "10vw",
        background: "radial-gradient(ellipse, rgba(0,240,255,0.07) 0%, transparent 65%)",
        willChange: "transform",
      }} />

      {/* C — indigo right (counter-mouse) */}
      <div aria-hidden ref={blobCRef} style={{
        ...BASE,
        width: "75vw", height: "75vh",
        top: "-20vh", right: "-10vw",
        background: "radial-gradient(ellipse, rgba(45,0,120,0.13) 0%, transparent 70%)",
        willChange: "transform",
      }} />

      {/* D — teal ground (scroll-driven) */}
      <div aria-hidden ref={blobDRef} style={{
        ...BASE,
        width: "140vw", height: "55vh",
        bottom: "5vh", left: "-20vw",
        background: "radial-gradient(ellipse, rgba(0,75,95,0.28) 0%, transparent 70%)",
        willChange: "transform, opacity",
      }} />

      {/* E — center core pulse (CSS animation only) */}
      <div aria-hidden style={{
        ...BASE,
        width: "60vw", height: "60vh",
        top: "20vh", left: "20vw",
        background: "radial-gradient(ellipse, rgba(0,240,255,0.045) 0%, transparent 70%)",
        animation: "aurora-pulse 9s ease-in-out infinite",
      }} />
    </>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────
export default function BrownsOS() {
  const scrollRef   = useRef(0);
  const glitchRef   = useRef(false);
  const [bootLines, setBootLines]     = useState<string[]>([]);
  const [bootDone, setBootDone]       = useState(false);
  const [bootVisible, setBootVisible] = useState(true);

  // Boot sequence
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setBootLines(prev => [...prev, BOOT_LOGS[i]]);
      i++;
      if (i >= BOOT_LOGS.length) {
        clearInterval(iv);
        setTimeout(() => {
          setBootDone(true);
          setTimeout(() => setBootVisible(false), 650);
        }, 480);
      }
    }, 255);
    return () => clearInterval(iv);
  }, []);

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

  // Click → glitch
  useEffect(() => {
    const trigger = () => {
      glitchRef.current = true;
      setTimeout(() => { glitchRef.current = false; }, 320);
    };
    document.addEventListener("click", trigger);
    return () => document.removeEventListener("click", trigger);
  }, []);

  return (
    <>
      {/* ── Aurora background blobs ───────────────────────────────────────── */}
      <AuroraBlobs scrollRef={scrollRef} />

      {/* ── Scanlines ─────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: 1, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.011) 2px, rgba(0,240,255,0.011) 4px)" }}
      />

      {/* ── Corner HUD ────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-5 right-5"
        style={{
          zIndex: 2, fontFamily: "var(--font-jet-brains-mono), 'Courier New', monospace",
          fontSize: "9px", lineHeight: "1.7", letterSpacing: "0.1em",
          color: "rgba(0,240,255,0.3)", textAlign: "right",
        }}
      >
        <div>MEM: 10,000 NODES</div>
        <div>V_2.0.26</div>
      </div>

      {/* ── Boot overlay ──────────────────────────────────────────────────── */}
      {bootVisible && (
        <div
          aria-hidden
          style={{
            position: "fixed", inset: 0, zIndex: 60,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            background: "#050505",
            fontFamily: "var(--font-jet-brains-mono), 'Courier New', monospace",
            opacity: bootDone ? 0 : 1, transition: "opacity 600ms ease",
            pointerEvents: bootDone ? "none" : "all",
          }}
        >
          <div style={{ color: "rgba(0,240,255,0.35)", fontSize: "10px", letterSpacing: "0.35em", marginBottom: "32px" }}>
            BROWNS_STUDIO_OS
          </div>
          <div style={{ width: "100%", maxWidth: "420px", padding: "0 24px" }}>
            {bootLines.map((line, idx) => {
              const isLast = idx === bootLines.length - 1;
              return (
                <div key={idx} style={{ color: isLast ? "#00f0ff" : "rgba(0,240,255,0.45)", fontSize: "12px", marginBottom: "5px", transition: "color 0.3s" }}>
                  <span style={{ color: "rgba(0,240,255,0.25)", marginRight: "8px" }}>{">"}</span>
                  {line}
                  {isLast && !bootDone && <span className="browns-os-blink" style={{ marginLeft: "2px" }}>▋</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Three.js canvas ───────────────────────────────────────────────── */}
      <Canvas
        camera={{ position: [0, 0, 14], fov: 55 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance", stencil: false }}
        dpr={Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5)}
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "transparent" }}
      >
        <Scene scrollRef={scrollRef} glitchRef={glitchRef} />
      </Canvas>
    </>
  );
}
