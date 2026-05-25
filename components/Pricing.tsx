"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Zap, Globe, GraduationCap, MessageCircle } from "lucide-react";
import { getWhatsAppWithPackage, WHATSAPP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function Pricing() {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'web' | 'training'>('web');
  const [isRevealed, setIsRevealed] = useState(false);

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
                const isOnboarding = plan.name.toLowerCase().includes("onboarding") || plan.name.toLowerCase().includes("inducción") || plan.name.toLowerCase().includes("induc");
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
                          <div className="text-[11px] text-[#a1a1aa] bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2 font-sans flex items-start gap-2 w-full leading-normal">
                            <span 
                              className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 animate-pulse"
                              style={{ backgroundColor: isOnboarding ? "#c084fc" : "#00f0ff" }}
                            ></span>
                            <span className="flex-grow">
                              {plan.priceSuffix.replace(" setup + ", "").replace(" + ", "")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((feature: string) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-[#9e9e9e]">
                          <Check size={15} className="flex-shrink-0 mt-0.5" style={{ color: isOnboarding ? "#a78bfa" : "#00f0ff" }} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {isOnboarding && (
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
                      className="block w-full text-center py-3 rounded-xl text-sm font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
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
      </div>
    </section>
  );
}
