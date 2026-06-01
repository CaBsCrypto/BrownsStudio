// ── Legal Cases & Clients CRUD — Firestore ────────────────────────────────────
import { getFirestoreClient } from "./client";
import type { LegalClient, LegalCase } from "@/types/legal";

const CLIENTS_COL = "legal_clients";
const CASES_COL = "legal_cases";

/**
 * Get a legal client by their WhatsApp phone number.
 */
export async function getLegalClient(phone: string): Promise<LegalClient | null> {
  const db = getFirestoreClient();
  const ref = db.collection(CLIENTS_COL).doc(phone);
  const snap = await ref.get();
  if (!snap.exists) return null;
  return { id: phone, ...snap.data() } as LegalClient;
}

/**
 * Register or update a legal client (mapping phone to RUT).
 */
export async function registerLegalClient(data: Omit<LegalClient, "created_at">): Promise<LegalClient> {
  const db = getFirestoreClient();
  const ref = db.collection(CLIENTS_COL).doc(data.id);
  const now = new Date().toISOString();
  
  const clientData = {
    ...data,
    created_at: now,
  };
  
  await ref.set(clientData, { merge: true });
  return { ...clientData } as LegalClient;
}

/**
 * Retrieve all active legal cases owned by a client's RUT.
 */
export async function getCasesByRut(rut: string): Promise<LegalCase[]> {
  const db = getFirestoreClient();
  const snap = await db.collection(CASES_COL)
    .where("client_rut", "==", rut)
    .get();
  
  const cases: LegalCase[] = [];
  snap.forEach((doc) => {
    cases.push({ id: doc.id, ...doc.data() } as LegalCase);
  });
  return cases;
}

/**
 * Retrieve all cases across all clients (useful for the admin portal).
 */
export async function getAllLegalCases(): Promise<LegalCase[]> {
  const db = getFirestoreClient();
  const snap = await db.collection(CASES_COL).get();
  
  const cases: LegalCase[] = [];
  snap.forEach((doc) => {
    cases.push({ id: doc.id, ...doc.data() } as LegalCase);
  });
  return cases;
}

/**
 * Create or update a legal case.
 */
export async function upsertLegalCase(data: Omit<LegalCase, "updated_at">): Promise<LegalCase> {
  const db = getFirestoreClient();
  const ref = db.collection(CASES_COL).doc(data.id);
  const now = new Date().toISOString();
  
  const caseData = {
    ...data,
    updated_at: now,
  };
  
  await ref.set(caseData, { merge: true });
  return { ...caseData } as LegalCase;
}
