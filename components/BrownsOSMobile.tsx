"use client";

import { useRef, useEffect } from "react";

export default function BrownsOSMobile() {
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!coreRef.current) return;
      const el  = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const s   = max > 0 ? el.scrollTop / max : 0;

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
      {/* Static background — zero animations, zero repaints */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 140% 65% at 50% -5%, rgba(0,10,60,0.92) 0%, transparent 65%),
          radial-gradient(ellipse 80% 50% at 50% 15%, rgba(0,240,255,0.05) 0%, transparent 60%),
          radial-gradient(ellipse 100% 45% at 50% 100%, rgba(40,0,100,0.14) 0%, transparent 65%)
        `,
        transform: "translateZ(0)",
      }} />

      {/* Dot grid — static */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(0,240,255,0.10) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
        opacity: 0.5,
        transform: "translateZ(0)",
      }} />

      {/* Quantum Core — NO CSS animations, only scroll-driven transform */}
      <div
        ref={coreRef}
        aria-hidden
        style={{
          position: "fixed", top: "16%", left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1, pointerEvents: "none",
          width: 190, height: 190,
          willChange: "transform",
          transition: "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Outer glow — static */}
        <div style={{
          position: "absolute", inset: "-35%",
          background: "radial-gradient(circle, rgba(0,240,255,0.07) 0%, transparent 65%)",
          borderRadius: "50%",
        }} />
        {/* Ring 3 */}
        <div style={{
          position: "absolute", inset: "-12%",
          border: "1px solid rgba(0,240,255,0.11)",
          borderRadius: "50%",
        }} />
        {/* Ring 2 */}
        <div style={{
          position: "absolute", inset: "0%",
          border: "1px solid rgba(0,240,255,0.18)",
          borderRadius: "50%",
        }} />
        {/* Ring 1 */}
        <div style={{
          position: "absolute", inset: "11%",
          border: "1px solid rgba(0,240,255,0.28)",
          borderRadius: "50%",
        }} />
        {/* Shell */}
        <div style={{
          position: "absolute", inset: "20%",
          border: "1px solid rgba(0,240,255,0.32)",
          borderRadius: "38% 62% 55% 45% / 45% 38% 62% 55%",
        }} />
        {/* Core */}
        <div style={{
          position: "absolute", inset: "30%",
          background: "radial-gradient(circle at 38% 38%, rgba(180,255,255,0.9) 0%, rgba(0,240,255,0.85) 35%, rgba(0,120,180,0.6) 70%, transparent 100%)",
          borderRadius: "38% 62% 55% 45% / 45% 55% 62% 38%",
          boxShadow: "0 0 18px rgba(0,240,255,0.65), 0 0 40px rgba(0,240,255,0.25)",
        }} />
        {/* Light reflection */}
        <div style={{
          position: "absolute", inset: "28%",
          background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.22) 0%, transparent 55%)",
          borderRadius: "50%",
        }} />
      </div>
    </>
  );
}
