<script>
  import { onMount } from "svelte";
  onMount(() => { import("./microchip.js"); });
</script>

<main class="model-shell">
  <div id="scene" class="scene" role="img" aria-label="Interactive premium red and black AI microchip"></div>
  <div class="ambient-grid" aria-hidden="true"></div>
  <div class="noise" aria-hidden="true"></div>
  <header class="model-header">
    <a class="wordmark" href="/" aria-label="Back to IICL home">
      <span class="wordmark-dot"></span><strong>IICL</strong><small>COMPUTE SYSTEMS</small>
    </a>
    <div class="system-status"><i></i> PROCESSOR CORE ACTIVE</div>
  </header>
  <section class="model-copy">
    <p class="overline">MODEL 02 / INTELLIGENT COMPUTE</p>
    <h1>AI<br /><em>MICROCHIP.</em></h1>
    <p>A precision-built compute core with luminous circuit paths, signal pulses and a cinematic metallic finish.</p>
  </section>
  <aside class="telemetry" aria-label="Model telemetry">
    <div><span>NEURAL CORES</span><b>128</b></div>
    <div><span>ACTIVE CHANNELS</span><b>64</b></div>
    <div><span>PROCESSING STATE</span><b class="accent">ACCELERATED</b></div>
  </aside>
  <div class="interaction-hint"><span>DRAG TO ROTATE</span><span>SCROLL TO ZOOM</span></div>
  <div class="axis axis-x"></div><div class="axis axis-y"></div>
</main>
