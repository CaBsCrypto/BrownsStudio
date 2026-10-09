import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { createElement, Fragment } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const require = createRequire(import.meta.url);
const { NextRequest } = require('next/server');
const routeTesting = require('next/experimental/testing/server');
const doesAdminMatcherMatch = routeTesting.unstable_doesProxyMatch ?? routeTesting.unstable_doesMiddlewareMatch;
const { tryToParsePath } = require('next/dist/lib/try-to-parse-path');
const { prepareDestination } = require('next/dist/shared/lib/router/utils/prepare-destination');

async function load(relativePath, env = {}, imports = {}) {
  const path = new URL(relativePath, import.meta.url);
  const source = await readFile(path, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports = {};
  // Authentication tests use isolated, synthetic values; no real secrets are read.
  runInNewContext(compiled, {
    exports,
    process: { env },
    URL,
    require: name => Object.hasOwn(imports, name) ? imports[name] : require(name),
  }, { filename: path.pathname });
  return exports;
}

const { default: nextConfig } = await load('../next.config.ts');
const { middleware, config } = await load('../middleware.ts', { ADMIN_SECRET: 'test-only-admin-secret' });
const redirects = await nextConfig.redirects();
const redirectFor = pathname => redirects.find(rule => {
  const parsed = tryToParsePath(rule.source);
  assert.equal(parsed.error, undefined);
  return new RegExp(parsed.regexStr).test(pathname);
});
const request = (pathname, token) => new NextRequest(`https://routing.example${pathname}`, {
  headers: token ? { cookie: `admin_token=${token}` } : undefined,
});

test('landing aliases redirect temporarily without replacing a section fragment', () => {
  for (const pathname of ['/es', '/en', '/pt', '/direccion']) {
    const rule = redirectFor(pathname);
    assert.ok(rule, pathname);
    assert.equal(rule.destination, '/');
    assert.equal(rule.permanent, false);
    const prepared = prepareDestination({ destination: rule.destination, params: {}, query: { utm_source: 'pilot' }, appendParamsToQuery: false });
    assert.equal(prepared.parsedDestination.query.utm_source, 'pilot');
    assert.ok(!prepared.parsedDestination.hash);
  }
});

test('retired marketing pages use the new services section without a redirect loop', () => {
  for (const pathname of ['/portafolio', '/demo', '/formacion', '/soluciones/dentistas', '/casos-de-estudio/example', '/proyecto/example', '/es/portafolio', '/en/formacion', '/pt/demo', '/es/soluciones/dentistas', '/en/casos-de-estudio/example', '/pt/proyecto/example']) {
    const rule = redirectFor(pathname);
    assert.ok(rule, pathname);
    assert.equal(rule.destination, '/#servicios');
    assert.equal(rule.permanent, false);
  }
  assert.equal(redirectFor('/'), undefined);
});

test('marketing redirects and admin matcher leave API, webhook, resources and public assets intact', () => {
  for (const pathname of ['/', '/api/solicitudes-geo', '/api/whatsapp/webhook', '/api/calendly/webhook', '/api/demo/chat', '/informacion/browns.md', '/informacion/browns.json', '/_next/static/example.js', '/icon.png', '/admin/login', '/admin/businesses', '/api/admin/auth', '/api/admin/businesses']) {
    assert.equal(redirectFor(pathname), undefined, pathname);
    const matches = doesAdminMatcherMatch({ config, nextConfig, url: pathname });
    assert.equal(matches, pathname.startsWith('/admin') || pathname.startsWith('/api/admin'), pathname);
  }
});

test('production can be indexed while administration and non-production deployments cannot', async () => {
  for (const deployment of ['production', 'preview', 'development', undefined]) {
    const { default: configuration } = await load('../next.config.ts', { VERCEL_ENV: deployment });
    assert.equal(configuration.poweredByHeader, false);
    const rules = await configuration.headers();
    const headersFor = pathname => rules.filter(rule => new RegExp(tryToParsePath(rule.source).regexStr).test(pathname)).flatMap(rule => rule.headers);
    const robotsFor = pathname => headersFor(pathname).find(header => header.key.toLowerCase() === 'x-robots-tag')?.value;
    assert.equal(robotsFor('/admin'), 'noindex, nofollow', deployment);
    assert.equal(robotsFor('/admin/businesses'), 'noindex, nofollow', deployment);
    for (const pathname of ['/', '/api/solicitudes-geo', '/api/whatsapp/webhook', '/informacion/browns.json']) {
      assert.equal(robotsFor(pathname), deployment === 'production' ? undefined : 'noindex, nofollow', `${deployment}: ${pathname}`);
    }
    const links = headersFor('/').find(header => header.key.toLowerCase() === 'link')?.value;
    assert.ok(links?.includes('</informacion/browns.md>; rel="alternate"; type="text/markdown"'));
    assert.ok(links?.includes('</informacion/browns.json>; rel="describedby"; type="application/json"'));
    assert.ok(headersFor('/api/whatsapp/webhook').every(header => header.key.toLowerCase() === 'x-robots-tag'));
  }
});

test('root remains public regardless of language preferences', () => {
  for (const language of ['es-CL', 'en-US', 'pt-BR']) {
    const response = middleware(new NextRequest('https://routing.example/', { headers: { 'accept-language': language } }));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('location'), null);
  }
});

test('administration keeps existing authentication and login exceptions', async () => {
  for (const pathname of ['/admin', '/admin/businesses']) {
    for (const token of [undefined, 'invalid']) {
      const response = middleware(request(pathname, token));
      assert.equal(response.status, 307);
      assert.equal(response.headers.get('location'), 'https://routing.example/admin/login');
    }
    assert.equal(middleware(request(pathname, 'test-only-admin-secret')).status, 200);
  }
  for (const token of [undefined, 'invalid']) {
    const response = middleware(request('/api/admin/businesses', token));
    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), { error: 'Unauthorized' });
  }
  assert.equal(middleware(request('/api/admin/businesses', 'test-only-admin-secret')).status, 200);
  for (const pathname of ['/admin/login', '/admin/login/reset', '/api/admin/auth']) assert.equal(middleware(request(pathname)).status, 200);
  const missing = await load('../middleware.ts');
  assert.equal(missing.middleware(request('/api/admin/businesses', 'test-only-admin-secret')).status, 401);
});

test('retired locale layout uses the root document and retains language context', async () => {
  const { default: LocaleLayout, metadata } = await load('../app/[locale]/layout.tsx', {}, {
    '@/lib/i18n/LanguageContext': { LanguageProvider: ({ children }) => createElement(Fragment, null, children) },
  });
  const node = await LocaleLayout({ children: createElement('main', null, 'Legacy route'), params: Promise.resolve({ locale: 'es' }) });
  const html = renderToStaticMarkup(node);
  assert.equal(html, '<main>Legacy route</main>');
  assert.equal(metadata.robots.index, false);
  assert.equal(metadata.alternates.canonical, '/');
  await assert.rejects(LocaleLayout({ children: null, params: Promise.resolve({ locale: 'fr' }) }), /NEXT_HTTP_ERROR_FALLBACK;404/);
});
