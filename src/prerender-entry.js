// Server-side entry for the prerender step. Vite builds this once with `ssr: true`,
// which compiles every page component in server mode; scripts/prerender.mjs then
// renders each one to HTML and injects it into the matching dist/*.html.
//
// This exists so a crawler — and the first paint — get real markup instead of an
// empty <div id="app">. Spec B4, C8, F7, G14: "render essential copy and links in
// the initial HTML"; "do not require JavaScript to reveal indexable copy".
import IICLHero from "./IICLHero.svelte";

// Same glob the client entry uses, so the two can never disagree about which
// component belongs to a page.
const modules = import.meta.glob("./pages/*.svelte", { eager: true });

export const PAGE_COMPONENTS = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [
    path.replace(/^\.\/pages\//, "").replace(/\.svelte$/, ""),
    mod.default,
  ]),
);

export const HOME = IICLHero;
