"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, PenTool, Code2, Rocket, X } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageContext";

const stepIcons = [MessageSquare, PenTool, Code2, Rocket];
const stepColors = ["#00f0ff", "#ff003c", "#939eb5", "#10b981"];

export default function Proceso() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

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

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedStep(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proceso"
      className="section-padding relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#00f0ff08_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest mb-4"
            style={{ border: "1px solid rgba(198,198,199,0.15)", background: "rgba(198,198,199,0.04)", color: "#9e9e9e" }}
          >
            {t.process.eyebrow}
          </div>
          <h2
            className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e5e5e5] mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t.process.title}
          </h2>
        </div>

        {/* Steps — horizontal on desktop, roadmap-style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.process.steps.map((step: { num: string; title: string; desc: string; details: string }, i: number) => {
            const Icon = stepIcons[i];
            const color = stepColors[i];
            return (
              <div
                key={step.num}
                onClick={() => setSelectedStep(i)}
                className={`reveal reveal-delay-${i + 1} group relative p-8 rounded-3xl transition-all duration-500 cursor-pointer`}
                style={{
                  background: "rgba(25, 25, 25, 0.4)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(72,72,72,0.15)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${color}40`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 30px -10px ${color}15`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(72,72,72,0.15)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Big number — outline style */}
                <span
                  className="absolute top-6 right-6 font-display text-6xl font-black select-none opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ 
                    color: "transparent", 
                    WebkitTextStroke: `1px ${color}`,
                  }}
                >
                  {step.num}
                </span>

                {/* Icon wrapper */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                  style={{ 
                    background: `${color}10`, 
                    border: `1px solid ${color}30`,
                    boxShadow: `inset 0 0 15px ${color}10`
                  }}
                >
                  <Icon size={24} style={{ color }} />
                </div>

                <h3
                  className="font-display font-bold text-xl text-[#e5e5e5] mb-3 group-hover:text-white transition-colors duration-300"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {step.title}
                </h3>
                <p className="text-[#9a9a9a] text-sm leading-relaxed group-hover:text-[#c5c5c5] transition-colors duration-300 mb-4">
                  {step.desc}
                </p>

                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors">
                  <span>{t.process.learnMore}</span>
                  <div className="w-1 h-1 rounded-full bg-current" />
                </div>

                {/* Progress dot — horizontal connector visual */}
                <div 
                  className="mt-6 flex items-center gap-2"
                  aria-hidden="true"
                >
                  <div className="h-1 w-8 rounded-full" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                </div>

                {/* Vertical timeline line for mobile/tablet */}
                <div
                  className="absolute top-0 left-8 w-px h-6 -translate-y-full lg:hidden"
                  style={{ background: i === 0 ? "transparent" : "rgba(72,72,72,0.3)" }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Pop-up Modal */}
      {selectedStep !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedStep(null)}
          />
          <div 
            className="relative w-full max-w-lg glass rounded-3xl p-8 md:p-12 border-ghost animate-in fade-in zoom-in duration-300"
            style={{ 
              borderColor: `${stepColors[selectedStep]}30`,
              boxShadow: `0 0 50px ${stepColors[selectedStep]}15`
            }}
          >
            <button 
              onClick={() => setSelectedStep(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
              style={{ background: `${stepColors[selectedStep]}15`, border: `1px solid ${stepColors[selectedStep]}30` }}
            >
              {(() => {
                const Icon = stepIcons[selectedStep];
                return <Icon size={32} style={{ color: stepColors[selectedStep] }} />;
              })()}
            </div>

            <div className="mb-2 flex items-center gap-3">
              <span className="text-sm font-mono font-bold" style={{ color: stepColors[selectedStep] }}>{t.process.step} {t.process.steps[selectedStep].num}</span>
              <div className="h-px flex-grow bg-white/10" />
            </div>

            <h3 className="font-display font-bold text-3xl text-white mb-6">
              {t.process.steps[selectedStep].title}
            </h3>
            
            <p className="text-[#e5e5e5] text-lg leading-relaxed mb-8">
              {t.process.steps[selectedStep].details}
            </p>

            <button 
              onClick={() => setSelectedStep(null)}
              className="w-full py-4 rounded-2xl font-bold text-black transition-transform active:scale-95"
              style={{ background: `linear-gradient(135deg, ${stepColors[selectedStep]}, ${stepColors[selectedStep]}dd)` }}
            >
              {t.process.understood}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

