// Dynamic Contact submission handler (Vercel serverless function).
// POST /api/contact/enquiries — the server routing contract from the handoff PDF §10.
//
// Validate first, route on the server. The browser proposes an intent; the SERVER
// resolves the owner queue from the approved schema and never trusts a client-supplied
// owner. Answers/PII are never logged or echoed. Delivery reuses Resend, like
// /api/contact. Until RESEND_API_KEY is set the endpoint returns 503 so the form tells
// the visitor to email directly and no enquiry is silently lost (release gate 1 & 3).
//
// Env vars (Vercel dashboard): RESEND_API_KEY, CONTACT_TO, CONTACT_FROM.

import { randomUUID } from "node:crypto";
import { INTENTS, INTENT_IDS, PRODUCT_IDS, requirementFields } from "../../src/contact/contact-schema.js";

const FIELD_MAX = 4000;
const clean = (v, limit = 400) => String(v == null ? "" : v).trim().slice(0, limit);
const looksLikeEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const escapeHtml = (v) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Coarse in-memory rate limit (PDF §12). Not the security boundary — validation and the
// honeypot are — but an unauthenticated endpoint that emails on demand needs a cap.
const RATE = { windowMs: 60_000, max: 5 };
const hits = new Map();
function rateLimited(key) {
  const now = Date.now();
  const seen = (hits.get(key) || []).filter((t) => now - t < RATE.windowMs);
  seen.push(now);
  hits.set(key, seen);
  if (hits.size > 500) for (const [k, v] of hits) if (!v.some((t) => now - t < RATE.windowMs)) hits.delete(k);
  return seen.length > RATE.max;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ status: "rejected", message: "Method not allowed." });
  }

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return res.status(429).json({ status: "rejected", message: "Too many enquiries from this connection. Please try again shortly." });
  }

  let body;
  try { body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {}; }
  catch { return res.status(400).json({ status: "rejected", message: "That request could not be read." }); }

  // Honeypot: accept-and-discard so the bot sees success and does not retry.
  if (clean(body.website, 100)) return res.status(200).json({ status: "accepted", submissionId: randomUUID(), message: "Your enquiry has been routed." });

  // Intent + product are allowlisted; unknown values fail safely to general (release gate 2).
  const intent = INTENT_IDS.includes(body.intent) ? body.intent : "general";
  const product = PRODUCT_IDS.includes(body.product) ? body.product : null;
  const schema = INTENTS[intent];
  const owner = schema.owner; // SERVER-resolved. Never from the client.

  // Validate contact + requirement fields against the same schema the form renders.
  const contactErrors = [];
  const contact = {};
  for (const f of schema.contact) {
    const v = clean(body.contact?.[f.name], FIELD_MAX);
    if (f.required && !v) contactErrors.push(f.label);
    if (f.type === "email" && v && !looksLikeEmail(v)) contactErrors.push(`${f.label} (invalid)`);
    contact[f.name] = v;
  }
  const requirement = {};
  for (const f of requirementFields(intent, product)) {
    if (f.type === "file") continue; // uploads are a separate, scanned pipeline (PDF §12)
    const v = clean(body.requirement?.[f.name], FIELD_MAX);
    if (f.required && !v) contactErrors.push(f.label);
    if (f.type === "select" && v && Array.isArray(f.options) && !f.options.includes(v)) contactErrors.push(`${f.label} (invalid)`);
    requirement[f.name] = v;
  }
  if (contactErrors.length) {
    return res.status(400).json({ status: "rejected", message: `Please complete: ${contactErrors.join(", ")}.` });
  }

  // Enquiry consent is required to respond and route (PDF §12).
  if (body.consent?.enquiry !== true) {
    return res.status(400).json({ status: "rejected", message: "Enquiry consent is required to route your submission." });
  }
  if (schema.professional && body.consent?.retention !== true) {
    return res.status(400).json({ status: "rejected", message: "Retention consent is required for professional applications." });
  }

  // Attribution: allowlisted, minimal, never used as free text in a subject.
  const attribution = {
    source: /^\/[\w\-/]*$/.test(clean(body.attribution?.source, 200)) ? clean(body.attribution?.source, 200) : "",
    ctaId: /^[\w\-]{1,60}$/.test(clean(body.attribution?.ctaId, 60)) ? clean(body.attribution?.ctaId, 60) : "",
  };

  const submissionId = randomUUID();
  const consentVersion = clean(body.consent?.version, 40);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No silent loss: tell the visitor to email directly (release gate 1).
    return res.status(503).json({ status: "rejected", message: "The enquiry form is not connected yet — please email reachus@iicl.in." });
  }

  const rows = [
    ["Intent", schema.label], ["Owner queue", owner], ["Product", product || "—"],
    ...schema.contact.map((f) => [f.label, contact[f.name]]),
    ...requirementFields(intent, product).filter((f) => f.type !== "file").map((f) => [f.label, requirement[f.name]]),
    ["Source", attribution.source || "—"], ["CTA", attribution.ctaId || "—"],
    ["Marketing consent", body.consent?.marketing ? "yes" : "no"],
    ["Consent version", consentVersion || "—"], ["Submission", submissionId],
  ]
    .filter(([, v]) => v !== "")
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;vertical-align:top"><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(String(v)).replace(/\n/g, "<br>")}</td></tr>`)
    .join("");

  try {
    const send = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "IICL site <noreply@iicl.in>",
        to: [process.env.CONTACT_TO || "reachus@iicl.in"],
        reply_to: contact.email || undefined,
        // intent label and owner are fixed config values (safe); visitor text stays in the escaped body.
        subject: `Contact — ${schema.label}${product ? ` (${product})` : ""} → ${owner}`,
        html: `<h2>New enquiry — routed to ${escapeHtml(owner)}</h2>
               <table style="font-family:system-ui,sans-serif;font-size:14px">${rows}</table>`,
      }),
    });
    if (!send.ok) {
      console.error(JSON.stringify({ evt: "enquiry.send_failed", status: send.status, intent, owner }));
      return res.status(502).json({ status: "rejected", message: "We could not route that just now." });
    }
    // Monitoring: allowlisted values only — no answers, no PII.
    console.log(JSON.stringify({ evt: "enquiry.routed", intent, owner, product: product || "none", submissionId }));
    return res.status(200).json({ status: "accepted", submissionId, message: "Your enquiry has been routed." });
  } catch (err) {
    console.error(JSON.stringify({ evt: "enquiry.error", intent, message: String(err && err.message) }));
    return res.status(500).json({ status: "rejected", message: "We could not route that just now." });
  }
}
