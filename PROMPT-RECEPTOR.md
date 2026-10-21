# Prompt para recibir la integración saneada de Browns Studio en notebook

Actúa únicamente sobre Browns Studio y sus dependencias identificadas. Antes de ejecutar código, lee `README-MIGRACION.md`, `MIGRACION-TRAZABILIDAD.md`, este documento, `CLAUDE.md` y los `AGENTS.md` aplicables. Verifica la rama, el SHA del resumen externo y `MANIFIESTO-MIGRACION.sha256`.

**Publicación: AUTORIZADA; verificación pendiente. Continuación: NOT VERIFIED.** La autorización del 2026-10-21 permite agregar `vercel.json` en la raíz de ambas ramas, actualizar documentos/manifiestos, crear esos commits y publicar únicamente `migracion/browns-studio-20261021-8f42` y `migracion/browns-integracion-saneada-20261021-8f42` en el repositorio existente. No autoriza builds, despliegues, llamadas a Gemini, cambios en `main`, PR, merge ni cambios de configuración remota. El respaldo exacto permanece sólo local. No se ejecutaron instalación, app, build, pruebas o scripts del proyecto durante la preparación. Verifica la publicación mediante el informe externo; estas instrucciones no afirman que el push ya se haya completado y no autorizan ejecutar el proyecto.

## Procedencia y límites

- Repositorio público autorizado: `https://github.com/CaBsCrypto/BrownsStudio.git`.
- Rama exacta de **este paquete**: `migracion/browns-integracion-saneada-20261021-8f42`.
- Fuente de código de integración: `c5b62c9944bf3da4cce0c33d9d399d34fe23d48a`.
- Respaldo exacto preservado sólo localmente: `migracion/browns-integracion-20261021-8f42`, SHA `f3601ee117617042710212f825859eee1fc08410`. No publicarlo, etiquetarlo, traerlo para reconstruir historia ni incorporarlo por merge.
- Commit de snapshot saneado: `db943aa1954c3c5eb1cd92725b1a53b34ab7b180`, cuyo único padre es `3b377c899ef7191a5bd00e14e419fc6be8167385`, ancestro ya remoto. El tip de entrega incorpora después el commit de exclusión y documentación. Los commits privados de integración y el respaldo exacto no deben ser ancestros de esta rama.
- La principal elegida por el usuario queda aparte: `migracion/browns-studio-20261021-8f42`, punto revisado previo a la exclusión `a8411f0063bc4c036ca96796066e64093b65ff8b`; el tip final agrega su exclusión y documentación. Este paquete no contiene sus cuatro commits de publicación ni las seis modificaciones de trabajo de `publicacion-main`.
- `main` se observó en `7b34892d3ae40595627a59fd19eb3ceece34f73d` el 2026-10-21. Consultar su estado y la predeterminada de nuevo antes de cualquier integración.

La alternativa saneada conserva un snapshot del código de integración con exclusiones y cambios de documentación, entorno, demo y reproducibles registrados en `MIGRACION-TRAZABILIDAD.md`. No preserva equivalencia commit a commit, orden de historia o autoría de los tres commits privados. Se excluyen los 17 PNG nuevos de QA y se reemplazan dos documentos QA por resúmenes sanitizados; otros documentos operativos se sanean según la traza final. No presentar esos resúmenes como pruebas nuevas. El contenido heredado ya remoto no se purga ni reescribe.

Los siete documentos fuente con datos personales saneados son los dos QA, `README.md`, `landing-geo/README.md`, `operacion/lanzamiento.md`, `operacion/README.md` y `operacion/flujo-formulario.md`; los dos últimos sustituyen el nombre de un responsable por un rol genérico. Se neutralizan enlaces a los 17 PNG excluidos en otros documentos. La traza final registra rutas exactas y SHA-256 de salida. El código y las pruebas conservan los bytes de integración; se mantienen el correo de CTA comercial ya heredado de `origin` y un UUID de prueba claramente simulado.

Los inventarios y la revisión de seguridad previos documentan la inspección histórica de las ramas originales. La traza y el informe externo deben registrar las transformaciones y la validación de la salida saneada. No declarar saneamiento completo sin esa validación independiente.

Los originales y sus índices, la principal y el respaldo exacto permanecen conservados. Las siete carpetas sueltas y variantes no se incorporaron automáticamente; hay dependencias de un piloto hacia su `../landing-geo` hermano y un monitor ligado a la PC original. No suponer que clonar esta rama recupera ese conjunto externo, valores de entorno, recursos privados o datos de servicios.

No cambies cuenta, propietario u origin por conveniencia ni crees repositorios, credenciales o permisos persistentes. No pidas valores secretos por chat.

## 1. Verifica que la publicación esté autorizada y exista

El resumen externo debe indicar **publicación VERIFICADA**, la rama exacta y su SHA completo, más recuperación desde un clon nuevo. Si indica verificación pendiente, NO REALIZADA/FALLÓ o no hay SHA comprobado, detente antes de tratar GitHub como entrega disponible; sólo continúa revisión documental sin ejecutar el proyecto.

El `vercel.json` de la raíz incorpora `git.deploymentEnabled` con `false` para los dos nombres exactos:

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

La [configuración Git documentada por Vercel](https://vercel.com/docs/project-configuration/git-configuration#git.deploymentenabled) excluye los despliegues automáticos para esas ramas. La exclusión debe estar en sus tips desde el primer push; no se sustituye por un ignored build step ni por mensajes de commit. Su alcance es el despliegue automático de Git: Vercel puede recibir el evento y leer configuración. No bloquea una ejecución manual ni nombres de rama distintos. No renombrar la rama ni publicar una continuación asumiendo que heredará esta exclusión.

La publicación limitada está autorizada con esta exclusión. No cambiar configuración remota, CI, permisos ni crear PR. Sólo se leyó metadata de `GEMINI_API_KEY` para previews; el build raíz podría enviar `knowledge_base/*.md` a Gemini, por eso sigue prohibido ejecutar builds, despliegues o llamadas al proveedor. Revisa en el informe externo los controles posteriores a la publicación antes de considerar la entrega disponible.

Sólo tras publicación autorizada y confirmada, consulta de lectura:

```powershell
git ls-remote --exit-code --heads https://github.com/CaBsCrypto/BrownsStudio.git refs/heads/migracion/browns-integracion-saneada-20261021-8f42
```

Compara el SHA completo con el informe externo. No lo sustituyas por el SHA de fuente, del respaldo exacto, del padre o de la principal.

## 2. Clona la rama exacta sin ejecutar el proyecto

Usa una carpeta nueva; no sobrescribas un clon existente. Si ya existe un clon, inventaría antes rama, índice, árbol, untracked, ignorados y stashes, y conserva cualquier trabajo local. Revisa configuración Git, plantillas, hooks y filtros antes del checkout; no ejecutes mecanismos desconocidos ni eludas políticas obligatorias.

Ejemplo futuro para PowerShell, sólo después de verificar publicación:

```powershell
$destinoBrowns = Join-Path $env:USERPROFILE 'Documents\BrownsStudio-integracion-saneada-notebook-20261021'
if (Test-Path -LiteralPath $destinoBrowns) { throw 'Elige una carpeta nueva: el destino ya existe.' }
git -c core.autocrlf=false clone --no-checkout --branch migracion/browns-integracion-saneada-20261021-8f42 --single-branch https://github.com/CaBsCrypto/BrownsStudio.git $destinoBrowns
if ($LASTEXITCODE -ne 0) { throw 'La clonación no terminó correctamente.' }
Set-Location -LiteralPath $destinoBrowns
git remote get-url origin
git branch --show-current
git rev-parse HEAD
git show HEAD:README-MIGRACION.md
git show HEAD:MIGRACION-TRAZABILIDAD.md
git show HEAD:PROMPT-RECEPTOR.md
git show HEAD:MANIFIESTO-MIGRACION.sha256
git ls-tree -r --name-only HEAD
```

Compara `HEAD` con el SHA completo del informe externo y revisa los `.gitattributes` del árbol y filtros locales aplicables. `--no-checkout` permite esta revisión sin instalar dependencias. Sólo después de comprobar SHA, documentos y mecanismos de checkout:

```powershell
git config --local core.autocrlf false
git checkout migracion/browns-integracion-saneada-20261021-8f42
if ($LASTEXITCODE -ne 0) { throw 'El checkout no terminó correctamente.' }
git status --short --branch
```

`core.autocrlf=false` conserva los bytes LF para el manifiesto. El clon es de una sola rama y no trae automáticamente `main` ni otra migración. Si faltan objetos o aparecen LFS/submódulos, revisa acceso, contenido y autorización antes de recuperarlos; no declarar una entrega completa con recursos ausentes.

## 3. Comprueba manifiesto y árbol

El manifiesto contiene `<SHA-256>  <ruta/relativa>`, excluye su propio archivo y `.git`, y corresponde a bytes exactos de la copia. Verifica tanto hashes como cobertura del árbol comprometido. El hash del manifiesto queda protegido por el SHA del commit; no se incluye a sí mismo.

Desde la raíz del clon, tras revisar el bloque:

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
    if ([IO.Path]::IsPathRooted($relativoBrowns) -or $relativoBrowns -match '(^|[\\/])\.\.([\\/]|$)' -or $relativoBrowns -match '(^|[\\/])\.git([\\/]|$)' -or $relativoBrowns -eq 'MANIFIESTO-MIGRACION.sha256') { throw 'Ruta no permitida en el manifiesto.' }
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
$arbolBrowns = @(git -c core.quotePath=false ls-tree -r --name-only HEAD)
if ($LASTEXITCODE -ne 0) { throw 'No se pudo consultar el árbol comprometido.' }
$esperadasBrowns = @($arbolBrowns | Where-Object { $_ -ne 'MANIFIESTO-MIGRACION.sha256' })
if (Compare-Object -ReferenceObject $esperadasBrowns -DifferenceObject @($vistosBrowns.Keys)) { throw 'La cobertura del manifiesto difiere del árbol comprometido.' }
Write-Output ('Archivos verificados: ' + $cantidadBrowns)
git status --short --untracked-files=all
```

Revisar también cualquier archivo adicional local o cambio de estado. No normalices ni edites archivos para forzar coincidencias. Si SHA, hash, cobertura o estado difieren, conserva el clon y reporta el tipo de diferencia sin revelar secretos.

## 4. Prepara herramientas y servicios sólo con autorización

La autorización de preparar y publicar estas dos ramas no permite instalar ni ejecutar el proyecto en notebook. La prohibición vigente de builds, despliegues y llamadas a Gemini también rige en la recepción; cualquier cambio de ese alcance requiere autorización posterior explícita. Antes de hacerlo, presenta los pasos y sus efectos concretos. Usa Node 24.x y pnpm 10.28.0 para la raíz. No actualices lockfiles. El workspace raíz incluye `video-generator`; `landing-geo` tiene su propio `package-lock.json` y requiere instalación independiente. FFmpeg y Remotion se revisan sólo para el flujo multimedia autorizado.

Lee las plantillas finales de entorno y `README-MIGRACION.md`. Recupera valores por un canal seguro autorizado, fuera de GitHub y del chat. No publiques `.env.local`, tokens, llaves, sesiones, service accounts o datos reales. No coloques secretos en `NEXT_PUBLIC_*`. No asumas que una cuenta compartida recupera los valores de la PC anterior.

Firestore es remoto y usa la base nombrada `browns-studio`; no exportes, resetees, migres ni escribas producción. Usar servicios de prueba y datos sintéticos autorizados. No regeneres claves para forzar el arranque. La recuperación de recursos y dependencias privadas sigue pendiente hasta comprobarse.

## 5. Plan de validación futuro, sin autorización de ejecución actual

Los comandos siguientes son un plan documental para una autorización futura que detalle sus efectos. No ejecutarlos como parte de esta entrega. Los builds requieren que el usuario cambie expresamente su prohibición vigente, y cualquier llamada a Gemini o a otros proveedores requiere autorización específica. Si se autoriza ese alcance, desde la raíz:

```powershell
pnpm install --frozen-lockfile
pnpm run lint
pnpm run test:integration
pnpm run build
pnpm run typecheck
pnpm run dev
```

Revisa scripts de instalación y pruebas antes. La instalación descarga paquetes y puede compilar dependencias permitidas. `dev` abre Next en 3000 y queda ejecutándose; detenerlo al terminar. `start` sirve un build previo.

El build raíz ejecuta `scripts/generate-embeddings.js` antes de Next. Con `GEMINI_API_KEY` presente en el entorno del proceso puede enviar Markdown completo de `knowledge_base` a Gemini, consumir API y escribir un cache con texto y rutas absolutas. No carga `.env.local` por sí mismo; sin la variable omite esa fase y ciertos errores mantienen fallback sin hacer fallar el build. Para la validación sintética mantener la clave ausente o vacía en el proceso y no activar credenciales reales. Un build exitoso con fallback no prueba Gemini.

Si se autoriza validar la app independiente:

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

La app abre en `http://127.0.0.1:5175/`; `npm start` reutiliza 5175 para build previo y `npm run audit:serve` usa 4175. No compartir puerto entre procesos. Volver a la raíz antes de sus comandos. No ejecutar generación de voz/video sin autorización específica: puede contactar ElevenLabs, lanzar Remotion y escribir medios.

- [ ] Landing GEO en `/`, assets y tipografías locales, CTA a `#analisis`.
- [ ] Escritorio/móvil, navegación, estados de escena, teclado y movimiento reducido.
- [ ] Redirecciones previstas `/direccion`, `/es`, `/en` y `/pt`.
- [ ] Formulario con datos sintéticos y transporte simulado/capturado, sin contacto con Resend, Zoho, WhatsApp u otro destino externo. Revisar validación, error y conservación de datos. Una captura o un 503 sin configuración no prueba entrega.
- [ ] Administración sólo con autorización expresa, credenciales de prueba y Firestore de pruebas; sin producción.
- [ ] Mismo flujo con la PC original apagada o desconectada, con internet sólo para servicios autorizados. Registrar cualquier dependencia de esa PC antes de declarar continuidad.

No introducir un mock nuevo en producción como atajo. No declarar READY por instalar, compilar o abrir una página. Informar los flujos realmente verificados y sus límites.

## 6. Inspecciona la relación con la principal sin mezclar árboles

Consulta la predeterminada real:

```powershell
git ls-remote --symref origin HEAD
```

Si sigue siendo `main`, tráela explícitamente porque el clon es de una sola rama:

```powershell
git fetch origin refs/heads/main:refs/remotes/origin/main
git merge-base HEAD refs/remotes/origin/main
git log --oneline --left-right refs/remotes/origin/main...HEAD
git diff --stat refs/remotes/origin/main...HEAD
git diff --name-status refs/remotes/origin/main...HEAD
git diff --stat refs/remotes/origin/main HEAD
git diff --name-status refs/remotes/origin/main HEAD
```

Si cambió la predeterminada, usa su nombre comprobado, sin renombrarla. Si no hay ancestro común, detenerse y explicar la relación. El commit de snapshot tiene un padre remoto conocido y el tip de entrega desciende de él mediante el commit de exclusión; su diff puede diferir de una comparación sobre la historia exacta privada; no presentarlo como continuidad commit a commit. Fetch trae referencias sin mezclar archivos; login no conecta ramas ni integra cambios.

No traer, publicar, etiquetar ni mezclar la rama exacta privada o sus refs fuente. Si en el futuro se quiere comparar con la principal de migración, se requiere que esa rama también esté publicada con autorización y SHA comprobado; no asumir que existe en origin ni incorporarla automáticamente.

## 7. Trabaja en una rama nueva y revisa antes de integrar

Después de validar recepción y con autorización de trabajo nuevo, crear una rama de continuación cuyo nombre no exista, por ejemplo. Este nombre no está cubierto por las exclusiones exactas de `vercel.json`; no publicarlo sin una nueva revisión y autorización de sus automatizaciones:

```powershell
git switch -c feature/browns-integracion-saneada-notebook
```

Seleccionar archivos explícitamente al preparar commits y revisar secretos e historia saliente. No usar `git add .`/`-A` indiscriminadamente ni force-push, reset/clean destructivos o borrado de respaldos. Conservar fuentes y originales.

La autorización de esta entrega cubre exclusivamente publicar los commits revisados de las dos ramas de migración con su exclusión presente desde el primer push. No autoriza publicaciones posteriores, otros nombres de rama, PR, merge, builds, despliegues ni Gemini. Para cualquier continuación revisar de nuevo automatizaciones y solicitar la autorización aplicable. No crear PR automáticamente ni hacer push directo a `main`, force-push, auto-merge, merge o deploy.

## 8. Informa sin inventar validaciones

Reportar SHA recibido frente al resumen, rama exacta, resultado del manifiesto y cobertura, herramientas y comandos efectivamente ejecutados, flujos probados, límites y dependencias pendientes. Distinguir publicación **VERIFICADA / FALLÓ / NO REALIZADA** de continuación **READY / BLOCKED / NOT VERIFIED**.

No presentar revisión histórica como nueva, documentos sanitizados como evidencia de pruebas recientes o revisión parcial como garantía absoluta. Sin flujo verificado en notebook y con PC original apagada, la portabilidad sigue sin comprobarse. Registrar cualquier efecto automático observado y el paso concreto pendiente.
