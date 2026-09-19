import http from 'node:http';
import { createReviewDraftHandler } from '../web-dashboard/api/review-drafts.mjs';

const port = Number(process.env.PORT || 8787);
const openAiKey = process.env.OPENAI_API_KEY || '';
const openAiModel = process.env.OPENAI_MODEL || 'gpt-5-mini';
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
const reviewDraftHandler = createReviewDraftHandler();

function send(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  });
  res.end(JSON.stringify(body));
}

function createNodeResponse(res) {
  let statusCode = 200;
  let sent = false;
  return {
    status(code) {
      statusCode = code;
      return this;
    },
    json(body) {
      if (!sent) {
        sent = true;
        send(res, statusCode, body);
      }
      return this;
    },
  };
}

async function readBody(req) {
  const chunks = [];
  let total = 0;
  for await (const chunk of req) {
    total += chunk.length;
    if (total > 100000) throw new Error('request-too-large');
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

const server = http.createServer(async (req, res) => {
  const pathname = new URL(req.url || '/', 'http://127.0.0.1').pathname;
  if (req.method === 'OPTIONS') return send(res, 204, {});
  if (req.method === 'GET' && pathname === '/health') {
    const productionReady = Boolean(openAiKey && supabaseUrl && supabaseAnonKey);
    return send(res, 200, {
      ok: true,
      service: openAiKey ? 'review-draft-openai' : 'review-draft-local-demo',
      productionReady,
      providerConfigured: Boolean(openAiKey),
      authConfigured: Boolean(supabaseUrl && supabaseAnonKey),
      model: openAiKey ? openAiModel : 'local-demo',
    });
  }
  if (req.method !== 'POST' || pathname !== '/api/review-drafts') return send(res, 404, { error: 'not-found' });

  try {
    const body = await readBody(req);
    await reviewDraftHandler({ method: req.method, headers: req.headers, body }, createNodeResponse(res));
  } catch (error) {
    if (!res.writableEnded) send(res, error?.message === 'request-too-large' ? 413 : 500, { error: error?.message === 'request-too-large' ? 'request-too-large' : 'internal-server-error' });
  }
});

server.listen(port, '127.0.0.1', () => console.log(`Review draft local demo listening at http://127.0.0.1:${port}`));
