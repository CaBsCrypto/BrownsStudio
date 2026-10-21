# Alineación del humano en la escena

Revisión local: 8 de octubre de 2026. URL: http://localhost:5175/#inicio

## Cambios

- Humano en primer plano a la izquierda; agente separado hacia el centro para que no lo tape.
- Cuerpo ampliado un 40 % respecto del original, con pantalón y torso de mayor contraste. Los pies apoyan en la plataforma.
- Mano extendida hacia el agente, con la conexión calculada desde su posición real en el modelo.
- Pregunta de 126 px, próxima al personaje, con el rótulo «Una persona pregunta».
- Etiqueta de competencia sobre su edificio y rótulo de agente más estrecho en pantallas pequeñas.
- Carril despejado de los pedestales y llegada por el lateral de la empresa. El muestreo geométrico de la ruta no encontró intersecciones con los cuatro pedestales, incluyendo el radio de la señal.
- Alternativa SVG actualizada para conservar la misma composición.

## Verificación

320, 390, 937 y 1440 px: sin desbordes horizontales, texto cortado ni superposiciones entre los cuatro rótulos. Se conserva la escena de 273/320/360/360 px de ancho y 376 px de alto total.

Recorrido observado durante 20 segundos: las cuatro fases aparecen, con un único canvas listo durante todo el período. Pausa con Enter y continuación con Espacio comprobadas. Tras estabilizar el desplazamiento producido por el foco, dos capturas separadas por 2,2 segundos fueron idénticas durante la pausa.

Compilación de producción, TypeScript y lint pasan. No se cambiaron formulario, APIs ni reglas de reproducción. No se midió rendimiento en teléfono físico ni se emularon de nuevo movimiento reducido o JavaScript desactivado.

Capturas: `hero-persona-alineada-escritorio.png` y `hero-persona-alineada-movil.png`.
