# Consulta y regreso de información

Revisión local: 8 de octubre de 2026. URL: http://localhost:5175/#inicio

## Recorrido

Una sola esfera con halo y una cola breve recorre dos curvas reversibles. La consulta nace en el personaje, entra al centro del agente, llega al interior de la empresa preparada y regresa al agente y al humano. La competencia permanece apagada al costado. Se retiró la órbita alrededor del agente.

La entrada a los objetos es intencionada: se conserva la comprobación de profundidad. La esfera queda oculta dentro de sus cuerpos; los materiales muestran recepción y análisis mediante brillos suaves. Las tres ventanas de la empresa se iluminan sucesivamente. Al finalizar, la burbuja del humano muestra «Servicios, cobertura y contacto» durante 2,5 segundos.

| Tiempo | Acción |
| --- | --- |
| 0–2 s | El humano prepara la consulta |
| 2–4,5 s | La señal sale hacia el agente |
| 4,5–6,5 s | El agente se activa |
| 6,5–10,5 s | La señal llega a la empresa preparada |
| 10,5–14,5 s | Consulta ilustrativa de la información |
| 14,5–18 s | La información vuelve al agente |
| 18–19,5 s | El agente recibe la información |
| 19,5–21,5 s | Regreso hacia el humano |
| 21,5–24 s | Recepción y composición final antes de repetir |

## Presentación

Marco claro con profundidad suave, burbuja vinculada al personaje y una frase para cada etapa. La escena crece de 360 a 400 px de ancho máximo en escritorio y hasta 344 px en móvil, dentro del espacio disponible. Los textos reservan altura para evitar movimientos del contenedor. El hero, el formulario y las APIs conservan su funcionamiento.

Se mantiene «Demostración ilustrativa» y la advertencia de ejemplo ficticio. No se ejecutan consultas ni se atribuyen recomendaciones, posiciones o resultados comerciales.

## Verificación

| Ancho solicitado | Página útil | Escena |
| --- | --- | --- |
| 320 px | 305 px | 273 × 474 px |
| 390 px | 375 px | 335 × 474 px |
| 937 px | 922 px | 400 × 474 px |
| 1440 px | 1425 px | 400 × 474 px |

Sin desbordes, texto cortado ni superposiciones de rótulos. Dos ciclos completos observados durante 49 segundos: siete fases, un único canvas listo y altura constante de 474,09 px. Las curvas comparten sus extremos; el muestreo geométrico de 2.001 puntos no encontró cruces con los pedestales.

Pausa con Enter, continuación con Espacio y apertura/cierre del diálogo con teclado comprobados. Dos capturas separadas por dos segundos resultan idénticas durante la pausa. El diálogo suspende la escena y Escape devuelve el foco a Tu empresa.

Compilación de producción, TypeScript, lint y las siete pruebas del controlador pasan. La revisión de código incluye continuidad, estado estático con movimiento reducido y liberación de geometrías, materiales y texturas. No se emularon de nuevo JavaScript desactivado, movimiento reducido, pérdida de WebGL o pestaña oculta; no se midió rendimiento en un teléfono físico.

Capturas: [evidencia gráfica original local], [evidencia gráfica original local] y [evidencia gráfica original local].

> Nota de migración saneada (2026-10-21): las referencias administrativas y personales omitidas y las capturas excluidas se conservan en la copia exacta local. Las comprobaciones descritas son históricas y no se repitieron al preparar esta copia.
