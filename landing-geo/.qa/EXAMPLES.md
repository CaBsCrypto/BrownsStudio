# Iteración: ejemplos dental y legal

Fecha: 5 de octubre de 2026. Ruta: `http://localhost:5175/direccion`.

## Alcance

La propuesta queda en seis secciones tras retirar el bloque de límites (`limits-title` ausente). El hero ofrece dos radios nativos: clínica dental, seleccionado inicialmente, y estudio de abogados. El selector está fuera de `CardRelief`; sus paneles HTML comparten una celda de grid, reservan la altura del mayor contenido y ocultan el inactivo mediante `visibility` y `:has`.

`directionExamples` y `directionFaqs` están centralizados y separados de `site.example`. La revisión independiente confirmó que `/` conserva su ejemplo industrial y la FAQ original por defecto; `/direccion` recibe sus preguntas mediante la prop opcional `items`. No se modificaron motores 3D, dependencias ni precios.

TypeScript y lint terminaron con exit code 0. La compilación Next pasó, con `/` y `/direccion` estáticas. Pruebas de navegador realizadas por el agente principal; revisión de fuentes y contratos por Scrum Master y revisor independiente.

## Selector, lectura y responsive

- Flecha derecha cambia del ejemplo dental al legal con foco visible. Solo el panel activo aparece en el árbol de accesibilidad; el contenido inactivo no se presenta simultáneamente.
- El cambio de ejemplo conserva las alturas siguientes. En los tamaños medidos, `clientWidth` y `scrollWidth` coinciden y no se detectó desbordamiento interno del panel activo.

| Viewport | Altura de tarjeta | Altura de figura | Altura de etiquetas |
| --- | ---: | ---: | ---: |
| 1440 × 900 | 457 px | 704 px | — |
| 320 × 568 | 618 px | 915 px | 57 px |
| 390 × 844 | 633 px | 906 px | 60 px |

En móvil quedan cero canvases. En escritorio, Enter inicia el proceso: un canvas del proceso, estado `moving` y control Detener recorrido. La FAQ nueva se abrió con Enter. No se observaron errores ni warnings de consola en desarrollo.

Evidencia: [mediciones responsive](examples-responsive.json) y [captura móvil de desarrollo](examples-mobile.png).

## Producción sin JavaScript

Proxy local en 4176 con CSP `script-src 'none'`: seis secciones, cero canvases, selección dental inicial y tarjeta de 453 px. Flecha derecha selecciona legal sin JavaScript y la tarjeta conserva 453 px. El encabezado inactivo está ausente del árbol de accesibilidad y el activo está presente. FAQ abierta, enlace WhatsApp disponible y sin desbordamiento. [Registro](examples-noscript.json).

## Tres Lighthouse nuevos

| Ejecución | Rendimiento | Accesibilidad | Buenas prácticas | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 97 | 100 | 100 | 2600 ms | 27 ms | 0 |
| 2 | 97 | 100 | 100 | 2586 ms | 24,5 ms | 0 |
| 3 | 97 | 100 | 100 | 2585 ms | 25 ms | 0 |

Chrome 154, Lighthouse 13.5.0; móvil simulado de 412 × 823, DPR 1,75, CPU ×4, RTT 150 ms y throughput 1638,4 Kbps. Valores redondeados de [las auditorías de esta iteración](examples-lighthouse/summary.json), sin reutilizar resultados anteriores.

Dos intentos iniciales de Chrome fallaron al abrir el puerto de depuración dentro del sandbox. El lanzamiento con permisos ampliados para la auditoría local permitió completar las tres ejecuciones; esos intentos fallidos no aportan puntuaciones.

Estas mediciones corresponden a la carga inicial móvil y no miden FPS ni fluidez del 3D. La observación del árbol de accesibilidad no sustituye una prueba con lector de pantalla.

## Pendientes

No se realizaron nuevas pruebas de movimiento reducido en el sistema operativo, pérdida de contexto WebGL provocada, zoom real al 200 %, teléfono físico o lector de pantalla. Esas comprobaciones siguen pendientes, como en el registro anterior.

La comprobación final de producción confirmó seis secciones, dos radios, selección dental inicial, ausencia de `limits-title` y ausencia de errores o avisos de consola. El relieve del hero se activó tras interacción: `data-relief=webgl`, estado `moving` y un canvas dentro de la figura. Flecha izquierda devolvió la selección a dental.

Capturas finales guardadas: [Clínica dental](examples-production-dental.png) y [Estudio de abogados](examples-production-legal.png). README actualizado con los datos editables, controles, instrucciones y registro de esta iteración. La versión terminada queda abierta en `http://localhost:5175/direccion#inicio`, con el tamaño normal del navegador y el servidor de producción activo.
