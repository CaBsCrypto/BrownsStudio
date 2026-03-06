"use client";

import { useEffect, useRef } from "react";
import { MessageSquare, PenTool, Code2, Rocket } from "lucide-react";

const pasos = [
  {
    numero: "01",
    icono: MessageSquare,
    titulo: "Conversación",
    descripcion:
      "Nos reunimos para entender tu negocio y objetivos. Sin costo y sin compromiso.",
  },
  {
    numero: "02",
    icono: PenTool,
    titulo: "Diseño",
    descripcion:
      "Creamos un mockup personalizado para tu aprobación antes de escribir una línea de código.",
  },
  {
    numero: "03",
    icono: Code2,
    titulo: "Desarrollo",
    descripcion:
      "Construimos con las últimas tecnologías. Revisiones ilimitadas hasta que estés 100% conforme.",
  },
  {
    numero: "04",
    icono: Rocket,
    titulo: "Lanzamiento",
    descripcion:
      "Publicamos tu web o solución IA y te enseñamos a gestionarla. Soporte continuo incluido.",
  },
];

export default function Proceso() {
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
    <section ref={sectionRef} id="proceso" className="section-padding bg-bg-secondary">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-gold/20 text-accent-gold text-xs font-medium tracking-widest uppercase mb-4">
            Cómo Trabajamos
          </div>
          <h2 className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Un proceso claro,
            <span className="text-gradient-gold"> sin sorpresas</span>
          </h2>
        </div>

        {/* Steps — horizontal on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pasos.map((paso, i) => {
            const Icon = paso.icono;
            return (
              <div
                key={paso.numero}
                className={`reveal reveal-delay-${i + 1} group relative p-6 rounded-2xl border border-white/5 hover:border-accent-gold/20 bg-bg-primary/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-card`}
              >
                <span className="absolute top-4 right-4 font-display text-4xl font-bold text-white/5 group-hover:text-accent-gold/10 transition-colors duration-500 select-none">
                  {paso.numero}
                </span>

                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-accent-gold/10 border border-accent-gold/20 group-hover:bg-accent-gold/20 transition-colors duration-300">
                  <Icon size={20} className="text-accent-gold" />
                </div>

                <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
                  {paso.titulo}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {paso.descripcion}
                </p>

                {/* Connector */}
                {i < pasos.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t border-dashed border-accent-gold/20" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
