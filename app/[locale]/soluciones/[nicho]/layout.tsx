import type { Metadata } from "next";
import { solucionesData } from "@/lib/solucionesData";
import { SITE_CONFIG } from "@/lib/config";

interface LayoutProps {
  params: Promise<{ locale: string; nicho: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; nicho: string }> }): Promise<Metadata> {
  const { locale, nicho } = await params;
  
  // Safely get data for target niche and locale
  const nicheEntry = solucionesData[nicho] || solucionesData.dentistas;
  const t = nicheEntry[locale as keyof typeof nicheEntry] || nicheEntry.es;
  const base = SITE_CONFIG.url.replace(/\/$/, "");

  // Highly targeted meta titles, descriptions, and transactional keywords for search engines
  const seoData: Record<string, Record<string, { title: string; desc: string; keywords: string[] }>> = {
    onboarding: {
      es: {
        title: "Agente de Onboarding e Inducción IA para Empresas | Browns Studio",
        desc: "Automatiza la capacitación de personal y entrenamiento corporativo con Inteligencia Artificial. Onboarding automatizado con IA integrado en Slack, Teams o WhatsApp.",
        keywords: ["onboarding automatizado con IA", "agente de inducción para empresas", "capacitación personal IA", "automatización recursos humanos", "inducción de empleados IA", "manual corporativo interactivo"]
      },
      en: {
        title: "AI Employee Onboarding & Corporate Training Agent | Browns Studio",
        desc: "Automate corporate training and staff onboarding with conversational AI agents. 24/7 B2B operations trainer integrated with Slack, Teams, or WhatsApp.",
        keywords: ["AI employee onboarding assistant", "automated B2B training agent", "AI hr automation", "interactive knowledge base training", "corporate onboarding AI"]
      },
      pt: {
        title: "Agente de Onboarding e Integração de Funcionários IA | Browns Studio",
        desc: "Automatize o treinamento de funcionários com IA. Onboarding de pessoal 24/7 integrado com Slack, Teams ou WhatsApp para empresas e recursos humanos.",
        keywords: ["onboarding automatizado com IA", "agente de integração de funcionários", "automação de RH IA", "treinamento corporativo inteligente", "manual de integração IA"]
      }
    },
    dentistas: {
      es: {
        title: "Agente de IA y WhatsApp para Clínicas Dentales | Browns Studio",
        desc: "Automatiza la reserva de citas y atención de pacientes de odontología 24/7. Integra tu agenda dental y llena huecos libres automáticamente.",
        keywords: ["agente de IA para dentistas", "automatización clínica dental", "chatbot odontológico", "agenda dental automática", "recordatorio citas dentistas"]
      },
      en: {
        title: "AI & WhatsApp Agent for Dental Clinics | Browns Studio",
        desc: "Automate appointment booking and 24/7 dental patient support. Integrate your calendar and fill empty slots on autopilot.",
        keywords: ["AI agent for dentists", "dental clinic automation", "dental chatbot", "automated appointment scheduling", "patient recall system"]
      },
      pt: {
        title: "Agente de IA e WhatsApp para Clínicas Odontológicas | Browns Studio",
        desc: "Automatize o agendamento de consultas e atendimento de pacientes 24/7. Integre sua agenda e preencha horários vagos automaticamente.",
        keywords: ["agente de IA para dentistas", "automação de clínica odontológica", "chatbot odontológico", "agendamento automático dentista"]
      }
    },
    salud: {
      es: {
        title: "Agente de IA para Centros de Salud y Especialidades | Browns Studio",
        desc: "Automatiza la recepción médica, filtra convenios y gestiona el agendamiento de consultas 24/7 con IA sin esperas.",
        keywords: ["agente de IA médico", "automatización centro de salud", "recepcionista virtual clínica", "filtrado seguros médicos", "citas médicas automáticas"]
      },
      en: {
        title: "AI Agent for Medical & Health Clinics | Browns Studio",
        desc: "Automate medical reception, verify insurance, and schedule clinical consultations 24/7. Optimize medical staff workflows.",
        keywords: ["AI agent for health clinics", "medical practice automation", "virtual clinic receptionist", "automated medical scheduling", "health center chatbot"]
      },
      pt: {
        title: "Agente de IA para Centros de Saúde e Especialidades | Browns Studio",
        desc: "Automatize a recepção médica, filtre convênios e gerencie o agendamento de consultas 24/7 sem esperas por WhatsApp.",
        keywords: ["agente de IA médico", "automação de centro de saúde", "recepcionista virtual clínica", "agendamento médico automático"]
      }
    },
    estetica: {
      es: {
        title: "Agente de IA y WhatsApp para Clínicas Estéticas | Browns Studio",
        desc: "Capta pacientes calificados para tratamientos de alto valor (Botox, ácido hialurónico) y agenda evaluaciones automáticamente.",
        keywords: ["agente de IA para estética", "automatización clínica estética", "calificación pacientes VIP", "reserva estética automática", "chatbot spa de belleza"]
      },
      en: {
        title: "AI & WhatsApp Agent for Aesthetic Spas & Clinics | Browns Studio",
        desc: "Capture qualified patients for high-ticket treatments (Botox, fillers) and secure assessment bookings automatically 24/7.",
        keywords: ["AI agent for aesthetic clinic", "medspa automation", "VIP patient qualification", "beauty salon booking system"]
      },
      pt: {
        title: "Agente de IA para Clínicas de Estética e Spas | Browns Studio",
        desc: "Capte clientes qualificados para procedimentos de alto padrão (Botox, preenchedores) e agende avaliações 24/7.",
        keywords: ["agente de IA para estética", "automação de clínica estética", "qualificação de clientes VIP", "agendamento spa automático"]
      }
    },
    abogados: {
      es: {
        title: "Asistente de IA Legal y Filtro de Clientes para Abogados | Browns Studio",
        desc: "Filtra consultas jurídicas no facturables, recopila detalles de casos 24/7 y asegura el pago de tu consulta inicial automáticamente.",
        keywords: ["agente de IA para abogados", "automatización estudio jurídico", "triage legal automático", "cobro de consulta inicial", "asistente legal virtual"]
      },
      en: {
        title: "AI Legal Assistant & Client Intake for Law Firms | Browns Studio",
        desc: "Filter non-billable consultations, collect case details 24/7, and guarantee initial consultation fees automatically.",
        keywords: ["AI agent for lawyers", "law firm automation", "automated client intake", "legal triage chatbot", "attorney billing helper"]
      },
      pt: {
        title: "Assistente de IA Jurídico e Triagem para Advogados | Browns Studio",
        desc: "Filtre consultas não faturáveis, colete detalhes do caso 24/7 e garanta o pagamento da consulta de forma automática.",
        keywords: ["agente de IA para advogados", "automação de escritório de advocacia", "triagem jurídica automática", "PIX cobrança consulta"]
      }
    },
    "clases-privadas": {
      es: {
        title: "Agente de IA para Academias y Clases Particulares | Browns Studio",
        desc: "Automatiza la coordinación de agendas de profesores, matricula alumnos 24/7 y gestiona clases de prueba al instante.",
        keywords: ["agente de IA para academias", "automatización clases particulares", "coordinación de tutores automática", "matrícula alumnos WhatsApp"]
      },
      en: {
        title: "AI Agent for Private Academies & Customized Lessons | Browns Studio",
        desc: "Automate teacher schedule coordination, register students 24/7, and schedule diagnostic trial classes instantly.",
        keywords: ["AI agent for education", "tutoring automation", "automated class booking", "student registration chatbot"]
      },
      pt: {
        title: "Agente de IA para Academias e Aulas Particulares | Browns Studio",
        desc: "Automatize a coordenação de agendas de professores, matricule novos alunos 24/7 e gerencie aulas experimentais.",
        keywords: ["agente de IA para escolas", "automação de aulas particulares", "coordenação de professores", "matrícula alunos WhatsApp"]
      }
    },
    propiedades: {
      es: {
        title: "Agente de IA para Inmobiliarias y Corredores de Propiedades | Browns Studio",
        desc: "Precalifica presupuesto e historial de crédito 24/7 y coordina visitas de pilotos de manera 100% automática.",
        keywords: ["agente de IA para inmobiliarias", "automatización corredores de propiedades", "precalificación inquilinos automática", "agendamiento visitas pilotos"]
      },
      en: {
        title: "AI Agent for Real Estate & Agencies | Browns Studio",
        desc: "Pre-qualify budget, income and credit 24/7, and schedule properties/showroom viewings 100% automatically.",
        keywords: ["AI agent for real estate", "real estate automation", "automated tenant prequalification", "viewing coordinator chatbot"]
      },
      pt: {
        title: "Agente de IA para Imobiliárias e Incorporadoras | Browns Studio",
        desc: "Pré-qualifique renda, orçamento e crédito 24/7 e coordene visitas a decorados de forma 100% automática.",
        keywords: ["agente de IA para imobiliária", "automação de imobiliárias", "pré-qualificação de inquilinos", "agendamento visitas decorado"]
      }
    }
  };

  // Fallback to title and description constructed from data
  const currentSeo = seoData[nicho]?.[locale] || {
    title: `${t.profiles.estandar.headline} | ${SITE_CONFIG.name}`,
    desc: t.profiles.estandar.sub.substring(0, 155) + "...",
    keywords: [t.industria, "agente de IA", "automatización de procesos"]
  };

  return {
    title: currentSeo.title,
    description: currentSeo.desc,
    keywords: currentSeo.keywords,
    alternates: {
      canonical: `${base}/${locale}/soluciones/${nicho}`,
      languages: {
        es: `${base}/es/soluciones/${nicho}`,
        en: `${base}/en/soluciones/${nicho}`,
        pt: `${base}/pt/soluciones/${nicho}`,
        "x-default": `${base}/es/soluciones/${nicho}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_419" : locale === "pt" ? "pt_BR" : "en_US",
      url: `${base}/${locale}/soluciones/${nicho}`,
      title: currentSeo.title,
      description: currentSeo.desc,
      siteName: SITE_CONFIG.name,
    },
    twitter: {
      card: "summary_large_image",
      title: currentSeo.title,
      description: currentSeo.desc,
    }
  };
}

export default function NicheLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
