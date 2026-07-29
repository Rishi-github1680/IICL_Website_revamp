// Generates the root .html entry files from src/pages.config.js.
//
// Vite needs a real .html file per route to use as a Rollup input, but those files
// were 49 near-identical shells differing only in <title>, description and which
// component they mount. They are now generated here and git-ignored, so the repo
// holds one template instead of 49 copies.
//
// Runs automatically before `npm run dev`, `npm run build` and `npm run preview`.
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PAGES } from "../src/pages.config.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Production is opt-in. Anything else — local, a Vercel preview, a branch deploy — is
// staging and must not be indexable (Spec B4, G14). Vercel sets VERCEL_ENV=production
// only on the production deployment.
const IS_PROD =
  process.env.IICL_ENV === "production" || process.env.VERCEL_ENV === "production";
const SITE = "https://iicl.in";

// Indexable = a content page that has not opted out. Models never are; home always is.
const isIndexable = (p) =>
  (p.kind === "home" || p.kind === "page") && p.index !== false;

// Fonts are self-hosted (see scripts/fetch-fonts.mjs) and their @font-face rules ship
// inside our own bundled CSS. What remains here is a preload for the two faces first
// paint needs, so they are fetched in parallel with the stylesheet rather than after it.
// The previous third-party <link rel="stylesheet"> was render-blocking and cost two
// extra connections before any text could appear (Spec F7).
const FONTS = `    <link rel="preload" href="/fonts/inter-400-latin.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/inter-600-latin.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/plex-mono-400-latin.woff2" as="font" type="font/woff2" crossorigin />`;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

// Robots and canonical are one decision, so they are made in one place.
//   staging  → noindex,nofollow,noarchive and NO canonical. A canonical pointing at
//              production does not stop a preview being indexed, so it must not be the
//              only control (G14).
//   model    → noindex,follow — a 3D demo, not a destination
//   excluded → noindex,follow, no canonical (see index/indexNote in the manifest)
//   indexed  → canonical to the production URL
function robotsAndCanonical(p, canonical) {
  if (!IS_PROD) return `    <meta name="robots" content="noindex, nofollow, noarchive" />
`;
  if (p.kind === "model" || p.index === false)
    return `    <meta name="robots" content="noindex, follow" />
`;
  return `    <link rel="canonical" href="${SITE}${canonical}" />
`;
}

// Open Graph + X/Twitter, from the same manifest fields as <title> and the meta
// description (Spec F4, G14). Absolute URLs: relative ones are not resolved by every
// crawler. Excluded routes get no social card — they are not destinations.
function social(p, canonical) {
  if (p.kind === "model" || p.index === false) return "";
  const url = SITE + canonical;
  const img = SITE + (p.ogImage || "/img/banners/A1-og-default.png");
  const d = p.description || "";
  return [
    `    <meta property="og:type" content="website" />`,
    `    <meta property="og:site_name" content="IICL" />`,
    `    <meta property="og:title" content="${esc(p.title)}" />`,
    d ? `    <meta property="og:description" content="${esc(d)}" />` : "",
    `    <meta property="og:url" content="${url}" />`,
    `    <meta property="og:image" content="${img}" />`,
    `    <meta property="og:image:alt" content="${esc(p.ogAlt || p.title)}" />`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:title" content="${esc(p.title)}" />`,
    d ? `    <meta name="twitter:description" content="${esc(d)}" />` : "",
    `    <meta name="twitter:image" content="${img}" />`,
  ].filter(Boolean).join("\n") + "\n";
}

function head(p, extra = "") {
  const canonical = p.slug === "index" ? "/" : "/" + p.slug;
  return `    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="${p.theme || "#ffffff"}" />
    <title>${esc(p.title)}</title>
${p.description ? `    <meta name="description" content="${esc(p.description)}" />
` : ""}${robotsAndCanonical(p, canonical)}${social(p, canonical)}${extra}`;
}

function render(p) {
  // Standalone 3D demo. Two shapes: `entry` loads a Three.js module straight into a
  // #scene container; otherwise the page mounts its Svelte component.
  if (p.kind === "model") {
    const body = p.entry
      ? `    <main class="model-shell">
      <div id="scene" class="scene" role="img" aria-label="${esc(p.sceneLabel || p.title)}"></div>
    </main>
    <script type="module" src="/src/${p.entry}"></script>`
      : `    <div id="app"></div>
    <script type="module">
      import { mount } from "svelte";
      import Component from "/src/${p.component}.svelte";
      mount(Component, { target: document.getElementById("app") });
    </script>`;

    return `<!doctype html>
<html lang="en">
  <head>
${head(p, `    <link rel="stylesheet" href="/src/styles.css" />
    <script>if(new URLSearchParams(location.search).get("ui")==="0")document.documentElement.setAttribute("data-ui","0");</script>
`)}  </head>
  <body${p.bodyClass ? ` class="${p.bodyClass}"` : ""}>
${body}
  </body>
</html>
`;
  }

  // Homepage: mounts the scroll-driven hero.
  if (p.kind === "home") {
    return `<!doctype html>
<html lang="en">
  <head>
${head(p, FONTS + "\n")}    <style>html, body { margin: 0; padding: 0; background: #070707; }</style>
  </head>
  <body>
    <div id="app"></div>
    <script type="module">
      import { hydrate, mount } from "svelte";
      import IICLHero from "/src/IICLHero.svelte";
      // Prerendered markup is already in #app, so hydrate it; mount is the fallback.
      const app = document.getElementById("app");
      (app.firstChild ? hydrate : mount)(IICLHero, { target: app });
    </script>
  </body>
</html>
`;
  }

  // Content page: src/page.js reads data-page and mounts src/pages/<slug>.svelte.
  return `<!doctype html>
<html lang="en">
  <head>
${head(p, FONTS + "\n")}    <style>html,body{margin:0;padding:0;background:#fff;}</style>
  </head>
  <body>
    <div id="app" data-page="${p.dataPage}"></div>
    <script type="module" src="/src/page.js"></script>
  </body>
</html>
`;
}

let written = 0;
for (const p of PAGES) {
  const file = resolve(ROOT, p.slug + ".html");
  const next = render(p);
  // Only touch the file when the content actually changes, so Vite's watcher stays quiet.
  if (!existsSync(file) || readFileSync(file, "utf8") !== next) {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, next, "utf8");
    written++;
  }
}
// ── robots.txt ────────────────────────────────────────────────────────────────
// Staging disallows everything. Production allows crawling and points at the sitemap.
// CSS, JS and images are never blocked — they are needed to render the page (F4).
writeFileSync(
  resolve(ROOT, "public/robots.txt"),
  IS_PROD
    ? `# ${SITE}/robots.txt
User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`
    : `# Non-production deployment - not for indexing.
User-agent: *
Disallow: /
`,
  "utf8",
);

// ── sitemap.xml ───────────────────────────────────────────────────────────────
// Production canonicals only: no models, no excluded routes, no 404, no redirects.
// Generated from the same manifest as the pages, so the two cannot drift apart (F4).
const indexable = PAGES.filter(isIndexable);
writeFileSync(
  resolve(ROOT, "public/sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map((p) => `  <url><loc>${SITE}${p.slug === "index" ? "/" : "/" + p.slug}</loc></url>`)
  .join("\n")}
</urlset>
`,
  "utf8",
);

console.log(
  `gen-pages: ${IS_PROD ? "PRODUCTION" : "STAGING (noindex)"} - sitemap has ${indexable.length} canonical URLs`,
);
console.log(`gen-pages: ${PAGES.length} entries (${written} written, ${PAGES.length - written} unchanged)`);
