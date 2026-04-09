"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function FAQ() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
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
      id="faq"
      className="section-padding"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest mb-4"
            style={{ border: "1px solid rgba(71,196,255,0.2)", background: "rgba(71,196,255,0.05)", color: "#47c4ff" }}
          >
            {t.faq.eyebrow}
          </div>
          <h2
            className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e5e5e5] mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t.faq.title}
          </h2>
          <p className="reveal reveal-delay-2 text-[#9e9e9e] text-lg">
            {t.faq.cta}
          </p>
        </div>

        {/* Accordion — no divider lines, tonal shift only */}
        <div className="space-y-2">
          {t.faq.items.map((item: { q: string; a: string }, i: number) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}>
                <div
                  className="rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    background: isOpen ? "#191919" : "#131313",
                    border: isOpen
                      ? "1px solid rgba(71,196,255,0.15)"
                      : "1px solid rgba(72,72,72,0.12)",
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="font-medium text-sm sm:text-base transition-colors duration-200"
                      style={{ color: isOpen ? "#e5e5e5" : "#9e9e9e" }}
                    >
                      {item.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className="flex-shrink-0 transition-transform duration-300"
                      style={{
                        color: isOpen ? "#47c4ff" : "#484848",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: isOpen ? "384px" : "0", opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="px-6 pb-5">
                      {/* Tonal divider — no border, just a subtle bg line */}
                      <div className="h-px mb-4" style={{ background: "rgba(72,72,72,0.15)" }} />
                      <p className="text-[#9e9e9e] text-sm leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
