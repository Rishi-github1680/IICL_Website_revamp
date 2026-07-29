import { hydrate, mount } from "svelte";
import "./theme.css";

const modules = import.meta.glob("./pages/*.svelte", { eager: true });
const app = document.getElementById("app");
const key = app.dataset.page;
const found = Object.entries(modules).find(([path]) => path.endsWith("/" + key + ".svelte"));
if (!found) throw new Error("No page component for '" + key + "'");

// scripts/prerender.mjs puts real markup inside #app at build time, so the normal
// path is hydration — attach to what is already there rather than rebuilding it.
// mount() is the fallback for anything that failed to prerender.
(app.firstChild ? hydrate : mount)(found[1].default, { target: app });
