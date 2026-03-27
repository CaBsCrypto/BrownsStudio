"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2, Brain, Code2, BarChart3, FileText, PenTool, Search, Lightbulb, type LucideIcon } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";

interface Cert {
  area: string;
  desc: string;
  icon: LucideIcon;
}

const certificaciones: Cert[] = [
  { area: "AI Fundamentals",      desc: "Base sólida en IA",            icon: Brain },
  { area: "AI for App Building",  desc: "Apps con IA integrada",         icon: Code2 },
  { area: "AI for Data Analysis", desc: "Datos que toman decisiones",    icon: BarChart3 },
  { area: "AI for Content",       desc: "Contenido automatizado",        icon: FileText },
  { area: "AI for Writing",       desc: "Textos potenciados con IA",     icon: PenTool },
  { area: "AI for Research",      desc: "Investigación asistida",        icon: Search },
  { area: "AI for Brainstorming", desc: "Ideas y estrategia con IA",     icon: Lightbulb },
];

const skills = ["Next.js", "TypeScript", "Python", "Web3", "AI/ML", "Supabase"];

export default function SobreMi() {
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
    <section ref={sectionRef} id="sobre-mi" className="section-padding bg-bg-light">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Avatar card */}
          <div className="reveal">
            <div className="relative w-full max-w-sm mx-auto lg:mx-0">
              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-accent-gold/10 blur-2xl scale-95" />

              <div className="relative rounded-3xl border border-stone-200 bg-white overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
                {/* Identity area */}
                <div className="aspect-square flex flex-col items-center justify-center bg-gradient-to-br from-bg-tertiary via-bg-secondary to-bg-primary relative overflow-hidden p-8">
                  {/* Dot grid pattern */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: "radial-gradient(circle, #c8956c 1px, transparent 1px)",
                      backgroundSize: "22px 22px",
                    }}
                  />
                  {/* Concentric rings */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    {[160, 220, 280].map((size) => (
                      <div
                        key={size}
                        className="absolute border border-accent-gold/50 rounded-full"
                        style={{ width: size, height: size }}
                      />
                    ))}
                  </div>

                  {/* Monogram */}
                  <div className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-accent-gold to-accent-gold-light flex items-center justify-center shadow-gold mb-5">
                    <span className="font-display font-bold text-4xl text-bg-primary">C</span>
                  </div>

                  {/* Skill chips */}
                  <div className="relative z-10 flex flex-wrap justify-center gap-2 max-w-[220px]">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white/65 text-xs font-medium backdrop-blur-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Name badge */}
                <div className="p-5 border-t border-stone-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display font-bold text-xl text-stone-900">Cristian</p>
                      <p className="text-stone-500 text-sm">Fundador · Browns Studio</p>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-green-700 text-xs font-medium">Disponible</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-2 lg:right-0 px-3 py-2 rounded-2xl bg-white border border-stone-200 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-accent-gold" />
                  <span className="text-stone-800 text-xs font-medium">Freelance verificado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Bio + certs */}
          <div>
            <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-gold/30 bg-accent-gold/8 text-accent-gold text-xs font-medium tracking-widest uppercase mb-6">
              Quién está detrás
            </div>

            <h2 className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-5 leading-tight">
              Hola, soy Cristian —
              <br />
              <span className="text-gradient-gold">web + IA</span> para
              <br />
              tu negocio.
            </h2>

            <p className="reveal reveal-delay-2 text-stone-600 text-lg leading-relaxed mb-8">
              Desarrollador web freelance certificado por Google en Inteligencia Artificial. Fundé Browns Studio para darle a los negocios locales acceso a las mismas herramientas que usan las grandes empresas — a un precio justo.
            </p>

            {/* Google certs */}
            <div className="reveal reveal-delay-3">
              {/* Header + big stat */}
              <div className="flex items-start gap-5 mb-5 p-4 rounded-2xl bg-blue-50 border border-blue-200/60">
                <div className="text-center flex-shrink-0">
                  <p className="font-display font-bold text-4xl text-blue-600 leading-none">7</p>
                  <p className="text-blue-500/70 text-xs mt-0.5">certs.</p>
                </div>
                <div>
                  <p className="text-stone-800 text-sm font-semibold leading-tight mb-0.5">
                    Certificado por Google en IA
                  </p>
                  <p className="text-stone-500 text-xs leading-relaxed">
                    Inteligencia Artificial con Gemini · Google Cloud
                  </p>
                </div>
              </div>

              {/* 7 cert cards — 2 columns */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {certificaciones.map((cert) => {
                  const Icon = cert.icon;
                  return (
                    <div
                      key={cert.area}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white border border-stone-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={14} className="text-blue-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-stone-800 text-xs font-semibold leading-tight">{cert.area}</p>
                        <p className="text-stone-500 text-xs leading-tight mt-0.5">{cert.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-stone-400 text-xs italic mb-8">
                Cada certificación = una herramienta real aplicada a tu negocio.
              </p>
            </div>

            {/* CTA */}
            <div className="reveal reveal-delay-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-gold text-bg-primary font-semibold text-sm hover:bg-accent-gold-light transition-all duration-300 shadow-gold hover:scale-105"
              >
                Conversemos sobre tu proyecto
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
