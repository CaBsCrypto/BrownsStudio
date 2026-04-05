// ── Admin API — businesses CRUD (Firestore) ───────────────────────────────────
import { NextResponse } from "next/server";
import { getFirestoreClient } from "@/lib/db/client";

const COL = "businesses";

export async function GET() {
  try {
    const db   = getFirestoreClient();
    const snap = await db.collection(COL).orderBy("created_at", "desc").get();

    const businesses = await Promise.all(
      snap.docs.map(async (doc) => {
        const data = doc.data();

        const [convSnap, leadSnap] = await Promise.all([
          db.collection("conversations").where("business_id", "==", doc.id).count().get(),
          db.collection("leads").where("business_id", "==", doc.id).count().get(),
        ]);

        return {
          id: doc.id,
          ...data,
          conversation_count: convSnap.data().count,
          lead_count:         leadSnap.data().count,
        };
      })
    );

    return NextResponse.json(businesses);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db   = getFirestoreClient();
    const body = await request.json();

    const { nombre, rubro, wa_phone_number_id, wa_access_token, gemini_api_key, plan, config } = body;

    const now = new Date().toISOString();
    const ref = await db.collection(COL).add({
      nombre,
      rubro:              rubro   ?? null,
      wa_phone_number_id,
      wa_access_token:    wa_access_token  ?? null,
      gemini_api_key:     gemini_api_key   ?? null,
      is_active:          true,
      plan:               plan ?? "starter",
      created_at:         now,
      config: {
        nombre_bot:    config?.nombre_bot    ?? "Charlie",
        tono:          config?.tono          ?? "profesional y cercano",
        horario:       config?.horario       ?? "Lunes a Viernes 9am-6pm",
        calendly_url:  config?.calendly_url  ?? null,
        handoff_phone: config?.handoff_phone ?? null,
        servicios:     config?.servicios     ?? [],
        faqs:          config?.faqs          ?? [],
        reglas_extra:  config?.reglas_extra  ?? null,
        updated_at:    now,
      },
    });

    return NextResponse.json({ id: ref.id }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
