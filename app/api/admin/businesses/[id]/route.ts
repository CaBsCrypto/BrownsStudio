// ── Admin API — single business (Firestore) ───────────────────────────────────
import { NextResponse } from "next/server";
import { getFirestoreClient } from "@/lib/db/client";

const COL = "businesses";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db     = getFirestoreClient();
    const snap   = await db.collection(COL).doc(id).get();

    if (!snap.exists) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

    // Shape to match what the UI expects (business_configs array for compat)
    const data = snap.data()!;
    return NextResponse.json({
      id:              snap.id,
      ...data,
      business_configs: [data.config ?? {}],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db     = getFirestoreClient();
    const body   = await request.json();

    const { config, ...bizFields } = body;
    const update: Record<string, any> = { ...bizFields };

    // Merge config fields under the nested "config" key
    if (config) {
      const snap = await db.collection(COL).doc(id).get();
      const existing = snap.data()?.config ?? {};
      update.config = { ...existing, ...config, updated_at: new Date().toISOString() };
    }

    await db.collection(COL).doc(id).update(update);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db     = getFirestoreClient();
    await db.collection(COL).doc(id).delete();
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
