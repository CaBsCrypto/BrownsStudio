"use client";

import { useEffect, useState } from "react";
import { RefreshCw, Home, AlertOctagon } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const errorTranslations = {
  es: {
    title: "Anomalía Crítica de Red",
    subtitle: "Falla catastrófica en el núcleo de BrownsOS.",
    description: "Se detectó un error grave en la inicialización del sistema. La interfaz de usuario principal ha colapsado. Este registro diagnóstico ha sido guardado.",
    retry: "Reiniciar núcleo del sistema",
    home: "Reconectar terminal",
    code: "Firma de diagnóstico",
    details: "Volcado de error",
  },
  en: {
    title: "Critical Grid Anomaly",
    subtitle: "Catastrophic failure in BrownsOS core.",
    description: "A severe error was detected during system initialization. The primary user interface has collapsed. This diagnostic log has been secured.",
    retry: "Reboot system core",
    home: "Reconnect terminal",
    code: "Diagnostic signature",
    details: "Error dump",
  },
  pt: {
    title: "Anomalia Crítica de Rede",
    subtitle: "Falha catastrófica no núcleo do BrownsOS.",
    description: "Um erro grave foi detectado na inicialização do sistema. A interface do usuário principal entrou em colapso. Este log de diagnóstico foi armazenado.",
    retry: "Reiniciar núcleo do sistema",
    home: "Reconectar terminal",
    code: "Assinatura de diagnóstico",
    details: "Despejo de erro",
  },
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const [lang, setLang] = useState<"es" | "en" | "pt">("es");

  useEffect(() => {
    // Log the fatal error
    console.error("BrownsOS Critical Fault Diagnostic:", error);

    // Attempt to detect language from URL on client side
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path.startsWith("/en")) {
        setLang("en");
      } else if (path.startsWith("/pt")) {
        setLang("pt");
      }
    }
  }, [error]);

  const t = errorTranslations[lang] || errorTranslations.es;

  return (
    <html lang={lang} className="dark">
      <head>
        <title>CRITICAL ANOMALY // BROWNSOS</title>
      </head>
      <body className="min-h-screen bg-[#050505] text-[#e5e5e5] font-mono flex items-center justify-center px-4 py-12 relative overflow-hidden antialiased">
        {/* CRT Scanline & grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(239,68,68,0.1),rgba(0,0,0,0))]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%),linear-gradient(90deg,rgba(255,0,0,0.08),rgba(0,255,0,0.02),rgba(0,0,255,0.08))] bg-[size:100%_4px,3px_100%]" />

        <div className="w-full max-w-xl relative z-10">
          {/* Intense red glow behind card */}
          <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-red-600/30 to-amber-600/30 blur-2xl opacity-60 animate-pulse" />

          {/* Card */}
          <div className="bg-[#0c0c0c]/95 border-2 border-red-600 rounded-2xl p-8 backdrop-blur-md shadow-2xl relative">
            
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 border-b border-red-600/40 pb-6">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-600 flex items-center justify-center shrink-0 animate-bounce">
                <AlertOctagon className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h1 className="text-red-500 font-extrabold text-xl uppercase tracking-widest">
                  {t.title}
                </h1>
                <p className="text-red-400/70 text-xs uppercase tracking-widest mt-0.5 animate-pulse">
                  {t.subtitle}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 mb-8">
              <p className="text-[#c5c5c5] text-sm leading-relaxed">
                {t.description}
              </p>

              {/* Error specifics */}
              <div className="bg-[#121212] border border-red-600/20 rounded-lg p-4 font-mono text-xs text-[#9e9e9e] space-y-2">
                {error.digest && (
                  <div>
                    <span className="text-red-400 font-semibold uppercase">{t.code}:</span>
                    <div className="bg-[#050505] border border-red-900/30 rounded px-2.5 py-1.5 mt-1 select-all break-all text-[#e5e5e5]">
                      {error.digest}
                    </div>
                  </div>
                )}
                <div>
                  <span className="text-red-400 font-semibold uppercase">{t.details}:</span>
                  <div className="bg-[#050505] border border-red-900/30 rounded px-2.5 py-1.5 mt-1 select-all break-words text-red-400 max-h-24 overflow-y-auto">
                    {error.message || "Unknown system failure"}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => reset()}
                className="flex-1 bg-red-600 hover:bg-red-700 text-black font-extrabold rounded-lg py-3.5 px-4 text-sm transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-red-600/20"
              >
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                <span>{t.retry}</span>
              </button>
              <button
                onClick={() => {
                  window.location.href = `/${lang}`;
                }}
                className="flex-1 bg-[#161616] hover:bg-[#222] text-[#e5e5e5] border border-red-600/30 hover:border-red-600/60 font-semibold rounded-lg py-3.5 px-4 text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Home className="w-4 h-4 text-red-500" />
                <span>{t.home}</span>
              </button>
            </div>
          </div>

          {/* Footer label */}
          <p className="text-center text-red-700 text-xs mt-6 uppercase tracking-widest animate-pulse">
            CORE DEVIATION FATAL PROTOCOL // DESTRUCT-v0.9.1
          </p>
        </div>
      </body>
    </html>
  );
}
