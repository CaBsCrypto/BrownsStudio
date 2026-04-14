"use client";

import { useRef, useEffect } from "react";

export default function BrownsOS() {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const orbRef   = useRef<HTMLDivElement>(null);
  const mTgt     = useRef({ x: 0.5, y: 0.5 });
  const b1Pos    = useRef({ x: 0, y: 0 });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Mouse-reactive blobs + orb parallax — desktop only
  useEffect(() => {
    if (isMobile) return;
    const onMove = (e: MouseEvent) => {
      mTgt.current.x = e.clientX / window.innerWidth;
      mTgt.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);
    let rafId: number;
    const loop = () => {
      const tx = (mTgt.current.x - 0.5) * 60;
      const ty = (mTgt.current.y - 0.5) * 40;
      b1Pos.current.x += (tx - b1Pos.current.x) * 0.04;
      b1Pos.current.y += (ty - b1Pos.current.y) * 0.04;
      if (blob1Ref.current)
        blob1Ref.current.style.transform = `translate(${b1Pos.current.x}px, ${b1Pos.current.y}px) translateZ(0)`;
      // orb moves slightly opposite for depth
      if (orbRef.current)
        orbRef.current.style.transform = `translate(${-b1Pos.current.x * 0.4}px, ${-b1Pos.current.y * 0.3}px) translateZ(0)`;
      rafId = requestAnimationFrame(loop);
    };
    loop();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafId); };
  }, [isMobile]);

  return (
    <>
      {/* ── Base ─────────────────────────────────────────────────────────── */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "linear-gradient(135deg, #020c1b 0%, #030e22 40%, #040a16 100%)",
        transform: "translateZ(0)",
      }} />

      {/* ── Dot grid — bottom fade ────────────────────────────────────────── */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(0,240,255,0.13) 1px, transparent 1px)",
        backgroundSize: "38px 38px",
        transform: "translateZ(0)",
        maskImage: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, transparent 75%)",
        WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, transparent 75%)",
      }} />

      {/* ── Aurora top-left (mouse reactive on desktop) ───────────────────── */}
      <div aria-hidden ref={blob1Ref} style={{
        position: "fixed", pointerEvents: "none", zIndex: 0,
        width: "70vw", height: "65vh",
        top: "-20vh", left: "-5vw",
        background: "radial-gradient(ellipse, rgba(0,200,255,0.09) 0%, rgba(0,80,200,0.05) 40%, transparent 70%)",
        transform: "translateZ(0)",
        willChange: isMobile ? "auto" : "transform",
        animation: isMobile ? "aurora-drift-a 16s ease-in-out infinite" : "none",
      }} />

      {/* ── Aurora bottom-right ────────────────────────────────────────────── */}
      <div aria-hidden ref={blob2Ref} style={{
        position: "fixed", pointerEvents: "none", zIndex: 0,
        width: "65vw", height: "55vh",
        bottom: "-10vh", right: "-5vw",
        background: "radial-gradient(ellipse, rgba(80,0,180,0.12) 0%, rgba(0,40,120,0.06) 50%, transparent 70%)",
        transform: "translateZ(0)",
        animation: "aurora-drift-b 20s ease-in-out infinite",
      }} />

      {/* ── CSS ORB — right side focal point ─────────────────────────────── */}
      <div aria-hidden ref={orbRef} style={{
        position: "fixed", pointerEvents: "none", zIndex: 0,
        right: isMobile ? "5vw" : "8vw",
        top: "10vh",
        width: isMobile ? "280px" : "420px",
        height: isMobile ? "280px" : "420px",
        transform: "translateZ(0)",
        willChange: isMobile ? "auto" : "transform",
      }}>
        {/* Core glow */}
        <div style={{
          position: "absolute", inset: "30%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,240,255,0.22) 0%, rgba(0,180,255,0.08) 50%, transparent 80%)",
          boxShadow: "0 0 60px 20px rgba(0,240,255,0.08), 0 0 120px 60px rgba(0,100,200,0.06)",
          animation: "orb-pulse 4s ease-in-out infinite",
        }} />

        {/* Ring 1 */}
        <div style={{
          position: "absolute", inset: "18%",
          borderRadius: "50%",
          border: "1px solid rgba(0,240,255,0.18)",
          boxShadow: "0 0 12px rgba(0,240,255,0.06) inset",
          animation: "orb-spin-1 12s linear infinite",
        }}>
          {/* Dot on ring */}
          <div style={{
            position: "absolute", top: "-3px", left: "50%", marginLeft: "-3px",
            width: "6px", height: "6px", borderRadius: "50%",
            background: "#00f0ff",
            boxShadow: "0 0 8px 2px rgba(0,240,255,0.6)",
          }} />
        </div>

        {/* Ring 2 */}
        <div style={{
          position: "absolute", inset: "6%",
          borderRadius: "50%",
          border: "1px solid rgba(0,180,255,0.10)",
          animation: "orb-spin-2 20s linear infinite",
        }}>
          <div style={{
            position: "absolute", bottom: "-3px", left: "50%", marginLeft: "-3px",
            width: "5px", height: "5px", borderRadius: "50%",
            background: "rgba(0,200,255,0.8)",
            boxShadow: "0 0 6px 2px rgba(0,200,255,0.5)",
          }} />
        </div>

        {/* Ring 3 — tilted */}
        <div style={{
          position: "absolute", inset: "-4%",
          borderRadius: "50%",
          border: "1px solid rgba(100,0,255,0.10)",
          transform: "rotateX(65deg) rotateZ(20deg)",
          animation: "orb-spin-3 28s linear infinite",
        }}>
          <div style={{
            position: "absolute", top: "-2px", right: "30%",
            width: "4px", height: "4px", borderRadius: "50%",
            background: "rgba(160,80,255,0.9)",
            boxShadow: "0 0 5px 2px rgba(140,60,255,0.4)",
          }} />
        </div>
      </div>

      {/* ── Vignette corners ─────────────────────────────────────────────── */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 120% 70% at 50% -10%, rgba(0,20,80,0.6) 0%, transparent 65%)",
        transform: "translateZ(0)",
      }} />

      {/* ── Scan lines — desktop ──────────────────────────────────────────── */}
      {!isMobile && (
        <div aria-hidden style={{
          position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.008) 2px, rgba(0,240,255,0.008) 4px)",
          transform: "translateZ(0)",
        }} />
      )}

      {/* ── HUD ──────────────────────────────────────────────────────────── */}
      {!isMobile && (
        <div aria-hidden style={{
          position: "fixed", bottom: "20px", right: "20px", zIndex: 2, pointerEvents: "none",
          fontFamily: "var(--font-jet-brains-mono), 'Courier New', monospace",
          fontSize: "9px", lineHeight: "1.7", letterSpacing: "0.1em",
          color: "rgba(0,240,255,0.25)", textAlign: "right",
        }}>
          <div>SYS: ONLINE</div>
          <div>V_2.1.0</div>
        </div>
      )}
    </>
  );
}
