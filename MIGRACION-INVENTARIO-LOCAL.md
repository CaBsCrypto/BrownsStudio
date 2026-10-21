# Carpetas locales fuera de publicacion-main — revisión limitada

Fecha: 2026-10-21, America/Santiago.
Raíz inspeccionada: directorio local del proyecto Browns Studio (ruta de usuario omitida).

Este informe inventaría siete carpetas separadas; no autoriza incorporarlas al repositorio, mezclarlas entre sí ni sustituir las copias que pudiera contener `publicacion-main`. Ninguna mostró `.git` entre sus entradas raíz. No se verificó por esta tarea la procedencia Git ni el destino remoto de estas variantes.

## Método y límites

Se enumeraron nombres, extensiones y tamaños; se leyeron únicamente package.json, README, AGENTS/CLAUDE y configuraciones de desarrollo seleccionadas. Se excluyó el contenido de `node_modules`, `.next`, `dist`, `.wrangler`, `.qa` y `.git`. No se siguieron enlaces/reparse points; no se detectaron en el recorrido. La búsqueda inicial con rg devolvió también nombres de dependencias debido al patrón de exclusión; no se leyó su contenido y el inventario definitivo se hizo mediante recorrido explícito que omitió esos directorios.

No se leyeron datos de clientes, valores de archivos de entorno, capturas, logs, CSV, JSON de resultados ni código de aplicaciones. No se ejecutaron aplicaciones, scripts del proyecto, instalaciones, compilaciones ni pruebas. Las afirmaciones de resultados anteriores citadas por README son antecedentes documentales locales, no validación repetida ni verificación remota actual.

Los conteos son candidatos por extensión y ubicación, no una garantía de que todo sea original ni seguro para publicar. Los lockfiles sí están incluidos en los conteos. Tres archivos `tsconfig.tsbuildinfo` son salidas regenerables incluidas en el total de nombres, no fuentes que se deban trasladar.

## Inventario

| Carpeta | Archivos fuera de directorios omitidos | Bytes | Código por extensión | Docs/config/licencias por extensión o nombre | Assets por extensión | Otros |
|---|---:|---:|---:|---:|---:|---|
| calculadora | 1 | 17.293 | 1 HTML | 0 | 0 | Sin manifiesto ni README |
| landing | 30 | 1.232.294 | 14 | 9 | 6 | 1 tsbuildinfo |
| landing-geo | 58 | 665.085 | 41 | 13 | 3 | 1 tsbuildinfo |
| landing-spatial | 34 | 1.345.509 | 20 | 9 | 4 | 1 tsbuildinfo |
| operacion | 11 | 40.805 | 0 | 9 Markdown | 0 | 2 CSV no leídos |
| piloto-agentes | 13 | 728.129 | 7 TypeScript | 6 | 0 | Incluye declaración de tipos generada |
| release-notes | 56 | 9.725.394 | 4 CJS por nombre | 4 Markdown | 40 imágenes | 7 JSON de evidencia y 1 TMP |
| Total | 203 | 13.754.509 | 87 | 50 | 53 | 13 otros |

Las 40 imágenes de release-notes parecen capturas de revisión por nombre; no se consideran assets originales de la aplicación sin inspección específica. Los 13 assets restantes se encuentran en public/ de los tres prototipos: marca, fuentes WOFF2 y dos fondos WebP. `landing/public/art/README.md` documenta que ambos fondos son imágenes originales generadas para Browns Studio el 2026-10-01 y convertidas desde PNG; los PNG fuente no se encontraron entre las rutas enumeradas de estas carpetas. Las fuentes incluyen sus licencias locales según los README; no se verificaron sus binarios.

## Tipo, comandos documentados y relación

### calculadora

Único archivo `index.html`, sin manifiesto ni instrucciones de ejecución. Se referencia como trabajo conservado en los README de landing y landing-spatial. Su contenido no se revisó; no se puede afirmar que sea autocontenido, equivalente a otra copia o publicable.

### landing

Manifiesto `browns-studio-landing` 1.0.0: React 19, TypeScript 5.9, Vite 7.1, Three.js 0.180 y React Three Fiber 9.3. No fija engines ni packageManager. Conserva package-lock.json. README documenta `npm install`, `npm run dev` (loopback, puerto normal 5173), `npm run build` y `npm run preview`; menciona `--configLoader runner` si el entorno bloquea procesos auxiliares. Estos comandos no fueron ejecutados.

README dice que no hay backend ni formulario y conserva `../calculadora`. Documenta assets públicos locales, fuentes con licencias y marca obtenida del sitio de Browns Studio. No declara importación desde publicacion-main ni URL de repositorio GitHub.

### landing-geo

Manifiesto `browns-geo` 0.1.0: Node 24.x, Next 16.3.8, React 19.3.0, Three.js 0.180, TypeScript 5.9.3; package-lock.json independiente. Comandos: `npm ci`, `npm run dev` y `npm start` en 5175, `npm run audit:serve` en 4175, build, lint, typecheck y pruebas declaradas en `.qa/`. Si se decide migrar este prototipo posteriormente, no se deben perder los archivos fuente de pruebas por excluir indiscriminadamente todo `.qa`; no se leyeron en esta tarea.

README describe una integración de esta landing en el proyecto raíz con alias `@geo` y Root Directory `./`, conservando pnpm del proyecto raíz. Esa relación se afirma en documentación; este inventario no comparó la copia local con la versión contenida en publicacion-main. Su tsconfig propio resuelve `@geo/*` a `./src/*`.

Fuente pública declarada: `src/content/browns-public.json`, compartida con `../piloto-agentes`. Documentación operativa: `../operacion/README.md`. No hay dependencia `file:` ni workspace en los manifiestos leídos.

El formulario documentado usa Resend y un buzón Zoho. Nombres de configuración: `RESEND_API_KEY`, `GEO_MAIL_FROM`, `GEO_MAIL_TO`; ningún valor privado fue leído. Sólo apareció `.env.example` por nombre, no un archivo .env con valores, en el recorrido limitado. README describe recepción sin base de datos: notificación de texto y Reply-To, con límites locales por proceso y configuración WAF externa en Vercel. La recuperación segura de credenciales, verificación de bandeja/respuesta y reglas de hosting no queda resuelta clonando código.

Los antecedentes de previews, pruebas, entrega de correo y configuración remota están fechados en README; no se consultaron esos despliegues ni se confirmó su estado actual.

### landing-spatial

Manifiesto `browns-spatial-ui` 0.1.0: Next 16.3.8, React 19.3.0, Three.js, R3F/Drei, GSAP, Motion y Lenis; package-lock.json. README pide Node >=20.9 y dice haber usado Node 24.14. No fija engines. Comandos documentados: `npm ci`, dev en 5174, build, typecheck, lint y start en 4174.

README lo identifica expresamente como prototipo independiente, con datos y recursos copiados de `../landing`, sin importar ni modificar esa aplicación. Conserva la calculadora como otra variante. No conecta agentes o servicios reales; no tiene backend ni publicación según ese documento. Contiene una ruta Windows absoluta de esta PC en el ejemplo de cd; en notebook debe sustituirse por la nueva carpeta.

### operacion

Nueve documentos Markdown y dos CSV. README enlaza plantillas de análisis, propuesta, aceptación, entrega e informe mensual, más registros de cupos/tiempos, lanzamiento y flujo de formulario. No tiene manifiesto ni comandos. Los CSV no se leyeron; aunque README dice comenzar vacíos y usar IDs internos, no se verificó que sigan vacíos o que carezcan de información privada.

Su política local pide guardar solicitudes, propuestas, evidencias privadas y credenciales fuera de repositorios públicos, de public/ y de logs del Worker. Solicita registrar solicitudes en archivo local protegido: su ubicación efectiva, existencia y recuperación quedan fuera de esta revisión. Esta carpeta no debe incorporarse indiscriminadamente.

### piloto-agentes

Manifiesto `browns-agent-pilot` 0.1.0: Node >=22, TypeScript, Wrangler 4.147.0 y SDK MCP 2.3.1; package-lock.json. README y tsconfig apuntan a una aplicación Workers separada. Comandos documentados: `npm ci`; `npm run dev` en 127.0.0.1:5176; types, typecheck, test, test:live, check:availability y monitor. `build` es `wrangler deploy --dry-run --outdir dist`; no se ejecutó.

Depende explícitamente de `../landing-geo/src/content/browns-public.json`; copiar sólo esta carpeta rompería la ruta salvo modificación revisada. README declara tres herramientas MCP de solo lectura y ausencia de scraping, sistemas privados, escritura o almacenamiento de contactos.

wrangler.jsonc fija loopback como PUBLIC_ORIGIN, workers_dev y preview_urls en false. No declara cuenta, rutas, Cron, D1, KV, R2 o Durable Objects en el archivo leído. Observabilidad y trazas están habilitadas en configuración, sin verificar actividad remota. README dice que cuenta/dominio/plan no están elegidos. Un despliegue posterior requiere decisión separada.

`npm run monitor` se documenta como proceso local cada cinco minutos con JSONL bajo `.qa/`, que cesa al cerrar sesión o apagar la PC. Ese monitor no acompaña un clon ni garantiza continuidad en otro equipo.

### release-notes

Se revisaron únicamente nombres y extensiones. No tiene package.json ni README entre las rutas enumeradas. Incluye scripts de comprobación, Markdown, JSON, capturas y un temporal. Por nombres hay evidencia de formularios enviados, Resend y administración Zoho. Es un conjunto de evidencias potencialmente privadas, no una dependencia demostrada de ejecución. No se abrieron imágenes, JSON ni scripts; conservarlo local salvo selección y saneamiento específicos.

## Qué permanece en esta PC si el alcance es publicacion-main

Las siete carpetas completas permanecen fuera de la nueva rama, salvo archivos que ya existan dentro del checkout por su propio historial o que el agente principal seleccione expresamente desde allí. Este inventario no prueba equivalencia ni sincronización con esas copias. Tampoco se migra material omitido en `.qa`, dependencias instaladas, resultados de dist/.next, estado local de Wrangler, CSV operativos, capturas, archivos protegidos de solicitudes o procesos en ejecución.

Bloqueos concretos para afirmar que TODO Browns Studio es portátil:

1. El alcance entre publicacion-main y estas variantes debe quedar explícito; las carpetas sueltas no tienen procedencia Git verificada aquí y pueden contener cambios divergentes.
2. Piloto-agentes necesita la fuente del hermano landing-geo y configuración de origen coherente. Su monitor depende de una sesión y PC activas.
3. Landing-geo necesita recuperación privada de Resend y comprobación de Zoho; los antecedentes de Vercel/WAF no son configuración portátil comprobada.
4. Operacion puede depender de archivos protegidos de solicitudes, no localizados; dos CSV requieren revisión antes de cualquier publicación. Las evidencias de release-notes pueden contener datos de formularios y administración.
5. Las pruebas declaradas de landing-geo viven en `.qa`, omitida por autorización en este inventario. No afirmar que esas pruebas son trasladables sin seleccionar sus fuentes seguras.
6. Los PNG originales previos a conversión WebP no aparecieron entre estas rutas; los WebP de ejecución sí. No se revisaron rutas externas ni fuentes de assets fuera del alcance.

Estos puntos no prueban por sí solos que la migración exclusiva de publicacion-main esté bloqueada; impiden presentar esa migración como preservación de todas las variantes y recursos del directorio Browns Studio. No se detectó por nombres de archivos visibles una base `.db`, SQLite, dump SQL, clave privada o archivo .env con valores en las siete carpetas revisadas; la omisión de directorios y la ausencia de lectura de contenidos limitan esta observación.

## Preservación

No se alteró ningún archivo original. Única escritura de esta tarea: este informe sanitizado en el directorio de auditoría autorizado fuera del proyecto. No hubo commits, ramas, push, deploy ni cambios en main por esta tarea.
