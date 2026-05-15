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

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left — Glass identity card ──────────────────────────────── */}
          <div className="reveal">
            <div className="relative w-full max-w-sm mx-auto lg:mx-0">

              {/* Ambient glow behind the card */}
              <div
                className="absolute inset-0 rounded-3xl blur-2xl scale-95 pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(147,158,181,0.08) 0%, transparent 70%)" }}
              />

              {/* Card — glass sheet */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: "#161616",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.7)",
                }}
              >
                {/* Technical Header */}
                <div className="flex items-center justify-between px-6 py-3 bg-white/5 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                    <span className="text-[10px] font-mono text-white/40 tracking-[0.2em] uppercase">ID: 2026-VIBE-001</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                    <CheckCircle2 size={10} className="text-accent-gold" />
                    <span className="text-[9px] font-mono text-accent-gold uppercase tracking-wider">{t.about.verified}</span>
                  </div>
                </div>

                {/* Identity Content Area */}
                <div className="relative p-8">
                  {/* Background Accents */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "radial-gradient(circle, #fff 0.5px, transparent 0.5px)",
                      backgroundSize: "20px 20px",
                    }}
                  />

                  <div className="relative z-10 flex flex-col items-center sm:flex-row sm:items-start gap-8">
                    {/* Left: Photo */}
                    <div className="relative flex-shrink-0 group/photo">
                      <div className="absolute inset-0 rounded-2xl bg-accent-gold blur-xl opacity-20 group-hover/photo:opacity-40 transition-opacity" />
                      <div className="relative w-32 h-32 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/cristian.jpeg"
                          alt="Cristian"
                          className="w-full h-full object-cover grayscale-[0.2] group-hover/photo:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    </div>

                    {/* Right: Key Stats */}
                    <div className="flex flex-col gap-5 pt-2">
                      <div className="space-y-1">
                        <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{lang === 'en' ? 'Projects' : 'Proyectos'}</p>
                        <p className="font-display font-bold text-2xl text-white">+120</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{lang === 'en' ? 'Experience' : 'Experiencia'}</p>
                        <p className="font-display font-bold text-2xl text-white">4.5 <span className="text-xs text-white/40">{lang === 'en' ? 'Years' : 'Años'}</span></p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{lang === 'en' ? 'Efficiency' : 'Eficiencia'}</p>
                        <p className="font-display font-bold text-2xl text-accent-gold">99.8%</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills Strip */}
                  <div className="relative z-10 flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/5">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/5 text-[10px] font-mono text-white/50 uppercase tracking-tight"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Identity Footer */}
                <div className="px-8 py-6 bg-white/[0.02] border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-bold text-xl text-white leading-tight">{t.about.greeting}</h3>
                      <p className="text-white/40 text-sm mt-1">{t.about.role}</p>
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-[10px] font-bold uppercase tracking-wider">{t.about.available}</span>
                    </div>
                  </div>
                </div>
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
