import publicInformation from './browns-public.json';

const initialService = publicInformation.services.find(service => service.id === 'inicio');
if (!initialService) throw new Error('Falta el servicio Inicio en la información pública.');

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
    { title: 'Análisis inicial gratis', description: 'Revisamos la información pública y te enviamos por correo un resumen de lo verificado y las prioridades sugeridas. Acordamos el alcance y la fecha según el cupo disponible.' },
    { title: 'Una propuesta concreta', description: 'Recomendamos el servicio mínimo suficiente y cotizamos implementación y mantención mensual adicional. Acordamos entregables, límites, costos, plazo y responsabilidades antes de comenzar.' },
    { title: 'Entrega y mantención', description: 'Implementamos, comprobamos contigo el funcionamiento y documentamos lo realizado. Después revisamos las piezas entregadas según tu plan.' },
  ],
  servicesIntro: {
    description: 'Empieza por Inicio: información pública de tu empresa preparada, consultable y comprobada. Podemos evaluar nuevas capacidades cuando exista una necesidad concreta.',
    note: 'Inicio y Avanzado se cotizan como implementación más mantención mensual adicional. Continuidad sustituye la mensualidad anterior.',
    evolutionTitle: 'Cuando necesites nuevas capacidades',
  },
  initialOffer: {
    audience: publicInformation.coverage.audience,
    problem: 'Los datos de servicios, cobertura y contacto dispersos o incompletos dificultan su consulta.',
    deliverables: [
      'Información de servicios, cobertura, contacto y preguntas frecuentes validada contigo.',
      'Recursos públicos consultables y ajustes mínimos de publicación y acceso acordados.',
      'Comprobación de recursos y enlaces, registro de cambios y guía de entrega.',
    ],
    clientInput: 'Una persona que valide los datos y, para implementar, los accesos mínimos de publicación acordados con tu equipo.',
    exclusions: initialService.boundary,
    pricing: 'Acordamos alcance, precio de implementación, mantención mensual adicional, costos externos y fecha de entrega antes de trabajar.',
    maintenance: initialService.maintenance,
  },
  publicSample: {
    brand: publicInformation.brand,
    serviceName: initialService.name,
    serviceTitle: initialService.title,
    coverage: publicInformation.coverage.scope,
    audience: publicInformation.coverage.audience,
    contact: publicInformation.contact,
    resourceHref: '/informacion/browns.md',
    verificationNote: 'Comprobamos que el recurso se puede consultar y contiene estos datos. No acredita apariciones ni resultados en respuestas de IA.',
  },
  services: publicInformation.services,
  faqs: publicInformation.faqs,
} as const;
