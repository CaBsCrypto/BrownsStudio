"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    pregunta: "¿Cuánto tiempo toma crear mi proyecto?",
    respuesta:
      "Depende del servicio: una landing page básica la entregamos en 5 días hábiles; una web profesional multi-página entre 10 y 15 días; un proyecto con sistema de citas, chatbot o IA integrada puede tomar 3–4 semanas. Siempre te entregamos un plazo exacto en la propuesta antes de empezar.",
  },
  {
    pregunta: "¿Qué necesito para empezar?",
    respuesta:
      "Solo una conversación. Cuéntanos qué hace tu negocio, quiénes son tus clientes y qué resultado esperas — más consultas, más ventas, automatizar citas, etc. Si ya tenés logo e imágenes, perfecto; si no, te orientamos. No necesitás saber de tecnología ni tener nada preparado de antemano. La primera consulta es gratuita y sin compromiso.",
  },
  {
    pregunta: "¿Cuántas revisiones incluye mi proyecto?",
    respuesta:
      "Cada plan incluye un número definido de revisiones: Básico 2, Profesional 3, y Premium 5. Antes de escribir código te presentamos un mockup completo del diseño para tu aprobación, lo que minimiza los cambios en la etapa final. Si necesitás rondas adicionales, las cotizamos por separado sin problema.",
  },
  {
    pregunta: "¿Ofrecen mantenimiento y cambios futuros?",
    respuesta:
      "Sí. Después del lanzamiento ofrecemos planes de mantenimiento mensual que incluyen actualizaciones de contenido, ajustes de diseño, respaldo del sitio y soporte técnico. También podés contratar cambios puntuales cuando los necesites. El plan Premium incluye 1 mes de soporte sin costo adicional.",
  },
  {
    pregunta: "¿Los precios incluyen hosting y dominio?",
    respuesta:
      "Los precios son por desarrollo y configuración del sitio. El hosting y dominio se contratan por separado — te recomendamos opciones según tu presupuesto y te ayudamos con la configuración completa. El costo estimado de hosting + dominio es de USD 10–20 al mes dependiendo del plan elegido.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
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
    <section ref={sectionRef} id="faq" className="section-padding bg-bg-primary">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-gold/20 text-accent-gold text-xs font-medium tracking-widest uppercase mb-4">
            Preguntas Frecuentes
          </div>
          <h2 className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Tus dudas,{" "}
            <span className="text-gradient-gold">resueltas</span>
          </h2>
          <p className="reveal reveal-delay-2 text-text-secondary text-lg">
            ¿Tienes una pregunta que no está aquí? Escríbenos por WhatsApp.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            // Outer div: solo reveal — React nunca lo toca, visible persiste
            <div key={i} className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}>
              {/* Inner div: clases dinámicas de React (border/bg según estado) */}
              <div
                className={`rounded-xl border overflow-hidden transition-all duration-300 ${
                  openIndex === i
                    ? "border-accent-gold/30 bg-bg-secondary"
                    : "border-white/5 bg-bg-secondary/50 hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                  aria-expanded={openIndex === i}
                >
                  <span
                    className={`font-medium text-sm sm:text-base transition-colors duration-200 ${
                      openIndex === i ? "text-accent-gold" : "text-text-primary"
                    }`}
                  >
                    {faq.pregunta}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-text-muted flex-shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180 text-accent-gold" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5">
                    <div className="h-px bg-white/5 mb-4" />
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {faq.respuesta}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
