"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Zap, Globe, GraduationCap, MessageCircle, X } from "lucide-react";
import { getWhatsAppWithPackage, WHATSAPP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function Pricing() {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'web' | 'training'>('web');
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedPlan || isSupportOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPlan, isSupportOpen]);

  // Handle keyboard escape press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPlan(null);
        setIsSupportOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const tabs = [
    { id: 'web', label: t.pricing.tabWeb },
    { id: 'training', label: t.pricing.tabTraining }
  ];

  return (
    <section
      ref={sectionRef}
      id="precios"
      className="py-24 relative overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="reveal font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#e5e5e5] mb-6"
            style={{ letterSpacing: "-0.02em" }}
          >
            {t.pricing.title}
          </h2>
          <p className="reveal text-[#9e9e9e] text-base sm:text-lg max-w-2xl mx-auto mb-10">
            {t.pricing.sub}
          </p>

          {/* Tabs */}
          <div className="reveal flex justify-center mb-12">
            <div className="inline-flex p-1.5 glass rounded-2xl border-ghost">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                  style={{ 
                    background: activeTab === tab.id ? "rgba(0,240,255,0.15)" : "transparent",
                    color: activeTab === tab.id ? "#00f0ff" : "#9e9e9e",
                    border: activeTab === tab.id ? "1px solid rgba(0,240,255,0.3)" : "1px solid transparent"
                  }}
                >
                  {tab.id === 'web' ? <Globe size={16} /> : <GraduationCap size={16} />}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        {(() => {
          const plansCount = activeTab === 'web' 
            ? (t.pricing as any).plans.length 
            : (t.pricing as any).trainingPlans.length;
          return (
            <div className={`grid grid-cols-1 md:grid-cols-2 ${plansCount >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6 max-w-7xl mx-auto`}>
              {((activeTab === 'web' ? (t.pricing as any).plans : (t.pricing as any).trainingPlans) as any[]).map((plan) => {
                const isOnboarding = plan.name.toLowerCase().includes("onboarding") || 
                                     plan.name.toLowerCase().includes("inducción") || 
                                     plan.name.toLowerCase().includes("induc") ||
                                     plan.name.toLowerCase().includes("copilot") ||
                                     plan.name.toLowerCase().includes("knowledge");
                return (
                  <div
                    key={plan.name}
                    className={`reveal relative rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 flex flex-col h-full ${isRevealed ? 'visible' : ''} ${
                      plan.popular ? "lg:-mt-4 lg:mb-4 lg:my-0 mt-0 mb-6" : ""
                    }`}
                    style={{
                      background: isOnboarding 
                        ? "rgba(22, 18, 38, 0.65)" 
                        : plan.popular 
                        ? "rgba(15, 20, 35, 0.65)" 
                        : "rgba(12, 13, 12, 0.5)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      border: isOnboarding
                        ? "1px solid rgba(139, 92, 246, 0.35)"
                        : plan.popular
                        ? "1px solid rgba(0,240,255,0.4)"
                        : "1px solid rgba(255,255,255,0.08)",
                      boxShadow: isOnboarding
                        ? "0 0 40px rgba(139, 92, 246, 0.08)"
                        : plan.popular
                        ? "0 0 40px rgba(0,240,255,0.12)"
                        : "none",
                    }}
                  >
                    {plan.popular && (
                      <div
                        className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold text-black"
                        style={{ background: "linear-gradient(135deg, #00f0ff, #0070ff)", boxShadow: "0 0 15px rgba(0,240,255,0.4)" }}
                      >
                        <Zap size={11} fill="currentColor" />
                        {t.pricing.popular}
                      </div>
                    )}

                    {isOnboarding && (
                      <div
                        className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold text-white border border-[#8b5cf6]/30"
                        style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)", boxShadow: "0 0 15px rgba(139,92,246,0.3)" }}
                      >
                        <GraduationCap size={11} className="text-white animate-pulse" />
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="font-display font-bold text-xl text-[#e5e5e5] mb-1">{plan.name}</h3>
                      <p className="text-[#9e9e9e] text-xs leading-relaxed mb-auto min-h-[40px] flex items-center">{plan.desc}</p>
                      
                      {/* Price Section */}
                      <div className="mt-5 mb-6 flex flex-col gap-2">
                        {/* Setup Price */}
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          <span 
                            className={`font-display font-black tracking-tight ${
                              plan.price.length > 12 
                                ? 'text-2xl' 
                                : plan.price.length > 8 
                                ? 'text-3xl' 
                                : 'text-3xl sm:text-4xl'
                            }`}
                            style={{ 
                              color: isOnboarding ? "#c084fc" : plan.popular ? "#00f0ff" : "#e5e5e5", 
                              textShadow: isOnboarding 
                                ? "0 0 15px rgba(192,132,252,0.25)" 
                                : plan.popular 
                                ? "0 0 15px rgba(0,240,255,0.25)" 
                                : "none" 
                            }}
                          >
                            {plan.price.replace(" CLP", "")}
                          </span>
                          {!plan.price.toLowerCase().includes("cotizar") && 
                           !plan.price.toLowerCase().includes("quote") && 
                           !plan.price.toLowerCase().includes("medida") && 
                           !plan.price.toLowerCase().includes("talk") && 
                           !plan.price.toLowerCase().includes("convers") && (
                            <span className="text-[#9e9e9e] text-[10px] font-bold uppercase tracking-widest font-mono bg-white/5 border border-white/10 rounded px-1.5 py-0.5">
                              CLP Setup
                            </span>
                          )}
                        </div>

                        {/* Maintenance / Monthly Suffix */}
                        {plan.priceSuffix && (
                          <div className="text-[11px] text-[#a1a1aa] bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2.5 font-sans flex items-center justify-between gap-2.5 w-full leading-normal">
                            <div className="flex items-start gap-2 flex-grow">
                              <span 
                                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 animate-pulse"
                                style={{ backgroundColor: isOnboarding ? "#c084fc" : "#00f0ff" }}
                              ></span>
                              <span className="flex-grow">
                                {plan.priceSuffix.replace(" setup + ", "").replace(" + ", "")}
                              </span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsSupportOpen(true);
                              }}
                              className="p-1 px-2 rounded bg-white/5 hover:bg-white/10 hover:text-white transition-all flex-shrink-0 flex items-center justify-center border border-white/5 shadow-sm active:scale-95"
                              title="Ver detalles de soporte"
                            >
                              <span className="text-[9px] font-bold tracking-wider font-mono" style={{ color: isOnboarding ? "#c084fc" : "#00f0ff" }}>+ INFO</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-5 flex-grow">
                      {plan.features.slice(0, 3).map((feature: string) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-[#9e9e9e]">
                          <Check size={15} className="flex-shrink-0 mt-0.5" style={{ color: isOnboarding ? "#a78bfa" : "#00f0ff" }} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {activeTab === 'web' && (
                      <button
                        onClick={() => setSelectedPlan(plan)}
                        className="text-left text-xs font-semibold mb-6 transition-all duration-300 hover:translate-x-1 flex items-center gap-1 w-fit"
                        style={{ color: isOnboarding ? "#c084fc" : "#00f0ff" }}
                      >
                        {(t.pricing as any).moreDetails || "Ver detalles e implementación ➔"}
                      </button>
                    )}

                    {isOnboarding && !plan.longFeatures && (
                      <div className="mb-6 pt-3 border-t border-white/5">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[9px] text-[#9e9e9e]/60 uppercase tracking-widest font-mono font-bold">Compatible Channels:</span>
                          <div className="flex gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-[#E01E5A]/10 border border-[#E01E5A]/20 text-[#E01E5A]">Slack</span>
                            <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-[#6264A7]/10 border border-[#6264A7]/20 text-[#6264A7]">MS Teams</span>
                            <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366]">WhatsApp</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <a
                      href={getWhatsAppWithPackage(plan.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-3 rounded-xl text-sm font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-auto"
                      style={
                        plan.popular
                          ? { background: "linear-gradient(135deg, #00f0ff, #0070ff)", color: "#000", boxShadow: "0 0 20px rgba(0,240,255,0.2)" }
                          : isOnboarding
                          ? { border: "1px solid rgba(139, 92, 246, 0.4)", color: "#c084fc", boxShadow: "0 0 15px rgba(139, 92, 246, 0.05)" }
                          : { border: "1px solid rgba(0, 240, 255, 0.3)", color: "#00f0ff" }
                      }
                      onMouseEnter={(e) => {
                        if (!plan.popular) {
                          (e.currentTarget as HTMLElement).style.background = isOnboarding ? "rgba(139, 92, 246, 0.08)" : "rgba(0,240,255,0.05)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!plan.popular) {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                        }
                      }}
                    >
                      {t.pricing.ctaBtn}
                    </a>
                  </div>
                );
              })}
            </div>
          );
        })()}

        {/* Training note callout */}
        {activeTab === "training" && (t.pricing as any).trainingNote && (
          <div 
            className={`reveal mt-12 max-w-4xl mx-auto ${isRevealed ? 'visible' : ''}`}
          >
            <div 
              className="rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
              style={{ 
                background: "rgba(0,240,255,0.05)", 
                border: "1px solid rgba(0,240,255,0.15)",
                boxShadow: "0 0 30px rgba(0,240,255,0.03)"
              }}
            >
              <div className="text-center md:text-left">
                <h4 className="font-display font-bold text-lg text-[#e5e5e5] mb-2">
                  {(t.pricing as any).trainingNote.title}
                </h4>
                <p className="text-[#9e9e9e] text-sm max-w-md">
                  {(t.pricing as any).trainingNote.desc}
                </p>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap"
                style={{ background: "rgba(0,240,255,0.15)", color: "#00f0ff", border: "1px solid rgba(0,240,255,0.2)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,240,255,0.25)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,240,255,0.15)"; }}
              >
                <MessageCircle size={16} />
                {(t.pricing as any).trainingNote.btn}
              </a>
            </div>
          </div>
        )}

        {/* Bottom note */}
        <p className="reveal text-center text-[#9e9e9e] text-sm mt-8">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9e9e9e] hover:text-[#00f0ff] transition-colors duration-200"
            dangerouslySetInnerHTML={{ __html: t.pricing.combo }}
          />
        </p>
      {/* Modal for Plan Details */}
      {selectedPlan && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop with extreme blur and dark tint */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setSelectedPlan(null)}
          />
          
          {/* Modal Content container */}
          <div 
            className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-10 transition-all duration-300 flex flex-col border"
            style={{
              background: "rgba(10, 11, 15, 0.95)",
              borderColor: selectedPlan.name.toLowerCase().includes("copilot") || selectedPlan.name.toLowerCase().includes("knowledge")
                ? "rgba(139, 92, 246, 0.3)"
                : "rgba(0, 240, 255, 0.3)",
              boxShadow: selectedPlan.name.toLowerCase().includes("copilot") || selectedPlan.name.toLowerCase().includes("knowledge")
                ? "0 0 50px rgba(139, 92, 246, 0.15)"
                : "0 0 50px rgba(0, 240, 255, 0.15)",
            }}
          >
            {/* Close button */}
            <button 
              onClick={() => setSelectedPlan(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="mb-8 pr-10">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest font-mono text-[#9e9e9e] bg-white/5 border border-white/10 rounded-full px-3 py-1 inline-block mb-3">
                {t.pricing.modalTitle || "Detalles del Servicio e Implementación"}
              </span>
              <h3 className="font-display font-black text-2xl sm:text-4xl text-white mb-2">
                {selectedPlan.name}
              </h3>
              <p className="text-[#9e9e9e] text-sm sm:text-base leading-relaxed max-w-2xl">
                {selectedPlan.desc}
              </p>

              {/* Price inside modal */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="flex items-baseline gap-1.5">
                  <span 
                    className="font-display font-black text-2xl sm:text-3xl"
                    style={{ 
                      color: selectedPlan.name.toLowerCase().includes("copilot") || selectedPlan.name.toLowerCase().includes("knowledge") 
                        ? "#c084fc" 
                        : "#00f0ff" 
                    }}
                  >
                    {selectedPlan.price.replace(" CLP", "")}
                  </span>
                  {!selectedPlan.price.toLowerCase().includes("cotizar") && 
                   !selectedPlan.price.toLowerCase().includes("quote") && 
                   !selectedPlan.price.toLowerCase().includes("medida") && 
                   !selectedPlan.price.toLowerCase().includes("talk") && 
                   !selectedPlan.price.toLowerCase().includes("convers") && (
                    <span className="text-[#9e9e9e] text-[9px] font-bold uppercase tracking-widest font-mono bg-white/5 border border-white/10 rounded px-1.5 py-0.5">
                      CLP Setup
                    </span>
                  )}
                </div>
                {selectedPlan.priceSuffix && (
                  <div className="text-[11px] text-[#a1a1aa] bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-1.5 font-sans flex items-center gap-2">
                    <span 
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
                      style={{ 
                        backgroundColor: selectedPlan.name.toLowerCase().includes("copilot") || selectedPlan.name.toLowerCase().includes("knowledge") 
                          ? "#c084fc" 
                          : "#00f0ff" 
                      }}
                    />
                    <span>
                      {selectedPlan.priceSuffix.replace(" setup + ", "").replace(" + ", "")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border-t border-white/10 pt-8 flex-grow">
              {/* Left: Long Features list (7 columns on large screens) */}
              <div className="lg:col-span-7 flex flex-col h-full">
                <h4 className="font-display font-bold text-lg text-white mb-5 flex items-center gap-2">
                  <span 
                    className="w-1 h-5 rounded-full"
                    style={{ 
                      backgroundColor: selectedPlan.name.toLowerCase().includes("copilot") || selectedPlan.name.toLowerCase().includes("knowledge") 
                        ? "#8b5cf6" 
                        : "#00f0ff" 
                    }}
                  />
                  {t.pricing.deliverables || "Qué Incluye (Entregables)"}
                </h4>
                <ul className="space-y-4 flex-grow">
                  {selectedPlan.longFeatures && selectedPlan.longFeatures.map((feature: string) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-[#ceced2] leading-relaxed">
                      <Check 
                        size={16} 
                        className="flex-shrink-0 mt-0.5" 
                        style={{ 
                          color: selectedPlan.name.toLowerCase().includes("copilot") || selectedPlan.name.toLowerCase().includes("knowledge") 
                            ? "#a78bfa" 
                            : "#00f0ff" 
                        }} 
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Vertical Timeline "how we do it" (5 columns on large screens) */}
              <div className="lg:col-span-5 flex flex-col h-full border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-8">
                <h4 className="font-display font-bold text-lg text-white mb-5 flex items-center gap-2">
                  <span 
                    className="w-1 h-5 rounded-full"
                    style={{ 
                      backgroundColor: selectedPlan.name.toLowerCase().includes("copilot") || selectedPlan.name.toLowerCase().includes("knowledge") 
                        ? "#8b5cf6" 
                        : "#00f0ff" 
                    }}
                  />
                  {t.pricing.timeline || "Paso a Paso de la Implementación"}
                </h4>
                <div className="relative pl-6 space-y-6 flex-grow">
                  {/* Timeline vertical connector line */}
                  <div 
                    className="absolute left-2.5 top-2 bottom-2 w-[1px]"
                    style={{
                      background: selectedPlan.name.toLowerCase().includes("copilot") || selectedPlan.name.toLowerCase().includes("knowledge")
                        ? "linear-gradient(to bottom, #8b5cf6, rgba(139, 92, 246, 0.1))"
                        : "linear-gradient(to bottom, #00f0ff, rgba(0, 240, 255, 0.1))"
                    }}
                  />
                  
                  {selectedPlan.howWeDoIt && selectedPlan.howWeDoIt.map((stepItem: { step: string, desc: string }, index: number) => (
                    <div key={stepItem.step} className="relative group">
                      {/* Dot */}
                      <span 
                        className="absolute -left-[21.5px] top-1.5 w-3 h-3 rounded-full border-2 transition-all duration-300 group-hover:scale-125"
                        style={{
                          backgroundColor: "#0a0b0f",
                          borderColor: selectedPlan.name.toLowerCase().includes("copilot") || selectedPlan.name.toLowerCase().includes("knowledge")
                            ? "#a78bfa"
                            : "#00f0ff",
                          boxShadow: selectedPlan.name.toLowerCase().includes("copilot") || selectedPlan.name.toLowerCase().includes("knowledge")
                            ? "0 0 8px rgba(139, 92, 246, 0.5)"
                            : "0 0 8px rgba(0, 240, 255, 0.5)",
                        }}
                      />
                      <h5 className="font-display font-semibold text-sm text-white leading-none mb-1.5">
                        {stepItem.step}
                      </h5>
                      <p className="text-xs text-[#9e9e9e] leading-relaxed">
                        {stepItem.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action Area */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button 
                onClick={() => setSelectedPlan(null)}
                className="text-xs font-semibold text-[#9e9e9e] hover:text-white transition-colors duration-200"
              >
                {t.pricing.close || "Cerrar"}
              </button>
              <a
                href={getWhatsAppWithPackage(selectedPlan.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto"
                style={{
                  background: selectedPlan.name.toLowerCase().includes("copilot") || selectedPlan.name.toLowerCase().includes("knowledge")
                    ? "linear-gradient(135deg, #8b5cf6, #6366f1)"
                    : "linear-gradient(135deg, #00f0ff, #0070ff)",
                  color: selectedPlan.name.toLowerCase().includes("copilot") || selectedPlan.name.toLowerCase().includes("knowledge") ? "#fff" : "#000",
                  boxShadow: selectedPlan.name.toLowerCase().includes("copilot") || selectedPlan.name.toLowerCase().includes("knowledge")
                    ? "0 0 25px rgba(139, 92, 246, 0.3)"
                    : "0 0 25px rgba(0, 240, 255, 0.3)"
                }}
              >
                <MessageCircle size={16} />
                {t.pricing.ctaBtn}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Monthly Support Details */}
      {isSupportOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop with extreme blur and dark tint */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsSupportOpen(false)}
          />
          
          {/* Modal Content container */}
          <div 
            className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 transition-all duration-300 border flex flex-col scale-in"
            style={{
              background: "rgba(10, 11, 15, 0.95)",
              borderColor: "rgba(0, 240, 255, 0.3)",
              boxShadow: "0 0 50px rgba(0, 240, 255, 0.15)",
            }}
          >
            {/* Close button */}
            <button 
              onClick={() => setIsSupportOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="mb-6 pr-10">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest font-mono text-[#00f0ff] bg-[#00f0ff]/5 border border-[#00f0ff]/10 rounded-full px-3.5 py-1 inline-block mb-3 shadow-[0_0_10px_rgba(0,240,255,0.1)]">
                Soporte & Hosting 24/7
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white mb-2 leading-tight">
                {(t.pricing as any).supportPopup?.title || "¿Qué incluye el Mantenimiento y Hosting mensual?"}
              </h3>
              <p className="text-[#9e9e9e] text-xs sm:text-sm leading-relaxed">
                {(t.pricing as any).supportPopup?.desc || "Para garantizar que tu agente de IA opere de forma ininterrumpida 24/7 y 100% libre de fallos, el fee mensual cubre:"}
              </p>
            </div>

            {/* Details List */}
            <ul className="space-y-3.5 border-t border-white/10 pt-5 mb-6">
              {((t.pricing as any).supportPopup?.items as string[] || []).map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-[#ceced2] leading-relaxed">
                  <Check 
                    size={15} 
                    className="flex-shrink-0 mt-0.5 text-[#00f0ff]" 
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Action Area */}
            <div className="pt-4 border-t border-white/5 flex justify-end">
              <button 
                onClick={() => setIsSupportOpen(false)}
                className="px-6 py-2.5 rounded-xl text-xs font-semibold text-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #00f0ff, #0070ff)",
                  boxShadow: "0 0 15px rgba(0, 240, 255, 0.2)"
                }}
              >
                {(t.pricing as any).close || "Entendido"}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
  );
}
