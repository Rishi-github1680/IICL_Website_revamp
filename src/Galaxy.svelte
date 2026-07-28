<script>
  import { onMount } from "svelte";
  onMount(() => { import("./galaxy.js"); });
</script>

<main class="model-shell">
  <div id="scene" class="scene" role="img" aria-label="Red spiral particle galaxy with eight bright product stars"></div>
  <div class="ambient-grid" aria-hidden="true"></div>
  <div class="noise" aria-hidden="true"></div>
  <header class="model-header">
    <a class="wordmark" href="/" aria-label="Back to IICL home">
      <span class="wordmark-dot"></span><strong>IICL</strong><small>AT SCALE</small>
    </a>
    <div class="system-status"><i></i> PRODUCTION CONSTELLATION LIVE</div>
  </header>
  <section class="model-copy">
    <p class="overline">MODEL 04 / PRODUCT CONSTELLATION</p>
    <h1>PRODUCT<br /><em>GALAXY.</em></h1>
    <p>Eight product stars turning through a spiral of red particles — nine industries, one system in motion.</p>
  </section>
  <div class="interaction-hint"><span>DRAG TO ROTATE</span><span>SCROLL TO ZOOM</span></div>
  <div class="axis axis-x"></div><div class="axis axis-y"></div>
</main>
