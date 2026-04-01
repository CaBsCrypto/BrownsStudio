// ── Shared TypeScript interfaces for the Browns Studio WhatsApp bot ──────────

export type ConversationStage =
  | "greeting"
  | "qualifying"
  | "scheduling"
  | "closing"
  | "handoff"
  | "closed";

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal_sent"
  | "won"
  | "lost"
  | "nurture";

export interface BotMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string; // ISO 8601
}

export interface Conversation {
  id: string;
  wa_phone: string;
  display_name: string | null;
  messages: BotMessage[];
  stage: ConversationStage;
  last_message_at: string;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  conversation_id: string;
  wa_phone: string;
  full_name: string | null;
  business_type: string | null;
  budget_range: string | null;
  budget_numeric: number | null;
  urgency: string | null;
  service_interest: string[] | null;
  pain_point: string | null;
  calendly_sent: boolean;
  package_discussed: string | null;
  status: LeadStatus;
  score: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExtractedLeadData {
  full_name?: string;
  business_type?: string;
  budget_range?: string;
  budget_numeric?: number;
  urgency?: string;
  service_interest?: string[];
  pain_point?: string;
}

// ── Multi-business types ──────────────────────────────────────────────────────

export interface Business {
  id: string;
  nombre: string;
  rubro: string | null;
  wa_phone_number_id: string;
  wa_access_token: string | null;
  gemini_api_key: string | null;
  is_active: boolean;
  plan: string;
  created_at: string;
}

export interface ServiceItem {
  nombre: string;
  descripcion?: string;
  precio_min: number;
  precio_max: number;
}

export interface FaqItem {
  pregunta: string;
  respuesta: string;
}

export interface BusinessConfig {
  id: string;
  business_id: string;
  nombre_negocio: string;
  rubro: string | null;
  nombre_bot: string;
  tono: string;
  horario: string;
  calendly_url: string | null;
  handoff_phone: string | null;
  servicios: ServiceItem[];
  faqs: FaqItem[];
  reglas_extra: string | null;
}
