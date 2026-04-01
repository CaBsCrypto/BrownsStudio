// ── Admin API — conversations by business ─────────────────────────────────────
import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/db/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get("business_id");

    const db = getSupabaseClient();
    let query = db
      .from("conversations")
      .select("id, wa_phone, display_name, stage, last_message_at, created_at, messages")
      .order("last_message_at", { ascending: false })
      .limit(50);

    if (businessId) query = query.eq("business_id", businessId);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json(data ?? []);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
