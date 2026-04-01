// ── Admin API — single business CRUD ─────────────────────────────────────────
import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/db/client";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = getSupabaseClient();

    const { data: biz, error } = await db
      .from("businesses")
      .select("*, business_configs(*)")
      .eq("id", id)
      .single();

    if (error || !biz) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

    return NextResponse.json(biz);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = getSupabaseClient();
    const body = await request.json();

    const { config, ...bizFields } = body;

    // Update businesses table (only provided fields)
    if (Object.keys(bizFields).length > 0) {
      const { error } = await db.from("businesses").update(bizFields).eq("id", id);
      if (error) throw error;
    }

    // Update business_configs table (only provided fields)
    if (config && Object.keys(config).length > 0) {
      const { error } = await db
        .from("business_configs")
        .update({ ...config, updated_at: new Date().toISOString() })
        .eq("business_id", id);
      if (error) throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = getSupabaseClient();
    const { error } = await db.from("businesses").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
