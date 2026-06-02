export interface CasoDeEstudio {
  slug: string;
  title: string;
  description: string;
  industria: string;
  resultados: {
    label: string;
    value: string;
  }[];
  problema: string;
  solucion: string;
  implementacion: string;
  roi: string;
  testimonio?: {
    quote: string;
    author: string;
  };
}

export const casosDeEstudioData: Record<string, CasoDeEstudio> = {
  "clinica-dental-santiago": {
    slug: "clinica-dental-santiago",
    title: "Aumento del 40% en Agendamiento para Clínica Dental en Santiago",
    description: "Cómo un agente de IA automatizó el WhatsApp de una clínica dental, respondiendo 24/7 y agendando citas en minutos.",
    industria: "Clínicas Dentales",
    resultados: [
      { label: "Aumento en citas", value: "+40%" },
      { label: "Tiempo de respuesta", value: "< 3s" },
      { label: "Horas ahorradas al mes", value: "120h" }
    ],
    problema: "La clínica perdía más de 30 consultas mensuales de pacientes que escribían por WhatsApp fuera de horario comercial o cuando la recepcionista estaba ocupada atendiendo presencialmente.",
    solucion: "Implementamos un Agente de IA Conversacional capaz de leer el calendario de la clínica en tiempo real, cotizar tratamientos de rutina y agendar horas automáticamente directamente por WhatsApp.",
    implementacion: "El bot fue entrenado con las FAQs de la clínica (horarios, seguros médicos aceptados, precios base). Se conectó a su CRM y a Google Calendar. Cuando un lead es complejo, el bot transfiere la conversación a la recepcionista.",
    roi: "En el primer mes, el agente recuperó 15 citas que hubiesen sido ignoradas, generando un retorno sobre la inversión (ROI) del 800% respecto al costo de mantención del bot.",
    testimonio: {
      quote: "Nunca pensé que la Inteligencia Artificial podría tratar a los pacientes con tanta empatía. Nuestro calendario está lleno y la recepcionista por fin respira.",
      author: "Dra. Macarena, Directora Clínica"
    }
  },
  "estudio-juridico-chile": {
    slug: "estudio-juridico-chile",
    title: "Automatización de Seguimiento de Causas para Estudio Jurídico",
    description: "Un asistente virtual que notifica a los clientes sobre sus causas en el Poder Judicial, traduciendo el lenguaje legal a un español simple.",
    industria: "Estudios Jurídicos",
    resultados: [
      { label: "Carga administrativa", value: "-60%" },
      { label: "Satisfacción cliente", value: "98%" },
      { label: "Consultas redundantes", value: "0" }
    ],
    problema: "Los abogados dedicaban hasta 3 horas diarias a responder mensajes de WhatsApp de clientes preguntando '¿cómo va mi caso?' o '¿qué significa esta notificación del tribunal?'.",
    solucion: "Desarrollamos JurisClaro AI, un bot conectado a la base de datos de causas del estudio. El cliente ingresa su RUT y la IA busca la última resolución del Poder Judicial y la explica en palabras simples.",
    implementacion: "Se integró un modelo de lenguaje avanzado (Gemini 2.0) optimizado con un diccionario jurídico chileno para asegurar precisión técnica sin perder el tono amable.",
    roi: "El estudio recuperó 60 horas facturables al mes, mejorando drásticamente el servicio al cliente y permitiendo a los abogados enfocarse en la estrategia legal.",
    testimonio: {
      quote: "El nivel de tranquilidad que le da a nuestros clientes tener respuestas inmediatas es invaluable. Nos diferenciamos de toda la competencia.",
      author: "Abogado Socio"
    }
  }
};
