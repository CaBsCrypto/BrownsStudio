"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Business {
  id: string; nombre: string; rubro: string | null; wa_phone_number_id: string;
  is_active: boolean; plan: string; created_at: string;
  business_configs: Config[];
}
interface Config {
  id: string; nombre_bot: string; tono: string; horario: string;
  calendly_url: string | null; handoff_phone: string | null;
  servicios: any[]; faqs: any[]; reglas_extra: string | null;
}
interface Lead {
  id: string; wa_phone: string; full_name: string | null; business_type: string | null;
  budget_range: string | null; status: string; score: number | null;
  service_interest: string[] | null; urgency: string | null; created_at: string;
}
interface Conversation {
  id: string; wa_phone: string; display_name: string | null;
  stage: string; last_message_at: string; messages: any[];
}

const STAGE_LABELS: Record<string, { label: string; color: string }> = {
  greeting:   { label: "Saludo",       color: "text-[#9e9e9e] bg-[#9e9e9e]/10 border-[#9e9e9e]/20" },
  qualifying: { label: "Calificando",  color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  scheduling: { label: "Agendando",    color: "text-[#47c4ff] bg-[#47c4ff]/10 border-[#47c4ff]/20" },
  closing:    { label: "Cierre",       color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  handoff:    { label: "Handoff 🔥",   color: "text-orange-400 bg-orange-400/10 border-orange-400/20" },
  closed:     { label: "Cerrado",      color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
};

const STATUS_LABELS: Record<string, string> = {
  new: "Nuevo", contacted: "Contactado", qualified: "Calificado",
  proposal_sent: "Propuesta", won: "Ganado ✓", lost: "Perdido", nurture: "Nurture",
};

type Tab = "config" | "leads" | "conversations";

export default function BusinessDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router  = useRouter();

  const [business, setBusiness] = useState<Business | null>(null);
  const [leads, setLeads]       = useState<Lead[]>([]);
  const [convs, setConvs]       = useState<Conversation[]>([]);
  const [tab, setTab]           = useState<Tab>("config");
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");

  // Edit config state
  const [editConfig, setEditConfig] = useState<Partial<Config>>({});
  const [editBiz, setEditBiz]       = useState<{ nombre?: string; rubro?: string; plan?: string; is_active?: boolean }>({});
  const [servicios, setServicios]   = useState<any[]>([]);
  const [faqs, setFaqs]             = useState<any[]>([]);

  useEffect(() => { loadAll(); }, [id]);

  async function loadAll() {
    setLoading(true);
    try {
      const [bizRes, leadsRes, convsRes] = await Promise.all([
        fetch(`/api/admin/businesses/${id}`),
        fetch(`/api/admin/leads?business_id=${id}`),
        fetch(`/api/admin/conversations?business_id=${id}`),
      ]);
      const biz    = await bizRes.json();
      const leadsData = await leadsRes.json();
      const convsData = await convsRes.json();
      setBusiness(biz);
      setLeads(Array.isArray(leadsData) ? leadsData : []);
      setConvs(Array.isArray(convsData) ? convsData : []);
      // Seed edit state from loaded config
      const cfg = biz?.business_configs?.[0];
      if (cfg) {
        setEditConfig({ ...cfg });
        setServicios(cfg.servicios ?? []);
        setFaqs(cfg.faqs ?? []);
      }
      setEditBiz({ nombre: biz?.nombre, rubro: biz?.rubro, plan: biz?.plan, is_active: biz?.is_active });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function saveConfig() {
    setSaving(true);
    try {
      await fetch(`/api/admin/businesses/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editBiz,
          config: { ...editConfig, servicios, faqs },
        }),
      });
      await loadAll();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`¿Eliminar "${business?.nombre}"? Esta acción no se puede deshacer.`)) return;
    await fetch(`/api/admin/businesses/${id}`, { method: "DELETE" });
    router.push("/admin/businesses");
  }

  if (loading) return <div className="p-8"><p className="text-[#9e9e9e]">Cargando...</p></div>;
  if (!business) return <div className="p-8"><p className="text-red-400">Negocio no encontrado</p></div>;

  const config = business.business_configs?.[0];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link href="/admin/businesses" className="text-[#9e9e9e] hover:text-[#e5e5e5] text-sm transition-colors">← Negocios</Link>
            <span className="text-[#484848]">/</span>
            <h1 className="text-[#e5e5e5] text-xl font-semibold">{business.nombre}</h1>
            <span className={`text-xs px-2 py-0.5 rounded border font-medium ${business.is_active ? "text-emerald-400 border-emerald-400/20 bg-emerald-400/10" : "text-[#9e9e9e] border-[#484848]/30 bg-[#1f1f1f]"}`}>
              {business.is_active ? "Activo" : "Pausado"}
            </span>
          </div>
          <p className="text-[#9e9e9e] text-sm">{business.rubro ?? "Sin rubro"} · Bot: {config?.nombre_bot ?? "Charlie"}</p>
        </div>
        <button onClick={handleDelete} className="text-red-400/70 hover:text-red-400 text-xs font-medium transition-colors">
          Eliminar negocio
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Conversaciones", value: convs.length },
          { label: "Leads", value: leads.length },
          { label: "Leads ganados", value: leads.filter(l => l.status === "won").length },
        ].map((s) => (
          <div key={s.label} className="bg-[#131313] border border-[#484848]/20 rounded-xl px-4 py-3">
            <p className="text-[#e5e5e5] font-bold text-xl">{s.value}</p>
            <p className="text-[#9e9e9e] text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-[#131313] border border-[#484848]/20 rounded-xl p-1 w-fit">
        {(["config", "leads", "conversations"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t ? "bg-[#1f1f1f] text-[#e5e5e5]" : "text-[#9e9e9e] hover:text-[#e5e5e5]"
            }`}
          >
            {t === "config" ? "⚙️ Configuración" : t === "leads" ? `📋 Leads (${leads.length})` : `💬 Chats (${convs.length})`}
          </button>
        ))}
      </div>

      {/* ── Tab: Config ── */}
      {tab === "config" && (
        <div className="space-y-5 max-w-2xl">
          <Section title="Datos del negocio">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Nombre">
                <input value={editBiz.nombre ?? ""} onChange={e => setEditBiz({...editBiz, nombre: e.target.value})} className={INPUT} />
              </Field>
              <Field label="Rubro">
                <input value={editBiz.rubro ?? ""} onChange={e => setEditBiz({...editBiz, rubro: e.target.value})} className={INPUT} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Plan">
                <select value={editBiz.plan ?? "starter"} onChange={e => setEditBiz({...editBiz, plan: e.target.value})} className={INPUT}>
                  <option value="starter">Starter</option>
                  <option value="pro">Pro</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </Field>
              <Field label="Estado">
                <select value={editBiz.is_active ? "true" : "false"} onChange={e => setEditBiz({...editBiz, is_active: e.target.value === "true"})} className={INPUT}>
                  <option value="true">Activo</option>
                  <option value="false">Pausado</option>
                </select>
              </Field>
            </div>
          </Section>

          <Section title="Personalidad de Charlie">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Nombre del bot">
                <input value={editConfig.nombre_bot ?? ""} onChange={e => setEditConfig({...editConfig, nombre_bot: e.target.value})} className={INPUT} />
              </Field>
              <Field label="Horario">
                <input value={editConfig.horario ?? ""} onChange={e => setEditConfig({...editConfig, horario: e.target.value})} className={INPUT} />
              </Field>
            </div>
            <Field label="Tono">
              <input value={editConfig.tono ?? ""} onChange={e => setEditConfig({...editConfig, tono: e.target.value})} className={INPUT} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Calendly URL">
                <input value={editConfig.calendly_url ?? ""} onChange={e => setEditConfig({...editConfig, calendly_url: e.target.value})} placeholder="https://calendly.com/..." className={INPUT} />
              </Field>
              <Field label="Teléfono handoff">
                <input value={editConfig.handoff_phone ?? ""} onChange={e => setEditConfig({...editConfig, handoff_phone: e.target.value})} placeholder="+56912345678" className={INPUT} />
              </Field>
            </div>
            <Field label="Reglas adicionales">
              <textarea value={editConfig.reglas_extra ?? ""} onChange={e => setEditConfig({...editConfig, reglas_extra: e.target.value})}
                rows={3} className={`${INPUT} resize-none`} />
            </Field>
          </Section>

          <Section title="Servicios">
            <div className="space-y-3">
              {servicios.map((s, i) => (
                <div key={i} className="bg-[#0e0e0e] border border-[#484848]/20 rounded-lg p-3">
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <Field label="Nombre">
                      <input value={s.nombre} onChange={e => { const u=[...servicios]; u[i].nombre=e.target.value; setServicios(u); }} className={INPUT_SM} />
                    </Field>
                    <Field label="Descripción">
                      <input value={s.descripcion ?? ""} onChange={e => { const u=[...servicios]; u[i].descripcion=e.target.value; setServicios(u); }} className={INPUT_SM} />
                    </Field>
                  </div>
                  <div className="grid grid-cols-3 gap-3 items-end">
                    <Field label="Mín USD">
                      <input type="number" value={s.precio_min} onChange={e => { const u=[...servicios]; u[i].precio_min=+e.target.value; setServicios(u); }} className={INPUT_SM} />
                    </Field>
                    <Field label="Máx USD">
                      <input type="number" value={s.precio_max} onChange={e => { const u=[...servicios]; u[i].precio_max=+e.target.value; setServicios(u); }} className={INPUT_SM} />
                    </Field>
                    <button type="button" onClick={() => setServicios(servicios.filter((_, idx) => idx !== i))}
                      className="text-red-400 text-xs font-medium pb-0.5">Eliminar</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => setServicios([...servicios, { nombre: "", descripcion: "", precio_min: 0, precio_max: 0 }])}
                className="text-[#47c4ff] text-sm font-medium">+ Agregar servicio</button>
            </div>
          </Section>

          <Section title="FAQs">
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className="bg-[#0e0e0e] border border-[#484848]/20 rounded-lg p-3 space-y-2">
                  <Field label="Pregunta">
                    <input value={f.pregunta} onChange={e => { const u=[...faqs]; u[i].pregunta=e.target.value; setFaqs(u); }} className={INPUT_SM} />
                  </Field>
                  <div className="flex gap-2 items-start">
                    <div className="flex-1">
                      <Field label="Respuesta">
                        <textarea value={f.respuesta} onChange={e => { const u=[...faqs]; u[i].respuesta=e.target.value; setFaqs(u); }}
                          rows={2} className={`${INPUT_SM} resize-none`} />
                      </Field>
                    </div>
                    <button type="button" onClick={() => setFaqs(faqs.filter((_, idx) => idx !== i))}
                      className="text-red-400 text-xs font-medium mt-6">Eliminar</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => setFaqs([...faqs, { pregunta: "", respuesta: "" }])}
                className="text-[#47c4ff] text-sm font-medium">+ Agregar FAQ</button>
            </div>
          </Section>

          {error && <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">{error}</p>}

          <div className="pb-8">
            <button onClick={saveConfig} disabled={saving}
              className="bg-[#47c4ff] hover:bg-[#05a9e3] disabled:opacity-50 text-black font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors">
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      )}

      {/* ── Tab: Leads ── */}
      {tab === "leads" && (
        <div>
          {leads.length === 0 ? (
            <div className="text-center py-16 bg-[#131313] border border-[#484848]/20 rounded-2xl">
              <p className="text-3xl mb-3">📋</p>
              <p className="text-[#9e9e9e]">Sin leads aún — cuando lleguen mensajes aparecerán acá</p>
            </div>
          ) : (
            <div className="space-y-2">
              {leads.map((lead) => (
                <div key={lead.id} className="bg-[#131313] border border-[#484848]/20 rounded-xl p-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-[#e5e5e5] font-medium text-sm truncate">
                        {lead.full_name ?? `+${lead.wa_phone}`}
                      </p>
                      <span className="text-[#9e9e9e] text-xs">{STATUS_LABELS[lead.status] ?? lead.status}</span>
                    </div>
                    <p className="text-[#9e9e9e] text-xs truncate">
                      {[lead.business_type, lead.service_interest?.join(", "), lead.budget_range].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  {lead.score != null && (
                    <div className="text-center shrink-0">
                      <p className={`font-bold text-sm ${lead.score >= 70 ? "text-emerald-400" : lead.score >= 40 ? "text-amber-400" : "text-[#9e9e9e]"}`}>
                        {lead.score}
                      </p>
                      <p className="text-[#484848] text-[10px]">score</p>
                    </div>
                  )}
                  <p className="text-[#484848] text-xs shrink-0">
                    {new Date(lead.created_at).toLocaleDateString("es-CL")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Tab: Conversations ── */}
      {tab === "conversations" && (
        <div>
          {convs.length === 0 ? (
            <div className="text-center py-16 bg-[#131313] border border-[#484848]/20 rounded-2xl">
              <p className="text-3xl mb-3">💬</p>
              <p className="text-[#9e9e9e]">Sin conversaciones aún</p>
            </div>
          ) : (
            <div className="space-y-2">
              {convs.map((conv) => {
                const stageInfo = STAGE_LABELS[conv.stage] ?? { label: conv.stage, color: "" };
                const lastMsg   = conv.messages?.[conv.messages.length - 1];
                return (
                  <div key={conv.id} className="bg-[#131313] border border-[#484848]/20 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-[#e5e5e5] font-medium text-sm">
                        {conv.display_name ?? `+${conv.wa_phone}`}
                      </p>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${stageInfo.color}`}>
                        {stageInfo.label}
                      </span>
                      <p className="text-[#484848] text-xs ml-auto">
                        {new Date(conv.last_message_at).toLocaleDateString("es-CL", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    {lastMsg && (
                      <p className="text-[#9e9e9e] text-xs truncate">
                        <span className="text-[#484848]">{lastMsg.role === "user" ? "Cliente" : "Charlie"}:</span>{" "}
                        {lastMsg.content?.substring(0, 120)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const INPUT    = "w-full bg-[#1f1f1f] border border-[#484848]/40 rounded-lg px-3 py-2.5 text-[#e5e5e5] text-sm placeholder:text-[#484848] focus:outline-none focus:border-[#47c4ff]/50 transition-colors";
const INPUT_SM = "w-full bg-[#0a0a0a] border border-[#484848]/30 rounded-md px-3 py-2 text-[#e5e5e5] text-sm placeholder:text-[#484848] focus:outline-none focus:border-[#47c4ff]/50 transition-colors";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#131313] border border-[#484848]/20 rounded-2xl p-5">
      <h2 className="text-[#e5e5e5] font-semibold text-sm mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[#9e9e9e] text-[11px] font-medium mb-1.5 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}
