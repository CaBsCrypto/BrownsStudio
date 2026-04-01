"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Business {
  id: string;
  nombre: string;
  rubro: string | null;
  wa_phone_number_id: string;
  is_active: boolean;
  plan: string;
  created_at: string;
  conversation_count: number;
  lead_count: number;
  business_configs?: { nombre_bot: string; horario: string }[];
}

const PLAN_COLORS: Record<string, string> = {
  starter: "text-[#9e9e9e] bg-[#9e9e9e]/10 border-[#9e9e9e]/20",
  pro:     "text-[#47c4ff] bg-[#47c4ff]/10 border-[#47c4ff]/20",
  enterprise: "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");

  async function load() {
    try {
      const res = await fetch("/api/admin/businesses");
      if (!res.ok) throw new Error(await res.text());
      setBusinesses(await res.json());
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function toggleActive(id: string, current: boolean) {
    await fetch(`/api/admin/businesses/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !current }),
    });
    load();
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#e5e5e5] text-2xl font-semibold">Negocios</h1>
          <p className="text-[#9e9e9e] text-sm mt-1">Gestioná todos los bots de Charlie</p>
        </div>
        <Link
          href="/admin/businesses/new"
          className="flex items-center gap-2 bg-[#47c4ff] hover:bg-[#05a9e3] text-black font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors"
        >
          <span>+</span> Nuevo negocio
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 bg-red-400/10 border border-red-400/20 rounded-xl p-4">
          <p className="text-red-400 text-sm font-medium">Error cargando datos</p>
          <p className="text-red-400/70 text-xs mt-1">{error}</p>
          <p className="text-[#9e9e9e] text-xs mt-2">
            ¿Ya ejecutaste el SQL schema de multi-negocio en Supabase?
          </p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-[#131313] border border-[#484848]/20 rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && businesses.length === 0 && (
        <div className="text-center py-20 bg-[#131313] border border-[#484848]/20 rounded-2xl">
          <p className="text-5xl mb-4">🤖</p>
          <p className="text-[#e5e5e5] font-semibold mb-1">Ningún bot configurado aún</p>
          <p className="text-[#9e9e9e] text-sm mb-6">Creá tu primer negocio para activar a Charlie</p>
          <Link
            href="/admin/businesses/new"
            className="inline-flex items-center gap-2 bg-[#47c4ff] hover:bg-[#05a9e3] text-black font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            <span>+</span> Crear primer negocio
          </Link>
        </div>
      )}

      {/* List */}
      {!loading && businesses.length > 0 && (
        <div className="space-y-3">
          {businesses.map((biz) => {
            const config = biz.business_configs?.[0];
            return (
              <div
                key={biz.id}
                className="bg-[#131313] border border-[#484848]/20 rounded-xl p-5 flex items-center gap-4 hover:border-[#484848]/40 transition-colors"
              >
                {/* Status dot */}
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${biz.is_active ? "bg-emerald-400" : "bg-[#484848]"}`} />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-[#e5e5e5] font-semibold truncate">{biz.nombre}</p>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border uppercase tracking-wider ${PLAN_COLORS[biz.plan] ?? PLAN_COLORS.starter}`}>
                      {biz.plan}
                    </span>
                  </div>
                  <p className="text-[#9e9e9e] text-xs truncate">
                    {biz.rubro ?? "Sin rubro"} · Bot: {config?.nombre_bot ?? "Charlie"}
                  </p>
                </div>

                {/* Stats */}
                <div className="hidden sm:flex items-center gap-6 shrink-0">
                  <div className="text-center">
                    <p className="text-[#e5e5e5] font-semibold text-sm">{biz.conversation_count}</p>
                    <p className="text-[#9e9e9e] text-[10px]">Conversaciones</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#e5e5e5] font-semibold text-sm">{biz.lead_count}</p>
                    <p className="text-[#9e9e9e] text-[10px]">Leads</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleActive(biz.id, biz.is_active)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                      biz.is_active
                        ? "text-red-400 border-red-400/20 hover:bg-red-400/10"
                        : "text-emerald-400 border-emerald-400/20 hover:bg-emerald-400/10"
                    }`}
                  >
                    {biz.is_active ? "Pausar" : "Activar"}
                  </button>
                  <Link
                    href={`/admin/businesses/${biz.id}`}
                    className="text-xs px-3 py-1.5 rounded-lg border border-[#484848]/40 text-[#9e9e9e] hover:text-[#47c4ff] hover:border-[#47c4ff]/30 font-medium transition-colors"
                  >
                    Ver →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
