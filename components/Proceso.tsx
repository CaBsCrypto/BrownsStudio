"use client";

import { useEffect, useRef } from "react";
import { MessageSquare, PenTool, Code2, Rocket } from "lucide-react";

const pasos = [
  {
    numero: "01",
    icono: MessageSquare,
    titulo: "Conversación",
    descripcion: "Nos reunimos para entender tu negocio y objetivos. Sin costo y sin compromiso.",
  },
  {
    numero: "02",
    icono: PenTool,
    titulo: "Diseño",
    descripcion: "Creamos un mockup personalizado para tu aprobación antes de escribir una línea de código.",
  },
  {
    numero: "03",
    icono: Code2,
    titulo: "Desarrollo",
    descripcion: "Construimos con las últimas tecnologías. Revisiones ilimitadas hasta que estés 100% conforme.",
  },
  {
    numero: "04",
    icono: Rocket,
    titulo: "Lanzamiento",
    descripcion: "Publicamos tu web o solución IA y te enseñamos a gestionarla. Soporte continuo incluido.",
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
    <section
      ref={sectionRef}
      id="proceso"
      className="section-padding"
      style={{ background: "#131313" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest mb-4"
            style={{ border: "1px solid rgba(198,198,199,0.15)", background: "rgba(198,198,199,0.04)", color: "#9e9e9e" }}
          >
            Cómo Trabajamos
          </div>
          <h2
            className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e5e5e5] mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            Un proceso claro,
            <span className="text-gradient-gold"> sin sorpresas</span>
          </h2>
        </div>

        {/* Steps — horizontal on desktop, roadmap-style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pasos.map((paso, i) => {
            const Icon = paso.icono;
            return (
              <div
                key={paso.numero}
                className={`reveal reveal-delay-${i + 1} group relative p-6 rounded-2xl transition-all duration-500`}
                style={{
                  background: "rgba(25,25,25,0.6)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(72,72,72,0.12)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(198,198,199,0.15)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(72,72,72,0.12)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {/* Big number — ghost */}
                <span
                  className="absolute top-4 right-4 font-display text-4xl font-bold select-none"
                  style={{ color: "rgba(255,255,255,0.03)" }}
                >
                  {paso.numero}
                </span>

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                  style={{ background: "rgba(198,198,199,0.06)", border: "1px solid rgba(198,198,199,0.12)" }}
                >
                  <Icon size={20} className="text-[#9e9e9e]" />
                </div>

                {/* Active node indicator — timeline style */}
                <div
                  className="absolute top-0 left-6 w-px h-4 -translate-y-full"
                  style={{ background: i === 0 ? "transparent" : "rgba(72,72,72,0.3)" }}
                />

                <h3
                  className="font-display font-semibold text-lg text-[#e5e5e5] mb-2"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {paso.titulo}
                </h3>
                <p className="text-[#5a5a5a] text-sm leading-relaxed">{paso.descripcion}</p>

                {/* Connector dashes */}
                {i < pasos.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t border-dashed"
                    style={{ borderColor: "rgba(72,72,72,0.3)" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
