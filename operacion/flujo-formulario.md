# Formulario: qué sucede realmente

Estado local comprobado: no hay `.env.local` con configuración de envío. La cuenta contacto@browns.studio creada en Zoho no conecta por sí sola este formulario.

1. Todos los CTA principales de `/direccion` llevan a `#analisis`, en la misma página. Ese clic no envía ni almacena información.
2. La persona completa URL y correo. El navegador comprueba ambos, evita doble envío y asigna una referencia para reintentos.
3. Al enviar, hace POST JSON a `/api/solicitudes-geo`. El servidor valida formato, origen, tamaño, campo trampa y límites de frecuencia. No visita la URL ni ejecuta Cloudflare o un agente.
4. Si falta configuración, devuelve 503. La interfaz muestra un error y conserva los campos; no confirma una recepción inexistente.
5. Con configuración válida, el servidor pide a Resend enviar un correo al destinatario configurado (por defecto contacto@browns.studio), con URL, correo y referencia. Reply-To permite responder al solicitante. Resend debe aceptar el mensaje antes de mostrar confirmación. Esa aceptación no demuestra por sí sola entrega en Zoho.
6. Responsable de operación revisa la bandeja, confirma alcance/fecha y realiza el análisis manual. No se envía automáticamente un diagnóstico ni una respuesta comercial al solicitante.

## Dónde se guarda

Actualmente no existe base de datos de solicitudes. El servidor conserva temporalmente contadores de abuso en memoria; no son un registro de clientes y se pierden al reiniciar. Con envío habilitado, el mensaje y datos de contacto pasan por Resend y quedan en la bandeja de Zoho si se entregan. Su retención depende de la configuración de esas cuentas. El procedimiento operativo indica registrar manualmente la solicitud en un archivo privado; ese archivo no lo crea el formulario.

Las cartas, servicios y FAQ se guardan en `landing-geo/src/content/browns-public.json`, versionado junto al código. Se comparte con el piloto MCP para mantener consistencia. El estado de una carta abierta vive en el navegador y no se envía al servidor.

## Para habilitar y demostrar recepción

- Configurar RESEND_API_KEY, GEO_MAIL_FROM (remitente verificado) y GEO_MAIL_TO como secretos del servidor. Nunca variables NEXT_PUBLIC ni archivos publicados.
- Verificar el dominio/remitente y sus registros de correo. No alterar los MX de recepción de Zoho por conectar un proveedor de envío.
- Probar error, reintento y envío en móvil/escritorio; confirmar el mensaje real y su Reply-To en Zoho. Registrar la referencia y evidencia privada sin publicar el correo del solicitante.
- Antes de publicar, aplicar protección de abuso compartida en el alojamiento: los contadores actuales de proceso no coordinan varias instancias. Completar los controles pendientes de `lanzamiento.md`.

Crear contacto@ no basta para dar por terminado el envío. Esta revisión del diseño no inventa credenciales ni habilita análisis automáticos.


## Consolidación de la landing — 2026-10-06

La página principal está en `/`; `/direccion` redirige a ella conservando el fragmento de sección en el navegador. Las versiones anteriores se conservan como referencia.

La revisión local no encontró `.env.local`: falta introducir `RESEND_API_KEY` y un `GEO_MAIL_FROM` verificado mediante configuración privada. El destino es `contacto@browns.studio`. No se ha enviado ni recibido una solicitud real como parte de esta revisión.

Para cerrar la recepción: configurar el remitente sin alterar los MX de Zoho, reiniciar el servidor, enviar una solicitud identificada como prueba, comprobar su llegada a Zoho y responder al correo de prueba usando Reply-To. Registrar fecha y resultado sin incluir credenciales. La protección contra abuso compartida debe configurarse en el alojamiento antes de publicar; los límites actuales son por proceso.

> Nota de migración saneada (2026-10-21): las referencias administrativas y personales omitidas y las capturas excluidas se conservan en la copia exacta local. Las comprobaciones descritas son históricas y no se repitieron al preparar esta copia.
