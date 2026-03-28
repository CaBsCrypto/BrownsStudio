"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, MessageCircle, Sparkles } from "lucide-react";
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
  { numeric: 5,   suffix: "+",  label: "Proyectos"      },
  { numeric: 7,   suffix: "",   label: "Certs. Google IA" },
  { numeric: 100, suffix: "%",  label: "Satisfacción"   },
];

function StatItem({ stat, active }: { stat: typeof stats[0]; active: boolean }) {
  const count = useCountUp(stat.numeric, 1200, active);
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-display font-bold text-gradient-gold tracking-display">
        {count}{stat.suffix}
      </div>
      <div className="text-[#5a5a5a] text-xs sm:text-sm mt-1 uppercase tracking-widest">
        {stat.label}
      </div>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [statsActive, setStatsActive] = useState(false);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Void base */}
      <div className="absolute inset-0 bg-gradient-warm" />
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* AI orb underlights — tertiary_dim at low opacity */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(5,169,227,0.06) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none animate-pulse-slow"
        style={{ background: "radial-gradient(circle, rgba(147,158,181,0.05) 0%, transparent 70%)", animationDelay: "2s" }}
      />

      {/* Asymmetric decorative lines */}
      <div className="absolute top-24 right-12 lg:right-24 opacity-15">
        <div className="w-16 h-16 border border-[#939eb5]/30 rotate-45 animate-float" />
      </div>
      <div className="absolute bottom-36 left-10 lg:left-20 opacity-10">
        <div className="w-10 h-10 border border-[#47c4ff]/20 rotate-12 animate-float" style={{ animationDelay: "3s" }} />
      </div>
      {/* Extra off-canvas bleed element — intentional asymmetry */}
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-2 h-40 bg-gradient-to-b from-transparent via-[#47c4ff]/10 to-transparent rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">

        {/* AI status badge */}
        <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#47c4ff]/20 bg-[#47c4ff]/5 text-[#47c4ff] text-xs font-medium mb-8 backdrop-blur-sm uppercase tracking-widest">
          <Sparkles size={11} className="animate-pulse" />
          Web + Inteligencia Artificial para tu negocio
        </div>

        {/* Display headline — cinematic scale, tight tracking */}
        <h1 className="reveal reveal-delay-1 font-display font-bold text-[2.8rem] sm:text-5xl md:text-6xl lg:text-7xl text-[#e5e5e5] mb-6 leading-[1.05]" style={{ letterSpacing: "-0.03em" }}>
          Webs que venden.
          <br />
          <span className="text-gradient-gold">IA que atiende.</span>
          <br />
          Negocios que crecen.
        </h1>

        {/* Body — generous line-height contrasts tight heading */}
        <p className="reveal reveal-delay-2 text-[#9e9e9e] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Web + IA para negocios que quieren crecer de verdad. Webs profesionales,{" "}
          <span className="text-[#e5e5e5] font-medium">chatbots y automatizaciones</span>{" "}
          para clínicas, restaurantes y negocios locales en LATAM.
        </p>

        {/* CTAs */}
        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          {/* Primary — metallic pill */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center text-black shadow-[0_0_24px_rgba(198,198,199,0.15)]"
            style={{ background: "linear-gradient(135deg, #c6c6c7, #939eb5)" }}
          >
            <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
            Cotizar gratis
          </a>
          {/* Tertiary — ghost pill */}
          <button
            onClick={() => document.getElementById("precios")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-2 px-8 py-4 rounded-full border border-[#484848]/40 text-[#9e9e9e] font-semibold text-base hover:border-[#47c4ff]/40 hover:text-[#47c4ff] transition-all duration-300 w-full sm:w-auto justify-center"
          >
            Ver servicios
          </button>
        </div>

        {/* Stats — tabular, tight label typography */}
        <div className="reveal reveal-delay-4 grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto mb-16 p-6 rounded-2xl"
          style={{ background: "rgba(25,25,25,0.5)", backdropFilter: "blur(20px)", border: "1px solid rgba(72,72,72,0.15)" }}
        >
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} active={statsActive} />
          ))}
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => document.getElementById("sobre-mi")?.scrollIntoView({ behavior: "smooth" })}
          className="reveal reveal-delay-4 flex flex-col items-center gap-2 text-[#5a5a5a] hover:text-[#47c4ff] transition-colors duration-300 mx-auto cursor-pointer"
          aria-label="Scroll hacia abajo"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Descubrir</span>
          <ArrowDown size={14} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
}
