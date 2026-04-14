"use client";

import { useRef, useEffect } from "react";

// ── Pure CSS Background — zero Three.js, zero GPU shader cost ─────────────────
export default function BrownsOS() {
  const scrollRef  = useRef(0);
  const blob1Ref   = useRef<HTMLDivElement>(null);
  const blob2Ref   = useRef<HTMLDivElement>(null);
  const blob3Ref   = useRef<HTMLDivElement>(null);
  const mTgt       = useRef({ x: 0.5, y: 0.5 });
  const b1Pos      = useRef({ x: 0, y: 0 });
  const b2Pos      = useRef({ x: 0, y: 0 });
  const isMobile   = typeof window !== "undefined" && window.innerWidth < 768;

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      scrollRef.current = max > 0 ? el.scrollTop / max : 0;
      if (blob3Ref.current) {
        const s = scrollRef.current;
        blob3Ref.current.style.transform = `translateY(${-s * 25}vh) translateZ(0)`;
        blob3Ref.current.style.opacity   = String(0.5 + s * 0.5);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mouse-reactive blobs — desktop only, rAF loop
  useEffect(() => {
    if (isMobile) return;
    const onMove = (e: MouseEvent) => {
      mTgt.current.x = e.clientX / window.innerWidth;
      mTgt.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);
    let rafId: number;
    const loop = () => {
      const tx1 = (mTgt.current.x - 0.5) * 180;
      const ty1 = (mTgt.current.y - 0.5) * 130;
      b1Pos.current.x += (tx1 - b1Pos.current.x) * 0.028;
      b1Pos.current.y += (ty1 - b1Pos.current.y) * 0.028;
      if (blob1Ref.current)
        blob1Ref.current.style.transform = `translate(${b1Pos.current.x}px, ${b1Pos.current.y}px) translateZ(0)`;

      const tx2 = (0.5 - mTgt.current.x) * 120;
      const ty2 = (0.5 - mTgt.current.y) * 90;
      b2Pos.current.x += (tx2 - b2Pos.current.x) * 0.018;
      b2Pos.current.y += (ty2 - b2Pos.current.y) * 0.018;
      if (blob2Ref.current)
        blob2Ref.current.style.transform = `translate(${b2Pos.current.x}px, ${b2Pos.current.y}px) translateZ(0)`;

      rafId = requestAnimationFrame(loop);
    };
    loop();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafId); };
  }, [isMobile]);

  return (
    <>
      {/* ── Base dark space gradient ─────────────────────────────────────── */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "linear-gradient(160deg, #020b18 0%, #030d20 50%, #040a14 100%)",
        transform: "translateZ(0)",
      }} />

      {/* ── Dot grid — isometric feel ────────────────────────────────────── */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(0,240,255,0.10) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
        transform: "translateZ(0)",
        maskImage: "radial-gradient(ellipse 100% 80% at 50% 100%, black 20%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse 100% 80% at 50% 100%, black 20%, transparent 75%)",
      }} />

      {/* ── Aurora blob — top center (mouse-reactive desktop) ───────────── */}
      <div
        aria-hidden
        ref={blob1Ref}
        style={{
          position: "fixed", pointerEvents: "none", zIndex: 0,
          width: "90vw", height: "60vh",
          top: "-20vh", left: "5vw",
          background: "radial-gradient(ellipse, rgba(0,240,255,0.07) 0%, transparent 70%)",
          transform: "translateZ(0)",
          willChange: isMobile ? "auto" : "transform",
          animation: isMobile ? "aurora-drift-a 14s ease-in-out infinite" : "none",
        }}
      />

      {/* ── Aurora blob — purple right (counter-moves on desktop) ───────── */}
      <div
        aria-hidden
        ref={blob2Ref}
        style={{
          position: "fixed", pointerEvents: "none", zIndex: 0,
          width: "75vw", height: "65vh",
          top: "-15vh", right: "-10vw",
          background: "radial-gradient(ellipse, rgba(60,0,140,0.13) 0%, transparent 70%)",
          transform: "translateZ(0)",
          willChange: isMobile ? "auto" : "transform",
          animation: isMobile ? "aurora-drift-b 18s ease-in-out infinite" : "none",
        }}
      />

      {/* ── Aurora blob — bottom accent (scroll-reactive) ───────────────── */}
      <div
        aria-hidden
        ref={blob3Ref}
        style={{
          position: "fixed", pointerEvents: "none", zIndex: 0,
          width: "130vw", height: "45vh",
          bottom: "0", left: "-15vw",
          background: "radial-gradient(ellipse, rgba(0,80,120,0.20) 0%, transparent 70%)",
          opacity: 0.5,
          transform: "translateZ(0)",
        }}
      />

      {/* ── Deep top vignette ───────────────────────────────────────────── */}
      <div aria-hidden style={{
        position: "fixed", top: 0, left: 0, right: 0, height: "55vh",
        zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 110% 60% at 50% -5%, rgba(0,15,80,0.75) 0%, transparent 70%)",
        transform: "translateZ(0)",
      }} />

      {/* ── Scan lines — desktop only ────────────────────────────────────── */}
      {!isMobile && (
        <div aria-hidden style={{
          position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.009) 2px, rgba(0,240,255,0.009) 4px)",
          transform: "translateZ(0)",
        }} />
      )}

      {/* ── HUD corner — desktop ─────────────────────────────────────────── */}
      {!isMobile && (
        <div aria-hidden style={{
          position: "fixed", bottom: "20px", right: "20px", zIndex: 2, pointerEvents: "none",
          fontFamily: "var(--font-jet-brains-mono), 'Courier New', monospace",
          fontSize: "9px", lineHeight: "1.7", letterSpacing: "0.1em",
          color: "rgba(0,240,255,0.28)", textAlign: "right",
        }}>
          <div>SYS: ONLINE</div>
          <div>V_2.1.0</div>
        </div>
      )}
    </>
  );
}
