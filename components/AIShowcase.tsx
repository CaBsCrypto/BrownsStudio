"use client";

import { useRef, useEffect, useState } from "react";
import { useLang } from "@/lib/i18n/LanguageContext";
import { WHATSAPP_URL } from "@/lib/config";

// ── Replace this with your YouTube video ID when ready ──────────────────────
const YOUTUBE_VIDEO_ID = ""; // e.g. "dQw4w9WgXcQ"

export default function AIShowcase() {
  const { t } = useLang();
  const s = t.aiShowcase;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
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

        {/* ── Header ──────────────────────────────────────────────────────── */}
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

        {/* ── Video ───────────────────────────────────────────────────────── */}
        <div className={`mb-16 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div style={{
            position: "relative", width: "100%", maxWidth: "820px", margin: "0 auto",
            borderRadius: "16px", overflow: "hidden",
            border: "1px solid rgba(0,240,255,0.12)",
            boxShadow: "0 0 60px rgba(0,240,255,0.06), 0 20px 60px rgba(0,0,0,0.5)",
            background: "#080f1c",
            aspectRatio: "16/9",
          }}>
            {YOUTUBE_VIDEO_ID ? (
              /* Live YouTube embed */
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
                title={s.videoLabel}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
              />
            ) : (
              /* Placeholder until video is ready */
              <div style={{
                position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: "20px",
                background: "linear-gradient(135deg, #060d1a 0%, #0a1428 100%)",
              }}>
                {/* Animated play button */}
                <div style={{ position: "relative" }}>
                  <div style={{
                    width: "80px", height: "80px", borderRadius: "50%",
                    background: "rgba(0,240,255,0.08)",
                    border: "2px solid rgba(0,240,255,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    animation: "orb-pulse 3s ease-in-out infinite",
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <polygon points="5,3 19,12 5,21" fill="rgba(0,240,255,0.8)" />
                    </svg>
                  </div>
                  {/* Pulse rings */}
                  <div style={{
                    position: "absolute", inset: "-12px", borderRadius: "50%",
                    border: "1px solid rgba(0,240,255,0.15)",
                    animation: "orb-pulse 3s ease-in-out infinite",
                  }} />
                  <div style={{
                    position: "absolute", inset: "-24px", borderRadius: "50%",
                    border: "1px solid rgba(0,240,255,0.07)",
                    animation: "orb-pulse 3s ease-in-out infinite 0.5s",
                  }} />
                </div>
                <p style={{
                  color: "rgba(0,240,255,0.6)", fontSize: "13px",
                  fontFamily: "var(--font-jet-brains-mono), monospace",
                  letterSpacing: "0.1em",
                }}>
                  {s.videoLabel}
                </p>
                <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px", letterSpacing: "0.05em" }}>
                  — coming soon —
                </p>
              </div>
            )}
          </div>

          {/* Video CTA */}
          <div className="text-center mt-6">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{
                border: "1px solid rgba(0,240,255,0.3)",
                color: "#00f0ff", background: "rgba(0,240,255,0.06)",
              }}
            >
              <span>⚡</span>
              {s.videoCta}
            </a>
          </div>
        </div>

        {/* ── Category cards ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {s.categories.map((cat, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${200 + i * 80}ms` }}
            >
              <div
                className="h-full rounded-2xl p-6 flex flex-col gap-4 group cursor-default transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "rgba(10,16,30,0.8)",
                  border: "1px solid rgba(0,240,255,0.08)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                  transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,240,255,0.22)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 40px rgba(0,240,255,0.06), 0 4px 24px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,240,255,0.08)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
                }}
              >
                {/* Icon */}
                <div style={{
                  width: "48px", height: "48px", borderRadius: "12px",
                  background: "rgba(0,240,255,0.06)",
                  border: "1px solid rgba(0,240,255,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "22px",
                }}>
                  {cat.icon}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-base mb-2" style={{ color: "#e5e5e5" }}>
                    {cat.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6a6a6a" }}>
                    {cat.desc}
                  </p>
                </div>

                {/* Tag */}
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

        {/* ── Bottom CTA banner ─────────────────────────────────────────────── */}
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
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
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
  );
}
