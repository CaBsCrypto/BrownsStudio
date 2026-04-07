"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Sparkles } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";

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
  { numeric: 5,   suffix: "+", label: "Proyectos"        },
  { numeric: 7,   suffix: "",  label: "Certs. Google IA"  },
  { numeric: 100, suffix: "%", label: "Satisfacción"     },
];

function StatItem({ stat, active }: { stat: typeof stats[0]; active: boolean }) {
  const count = useCountUp(stat.numeric, 1200, active);
  return (
    <div className="text-center">
      <div
        className="text-2xl sm:text-3xl font-display font-bold"
        style={{ letterSpacing: "-0.03em", color: "#00f0ff" }}
      >
        {count}{stat.suffix}
      </div>
      <div style={{ color: "rgba(0,240,255,0.4)", fontSize: "10px", marginTop: "4px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
        {stat.label}
      </div>
    </div>
  );
}

export default function Hero() {
  const heroRef      = useRef<HTMLElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 130);
            });
            setTimeout(() => setStatsActive(true), 650);
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
      {/* ── Radial vignette — lets BrownsOS canvas show through ──────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 20% 50%, rgba(0,240,255,0.04) 0%, transparent 70%)," +
            "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(0,0,0,0.5) 0%, transparent 80%)",
        }}
      />

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-16">
        <div className="max-w-2xl">

          {/* Badge */}
          <div
            className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8 uppercase tracking-widest"
            style={{
              border:     "1px solid rgba(0,240,255,0.2)",
              background: "rgba(0,240,255,0.05)",
              color:      "#00f0ff",
              fontFamily: "var(--font-jet-brains-mono), monospace",
            }}
          >
            <Sparkles size={11} className="animate-pulse" />
            Web + Inteligencia Artificial para tu negocio
          </div>

          {/* Headline */}
          <h1
            className="reveal reveal-delay-1 font-display font-bold text-[2.8rem] sm:text-5xl md:text-[3.8rem] text-[#e5e5e5] mb-6 leading-[1.04]"
            style={{ letterSpacing: "-0.03em" }}
          >
            El futuro de tu negocio
            <br />
            <span className="text-gradient-gold">empieza con</span>
            <br />
            una decisión.
          </h1>

          {/* Body */}
          <p className="reveal reveal-delay-2 text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "#7a7a7a" }}>
            Diseño web premium e inteligencia artificial para negocios que quieren{" "}
            <span style={{ color: "#e5e5e5", fontWeight: 500 }}>liderar su mercado</span>.{" "}
            Clínicas, restaurantes y negocios locales en LATAM.
          </p>

          {/* CTAs */}
          <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-start gap-4 mb-14">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-black hover:scale-105 transition-all duration-300"
              style={{
                background:  "linear-gradient(135deg, #c6c6c7, #939eb5)",
                boxShadow:   "0 0 28px rgba(198,198,199,0.12)",
              }}
            >
              <MessageCircle size={15} className="group-hover:scale-110 transition-transform" />
              Cotizar gratis
            </a>
            <button
              onClick={() => document.getElementById("precios")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300"
              style={{
                border: "1px solid rgba(0,240,255,0.2)",
                color:  "rgba(0,240,255,0.7)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,240,255,0.5)";
                (e.currentTarget as HTMLButtonElement).style.color       = "#00f0ff";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,240,255,0.2)";
                (e.currentTarget as HTMLButtonElement).style.color       = "rgba(0,240,255,0.7)";
              }}
            >
              Ver servicios
            </button>
          </div>

          {/* Stats pill */}
          <div
            className="reveal reveal-delay-4 inline-grid grid-cols-3 gap-8 p-5 rounded-2xl"
            style={{
              background:     "rgba(0,240,255,0.03)",
              backdropFilter: "blur(20px)",
              border:         "1px solid rgba(0,240,255,0.1)",
            }}
          >
            {stats.map((stat) => (
              <StatItem key={stat.label} stat={stat} active={statsActive} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
