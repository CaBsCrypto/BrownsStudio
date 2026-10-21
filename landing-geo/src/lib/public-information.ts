import information from '../content/browns-public.json';

export function publicMarkdown(source: typeof information = information): string {
  return [
    `# ${source.brand}`, source.label,
    `Versión: ${source.version}. Estado: en validación.`,
    '## Cobertura', source.coverage.description, source.coverage.location,
    `Contacto: ${source.contact}`, '## Servicios',
    ...source.services.flatMap(item => [
      `### ${item.name}: ${item.title}`, `Estado: ${item.badge}.`, item.promise,
      item.delivery, `Mantención: ${item.maintenance}`, item.boundary, `Modalidad: ${item.billing}.`,
    ]),
    '## Preguntas frecuentes', ...source.faqs.flatMap(item => [`### ${item.question}`, item.answer]),
    '## Límites', source.limits,
  ].join('\n\n') + '\n';
}
