<script>
  import { onMount } from "svelte";
  onMount(() => { import("./neural-network.js"); });
</script>

<main class="model-shell">
  <div id="scene" class="scene" role="img" aria-label="Interactive deep learning neural network in red and black"></div>
  <div class="ambient-grid" aria-hidden="true"></div>
  <div class="noise" aria-hidden="true"></div>
  <header class="model-header">
    <a class="wordmark" href="/" aria-label="Back to IICL home">
      <span class="wordmark-dot"></span><strong>IICL</strong><small>LEARNING SYSTEMS</small>
    </a>
    <div class="system-status"><i></i> NETWORK INFERENCE LIVE</div>
  </header>
  <section class="model-copy">
    <p class="overline">MODEL 03 / DISTRIBUTED INTELLIGENCE</p>
    <h1>NEURAL<br /><em>NETWORK.</em></h1>
    <p>Layered intelligence visualized as metallic nodes, adaptive connections and live inference signals moving through depth.</p>
  </section>
  <aside class="telemetry" aria-label="Model telemetry">
    <div><span>ACTIVE NODES</span><b>35</b></div>
    <div><span>SYNAPTIC LINKS</span><b>232</b></div>
    <div><span>INFERENCE STATE</span><b class="accent">LEARNING</b></div>
  </aside>
  <div class="interaction-hint"><span>DRAG TO ROTATE</span><span>SCROLL TO ZOOM</span></div>
  <div class="axis axis-x"></div><div class="axis axis-y"></div>
</main>
