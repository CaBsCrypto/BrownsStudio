"use client";

import { useRef, useEffect } from "react";

// ── BrownsOSMobile — pure CSS + minimal scroll JS (zero Three.js) ─────────────
export default function BrownsOSMobile() {
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!coreRef.current) return;
      const el  = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const s   = max > 0 ? el.scrollTop / max : 0;

      // Same 4-chapter choreography as desktop Quantum Core
      let tx = 0, ty = 0, scale = 1;

      if (s < 0.05) {
        tx = 0; ty = 0;
      } else if (s < 0.25) {
        const p = (s - 0.05) / 0.20;
        tx = p * 38; ty = -p * 8;
      } else if (s < 0.55) {
        const p = (s - 0.25) / 0.30;
        tx = 38 + p * 18; ty = -8 - p * 12;
      } else if (s < 0.80) {
        const p = (s - 0.55) / 0.25;
        tx = 56 - p * 120; ty = -20 + p * 10;
        scale = 1 + p * 0.15;
      } else {
        const p = (s - 0.80) / 0.20;
        tx = -64 + p * 64; ty = -10 + p * 15;
        scale = 1.15 + p * 0.4;
      }

      coreRef.current.style.transform =
        `translateX(calc(-50% + ${tx}vw)) translateY(${ty}px) scale(${scale})`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Aurora base blobs ──────────────────────────────────────────── */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 120% 70% at 50% -10%, rgba(0,15,80,0.75) 0%, transparent 70%)",
      }} />
      <div aria-hidden style={{
        position: "fixed", pointerEvents: "none", zIndex: 0,
        width: "100vw", height: "60vh", top: "-5vh", left: 0,
        background: "radial-gradient(ellipse, rgba(0,240,255,0.10) 0%, transparent 65%)",
        animation: "aurora-pulse 7s ease-in-out infinite",
      }} />
      <div aria-hidden style={{
        position: "fixed", pointerEvents: "none", zIndex: 0,
        width: "120vw", height: "50vh", bottom: "-10vh", left: "-10vw",
        background: "radial-gradient(ellipse, rgba(45,0,120,0.20) 0%, transparent 70%)",
        animation: "aurora-pulse 11s ease-in-out infinite reverse",
      }} />

      {/* ── Dot grid ──────────────────────────────────────────────────── */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(0,240,255,0.18) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        maskImage: "radial-gradient(ellipse 90% 60% at 50% 60%, black 30%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 60% at 50% 60%, black 30%, transparent 80%)",
        animation: "mobile-grid-fade 6s ease-in-out infinite alternate",
      }} />

      {/* ── Quantum Core — CSS geometry + scroll movement ─────────────── */}
      <div
        ref={coreRef}
        aria-hidden
        style={{
          position: "fixed",
          top: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          pointerEvents: "none",
          width: 180,
          height: 180,
          willChange: "transform",
          transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Core glow */}
        <div style={{
          position: "absolute", inset: "30%",
          background: "radial-gradient(circle, rgba(0,240,255,0.95) 0%, rgba(0,180,220,0.6) 50%, transparent 100%)",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          boxShadow: "0 0 30px rgba(0,240,255,0.6), 0 0 60px rgba(0,240,255,0.25)",
          animation: "core-morph 4s ease-in-out infinite",
        }} />
        {/* Ring 1 */}
        <div style={{
          position: "absolute", inset: "10%",
          border: "1px solid rgba(0,240,255,0.35)",
          borderRadius: "50%",
          animation: "ring-spin-x 4s linear infinite",
        }} />
        {/* Ring 2 */}
        <div style={{
          position: "absolute", inset: "2%",
          border: "1px solid rgba(0,240,255,0.20)",
          borderRadius: "50%",
          animation: "ring-spin-y 6s linear infinite reverse",
        }} />
        {/* Ring 3 */}
        <div style={{
          position: "absolute", inset: "-8%",
          border: "1px solid rgba(0,240,255,0.13)",
          borderRadius: "50%",
          animation: "ring-spin-z 9s linear infinite",
        }} />
        {/* Shell */}
        <div style={{
          position: "absolute", inset: "18%",
          border: "1px solid rgba(0,240,255,0.28)",
          borderRadius: "30% 70% 50% 50% / 50% 50% 70% 30%",
          animation: "core-morph 6s ease-in-out infinite reverse",
        }} />
      </div>
    </>
  );
}
