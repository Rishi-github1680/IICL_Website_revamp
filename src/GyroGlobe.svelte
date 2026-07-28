<script>
  import { onMount } from "svelte";
  onMount(() => { import("./gyro-globe.js"); });
</script>

<main class="model-shell">
  <div id="scene" class="scene" role="img" aria-label="Interactive red gyroscope globe with orbital rings"></div>
  <div class="ambient-grid" aria-hidden="true"></div>
  <div class="noise" aria-hidden="true"></div>
  <header class="model-header">
    <a class="wordmark" href="/" aria-label="Back to IICL home">
      <span class="wordmark-dot"></span><strong>IICL</strong><small>GLOBAL NETWORK</small>
    </a>
    <div class="system-status"><i></i> DELIVERY ENGINE ONLINE</div>
  </header>
  <section class="model-copy">
    <p class="overline">MODEL 03 / GLOBAL DELIVERY</p>
    <h1>GYRO<br /><em>GLOBE.</em></h1>
    <p>A particle world held in spinning orbital rings — one connected delivery engine, always in motion.</p>
  </section>
  <div class="interaction-hint"><span>DRAG TO ROTATE</span><span>SCROLL TO ZOOM</span></div>
  <div class="axis axis-x"></div><div class="axis axis-y"></div>
</main>
