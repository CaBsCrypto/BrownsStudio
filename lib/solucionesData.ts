export interface NicheContent {
  emoji: string;
  industria: string;
  headline: string;
  sub: string;
  estadistica: string;
  roiLabel: string;
  defaultRoiValue: number;
  roiMultiplierLabel: string;
  defaultRoiMultiplier: number;
  calcResultLabel: string;
  ctaMsg: string;
  beneficios: string[];
}

export interface NicheData {
  en: NicheContent;
  es: NicheContent;
  pt: NicheContent;
}

export const solucionesData: Record<string, NicheData> = {
  dentistas: {
    en: {
      emoji: "🦷",
      industria: "Dental Clinics",
      headline: "While you treat a patient, your agent books the next one.",
      sub: "A custom WhatsApp AI agent that connects to your scheduling software, answers queries instantly 24/7, and automatically reduces no-shows.",
      estadistica: "Recover 3 to 7 high-value appointment opportunities missed outside business hours monthly.",
      roiLabel: "Average value of a high-ticket treatment (orthodontics, implants, whitening)",
      defaultRoiValue: 1200,
      roiMultiplierLabel: "Missed appointments recovered per month",
      defaultRoiMultiplier: 4,
      calcResultLabel: "Estimated Monthly Recovered Revenue",
      ctaMsg: "Hi! I want to see how the WhatsApp AI Agent for Dental Clinics works.",
      beneficios: [
        "Real-time integration with dental agendas (Doctoralia, Google Calendar, etc.)",
        "Automated interactive confirmation reminders to eliminate empty slots",
        "Instant answers to repetitive questions (pricing, location, insurance, treatments)",
        "Direct escalation to human reception for urgent medical cases"
      ]
    },
    es: {
      emoji: "🦷",
      industria: "Clínicas Dentales",
      headline: "Mientras atiendes a un paciente, tu agente agenda al siguiente.",
      sub: "Un agente de IA en WhatsApp hecho a medida que se conecta a tu agenda, responde dudas al instante 24/7 y reduce inasistencias de forma automática.",
      estadistica: "Recupera de 3 a 7 oportunidades de citas de alto valor perdidas fuera del horario de atención al mes.",
      roiLabel: "Valor promedio de un tratamiento de alto valor (ortodoncia, implantes, estética)",
      defaultRoiValue: 1200,
      roiMultiplierLabel: "Citas recuperadas al mes por el agente",
      defaultRoiMultiplier: 4,
      calcResultLabel: "Ingreso Mensual Recuperable Estimado",
      ctaMsg: "¡Hola! Quiero ver cómo funciona el Agente de IA para Clínicas Dentales.",
      beneficios: [
        "Integración en tiempo real con tu software de agenda dental",
        "Recordatorios de confirmación interactivos automáticos para evitar espacios vacíos",
        "Respuestas al instante sobre precios, ubicación, convenios y tratamientos",
        "Derivación directa a tu secretaria humana para emergencias o casos especiales"
      ]
    },
    pt: {
      emoji: "🦷",
      industria: "Clínicas Odontológicas",
      headline: "Enquanto você atende um paciente, seu agente agenda o próximo.",
      sub: "Um agente de IA no WhatsApp sob medida que se conecta à sua agenda, responde dúvidas instantaneamente 24/7 e reduz faltas automaticamente.",
      estadistica: "Recupere de 3 a 7 oportunidades de consultas de alto valor perdidas fora do horário de atendimento mensalmente.",
      roiLabel: "Valor médio de um tratamento de alto valor (ortodontia, implantes, estética)",
      defaultRoiValue: 1200,
      roiMultiplierLabel: "Consultas recuperadas por mês pelo agente",
      defaultRoiMultiplier: 4,
      calcResultLabel: "Faturamento Mensal Recuperável Estimado",
      ctaMsg: "Olá! Quero ver como funciona o Agente de IA para Clínicas Odontológicas.",
      beneficios: [
        "Integração em tempo real com seu software de agenda odontológica",
        "Lembretes de confirmação interativos automáticos para evitar horários vazios",
        "Respostas instantâneas sobre preços, localização, convênios e tratamentos",
        "Direcionamento direto à secretária humana para emergências ou casos especiais"
      ]
    }
  },
  salud: {
    en: {
      emoji: "🏥",
      industria: "Medical & Health Clinics",
      headline: "Free your reception and automate bookings 24/7.",
      sub: "A specialized AI agent for medical clinics (dermatology, physiotherapy, psychology) that answers insurance queries and handles scheduling on WhatsApp.",
      estadistica: "Divert up to 65% of repetitive administrative questions from your human staff.",
      roiLabel: "Average value of a medical consultation or specialized treatment",
      defaultRoiValue: 150,
      roiMultiplierLabel: "Consultations automatically booked/reprogrammed per month",
      defaultRoiMultiplier: 25,
      calcResultLabel: "Administrative Value & Revenue Generated",
      ctaMsg: "Hi! I want to see how the WhatsApp AI Agent for Medical Clinics works.",
      beneficios: [
        "Direct synchronization with medical booking systems (AgendaPro, Doctoralia, etc.)",
        "Interactive insurance coverage checks and requirements checklist",
        "Automated rescheduling and cancellation flows without human intervention",
        "100% HIPAA-compliant secure handling of basic medical questions"
      ]
    },
    es: {
      emoji: "🏥",
      industria: "Centros de Salud y Especialidades",
      headline: "Libera tu recepción y automatiza tus reservas 24/7.",
      sub: "Un agente de IA para centros de salud (kinesiología, dermatología, psicología, etc.) que filtra previsión, responde convenios y agenda pacientes por WhatsApp.",
      estadistica: "Desvía hasta un 65% de las consultas administrativas repetitivas de tu personal humano.",
      roiLabel: "Valor promedio de una consulta médica o sesión de especialidad",
      defaultRoiValue: 150,
      roiMultiplierLabel: "Consultas agendadas o reprogramadas por mes automáticamente",
      defaultRoiMultiplier: 25,
      calcResultLabel: "Valor Administrativo e Ingreso Mensual Generado",
      ctaMsg: "¡Hola! Quiero ver cómo funciona el Agente de IA para Centros de Salud.",
      beneficios: [
        "Sincronización directa con sistemas de reserva médica online",
        "Filtro inteligente de convenios médicos y requisitos de atención",
        "Flujos interactivos de reprogramación y cancelación sin llamada telefónica",
        "Seguridad y privacidad total en la atención de consultas básicas"
      ]
    },
    pt: {
      emoji: "🏥",
      industria: "Centros de Saúde e Especialidades",
      headline: "Libere sua recepção e automatize suas reservas 24/7.",
      sub: "Um agente de IA para centros de saúde (dermatologia, fisioterapia, psicologia) que filtra convênios, responde dúvidas e agenda pacientes pelo WhatsApp.",
      estadistica: "Desvie até 65% das consultas administrativas repetitivas da sua equipe humana.",
      roiLabel: "Valor médio de uma consulta médica ou sessão de especialidade",
      defaultRoiValue: 150,
      roiMultiplierLabel: "Consultas agendadas ou reagendadas por mês automaticamente",
      defaultRoiMultiplier: 25,
      calcResultLabel: "Valor Administrativo e Faturamento Gerado",
      ctaMsg: "Olá! Quero ver como funciona o Agente de IA para Centros de Saúde.",
      beneficios: [
        "Sincronização direta com sistemas de reserva médica online",
        "Filtro inteligente de convênios médicos e requisitos de atendimento",
        "Fluxos interativos de reagendamento e cancelamento sem chamadas",
        "Segurança e privacidade total no atendimento de dúvidas básicas"
      ]
    }
  },
  estetica: {
    en: {
      emoji: "✨",
      industria: "Aesthetic Spas & Clinics",
      headline: "Turn repetitive price queries into scheduled treatments.",
      sub: "Stop losing laser, botox or skincare sales due to slow responses. Your WhatsApp agent responds in 3 seconds, explains the benefits, and secures the booking.",
      estadistica: "Convert up to 30% more price inquiries into confirmed paid evaluations.",
      roiLabel: "Average value of an aesthetic treatment pack (laser, body contouring, Botox)",
      defaultRoiValue: 450,
      roiMultiplierLabel: "New treatments booked monthly by the agent",
      defaultRoiMultiplier: 10,
      calcResultLabel: "Estimated Additional Monthly Sales",
      ctaMsg: "Hi! I want to see how the WhatsApp AI Agent for Aesthetic Spas works.",
      beneficios: [
        "Instant response to the classic 'how much?' - sells the value before the price",
        "Automatic scheduling of evaluations or first treatment session",
        "Interactive upselling of complementary services during booking",
        "Automatic follow-up to leads who asked for prices but didn't book yet"
      ]
    },
    es: {
      emoji: "✨",
      industria: "Clínicas Estéticas y Spas",
      headline: "Convierte las preguntas de precios en tratamientos agendados.",
      sub: "Deja de perder ventas de bótox, depilación láser o tratamientos corporales por responder tarde. Tu agente responde en 3 segundos, explica los beneficios y asegura la reserva.",
      estadistica: "Convierte hasta un 30% más de consultas frías en evaluaciones agendadas.",
      roiLabel: "Valor promedio de un paquete de tratamiento (bótox, depilación láser, masajes)",
      defaultRoiValue: 450,
      roiMultiplierLabel: "Nuevos tratamientos agendados al mes por el agente",
      defaultRoiMultiplier: 10,
      calcResultLabel: "Ventas Mensuales Adicionales Estimadas",
      ctaMsg: "¡Hola! Quiero ver cómo funciona el Agente de IA para Clínicas Estéticas.",
      beneficios: [
        "Respuesta instantánea al clásico '¿precio?' - vendiendo valor antes de cobrar",
        "Agendamiento automático de evaluaciones gratuitas o sesiones iniciales",
        "Recomendación inteligente de servicios complementarios (upselling)",
        "Seguimiento automático a prospectos que preguntaron pero no agendaron"
      ]
    },
    pt: {
      emoji: "✨",
      industria: "Clínicas Estéticas e Spas",
      headline: "Converta perguntas de preços em tratamentos agendados.",
      sub: "Deixe de perder vendas de botox, depilação a laser ou tratamentos faciais por responder tarde. Seu agente responde em 3 segundos, explica os benefícios e garante a reserva.",
      estadistica: "Converta até 30% mais consultas frias em avaliações agendadas.",
      roiLabel: "Valor médio de um pacote de tratamento (botox, depilação, estética)",
      defaultRoiValue: 450,
      roiMultiplierLabel: "Novos tratamentos agendados por mês pelo agente",
      defaultRoiMultiplier: 10,
      calcResultLabel: "Vendas Mensais Adicionais Estimadas",
      ctaMsg: "Olá! Quero ver como funciona o Agente de IA para Clínicas Estéticas.",
      beneficios: [
        "Resposta instantânea ao clássico 'preço?' - vendendo valor antes de cobrar",
        "Agendamento automático de avaliações gratuitas ou sessões iniciais",
        "Recomendação inteligente de serviços complementares (upselling)",
        "Acompanhamento automático de leads que perguntaram mas não agendaram"
      ]
    }
  },
  abogados: {
    en: {
      emoji: "⚖️",
      industria: "Law Firms & Attorneys",
      headline: "Filter out cold inquiries. Book paid client consultations.",
      sub: "A professional AI intake agent that qualifies legal cases, collects key details, and schedules paid consultations automatically on WhatsApp.",
      estadistica: "Save 12+ hours per month of unpaid calls with unqualified leads.",
      roiLabel: "Price of your initial consultation fee or hourly bill rate",
      defaultRoiValue: 200,
      roiMultiplierLabel: "Paid discovery calls scheduled monthly by the agent",
      defaultRoiMultiplier: 12,
      calcResultLabel: "Consultation Revenue & Billable Time Saved",
      ctaMsg: "Hi! I want to see how the WhatsApp Legal Intake Agent works.",
      beneficios: [
        "Automatic legal intake: collects case summaries and client info 24/7",
        "Stripe or WhatsApp Pay checkout integration to secure consultation fees",
        "Pre-qualification of cases based on your custom criteria (avoids non-leads)",
        "Flawless scheduling linked directly to your lawyer/partner calendars"
      ]
    },
    es: {
      emoji: "⚖️",
      industria: "Abogados y Firmas Legales",
      headline: "Filtra curiosos. Llena tu agenda de consultas pagadas.",
      sub: "Tu asistente legal de entrada en WhatsApp: califica casos automáticamente, recopila detalles clave y agenda consultas iniciales de pago al instante.",
      estadistica: "Ahorra más de 12 horas al mes en llamadas no facturables con leads no calificados.",
      roiLabel: "Valor de tu consulta legal inicial o fee por hora",
      defaultRoiValue: 200,
      roiMultiplierLabel: "Consultas de pago agendadas al mes por el agente",
      defaultRoiMultiplier: 12,
      calcResultLabel: "Fakturación en Consultas y Valor del Tiempo Ahorrado",
      ctaMsg: "¡Hola! Quiero ver cómo funciona el Filtro Legal por WhatsApp para mi firma.",
      beneficios: [
        "Triage legal automático: recopila los detalles del caso antes de hablar",
        "Pasarela de pago integrada (Stripe/pagos locales) para asegurar la consulta",
        "Precalificación estricta de prospectos según tu área de especialidad",
        "Agendamiento coordinado sin fricción con el calendario del abogado socio"
      ]
    },
    pt: {
      emoji: "⚖️",
      industria: "Advogados e Escritórios de Advocacia",
      headline: "Filtre curiosos. Encha sua agenda de consultas pagas.",
      sub: "Seu assistente jurídico no WhatsApp: qualifica casos automaticamente, coleta detalhes principais e agenda consultas iniciais pagas na hora.",
      estadistica: "Economize mais de 12 horas mensais de chamadas não faturáveis com leads desqualificados.",
      roiLabel: "Valor da sua consulta jurídica inicial ou taxa por hora",
      defaultRoiValue: 200,
      roiMultiplierLabel: "Consultas pagas agendadas por mês pelo agente",
      defaultRoiMultiplier: 12,
      calcResultLabel: "Faturamento em Consultas e Tempo Economizado",
      ctaMsg: "Olá! Quero ver como funciona o Filtro Jurídico pelo WhatsApp para meu escritório.",
      beneficios: [
        "Triagem jurídica automática: coleta detalhes do caso antes da reunião",
        "Integração de pagamento (Stripe/pagamentos locais) para garantir a consulta",
        "Pré-qualificação estrita de leads de acordo com sua área de especialidade",
        "Agendamento coordenado sem fricção com o calendário do advogado sócio"
      ]
    }
  },
  "clases-privadas": {
    en: {
      emoji: "🎓",
      industria: "Private Academies & Customized Lessons",
      headline: "Guide prospective students. Match them with the perfect tutor.",
      sub: "Perfect for customized language training, instrument tutoring, test prep (GMAT/TOEFL) or sports academies. Assess their level, match tutor availability, and book their trial class.",
      estadistica: "Engage students instantly when interest is highest, boosting conversion by 45%.",
      roiLabel: "Average lifetime value of a customized private lesson package",
      defaultRoiValue: 600,
      roiMultiplierLabel: "New monthly student enrollments secured by the agent",
      defaultRoiMultiplier: 6,
      calcResultLabel: "Estimated Additional Student Lifetime Revenue",
      ctaMsg: "Hi! I want to see how the WhatsApp Agent for Customized Private Lessons works.",
      beneficios: [
        "Interactive intake: assesses student level, goals, and schedule preferences",
        "Smart tutoring matching based on teacher availability in real time",
        "Automated booking and calendar setup for the first trial/introductory class",
        "Follow-up and tuition payment coordination in the same chat"
      ]
    },
    es: {
      emoji: "🎓",
      industria: "Academias y Clases Privadas",
      headline: "Guía a los estudiantes. Conéctalos con el tutor ideal.",
      sub: "Ideal para clases particulares de idiomas, música, preparación de exámenes (TOEFL/GMAT) o entrenamientos deportivos. Evalúa el nivel, comprueba la agenda de profesores y reserva la clase de prueba.",
      estadistica: "Responde de inmediato cuando el interés es mayor, aumentando matrículas en un 45%.",
      roiLabel: "Valor promedio del plan/suscripción mensual o paquete de clases particulares",
      defaultRoiValue: 600,
      roiMultiplierLabel: "Nuevos alumnos matriculados al mes por el agente",
      defaultRoiMultiplier: 6,
      calcResultLabel: "Nuevos Ingresos Mensuales Estimados",
      ctaMsg: "¡Hola! Quiero ver cómo funciona el Agente de WhatsApp para Academias de Clases Privadas.",
      beneficios: [
        "Evaluación inicial interactiva: analiza nivel, objetivos y disponibilidad del alumno",
        "Coincidencia inteligente en tiempo real según agenda de profesores calificados",
        "Agendamiento automático de la clase de prueba o primera sesión de diagnóstico",
        "Coordinación de pagos y confirmación de matrícula sin salir de WhatsApp"
      ]
    },
    pt: {
      emoji: "🎓",
      industria: "Academias e Aulas Particulares",
      headline: "Guie os estudantes. Conecte-os com o instrutor ideal.",
      sub: "Ideal para aulas particulares de idiomas, música, preparação para exames (TOEFL/GMAT) ou treinos esportivos. Avalie o nível, verifique as agendas e reserve a aula teste.",
      estadistica: "Responda de imediato quando o interesse é maior, aumentando matrículas em 45%.",
      roiLabel: "Valor médio do pacote de aulas particulares ou plano mensal",
      defaultRoiValue: 600,
      roiMultiplierLabel: "Novos alunos matriculados por mês pelo agente",
      defaultRoiMultiplier: 6,
      calcResultLabel: "Faturamento Mensal Adicional Estimado",
      ctaMsg: "Olá! Quero ver como funciona o Agente de WhatsApp para Academias de Aulas Particulares.",
      beneficios: [
        "Avaliação inicial interativa: analisa nível, objetivos e disponibilidade do aluno",
        "Correspondência inteligente em tempo real com a agenda dos professores",
        "Agendamento automático da aula de teste ou primeira sessão diagnóstica",
        "Coordenação de pagamentos e confirmação de matrícula no próprio WhatsApp"
      ]
    }
  }
};
