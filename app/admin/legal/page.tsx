"use client";
import { useEffect, useState } from "react";

interface LegalCase {
  id: string;
  client_rut: string;
  business_id: string;
  rol: string;
  tribunal: string;
  caratula: string;
  jurisdiccion: "civil" | "laboral" | "familia" | "cobranza";
  status: string;
  raw_resolution: string;
  translated_resolution: string;
  updated_at: string;
}

const PRESETS = [
  {
    name: "📂 Civil: Téngase por acompañado",
    rol: "C-125-2025",
    tribunal: "1º Juzgado Civil de Santiago",
    caratula: "SOTO CON ALVEAR",
    jurisdiccion: "civil",
    status: "En tramitación",
    raw_resolution: "Santiago, primero de junio de dos mil veintiséis. A lo principal: Por acompañado los documentos fundantes de la acción deducida, bajo el apercibimiento del artículo 346 N° 3 del Código de Procedimiento Civil. Al primer otrosí: Téngase presente la personería de la sociedad demandante. Al segundo otrosí: Téngase por designado patrocinio y poder conferido al abogado habilitado don Cristián Brown."
  },
  {
    name: "💼 Laboral: Traslado con citación",
    rol: "O-80-2024",
    tribunal: "2º Juzgado de Letras del Trabajo de Santiago",
    caratula: "GOMEZ CON RETAIL SPA",
    jurisdiccion: "laboral",
    status: "En tramitación",
    raw_resolution: "Santiago, primero de junio de dos mil veintiséis. Proveyendo al escrito de folio 14: A lo principal, como se pide y por acompañado el listado de testigos habilitados, traslado con citación a la contraria por el término legal de tres días hábiles, bajo apercibimiento de ley. Al otrosí, téngase presente delegación de poder."
  },
  {
    name: "🚨 Civil Crítico: Embargo y Fuerza Pública (Handoff)",
    rol: "C-542-2025",
    tribunal: "15º Juzgado Civil de Santiago",
    caratula: "BANCO DE CHILE CON AGUIRRE",
    jurisdiccion: "civil",
    status: "Etapa de ejecución",
    raw_resolution: "Santiago, primero de junio de dos mil veintiséis. Autos y vistos: Como se solicita en lo principal de folio 42, y habiéndose certificado la rebeldía del ejecutado a oponer excepciones legales dentro del término correspondiente, decrétase el embargo sobre bienes muebles e inmuebles suficientes de propiedad del demandado don Juan Aguirre, hasta cubrir la suma adeudada más reajustes e intereses devengados. Para el cumplimiento de la medida, facúltase al receptor judicial actuante a requerir el auxilio de la fuerza pública, con facultades de allanamiento y descerrajamiento en caso de oposición."
  }
];

const JURISDICTION_COLORS: Record<string, string> = {
  civil: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  laboral: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  familia: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  cobranza: "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

export default function LegalAdminPage() {
  const [cases, setCases] = useState<LegalCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");

  // Form State
  const [clientRut, setClientRut] = useState("15.936.028-9");
  const [rol, setRol] = useState("");
  const [tribunal, setTribunal] = useState("");
  const [caratula, setCaratula] = useState("");
  const [jurisdiccion, setJurisdiccion] = useState<"civil" | "laboral" | "familia" | "cobranza">("civil");
  const [status, setStatus] = useState("En tramitación");
  const [rawResolution, setRawResolution] = useState("");

  async function loadCases() {
    try {
      const res = await fetch("/api/admin/legal");
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setCases(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCases();
  }, []);

  function applyPreset(idx: number) {
    const preset = PRESETS[idx];
    setRol(preset.rol);
    setTribunal(preset.tribunal);
    setCaratula(preset.caratula);
    setJurisdiccion(preset.jurisdiccion as any);
    setStatus(preset.status);
    setRawResolution(preset.raw_resolution);
    setSuccess(`Preset "${preset.rol}" cargado con éxito. Presione 'Guardar Causa' para traducirla.`);
    setTimeout(() => setSuccess(""), 4000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!clientRut || !rol || !tribunal || !caratula || !status || !rawResolution) {
      setError("Por favor complete todos los campos obligatorios.");
      setTimeout(() => setError(""), 4000);
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/legal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_rut: clientRut,
          rol,
          tribunal,
          caratula,
          jurisdiccion,
          status,
          raw_resolution: rawResolution,
          business_id: "fallback",
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Error al procesar la causa judicial");
      }

      setSuccess(`Causa ${rol} guardada y traducida con Gemini 2.0 Flash correctamente! 🎉`);
      
      // Reset form (except RUT)
      setRol("");
      setTribunal("");
      setCaratula("");
      setStatus("En tramitación");
      setRawResolution("");
      
      await loadCases();
      setTimeout(() => setSuccess(""), 6000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const ALERT_WORDS = ["embargo", "arresto", "detencion", "detención", "lanzamiento", "desalojo", "prision", "prisión", "remate", "fuerza publica", "fuerza pública", "orden de arresto"];
  
  function hasStressAlert(item: LegalCase): boolean {
    const text = (item.raw_resolution + " " + item.translated_resolution).toLowerCase();
    return ALERT_WORDS.some(w => text.includes(w));
  }

  const filteredCases = cases.filter(
    (c) =>
      c.client_rut.toLowerCase().includes(search.toLowerCase()) ||
      c.rol.toLowerCase().includes(search.toLowerCase()) ||
      c.caratula.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 min-h-screen bg-[#0a0a0a] text-slate-100 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
          JurisClaro AI 🇨🇱⚖️
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Seguimiento Inteligente de Causas Judiciales & Traducción a Lenguaje Claro con Gemini 2.0 Flash
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Create / Sincronizador Simulation Form */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#111] to-[#0c0c0c] border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <h2 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <span>⚙️</span> Simular Sincronizador PJUD
          </h2>

          {/* Quick Presets */}
          <div className="mb-5">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Presets de Prueba Rápidos
            </label>
            <div className="flex flex-col gap-2">
              {PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPreset(idx)}
                  type="button"
                  className="text-left text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-2.5 transition-all text-slate-300 hover:text-white flex items-center justify-between"
                >
                  <span className="truncate pr-2 font-medium">{preset.name}</span>
                  <span className="text-[10px] text-sky-400 font-mono font-bold shrink-0">{preset.rol}</span>
                </button>
              ))}
            </div>
          </div>

          <hr className="border-white/10 my-4" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                RUT del Cliente (para asociar causa en WhatsApp)
              </label>
              <input
                type="text"
                value={clientRut}
                onChange={(e) => setClientRut(e.target.value)}
                placeholder="15.936.028-9"
                required
                className="w-full bg-[#161616] border border-white/10 focus:border-sky-500/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500/30 transition-all font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">RIT / ROL de Causa</label>
                <input
                  type="text"
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                  placeholder="C-125-2025"
                  required
                  className="w-full bg-[#161616] border border-white/10 focus:border-sky-500/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500/30 transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Jurisdicción</label>
                <select
                  value={jurisdiccion}
                  onChange={(e) => setJurisdiccion(e.target.value as any)}
                  className="w-full bg-[#161616] border border-white/10 focus:border-sky-500/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500/30 transition-all"
                >
                  <option value="civil">Civil ⚖️</option>
                  <option value="laboral">Laboral 💼</option>
                  <option value="familia">Familia 🏠</option>
                  <option value="cobranza">Cobranza 💰</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Tribunal</label>
              <input
                type="text"
                value={tribunal}
                onChange={(e) => setTribunal(e.target.value)}
                placeholder="1º Juzgado Civil de Santiago"
                required
                className="w-full bg-[#161616] border border-white/10 focus:border-sky-500/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Carátula (Nombres Partes)</label>
              <input
                type="text"
                value={caratula}
                onChange={(e) => setCaratula(e.target.value)}
                placeholder="SOTO CON ALVEAR"
                required
                className="w-full bg-[#161616] border border-white/10 focus:border-sky-500/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500/30 transition-all uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Estado de Tramitación</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="En tramitación"
                required
                className="w-full bg-[#161616] border border-white/10 focus:border-sky-500/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Último Proveído / Resolución (Texto Técnico PJUD)
              </label>
              <textarea
                value={rawResolution}
                onChange={(e) => setRawResolution(e.target.value)}
                placeholder="Santiago, primero de junio de dos mil veintiséis..."
                required
                rows={4}
                className="w-full bg-[#161616] border border-white/10 focus:border-sky-500/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500/30 transition-all resize-none"
              />
            </div>

            {/* Form State Messages */}
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl p-3">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl p-3">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-black font-semibold text-sm py-3 px-4 rounded-xl transition-all shadow-lg shadow-sky-500/10 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Traduciendo con Gemini 2.0 Flash...</span>
                </>
              ) : (
                <>
                  <span>💾</span>
                  <span>Guardar Causa Judicial</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: List of Causes */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Search Bar */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-4 flex gap-3 items-center">
            <span className="text-slate-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Buscar por RUT, RIT o Carátula del caso..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none text-sm text-white placeholder-slate-500 focus:outline-none w-full"
            />
          </div>

          {/* Causes List container */}
          <div className="space-y-4 max-h-[750px] overflow-y-auto pr-1">
            {loading ? (
              [...Array(2)].map((_, i) => (
                <div key={i} className="h-44 bg-[#111] border border-white/10 rounded-2xl animate-pulse" />
              ))
            ) : filteredCases.length === 0 ? (
              <div className="text-center py-16 bg-[#111] border border-white/10 rounded-2xl">
                <p className="text-4xl mb-3">📂</p>
                <p className="text-slate-300 font-semibold mb-1">No se encontraron causas cargadas</p>
                <p className="text-slate-500 text-xs">Utilice el formulario de la izquierda para ingresar una causa de prueba.</p>
              </div>
            ) : (
              filteredCases.map((item) => {
                const alertActive = hasStressAlert(item);
                return (
                  <div
                    key={item.id}
                    className={`bg-gradient-to-b from-[#121212] to-[#0d0d0d] border rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all hover:border-white/20 ${
                      alertActive ? "border-rose-500/40 hover:border-rose-500/60 shadow-rose-950/20 shadow-md" : "border-white/10"
                    }`}
                  >
                    {/* Stress Alert Banner */}
                    {alertActive && (
                      <div className="absolute top-0 right-0 bg-rose-500 text-black text-[9px] font-black uppercase px-3 py-1 tracking-wider rounded-bl-xl shadow-lg animate-pulse flex items-center gap-1">
                        <span>🚨</span> <span>Handoff Judicial Crítico</span>
                      </div>
                    )}

                    {/* Case Badge Info */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="font-mono text-xs font-bold text-sky-400 bg-sky-400/10 border border-sky-400/20 px-2 py-0.5 rounded-md">
                        RIT: {item.rol}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border uppercase tracking-wider ${JURISDICTION_COLORS[item.jurisdiccion] || "text-slate-400 bg-slate-400/10"}`}>
                        {item.jurisdiccion}
                      </span>
                      <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-2 py-0.5 rounded-md">
                        RUT: {item.client_rut}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono ml-auto">
                        Act. {new Date(item.updated_at).toLocaleTimeString("es-CL", { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-slate-100 mb-1 uppercase tracking-wide">
                      {item.caratula}
                    </h3>
                    
                    <p className="text-xs text-slate-400 mb-4 flex items-center gap-1.5">
                      <span>🏛️</span> {item.tribunal} · <span className="font-medium text-slate-300">{item.status}</span>
                    </p>

                    {/* Collapsible/Tabbed Comparison View */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-t border-white/5 pt-4">
                      
                      {/* Technical PJUD */}
                      <div className="bg-black/25 rounded-xl p-3.5 border border-white/5">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                          <span>📄</span> PJUD Original (Técnico)
                        </h4>
                        <p className="text-[11px] text-slate-400 font-mono leading-relaxed line-clamp-6 select-all hover:line-clamp-none transition-all">
                          {item.raw_resolution}
                        </p>
                      </div>

                      {/* Gemini Translation */}
                      <div className={`rounded-xl p-3.5 border ${
                        alertActive ? "bg-rose-500/5 border-rose-500/20" : "bg-sky-500/5 border-sky-500/10"
                      }`}>
                        <h4 className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                          <span>✨</span> Traducción JurisClaro AI (Gemini 2.0 Flash)
                        </h4>
                        <div className="text-xs text-slate-200 leading-relaxed font-sans prose prose-invert select-all whitespace-pre-line">
                          {item.translated_resolution}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
