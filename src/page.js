import { mount } from "svelte";
import "./theme.css";

const modules = import.meta.glob("./pages/*.svelte", { eager: true });
const app = document.getElementById("app");
const key = app.dataset.page;
const found = Object.entries(modules).find(([path]) => path.endsWith("/" + key + ".svelte"));
if (!found) throw new Error("No page component for '" + key + "'");
mount(found[1].default, { target: app });
