"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n/LanguageContext";
import { getWhatsAppLink } from "@/lib/config";
import { BrainCircuit, Loader2, Sparkles, ArrowRight, CheckCircle2, X } from "lucide-react";

interface WorkAdaptabilityProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkAdaptability({ isOpen, onClose }: WorkAdaptabilityProps) {
  const { t, lang } = useLang();
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<{
    bottlenecks: string[];
    course: string;
    agent: string;
  } | null>(null);

  if (!isOpen) return null;

  // Safe cast or direct access from translations
  const fp = (t as any).formacionPage || {};
  const ad = fp.adapt || {
    title: "Adáptate en tu Trabajo con IA",
    subtitle: "Cuéntanos qué haces a diario en tu rol y descubramos qué cursos de IA y soluciones a medida pueden ahorrarte horas de trabajo manual.",
    placeholder: "Describe tu puesto o tareas diarias (ej. 'Soy abogado, redacto contratos y respondo consultas de clientes por WhatsApp')...",
    btn: "Analizar mi Rol con IA",
    loading: "Analizando tus tareas diarias...",
    titleResult: "Tu Plan de Automatización con IA",
    bottleneck: "Cuellos de botella identificados:",
    recommendedCourse: "Curso Recomendado:",
    customAgent: "Solución a Medida Recomendada:",
    whatsappCta: "Conversar Plan por WhatsApp"
  };

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setResult(null);
    setLoadingStep(0);

    const steps = [
      () => setLoadingStep(1),
      () => setLoadingStep(2),
      () => setLoadingStep(3),
    ];

    steps.forEach((stepFn, idx) => {
      setTimeout(stepFn, (idx + 1) * 600);
    });

    setTimeout(() => {
      const lower = inputText.toLowerCase();
      let bottlenecks = [
        lang === "en" ? "Manual document parsing & drafting" : "Redacción y análisis de documentos manual",
        lang === "en" ? "High time spent in client follow-ups" : "Alto consumo de tiempo en seguimiento de leads"
      ];
      let course = lang === "en" ? "AI Tools & Enterprise Productivity" : "Formación en Herramientas de IA y Productividad";
      let agent = lang === "en" ? "Conversational Lead Qualification Agent" : "Agente Conversacional de Calificación y Cierre";

      if (lower.includes("abogado") || lower.includes("ley") || lower.includes("contrato") || lower.includes("legal") || lower.includes("law")) {
        bottlenecks = [
          lang === "en" ? "Manual contract structuring & legal template searching" : "Estructuración manual de contratos y revisión de jurisprudencia",
          lang === "en" ? "Repeating answers to client inquiries on WhatsApp/email" : "Respuestas repetitivas a consultas iniciales de clientes"
        ];
        course = lang === "en" ? "AI Tools & Enterprise Productivity" : "Formación en Herramientas de IA y Productividad";
        agent = lang === "en" ? "Legal Copilot & Autonomous Intake Agent" : "Copiloto Legal Interno y Agente de Admisión de Casos";
      } else if (lower.includes("diseño") || lower.includes("figma") || lower.includes("designer") || lower.includes("web") || lower.includes("ux")) {
        bottlenecks = [
          lang === "en" ? "Time spent generating design variations & assets" : "Generación manual de variaciones de diseño y assets gráficos",
          lang === "en" ? "Slow low-fidelity interactive prototyping" : "Prototipado rápido de baja fidelidad para validación del cliente"
        ];
        course = lang === "en" ? "AI for Designers & UX/UI Prototyping" : "IA para Diseñadores y Prototipado UX/UI";
        agent = lang === "en" ? "Generative Asset pipeline & UI Agent" : "Pipeline Agéntico de Generación Visual y Assets";
      } else if (lower.includes("venta") || lower.includes("vendedor") || lower.includes("sales") || lower.includes("lead") || lower.includes("crm")) {
        bottlenecks = [
          lang === "en" ? "Outbound email scheduling & lead sourcing latency" : "Prospección en frío lenta y latencia en responder a leads",
          lang === "en" ? "Manually qualifying prospect profiles into CRM" : "Calificación manual e ingreso de datos a HubSpot/Salesforce"
        ];
        course = lang === "en" ? "AI for B2B Sales & Outbound Prospections" : "IA para Ventas y Prospección B2B";
        agent = lang === "en" ? "WhatsApp Lead Closer & HubSpot CRM Sync Agent" : "Closer de Ventas en WhatsApp con Sincronización a CRM";
      } else if (lower.includes("marketing") || lower.includes("seo") || lower.includes("redes") || lower.includes("content") || lower.includes("creador")) {
        bottlenecks = [
          lang === "en" ? "High cost of producing programmatic SEO copy" : "Alto costo de producción de copys optimizados para buscadores",
          lang === "en" ? "Repetitive script writing and reel storyboarding" : "Redacción reiterativa de guiones y esquemas para reels"
        ];
        course = lang === "en" ? "AI for Marketing & Programmatic SEO" : "IA para Marketing & SEO Programático";
        agent = lang === "en" ? "Autonomous programmatic content generation pipeline" : "Pipeline Autónomo de Contenido Programático Redactado";
      } else if (lower.includes("pyme") || lower.includes("emprendedor") || lower.includes("negocio") || lower.includes("local")) {
        bottlenecks = [
          lang === "en" ? "Digitizing customer queries and service slots manually" : "Digitalización de consultas de clientes y control de agenda manual",
          lang === "en" ? "Zero automated marketing pipelines due to low budget" : "Falta de embudos de marketing autónomos por falta de presupuesto"
        ];
        course = lang === "en" ? "AI for Entrepreneurs & SMEs" : "IA para Emprendedores y PYMEs";
        agent = lang === "en" ? "Done-for-you Local Service Agent" : "Agente de Agenda Local y Servicio al Cliente Autónomo";
      } else if (lower.includes("programador") || lower.includes("dev") || lower.includes("codigo") || lower.includes("code") || lower.includes("api")) {
        bottlenecks = [
          lang === "en" ? "Writing boilerplate connection codes and database migrations" : "Escritura repetitiva de código de conexión y mapeo de APIs",
          lang === "en" ? "Complex database semantic vector search integrations" : "Integración de bases de datos vectoriales y búsquedas semánticas"
        ];
        course = lang === "en" ? "AI & Software Development Training" : "Formación en Desarrollo de Software & IA";
        agent = lang === "en" ? "Custom Agent Orchestrator with RAG & API routing" : "Orquestador Agéntico Multi-Agente con RAG y Ruteo de APIs";
      }

      setResult({ bottlenecks, course, agent });
      setLoading(false);
    }, 2400);
  };

  const formattedMsg = () => {
    if (!result) return "";
    const intro = lang === "en" 
      ? `Hi Cristian, I ran the Work Adaptability Analyzer. My role/tasks:\n"${inputText}"\n\nResult:\n- Recommended Course: ${result.course}\n- Tailored Agent: ${result.agent}\n\nI want to discuss options!`
      : `Hola Cristian! Ejecuté el Analizador de Adaptabilidad Laboral. Mi puesto/tareas:\n"${inputText}"\n\nResultado:\n- Curso recomendado: ${result.course}\n- Solución a medida: ${result.agent}\n\n¡Me interesa evaluar estas opciones!`;
    return getWhatsAppLink(intro);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
      <div 
        className="relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-white/10 bg-[#0c0d12]/95 overflow-hidden max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.8)" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Background radial highlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#00f0ff]/5 blur-[80px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest mb-3"
              style={{ border: "1px solid rgba(0,240,255,0.2)", background: "rgba(0,240,255,0.05)", color: "#00f0ff" }}
            >
              <BrainCircuit size={12} />
              {lang === "en" ? "WORK ANALYSIS" : lang === "pt" ? "ANÁLISE DE TRABALHO" : "ANALIZADOR DE TRABAJO"}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#e5e5e5] mb-2 leading-tight">
              {ad.title}
            </h2>
            <p className="text-[#9e9e9e] text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              {ad.subtitle}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={ad.placeholder}
              rows={4}
              className="w-full rounded-2xl p-4 bg-[#050506] border border-white/10 text-white placeholder-[#5a5a5a] text-xs sm:text-sm focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/30 transition-all duration-300 resize-none"
            />

            <button
              onClick={handleAnalyze}
              disabled={loading || !inputText.trim()}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-xs sm:text-sm font-semibold text-black transition-all duration-300 disabled:opacity-40 disabled:hover:scale-100 hover:scale-[1.01]"
              style={{
                background: "linear-gradient(135deg, #00f0ff, #ffffff)",
                boxShadow: "0 4px 20px rgba(0, 240, 255, 0.15)"
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>
                    {loadingStep === 1 
                      ? (lang === "en" ? "Extracting repetitive tasks..." : "Extrayendo tareas repetitivas...")
                      : loadingStep === 2 
                      ? (lang === "en" ? "Mapping to curriculum..." : "Mapeando temarios...")
                      : loadingStep === 3 
                      ? (lang === "en" ? "Designing custom architecture..." : "Diseñando agentes...")
                      : ad.loading}
                  </span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>{ad.btn}</span>
                </>
              )}
            </button>
          </div>

          {/* Results Output */}
          {result && (
            <div className="mt-6 pt-6 border-t border-white/5 animate-fade-in space-y-5">
              <div className="flex items-center gap-2 text-[#00f0ff]">
                <CheckCircle2 size={18} />
                <h3 className="font-display text-base font-bold text-white">
                  {ad.titleResult}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Left col: Bottlenecks */}
                <div className="space-y-2">
                  <h4 className="text-[10px] uppercase font-mono tracking-widest text-[#5a5a5a]">
                    {ad.bottleneck}
                  </h4>
                  <ul className="space-y-1.5">
                    {result.bottlenecks.map((item, i) => (
                      <li key={i} className="text-xs text-[#9e9e9e] flex items-start gap-1.5">
                        <span className="text-[#00f0ff] mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right col: Recommendations */}
                <div className="space-y-3">
                  <div className="space-y-0.5">
                    <h4 className="text-[10px] uppercase font-mono tracking-widest text-[#5a5a5a]">
                      {ad.recommendedCourse}
                    </h4>
                    <p className="text-xs font-semibold text-[#e5e5e5]">
                      {result.course}
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="text-[10px] uppercase font-mono tracking-widest text-[#5a5a5a]">
                      {ad.customAgent}
                    </h4>
                    <p className="text-xs font-semibold text-[#00f0ff]">
                      {result.agent}
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Exit */}
              <div className="pt-2">
                <a
                  href={formattedMsg()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl text-xs font-semibold text-black transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    background: "linear-gradient(135deg, #00f0ff, #ffffff)",
                    boxShadow: "0 4px 20px rgba(0, 240, 255, 0.2)"
                  }}
                >
                  <span>{ad.whatsappCta}</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
