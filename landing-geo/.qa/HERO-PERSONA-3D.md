# Persona integrada en la estación de búsqueda

Revisión local: 8 de octubre de 2026. URL: http://localhost:5175/#inicio

## Cambio

- La persona ahora es una figura 3D con pedestal, cabeza, cuerpo y brazo levantado, dentro del mismo modelo del agente y los negocios.
- La pregunta queda como una anotación pequeña, sin un contenedor de chat separado.
- Una sola señal sale de la mano y comparte las curvas de conexión hasta el agente y la empresa preparada. No se miden carriles desde el DOM.
- Se conserva la narrativa ilustrativa, el diálogo al seleccionar Tu empresa, el formulario y el resto de la landing.
- La representación SVG estática también incluye a la persona y su conexión.

## Verificación

| Ancho solicitado | Ancho útil de página | Escena | Resultado |
| --- | --- | --- | --- |
| 320 px | 305 px | 273 × 376 px | Sin desbordes ni texto cortado |
| 390 px | 375 px | 320 × 376 px | Sin desbordes ni texto cortado |
| 937 px | 922 px | 360 × 376 px | Sin desbordes ni texto cortado |
| 1440 px | 1425 px | 360 × 376 px | Sin desbordes ni texto cortado |

La diferencia entre el ancho solicitado y el útil corresponde a la barra de desplazamiento. En todos los tamaños, el ancho del documento coincide con el ancho útil. La pregunta, el agente, la competencia y la empresa no se superponen. Los controles conservan al menos 44 px de alto.

Observación de 20 segundos: aparecen las cuatro fases (pregunta, agente, consulta y empresa), con un único canvas y el modelo listo durante todo el recorrido. Pausa con Enter y continuación con Espacio comprobadas; dos capturas completas separadas por 2,2 segundos resultan idénticas mientras la animación está pausada.

TypeScript, lint, compilación de producción y las siete pruebas del controlador de reproducción pasan. La revisión del renderer confirma continuidad de la señal desde la mano y liberación de los recursos de la persona.

Capturas: `hero-persona-3d-escritorio.png` y `hero-persona-3d-movil.png`.

## Límites de esta revisión

No se emularon visualmente JavaScript desactivado, movimiento reducido, pérdida de WebGL o pestaña oculta. Esos comportamientos mantienen sus alternativas estáticas y su lógica de suspensión; las pruebas del controlador cubren pausa manual, visibilidad y movimiento reducido. No se midió rendimiento en un teléfono físico.
