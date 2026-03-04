"use client";

import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Pulse rings */}
      <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping" />
      <span className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" style={{ animationDelay: "0.3s" }} />

      {/* Button */}
      <div className="relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-110">
        <MessageCircle size={26} className="text-white" fill="white" />
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        <div className="bg-bg-secondary border border-white/10 text-text-primary text-xs font-medium px-3 py-1.5 rounded-lg shadow-card">
          ¡Escríbenos por WhatsApp!
        </div>
        <div className="absolute bottom-0 right-5 translate-y-1/2 w-2 h-2 rotate-45 bg-bg-secondary border-r border-b border-white/10" />
      </div>
    </a>
  );
}
