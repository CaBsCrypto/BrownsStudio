"use client";

import { useEffect, useRef } from "react";
import { Code2, Heart, Zap, Users, CheckCircle2 } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";

const valores = [
  {
    icon: Code2,
    titulo: "Código limpio",
    desc: "Webs rápidas, seguras y fáciles de mantener.",
  },
  {
    icon: Heart,
    titulo: "Atención real",
    desc: "Trato directo, sin intermediarios ni agencias.",
  },
  {
    icon: Zap,
    titulo: "Entrega rápida",
    desc: "Resultados en días, no en meses.",
  },
  {
    icon: Users,
    titulo: "Enfoque en negocios",
    desc: "Cada decisión de diseño busca más clientes para ti.",
  },
];

const techStack = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "Node.js", "Vercel", "SEO", "WhatsApp API",
];

const logros = [
  { valor: "3+", label: "Años de experiencia" },
  { valor: "15+", label: "Proyectos entregados" },
  { valor: "100%", label: "Clientes satisfechos" },
];

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
    <section ref={sectionRef} id="sobre-mi" className="section-padding bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-gold/20 text-accent-gold text-xs font-medium tracking-widest uppercase mb-12">
          Quién está detrás
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Avatar + stats */}
          <div className="reveal">
            <div className="relative">
              {/* Avatar card */}
              <div className="relative w-full max-w-sm mx-auto lg:mx-0">
                {/* Background glow */}
                <div className="absolute inset-0 rounded-3xl bg-accent-gold/10 blur-2xl scale-95" />

                <div className="relative rounded-3xl border border-accent-gold/20 bg-bg-secondary overflow-hidden">
                  {/* Photo placeholder */}
                  <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-bg-tertiary via-bg-secondary to-bg-primary relative overflow-hidden">
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-10">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute border border-accent-gold/40 rounded-full"
                          style={{
                            width: `${(i + 1) * 80}px`,
                            height: `${(i + 1) * 80}px`,
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        />
                      ))}
                    </div>

                    {/* Initials */}
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-accent-gold to-accent-gold-light flex items-center justify-center shadow-gold-lg">
                        <span className="font-display font-bold text-5xl text-bg-primary">
                          C
                        </span>
                      </div>
                      <p className="text-text-muted text-sm mt-2">Tu foto aquí pronto 😄</p>
                    </div>
                  </div>

                  {/* Name card */}
                  <div className="p-5 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-display font-bold text-xl text-text-primary">Cabs</p>
                        <p className="text-text-muted text-sm">Fundador · Browns Studio</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-green-400 text-xs font-medium">Disponible</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 lg:right-0 px-4 py-2 rounded-2xl bg-bg-tertiary border border-accent-gold/20 shadow-card">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-accent-gold" />
                    <span className="text-text-primary text-sm font-medium">Freelance verificado</span>
                  </div>
                </div>
              </div>

              {/* Logros */}
              <div className="grid grid-cols-3 gap-3 mt-10">
                {logros.map((logro) => (
                  <div
                    key={logro.label}
                    className="p-4 rounded-2xl bg-bg-secondary border border-white/5 text-center hover:border-accent-gold/20 transition-colors duration-300"
                  >
                    <p className="font-display font-bold text-2xl text-gradient-gold mb-1">
                      {logro.valor}
                    </p>
                    <p className="text-text-muted text-xs leading-tight">{logro.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Bio + valores */}
          <div>
            <h2 className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
              Hola, soy Cabs —
              <br />
              <span className="text-gradient-gold">construyo webs</span>
              <br />
              que venden.
            </h2>

            <p className="reveal reveal-delay-2 text-text-secondary text-lg leading-relaxed mb-4">
              Soy desarrollador web freelance con experiencia trabajando con negocios locales en Latinoamérica. Fundé Browns Studio para ofrecer lo que las agencias no dan: <span className="text-text-primary font-medium">atención personalizada, precios justos y resultados reales.</span>
            </p>

            <p className="reveal reveal-delay-2 text-text-secondary leading-relaxed mb-8">
              Cada proyecto que tomo lo trato como si fuera mi propio negocio. No entrego webs genéricas — entrego herramientas de ventas diseñadas para que tu cliente potencial tome acción.
            </p>

            {/* Valores */}
            <div className="reveal reveal-delay-3 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {valores.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.titulo}
                    className="flex items-start gap-3 p-4 rounded-xl bg-bg-secondary border border-white/5 hover:border-accent-gold/20 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="w-9 h-9 rounded-lg bg-accent-gold/10 flex items-center justify-center flex-shrink-0 border border-accent-gold/20">
                      <Icon size={16} className="text-accent-gold" />
                    </div>
                    <div>
                      <p className="text-text-primary text-sm font-semibold mb-0.5">{v.titulo}</p>
                      <p className="text-text-muted text-xs">{v.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tech stack */}
            <div className="reveal reveal-delay-3 mb-8">
              <p className="text-text-muted text-xs font-medium tracking-widest uppercase mb-3">
                Tecnologías
              </p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs text-text-secondary bg-bg-secondary border border-white/5 hover:border-accent-gold/20 hover:text-accent-gold transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="reveal reveal-delay-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-gold text-bg-primary font-semibold text-sm hover:bg-accent-gold-light transition-all duration-300 shadow-gold hover:shadow-gold-lg hover:scale-105"
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
