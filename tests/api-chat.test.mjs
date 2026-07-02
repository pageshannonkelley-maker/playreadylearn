import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/chat.js';

test('returns a friendly fallback response when both providers fail', async () => {
  const originalFetch = global.fetch;
  const originalEnv = process.env;

  process.env.ANTHROPIC_API_KEY = 'test-anthropic';
  process.env.GEMINI_API_KEY = 'test-gemini';

  global.fetch = async () => ({
    ok: false,
    status: 401,
    text: async () => 'invalid key',
  });

  const req = {
    method: 'POST',
    body: {
      messages: [{ role: 'user', content: 'hello' }],
      systemPrompt: 'You are helpful.',
    },
  };

  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };

  try {
    await handler(req, res);
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.content?.[0]?.type, 'text');
    assert.match(res.body.content?.[0]?.text || '', /help/i);
  } finally {
    global.fetch = originalFetch;
    process.env = originalEnv;
  }
});
