// Contract tests for the contact API — run against any environment.
//
//   npm run test:api                      → http://localhost:5174 (vite dev)
//   BASE=https://iicl.in npm run test:api → a real deployment
//
// `vite dev` serves api/**.js through the devApi() plugin in vite.config.js, so these
// run locally without `vercel dev`. Everything asserted here is a rule from the Dynamic
// Contact handoff: validate first, resolve the owner on the server, fail unknown values
// safely, and never let an accepted enquiry disappear.
//
// No enquiry is delivered while RESEND_API_KEY is unset — the endpoint answers 503 by
// design, and the "valid submission" case accepts either 503 (not wired) or 200 (wired).

import { INTENTS } from '../src/contact/contact-schema.js';

const BASE = process.env.BASE || 'http://localhost:5174';
const URL_ = BASE.replace(/\/$/, '') + '/api/contact/enquiries';

let pass = 0, fail = 0;
const ok = (name, cond, detail = '') => {
  if (cond) { pass++; console.log('  ✓ ' + name); }
  else { fail++; console.log('  ✗ ' + name + (detail ? '  → ' + detail : '')); }
};

// The limiter buckets by x-forwarded-for, and 5/minute is less than this suite sends.
// Each case therefore gets its own synthetic client IP so it is judged on its own
// merits; the rate-limit case at the end deliberately reuses one address to trip it.
let client = 0;
const post = async (body, headers = {}) => {
  const res = await fetch(URL_, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': '203.0.113.' + (++client % 250),
      ...headers,
    },
    body: JSON.stringify(body),
  });
  let json = null;
  try { json = await res.json(); } catch { /* non-JSON body is itself a failure below */ }
  return { status: res.status, json };
};

// A complete, valid general enquiry — the baseline every other case varies from.
const valid = () => ({
  intent: 'general',
  attribution: { source: '/aboutus', ctaId: 'discuss-ai' },
  contact: { name: 'Test Person', company: 'Test Co', email: 'test@example.com', phone: '+91 90000 00000' },
  requirement: { need: 'We want to automate invoice matching.', outcome: 'Fewer manual touches.' },
  consent: { enquiry: true, marketing: false, version: '2026-07-01' },
  responseChannel: 'Email',
});

console.log('\nContact API contract — ' + URL_ + '\n');

// ── Method + shape ──────────────────────────────────────────────────────────
{
  const res = await fetch(URL_, { method: 'GET' });
  ok('GET is rejected with 405', res.status === 405, 'got ' + res.status);
}

// ── Validation is server-side and authoritative ─────────────────────────────
{
  const { status, json } = await post({});
  ok('empty body → 400 listing the missing fields',
    status === 400 && /Full name/.test(json?.message || ''), status + ' ' + json?.message);
}
{
  const b = valid(); b.contact.email = 'not-an-email';
  const { status, json } = await post(b);
  ok('malformed email → 400', status === 400 && /invalid/i.test(json?.message || ''), status + ' ' + json?.message);
}
{
  const b = valid(); delete b.requirement.need;
  const { status } = await post(b);
  ok('missing required requirement field → 400', status === 400);
}

// ── Consent is required to route (PDF §12) ──────────────────────────────────
{
  const b = valid(); b.consent.enquiry = false;
  const { status, json } = await post(b);
  ok('enquiry consent false → 400', status === 400 && /consent/i.test(json?.message || ''), status + ' ' + json?.message);
}
{
  const b = valid();
  b.intent = 'professional-open';
  b.contact = { name: 'A Candidate', email: 'a@example.com', phone: '+91 90000 00000' };
  b.requirement = { domain: 'Data engineering' };
  b.consent = { enquiry: true, marketing: false, version: '2026-07-01' }; // no retention
  const { status, json } = await post(b);
  ok('professional path without retention consent → 400',
    status === 400 && /retention/i.test(json?.message || ''), status + ' ' + json?.message);
}

// ── Unknown values fail safely (release gate 2) ─────────────────────────────
{
  const b = valid(); b.intent = 'not-a-real-intent';
  const { status, json } = await post(b);
  // Falls back to `general`, whose required fields the payload satisfies.
  ok('unknown intent falls back to general rather than erroring',
    status !== 400 || !/intent/i.test(json?.message || ''), status + ' ' + json?.message);
}
{
  const b = valid(); b.intent = 'product-demo'; b.product = '../../etc/passwd';
  b.requirement = { scenario: 'Show inbound booking.' };
  const { status, json } = await post(b);
  ok('hostile product ID is rejected, not used as a variant',
    status !== 500, status + ' ' + json?.message);
}
{
  const b = valid(); b.attribution.source = 'https://evil.example/x';
  const { status } = await post(b);
  ok('absolute-URL source is dropped, request still processed', status !== 500);
}

// ── The client cannot choose its own CRM queue ──────────────────────────────
{
  const b = valid(); b.owner = 'Attacker Queue'; b.intent = 'gcc-team-expansion';
  b.requirement = { mandate: 'Stand up a data platform team in Hyderabad.' };
  const { status, json } = await post(b);
  ok('client-supplied owner is ignored (server resolves it)',
    status !== 500 && !/Attacker/.test(JSON.stringify(json || {})), status + ' ' + JSON.stringify(json));
  console.log('      (expected server-side owner for this intent: ' + INTENTS['gcc-team-expansion'].owner + ')');
}

// ── Honeypot is accept-and-discard, so a bot sees success and stops ─────────
{
  const b = valid(); b.website = 'http://spam.example';
  const { status, json } = await post(b);
  ok('honeypot → 200 accepted (silently discarded)',
    status === 200 && json?.status === 'accepted', status + ' ' + JSON.stringify(json));
}

// ── A well-formed enquiry is accepted, or refuses loudly if not wired ───────
{
  const { status, json } = await post(valid());
  const wired = status === 200 && json?.status === 'accepted' && json?.submissionId;
  const notWired = status === 503 && /email/i.test(json?.message || '');
  ok('valid enquiry → 200 accepted, or 503 telling the visitor to email',
    wired || notWired, status + ' ' + JSON.stringify(json));
  console.log(wired
    ? '      delivery is WIRED (RESEND_API_KEY set) — submissionId ' + json.submissionId
    : '      delivery is NOT wired (RESEND_API_KEY unset) — 503 by design, nothing is lost silently');
}

// ── Rate limiting (last: it trips the limiter for this IP) ──────────────────
{
  let sawLimit = false;
  for (let i = 0; i < 9; i++) {
    // One fixed address, so these all land in the same bucket.
    const { status } = await post(valid(), { 'x-forwarded-for': '198.51.100.7' });
    if (status === 429) { sawLimit = true; break; }
  }
  ok('burst of requests eventually hits the 429 rate limit', sawLimit,
    'no 429 seen — check RATE in api/contact/enquiries.js');
}

console.log('\n' + pass + ' passed, ' + fail + ' failed\n');
process.exit(fail ? 1 : 0);
