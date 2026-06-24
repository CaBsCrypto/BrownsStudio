export interface ReelVideoProps {
  id: string;
  industry: 'dental' | 'abogados' | string;
  businessName: string;
  botName: string;
  /** Large stat number shown in the hook, e.g. "73%" */
  statNumber: string;
  /** Main stat description, e.g. "de los pacientes elige al primero en responder" */
  statText: string;
  /** Sub-line / secondary hook, e.g. "¿Estás respondiendo a tiempo?" */
  statSubline: string;
  /** WhatsApp chat messages to animate */
  messages: { sender: 'client' | 'bot'; text: string }[];
  /** CTA URL shown at the end, e.g. "browns.studio/demo" */
  ctaUrl: string;
  /** Optional industry-specific CTA headline */
  ctaHeadline?: string;
  
  /** Optional Video Scene (plays before chat) */
  videoSceneSrc?: string;
  videoSceneHeadline?: string;
  videoSceneSubline?: string;

  /** Duration overrides (set by calculateMetadata) */
  hookDurationInFrames?: number;
  videoSceneDurationInFrames?: number;
  chatDurationInFrames?: number;
  ctaDurationInFrames?: number;
}

export const REEL_DEFAULTS: Record<string, ReelVideoProps> = {
  dental: {
    id: 'dental-reel',
    industry: 'dental',
    businessName: 'Clínica Dental',
    botName: 'Dra. Ana',
    statNumber: '73%',
    statText: 'de los pacientes elige al primero en responder.',
    statSubline: '¿Tu clínica está respondiendo a tiempo?',
    messages: [
      { sender: 'client', text: '¡Hola! Quiero agendar una consulta por blanqueamiento dental. ¿Tienen disponibilidad esta semana?' },
      { sender: 'bot', text: '¡Hola! Claro, tenemos turnos disponibles. Nuestro Blanqueamiento LED Premium tiene un valor promo de $120.000 CLP. ¿Te acomoda el jueves a las 10am?' },
      { sender: 'client', text: 'Perfecto, me lo reservo para el jueves.' },
      { sender: 'bot', text: '✅ ¡Listo! Te quedó agendado el jueves 10am. Te mando la confirmación por WhatsApp ahora mismo.' },
    ],
    ctaUrl: 'browns.studio/demo',
    ctaHeadline: 'Ponle un asistente de IA a tu clínica',
    hookDurationInFrames: 210,
    chatDurationInFrames: 1350,
    ctaDurationInFrames: 240,
  },
  abogados: {
    id: 'abogados-reel',
    industry: 'abogados',
    businessName: 'Estudio Legal',
    botName: 'Sofía',
    statNumber: '9/10',
    statText: 'consultas legales no califican.',
    statSubline: 'Tu equipo pierde horas en filtrar casos. Hay una solución.',
    messages: [
      { sender: 'client', text: 'Hola, me despidieron ayer de mi trabajo y creo que fue sin justificación.' },
      { sender: 'bot', text: '¡Hola! Evaluamos tu caso en una consulta gratuita. Para saber si calificas, ¿cuántos años trabajaste en esa empresa?' },
      { sender: 'client', text: '3 años. Siempre tuve buenas evaluaciones.' },
      { sender: 'bot', text: '✅ Tu caso tiene fuertes indicios de despido injustificado. Te agendé una consulta estratégica gratis con un abogado. ¿Cuándo puedes?' },
    ],
    ctaUrl: 'browns.studio/legal',
    ctaHeadline: 'Automatiza el filtrado de casos',
    hookDurationInFrames: 210,
    chatDurationInFrames: 1350,
    ctaDurationInFrames: 240,
  },
};
