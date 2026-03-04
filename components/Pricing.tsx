"use client";

import { useEffect, useRef } from "react";
import { Check, Zap } from "lucide-react";
import { getWhatsAppWithPackage } from "@/lib/config";

const paquetes = [
  {
    nombre: "Básico",
    subtitulo: "Para empezar online",
    precio: "$150",
    descripcion: "Ideal para negocios que necesitan presencia digital sin complicaciones.",
    features: [
      "Landing page (1 página)",
      "Diseño responsive mobile-first",
      "Formulario de contacto",
      "Integración WhatsApp",
      "SEO básico",
      "Google Analytics",
      "Entrega en 5 días hábiles",
      "1 ronda de revisiones",
    ],
    noIncluye: ["Blog o CMS", "Sistema de citas", "Tienda online"],
    destacado: false,
    color: "border-white/10",
    btnClass: "border border-accent-gold/40 text-accent-gold hover:bg-accent-gold hover:text-bg-primary",
  },
  {
    nombre: "Profesional",
    subtitulo: "El más elegido",
    precio: "$350",
    descripcion: "La opción completa para negocios que quieren destacar y convertir clientes.",
    features: [
      "Web multi-página (hasta 5)",
      "Diseño premium personalizado",
      "Formulario de contacto avanzado",
      "Integración WhatsApp",
      "Galería de fotos/servicios",
      "Google Maps integrado",
      "SEO local optimizado",
      "Google Analytics + Search Console",
      "Entrega en 10 días hábiles",
      "Revisiones ilimitadas",
    ],
    noIncluye: ["Sistema de citas", "Tienda online"],
    destacado: true,
    color: "border-accent-gold/50 shadow-gold",
    btnClass: "bg-accent-gold text-bg-primary hover:bg-accent-gold-light",
  },
  {
    nombre: "Premium",
    subtitulo: "Solución completa",
    precio: "$800+",
    descripcion: "Para negocios establecidos que necesitan funcionalidades avanzadas.",
    features: [
      "Todo lo del Profesional",
      "Sistema de citas online",
      "Blog con CMS",
      "Panel de administración",
      "Formulario de reservas",
      "SEO avanzado + blog posts",
      "Integración email marketing",
      "Velocidad optimizada (Core Web Vitals)",
      "Entrega en 15 días hábiles",
      "1 mes de soporte incluido",
    ],
    noIncluye: [],
    destacado: false,
    color: "border-white/10",
    btnClass: "border border-accent-gold/40 text-accent-gold hover:bg-accent-gold hover:text-bg-primary",
  },
];

export default function Pricing() {
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
    <section ref={sectionRef} id="precios" className="section-padding bg-bg-primary">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-gold/20 text-accent-gold text-xs font-medium tracking-widest uppercase mb-4">
            Precios Transparentes
          </div>
          <h2 className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Inversión que se{" "}
            <span className="text-gradient-gold">paga sola</span>
          </h2>
          <p className="reveal reveal-delay-2 text-text-secondary text-lg max-w-2xl mx-auto">
            Precios claros, sin costos ocultos. Cada paquete incluye diseño, desarrollo y lanzamiento. Todos los precios en USD.
          </p>
        </div>

        {/* Pricing grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {paquetes.map((paquete, i) => (
            <div
              key={paquete.nombre}
              className={`reveal reveal-delay-${i + 1} relative rounded-2xl border bg-bg-secondary p-7 transition-all duration-500 hover:-translate-y-1 ${paquete.color} ${paquete.destacado ? "lg:-mt-4 lg:mb-4" : ""}`}
            >
              {/* Popular badge */}
              {paquete.destacado && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full bg-accent-gold text-bg-primary text-xs font-bold">
                  <Zap size={11} fill="currentColor" />
                  Más Popular
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="font-display font-bold text-2xl text-text-primary mb-0.5">
                  {paquete.nombre}
                </h3>
                <p className="text-text-muted text-sm mb-4">{paquete.subtitulo}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-bold text-4xl text-gradient-gold">
                    {paquete.precio}
                  </span>
                  <span className="text-text-muted text-sm">USD</span>
                </div>
                <p className="text-text-secondary text-sm mt-3">{paquete.descripcion}</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/5 mb-5" />

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {paquete.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <Check size={15} className="text-accent-gold flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={getWhatsAppWithPackage(paquete.nombre)}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${paquete.btnClass}`}
              >
                Cotizar paquete {paquete.nombre}
              </a>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="reveal text-center text-text-muted text-sm mt-8">
          ¿Tienes un proyecto especial?{" "}
          <a
            href={getWhatsAppWithPackage("personalizado")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-gold hover:underline"
          >
            Cuéntanos tu idea y te hacemos una propuesta a medida.
          </a>
        </p>
      </div>
    </section>
  );
}
