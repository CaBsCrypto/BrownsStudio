import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const require = createRequire(import.meta.url);

// Render the real component on the server; only its CSS import is replaced.
async function loadTypeScript(relativePath, imports = {}) {
  const path = new URL(relativePath, import.meta.url);
  const source = await readFile(path, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  const exports = {};
  runInNewContext(compiled, {
    exports,
    require: name => Object.hasOwn(imports, name) ? imports[name] : require(name),
  }, { filename: path.pathname });
  return exports;
}

const information = JSON.parse(await readFile(new URL('../src/content/browns-public.json', import.meta.url), 'utf8'));
const direction = await loadTypeScript('../src/content/direction.ts', { './browns-public.json': information });
const validation = await loadTypeScript('../src/lib/analysis-validation.ts');
const responseReader = await loadTypeScript('../src/lib/analysis-response.ts');
const { readAnalysisResponse } = responseReader;
const { default: AnalysisForm } = await loadTypeScript('../src/components/AnalysisForm.tsx', {
  '@geo/content/direction': direction,
  '@geo/lib/analysis-validation': validation,
  '@geo/lib/analysis-response': responseReader,
  './AnalysisForm.module.css': {},
});

test('server-rendered form cannot expose contact fields through a native GET', () => {
  const html = renderToStaticMarkup(createElement(AnalysisForm));
  const form = html.match(/<form\b[^>]*>/)?.[0];
  const submit = html.match(/<button\b[^>]*type="submit"[^>]*>/)?.[0];
  assert.ok(form);
  assert.match(form, /method="post"/);
  assert.match(form, /action="\/api\/solicitudes-geo"/);
  assert.ok(submit);
  assert.match(submit, /\sdisabled(?:="")?(?:\s|>)/);
});

test('before hydration, fields remain usable and no-JavaScript contact guidance is present', () => {
  const html = renderToStaticMarkup(createElement(AnalysisForm));
  for (const name of ['website', 'email']) {
    const field = html.match(new RegExp(`<input\\b[^>]*name="${name}"[^>]*>`))?.[0];
    assert.ok(field);
    assert.doesNotMatch(field, /\sdisabled(?:=|\s|>)/);
  }
  assert.match(html, /<noscript>.*Activa JavaScript.*contacto@browns\.studio.*<\/noscript>/);
});

for (const body of ['<html>private firewall detail</html>', '']) test(`platform 429 with ${body ? 'HTML' : 'empty body'} shows a controlled wait message`, async () => {
  const result = await readAnalysisResponse(new Response(body, { status: 429 }));
  assert.equal(result.accepted, false);
  assert.match(result.message, /Espera unos minutos/);
  assert.doesNotMatch(result.message, /private|JSON|Unexpected/);
});

test('an HTML server failure does not show a parser or upstream error', async () => {
  const result = await readAnalysisResponse(new Response('<html>private gateway detail</html>', { status: 502 }));
  assert.equal(result.accepted, false);
  assert.match(result.message, /Los campos siguen completos/);
  assert.doesNotMatch(result.message, /private|JSON|Unexpected/);
});

test('server field errors remain available to the form', async () => {
  const result = await readAnalysisResponse(Response.json({ errors: { website: 'URL inválida', email: 12, extra: 'unused' } }, { status: 400 }));
  assert.equal(result.accepted, false);
  assert.equal(result.errors.website, 'URL inválida');
  assert.deepEqual(Object.keys(result.errors), ['website']);
});

test('only a successful JSON response with explicit acceptance confirms submission', async () => {
  assert.equal((await readAnalysisResponse(Response.json({ accepted: true }))).accepted, true);
  for (const body of [null, [], {}, { accepted: 'true' }]) {
    assert.equal((await readAnalysisResponse(Response.json(body))).accepted, false);
  }
  assert.equal((await readAnalysisResponse(Response.json({ accepted: true }, { status: 503 }))).accepted, false);
});
