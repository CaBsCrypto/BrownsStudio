# Hero compacto e invitación desde el Sí

## Cambio

La escena conserva la pregunta, el agente y las dos empresas ilustrativas. Se limita a 560 px y se reduce el espacio del lienzo, manteniendo los datos legibles. La fila positiva tiene un botón real, utilizable con clic, Enter y Espacio.

Al pulsar el Sí se abre una invitación: «Empieza hoy a preparar tu empresa para la IA». El check y el confeti breve acompañan la apertura. El CTA «Pide tu análisis inicial gratis» cierra la invitación y lleva a `#analisis`, el formulario existente. La invitación no se abre automáticamente durante el ciclo.

## Comprobaciones realizadas

- Browser interno en 320, 390, 937 y 1440 px: escena y diálogo dentro del viewport, sin superposición entre «Datos disponibles» y el botón Sí.
- Clic, Enter y Espacio abren; Escape y el botón de cierre cierran. El foco vuelve al Sí al cerrar. El nombre accesible incluye su texto visible.
- El CTA deja la URL en `#analisis` y el foco en esa sección. No envía una solicitud.
- La animación se pausa mientras está abierto el diálogo. La pausa manual se conserva al abrir y cerrar.
- El desplazamiento de fondo queda bloqueado durante la invitación y se restaura al cerrarla, sin conservar estilos en el body.
- Una recarga limpia y 46,6 segundos de observación confirman dos ciclos de 22 segundos: consulta, comparación, retorno y foco sobre la respuesta sincronizados. Esto sustituye la revisión pendiente del retorno en la iteración anterior.
- Compilación, lint, TypeScript y siete pruebas de reproducción correctos.
- Revisión de fallback: el SVG completo existe en el HTML inicial; sin inicialización el botón y su instrucción permanecen ocultos. El CSS de movimiento reducido desactiva el flujo y el confeti. No se simuló la preferencia ni JavaScript desactivado en el navegador.

## Evidencia

- `hero-compacto-escritorio.jpg`
- `hero-compacto-movil.jpg`
- `hero-invitacion-escritorio.jpg`
- `hero-invitacion-movil.jpg`
- `hero-invitacion-medidas.json`
- `hero-invitacion-ciclos.json`

La revisión de desbordes se limita al hero y al diálogo. El desborde previo de las cartas de servicios en pantallas estrechas sigue fuera de este cambio.

No se modificaron el formulario, las APIs, el MCP ni las demás secciones. El CTA conserva el destino único; la entrega de correo no se probó ni se configuró en esta iteración.
