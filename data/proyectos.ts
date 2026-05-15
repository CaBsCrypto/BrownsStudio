import { Lang } from "@/lib/i18n/LanguageContext";

export interface Proyecto {
  slug: string;
  nombre: string;
  tipo: Record<Lang, string>;
  descripcion: Record<Lang, string>;
  descripcionLarga: Record<Lang, string>;
  tecnologias: string[];
  color: string;
  colorAccent: string;
  caracteristicas: Record<Lang, string[]>;
  resultado: Record<Lang, string>;
  quote: Record<Lang, string>;
  quoteAutor: string;
  linkDemo?: string;
  año: number;
  comingSoon?: boolean;
}

export const proyectos: Proyecto[] = [
  {
    slug: "trust-leaf",
    nombre: "Trust Leaf",
    tipo: {
      es: "Plataforma HealthTech",
      en: "HealthTech Platform",
      pt: "Plataforma HealthTech",
    },
    descripcion: {
      es: "Plataforma integral que conecta a pacientes, profesionales y dispensarios para un acceso seguro y trazable al cannabis medicinal.",
      en: "Comprehensive platform connecting patients, professionals, and dispensaries for secure and traceable access to medical cannabis.",
      pt: "Plataforma abrangente que conecta pacientes, profissionais e dispensários para acesso seguro e rastreável à cannabis medicinal.",
    },
    descripcionLarga: {
      es: "Trust Leaf es una plataforma diseñada para resolver la falta de trazabilidad y seguridad en el acceso al cannabis medicinal. Permite a los pacientes mantener el control total de su información clínica con privacidad, al mismo tiempo que garantiza que los médicos puedan emitir recetas verificables y los dispensarios registren entregas precisas. Un ecosistema completo para una gestión médica transparente y regulada.",
      en: "Trust Leaf is a platform designed to resolve the lack of traceability and security in medical cannabis access. It allows patients to maintain full control of their clinical information with privacy, while ensuring that doctors can issue verifiable prescriptions and dispensaries record accurate deliveries. A complete ecosystem for transparent and regulated medical management.",
      pt: "Trust Leaf é uma plataforma projetada para resolver a falta de rastreabilidade e segurança no acesso à cannabis medicinal. Permite que os pacientes mantenham o controle total de suas informações clínicas com privacidade, garantindo que os médicos possam emitir receitas verificáveis e os dispensários registrem entregas precisas. Um ecossistema completo para uma gestão médica transparente e regulamentada.",
    },
    tecnologias: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    color: "linear-gradient(135deg, #0A2A21 0%, #154734 50%, #C5A070 100%)",
    colorAccent: "#C5A070",
    caracteristicas: {
      es: [
        "Portal exclusivo para pacientes",
        "Panel de gestión para profesionales",
        "Administración y registro de dispensarios",
        "Trazabilidad total de recetas y entregas",
        "Control de privacidad clínica",
        "Monitoreo de cumplimiento regulatorio",
      ],
      en: [
        "Exclusive patient portal",
        "Management dashboard for professionals",
        "Dispensary administration and registration",
        "Total traceability of prescriptions and deliveries",
        "Clinical privacy control",
        "Regulatory compliance monitoring",
      ],
      pt: [
        "Portal exclusivo para pacientes",
        "Painel de gestão para profissionais",
        "Administração e registro de dispensários",
        "Rastreabilidade total de receitas e entregas",
        "Controle de privacidade clínica",
        "Monitoramento de conformidade regulatória",
      ],
    },
    resultado: {
      es: "Ecosistema seguro y regulado para el acceso al cannabis medicinal con trazabilidad total.",
      en: "Secure and regulated ecosystem for medical cannabis access with total traceability.",
      pt: "Ecossistema seguro e regulamentado para acesso à cannabis medicinal com rastreabilidade total.",
    },
    quote: {
      es: "Acceso seguro y trazable al cannabis medicinal con privacidad clínica garantizada.",
      en: "Secure and traceable access to medical cannabis with guaranteed clinical privacy.",
      pt: "Acesso seguro e rastreável à cannabis medicinal com privacidade clínica garantida.",
    },
    quoteAutor: "Trust Leaf",
    linkDemo: "https://www.trustleaf.org/",
    año: 2026,
  },
  {
    slug: "pizzadao-musica-w3",
    nombre: "PizzaDAO x Musica W3",
    tipo: {
      es: "Música + Web3",
      en: "Music + Web3",
      pt: "Música + Web3",
    },
    descripcion: {
      es: "Plataforma conjunta para la primera convocatoria musical descentralizada del mundo hispanohablante. $350 USDC en premios y canciones CC0 como banda sonora del PizzaDAO Game.",
      en: "Joint platform for the first decentralized music call in the Spanish-speaking world. $350 USDC in prizes and CC0 songs as the soundtrack for the PizzaDAO Game.",
      pt: "Plataforma conjunta para a primeira chamada musical descentralizada no mundo de língua espanhola. US$ 350 em prêmios e músicas CC0 como trilha sonora do PizzaDAO Game.",
    },
    descripcionLarga: {
      es: "MusicaW3 y PizzaDAO unieron fuerzas para crear la primera convocatoria musical descentralizada del mundo hispanohablante. Construimos el hub completo: conexión de wallets, sistema de participación, presentación de premios en USDC y todo el diseño de la experiencia. Las canciones ganadoras con licencia CC0 se integran como banda sonora oficial del PizzaDAO Game, actualmente en desarrollo activo.",
      en: "MusicaW3 and PizzaDAO joined forces to create the first decentralized music call in the Spanish-speaking world. We built the entire hub: wallet connection, participation system, USDC prize presentation, and the full experience design. The winning CC0-licensed songs are integrated as the official soundtrack for the PizzaDAO Game, currently under active development.",
      pt: "MusicaW3 e PizzaDAO uniram forças para criar a primeira chamada musical descentralizada no mundo de língua espanhola. Construímos o hub completo: conexão de carteiras, sistema de participação, apresentação de prêmios em USDC e todo o design da experiência. As músicas vencedoras licenciadas sob CC0 são integradas como trilha sonora oficial do PizzaDAO Game, atualmente em desenvolvimento ativo.",
    },
    tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "Web3", "Wallet Connect"],
    color: "linear-gradient(135deg, #1a0d2e 0%, #4a1272 50%, #bf3a1a 100%)",
    colorAccent: "#c084fc",
    caracteristicas: {
      es: [
        "Convocatoria musical con premios USDC",
        "Conexión de wallets blockchain",
        "Licencia CC0 para obras ganadoras",
        "Banda sonora del PizzaDAO Game",
        "Diseño mobile-first",
        "Comunidad hispana Web3",
      ],
      en: [
        "Music call with USDC prizes",
        "Blockchain wallet connection",
        "CC0 license for winning works",
        "Soundtrack for PizzaDAO Game",
        "Mobile-first design",
        "Hispanic Web3 community",
      ],
      pt: [
        "Chamada musical com prêmios em USDC",
        "Conexão de carteiras blockchain",
        "Licença CC0 para obras vencedoras",
        "Trilha sonora para o PizzaDAO Game",
        "Design mobile-first",
        "Comunidade Web3 hispânica",
      ],
    },
    resultado: {
      es: "Primera plataforma que une música independiente y Web3 para la comunidad hispanohablante.",
      en: "First platform uniting independent music and Web3 for the Spanish-speaking community.",
      pt: "Primeira plataforma que une música independente e Web3 para a comunidade de língua espanhola.",
    },
    quote: {
      es: "Crea música con pizza y web3 — la primera convocatoria musical de PizzaDAO para el mundo hispanohablante.",
      en: "Create music with pizza and web3 — PizzaDAO's first music call for the Spanish-speaking world.",
      pt: "Crie música com pizza e web3 — a primeira chamada musical da PizzaDAO para o mundo de língua espanhola.",
    },
    quoteAutor: "PizzaDAO x Musica W3",
    linkDemo: "https://pizzadao-mw3.vercel.app",
    año: 2026,
  },
  {
    slug: "cms-agencia-marketing",
    nombre: "Umbra Creator Hub",
    tipo: {
      es: "Plataforma para Creadores",
      en: "Creator Platform",
      pt: "Plataforma para Criadores",
    },
    descripcion: {
      es: "Plataforma de gestión de contenido para creadores y agencias de marketing. Flujo editorial centralizado, aprobaciones por roles y publicación coordinada.",
      en: "Content management platform for creators and marketing agencies. Centralized editorial flow, role-based approvals, and coordinated publishing.",
      pt: "Plataforma de gestão de conteúdo para criadores e agências de marketing. Fluxo editorial centralizado, aprovações baseadas em funções e publicação coordenada.",
    },
    descripcionLarga: {
      es: "Umbra Creator Hub es la plataforma que centraliza todo el flujo de contenido para agencias y comunidades de marketing. Desde la ideación hasta la publicación, cada pieza de contenido pasa por un sistema de roles y aprobaciones antes de salir. Diseñado para el caos creativo de una agencia real, con generación asistida por IA y colaboración en tiempo real.",
      en: "Umbra Creator Hub is the platform that centralizes the entire content flow for agencies and marketing communities. From ideation to publication, every piece of content goes through a role and approval system before going out. Designed for the creative chaos of a real agency, with AI-assisted generation and real-time collaboration.",
      pt: "O Umbra Creator Hub é a plataforma que centraliza todo o fluxo de conteúdo para agências e comunidades de marketing. Da ideação à publicação, cada peça de conteúdo passa por um sistema de funções e aprovações antes de ser lançada. Projetado para o caos criativo de uma agência real, com geração assistida por IA e colaboração em tempo real.",
    },
    tecnologias: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "OpenAI"],
    color: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
    colorAccent: "#818cf8",
    caracteristicas: {
      es: [
        "Calendario editorial visual",
        "Sistema de roles y aprobaciones",
        "Generación de contenido con IA",
        "Publicación multi-plataforma",
        "Dashboard de rendimiento",
        "Colaboración en tiempo real",
      ],
      en: [
        "Visual editorial calendar",
        "Role and approval system",
        "AI content generation",
        "Multi-platform publishing",
        "Performance dashboard",
        "Real-time collaboration",
      ],
      pt: [
        "Calendário editorial visual",
        "Sistema de funções e aprovações",
        "Geração de conteúdo por IA",
        "Publicação multiplataforma",
        "Painel de desempenho",
        "Colaboração em tempo real",
      ],
    },
    resultado: {
      es: "Flujo editorial organizado que elimina el caos de los DMs y acelera la producción.",
      en: "Organized editorial flow that eliminates DM chaos and accelerates production.",
      pt: "Fluxo editorial organizado que elimina o caos das DMs e acelera a produção.",
    },
    quote: {
      es: "Del caos de los DMs a un hub centralizado donde todo el contenido fluye.",
      en: "From DM chaos to a centralized hub where all content flows.",
      pt: "Do caos das DMs a um hub centralizado onde todo o conteúdo flui.",
    },
    quoteAutor: "Umbra Creator Hub",
    linkDemo: "https://creator-hub-three-lake.vercel.app",
    año: 2026,
  },
  {
    slug: "discord-analytics-bot",
    nombre: "BS Discord Tracker",
    tipo: {
      es: "Bot / Automatización",
      en: "Bot / Automation",
      pt: "Bot / Automação",
    },
    descripcion: {
      es: "Herramienta para saber exactamente quién está participando en tu servidor de Discord. Monitoreo de asistencia y presencia de miembros en tiempo real.",
      en: "Tool to know exactly who is participating in your Discord server. Real-time monitoring of member attendance and presence.",
      pt: "Ferramenta para saber exatamente quem está participando do seu servidor Discord. Monitoramento em tempo real de presença e participação de membros.",
    },
    descripcionLarga: {
      es: "Las comunidades de Discord necesitan saber quién participa activamente y quién no. Construimos BS Discord Tracker, una herramienta que monitorea la asistencia y presencia de miembros en servidores de Discord, dando a los administradores visibilidad total sobre la participación de su comunidad en tiempo real.",
      en: "Discord communities need to know who participates actively and who doesn't. We built BS Discord Tracker, a tool that monitors member attendance and presence on Discord servers, giving administrators full visibility into their community's participation in real-time.",
      pt: "As comunidades do Discord precisam saber quem participa ativamente e quem não. Construímos o BS Discord Tracker, uma ferramenta que monitora a presença e a participação de membros em servidores Discord, dando aos administradores visibilidade total sobre a participação de sua comunidade em tempo real.",
    },
    tecnologias: ["Python", "Discord.py", "Next.js", "PostgreSQL", "Vercel"],
    color: "linear-gradient(135deg, #1a1d2e 0%, #23284a 50%, #2d3561 100%)",
    colorAccent: "#5865F2",
    caracteristicas: {
      es: [
        "Monitoreo de asistencia en tiempo real",
        "Tracking de presencia por miembro",
        "Panel web de visualización",
        "Historial de participación",
        "Gestión de múltiples servidores",
        "Integración directa con Discord API",
      ],
      en: [
        "Real-time attendance monitoring",
        "Presence tracking per member",
        "Web visualization dashboard",
        "Participation history",
        "Multi-server management",
        "Direct integration with Discord API",
      ],
      pt: [
        "Monitoramento de presença em tempo real",
        "Rastreamento de presença por membro",
        "Painel de visualização web",
        "Histórico de participação",
        "Gestão de múltiplos servidores",
        "Integração direta com a API do Discord",
      ],
    },
    resultado: {
      es: "Comunidades con visibilidad total sobre quién realmente está mostrándose.",
      en: "Communities with full visibility into who is actually showing up.",
      pt: "Comunidades com visibilidade total sobre quem realmente está presente.",
    },
    quote: {
      es: "Know exactly who's showing up.",
      en: "Know exactly who's showing up.",
      pt: "Saiba exatamente quem está presente.",
    },
    quoteAutor: "BS Discord Tracker",
    linkDemo: "https://discord-tracker-three.vercel.app",
    año: 2026,
  },
  {
    slug: "estudio-morales-araya",
    nombre: "Estudio Morales Araya",
    tipo: {
      es: "Estudio Jurídico",
      en: "Law Firm",
      pt: "Escritório de Advocacia",
    },
    descripcion: {
      es: "Web para estudio de abogadas especializado en derecho de familia, laboral y civil. Atención personalizada, confidencial y con enfoque humano.",
      en: "Website for a law firm specialized in family, labor, and civil law. Personalized, confidential, and human-centered care.",
      pt: "Website para um escritório de advocacia especializado em direito de família, trabalhista e civil. Atendimento personalizado, confidencial e focado no ser humano.",
    },
    descripcionLarga: {
      es: "Soledad Araya Molina y Macarena Morales Gómez necesitaban una presencia digital que transmitiera autoridad y cercanía. Desarrollamos un sitio corporativo sobrio y elegante que presenta sus áreas de práctica — divorcios, pensión de alimentos, despidos, escrituras públicas, arrendamientos y cambio de nombre — junto con un formulario de consulta confidencial y toda la información de contacto para clientes en Chile.",
      en: "Soledad Araya Molina and Macarena Morales Gómez needed a digital presence that conveyed authority and closeness. We developed a sober and elegant corporate site presenting their practice areas — divorce, alimony, dismissals, public deeds, leases, and name changes — alongside a confidential consultation form and all contact information for clients in Chile.",
      pt: "Soledad Araya Molina e Macarena Morales Gómez precisavam de uma presença digital que transmitisse autoridade e proximidade. Desenvolvemos um site corporativo sóbrio e elegante apresentando suas áreas de atuação — divórcio, pensão alimentícia, demissões, escrituras públicas, arrendamentos e mudanças de nome — juntamente com um formulário de consulta confidencial e todas as informações de contato para clientes no Chile.",
    },
    tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "Resend"],
    color: "linear-gradient(135deg, #0f1923 0%, #1a2d3d 50%, #1e3a4a 100%)",
    colorAccent: "#c8a45e",
    caracteristicas: {
      es: [
        "Presentación de áreas de práctica",
        "Perfil de Soledad Araya y Macarena Morales",
        "Formulario de consulta confidencial",
        "Diseño corporativo premium",
        "SEO local para búsquedas jurídicas",
        "Contacto directo y horarios",
      ],
      en: [
        "Practice areas presentation",
        "Profiles of Soledad Araya and Macarena Morales",
        "Confidential consultation form",
        "Premium corporate design",
        "Local SEO for legal searches",
        "Direct contact and hours",
      ],
      pt: [
        "Apresentação das áreas de atuação",
        "Perfis de Soledad Araya e Macarena Morales",
        "Formulário de consulta confidencial",
        "Design corporativo premium",
        "SEO local para buscas jurídicas",
        "Contato direto e horários",
      ],
    },
    resultado: {
      es: "Presencia digital profesional que transmite autoridad y genera consultas calificadas.",
      en: "Professional digital presence conveying authority and generating qualified inquiries.",
      pt: "Presença digital profissional que transmite autoridade e gera consultas qualificadas.",
    },
    quote: {
      es: "Estudio jurídico especializado en derecho de familia, laboral y civil. Atención personalizada, confidencial y con enfoque humano.",
      en: "Law firm specialized in family, labor, and civil law. Personalized, confidential, and human-centered care.",
      pt: "Escritório de advocacia especializado em direito de família, trabalhista e civil. Atendimento personalizado, confidencial e focado no ser humano.",
    },
    quoteAutor: "Estudio Morales Araya",
    linkDemo: "https://estudiomoralesaraya.vercel.app",
    año: 2026,
  },
  {
    slug: "gm-nail-artist",
    nombre: "GM Nail Artist",
    tipo: {
      es: "Estudio de Uñas",
      en: "Nail Studio",
      pt: "Estúdio de Unhas",
    },
    descripcion: {
      es: "Sitio web para estudio de nail art profesional. Galería de diseños, servicios, precios y agenda online para clientes.",
      en: "Website for a professional nail art studio. Design gallery, services, prices, and online scheduling for clients.",
      pt: "Website para um estúdio de nail art profissional. Galeria de designs, serviços, preços e agendamento online para clientes.",
    },
    descripcionLarga: {
      es: "GM Nail Artist necesitaba una presencia digital que mostrara su trabajo y facilitara el agendamiento de citas. Desarrollamos un sitio elegante con galería de diseños, catálogo de servicios con precios, y sistema de reservas para que sus clientes puedan agendar directamente desde la web.",
      en: "GM Nail Artist needed a digital presence to showcase her work and facilitate appointment scheduling. We developed an elegant site with a design gallery, service catalog with prices, and a booking system so clients can schedule directly from the web.",
      pt: "A GM Nail Artist precisava de uma presença digital para mostrar seu trabalho e facilitar o agendamento de consultas. Desenvolvemos um site elegante com galeria de designs, catálogo de serviços com preços e sistema de reservas para que os clientes possam agendar diretamente pela web.",
    },
    tecnologias: ["Next.js", "TypeScript", "Tailwind CSS"],
    color: "linear-gradient(135deg, #1a0a14 0%, #4a1030 50%, #8b2252 100%)",
    colorAccent: "#f472b6",
    caracteristicas: {
      es: [
        "Galería de diseños de nail art",
        "Catálogo de servicios y precios",
        "Sistema de agendamiento online",
        "Diseño mobile-first",
        "Presentación de la artista",
        "Contacto directo por WhatsApp",
      ],
      en: [
        "Nail art design gallery",
        "Service and price catalog",
        "Online scheduling system",
        "Mobile-first design",
        "Artist presentation",
        "Direct WhatsApp contact",
      ],
      pt: [
        "Galeria de designs de nail art",
        "Catálogo de serviços e preços",
        "Sistema de agendamento online",
        "Design mobile-first",
        "Apresentação da artista",
        "Contato direto pelo WhatsApp",
      ],
    },
    resultado: {
      es: "Presencia digital que convierte visitas en reservas para el estudio.",
      en: "Digital presence that converts visits into bookings for the studio.",
      pt: "Presença digital que converte visitas em reservas para o estúdio.",
    },
    quote: {
      es: "Tu nail art, tu estilo — agenda tu cita online.",
      en: "Your nail art, your style — book your appointment online.",
      pt: "Sua nail art, seu estilo — agende sua consulta online.",
    },
    quoteAutor: "GM Nail Artist",
    linkDemo: "https://gm-nailartist.vercel.app",
    año: 2026,
  },
  {
    slug: "rhythm-slice",
    nombre: "Rhythm Slice",
    tipo: {
      es: "ZK Rhythm Game",
      en: "ZK Rhythm Game",
      pt: "ZK Rhythm Game",
    },
    descripcion: {
      es: "Juego de ritmo estilo Guitar Hero con temática de pizzas y tecnología Zero-Knowledge sobre Stellar. Cada nota es un ingrediente, cada canción una pizza diferente.",
      en: "Guitar Hero-style rhythm game with pizza theme and Zero-Knowledge technology on Stellar. Every note is an ingredient, every song a different pizza.",
      pt: "Jogo de ritmo no estilo Guitar Hero com tema de pizza e tecnologia Zero-Knowledge no Stellar. Cada nota é um ingrediente, cada música uma pizza diferente.",
    },
    descripcionLarga: {
      es: "Rhythm Slice combina mecánicas de rhythm game con la blockchain de Stellar y Zero-Knowledge proofs. El jugador cocina pizzas siguiendo el ritmo de la música — cada ingrediente cae al compás y hay que capturarlo en el momento exacto. Construido en un hackathon, integra ZK para verificación de puntajes on-chain de forma transparente y sin revelar datos privados.",
      en: "Rhythm Slice combines rhythm game mechanics with the Stellar blockchain and Zero-Knowledge proofs. The player cooks pizzas to the rhythm of the music — every ingredient falls to the beat and must be captured at the exact moment. Built in a hackathon, it integrates ZK for transparent on-chain score verification without revealing private data.",
      pt: "O Rhythm Slice combina mecânicas de jogo de ritmo com a blockchain Stellar e provas Zero-Knowledge. O jogador cozinha pizzas no ritmo da música — cada ingrediente cai na batida e deve ser capturado no momento exato. Construído em um hackathon, integra ZK para verificação transparente de pontuação on-chain sem revelar dados privados.",
    },
    tecnologias: ["Unity", "C#", "Stellar", "Zero-Knowledge", "Web Build"],
    color: "linear-gradient(135deg, #1a0520 0%, #6b1fb1 35%, #e91e8c 65%, #ff6b35 100%)",
    colorAccent: "#e91e8c",
    caracteristicas: {
      es: [
        "Mecánica rhythm game clásica",
        "Temática de pizza única",
        "ZK proofs sobre Stellar blockchain",
        "Verificación de puntajes on-chain",
        "Build para web",
        "Sistema de combos y puntuación",
      ],
      en: [
        "Classic rhythm game mechanics",
        "Unique pizza theme",
        "ZK proofs on Stellar blockchain",
        "On-chain score verification",
        "Web build",
        "Combo and scoring system",
      ],
      pt: [
        "Mecânica clássica de jogo de ritmo",
        "Tema único de pizza",
        "Provas ZK na blockchain Stellar",
        "Verificação de pontuação on-chain",
        "Build para web",
        "Sistema de combos e pontuação",
      ],
    },
    resultado: {
      es: "En desarrollo activo — el primer ZK rhythm game sobre Stellar.",
      en: "Under active development — the first ZK rhythm game on Stellar.",
      pt: "Em desenvolvimento ativo — o primeiro jogo de ritmo ZK no Stellar.",
    },
    quote: {
      es: "Rhythm Slice — ZK Rhythm Game on Stellar.",
      en: "Rhythm Slice — ZK Rhythm Game on Stellar.",
      pt: "Rhythm Slice — ZK Rhythm Game no Stellar.",
    },
    quoteAutor: "Browns Studio",
    linkDemo: "https://cabscrypto.github.io/guitarPizza--AntiGravity/",
    año: 2026,
    comingSoon: true,
  },
];

export function getProyectoBySlug(slug: string): Proyecto | undefined {
  return proyectos.find((p) => p.slug === slug);
}
