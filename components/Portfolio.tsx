"use client";

import { useEffect, useRef } from "react";
import { proyectos } from "@/data/proyectos";
import ProyectoCard from "./ProyectoCard";
import { WHATSAPP_URL } from "@/lib/config";

export default function Portfolio() {
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
    <section ref={sectionRef} id="portfolio" className="section-padding bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-gold/20 text-accent-gold text-xs font-medium tracking-widest uppercase mb-4">
            Nuestro Trabajo
          </div>
          <h2 className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Proyectos que{" "}
            <span className="text-gradient-gold">hablan por sí solos</span>
          </h2>
          <p className="reveal reveal-delay-2 text-text-secondary text-lg max-w-2xl mx-auto">
            Cada proyecto es único. Diseñamos webs que reflejan la identidad de cada negocio y están optimizadas para convertir visitantes en clientes.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {proyectos.map((proyecto, i) => (
            <ProyectoCard key={proyecto.slug} proyecto={proyecto} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal text-center">
          <p className="text-text-muted text-sm mb-4">
            ¿Quieres que tu negocio sea el próximo en nuestra lista?
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent-gold text-bg-primary font-semibold hover:bg-accent-gold-light transition-all duration-300 shadow-gold hover:shadow-gold-lg hover:scale-105"
          >
            Empezar mi proyecto
          </a>
        </div>
      </div>
    </section>
  );
}
