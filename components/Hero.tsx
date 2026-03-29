"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowDown, MessageCircle, Sparkles } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";

// ── Eager preload trick ───────────────────────────────────────────────────
// Import starts downloading THREE.js immediately when Hero.tsx loads
// (not deferred until the component mounts)
const cubesPromise = import("./HeroCubes");

const HeroCubes = dynamic<{ forming?: boolean }>(() => cubesPromise, {
  ssr: false,
  loading: () => (
    // Animated placeholder while bundle downloads
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="w-72 h-72 rounded-full animate-pulse-slow"
        style={{
          background: "radial-gradient(circle, rgba(71,196,255,0.1) 0%, rgba(71,196,255,0.03) 50%, transparent 70%)",
          animationDuration: "2s",
        }}
      />
    </div>
  ),
});

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

const stats = [
  { numeric: 5,   suffix: "+", label: "Proyectos"       },
  { numeric: 7,   suffix: "",  label: "Certs. Google IA" },
  { numeric: 100, suffix: "%", label: "Satisfacción"    },
];

function StatItem({ stat, active }: { stat: typeof stats[0]; active: boolean }) {
  const count = useCountUp(stat.numeric, 1200, active);
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-display font-bold text-gradient-gold" style={{ letterSpacing: "-0.03em" }}>
        {count}{stat.suffix}
      </div>
      <div className="text-[#5a5a5a] text-[10px] mt-1 uppercase tracking-widest">
        {stat.label}
      </div>
    </div>
  );
}

export default function Hero() {
  const heroRef  = useRef<HTMLElement>(null);
  const [statsActive, setStatsActive] = useState(false);
  const [forming,     setForming]     = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
            setTimeout(() => setStatsActive(true), 600);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Background void ──────────────────────────────────────────────── */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #000000 0%, #0a0f1e 50%, #000000 100%)" }} />

      {/* Left ambient orb — subtle blue */}
      <div
        className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(5,169,227,0.05) 0%, transparent 70%)" }}
      />

      {/* ── Split layout ─────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-6rem)]">

          {/* ── LEFT — text content ──────────────────────────────────────── */}
          <div className="flex flex-col justify-center lg:pr-8">

            {/* Badge */}
            <div
              className="reveal inline-flex self-start items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8 uppercase tracking-widest"
              style={{ border: "1px solid rgba(71,196,255,0.2)", background: "rgba(71,196,255,0.05)", color: "#47c4ff" }}
            >
              <Sparkles size={11} className="animate-pulse" />
              Web + Inteligencia Artificial para tu negocio
            </div>

            {/* Display headline */}
            <h1
              className="reveal reveal-delay-1 font-display font-bold text-[2.6rem] sm:text-5xl md:text-6xl text-[#e5e5e5] mb-6 leading-[1.04]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Webs que venden.
              <br />
              <span className="text-gradient-gold">IA que atiende.</span>
              <br />
              Negocios que crecen.
            </h1>

            {/* Body */}
            <p className="reveal reveal-delay-2 text-[#9e9e9e] text-lg leading-relaxed mb-10 max-w-lg">
              Web + IA para negocios que quieren crecer de verdad. Webs profesionales,{" "}
              <span className="text-[#e5e5e5] font-medium">chatbots y automatizaciones</span>{" "}
              para clínicas, restaurantes y negocios locales en LATAM.
            </p>

            {/* CTAs */}
            <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-start gap-4 mb-12">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base text-black hover:scale-105 transition-all duration-300 justify-center"
                style={{ background: "linear-gradient(135deg, #c6c6c7, #939eb5)", boxShadow: "0 0 32px rgba(198,198,199,0.15)" }}
              >
                <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
                Cotizar gratis
              </a>
              <button
                onClick={() => document.getElementById("precios")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-8 py-4 rounded-full text-[#9e9e9e] font-semibold text-base hover:border-[#47c4ff]/40 hover:text-[#47c4ff] transition-all duration-300 justify-center"
                style={{ border: "1px solid rgba(72,72,72,0.4)" }}
              >
                Ver servicios
              </button>
            </div>

            {/* Stats glass pill */}
            <div
              className="reveal reveal-delay-4 inline-grid grid-cols-3 gap-6 p-5 rounded-2xl self-start"
              style={{ background: "rgba(25,25,25,0.5)", backdropFilter: "blur(20px)", border: "1px solid rgba(72,72,72,0.15)" }}
            >
              {stats.map((stat) => (
                <StatItem key={stat.label} stat={stat} active={statsActive} />
              ))}
            </div>
          </div>

          {/* ── RIGHT — 3D glass cubes ───────────────────────────────────── */}
          {/* Bleeds off the right edge — intentional asymmetry */}
          <div
            className="relative h-[480px] lg:h-[620px] lg:-mr-24 xl:-mr-40"
          >
            {/* Subtle glow behind the cubes */}
            <div
              className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(71,196,255,0.07) 0%, transparent 70%)" }}
            />
            <HeroCubes forming={forming} />

            {/* BS formation toggle */}
            <button
              onClick={() => setForming((f) => !f)}
              className="absolute bottom-4 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest transition-all duration-300 select-none"
              style={{
                background:     forming ? "rgba(71,196,255,0.12)" : "rgba(25,25,25,0.55)",
                border:         forming ? "1px solid rgba(71,196,255,0.35)" : "1px solid rgba(72,72,72,0.3)",
                color:          forming ? "#47c4ff" : "#5a5a5a",
                backdropFilter: "blur(12px)",
              }}
              aria-label={forming ? "Dispersar cubos" : "Formar BS"}
            >
              <span
                className="font-display font-bold text-[13px] leading-none"
                style={{ letterSpacing: "-0.02em" }}
              >
                BS
              </span>
              {forming ? "· dispersar" : "· formar"}
            </button>
          </div>
        </div>

        {/* Scroll indicator — centered below the grid */}
        <div className="flex justify-center pb-8">
          <button
            onClick={() => document.getElementById("sobre-mi")?.scrollIntoView({ behavior: "smooth" })}
            className="reveal reveal-delay-4 flex flex-col items-center gap-2 text-[#5a5a5a] hover:text-[#47c4ff] transition-colors duration-300 cursor-pointer"
            aria-label="Scroll hacia abajo"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase">Descubrir</span>
            <ArrowDown size={14} className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
