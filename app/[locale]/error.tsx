"use client";

import { useEffect } from "react";
import { useLang } from "@/lib/i18n/LanguageContext";
import { RefreshCw, Home, AlertOctagon } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const errorTranslations = {
  es: {
    title: "Error del Sistema",
    subtitle: "Ocurrió una anomalía en el subsistema BrownsOS.",
    description: "La operación falló debido a un error inesperado. Hemos registrado este incidente en la consola de diagnóstico para su revisión.",
    retry: "Reiniciar módulo",
    home: "Consola de inicio",
    code: "Identificador de diagnóstico",
    details: "Detalles del error",
  },
  en: {
    title: "System Error",
    subtitle: "An anomaly occurred in the BrownsOS subsystem.",
    description: "The operation failed due to an unexpected error. We have logged this incident to the diagnostics console for review.",
    retry: "Reboot module",
    home: "Home console",
    code: "Diagnostic identifier",
    details: "Error details",
  },
  pt: {
    title: "Erro do Sistema",
    subtitle: "Ocorreu uma anomalia no subsistema BrownsOS.",
    description: "A operação falhou devido a um erro inesperado. Registramos este incidente no console de diagnóstico para revisão.",
    retry: "Reiniciar módulo",
    home: "Página inicial",
    code: "Identificador de diagnóstico",
    details: "Detalhes do erro",
  },
};

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  const { lang } = useLang();
  const t = errorTranslations[lang as keyof typeof errorTranslations] || errorTranslations.es;

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("BrownsOS Diagnostic Log:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-12 relative overflow-hidden font-mono">
      {/* Sci-fi background grids and glowing effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(71,196,255,0.08),rgba(0,0,0,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />

      <div className="w-full max-w-xl relative z-10">
        {/* Glow behind card */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-500/20 to-[#47c4ff]/20 blur-xl opacity-50" />

        {/* Card */}
        <div className="bg-[#131313]/90 border border-red-500/30 rounded-2xl p-8 backdrop-blur-md shadow-2xl relative">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-6 border-b border-[#484848]/30 pb-6">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0 animate-pulse">
              <AlertOctagon className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h1 className="text-red-400 font-bold text-xl uppercase tracking-wider">
                {t.title}
              </h1>
              <p className="text-[#9e9e9e] text-xs uppercase tracking-widest mt-0.5">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4 mb-8">
            <p className="text-[#e5e5e5] text-sm leading-relaxed">
              {t.description}
            </p>

            {/* Error specifics */}
            <div className="bg-[#1c1c1c] border border-[#484848]/30 rounded-lg p-4 font-mono text-xs text-[#9e9e9e] space-y-2">
              {error.digest && (
                <div>
                  <span className="text-[#47c4ff] font-semibold">{t.code}:</span>
                  <div className="bg-[#0f0f0f] border border-[#2d2d2d] rounded px-2.5 py-1.5 mt-1 select-all break-all text-[#e5e5e5]">
                    {error.digest}
                  </div>
                </div>
              )}
              <div>
                <span className="text-[#47c4ff] font-semibold">{t.details}:</span>
                <div className="bg-[#0f0f0f] border border-[#2d2d2d] rounded px-2.5 py-1.5 mt-1 select-all break-words text-[#ff6b6b] max-h-24 overflow-y-auto">
                  {error.message || "Unknown anomaly"}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => reset()}
              className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 hover:border-red-500/50 font-semibold rounded-lg py-3 px-4 text-sm transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              <span>{t.retry}</span>
            </button>
            <button
              onClick={() => {
                window.location.href = `/${lang}`;
              }}
              className="flex-1 bg-[#1c1c1c] hover:bg-[#2a2a2a] text-[#e5e5e5] border border-[#484848]/40 hover:border-[#47c4ff]/50 font-semibold rounded-lg py-3 px-4 text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4 text-[#47c4ff]" />
              <span>{t.home}</span>
            </button>
          </div>
        </div>

        {/* Footer label */}
        <p className="text-center text-[#484848] text-xs mt-6 uppercase tracking-widest">
          SYSTEM FAULT DEVIATION PROTOCOL // BROWNSOS-v1.0.0
        </p>
      </div>
    </div>
  );
}
