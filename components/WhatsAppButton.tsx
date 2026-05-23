"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, ExternalLink, ChevronRight } from "lucide-react";
import { WHATSAPP_URL, getWhatsAppLink } from "@/lib/config";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function WhatsAppButton() {
  const { t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" ref={containerRef}>
      {/* Menu Options — Glass container */}
      <div
        className={`mb-4 w-72 rounded-3xl overflow-hidden transition-all duration-500 origin-bottom-right ${
          isOpen 
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
        }`}
        style={{
          background: "rgba(10, 15, 30, 0.9)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(0, 240, 255, 0.15)",
          boxShadow: "0 24px 48px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 240, 255, 0.05)",
        }}
      >
        <div className="p-2 space-y-1">
          <div className="px-4 py-3 mb-1 border-b border-white/5">
            <p className="text-[#9e9e9e] text-[10px] font-bold uppercase tracking-widest">
              {t.faq.cta.split("?")[0]}?
            </p>
            <p className="text-[#e5e5e5] text-xs font-medium">{t.cta.note.split(".")[0]}.</p>
          </div>
          
          {t.cta.contactOptions.map((opt, i) => (
            <a
              key={i}
              href={getWhatsAppLink(opt.msg)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition-all duration-300"
            >
              <span className="text-sm text-[#d0d0d0] group-hover:text-[#47c4ff] transition-colors">
                {opt.label}
              </span>
              <ChevronRight size={14} className="text-[#5a5a5a] group-hover:text-[#47c4ff] group-hover:translate-x-0.5 transition-all" />
            </a>
          ))}
        </div>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact options"
        className="relative group focus:outline-none"
      >
        {/* Pulse rings (only when closed) */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping" />
            <span className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" style={{ animationDelay: "0.3s" }} />
          </>
        )}

        {/* The Button Sphere */}
        <div 
          className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-105 ${
            isOpen ? "bg-[#191919] rotate-90" : "bg-green-500 hover:bg-green-400"
          }`}
          style={isOpen ? { border: "1px solid rgba(0, 240, 255, 0.3)" } : {}}
        >
          {isOpen ? (
            <X size={28} className="text-[#47c4ff]" />
          ) : (
            <MessageCircle size={30} className="text-white" fill="white" />
          )}
        </div>

        {/* Label Tooltip (only when closed) */}
        {!isOpen && (
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden sm:block">
            <div 
              className="px-4 py-2 rounded-xl text-sm font-medium text-[#e5e5e5]"
              style={{ 
                background: "rgba(10, 15, 30, 0.8)", 
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
            >
              {t.cta.whatsapp}
            </div>
          </div>
        )}
      </button>
    </div>
  );
}
