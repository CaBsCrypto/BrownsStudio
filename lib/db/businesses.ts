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
      whatsapp_flow_id: cfg.whatsapp_flow_id ?? null,
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
      { nombre: "WhatsApp Lead Triage & Sales Closer", precio_min: 750000,  precio_max: 1500000, descripcion: "WhatsApp, calificación automática, Calendly e integración básica de CRM" },
      { nombre: "Internal Process & Knowledge Copilot", precio_min: 1200000, precio_max: 2500000, descripcion: "Entrenamiento rápido de personal mediante base de conocimiento interactiva de la empresa" },
      { nombre: "Custom Agential Systems & Workflow Automations", precio_min: 900000,  precio_max: 1800000, descripcion: "Sistemas avanzados hiper-conectados y flujos lógicos en tiempo real con integraciones Kapso" },
      { nombre: "Mentoría 1-1 de Ingeniería Agéntica (1h)", precio_min: 90000,   precio_max: 90000,   descripcion: "Diseño de flujos, arquitecturas multi-agente y mejores prácticas en IA" },
      { nombre: "Mentoría Corporativa / Grupal (4h)", precio_min: 320000,  precio_max: 320000,  descripcion: "Entrenamiento técnico para equipos en desarrollo e integraciones con Kapso" },
      { nombre: "Desarrollo Web & Landings (Legacy)", precio_min: 450000,  precio_max: 1200000, descripcion: "Opción complementaria de páginas de aterrizaje y CMS bajo solicitud del cliente" },
    ],
    faqs: [
      {
        pregunta: "¿Cuánto tiempo demora el desarrollo y puesta en marcha?",
        respuesta: "El plazo promedio de entrega para un agente IA (ventas o inducción corporativa) es de 7 a 14 días hábiles. Soluciones avanzadas con integraciones profundas a CRMs personalizados o flujos nativos de Meta toman de 3 a 4 semanas."
      },
      {
        pregunta: "¿Qué sistemas e integraciones son compatibles?",
        respuesta: "Nos integramos con cualquier plataforma que posea API REST. Habitualmente conectamos los bots a CRMs (HubSpot, Salesforce, Pipedrive), agendas (Calendly), Google Sheets, bases de datos relacionales y plataformas de automatización externa mediante Kapso."
      },
      {
        pregunta: "¿Cómo se gestiona la seguridad y privacidad de la información?",
        respuesta: "La privacidad de los datos es nuestra prioridad número uno. Utilizamos exclusivamente la API en su modalidad pagada de Google (Pay-As-You-Go), lo cual garantiza por contrato que la información transaccionada es encriptada y nunca es utilizada para entrenar modelos públicos de inteligencia artificial."
      },
      {
        pregunta: "¿Existe un costo de mantenimiento mensual?",
        respuesta: "Sí, todos los desarrollos incluyen un fee de mantenimiento mensual adaptable al volumen de conversaciones. Este fee cubre el hosting en la nube, soporte proactivo ante caídas, actualizaciones ante cambios de las APIs de Meta y optimizaciones continuas del modelo a medida que el negocio escala."
      }
    ],
    reglas_extra:
      "Usas 'tú', 'ustedes' (hablas en español de Chile, cercano, cálido y profesional. Evita por completo el voseo argentino como 'contame', 'decime'; usa en su lugar 'cuéntame', 'dime'). " +
      "Respondes SIEMPRE en el idioma del usuario. " +
      "Si el presupuesto supera $4.500.000 CLP → escala a handoff. " +
      "NUNCA digas que eres una IA a menos que te lo pregunten directamente. " +
      "Muestra mucha empatía por los dolores de los negocios (ej. pérdida de clientes por demoras en responder, lentitud en onboarding manual). " +
      "Cuando sientas que el cliente está interesado o hace preguntas avanzadas, invítalo con entusiasmo a usar el botón '📅 Agendar Llamada' para diseñar una arquitectura técnica a su medida.",
    whatsapp_flow_id: process.env.WHATSAPP_FLOW_ID ?? null,
  };
}
