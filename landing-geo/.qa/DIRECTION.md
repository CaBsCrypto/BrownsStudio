# Propuesta de identidad visual

5 de octubre de 2026. El usuario identificó la falta de personalidad y el aspecto genérico como el problema de la primera versión. Se creó una comparación independiente en **http://localhost:5175/direccion**; `/` conserva su presentación para comparar.

## Decisión de diseño

Browns como estudio que convierte conocimiento de una empresa en información publicable. La portada muestra una ficha específica del ejemplo aprobado, con servicio, público y próximo paso, rotulada **Ejemplo conceptual** desde la parte superior. No representa un cliente de Browns ni un resultado de IA.

La tipografía tiene mayor presencia, la pieza se apoya en un campo cobalto y el recorrido alterna papel y tinta. Los planes se comparan mediante columnas editoriales, con Adaptar en cobalto; conservan precios pendientes y un área uniforme de 128 px. Se mantienen la oferta, los seis pasos, sus cierres, el logo y las fuentes locales.

El Scrum Master revisó las fuentes sin editar y detectó riesgo de marca móvil, etiqueta conceptual tardía y diferencias de alineación en el cierre. Se corrigieron el tamaño de marca entre 381–420 px, la etiqueta superior y los anchos de FAQ/contacto/footer. La alineación de precios se comprobó mediante medidas, no solo por fuente. El título se presenta completo desde la configuración central.

Esta ruta completa permite revisar el lenguaje visual. El CSS conserva una capa de exploración sobre la composición anterior; si se elige esta dirección, conviene consolidar los estilos y compartir la estructura de secciones antes de promoverla como página principal. No se consideran estas decisiones una aprobación estética del usuario.

## Comprobaciones nuevas

- TypeScript, lint y compilación Next aprobados. `/` y `/direccion` prerenderizadas.
- Viewports 320 × 568, 390 × 844, 844 × 390 y 1440 × 900: scrollWidth igual a clientWidth, controles visibles de al menos 44 × 44 px y área de precio de 128 px en los tres planes. Datos en `direction-responsive.json`.
- Menú móvil: Enter abre, Escape cierra y devuelve el foco. Salto a Planes cierra el menú y enfoca `plans-title`. FAQ SEO: Enter abre, Escape cierra y devuelve el foco al summary.
- Portada, ficha conceptual móvil y planes revisados visualmente. La navegación y el contacto reutilizan los componentes y los datos aprobados; no se enviaron mensajes.
- Una auditoría nueva de producción de `/direccion`, **Lighthouse 13.5.0**, perfil móvil predeterminado (412 × 823, DPR 1,75, red y CPU simuladas ×4), Chrome del equipo Windows: **98 rendimiento, 100 accesibilidad, 100 buenas prácticas**. LCP 2,444 s, TBT 46 ms, CLS 0. Fecha de captura UTC: 2026-10-05T04:08:59.547Z. Informe `direction-final-audit.report.html/json`. Es una medición de laboratorio individual, no el promedio de tres ni una medición física de móvil. `direction-audit` es una comprobación anterior a las últimas correcciones.
- Las limitaciones de zoom real, preferencia de movimiento reducido, lector de pantalla y dispositivo físico registradas en `VALIDATION.md` siguen pendientes. No se atribuyen resultados anteriores a esta ruta.

Capturas de propuesta: `direction-hero-desktop.png`, `direction-hero-mobile.png`, `direction-plans-desktop.png` y `direction-plans-mobile.png`. Servidor de producción activo en 5175; servidor temporal de desarrollo 5176 detenido.

## Iteración: relieve y paleta clara

5 de octubre de 2026. El usuario valoró esta dirección, pidió un poco de Three.js para dar presencia a la tarjeta y rechazó los fondos de la segunda sección y del cierre. Confirmó contacto blanco con azul/celeste. Esta iteración conserva composición, contenido, oferta y precios pendientes; añade un soporte mate con profundidad y bisel detrás de la ficha HTML. La segunda sección pasa a papel claro y el contacto combina papel, botón cobalto y panel celeste.

Three.js **0.180.0**, mismo número que los proyectos anteriores, fijado en lockfile. Se emplea un único canvas decorativo local a la tarjeta, sin postprocesado, escenas a pantalla completa ni giro continuo. La biblioteca se importa al interactuar; el HTML y el respaldo CSS se muestran antes. Papel y soporte comparten pose; amortiguación independiente del framerate. DPR máximo 1,5, render a demanda que se detiene al asentarse, pausa por visibilidad y viewport, y disposición explícita de recursos. Móvil ≤800 px, puntero coarse y movimiento reducido mantienen la ficha frontal sin WebGL. Un fallo inicial o pérdida de contexto restaura CSS. Esos dos fallos y la preferencia real de movimiento reducido se revisaron en fuente; no se simularon en el navegador disponible.

El Scrum Master revisó el ciclo de vida y los estilos en modo lectura. Se corrigieron las coordenadas del puntero después de scroll y los guardas de importación asíncrona frente a ocultación, desmontaje y fallo.

Comprobaciones de esta iteración:

- Build Next y TypeScript aprobados; `/` y `/direccion` prerenderizados. ESLint aprobado. Los demás prototipos y la calculadora no se modificaron.
- WebGL real en el navegador interno: un canvas, `data-relief=webgl`, inclinación distinta al mover el puntero y `data-motion=idle` al asentarse. Sin errores o advertencias. Activación mediante foco del CTA de portada con contorno visible, comprobada también en producción.
- Desarrollo: 320 × 568, 390 × 844, 844 × 390 y 1440 × 900 sin desbordamiento horizontal. Contactos de al menos 44 px de alto; datos en `relief-responsive.json`. El cambio a móvil eliminó el canvas; el regreso a escritorio permitió reconstruirlo al interactuar. Producción: 1440 × 900 y 390 × 844 comprobados nuevamente, con foco en `contact-title` tras el salto.
- Scripts bloqueados por CSP mediante proxy local de la producción actual: contenido y contacto completos, cero canvas, respaldo CSS y FAQ SEO abierta con Enter. No se presenta como cambio global del ajuste de JavaScript. Proxy y desarrollo detenidos al finalizar.
- Tres auditorías nuevas de producción, Lighthouse 13.5.0 / Chrome 154 del equipo Windows, perfil móvil predeterminado 412 × 823, DPR 1,75, CPU ×4 y red simulada RTT 150 ms / 1.638,4 kbit/s. Informes en `relief-lighthouse`, sin reutilizar puntuaciones previas.

| Ejecución UTC (2026-10-05) | Rendimiento | Accesibilidad | Buenas prácticas | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| 05:11:41 | 98 | 100 | 100 | 2,464 s | 38 ms | 0 |
| 05:11:54 | 98 | 100 | 100 | 2,435 s | 25,5 ms | 0 |
| 05:12:06 | 98 | 100 | 100 | 2,442 s | 28,5 ms | 0 |

Estas auditorías miden carga inicial móvil, donde el relieve no se inicia; no acreditan tiempos de arranque 3D, 60 fps, INP de campo ni certificación WCAG. No se midió FPS durante la interacción. Zoom real al 200 %, preferencia del sistema, pérdida/fallo WebGL forzados, lector de pantalla y teléfono físico siguen pendientes.

Capturas nuevas: `relief-hero-production.png`, `relief-hero-mobile-production.png`, `relief-contact-mobile-production.png`, `relief-contact-desktop.png`, `relief-explanation-desktop.png`, `relief-card-desktop.png` y `relief-no-javascript.png`. Las tres primeras corresponden al build de producción; el resto documenta las revisiones durante construcción. Producción final en **http://localhost:5175/direccion**.

Referencias oficiales contrastadas con los tipos y fuentes instalados: [WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html) y [ExtrudeGeometry](https://threejs.org/docs/pages/ExtrudeGeometry.html). El sitio público de Three.js usa una versión posterior; no se actualizó la versión del proyecto para copiarlo.
