# Browns GEO

> Nota de migración: este documento conserva registros históricos; no se repitieron sus pruebas durante el saneamiento. Los marcadores sintéticos u omisiones sustituyen datos retirados y no identifican los valores usados en envíos reales.

Landing de Browns Studio orientada al análisis inicial gratuito. El componente compartido `src/components/GeoLanding.tsx` se usa tanto en esta aplicación local (http://localhost:5175/) como en `/` del proyecto raíz, revisado en localhost:5177. La integración pública está validada en preview; su publicación a `main` y al dominio sigue pendiente. Las versiones anteriores permanecen como referencia en sus carpetas originales.

## Ejecutar

Usar Node.js 24.x para preparar el despliegue y las dependencias del lockfile.

```powershell
cd landing-geo
npm ci
npm run dev
```

Abrir http://localhost:5175/. `npm start` sirve la compilación de producción en 5175; no iniciar desarrollo y producción en el mismo puerto. `npm run audit:serve` usa 4175.

## Contenido y recorrido

`src/content/direction.ts`: hero y CTA aprobados, capa adicional de información, tres servicios (Inicio, Avanzado y Continuidad), proceso y FAQ de `/`. La página usa Archivo, DM Sans, marca tipográfica y paleta azul. Todos los CTA principales llevan a `#analisis`, incluido el popup de la escena. No hay precios, puntajes ni resultados inventados. Los servicios muestran su estado piloto; Avanzado está «en validación». Los límites cuantitativos de planes pagados permanecen en las fichas internas hasta medir capacidad.

El análisis gratuito revisa un dominio y su información pública; el alcance inicial y la fecha se confirman según cupos. Se entrega por correo un resumen con oportunidades verificadas, sin anunciar una cantidad fija de páginas o hallazgos ni una auditoría exhaustiva. Implementación y mantención mensual adicional son pagadas, previa propuesta. Continuidad sustituye la mensualidad de mantención, sin duplicarla.

`src/content/browns-public.json` es la fuente pública versionada compartida por landing y piloto MCP. `GET /informacion/browns.json` y `GET /informacion/browns.md` la exponen sin datos privados y con `noindex`. `/` enlaza ambas representaciones mediante cabecera `Link`. El formulario mantiene URL y correo; no ejecuta análisis automáticos.

El proyecto del Worker MCP independiente está en `../piloto-agentes`, configurado para localhost:5176. Tiene tres herramientas de solo lectura y descubrimiento de sus capacidades reales. Fichas, plantillas y puertas de lanzamiento: `../operacion/README.md`. Ninguna comprobación local acredita un mes de mantención ni habilita por sí sola venta pública.

`src/content/site.ts` conserva contenido anterior como referencia y valores por defecto de componentes compartidos. La página principal pasa los datos de `direction`; el WhatsApp y el correo antiguo de `site.contact` no forman parte del flujo de solicitud actual.

`AgentScene` contiene una demostración ilustrativa de una consulta a información pública. `AgentSearchModel` carga Three.js de forma diferida; la escena conserva un fallback SVG y textos HTML cuando el modelo no está disponible. El movimiento se pausa fuera de pantalla, al ocultar la pestaña y con el popup abierto; respeta la preferencia de movimiento reducido. El modelo no realiza búsquedas, análisis ni consultas MCP reales.

## Preparar Vercel

La configuración independiente de esta subcarpeta usa preset **Next.js**, Node.js **24.x**, `npm ci` y `npm run build`. Se conserva para desarrollo y previews independientes. La integración pública del **2026-10-09** usa el proyecto raíz con **Root Directory `./`**: su `app/page.tsx` importa la misma landing mediante el alias `@geo`. No hace falta cambiar la raíz de Vercel para sustituir la portada cuando esta rama se integre y se despliegue.

El proyecto raíz conserva `/admin`, las APIs de WhatsApp, webhooks y las demás integraciones existentes. `/direccion`, `/es`, `/en` y `/pt` redirigen a `/`; las presentaciones comerciales retiradas de portafolio, formación, demo, soluciones, casos de estudio y proyectos redirigen a `/#servicios`. Estos cambios de código no se han publicado todavía en producción. Detalle de hechos y pendientes: `.qa/INTEGRACION-PUBLICA.md`.

El **2026-10-09**, la preview final de la aplicación raíz (referencia de preview omitida), deployment `[identificador omitido]`, quedó Ready. Conserva Root Directory `./`. Su formulario aceptó una solicitud identificada y Resend mostró Delivered y SMTP 250 «Message received» hacia `contacto@browns.studio`, con Reply-To `demo@example.invalid`. No se promovió a producción ni se cambió `main`.

La preview independiente del 2026-10-08 (referencia de preview omitida) también quedó Ready mediante CLI desde `landing-geo`, sin cambiar el Root Directory. Su dry-run incluyó 51 archivos y excluyó QA, archivos de entorno y documentación. Es evidencia histórica de esa aplicación independiente, no el despliegue raíz final.

El **2026-10-08**, con autorización del usuario, se creó en Resend la clave **Browns Studio · solicitudes GEO**, con **Sending access** limitado a `browns.studio` (identificador `[identificador omitido]`). `RESEND_API_KEY` quedó guardada como **Secret** en `brownsstudio`, con filas independientes para **Production** y **Preview**. `GEO_MAIL_FROM` y `GEO_MAIL_TO` ya estaban guardadas en ambos entornos. No se incluyen valores de la clave en esta documentación.

Las solicitudes identificadas de ambas previews fueron aceptadas por el proveedor. Abrir el mensaje de la integración raíz en la bandeja de Zoho de `contacto@browns.studio` y comprobar una respuesta efectiva sigue pendiente. Resumen técnico histórico: `.qa/VERCEL-CORREO.md`; las evidencias, URLs y referencias exactas permanecen sólo en el respaldo local.

La revisión visual de la integración en localhost está terminada con los límites registrados en `.qa/INTEGRACION-PUBLICA.md`; no declara el sitio publicado. Preview y desarrollo local del proyecto raíz aplican `noindex`; solo `VERCEL_ENV=production` habilita indexación de la portada y un sitemap con `https://www.browns.studio/`. Completar el cierre de Zoho y la revisión de la rama antes de publicar.

## Recepción por correo

Copiar `.env.example` a `.env.local` y configurar:

- `RESEND_API_KEY`: clave de envío privada.
- `GEO_MAIL_FROM`: remitente verificado en Resend; la dirección de ejemplo no está verificada automáticamente.
- `GEO_MAIL_TO`: `contacto@browns.studio`, buzón independiente creado en Zoho.

El 2026-10-08 se comprobó en Resend que `browns.studio` está verificado, con envío habilitado, DKIM/SPF verificados y recepción deshabilitada. El remitente preparado es `Browns Studio <contacto@browns.studio>`. Mantener los MX de Zoho; no es necesario crear otro dominio de envío para esta prueba. Reiniciar el servidor tras configurar variables locales y generar un nuevo deployment al cambiar las de Vercel.

`POST /api/solicitudes-geo` recibe `website`, `email`, `company` (campo trampa vacío) y `requestId` (UUID v4 para idempotencia). Envía una notificación de texto al destino fijo y usa el correo del solicitante como Reply-To. No visita ni analiza automáticamente el sitio. No envía correos automáticos al solicitante ni almacena solicitudes en una base de datos.

Estados: 200 con `accepted: true` solo cuando Resend devuelve un identificador; 400 para datos inválidos, 403 para origen distinto, 413 para exceso de tamaño, 415 para contenido no JSON, 429 para exceso de intentos, 503 sin configuración y 502 para fallos del proveedor. El cliente conserva los datos al fallar. La prueba real de preview confirmó aceptación y estado Delivered en Resend; la comprobación de la bandeja y la respuesta en Zoho sigue pendiente.

Los límites del handler son locales a un proceso. En Vercel se activó una regla WAF de 5 solicitudes por IP en una ventana fija de 60 segundos, limitada a `POST /api/solicitudes-geo`; su contador es por región, no global. Los seis intentos CLI a la preview devolvieron 401 por Deployment Protection. Después, seis envíos controlados desde la UI autenticada, con campo trampa para evitar correos, terminaron mostrando el mensaje de exceso de intentos que el formulario reserva a HTTP 429. Firewall Overview confirmó un evento Rate Limited en la regla exacta «GEO solicitudes - 5 por IP por minuto». El bloqueo quedó verificado sin desactivar protecciones ni enviar correos adicionales. Las variables privadas nunca deben exponerse con prefijo `NEXT_PUBLIC_`.

Referencias: [API de envío](https://resend.com/docs/api-reference/emails/send-email) e [idempotencia de Resend](https://resend.com/docs/dashboard/emails/idempotency-keys).

## Comprobar

```powershell
npm run typecheck
npm run lint
npm run test:geo
npm run test:scene
npm run test:form
npm run build
```

`test:geo` prueba validación y el handler con transporte simulado; nunca envía mensajes reales. `test:scene` comprueba los estados de reproducción. `test-analysis-form.mjs` renderiza el componente real en servidor y comprueba que el formulario usa POST, no expone datos mediante un GET nativo y mantiene el envío deshabilitado antes de hidratar; también verifica la orientación de contacto sin JavaScript. Ninguna de estas pruebas demuestra entrega en Zoho.

`.qa/SERVICIOS-IA.md` y `.qa/GEO-CTA.md` conservan evidencia de iteraciones anteriores; no sustituyen las pruebas del despliegue actual.

## Antes de publicar

`vercel.json` de la aplicación independiente fija Next.js, `npm ci` y `npm run build`. Su instalación usa su propio lockfile; el proyecto raíz conserva el workspace pnpm y Root Directory `./`. `package.json` de esta aplicación fija Node 24.x. Las comprobaciones locales ejecutadas hoy figuran abajo; la ejecución de los workflows en GitHub Actions queda pendiente hasta subir la rama.

Revisión de Vercel 2026-10-08: `RESEND_API_KEY`, `GEO_MAIL_FROM` y `GEO_MAIL_TO` están guardadas en Production y Preview de `brownsstudio`; la clave se guardó como Secret. El 2026-10-09 la integración raíz quedó Ready en preview y envió su propia prueba real con Delivered en Resend. No se ha publicado esa integración en `main` ni en el dominio.

El alcance y formato gratuito ya están definidos; confirmar cada fecha según cupo. Falta confirmar la bandeja y la posibilidad de responder desde `contacto@browns.studio` en Zoho, revisar el diff final, ejecutar CI remoto y publicar la rama aprobada. El bloqueo de frecuencia del formulario quedó verificado en UI y en el evento de la regla WAF el 2026-10-08. La revisión de hoy comprobó rutas y presentación a 1440, 937, 390 y 320 px sin desbordes, CTA antes de la escena en móvil, carta Inicio, pausa/continuación por teclado y popup «Sí». No se hizo una nueva revisión de navegador sin JavaScript o con movimiento reducido; las pruebas unitarias cubren el estado estático. Medir pilotos y completar un ciclo mensual antes de anunciar alcances pagados y Avanzado como disponibles.

La prueba de Resend no sustituye la revisión de Zoho: confirmar el mensaje, su URL/correo/referencia y una respuesta efectiva mediante Reply-To. La sesión disponible estaba abierta en `demo@example.invalid`, no en la bandeja destinataria `contacto@browns.studio`. Hasta completar esa comprobación, la recepción en bandeja y la respuesta permanecen pendientes en `../operacion/lanzamiento.md`.

La integración raíz del 2026-10-09 pasó compilación, TypeScript, lint y 33/33 pruebas `test:integration`; su preview final compiló y quedó Ready. Ese conjunto incluye las 26 pruebas compartidas de handler, formulario y escena. La aplicación independiente original sincronizada registró históricamente lint, 7/7 `test:form`, build y TypeScript; no se afirma una repetición separada de cada comando de sus workflows. La compilación raíz registró un 404 del modelo Gemini `text-embedding-004` y usó el fallback existente: no bloqueó el build y no demuestra una integración externa válida. Se conservan Analytics, Speed Insights y la verificación de Search Console. El resumen técnico histórico está en `.qa/VERCEL-CORREO.md`; el detalle fechado de pruebas y evidencias permanece sólo en el respaldo local.

Las iteraciones anteriores están documentadas en `.qa/DIRECTION.md`, `.qa/PROCESS.md` y `.qa/EXAMPLES.md`; esos registros describen versiones históricas con demostraciones y efectos 3D.

> Nota de migración saneada (2026-10-21): las referencias administrativas y personales omitidas y las capturas excluidas se conservan en la copia exacta local. Las comprobaciones descritas son históricas y no se repitieron al preparar esta copia.
