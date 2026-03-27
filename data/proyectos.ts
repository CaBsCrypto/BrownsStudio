export interface Proyecto {
  slug: string;
  nombre: string;
  tipo: string;
  descripcion: string;
  descripcionLarga: string;
  tecnologias: string[];
  color: string;
  colorAccent: string;
  caracteristicas: string[];
  resultado: string;
  quote: string;
  quoteAutor: string;
  linkDemo?: string;
  año: number;
  comingSoon?: boolean;
}

export const proyectos: Proyecto[] = [
  {
    slug: "estudio-morales-araya",
    nombre: "Estudio Morales Araya",
    tipo: "Estudio Jurídico",
    descripcion:
      "Web corporativa para estudio jurídico con presentación de áreas de práctica, equipo profesional y formulario de consulta confidencial. Diseñada para proyectar autoridad y generar confianza.",
    descripcionLarga:
      "Estudio Morales Araya necesitaba una presencia digital que transmitiera autoridad y seriedad. Desarrollamos un sitio corporativo sobrio y elegante con presentación detallada de las áreas de práctica, perfil del equipo de abogados, y formulario de consulta con confidencialidad garantizada.",
    tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "Resend"],
    color: "linear-gradient(135deg, #0f1923 0%, #1a2d3d 50%, #1e3a4a 100%)",
    colorAccent: "#c8a45e",
    caracteristicas: [
      "Presentación de áreas de práctica",
      "Perfil del equipo de abogados",
      "Formulario de consulta confidencial",
      "Diseño corporativo premium",
      "SEO local para búsquedas jurídicas",
      "Responsive y optimizado",
    ],
    resultado: "Presencia digital profesional que transmite autoridad y genera consultas calificadas.",
    quote: "Exactamente lo que un estudio legal necesita — sobrio, profesional y que genera confianza.",
    quoteAutor: "Estudio Morales Araya",
    año: 2025,
  },
  {
    slug: "pizza-dao",
    nombre: "Pizza DAO",
    tipo: "Comunidad Web3",
    descripcion:
      "Hub digital para comunidad descentralizada de pizza y Web3 en LATAM. Plataforma para eventos, gobernanza y contenido de la comunidad con identidad visual única.",
    descripcionLarga:
      "Pizza DAO es una comunidad Web3 que celebra la cultura de la pizza en el ecosistema crypto de LATAM. Creamos su hub digital combinando la calidez de la pizza con la estética del mundo descentralizado. Centraliza eventos, anuncios y el espíritu único de la comunidad.",
    tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "Web3"],
    color: "linear-gradient(135deg, #1a0800 0%, #7a1a00 50%, #bf3a1a 100%)",
    colorAccent: "#FF6B35",
    caracteristicas: [
      "Hub de eventos de la comunidad",
      "Identidad visual Web3 + pizza",
      "Sección de anuncios y gobernanza",
      "Diseño mobile-first",
      "Integración con redes sociales",
      "Performance optimizado",
    ],
    resultado: "Hub comunitario que unifica la identidad digital de Pizza DAO en LATAM.",
    quote: "Lograron capturar perfectamente la vibra — crypto y pizza en un solo lugar.",
    quoteAutor: "Pizza DAO LATAM",
    año: 2025,
  },
  {
    slug: "musica-w3",
    nombre: "Musica W3",
    tipo: "Música + Web3",
    descripcion:
      "Plataforma web para artistas y comunidad de música en Web3. Showcase de artistas, eventos y la fusión entre música independiente y tecnología descentralizada.",
    descripcionLarga:
      "Musica W3 nace de la intersección entre la música independiente y el ecosistema Web3. Diseñamos una plataforma con estética visual premium que refleja esta dualidad — la calidez del arte musical y la frialdad tecnológica del mundo crypto.",
    tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "Web3"],
    color: "linear-gradient(135deg, #1a0d2e 0%, #4a1272 50%, #7b2d8b 100%)",
    colorAccent: "#c084fc",
    caracteristicas: [
      "Showcase de artistas",
      "Calendario de eventos",
      "Identidad visual música + Web3",
      "Diseño premium y envolvente",
      "Integración con plataformas musicales",
      "Responsive perfecto",
    ],
    resultado: "Plataforma que posiciona a Musica W3 como referente de música descentralizada en LATAM.",
    quote: "Arte y tecnología en perfecta armonía — exactamente lo que queríamos.",
    quoteAutor: "Musica W3",
    año: 2025,
  },
  {
    slug: "discord-analytics-bot",
    nombre: "Discord Analytics Bot",
    tipo: "Bot / Automatización",
    descripcion:
      "Bot de Discord para análisis de datos de comunidades. Genera métricas de engagement, reportes automáticos y dashboards en tiempo real directamente en Discord.",
    descripcionLarga:
      "Las comunidades de Discord necesitan datos para crecer. Desarrollamos un bot que genera reportes de actividad, métricas de engagement, análisis de retención y dashboards visuales directamente en Discord, powered por IA.",
    tecnologias: ["Python", "Discord.py", "OpenAI API", "Pandas", "PostgreSQL"],
    color: "linear-gradient(135deg, #1a1d2e 0%, #23284a 50%, #2d3561 100%)",
    colorAccent: "#5865F2",
    caracteristicas: [
      "Reportes de actividad automáticos",
      "Métricas de engagement por canal",
      "Análisis de retención de miembros",
      "Comandos de consulta en tiempo real",
      "Resúmenes semanales con IA",
      "Integración con PostgreSQL",
    ],
    resultado: "Comunidades con datos accionables para tomar decisiones de crecimiento informadas.",
    quote: "Por fin tenemos los datos que necesitamos — y el bot los entrega solos.",
    quoteAutor: "Discord Analytics Bot",
    año: 2025,
  },
  {
    slug: "cms-agencia-marketing",
    nombre: "CMS Agencia Marketing",
    tipo: "Sistema de Gestión",
    descripcion:
      "Sistema de gestión de contenido personalizado para agencia y comunidad de marketing. Calendario editorial, flujo de aprobación y publicación multi-plataforma.",
    descripcionLarga:
      "Construimos un CMS personalizado que centraliza todo el flujo editorial: calendario visual, sistema de aprobación por roles, generación asistida por IA y publicación coordinada en múltiples plataformas.",
    tecnologias: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "OpenAI"],
    color: "linear-gradient(135deg, #0a1a12 0%, #0d3321 50%, #1a5c3a 100%)",
    colorAccent: "#34d399",
    caracteristicas: [
      "Calendario editorial visual",
      "Sistema de roles y aprobaciones",
      "Generación de contenido con IA",
      "Publicación multi-plataforma",
      "Dashboard de rendimiento",
      "Colaboración en tiempo real",
    ],
    resultado: "Flujo de contenido organizado que reduce el tiempo de producción a la mitad.",
    quote: "Pasamos del caos de los DMs a tener todo el contenido organizado en un solo lugar.",
    quoteAutor: "CMS Agencia Marketing",
    año: 2025,
  },
  {
    slug: "rhythm-slice",
    nombre: "Rhythm Slice",
    tipo: "Videojuego",
    descripcion:
      "Juego estilo Guitar Hero con temática de pizzas. Cada nota es un ingrediente, cada canción una pizza diferente. Rhythm game donde cocinar es tocar música.",
    descripcionLarga:
      "Rhythm Slice nace de dos pasiones: la pizza y la música. Es un rhythm game donde el jugador cocina pizzas siguiendo el ritmo — cada ingrediente cae al compás de la música y hay que capturarlo en el momento exacto.",
    tecnologias: ["Unity", "C#", "Web Build", "FMOD"],
    color: "linear-gradient(135deg, #1a0520 0%, #6b1fb1 35%, #e91e8c 65%, #ff6b35 100%)",
    colorAccent: "#e91e8c",
    caracteristicas: [
      "Mecánica rhythm game clásica",
      "Temática de pizza única",
      "Niveles con diferentes pizzas/canciones",
      "Efectos visuales coloridos",
      "Build para web y desktop",
      "Sistema de puntuación y combos",
    ],
    resultado: "En desarrollo activo — lanzamiento próximamente.",
    quote: "El juego más sabroso que vas a jugar este año.",
    quoteAutor: "Browns Studio",
    año: 2025,
    comingSoon: true,
  },
];

export function getProyectoBySlug(slug: string): Proyecto | undefined {
  return proyectos.find((p) => p.slug === slug);
}
