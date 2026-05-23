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
  X
} from "lucide-react";
import { WHATSAPP_URL, getWhatsAppLink } from "@/lib/config";
import { useLang } from "@/lib/i18n/LanguageContext";

const USE_CASE_ICONS = [ShoppingCart, Settings2, Users2, Layers3];
const PILLAR_ICONS = [Brain, Link2, ShieldCheck, Zap];

const ACCENT_COLORS = ["#00f0ff", "#3b82f6", "#818cf8", "#c084fc"];

export default function CasosDeUso() {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const copy = t.useCases;

  const [selectedPillar, setSelectedPillar] = useState<number | null>(null);

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
        <div className="mb-10">
          <div className="reveal flex flex-col items-center gap-1.5 mb-6 text-center">
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#e5e5e5]" style={{ letterSpacing: "-0.02em" }}>
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

        {/* ── BOTTOM SECTION: Engineering Guarantees (Compact Grid with Modals) ── */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="reveal flex flex-col items-center gap-1.5 mb-6 text-center">
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#e5e5e5]" style={{ letterSpacing: "-0.02em" }}>
              {copy.sectionTitleRight}
            </h3>
            <p className="text-[#555558] text-[10px] sm:text-xs font-mono uppercase tracking-widest">
              {copy.sectionSubRight}
            </p>
          </div>

          {/* Compact Grid of 4 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {copy.pillars.map((pillar, idx) => {
              const Icon = PILLAR_ICONS[idx];
              const accent = ACCENT_COLORS[idx];
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedPillar(idx)}
                  className="group relative flex flex-col items-center justify-between p-4 rounded-2xl border text-center transition-all duration-300 min-h-[135px] hover:-translate-y-1 cursor-pointer"
                  style={{
                    background: "rgba(10, 11, 15, 0.45)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    borderColor: "rgba(255,255,255,0.04)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `${accent}35`;
                    el.style.background = "rgba(14, 16, 23, 0.7)";
                    el.style.boxShadow = `0 10px 25px ${accent}0c, 0 4px 20px rgba(0,0,0,0.25)`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.04)";
                    el.style.background = "rgba(10, 11, 15, 0.45)";
                    el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
                  }}
                >
                  {/* Glowing Box Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${accent}0c`,
                      border: `1px solid ${accent}20`,
                    }}
                  >
                    <Icon size={16} style={{ color: accent }} />
                  </div>

                  <div className="space-y-1 flex-grow flex flex-col justify-center">
                    <h4 className="font-display font-bold text-xs uppercase tracking-wide text-[#e5e5e5] group-hover:text-white transition-colors">
                      {pillar.title}
                    </h4>
                    <span 
                      className="text-[8px] font-mono font-bold tracking-widest uppercase transition-opacity duration-300 opacity-60 group-hover:opacity-100"
                      style={{ color: accent }}
                    >
                      {idx === 0 ? "Razonamiento" : idx === 1 ? "Integraciones" : idx === 2 ? "Failsafe" : "Memoria RAG"}
                    </span>
                  </div>

                  {/* Micro tag link */}
                  <span className="text-[9px] font-mono text-[#5e5e66] group-hover:text-[#9e9e9e] transition-colors mt-2 flex items-center gap-1">
                    Ver specs <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Main Dynamic CTA ── */}
        <div className="reveal text-center mt-12 flex flex-col items-center gap-4">
          <a
            href={getWhatsAppLink(
              lang === "es"
                ? "¡Hola! Me interesa hablar sobre automatizar un proceso con un agente de IA."
                : lang === "pt"
                ? "Olá! Tenho interesse em automatizar um processo com um agente de IA."
                : "Hi! I'm interested in automating a process with an AI agent."
            )}
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
              href={getWhatsAppLink(
                lang === "es"
                  ? "Hola, quiero agendar una auditoría gratuita de procesos."
                  : lang === "pt"
                  ? "Olá, quero agendar uma auditoria gratuita de processos."
                  : "Hi, I'd like to book a free process audit."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#98989c] hover:text-[#00f0ff] underline transition-colors duration-200 ml-1"
            >
              {copy.bottomLink}
            </a>
          </p>
        </div>

      </div>

      {/* ── Futuristic Tech Specs Modal Popup ── */}
      {selectedPillar !== null && (() => {
        const pillar = copy.pillars[selectedPillar];
        const Icon = PILLAR_ICONS[selectedPillar];
        const accent = ACCENT_COLORS[selectedPillar];
        const telemetry = getTelemetryData(selectedPillar);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark blur backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
              onClick={() => setSelectedPillar(null)}
            />

            {/* Modal Box */}
            <div
              className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 overflow-hidden border transition-all duration-300"
              style={{
                background: "rgba(8, 9, 13, 0.95)",
                borderColor: `${accent}40`,
                boxShadow: `0 25px 60px rgba(0,0,0,0.8), 0 0 40px ${accent}12`,
              }}
            >
              {/* Backlit Glow Aura */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] pointer-events-none"
                style={{ background: `${accent}08` }}
              />

              {/* Corner tech lines */}
              <div 
                className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-40 border-t border-r rounded-tr-3xl" 
                style={{ borderColor: accent }}
              />

              {/* Modal Console Header */}
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/[0.04] relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: accent }} />
                  <span
                    className="text-[9px] font-mono font-bold tracking-widest uppercase"
                    style={{ color: accent }}
                  >
                    SYSTEM SECURITY SHELL ACTIVE
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedPillar(null)}
                  className="w-6 h-6 rounded-full flex items-center justify-center border border-white/5 bg-[#0a0a0f] text-[#5e5e66] hover:text-white transition-colors cursor-pointer"
                >
                  <X size={12} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start sm:items-center relative z-10 py-3">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${accent}0c`,
                    border: `1px solid ${accent}30`,
                    boxShadow: `0 0 20px ${accent}10`,
                  }}
                >
                  <Icon size={24} style={{ color: accent }} className="animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight uppercase">
                    {pillar.title}
                  </h4>
                  <p className="text-[#a1a1a6] text-xs sm:text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>

              {/* Telemetry data */}
              <div className="mt-8 pt-4 border-t border-white/[0.04] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-[9px] font-mono relative z-10 text-[#5e5e66]">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {telemetry.primary}
                  </span>
                  <span className="text-white/20">|</span>
                  <span>{telemetry.secondary}</span>
                </div>
                <span style={{ color: accent }}>{telemetry.accentVal}</span>
              </div>

              {/* Bottom controller button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedPillar(null)}
                  className="px-5 py-2.5 rounded-xl text-[10px] font-mono uppercase tracking-wider font-extrabold text-black transition-all hover:scale-105 cursor-pointer"
                  style={{ background: accent }}
                >
                  Cerrar Specs
                </button>
              </div>

            </div>
          </div>
        );
      })()}
    </section>
  );
}
