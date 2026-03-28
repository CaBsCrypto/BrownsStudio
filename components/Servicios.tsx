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
    // Metallic silver theme
    accentColor: "#c6c6c7",
    borderStyle: "rgba(198,198,199,0.12)",
    bgGradient: "rgba(25,25,25,0.6)",
    highlightBorder: "rgba(198,198,199,0.25)",
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
    // Tertiary electric theme
    accentColor: "#47c4ff",
    borderStyle: "rgba(71,196,255,0.1)",
    bgGradient: "rgba(10,15,30,0.6)",
    highlightBorder: "rgba(71,196,255,0.25)",
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
    <section
      ref={sectionRef}
      id="servicios"
      className="section-padding"
      style={{ background: "#0e0e0e" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest mb-4"
            style={{ border: "1px solid rgba(71,196,255,0.2)", background: "rgba(71,196,255,0.05)", color: "#47c4ff" }}
          >
            Servicios
          </div>
          <h2
            className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e5e5e5] mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            Web e IA —{" "}
            <span className="text-gradient-gold">dos herramientas,</span>
            <br className="hidden sm:block" /> un solo objetivo
          </h2>
          <p className="reveal reveal-delay-2 text-[#9e9e9e] text-lg max-w-xl mx-auto">
            Conseguir más clientes para tu negocio.
          </p>
        </div>

        {/* Two pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {pilares.map((pilar, pi) => (
            <div
              key={pilar.categoria}
              className={`reveal reveal-delay-${pi + 1} rounded-2xl p-6 lg:p-8`}
              style={{
                background: pilar.bgGradient,
                backdropFilter: "blur(20px)",
                border: `1px solid ${pilar.borderStyle}`,
              }}
            >
              {/* Pilar header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{pilar.emoji}</span>
                <div>
                  <h3
                    className="font-display font-bold text-xl"
                    style={{ color: pilar.accentColor, letterSpacing: "-0.02em" }}
                  >
                    {pilar.categoria}
                  </h3>
                  <p className="text-[#5a5a5a] text-sm">{pilar.descripcion}</p>
                </div>
              </div>

              {/* Service cards */}
              <div className="space-y-4">
                {pilar.servicios.map((servicio) => {
                  const Icon = servicio.icon;
                  return (
                    <div
                      key={servicio.titulo}
                      className="relative p-5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 group"
                      style={{
                        background: "rgba(0,0,0,0.4)",
                        border: "1px solid rgba(72,72,72,0.12)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = pilar.highlightBorder;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(72,72,72,0.12)";
                      }}
                    >
                      {servicio.popular && (
                        <span
                          className="absolute -top-2.5 left-4 px-3 py-0.5 rounded-full text-xs font-bold text-black"
                          style={{ background: "linear-gradient(135deg, #c6c6c7, #939eb5)" }}
                        >
                          Más solicitado
                        </span>
                      )}

                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(72,72,72,0.15)" }}
                          >
                            <Icon size={17} style={{ color: pilar.accentColor }} />
                          </div>
                          <div>
                            <p className="text-[#e5e5e5] font-semibold text-sm">{servicio.titulo}</p>
                            <p className="text-xs font-medium" style={{ color: pilar.accentColor }}>
                              Desde {servicio.desde} USD
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="text-[#5a5a5a] text-sm leading-relaxed mb-4 pl-12">
                        {servicio.descripcion}
                      </p>

                      <a
                        href={`${WHATSAPP_URL}&text=${encodeURIComponent(`Hola, me interesa cotizar: ${servicio.titulo}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pl-12 flex items-center gap-1.5 text-xs font-semibold opacity-50 hover:opacity-100 transition-opacity group-hover:opacity-100"
                        style={{ color: pilar.accentColor }}
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
        <p className="reveal text-center text-[#5a5a5a] text-sm mt-8">
          ¿Necesitas web + IA juntos?{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9e9e9e] hover:text-[#47c4ff] transition-colors duration-200"
          >
            Armamos un paquete a tu medida.
          </a>
        </p>
      </div>
    </section>
  );
}
