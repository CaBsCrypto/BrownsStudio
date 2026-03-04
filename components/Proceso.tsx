"use client";

import { useEffect, useRef } from "react";
import {
  MessageSquare,
  PenTool,
  Code2,
  RefreshCw,
  Rocket,
  HeartHandshake,
} from "lucide-react";

const pasos = [
  {
    numero: "01",
    icono: MessageSquare,
    titulo: "Conversación Inicial",
    descripcion:
      "Nos reunimos (virtual o presencial) para entender tu negocio, tus objetivos y tu público. Sin compromiso y sin costo.",
  },
  {
    numero: "02",
    icono: PenTool,
    titulo: "Propuesta y Diseño",
    descripcion:
      "Creamos un mockup personalizado con la identidad visual de tu negocio para tu aprobación antes de escribir una sola línea de código.",
  },
  {
    numero: "03",
    icono: Code2,
    titulo: "Desarrollo",
    descripcion:
      "Construimos tu web con las últimas tecnologías. Rápida, segura, optimizada y lista para aparecer en Google.",
  },
  {
    numero: "04",
    icono: RefreshCw,
    titulo: "Revisiones",
    descripcion:
      "Ajustamos cada detalle hasta que estés 100% satisfecho. Sin límite de revisiones — tu aprobación es nuestra prioridad.",
  },
  {
    numero: "05",
    icono: Rocket,
    titulo: "Lanzamiento",
    descripcion:
      "Publicamos tu web en el servidor y te enseñamos todo lo que necesitas saber para manejarte con ella.",
  },
  {
    numero: "06",
    icono: HeartHandshake,
    titulo: "Soporte Continuo",
    descripcion:
      "No te dejamos solo. Ofrecemos mantenimiento, actualizaciones y mejoras constantes para que tu web siempre esté al día.",
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-gold/20 text-accent-gold text-xs font-medium tracking-widest uppercase mb-4">
            Cómo Trabajamos
          </div>
          <h2 className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Un proceso claro,
            <span className="text-gradient-gold"> sin sorpresas</span>
          </h2>
          <p className="reveal reveal-delay-2 text-text-secondary text-lg max-w-2xl mx-auto">
            Sabemos que confiar tu imagen de negocio a alguien es un paso importante. Por eso nuestro proceso es transparente y colaborativo en cada etapa.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pasos.map((paso, i) => {
            const Icon = paso.icono;
            return (
              <div
                key={paso.numero}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)} group relative p-6 rounded-2xl border border-white/5 hover:border-accent-gold/20 bg-bg-primary/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-card`}
              >
                {/* Number */}
                <span className="absolute top-4 right-4 font-display text-4xl font-bold text-white/5 group-hover:text-accent-gold/10 transition-colors duration-500 select-none">
                  {paso.numero}
                </span>

                {/* Icon */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-accent-gold/10 border border-accent-gold/20 group-hover:bg-accent-gold/20 transition-colors duration-300">
                  <Icon size={20} className="text-accent-gold" />
                </div>

                <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
                  {paso.titulo}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {paso.descripcion}
                </p>

                {/* Connector line (visible on large screens) */}
                {i < pasos.length - 1 && (i + 1) % 3 !== 0 && (
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
