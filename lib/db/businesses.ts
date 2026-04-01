// ── Businesses CRUD — Firestore ───────────────────────────────────────────────
// Modelo: config está embebida en el mismo documento del negocio
// businesses/{id} → { ...bizFields, config: { ...configFields } }
import { getFirestoreClient } from "./client";
import type { Business, BusinessConfig } from "@/types/bot";

const COL = "businesses";

export async function getBusinessByPhoneId(phoneNumberId: string): Promise<Business | null> {
  try {
    const db   = getFirestoreClient();
    const snap = await db
      .collection(COL)
      .where("wa_phone_number_id", "==", phoneNumberId)
      .where("is_active", "==", true)
      .limit(1)
      .get();

    if (snap.empty) return null;
    const doc = snap.docs[0];
    return { id: doc.id, ...doc.data() } as Business;
  } catch {
    return null;
  }
}

export async function getBusinessConfig(businessId: string): Promise<BusinessConfig | null> {
  try {
    const db   = getFirestoreClient();
    const snap = await db.collection(COL).doc(businessId).get();
    if (!snap.exists) return null;

    const data = snap.data()!;
    const cfg  = data.config ?? {};

    return {
      id:             snap.id,
      business_id:    snap.id,
      nombre_negocio: data.nombre      ?? "Browns Studio",
      rubro:          data.rubro       ?? null,
      nombre_bot:     cfg.nombre_bot   ?? "Charlie",
      tono:           cfg.tono         ?? "profesional y cercano",
      horario:        cfg.horario      ?? "Lunes a Viernes 9am-6pm",
      calendly_url:   cfg.calendly_url ?? null,
      handoff_phone:  cfg.handoff_phone?? null,
      servicios:      cfg.servicios    ?? [],
      faqs:           cfg.faqs         ?? [],
      reglas_extra:   cfg.reglas_extra ?? null,
    } as BusinessConfig;
  } catch {
    return null;
  }
}

export function getFallbackBusinessConfig(): BusinessConfig {
  return {
    id:             "fallback",
    business_id:    "fallback",
    nombre_negocio: "Browns Studio",
    rubro:          "Agencia de desarrollo web e IA",
    nombre_bot:     "Charlie",
    tono:           "profesional pero cercano y cálido, lenguaje latinoamericano",
    horario:        "Lunes a Viernes 9am-6pm",
    calendly_url:   process.env.CALENDLY_URL ?? "https://calendly.com/brownsstudio/consulta",
    handoff_phone:  process.env.HANDOFF_NOTIFICATION_PHONE ?? null,
    servicios: [
      { nombre: "Landing Page Starter",  precio_min: 500,  precio_max: 900,  descripcion: "1 página, diseño premium, SEO básico" },
      { nombre: "Landing Page Pro",       precio_min: 1200, precio_max: 2500, descripcion: "Multi-sección, animaciones, CMS" },
      { nombre: "Bot IA Básico",          precio_min: 800,  precio_max: 1500, descripcion: "WhatsApp, FAQ, calificación de leads" },
      { nombre: "Bot IA Avanzado",        precio_min: 2000, precio_max: 4000, descripcion: "RAG, memoria, integración CRM" },
      { nombre: "Mentoría 1-1 (1h)",      precio_min: 80,   precio_max: 80   },
      { nombre: "Pack Mentoría (4h)",     precio_min: 280,  precio_max: 280  },
    ],
    faqs: [],
    reglas_extra:
      "Usás 'vos', 'ustedes'. Respondés SIEMPRE en el idioma del usuario. " +
      "Si el presupuesto supera $5.000 USD → escalá a handoff. " +
      "NUNCA digas que sos una IA a menos que te lo pregunten directamente.",
  };
}
