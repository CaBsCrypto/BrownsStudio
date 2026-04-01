// ── Firebase Admin SDK — Firestore client ─────────────────────────────────────
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let _db: Firestore | null = null;

export function getFirestoreClient(): Firestore {
  if (_db) return _db;

  const projectId   = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey  = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase env vars: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY\n" +
      "Obtené estas credenciales en Firebase Console → Project Settings → Service Accounts → Generate new private key"
    );
  }

  if (!getApps().length) {
    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  }

  _db = getFirestore();
  return _db;
}

// Alias para no romper imports existentes en admin routes
export const getSupabaseClient = getFirestoreClient;
