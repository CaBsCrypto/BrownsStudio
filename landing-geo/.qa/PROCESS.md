# Iteración: tarjetas y recorrido del proceso

Fecha: 5 de octubre de 2026. Ruta evaluada: `http://localhost:5175/direccion`.

## Cambio entregado

- La propuesta pasa de ocho a siete secciones dentro de `main`: inicio, qué hacemos, planes, proceso, límites, preguntas y contacto. Se retiró el ejemplo conceptual independiente; la ficha conceptual del hero permanece.
- Qué hacemos, planes y límites incorporan contenedores de papel, bordes y superficies blanco/cobalto/celeste. Los tres espacios de precio conservan 128 px de altura y valores pendientes de definición.
- FAQ y sus respuestas se conservaron. Los componentes compartidos y los contactos existentes no se reemplazaron. La propuesta sigue separada de `/`.
- El proceso conserva seis tarjetas HTML, en orden 1–2–3 / 4–5–6 en escritorio y una columna en móvil. Los cierres de Diagnosticar y Adaptar y la continuidad mensual de Acompañar permanecen visibles.
- `ProcessJourney.tsx`, su CSS Module y `process-relief-engine.ts` añaden soportes mate y conexiones decorativas. El HTML está disponible antes del motor y nunca se sustituye por el canvas.
- El 3D se prepara por interacción en escritorio con puntero fino. Ancho de hasta 800 px, puntero grueso o movimiento reducido utilizan la composición estática. El control real ofrece **Ver recorrido / Detener recorrido**, con una secuencia aproximada de cuatro segundos y sin repetición automática. Hover eleva la tarjeta unos 4 px; al asentarse, el motor queda en `idle`.

## Comprobaciones en navegador

Las siguientes observaciones corresponden a las pruebas del agente principal; la revisión independiente de esta iteración examinó las fuentes del wrapper, motor y CSS.

| Comprobación | Resultado observado |
| --- | --- |
| Desarrollo: 320 × 568, 390 × 844, 844 × 390 y 1440 × 900 | Sin desbordamiento horizontal ni desbordamiento de texto en las tarjetas; seis pasos y siete secciones. Precios de 128 px en los tres planes. |
| Teclado | Enter inicia y detiene el recorrido. Escape cierra el menú. |
| Cambio a 390 px con el control enfocado | El botón se oculta, el canvas del proceso se dispone y el foco vuelve a `#proceso`; quedan cero canvases del proceso en móvil. |
| Producción: recarga con `#proceso` | Siete secciones dentro de `main`, `example-title` ausente; tras interacción hay un canvas del proceso con WebGL, estado `moving` y botón Detener recorrido visible. |
| Final de secuencia | Control habilitado, estado `idle` y anuncio de recorrido finalizado. Sin errores de consola observados durante estas pruebas. |
| Pestaña/navegador oculto | La animación se suspende; comprobación realizada por el agente principal. |
| Carga lenta mediante proxy en 4176 | HTML inmediato, JavaScript retrasado 3 s y CSS/fuentes 1,5 s. Los seis pasos aparecen y hay cero canvases antes de interacción. El control se deshabilita durante preparación; después aparece un canvas y la secuencia termina en `idle`, con el control habilitado y sin errores de consola. |
| Producción sin JavaScript mediante proxy en 4176 y CSP `script-src 'none'` | Siete secciones, seis pasos, control 3D oculto, cero canvases, enlace WhatsApp presente y sin desbordamiento. La FAQ sobre agencia SEO se abrió con Enter y se comprobó su atributo `open`. La pestaña de prueba se cerró al terminar. |

La prueba de 844 × 390 usa un viewport de navegador; no demuestra el comportamiento de un teléfono físico en horizontal. Los canvases indicados en este registro pertenecen al proceso; no se confunden con el relieve independiente de la ficha del hero.

Evidencia local:

- [Mediciones responsive](process-responsive.json).
- [Proceso en producción, escritorio](process-production-desktop.png).
- [Tarjetas de información](cards-information-desktop.png).
- [Tarjetas de planes](cards-plans-desktop.png).
- [Proceso móvil](process-mobile.png).

## Lighthouse nuevo sobre producción

Se ejecutaron tres auditorías nuevas de `/direccion`. No se reutilizaron puntuaciones de iteraciones anteriores.

| Ejecución | Rendimiento | Accesibilidad | Buenas prácticas | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 97 | 100 | 100 | 2589 ms | 22,5 ms | 0 |
| 2 | 97 | 100 | 100 | 2582 ms | 24 ms | 0 |
| 3 | 97 | 100 | 100 | 2580 ms | 23 ms | 0 |

Condiciones: Chrome 154, Lighthouse 13.5.0, emulación móvil 412 × 823, DPR 1,75, CPU ×4, RTT de 150 ms y throughput de 1638,4 Kbps, con throttling simulado. Métricas redondeadas desde [el resumen de las tres auditorías](process-lighthouse/summary.json).

Estas puntuaciones evalúan la carga inicial móvil, donde el proceso 3D no se activa. No miden su fluidez interactiva ni sustituyen una evaluación completa con lector de pantalla. El LCP observado ronda 2,58 s. No se midieron FPS.

La compilación de producción y lint de esta versión finalizaron correctamente, según la ejecución del agente principal.

## Revisión de código y dos defectos corregidos

1. **P2: carrera entre preparación y hover.** Un inicio pendiente y un hover posterior podían resolver el mismo import: el motor cancelaba la secuencia mediante `highlight`, mientras el wrapper mantenía Detener recorrido. Un token de intención monotónico protege las continuaciones de `point` y `animate`; salida, ocultación y modo estático invalidan solicitudes. El highlight pendiente también exige que no haya una secuencia nueva en curso. Se verificó esta corrección en fuente.
2. **P2: foco al ocultar el botón.** Fallo de WebGL o cambio a modo estático podían ocultar el control enfocado. Ahora se devuelve el foco a `#proceso`, con `tabIndex=-1`, antes de ocultarlo. Se revisó la rama de fallo en fuente y se comprobó en navegador el cambio a móvil.

El control dejó de usar `aria-pressed`: su etiqueta describe una acción nativa de iniciar o detener. Las tarjetas conservan semántica `ol/li`, sin roles de botón ni acciones ficticias. El canvas es decorativo, está oculto a tecnologías de asistencia y no intercepta el puntero.

La revisión de fuentes comprobó guardas tras la importación, desmontaje, cambio de preferencia y fallo; cancelación de rAF; desconexión de observers/listeners; disposición de geometrías y materiales; liberación del renderer/contexto y eliminación del canvas. El motor comparte recursos y mide el layout al inicializar o redimensionar, sin consultas del DOM por frame. El CSS nuevo permanece dentro de la ruta exploratoria; se añadió como una capa al final y todavía no se consolidó.

## Pendientes y límites de la evidencia

- Pérdida de contexto WebGL provocada en esta iteración: pendiente; alternativa de fallo revisada en código.
- Movimiento reducido mediante preferencia real del sistema operativo: pendiente; rama y CSS revisados.
- Zoom real al 200 %, lector de pantalla y teléfono físico: pendientes.
- Fluidez del 3D en FPS: no medida. La alternativa móvil es estática; no se atribuye una medida de fluidez 3D a las auditorías móviles.

No se añadieron precios, garantías de aparición, backend, publicación o nuevas integraciones comerciales en esta iteración.
