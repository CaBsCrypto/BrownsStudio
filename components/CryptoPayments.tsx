"use client";

import { useEffect, useRef } from "react";
import { Coins, Zap, ShieldCheck, Globe } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageContext";

const icons = [Coins, Zap, ShieldCheck, Globe];

export default function CryptoPayments() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="crypto"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-30"
        style={{ 
          background: "radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.05) 0%, transparent 70%)" 
        }} 
      />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="glass rounded-[2.5rem] p-8 md:p-16 border-ghost relative overflow-hidden">
          
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text side */}
            <div>
              <div
                className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest mb-6"
                style={{ border: "1px solid rgba(0, 240, 255, 0.2)", background: "rgba(0, 240, 255, 0.05)", color: "#00f0ff" }}
              >
                <Zap size={12} />
                {t.crypto.eyebrow}
              </div>
              <h2 className="reveal reveal-delay-1 font-display text-4xl sm:text-5xl font-bold text-[#e5e5e5] mb-6 leading-tight">
                {t.crypto.title}
              </h2>
              <p className="reveal reveal-delay-2 text-[#9a9a9a] text-lg mb-10 max-w-lg">
                {t.crypto.sub}
              </p>

              <div className="reveal reveal-delay-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {t.crypto.features.map((feature: { title: string; desc: string }, i: number) => {
                  const Icon = icons[i];
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#1f1f1f] border border-[#333] flex items-center justify-center text-[#00f0ff]">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-[#e5e5e5] font-semibold text-sm mb-1">{feature.title}</h4>
                        <p className="text-[#5a5a5a] text-xs">{feature.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Visual side — Crypto Logos display */}
            <div className="reveal reveal-delay-4 relative flex justify-center lg:justify-end">
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                
                {/* Floating elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                   {/* Main coin central */}
                   <div className="w-32 h-32 md:w-48 md:h-48 rounded-full glass border-ghost flex items-center justify-center animate-[orb-pulse_4s_infinite] shadow-[0_0_50px_rgba(0,240,255,0.15)]">
                      <div className="text-5xl md:text-7xl">₿</div>
                   </div>
                </div>

                {/* Satellite coins */}
                <div className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 rounded-full glass border-ghost flex items-center justify-center animate-[orb-spin-1_20s_linear_infinite] shadow-[0_0_30px_rgba(38,161,123,0.1)]">
                   <span className="text-xl md:text-2xl font-bold text-[#26a17b]">₮</span>
                </div>
                
                <div className="absolute bottom-10 right-0 w-16 h-16 md:w-24 md:h-24 rounded-full glass border-ghost flex items-center justify-center animate-[orb-spin-2_15s_linear_infinite] shadow-[0_0_30px_rgba(39,117,202,0.1)]">
                   <span className="text-xl md:text-2xl font-bold text-[#2775ca]">$</span>
                </div>

                <div className="absolute top-1/2 right-0 w-12 h-12 md:w-20 md:h-20 rounded-full glass border-ghost flex items-center justify-center animate-[orb-pulse_3s_infinite_1s] shadow-[0_0_20px_rgba(98,126,234,0.1)]">
                   <span className="text-lg md:text-xl font-bold text-[#627eea]">Ξ</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
