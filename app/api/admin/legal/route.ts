// ── Admin API — Legal Cases CRUD ─────────────────────────────────────────────
import { NextResponse } from "next/server";
import { getAllLegalCases, upsertLegalCase } from "@/lib/db/legal";
import { translateResolutionWithGemini } from "@/lib/ai/legalTranslator";

/**
 * GET: Retrieve all judicial cases.
 */
export async function GET() {
  try {
    const cases = await getAllLegalCases();
    return NextResponse.json(cases);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * POST: Create or update a legal case. Gatilla la traducción semántica en caliente de Gemini.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      client_rut,
      rol,
      tribunal,
      caratula,
      jurisdiccion,
      status,
      raw_resolution,
      business_id,
    } = body;

    // Validate inputs
    if (!client_rut || !rol || !tribunal || !caratula || !jurisdiccion || !status || !raw_resolution) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios en el formulario de la causa." },
        { status: 400 }
      );
    }

    const bid = business_id || "fallback";
    // Sanitize case ID: fallback_C-125-2025
    const cleanRol = rol.trim().toUpperCase();
    const caseId = `${bid}_${cleanRol}`;

    // 1. Run Gemini Legal translation
    console.log(`[legal-api] Triggering Gemini 2.0 translation for case ROL ${cleanRol}...`);
    const translated = await translateResolutionWithGemini(raw_resolution, jurisdiccion);

    // 2. Save/Upsert case in Firestore
    const newCase = await upsertLegalCase({
      id: caseId,
      client_rut: client_rut.trim(),
      business_id: bid,
      rol: cleanRol,
      tribunal: tribunal.trim(),
      caratula: caratula.trim(),
      jurisdiccion,
      status: status.trim(),
      raw_resolution: raw_resolution.trim(),
      translated_resolution: translated,
    });

    console.log(`[legal-api] Successfully saved case ${caseId} with translated resolution.`);
    return NextResponse.json(newCase);
  } catch (err: any) {
    console.error("[legal-api] Error processing legal case:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
