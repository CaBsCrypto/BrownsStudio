"use client";

import { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonios = [
  {
    nombre: "Dra. Carmen Salinas",
    negocio: "Clínica Dental Sonríe",
    tipo: "Clínica Dental",
    rating: 5,
    texto:
      "Desde que lanzamos la web con Browns Studio, las consultas por WhatsApp se triplicaron. El sistema de citas online fue un game-changer para nosotros — los pacientes pueden agendar a cualquier hora sin tener que llamar. Increíble trabajo.",
    iniciales: "CS",
    color: "from-teal-600/30 to-teal-800/10",
  },
  {
    nombre: "Marco Tanaka",
    negocio: "Sakura Sushi Bar",
    tipo: "Restaurante",
    rating: 5,
    texto:
      "Teníamos miedo de invertir en una web y que no resultara, pero Browns Studio nos convenció con sus resultados. El menú digital es exactamente lo que queríamos — elegante, rápido y nuestros clientes lo aman. ¡Lo recomiendo sin dudarlo!",
    iniciales: "MT",
    color: "from-red-700/30 to-red-900/10",
  },
  {
    nombre: "Lic. Roberto Méndez",
    negocio: "Estudio Legal Méndez",
    tipo: "Despacho Legal",
    rating: 5,
    texto:
      "La profesionalidad del trabajo es impecable. Entendieron perfectamente la imagen que un estudio legal necesita proyectar. En dos meses ya estábamos en Google con las búsquedas que más importan para nuestro negocio.",
    iniciales: "RM",
    color: "from-blue-800/30 to-blue-900/10",
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
    <section ref={sectionRef} id="testimonios" className="section-padding bg-bg-secondary">
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
              className={`reveal reveal-delay-${i + 1} group relative p-6 rounded-2xl border border-white/5 hover:border-accent-gold/20 bg-gradient-to-br ${t.color} transition-all duration-500 hover:-translate-y-1 hover:shadow-card`}
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
              <p className="text-text-secondary text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.texto}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
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
