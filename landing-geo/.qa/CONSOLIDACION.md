# Consolidación — 2026-10-06

## Cambios

La landing de dirección es ahora la página principal `/`. `/direccion` responde con redirección a `/`; el destino no establece un fragmento nuevo, para conservar las secciones de los enlaces existentes. La navegación restaura y enfoca la sección indicada tras cargar las fuentes.

Hero aprobado y escena conservados. Se añadió una demostración propia estática basada en la fuente pública compartida: servicios, cobertura y contacto. No hace consultas ni representa resultados de búsqueda. Se unificaron superficies y conectores discretos; los servicios muestran una entrega resumida al frente y conservan detalle/alcance al reverso. La antigua página principal y estilos de dirección se conservan como referencias en esta carpeta; las otras aplicaciones permanecen intactas.

## Comprobado

- Compilación de producción y TypeScript: aprobados.
- Lint: aprobado.
- 12 pruebas del formulario: aprobadas (validación, proveedor, errores, idempotencia y límites).
- 5 pruebas de escena: aprobadas (reproducción, pausa, visibilidad, repetición y movimiento reducido).
- HTTP local `/`: 200; contenido de demostración, servicios y composición estática inicial presentes.
- `/direccion`: acceso HTTP termina en `/`.
- Formulario sin configuración: 503; no envía correo ni confirma recepción.

## Pendiente

La política de seguridad del navegador interno rechazó abrir localhost. No se realizó la revisión visual nueva a 320/390/937/1440 px, ni se guardaron capturas nuevas. Las capturas anteriores no prueban esta versión. Teclado, cartas y fragmentos requieren comprobación visual de esta versión; los comportamientos existentes se conservaron.

No existe `.env.local`. Falta clave privada de Resend y remitente verificado. La recepción real en Zoho y respuesta al solicitante no se han comprobado. No hay base de datos ni análisis automático. Antes de publicación: configurar protección compartida de abuso en el alojamiento elegido y verificar recepción real.
