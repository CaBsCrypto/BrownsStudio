# Equipo y bloques de trabajo

Este registro distingue la revisión inicial de seis roles de la implementación efectivamente realizada. La herramienta limitó la creación o reactivación de algunos hilos con `agent thread limit reached`; la ejecución agrupó responsabilidades en los agentes disponibles. No se presenta como seis implementadores trabajando simultáneamente.

## Coordinación

- **Scrum Master:** `geo_scrum_master`. Coordinó el contrato de contenido, los responsables, las dependencias, la revisión visual y los criterios de cierre. Implementó el bloque frontend cuando no pudo iniciar el hilo frontend de la nueva tanda.
- **Oferta y contenido:** `geo_offer`, separado de los seis roles técnicos. Definió y centralizó textos, los tres planes, precios pendientes, periodicidad mensual, entregables, límites y contacto en `src/content/site.ts`.
- **Integración:** root. Preparó el proyecto, dependencias, recursos, fuentes, metadatos, contacto, documentación, servidor y validación final.

## Seis revisiones iniciales

| Rol | Agente que realizó el análisis | Resultado incorporado |
| --- | --- | --- |
| UI/UX | `geo_ui_visual` | Dirección editorial clara, tipografía, composición, comparación comercial y gate visual |
| Frontend | `geo_frontend` | HTML prerenderizado, proyecto independiente, CSS Modules y contenido editable |
| Accesibilidad | `geo_accessibility` | Contraste calculado, menú y FAQ nativos, controles de 48 px, foco y reflujo |
| SEO/GEO técnico | `geo_indexable` | Hechos contrastados con fuentes oficiales, metadatos locales, contenido consultable y límites de promesas |
| Contacto | `geo_contact` | WhatsApp y correo existentes, destinos codificados y ausencia de recepción simulada |
| QA/rendimiento | `geo_quality` | Matriz de validación, evidencias nuevas, revisión responsive y medición sobre producción |

Las decisiones comerciales posteriores prevalecen sobre esas primeras recomendaciones: tres planes **Diagnosticar → Adaptar → Acompañar**, precios pendientes, seguimiento mensual y hasta tres **incorporaciones nuevas de información**, sin sustituir el SEO existente. El proceso de escritorio mantiene **1–2–3 / 4–5–6**, ambas filas de izquierda a derecha.

## Implementación y revisión real

| Bloque | Responsable efectivo | Propiedad o comprobación |
| --- | --- | --- |
| Hero, secciones, planes, proceso y esquema conceptual | `geo_scrum_master` | `page.tsx`, su CSS y `InformationDiagram` |
| Navegación y preguntas frecuentes | `geo_accessibility_build` | `Nav`, `FAQ` y sus CSS; mejoras de teclado, Escape y CTA móvil |
| Base, metadatos y contacto | root | Configuración, fuentes, recursos, `layout`, `globals` y `Contact` |
| Oferta y copy | `geo_offer` | Configuración central de contenido |
| Gate visual | root y `geo_scrum_master` | Capturas de portada escritorio/móvil y comparación de planes |
| Revisión técnica independiente | `geo_technical_review` | Lectura de HTML servido, metadatos, anclas y enlaces de contacto; sin modificar fuentes |
| QA y rendimiento finales | root | Pruebas de navegador y auditorías nuevas de producción; resultados en la documentación de validación |

La asignación de `Contact` al agente de accesibilidad se detuvo antes de que editara archivos; root mantuvo la propiedad de ese componente. Los cambios compartidos se entregaron al integrador para evitar dos editores sobre el mismo archivo.

## Gates de entrega

1. **Contenido y diseño:** alcance GEO, tres planes, precios pendientes, recursos locales y una dirección visual acordada antes del frontend.
2. **Primera composición:** hero, planes y proceso construidos; revisión de capturas antes de dar por cerrada la presentación completa.
3. **Correcciones del gate:** anclas, alineación del espacio de valores, CTA móvil completo, etiqueta FAQ editorial y continuidad mensual visible.
4. **Validación:** TypeScript, lint y compilación; HTML inicial, teclado, móvil, contacto y mediciones nuevas sobre producción. Una prueba no ejecutada se registra como pendiente, nunca como aprobada.

Los resultados de rendimiento de los prototipos anteriores no se trasladan a este proyecto. Ninguno de estos bloques autoriza publicación, envíos a terceros o modificaciones del sitio de un cliente.

## Cierre de revisión independiente

`geo_technical_review` comprobó respuesta HTTP 200 y analizó el HTML servido por 5175 tras retirar scripts. Encontró un H1, un main, siete FAQ completas, siete destinos internos válidos y ningún ID duplicado. Los tres planes, incorporaciones nuevas, seguimiento mensual y valores pendientes están presentes. Los enlaces reales de WhatsApp y correo tienen mensaje y asunto codificados; no se enviaron mensajes.

La revisión no encontró bloqueos. Registró un detalle semántico menor: el footer generado por Contact se encontraba dentro de main, por lo que no se exponía como landmark global contentinfo. El integrador lo separó de main; la versión final del navegador lo expone como contentinfo global.

La lectura de fuente no sustituye pruebas de ejecución de foco, Escape, responsive o canales externos. Esas comprobaciones permanecen bajo el responsable de QA del navegador y deben constar en su informe final.
