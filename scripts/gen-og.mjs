// Generates a 1200x630 social card per indexable route into public/img/og/.
//
// Every page previously shared one 1.42 MB, 1729x910 PNG. That is the wrong aspect
// ratio for every platform, far too heavy for a preview thumbnail, and gave a link to
// the Privacy Policy the same picture as the homepage.
//
// Each card is drawn as SVG and rasterised to PNG. The SVG is only an intermediate:
// Facebook, LinkedIn and X do NOT render SVG social cards, so shipping them would have
// silently broken every link preview. Content comes from the same page manifest as the
// title and description, so the card cannot drift from the page.
//
// Run with: npm run og  (also runs as part of `npm run gen`)
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import { PAGES } from "../src/pages.config.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, "public/img/og");
mkdirSync(OUT, { recursive: true });

const W = 1200, H = 630;
const C = { base: "#07080a", deep: "#12060a", red: "#ee2f2e", ember: "#ff8d8b", ink: "#f4f2ee" };

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Deterministic RNG so rebuilds produce identical files.
const rng = (seed) => () => (
  (seed = (seed + 0x6d2b79f5) | 0),
  (((Math.imul(seed ^ (seed >>> 15), 1 | seed) ^ (Math.imul(seed ^ (seed >>> 7), 61 | seed) + seed)) >>> 14) & 0xffff) / 0xffff
);
const seedOf = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 7);

/** Break a title into lines that fit the card, by approximate width. */
function wrap(text, maxChars, maxLines) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxChars && cur) { lines.push(cur); cur = w; }
    else cur = (cur + " " + w).trim();
    if (lines.length === maxLines) break;
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  // If we truncated, mark the last line.
  const used = lines.join(" ").split(/\s+/).length;
  if (used < words.length && lines.length) lines[lines.length - 1] += "…";
  return lines;
}

// The kicker groups a route into its commercial pillar, so a shared link is
// self-describing even before the title is read.
function kickerFor(p) {
  const s = p.slug;
  if (s === "index") return "ENTERPRISE AI · GCC TECHNOLOGY TEAMS";
  if (/^blog-|^usecase-/.test(s)) return "IICL JOURNAL";
  if (s === "blog" || s === "use-cases") return "INSIGHTS";
  if (/gcc|careers|contracts/.test(s)) return "TALENT";
  if (["healthcare","manufacturing","finance","banking","legal","logistics","supply-chain","contact-centre","hr"].includes(s))
    return "INDUSTRY SOLUTIONS";
  if (["icognito","idental","ivaak","iwac","trufix"].includes(s)) return "AI PRODUCTS";
  if (["ai-genai-services","agentic-ai","erp-services","helpdesk","web-mobile-dev","whatsapp-business"].includes(s))
    return "AI SOLUTIONS";
  return "INTELLIGENCE INDIA.COM LIMITED";
}

function card(p) {
  const id = p.slug.replace(/[^a-z0-9]/gi, "") || "home";
  const r = rng(seedOf(p.slug));
  // Strip the trailing brand — the logo already carries it.
  const title = String(p.title).split("|")[0].replace(/\s*[-–]\s*IICL\s*$/, "").trim();
  const lines = wrap(title, 30, 3);
  const size = lines.length >= 3 ? 52 : lines.length === 2 ? 60 : 66;

  // Mesh + dust, the same visual family as the page heroes.
  const dots = [];
  for (let i = 0; i < 55; i++) {
    const x = r() * W, y = r() * H;
    dots.push(`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(0.7 + r() * 1.7).toFixed(1)}" fill="${r() > 0.6 ? C.red : "#fff"}" fill-opacity="${(0.12 + r() * 0.3).toFixed(2)}"/>`);
  }
  const arcs = [];
  for (let i = 0; i < 5; i++) {
    const cx = 980 + r() * 120, cy = 200 + r() * 260, rad = 90 + i * 62;
    arcs.push(`<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${rad}" fill="none" stroke="${C.red}" stroke-width="1.6" opacity="${(0.30 - i * 0.045).toFixed(2)}" stroke-dasharray="${i % 2 ? "4 10" : "none"}"/>`);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>
  <radialGradient id="g-${id}" cx="78%" cy="42%" r="62%">
    <stop offset="0%" stop-color="${C.red}" stop-opacity=".46"/>
    <stop offset="45%" stop-color="#7d1416" stop-opacity=".22"/>
    <stop offset="100%" stop-color="${C.base}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="v-${id}" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="${C.base}" stop-opacity=".95"/>
    <stop offset="58%" stop-color="${C.base}" stop-opacity=".35"/>
    <stop offset="100%" stop-color="${C.base}" stop-opacity="0"/>
  </linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="${C.base}"/>
<rect width="${W}" height="${H}" fill="${C.deep}" opacity=".5"/>
${Array.from({ length: Math.ceil(W / 48) }, (_, i) => `<line x1="${i * 48}" y1="0" x2="${i * 48}" y2="${H}" stroke="#fff" stroke-opacity=".03"/>`).join("")}
${Array.from({ length: Math.ceil(H / 48) }, (_, i) => `<line x1="0" y1="${i * 48}" x2="${W}" y2="${i * 48}" stroke="#fff" stroke-opacity=".03"/>`).join("")}
<ellipse cx="950" cy="300" rx="520" ry="400" fill="url(#g-${id})"/>
${arcs.join("")}
${dots.join("")}
<rect width="${W}" height="${H}" fill="url(#v-${id})"/>
<g transform="translate(72,86)">
  <rect x="0" y="0" width="46" height="4" fill="${C.red}"/>
  <text x="0" y="34" font-family="IBM Plex Mono, monospace" font-size="15" letter-spacing="3" fill="${C.red}">IICL</text>
</g>
<text x="72" y="176" font-family="IBM Plex Mono, monospace" font-size="14" letter-spacing="3.2" fill="${C.ember}" fill-opacity=".9">${esc(kickerFor(p))}</text>
<g font-family="Aeonik, Switzer, ui-sans-serif, system-ui, sans-serif" font-size="${size}" font-weight="500" fill="${C.ink}">
${lines.map((l, i) => `  <text x="72" y="${252 + i * (size + 12)}">${esc(l)}</text>`).join("\n")}
</g>
<line x1="72" y1="${H - 96}" x2="${72 + 46}" y2="${H - 96}" stroke="${C.red}" stroke-width="3"/>
<text x="72" y="${H - 62}" font-family="IBM Plex Mono, monospace" font-size="15" letter-spacing="1.6" fill="#fff" fill-opacity=".62">iicl.in${p.slug === "index" ? "" : "/" + p.slug}</text>
</svg>
`;
}

// A short, human description of the card itself — NOT a repeat of the page title,
// which is what the previous og:image:alt did and what the audit flagged.
export function altFor(p) {
  return `IICL social card: ${kickerFor(p).toLowerCase().replace(/ · /g, " and ")} — ${String(p.title).split("|")[0].trim()}`;
}

let n = 0, bytes = 0;
for (const p of PAGES) {
  if (p.kind === "model" || p.index === false) continue;
  const png = new Resvg(card(p), { fitTo: { mode: "width", value: W } }).render().asPng();
  writeFileSync(resolve(OUT, p.slug + ".png"), png);
  bytes += png.length;
  n++;
}
console.log(`og: wrote ${n} social cards (${W}x${H} PNG, ${(bytes / 1048576).toFixed(2)} MB total, ${(bytes / n / 1024).toFixed(0)} KB avg) to public/img/og/`);
