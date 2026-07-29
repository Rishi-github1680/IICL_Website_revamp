// Renders every content page to static HTML and injects it into the built files.
//
// Before this step a crawler received `<body><div id="app"></div></body>` and the
// first paint waited on ~100 KB of JavaScript. Spec B4/C8/F7/G14 require essential
// copy, headings and links to be present in the initial HTML — this is what makes
// that true. The client then hydrates the markup instead of building it from nothing.
//
// Runs after `vite build`. Any page that fails to render is reported and left as a
// client-rendered shell rather than failing the whole build, so one bad component
// cannot block a release.
import { readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { render } from "svelte/server";
import { PAGES } from "../src/pages.config.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(ROOT, "dist");

// pathToFileURL, not a raw path: on Windows "C:\..." is not a valid ESM specifier.
const { PAGE_COMPONENTS, HOME } = await import(
  pathToFileURL(resolve(ROOT, ".prerender/entry.mjs")).href
);

let done = 0;
const failed = [];

for (const p of PAGES) {
  // 3D demos are canvases with no meaningful markup to prerender.
  if (p.kind === "model") continue;

  const Component = p.kind === "home" ? HOME : PAGE_COMPONENTS[p.dataPage];
  if (!Component) {
    failed.push(`${p.slug} (no component for "${p.dataPage}")`);
    continue;
  }

  const file = resolve(DIST, p.slug + ".html");
  if (!existsSync(file)) {
    failed.push(`${p.slug} (no built HTML)`);
    continue;
  }

  let out;
  try {
    out = render(Component);
  } catch (err) {
    failed.push(`${p.slug} (${err.message})`);
    continue;
  }

  let html = readFileSync(file, "utf8");

  // Markup goes inside the existing mount target, so the client hydrates in place.
  const appTag = html.match(/<div id="app"[^>]*>/);
  if (!appTag) {
    failed.push(`${p.slug} (no #app mount point)`);
    continue;
  }
  html = html.replace(appTag[0] + "</div>", appTag[0] + out.body + "</div>");

  // <svelte:head> content — the JSON-LD blocks and any per-page meta.
  if (out.head?.trim()) html = html.replace("</head>", out.head + "\n  </head>");

  writeFileSync(file, html, "utf8");
  done++;
}

// The server bundle is a build artefact; nothing downstream needs it.
rmSync(resolve(ROOT, ".prerender"), { recursive: true, force: true });

console.log(`prerender: ${done} pages rendered to static HTML`);
if (failed.length) {
  console.warn(`prerender: ${failed.length} left as client-rendered shells:`);
  for (const f of failed) console.warn(`  - ${f}`);
}
