"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    pregunta: "¿Cuánto tiempo toma crear mi web?",
    respuesta:
      "Una landing page básica la entregamos en 5 días hábiles. Una web profesional multi-página toma entre 10 y 15 días. Un proyecto con sistema de citas o IA integrada puede tomar 3-4 semanas. Siempre te damos un plazo exacto en la propuesta.",
  },
  {
    pregunta: "¿Qué necesito para empezar?",
    respuesta:
      "Solo contarnos sobre tu negocio: qué haces, quiénes son tus clientes y qué esperas de tu web o solución IA. Si tienes logo e imágenes, perfecto — si no, podemos orientarte. La conversación inicial es completamente gratuita y sin compromiso.",
  },
  {
    pregunta: "¿Qué pasa si no me gusta el diseño?",
    respuesta:
      "Antes de escribir código te presentamos un mockup visual completo para tu aprobación. Solo avanzamos cuando estás conforme. Una vez en desarrollo, ofrecemos revisiones ilimitadas hasta que el resultado te satisfaga al 100%.",
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
            <div
              key={i}
              className={`reveal reveal-delay-${Math.min(i + 1, 4)} rounded-xl border overflow-hidden transition-all duration-300 ${
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
          ))}
        </div>
      </div>
    </section>
  );
}
