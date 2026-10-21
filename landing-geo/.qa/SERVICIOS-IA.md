# Oferta y piloto para agentes

Preparado el 2026-10-05 en Chile. Comprobaciones técnicas entre 2026-10-06 01:15 y 01:20 UTC (noche del 5 de octubre en Chile).

## Implementado

- Hero: «Las personas ya buscan en la IA. ¿Encontrarán tu empresa?» y bajada de Browns Studio conservados. CTA único al formulario de URL/correo.
- Sección de capa adicional y recursos para agentes; Inicio, Avanzado y Continuidad con mantención. Avanzado «en validación» y estado piloto visible. Sin precios ni límites pagados anunciados como disponibles.
- Proceso gratuito → propuesta → entrega/mantención; alcance gratuito y fecha según cupo. FAQ de garantías, web existente, mantención y puntaje técnico.
- Fuente pública compartida, JSON/Markdown y cabecera Link en `/direccion`. No se cambió `POST /api/solicitudes-geo`.
- Worker independiente en 127.0.0.1:5176 con tres herramientas de solo lectura, fuente validada, referencia de procedencia, negociación Markdown, Server Card e índice Skill para capacidades reales.
- Fichas, cuatro plantillas, registro vacío de tiempos/cupos y puertas de lanzamiento en `operacion/`.

## Verificado

- Landing: TypeScript, ESLint y compilación Next completos sin errores.
- Las 12 pruebas existentes del handler de correo pasan con transporte simulado, sin correos reales.
- HTTP `/direccion`: 200, hero conservado, tres servicios y estado de validación; JSON/Markdown: 200 con versión 2026-10-05.1 y tres servicios. Cabecera Link a recursos existentes.
- Piloto: TypeScript y nueve pruebas del cliente oficial contra handler: descubrimiento de tres herramientas, coincidencia con fuente, búsqueda sin resultados, parámetros inválidos, operación inexistente, fuente fallida/malformada, recursos y descubrimiento, Host/Origin y tamaño/tipo de cuerpo.
- Cliente oficial por HTTP contra Wrangler/workerd: servicios, cobertura y FAQ coinciden con fuente; búsqueda inexistente devuelve lista vacía. Comprobación de disponibilidad incluye una llamada MCP real. Empaquetado Worker `--dry-run` completo; sin despliegue.
- Monitor local iniciado, intervalo cinco minutos; log `piloto-agentes/.qa/availability.jsonl`. Primer intento bloqueado por sandbox y posterior comprobación correcta fuera del sandbox. Solo es cobertura mientras el proceso permanece abierto; no un mes cumplido.

## Iteración visual y de contenido — 2026-10-05

- Servicios convertidos a cartas 9:16 con giro por clic/Enter, retorno por botón/Escape y traslado de foco. La cara inactiva usa inert/aria-hidden; el contenido largo tiene desplazamiento interior. Hay detalles de respaldo sin JavaScript y respeto a movimiento reducido en CSS.
- Qué hacemos y proceso usan paneles con borde, relieve, sombras e ilustraciones SVG decorativas. Hero conservado. Preguntas y formulario usan contenedores consistentes.
- Mantención mensual adicional separada de la implementación; Continuidad reemplaza la cuota previa. FAQ con ejemplos concretos, WordPress, GEO/MCP distintos y buenas prácticas de Cloudflare como primer paso aplicable, sin promesas de aparición.
- Análisis inicial sin número fijo anunciado de páginas/hallazgos; alcance y fecha por confirmar. Plantilla, README operativo y fuente pública sincronizados a versión 2026-10-05.2.
- Guías internas de implementación por plataforma y flujo/datos del formulario añadidas en operacion/.
- Compilación final Next, TypeScript y ESLint correctos. 12 pruebas del handler y 9 del piloto correctas. Cliente MCP por HTTP confirma las tres herramientas y fuente 2026-10-05.2. Compilación/HTTP local necesitaron ejecución fuera del sandbox por restricciones de acceso en Windows; las comprobaciones autorizadas concluyeron correctamente.
- Navegador interno: comprobados anchos 320, 390, predeterminado 937 y 1440 px sin desborde horizontal. Paneles ajustados para crecer con el texto. Giro de las tres cartas, Enter/Escape, foco en cara activa, apertura de FAQ y recorrido CTA al formulario comprobados. Se restableció el viewport predeterminado.
- Formulario: campos vacíos producen errores y foco en URL. Envío con datos de ejemplo sin configuración produce error y conserva campos; no muestra éxito. No hubo correo real ni análisis automático. No existe base de datos de solicitudes. La configuración de recepción sigue pendiente.
- Evidencia actual: servicios-cartas.jpg y paneles-informacion.jpg, obtenidas del navegador interno. Pestaña /direccion#servicios conservada con Inicio abierto para revisión.

## Pendiente antes de publicar

- La interrupción de navegador de la primera iteración fue resuelta al volver a vincular la pestaña actual durante la revisión del usuario. Las comprobaciones de esta iteración están documentadas arriba.
- No existe `.env.local` de recepción. Falta configurar Resend y remitente verificado; probar recepción efectiva en Zoho y respuesta, SPF/DKIM y protección de abuso compartida del alojamiento. No hay éxito de envío simulado en interfaz.
- Sin cuenta, dominio ni publicación de Worker seleccionados. El piloto bloquea rastreo y conserva noindex. Configurar monitoreo y aviso sostenidos en alojamiento final antes de ofrecerlos a un cliente.
- Medir costos, fijar cotizaciones y cumplir un ciclo mensual real antes de ofrecer Avanzado como disponible. No abrir pilotos de clientes automáticamente.

Las otras auditorías e imágenes históricas de `.qa` no corresponden a esta iteración. El resultado del escáner público proporcionado por el usuario es una captura histórica; no se afirma un nuevo puntaje del dominio.
