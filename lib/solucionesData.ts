export interface ProfileContent {
  name: string;
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
  maxTicket: number;
  maxMultiplier: number;
}

export interface NicheContent {
  emoji: string;
  industria: string;
  hasProfiles: boolean;
  profiles: {
    estandar: ProfileContent;
    premium: ProfileContent;
  };
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
      hasProfiles: true,
      profiles: {
        estandar: {
          name: "Family / General Practice",
          headline: "Fill every slot in your calendar and recover missed calls 24/7.",
          sub: "While you treat a patient, your digital worker responds in 3 seconds, handles insurance queries, and books appointments automatically. Never let a routine lead slip away during lunch or after hours.",
          estadistica: "Fill up to 15 additional clinical appointment gaps and eliminate manual secretary callbacks.",
          roiLabel: "Average value of general consultation or routine treatment",
          defaultRoiValue: 150,
          roiMultiplierLabel: "Missed appointments recovered per month",
          defaultRoiMultiplier: 12,
          calcResultLabel: "Estimated Monthly Recovered Revenue",
          ctaMsg: "Hi! I want to fill empty slots and optimize my family dental practice calendar.",
          beneficios: [
            "Real-time sync with routine agendas (Google Calendar, Doctoralia, etc.)",
            "Automatic instant WhatsApp confirmation check to prevent costly no-shows",
            "Instant answers to patient FAQs (location, routine prices, hours, insurances)",
            "Direct escalation to human staff for urgent toothaches or medical emergencies"
          ],
          maxTicket: 1000,
          maxMultiplier: 50
        },
        premium: {
          name: "High-Ticket Specialty Practice",
          headline: "Qualify high-value patients and secure premium treatments automatically.",
          sub: "We present your invisalign, implants, and high-end aesthetic dental services with absolute sophistication. The system qualifies patient intent, filters out low-value inquiries, and secures diagnostic bookings.",
          estadistica: "Capture 3 to 7 premium treatment cases monthly that used to cool down waiting for standard callbacks.",
          roiLabel: "Average value of premium treatment (implants, clear aligners)",
          defaultRoiValue: 1800,
          roiMultiplierLabel: "High-value treatments secured per month",
          defaultRoiMultiplier: 4,
          calcResultLabel: "Estimated Monthly Premium Sales Generated",
          ctaMsg: "Hi! I want to implement the premium patient qualification system for my high-end dental clinic.",
          beneficios: [
            "Strict interactive qualification filters to ensure optimal high-ticket leads",
            "VIP concierge tone: professional, highly sophisticated, and frictionless",
            "Seamless synchronization with specialized doctor/expert calendars",
            "Automated payment integration to secure high-value diagnostic appointments"
          ],
          maxTicket: 8000,
          maxMultiplier: 20
        }
      }
    },
    es: {
      emoji: "🦷",
      industria: "Clínicas Dentales",
      hasProfiles: true,
      profiles: {
        estandar: {
          name: "Clínica Familiar / De Barrio",
          headline: "Llena cada hueco libre en tu agenda y atiende a cada paciente 24/7.",
          sub: "Mientras atiendes en el sillón, tu trabajador digital responde en 3 segundos, aclara convenios y reserva citas solo en tus horarios libres. No pierdas más pacientes por responder tarde o tener la línea ocupada.",
          estadistica: "Recupera hasta 15 citas mensuales que solían perderse fuera de horario o en horas de almuerzo.",
          roiLabel: "Valor promedio de una consulta o tratamiento de volumen",
          defaultRoiValue: 150,
          roiMultiplierLabel: "Citas mensuales recuperadas por el sistema",
          defaultRoiMultiplier: 12,
          calcResultLabel: "Ingreso Mensual Recuperado Estimado",
          ctaMsg: "¡Hola! Quiero reducir huecos vacíos y optimizar la agenda de mi clínica familiar.",
          beneficios: [
            "Sincronización en tiempo real con tu software de agenda dental favorito",
            "Recordatorios de confirmación automáticos por WhatsApp para erradicar inasistencias",
            "Respuestas automáticas a dudas frecuentes (precios base, ubicación, estacionamiento)",
            "Derivación inmediata a recepcionista humana en caso de urgencias médicas"
          ],
          maxTicket: 1000,
          maxMultiplier: 50
        },
        premium: {
          name: "Especialidades / Alta Gama (High-Ticket)",
          headline: "Filtra pacientes calificados y asegura tratamientos premium automáticamente.",
          sub: "Presenta tus servicios de ortodoncia invisible, implantes y estética dental con un trato sofisticado. El sistema precalifica el interés del paciente, descarta curiosos y asegura la reserva de diagnóstico de alto valor.",
          estadistica: "Asegura de 3 a 7 casos de tratamientos premium adicionales al mes automatizando la calificación rápida.",
          roiLabel: "Valor promedio de tu tratamiento premium (implantes, ortodoncia invisible, etc.)",
          defaultRoiValue: 1800,
          roiMultiplierLabel: "Tratamientos premium cerrados al mes",
          defaultRoiMultiplier: 4,
          calcResultLabel: "Ingreso Mensual Adicional Generado",
          ctaMsg: "¡Hola! Quiero implementar la calificación de pacientes de alto valor para mi clínica premium.",
          beneficios: [
            "Filtro interactivo inteligente de calificación para tratamientos de alta gama",
            "Tono sofisticado de conserje VIP: responde con precisión y elegancia",
            "Coordinación directa y exclusiva con la agenda de especialistas clave",
            "Pasarela de reserva integrada para asegurar el compromiso de la cita de diagnóstico"
          ],
          maxTicket: 8000,
          maxMultiplier: 20
        }
      }
    },
    pt: {
      emoji: "🦷",
      industria: "Clínicas Odontológicas",
      hasProfiles: true,
      profiles: {
        estandar: {
          name: "Clínica Familiar / De Bairro",
          headline: "Preencha cada horário vazio na sua agenda e atenda pacientes 24/7.",
          sub: "Enquanto você atende na cadeira, seu trabalhador digital responde em 3 segundos, esclarece convênios e reserva consultas nos seus horários livres. Pare de perder pacientes por demora no retorno.",
          estadistica: "Recupere até 15 consultas mensais que costumavam ser perdidas fora do horário comercial.",
          roiLabel: "Valor médio de uma consulta ou procedimento de volume",
          defaultRoiValue: 150,
          roiMultiplierLabel: "Consultas mensais recuperadas pelo sistema",
          defaultRoiMultiplier: 12,
          calcResultLabel: "Faturamento Mensal Recuperável Estimado",
          ctaMsg: "Olá! Quero reduzir horários vazios e otimizar a agenda da minha clínica familiar.",
          beneficios: [
            "Integração em tempo real com seu software de agenda odontológica favorito",
            "Lembretes de confirmação automáticos por WhatsApp para acabar com as faltas",
            "Respostas imediatas para dúvidas repetitivas (localização, preços base, convênios)",
            "Direcionamento imediato para a secretária em caso de urgências médicas"
          ],
          maxTicket: 1000,
          maxMultiplier: 50
        },
        premium: {
          name: "Especialidades / Alta Gama (High-Ticket)",
          headline: "Filtre pacientes qualificados e garanta tratamentos premium no piloto automático.",
          sub: "Apresente seus tratamentos de alinhadores invisíveis, implantes e estética com sofisticação absoluta. O sistema pré-qualifica o interesse do paciente, descarta curiosos e garante o agendamento de alto valor.",
          estadistica: "Garanta de 3 a 7 casos de tratamentos premium adicionais por mês qualificando os leads na hora.",
          roiLabel: "Valor médio do seu tratamento premium (implantes, alinhadores)",
          defaultRoiValue: 1800,
          roiMultiplierLabel: "Tratamentos premium fechados por mês",
          defaultRoiMultiplier: 4,
          calcResultLabel: "Faturamento Mensal Adicional Gerado",
          ctaMsg: "Olá! Quero implementar a qualificação de pacientes de alto valor para minha clínica premium.",
          beneficios: [
            "Filtro inteligente interativo de qualificação para tratamentos de alto valor",
            "Tom sofisticado de concierge VIP: atendimento impecável e sem atritos",
            "Coordenação direta e exclusiva com a agenda dos especialistas da clínica",
            "Integração de pagamento de reserva para garantir o compromisso da consulta de avaliação"
          ],
          maxTicket: 8000,
          maxMultiplier: 20
        }
      }
    }
  },
  salud: {
    en: {
      emoji: "🏥",
      industria: "Medical & Health Clinics",
      hasProfiles: true,
      profiles: {
        estandar: {
          name: "Family / Multi-Specialty Clinic",
          headline: "Divert repetitive questions and automate consultation bookings 24/7.",
          sub: "Free your reception desk from answering the same questions about location and insurances. Your digital operator schedules, checks insurances, and handles cancellations without human delays.",
          estadistica: "Save over 40 receptionist hours monthly by automating 65% of repetitive administrative questions.",
          roiLabel: "Average fee of a medical consultation or routine check-up",
          defaultRoiValue: 80,
          roiMultiplierLabel: "Consultations booked automatically per month",
          defaultRoiMultiplier: 35,
          calcResultLabel: "Monthly Administrative Value & Fee Volume Generated",
          ctaMsg: "Hi! I want to automate reception and scheduling for my medical clinic.",
          beneficios: [
            "Seamless synchronization with clinical scheduling software",
            "Automated interactive insurance filter to avoid registration errors",
            "Immediate self-service rescheduling and cancellation options via text",
            "Perfect compliance with standard patient data privacy norms"
          ],
          maxTicket: 500,
          maxMultiplier: 100
        },
        premium: {
          name: "VIP / Specialized Wellness Centers",
          headline: "Calify and capture premium patients for exclusive medical programs.",
          sub: "Deliver a high-touch booking concierge experience for custom therapies, private surgery diagnostics, or executive health checks. The operator qualifies background and schedules high-value assessments.",
          estadistica: "Increase conversion of cold therapy inquires into private consultations by 35% through instant answers.",
          roiLabel: "Average value of specialized program or private treatment",
          defaultRoiValue: 800,
          roiMultiplierLabel: "High-value treatments booked per month",
          defaultRoiMultiplier: 8,
          calcResultLabel: "Estimated Monthly Private Program Revenue",
          ctaMsg: "Hi! I want to see the specialized patient qualification system for our private wellness center.",
          beneficios: [
            "Strict interactive case filter according to your customized clinical requirements",
            "Elite VIP conversational tone matching your center's upscale standards",
            "Direct calendar sync with premium specialists and private operating rooms",
            "Secure deposit integration to validate and guarantee diagnostic slots"
          ],
          maxTicket: 5000,
          maxMultiplier: 30
        }
      }
    },
    es: {
      emoji: "🏥",
      industria: "Centros de Salud y Especialidades",
      hasProfiles: true,
      profiles: {
        estandar: {
          name: "Centro de Salud Familiar",
          headline: "Desvía consultas repetitivas y automatiza las reservas de tus consultas 24/7.",
          sub: "Libera a tu recepción de contestar todo el día sobre ubicaciones, convenios y horarios libres. Tu operador digital agenda, filtra seguros médicos y procesa cancelaciones al instante sin esperas.",
          estadistica: "Ahorra más de 40 horas mensuales de tu secretaria automatizando el 65% de las llamadas repetitivas.",
          roiLabel: "Valor promedio de una consulta de medicina o sesión general",
          defaultRoiValue: 80,
          roiMultiplierLabel: "Consultas agendadas automáticamente al mes",
          defaultRoiMultiplier: 35,
          calcResultLabel: "Valor del Tiempo de Recepción Ahorrado e Ingreso Estimado",
          ctaMsg: "¡Hola! Quiero liberar la recepción y automatizar el agendamiento de mi centro de salud.",
          beneficios: [
            "Sincronización fluida con tu sistema de reservas y ficha médica actual",
            "Filtro inteligente interactivo de seguros de salud y convenios vigentes",
            "Flujos automáticos y rápidos de reprogramación o cancelación por texto",
            "Respeto absoluto de los protocolos estándar de privacidad de datos de salud"
          ],
          maxTicket: 500,
          maxMultiplier: 100
        },
        premium: {
          name: "Centros Estéticos y Médicos VIP / Premium",
          headline: "Califica y capta pacientes VIP para tus programas de salud exclusivos.",
          sub: "Ofrece una experiencia de conserje médico para terapias personalizadas, cirugías privadas u optimización biológica. El operador califica antecedentes e ingresa leads listos a tus especialistas.",
          estadistica: "Aumenta la conversión de consultas en cirugías o programas caros en un 35% por respuesta inmediata.",
          roiLabel: "Valor promedio de tu programa de salud o cirugía premium",
          defaultRoiValue: 800,
          roiMultiplierLabel: "Programas de alto valor vendidos o agendados al mes",
          defaultRoiMultiplier: 8,
          calcResultLabel: "Ingreso Mensual de Programas VIP Generado",
          ctaMsg: "¡Hola! Quiero implementar el sistema de precalificación de pacientes premium para nuestro centro VIP.",
          beneficios: [
            "Filtro estricto interactivo de requisitos y patologías antes de agendar",
            "Tono de comunicación impecable y exclusivo acorde a un centro de alto nivel",
            "Coordinación directa con la agenda de médicos directores y especialistas elite",
            "Pasarela integrada para el pago de la consulta de diagnóstico inicial para asegurar asistencia"
          ],
          maxTicket: 5000,
          maxMultiplier: 30
        }
      }
    },
    pt: {
      emoji: "🏥",
      industria: "Centros de Saúde e Especialidades",
      hasProfiles: true,
      profiles: {
        estandar: {
          name: "Centro de Saúde Familiar",
          headline: "Desvie consultas repetitivas e automatize as reservas de consultas 24/7.",
          sub: "Libere sua recepção de responder o dia todo sobre localizações, convênios e horários livres. Seu operador digital agenda, filtra convênios e processa reagendamentos na hora.",
          estadistica: "Economize mais de 40 horas mensais da sua equipe de recepção automatizando 65% das chamadas comuns.",
          roiLabel: "Valor médio de uma consulta médica ou sessão geral",
          defaultRoiValue: 80,
          roiMultiplierLabel: "Consultas agendadas de forma 100% automática por mês",
          defaultRoiMultiplier: 35,
          calcResultLabel: "Valor do Tempo da Recepção Salvo e Faturamento Estimado",
          ctaMsg: "Olá! Quero liberar a recepção e automatizar os agendamentos do meu centro de saúde.",
          beneficios: [
            "Sincronização fluida com seu sistema de agenda e prontuário médico",
            "Filtro interativo inteligente de planos de saúde e convênios parceiros",
            "Fluxos práticos e automáticos de reagendamento ou cancelamento por mensagem",
            "Segurança total em conformidade com as diretrizes de privacidade de dados médicos"
          ],
          maxTicket: 500,
          maxMultiplier: 100
        },
        premium: {
          name: "Centros Estéticos e Médicos VIP / Premium",
          headline: "Qualifique e capte pacientes VIP para programas de saúde exclusivos.",
          sub: "Ofereça uma experiência de concierge de saúde para terapias personalizadas, cirurgias particulares ou medicina preventiva de elite. O operador qualifica os antecedentes e encaminha pacientes prontos.",
          estadistica: "Aumente a conversão de consultas em tratamentos caros em 35% graças à resposta instantânea.",
          roiLabel: "Valor médio do seu programa de saúde ou cirurgia premium",
          defaultRoiValue: 800,
          roiMultiplierLabel: "Programas de alto valor agendados por mês",
          defaultRoiMultiplier: 8,
          calcResultLabel: "Faturamento Mensal de Programas VIP Gerado",
          ctaMsg: "Olá! Quero implementar o sistema de pré-qualificação de pacientes premium para nosso centro VIP.",
          beneficios: [
            "Filtro interativo estrito de qualificação clínica antes da reserva da vaga",
            "Tom de comunicação polido, ético e exclusivo de acordo com o nível da clínica",
            "Integração com a agenda exclusiva de médicos e cirurgiões especialistas",
            "Opção de pagamento de reserva integrada para garantir a avaliação com o especialista"
          ],
          maxTicket: 5000,
          maxMultiplier: 30
        }
      }
    }
  },
  estetica: {
    en: {
      emoji: "✨",
      industria: "Aesthetic Spas & Clinics",
      hasProfiles: true,
      profiles: {
        estandar: {
          name: "Standard Aesthetic Spa / Salon",
          headline: "Stop losing laser, massage or beauty treatment sales due to slow responses.",
          sub: "Leads who ask for routine prices cool down in minutes. Your digital worker answers instantly, explains benefits, and secures the booking in your empty calendar slots.",
          estadistica: "Convert up to 30% more price inquiries into paid bookings through immediate 3-second responses.",
          roiLabel: "Average value of a standard package (laser, facial, wax)",
          defaultRoiValue: 200,
          roiMultiplierLabel: "New treatment sessions booked per month",
          defaultRoiMultiplier: 18,
          calcResultLabel: "Estimated Monthly Extra Revenue",
          ctaMsg: "Hi! I want to convert cold price inquiries into scheduled aesthetic sessions.",
          beneficios: [
            "Instant answers to price inquiries: sells the outcome before the price",
            "Automatic interactive booking linked directly to your calendar",
            "Auto follow-up to leads who asked for prices but didn't secure a slot",
            "Smart upselling of complementary services (e.g., body lotion, add-on area)"
          ],
          maxTicket: 1000,
          maxMultiplier: 50
        },
        premium: {
          name: "High-End Medical Aesthetic Clinics",
          headline: "Automate Botox, filler, and premium laser package sales with VIP pre-qualification.",
          sub: "Luxury treatment patients require exquisite communication. The system presents treatments, pre-qualifies their eligibility (skin type, objectives), and secures high-ticket evaluation sessions.",
          estadistica: "Acquire 5 to 10 additional premium cosmetic patients monthly by answering high-intent inquiries instantly.",
          roiLabel: "Average value of aesthetic treatment (fillers, advanced lasers, Botox packages)",
          defaultRoiValue: 900,
          roiMultiplierLabel: "High-ticket treatments booked per month",
          defaultRoiMultiplier: 8,
          calcResultLabel: "Estimated Monthly Premium Aesthetics Revenue",
          ctaMsg: "Hi! I want to implement the elite patient pre-qualification system for our luxury medical aesthetic clinic.",
          beneficios: [
            "Sophisticated, high-end conversational tone (VIP digital concierge)",
            "Strict case and interest pre-qualification (no cheap price shoppers)",
            "Seamless synchronization with specialized medical calendars",
            "Automated payment integration to secure and guarantee high-value clinical consultations"
          ],
          maxTicket: 5000,
          maxMultiplier: 30
        }
      }
    },
    es: {
      emoji: "✨",
      industria: "Clínicas Estéticas y Spas",
      hasProfiles: true,
      profiles: {
        estandar: {
          name: "Centro de Estética / Spa Tradicional",
          headline: "Deja de perder ventas de masajes, depilación o limpieza por responder tarde.",
          sub: "Los clientes interesados en tratamientos cotidianos se enfrían en 10 minutos si no contestas. Tu trabajador digital responde al instante, educa sobre el valor y reserva la cita en tus horarios disponibles.",
          estadistica: "Convierte hasta un 30% más de consultas frías en citas pagadas respondiendo en 3 segundos.",
          roiLabel: "Valor promedio de un paquete de depilación, masaje o estética general",
          defaultRoiValue: 200,
          roiMultiplierLabel: "Sesiones de estética agendadas por el sistema al mes",
          defaultRoiMultiplier: 18,
          calcResultLabel: "Ingreso Mensual Adicional Estimado",
          ctaMsg: "¡Hola! Quiero convertir las dudas de precios en citas de estética agendadas en mi centro.",
          beneficios: [
            "Respuesta instantánea a la clásica consulta de '¿precio?': vende el valor primero",
            "Agendamiento inmediato interactivo conectado con tu software de agenda",
            "Seguimiento automático a prospectos que preguntaron pero no reservaron cita",
            "Sugerencia inteligente de servicios y productos complementarios (upselling)"
          ],
          maxTicket: 1000,
          maxMultiplier: 50
        },
        premium: {
          name: "Clínicas de Medicina Estética Premium",
          headline: "Califica y agenda pacientes VIP para bótox, ácido hialurónico y tratamientos corporales de alto valor.",
          sub: "El paciente que gasta cientos de dólares exige excelencia en la comunicación. El sistema atiende consultas estéticas con un trato impecable, precalifica su elegibilidad y agenda evaluaciones médicas especializadas.",
          estadistica: "Capta de 5 a 10 tratamientos high-ticket adicionales al mes respondiendo con precisión a prospectos calificados.",
          roiLabel: "Valor promedio de tu tratamiento avanzado (armonización facial, hilos, láser premium)",
          defaultRoiValue: 900,
          roiMultiplierLabel: "Tratamientos de alto valor cerrados al mes",
          defaultRoiMultiplier: 8,
          calcResultLabel: "Ingreso de Medicina Estética Mensual Generado",
          ctaMsg: "¡Hola! Quiero implementar el conserje digital VIP para calificar tratamientos premium en mi clínica médica.",
          beneficios: [
            "Tono conversacional distinguido e impecable (conserje digital premium)",
            "Precalificación estricta de intereses, eliminando buscadores de ofertas baratas",
            "Sincronización impecable con las agendas de tus médicos estéticos y especialistas",
            "Cobro de reserva de evaluación integrado para evitar la inasistencia a citas de alto costo"
          ],
          maxTicket: 5000,
          maxMultiplier: 30
        }
      }
    },
    pt: {
      emoji: "✨",
      industria: "Clínicas Estéticas e Spas",
      hasProfiles: true,
      profiles: {
        estandar: {
          name: "Centro de Estética / Spa Tradicional",
          headline: "Pare de perder vendas de depilação, massagem ou limpeza por responder tarde.",
          sub: "Quem procura tratamentos de beleza se esfria em minutos se não for atendido. Seu trabalhador digital responde na hora, destaca o valor do procedimento e fecha a reserva.",
          estadistica: "Converta até 30% mais perguntas de preço em sessões fechadas com resposta imediata em 3 segundos.",
          roiLabel: "Valor médio do pacote de estética comum",
          defaultRoiValue: 200,
          roiMultiplierLabel: "Consultas ou procedimentos agendados ao mês",
          defaultRoiMultiplier: 18,
          calcResultLabel: "Faturamento Mensal Adicional Recuperado",
          ctaMsg: "Olá! Quero converter dúvidas de preços em consultas de estética fechadas na minha clínica.",
          beneficios: [
            "Resposta instantânea às dúvidas sobre preços: vende o benefício antes de cobrar",
            "Agendamento automático direto na sua agenda de horários livres",
            "Acompanhamento automático de leads interessados que não fecharam a consulta de imediato",
            "Sugestão inteligente de upgrades e pacotes corporais de maior valor (upselling)"
          ],
          maxTicket: 1000,
          maxMultiplier: 50
        },
        premium: {
          name: "Clínicas de Medicina Estética Premium",
          headline: "Qualifique e agende pacientes VIP para botox, preenchimentos e tratamentos de alta gama.",
          sub: "O cliente premium exige excelência na comunicação desde o primeiro contato. O sistema apresenta procedimentos, pré-qualifica o perfil de pele e interesse, e garante a avaliação com o médico especialista.",
          estadistica: "Capte de 5 a 10 tratamentos de alta gama adicionais ao mês garantindo resposta e filtro qualificado 24/7.",
          roiLabel: "Valor médio de tratamentos premium (harmonização facial, bioestimuladores)",
          defaultRoiValue: 900,
          roiMultiplierLabel: "Tratamientos de alta gama agendados por mês",
          defaultRoiMultiplier: 8,
          calcResultLabel: "Faturamento de Medicina Estética Mensal Gerado",
          ctaMsg: "Olá! Quero implementar o concierge digital VIP para qualificar pacientes premium na minha clínica médica.",
          beneficios: [
            "Tom de conversa refinado, exclusivo e de alto padrão (concierge digital VIP)",
            "Pré-qualificação estrita para garantir clientes alinhados (evita caçadores de ofertas)",
            "Integração total com a agenda dos cirurgiões plásticos e dermatologistas da clínica",
            "Reserva de avaliação integrada com taxa de compromisso para erradicar no-shows"
          ],
          maxTicket: 5000,
          maxMultiplier: 30
        }
      }
    }
  },
  abogados: {
    en: {
      emoji: "⚖️",
      industria: "Law Firms & Attorneys",
      hasProfiles: true,
      profiles: {
        estandar: {
          name: "Independent Lawyer / General Practice",
          headline: "Filter out cold inquiries and secure paid consultation fees.",
          sub: "Stop losing hours on unpaid, repetitive phone calls with unqualified leads who just want free advice. Your digital assistant filters out non-leads and directs them to a paid scheduling link.",
          estadistica: "Save 12+ hours monthly of non-billable time and ensure every consultation pays.",
          roiLabel: "Fee value of your standard initial consultation",
          defaultRoiValue: 150,
          roiMultiplierLabel: "Paid consultations booked automatically per month",
          defaultRoiMultiplier: 8,
          calcResultLabel: "Consultation Revenue & Billable Time Saved",
          ctaMsg: "Hi! I want to implement the paid intake filter for my law practice.",
          beneficios: [
            "Automated legal triage: collects case basics and contact details 24/7",
            "Stripe or local checkout integration to guarantee the consultation fee beforehand",
            "Clean scheduling link synced directly with your partner calendar (Cal.com, Calendly)",
            "Polite filter for non-billable inquiries, saving administrative overhead"
          ],
          maxTicket: 800,
          maxMultiplier: 40
        },
        premium: {
          name: "Corporate / Highly Specialized Law Firms",
          headline: "Pre-qualify complex corporate disputes and high-stakes litigation leads.",
          sub: "Filter and intake premium commercial cases, M&A inquiries, or high-stakes corporate disputes. The system runs an automated client qualification checklist and schedules interviews for qualified prospects.",
          estadistica: "Filter out 80% of unqualified inbound requests, ensuring partners only speak to verified corporate leads.",
          roiLabel: "Value of premium corporate client diagnostic retainer or consultation fee",
          defaultRoiValue: 1200,
          roiMultiplierLabel: "Corporate retainer discovery calls secured per month",
          defaultRoiMultiplier: 3,
          calcResultLabel: "Estimated Monthly Qualified Retainer Sales Pipeline",
          ctaMsg: "Hi! I want to see how the corporate case pre-qualification intake system works for our firm.",
          beneficios: [
            "Custom-built case qualification questionnaire matching your exact practice focus",
            "High-standard, formal, and objective digital operator representing your firm's brand",
            "Seamless calendar coordination for multi-partner or group consultations",
            "Conflict-of-interest intake check to stream client data to your secure CRM"
          ],
          maxTicket: 6000,
          maxMultiplier: 15
        }
      }
    },
    es: {
      emoji: "⚖️",
      industria: "Abogados y Firmas Legales",
      hasProfiles: true,
      profiles: {
        estandar: {
          name: "Abogado Particular / Generalista",
          headline: "Filtra curiosos que buscan asesoría gratis y cobra tus consultas.",
          sub: "Deja de gastar valiosas horas del día en llamadas no facturables con personas que solo quieren respuestas rápidas. Tu asistente digital califica el caso y solo da acceso a tu agenda previo pago de tu tarifa.",
          estadistica: "Ahorra más de 12 horas mensuales de llamadas no facturables y asegura el cobro de tu tiempo.",
          roiLabel: "Valor de tu consulta legal inicial o fee estándar por hora",
          defaultRoiValue: 150,
          roiMultiplierLabel: "Consultas pagadas agendadas de forma automática al mes",
          defaultRoiMultiplier: 8,
          calcResultLabel: "Facturación en Consultas y Valor del Tiempo Ahorrado",
          ctaMsg: "¡Hola! Quiero implementar el filtro de cobro de consultas en mi práctica jurídica.",
          beneficios: [
            "Triage legal automático: recopila los detalles básicos del caso 24/7 por mensaje",
            "Cobro de consulta integrado con Stripe o transferencias locales para asegurar la cita",
            "Coordinación de agenda impecable y directa con tu calendario personal",
            "Filtro amable pero firme para curiosos, liberando tu valioso tiempo diario"
          ],
          maxTicket: 800,
          maxMultiplier: 40
        },
        premium: {
          name: "Firma Corporativa / Alta Complejidad",
          headline: "Precalifica disputas comerciales complejas y clientes corporativos de alto valor.",
          sub: "Filtra e ingresa casos mercantiles, fusiones, reestructuraciones o litigios de alta cuantía. El sistema ejecuta una encuesta de precalificación corporativa y agenda la entrevista solo a directores calificados.",
          estadistica: "Filtra el 80% de las consultas no calificadas y asegura que los socios solo hablen con empresas viables.",
          roiLabel: "Valor del retainer inicial o cita de diagnóstico corporativo premium",
          defaultRoiValue: 1200,
          roiMultiplierLabel: "Llamadas de diagnóstico corporativo cerradas al mes",
          defaultRoiMultiplier: 3,
          calcResultLabel: "Valor del Pipeline Comercial Calificado Mensual",
          ctaMsg: "¡Hola! Quiero ver cómo funciona el sistema de precalificación de casos complejos para nuestra firma.",
          beneficios: [
            "Formulario de calificación profunda a medida de tus áreas de práctica (M&A, tributario, civil)",
            "Tono altamente profesional, formal y estricto acorde a los estándares de tu firma",
            "Coordinación de agenda multi-socio integrada y fluida",
            "Envío directo de datos calificados a tu CRM legal bajo estrictas normas de seguridad"
          ],
          maxTicket: 6000,
          maxMultiplier: 15
        }
      }
    },
    pt: {
      emoji: "⚖️",
      industria: "Advogados e Escritórios de Advocacia",
      hasProfiles: true,
      profiles: {
        estandar: {
          name: "Advogado Particular / Generalista",
          headline: "Filtre curiosos que buscam conselhos gratuitos e cobre por suas consultas.",
          sub: "Pare de perder horas do seu dia em telefonemas não faturáveis com pessoas que só querem tirar dúvidas. Seu assistente qualifica o caso e só libera a agenda após o pagamento da consulta.",
          estadistica: "Economize mais de 12 horas mensais de chamadas não faturáveis e garanta o pagamento do seu tempo.",
          roiLabel: "Valor da sua consulta inicial ou taxa padrão por hora",
          defaultRoiValue: 150,
          roiMultiplierLabel: "Consultas pagas agendadas pelo sistema por mês",
          defaultRoiMultiplier: 8,
          calcResultLabel: "Faturamento em Consultas e Tempo Precioso Economizado",
          ctaMsg: "Olá! Quero implementar o filtro de cobrança de consultas na minha advocacia.",
          beneficios: [
            "Triagem jurídica automática: coleta detalhes básicos do caso 24/7 por texto",
            "Cobrança integrada de consulta com Stripe ou PIX para garantir o agendamento",
            "Sincronização impecável com seu calendário pessoal de compromissos",
            "Filtro polido mas firme para curiosos, liberando sua produtividade diária"
          ],
          maxTicket: 800,
          maxMultiplier: 40
        },
        premium: {
          name: "Escritório Corporativo / Alta Complexidade",
          headline: "Pré-qualifique disputas corporativas complexas e clientes corporativos premium.",
          sub: "Filtre casos mercantis, fusões, tributários ou litígios de alto valor. O sistema executa um roteiro estrito de pré-qualificação corporativa e só agenda reuniões com diretores qualificados.",
          estadistica: "Filtre 80% das consultas irrelevantes, garantindo que os sócios falem apenas com negócios viáveis.",
          roiLabel: "Valor de retainer inicial ou diagnóstico corporativo premium",
          defaultRoiValue: 1200,
          roiMultiplierLabel: "Consultas de diagnóstico corporativo fechadas por mês",
          defaultRoiMultiplier: 3,
          calcResultLabel: "Valor de Pipeline Comercial Qualificado Gerado",
          ctaMsg: "Olá! Quero conhecer o sistema de pré-qualificação de casos corporativos para nosso escritório.",
          beneficios: [
            "Questionário de qualificação profunda customizado para suas áreas de atuação",
            "Tom estritamente profissional, corporativo e corporativo polido",
            "Agendamento integrado multi-sócios inteligente",
            "Integração imediata com seu CRM corporativo com segurança máxima de dados"
          ],
          maxTicket: 6000,
          maxMultiplier: 15
        }
      }
    }
  },
  "clases-privadas": {
    en: {
      emoji: "🎓",
      industria: "Private Academies & Customized Lessons",
      hasProfiles: true,
      profiles: {
        estandar: {
          name: "Routine Tutoring / School Support",
          headline: "Stop answering administrative questions and automate tutor scheduling.",
          sub: "Parents who ask for school support need quick responses. Your digital assistant assesses their requirements, checks teacher calendars, and books introductory diagnostic classes.",
          estadistica: "Matriculate up to 45% more students by scheduling their trial lesson instantly.",
          roiLabel: "Average value of standard school support or lesson package",
          defaultRoiValue: 200,
          roiMultiplierLabel: "New monthly students secured automatically",
          defaultRoiMultiplier: 12,
          calcResultLabel: "Estimated Monthly Extra Class Revenue",
          ctaMsg: "Hi! I want to automate scheduling and intake for standard school tutoring.",
          beneficios: [
            "24/7 intake: checks grade, subject, and student availability",
            "Smart tutor matching based on teacher calendars in real time",
            "Automated setup and reminders for the diagnostic trial class",
            "Coordinated payment capture for tuition or session packages"
          ],
          maxTicket: 800,
          maxMultiplier: 30
        },
        premium: {
          name: "Premium Academies & Executive Coaching",
          headline: "Qualify high-ticket professionals for elite training programs.",
          sub: "Professionals looking for high-end test prep (GMAT/TOEFL) or executive coaching require immediate, top-tier attention. The operator qualifies background, budget, and matches specialized elite tutors.",
          estadistica: "Capture 4 to 8 high-ticket student programs monthly with customized, immediate concierge intake.",
          roiLabel: "Average value of elite training program or executive package",
          defaultRoiValue: 700,
          roiMultiplierLabel: "High-value executive programs secured per month",
          defaultRoiMultiplier: 5,
          calcResultLabel: "Estimated Premium Monthly Education Revenue",
          ctaMsg: "Hi! I want to implement the specialized executive client qualification system for our premium training academy.",
          beneficios: [
            "Strict professional eligibility and objectives qualification questionnaire",
            "Highly polished, high-standard conversational tone for elite professionals",
            "Direct calendar integration with certified elite teachers and coaches",
            "Automated first-payment integration to guarantee specialized high-ticket trials"
          ],
          maxTicket: 4000,
          maxMultiplier: 15
        }
      }
    },
    es: {
      emoji: "🎓",
      industria: "Academias y Clases Privadas",
      hasProfiles: true,
      profiles: {
        estandar: {
          name: "Clases Particulares / Apoyo Escolar",
          headline: "Deja de perder tiempo en coordinaciones y automatiza el agendamiento de tus alumnos.",
          sub: "Los padres que buscan clases de apoyo necesitan respuestas rápidas. Tu asistente digital analiza nivel, materia y disponibilidad, cruzando agendas para agendar la primera clase de prueba.",
          estadistica: "Matricula hasta un 45% más de alumnos coordinando y reservando su clase de prueba al instante.",
          roiLabel: "Valor promedio del paquete mensual o matrícula de apoyo escolar",
          defaultRoiValue: 200,
          roiMultiplierLabel: "Nuevos alumnos matriculados automáticamente al mes",
          defaultRoiMultiplier: 12,
          calcResultLabel: "Ingreso Adicional Estimado del Mes",
          ctaMsg: "¡Hola! Quiero automatizar la coordinación de clases de apoyo escolar en mi academia.",
          beneficios: [
            "Triage interactivo: evalúa curso, materia y disponibilidad del alumno 24/7",
            "Coincidencia inteligente con los calendarios de tus profesores disponibles",
            "Reserva de clase inicial de prueba y recordatorios de asistencia automáticos",
            "Facilidad de pago de matrícula directamente en el mismo chat"
          ],
          maxTicket: 800,
          maxMultiplier: 30
        },
        premium: {
          name: "Academias Premium y Coaching Ejecutivo",
          headline: "Califica y agenda profesionales de alto perfil para tus programas de capacitación elite.",
          sub: "Los ejecutivos que buscan preparación de alto nivel (GMAT/TOEFL/MBAs) exigen inmediatez. Tu operador califica disponibilidad, metas y presupuesto, derivando con el profesor ideal en segundos.",
          estadistica: "Asegura de 4 a 8 programas de alto valor al mes captando al profesional en su punto máximo de interés.",
          roiLabel: "Valor promedio de tu programa de capacitación ejecutiva o mentoría premium",
          defaultRoiValue: 700,
          roiMultiplierLabel: "Programas ejecutivos de alto costo cerrados al mes",
          defaultRoiMultiplier: 5,
          calcResultLabel: "Nuevos Ingresos Mensuales de Alta Gama Generados",
          ctaMsg: "¡Hola! Quiero implementar el calificador de alumnos ejecutivos para nuestra academia premium.",
          beneficios: [
            "Filtro interactivo riguroso de objetivos profesionales y nivel de partida",
            "Tono conversacional formal, ejecutivo e impecable",
            "Integración con las agendas exclusivas de tus consultores o coaches certificados",
            "Pasarela de pago del primer mes integrada para asegurar la sesión de diagnóstico inicial"
          ],
          maxTicket: 4000,
          maxMultiplier: 15
        }
      }
    },
    pt: {
      emoji: "🎓",
      industria: "Academias e Aulas Particulares",
      hasProfiles: true,
      profiles: {
        estandar: {
          name: "Aulas Particulares / Reforço Escolar",
          headline: "Pare de perder tempo com coordenações e automatize o agendamento dos seus alunos.",
          sub: "Pais interessados em reforço escolar precisam de retorno rápido. Seu assistente analisa o ano letivo, matéria e disponibilidade, cruzando agendas para reservar a primeira aula teste.",
          estadistica: "Aumente as matrículas em até 45% reservando a aula experimental na hora, de forma automatizada.",
          roiLabel: "Valor médio do pacote mensal ou matrícula de reforço escolar",
          defaultRoiValue: 200,
          roiMultiplierLabel: "Novos alunos matriculados automaticamente por mês",
          defaultRoiMultiplier: 12,
          calcResultLabel: "Faturamento Mensal Adicional Recuperado",
          ctaMsg: "Olá! Quero automatizar o agendamento de aulas de reforço escolar na minha academia.",
          beneficios: [
            "Triagem 24/7: avalia matéria, série e disponibilidade de horários do aluno",
            "Correspondência inteligente em tempo real com a agenda dos tutores",
            "Reserva da aula experimental e envio de lembretes de presença automático",
            "Facilidade para confirmação de pagamento do pacote no próprio chat"
          ],
          maxTicket: 800,
          maxMultiplier: 30
        },
        premium: {
          name: "Academias Premium e Coaching Executivo",
          headline: "Qualifique e agende profissionais de alto padrão para programas de elite.",
          sub: "Profissionais que buscam preparação avançada (GMAT/TOEFL/MBAs) ou coaching executivo exigem agilidade. Seu operador qualifica o perfil, objetivos e agende o horário na hora.",
          estadistica: "Garanta de 4 a 8 programas de alto padrão por mês qualificando o profissional imediatamente.",
          roiLabel: "Valor médio do programa executivo ou mentoria avançada",
          defaultRoiValue: 700,
          roiMultiplierLabel: "Programas executivos fechados por mês pelo sistema",
          defaultRoiMultiplier: 5,
          calcResultLabel: "Novos Faturamentos Educacionais de Elite Gerados",
          ctaMsg: "Olá! Quero implementar o qualificador de alunos executivos para nossa academia premium.",
          beneficios: [
            "Roteiro inteligente de qualificação de objetivos profissionais e metas",
            "Tom de conversa extremamente polido, profissional e executivo",
            "Integração imediata com a agenda exclusiva de coaches ou consultores",
            "Pagamento do primeiro mês integrado para garantir o início imediato do diagnóstico"
          ],
          maxTicket: 4000,
          maxMultiplier: 15
        }
      }
    }
  }
};
