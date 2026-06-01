export interface PitchVideoProps {
  id: string;
  businessName: string;
  industry: 'dental' | 'inmobiliaria' | 'academia' | 'ecommerce' | string;
  botName: string;
  hookText: string;
  messages: { sender: "client" | "bot"; text: string }[];
  ctaUrl: string;
  crmLabel: string;
  actions: string[];
  hookDurationInFrames?: number;
  outroDurationInFrames?: number;
  whatsappDurationInFrames?: number;
}

export const defaultVideoProps: PitchVideoProps = {
  id: "propiedades-andes",
  businessName: "Andes Propiedades",
  industry: "inmobiliaria",
  botName: "Asistente Andes",
  hookText: "¿Cuántos leads inmobiliarios te responden ellos primero?",
  messages: [
    { sender: "client", text: "Hola, me interesa el departamento en Providencia. ¿Cuáles son los requisitos?" },
    { sender: "bot", text: "¡Hola! Necesitas liquidación 3x el arriendo y Dicom. ¿Te agenda una visita?" }
  ],
  ctaUrl: "browns.studio/demo",
  crmLabel: "Prospecto Inmobiliario Pre-Calificado",
  actions: ["Crear Tarjeta CRM", "Enviar Link Calendly", "Notificar a Asesor"]
};
