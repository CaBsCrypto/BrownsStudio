# Prompt para continuar Browns Studio en la notebook

Actúa únicamente sobre Browns Studio y sus dependencias identificadas. Antes de ejecutar código, lee este documento y `README-MIGRACION.md`, verifica la rama recibida, el SHA del resumen y `MANIFIESTO-MIGRACION.sha256`. Lee también `CLAUDE.md` y los `AGENTS.md` aplicables, atendiendo a sus límites y a las instrucciones expresas del usuario.

**Estado al preparar este documento: publicación NO REALIZADA; continuación BLOCKED.** Las ramas descritas todavía no están publicadas. Los comandos de clonación fallarán mientras no exista un resumen posterior que confirme la publicación y sus SHA. No asumas un push completado, una aplicación probada ni ausencia garantizada de secretos. No se ha ejecutado instalación, app, build, prueba o script del proyecto durante la preparación.

## Destino y procedencia exactos

- Repositorio autorizado, público y verificado: `https://github.com/CaBsCrypto/BrownsStudio.git`.
- Principal: `migracion/browns-studio-20261021-8f42`, desde `codex/inicio-protagonista`, `e7c91030cdf68ee9d2628092f7e2b98bd0baa096`, worktree original `publicacion-main`.
- Secundaria prevista **sólo local y bloqueada para publicación pública**: `migracion/browns-integracion-20261021-8f42`, desde `codex/preparar-landing-geo`, `c5b62c9944bf3da4cce0c33d9d399d34fe23d48a`, worktree original `integracion-main`.
- Rama predeterminada observada el 2026-10-21: `main`, `7b34892d3ae40595627a59fd19eb3ceece34f73d`; debes consultarla otra vez.

El usuario eligió `publicacion-main` como base. No mezcles la secundaria en la principal. Había cuatro commits inéditos y seis modificaciones de archivos en la principal, y tres commits inéditos en integración. No había stashes. Lee `MIGRACION-SEGURIDAD.md`, `MIGRACION-INVENTARIO-LOCAL.md` y el informe final para conocer contenido trasladado, historial, exclusiones y dependencias. Los originales se conservan intactos en la PC de origen.

La revisión principal cubrió cuatro commits y 28 blobs nuevos, más las seis modificaciones, sin detectar secretos o datos personales nuevos. La secundaria contiene tres commits y 82 blobs nuevos, con 17 PNG y documentos QA que incluyen identidad/correo del propietario y referencias administrativas. No publiques esa secundaria sin una decisión específica: borrar archivos del tip no sanea su historia saliente. Resolver la autorización de previews de Vercel no autoriza esos datos privados.

En la copia principal se sustituyen campos ambiguos de `video-generator/reel-leads.json` por marcadores sintéticos conservando el esquema, y se excluyen ocho MP4 regenerables de `video-generator/output` y el archivo temporal `video-generator/temp-props-abogados-pro.json`. Se conservan los guiones demo de `video-generator/leads.json`. El historial ya publicado en origin no se reescribió y puede seguir conteniendo los originales heredados. No presentes esos saneamientos del árbol como purga histórica ni como garantía absoluta de ausencia de secretos.

No se detectaron LFS, submódulos o symlinks en los siete commits salientes y la conectividad de sus objetos se comprobó. La configuración `.mcp.json` declaraba `npx @remotion/mcp@latest`, sin secretos detectados: no se activó. Revisa y autoriza ese mecanismo antes de permitir que descargue o ejecute una versión no fijada.

Las seis modificaciones seleccionadas se preservaron en el commit local intermedio `cde2018`; los finales LF se normalizaron sólo en la copia. No uses ese identificador abreviado como SHA final esperado. Las carpetas hermanas y variantes fuera de estos árboles Git siguen en la PC original: un inventario limitado registró 203 archivos, con dependencia del piloto hacia `../landing-geo` y un monitor ligado a esa PC. No se trasladaron ni reprogramaron automáticamente; el informe final debe delimitar qué sigue pendiente. No presupongas que una clonación recupera esos componentes externos.

No cambies de cuenta, propietario, origin o repositorio por conveniencia. No crees repositorios, permisos o credenciales persistentes. Usa el flujo seguro del proveedor si hace falta autenticar; nunca pidas tokens o valores de secretos por chat.

## 1. Verifica que la publicación ya existe

Solicita o consulta el resumen final de la preparación. Debe indicar **VERIFICADA**, URL y SHA final exacto para cada rama publicada. Si dice NO REALIZADA/FALLÓ, o el SHA no está comprobado, detente antes de clonar como si fuera una entrega completa. Puedes continuar sólo con revisión documental y dependencias que no ejecuten el proyecto.

El bloqueo conocido es Vercel: hay evidencia de deployments históricos de preview y producción, y no se pudo confirmar una excepción para las ramas de migración. La CLI existente pudo consultar el proyecto enlazado y confirmó GitHub `CaBsCrypto/BrownsStudio`, producción desde `main`, Node 24.x y raíz del repositorio, sin crear permisos. `gitDeploymentEnabled` ausente/nulo no acredita previews desactivados; no apareció una orden para ignorar build ni deploy hooks. Un nuevo push puede desplegar preview, consumir servicio o transmitir contenido. La autorización original de migrar no autoriza un deploy. No cambies CI/hosting/permisos para eludirlo ni repitas pushes inciertos sin comprobar primero el estado remoto.

Consulta de lectura de la rama principal, una vez exista publicación:

```powershell
git ls-remote --exit-code --heads https://github.com/CaBsCrypto/BrownsStudio.git refs/heads/migracion/browns-studio-20261021-8f42
```

Compara el SHA completo con el resumen. No sustituyas ese SHA por el commit de origen: la migración puede incluir commits posteriores de selección segura y documentación.

## 2. Clona en una carpeta nueva sin ejecutar el proyecto

No sobrescribas un clon o carpeta existente. En un clon existente, inventaría primero rama, árbol, índice, untracked, ignores y stashes; si hay trabajo local, preserva su estado y pide la decisión necesaria antes de cambiar archivos.

Antes de checkout, inspecciona la configuración local de Git, plantillas, hooks, filtros y atributos aplicables. No ejecutes hooks/filtros desconocidos ni eludas políticas obligatorias; informa un bloqueo si corresponde. No pegues configuración sensible en el chat.

Ejemplo para PowerShell, sólo cuando se confirme que la rama ya está publicada:

```powershell
$destinoBrowns = Join-Path $env:USERPROFILE 'Documents\BrownsStudio-notebook-20261021'
if (Test-Path -LiteralPath $destinoBrowns) { throw 'Elige una carpeta nueva: el destino ya existe.' }
git -c core.autocrlf=false clone --no-checkout --branch migracion/browns-studio-20261021-8f42 --single-branch https://github.com/CaBsCrypto/BrownsStudio.git $destinoBrowns
Set-Location -LiteralPath $destinoBrowns
git remote get-url origin
git branch --show-current
git rev-parse HEAD
git show HEAD:README-MIGRACION.md
git show HEAD:PROMPT-RECEPTOR.md
git show HEAD:MANIFIESTO-MIGRACION.sha256
git ls-tree -r --name-only HEAD
```

`--no-checkout` permite revisar primero el commit y los documentos; no instala dependencias. Revisa los `.gitattributes` que figuren en el árbol y los filtros locales que puedan aplicarse. Conserva los bytes LF: `core.autocrlf=false` se usa para que la comparación del manifiesto no se altere por conversión automática. Tras verificar SHA, documentos y mecanismos de checkout, y sólo si no hay políticas o efectos pendientes:

```powershell
git config --local core.autocrlf false
git checkout migracion/browns-studio-20261021-8f42
git status --short --branch
```

**El clon es de una sola rama.** No presupongas que ya trae `main` o la secundaria; su recuperación explícita se explica más adelante. Si existen LFS/submódulos u objetos faltantes, no instales ni recuperes recursos automáticamente sin revisar acceso, costos y autorización. No reemplaces assets por punteros rotos ni declares la migración completa con objetos ausentes.

## 3. Verifica los bytes trasladados

El manifiesto usa una línea por archivo: `<SHA-256>  <ruta/relativa/con/slashes>`. Excluye su propio archivo y metadatos `.git`. No contiene valores de secretos. Los hashes corresponden a los bytes exactos de la copia (sin conversión automática de finales de línea). Verifica que incluye los archivos previstos, además de comprobar las entradas listadas; una suma correcta no demuestra por sí sola que no haya archivos adicionales o dependencias omitidas.

Puedes hacer esta comprobación de lectura desde la raíz del clon, después de revisar el bloque:

```powershell
$raizBrowns = (Get-Location).Path.TrimEnd([IO.Path]::DirectorySeparatorChar)
$prefijoBrowns = $raizBrowns + [IO.Path]::DirectorySeparatorChar
$entradasBrowns = Get-Content -LiteralPath '.\MANIFIESTO-MIGRACION.sha256'
$vistosBrowns = @{}
$cantidadBrowns = 0
foreach ($entradaBrowns in $entradasBrowns) {
    if ([string]::IsNullOrWhiteSpace($entradaBrowns)) { continue }
    if ($entradaBrowns -notmatch '^([A-Fa-f0-9]{64})  (.+)$') { throw 'Formato de manifiesto inesperado.' }
    $esperadoBrowns = $Matches[1]
    $relativoBrowns = $Matches[2]
    if ([IO.Path]::IsPathRooted($relativoBrowns) -or $relativoBrowns -match '(^|[\\/])\.\.([\\/]|$)' -or $relativoBrowns -match '(^|[\\/])\.git([\\/]|$)' -or $relativoBrowns -eq 'MANIFIESTO-MIGRACION.sha256') {
        throw 'Ruta no permitida en el manifiesto.'
    }
    if ($vistosBrowns.ContainsKey($relativoBrowns)) { throw 'Ruta repetida en el manifiesto.' }
    $vistosBrowns[$relativoBrowns] = $true
    $archivoBrowns = [IO.Path]::GetFullPath((Join-Path $raizBrowns $relativoBrowns))
    if (-not $archivoBrowns.StartsWith($prefijoBrowns, [StringComparison]::OrdinalIgnoreCase)) { throw 'Ruta fuera del clon.' }
    if (-not (Test-Path -LiteralPath $archivoBrowns -PathType Leaf)) { throw 'Falta un archivo del manifiesto.' }
    if ((Get-Item -LiteralPath $archivoBrowns).Attributes -band [IO.FileAttributes]::ReparsePoint) { throw 'Revisar enlace antes de seguir.' }
    $obtenidoBrowns = (Get-FileHash -LiteralPath $archivoBrowns -Algorithm SHA256).Hash
    if ($obtenidoBrowns -ne $esperadoBrowns) { throw ('SHA-256 distinto: ' + $relativoBrowns) }
    $cantidadBrowns++
}
if ($cantidadBrowns -eq 0) { throw 'El manifiesto no contiene entradas.' }
Write-Output ('Archivos verificados: ' + $cantidadBrowns)
git status --short
```

No normalices o edites archivos para forzar que coincidan. Si el resumen, los hashes, la integridad del árbol o el conjunto de archivos no coinciden, informa exactamente el tipo de diferencia sin mostrar secretos y conserva el clon para diagnóstico. El propio manifiesto se revisa junto con el SHA del commit recibido; no se intenta incluir su hash dentro de él.

## 4. Prepara herramientas, secretos y servicios de prueba

La instalación de herramientas y dependencias, la configuración de credenciales y cualquier ejecución requieren la autorización aplicable en la notebook. El alcance de la preparación previa no autoriza automáticamente estas acciones. Primero presenta al usuario los pasos y efectos concretos que falten, sin ejecutar código para averiguar si funciona.

Usa **Node 24.x** y **pnpm 10.28.0** para la raíz. CI fija esas versiones; el README antiguo que menciona Node 18+ no es la referencia de reproducción. No actualices lockfiles. La raíz usa `pnpm-lock.yaml` y su workspace incluye `video-generator`; `landing-geo` tiene `package-lock.json` propio y no forma parte de ese workspace. FFmpeg y recursos de Remotion sólo son necesarios para validar el flujo multimedia autorizado; no asumir que estén instalados.

Lee la plantilla final de entorno. Configura valores locales por canal seguro autorizado; nunca desde GitHub o el chat. No publiques `.env.local`, llaves, tokens, sesiones, service accounts, datos reales de clientes ni logs sensibles. Nombres de dependencias observadas: Admin (`ADMIN_PASSWORD`, `ADMIN_SECRET`), Firebase (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`), Gemini (`GEMINI_API_KEY`, `GEMINI_MODEL`), WhatsApp/Kapso, ElevenLabs, Google Sheets y correo GEO (`RESEND_API_KEY`, `GEO_MAIL_FROM`, `GEO_MAIL_TO`). El detalle está en README-MIGRACION.

No asumas que GitHub/Vercel conserva todos los valores locales. No uses prefijo `NEXT_PUBLIC_` para secretos. Si se requiere transmitir una credencial, solicita aprobación explícita del dato, destino y método seguro; no incluyas su valor en informes.

Firestore es remoto y el cliente usa la base nombrada `browns-studio`. No exportes datos ni ejecutes migraciones, resets o escrituras en producción. Para pruebas de administración o bots usa un servicio de pruebas y datos sintéticos autorizados. No regeneres claves, incluidas posibles claves de cifrado no recuperadas, para forzar el arranque. No se identificó una clave propia de cifrado ligada al equipo en la revisión de fuentes, pero su recuperación y la de otros recursos privados no se da por garantizada.

## 5. Ejecuta sólo la validación autorizada

Una vez exista autorización, los comandos previstos desde la **raíz del clon** son:

```powershell
pnpm install --frozen-lockfile
pnpm run lint
pnpm run test:integration
pnpm run build
pnpm run typecheck
pnpm run dev
```

Revisa antes las fuentes de instalación y pruebas. Instalar descarga paquetes y puede ejecutar compilaciones de dependencias permitidas por el workspace. `dev` inicia Next en puerto 3000 y mantiene el proceso abierto. Detén el proceso cuando termine la revisión. `pnpm run start` sirve un build previo, no reemplaza el build.

**Efecto del build:** el script raíz ejecuta `scripts/generate-embeddings.js` antes de Next. Si `GEMINI_API_KEY` está en el entorno del proceso, puede enviar Markdown completo de `knowledge_base` a Gemini, consumir servicio y escribir un cache con texto y rutas absolutas. El script no carga `.env.local` por sí mismo. Sin esa variable omite la fase, y algunos errores no hacen fallar el build. Para esta validación sintética mantén la clave ausente o vacía en el entorno del proceso; no actives credenciales reales. Un build exitoso con fallback no demuestra que Gemini funcione.

La app independiente, sólo si hace falta validarla y se autoriza, usa este directorio y sus comandos propios:

```powershell
Set-Location -LiteralPath '.\landing-geo'
npm ci
npm run lint
npm run test:geo
npm run test:form
npm run test:scene
npm run build
npm run typecheck
npm run dev
```

Se abre en `http://127.0.0.1:5175/`. `npm start` reutiliza 5175 para un build previo y `npm run audit:serve` usa 4175. No iniciar dos servidores sobre el mismo puerto. Vuelve a la raíz antes de usar comandos raíz.

No ejecutes generación de voz/video sin autorización específica: puede contactar ElevenLabs, lanzar Remotion y escribir medios. No pruebes correo, WhatsApp, Calendly u otros proveedores reales como parte de una comprobación local silenciosa.

Checklist del flujo significativo:

- [ ] La landing GEO abre en `/`, muestra assets y tipografías locales, y los CTA llegan a `#analisis`.
- [ ] Se revisan escritorio/móvil, navegación, estados de la escena, teclado y movimiento reducido.
- [ ] Se comprueban las redirecciones previstas de `/direccion`, `/es`, `/en` y `/pt` y las rutas públicas pertinentes.
- [ ] El formulario usa datos sintéticos (por ejemplo dominio `example.com` y correo `prueba@example.com`) con transporte simulado/capturado, sin contacto con Resend, Zoho, WhatsApp ni otro destino externo. Usar pruebas versionadas con transporte simulado o captura local del request; no activar un envío real ni modificar producción para añadir un mock.
- [ ] Se verifica validación, error y conservación de datos del formulario. Una captura local o un 503 sin configuración no demuestra entrega de correo y debe informarse con ese límite.
- [ ] Admin sólo se prueba con autorización expresa, credenciales de prueba y Firestore de pruebas; no escribir en producción.
- [ ] Se repite el flujo con la PC original apagada o desconectada. Mantener internet sólo si se necesitan servicios remotos autorizados. Si aparece una dependencia de esa PC, registrarla y resolverla antes de declarar continuidad.

No declares READY sólo por instalar, compilar o abrir la página. Explica qué flujos se probaron y cuáles siguen sin verificar. Un deployment preview requiere autorización separada y no reemplaza la validación local.

## 6. Trae referencias sin mezclar árboles

`--single-branch` limita el clon inicial. **La secundaria continúa bloqueada por contenido privado en historia y se preserva sólo localmente.** El comando siguiente es una referencia futura, no una instrucción de publicarla o traerla ahora. Sólo después de una decisión específica que resuelva ese bloqueo, autorización de efectos de hosting y una publicación verificada con SHA, puedes traer la referencia aprobada para inspección sin cambiar el árbol actual. Si la alternativa saneada recibe otro nombre, sustituye el comando por esa referencia exacta comprobada:

```powershell
git fetch origin refs/heads/migracion/browns-integracion-20261021-8f42:refs/remotes/origin/migracion/browns-integracion-20261021-8f42
git rev-parse refs/remotes/origin/migracion/browns-integracion-20261021-8f42
```

Si no fue publicada o continúa sólo propuesta, no inventes que ese comando pudo recuperarla. No hagas merge de esa rama por el solo hecho de traerla.

Consulta primero la rama predeterminada real:

```powershell
git ls-remote --symref origin HEAD
```

Si sigue siendo `main`, tráela explícitamente y compara desde la rama de migración principal:

```powershell
git fetch origin refs/heads/main:refs/remotes/origin/main
git merge-base HEAD refs/remotes/origin/main
git log --oneline --left-right refs/remotes/origin/main...HEAD
git diff --stat refs/remotes/origin/main...HEAD
git diff --name-status refs/remotes/origin/main...HEAD
```

Si la predeterminada cambió, usa su nombre comprobado en lugar de `main`, sin renombrarla. Si no hay ancestro común, detente y explica la relación; no fuerces historias no relacionadas. Fetch trae referencias, no mezcla archivos. Login no conecta ramas ni integra cambios. Un merge modifica archivos y puede causar conflictos.

## 7. Continúa en una rama nueva y revisa antes de integrar

Después de validar la recepción y cuando el usuario autorice trabajo nuevo, crea una rama de continuación basada en la migración recibida. Comprueba que el nombre no exista; por ejemplo:

```powershell
git switch -c feature/browns-continuacion-notebook
```

Mantén trazabilidad entre origen, migración y trabajo posterior. Selecciona archivos explícitamente al preparar commits, sin `git add .` o `git add -A` indiscriminado. Revisa secretos y todos los commits salientes antes de cualquier push. No hagas force-push, reset/clean destructivos ni borres ramas/stashes; conserva los originales.

Todo nuevo push necesita la autorización aplicable y una revisión de automatizaciones. **Cualquier PR necesita autorización separada**. Si el usuario lo autoriza sin otra indicación, créalo como **borrador**, con base en la rama predeterminada comprobada y compare en la migración o la continuación elegida. Revisa diff, historial, checks, conflictos y posibles despliegues. Crear un PR puede activar Actions y otras integraciones.

No crees el PR automáticamente, no hagas push directo a `main`, auto-merge, merge o deploy. Llevar cambios a la principal se realiza más adelante mediante revisión y una decisión expresa de integración, manteniendo el respaldo original.

## 8. Informa el resultado sin inventar validaciones

Entrega SHA recibido y comparación con el resumen, resultado del manifiesto, herramientas/instalación y comprobaciones efectivamente ejecutadas, límites y dependencias aún pendientes. Separa publicación (**VERIFICADA / FALLÓ / NO REALIZADA**) de continuación (**READY / BLOCKED / NOT VERIFIED**). No declares una prueba histórica como nueva, ni una revisión parcial como garantía absoluta de ausencia de secretos. Si no se ejecutó el flujo completo con la PC original apagada, la portabilidad sigue sin verificar.

Reporta cualquier efecto automático observado. Finaliza con el paso concreto que falta, conservando `main`, producción y los originales sin modificaciones no autorizadas.
