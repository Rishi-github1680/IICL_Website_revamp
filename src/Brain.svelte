<script>
  import { onMount } from "svelte";
  // Model logic is side-effectful at import; run it once the #scene div exists.
  onMount(() => { import("./brain.js"); });
</script>

<main class="model-shell">
  <div id="scene" class="scene" role="img" aria-label="Interactive red particle AI brain"></div>
  <div class="ambient-grid" aria-hidden="true"></div>
  <div class="noise" aria-hidden="true"></div>
  <header class="model-header">
    <a class="wordmark" href="/" aria-label="Back to IICL home">
      <span class="wordmark-dot"></span><strong>IICL</strong><small>NEURAL SYSTEMS</small>
    </a>
    <div class="system-status"><i></i> COGNITIVE CORE ONLINE</div>
  </header>
  <section class="model-copy">
    <p class="overline">MODEL 01 / SYNTHETIC COGNITION</p>
    <h1>AI<br /><em>BRAIN.</em></h1>
    <p>High-density neural particles form two living hemispheres while signal paths fire across a responsive cognitive field.</p>
  </section>
  <aside class="telemetry" aria-label="Model telemetry">
    <div><span>NEURAL PARTICLES</span><b data-count="brain">18,000</b></div>
    <div><span>SIGNAL PATHS</span><b>1,240</b></div>
    <div><span>COGNITIVE STATE</span><b class="accent">ADAPTIVE</b></div>
  </aside>
  <div class="interaction-hint"><span>DRAG TO ROTATE</span><span>SCROLL TO ZOOM</span></div>
  <div class="axis axis-x"></div><div class="axis axis-y"></div>
</main>
