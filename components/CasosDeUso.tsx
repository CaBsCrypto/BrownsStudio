"use client";

import { useState, useEffect, useRef } from "react";
import { 
  ShoppingCart, 
  Settings2, 
  Users2, 
  Layers3, 
  ArrowRight,
  Brain, 
  Link2, 
  ShieldCheck, 
  Zap,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n/LanguageContext";

const USE_CASE_ICONS = [ShoppingCart, Settings2, Users2, Layers3];
const PILLAR_ICONS = [Brain, Link2, ShieldCheck, Zap];

const ACCENT_COLORS = ["#00f0ff", "#3b82f6", "#818cf8", "#c084fc"];

export default function CasosDeUso() {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const copy = t.useCases;

  const [activePillar, setActivePillar] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Autoplay functionality for the Engineering Pillars Carousel
  useEffect(() => {
    if (isPaused) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      setActivePillar((prev) => (prev + 1) % 4);
    }, 6000);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isPaused]);

  const handlePillarSelect = (idx: number) => {
    setActivePillar(idx);
    setIsPaused(true); // Pause autoplay when user manually interacts
    // Resume autoplay after 12 seconds of inactivity
    setTimeout(() => setIsPaused(false), 12000);
  };

  const handlePrev = () => {
    setActivePillar((prev) => (prev - 1 + 4) % 4);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 12000);
  };

  const handleNext = () => {
    setActivePillar((prev) => (prev + 1) % 4);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 12000);
  };

  const getTelemetryData = (idx: number) => {
    switch (idx) {
      case 0:
        return {
          primary: "COGNITIVE MODULE: ACTIVE",
          secondary: "LLM TEMP: 0.15",
          accentVal: "REASONING PATHS: 12/12",
        };
      case 1:
        return {
          primary: "API GATEWAY: 12 SECURE PLUGINS",
          secondary: "LATENCY PING: 42ms",
          accentVal: "SYNC: COMPLETED",
        };
      case 2:
        return {
          primary: "GUARDRAILS ACTIVE: ON",
          secondary: "INTERVENTION RATE: 1.2%",
          accentVal: "FAILSAFE GATEWAY: OK",
        };
      case 3:
        return {
          primary: "VECTOR DB: ACTIVE (RAG)",
          secondary: "RETRIEVAL: 99.8% ACC",
          accentVal: "CONTEXT MEMORY: 32k",
        };
      default:
        return {
          primary: "SYSTEM CORE ACTIVE",
          secondary: "LATENCY: <140ms",
          accentVal: "RAG ACCURACY: 99.8%",
        };
    }
  };

  const activePillarData = copy.pillars[activePillar];
  const ActivePillarIcon = PILLAR_ICONS[activePillar];
  const activeAccent = ACCENT_COLORS[activePillar];
  const telemetry = getTelemetryData(activePillar);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="section-padding relative overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Ambient decorative glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,240,255,0.03) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Main Eyecatching Header ── */}
        <div className="text-center mb-16 lg:mb-20">
          <div
            className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest mb-4"
            style={{
              border: "1px solid rgba(0,240,255,0.15)",
              background: "rgba(0,240,255,0.03)",
              color: "#00f0ff",
              fontFamily: "var(--font-jet-brains-mono), monospace",
            }}
          >
            {copy.eyebrow}
          </div>
          <h2
            className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e5e5e5] mb-4 tracking-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            {copy.title.split(".")[0] + "."}{" "}
            <span className="text-gradient-cyan-purple font-extrabold">
              {copy.title.split(".")[1]?.trim()}
            </span>
          </h2>
          <p className="reveal reveal-delay-2 text-[#88888b] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {copy.sub}
          </p>
        </div>

        {/* ── TOP SECTION: Business Use Cases (Full Width Grid) ── */}
        <div className="mb-24">
          <div className="reveal flex flex-col items-center gap-1.5 mb-10 text-center">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#e5e5e5]" style={{ letterSpacing: "-0.02em" }}>
              {copy.sectionTitleLeft}
            </h3>
            <p className="text-[#555558] text-[10px] sm:text-xs font-mono uppercase tracking-widest">
              {copy.sectionSubLeft}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {copy.items.map((caso, i) => {
              const Icon = USE_CASE_ICONS[i];
              const accent = ACCENT_COLORS[i];
              return (
                <div
                  key={caso.title}
                  className={`reveal reveal-delay-${i + 1} group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-6 rounded-2xl transition-all duration-400 border`}
                  style={{
                    background: "rgba(12, 13, 18, 0.55)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    borderColor: "rgba(255,255,255,0.05)",
                    boxShadow: "0 4px 30px rgba(0,0,0,0.25)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `${accent}35`;
                    el.style.background = "rgba(14, 16, 23, 0.75)";
                    el.style.boxShadow = `0 10px 35px ${accent}15, 0 5px 25px rgba(0,0,0,0.35)`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.05)";
                    el.style.background = "rgba(12, 13, 18, 0.55)";
                    el.style.boxShadow = "0 4px 30px rgba(0,0,0,0.25)";
                  }}
                >
                  {/* Left details */}
                  <div className="flex items-start gap-4">
                    {/* Icon with glowing box */}
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `${accent}0c`,
                        border: `1px solid ${accent}25`,
                      }}
                    >
                      <Icon size={20} style={{ color: accent }} />
                    </div>

                    {/* Text details */}
                    <div>
                      <h4 className="font-display font-bold text-base text-[#e5e5e5] mb-1 group-hover:text-white transition-colors">
                        {caso.title}
                      </h4>
                      <p className="text-[#88888e] text-xs leading-relaxed max-w-sm">
                        {caso.desc}
                      </p>
                      <div
                        className="text-[9px] font-mono mt-2.5"
                        style={{ color: `${accent}a0`, letterSpacing: "0.06em" }}
                      >
                        {caso.tag}
                      </div>
                    </div>
                  </div>

                  {/* Right neon capsule outcome badge */}
                  <div
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[10px] font-bold self-start sm:self-auto transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: `${accent}0c`,
                      border: `1px solid ${accent}25`,
                      color: accent,
                      fontFamily: "var(--font-jet-brains-mono), monospace",
                    }}
                  >
                    <span className="animate-pulse" style={{ fontSize: "9px" }}>✦</span>
                    {caso.result}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── BOTTOM SECTION: Engineering Guarantees Carousel ── */}
        <div className="mb-20 max-w-4xl mx-auto">
          <div className="reveal flex flex-col items-center gap-1.5 mb-10 text-center">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#e5e5e5]" style={{ letterSpacing: "-0.02em" }}>
              {copy.sectionTitleRight}
            </h3>
            <p className="text-[#555558] text-[10px] sm:text-xs font-mono uppercase tracking-widest">
              {copy.sectionSubRight}
            </p>
          </div>

          {/* Interactive Responsive Carousel Container */}
          <div className="reveal reveal-delay-2 flex flex-col gap-6">
            
            {/* Top Carousel Navigation Tabs (Desktop/Tablet) */}
            <div className="hidden sm:grid grid-cols-4 gap-3 bg-[#0a0a0f]/40 p-1.5 rounded-2xl border border-white/[0.03]">
              {copy.pillars.map((pillar, idx) => {
                const TabIcon = PILLAR_ICONS[idx];
                const active = activePillar === idx;
                const accent = ACCENT_COLORS[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => handlePillarSelect(idx)}
                    className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl border text-[11px] font-mono uppercase tracking-wider font-extrabold transition-all duration-300 ${
                      active
                        ? "text-white shadow-[0_0_20px_rgba(0,240,255,0.06)]"
                        : "text-[#5e5e66] border-transparent hover:text-white/70 hover:border-white/5"
                    }`}
                    style={{
                      background: active ? `${accent}0c` : "transparent",
                      borderColor: active ? `${accent}35` : "transparent",
                    }}
                  >
                    <TabIcon size={12} style={{ color: active ? accent : "currentColor" }} />
                    <span className="truncate">{pillar.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Carousel Active Viewport Card */}
            <div
              className="relative rounded-3xl p-6 sm:p-10 flex flex-col justify-between overflow-hidden border transition-all duration-500 min-h-[340px]"
              style={{
                background: "rgba(8, 9, 13, 0.65)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderColor: `${activeAccent}35`,
                boxShadow: `0 15px 45px rgba(0,0,0,0.5), 0 0 35px ${activeAccent}08`,
              }}
            >
              {/* Backlit Glow Aura */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] pointer-events-none transition-all duration-1000"
                style={{
                  background: `${activeAccent}0a`,
                }}
              />

              {/* Technical Grid Pattern Accents */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

              {/* Corner tech lines */}
              <div 
                className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-30 border-t border-r rounded-tr-3xl transition-colors duration-500" 
                style={{ borderColor: activeAccent }}
              />

              {/* Console Header Bar */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.04] relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: activeAccent }} />
                  <span
                    className="text-[9px] font-mono font-bold tracking-widest uppercase transition-colors duration-500"
                    style={{ color: activeAccent }}
                  >
                    SYSTEM SECURITY SHELL ACTIVE
                  </span>
                </div>
                <span className="text-[9px] font-mono text-[#5e5e66]">VER 2.4.9 // CLUSTER.NODE_{activePillar + 1}</span>
              </div>

              {/* Slide Content Display */}
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center relative z-10 flex-grow py-4">
                
                {/* Large animated floating node icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500"
                  style={{
                    background: `${activeAccent}0c`,
                    border: `1px solid ${activeAccent}35`,
                    boxShadow: `0 0 25px ${activeAccent}15`,
                  }}
                >
                  <ActivePillarIcon size={28} style={{ color: activeAccent }} className="animate-pulse" />
                </div>

                {/* Technical Descriptions */}
                <div className="space-y-3 flex-grow">
                  <h4 className="font-display font-extrabold text-lg sm:text-2xl text-white tracking-tight uppercase">
                    {activePillarData.title}
                  </h4>
                  <p className="text-[#a1a1a6] text-sm sm:text-base leading-relaxed max-w-2xl">
                    {activePillarData.desc}
                  </p>
                </div>

              </div>

              {/* Diagnostic Live Telemetry footer */}
              <div className="mt-8 pt-4 border-t border-white/[0.04] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-[9px] font-mono relative z-10 text-[#5e5e66]">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {telemetry.primary}
                  </span>
                  <span className="text-white/20">|</span>
                  <span>{telemetry.secondary}</span>
                </div>
                <span style={{ color: activeAccent }}>{telemetry.accentVal}</span>
              </div>

              {/* Overlay Navigation Arrows (Floating) */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 z-20">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-white/5 bg-[#0a0a0f]/80 backdrop-blur-sm flex items-center justify-center text-[#5e5e66] hover:text-white hover:border-white/15 hover:bg-[#12121a] hover:scale-105 transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-white/5 bg-[#0a0a0f]/80 backdrop-blur-sm flex items-center justify-center text-[#5e5e66] hover:text-white hover:border-white/15 hover:bg-[#12121a] hover:scale-105 transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

            </div>

            {/* Bottom Dots & Touch Controls for Mobile/Manual flow */}
            <div className="flex items-center justify-between sm:justify-center gap-4 mt-2 px-2">
              <button
                onClick={handlePrev}
                className="flex sm:hidden w-8 h-8 rounded-full border border-white/5 bg-[#0a0a0f]/80 flex items-center justify-center text-[#5e5e66]"
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} />
              </button>
              
              {/* Dot Indicators */}
              <div className="flex items-center gap-2.5">
                {[0, 1, 2, 3].map((idx) => {
                  const active = activePillar === idx;
                  const accent = ACCENT_COLORS[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => handlePillarSelect(idx)}
                      className="group relative h-2.5 transition-all duration-500 rounded-full"
                      style={{
                        width: active ? "32px" : "10px",
                        background: active ? accent : "rgba(255,255,255,0.1)",
                        boxShadow: active ? `0 0 10px ${accent}` : "none",
                      }}
                      title={`Slide ${idx + 1}`}
                    />
                  );
                })}
              </div>

              <button
                onClick={handleNext}
                className="flex sm:hidden w-8 h-8 rounded-full border border-white/5 bg-[#0a0a0f]/80 flex items-center justify-center text-[#5e5e66]"
                aria-label="Next slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>

          </div>
        </div>

        {/* ── Main Dynamic CTA ── */}
        <div className="reveal text-center mt-12 flex flex-col items-center gap-4">
          <a
            href={`${WHATSAPP_URL}&text=${encodeURIComponent(
              lang === "es"
                ? "¡Hola! Me interesa hablar sobre automatizar un proceso con un agente de IA."
                : lang === "pt"
                ? "Olá! Tenho interesse em automatizar um proceso com um agente de IA."
                : "Hi! I'm interested in automating a process with an AI agent."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-bold text-xs uppercase tracking-widest text-black transition-all duration-300 hover:scale-105 cursor-pointer shadow-[0_0_30px_rgba(0,240,255,0.15)]"
            style={{
              background: "linear-gradient(135deg, #00f0ff, #0070ff)",
            }}
          >
            {copy.cta}
            <ArrowRight size={14} />
          </a>

          {/* Bottom Note */}
          <p className="text-[#555558] text-xs mt-2">
            {copy.bottomNote}
            <a
              href={`${WHATSAPP_URL}&text=${encodeURIComponent(
                lang === "es"
                  ? "Hola, quiero agendar una auditoría gratuita de procesos."
                  : lang === "pt"
                  ? "Olá, quero agendar uma auditoria gratuita de processos."
                  : "Hi, I'd like to book a free process audit."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#98989c] hover:text-[#00f0ff] underline transition-colors duration-200 ml-1"
            >
              {copy.bottomLink}
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
