"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n/LanguageContext";
import { HelpCircle, ChevronDown } from "lucide-react";

export default function FormacionFAQ() {
  const { lang } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const title = lang === "en" ? "Training FAQs" : lang === "pt" ? "FAQs de Treinamento" : "Preguntas Frecuentes de Formación";
  const subtitle = lang === "en"
    ? "Everything you need to know about our workshops, certifications, and methodology."
    : lang === "pt"
    ? "Tudo o que você precisa saber sobre nossos workshops, certificações e metodologia."
    : "Todo lo que necesitas saber sobre nuestros talleres, certificaciones y metodología.";

  const faqData = {
    es: [
      {
        q: "¿Cuál es la modalidad de las capacitaciones?",
        a: "Todas las clases se dictan en vivo de forma 100% online, acompañadas de guías prácticas y grabaciones disponibles 24/7. Además, tendrás acceso a mentoría para resolver tus dudas del proyecto."
      },
      {
        q: "¿Necesito conocimientos previos de programación?",
        a: "No para los talleres de 'Creadores de Contenido', 'Herramientas de IA y Productividad' ni 'Gestión Personal'. El taller de 'Desarrollo de Software & IA' sí requiere conocimientos básicos o lógica de programación para sacarle el máximo provecho."
      },
      {
        q: "¿Cómo obtengo mi certificación de Browns Studio?",
        a: "Al completar satisfactoriamente el proyecto final de la capacitación, emitiremos una credencial digital verificable protegida criptográficamente con un ID único."
      },
      {
        q: "¿Qué medios de pago aceptan?",
        a: "Aceptamos transferencias bancarias, tarjetas de crédito (vía Webpay/Stripe) y pagos descentralizados en criptomonedas (USDT/Stellar/Bitcoin)."
      }
    ],
    en: [
      {
        q: "What is the modality of the training workshops?",
        a: "All classes are held live 100% online, accompanied by practical hands-on exercises and recorded sessions available 24/7. You will also have access to direct mentor support."
      },
      {
        q: "Do I need previous coding experience?",
        a: "Not for the 'Content Creators', 'AI Tools', or 'Personal Productivity' tracks. The 'Software Development & AI' track does require basic understanding of programming concepts and logic."
      },
      {
        q: "How do I get my Browns Studio certification?",
        a: "Upon successful completion of the final project, we will issue a cryptographically secured digital credential with a unique verification ID."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept bank transfers, credit cards (via Stripe), and decentralized cryptocurrency payments (USDT/Stellar/Bitcoin)."
      }
    ],
    pt: [
      {
        q: "Qual é a modalidade dos treinamentos?",
        a: "Todas as aulas são realizadas ao vivo 100% online, acompanhadas de exercícios práticos e gravações disponíveis 24/7. Você também terá acesso direto a mentoria."
      },
      {
        q: "Preciso de experiência anterior em programação?",
        a: "Não para os workshops de 'Criadores de Conteúdo', 'Ferramentas de IA' ou 'Gestão Pessoal'. O workshop de 'Desenvolvimento de Software' exige um conhecimento básico de lógica de programação."
      },
      {
        q: "Como obtenho minha certificação Browns Studio?",
        a: "Ao concluir com sucesso o projeto prático final, emitiremos uma credencial digital criptografada com um ID de validação exclusivo."
      },
      {
        q: "Quais formas de pagamento são aceitas?",
        a: "Aceitamos transferências bancárias, cartões de crédito (via Stripe) e pagamentos em criptomoedas (USDT/Stellar/Bitcoin)."
      }
    ]
  };

  const currentFaqs = faqData[lang as keyof typeof faqData] || faqData.es;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-12 sm:py-16 px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center mb-12">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest mb-4"
            style={{ border: "1px solid rgba(71,196,255,0.2)", background: "rgba(71,196,255,0.05)", color: "#47c4ff" }}
          >
            FAQ
          </span>
          <h2 className="font-display text-3xl font-bold text-[#e5e5e5] mb-4">
            {title}
          </h2>
          <p className="text-[#9e9e9e] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {currentFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/5 bg-[#0b0c10]/40 overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-white/10"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#e5e5e5] hover:text-[#00f0ff] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle size={18} className="text-[#5a5a5a]" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-[#5a5a5a] transition-transform duration-300 ${isOpen ? "rotate-180 text-[#00f0ff]" : ""}`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[200px] border-t border-white/5" : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-xs sm:text-sm text-[#9e9e9e] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
