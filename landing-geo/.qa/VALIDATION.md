# Validación de Browns GEO

Versión entregada el 5 de octubre de 2026. Proyecto independiente `landing-geo`, Next.js 16.3.8 y React 19.3, con dependencias fijadas en `package-lock.json`. Producción local disponible en **http://localhost:5175/**. Las carpetas anteriores se conservaron.

## Resultado

Oferta GEO en español, tres planes con límites y valores pendientes, recorrido de seis pasos, ejemplo conceptual, siete preguntas frecuentes y contacto real. Contenido prerenderizado y editable en `src/content/site.ts`. Logo original y fuentes locales. Sin Three.js, formulario, backend, asistente, analítica ni publicación. El prototipo declara `noindex, nofollow` y no inventa una URL pública.

La revisión visual se hizo por bloques y se registró en `STORYBOARD.md`. Los roles y la coordinación real constan en `TEAM.md`; las limitaciones de hilos obligaron a agrupar tareas de implementación. No se afirma que seis desarrolladores estuvieran ejecutando a la vez.

## Comprobaciones ejecutadas

| Comprobación | Resultado y evidencia |
| --- | --- |
| TypeScript | `npm run typecheck`, aprobado después del último cambio de navegación. |
| ESLint | `npm run lint`, aprobado. |
| Producción Next | `npm run build`, aprobado; ruta principal prerenderizada. Servidor `next start` en 5175. |
| HTML inicial | HTTP 200; un H1, un main, siete FAQ con respuestas en HTML, siete destinos internos válidos y ningún ID duplicado. Footer fuera de main, expuesto como contentinfo global. |
| Oferta y límites | Diagnosticar revisa hasta cinco páginas; Adaptar incorpora hasta tres piezas nuevas acordadas en una base técnica; Acompañar añade revisión, informe y mejora menor de hasta dos horas al mes. Valores inicial y mensual diferenciados. Sin cifras provisionales ni garantías de menciones, tráfico o ventas. |
| Recorrido | DOM ordenado del 1 al 6. Escritorio: posiciones medidas en filas 1–2–3 y 4–5–6, ambas de izquierda a derecha. Móvil: seis posiciones en una columna. Entregas y finales de plan visibles. |
| Teclado | Tab recorre enlace de salto, logo, navegación y CTA; foco visible de 3 px. Menú y FAQ se abren con Enter. Escape cierra el menú o la FAQ activa y devuelve el foco al summary. |
| Anclas y navegación | Saltos a planes, proceso y contacto, cierre del menú móvil y foco en título del destino. Retroceso y avance conservan los hashes. Recarga con `#planes` comprobada tras la última corrección: sección a 91,7 px bajo cabecera, foco en `plans-title`. |
| Contacto | Todos los CTA comerciales llevan a `#contacto`. WhatsApp usa `wa.me/12028808642`; correo `contacto@brownsstudio.dev`. Mensaje y asunto codificados. No se enviaron mensajes ni se probó la recepción en aplicaciones externas. |
| Consola | Sin errores ni advertencias de ejecución en las comprobaciones de producción del navegador. |
| Contraste | Paleta revisada y auditorías automáticas sin fallos de contraste. El 100 de Lighthouse no equivale a una certificación WCAG completa. |

### Responsive y objetivos táctiles

Mediciones finales en `responsive-final.json`. Ninguna dimensión comprobada presentó desbordamiento horizontal ni controles visibles menores de 44 × 44 px. El ancho útil descuenta la barra de desplazamiento de escritorio.

| Viewport | Ancho útil / scrollWidth | Proceso |
| --- | --- | --- |
| 320 × 568 | 305 / 305 px | Vertical |
| 390 × 844 | 375 / 375 px | Vertical |
| 844 × 390 | 829 / 829 px | Dos filas de tres |
| 720 × 450 | 705 / 705 px | Vertical |
| 1440 × 900 | 1425 / 1425 px | Dos filas de tres |

Se revisó también el cambio de tamaño en la misma página y se restauró el viewport del navegador al terminar. Las capturas de escritorio de la ventana interna no sustituyen las mediciones del viewport de 1440 px: el panel visible disponible puede tener un tamaño distinto.

### JavaScript bloqueado y carga lenta

Se utilizó `.qa/preview-conditions.mjs`, un proxy de prueba local de solo lectura, con origen en la misma producción de 4175 y escucha temporal en 4176. Este helper no forma parte de la aplicación y quedó detenido.

- **Sin ejecución de JavaScript:** CSP `script-src 'none'` en la respuesta de prueba. H1, planes, siete FAQ, contenido y contacto completos. Menú y FAQ nativos abrieron y cerraron mediante Enter. Escape no cerró la FAQ sin la mejora cliente, confirmando que el código no se ejecutaba. No se describe como una prueba del ajuste global de JavaScript del navegador.
- **Carga lenta:** HTML sin retraso artificial, CSS/fuentes/otros recursos con 1.500 ms adicionales y JavaScript con 3.000 ms. La página mantuvo contenido y contacto; capturas guardadas. Es una prueba de latencia controlada de recursos, no una emulación integral de ancho de banda ni una medición de tiempos de campo.
- **Movimiento reducido:** regla CSS implementada que desactiva transiciones/animaciones y usa scroll inmediato. No hay entradas automáticas ni escena animada. Se revisó la fuente; la herramienta no expuso emulación de la preferencia del sistema, por lo que la activación real queda pendiente.

## Tres auditorías Lighthouse finales

Ejecutadas **después del último cambio de fuente** sobre el mismo build de producción, servido en http://localhost:4175/. Lighthouse CLI oficial **13.5.0**, Chrome **154.0.8037.59**, Windows del equipo disponible. Tres ejecuciones secuenciales, perfil nuevo y restablecimiento de almacenamiento habilitado. Categorías: rendimiento, accesibilidad y buenas prácticas. SEO no se puntuó porque este prototipo local debe permanecer sin indexar.

Condiciones móviles predeterminadas: viewport 412 × 823, DPR 1,75; simulación de red RTT 150 ms y 1.638,4 kbit/s, ralentización CPU ×4. La configuración completa, entorno y fechas están en `lighthouse/summary.json` y en cada informe JSON. No son mediciones de un teléfono físico ni resultados de las landings anteriores.

| Ejecución (UTC, 2026-10-05) | Rendimiento | Accesibilidad | Buenas prácticas | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 03:49:39 | 97 | 100 | 100 | 0,930 s | 2,571 s | 76 ms | 0 |
| 03:49:52 | 97 | 100 | 100 | 0,908 s | 2,509 s | 47 ms | 0 |
| 03:50:05 | 97 | 100 | 100 | 0,908 s | 2,457 s | 70 ms | 0 |

Mediana: **97 / 100 / 100**, LCP **2,509 s**, TBT **70 ms**, CLS **0**. Se cumplen los objetivos de puntuación del prototipo. Los informes señalan optimizaciones posibles: unos 55 KiB de JavaScript no utilizado del framework, 13 KiB de compatibilidad heredada, 18 KiB de imagen y aproximadamente 150 ms de recursos que bloquean el render. Estas son estimaciones del laboratorio; no se convierten en promesas ni se presentan como INP o datos reales de usuarios.

Informes finales: [ejecución 1](lighthouse/run-1.report.html), [ejecución 2](lighthouse/run-2.report.html), [ejecución 3](lighthouse/run-3.report.html). Los directorios `lighthouse-pilot` y `lighthouse-pre-targets` contienen comprobaciones previas y no se utilizan como resultado final.

Para repetir en este equipo: iniciar `npm run audit:serve` y ejecutar `node .qa/run-lighthouse.mjs`. Ese script referencia el CLI de Lighthouse ya instalado y la ubicación local de Chrome; ajustar esas rutas en otro equipo. No instalar herramientas ni forzar dependencias para repetir sin necesidad.

## Capturas guardadas

- `gate-hero-desktop.png`, `gate-hero-mobile.png`, `gate-plans-desktop.png`: revisión inicial de composición.
- `final-hero-desktop.png`, `final-full-desktop.png`, `final-plans-desktop.png`, `final-process-desktop.png`: versión final en escritorio.
- `final-320.png`, `final-hero-mobile.png`, `final-full-mobile.png`, `final-process-mobile.png`: versión final móvil.
- `keyboard-mobile.png`, `no-javascript.png`, `slow-load.png`: evidencias de condiciones e interacción.

## Límites y comprobaciones pendientes

- **Zoom real al 200 %:** el atajo del navegador interno no cambió el viewport ni DPR; no se atribuye una aprobación. Las pruebas de reflujo a 320 y 720 px son independientes y no sustituyen esta comprobación.
- **Preferencia real de movimiento reducido**, lector de pantalla y dispositivo móvil físico: pendientes por las capacidades disponibles. El comportamiento estático y las reglas CSS se revisaron sin afirmar una prueba del sistema operativo.
- La evaluación de claridad y diseño es una revisión experta, no un estudio con clientes. Precios, plazo comercial, dominio público y cualquier publicación siguen por acordar.
- No se acreditan menciones de IA ni resultados comerciales. Si una estructura existente bloquea una incorporación, el texto explica que debe informarse y coordinarse antes de modificar el SEO.

## Referencias

La secuencia de servicio toma la idea de reducir incertidumbre de [BIGSEO](https://bigseo.com/agencia-seo/), con seis pasos y copy propio. Los límites del mensaje se contrastaron con la [documentación oficial de Google sobre funciones de IA](https://developers.google.com/search/docs/appearance/ai-features): las prácticas SEO existentes siguen siendo relevantes y no hay garantía de aparición. No se presenta GEO como un requisito técnico especial reconocido por Google.
