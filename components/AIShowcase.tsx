"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useLang } from "@/lib/i18n/LanguageContext";

// ── Swap this ID when your video is uploaded ─────────────────────────────────
const YOUTUBE_VIDEO_ID = ""; // e.g. "dQw4w9WgXcQ"

// ── Video Modal ───────────────────────────────────────────────────────────────
function VideoModal({ open, onClose, videoId, label }: {
  open: boolean;
  onClose: () => void;
  videoId: string;
  label: string;
}) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    // Prevent body scroll while open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
        // Backdrop
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        animation: "modal-in 0.25s ease-out",
      }}
      onClick={onClose} // click outside closes
    >
      {/* Modal box */}
      <div
        onClick={e => e.stopPropagation()} // don't close when clicking inside
        style={{
          position: "relative",
          width: "100%", maxWidth: "900px",
          borderRadius: "20px", overflow: "hidden",
          border: "1px solid rgba(0,240,255,0.15)",
          boxShadow: "0 0 80px rgba(0,240,255,0.1), 0 40px 80px rgba(0,0,0,0.7)",
          background: "#060d1a",
          animation: "modal-scale-in 0.25s ease-out",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close video"
          style={{
            position: "absolute", top: "14px", right: "14px", zIndex: 10,
            width: "36px", height: "36px", borderRadius: "50%",
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: "18px", lineHeight: 1,
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,240,255,0.15)";
            (e.currentTarget as HTMLButtonElement).style.color = "#00f0ff";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.6)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
          }}
        >
          ✕
        </button>

        {/* Video */}
        <div style={{ aspectRatio: "16/9", width: "100%" }}>
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={label}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: "none", display: "block" }}
            />
          ) : (
            // Placeholder — video not uploaded yet
            <div style={{
              width: "100%", height: "100%",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "16px",
              background: "linear-gradient(135deg, #060d1a 0%, #0a1428 100%)",
            }}>
              <div style={{
                width: "72px", height: "72px", borderRadius: "50%",
                background: "rgba(0,240,255,0.08)",
                border: "2px solid rgba(0,240,255,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <polygon points="5,3 19,12 5,21" fill="rgba(0,240,255,0.7)" />
                </svg>
              </div>
              <p style={{
                color: "rgba(0,240,255,0.5)", fontSize: "13px",
                fontFamily: "var(--font-jet-brains-mono), monospace",
                letterSpacing: "0.1em",
              }}>
                {label}
              </p>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px" }}>
                — coming soon —
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function AIShowcase() {
  const { t } = useLang();
  const s = t.aiShowcase;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal  = useCallback(() => setModalOpen(true),  []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Modal (portal-like, fixed) ───────────────────────────────────── */}
      <VideoModal
        open={modalOpen}
        onClose={closeModal}
        videoId={YOUTUBE_VIDEO_ID}
        label={s.videoLabel}
      />

      <section
        id="ia-showcase"
        ref={sectionRef}
        className="section-padding relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #040a16 0%, #050a18 60%, #040a16 100%)" }}
      >
        {/* Ambient glow */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,240,255,0.04) 0%, transparent 70%)",
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          {/* ── Header ────────────────────────────────────────────────────── */}
          <div className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span style={{
              display: "inline-block", marginBottom: "1rem",
              padding: "4px 16px", borderRadius: "9999px",
              border: "1px solid rgba(0,240,255,0.25)",
              color: "#00f0ff", fontSize: "11px", fontFamily: "var(--font-jet-brains-mono), monospace",
              letterSpacing: "0.15em", textTransform: "uppercase",
              background: "rgba(0,240,255,0.05)",
            }}>
              {s.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4" style={{ color: "#e5e5e5" }}>
              {s.title}
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "#9a9a9a" }}>
              {s.sub}
            </p>
          </div>

          {/* ── Video thumbnail / play trigger ────────────────────────────── */}
          <div className={`mb-16 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div style={{ maxWidth: "680px", margin: "0 auto" }}>
              <button
                onClick={openModal}
                aria-label={s.videoLabel}
                style={{
                  display: "block", width: "100%", cursor: "pointer",
                  background: "none", border: "none", padding: 0,
                }}
              >
                <div style={{
                  position: "relative", width: "100%", aspectRatio: "16/9",
                  borderRadius: "20px", overflow: "hidden",
                  border: "1px solid rgba(0,240,255,0.12)",
                  boxShadow: "0 0 60px rgba(0,240,255,0.06), 0 20px 60px rgba(0,0,0,0.5)",
                  background: "linear-gradient(135deg, #060d1a 0%, #0a1428 100%)",
                  transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(0,240,255,0.3)";
                  el.style.boxShadow = "0 0 80px rgba(0,240,255,0.12), 0 20px 60px rgba(0,0,0,0.6)";
                  el.style.transform = "scale(1.01)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(0,240,255,0.12)";
                  el.style.boxShadow = "0 0 60px rgba(0,240,255,0.06), 0 20px 60px rgba(0,0,0,0.5)";
                  el.style.transform = "scale(1)";
                }}
                >
                  {/* Thumbnail glow lines decoration */}
                  <div aria-hidden style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(0,240,255,0.025) 28px, rgba(0,240,255,0.025) 29px)",
                    pointerEvents: "none",
                  }} />

                  {/* Center play button */}
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: "18px",
                  }}>
                    {/* Play ring + icon */}
                    <div style={{ position: "relative" }}>
                      {/* Outer pulse rings */}
                      <div style={{
                        position: "absolute", inset: "-20px", borderRadius: "50%",
                        border: "1px solid rgba(0,240,255,0.12)",
                        animation: "orb-pulse 2.5s ease-in-out infinite",
                      }} />
                      <div style={{
                        position: "absolute", inset: "-38px", borderRadius: "50%",
                        border: "1px solid rgba(0,240,255,0.06)",
                        animation: "orb-pulse 2.5s ease-in-out infinite 0.6s",
                      }} />
                      {/* Main circle */}
                      <div style={{
                        width: "76px", height: "76px", borderRadius: "50%",
                        background: "rgba(0,240,255,0.1)",
                        border: "2px solid rgba(0,240,255,0.35)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "background 0.3s, border-color 0.3s",
                      }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ marginLeft: "4px" }}>
                          <polygon points="5,3 19,12 5,21" fill="#00f0ff" />
                        </svg>
                      </div>
                    </div>

                    {/* Label */}
                    <div style={{ textAlign: "center" }}>
                      <p style={{
                        color: "rgba(0,240,255,0.75)", fontSize: "13px",
                        fontFamily: "var(--font-jet-brains-mono), monospace",
                        letterSpacing: "0.1em",
                      }}>
                        {s.videoLabel}
                      </p>
                      {!YOUTUBE_VIDEO_ID && (
                        <p style={{ color: "rgba(255,255,255,0.18)", fontSize: "10px", marginTop: "6px", letterSpacing: "0.06em" }}>
                          — coming soon —
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </button>

              {/* Below video CTA */}
              <div className="text-center mt-5">
                <a
                  href="#precios"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("precios")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                  style={{ border: "1px solid rgba(0,240,255,0.3)", color: "#00f0ff", background: "rgba(0,240,255,0.06)" }}
                >
                  <span>⚡</span>
                  {s.videoCta}
                </a>
              </div>
            </div>
          </div>

          {/* ── Category cards ────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {s.categories.map((cat, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${200 + i * 80}ms` }}
              >
                <div
                  className="h-full rounded-2xl p-6 flex flex-col gap-4"
                  style={{
                    background: "rgba(10,16,30,0.8)",
                    border: "1px solid rgba(0,240,255,0.08)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                    transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "rgba(0,240,255,0.22)";
                    el.style.boxShadow = "0 8px 40px rgba(0,240,255,0.06), 0 4px 24px rgba(0,0,0,0.4)";
                    el.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "rgba(0,240,255,0.08)";
                    el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
                    el.style.transform = "scale(1)";
                  }}
                >
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "12px",
                    background: "rgba(0,240,255,0.06)",
                    border: "1px solid rgba(0,240,255,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "22px",
                  }}>
                    {cat.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-base mb-2" style={{ color: "#e5e5e5" }}>
                      {cat.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6a6a6a" }}>
                      {cat.desc}
                    </p>
                  </div>
                  <div style={{
                    display: "inline-block", padding: "3px 10px", borderRadius: "9999px",
                    background: "rgba(0,240,255,0.05)",
                    border: "1px solid rgba(0,240,255,0.15)",
                    color: "#00c8d8", fontSize: "11px",
                    fontFamily: "var(--font-jet-brains-mono), monospace",
                    letterSpacing: "0.05em",
                  }}>
                    {cat.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Bottom CTA banner ─────────────────────────────────────────── */}
          <div className={`transition-all duration-700 delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div style={{
              borderRadius: "20px", padding: "40px 32px",
              background: "linear-gradient(135deg, rgba(0,240,255,0.04) 0%, rgba(0,80,180,0.06) 50%, rgba(120,60,255,0.04) 100%)",
              border: "1px solid rgba(0,240,255,0.1)",
              textAlign: "center",
            }}>
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-3" style={{ color: "#e5e5e5" }}>
                {s.ctaTitle}
              </h3>
              <p className="text-sm sm:text-base mb-6 max-w-xl mx-auto" style={{ color: "#9a9a9a" }}>
                {s.ctaSub}
              </p>
              <a
                href="#precios"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("precios")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm text-black hover:scale-105 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #00f0ff, #00b8d8)",
                  boxShadow: "0 0 30px rgba(0,240,255,0.25)",
                }}
              >
                {s.ctaBtn} →
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── Modal animations ────────────────────────────────────────────────── */}
      <style>{`
        @keyframes modal-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modal-scale-in {
          from { opacity: 0; transform: scale(0.93) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </>
  );
}
