"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Zap, Globe, GraduationCap, MessageCircle } from "lucide-react";
import { getWhatsAppWithPackage, WHATSAPP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function Pricing() {
  const { t } = useLang();
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
      style={{ background: "rgba(0,0,0,0.3)" }}
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
                    color: activeTab === tab.id ? "#00f0ff" : "#5a5a5a",
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
              {((activeTab === 'web' ? (t.pricing as any).plans : (t.pricing as any).trainingPlans) as any[]).map((plan) => (
            <div
              key={plan.name}
              className={`reveal relative rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 flex flex-col h-full ${isRevealed ? 'visible' : ''}`}
              style={{
                background: "#0c0d0c",
                border: plan.popular
                  ? "1px solid rgba(0,240,255,0.3)"
                  : "1px solid rgba(0,240,255,0.1)",
                ...(plan.popular ? { marginTop: "-1rem", marginBottom: "1rem", boxShadow: "0 0 40px rgba(0,240,255,0.08)" } : {}),
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

              <div className="mb-6">
                <h3 className="font-display font-bold text-xl text-[#e5e5e5] mb-1">{plan.name}</h3>
                <p className="text-[#5a5a5a] text-xs mb-auto h-8 line-clamp-2">{plan.desc}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span 
                    className={`font-display font-bold ${
                      plan.price.length > 8 ? 'text-2xl' : 'text-3xl sm:text-4xl'
                    }`}
                    style={{ color: "#00f0ff", textShadow: "0 0 15px rgba(0,240,255,0.3)" }}
                  >
                    {plan.price}
                  </span>
                  {plan.priceSuffix ? (
                    <span className="text-[#5a5a5a] text-xs">{plan.priceSuffix}</span>
                  ) : (
                    !plan.price.toLowerCase().includes('talk') && !plan.price.toLowerCase().includes('convers') && (
                      <span className="text-[#5a5a5a] text-xs">USD</span>
                    )
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature: string) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-[#9e9e9e]">
                    <Check size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#00f0ff" }} />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={getWhatsAppWithPackage(plan.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                style={
                  plan.popular
                    ? { background: "linear-gradient(135deg, #00f0ff, #0070ff)", color: "#000", boxShadow: "0 0 20px rgba(0,240,255,0.2)" }
                    : { border: "1px solid rgba(0,240,255,0.3)", color: "#00f0ff" }
                }
                onMouseEnter={(e) => {
                  if (!plan.popular) {
                    (e.currentTarget as HTMLElement).style.background = "rgba(0,240,255,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!plan.popular) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }
                }}
              >
                {t.pricing.ctaBtn} {plan.name}
              </a>
            </div>
          ))}
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
        <p className="reveal text-center text-[#5a5a5a] text-sm mt-8">
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
