# Una sola señal para la consulta del agente

Se conserva la escena compacta. El giro permanente alrededor del agente se sustituye por un tramo de la misma consulta: pregunta (0–2 s), llegada al agente (2–4 s), giro durante la consulta (4–8 s), recorrido hasta Tu empresa (8–10 s), señal detenida en su entrada y foco azul (10–14 s), regreso por el carril (14–17 s) y reposo (17–18 s).

Los indicadores usan el mismo diámetro de 6 px. Cada tramo se muestra únicamente cuando le corresponde; el relevo entre pregunta, giro, carril y entrada ocurre en posiciones coincidentes. El anillo tiene un diámetro explícito de 52 px y deja de girar al salir la señal. No se modifica la geometría compacta, el diálogo del Sí, el formulario ni las demás secciones.

## Verificación realizada

- Compilación, lint, TypeScript y las siete pruebas existentes del controlador: correctos.
- Observación de 37 muestras durante 37,7 segundos: dos ciclos, con cero o un indicador visible por muestra; se observaron los cuatro tramos y nunca dos señales separadas simultáneamente.
- Distancia entre llegada de la pregunta y agente: 0 px. Entre salida del agente y carril: 0 px. Entrada a Tu empresa alineada al centro de la fila: 0 px.
- Revisado a 1440, 937, 390 y 320 px. Altura de 426 px en los tres primeros tamaños y 477 px en 320 px. Sin texto ni contenedor desbordados dentro de la escena.
- Pausa con Enter y continuación con Espacio. Los cuatro indicadores permanecen quietos y con estado CSS pausado durante la pausa.
- Suspensión tras salir del hero y reanudación al volver comprobadas en el navegador.
- Pestaña oculta, movimiento reducido y estado inicial estático siguen cubiertos por las pruebas existentes del controlador y las reglas CSS. No se emularon las preferencias del sistema ni JavaScript desactivado en el navegador en esta revisión.

Capturas: `hero-senal-unica-escritorio.png` y `hero-senal-unica-movil.png`. Registro de observación: `hero-senal-unica-ciclos.json`. Medidas: `hero-senal-unica-medidas.json`.

El desborde horizontal previo de las cartas de servicios no forma parte de esta modificación del hero.
