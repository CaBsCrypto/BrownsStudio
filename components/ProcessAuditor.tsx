"use client";

import { useState, useEffect } from "react";
import { 
  Sparkles, 
  Activity, 
  Scale, 
  Home, 
  ShoppingCart, 
  Briefcase, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  DollarSign 
} from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageContext";
import { WHATSAPP_URL } from "@/lib/config";

type IndustryType = "dental" | "aesthetic" | "legal" | "realEstate" | "ecommerce" | "b2b";
type DelayType = "instant" | "moderate" | "slow" | "nextDay";

const INDUSTRY_ICONS = {
  dental: Sparkles,
  aesthetic: Activity,
  legal: Scale,
  realEstate: Home,
  ecommerce: ShoppingCart,
  b2b: Briefcase,
};

export default function ProcessAuditor() {
  const { t, lang } = useLang();
  const [industry, setIndustry] = useState<IndustryType>("dental");
  const [leads, setLeads] = useState<number>(300);
  const [value, setValue] = useState<number>(140000);
  const [delay, setDelay] = useState<DelayType>("slow");
  const [isClient, setIsClient] = useState(false);

  // Setup currency formatting and default ticket values depending on language (CLP vs USD)
  useEffect(() => {
    setIsClient(true);
    if (lang === "en") {
      setValue(250); // Default USD ticket value
    } else {
      setValue(140000); // Default CLP ticket value
    }
  }, [lang]);

  if (!t.processAuditor) return null;

  const copy = t.processAuditor;

  // Configuration for Sliders depending on currency (CLP vs USD)
  const isUSD = lang === "en";
  const minLeads = 50;
  const maxLeads = 3000;
  const leadsStep = 50;

  const minValue = isUSD ? 10 : 10000;
  const maxValue = isUSD ? 5000 : 2500000;
  const valueStep = isUSD ? 25 : 10000;

  // Calculadora de Fuga e Impacto
  const getLeakagePercentage = (d: DelayType) => {
    switch (d) {
      case "instant": return 0.05; // 5% baseline
      case "moderate": return 0.20; // 20% leak
      case "slow": return 0.40; // 40% leak
      case "nextDay": return 0.65; // 65% leak
    }
  };

  const getEfficiencyRating = (d: DelayType) => {
    switch (d) {
      case "instant": return 98;
      case "moderate": return 78;
      case "slow": return 48;
      case "nextDay": return 20;
    }
  };

  const getRecoveryRate = (d: DelayType) => {
    switch (d) {
      case "instant": return 0.12; // Even at instant, AI saves 12% via 24/7 coverage
      case "moderate": return 0.35; // Recovers 35% of leaking leads
      case "slow": return 0.45; // Recovers 45% of leaking leads
      case "nextDay": return 0.55; // Recovers 55% of leaking leads
    }
  };

  const totalPotential = leads * value;
  const leakagePercentage = getLeakagePercentage(delay);
  const lostRevenue = totalPotential * leakagePercentage;
  const recoveryRate = getRecoveryRate(delay);
  const recoveredRevenue = lostRevenue * recoveryRate;

  // Operational Hours Saved: 4.5 minutes per lead qualification / booking flow
  const hoursSaved = Math.round((leads * 4.5) / 60);

  // Dynamic ROI calculation
  // Monthly maintenance averages 175,000 CLP / $200 USD
  const maintenanceCost = isUSD ? 200 : 175000;
  const roiMultiplier = Math.max(1, Math.round(recoveredRevenue / maintenanceCost));

  // Currency Formatter
  const formatCurrency = (val: number) => {
    if (isUSD) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);
    } else {
      return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(val);
    }
  };

  // Generate hyper-personalized WhatsApp Link
  const getWhatsAppLink = () => {
    const industryName = copy.industries[industry];
    const delayLabelText = delay === "instant" ? "Inmediato" : delay === "moderate" ? "Moderado" : delay === "slow" ? "Lento" : "Siguiente Día";
    
    // Replace template values manually
    let message = copy.whatsappTemplate
      .replace("{industry}", industryName)
      .replace("{leads}", leads.toString())
      .replace("{value}", formatCurrency(value))
      .replace("{delay}", delayLabelText)
      .replace("{recovered}", formatCurrency(recoveredRevenue));

    return `${WHATSAPP_URL}&text=${encodeURIComponent(message)}`;
  };

  const efficiency = getEfficiencyRating(delay);

  return (
    <section id="auditor" className="py-24 relative overflow-hidden bg-transparent border-t border-b border-white/[0.03]">
      {/* Glow Effects */}
      <div className="absolute top-[20%] left-[-15%] w-[500px] h-[500px] rounded-full filter blur-[150px] opacity-[0.05] pointer-events-none bg-[#00f0ff] animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[-15%] w-[400px] h-[400px] rounded-full filter blur-[120px] opacity-[0.03] pointer-events-none bg-[#c084fc] animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-4 border"
            style={{
              borderColor: "rgba(0,240,255,0.25)",
              background: "rgba(0,240,255,0.05)",
              color: "#00f0ff",
              fontFamily: "var(--font-jet-brains-mono), monospace",
              boxShadow: "0 0 15px rgba(0,240,255,0.1)"
            }}
          >
            <Sparkles size={11} className="animate-pulse" />
            {copy.eyebrow}
          </div>
          
          <h2
            className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#e5e5e5] mb-6 tracking-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            {copy.title.split("&")[0]}
            {copy.title.includes("&") && (
              <>
                <span className="bg-gradient-to-r from-[#00f0ff] to-[#818cf8] bg-clip-text text-transparent">
                  & {copy.title.split("&")[1]}
                </span>
              </>
            )}
            {!copy.title.includes("&") && copy.title.includes("y") && (
              <>
                {copy.title.split("y")[0]}
                <span className="bg-gradient-to-r from-[#00f0ff] to-[#818cf8] bg-clip-text text-transparent">
                  y {copy.title.split("y")[1]}
                </span>
              </>
            )}
          </h2>
          <p className="text-[#9e9e9e] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {copy.sub}
          </p>
        </div>

        {/* Auditor Bento Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT PANEL: Sliders & Industry Selector (Col Span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-white/5 bg-[#0a0a0f]/80 backdrop-blur-2xl relative shadow-2xl">
            {/* Tech Corner Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00f0ff]/30" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00f0ff]/30" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00f0ff]/30" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00f0ff]/30" />

            <div className="space-y-8">
              {/* Industry Selector Tabs */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#9e9e9e] mb-4 font-bold">
                  {copy.industryLabel}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {(Object.keys(copy.industries) as IndustryType[]).map((indKey) => {
                    const Icon = INDUSTRY_ICONS[indKey];
                    const active = industry === indKey;
                    return (
                      <button
                        key={indKey}
                        onClick={() => setIndustry(indKey)}
                        className={`flex items-center gap-2 px-3 py-3 rounded-xl border text-[11px] font-semibold transition-all duration-300 ${
                          active
                            ? "bg-tertiary/10 border-tertiary/40 text-white shadow-[0_0_15px_rgba(0,240,255,0.12)]"
                            : "bg-[#12121a]/40 border-white/5 text-[#5e5e66] hover:border-white/10 hover:text-white/70"
                        }`}
                      >
                        <Icon size={14} className={active ? "text-tertiary animate-pulse" : "text-current"} />
                        <span className="truncate">{copy.industries[indKey]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slider 1: Leads */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="uppercase tracking-wider text-[#9e9e9e] font-bold">{copy.leadsLabel}</span>
                  <span className="text-white font-extrabold bg-[#12121a] px-3 py-1 rounded-lg border border-white/5">
                    {leads}
                  </span>
                </div>
                <input
                  type="range"
                  min={minLeads}
                  max={maxLeads}
                  step={leadsStep}
                  value={leads}
                  onChange={(e) => setLeads(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-[#12121a] appearance-none cursor-pointer accent-tertiary border border-white/5"
                  style={{
                    backgroundImage: `linear-gradient(to right, #00f0ff 0%, #00f0ff ${((leads - minLeads) / (maxLeads - minLeads)) * 100}%, #12121a ${((leads - minLeads) / (maxLeads - minLeads)) * 100}%, #12121a 100%)`
                  }}
                />
              </div>

              {/* Slider 2: Average Deal Value */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="uppercase tracking-wider text-[#9e9e9e] font-bold">{copy.valueLabel}</span>
                  <span className="text-white font-extrabold bg-[#12121a] px-3 py-1 rounded-lg border border-white/5">
                    {formatCurrency(value)}
                  </span>
                </div>
                <input
                  type="range"
                  min={minValue}
                  max={maxValue}
                  step={valueStep}
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-[#12121a] appearance-none cursor-pointer accent-tertiary border border-white/5"
                  style={{
                    backgroundImage: `linear-gradient(to right, #00f0ff 0%, #00f0ff ${((value - minValue) / (maxValue - minValue)) * 100}%, #12121a ${((value - minValue) / (maxValue - minValue)) * 100}%, #12121a 100%)`
                  }}
                />
              </div>

              {/* Selector 3: Delay Options */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#9e9e9e] mb-3 font-bold">
                  {copy.delayLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Object.keys(copy.delayOptions) as DelayType[]).map((dKey) => {
                    const active = delay === dKey;
                    let colorClass = "text-[#5e5e66]";
                    if (active) {
                      if (dKey === "instant") colorClass = "text-emerald-400";
                      else if (dKey === "moderate") colorClass = "text-[#00f0ff]";
                      else if (dKey === "slow") colorClass = "text-amber-400";
                      else colorClass = "text-red-400";
                    }

                    return (
                      <button
                        key={dKey}
                        onClick={() => setDelay(dKey)}
                        className={`flex flex-col text-left p-3.5 rounded-xl border transition-all duration-300 ${
                          active
                            ? "bg-[#12121a] shadow-[0_0_15px_rgba(0,0,0,0.4)]"
                            : "bg-[#12121a]/20 border-white/5 hover:border-white/10"
                        }`}
                        style={{
                          borderColor: active 
                            ? dKey === "instant" ? "rgba(16,185,129,0.3)" : dKey === "moderate" ? "rgba(0,240,255,0.3)" : dKey === "slow" ? "rgba(245,158,11,0.3)" : "rgba(239,68,68,0.3)"
                            : "rgba(255,255,255,0.05)"
                        }}
                      >
                        <span className={`text-[10px] font-mono uppercase tracking-wider font-extrabold ${colorClass} mb-1 flex items-center gap-1.5`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            dKey === "instant" ? "bg-emerald-400" : dKey === "moderate" ? "bg-[#00f0ff]" : dKey === "slow" ? "bg-amber-400" : "bg-red-400"
                          } ${active ? "animate-pulse" : ""}`} />
                          {dKey === "instant" ? "Instant" : dKey === "moderate" ? "Moderate" : dKey === "slow" ? "Slow" : "Next Day"}
                        </span>
                        <span className="text-[10px] text-[#727278]">{copy.delayOptions[dKey].split("-")[1]?.trim() || copy.delayOptions[dKey]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Dynamic Interactive Node Diagram */}
            <div className="mt-10 p-5 rounded-2xl border border-white/5 bg-[#12121a]/40">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#9e9e9e] mb-4 font-bold flex items-center gap-2">
                <Clock size={12} className="text-tertiary" />
                {copy.workflowTitle}
              </h4>
              <div className="space-y-3 relative">
                {/* Node Line */}
                <div className="absolute left-3.5 top-2.5 bottom-2.5 w-px bg-gradient-to-b from-tertiary via-tertiary/20 to-transparent pointer-events-none" />
                
                {copy.workflowSteps[industry].map((step: string, idx: number) => (
                  <div key={idx} className="flex gap-4 relative z-10 items-start">
                    <div className="w-7 h-7 rounded-full bg-[#0a0a0f] border border-tertiary/30 flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold text-tertiary">
                      {idx + 1}
                    </div>
                    <p className="text-[10px] sm:text-[11px] leading-relaxed text-[#9e9e9e] pt-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: Financial Audit Results & ROI (Col Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-white/5 bg-[#0a0a0f]/80 backdrop-blur-2xl relative shadow-2xl">
            {/* Tech Corner Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00f0ff]/30" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00f0ff]/30" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00f0ff]/30" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00f0ff]/30" />

            <div className="space-y-8">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[#9e9e9e] font-bold border-b border-white/[0.04] pb-4 flex items-center gap-2">
                <TrendingUp size={14} className="text-tertiary" />
                {copy.resultsTitle}
              </h3>

              {/* Dynamic SVG Circular Efficiency Gauge */}
              <div className="flex flex-col items-center justify-center py-4">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background Track */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="rgba(255,255,255,0.02)"
                      strokeWidth="8"
                    />
                    {/* Foreground Glow */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke={delay === "instant" ? "#10b981" : delay === "moderate" ? "#00f0ff" : delay === "slow" ? "#f59e0b" : "#ef4444"}
                      strokeWidth="8"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * efficiency) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                      style={{
                        filter: "drop-shadow(0 0 8px currentColor)"
                      }}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-display font-extrabold text-white">
                      {efficiency}%
                    </span>
                    <span className="text-[8px] font-mono uppercase tracking-wider text-[#727278] font-bold">
                      {copy.efficiencyLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Result Block 1: Lost Revenue */}
              {delay !== "instant" && (
                <div className="p-4 rounded-2xl border border-red-500/10 bg-red-500/[0.02] flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-red-500/10 border border-red-500/20 text-red-400 flex-shrink-0">
                    <DollarSign size={16} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-red-400 font-bold mb-1">
                      {copy.lostRevenue}
                    </h4>
                    <p className="text-xl sm:text-2xl font-display font-extrabold text-white mb-1">
                      {formatCurrency(lostRevenue * 12)} <span className="text-[10px] text-[#727278] font-mono">/ {lang === "en" ? "yr" : "año"}</span>
                    </p>
                    <p className="text-[9px] text-[#727278] leading-normal">
                      {copy.lostRevenueNote}
                    </p>
                  </div>
                </div>
              )}

              {/* Result Block 2: Recovered Revenue */}
              <div className="p-4 rounded-2xl border border-[#10b981]/20 bg-[#10b981]/[0.02] flex items-start gap-4 shadow-[0_0_20px_rgba(16,185,129,0.03)]">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] flex-shrink-0">
                  <TrendingUp size={16} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#10b981] font-bold mb-1">
                    {copy.recoveredRevenue}
                  </h4>
                  <p className="text-xl sm:text-2xl font-display font-extrabold text-[#10b981] mb-1" style={{ textShadow: "0 0 15px rgba(16,185,129,0.2)" }}>
                    {formatCurrency(recoveredRevenue)} <span className="text-[10px] text-[#727278] font-mono">/ {lang === "en" ? "mo" : "mes"}</span>
                  </p>
                  <p className="text-[9px] text-[#727278] leading-normal">
                    {copy.recoveredRevenueNote}
                  </p>
                </div>
              </div>

              {/* Dynamic KPI Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-white/5 bg-[#12121a]/60 text-center">
                  <h5 className="text-[9px] font-mono uppercase tracking-wider text-[#727278] mb-1 font-bold">
                    {copy.hoursSaved}
                  </h5>
                  <p className="text-xl font-display font-extrabold text-white">
                    {hoursSaved}h
                  </p>
                  <p className="text-[8px] text-[#5e5e66] mt-0.5">{copy.hoursSavedNote}</p>
                </div>
                <div className="p-4 rounded-2xl border border-tertiary/20 bg-tertiary/[0.02] text-center shadow-[0_0_15px_rgba(0,240,255,0.02)]">
                  <h5 className="text-[9px] font-mono uppercase tracking-wider text-[#727278] mb-1 font-bold">
                    {copy.roiTitle}
                  </h5>
                  <p className="text-xl font-display font-extrabold text-tertiary" style={{ textShadow: "0 0 10px rgba(0,240,255,0.2)" }}>
                    {roiMultiplier}x
                  </p>
                  <p className="text-[8px] text-[#5e5e66] mt-0.5">{copy.roiNote}</p>
                </div>
              </div>
            </div>

            {/* Hyper-personalized Call to Action */}
            <div className="mt-8 pt-4 border-t border-white/[0.04]">
              {isClient ? (
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-bold text-sm text-black transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #00f0ff, #00c8d8)",
                    boxShadow: "0 0 25px rgba(0, 240, 255, 0.25)",
                  }}
                >
                  {copy.ctaBtn}
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                </a>
              ) : (
                <button
                  className="group flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-bold text-sm text-black transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #00f0ff, #00c8d8)",
                  }}
                >
                  {copy.ctaBtn}
                  <ArrowRight size={16} />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
