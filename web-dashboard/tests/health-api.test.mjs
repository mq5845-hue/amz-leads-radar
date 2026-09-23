import assert from 'node:assert/strict';
import test from 'node:test';

import handler from '../api/health.mjs';

function makeResponse() {
  return {
    statusCode: 200,
    payload: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.payload = body;
      return this;
    },
  };
}

test('production health fails closed when the provider is not configured', () => {
  const previousNodeEnv = process.env.NODE_ENV;
  const previousVercel = process.env.VERCEL;
  const previousOpenAiKey = process.env.OPENAI_API_KEY;
  process.env.NODE_ENV = 'production';
  delete process.env.VERCEL;
  delete process.env.OPENAI_API_KEY;
  const res = makeResponse();

  try {
    handler({}, res);
  } finally {
    if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousNodeEnv;
    if (previousVercel === undefined) delete process.env.VERCEL;
    else process.env.VERCEL = previousVercel;
    if (previousOpenAiKey === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = previousOpenAiKey;
  }

  assert.equal(res.statusCode, 503);
  assert.equal(res.payload.ok, false);
  assert.equal(res.payload.error, 'review-draft-provider-not-configured');
});
