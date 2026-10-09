import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

// Load the actual TS modules without creating compiled files or contacting Resend.
const compile = source => ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const moduleUrl = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const validationUrl = moduleUrl(compile(await readFile(new URL('../src/lib/analysis-validation.ts', import.meta.url), 'utf8')));
const handlerCode = compile(await readFile(new URL('../src/lib/geo-requests.ts', import.meta.url), 'utf8')).replace("'./analysis-validation'", JSON.stringify(validationUrl));
const { createGeoHandler } = await import(moduleUrl(handlerCode));
const valid = { website: 'https://empresa.cl/servicio', email: 'persona@example.com', company: '', requestId: '17a2da42-6458-4d42-8489-729ac49f1ce7' };
const config = () => ({ apiKey: 'test-only-key', from: 'Browns <test@example.com>', to: 'contacto@browns.studio' });
const request = (data = valid, headers = {}) => new Request('http://localhost:5175/api/solicitudes-geo', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:5175', ...headers }, body: JSON.stringify(data) });
const mustNotSend = async () => { assert.fail('Unexpected outbound email request'); };

test('accepts only a confirmed provider response; recipient and reply-to are correct', async () => {
  const handler = createGeoHandler({ config, send: async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    const body = JSON.parse(options.body);
    assert.deepEqual(body.to, ['contacto@browns.studio']);
    assert.equal(body.reply_to, valid.email);
    assert.equal(body.from, config().from);
    assert.match(body.text, /https:\/\/empresa.cl\/servicio/);
    assert.equal(options.headers['Idempotency-Key'], `geo-${valid.requestId}`);
    return Response.json({ id: 'test-email-id' });
  } });
  const response = await handler(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { accepted: true });
});

test('invalid URL and email produce field errors without sending', async () => {
  const handler = createGeoHandler({ config, send: mustNotSend });
  const response = await handler(request({ ...valid, website: 'javascript:alert(1)', email: 'not-an-email' }));
  assert.equal(response.status, 400);
  assert.deepEqual(Object.keys((await response.json()).errors).sort(), ['email', 'website']);
});

test('rejects URLs with embedded credentials', async () => {
  const handler = createGeoHandler({ config, send: mustNotSend });
  assert.equal((await handler(request({ ...valid, website: 'https://user:secret@example.com' }))).status, 400);
});

test('missing configuration never reports acceptance', async () => {
  const handler = createGeoHandler({ config: () => ({}), send: mustNotSend });
  const response = await handler(request());
  assert.equal(response.status, 503);
  assert.notEqual((await response.json()).accepted, true);
});

for (const [label, send] of [
  ['provider rejection', async () => Response.json({ message: 'private detail' }, { status: 403 })],
  ['malformed provider response', async () => Response.json({})],
  ['network failure', async () => { throw new Error('private network detail'); }],
  ['timeout', async () => { throw new DOMException('private timeout detail', 'TimeoutError'); }],
]) test(`${label} returns an error, without leaking provider data`, async () => {
  const handler = createGeoHandler({ config, send });
  const response = await handler(request());
  assert.equal(response.status, 502);
  assert.doesNotMatch(await response.text(), /private|accepted/);
});

test('rejects cross-origin, trap field, invalid request ID and missing fields', async () => {
  const handler = createGeoHandler({ config, send: mustNotSend });
  assert.equal((await handler(request(valid, { Origin: 'https://other.example' }))).status, 403);
  assert.equal((await handler(request({ ...valid, company: 'bot' }))).status, 400);
  assert.equal((await handler(request({ ...valid, requestId: 'bad' }))).status, 400);
  assert.equal((await handler(request({}))).status, 400);
});

test('rejects malformed JSON, wrong content type and large payloads', async () => {
  const handler = createGeoHandler({ config, send: mustNotSend });
  assert.equal((await handler(new Request('http://localhost:5175/api/solicitudes-geo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' }))).status, 400);
  assert.equal((await handler(request(valid, { 'Content-Type': 'text/plain' }))).status, 415);
  assert.equal((await handler(request({ ...valid, website: 'x'.repeat(5000) }))).status, 413);
});

test('retry preserves the provider idempotency key', async () => {
  const keys = [];
  const handler = createGeoHandler({ config, send: async (_url, options) => {
    keys.push(options.headers['Idempotency-Key']);
    return Response.json({ id: 'same-id' });
  } });
  await handler(request()); await handler(request());
  assert.equal(keys.length, 2);
  assert.equal(keys[0], keys[1]);
});

test('mailbox limits expire, and global limits bound arbitrary addresses', async () => {
  let time = 0;
  let sent = 0;
  const handler = createGeoHandler({ config, now: () => time, send: async () => { sent++; return Response.json({ id: 'id' }); } });
  for (let i = 0; i < 3; i++) assert.equal((await handler(request())).status, 200);
  assert.equal((await handler(request())).status, 429);
  assert.equal(sent, 3);
  time = 16 * 60000;
  assert.equal((await handler(request())).status, 200);
  for (let i = 0; i < 19; i++) assert.equal((await handler(request({ ...valid, email: `other${i}@example.com` }))).status, 200);
  assert.equal((await handler(request({ ...valid, email: 'last@example.com' }))).status, 429);
});
