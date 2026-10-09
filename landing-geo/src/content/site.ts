// Base editorial: Plan maestro GEO 2026 v2 y alcance comercial aprobado.
// Referencias de revisión: developers.google.com/search/docs/appearance/ai-features
// Los ejemplos son conceptuales; los precios quedan pendientes de definición.

export type PlanId = 'diagnosticar' | 'adaptar' | 'acompanar';

export interface SitePlan {
  id: PlanId;
  name: string;
  description: string;
  modality: string;
  price: null;
  monthlyPrice?: null;
  features: string[];
  endStep: number;
  cta: 'Solicitar evaluación';
  initialLabel?: string;
  monthlyLabel?: string;
}

export interface SiteStep {
  title: string;
  description: string;
  shortDescription?: string;
  deliverable: string;
  closing?: string;
  continuity?: string;
}

const plans: SitePlan[] = [
  {
    id: 'diagnosticar',
    name: 'Diagnosticar',
    description: 'Entiende qué información falta y qué conviene incorporar antes de invertir en cambios.',
    modality: 'Trabajo puntual',
    price: null,
    features: [
      'Conversación sobre tu negocio, servicios y objetivos.',
      'Revisión de hasta cinco páginas acordadas de tu web.',
      'Informe de hallazgos y prioridades con evidencia.',
      'Propuesta de incorporaciones con alcance y criterios de comprobación.',
    ],
    endStep: 3,
    cta: 'Solicitar evaluación',
  },
  {
    id: 'adaptar',
    name: 'Adaptar',
    description: 'Convierte las prioridades en información nueva, clara y publicada dentro de tu web.',
    modality: 'Trabajo puntual',
    price: null,
    features: [
      'Todo lo incluido en Diagnosticar.',
      'Hasta tres incorporaciones nuevas acordadas por escrito.',
      'Contenido preparado con hechos que tu equipo valida.',
      'Implementación en una base técnica, coordinada con tu estructura y trabajo existentes.',
      'Comprobación de las piezas nuevas y registro de entrega.',
    ],
    endStep: 5,
    cta: 'Solicitar evaluación',
  },
  {
    id: 'acompanar',
    name: 'Acompañar',
    description: 'Mantén al día las piezas que incorporamos, con una revisión y una mejora mensual acotada.',
    modality: 'Trabajo inicial + acompañamiento mensual',
    price: null,
    monthlyPrice: null,
    initialLabel: 'Trabajo inicial',
    monthlyLabel: 'Acompañamiento mensual',
    features: [
      'Trabajo inicial con el alcance de Adaptar.',
      'Revisión mensual de las piezas incorporadas.',
      'Una mejora menor acordada al mes, de hasta dos horas de trabajo.',
      'Informe mensual con lo observado, lo realizado y los siguientes pasos.',
    ],
    endStep: 6,
    cta: 'Solicitar evaluación',
  },
];

const steps: SiteStep[] = [
  {
    title: 'Conocemos tu negocio',
    shortDescription: 'Entendemos tus servicios y objetivos. Acordamos la revisión y los accesos mínimos.',
    description: 'Entendemos tus servicios, objetivos y público. Acordamos el alcance de revisión, las condiciones y los accesos necesarios.',
    deliverable: 'Un alcance de revisión acordado.',
  },
  {
    title: 'Revisamos tu información',
    shortDescription: 'Revisamos las páginas acordadas: qué explican bien, qué falta y qué conviene incorporar.',
    description: 'Analizamos las páginas acordadas para identificar qué explica bien tu negocio, qué falta y qué conviene incorporar.',
    deliverable: 'Hallazgos sobre las páginas revisadas.',
  },
  {
    title: 'Definimos prioridades',
    shortDescription: 'Ordenamos los hallazgos y definimos piezas, límites y criterios de comprobación.',
    description: 'Entregamos el diagnóstico y una propuesta de incorporaciones, con límites y criterios de comprobación.',
    deliverable: 'Diagnóstico y propuesta de incorporaciones.',
    closing: 'Aquí termina Diagnosticar.',
  },
  {
    title: 'Creamos e incorporamos',
    shortDescription: 'Validamos los hechos contigo e incorporamos hasta tres piezas, coordinados con tu equipo.',
    description: 'Preparamos las piezas acordadas, validamos sus hechos contigo y las implementamos respetando la estructura y el trabajo existentes.',
    deliverable: 'Hasta tres piezas nuevas incorporadas a tu web.',
  },
  {
    title: 'Comprobamos y entregamos',
    shortDescription: 'Comprobamos lectura, enlaces, accesibilidad y publicación. Entregamos el registro.',
    description: 'Revisamos lectura, enlaces, accesibilidad y publicación técnica de las piezas nuevas. Entregamos el registro de trabajo.',
    deliverable: 'Comprobaciones y registro de entrega.',
    closing: 'Aquí termina Adaptar.',
  },
  {
    title: 'Acompañamos cada mes',
    shortDescription: 'Revisamos lo incorporado y realizamos la mejora mensual acordada.',
    description: 'Revisamos las piezas incorporadas, atendemos la mejora mensual acordada y documentamos lo observado.',
    deliverable: 'Una revisión, una mejora menor de hasta dos horas y un informe mensual.',
    continuity: 'Solo para Acompañar.',
  },
];

export const site = {
  brand: {
    name: 'Browns Studio',
    shortName: 'Browns',
    descriptor: 'GEO para empresas de servicios',
    logo: '/brand-small.png',
    logoAlt: 'Browns Studio',
  },
  hero: {
    eyebrow: 'Tu negocio, explicado con claridad',
    title: 'Prepara tu negocio para las búsquedas con IA.',
    description: 'Creamos información clara sobre tus servicios y la incorporamos a tu web, respetando lo que ya funciona, para facilitar su consulta por personas, buscadores y asistentes.',
    cta: 'Solicitar evaluación',
    href: '#contacto',
    note: 'Empezamos por conocer tu negocio y revisar qué necesita tu web.',
  },
  diagram: {
    label: 'Ejemplo conceptual',
    dispersedLabel: 'Información dispersa',
    organizedLabel: 'Tu negocio, más claro',
    fields: ['Servicios', 'Especialidad', 'Cobertura', 'Contacto'],
    caption: 'Conectamos datos de tu negocio en información útil y consultable.',
  },
  navigation: [
    { label: 'Qué hacemos', href: '#que-hacemos' },
    { label: 'Planes', href: '#planes' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Preguntas', href: '#preguntas' },
  ],
  geo: {
    eyebrow: 'Una nueva forma de consultar información',
    title: 'Tu web puede explicar mejor lo que tu empresa hace.',
    description: 'Las búsquedas con IA también consultan información publicada en la web. Prepararte empieza por describir tus servicios con claridad, responder preguntas útiles y mantener información consistente y accesible.',
    definition: 'GEO significa Generative Engine Optimization: preparar información para experiencias de búsqueda con IA. En Browns lo aterrizamos en piezas de contenido concretas, incorporadas a tu web y comprobadas.',
    collaboration: 'Sumamos información útil y coordinamos los cambios con tu equipo o agencia actual. Respetamos su trabajo de SEO, la estructura del sitio y las páginas existentes.',
    outcome: 'Recibes información nueva sobre tu negocio, un alcance definido y un registro de lo que se hizo.',
  },
  incorporations: [
    {
      title: 'Servicios que se entienden',
      description: 'Una página o bloque que explica qué haces, para quién y en qué casos puedes ayudar.',
      purpose: 'Aclarar tu oferta con información específica de tu negocio.',
      scope: 'Una pieza de servicio acordada.',
      acceptance: 'Hechos validados por tu equipo, contenido visible y enlaces comprobados.',
    },
    {
      title: 'Respuestas a preguntas reales',
      description: 'Respuestas útiles sobre tu servicio: alcance, requisitos, forma de trabajo y próximos pasos.',
      purpose: 'Resolver dudas que una persona necesita aclarar antes de contactarte.',
      scope: 'Un bloque de preguntas y respuestas acordado.',
      acceptance: 'Preguntas pertinentes y respuestas verificadas, disponibles en la página.',
    },
    {
      title: 'Contexto sobre tu empresa',
      description: 'Información de especialidad, cobertura y contacto que ayuda a entender quién está detrás del servicio.',
      purpose: 'Relacionar tu oferta con datos reales de tu empresa.',
      scope: 'Una pieza de contexto acordada.',
      acceptance: 'Datos confirmados por tu equipo y referencias coherentes con tu web.',
    },
  ],
  incorporationsNote: 'Son ejemplos de lo que podemos incorporar. Elegimos contigo hasta tres piezas y definimos propósito, alcance y comprobación antes de empezar.',
  plansTitle: 'Un punto de partida para cada necesidad.',
  plansDescription: 'Puedes comenzar por entender qué falta o avanzar hacia la implementación y el acompañamiento. Acordamos el alcance, el precio total y el plazo antes de trabajar.',
  priceLabel: 'Valor por definir',
  plans,
  processTitle: 'Qué pasa después de hablar con Browns',
  processDescription: 'Cada etapa tiene una entrega visible. El plan que elijas define hasta dónde avanzamos juntos.',
  steps,
  example: {
    label: 'Ejemplo conceptual',
    title: 'De una descripción general a un servicio concreto.',
    description: 'Este esquema muestra cómo podría aclararse la información de una empresa de servicios. No es un caso de cliente ni una respuesta generada por un asistente real.',
    before: {
      label: 'Información general',
      title: 'Soluciones para tu empresa',
      text: 'Ofrecemos soluciones integrales y atención personalizada. Contáctanos para saber más.',
    },
    after: {
      label: 'Información específica',
      title: 'Inspección de equipos industriales',
      text: 'Revisión de equipos para empresas que necesitan documentar su condición antes de planificar mantenimiento.',
      details: [
        'Servicio: inspección y registro de hallazgos.',
        'Público: equipos responsables de mantenimiento.',
        'Próximo paso: consultar alcance y disponibilidad.',
      ],
    },
    note: 'En un trabajo real, cada dato se valida con la empresa. Una información más clara facilita la consulta; no demuestra por sí sola más apariciones, visitas o ventas.',
  },
  faqTitle: 'Antes de decidir, aclaremos lo importante.',
  faqs: [
    {
      question: '¿Van a hacer que aparezca en ChatGPT o Google?',
      answer: 'No podemos garantizar una aparición, posición o recomendación. Podemos crear y comprobar las incorporaciones acordadas para que tu información sea más clara y se pueda consultar. Cada plataforma decide qué muestra.',
    },
    {
      question: '¿Reemplazan el trabajo de mi agencia SEO?',
      answer: 'No. El SEO sigue siendo relevante para las búsquedas con IA. Sumamos información nueva sobre tus servicios y nos coordinamos con tu equipo o agencia. Si un bloqueo existente impide avanzar, lo documentamos y te informamos antes de implementar para coordinar con su responsable. No cambiamos silenciosamente las URL, las reglas de acceso ni la estrategia SEO existente.',
    },
    {
      question: '¿Qué cuenta como una incorporación?',
      answer: 'Una pieza nueva definida por escrito, como una página de servicio o un bloque de preguntas frecuentes. Acordamos su propósito, contenido, ubicación y forma de comprobarla. No contamos cada frase o etiqueta como una incorporación distinta.',
    },
    {
      question: '¿Necesito cambiar o reconstruir mi web?',
      answer: 'Trabajamos sobre una web existente y respetamos su estructura. Primero revisamos qué se puede incorporar con la tecnología y los accesos disponibles. Un rediseño, una migración o una aplicación nueva requieren otro alcance.',
    },
    {
      question: '¿Cuánto cuesta y cuándo se entrega?',
      answer: 'Los valores están por definir. Después de revisar tu sitio y lo que necesitas, acordamos una propuesta con alcance, precio total, impuestos aplicables y plazo. No comienzas un trabajo sin conocer esas condiciones.',
    },
    {
      question: '¿Qué incluye el acompañamiento mensual?',
      answer: 'Revisamos las piezas que incorporamos, realizamos una mejora menor acordada de hasta dos horas y entregamos un informe mensual. No incluye mantenimiento de toda la web, soporte ilimitado, nuevas integraciones ni piezas adicionales fuera del alcance.',
    },
    {
      question: '¿Qué necesitan de mi empresa?',
      answer: 'Para conversar, basta con la URL pública de tu web y tu objetivo. Para incorporar contenido necesitamos hechos verificables, una persona que los valide y los accesos mínimos acordados. No envíes contraseñas ni datos sensibles por los canales de evaluación.',
    },
  ],
  limits: {
    title: 'Un alcance claro desde el inicio.',
    description: 'Trabajamos con información real y entregables que podemos comprobar. Una aparición en respuestas de IA, tráfico o ventas no forman parte de las garantías de estos planes.',
    items: [
      'Sin sustitución del SEO ni cambios generales de URL, canonical o robots.',
      'Sin rediseño completo, migración, campañas o generación masiva de contenido.',
      'Sin chatbots, agentes transaccionales o integraciones dentro de estos planes.',
      'Sin soporte ilimitado ni trabajo adicional no acordado.',
    ],
  },
  contact: {
    title: 'Veamos qué necesita tu web.',
    description: 'Compártenos la URL pública de tu web y qué servicio quieres que se entienda mejor. Revisamos el encaje y luego acordamos alcance, precio total y plazo.',
    cta: 'Solicitar evaluación',
    whatsapp: 'https://wa.me/12028808642',
    email: 'contacto@brownsstudio.dev',
    location: 'Santiago, Chile',
    whatsappLabel: 'Solicitar evaluación por WhatsApp',
    emailLabel: 'Solicitar evaluación por correo',
    message: 'Hola, Browns Studio. Quiero evaluar cómo preparar mi web para buscadores y asistentes de IA. ¿Podemos revisar el alcance?',
    emailSubject: 'Solicitud de evaluación GEO',
    note: 'No envíes contraseñas ni información sensible. WhatsApp abre una aplicación externa.',
  },
  footer: {
    description: 'Información clara para personas, buscadores y asistentes.',
    location: 'Santiago, Chile',
  },
};

export const directionExamples = {
  label: 'Ejemplo conceptual',
  note: 'Ejemplos ilustrativos. La información de cada negocio se valida antes de publicarla',
  items: [
    {
      id: 'dental',
      selectorLabel: 'Clínica dental',
      title: 'Evaluación dental inicial',
      question: '¿Cómo pido una primera evaluación dental?',
      facts: [
        { label: 'Atención', value: 'evaluación inicial para nuevos pacientes.' },
        { label: 'Modalidad', value: 'consulta presencial.' },
        { label: 'Próximo paso', value: 'Solicitar una hora de evaluación.' },
      ],
    },
    {
      id: 'legal',
      selectorLabel: 'Estudio de abogados',
      title: 'Revisión de contratos',
      question: '¿Pueden revisar mi contrato de arriendo antes de firmarlo?',
      facts: [
        { label: 'Servicio', value: 'revisión de contratos de arriendo.' },
        { label: 'Para quién', value: 'personas que van a arrendar un inmueble.' },
        { label: 'Próximo paso', value: 'Consultar qué documentos se necesitan para solicitar una revisión.' },
      ],
    },
  ],
} as const;

export const directionFaqs: readonly { question: string; answer: string }[] = [
  ...site.faqs,
  {
    question: '¿Qué trabajos necesitan un alcance distinto?',
    answer: 'Los rediseños completos, migraciones, campañas, automatizaciones e integraciones requieren un alcance distinto. Estos planes se centran en crear, incorporar y revisar las piezas de información acordadas.',
  },
];

export type SiteContent = typeof site;
