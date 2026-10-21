# Cómo añadimos la capa sin reconstruir una web

Esta es la ruta de entrega propuesta, no una instalación ya realizada en sitios de clientes. Antes de cotizar comprobamos plataforma, permisos, publicación disponible y responsable técnico. Si no hay una vía viable, informamos la dependencia y no prometemos instalarla.

## Una implementación de Inicio

1. Seleccionar páginas prioritarias con el cliente: inicio, servicios, cobertura, contacto y preguntas frecuentes, dentro del alcance contratado. Crear una tabla página → hechos aprobados → recurso consultable → prueba. No copiar información privada ni completar datos por suposición.
2. Preparar una fuente pública con hechos concretos y sus URLs de procedencia: qué hace la empresa, dónde atiende, cómo contactarla, preguntas y respuestas. Si falta un hecho en la web, acordar su publicación; la fuente para agentes debe ser coherente con lo visible para personas.
3. Publicar recursos legibles en ubicaciones acordadas, por ejemplo `/informacion/empresa.json` y `/informacion/empresa.md`. Son rutas ilustrativas, no nombres obligatorios ni factores de posicionamiento demostrados. Versionar la fuente y documentar quién aprueba sus cambios.
4. Añadir enlaces y mecanismos de descubrimiento pertinentes; revisar sitemap, reglas de rastreo y restricciones reales del servidor. Aplicar la guía de Cloudflare según necesidades. No abrir bots bloqueados por decisión del cliente ni crear MCP, OAuth o Skills vacíos para sumar puntos.
5. Probar acceso HTTP, contenido, enlaces, fuentes, móvil y navegación existente. Respaldar y documentar reversión. La aceptación demuestra la instalación; no demuestra aparición en una respuesta de IA.

No instalamos una integración independiente en cada página. Una capa central puede representar las páginas acordadas, con referencias a cada una. Los cambios por página se limitan a hechos aprobados, enlaces o metadatos pertinentes; un cambio de diseño no forma parte de esta entrega.

## Según la plataforma

| Sitio | Vía de instalación propuesta | Dependencia a comprobar |
|---|---|---|
| WordPress | Pequeño plugin propio, versionado y removible, con rutas públicas GET bajo un namespace propio de REST. Publicar Markdown como recurso/ruta según alojamiento y añadir enlaces de descubrimiento pertinentes. | Permiso para instalar plugin o colaboración de la agencia, disponibilidad REST, caché, seguridad y compatibilidad con plugins existentes. |
| Web de código propio, como Browns | Fuente compartida JSON, rutas para JSON/Markdown y cabeceras/enlaces desde el servidor. | Acceso al repositorio y despliegue; pruebas sobre la versión real publicada. |
| Constructor o sitio administrado por una agencia | Recursos públicos alojados en una ubicación permitida y enlaces desde la web; ruta o subdominio separado si resulta pertinente. | Qué permite publicar el constructor, acceso a dominio/CDN y colaboración del responsable. Una fuente externa sin enlaces comprobables no se da por integrada. |

En WordPress no editaríamos el núcleo ni el tema para sostener la integración. El plugin serviría únicamente datos públicos aprobados; las rutas requieren una política explícita de permisos, validación y respuestas controladas. No exponer metadatos internos, borradores, usuarios, formularios o datos de clientes. Probar en staging y respaldar antes de activar. Un endpoint REST ordinario devuelve JSON; Markdown requiere su recurso y Content-Type adecuados. No confundir tener REST con disponer de MCP.

La REST API de WordPress permite registrar endpoints desde plugins mediante `register_rest_route` y namespaces propios. [Documentación oficial](https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/).

## Avanzado: MCP separado y útil

Tras validar Inicio y una necesidad de consulta concreta, desplegar un servicio MCP independiente con una fuente pública acordada y herramientas de solo lectura. Puede consumir datos aprobados publicados desde WordPress o una fuente mantenida junto al sitio. No necesita vivir dentro del tema ni reconstruir WordPress.

El piloto de Browns ya tiene tres consultas: servicios, cobertura y preguntas frecuentes. Para un cliente se definirían las herramientas según su caso, no se copiarían automáticamente esos nombres. Probar descubrimiento e invocación con un cliente compatible, datos correctos y errores controlados. Publicar recursos de descubrimiento solo cuando describan capacidades operativas. Sistemas privados, sincronización automática y operaciones de escritura requieren otra propuesta.

## Mantención concreta

Inicio: comprobar mensualmente las rutas y enlaces instalados, contrastar cambios de información y efectuar pequeñas actualizaciones dentro de la bolsa acordada. Avanzado: sumar comprobaciones de disponibilidad del MCP y consultas de prueba. Continuidad: sustituir la mensualidad base por una cuota que incluye esa mantención y las horas de evolución acordadas.

Ejemplos dentro del alcance: corregir un enlace del recurso, actualizar cobertura aprobada o un dato de contacto, reparar una consulta entregada dentro de los términos de soporte. Ejemplos de nuevo alcance: otro dominio/idioma, fuente adicional, reservas, CRM o cambios estructurales del proveedor. Actualizaciones generales de WordPress/plugins/tema, hosting y rediseño no están cubiertas. Los defectos originales se resuelven en aceptación sin consumir evolución.

Registrar comprobaciones, incidencias, cambios y tiempos; nunca presentar sugerencias pendientes como trabajo realizado. Ver límites internos medibles de los pilotos en `servicios.md`.
