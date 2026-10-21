import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../src/lib/agent-scene.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { initialScene, sceneReducer, scenePlayback } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const environment = (overrides = {}) => ({ type: 'environment', inView: true, visible: true, reduced: false, ...overrides });

test('the first render is static and a visible entry enables animation', () => {
  assert.deepEqual(scenePlayback(initialScene), { animated: false, playing: false });
  let state = sceneReducer(initialScene, environment({ inView: false }));
  assert.equal(state.initialized, true);
  assert.equal(state.entered, false);
  assert.equal(scenePlayback(state).playing, false);
  state = sceneReducer(state, environment());
  assert.equal(scenePlayback(state).playing, true);
});

test('a hidden tab cannot start animation before its first visible entry', () => {
  let state = sceneReducer(initialScene, environment({ visible: false }));
  assert.equal(state.entered, false);
  assert.deepEqual(scenePlayback(state), { animated: false, playing: false });
  state = sceneReducer(state, environment());
  assert.equal(state.entered, true);
  assert.deepEqual(scenePlayback(state), { animated: true, playing: true });
});

test('leaving the viewport or hiding the tab retains animation while suspending playback', () => {
  let state = sceneReducer(initialScene, environment());
  for (const change of [{ inView: false }, { visible: false }]) {
    state = sceneReducer(state, environment(change));
    assert.deepEqual(scenePlayback(state), { animated: true, playing: false });
    state = sceneReducer(state, environment());
    assert.equal(scenePlayback(state).playing, true);
    assert.equal(state.entered, true);
  }
});

test('manual pause survives viewport, visibility and reduced-motion changes', () => {
  let state = sceneReducer(sceneReducer(initialScene, environment()), { type: 'toggle' });
  state = sceneReducer(state, environment({ inView: false, visible: false }));
  state = sceneReducer(state, environment({ reduced: true }));
  state = sceneReducer(state, environment());
  assert.equal(scenePlayback(state).playing, false);
  state = sceneReducer(state, { type: 'toggle' });
  assert.equal(scenePlayback(state).playing, true);
});

test('repeated environment updates preserve a deliberate pause until explicitly resumed', () => {
  let state = sceneReducer(initialScene, environment());
  state = sceneReducer(state, { type: 'toggle' });
  for (let update = 0; update < 3; update++) {
    state = sceneReducer(state, environment());
    assert.equal(state.paused, true);
    assert.deepEqual(scenePlayback(state), { animated: true, playing: false });
  }
  state = sceneReducer(state, { type: 'toggle' });
  assert.equal(state.paused, false);
  assert.equal(scenePlayback(state).playing, true);
});

test('reduced motion selects the static composition and its removal permits playback', () => {
  for (const firstState of [initialScene, sceneReducer(initialScene, environment())]) {
    const state = sceneReducer(firstState, environment({ reduced: true }));
    assert.deepEqual(scenePlayback(state), { animated: false, playing: false });
    assert.equal(state.entered, firstState.entered);
    assert.equal(scenePlayback(sceneReducer(state, environment())).playing, true);
  }
});

test('a manual resume outside the viewport still waits for a visible environment', () => {
  let state = sceneReducer(sceneReducer(initialScene, environment()), { type: 'toggle' });
  state = sceneReducer(state, environment({ inView: false, visible: false }));
  state = sceneReducer(state, { type: 'toggle' });
  assert.equal(state.paused, false);
  assert.deepEqual(scenePlayback(state), { animated: true, playing: false });
  state = sceneReducer(state, environment());
  assert.equal(scenePlayback(state).playing, true);
});
