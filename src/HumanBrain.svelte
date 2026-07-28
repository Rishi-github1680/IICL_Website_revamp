<script>
  import { onMount } from "svelte";
  onMount(() => { import("./human-brain.js"); });
</script>

<main class="model-shell">
  <div id="scene" class="scene" role="img" aria-label="Interactive red particle human brain"></div>
  <div class="ambient-grid" aria-hidden="true"></div>
  <div class="noise" aria-hidden="true"></div>
</main>
