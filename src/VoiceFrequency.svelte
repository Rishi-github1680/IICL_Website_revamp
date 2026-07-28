<script>
  import { onMount } from "svelte";
  onMount(() => { import("./voice-frequency.js"); });
</script>

<main class="model-shell">
  <div id="scene" class="scene" role="img" aria-label="Interactive red 3D voice frequency field"></div>
  <div class="ambient-grid" aria-hidden="true"></div>
  <div class="noise" aria-hidden="true"></div>
</main>
