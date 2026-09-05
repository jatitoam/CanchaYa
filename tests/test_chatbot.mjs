import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import handler from '../api/chatbot.mjs';

const originalFetch = globalThis.fetch;
const originalKey = process.env.GEMINI_API_KEY;
async function request(method = 'POST', body = { mensaje: '¿Cuánto cuesta?' }) {
  const res = {
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.code = code; return this; },
    json(value) { this.body = value; return this; },
  };
  return handler({ method, body }, res);
}
try {
  globalThis.fetch = () => { throw new Error('Unexpected API call'); };
  assert.equal((await request('GET')).code, 405);
  assert.equal((await request('GET')).headers.Allow, 'POST');
  for (const mensaje of [undefined, null, 123, '', '  ']) {
    assert.equal((await request('POST', { mensaje })).code, 400);
  }
  delete process.env.GEMINI_API_KEY;
  assert.equal((await request()).code, 500);
  process.env.GEMINI_API_KEY = 'test-only-key';
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent');
    assert.equal(options.headers['x-goog-api-key'], 'test-only-key');
    const payload = JSON.parse(options.body);
    assert.deepEqual(payload.contents, [{ role: 'user', parts: [{ text: '¿Cuánto cuesta?' }] }]);
    assert.equal(createHash('sha256').update(payload.system_instruction.parts[0].text).digest('hex'), '1deb9d1f3bc07db56da4942ab175f4683875c634b143161955b816eda89045e2');
    return new Response(JSON.stringify({ candidates: [{ content: { parts: [
      { text: 'internal', thought: true }, { text: 'Cuesta ' }, { text: '$45.' },
    ] } }] }));
  };
  assert.deepEqual((await request()).body, { respuesta: 'Cuesta $45.' });
  globalThis.fetch = async () => new Response(JSON.stringify({ error: { message: 'Quota exceeded' } }), { status: 429 });
  const failure = await request();
  assert.equal(failure.code, 429);
  assert.deepEqual(failure.body, { error: { message: 'Quota exceeded' } });
  globalThis.fetch = async () => new Response('Upstream unavailable', { status: 503 });
  assert.deepEqual((await request()).body, { error: 'Upstream unavailable' });
  globalThis.fetch = async () => new Response('{}');
  assert.equal((await request()).code, 502);
  globalThis.fetch = async () => { throw new Error('Network failure'); };
  assert.deepEqual((await request()).body, { error: 'Network failure' });
  console.log('Chatbot checks passed');
} finally {
  globalThis.fetch = originalFetch;
  if (originalKey === undefined) delete process.env.GEMINI_API_KEY;
  else process.env.GEMINI_API_KEY = originalKey;
}
