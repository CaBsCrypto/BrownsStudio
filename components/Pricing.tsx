"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Zap, Globe, Bot, GraduationCap } from "lucide-react";
import { getWhatsAppWithPackage, WHATSAPP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function Pricing() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"web" | "training">("web");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
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
      id="precios"
      className="section-padding"
    >
      {/* Underlight */}
      <div
        className="absolute inset-x-0 top-0 h-96 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(5,169,227,0.04) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest mb-4"
            style={{ border: "1px solid rgba(71,196,255,0.2)", background: "rgba(71,196,255,0.05)", color: "#47c4ff" }}
          >
            {t.pricing.eyebrow}
          </div>
          <h2
            className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e5e5e5] mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t.pricing.title}
          </h2>
          <p className="reveal reveal-delay-2 text-[#9e9e9e] text-lg max-w-xl mx-auto">
            {t.pricing.sub}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="reveal reveal-delay-2 flex items-center justify-center mb-10">
          <div
            className="flex p-1 rounded-xl"
            style={{ background: "#0e0e0e", border: "1px solid rgba(72,72,72,0.2)" }}
          >
            <button
              onClick={() => setActiveTab("web")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300"
              style={
                activeTab === "web"
                  ? { background: "linear-gradient(135deg, #c6c6c7, #939eb5)", color: "#000", boxShadow: "0 0 20px rgba(198,198,199,0.15)" }
                  : { color: "#5a5a5a" }
              }
            >
              <Globe size={15} />
              {t.pricing.tabWeb}
            </button>

            <button
              onClick={() => setActiveTab("training")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300"
              style={
                activeTab === "training"
                  ? { background: "rgba(168,85,247,0.15)", color: "#c084fc", boxShadow: "0 0 20px rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)" }
                  : { color: "#5a5a5a" }
              }
            >
              <GraduationCap size={15} />
              {t.pricing.tabTraining}
            </button>
          </div>
        </div>

        {/* Web packages */}
        {activeTab === "web" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {t.pricing.plans.map((plan: { name: string; desc: string; price: string; features: readonly string[]; popular?: boolean }) => (
              <div
                key={plan.name}
                className="relative rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 flex flex-col h-full"
                style={{
                  background: plan.popular ? "rgba(20,25,22,0.8)" : "#0c0d0c",
                  border: plan.popular
                    ? "1px solid rgba(0,255,159,0.3)"
                    : "1px solid rgba(0,255,159,0.1)",
                  ...(plan.popular ? { marginTop: "-1rem", marginBottom: "1rem", boxShadow: "0 0 40px rgba(0,255,159,0.08)" } : {}),
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold text-black"
                    style={{ background: "linear-gradient(135deg, #00ff9f, #00d1ff)", boxShadow: "0 0 15px rgba(0,255,159,0.4)" }}
                  >
                    <Zap size={11} fill="currentColor" />
                    {t.pricing.popular}
                  </div>
                )}

                <div className="mb-6 h-36 flex flex-col">
                  <h3
                    className="font-display font-bold text-xl sm:text-2xl text-[#e5e5e5] mb-1 line-clamp-2"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-[#5a5a5a] text-xs mb-auto">{plan.desc}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span 
                      className={`font-display font-bold ${
                        plan.price.length > 8 ? 'text-2xl' : 'text-3xl sm:text-4xl'
                      }`}
                      style={{ color: "#00ff9f", textShadow: "0 0 15px rgba(0,255,159,0.3)" }}
                    >
                      {plan.price}
                    </span>
                    {!plan.price.toLowerCase().includes('talk') && !plan.price.toLowerCase().includes('convers') && (
                      <span className="text-[#5a5a5a] text-xs">USD</span>
                    )}
                  </div>
                </div>

                <div className="h-px mb-5" style={{ background: "rgba(72,72,72,0.15)" }} />

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature: string) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-[#9e9e9e]">
                      <Check size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#00ff9f" }} />
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
                      ? { background: "linear-gradient(135deg, #00ff9f, #00d1ff)", color: "#000", boxShadow: "0 0 20px rgba(0,255,159,0.2)" }
                      : { border: "1px solid rgba(0,255,159,0.3)", color: "#00ff9f" }
                  }
                  onMouseEnter={(e) => {
                    if (!plan.popular) {
                      (e.currentTarget as HTMLElement).style.background = "rgba(0,255,159,0.05)";
                      (e.currentTarget as HTMLElement).style.borderColor = "#00ff9f";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!plan.popular) {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,159,0.3)";
                    }
                  }}
                >
                  {t.pricing.ctaBtn} {plan.name}
                </a>
              </div>
            ))}
          </div>
        )}



        {/* Training plans */}
        {activeTab === "training" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {(t.pricing as any).trainingPlans.map((plan: { name: string; desc: string; price: string; priceSuffix?: string; features: readonly string[]; popular?: boolean }) => (
              <div
                key={plan.name}
                className="relative rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: plan.popular ? "rgba(20,10,35,0.85)" : "rgba(14,8,25,0.70)",
                  backdropFilter: "none",
                  border: plan.popular ? "1px solid rgba(168,85,247,0.25)" : "1px solid rgba(168,85,247,0.10)",
                  ...(plan.popular ? { boxShadow: "0 0 40px rgba(168,85,247,0.08)" } : {}),
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.35)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = plan.popular ? "rgba(168,85,247,0.25)" : "rgba(168,85,247,0.10)"; }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)", color: "#fff" }}
                  >
                    <Zap size={11} fill="currentColor" />
                    {t.pricing.popular}
                  </div>
                )}

                <div className="mb-5">
                  <h3 className="font-display font-bold text-xl text-[#e5e5e5] mb-0.5" style={{ letterSpacing: "-0.02em" }}>
                    {plan.name}
                  </h3>
                  <p className="text-[#5a5a5a] text-sm mb-4">{plan.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-bold text-3xl" style={{ color: "#c084fc" }}>{plan.price}</span>
                    {plan.priceSuffix && <span className="text-[#5a5a5a] text-sm">{plan.priceSuffix}</span>}
                  </div>
                </div>

                <div className="h-px mb-5" style={{ background: "rgba(168,85,247,0.12)" }} />

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature: string) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-[#9e9e9e]">
                      <Check size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#c084fc" }} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={getWhatsAppWithPackage(plan.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                  style={{ border: "1px solid rgba(168,85,247,0.25)", color: "#c084fc" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(168,85,247,0.12)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.45)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.25)"; }}
                >
                  {t.pricing.ctaBtn} — {plan.name}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Training note callout */}
        {activeTab === "training" && (t.pricing as any).trainingNote && (
          <div className="reveal mt-12 max-w-4xl mx-auto">
            <div 
              className="rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
              style={{ 
                background: "rgba(168,85,247,0.05)", 
                border: "1px solid rgba(168,85,247,0.15)",
                boxShadow: "0 0 30px rgba(168,85,247,0.03)"
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
                style={{ background: "rgba(168,85,247,0.15)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.2)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(168,85,247,0.25)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(168,85,247,0.15)"; }}
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
            className="text-[#9e9e9e] hover:text-[#47c4ff] transition-colors duration-200"
            dangerouslySetInnerHTML={{ __html: t.pricing.combo }}
          />
        </p>
      </div>
    </section>
  );
}
