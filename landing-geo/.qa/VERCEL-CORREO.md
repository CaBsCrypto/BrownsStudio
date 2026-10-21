# Formulario GEO y configuración de correo — resumen saneado

Este documento conserva las decisiones técnicas y los límites de las comprobaciones históricas de 2026-10-08 y 2026-10-09. La migración de 2026-10-21 no repitió estas validaciones, no hizo envíos ni creó despliegues. La documentación y las capturas originales se conservan exclusivamente en la copia exacta local; esta versión omite contactos de prueba, sesiones administrativas, URLs privadas e identificadores de servicios.

## Configuración técnica registrada

- El formulario se sirve mediante POST /api/solicitudes-geo y usa Resend para correo transaccional.
- Los nombres de configuración son RESEND_API_KEY, GEO_MAIL_FROM y GEO_MAIL_TO. Los secretos se recuperan por un canal seguro; no se incluyen sus valores.
- El contacto comercial público es contacto@browns.studio.
- El registro histórico indica que el dominio de envío tenía DKIM y SPF verificados y que se conservaron los MX de Zoho. No se comprobó nuevamente ese estado durante esta migración.
- La preview independiente utilizaba landing-geo sin cambiar el Root Directory del proyecto raíz. La integración posterior conserva la raíz ./.
- El formulario solicita URL y correo, espera confirmación del handler y no crea diagnósticos automáticos ni persiste solicitudes en una base de datos.

## Protección contra abuso

- La política registrada limita a cinco solicitudes por IP cada sesenta segundos para POST /api/solicitudes-geo.
- El contador de plataforma es por región; el límite del handler es por proceso. No se documenta un contador global compartido.
- El campo trampa evita el envío de correos durante la comprobación controlada de frecuencia.
- El registro histórico observó el mensaje de límite en la interfaz y un evento WAF. La respuesta de Deployment Protection a solicitudes CLI no acreditó por sí misma el límite del endpoint.
- No se creó un bypass ni se desactivó Deployment Protection para completar esas comprobaciones.

## Resultados históricos y sus límites

- La landing independiente tenía veintiséis pruebas locales aprobadas y una compilación de preview registrada como correcta el 2026-10-08.
- La integración raíz registró compilación, TypeScript y lint aprobados, junto a treinta y tres de treinta y tres pruebas de integración el 2026-10-09.
- La aplicación independiente sincronizada registró lint, siete de siete pruebas test:form, build y TypeScript aprobados. No se afirma que cada comando independiente se repitiera por separado.
- El proveedor de correo registró aceptación y entrega SMTP de solicitudes de prueba. Esto no acredita lectura en la bandeja ni una respuesta efectiva mediante Reply-To.
- La comprobación de la bandeja destinataria en Zoho y la respuesta efectiva seguían pendientes.
- La compilación raíz registró un error del modelo Gemini de embeddings y usó el fallback existente; no acredita una integración externa válida.
- Los workflows remotos y la publicación productiva seguían pendientes en el registro fuente. Cualquier ejecución o despliegue posterior requiere la autorización correspondiente.

## Evidencia y continuación

Los identificadores administrativos, los contactos usados en pruebas y las diecisiete capturas de QA no forman parte de esta copia saneada. Los originales permanecen en la rama exacta local. La continuación debe recuperar secretos por canal seguro, revisar la configuración vigente y comprobar el flujo autorizado desde la otra PC. La autorización posterior permite publicar únicamente las dos ramas de migración identificadas en README-MIGRACION.md, con exclusiones automáticas de despliegue para sus nombres exactos. No autoriza builds, despliegues, llamadas a Gemini, PR, merge ni cambios en main. El respaldo exacto permanece sólo local; la verificación de la publicación se informa externamente.
