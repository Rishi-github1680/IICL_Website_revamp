<script>
  import { onMount } from "svelte";
  onMount(() => { import("./globe.js"); });
</script>

<main class="model-shell">
  <div id="scene" class="scene" role="img" aria-label="Interactive global network 3D model in red and black"></div>
  <div class="ambient-grid" aria-hidden="true"></div>
  <div class="noise" aria-hidden="true"></div>
  <header class="model-header">
    <a class="wordmark" href="/" aria-label="Back to IICL home">
      <span class="wordmark-dot"></span><strong>IICL</strong><small>NETWORK SYSTEMS</small>
    </a>
    <div class="system-status"><i></i> GLOBAL MESH ONLINE</div>
  </header>
  <section class="model-copy">
    <p class="overline">MODEL 04 / GLOBAL INTELLIGENCE</p>
    <h1>GLOBAL<br /><em>NETWORK.</em></h1>
    <p>A living globe of red intelligence nodes linked by luminous arcs and live signal pulses spanning two continents.</p>
  </section>
  <aside class="telemetry" aria-label="Model telemetry">
    <div><span>NETWORK NODES</span><b>28</b></div>
    <div><span>ACTIVE ROUTES</span><b>42</b></div>
    <div><span>MESH STATE</span><b class="accent">CONNECTED</b></div>
  </aside>
  <div class="interaction-hint"><span>DRAG TO ROTATE</span><span>SCROLL TO ZOOM</span></div>
  <div class="axis axis-x"></div><div class="axis axis-y"></div>
</main>
