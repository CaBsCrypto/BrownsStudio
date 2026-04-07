"use client";

// ── BrownsOSMobile — pure CSS background for mobile ──────────────────────────
// Zero Three.js, zero JS animation loops.
// Everything runs via CSS keyframes handled natively by the browser.

export default function BrownsOSMobile() {
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

      {/* ── Dot grid — CSS background, zero JS ────────────────────────── */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(0,240,255,0.18) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        maskImage: "radial-gradient(ellipse 90% 60% at 50% 60%, black 30%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 60% at 50% 60%, black 30%, transparent 80%)",
        animation: "mobile-grid-fade 6s ease-in-out infinite alternate",
      }} />

      {/* ── Quantum Core — CSS geometry ───────────────────────────────── */}
      <div aria-hidden style={{
        position: "fixed", top: "18%", left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1, pointerEvents: "none",
        width: 180, height: 180,
      }}>
        {/* Core solid */}
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
        {/* Ring 3 — diagonal */}
        <div style={{
          position: "absolute", inset: "-8%",
          border: "1px solid rgba(0,240,255,0.13)",
          borderRadius: "50%",
          animation: "ring-spin-z 9s linear infinite",
        }} />

        {/* Shell wireframe */}
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
