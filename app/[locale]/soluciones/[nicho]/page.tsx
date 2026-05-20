"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, Calculator, Sparkles, MessageCircle, Briefcase, Award } from "lucide-react";
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
      calculadoraTitle: "Calculadora de ROI de tu Trabajador Digital",
      calculadoraSub: "Ajusta los parámetros para proyectar el retorno financiero real que este sistema genera al mes.",
      setupFee: "Setup único de desarrollo desde $500 USD",
      mensualFee: "Mantenimiento mensual de $100 - $200 USD",
      cta: "Activar mi Trabajador Digital Personalizado",
      beneficiosTitle: "Lo que construimos y operamos para ti:",
      tipoNegocioLabel: "Selecciona el perfil de tu negocio para adaptar el enfoque:",
    },
    en: {
      back: "Back to home",
      solucion: "High-Impact Solution",
      calculadoraTitle: "Your Digital Worker's ROI Calculator",
      calculadoraSub: "Adjust the parameters to project the real monthly financial return this system generates.",
      setupFee: "One-time development setup from $500 USD",
      mensualFee: "Monthly maintenance from $100 - $200 USD",
      cta: "Activate my Custom Digital Worker",
      beneficiosTitle: "What we build and operate for you:",
      tipoNegocioLabel: "Select your business profile to adapt the value focus:",
    },
    pt: {
      back: "Voltar ao início",
      solucion: "Solução de Impacto",
      calculadoraTitle: "Calculadora de ROI do seu Trabalhador Digital",
      calculadoraSub: "Ajuste os parâmetros para projetar o retorno financeiro real mensal que este sistema gera.",
      setupFee: "Setup único de desenvolvimento a partir de $500 USD",
      mensualFee: "Manutenção mensal de $100 - $200 USD",
      cta: "Ativar meu Trabalhador Digital Personalizado",
      beneficiosTitle: "O que construímos e operamos para você:",
      tipoNegocioLabel: "Selecione o perfil do seu negócio para adaptar o foco de valor:",
    }
  };

  const ui = uiText[locale as keyof typeof uiText] || uiText.es;

  // Profile selection state
  const [profileMode, setProfileMode] = useState<"estandar" | "premium">("estandar");
  const activeProfile = t.profiles[profileMode];

  // Calculator states
  const [ticketValue, setTicketValue] = useState(activeProfile.defaultRoiValue);
  const [multiplier, setMultiplier] = useState(activeProfile.defaultRoiMultiplier);

  // Sync state values when switching profile modes or niches
  useEffect(() => {
    setTicketValue(activeProfile.defaultRoiValue);
    setMultiplier(activeProfile.defaultRoiMultiplier);
  }, [profileMode, nicho, activeProfile.defaultRoiValue, activeProfile.defaultRoiMultiplier]);

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
          className="inline-flex items-center gap-2 text-xs text-[#5a5a5a] hover:text-[#00f0ff] transition-all mb-12 uppercase tracking-widest font-mono"
        >
          <ArrowLeft size={14} />
          {ui.back}
        </Link>

        {/* Hero Header Section */}
        <div className="mb-12 text-center md:text-left">
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
            {activeProfile.headline}
          </h1>

          <p className="text-[#9e9e9e] text-lg sm:text-xl max-w-3xl leading-relaxed mb-8">
            {activeProfile.sub}
          </p>

          <div className="inline-flex items-center gap-2 text-[#00f0ff] text-sm font-semibold bg-[#00f0ff]/5 border border-[#00f0ff]/10 px-4 py-2.5 rounded-2xl shadow-[0_0_15px_rgba(0,240,255,0.05)]">
            <Sparkles size={16} className="text-[#00f0ff] animate-pulse" />
            {activeProfile.estadistica}
          </div>
        </div>

        {/* Buyer Persona / Profile Selector */}
        <div className="mb-12">
          <p className="text-xs text-[#7c7c8c] uppercase tracking-wider font-mono mb-4 text-center md:text-left">
            {ui.tipoNegocioLabel}
          </p>
          
          <div className="p-1.5 bg-[#0e0e13]/90 border border-white/5 backdrop-blur-md rounded-2xl flex flex-col sm:flex-row gap-2 max-w-xl mx-auto md:mx-0 shadow-2xl relative">
            <button
              onClick={() => setProfileMode("estandar")}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 w-full ${
                profileMode === "estandar"
                  ? "bg-white/10 text-white border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                  : "text-[#9e9e9e] hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Briefcase size={14} className={profileMode === "estandar" ? "text-[#00f0ff]" : ""} />
              {t.profiles.estandar.name}
            </button>
            
            <button
              onClick={() => setProfileMode("premium")}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 w-full relative overflow-hidden group ${
                profileMode === "premium"
                  ? "bg-gradient-to-r from-tertiary/20 to-purple-500/10 text-white border border-tertiary/30 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                  : "text-[#9e9e9e] hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Award size={14} className={profileMode === "premium" ? "text-tertiary" : ""} />
              {t.profiles.premium.name}
              {profileMode === "premium" && (
                <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-tertiary animate-ping m-1" />
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Split Grid: Calculator & Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* ROI Calculator Card */}
          <div className="lg:col-span-7 rounded-2xl p-6 md:p-8 flex flex-col border border-ghost transition-all duration-300 relative overflow-hidden"
            style={{
              background: "rgba(10,11,10,0.8)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Corner Tech Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00f0ff]/30" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00f0ff]/30" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00f0ff]/30" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00f0ff]/30" />

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
                <span className="text-xs sm:text-sm font-medium text-[#9e9e9e]">{activeProfile.roiLabel}</span>
                <span className="text-sm sm:text-base font-bold text-[#00f0ff]">${ticketValue.toLocaleString()} USD</span>
              </div>
              <input
                type="range"
                min={100}
                max={activeProfile.maxTicket}
                step={50}
                value={ticketValue}
                onChange={(e) => setTicketValue(Number(e.target.value))}
                className="w-full h-1 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
              />
              <div className="flex justify-between text-[10px] text-[#5a5a5a] mt-1 font-mono">
                <span>$100</span>
                <span>${activeProfile.maxTicket.toLocaleString()} USD</span>
              </div>
            </div>

            {/* Slider 2: Multiplier */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm font-medium text-[#9e9e9e]">{activeProfile.roiMultiplierLabel}</span>
                <span className="text-sm sm:text-base font-bold text-[#00f0ff]">{multiplier}</span>
              </div>
              <input
                type="range"
                min={1}
                max={activeProfile.maxMultiplier}
                step={1}
                value={multiplier}
                onChange={(e) => setMultiplier(Number(e.target.value))}
                className="w-full h-1 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
              />
              <div className="flex justify-between text-[10px] text-[#5a5a5a] mt-1 font-mono">
                <span>1</span>
                <span>{activeProfile.maxMultiplier}</span>
              </div>
            </div>

            {/* Estimated Return Outcome Screen */}
            <div className="p-5 rounded-2xl border border-[#00f0ff]/10 mb-6 flex flex-col justify-center items-center text-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(0,240,255,0.04), rgba(0,112,255,0.02))"
              }}
            >
              <span className="text-xs text-[#9e9e9e] uppercase tracking-wider mb-2 font-semibold font-mono">
                {activeProfile.calcResultLabel}
              </span>
              <span className="font-display font-bold text-4xl sm:text-5xl text-gradient-gold animate-pulse drop-shadow-[0_0_15px_rgba(200,160,80,0.25)]">
                ${estimatedRoi.toLocaleString()} USD
              </span>
              <div className="mt-4 flex flex-col gap-1 text-[10px] text-[#5a5a5a] font-mono">
                <span>{ui.setupFee}</span>
                <span>{ui.mensualFee}</span>
              </div>
            </div>

            {/* Action WhatsApp Button */}
            <a
              href={`${WHATSAPP_BASE}${encodeURIComponent(activeProfile.ctaMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-sm text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #00f0ff, #0090b3)",
              }}
            >
              <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
              {ui.cta}
            </a>
          </div>

          {/* Core Features & Bullet Points */}
          <div className="lg:col-span-5 flex flex-col h-full lg:pl-4">
            <h3 className="font-display font-bold text-xl text-[#f3f4f6] mb-6 border-l-2 border-[#00f0ff] pl-3">
              {ui.beneficiosTitle}
            </h3>

            <div className="space-y-6">
              {activeProfile.beneficios.map((b, idx) => (
                <div key={idx} className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${idx * 80}ms` }}>
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
