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
  DollarSign 
} from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageContext";
import { WHATSAPP_URL, getWhatsAppLink as getDynamicWhatsAppLink } from "@/lib/config";

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

  // Parser to extract Title, Time Range, and Leakage info from localized strings
  const parseDelayOption = (text: string, dKey: DelayType) => {
    const defaultTitles = {
      instant: lang === "en" ? "Instant" : lang === "pt" ? "Imediato" : "Inmediato",
      moderate: lang === "en" ? "Moderate" : lang === "pt" ? "Moderado" : "Moderado",
      slow: lang === "en" ? "Slow" : lang === "pt" ? "Lento" : "Lento",
      nextDay: lang === "en" ? "Next Day" : lang === "pt" ? "Dia Seguinte" : "Siguiente Día",
    };

    try {
      const timeMatch = text.match(/\(([^)]+)\)/);
      const time = timeMatch ? timeMatch[1].trim() : "";

      let title = text.split("(")[0].trim();
      if (!title) title = defaultTitles[dKey];

      const lastHyphenIndex = text.lastIndexOf("-");
      let subtitle = lastHyphenIndex !== -1 ? text.substring(lastHyphenIndex + 1).trim() : "";

      return { title, time, subtitle };
    } catch (e) {
      return { title: defaultTitles[dKey], time: "", subtitle: text };
    }
  };

  // Generate hyper-personalized WhatsApp Link
  const getWhatsAppLink = () => {
    const industryName = copy.industries[industry];
    const parsedOption = parseDelayOption(copy.delayOptions[delay], delay);
    const delayLabelText = `${parsedOption.title} (${parsedOption.time})`;
    
    // Replace template values manually
    let message = copy.whatsappTemplate
      .replace("{industry}", industryName)
      .replace("{leads}", leads.toString())
      .replace("{value}", formatCurrency(value))
      .replace("{delay}", delayLabelText)
      .replace("{recovered}", formatCurrency(recoveredRevenue));

    return getDynamicWhatsAppLink(message);
  };

  const efficiency = getEfficiencyRating(delay);

  // Minimalist colors by delay state
  const SEVERITY_COLORS = {
    instant: {
      color: "#10b981", // Emerald
      dotBg: "bg-emerald-400",
      textClass: "text-emerald-400",
    },
    moderate: {
      color: "#00f0ff", // Brand Cyan
      dotBg: "bg-[#00f0ff]",
      textClass: "text-tertiary",
    },
    slow: {
      color: "#f59e0b", // Amber
      dotBg: "bg-amber-400",
      textClass: "text-amber-400",
    },
    nextDay: {
      color: "#ef4444", // Red
      dotBg: "bg-red-400",
      textClass: "text-red-400",
    },
  };

  const activeColor = SEVERITY_COLORS[delay].color;

  return (
    <section id="auditor" className="py-24 relative overflow-hidden bg-transparent border-t border-b border-white/[0.03]">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-[25%] left-[-10%] w-[350px] h-[350px] rounded-full filter blur-[130px] opacity-[0.03] pointer-events-none bg-[#00f0ff]" />
      <div className="absolute bottom-[25%] right-[-10%] w-[300px] h-[300px] rounded-full filter blur-[110px] opacity-[0.02] pointer-events-none bg-[#c084fc]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-4 border"
            style={{
              borderColor: "rgba(0,240,255,0.2)",
              background: "rgba(0,240,255,0.03)",
              color: "#00f0ff",
              fontFamily: "var(--font-jet-brains-mono), monospace",
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
            
            <div className="space-y-8">
              {/* Industry Selector Tabs */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#9e9e9e] mb-4 font-semibold">
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
                            ? "bg-tertiary/10 border-tertiary/30 text-white shadow-[0_4px_12px_rgba(0,240,255,0.05)]"
                            : "bg-[#12121a]/30 border-white/5 text-[#9e9e9e] hover:border-white/10 hover:text-white/70"
                        }`}
                      >
                        <Icon size={13} className={active ? "text-tertiary" : "text-current"} />
                        <span className="truncate">{copy.industries[indKey]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slider 1: Leads */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="uppercase tracking-wider text-[#e5e5e5] font-semibold">{copy.leadsLabel}</span>
                  <span className="text-white font-extrabold bg-[#12121a]/60 px-3 py-1 rounded-lg border border-white/5">
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
                  <span className="uppercase tracking-wider text-[#e5e5e5] font-semibold">{copy.valueLabel}</span>
                  <span className="text-white font-extrabold bg-[#12121a]/60 px-3 py-1 rounded-lg border border-white/5">
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

              {/* Selector 3: Delay Options (Minimalist 2x2 Grid) */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#9e9e9e] mb-3 font-semibold">
                  {copy.delayLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Object.keys(copy.delayOptions) as DelayType[]).map((dKey) => {
                    const active = delay === dKey;
                    const parsed = parseDelayOption(copy.delayOptions[dKey], dKey);
                    const colorStyle = SEVERITY_COLORS[dKey];

                    return (
                      <button
                        key={dKey}
                        onClick={() => setDelay(dKey)}
                        className={`flex flex-col text-left p-4 rounded-2xl border transition-all duration-300 bg-[#12121a]/30 ${
                          active
                            ? "border-white/15 bg-[#12121a]/70"
                            : "border-white/5 hover:border-white/10"
                        }`}
                        style={{
                          borderLeftWidth: active ? "3px" : "1px",
                          borderLeftColor: active ? colorStyle.color : undefined
                        }}
                      >
                        <div className="flex justify-between items-center w-full mb-1">
                          <span className={`text-xs font-display font-extrabold uppercase tracking-wide flex items-center gap-1.5 ${
                            active ? colorStyle.textClass : "text-[#9e9e9e]"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${colorStyle.dotBg} ${active ? "animate-pulse" : "opacity-40"}`} />
                            {parsed.title}
                          </span>
                          {parsed.time && (
                            <span className="text-[9px] font-mono text-[#9e9e9e]">
                              {parsed.time}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#9e9e9e] leading-relaxed">
                          {parsed.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Workflow block */}
            <div className="mt-10 p-5 rounded-2xl border border-white/5 bg-[#12121a]/15">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#9e9e9e] mb-4 font-semibold flex items-center gap-2">
                <Clock size={12} className="text-tertiary" />
                {copy.workflowTitle}
              </h4>
              <div className="space-y-4 relative pl-3">
                {/* Node Line */}
                <div className="absolute left-6 top-3 bottom-3 w-px bg-white/5 pointer-events-none" />
                
                {copy.workflowSteps[industry].map((step: string, idx: number) => {
                  const stepParts = step.split(":");
                  const stepTitle = stepParts[0];
                  const stepDesc = stepParts.slice(1).join(":");

                  return (
                    <div key={idx} className="flex gap-4 relative z-10 items-start">
                      <div className="w-6 h-6 rounded-full bg-[#0a0a0f] border border-white/10 flex items-center justify-center flex-shrink-0 text-[10px] font-mono text-[#9e9e9e]">
                        {idx + 1}
                      </div>
                      <div className="pt-0.5">
                        {stepTitle && (
                          <h5 className="text-[10px] font-mono font-bold uppercase tracking-wider text-white mb-0.5">
                            {stepTitle}
                          </h5>
                        )}
                        <p className="text-[10px] leading-relaxed text-[#9e9e9e]">
                          {stepDesc ? stepDesc.trim() : step}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: Financial Audit Results & ROI (Col Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-white/5 bg-[#0a0a0f]/80 backdrop-blur-2xl relative shadow-2xl">
            
            <div className="space-y-8">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[#9e9e9e] font-semibold border-b border-white/[0.04] pb-4 flex items-center gap-2">
                <TrendingUp size={14} className="text-tertiary" />
                {copy.resultsTitle}
              </h3>

              {/* Minimalist Circular Efficiency Gauge */}
              <div className="flex flex-col items-center justify-center py-2">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="rgba(255,255,255,0.02)"
                      strokeWidth="7"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke={activeColor}
                      strokeWidth="7"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * efficiency) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-display font-extrabold text-white">
                      {efficiency}%
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#9e9e9e] font-bold mt-1">
                      {copy.efficiencyLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Result Block 1: Lost Revenue */}
              {delay !== "instant" && (
                <div className="p-4 rounded-2xl border border-white/5 bg-[#12121a]/20 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-red-500/[0.04] border border-red-500/10 text-red-400 flex-shrink-0 mt-0.5">
                    <DollarSign size={15} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#9e9e9e] font-semibold mb-0.5">
                      {copy.lostRevenue}
                    </h4>
                    <p className="text-xl sm:text-2xl font-display font-extrabold text-white mb-0.5">
                      {formatCurrency(lostRevenue * 12)} <span className="text-[10px] text-[#9e9e9e] font-mono">/ {lang === "en" ? "yr" : "año"}</span>
                    </p>
                    <p className="text-[9px] text-[#9e9e9e] leading-normal">
                      {copy.lostRevenueNote}
                    </p>
                  </div>
                </div>
              )}

              {/* Result Block 2: Recovered Revenue */}
              <div className="p-4 rounded-2xl border border-white/5 bg-[#12121a]/20 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-500/[0.04] border border-emerald-500/10 text-emerald-400 flex-shrink-0 mt-0.5">
                  <TrendingUp size={15} />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#9e9e9e] font-semibold mb-0.5">
                    {copy.recoveredRevenue}
                  </h4>
                  <p className="text-xl sm:text-2xl font-display font-extrabold text-[#10b981] mb-0.5">
                    {formatCurrency(recoveredRevenue)} <span className="text-[10px] text-[#9e9e9e] font-mono">/ {lang === "en" ? "mo" : "mes"}</span>
                  </p>
                  <p className="text-[9px] text-[#9e9e9e] leading-normal">
                    {copy.recoveredRevenueNote}
                  </p>
                </div>
              </div>

              {/* KPI Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-white/5 bg-[#12121a]/20 text-center">
                  <h5 className="text-[9px] font-mono uppercase tracking-wider text-[#9e9e9e] mb-1 font-semibold">
                    {copy.hoursSaved}
                  </h5>
                  <p className="text-xl font-display font-extrabold text-white">
                    {hoursSaved}h
                  </p>
                  <p className="text-[8px] text-[#9e9e9e] mt-0.5 leading-tight">{copy.hoursSavedNote}</p>
                </div>
                <div className="p-4 rounded-2xl border border-white/5 bg-[#12121a]/20 text-center">
                  <h5 className="text-[9px] font-mono uppercase tracking-wider text-[#9e9e9e] mb-1 font-semibold">
                    {copy.roiTitle}
                  </h5>
                  <p className="text-xl font-display font-extrabold text-[#00f0ff]">
                    {roiMultiplier}x
                  </p>
                  <p className="text-[8px] text-[#9e9e9e] mt-0.5 leading-tight">{copy.roiNote}</p>
                </div>
              </div>
            </div>

            {/* Hyper-personalized Call to Action (Solid Cyan Button) */}
            <div className="mt-8 pt-4 border-t border-white/[0.04]">
              {isClient ? (
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-bold text-sm text-black transition-all duration-300 hover:brightness-105 active:scale-[0.99] relative overflow-hidden"
                  style={{
                    backgroundColor: "#00f0ff",
                    boxShadow: "0 4px 20px rgba(0, 240, 255, 0.15)",
                  }}
                >
                  <span>{copy.ctaBtn}</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </a>
              ) : (
                <button
                  className="group flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-bold text-sm text-black transition-all duration-300 relative overflow-hidden"
                  style={{
                    backgroundColor: "#00f0ff",
                  }}
                >
                  {copy.ctaBtn}
                  <ArrowRight size={15} />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
