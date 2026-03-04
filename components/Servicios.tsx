"use client";

import { useEffect, useRef } from "react";
import { FileText, Globe, CalendarCheck, ShoppingBag, ArrowRight } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";

const servicios = [
  {
    icon: FileText,
    titulo: "Landing Page",
    descripcion:
      "Una página única, impactante y responsiva con formulario de contacto. Perfecta para negocios que recién comienzan su presencia online.",
    desde: "$150",
    caracteristicas: ["Diseño profesional", "Formulario de contacto", "SEO básico", "Entrega en 5 días"],
    color: "from-amber-900/20 to-amber-800/10",
    border: "border-amber-700/20 hover:border-amber-600/40",
    accent: "text-amber-400",
    popular: false,
  },
  {
    icon: Globe,
    titulo: "Web para Negocios",
    descripcion:
      "Sitio multi-página con galería, mapa de ubicación, integración con WhatsApp y todo lo que tu negocio necesita para convertir visitas.",
    desde: "$350",
    caracteristicas: ["Varias páginas", "Galería de fotos", "Integración WhatsApp", "Google Maps", "SEO local"],
    color: "from-accent-gold/15 to-accent-gold/5",
    border: "border-accent-gold/30 hover:border-accent-gold/60",
    accent: "text-accent-gold",
    popular: true,
  },
  {
    icon: CalendarCheck,
    titulo: "Web con Reservas",
    descripcion:
      "Sistema de citas online, blog, CMS para que actualices tu contenido, y SEO avanzado. Ideal para clínicas, salones y centros de servicio.",
    desde: "$800",
    caracteristicas: ["Sistema de citas", "Blog integrado", "Panel CMS", "SEO avanzado", "Soporte 1 mes"],
    color: "from-emerald-900/20 to-emerald-800/10",
    border: "border-emerald-700/20 hover:border-emerald-600/40",
    accent: "text-emerald-400",
    popular: false,
  },
  {
    icon: ShoppingBag,
    titulo: "E-Commerce",
    descripcion:
      "Tienda online completa con pasarela de pagos, gestión de inventario y dashboard administrativo. Tu negocio vende las 24 horas.",
    desde: "$2,000",
    caracteristicas: ["Tienda completa", "Pagos en línea", "Gestión inventario", "Dashboard", "SEO e-commerce"],
    color: "from-purple-900/20 to-purple-800/10",
    border: "border-purple-700/20 hover:border-purple-600/40",
    accent: "text-purple-400",
    popular: false,
  },
];

export default function Servicios() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="servicios" className="section-padding bg-bg-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-gold/20 text-accent-gold text-xs font-medium tracking-widest uppercase mb-4">
            Nuestros Servicios
          </div>
          <h2 className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            La solución perfecta para
            <span className="text-gradient-gold"> cada negocio</span>
          </h2>
          <p className="reveal reveal-delay-2 text-text-secondary text-lg max-w-2xl mx-auto">
            Desde una landing page hasta una tienda online completa. Elige el paquete que mejor se adapte a tus necesidades y presupuesto.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {servicios.map((servicio, i) => {
            const Icon = servicio.icon;
            return (
              <div
                key={servicio.titulo}
                className={`reveal reveal-delay-${i + 1} relative group flex flex-col p-6 rounded-2xl border transition-all duration-500 bg-gradient-to-b ${servicio.color} ${servicio.border} hover:-translate-y-1 hover:shadow-card cursor-default`}
              >
                {/* Popular badge */}
                {servicio.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-accent-gold text-bg-primary text-xs font-bold whitespace-nowrap">
                    ⭐ Más Popular
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white/5 border border-white/5`}>
                  <Icon size={22} className={servicio.accent} />
                </div>

                {/* Title & price */}
                <div className="mb-3">
                  <h3 className="font-display font-semibold text-xl text-text-primary mb-1">
                    {servicio.titulo}
                  </h3>
                  <span className={`text-sm font-medium ${servicio.accent}`}>
                    Desde {servicio.desde} USD
                  </span>
                </div>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1">
                  {servicio.descripcion}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {servicio.caracteristicas.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-text-muted text-sm">
                      <span className={`w-1.5 h-1.5 rounded-full bg-current ${servicio.accent} flex-shrink-0`} />
                      {c}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={`${WHATSAPP_URL}&text=${encodeURIComponent(`Hola, me interesa cotizar el servicio de ${servicio.titulo}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                    servicio.popular
                      ? "bg-accent-gold border-accent-gold text-bg-primary hover:bg-accent-gold-light"
                      : "border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  Cotizar ahora
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
