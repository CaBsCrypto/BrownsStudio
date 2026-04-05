"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ServiceItem { nombre: string; descripcion: string; precio_min: number; precio_max: number; }
interface FaqItem { pregunta: string; respuesta: string; }

const STEPS = ["Negocio", "Charlie", "Servicios"];

const RUBROS = [
  "Agencia web / marketing", "Clínica / salud", "Restaurante / gastronomía",
  "Comercio / retail", "Educación", "Inmobiliaria", "Otro",
];

export default function NewBusinessPage() {
  const router  = useRouter();
  const [step, setStep]     = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  // Step 1 — Negocio
  const [nombre, setNombre]         = useState("");
  const [rubro, setRubro]           = useState("");
  const [plan, setPlan]             = useState("starter");
  const [phoneId, setPhoneId]       = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [geminiKey, setGeminiKey]   = useState("");

  // Step 2 — Charlie
  const [nombreBot, setNombreBot]   = useState("Charlie");
  const [tono, setTono]             = useState("profesional y cercano");
  const [horario, setHorario]       = useState("Lunes a Viernes 9am-6pm");
  const [calendly, setCalendly]     = useState("");
  const [handoffPhone, setHandoffPhone] = useState("");
  const [reglasExtra, setReglasExtra]   = useState("");

  // Step 3 — Servicios + FAQs
  const [servicios, setServicios] = useState<ServiceItem[]>([
    { nombre: "", descripcion: "", precio_min: 0, precio_max: 0 },
  ]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  function canNext() {
    if (step === 0) return nombre.trim() && phoneId.trim();
    return true;
  }

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre, rubro, plan,
          wa_phone_number_id: phoneId,
          wa_access_token: accessToken || null,
          gemini_api_key: geminiKey || null,
          config: {
            nombre_bot: nombreBot, tono, horario,
            calendly_url: calendly || null,
            handoff_phone: handoffPhone || null,
            servicios: servicios.filter(s => s.nombre.trim()),
            faqs: faqs.filter(f => f.pregunta.trim()),
            reglas_extra: reglasExtra || null,
          },
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      router.push("/admin/businesses");
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/businesses" className="text-[#9e9e9e] hover:text-[#e5e5e5] text-sm transition-colors">← Volver</Link>
        <span className="text-[#484848]">/</span>
        <h1 className="text-[#e5e5e5] text-xl font-semibold">Nuevo negocio</h1>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-6">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                i === step ? "bg-[#47c4ff]/15 text-[#47c4ff] border border-[#47c4ff]/30"
                : i < step  ? "text-emerald-400 cursor-pointer hover:bg-emerald-400/10"
                : "text-[#484848]"
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold
                ${i === step ? "bg-[#47c4ff] text-black" : i < step ? "bg-emerald-400 text-black" : "bg-[#2c2c2c] text-[#484848]"}`}>
                {i < step ? "✓" : i + 1}
              </span>
              {s}
            </button>
            {i < STEPS.length - 1 && <div className="w-6 h-px bg-[#484848]/40" />}
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="bg-[#131313] border border-[#484848]/20 rounded-2xl p-6">

        {/* ── Step 0: Negocio ── */}
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <p className="text-[#e5e5e5] font-semibold mb-0.5">Datos del negocio</p>
              <p className="text-[#9e9e9e] text-xs mb-4">Información básica y credenciales de WhatsApp</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Nombre *">
                <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej: Clínica Morales" className={INPUT} />
              </Field>
              <Field label="Rubro">
                <select value={rubro} onChange={e => setRubro(e.target.value)} className={INPUT}>
                  <option value="">Seleccionar...</option>
                  {RUBROS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Plan">
                <select value={plan} onChange={e => setPlan(e.target.value)} className={INPUT}>
                  <option value="starter">Starter</option>
                  <option value="pro">Pro</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </Field>
              <Field label="Phone Number ID *" hint="Meta → WhatsApp → Getting Started">
                <input value={phoneId} onChange={e => setPhoneId(e.target.value)} placeholder="123456789012345" className={INPUT} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Access Token" hint="Opcional — usa el global si está vacío">
                <input value={accessToken} onChange={e => setAccessToken(e.target.value)} placeholder="EAAxxxxxx..." className={INPUT} type="password" />
              </Field>
              <Field label="Gemini API Key" hint="Opcional — usa la global si está vacío">
                <input value={geminiKey} onChange={e => setGeminiKey(e.target.value)} placeholder="AIzaxxxxxx..." className={INPUT} type="password" />
              </Field>
            </div>
          </div>
        )}

        {/* ── Step 1: Charlie ── */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <p className="text-[#e5e5e5] font-semibold mb-0.5">Personalidad de Charlie</p>
              <p className="text-[#9e9e9e] text-xs mb-4">Cómo se va a comportar el bot para este negocio</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Nombre del bot">
                <input value={nombreBot} onChange={e => setNombreBot(e.target.value)} placeholder="Charlie" className={INPUT} />
              </Field>
              <Field label="Horario">
                <input value={horario} onChange={e => setHorario(e.target.value)} placeholder="Lunes a Viernes 9am-6pm" className={INPUT} />
              </Field>
            </div>
            <Field label="Tono">
              <input value={tono} onChange={e => setTono(e.target.value)} placeholder="profesional y cercano" className={INPUT} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Calendly URL">
                <input value={calendly} onChange={e => setCalendly(e.target.value)} placeholder="https://calendly.com/..." className={INPUT} />
              </Field>
              <Field label="WhatsApp handoff" hint="Número al que Charlie deriva clientes">
                <input value={handoffPhone} onChange={e => setHandoffPhone(e.target.value)} placeholder="+56912345678" className={INPUT} />
              </Field>
            </div>
            <Field label="Reglas adicionales" hint="Instrucciones especiales para este negocio">
              <textarea value={reglasExtra} onChange={e => setReglasExtra(e.target.value)}
                placeholder="Ej: Nunca diagnosticar por WhatsApp..." rows={3} className={`${INPUT} resize-none`} />
            </Field>
          </div>
        )}

        {/* ── Step 2: Servicios + FAQs ── */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <p className="text-[#e5e5e5] font-semibold mb-0.5">Servicios y FAQs</p>
              <p className="text-[#9e9e9e] text-xs mb-4">Charlie los mencionará cuando corresponda</p>
            </div>

            {/* Servicios */}
            <div>
              <p className="text-[#9e9e9e] text-xs font-medium uppercase tracking-wider mb-2">Servicios</p>
              <div className="space-y-2">
                {servicios.map((s, i) => (
                  <div key={i} className="bg-[#0e0e0e] border border-[#484848]/20 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input value={s.nombre} onChange={e => { const u=[...servicios]; u[i].nombre=e.target.value; setServicios(u); }}
                        placeholder="Nombre del servicio" className={INPUT_SM} />
                      <input value={s.descripcion} onChange={e => { const u=[...servicios]; u[i].descripcion=e.target.value; setServicios(u); }}
                        placeholder="Descripción (opcional)" className={INPUT_SM} />
                    </div>
                    <div className="flex gap-2 items-center">
                      <input type="number" value={s.precio_min} onChange={e => { const u=[...servicios]; u[i].precio_min=+e.target.value; setServicios(u); }}
                        placeholder="Mín USD" className={`${INPUT_SM} w-28`} />
                      <span className="text-[#484848] text-xs">—</span>
                      <input type="number" value={s.precio_max} onChange={e => { const u=[...servicios]; u[i].precio_max=+e.target.value; setServicios(u); }}
                        placeholder="Máx USD" className={`${INPUT_SM} w-28`} />
                      <button onClick={() => setServicios(servicios.filter((_, idx) => idx !== i))}
                        className="ml-auto text-red-400/60 hover:text-red-400 text-xs transition-colors">✕</button>
                    </div>
                  </div>
                ))}
                <button onClick={() => setServicios([...servicios, { nombre: "", descripcion: "", precio_min: 0, precio_max: 0 }])}
                  className="text-[#47c4ff] text-xs font-medium hover:text-[#05a9e3] transition-colors">+ Agregar servicio</button>
              </div>
            </div>

            {/* FAQs */}
            <div>
              <p className="text-[#9e9e9e] text-xs font-medium uppercase tracking-wider mb-2">Preguntas frecuentes</p>
              <div className="space-y-2">
                {faqs.map((f, i) => (
                  <div key={i} className="bg-[#0e0e0e] border border-[#484848]/20 rounded-lg p-3 space-y-2">
                    <div className="flex gap-2 items-center">
                      <input value={f.pregunta} onChange={e => { const u=[...faqs]; u[i].pregunta=e.target.value; setFaqs(u); }}
                        placeholder="Pregunta" className={`${INPUT_SM} flex-1`} />
                      <button onClick={() => setFaqs(faqs.filter((_, idx) => idx !== i))}
                        className="text-red-400/60 hover:text-red-400 text-xs transition-colors">✕</button>
                    </div>
                    <textarea value={f.respuesta} onChange={e => { const u=[...faqs]; u[i].respuesta=e.target.value; setFaqs(u); }}
                      placeholder="Respuesta" rows={2} className={`${INPUT_SM} resize-none w-full`} />
                  </div>
                ))}
                <button onClick={() => setFaqs([...faqs, { pregunta: "", respuesta: "" }])}
                  className="text-[#47c4ff] text-xs font-medium hover:text-[#05a9e3] transition-colors">+ Agregar FAQ</button>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="mt-4 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">{error}</p>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#484848]/20">
          <button
            onClick={() => step > 0 ? setStep(step - 1) : router.push("/admin/businesses")}
            className="text-[#9e9e9e] hover:text-[#e5e5e5] text-sm font-medium transition-colors"
          >
            {step === 0 ? "Cancelar" : "← Anterior"}
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canNext()}
              className="bg-[#47c4ff] hover:bg-[#05a9e3] disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold text-sm px-5 py-2 rounded-lg transition-colors"
            >
              Siguiente →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#47c4ff] hover:bg-[#05a9e3] disabled:opacity-50 text-black font-semibold text-sm px-5 py-2 rounded-lg transition-colors"
            >
              {loading ? "Creando..." : "Crear negocio ✓"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const INPUT    = "w-full bg-[#1f1f1f] border border-[#484848]/40 rounded-lg px-3 py-2 text-[#e5e5e5] text-sm placeholder:text-[#484848] focus:outline-none focus:border-[#47c4ff]/50 transition-colors";
const INPUT_SM = "bg-[#1a1a1a] border border-[#484848]/30 rounded-md px-3 py-2 text-[#e5e5e5] text-sm placeholder:text-[#484848] focus:outline-none focus:border-[#47c4ff]/50 transition-colors";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[#9e9e9e] text-[11px] font-medium mb-1.5 uppercase tracking-wider">{label}</label>
      {children}
      {hint && <p className="text-[#484848] text-[11px] mt-1">{hint}</p>}
    </div>
  );
}
