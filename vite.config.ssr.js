// A second, server-mode build used only by scripts/prerender.mjs. It compiles the
// page components with Svelte's server generator so they can be rendered to HTML at
// build time. Output is a single ESM file in .prerender/ and never ships to the browser.
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [svelte()],
  build: {
    ssr: resolve(import.meta.dirname, "src/prerender-entry.js"),
    outDir: ".prerender",
    emptyOutDir: true,
    target: "node20",
    minify: false,
    // CSS is already emitted and linked by the client build; the server build only
    // needs markup, so anything it produces here is discarded.
    cssCodeSplit: false,
    rollupOptions: {
      output: { format: "esm", entryFileNames: "entry.mjs" },
    },
  },
  // Bundle everything rather than leaving bare imports for Node to resolve.
  ssr: { noExternal: true },
});
