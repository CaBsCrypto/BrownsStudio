"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Zap, Globe, Bot, CalendarCheck, ShoppingBag, TrendingUp, PenLine } from "lucide-react";
import { getWhatsAppWithPackage, WHATSAPP_URL } from "@/lib/config";

const paquetesWeb = [
  {
    nombre: "Básico",
    subtitulo: "Para empezar online",
    precio: "$150",
    features: [
      "Landing page (1 página)",
      "Diseño responsive + WhatsApp",
      "SEO básico + Google Analytics",
      "2 revisiones de diseño incluidas",
    ],
    destacado: false,
  },
  {
    nombre: "Profesional",
    subtitulo: "El más elegido",
    precio: "$350",
    features: [
      "Web multi-página (hasta 5)",
      "Diseño premium personalizado",
      "SEO local + Google Maps",
      "3 revisiones de diseño incluidas",
    ],
    destacado: true,
  },
  {
    nombre: "Premium",
    subtitulo: "Solución completa",
    precio: "$800+",
    features: [
      "Todo lo del Profesional",
      "Sistema de citas online + CMS",
      "Blog + panel de administración",
      "5 revisiones + 1 mes de soporte",
    ],
    destacado: false,
  },
];

const serviciosIA = [
  {
    icon: CalendarCheck,
    nombre: "Gestión de Citas IA",
    subtitulo: "Agenda que trabaja sola",
    precio: "$150",
    features: [
      "Agenda y confirma citas por WhatsApp",
      "Recordatorios automáticos — reduce no-shows 60%",
      "Cancelaciones y reagendamiento sin intervención",
      "Sincronización con Google Calendar",
    ],
  },
  {
    icon: ShoppingBag,
    nombre: "Gestión de Pedidos IA",
    subtitulo: "Del pedido a la entrega, solo",
    precio: "$200",
    features: [
      "Toma pedidos por WhatsApp o web automáticamente",
      "Notificaciones al equipo en tiempo real",
      "Seguimiento de estado para el cliente",
      "Integración con carta o catálogo digital",
    ],
  },
  {
    icon: TrendingUp,
    nombre: "Automatización de Ventas",
    subtitulo: "Cierra más sin más esfuerzo",
    precio: "$350",
    features: [
      "Califica leads automáticamente",
      "Seguimiento por WhatsApp/email sin intervención",
      "Cotizaciones y propuestas automáticas",
      "Reportes de conversión en tiempo real",
    ],
  },
  {
    icon: PenLine,
    nombre: "Gestor de Contenido IA",
    subtitulo: "Redes sociales en piloto automático",
    precio: "$150",
    precioSuffix: "/mes",
    features: [
      "Genera posts para Instagram y Facebook con IA",
      "Programación automática de publicaciones",
      "Textos optimizados para tu negocio y voz",
      "Reporte mensual de rendimiento",
    ],
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"web" | "ia">("web");

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
        <div className="text-center mb-12">
          <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-gold/20 text-accent-gold text-xs font-medium tracking-widest uppercase mb-4">
            Servicios & Precios
          </div>
          <h2 className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Inversión que se{" "}
            <span className="text-gradient-gold">paga sola</span>
          </h2>
          <p className="reveal reveal-delay-2 text-text-secondary text-lg max-w-xl mx-auto">
            Precios claros, sin costos ocultos. Todos en USD.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="reveal reveal-delay-2 flex items-center justify-center mb-10">
          <div className="flex p-1 rounded-xl bg-bg-secondary border border-white/10">
            <button
              onClick={() => setActiveTab("web")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === "web"
                  ? "bg-accent-gold text-bg-primary shadow-gold"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              <Globe size={15} />
              Desarrollo Web
            </button>
            <button
              onClick={() => setActiveTab("ia")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === "ia"
                  ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              <Bot size={15} />
              Soluciones IA
            </button>
          </div>
        </div>

        {/* Web packages */}
        {activeTab === "web" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {paquetesWeb.map((paquete) => (
              <div
                key={paquete.nombre}
                className={`relative rounded-2xl border bg-bg-secondary p-7 transition-all duration-500 hover:-translate-y-1 ${
                  paquete.destacado
                    ? "border-accent-gold/50 shadow-gold lg:-mt-4 lg:mb-4"
                    : "border-white/10"
                }`}
              >
                {paquete.destacado && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full bg-accent-gold text-bg-primary text-xs font-bold">
                    <Zap size={11} fill="currentColor" />
                    Más Popular
                  </div>
                )}

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
                </div>

                <div className="h-px bg-white/5 mb-5" />

                <ul className="space-y-3 mb-6">
                  {paquete.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <Check size={15} className="text-accent-gold flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={getWhatsAppWithPackage(paquete.nombre)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    paquete.destacado
                      ? "bg-accent-gold text-bg-primary hover:bg-accent-gold-light"
                      : "border border-accent-gold/40 text-accent-gold hover:bg-accent-gold hover:text-bg-primary"
                  }`}
                >
                  Cotizar paquete {paquete.nombre}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* IA services */}
        {activeTab === "ia" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {serviciosIA.map((servicio) => {
              const Icon = servicio.icon;
              return (
                <div
                  key={servicio.nombre}
                  className="relative rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-900/15 to-transparent p-7 transition-all duration-500 hover:-translate-y-1 hover:border-purple-500/40"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 bg-purple-500/10 border border-purple-500/20">
                    <Icon size={20} className="text-purple-400" />
                  </div>

                  <div className="mb-6">
                    <h3 className="font-display font-bold text-2xl text-text-primary mb-0.5">
                      {servicio.nombre}
                    </h3>
                    <p className="text-text-muted text-sm mb-4">{servicio.subtitulo}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-bold text-4xl text-purple-400">
                        {servicio.precio}
                      </span>
                      <span className="text-text-muted text-sm">
                        {"precioSuffix" in servicio ? servicio.precioSuffix : "USD"}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-white/5 mb-5" />

                  <ul className="space-y-3 mb-6">
                    {servicio.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-text-secondary">
                        <Check size={15} className="text-purple-400 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={getWhatsAppWithPackage(servicio.nombre)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-3 rounded-xl text-sm font-semibold border border-purple-500/40 text-purple-400 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300"
                  >
                    Cotizar {servicio.nombre}
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom note */}
        <p className="reveal text-center text-text-muted text-sm mt-8">
          ¿Necesitas web + IA juntos?{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-gold hover:underline"
          >
            Armamos un paquete a tu medida.
          </a>
        </p>
      </div>
    </section>
  );
}
