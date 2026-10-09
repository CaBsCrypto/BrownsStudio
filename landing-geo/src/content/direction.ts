import publicInformation from './browns-public.json';

export const direction = {
  cta: 'Pide tu análisis inicial gratis.',
  hero: {
    title: 'Las personas ya buscan en la IA. ¿Encontrarán tu empresa?',
    description: 'En Browns Studio analizamos tu presencia y mejoramos la información que los buscadores con IA pueden consultar.',
  },
  navigation: [
    { label: 'Qué hacemos', href: '#que-revisamos' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Cómo sigue', href: '#proceso' },
    { label: 'Preguntas', href: '#preguntas' },
  ],
  checks: [
    { title: 'Información consultable', description: 'Preparamos información concreta sobre tus servicios, cobertura y preguntas frecuentes, validada contigo.' },
    { title: 'Recursos para agentes', description: 'Añadimos recursos que facilitan la consulta y el descubrimiento, con los ajustes mínimos que tu sitio necesita.' },
    { title: 'Una base que se mantiene', description: 'Comprobamos lo entregado y acordamos cómo actualizarlo. Las conexiones avanzadas se incorporan cuando resuelven una necesidad real.' },
  ],
  steps: [
    { title: 'Análisis inicial gratis', description: 'Revisamos información pública y te enviamos por correo un resumen con oportunidades verificadas. Confirmamos la fecha según el cupo disponible.' },
    { title: 'Una propuesta concreta', description: 'Recomendamos el servicio mínimo suficiente y acordamos entregables, límites, precio, plazo y mantención antes de comenzar.' },
    { title: 'Entrega y mantención', description: 'Implementamos, comprobamos contigo el funcionamiento y documentamos lo realizado. Después revisamos las piezas entregadas según tu plan.' },
  ],
  services: publicInformation.services,
  faqs: publicInformation.faqs,
} as const;
