"use client";

import { useEffect, useRef } from "react";
import { Globe, CalendarCheck, Bot, BarChart3, ArrowRight } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";

const pilares = [
  {
    categoria: "Desarrollo Web",
    descripcion: "Webs profesionales que convierten visitas en clientes.",
    emoji: "🌐",
    servicios: [
      {
        icon: Globe,
        titulo: "Web para Negocios",
        descripcion: "Desde landing page hasta sitio multi-página. Responsive, rápido y con integración WhatsApp.",
        desde: "$150",
        popular: false,
      },
      {
        icon: CalendarCheck,
        titulo: "Web con Reservas",
        descripcion: "Sistema de citas online, galería, blog y panel CMS para que actualices tú mismo.",
        desde: "$800",
        popular: true,
      },
    ],
    accent: "text-accent-gold",
    border: "border-accent-gold/20",
    bg: "from-accent-gold/8 to-transparent",
  },
  {
    categoria: "Soluciones de IA",
    descripcion: "Automatización inteligente para que tu negocio trabaje 24/7.",
    emoji: "🤖",
    servicios: [
      {
        icon: Bot,
        titulo: "Chatbot / Asistente IA",
        descripcion: "Asistente virtual que responde clientes, agenda citas y califica leads automáticamente.",
        desde: "$300",
        popular: false,
      },
      {
        icon: BarChart3,
        titulo: "Automatización con IA",
        descripcion: "Flujos de trabajo inteligentes: reportes automáticos, respuestas a emails, análisis de datos.",
        desde: "$200",
        popular: false,
      },
    ],
    accent: "text-purple-400",
    border: "border-purple-500/20",
    bg: "from-purple-900/15 to-transparent",
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
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="servicios" className="section-padding bg-bg-secondary">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-gold/20 text-accent-gold text-xs font-medium tracking-widest uppercase mb-4">
            Servicios
          </div>
          <h2 className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Web e IA —{" "}
            <span className="text-gradient-gold">dos herramientas,</span>
            <br className="hidden sm:block" /> un solo objetivo
          </h2>
          <p className="reveal reveal-delay-2 text-text-secondary text-lg max-w-xl mx-auto">
            Conseguir más clientes para tu negocio.
          </p>
        </div>

        {/* Two pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {pilares.map((pilar, pi) => (
            <div
              key={pilar.categoria}
              className={`reveal reveal-delay-${pi + 1} rounded-2xl border ${pilar.border} bg-gradient-to-b ${pilar.bg} p-6 lg:p-8`}
            >
              {/* Pilar header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{pilar.emoji}</span>
                <div>
                  <h3 className={`font-display font-bold text-xl ${pilar.accent}`}>
                    {pilar.categoria}
                  </h3>
                  <p className="text-text-muted text-sm">{pilar.descripcion}</p>
                </div>
              </div>

              {/* Service cards */}
              <div className="space-y-4">
                {pilar.servicios.map((servicio) => {
                  const Icon = servicio.icon;
                  return (
                    <div
                      key={servicio.titulo}
                      className="relative p-5 rounded-xl bg-bg-primary/60 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5 group"
                    >
                      {servicio.popular && (
                        <span className="absolute -top-2.5 left-4 px-3 py-0.5 rounded-full bg-accent-gold text-bg-primary text-xs font-bold">
                          Más solicitado
                        </span>
                      )}

                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 border border-white/5`}>
                            <Icon size={17} className={pilar.accent} />
                          </div>
                          <div>
                            <p className="text-text-primary font-semibold text-sm">{servicio.titulo}</p>
                            <p className={`text-xs font-medium ${pilar.accent}`}>Desde {servicio.desde} USD</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-text-muted text-sm leading-relaxed mb-4 pl-12">
                        {servicio.descripcion}
                      </p>

                      <a
                        href={`${WHATSAPP_URL}&text=${encodeURIComponent(`Hola, me interesa cotizar: ${servicio.titulo}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`pl-12 flex items-center gap-1.5 text-xs font-semibold ${pilar.accent} opacity-60 hover:opacity-100 transition-opacity group-hover:opacity-100`}
                      >
                        Cotizar <ArrowRight size={11} />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="reveal text-center text-text-muted text-sm mt-8">
          ¿Necesitas web + IA juntos?{" "}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">
            Armamos un paquete a tu medida.
          </a>
        </p>
      </div>
    </section>
  );
}
