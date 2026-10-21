# Integración de la portada pública — resumen saneado

Este documento conserva el diseño técnico y los resultados históricos registrados el 2026-10-09. La migración de 2026-10-21 no repitió las validaciones, no hizo envíos ni creó despliegues. La evidencia original se conserva exclusivamente en la copia exacta local; se omiten contactos de prueba, enlaces privados e identificadores de servicios.

## Implementación conservada

- app/page.tsx del proyecto raíz monta landing-geo/src/components/GeoLanding.tsx mediante el alias @geo. La aplicación independiente reutiliza ese componente.
- La integración conserva el Root Directory ./; no requiere cambiar la raíz a la subcarpeta.
- /direccion, /es, /en y /pt redirigen temporalmente a /. Las rutas públicas retiradas, con o sin prefijo de idioma, redirigen a /#servicios.
- /admin, sus APIs y protección, WhatsApp, webhooks y otros endpoints existentes permanecen en el proyecto. Conservarlos no acredita una prueba de sus proveedores externos.
- /api/solicitudes-geo, /informacion/browns.json y /informacion/browns.md reutilizan las implementaciones de la landing compartida.
- El formulario pide URL y correo y no crea análisis automáticos ni una base de datos.
- La metadata y Open Graph corresponden a la oferta GEO. El canonical preparado es https://www.browns.studio/.
- Solo VERCEL_ENV=production habilita indexación de la portada y el sitemap. Preview y local llevan noindex, robots bloqueado y sitemap vacío. Admin y APIs quedan excluidos del rastreo público.
- Se conservan Analytics, Speed Insights y la verificación de Search Console.

## Comprobaciones históricas

| Comprobación | Resultado registrado |
| --- | --- |
| Compilación raíz, TypeScript y lint | Aprobados |
| test:integration | 33/33, incluidas las 26 pruebas compartidas |
| Aplicación independiente sincronizada | Lint, 7/7 test:form, build y TypeScript aprobados |
| Workflows remotos | Preparados; ejecución pendiente en el registro fuente |
| Revisión de preview | Registrada como lista; referencias administrativas omitidas |

La compilación raíz registró un error del modelo Gemini de embeddings y utilizó el fallback existente. El resultado de build no acredita una integración externa válida.

Las comprobaciones locales registraron HTTP 200 en /; redirecciones 307 en las entradas públicas; redirección al login para admin sin sesión; 401 en API de admin sin sesión; 403 en la entrada de WhatsApp sin verificación; y 405 en Calendly GET. Estos resultados describen condiciones de entrada, no un intercambio con proveedores externos. Se observó conservación del fragmento al entrar por /direccion#preguntas.

## Revisión visual e interacción histórica

Se registró revisión a 1440, 937, 390 y 320 px sin desbordes; CTA móvil antes de la escena; carta Inicio por ambas caras; pausa y continuación con Enter; popup; y navegación. No se registró una nueva comprobación visual sin JavaScript ni con movimiento reducido. Las pruebas unitarias del estado estático no sustituyen esa revisión visual.

Las capturas originales se conservan localmente y no se incluyen en la rama saneada.

## Correo y pendientes

El registro fuente observó solicitudes de prueba aceptadas por el proveedor y entrega SMTP. Esto no demuestra lectura en Zoho ni una respuesta efectiva mediante Reply-To. El resumen técnico del correo y del límite por frecuencia se conserva en VERCEL-CORREO.md.

Continúan pendientes la comprobación de bandeja y respuesta, la ejecución remota de workflows y cualquier eventual publicación aprobada. Durante esta migración se mantiene la instrucción de no hacer push ni desplegar. Todos los resultados citados son históricos y no fueron repetidos para preparar esta copia.
