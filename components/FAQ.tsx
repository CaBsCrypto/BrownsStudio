"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    pregunta: "¿Cuánto tiempo toma crear mi proyecto?",
    respuesta:
      "Depende del servicio: una landing page básica la entregamos en 5 días hábiles; una web profesional multi-página entre 10 y 15 días; un proyecto con chatbot o IA integrada puede tomar 3–4 semanas. Siempre te damos un plazo exacto en la propuesta antes de empezar.",
  },
  {
    pregunta: "¿Trabajan con clientes fuera de Chile?",
    respuesta:
      "Sí, trabajamos con negocios de toda América Latina — Argentina, México, Colombia, Perú y más. Todo el proceso es 100% remoto: reuniones por videollamada, entregas por drive y comunicación por WhatsApp. La distancia no es un problema.",
  },
  {
    pregunta: "¿Qué es el chatbot con IA y cómo funciona para mi negocio?",
    respuesta:
      "Es un asistente virtual conectado a tu WhatsApp que atiende a tus clientes las 24 horas, responde sus preguntas, agenda citas y filtra los leads más interesantes para que vos solo te enfoques en cerrar. No necesitás saber de tecnología — nosotros lo configuramos con la información de tu negocio.",
  },
  {
    pregunta: "¿Qué necesito para empezar?",
    respuesta:
      "Solo una conversación. Contanos qué hace tu negocio, quiénes son tus clientes y qué resultado esperás — más consultas, más ventas, automatizar citas. Si ya tenés logo e imágenes, perfecto; si no, te orientamos. La primera consulta es gratuita y sin compromiso.",
  },
  {
    pregunta: "¿Aceptan pagos en cuotas?",
    respuesta:
      "Sí. Trabajamos con un esquema de 50% al inicio y 50% al entregar el proyecto terminado. Para proyectos más grandes también podemos acordar un plan en 3 cuotas. Aceptamos transferencia bancaria, PayPal y crypto (USDT/USDC).",
  },
  {
    pregunta: "¿Qué diferencia a Browns Studio de otras agencias?",
    respuesta:
      "Combinamos diseño premium con tecnología real de IA — no solo hacemos webs bonitas, las hacemos funcionar como herramientas de venta. Somos un equipo pequeño y directo: hablás con quien hace el trabajo, no con un intermediario.",
  },
  {
    pregunta: "¿Cuántas revisiones incluye mi proyecto?",
    respuesta:
      "Cada plan incluye un número definido de revisiones: Básico 2, Profesional 3, y Premium 5. Antes de escribir código te presentamos un mockup completo del diseño para tu aprobación, lo que minimiza los cambios en la etapa final.",
  },
  {
    pregunta: "¿Ofrecen mantenimiento y cambios futuros?",
    respuesta:
      "Sí. Después del lanzamiento ofrecemos planes de mantenimiento mensual que incluyen actualizaciones de contenido, ajustes de diseño, respaldo del sitio y soporte técnico. El plan Premium incluye 1 mes de soporte sin costo adicional.",
  },
  {
    pregunta: "¿Los precios incluyen hosting y dominio?",
    respuesta:
      "Los precios son por desarrollo y configuración del sitio. El hosting y dominio se contratan por separado — te recomendamos opciones según tu presupuesto y te ayudamos con la configuración completa. El costo estimado es USD 10–20 al mes.",
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
    <section
      ref={sectionRef}
      id="faq"
      className="section-padding"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest mb-4"
            style={{ border: "1px solid rgba(71,196,255,0.2)", background: "rgba(71,196,255,0.05)", color: "#47c4ff" }}
          >
            Preguntas Frecuentes
          </div>
          <h2
            className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e5e5e5] mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            Tus dudas,{" "}
            <span className="text-gradient-gold">resueltas</span>
          </h2>
          <p className="reveal reveal-delay-2 text-[#9e9e9e] text-lg">
            ¿Tienes una pregunta que no está aquí? Escríbenos por WhatsApp.
          </p>
        </div>

        {/* Accordion — no divider lines, tonal shift only */}
        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}>
                <div
                  className="rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    background: isOpen ? "#191919" : "#131313",
                    border: isOpen
                      ? "1px solid rgba(71,196,255,0.15)"
                      : "1px solid rgba(72,72,72,0.12)",
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="font-medium text-sm sm:text-base transition-colors duration-200"
                      style={{ color: isOpen ? "#e5e5e5" : "#9e9e9e" }}
                    >
                      {faq.pregunta}
                    </span>
                    <ChevronDown
                      size={18}
                      className="flex-shrink-0 transition-transform duration-300"
                      style={{
                        color: isOpen ? "#47c4ff" : "#484848",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: isOpen ? "384px" : "0", opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="px-6 pb-5">
                      {/* Tonal divider — no border, just a subtle bg line */}
                      <div className="h-px mb-4" style={{ background: "rgba(72,72,72,0.15)" }} />
                      <p className="text-[#9e9e9e] text-sm leading-relaxed">
                        {faq.respuesta}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
