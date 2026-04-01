// ── Admin API — leads by business (Firestore) ─────────────────────────────────
import { NextResponse } from "next/server";
import { getFirestoreClient } from "@/lib/db/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get("business_id");

    const db = getFirestoreClient();
    let query = db.collection("leads").orderBy("created_at", "desc").limit(100);
    if (businessId) query = query.where("business_id", "==", businessId) as any;

    const snap = await query.get();
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
