"use client";

import { useEffect, useRef } from "react";
import {
  CheckCircle2, Brain, Code2, BarChart3, FileText,
  PenTool, Search, Lightbulb, type LucideIcon,
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n/LanguageContext";

const certIcons: LucideIcon[] = [Brain, Code2, BarChart3, FileText, PenTool, Search, Lightbulb];

const skills = ["Antigravity", "AI Studio", "Claude", "Codex", "OpenCode"];

export default function SobreMi() {
  const { lang, t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sobre-mi"
      className="section-padding overflow-hidden"
    >
      {/* Cyan underlight */}
      <div
        className="absolute inset-x-0 top-1/3 h-96 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,240,255,0.03) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* ── Left — Elegant Identity Card ─────────────────────────────── */}
          <div className="reveal">
            <div className="relative w-full max-w-sm mx-auto lg:mx-0">

              {/* Card — Cover style */}
              <div
                className="relative rounded-[32px] overflow-hidden"
                style={{
                  background: "#121212",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 40px 80px -20px rgba(0,0,0,0.8)",
                }}
              >
                {/* Hero Photo Section */}
                <div className="relative w-full aspect-square overflow-hidden group/photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/cristian.jpeg"
                    alt="Cristian"
                    className="w-full h-full object-cover grayscale-[0.1] group-hover/photo:grayscale-0 transition-all duration-1000"
                    style={{ objectPosition: "50% 30%" }}
                  />
                  
                  {/* Glass Header overlay */}
                  <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-start">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl bg-black/40 border border-white/10">
                      <div className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
                      <span className="text-[9px] font-mono text-white/80 tracking-widest uppercase">Verified Expert</span>
                    </div>
                  </div>

                  {/* Bottom info overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent">
                    <div className="relative z-10">
                      <p className="text-accent-gold font-mono text-[10px] uppercase tracking-[0.3em] mb-2">{t.about.role}</p>
                      <h3 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight mb-4">
                        Cristian <span className="text-white/40">Brown</span>
                      </h3>
                      
                      {/* Availability badge */}
                      <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]" />
                        <span className="text-green-400 text-[10px] font-bold uppercase tracking-widest">{t.about.available}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Platform Ecosystem Grid */}
                <div className="px-10 py-10 bg-[#161616] border-t border-white/5">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Core Ecosystem</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-accent-gold" />
                      <div className="w-12 h-[1px] bg-white/10 mt-0.5" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-y-10 gap-x-6">
                    {[
                      { name: 'Codex', icon: Code2 },
                      { name: 'Claude', icon: Brain },
                      { name: 'Antigravity', icon: Lightbulb },
                      { name: 'AI Studio', icon: PenTool },
                      { name: 'Gemini', icon: Search },
                      { name: 'Labs Google', icon: CheckCircle2 }
                    ].map((tech) => (
                      <div key={tech.name} className="flex flex-col items-center gap-3 group/tech">
                        <div className="relative">
                          <div className="absolute inset-0 bg-accent-gold blur-md opacity-0 group-hover/tech:opacity-20 transition-opacity" />
                          <tech.icon size={18} className="text-white/40 group-hover/tech:text-accent-gold transition-colors relative z-10" />
                        </div>
                        <span className="text-[10px] font-display font-bold text-white/60 group-hover/tech:text-white transition-colors text-center uppercase tracking-wider">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating ID Tag */}
              <div
                className="absolute -bottom-4 -right-4 px-5 py-3 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/10 hidden xl:block"
                style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
              >
                <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-0.5">BSTUDIO-SYS-8829-001</p>
              </div>
            </div>
          </div>

          {/* ── Right — Bio + Google certs ──────────────────────────────── */}
          <div>
            <div
              className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest mb-6"
              style={{ border: "1px solid rgba(71,196,255,0.2)", background: "rgba(71,196,255,0.05)", color: "#47c4ff" }}
            >
              {t.about.eyebrow}
            </div>

            <h2
              className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e5e5e5] mb-5 leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              {t.about.greeting}
            </h2>

            <p className="reveal reveal-delay-2 text-[#9e9e9e] text-lg leading-relaxed mb-8">
              {t.about.bio}
            </p>

            {/* Google certs block */}
            <div className="reveal reveal-delay-3">
              {/* Summary row */}
              <div
                className="flex items-start gap-5 mb-5 p-4 rounded-2xl"
                style={{ background: "rgba(10,15,30,0.8)", border: "1px solid rgba(71,196,255,0.15)" }}
              >
                <div className="text-center flex-shrink-0">
                  <p className="font-display font-bold text-4xl text-[#47c4ff] leading-none">7</p>
                  <p className="text-[#47c4ff]/50 text-xs mt-0.5">{t.about.certs}</p>
                </div>
                <div>
                  <p className="text-[#e5e5e5] text-sm font-semibold leading-tight mb-0.5">
                    {t.about.certTitle}
                  </p>
                  <p className="text-[#9e9e9e] text-xs leading-relaxed">
                    {t.about.certSub}
                  </p>
                </div>
              </div>

              {/* Credibility marquee — elegant horizontal strip */}
              <div
                className="mb-4 overflow-hidden relative group"
                style={{
                  maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                }}
              >
                <div
                  className="flex gap-3 w-max"
                  style={{
                    animation: "marquee-scroll 35s linear infinite",
                    animationPlayState: "running",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "paused"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "running"; }}
                >
                  {[...t.about.certNames, ...t.about.certNames].map((name: string, i: number) => {
                    const Icon = certIcons[i % certIcons.length];
                    const desc = t.about.certDescs[i % t.about.certDescs.length];
                    return (
                      <div
                        key={`${name}-${i}`}
                        className="relative flex items-center gap-2 px-3 py-2 rounded-full flex-shrink-0 cursor-default"
                        style={{
                          background: "#191919",
                          border: "1px solid rgba(72,72,72,0.2)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(71,196,255,0.35)";
                          (e.currentTarget as HTMLElement).style.background = "rgba(10,15,30,0.8)";
                          const tip = e.currentTarget.querySelector("[data-tip]") as HTMLElement | null;
                          if (tip) tip.style.opacity = "1";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(72,72,72,0.2)";
                          (e.currentTarget as HTMLElement).style.background = "#191919";
                          const tip = e.currentTarget.querySelector("[data-tip]") as HTMLElement | null;
                          if (tip) tip.style.opacity = "0";
                        }}
                      >
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                          style={{ background: "rgba(71,196,255,0.1)", border: "1px solid rgba(71,196,255,0.18)" }}
                        >
                          <Icon size={12} className="text-[#47c4ff]" />
                        </div>
                        <span className="text-[#d0d0d0] text-xs font-medium whitespace-nowrap">{name}</span>
                        {/* Tooltip */}
                        <div
                          data-tip
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1.5 rounded-lg text-[11px] text-[#9e9e9e] whitespace-nowrap pointer-events-none z-20 transition-opacity duration-200"
                          style={{
                            opacity: 0,
                            background: "#0e0e0e",
                            border: "1px solid rgba(71,196,255,0.2)",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
                          }}
                        >
                          {desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="text-[#3a3a3a] text-xs italic mb-8">
                {t.about.certNote}
              </p>
            </div>

            {/* CTA */}
            <div className="reveal reveal-delay-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-black font-semibold text-sm hover:scale-105 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #c6c6c7, #939eb5)",
                  boxShadow: "0 0 24px rgba(198,198,199,0.15)",
                }}
              >
                {t.about.ctaBtn}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
