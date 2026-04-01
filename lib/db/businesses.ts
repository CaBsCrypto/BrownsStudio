// ── Business + BusinessConfig CRUD ───────────────────────────────────────────
import { getSupabaseClient } from "./client";
import type { Business, BusinessConfig } from "@/types/bot";

/**
 * Look up an active business by its Meta phone_number_id.
 * Returns null if not found or inactive.
 */
export async function getBusinessByPhoneId(
  phoneNumberId: string
): Promise<Business | null> {
  try {
    const db = getSupabaseClient();
    const { data, error } = await db
      .from("businesses")
      .select("*")
      .eq("wa_phone_number_id", phoneNumberId)
      .eq("is_active", true)
      .single();

    if (error || !data) return null;
    return data as Business;
  } catch {
    return null;
  }
}

/**
 * Load the full config for a business, joining with businesses table for name/rubro.
 * Returns null if not found.
 */
export async function getBusinessConfig(
  businessId: string
): Promise<BusinessConfig | null> {
  try {
    const db = getSupabaseClient();
    const { data, error } = await db
      .from("business_configs")
      .select(`
        *,
        businesses (
          nombre,
          rubro
        )
      `)
      .eq("business_id", businessId)
      .single();

    if (error || !data) return null;

    const biz = (data as any).businesses;

    return {
      id: data.id,
      business_id: data.business_id,
      nombre_negocio: biz?.nombre ?? "Browns Studio",
      rubro: biz?.rubro ?? null,
      nombre_bot: data.nombre_bot ?? "Charlie",
      tono: data.tono ?? "profesional y cercano",
      horario: data.horario ?? "Lunes a Viernes 9am-6pm",
      calendly_url: data.calendly_url ?? null,
      handoff_phone: data.handoff_phone ?? null,
      servicios: data.servicios ?? [],
      faqs: data.faqs ?? [],
      reglas_extra: data.reglas_extra ?? null,
    } as BusinessConfig;
  } catch {
    return null;
  }
}

/**
 * Build a fallback BusinessConfig from environment variables.
 * Used when the businesses table doesn't exist yet or the phone_number_id isn't registered.
 */
export function getFallbackBusinessConfig(): BusinessConfig {
  return {
    id: "fallback",
    business_id: "fallback",
    nombre_negocio: "Browns Studio",
    rubro: "Agencia de desarrollo web e IA",
    nombre_bot: "Charlie",
    tono: "profesional pero cercano y cálido, lenguaje latinoamericano",
    horario: "Lunes a Viernes 9am-6pm",
    calendly_url: process.env.CALENDLY_URL ?? "https://calendly.com/brownsstudio/consulta",
    handoff_phone: process.env.HANDOFF_NOTIFICATION_PHONE ?? null,
    servicios: [
      { nombre: "Landing Page Starter",  precio_min: 500,  precio_max: 900,  descripcion: "1 página, diseño premium, SEO básico" },
      { nombre: "Landing Page Pro",       precio_min: 1200, precio_max: 2500, descripcion: "Multi-sección, animaciones, CMS" },
      { nombre: "Bot IA Básico",          precio_min: 800,  precio_max: 1500, descripcion: "WhatsApp/Discord, FAQ, calificación de leads" },
      { nombre: "Bot IA Avanzado",        precio_min: 2000, precio_max: 4000, descripcion: "RAG, memoria, integración CRM, multi-canal" },
      { nombre: "Mentoría 1-1 (1h)",      precio_min: 80,   precio_max: 80   },
      { nombre: "Pack Mentoría (4h)",     precio_min: 280,  precio_max: 280  },
    ],
    faqs: [],
    reglas_extra:
      "Usás 'vos', 'ustedes', 'che' con moderación. " +
      "Respondés SIEMPRE en el idioma del usuario (español o inglés). " +
      "Si el presupuesto supera $5.000 USD → escalá a handoff (cliente enterprise). " +
      "NUNCA digas que sos una IA a menos que te lo pregunten directamente.",
  };
}
