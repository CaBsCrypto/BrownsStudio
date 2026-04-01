"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ServiceItem { nombre: string; descripcion: string; precio_min: number; precio_max: number; }
interface FaqItem { pregunta: string; respuesta: string; }

const RUBROS = [
  "Agencia web / marketing",
  "Clínica / salud",
  "Restaurante / gastronomía",
  "Comercio / retail",
  "Educación",
  "Inmobiliaria",
  "Otro",
];

export default function NewBusinessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  // Basic info
  const [nombre, setNombre]         = useState("");
  const [rubro, setRubro]           = useState("");
  const [phoneId, setPhoneId]       = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [geminiKey, setGeminiKey]   = useState("");
  const [plan, setPlan]             = useState("starter");

  // Charlie config
  const [nombreBot, setNombreBot]   = useState("Charlie");
  const [tono, setTono]             = useState("profesional y cercano");
  const [horario, setHorario]       = useState("Lunes a Viernes 9am-6pm");
  const [calendly, setCalendly]     = useState("");
  const [handoffPhone, setHandoffPhone] = useState("");
  const [reglasExtra, setReglasExtra]   = useState("");

  // Services
  const [servicios, setServicios] = useState<ServiceItem[]>([
    { nombre: "", descripcion: "", precio_min: 0, precio_max: 0 },
  ]);

  // FAQs
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  function addServicio() {
    setServicios([...servicios, { nombre: "", descripcion: "", precio_min: 0, precio_max: 0 }]);
  }

  function removeServicio(i: number) {
    setServicios(servicios.filter((_, idx) => idx !== i));
  }

  function updateServicio(i: number, field: keyof ServiceItem, value: string | number) {
    const updated = [...servicios];
    (updated[i] as any)[field] = value;
    setServicios(updated);
  }

  function addFaq() {
    setFaqs([...faqs, { pregunta: "", respuesta: "" }]);
  }

  function removeFaq(i: number) {
    setFaqs(faqs.filter((_, idx) => idx !== i));
  }

  function updateFaq(i: number, field: keyof FaqItem, value: string) {
    const updated = [...faqs];
    updated[i][field] = value;
    setFaqs(updated);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
            nombre_bot: nombreBot,
            tono, horario,
            calendly_url: calendly || null,
            handoff_phone: handoffPhone || null,
            servicios: servicios.filter((s) => s.nombre.trim()),
            faqs: faqs.filter((f) => f.pregunta.trim()),
            reglas_extra: reglasExtra || null,
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      router.push("/admin/businesses");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/businesses" className="text-[#9e9e9e] hover:text-[#e5e5e5] transition-colors text-sm">
          ← Volver
        </Link>
        <span className="text-[#484848]">/</span>
        <h1 className="text-[#e5e5e5] text-xl font-semibold">Nuevo negocio</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ── Sección 1: Datos básicos ── */}
        <Section title="Datos del negocio" subtitle="Información principal del cliente">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nombre del negocio *">
              <input required value={nombre} onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Clínica Morales" className={INPUT} />
            </Field>
            <Field label="Rubro">
              <select value={rubro} onChange={(e) => setRubro(e.target.value)} className={INPUT}>
                <option value="">Seleccionar...</option>
                {RUBROS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Plan">
              <select value={plan} onChange={(e) => setPlan(e.target.value)} className={INPUT}>
                <option value="starter">Starter</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </Field>
          </div>
        </Section>

        {/* ── Sección 2: WhatsApp / Meta ── */}
        <Section title="Configuración WhatsApp" subtitle="Credenciales de Meta Business API">
          <Field label="Phone Number ID *" hint="Lo encontrás en Meta → WhatsApp → Getting Started">
            <input required value={phoneId} onChange={(e) => setPhoneId(e.target.value)}
              placeholder="123456789012345" className={INPUT} />
          </Field>
          <Field label="Access Token" hint="Opcional — si tiene su propia app de Meta. Si está vacío usa el token global de Vercel.">
            <input value={accessToken} onChange={(e) => setAccessToken(e.target.value)}
              placeholder="EAAxxxxxx..." className={INPUT} type="password" />
          </Field>
          <Field label="Gemini API Key" hint="Opcional — key propia del cliente (gratis en aistudio.google.com/apikey). Si está vacío usa la key global.">
            <input value={geminiKey} onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="AIzaxxxxxx..." className={INPUT} type="password" />
          </Field>
        </Section>

        {/* ── Sección 3: Personalidad de Charlie ── */}
        <Section title="Personalidad de Charlie" subtitle="Cómo se va a comportar el bot para este negocio">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nombre del bot">
              <input value={nombreBot} onChange={(e) => setNombreBot(e.target.value)}
                placeholder="Charlie" className={INPUT} />
            </Field>
            <Field label="Horario de atención">
              <input value={horario} onChange={(e) => setHorario(e.target.value)}
                placeholder="Lunes a Viernes 9am-6pm" className={INPUT} />
            </Field>
          </div>
          <Field label="Tono">
            <input value={tono} onChange={(e) => setTono(e.target.value)}
              placeholder="profesional y cercano" className={INPUT} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Link de Calendly" hint="Para agendar llamadas">
              <input value={calendly} onChange={(e) => setCalendly(e.target.value)}
                placeholder="https://calendly.com/..." className={INPUT} />
            </Field>
            <Field label="Teléfono de handoff" hint="Recibe alertas cuando un lead pide hablar con alguien">
              <input value={handoffPhone} onChange={(e) => setHandoffPhone(e.target.value)}
                placeholder="+56912345678" className={INPUT} />
            </Field>
          </div>
          <Field label="Reglas adicionales" hint="Instrucciones especiales para Charlie en este negocio">
            <textarea value={reglasExtra} onChange={(e) => setReglasExtra(e.target.value)}
              placeholder="Ej: Nunca diagnosticar por WhatsApp. Siempre tranquilizar al paciente..."
              rows={3} className={`${INPUT} resize-none`} />
          </Field>
        </Section>

        {/* ── Sección 4: Servicios ── */}
        <Section title="Servicios y precios" subtitle="Charlie los mencionará cuando corresponda">
          <div className="space-y-3">
            {servicios.map((s, i) => (
              <div key={i} className="bg-[#0e0e0e] border border-[#484848]/20 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Field label="Nombre del servicio">
                    <input value={s.nombre} onChange={(e) => updateServicio(i, "nombre", e.target.value)}
                      placeholder="Ej: Limpieza dental" className={INPUT_SM} />
                  </Field>
                  <Field label="Descripción">
                    <input value={s.descripcion} onChange={(e) => updateServicio(i, "descripcion", e.target.value)}
                      placeholder="Opcional" className={INPUT_SM} />
                  </Field>
                </div>
                <div className="grid grid-cols-3 gap-3 items-end">
                  <Field label="Precio mín (USD)">
                    <input type="number" value={s.precio_min} onChange={(e) => updateServicio(i, "precio_min", +e.target.value)}
                      className={INPUT_SM} />
                  </Field>
                  <Field label="Precio máx (USD)">
                    <input type="number" value={s.precio_max} onChange={(e) => updateServicio(i, "precio_max", +e.target.value)}
                      className={INPUT_SM} />
                  </Field>
                  <button type="button" onClick={() => removeServicio(i)}
                    className="text-red-400 hover:text-red-300 text-xs font-medium pb-0.5 transition-colors">
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addServicio}
              className="text-[#47c4ff] text-sm hover:text-[#05a9e3] font-medium transition-colors">
              + Agregar servicio
            </button>
          </div>
        </Section>

        {/* ── Sección 5: FAQs ── */}
        <Section title="Preguntas frecuentes" subtitle="Respuestas que Charlie dará automáticamente">
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-[#0e0e0e] border border-[#484848]/20 rounded-lg p-4 space-y-3">
                <Field label="Pregunta">
                  <input value={f.pregunta} onChange={(e) => updateFaq(i, "pregunta", e.target.value)}
                    placeholder="¿Atienden urgencias?" className={INPUT_SM} />
                </Field>
                <div className="flex gap-3 items-start">
                  <div className="flex-1">
                    <Field label="Respuesta">
                      <textarea value={f.respuesta} onChange={(e) => updateFaq(i, "respuesta", e.target.value)}
                        placeholder="Sí, llamar al..." rows={2} className={`${INPUT_SM} resize-none`} />
                    </Field>
                  </div>
                  <button type="button" onClick={() => removeFaq(i)}
                    className="text-red-400 hover:text-red-300 text-xs font-medium mt-6 transition-colors">
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addFaq}
              className="text-[#47c4ff] text-sm hover:text-[#05a9e3] font-medium transition-colors">
              + Agregar pregunta
            </button>
          </div>
        </Section>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2 pb-8">
          <button type="submit" disabled={loading}
            className="bg-[#47c4ff] hover:bg-[#05a9e3] disabled:opacity-50 text-black font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors">
            {loading ? "Creando..." : "Crear negocio"}
          </button>
          <Link href="/admin/businesses"
            className="text-[#9e9e9e] hover:text-[#e5e5e5] text-sm font-medium transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const INPUT    = "w-full bg-[#1f1f1f] border border-[#484848]/40 rounded-lg px-3 py-2.5 text-[#e5e5e5] text-sm placeholder:text-[#484848] focus:outline-none focus:border-[#47c4ff]/50 transition-colors";
const INPUT_SM = "w-full bg-[#1a1a1a] border border-[#484848]/30 rounded-md px-3 py-2 text-[#e5e5e5] text-sm placeholder:text-[#484848] focus:outline-none focus:border-[#47c4ff]/50 transition-colors";

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#131313] border border-[#484848]/20 rounded-2xl p-6">
      <h2 className="text-[#e5e5e5] font-semibold mb-0.5">{title}</h2>
      <p className="text-[#9e9e9e] text-xs mb-5">{subtitle}</p>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[#9e9e9e] text-[11px] font-medium mb-1.5 uppercase tracking-wider">{label}</label>
      {children}
      {hint && <p className="text-[#484848] text-[11px] mt-1">{hint}</p>}
    </div>
  );
}
