"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, CheckCircle, Calculator, Sparkles, MessageCircle } from "lucide-react";
import { solucionesData } from "@/lib/solucionesData";

const WHATSAPP_BASE = "https://wa.me/51931054302?text=";

export default function SolucionNichePage() {
  const params = useParams();
  const locale = (params?.locale as string) || "es";
  const nicho = (params?.nicho as string) || "dentistas";

  // Safely get data for target niche and locale
  const nicheEntry = solucionesData[nicho] || solucionesData.dentistas;
  const t = nicheEntry[locale as keyof typeof nicheEntry] || nicheEntry.es;

  // Localized texts for the dynamic wrapper UI
  const uiText = {
    es: {
      back: "Volver al inicio",
      solucion: "Solución de Impacto",
      calculadoraTitle: "Calculadora de ROI de tu Agente",
      calculadoraSub: "Mueve los controles para ver el retorno financiero directo que este agente puede generar en tu negocio.",
      setupFee: "Setup único de desarrollo desde $500 USD",
      mensualFee: "Mantenimiento mensual de $100 - $200 USD",
      cta: "Activar mi Agente Personalizado",
      beneficiosTitle: "Lo que construimos para ti:",
    },
    en: {
      back: "Back to home",
      solucion: "High-Impact Solution",
      calculadoraTitle: "Your Agent's ROI Calculator",
      calculadoraSub: "Move the sliders to see the direct financial return this agent can generate for your business.",
      setupFee: "One-time development setup from $500 USD",
      mensualFee: "Monthly maintenance from $100 - $200 USD",
      cta: "Activate my Custom Agent",
      beneficiosTitle: "What we build for you:",
    },
    pt: {
      back: "Voltar ao início",
      solucion: "Solução de Impacto",
      calculadoraTitle: "Calculadora de ROI do seu Agente",
      calculadoraSub: "Mova os controles para ver o retorno financeiro direto que este agente pode gerar para o seu negócio.",
      setupFee: "Setup único de desenvolvimento a partir de $500 USD",
      mensualFee: "Manutenção mensal de $100 - $200 USD",
      cta: "Ativar meu Agente Personalizado",
      beneficiosTitle: "O que construímos para você:",
    }
  };

  const ui = uiText[locale as keyof typeof uiText] || uiText.es;

  // Calculator states
  const [ticketValue, setTicketValue] = useState(t.defaultRoiValue);
  const [multiplier, setMultiplier] = useState(t.defaultRoiMultiplier);

  const estimatedRoi = ticketValue * multiplier;

  return (
    <main className="min-h-screen bg-[#050506] relative overflow-hidden px-6 py-12 md:py-20 text-[#e5e5e5]">
      {/* Ambient background glows */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full filter blur-[120px] pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, #00f0ff 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full filter blur-[120px] pointer-events-none opacity-25"
        style={{ background: "radial-gradient(circle, #0090b3 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Back Link */}
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-xs text-[#5a5a5a] hover:text-[#00f0ff] transition-all mb-12 uppercase tracking-widest"
        >
          <ArrowLeft size={14} />
          {ui.back}
        </Link>

        {/* Hero Header Section */}
        <div className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
            style={{ 
              background: "rgba(0,240,255,0.06)", 
              border: "1px solid rgba(0,240,255,0.15)",
              color: "#00f0ff"
            }}
          >
            <span className="text-sm">{t.emoji}</span>
            {ui.solucion} · {t.industria}
          </div>
          
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#f3f4f6] leading-tight max-w-4xl mb-6"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t.headline}
          </h1>

          <p className="text-[#9e9e9e] text-lg sm:text-xl max-w-3xl leading-relaxed mb-8">
            {t.sub}
          </p>

          <div className="inline-flex items-center gap-2 text-[#00f0ff] text-sm font-semibold bg-[#00f0ff]/5 border border-[#00f0ff]/10 px-4 py-2.5 rounded-2xl">
            <Sparkles size={16} />
            {t.estadistica}
          </div>
        </div>

        {/* Dynamic Split Grid: Calculator & Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* ROI Calculator Card */}
          <div className="lg:col-span-7 rounded-2xl p-6 md:p-8 flex flex-col border border-ghost transition-all duration-300"
            style={{
              background: "rgba(10,11,10,0.8)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/20">
                <Calculator className="text-[#00f0ff]" size={20} />
              </div>
              <h2 className="font-display font-bold text-xl text-[#f3f4f6]">
                {ui.calculadoraTitle}
              </h2>
            </div>
            
            <p className="text-xs text-[#9e9e9e] mb-8 leading-relaxed">
              {ui.calculadoraSub}
            </p>

            {/* Slider 1: Ticket Value */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-[#9e9e9e]">{t.roiLabel}</span>
                <span className="text-base font-bold text-[#00f0ff]">${ticketValue.toLocaleString()} USD</span>
              </div>
              <input
                type="range"
                min={100}
                max={5000}
                step={50}
                value={ticketValue}
                onChange={(e) => setTicketValue(Number(e.target.value))}
                className="w-full h-1 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
              />
              <div className="flex justify-between text-[10px] text-[#5a5a5a] mt-1">
                <span>$100</span>
                <span>$5,000 USD</span>
              </div>
            </div>

            {/* Slider 2: Multiplier */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-[#9e9e9e]">{t.roiMultiplierLabel}</span>
                <span className="text-base font-bold text-[#00f0ff]">{multiplier}</span>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                step={1}
                value={multiplier}
                onChange={(e) => setMultiplier(Number(e.target.value))}
                className="w-full h-1 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
              />
              <div className="flex justify-between text-[10px] text-[#5a5a5a] mt-1">
                <span>1</span>
                <span>50</span>
              </div>
            </div>

            {/* Estimated Return Outcome Screen */}
            <div className="p-5 rounded-2xl border border-[#00f0ff]/10 mb-6 flex flex-col justify-center items-center text-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(0,240,255,0.04), rgba(0,112,255,0.02))"
              }}
            >
              <span className="text-xs text-[#9e9e9e] uppercase tracking-wider mb-2 font-semibold">
                {t.calcResultLabel}
              </span>
              <span className="font-display font-bold text-4xl sm:text-5xl text-gradient-gold animate-pulse">
                ${estimatedRoi.toLocaleString()} USD
              </span>
              <div className="mt-4 flex flex-col gap-1 text-[10px] text-[#5a5a5a]">
                <span>{ui.setupFee}</span>
                <span>{ui.mensualFee}</span>
              </div>
            </div>

            {/* Action WhatsApp Button */}
            <a
              href={`${WHATSAPP_BASE}${encodeURIComponent(t.ctaMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-sm text-black transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #00f0ff, #0090b3)",
                boxShadow: "0 0 30px rgba(0, 240, 255, 0.25)"
              }}
            >
              <MessageCircle size={18} />
              {ui.cta}
            </a>
          </div>

          {/* Core Features & Bullet Points */}
          <div className="lg:col-span-5 flex flex-col h-full lg:pl-4">
            <h3 className="font-display font-bold text-xl text-[#f3f4f6] mb-6">
              {ui.beneficiosTitle}
            </h3>

            <div className="space-y-6">
              {t.beneficios.map((b, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle className="text-[#00f0ff]" size={18} />
                  </div>
                  <div>
                    <p className="text-[#e5e5e5] text-base leading-relaxed">
                      {b}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
