# Estado de lanzamiento

> Nota de migración: este documento conserva registros históricos; no se repitieron sus pruebas durante el saneamiento. Los marcadores sintéticos u omisiones sustituyen datos retirados y no identifican los valores usados en envíos reales.

Fecha de preparación: 2026-10-05, Chile. Toda comprobación técnica debe enlazar su evidencia en el registro del piloto.

Actualización 2026-10-09: la landing compartida está integrada en `/` del código del proyecto raíz y su preview final quedó Ready. Compilación, TypeScript, lint, 33 pruebas de integración, revisión visual local y un envío real con Delivered en Resend están comprobados. Publicar a `main` y al dominio, ejecutar CI remoto y comprobar bandeja/respuesta desde Zoho contacto siguen pendientes. Ver `../landing-geo/.qa/INTEGRACION-PUBLICA.md`.

Preparación local terminada: fuente pública, landing, tres herramientas MCP, fichas y cuatro plantillas. Pruebas locales y cliente oficial aprobados; evidencia en `../landing-geo/.qa/SERVICIOS-IA.md`. Ninguna puerta de publicación se deduce automáticamente de estas pruebas.

## Puertas para ofrecer Inicio

- [ ] Medir implementación y revisión de la base propia; confirmar alcance sostenible.
- [ ] Completar fichas, plantilla de propuesta y criterios de aceptación con evidencia real.
- [ ] Fijar precio privado de implementación, mantención y costos externos con tiempos medidos.
- [x] Configurar envío del formulario y comprobar una solicitud de preview aceptada, con estado Delivered en Resend.
- [ ] Comprobar el mensaje en la bandeja de contacto de Zoho y una respuesta efectiva mediante Reply-To.
- [x] Revisar SPF/DKIM y remitente verificado; activar la regla WAF para el formulario.
- [x] Comprobar en la UI autenticada el mensaje de límite de frecuencia tras seis envíos controlados sin generar correos.
- [x] Confirmar un evento Rate Limited en la regla WAF exacta tras la prueba de UI.
- [x] Comprobar móvil/escritorio, teclado y un envío real del formulario en la integración raíz; límites y capturas en el registro del 2026-10-09.
- [ ] Confirmar cupos disponibles antes de anunciar fechas de entrega.

## Puertas adicionales para Avanzado

- [x] Pilotar localmente fuente pública de Browns, tres consultas de solo lectura y descubrimiento coherente.
- [x] Validar cliente MCP real, entradas inválidas, ausencia, falla de fuente y falta de escritura en el piloto local.
- [ ] Confirmar alojamiento final, dominio, configuración de acceso, costos, monitoreo y aviso de fallos.
- [ ] Completar un ciclo mensual real de mantención, con fecha inicial/final, tiempos y reporte.
- [ ] Ajustar alcance si el ciclo excede cinco horas semanales y repetir validación.

## Continuidad y clientes piloto

- [ ] Implementación base aceptada; bolsa de 2 h mensuales de evolución cotizada y sostenible.
- [ ] Una sola cuota que sustituye mantención anterior, sin duplicidad.
- [ ] Hasta dos clientes activos y una implementación simultánea, incluyendo el trabajo propio en capacidad.

Mientras una puerta necesaria siga pendiente, la landing conserva «alcance piloto» / «en validación», sin límites pagados anunciados como disponibles ni precios. No marcar un mes completo con pruebas del primer día. No usar una demostración propia como caso de cliente.

## Revisión de Vercel y preparación de main — 2026-10-08

Estado: preview de la nueva landing Ready y envío real del formulario confirmado con estado Delivered en Resend. En Vercel se guardaron remitente, destino y clave de envío en Production y Preview y se activó una regla WAF para el endpoint. La UI autenticada mostró el rechazo por exceso de intentos tras seis envíos controlados sin correos; Firewall Overview confirmó un evento Rate Limited en la regla exacta. Producción, `main`, Root Directory, dominios e integraciones permanecieron sin cambios. La bandeja y respuesta de Zoho y la decisión sobre rutas productivas siguen pendientes.

| Comprobación | Resultado observado |
| --- | --- |
| Proyecto Vercel | `brownsstudio`, equipo `[identificador omitido]` |
| Git conectado | `[identificador omitido]/BrownsStudio`, producción desde `main` |
| Deployment productivo | Ready, commit [identificador omitido]; aplicación anterior, sin sustitución |
| Preview nueva landing | Ready mediante CLI al proyecto existente; deployment [identificador omitido], URL de preview (referencia de preview omitida) |
| Framework y runtime | Next.js, Node 24.x; comandos y salida sin overrides |
| Root Directory | Se conserva `./`. En la revisión del 2026-10-08 construía la portada anterior; la integración preparada el 2026-10-09 importa la nueva landing desde el código raíz, todavía sin publicar |
| Dominio | `www.browns.studio` y `[host de preview omitido]`: Valid Configuration; `browns.studio` redirige 308 a www y muestra DNS Change Recommended |
| Variables de correo | `GEO_MAIL_FROM=Browns Studio <contacto@browns.studio>` y `GEO_MAIL_TO=contacto@browns.studio` guardadas en Production y Preview. `RESEND_API_KEY` guardada como Secret en filas independientes para Production y Preview. No se incluyen valores privados |
| Protección | Regla WAF activa `[identificador omitido]`: 5 solicitudes por IP cada 60 segundos en ventana fija, solo `POST /api/solicitudes-geo`, contador por región. CLI: 401 de Deployment Protection. UI autenticada: mensaje reservado a 429 tras seis envíos controlados con campo trampa. Firewall Overview: un evento Rate Limited en «GEO solicitudes - 5 por IP por minuto», bloqueo verificado |
| Resend | `browns.studio` Verified; envío habilitado, DKIM/SPF Verified y recepción deshabilitada. Remitente preparado: `Browns Studio <contacto@browns.studio>`. Clave creada con autorización del usuario: `Browns Studio · solicitudes GEO`, Sending access limitado a `browns.studio`, identificador `[identificador omitido]` |
| Prueba de envío | El registro histórico documentó aceptación y entrega del proveedor; los contactos de prueba se retiraron. Resumen técnico: `../landing-geo/.qa/VERCEL-CORREO.md`; las evidencias originales permanecen sólo en el respaldo local. |
| Bandeja y respuesta Zoho | Pendientes: la sesión disponible corresponde a Responsable de operación, no a contacto. El estado Delivered de Resend no sustituye abrir el mensaje y responder desde la bandeja destinataria |

La rama local `codex/preparar-landing-geo` vive en `integracion-main`, clonado del commit de producción. Inicialmente añadió `landing-geo` como aplicación independiente. El 2026-10-09 se integró su componente compartido `GeoLanding` en `app/page.tsx` del proyecto raíz mediante el alias `@geo`, junto con el handler y los recursos públicos. La subcarpeta conserva su ejecución independiente; las configuraciones de esa preview no se confunden con la raíz que se publicará. Admin y las APIs existentes permanecen en el proyecto raíz. La validación propia de esa integración se registra al final de este documento.

El proyecto productivo conserva Root Directory `./`. La integración preparada sustituye la portada pública desde ese código raíz, sin retirar `/admin`, las APIs de WhatsApp, webhooks ni las demás integraciones. Los locales `/es`, `/en` y `/pt` y `/direccion` redirigen a `/`. El marketing retirado de portafolio, formación, demo, soluciones, casos de estudio y proyectos redirige a `/#servicios`. El piloto MCP sigue independiente. El funcionamiento de las integraciones externas no se deduce de conservar sus archivos.

Decisión del usuario el 2026-10-08: conservar WhatsApp, webhooks y administración. La preview independiente validó correo y WAF sin sustituir producción. El 2026-10-09 la integración pública pasó a usar el proyecto raíz para conservar esas rutas; ya no depende de cambiar Root Directory a `landing-geo`. La nueva portada se publicará solo después de revisar e integrar la rama correspondiente. El despliegue productivo existente no ha sido sustituido.

Para cerrar la validación:

1. Dominio de envío verificado en Resend y clave limitada a Sending access de `browns.studio` creada con autorización. Mantener los MX de Zoho; conservar el valor de la clave únicamente en configuración privada.
2. `RESEND_API_KEY` está guardada como Secret en Vercel, Production y Preview; remitente y destino también están guardados. La preview nueva ya utilizó esa configuración para una solicitud real.
3. La preview independiente del 2026-10-08 y la preview raíz final del 2026-10-09 quedaron Ready, sin cambiar Root Directory. Conservar `noindex` en previews y local.
4. La solicitud identificada fue aceptada y Resend muestra Delivered. Abrirla en la bandeja `contacto@browns.studio` de Zoho, comprobar URL/correo/referencia y responder a Responsable de operación mediante Reply-To. Registrar el resultado antes de dar por cerrada la recepción.
5. Regla WAF y bloqueo verificados: la UI autenticada mostró el mensaje correspondiente a 429 tras seis envíos con campo trampa y Firewall Overview registró un evento Rate Limited en esa regla exacta. Los intentos CLI devolvieron 401. Se descartó crear un bypass de Deployment Protection; no se desactivaron esa protección ni CSRF.
6. La revisión local raíz comprobó portada, redirecciones, protección de admin y presentación; los resultados del 2026-10-09 figuran abajo. Canonical está preparado para `https://www.browns.studio/`; preview/local aplican `noindex`, robots bloqueado y sitemap vacío, y producción publica solo la portada en sitemap. Los checks de rutas no prueban proveedores externos; comprobar de nuevo las rutas públicas tras publicar.
7. Revisar el diff y los checks de la rama antes de integrar en main. Un push a main activa producción en el proyecto actual.

Referencias oficiales: [configuración de build y raíz](https://vercel.com/docs/builds/configure-a-build), [Node.js](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [entornos y variables](https://vercel.com/docs/environment-variables).

Verificación histórica del 2026-10-08: nueva landing con 26 pruebas locales aprobadas y compilación de preview correcta. El diff pasó `git diff --check`; solo `.env.example` entró en Git, sin credenciales. La aplicación anterior se instaló con pnpm filtrado, lockfile congelado y scripts de instalación deshabilitados; compiló con Next.js 16.2.6, generando 74 páginas y 11 APIs. El paso de embeddings se omitió sin `GEMINI`; su lint antiguo no pasó. Estos resultados no sustituyen los de la integración raíz del día siguiente ni las pruebas de producción.

No se ejecutó un POST de prueba en producción: la revisión automática de aprobación rechazó esa solicitud por innecesaria. No se redujo la protección WAF, Deployment Protection ni CSRF. Resumen técnico histórico: `../landing-geo/.qa/VERCEL-CORREO.md`; el registro y las capturas originales permanecen sólo en el respaldo local.

## Integración pública raíz — 2026-10-09

El registro histórico de la preview raíz indicó Ready y aceptación/entrega de un envío de prueba. Los datos de esa solicitud y sus referencias exactas se omitieron. Resumen técnico: `../landing-geo/.qa/VERCEL-CORREO.md`; las evidencias y referencias exactas permanecen sólo en el respaldo local. No se repitió esta verificación.

Compilación raíz, TypeScript, lint y 33/33 pruebas `test:integration`: PASS, incluidas las 26 pruebas compartidas de handler, formulario y escena. La aplicación independiente original sincronizada registró históricamente lint, 7/7 `test:form`, build y TypeScript. No se afirma que cada comando independiente se haya repetido por separado; la ejecución de los workflows en GitHub Actions requiere subir la rama y sigue pendiente. La compilación raíz emitió un 404 de Gemini `text-embedding-004` y usó el fallback existente; no bloqueó el build ni acredita el proveedor externo.

En localhost:5177 se observó GET `/` 200; `/direccion` y `/es` 307 a `/`; `/es/soluciones/servicios` 307 a `/#servicios`; admin 307 al login y API de admin 401. WhatsApp GET respondió 403 sin verificación y Calendly GET 405: se verificó el comportamiento de entrada, no los proveedores. `/direccion#preguntas` conservó el fragmento en el navegador.

La revisión CUA a 1440, 937, 390 y 320 px no mostró desbordes y comprobó CTA antes de la escena en móvil, frente/reverso de Inicio, pausa/continuación con Enter y popup «Sí». No hubo una nueva revisión de navegador sin JavaScript o con movimiento reducido; las pruebas unitarias cubren el estado estático. Se conservaron Analytics, Speed Insights y la verificación de Search Console. Capturas y detalle en el registro de integración.

- [x] Montar la misma landing compartida en `/` del proyecto raíz y conservar la aplicación independiente.
- [x] Preparar redirecciones de `/direccion`, locales y marketing retirado.
- [x] Conservar admin, protección de admin, WhatsApp, webhooks y demás APIs existentes en el código raíz.
- [x] Preparar canonical, Open Graph, robots y sitemap de la portada, con exclusión de indexación en preview/local.
- [x] Registrar compilación, TypeScript, lint, pruebas, revisión visual/teclado y rutas locales de la nueva integración.
- [x] Comprobar preview raíz Ready y envío real aceptado y Delivered por Resend.
- [ ] Abrir el mensaje en Zoho contacto y confirmar la posibilidad de responder desde esa cuenta con Reply-To.
- [ ] Ejecutar los workflows en GitHub después de subir la rama.
- [ ] Revisar el diff final, integrar a `main` y comprobar la nueva portada y rutas en el dominio tras el despliegue.

Registro detallado: `../landing-geo/.qa/INTEGRACION-PUBLICA.md`. Preparar código no equivale a publicar ni demuestra funcionamiento externo de integraciones.

> Nota de migración saneada (2026-10-21): las referencias administrativas y personales omitidas y las capturas excluidas se conservan en la copia exacta local. Las comprobaciones descritas son históricas y no se repitieron al preparar esta copia.
