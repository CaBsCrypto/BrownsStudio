"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Zap, Globe, Bot } from "lucide-react";
import { getWhatsAppWithPackage, WHATSAPP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function Pricing() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"web" | "ia">("web");

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
              onClick={() => setActiveTab("ia")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300"
              style={
                activeTab === "ia"
                  ? { background: "rgba(71,196,255,0.15)", color: "#47c4ff", boxShadow: "0 0 20px rgba(71,196,255,0.1)", border: "1px solid rgba(71,196,255,0.2)" }
                  : { color: "#5a5a5a" }
              }
            >
              <Bot size={15} />
              {t.pricing.tabAI}
            </button>
          </div>
        </div>

        {/* Web packages */}
        {activeTab === "web" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {t.pricing.plans.map((plan: { name: string; desc: string; price: string; features: readonly string[]; popular?: boolean }) => (
              <div
                key={plan.name}
                className="relative rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: plan.popular ? "rgba(25,25,25,0.8)" : "rgba(19,19,19,0.6)",
                  backdropFilter: "blur(20px)",
                  border: plan.popular
                    ? "1px solid rgba(198,198,199,0.2)"
                    : "1px solid rgba(72,72,72,0.12)",
                  ...(plan.popular ? { marginTop: "-1rem", marginBottom: "1rem", boxShadow: "0 0 40px rgba(198,198,199,0.05)" } : {}),
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold text-black"
                    style={{ background: "linear-gradient(135deg, #c6c6c7, #939eb5)" }}
                  >
                    <Zap size={11} fill="currentColor" />
                    {t.pricing.popular}
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    className="font-display font-bold text-2xl text-[#e5e5e5] mb-0.5"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-[#5a5a5a] text-sm mb-4">{plan.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-bold text-4xl text-gradient-gold">
                      {plan.price}
                    </span>
                    <span className="text-[#5a5a5a] text-sm">USD</span>
                  </div>
                </div>

                <div className="h-px mb-5" style={{ background: "rgba(72,72,72,0.15)" }} />

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature: string) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-[#9e9e9e]">
                      <Check size={15} className="text-[#c6c6c7] flex-shrink-0 mt-0.5" />
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
                      ? { background: "linear-gradient(135deg, #c6c6c7, #939eb5)", color: "#000" }
                      : { border: "1px solid rgba(198,198,199,0.2)", color: "#9e9e9e" }
                  }
                  onMouseEnter={(e) => {
                    if (!plan.popular) {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(198,198,199,0.4)";
                      (e.currentTarget as HTMLElement).style.color = "#e5e5e5";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!plan.popular) {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(198,198,199,0.2)";
                      (e.currentTarget as HTMLElement).style.color = "#9e9e9e";
                    }
                  }}
                >
                  {t.pricing.ctaBtn} {plan.name}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* IA services */}
        {activeTab === "ia" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {t.pricing.aiPlans.map((plan: { name: string; desc: string; price: string; priceSuffix?: string; features: readonly string[] }) => (
              <div
                key={plan.name}
                className="relative rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: "rgba(10,15,30,0.7)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(71,196,255,0.1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(71,196,255,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(71,196,255,0.1)";
                }}
              >
                {/* AI corner orb */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-bl-full pointer-events-none"
                  style={{ background: "radial-gradient(circle at top right, rgba(71,196,255,0.06) 0%, transparent 70%)" }}
                />

                <div className="mb-6">
                  <h3
                    className="font-display font-bold text-2xl text-[#e5e5e5] mb-0.5"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-[#5a5a5a] text-sm mb-4">{plan.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-bold text-4xl text-gradient-tertiary">
                      {plan.price}
                    </span>
                    <span className="text-[#5a5a5a] text-sm">
                      {plan.priceSuffix ?? "USD"}
                    </span>
                  </div>
                </div>

                <div className="h-px mb-5" style={{ background: "rgba(71,196,255,0.1)" }} />

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature: string) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-[#9e9e9e]">
                      <Check size={15} className="text-[#47c4ff] flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={getWhatsAppWithPackage(plan.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                  style={{ border: "1px solid rgba(71,196,255,0.2)", color: "#47c4ff" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(71,196,255,0.1)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(71,196,255,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(71,196,255,0.2)";
                  }}
                >
                  {t.pricing.ctaBtn} {plan.name}
                </a>
              </div>
            ))}
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
