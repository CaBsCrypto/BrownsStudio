// ── Admin API — businesses CRUD ───────────────────────────────────────────────
import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/db/client";

export async function GET() {
  try {
    const db = getSupabaseClient();
    const { data, error } = await db
      .from("businesses")
      .select(`
        *,
        business_configs ( nombre_bot, tono, horario, calendly_url, handoff_phone )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Enrich with conversation + lead counts
    const enriched = await Promise.all(
      (data ?? []).map(async (biz: any) => {
        const [convResult, leadResult] = await Promise.all([
          db.from("conversations").select("id", { count: "exact" }).eq("business_id", biz.id),
          db.from("leads").select("id", { count: "exact" }).eq("business_id", biz.id),
        ]);
        return {
          ...biz,
          conversation_count: convResult.count ?? 0,
          lead_count: leadResult.count ?? 0,
        };
      })
    );

    return NextResponse.json(enriched);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = getSupabaseClient();
    const body = await request.json();

    const { nombre, rubro, wa_phone_number_id, wa_access_token, gemini_api_key, plan, config } = body;

    // 1. Create business
    const { data: biz, error: bizError } = await db
      .from("businesses")
      .insert({ nombre, rubro, wa_phone_number_id, wa_access_token, gemini_api_key, plan: plan ?? "starter" })
      .select()
      .single();

    if (bizError || !biz) throw new Error(bizError?.message ?? "Error creando negocio");

    // 2. Create config
    const { error: configError } = await db.from("business_configs").insert({
      business_id: biz.id,
      nombre_bot:   config?.nombre_bot   ?? "Charlie",
      tono:         config?.tono         ?? "profesional y cercano",
      horario:      config?.horario      ?? "Lunes a Viernes 9am-6pm",
      calendly_url: config?.calendly_url ?? null,
      handoff_phone:config?.handoff_phone?? null,
      servicios:    config?.servicios    ?? [],
      faqs:         config?.faqs         ?? [],
      reglas_extra: config?.reglas_extra ?? null,
    });

    if (configError) throw new Error(configError.message);

    return NextResponse.json({ id: biz.id }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
