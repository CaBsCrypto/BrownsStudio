"use client";

import { useEffect, useRef } from "react";
import { MessageCircle, Mail } from "lucide-react";
import { SITE_CONFIG, WHATSAPP_URL } from "@/lib/config";

export default function CTA() {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative section-padding overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1A1614 0%, #0D0B0A 100%)" }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent-gold/5 blur-3xl" />

      {/* Geometric decorations */}
      <div className="absolute top-10 left-10 w-16 h-16 border border-accent-gold/15 rotate-45 animate-float opacity-40" />
      <div className="absolute bottom-10 right-10 w-10 h-10 border border-accent-gold/10 rotate-12 animate-float opacity-30" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-gold/30 bg-accent-gold/5 text-accent-gold text-xs font-medium tracking-widest uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
          Espacios disponibles este mes: {SITE_CONFIG.spotsAvailable}
        </div>

        <h2 className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-primary mb-6 leading-tight">
          ¿Listo para tener la web
          <br />
          que tu negocio{" "}
          <span className="text-gradient-gold">merece?</span>
        </h2>

        <p className="reveal reveal-delay-2 text-text-secondary text-lg sm:text-xl mb-4 max-w-xl mx-auto leading-relaxed">
          La primera consulta es gratuita y sin compromiso. Cuéntanos tu idea y en 24 horas te enviamos una propuesta.
        </p>

        <p className="reveal reveal-delay-2 text-text-muted text-sm mb-10">
          Cada mes tomamos un número limitado de proyectos para garantizar calidad y atención personalizada.
        </p>

        {/* CTAs */}
        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-accent-gold text-bg-primary font-semibold text-base hover:bg-accent-gold-light transition-all duration-300 shadow-gold hover:shadow-gold-lg hover:scale-105 w-full sm:w-auto justify-center"
          >
            <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
            Escribir por WhatsApp
          </a>
          <a
            href={`mailto:${SITE_CONFIG.email}?subject=Consulta de proyecto web&body=Hola, me interesa cotizar un proyecto web para mi negocio.`}
            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-accent-gold/40 text-text-primary font-semibold text-base hover:border-accent-gold hover:bg-accent-gold/10 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <Mail size={18} className="text-accent-gold group-hover:scale-110 transition-transform" />
            Enviar un email
          </a>
        </div>

        {/* Trust signals */}
        <div className="reveal reveal-delay-4 flex flex-col sm:flex-row items-center justify-center gap-6 text-text-muted text-sm">
          {[
            "✓ Respuesta en menos de 24h",
            "✓ Primera consulta gratis",
            "✓ Sin compromiso",
          ].map((item) => (
            <span key={item} className="flex items-center gap-1">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
