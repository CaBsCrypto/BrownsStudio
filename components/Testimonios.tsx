"use client";

import { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonios = [
  {
    nombre: "Valentina Ríos",
    negocio: "Clínica EstéticaMed",
    tipo: "Salud & Estética",
    rating: 5,
    texto:
      "Tenía a dos personas respondiendo WhatsApp todo el día y aun así perdíamos consultas. Browns Studio mapeó nuestro proceso de agendamiento y construyó un agente que ahora maneja el 80% de las consultas solo. Mi equipo se liberó para atención de calidad.",
    iniciales: "VR",
    color: "from-teal-600/30 to-teal-800/10",
    resultado: "80% de consultas gestionadas por el agente",
  },
  {
    nombre: "Diego Paredes",
    negocio: "InmoParedes",
    tipo: "Inmobiliaria",
    rating: 5,
    texto:
      "El proceso de calificación de leads nos consumía horas. Ahora el agente pregunta, filtra y solo me pasa los contactos listos para cerrar. En el primer mes recuperé 12 horas semanales y cerré más operaciones que antes con menos esfuerzo.",
    iniciales: "DP",
    color: "from-blue-700/30 to-blue-900/10",
    resultado: "12h semanales recuperadas por el equipo",
  },
  {
    nombre: "Catalina Soto",
    negocio: "Umbra Creator Hub",
    tipo: "Agencia de Marketing",
    rating: 5,
    texto:
      "El onboarding de clientes era un caos de DMs y Excel. El agente que construyeron con nosotros ahora guía a cada cliente nuevo por todo el proceso — contratos, briefs, accesos — sin que yo tenga que intervenir. Escalar se volvió posible.",
    iniciales: "CS",
    color: "from-purple-700/30 to-purple-900/10",
    resultado: "Onboarding completamente automatizado",
  },
];

export default function Testimonios() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
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
    <section ref={sectionRef} id="testimonios" className="section-padding bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-gold/20 text-accent-gold text-xs font-medium tracking-widest uppercase mb-4">
            Testimonios
          </div>
          <h2 className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Lo que dicen{" "}
            <span className="text-gradient-gold">nuestros clientes</span>
          </h2>
          <p className="reveal reveal-delay-2 text-text-secondary text-lg max-w-2xl mx-auto">
            La mejor prueba de nuestro trabajo son los resultados que generamos para cada negocio.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonios.map((t, i) => (
            <div
              key={t.nombre}
              className={`reveal reveal-delay-${i + 1} group relative p-6 rounded-2xl border border-white/5 hover:border-accent-gold/25 bg-gradient-to-br ${t.color} backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-card`}
            >
              {/* Quote icon */}
              <Quote
                size={32}
                className="text-accent-gold/20 mb-4"
                fill="currentColor"
              />

              {/* Rating */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className="text-accent-gold"
                    fill="currentColor"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-text-secondary text-sm leading-relaxed mb-4 italic">
                &ldquo;{t.texto}&rdquo;
              </p>

              {/* Result chip */}
              {t.resultado && (
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold mb-4"
                  style={{
                    background: "rgba(0,240,255,0.06)",
                    border: "1px solid rgba(0,240,255,0.18)",
                    color: "#00f0ff",
                  }}
                >
                  <span style={{ fontSize: "9px" }}>✦</span>
                  {t.resultado}
                </div>
              )}

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} border border-accent-gold/20 flex items-center justify-center flex-shrink-0`}
                >
                  <span className="font-display font-bold text-sm text-accent-gold">
                    {t.iniciales}
                  </span>
                </div>
                <div>
                  <p className="text-text-primary text-sm font-semibold">{t.nombre}</p>
                  <p className="text-text-muted text-xs">
                    {t.negocio} · {t.tipo}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
