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

const FONTS = `    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />`;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

function head(p, extra = "") {
  const canonical = p.slug === "index" ? "/" : "/" + p.slug;
  return `    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="${p.theme || "#ffffff"}" />
    <title>${esc(p.title)}</title>
${p.description ? `    <meta name="description" content="${esc(p.description)}" />\n` : ""}${
    p.kind === "model"
      ? `    <meta name="robots" content="noindex, follow" />\n`
      : `    <link rel="canonical" href="https://iicl.in${canonical}" />\n`
  }${extra}`;
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
      import { mount } from "svelte";
      import IICLHero from "/src/IICLHero.svelte";
      mount(IICLHero, { target: document.getElementById("app") });
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
console.log(`gen-pages: ${PAGES.length} entries (${written} written, ${PAGES.length - written} unchanged)`);
