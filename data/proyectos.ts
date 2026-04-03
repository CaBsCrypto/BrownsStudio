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
    slug: "pizzadao-musica-w3",
    nombre: "PizzaDAO x Musica W3",
    tipo: "Música + Web3",
    descripcion:
      "Plataforma conjunta para la primera convocatoria musical descentralizada del mundo hispanohablante. $350 USDC en premios y canciones CC0 como banda sonora del PizzaDAO Game.",
    descripcionLarga:
      "MusicaW3 y PizzaDAO unieron fuerzas para crear la primera convocatoria musical descentralizada del mundo hispanohablante. Construimos el hub completo: conexión de wallets, sistema de participación, presentación de premios en USDC y todo el diseño de la experiencia. Las canciones ganadoras con licencia CC0 se integran como banda sonora oficial del PizzaDAO Game, actualmente en desarrollo activo.",
    tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "Web3", "Wallet Connect"],
    color: "linear-gradient(135deg, #1a0d2e 0%, #4a1272 50%, #bf3a1a 100%)",
    colorAccent: "#c084fc",
    caracteristicas: [
      "Convocatoria musical con premios USDC",
      "Conexión de wallets blockchain",
      "Licencia CC0 para obras ganadoras",
      "Banda sonora del PizzaDAO Game",
      "Diseño mobile-first",
      "Comunidad hispana Web3",
    ],
    resultado: "Primera plataforma que une música independiente y Web3 para la comunidad hispanohablante.",
    quote: "Crea música con pizza y web3 — la primera convocatoria musical de PizzaDAO para el mundo hispanohablante.",
    quoteAutor: "PizzaDAO x Musica W3",
    linkDemo: "https://pizzadao-mw3.vercel.app",
    año: 2025,
  },
  {
    slug: "cms-agencia-marketing",
    nombre: "Umbra Creator Hub",
    tipo: "Plataforma para Creadores",
    descripcion:
      "Plataforma de gestión de contenido para creadores y agencias de marketing. Flujo editorial centralizado, aprobaciones por roles y publicación coordinada.",
    descripcionLarga:
      "Umbra Creator Hub es la plataforma que centraliza todo el flujo de contenido para agencias y comunidades de marketing. Desde la ideación hasta la publicación, cada pieza de contenido pasa por un sistema de roles y aprobaciones antes de salir. Diseñado para el caos creativo de una agencia real, con generación asistida por IA y colaboración en tiempo real.",
    tecnologias: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "OpenAI"],
    color: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
    colorAccent: "#818cf8",
    caracteristicas: [
      "Calendario editorial visual",
      "Sistema de roles y aprobaciones",
      "Generación de contenido con IA",
      "Publicación multi-plataforma",
      "Dashboard de rendimiento",
      "Colaboración en tiempo real",
    ],
    resultado: "Flujo editorial organizado que elimina el caos de los DMs y acelera la producción.",
    quote: "Del caos de los DMs a un hub centralizado donde todo el contenido fluye.",
    quoteAutor: "Umbra Creator Hub",
    linkDemo: "https://creator-hub-three-lake.vercel.app",
    año: 2025,
  },
  {
    slug: "discord-analytics-bot",
    nombre: "BS Discord Tracker",
    tipo: "Bot / Automatización",
    descripcion:
      "Herramienta para saber exactamente quién está participando en tu servidor de Discord. Monitoreo de asistencia y presencia de miembros en tiempo real.",
    descripcionLarga:
      "Las comunidades de Discord necesitan saber quién participa activamente y quién no. Construimos BS Discord Tracker, una herramienta que monitorea la asistencia y presencia de miembros en servidores de Discord, dando a los administradores visibilidad total sobre la participación de su comunidad en tiempo real.",
    tecnologias: ["Python", "Discord.py", "Next.js", "PostgreSQL", "Vercel"],
    color: "linear-gradient(135deg, #1a1d2e 0%, #23284a 50%, #2d3561 100%)",
    colorAccent: "#5865F2",
    caracteristicas: [
      "Monitoreo de asistencia en tiempo real",
      "Tracking de presencia por miembro",
      "Panel web de visualización",
      "Historial de participación",
      "Gestión de múltiples servidores",
      "Integración directa con Discord API",
    ],
    resultado: "Comunidades con visibilidad total sobre quién realmente está mostrándose.",
    quote: "Know exactly who's showing up.",
    quoteAutor: "BS Discord Tracker",
    linkDemo: "https://discord-tracker-three.vercel.app",
    año: 2025,
  },
  {
    slug: "estudio-morales-araya",
    nombre: "Estudio Morales Araya",
    tipo: "Estudio Jurídico",
    descripcion:
      "Web para estudio de abogadas especializado en derecho de familia, laboral y civil. Atención personalizada, confidencial y con enfoque humano.",
    descripcionLarga:
      "Soledad Araya Molina y Macarena Morales Gómez necesitaban una presencia digital que transmitiera autoridad y cercanía. Desarrollamos un sitio corporativo sobrio y elegante que presenta sus áreas de práctica — divorcios, pensión de alimentos, despidos, escrituras públicas, arrendamientos y cambio de nombre — junto con un formulario de consulta confidencial y toda la información de contacto para clientes en Chile.",
    tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "Resend"],
    color: "linear-gradient(135deg, #0f1923 0%, #1a2d3d 50%, #1e3a4a 100%)",
    colorAccent: "#c8a45e",
    caracteristicas: [
      "Presentación de áreas de práctica",
      "Perfil de Soledad Araya y Macarena Morales",
      "Formulario de consulta confidencial",
      "Diseño corporativo premium",
      "SEO local para búsquedas jurídicas",
      "Contacto directo y horarios",
    ],
    resultado: "Presencia digital profesional que transmite autoridad y genera consultas calificadas.",
    quote: "Estudio jurídico especializado en derecho de familia, laboral y civil. Atención personalizada, confidencial y con enfoque humano.",
    quoteAutor: "Estudio Morales Araya",
    linkDemo: "https://estudiomoralesaraya.vercel.app",
    año: 2025,
  },
  {
    slug: "gm-nail-artist",
    nombre: "GM Nail Artist",
    tipo: "Estudio de Uñas",
    descripcion:
      "Sitio web para estudio de nail art profesional. Galería de diseños, servicios, precios y agenda online para clientes.",
    descripcionLarga:
      "GM Nail Artist necesitaba una presencia digital que mostrara su trabajo y facilitara el agendamiento de citas. Desarrollamos un sitio elegante con galería de diseños, catálogo de servicios con precios, y sistema de reservas para que sus clientes puedan agendar directamente desde la web.",
    tecnologias: ["Next.js", "TypeScript", "Tailwind CSS"],
    color: "linear-gradient(135deg, #1a0a14 0%, #4a1030 50%, #8b2252 100%)",
    colorAccent: "#f472b6",
    caracteristicas: [
      "Galería de diseños de nail art",
      "Catálogo de servicios y precios",
      "Sistema de agendamiento online",
      "Diseño mobile-first",
      "Presentación de la artista",
      "Contacto directo por WhatsApp",
    ],
    resultado: "Presencia digital que convierte visitas en reservas para el estudio.",
    quote: "Tu nail art, tu estilo — agenda tu cita online.",
    quoteAutor: "GM Nail Artist",
    linkDemo: "https://gm-nailartist.vercel.app",
    año: 2025,
  },
  {
    slug: "rhythm-slice",
    nombre: "Rhythm Slice",
    tipo: "ZK Rhythm Game",
    descripcion:
      "Juego de ritmo estilo Guitar Hero con temática de pizzas y tecnología Zero-Knowledge sobre Stellar. Cada nota es un ingrediente, cada canción una pizza diferente.",
    descripcionLarga:
      "Rhythm Slice combina mecánicas de rhythm game con la blockchain de Stellar y Zero-Knowledge proofs. El jugador cocina pizzas siguiendo el ritmo de la música — cada ingrediente cae al compás y hay que capturarlo en el momento exacto. Construido en un hackathon, integra ZK para verificación de puntajes on-chain de forma transparente y sin revelar datos privados.",
    tecnologias: ["Unity", "C#", "Stellar", "Zero-Knowledge", "Web Build"],
    color: "linear-gradient(135deg, #1a0520 0%, #6b1fb1 35%, #e91e8c 65%, #ff6b35 100%)",
    colorAccent: "#e91e8c",
    caracteristicas: [
      "Mecánica rhythm game clásica",
      "Temática de pizza única",
      "ZK proofs sobre Stellar blockchain",
      "Verificación de puntajes on-chain",
      "Build para web",
      "Sistema de combos y puntuación",
    ],
    resultado: "En desarrollo activo — el primer ZK rhythm game sobre Stellar.",
    quote: "Rhythm Slice — ZK Rhythm Game on Stellar.",
    quoteAutor: "Browns Studio",
    linkDemo: "https://cabscrypto.github.io/guitarPizza--AntiGravity/",
    año: 2025,
    comingSoon: true,
  },
];

export function getProyectoBySlug(slug: string): Proyecto | undefined {
  return proyectos.find((p) => p.slug === slug);
}
