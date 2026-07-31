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

// Serve the /api functions during `vite dev`.
//
// api/**.js are Vercel serverless functions, and the Vite dev server knows nothing about
// them — every POST to /api/contact/enquiries 404'd locally, so the contact form could
// only ever be exercised against a deployment. This mounts the same handlers on the dev
// server using the (req, res) signature Vercel gives them, so the form works end to end
// on localhost and the endpoints can be curl'd.
//
// DEV ONLY — it is never part of a build. Vercel still runs the real functions in
// production; this only removes the "works on prod, 404 locally" gap.
function devApi() {
  return {
    name: "dev-api",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const [pathname] = (req.url || "").split("?");
        if (!pathname.startsWith("/api/")) return next();

        const file = resolve(import.meta.dirname, pathname.replace(/^\/+/, "") + ".js");
        if (!existsSync(file)) return next();

        // Body parsing + the res.status().json() helpers Vercel's runtime provides.
        const chunks = [];
        for await (const c of req) chunks.push(c);
        const raw = Buffer.concat(chunks).toString("utf8");
        req.body = raw && (req.headers["content-type"] || "").includes("json")
          ? (() => { try { return JSON.parse(raw); } catch { return {}; } })()
          : raw;
        req.query = Object.fromEntries(new URL(req.url, "http://localhost").searchParams);

        res.status = (code) => { res.statusCode = code; return res; };
        res.json = (obj) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(obj));
          return res;
        };
        res.send = (v) => { res.end(typeof v === "string" ? v : JSON.stringify(v)); return res; };

        try {
          // Cache-busted so edits to a handler are picked up without restarting dev.
          const mod = await server.ssrLoadModule(file + "?t=" + Date.now());
          await (mod.default || mod.handler)(req, res);
        } catch (err) {
          server.config.logger.error("[dev-api] " + pathname + ": " + (err && err.stack));
          if (!res.writableEnded) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ status: "rejected", message: String(err && err.message) }));
          }
        }
      });
    },
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
  plugins: [svelte(), cleanUrls(), devApi()],
  define: { __BUILD_ID__: JSON.stringify(BUILD_ID) },
  build: {
    target: "es2020",
    sourcemap: false,
    rollupOptions: { input },
  },
});
