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
      handoff_phone:  cfg.handoff_phone ?? null,
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
    rubro:          "Estudio de automatización de procesos, onboarding y consultoría en ingeniería agéntica",
    nombre_bot:     "Charlie",
    tono:           "profesional pero cercano y cálido, lenguaje latinoamericano",
    horario:        "Lunes a Viernes 9am-6pm",
    calendly_url:   process.env.CALENDLY_URL ?? "https://calendly.com/brownsstudio/consulta",
    handoff_phone:  process.env.HANDOFF_NOTIFICATION_PHONE ?? null,
    servicios: [
      { nombre: "Agente IA de Ventas",    precio_min: 750000,  precio_max: 1500000, descripcion: "WhatsApp, calificación automática, Calendly e integración básica de CRM" },
      { nombre: "Agente IA de Onboarding", precio_min: 1200000, precio_max: 2500000, descripcion: "Entrenamiento rápido de personal mediante base de conocimiento interactiva de la empresa" },
      { nombre: "Flujos Nativos (WhatsApp Flows)", precio_min: 900000,  precio_max: 1800000, descripcion: "Formularios interactivos nativos de WhatsApp, encuestas avanzadas e integraciones Kapso" },
      { nombre: "Mentoría 1-1 de Ingeniería Agéntica (1h)", precio_min: 90000,   precio_max: 90000,   descripcion: "Diseño de flujos, arquitecturas multi-agente y mejores prácticas en IA" },
      { nombre: "Mentoría Corporativa / Grupal (4h)", precio_min: 320000,  precio_max: 320000,  descripcion: "Entrenamiento técnico para equipos en desarrollo e integraciones con Kapso" },
      { nombre: "Desarrollo Web & Landings (Legacy)", precio_min: 450000,  precio_max: 1200000, descripcion: "Opción complementaria de páginas de aterrizaje y CMS bajo solicitud del cliente" },
    ],
    faqs: [],
    reglas_extra:
      "Usas 'tú', 'ustedes' (hablas en español de Chile, cercano, cálido y profesional. Evita por completo el voseo argentino como 'contame', 'decime'; usa en su lugar 'cuéntame', 'dime'). " +
      "Respondes SIEMPRE en el idioma del usuario. " +
      "Si el presupuesto supera $4.500.000 CLP → escala a handoff. " +
      "NUNCA digas que eres una IA a menos que te lo pregunten directamente.",
  };
}
