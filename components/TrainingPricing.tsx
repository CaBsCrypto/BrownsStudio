"use client";

import { useLang } from "@/lib/i18n/LanguageContext";
import { getWhatsAppLink } from "@/lib/config";
import { Check, ArrowRight, ShieldCheck, Sparkles, Video } from "lucide-react";

export default function TrainingPricing() {
  const { t, lang } = useLang();

  // Safe cast or direct access from translation object
  const fp = (t as any).formacionPage || {
    sections: {
      workshops: {
        pricingTitle: "Elige tu Plan de Formación",
        pricingSub: "Selecciona la opción que mejor se adapte a tu disponibilidad, velocidad de aprendizaje y requerimientos de soporte.",
        planVideosTitle: "Auto-Estudio (Solo Videos)",
        planVideosSub: "Aprende a tu propio ritmo con videocursos completos y plantillas descargables.",
        planVideosPrice: "$99 USD",
        planVideosPeriod: "Pago único",
        planVideosFeatures: [
          "Acceso ilimitado de por vida a las grabaciones (24/7)",
          "Plantillas de automatización listas para clonar (Make, Notion, Rust)",
          "Acceso a actualizaciones futuras de contenido"
        ],
        planMentoringTitle: "Acompañamiento & Mentoría",
        planMentoringSub: "Formación interactiva con clases en vivo, revisión de código y feedback 1-on-1.",
        planMentoringPrice: "$299 USD",
        planMentoringPeriod: "Por ciclo / Taller",
        planMentoringFeatures: [
          "Todo lo incluido en el plan Auto-Estudio",
          "Talleres semanales prácticos en vivo con Cristian",
          "Canal de soporte prioritario vía WhatsApp / Discord",
          "Revisión de código y guía en el despliegue de tus agentes",
          "Certificación Oficial Verificada de Browns Studio"
        ],
        pricingCta: "Adquirir Plan"
      }
    }
  };

  const p = fp.sections.workshops;

  const msgVideos = lang === "en"
    ? "Hi Cristian, I'm interested in the Self-Study (Only Videos) plan for $99 USD. How do I purchase and get access?"
    : "Hola Cristian! Me interesa adquirir el plan Auto-Estudio (Solo Videos) de $99 USD. ¿Cómo puedo realizar el pago y obtener acceso?";

  const msgMentoring = lang === "en"
    ? "Hi Cristian, I want to enroll in the Mentoring & Support plan for $299 USD. How can I sign up for the next cohort?"
    : "Hola Cristian! Quiero inscribirme en el plan de Acompañamiento & Mentoría de $299 USD. ¿Cuáles son las fechas de inicio del próximo ciclo?";

  return (
    <section className="py-16 sm:py-20 px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest mb-4"
            style={{ border: "1px solid rgba(71,196,255,0.2)", background: "rgba(71,196,255,0.05)", color: "#47c4ff" }}
          >
            {lang === "en" ? "PLANS & PRICING" : lang === "pt" ? "PLANOS & PREÇOS" : "PLANES Y PRECIOS"}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e5e5e5] mb-4">
            {p.pricingTitle}
          </h2>
          <p className="text-[#9e9e9e] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {p.pricingSub}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Plan 1: Only Videos */}
          <div 
            className="relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 border border-white/5 bg-[#0b0c10]/40 hover:border-white/10 hover:scale-[1.01]"
            style={{ boxShadow: "0 12px 32px rgba(0,0,0,0.4)" }}
          >
            <div>
              <div className="flex items-center gap-2 mb-4 text-[#9e9e9e]">
                <Video size={16} />
                <span className="text-[10px] uppercase font-mono tracking-widest">Self-Study</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#e5e5e5] mb-2">
                {p.planVideosTitle}
              </h3>
              <p className="text-[#9e9e9e] text-xs sm:text-sm leading-relaxed mb-6">
                {p.planVideosSub}
              </p>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-white/5">
                <span className="text-4xl font-extrabold text-white font-mono">
                  {p.planVideosPrice}
                </span>
                <span className="text-xs text-[#5a5a5a] ml-2 block sm:inline">
                  / {p.planVideosPeriod}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3.5 mb-8">
                {p.planVideosFeatures.map((feat: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#9e9e9e]">
                    <Check size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={getWhatsAppLink(msgVideos)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full px-5 py-4 rounded-xl text-xs sm:text-sm font-semibold text-white/80 border border-white/10 bg-white/5 hover:text-white hover:border-[#00f0ff]/30 hover:bg-[#00f0ff]/5 transition-all duration-300"
            >
              <span>{p.pricingCta}</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Plan 2: Mentoring */}
          <div 
            className="relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 border bg-[#0b0c10]/60 hover:scale-[1.01]"
            style={{ 
              borderColor: "rgba(0, 240, 255, 0.25)",
              boxShadow: "0 16px 48px rgba(0, 240, 255, 0.05)"
            }}
          >
            {/* Spotlight label */}
            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-bold font-mono tracking-widest bg-[#00f0ff]/15 text-[#00f0ff] uppercase border border-[#00f0ff]/20">
              <Sparkles size={10} />
              POPULAR
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4 text-[#00f0ff]">
                <ShieldCheck size={16} />
                <span className="text-[10px] uppercase font-mono tracking-widest">Premium Cohort</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#e5e5e5] mb-2">
                {p.planMentoringTitle}
              </h3>
              <p className="text-[#9e9e9e] text-xs sm:text-sm leading-relaxed mb-6">
                {p.planMentoringSub}
              </p>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-white/5">
                <span className="text-4xl font-extrabold text-white font-mono">
                  {p.planMentoringPrice}
                </span>
                <span className="text-xs text-[#5a5a5a] ml-2 block sm:inline">
                  / {p.planMentoringPeriod}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3.5 mb-8">
                {p.planMentoringFeatures.map((feat: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#e5e5e5]">
                    <Check size={16} className="text-[#00f0ff] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={getWhatsAppLink(msgMentoring)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full px-5 py-4 rounded-xl text-xs sm:text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.01]"
              style={{
                background: "linear-gradient(135deg, #00f0ff, #ffffff)",
                boxShadow: "0 4px 20px rgba(0, 240, 255, 0.2)"
              }}
            >
              <span>{p.pricingCta}</span>
              <ArrowRight size={14} />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
