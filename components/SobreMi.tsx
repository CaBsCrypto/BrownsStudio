"use client";

import { useEffect, useRef } from "react";
import {
  CheckCircle2, Brain, Code2, BarChart3, FileText,
  PenTool, Search, Lightbulb, type LucideIcon,
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n/LanguageContext";

const certIcons: LucideIcon[] = [Brain, Code2, BarChart3, FileText, PenTool, Search, Lightbulb];

const skills = ["Next.js", "TypeScript", "Python", "Web3", "AI/ML", "Supabase"];

export default function SobreMi() {
  const { t } = useLang();
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
                  background: "#191919",
                  
                  border: "1px solid rgba(72,72,72,0.15)",
                  boxShadow: "0 32px 64px rgba(0,0,0,0.6)",
                }}
              >
                {/* Identity hero area */}
                <div
                  className="aspect-square flex flex-col items-center justify-center relative overflow-hidden p-8"
                  style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #131313 60%, #0e0e0e 100%)" }}
                >
                  {/* Dot grid */}
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: "radial-gradient(circle, #939eb5 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  {/* Concentric rings */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {[160, 220, 280].map((size) => (
                      <div
                        key={size}
                        className="absolute rounded-full"
                        style={{
                          width: size, height: size,
                          border: "1px solid rgba(147,158,181,0.08)",
                        }}
                      />
                    ))}
                  </div>
                  {/* AI orb */}
                  <div
                    className="absolute top-8 right-8 w-20 h-20 rounded-full blur-2xl"
                    style={{ background: "radial-gradient(circle, rgba(71,196,255,0.1) 0%, transparent 70%)" }}
                  />

                  {/* Monogram */}
                  <div
                    className="relative z-10 w-24 h-24 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                      background: "linear-gradient(135deg, #c6c6c7, #939eb5)",
                      boxShadow: "0 0 32px rgba(198,198,199,0.2)",
                    }}
                  >
                    <span className="font-display font-bold text-4xl text-black">C</span>
                  </div>

                  {/* Skill chips */}
                  <div className="relative z-10 flex flex-wrap justify-center gap-2 max-w-[220px]">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(72,72,72,0.3)",
                          color: "#9e9e9e",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Name badge */}
                <div
                  className="p-5"
                  style={{ borderTop: "1px solid rgba(72,72,72,0.2)" }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display font-bold text-xl text-[#e5e5e5]">{t.about.greeting}</p>
                      <p className="text-[#5a5a5a] text-sm">{t.about.role}</p>
                    </div>
                    <div
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                      style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-xs font-medium">{t.about.available}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating verification badge */}
              <div
                className="absolute -bottom-4 -right-2 lg:right-0 px-3 py-2 rounded-2xl"
                style={{
                  background: "#191919",
                  border: "1px solid rgba(72,72,72,0.2)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#c6c6c7]" />
                  <span className="text-[#9e9e9e] text-xs font-medium">{t.about.verified}</span>
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

              {/* 7 cert cards — 2 col */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {t.about.certNames.map((name: string, i: number) => {
                  const Icon = certIcons[i];
                  return (
                    <div
                      key={name}
                      className="flex items-start gap-3 p-3 rounded-xl transition-all duration-300 group cursor-default"
                      style={{
                        background: "#191919",
                        border: "1px solid rgba(72,72,72,0.15)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.border = "1px solid rgba(71,196,255,0.2)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(10,15,30,0.6)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.border = "1px solid rgba(72,72,72,0.15)";
                        (e.currentTarget as HTMLElement).style.background = "#191919";
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: "rgba(71,196,255,0.08)", border: "1px solid rgba(71,196,255,0.15)" }}
                      >
                        <Icon size={14} className="text-[#47c4ff]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[#d0d0d0] text-xs font-semibold leading-tight">{name}</p>
                        <p className="text-[#5a5a5a] text-xs leading-tight mt-0.5">{t.about.certDescs[i]}</p>
                      </div>
                    </div>
                  );
                })}
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
