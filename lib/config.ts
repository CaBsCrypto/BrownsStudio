export const SITE_CONFIG = {
  name: "Browns Studio",
  tagline: "Desarrollo Web para Negocios que Quieren Crecer",
  description:
    "Creamos páginas web profesionales para clínicas, restaurantes y negocios locales. Diseño moderno, rápido y optimizado para conseguir más clientes.",
  whatsapp: "+56XXXXXXXXX", // PLACEHOLDER — reemplazar con número real
  whatsappMessage: "Hola, vi su web y me interesa cotizar un proyecto",
  email: "contacto@brownsstudio.dev",
  instagram: "https://instagram.com/brownsstudio",
  linkedin: "https://linkedin.com/company/brownsstudio",
  youtube: "https://youtube.com/@brownsstudio",
  url: "https://brownsstudio.dev",
  spotsAvailable: 4, // Actualizar mensualmente
};

export const WHATSAPP_URL = `https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`;

export function getWhatsAppWithPackage(packageName: string): string {
  const msg = `Hola, vi su web y me interesa cotizar el paquete ${packageName}`;
  return `https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
}
