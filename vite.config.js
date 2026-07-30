import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "node:path";
import { existsSync } from "node:fs";
import { PAGES } from "./src/pages.config.js";

// One Rollup input per page, derived from the manifest. Adding a page means adding
// one entry to src/pages.config.js — nothing to register here.
// camelCase the slug so chunk names stay readable: "blog-ivaak-ai" → "blogIvaakAi".
const input = Object.fromEntries(
  PAGES.map((p) => [
    p.slug === "index" ? "main" : p.slug.replace(/-./g, (m) => m[1].toUpperCase()),
    resolve(import.meta.dirname, p.slug + ".html"),
  ]),
);

// Serve extensionless URLs (/aboutus) by mapping them to the built .html file.
// Works in `vite dev` and `vite preview`; static hosts need their own clean-URL rewrite.
function cleanUrls() {
  const rewrite = (req, _res, next) => {
    const [path, query] = (req.url || "/").split("?");
    if (path !== "/" && !path.includes(".")) {
      const name = path.replace(/^\/+|\/+$/g, "");
      if (name && existsSync(resolve(import.meta.dirname, name + ".html"))) {
        req.url = "/" + name + ".html" + (query ? "?" + query : "");
      }
    }
    next();
  };
  return {
    name: "clean-urls",
    configureServer(s) { s.middlewares.use(rewrite); },
    configurePreviewServer(s) { s.middlewares.use(rewrite); },
  };
}

// A per-deploy build id. The homepage frames the model pages (hologram.html …) in
// same-origin iframes; those .html files rarely change, so Vercel's CDN keeps serving
// a cached copy WITH ITS OLD SECURITY HEADERS (a 304 reuses stale CSP / X-Frame-Options).
// Appending ?b=<BUILD_ID> to the iframe src makes each deploy request a fresh cache key,
// which is served with the current headers. On Vercel the commit SHA is stable per
// deploy; locally a timestamp is fine.
const BUILD_ID = (process.env.VERCEL_GIT_COMMIT_SHA || String(Date.now())).slice(0, 12);

export default defineConfig({
  plugins: [svelte(), cleanUrls()],
  define: { __BUILD_ID__: JSON.stringify(BUILD_ID) },
  build: {
    target: "es2020",
    sourcemap: false,
    rollupOptions: { input },
  },
});
