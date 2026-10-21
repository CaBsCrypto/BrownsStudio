# Narrativa GEO y solicitud de análisis inicial

Registro histórico de la entrega del formulario. La oferta y el estado actual de validación están en `SERVICIOS-IA.md`; las comprobaciones de esta entrega no acreditan el estado visual actual.

Fecha: 5 de octubre de 2026. Ruta: http://localhost:5175/direccion.

## Implementado

Hero y CTA aprobados, sin cambios de redacción. Se retiraron las demostraciones, los planes, los precios pendientes y el proceso 3D de seis etapas de esta ruta. La propuesta conserva fuentes locales, marca, paleta y navegación por anclas. Tres aspectos de revisión, tres etapas, cinco FAQ y formulario de URL + correo. Sin puntajes, promesas de aparición, casos ni plazos inventados.

La ruta `/` conserva su hero anterior, planes y contactos. `Nav` y `FAQ` tienen props opcionales con sus valores anteriores por defecto. El contenido nuevo está separado en `src/content/direction.ts`.

## Envío

`POST /api/solicitudes-geo` envía una notificación de texto por la API de Resend a `contacto@browns.studio`, configurable mediante `GEO_MAIL_TO`. El correo del solicitante es `reply_to`. No visita la URL recibida, no crea un análisis ni envía una respuesta automática al solicitante. Solo confirma cuando Resend devuelve éxito y un identificador de correo. Eso no prueba la entrega al buzón.

Validación compartida cliente/servidor, cuerpo limitado a 4096 bytes, comprobación de origen, campo trampa y límites locales: 20 intentos por minuto por proceso, 3 envíos por dirección en 15 minutos. La memoria almacena hashes de direcciones y contadores, con caducidad y máximo de 1000 entradas. No registra solicitudes en logs. Estos límites no son distribuidos y requieren protección adicional de la plataforma antes de publicación.

El cliente conserva los datos en caso de fallo, mantiene la referencia al reintentar el mismo contenido para la idempotencia de Resend y bloquea envíos simultáneos. Una edición genera una nueva referencia. Errores de campos y estados tienen anuncios accesibles. Sin configuración devuelve 503 y nunca éxito simulado.

## Comprobaciones terminadas

- TypeScript: exit code 0.
- ESLint: exit code 0.
- Compilación Next: exit code 0, ambas páginas estáticas y endpoint dinámico.
- 12 pruebas del handler real con transporte simulado, sin enviar correos: éxito, destino/Reply-To, validación, URL con credenciales, configuración ausente, rechazo del proveedor, respuesta incompleta, red/timeout, origen/campo trampa/referencia, JSON/tamaño/tipo, reintentos y límites.
- HTTP local: `/direccion` responde 200 con el nuevo hero, campos y sin selector de demostraciones; `/` mantiene el hero anterior.
- POST local con datos sintéticos: 503, coherente con ausencia de configuración de Resend.

## Pendientes explícitos

La primera tentativa de inspección del navegador se bloqueó al vincular la pestaña que seguía mostrando un error de conexión anterior. Se solicitó al usuario recargarla manualmente. Aún no se verifica composición visual, teclado, reflujo a 320/390/1440 px ni comportamiento del formulario en el navegador.

Falta configurar una clave Resend y un remitente verificado, comprobar recepción real en Zoho y respuesta al solicitante, revisar SPF/DKIM del correo, cerrar alcance/formato/plazo del análisis gratuito y preparar protección de abuso para el alojamiento elegido. El prototipo sigue en localhost con noindex. Sin nuevas puntuaciones Lighthouse.
