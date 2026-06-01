// Shared TypeScript interfaces for JurisClaro AI - Judicial Cause Tracking Bot 🇨🇱⚖️

export interface LegalClient {
  id: string;             // wa_phone (Ej: "56961857682")
  rut: string;            // RUT formateado (Ej: "15.936.028-9")
  full_name: string;      // Nombre completo del cliente
  email: string | null;   // Correo para notificaciones
  created_at: string;     // ISO 8601
}

export interface LegalCase {
  id: string;                 // ${businessId}_${rit/rol} (Ej: "fallback_C-125-2025")
  client_rut: string;         // RUT del cliente dueño (Llave foránea)
  business_id: string;        // ID de la firma jurídica
  rol: string;                // RIT/ROL de la causa (Ej: "C-125-2025")
  tribunal: string;           // Nombre del tribunal (Ej: "1º Juzgado Civil de Santiago")
  caratula: string;           // Título (Ej: "PEREZ CON GONZALEZ")
  jurisdiccion: "civil" | "laboral" | "familia" | "cobranza";
  status: string;             // Estado general (Ej: "En tramitación")
  raw_resolution: string;     // Texto técnico original del PJUD
  translated_resolution: string; // Explicación humana simplificada generada por Gemini
  updated_at: string;         // Fecha de sincronización o actualización
}
