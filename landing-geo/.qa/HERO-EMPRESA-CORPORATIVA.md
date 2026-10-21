# Hero: ficha de empresa y acento del Sí

Revisión local: 2026-10-07, http://localhost:5175/#inicio.

## Entrega

El Sí destaca con fondo azul más intenso, borde blanco, halo celeste y check. Ocho fragmentos pequeños salen hacia los lados exteriores del agente durante aproximadamente 1,1 segundos, una vez en cada ciclo de 30 segundos. No se añaden conexiones.

La fuente de empresa ahora es una ficha blanca con dos cantos suaves, un símbolo de edificio, separadores y datos concretos: mantención de oficinas, Santiago, Chile y contacto@empresa.example. El título es «Tu empresa»; «Perfil ilustrativo» y la nota general identifican la ficción. El cubo y las etiquetas sin datos se reemplazan por esta ficha.

## Verificación

- Compilación, TypeScript y lint correctos.
- PostCSS: diez animaciones válidas.
- 320, 390, 937 y 1440 px: ningún texto de la escena sale de su contenedor; la escena no desborda. Se conservan tres nodos, dos carriles y una señal visible.
- En el momento positivo, ocho partículas visibles, check y borde sincronizados; la pausa manual congela toda la animación.
- Confeti reposicionado fuera de las filas para evitar cruzar sus textos. A 320 px sus ocho partículas permanecen dentro del SVG, incluso en la fase activa.
- Continuación por teclado conserva la fase y el confeti se desvanece al terminar su ventana breve.
- Presentación estática y movimiento reducido conservados por CSS y estado inicial; no emulados directamente en el navegador durante esta revisión.

## Evidencia

- hero-empresa-corporativa-escritorio.jpg
- hero-empresa-corporativa-movil.jpg
- hero-empresa-corporativa-medidas.json
- agent-scene-empresa-corporativa.tsx.reference
- agent-scene-empresa-corporativa.css.reference

El efecto celebra información disponible en una demostración; no implica recomendación, aparición real o cliente conseguido. APIs, formulario y las demás secciones conservan su implementación anterior.
