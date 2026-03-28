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
      style={{ background: "#000000" }}
    >
      {/* Central AI orb — the void's only light source */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(5,169,227,0.05) 0%, transparent 65%)" }}
      />
      {/* Secondary silver orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(147,158,181,0.04) 0%, transparent 70%)" }}
      />

      {/* Floating geometric accents */}
      <div
        className="absolute top-12 left-12 w-14 h-14 rotate-45 animate-float opacity-20"
        style={{ border: "1px solid rgba(147,158,181,0.2)" }}
      />
      <div
        className="absolute bottom-12 right-12 w-9 h-9 rotate-12 animate-float opacity-15"
        style={{ border: "1px solid rgba(71,196,255,0.2)", animationDelay: "2s" }}
      />
      {/* Vertical bleed line — intentional asymmetry */}
      <div
        className="absolute left-0 top-0 w-px h-full opacity-20"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(71,196,255,0.3), transparent)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* AI status badge */}
        <div
          className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest mb-6"
          style={{ border: "1px solid rgba(71,196,255,0.2)", background: "rgba(71,196,255,0.05)", color: "#47c4ff" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#47c4ff] animate-pulse" />
          Espacios disponibles este mes: {SITE_CONFIG.spotsAvailable}
        </div>

        {/* Display headline */}
        <h2
          className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#e5e5e5] mb-6 leading-tight"
          style={{ letterSpacing: "-0.03em" }}
        >
          ¿Listo para crecer
          <br />
          con web{" "}
          <span className="text-gradient-gold">+ IA?</span>
        </h2>

        <p className="reveal reveal-delay-2 text-[#9e9e9e] text-lg sm:text-xl mb-4 max-w-xl mx-auto leading-relaxed">
          La primera consulta es gratuita y sin compromiso. Cuéntanos tu idea y en 24 horas te enviamos una propuesta.
        </p>

        <p className="reveal reveal-delay-2 text-[#3a3a3a] text-sm mb-10">
          Cada mes tomamos un número limitado de proyectos para garantizar calidad y atención personalizada.
        </p>

        {/* CTAs */}
        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          {/* Primary — metallic */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base text-black hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
            style={{
              background: "linear-gradient(135deg, #c6c6c7, #939eb5)",
              boxShadow: "0 0 32px rgba(198,198,199,0.15)",
            }}
          >
            <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
            Escribir por WhatsApp
          </a>
          {/* Secondary — ghost outline */}
          <a
            href={`mailto:${SITE_CONFIG.email}?subject=Consulta de proyecto web&body=Hola, me interesa cotizar un proyecto web para mi negocio.`}
            className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base text-[#9e9e9e] hover:text-[#47c4ff] transition-all duration-300 w-full sm:w-auto justify-center"
            style={{ border: "1px solid rgba(72,72,72,0.3)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(71,196,255,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(72,72,72,0.3)";
            }}
          >
            <Mail size={18} className="group-hover:scale-110 transition-transform" />
            Enviar un email
          </a>
        </div>

        {/* Trust signals — label-sm uppercase */}
        <div className="reveal reveal-delay-4 flex flex-col sm:flex-row items-center justify-center gap-6 text-[#3a3a3a] text-xs uppercase tracking-widest">
          {["✓ Respuesta en menos de 24h", "✓ Primera consulta gratis", "✓ Sin compromiso"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
