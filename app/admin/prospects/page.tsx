"use client";
import { useEffect, useState } from "react";

interface ProspectVideo {
  uid?: string;
  id: string;
  name: string;
  industry: string;
  botName: string;
  hookText: string;
  clientMessage: string;
  botReply: string;
  ctaUrl: string;
  voiceScript: string;
  videoUrl: string;
  created_at: string;
}

const INDUSTRY_PRESETS: Record<string, {
  botName: string;
  hookText: string;
  clientMessage: string;
  botReply: string;
  voiceScriptTemplate: (name: string) => string;
}> = {
  dental: {
    botName: "Dra. Ana",
    hookText: "¿Pierdes pacientes en WhatsApp por demoras?",
    clientMessage: "¡Hola! Quisiera consultar por el precio del blanqueamiento dental.",
    botReply: "¡Hola! Con gusto. Nuestro Blanqueamiento LED Premium tiene un valor promo de $120.000 CLP. ¿Te acomoda agendar una evaluación gratuita?",
    voiceScriptTemplate: (name) => `Hola ${name}. ¿Sabías que estás perdiendo pacientes en WhatsApp por demoras en contestar? Así es como lo resolvemos en Browns Studio.`
  },
  inmobiliaria: {
    botName: "Soporte Andes",
    hookText: "¿Pierdes horas respondiendo requisitos básicos?",
    clientMessage: "Hola, me interesa el departamento en Providencia. ¿Cuáles son los requisitos y cuándo se puede ver?",
    botReply: "¡Hola! Para este depto pedimos liquidación 3x arriendo, aval y Dicom Platinum. ¿Cumples con los requisitos para agendarte una visita guiada?",
    voiceScriptTemplate: (name) => `Hola equipo de ${name}. ¿Cansados de perder horas respondiendo requisitos de arriendo básicos por chat? Así es como automatizamos tu embudo con Inteligencia Artificial.`
  },
  academia: {
    botName: "Tutor IA",
    hookText: "¿Tus asesores no dan abasto con los leads?",
    clientMessage: "Hola, me gustaría recibir el programa de estudios y el precio del Bootcamp de IA para Negocios.",
    botReply: "¡Hola! Claro que sí, aquí tienes el PDF del programa. El valor es de $450 USD. ¿Te gustaría agendar una llamada breve con admisiones?",
    voiceScriptTemplate: (name) => `Hola ${name}. ¿Tus asesores de admisión no dan abasto con los leads interesados? Con Browns Studio puedes escalar tu atención en piloto automático.`
  },
  ecommerce: {
    botName: "Asistente Zenith",
    hookText: "¿Clientes abandonando carritos por falta de soporte?",
    clientMessage: "Hola, hice un pedido hace 3 días y todavía no me llega el código de seguimiento. ¿Me ayudan?",
    botReply: "¡Hola! Tu compra #4902 ya está con Starken. Tu tracking es STK-98230. Te acabo de enviar un cupón del 10% de regalo por la demora.",
    voiceScriptTemplate: (name) => `Hola equipo de ${name}. ¿Tus clientes abandonan el carrito por falta de soporte instantáneo en sus envíos? Así es como automatizamos el tracking y la fidelización.`
  }
};

export default function ProspectsPage() {
  const [videos, setVideos] = useState<ProspectVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [rendering, setRendering] = useState(false);
  const [renderStep, setRenderStep] = useState("");
  const [error, setError] = useState("");

  // Form states
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("dental");
  const [botName, setBotName] = useState(INDUSTRY_PRESETS.dental.botName);
  const [hookText, setHookText] = useState(INDUSTRY_PRESETS.dental.hookText);
  const [clientMessage, setClientMessage] = useState(INDUSTRY_PRESETS.dental.clientMessage);
  const [botReply, setBotReply] = useState(INDUSTRY_PRESETS.dental.botReply);
  const [ctaUrl, setCtaUrl] = useState("browns.studio/demo");
  const [voiceScript, setVoiceScript] = useState(INDUSTRY_PRESETS.dental.voiceScriptTemplate("Empresa"));

  useEffect(() => {
    loadVideos();
  }, []);

  async function loadVideos() {
    try {
      const res = await fetch("/api/admin/generate-video");
      if (res.ok) {
        setVideos(await res.json());
      }
    } catch (e) {
      console.error("Error loading videos:", e);
    } finally {
      setLoading(false);
    }
  }

  // Handle Preset change
  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ind = e.target.value;
    setIndustry(ind);
    const preset = INDUSTRY_PRESETS[ind];
    if (preset) {
      setBotName(preset.botName);
      setHookText(preset.hookText);
      setClientMessage(preset.clientMessage);
      setBotReply(preset.botReply);
      setVoiceScript(preset.voiceScriptTemplate(name || "Empresa"));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    const preset = INDUSTRY_PRESETS[industry];
    if (preset) {
      setVoiceScript(preset.voiceScriptTemplate(val || "Empresa"));
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setError("Por favor ingresa el nombre de la empresa");
      return;
    }

    setRendering(true);
    setError("");
    setRenderStep("Iniciando generación de video...");

    // Simulate logs to wow the user
    const steps = [
      "Llamando a la API de ElevenLabs para sintetizar locución de voz con IA...",
      "Escribiendo archivo de locución de alta fidelidad en disco (.mp3)...",
      "Lanzando motor de renderizado de video Remotion (Playwright headless browser)...",
      "Generando animaciones del chat de WhatsApp y sincronizando con la voz...",
      "Renderizando placas en 1080x1920 a 30fps...",
      "Compilando video final MP4 en disco...",
      "Copiando archivo a la carpeta pública de distribución..."
    ];

    let currentStepIdx = 0;
    const interval = setInterval(() => {
      if (currentStepIdx < steps.length) {
        setRenderStep(steps[currentStepIdx]);
        currentStepIdx++;
      }
    }, 2500);

    try {
      const res = await fetch("/api/admin/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          industry,
          botName,
          hookText,
          clientMessage,
          botReply,
          ctaUrl,
          voiceScript,
        }),
      });

      clearInterval(interval);

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Fallo en el renderizado del video");
      }

      setRenderStep("¡Video generado con éxito rotundo! 🎉");
      setTimeout(() => {
        setRendering(false);
        setName("");
        loadVideos();
      }, 1500);
    } catch (err: any) {
      clearInterval(interval);
      setError(err.message || "Ocurrió un error inesperado al compilar el video");
      setRendering(false);
    }
  };

  const getCopyText = (v: ProspectVideo) => {
    return `Hola! Vi que tu equipo a veces tarda en responder consultas en redes sociales. Armé este prototipo visual personalizado de cómo respondería tu propio bot de WhatsApp de Browns Studio de forma instantánea a un cliente calificado:

🎬 Mira el video de simulación adjunto o descárgalo aquí: https://www.browns.studio${v.videoUrl}

Puedes probar e interactuar con su cerebro real ahora mismo en: https://www.browns.studio/demo?preset=${v.industry} con tus propios datos. ¿Te tinca si coordinamos una llamada de 15 minutos para ver cómo integrarlo a tu negocio esta semana?`;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[#e5e5e5] text-2xl font-bold font-display">Vídeos de Prospección B2B 🎬</h1>
        <p className="text-[#9e9e9e] text-sm mt-1">Generá videos comerciales personalizados en Remotion con locuciones reales de ElevenLabs para cold outreach</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-1 bg-[#131313] border border-[#484848]/20 rounded-2xl p-6 h-fit">
          <h2 className="text-[#e5e5e5] text-lg font-semibold mb-4 flex items-center gap-2">
            <span>✨</span> Crear Pitch Personalizado
          </h2>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-[#9e9e9e] text-xs font-semibold uppercase mb-1.5">Nombre del Prospecto</label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Ej. Clínica Dental Providencia"
                className="w-full bg-[#1e1e1e] border border-[#484848]/30 rounded-lg px-3 py-2 text-[#e5e5e5] text-sm focus:outline-none focus:border-[#47c4ff] transition-colors"
                required
                disabled={rendering}
              />
            </div>

            <div>
              <label className="block text-[#9e9e9e] text-xs font-semibold uppercase mb-1.5">Industria / Plantilla</label>
              <select
                value={industry}
                onChange={handleIndustryChange}
                className="w-full bg-[#1e1e1e] border border-[#484848]/30 rounded-lg px-3 py-2 text-[#e5e5e5] text-sm focus:outline-none focus:border-[#47c4ff] transition-colors"
                disabled={rendering}
              >
                <option value="dental">Clínica Dental</option>
                <option value="inmobiliaria">Corredora / Inmobiliaria</option>
                <option value="academia">Academia / Cursos</option>
                <option value="ecommerce">Tienda E-commerce</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#9e9e9e] text-xs font-semibold uppercase mb-1.5">Nombre Bot</label>
                <input
                  type="text"
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  className="w-full bg-[#1e1e1e] border border-[#484848]/30 rounded-lg px-3 py-2 text-[#e5e5e5] text-sm focus:outline-none"
                  disabled={rendering}
                />
              </div>
              <div>
                <label className="block text-[#9e9e9e] text-xs font-semibold uppercase mb-1.5">CTA URL</label>
                <input
                  type="text"
                  value={ctaUrl}
                  onChange={(e) => setCtaUrl(e.target.value)}
                  className="w-full bg-[#1e1e1e] border border-[#484848]/30 rounded-lg px-3 py-2 text-[#e5e5e5] text-sm focus:outline-none"
                  disabled={rendering}
                />
              </div>
            </div>

            <div>
              <label className="block text-[#9e9e9e] text-xs font-semibold uppercase mb-1.5">Gancho Visual (Hook)</label>
              <input
                type="text"
                value={hookText}
                onChange={(e) => setHookText(e.target.value)}
                className="w-full bg-[#1e1e1e] border border-[#484848]/30 rounded-lg px-3 py-2 text-[#e5e5e5] text-sm focus:outline-none"
                disabled={rendering}
              />
            </div>

            <div>
              <label className="block text-[#9e9e9e] text-xs font-semibold uppercase mb-1.5">Consulta Cliente (WhatsApp)</label>
              <input
                type="text"
                value={clientMessage}
                onChange={(e) => setClientMessage(e.target.value)}
                className="w-full bg-[#1e1e1e] border border-[#484848]/30 rounded-lg px-3 py-2 text-[#e5e5e5] text-sm focus:outline-none"
                disabled={rendering}
              />
            </div>

            <div>
              <label className="block text-[#9e9e9e] text-xs font-semibold uppercase mb-1.5">Respuesta IA (WhatsApp)</label>
              <textarea
                value={botReply}
                onChange={(e) => setBotReply(e.target.value)}
                rows={3}
                className="w-full bg-[#1e1e1e] border border-[#484848]/30 rounded-lg px-3 py-2 text-[#e5e5e5] text-sm focus:outline-none resize-none"
                disabled={rendering}
              />
            </div>

            <div>
              <label className="block text-[#9e9e9e] text-xs font-semibold uppercase mb-1.5">Script de Locución (ElevenLabs)</label>
              <textarea
                value={voiceScript}
                onChange={(e) => setVoiceScript(e.target.value)}
                rows={3}
                className="w-full bg-[#1e1e1e] border border-[#484848]/30 rounded-lg px-3 py-2 text-[#e5e5e5] text-sm focus:outline-none resize-none font-mono text-[11px]"
                disabled={rendering}
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg">
                {error}
              </div>
            )}

            {rendering ? (
              <div className="space-y-2 p-3 bg-[#1e1e1e] border border-[#484848]/20 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#47c4ff] border-t-transparent rounded-full animate-spin" />
                  <span className="text-[#47c4ff] text-xs font-bold uppercase tracking-wider">Compilando Pitch...</span>
                </div>
                <p className="text-[#9e9e9e] text-[10px] leading-relaxed font-mono">{renderStep}</p>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-[#47c4ff] hover:bg-[#05a9e3] text-black font-extrabold text-sm py-3 rounded-lg transition-colors shadow-lg shadow-[#47c4ff]/10"
              >
                Generar Video Pitch ⚡
              </button>
            )}
          </form>
        </div>

        {/* List Column */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-[#e5e5e5] text-lg font-semibold flex items-center gap-2">
            <span>🗃️</span> Historial de Pitches Generados
          </h2>

          {loading ? (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-44 bg-[#131313] border border-[#484848]/20 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-20 bg-[#131313] border border-[#484848]/20 rounded-2xl">
              <p className="text-5xl mb-4">🎬</p>
              <p className="text-[#e5e5e5] font-semibold">Aún no has generado ningún video de prospección</p>
              <p className="text-[#9e9e9e] text-sm mt-1">Completa la ficha técnica a la izquierda para renderizar tu primer video pitch con IA.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <div key={video.uid || video.id} className="bg-[#131313] border border-[#484848]/20 rounded-2xl overflow-hidden flex flex-col group hover:border-[#47c4ff]/30 transition-all duration-300">
                  {/* Inline Video Player */}
                  <div className="aspect-[9/16] h-[260px] bg-black relative flex items-center justify-center overflow-hidden border-b border-[#484848]/10">
                    <video
                      src={video.videoUrl}
                      controls
                      className="h-full w-auto"
                      preload="metadata"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#1e1e1e] border border-[#484848]/20 text-[#47c4ff]">
                          {video.industry}
                        </span>
                        <span className="text-[10px] text-[#484848]">
                          {new Date(video.created_at).toLocaleDateString("es-CL", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </span>
                      </div>
                      <h3 className="text-[#e5e5e5] font-bold text-sm truncate">{video.name}</h3>
                      <p className="text-[#9e9e9e] text-xs mt-1 font-mono text-[10px] truncate">{video.voiceScript}</p>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 pt-4 border-t border-[#484848]/10 flex gap-2">
                      <a
                        href={video.videoUrl}
                        download={`pitch-${video.id}.mp4`}
                        className="flex-1 text-center bg-[#1e1e1e] hover:bg-[#2e2e2e] text-[#e5e5e5] border border-[#484848]/30 font-bold text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                      >
                        Descargar 📥
                      </a>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(getCopyText(video));
                          alert("¡Mensaje personalizado copiado al portapapeles! 📋");
                        }}
                        className="flex-1 bg-[#47c4ff]/10 hover:bg-[#47c4ff]/20 text-[#47c4ff] border border-[#47c4ff]/20 font-bold text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                      >
                        Copiar Pitch 📋
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
