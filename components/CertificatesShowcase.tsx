"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n/LanguageContext";
import { Search, Award, CheckCircle, ShieldAlert, Sparkles } from "lucide-react";

interface Certificate {
  student: string;
  course: string;
  date: string;
  id: string;
}

const DEMO_CERTIFICATES: Record<string, Certificate> = {
  "BS-AI-2026-001": {
    student: "Juan Pérez",
    course: "Formación en Desarrollo de Software & IA",
    date: "12/07/2026",
    id: "BS-AI-2026-001"
  },
  "BS-DEV-2026-042": {
    student: "María Silva",
    course: "Formación en Herramientas de IA y Productividad",
    date: "25/06/2026",
    id: "BS-DEV-2026-042"
  }
};

export default function CertificatesShowcase() {
  const { t } = useLang();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);

  // Safe cast or direct access from translation object
  const fp = (t as any).formacionPage || {
    sections: {
      certificates: {
        title: "Validación de Certificados",
        subtitle: "Verifica la autenticidad de las certificaciones emitidas por Browns Studio.",
        placeholder: "Ingresa el ID del Certificado (ej. BS-AI-2026-001)",
        verifyBtn: "Verificar Autenticidad",
        verifying: "Verificando...",
        notFound: "Certificado no encontrado. Por favor, verifica el código.",
        foundTitle: "Certificación Válida",
        student: "Estudiante",
        course: "Curso / Taller",
        date: "Fecha de Emisión",
        id: "ID del Certificado",
        status: "Estado",
        statusVal: "Verificado y Activo",
        secured: "Protegido por el Registro Criptográfico de Browns Studio"
      }
    }
  };

  const cs = fp.sections.certificates;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setCertificate(null);
    setSearched(false);

    setTimeout(() => {
      const match = DEMO_CERTIFICATES[code.trim().toUpperCase()];
      if (match) {
        setCertificate(match);
      }
      setLoading(false);
      setSearched(true);
    }, 1200);
  };

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e5e5e5] mb-4">
            {cs.title}
          </h2>
          <p className="text-[#9e9e9e] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {cs.subtitle}
          </p>
        </div>

        {/* Input box */}
        <div className="max-w-xl mx-auto mb-12">
          <form onSubmit={handleVerify} className="relative flex gap-3 p-1 rounded-2xl bg-black/40 border border-[#222] focus-within:border-[#00f0ff]/40 transition-colors shadow-2xl backdrop-blur-md">
            <div className="flex-1 flex items-center pl-4 gap-3">
              <Search className="text-[#5a5a5a]" size={20} />
              <input
                type="text"
                placeholder={cs.placeholder}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-transparent border-0 text-[#e5e5e5] placeholder-[#5a5a5a] text-sm focus:outline-none focus:ring-0"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-black flex items-center gap-2 transition-transform duration-300 active:scale-95 disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #00f0ff, #00b0ff)",
                boxShadow: "0 4px 14px rgba(0, 240, 255, 0.2)"
              }}
            >
              {loading ? cs.verifying : cs.verifyBtn}
            </button>
          </form>
        </div>

        {/* Dynamic Display Area */}
        <div className="max-w-2xl mx-auto min-h-[160px]">
          {loading && (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#00f0ff #00f0ff transparent transparent" }} />
              <span className="text-xs text-[#5a5a5a] tracking-widest uppercase">{cs.verifying}</span>
            </div>
          )}

          {!loading && searched && !certificate && (
            <div
              className="flex items-center gap-4 p-6 rounded-2xl bg-red-950/10 border border-red-500/20 text-red-200/90 text-sm max-w-lg mx-auto"
              style={{ backdropFilter: "blur(8px)" }}
            >
              <ShieldAlert size={20} className="text-red-400 flex-shrink-0" />
              <span>{cs.notFound}</span>
            </div>
          )}

          {!loading && certificate && (
            <div
              className="relative rounded-3xl p-8 sm:p-10 border border-[#00f0ff]/30 shadow-[0_0_50px_rgba(0,240,255,0.05)] overflow-hidden transition-all duration-500 animate-fadeIn"
              style={{
                background: "linear-gradient(135deg, rgba(4, 10, 22, 0.9) 0%, rgba(10, 20, 40, 0.7) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Decorative glows */}
              <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full blur-[80px] pointer-events-none bg-[#00f0ff]/20" />
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[80px] pointer-events-none bg-[#9333ea]/15" />
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#1e1e1e] pb-6 mb-6">
                <div className="flex items-center gap-3">
                  <Award size={28} style={{ color: "#00f0ff" }} />
                  <div>
                    <span className="text-[#00f0ff] font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5">
                      <Sparkles size={12} />
                      {cs.foundTitle}
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-[#e5e5e5]">
                      Browns Studio Academic
                    </h3>
                  </div>
                </div>
                
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-green-500/25 bg-green-950/10 text-green-400">
                  <CheckCircle size={12} />
                  {cs.statusVal}
                </span>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm mb-8">
                <div>
                  <span className="text-[#5a5a5a] text-xs uppercase tracking-wider block mb-1">{cs.student}</span>
                  <span className="text-[#e5e5e5] font-semibold text-base">{certificate.student}</span>
                </div>
                <div>
                  <span className="text-[#5a5a5a] text-xs uppercase tracking-wider block mb-1">{cs.course}</span>
                  <span className="text-[#e5e5e5] font-semibold text-base">{certificate.course}</span>
                </div>
                <div>
                  <span className="text-[#5a5a5a] text-xs uppercase tracking-wider block mb-1">{cs.date}</span>
                  <span className="text-[#e5e5e5] font-semibold">{certificate.date}</span>
                </div>
                <div>
                  <span className="text-[#5a5a5a] text-xs uppercase tracking-wider block mb-1">{cs.id}</span>
                  <span className="text-[#e5e5e5] font-mono">{certificate.id}</span>
                </div>
              </div>

              {/* Footer status */}
              <div className="border-t border-[#1e1e1e] pt-6 flex items-center justify-between text-xs text-[#5a5a5a]">
                <span>{cs.secured}</span>
                <span className="font-mono">VERIFIED // SECURE</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
