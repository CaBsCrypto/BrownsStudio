# Migración de Browns Studio — 2026-10-21

Este documento registra la preparación para continuar Browns Studio en otra PC. **Publicación: autorizada para dos ramas exactas, pendiente de verificación externa. Continuación: NOT VERIFIED.** El usuario autorizó la exclusión de deployments Git y la publicación limitada descrita abajo. El informe posterior debe confirmar los SHA remotos, la recuperación desde GitHub y los efectos observados. La copia no se ha instalado, compilado, iniciado ni probado, y tampoco se ha validado en la notebook.

## Repositorio y procedencia

- Repositorio verificado: https://github.com/CaBsCrypto/BrownsStudio
- Origin autorizado: `https://github.com/CaBsCrypto/BrownsStudio.git`.
- Visibilidad observada: **público**. Permiso observado de la cuenta: **ADMIN**.
- Rama predeterminada observada: `main`, en `7b34892d3ae40595627a59fd19eb3ceece34f73d` al consultar. Es un dato fechado, no una promesa sobre su estado futuro.
- Base elegida expresamente por el usuario: worktree `publicacion-main`, rama `codex/inicio-protagonista`, commit `e7c91030cdf68ee9d2628092f7e2b98bd0baa096`.
- Rama principal preparada: `migracion/browns-studio-20261021-8f42`.
- Integración saneada autorizada: `migracion/browns-integracion-saneada-20261021-8f42`, snapshot procedente de `integracion-main`, rama `codex/preparar-landing-geo`, commit `c5b62c9944bf3da4cce0c33d9d399d34fe23d48a`, sin los commits privados de integración como ancestros.
- Respaldo exacto **sólo local, no publicable**: `migracion/browns-integracion-20261021-8f42`, en `f3601ee117617042710212f825859eee1fc08410`. Se conserva separado e intacto.

La principal parte del trabajo real de publicación, no de la punta actual de `main`. En el inventario hubo cuatro commits de esa línea aún no publicados y seis archivos modificados, sin contenido staged ni archivos untracked. La línea de integración tuvo tres commits aún no publicados. Se preservan separadas: no se combinaron los dos árboles ni se hizo merge entre ellas. No había stashes.

Las seis modificaciones seleccionadas ya se preservaron en el commit local intermedio `cde2018`, manteniendo documentado el origen. Se normalizaron finales LF únicamente en la copia. Este identificador intermedio no sustituye el SHA final completo que deberá aportar el resumen de publicación.

Las referencias locales `main` y `publicar-landing-geo` representaban trabajo ya alcanzable en el remoto; no requieren ramas nuevas de migración. La última tenía el SHA remoto comprobado `60595caa0abbee84ed39a8ad4c6e693fb1779c8b`. El inventario distingue referencias locales antiguas del estado remoto consultado.

El SHA final de cada rama debe obtenerse del resumen posterior de publicación y verificarse en GitHub. Este documento contiene los SHA de origen; no intenta contener el hash del commit que lo incorpora.

## Contenido y límites de la preparación

Se prepara código fuente, configuración no secreta, lockfiles, documentación y los assets seleccionados después de revisar el contenido saliente. El detalle está en `MIGRACION-SEGURIDAD.md` y `MIGRACION-INVENTARIO-LOCAL.md`, además del informe final. No interpretar una copia local como prueba de que todo pueda publicarse.

La revisión histórica de la principal cubrió cuatro commits y 28 blobs nuevos, además de las seis modificaciones actuales, sin detectar secretos o datos personales nuevos. La integración exacta de origen tenía tres commits y 82 blobs nuevos, con 17 PNG y documentos de QA que incluían datos personales y administrativos; ese historial sigue exclusivamente local. Por decisión del usuario se preparó otra rama saneada: snapshot revisado `db943aa1954c3c5eb1cd92725b1a53b34ab7b180`, anterior al commit de exclusión, con padre `3b377c899ef7191a5bd00e14e419fc6be8167385`, ya remoto. Se retiraron los 17 PNG de QA y se sanearon ocho documentos fuente, conservando código y pruebas. Los tres commits privados y el respaldo exacto no son ancestros de esa alternativa. Su `MIGRACION-TRAZABILIDAD.md` registra las transformaciones; la documentación de ambas ramas no las combina.

En la copia principal se sustituyen por marcadores sintéticos los campos ambiguos de nombre/correo de `video-generator/reel-leads.json`, conservando su esquema. Se excluyen del árbol nuevo ocho MP4 regenerables de `video-generator/output` (aproximadamente 108 MB en conjunto) y `video-generator/temp-props-abogados-pro.json`. `video-generator/leads.json` contiene guiones de demostración, no un CRM, y se conserva según la revisión. Estas sustituciones/exclusiones no purgan contenido heredado que ya estaba en `origin`; no se reescribe ese historial remoto.

La revisión de los siete commits salientes no encontró LFS, submódulos o enlaces simbólicos, y la conectividad de objetos quedó comprobada. El mayor blob saliente observado era de 529.573 bytes. `.mcp.json` sólo declaraba `npx @remotion/mcp@latest`, sin secretos detectados; no se activó y debe revisarse antes de permitir su ejecución, que descargaría/ejecutaría código de una versión no fijada.

No se trasladan por defecto credenciales, valores de `.env`, sesiones, perfiles, logs sensibles, datos reales de clientes, dumps o bases privadas. Los archivos `.env` originales no se modifican. Los originales, su índice y sus versiones locales se conservan como respaldo; las operaciones de preparación se realizan en una copia Git aislada fuera del proyecto.

`node_modules`, `.next`, cachés, metadata local de Vercel y salidas regenerables no son requisitos que deban copiarse entre equipos. Deben conservarse las fuentes de videos, modelos, escenas, tipografías y medios necesarios que la revisión apruebe. Los nombres de archivos de datos o medios no acreditan que su contenido sea público.

No se inspeccionaron contenidos de rutas externas al alcance, ni se siguieron dependencias externas automáticamente. No se ejecutó Graphify; no había `graphify-out/graph.json` en estos dos worktrees. La revisión realizada no constituye una garantía absoluta de ausencia de secretos.

El inventario limitado de las carpetas hermanas fuera de estos árboles Git registró 203 archivos; consultar `MIGRACION-INVENTARIO-LOCAL.md`. Las variantes y material auxiliar de la carpeta Browns Studio quedan en la PC original; no se incorporan automáticamente a estas ramas. Existe una dependencia del piloto hacia `../landing-geo` y un monitor local ligado a la PC de origen. No se migró ni se reprogramó ese monitor. Antes de continuar esos componentes debe identificarse y autorizarse por separado qué fuentes, recursos y configuración necesita la notebook. Una rama de la aplicación raíz no preserva por sí sola ese conjunto externo.

## Automatizaciones y publicación limitada autorizada

El workflow `.github/workflows/landing-geo.yml` se activa por pull requests, pushes a `main` y ejecución manual. Instala dependencias y ejecuta lint, pruebas, build y TypeScript en la aplicación raíz y en la aplicación GEO. Por su configuración versionada, un push únicamente a las nuevas ramas no es un disparador `push` de ese workflow; crear un PR sí puede activarlo.

Se observaron deployments históricos de preview para `60595caa0abbee84ed39a8ad4c6e693fb1779c8b` el 2026-10-09 y de producción asociados a `main`. El handbook describe despliegue automático de Vercel desde `main`. La consulta inicial del conector devolvió 403; posteriormente la CLI existente pudo leer el proyecto y su scope exacto sin crear permisos o credenciales. Confirmó el enlace de `brownsstudio` con `CaBsCrypto/BrownsStudio`, rama productiva `main`, Node 24.x y raíz del repositorio. Las órdenes de build/install conservan valores por defecto; no apareció una orden para ignorar el build ni deploy hooks. `gitDeploymentEnabled` estaba ausente o nulo, lo que **no confirma previews desactivados**. Los rulesets y hooks remotos de GitHub consultados estaban vacíos y `main` aparecía sin protección; eso no elimina los efectos de la integración de hosting.

El usuario autorizó commits nuevos y publicar exclusivamente `migracion/browns-studio-20261021-8f42` y `migracion/browns-integracion-saneada-20261021-8f42` en el origin existente, sin deploys, builds ni llamadas a Gemini. La autorización no comprende `main`, PR, merge, force-push, tags ni el respaldo exacto privado. La verificación remota y la recuperación desde un clon nuevo deben registrarse después en el informe externo; este documento no anticipa que hayan ocurrido.

El `vercel.json` de la raíz excluye la creación automática de deployments Git para los dos nombres exactos mediante:

```json
{
  "git": {
    "deploymentEnabled": {
      "migracion/browns-studio-20261021-8f42": false,
      "migracion/browns-integracion-saneada-20261021-8f42": false
    }
  }
}
```

La exclusión se aplica al proyecto Vercel observado con raíz del repositorio. No cambia la configuración remota, las claves, el workflow ni `landing-geo/vercel.json`. Vercel puede recibir el evento Git y leer la configuración para decidir la exclusión; ese procesamiento no debe confundirse con un build o deployment. La política de Vercel permite deployments en nombres no excluidos, y cualquier regla coincidente en `true` prevalece. Conservar y verificar ambas entradas `false`, sin agregar reglas contradictorias.

La exclusión no impide deploys manuales, redeploys, CLI o futuros workflows. No ejecutarlos. Una rama nueva o renombrada no queda cubierta por estas dos entradas: antes de publicar una continuación hay que revisar sus efectos y obtener la autorización correspondiente, conservando la prohibición de desplegar. No usar `Ignored Build Step` como sustituto: inicia una fase de build antes de cancelarla.

La metadata de Vercel mostró `GEMINI_API_KEY` habilitada para preview sin restricción de rama, sin leer su valor. Impedir el build evita la ruta que ejecuta `scripts/generate-embeddings.js`; no se ha ejecutado ese script ni comprobado Gemini. Fuente de la semántica de exclusión: [documentación oficial de Vercel](https://vercel.com/docs/project-configuration/git-configuration#git.deploymentenabled).

## Entorno y dependencias

Las versiones se deducen de manifiestos, lockfiles y CI, sin instalar ni ejecutar el proyecto:

| Componente | Requisito o versión observada |
| --- | --- |
| Node.js | **24.x**, fijado por CI y `landing-geo/package.json` |
| pnpm | **10.28.0**, fijado por CI raíz |
| Raíz | Next **16.2.6**, React **19.2.6**, TypeScript **5.9.3** en lockfile |
| GEO independiente | Next **16.3.8**, React **19.3.0**, con `package-lock.json` propio |
| Generador de video | Remotion **4.0.469**, React **19.0.0**, incluido en workspace pnpm |
| Medios y revisión visual | FFmpeg para el flujo de video según documentación; Playwright para utilidades que lo requieran |

El workspace pnpm raíz incluye `.` y `video-generator`, no `landing-geo`. Por eso no debe sustituirse toda la instalación por un único `npm install`. No actualizar versiones o lockfiles como parte de la recuperación.

El README raíz menciona Node 18+ y el handbook propone npm, además de describir arquitectura anterior. Para reproducir lo versionado se toma como referencia Node 24 y las herramientas fijadas por el workflow. Las diferencias entre raíz y GEO son intencionalmente documentadas; no se intentó unificarlas.

La PC de preparación usa Windows. No se comprobó la arquitectura de la notebook ni su compatibilidad con dependencias nativas o herramientas multimedia. No se encontraron rutas locales absolutas incrustadas en las fuentes revisadas. El generador de video construye rutas desde el directorio de trabajo; ejecutarlo fuera de la raíz prevista puede romper su acceso a archivos. La existencia de fuentes no prueba que ese flujo funcione en hosting serverless.

## Variables, servicios y datos

Recuperar valores por un canal seguro autorizado, fuera de GitHub y del chat. Iniciar sesión con la misma cuenta no instala herramientas, recupera datos ni configura conexiones. Las plantillas deben contener exclusivamente nombres y placeholders. Revisar la plantilla final incorporada en la rama: las plantillas raíz originales no cubrían todas las variables referenciadas por el código.

| Uso | Nombres observados |
| --- | --- |
| Administración | `ADMIN_PASSWORD`, `ADMIN_SECRET` |
| Firebase | `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` |
| Gemini | `GEMINI_API_KEY`, `GEMINI_MODEL` |
| WhatsApp | `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_APP_SECRET`, `WHATSAPP_WEBHOOK_VERIFY_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_FLOW_ID`, `HANDOFF_NOTIFICATION_PHONE` |
| Kapso | `KAPSO_API_KEY`, `KAPSO_WEBHOOK_SECRET` |
| Voz | `ELEVENLABS_API_KEY` |
| Correo GEO | `RESEND_API_KEY`, `GEO_MAIL_FROM`, `GEO_MAIL_TO` |
| Otros | `GOOGLE_SHEETS_WEBHOOK_URL`, `CALENDLY_URL` |

También se observaron nombres de plantilla `WHATSAPP_BUSINESS_ACCOUNT_ID` y `NEXT_PUBLIC_SITE_URL`, además de variables de plataforma `NODE_ENV` y `VERCEL_ENV`. No colocar secretos en variables `NEXT_PUBLIC_*`.

Firestore es un servicio remoto y el cliente usa una base nombrada `browns-studio`, no la base predeterminada. Compartir cuenta entre PCs no migra datos ni configura permisos. No se exportaron registros, ejecutaron migraciones o modificaron producción. Para validar administración y automatizaciones se necesita un proyecto de pruebas o datos sintéticos y autorización del acceso correspondiente.

No se encontró una base SQLite o dump local en las ubicaciones revisadas ni una clave propia de cifrado de datos ligada al equipo en las fuentes inspeccionadas. Esto no demuestra que puedan recuperarse todas las dependencias privadas: la recuperación de credenciales, datos y assets que el informe final identifique sigue pendiente. No regenerar claves ni restablecer bases para forzar el arranque.

## Comandos previstos y sus efectos

Los comandos siguientes son instrucciones para una ejecución posterior autorizada en la notebook. **No se ejecutaron durante esta preparación.**

| Directorio | Comando | Efecto |
| --- | --- | --- |
| Raíz del clon | `pnpm install --frozen-lockfile` | Descarga dependencias raíz y video; puede compilar dependencias permitidas por el workspace |
| Raíz del clon | `pnpm run dev` | Inicia Next en puerto 3000; las rutas de integraciones pueden usar servicios reales si existen credenciales |
| Raíz del clon | `pnpm run build` | Ejecuta generación de embeddings y después Next build; leer advertencia siguiente |
| Raíz del clon | `pnpm run start` | Sirve una compilación previa |
| Raíz del clon | `pnpm run lint` / `pnpm run typecheck` | Revisión estática definida por el proyecto |
| Raíz del clon | `pnpm run test:integration` | Ejecuta el conjunto versionado de pruebas; revisar sus fuentes antes |
| `landing-geo` | `npm ci` | Instala versiones del lockfile independiente |
| `landing-geo` | `npm run dev` | Inicia Next en `127.0.0.1:5175` |
| `landing-geo` | `npm run build` / `npm run typecheck` / `npm run lint` | Compila o revisa la app independiente |
| `landing-geo` | `npm run test:geo` / `npm run test:form` / `npm run test:scene` | Ejecuta las pruebas declaradas del handler, formulario y escena |
| `landing-geo` | `npm start` / `npm run audit:serve` | Sirve build previo en 5175 o 4175; no compartir puerto con dev |

El build raíz ejecuta `scripts/generate-embeddings.js` antes de Next. Si `GEMINI_API_KEY` está presente en el entorno del proceso, puede **enviar el contenido completo de los Markdown de `knowledge_base` a Gemini**, consumir servicio y escribir `data/knowledge_base_embeddings.json` con texto y rutas absolutas. Ese script no carga `.env.local` por sí mismo. Sin la variable omite esa fase; ante ciertos errores termina con éxito y mantiene el fallback, de modo que un build exitoso no prueba el servicio Gemini. CI la fija vacía. Para validación local sin transmisión, mantenerla ausente o vacía en el entorno autorizado y no activar otras credenciales reales.

El formulario GEO usa Resend cuando está configurado. No probarlo con un envío real durante la validación sintética. El código de generación de voz/video puede llamar a ElevenLabs, ejecutar Remotion y escribir medios; queda fuera del arranque básico y requiere autorización específica.

## Informes del inventario y auditoría

- `MIGRACION-INVENTARIO-GIT.md`: ramas, upstream, worktrees y estado original.
- `MIGRACION-SEGURIDAD.md`: historial revisado, saneamiento y límites.
- `MIGRACION-INVENTARIO-LOCAL.md`: variantes fuera de Git y dependencias que siguen en la PC original.

## Integridad y recuperación

`MANIFIESTO-MIGRACION.sha256` debe contener líneas `<sha256>  <ruta/relativa>`, calculadas sobre los bytes exactos de los archivos de la copia; textos nuevos con finales LF. Excluye el propio manifiesto y metadatos Git. El resumen posterior aporta el SHA final del commit; no se incluye el hash del manifiesto dentro de sí mismo ni se inventa el SHA final.

En la notebook: verificar primero el SHA de la rama contra el resumen, revisar estos documentos y el manifiesto, inspeccionar atributos/filtros/hooks antes del checkout y comprobar los hashes de los archivos. Usar `core.autocrlf=false` para conservar los bytes LF al comprobar. Las instrucciones detalladas están en `PROMPT-RECEPTOR.md`.

La publicación sólo se considerará **VERIFICADA** después de comprobar las dos referencias remotas exactas y recuperar un clon nuevo desde GitHub, sin ejecutar el proyecto. Comprobar también los manifiestos y la ausencia de builds/deploys asociados a sus SHA en las integraciones observadas. El informe externo registra el resultado real; este commit no lo anticipa. La continuación en notebook sigue **NOT VERIFIED** hasta validar allí el flujo. No declarar READY a partir de documentación o comprobaciones históricas.

## Validación pendiente en notebook

- [ ] Publicación autorizada y verificada; SHA recibido coincide con el resumen final.
- [ ] Manifiesto completo y correcto; exclusiones, historial y dependencias pendientes revisados.
- [ ] Instalación y ejecución autorizadas por el usuario en la notebook, con Node 24 y gestores previstos.
- [ ] Valores recuperados por canal seguro; datos sintéticos y servicios de prueba preparados sin tocar producción.
- [ ] Build y verificaciones aplicables ejecutadas y sus límites anotados; embeddings externos desactivados para esta prueba.
- [ ] Landing GEO en `/` abre con assets y tipografías locales; CTA llega a `#analisis`; diseño y escena funcionan en escritorio/móvil y con movimiento reducido.
- [ ] Redirecciones previstas (`/direccion`, `/es`, `/en`, `/pt`) y navegación pública comprobadas.
- [ ] Formulario probado con dominio/correo sintéticos y transporte capturado o simulado **sin enviar a Resend, Zoho, WhatsApp ni otro destino externo**; validación, error y conservación de datos revisados. No introducir un mock nuevo en producción como atajo.
- [ ] Administración sólo revisada si se autoriza: credenciales de prueba y Firestore de pruebas; ninguna escritura productiva.
- [ ] Mismo flujo repetido con la PC original apagada o desconectada, manteniendo internet sólo para servicios remotos autorizados.

## Trabajo posterior e integración

Para trabajo nuevo, crear una rama de continuación/feature basada en la rama de migración recibida, después de la revisión inicial y con la autorización aplicable. Una rama con otro nombre no queda cubierta por las dos exclusiones exactas de Vercel. Los futuros commits y pushes requieren revisar nuevamente sus automatizaciones y conservar la prohibición de desplegar salvo autorización posterior expresa.

El login no conecta una rama a `main`. El historial y el ancestro común determinan su relación; un fetch trae referencias sin mezclar archivos. Un merge sí puede modificar el árbol y producir conflictos.

Verificar de nuevo la rama predeterminada, traerla explícitamente si se clonó una sola rama, inspeccionar `merge-base`, log y diff. Cualquier PR requiere **autorización separada** y, salvo indicación distinta, se crea como **borrador** con base en la rama predeterminada y compare en la migración o continuación elegida. Revisar checks, conflictos y efectos de despliegue antes de integrar. No hacer push directo a `main`, force-push, auto-merge, merge o deploy como parte de esta recuperación. Conservar el original como respaldo.
