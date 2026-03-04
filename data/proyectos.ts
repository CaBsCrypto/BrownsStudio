export interface Proyecto {
  slug: string;
  nombre: string;
  tipo: string;
  descripcion: string;
  descripcionLarga: string;
  tecnologias: string[];
  color: string;        // Gradient CSS string para el preview
  colorAccent: string;  // Color de acento para la página individual
  caracteristicas: string[];
  resultado: string;
  linkDemo?: string;
  año: number;
}

export const proyectos: Proyecto[] = [
  {
    slug: "clinica-dental-sonrie",
    nombre: "Clínica Dental Sonríe",
    tipo: "Clínica Dental",
    descripcion:
      "Web profesional con sistema de citas online, galería de casos y formulario de pacientes. Diseñada para generar confianza y convertir visitas en citas.",
    descripcionLarga:
      "Clínica Dental Sonríe necesitaba una presencia digital que transmitiera profesionalismo y confianza. Creamos una web completa con sistema de reservas online integrado, galería de antes/después, testimonios de pacientes y un diseño limpio que refleja la higiene y calidad del servicio. El resultado fue un incremento significativo en consultas online desde el primer mes de lanzamiento.",
    tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "Calendly API"],
    color: "linear-gradient(135deg, #1a3a4a 0%, #0f5f7a 50%, #1a8fa0 100%)",
    colorAccent: "#0f9abf",
    caracteristicas: [
      "Sistema de citas online 24/7",
      "Galería de casos clínicos",
      "Formulario de nuevos pacientes",
      "Mapa de ubicación interactivo",
      "Diseño mobile-first",
      "SEO optimizado para búsquedas locales",
    ],
    resultado:
      "Incremento del 65% en consultas online en el primer mes de operación.",
    año: 2025,
  },
  {
    slug: "sakura-sushi-bar",
    nombre: "Sakura Sushi Bar",
    tipo: "Restaurante",
    descripcion:
      "Web de restaurante con menú digital interactivo, sistema de reservas y galería de platos. Integración con WhatsApp para pedidos y reservas instantáneas.",
    descripcionLarga:
      "Sakura Sushi Bar quería diferenciarse en un mercado competitivo con una presencia digital premium. Diseñamos una experiencia visual envolvente que refleja la estética japonesa del restaurante, con un menú digital interactivo por categorías, sistema de reservas con confirmación por WhatsApp, y una galería fotográfica de alta calidad de sus platos. El sitio también incluye integración con Google Maps y reseñas en tiempo real.",
    tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "WhatsApp API"],
    color: "linear-gradient(135deg, #2d1515 0%, #8b0000 50%, #c0392b 100%)",
    colorAccent: "#e74c3c",
    caracteristicas: [
      "Menú digital por categorías",
      "Reservas vía WhatsApp",
      "Galería de platos premium",
      "Integración Google Maps",
      "Horarios y ubicación destacados",
      "Diseño con identidad visual japonesa",
    ],
    resultado:
      "Aumento del 40% en reservas y reducción del 80% en llamadas telefónicas para consultas básicas.",
    año: 2025,
  },
  {
    slug: "estudio-legal-mendez",
    nombre: "Estudio Legal Méndez & Asociados",
    tipo: "Despacho Legal",
    descripcion:
      "Web corporativa para despacho de abogados con formulario de consulta confidencial, presentación del equipo y áreas de práctica. Transmite autoridad y confianza.",
    descripcionLarga:
      "Méndez & Asociados necesitaba una presencia digital que transmitiera autoridad y profesionalismo, algo esencial en el sector legal. Desarrollamos un sitio corporativo sobrio y elegante con presentación detallada del equipo de abogados, descripción clara de las áreas de práctica, formulario de consulta inicial con confidencialidad garantizada, y una sección de blog legal que posiciona a los abogados como expertos en su campo. El diseño en tonos oscuros y dorados proyecta la solidez y seriedad que sus clientes buscan.",
    tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "Resend Email"],
    color: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    colorAccent: "#e2a855",
    caracteristicas: [
      "Presentación del equipo de abogados",
      "Áreas de práctica detalladas",
      "Formulario de consulta confidencial",
      "Blog legal con artículos",
      "Diseño corporativo premium",
      "SEO para búsquedas legales locales",
    ],
    resultado:
      "Posicionamiento en top 3 de Google para búsquedas de abogados en la ciudad en 2 meses.",
    año: 2026,
  },
];

export function getProyectoBySlug(slug: string): Proyecto | undefined {
  return proyectos.find((p) => p.slug === slug);
}
