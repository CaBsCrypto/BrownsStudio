"use client";

import { useEffect, useRef } from "react";
import { 
  ShoppingCart, 
  Settings2, 
  Users2, 
  Layers3, 
  ArrowRight,
  Brain, 
  Link2, 
  ShieldCheck, 
  Zap 
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

        {/* ── Asymmetric Bento Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          
          {/* LEFT COLUMN: Business Use Cases (Col span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="reveal flex flex-col gap-1 mb-2">
              <h3 className="font-display font-bold text-lg text-[#e5e5e5]" style={{ letterSpacing: "-0.01em" }}>
                {copy.sectionTitleLeft}
              </h3>
              <p className="text-[#555558] text-[10px] font-mono uppercase tracking-wider">
                {copy.sectionSubLeft}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {copy.items.map((caso, i) => {
                const Icon = USE_CASE_ICONS[i];
                const accent = ACCENT_COLORS[i];
                return (
                  <div
                    key={caso.title}
                    className={`reveal reveal-delay-${i + 1} group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-5 rounded-2xl transition-all duration-400 border`}
                    style={{
                      background: "rgba(12, 13, 18, 0.5)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      borderColor: "rgba(255,255,255,0.05)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${accent}35`;
                      el.style.background = "rgba(14, 16, 23, 0.7)";
                      el.style.boxShadow = `0 8px 30px ${accent}12, 0 4px 20px rgba(0,0,0,0.3)`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(255,255,255,0.05)";
                      el.style.background = "rgba(12, 13, 18, 0.5)";
                      el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
                    }}
                  >
                    {/* Left details */}
                    <div className="flex items-start gap-4">
                      {/* Icon with glowing box */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `${accent}0c`,
                          border: `1px solid ${accent}20`,
                        }}
                      >
                        <Icon size={18} style={{ color: accent }} />
                      </div>

                      {/* Text details */}
                      <div>
                        <h4 className="font-display font-semibold text-sm text-[#e5e5e5] mb-1">
                          {caso.title}
                        </h4>
                        <p className="text-[#727278] text-xs leading-relaxed max-w-md">
                          {caso.desc}
                        </p>
                        <div
                          className="text-[9px] font-mono mt-2"
                          style={{ color: `${accent}a0`, letterSpacing: "0.05em" }}
                        >
                          {caso.tag}
                        </div>
                      </div>
                    </div>

                    {/* Right neon capsule outcome badge */}
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold self-start sm:self-auto transition-all duration-300 group-hover:scale-105"
                      style={{
                        background: `${accent}0c`,
                        border: `1px solid ${accent}20`,
                        color: accent,
                        fontFamily: "var(--font-jet-brains-mono), monospace",
                      }}
                    >
                      <span className="animate-pulse" style={{ fontSize: "8px" }}>✦</span>
                      {caso.result}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Engineering Architecture Specs (Col span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 h-full">
            <div className="reveal flex flex-col gap-1 mb-2">
              <h3 className="font-display font-bold text-lg text-[#e5e5e5]" style={{ letterSpacing: "-0.01em" }}>
                {copy.sectionTitleRight}
              </h3>
              <p className="text-[#555558] text-[10px] font-mono uppercase tracking-wider">
                {copy.sectionSubRight}
              </p>
            </div>

            {/* The Unified Specs Blue Console Box */}
            <div
              className="reveal reveal-delay-2 flex-grow rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden border"
              style={{
                background: "rgba(8, 9, 13, 0.6)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderColor: "rgba(0, 240, 255, 0.15)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
              }}
            >
              {/* Corner tech lines */}
              <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-20 border-t border-r border-[#00f0ff] rounded-tr-3xl" />
              
              {/* Dashboard Title Bar */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                  <span
                    className="text-[9px] font-mono font-bold tracking-widest text-[#00f0ff] uppercase"
                  >
                    SYSTEM CORE ACTIVE
                  </span>
                </div>
                <span className="text-[9px] font-mono text-[#555558]">V2.4.9</span>
              </div>

              {/* Vertical flow map of pillars */}
              <div className="flex flex-col gap-6 relative pl-3">
                {/* Node Line connecting the elements */}
                <div 
                  className="absolute left-6 top-3 bottom-3 w-px pointer-events-none bg-gradient-to-b from-[#00f0ff]/40 via-[#818cf8]/20 to-transparent" 
                />

                {copy.pillars.map((pillar, i) => {
                  const Icon = PILLAR_ICONS[i];
                  const accent = ACCENT_COLORS[i];
                  return (
                    <div key={pillar.title} className="flex gap-4 relative z-10">
                      {/* Node Icon Circle */}
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110"
                        style={{
                          background: "#0c0d12",
                          border: `1px solid ${accent}40`,
                          boxShadow: `0 0 10px ${accent}20`,
                        }}
                      >
                        <Icon size={12} style={{ color: accent }} />
                      </div>

                      {/* Spec content */}
                      <div>
                        <h5 className="text-[12px] font-bold text-[#e5e5e5] mb-0.5 tracking-tight uppercase font-mono">
                          {pillar.title}
                        </h5>
                        <p className="text-[#646467] text-[11px] leading-relaxed max-w-sm">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom technical diagnostic tag */}
              <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[8px] font-mono text-[#444448]">
                <span>LATENCY: &lt;140ms</span>
                <span>RAG ACCURACY: 99.8%</span>
                <span>HUMAN-SAFE GATEWAY: ON</span>
              </div>
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
                ? "Olá! Tenho interesse em automatizar um processo com um agente de IA."
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
