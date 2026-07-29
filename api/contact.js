// Contact form handler (Vercel serverless function).
// Validates the enquiry, then emails it on via Resend.
//
// Required environment variables (set in the Vercel dashboard):
//   RESEND_API_KEY  — API key from resend.com
//   CONTACT_TO      — where enquiries land (defaults to reachus@iicl.in)
//   CONTACT_FROM    — verified sender on your domain, e.g. "IICL site <noreply@iicl.in>"
//
// Until RESEND_API_KEY is set the endpoint returns 503 and the form tells the
// visitor to email reachus@iicl.in directly, so no enquiry is silently lost.

const MAX = { name: 120, company: 160, email: 200, phone: 40, requirement: 80, message: 4000 };

// Approved contact intents (Spec F3). Anything not on this list is discarded rather
// than echoed — the parameter is attacker-controlled and must never reach an email
// subject, a log line or a downstream system as free text.
const INTENT_KEYS = new Set([
  "ai-discovery-workshop",
  "enterprise-ai-use-case",
  "gcc-team-expansion",
  "gcc-capability-requirement",
  "agentic-ai-workflow-assessment",
  "agentic-ai-architecture",
  "agentic-ai-proof-of-value",
  "agentic-ai-security-assessment",
  "agentic-ai-value-assessment",
  "agentic-ai-managed-operations",
]);

// Coarse in-memory rate limit: a serverless instance handles many requests before it
// is recycled, so this stops the obvious flood without any external dependency. It is
// deliberately not a security boundary — the honeypot and validation carry that — but
// F8/§14 require a limit, and an unauthenticated endpoint that emails on demand needs one.
const RATE = { windowMs: 60_000, max: 5 };
const hits = new Map();
function rateLimited(key) {
  const now = Date.now();
  const seen = (hits.get(key) || []).filter((t) => now - t < RATE.windowMs);
  seen.push(now);
  hits.set(key, seen);
  // Keep the map from growing without bound across a long-lived instance.
  if (hits.size > 500) for (const [k, v] of hits) if (!v.some((t) => now - t < RATE.windowMs)) hits.delete(k);
  return seen.length > RATE.max;
}

const clean = (v, limit) => String(v == null ? "" : v).trim().slice(0, limit);
const looksLikeEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const escapeHtml = (v) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  // Trust the first hop only; on Vercel x-forwarded-for is set by the platform.
  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return res.status(429).json({ error: "Too many enquiries from this connection. Please try again shortly." });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch {
    return res.status(400).json({ error: "That request could not be read." });
  }

  // Honeypot: only a bot fills a field positioned off-screen. Accept and discard,
  // so the bot sees success and does not retry.
  if (clean(body.website, 100)) return res.status(200).json({ ok: true });

  const data = {
    name: clean(body.name, MAX.name),
    company: clean(body.company, MAX.company),
    email: clean(body.email, MAX.email),
    phone: clean(body.phone, MAX.phone),
    requirement: clean(body.requirement, MAX.requirement),
    message: clean(body.message, MAX.message),
  };

  // Allowlisted or dropped. Never echoed back, never used as free text.
  const intent = INTENT_KEYS.has(body.intent) ? body.intent : null;

  const missing = Object.entries(data).filter(([, v]) => !v).map(([k]) => k);
  if (missing.length) {
    return res.status(400).json({ error: `Please complete every required field (${missing.join(", ")}).` });
  }
  if (!looksLikeEmail(data.email)) {
    return res.status(400).json({ error: "That email address does not look right." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "The enquiry form is not connected yet." });
  }

  const rows = [
    ["Name", data.name],
    ["Company", data.company],
    ["Email", data.email],
    ["Mobile", data.phone],
    ["Requirement", data.requirement],
    ["Intent", intent || "—"],
  ]
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join("");

  try {
    const send = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "IICL site <noreply@iicl.in>",
        to: [process.env.CONTACT_TO || "reachus@iicl.in"],
        reply_to: data.email,
        // The visitor's company name is their text, and an email subject is a place
        // that text gets rendered by other systems. The requirement comes from a fixed
        // dropdown and the intent from the allowlist, so both are safe; the company
        // name belongs in the body, where it is escaped.
        subject: `Website enquiry — ${data.requirement}${intent ? ` (${intent})` : ""}`,
        html: `<h2>New enquiry from iicl.in</h2>
               <table style="font-family:system-ui,sans-serif;font-size:14px">${rows}</table>
               <p style="font-family:system-ui,sans-serif;font-size:14px"><strong>Process described</strong><br>
               ${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>`,
      }),
    });

    if (!send.ok) {
      console.error("Resend rejected the enquiry:", send.status, await send.text());
      return res.status(502).json({ error: "We could not send that just now." });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact form failed:", err);
    return res.status(500).json({ error: "We could not send that just now." });
  }
}
