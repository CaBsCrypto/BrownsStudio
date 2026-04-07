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
      {/* ── Aurora base — NO filter:blur (causes scroll repaint on mobile) ── */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 130% 60% at 50% -5%, rgba(0,15,80,0.80) 0%, transparent 65%),
          radial-gradient(ellipse 80% 50% at 50% 10%, rgba(0,240,255,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 100% 40% at 50% 100%, rgba(45,0,120,0.18) 0%, transparent 65%)
        `,
        transform: "translateZ(0)", // force GPU layer
      }} />

      {/* ── Dot grid — static, no animation, no mask (both expensive on mobile) */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(0,240,255,0.12) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        opacity: 0.6,
        transform: "translateZ(0)",
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
        {/* Core glow — morph animation only (opacity/scale, cheap) */}
        <div style={{
          position: "absolute", inset: "30%",
          background: "radial-gradient(circle, rgba(0,240,255,0.95) 0%, rgba(0,180,220,0.6) 50%, transparent 100%)",
          borderRadius: "50%",
          boxShadow: "0 0 28px rgba(0,240,255,0.55), 0 0 56px rgba(0,240,255,0.2)",
          animation: "aurora-pulse 3s ease-in-out infinite",
        }} />
        {/* Ring 1 — spin on transform only (GPU composited) */}
        <div style={{
          position: "absolute", inset: "8%",
          border: "1px solid rgba(0,240,255,0.30)",
          borderRadius: "50%",
          animation: "ring-spin-x 5s linear infinite",
          willChange: "transform",
        }} />
        {/* Ring 2 */}
        <div style={{
          position: "absolute", inset: "-6%",
          border: "1px solid rgba(0,240,255,0.15)",
          borderRadius: "50%",
          animation: "ring-spin-y 8s linear infinite reverse",
          willChange: "transform",
        }} />
      </div>
    </>
  );
}
