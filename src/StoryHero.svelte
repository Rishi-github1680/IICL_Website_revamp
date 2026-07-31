<script>
  // The Lattice: one persistent Three.js world whose state is driven by scroll — an
  // intelligent system studies a gap, fails at its first bridge, remembers the
  // wreckage, and builds the crossing that holds. Ported from the standalone
  // 3D_Story project (src/story-world.ts is that world, verbatim).
  //
  // Reusable as a hero: the caller supplies its own opening copy and phase panels,
  // so the same world can carry a different story on a different page.
  //
  // With models switched off the world is never fetched and the caller's still
  // image stands in, so nothing here costs anything when it is not wanted.
  import { onMount } from 'svelte';
  import Backdrop from './Backdrop.svelte';
  import { get3D } from './prefs.js';
  import { snapStory } from './scrollsnap.js';

  let {
    kicker = '',
    title = '',
    lede = '',
    // [{ n, h, note, at: [inStart, inEnd, outStart, outEnd] }]
    panels = [],
    // [[progress, message]] — the readout, in scroll order.
    status = [],
    // Screens of scroll the story gets. More = slower, more deliberate.
    screens = 780,
    fallbackImage = null,
    fallbackAlt = '',
    children,
  } = $props();

  const no3D = !get3D();

  let canvas, journeyEl;
  let progress = $state(0);

  // Panels fade over a progress window: [in-start, in-end, out-start, out-end].
  // The caller divides the scroll into one band per step (see the `at` values in
  // aboutus.svelte), so the pacing is identical at every display size — no phone-only
  // re-timing here, which is what kept the story consistent to describe and to test.
  const fade = (p, a, b, c, d) => {
    const s = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
    return Math.min(s((p - a) / (b - a)), 1 - s((p - c) / (d - c)));
  };

  const readout = $derived(
    status.length ? status.reduce((acc, [at, msg]) => (progress >= at ? msg : acc), status[0][1]) : ''
  );

  onMount(() => {
    if (no3D) return;

    let world = null;
    let raf = 0;
    let stopped = false;

    // Dynamic, so Three.js is never fetched when models are off.
    import('./story-world.ts').then(({ createWorld }) => {
      if (stopped || !canvas) return;
      world = createWorld(canvas);

      const tick = () => {
        raf = requestAnimationFrame(tick);
        const vh = window.innerHeight || 1;
        const total = journeyEl.offsetHeight - vh;
        const p = total <= 0 ? 0 : Math.max(0, Math.min(1, (window.scrollY - journeyEl.offsetTop) / total));
        progress = p;
        world.setProgress(p);
      };
      tick();
    });

    const onMove = (e) => {
      world?.setPointer((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    // Settle onto whichever panel is nearest once scrolling stops, so the story never
    // sits frozen between two beats. Stops are the midpoint of each panel's fully-shown
    // window, taken from the same `at` values that drive the fades.
    const stops = panels
      .map((pn) => (Array.isArray(pn.at) ? (pn.at[1] + pn.at[2]) / 2 : null))
      .filter((v) => v != null && v >= 0 && v <= 1);
    // Snapping settles the world on the nearest beat when scrolling stops, on phones
    // too: it is what makes each stage land fully formed instead of leaving the story
    // frozen half-way between two panels.
    const stopSnap = no3D ? () => {} : snapStory(journeyEl, stops);

    return () => {
      stopped = true;
      stopSnap();
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      world?.dispose();
    };
  });
</script>

<!-- The scroll length is a custom property rather than an inline height so the
     reduced-motion rule can collapse the section in CSS. An inline height would
     have needed !important to undo. -->
<section
  class="sh"
  class:is-flat={no3D}
  style:--sh-h={no3D ? null : `${screens}vh`}
  bind:this={journeyEl}
>
  <div class="sh-stage">
    {#if no3D}
      <Backdrop label={fallbackAlt || title} img={fallbackImage} imgAlt={fallbackAlt} />
    {:else}
      <canvas bind:this={canvas} class="sh-canvas"></canvas>
    {/if}
    <div class="sh-vignette"></div>

    <!-- Opening panel. With models off it simply stays put — there is no world
         underneath for it to hand over to. -->
    <div
      class="sh-panel sh-hero"
      style:opacity={no3D ? 1 : fade(progress, -1, 0, 0.06, 0.12)}
      style:visibility={!no3D && progress > 0.13 ? 'hidden' : 'visible'}
    >
      {#if kicker}<div class="sh-eyebrow mono"><span class="tick"></span>{kicker}<span class="tick"></span></div>{/if}
      <h1 class="sh-h1">{title}</h1>
      {#if lede}<p class="sh-lede">{lede}</p>{/if}
      {@render children?.()}
      {#if !no3D}<span class="sh-scroll mono">SCROLL ↓</span>{/if}
    </div>

    {#if !no3D}
      {#each panels as p, i}
        <div
          class="sh-panel sh-line {i % 2 === 0 ? 'left' : 'right'}"
          class:center={i === panels.length - 1}
          style:opacity={fade(progress, ...p.at)}
        >
          {@render stage(p)}
        </div>
      {/each}

      {#if readout}
        <div class="sh-hud mono">
          <span class="sh-hud-dot"></span>
          <span>{readout}</span>
        </div>
      {/if}
    {/if}
  </div>

  <!-- Reduced-motion rendering of the same stages. With motion off the section
       collapses to one screen, so the scroll-driven panels above would never advance
       past the first beat and three of the four steps would be unreachable. This
       carries the same content as a plain list instead. Exactly one of the two is
       ever displayed, so the text is never announced twice. -->
  {#if !no3D && panels.length}
    <ol class="sh-stages">
      {#each panels as p}
        <li class="sh-stages-item">{@render stage(p)}</li>
      {/each}
    </ol>
  {/if}
</section>

{#snippet stage(p)}
  <span class="sh-kicker mono"><span class="tick"></span>{p.n}</span>
  <h2 class="sh-h2">{p.h}</h2>
  <p class="sh-note">{p.note}</p>
{/snippet}

<style>
  .sh { position: relative; background: #050505; height: var(--sh-h, auto); }
  .sh.is-flat { height: 66vh; min-height: 420px; }
  /* The scroll-driven panels are the normal case; the list is the reduced-motion one. */
  .sh-stages { display: none; }
  .sh-stage { position: sticky; top: 0; height: 100vh; min-height: 600px; overflow: hidden; }
  .sh.is-flat .sh-stage { position: relative; height: 100%; min-height: 420px; }
  .sh-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  .sh-vignette { position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(130% 100% at 50% 50%, rgba(0,0,0,0) 60%, rgba(3,3,3,.7) 100%); }

  .sh :global(.mono) { font-family: var(--font-mono); }
  .tick { display: inline-block; width: 26px; height: 2px; background: #ed101d; vertical-align: middle; }

  .sh-panel { position: absolute; pointer-events: none; color: #f4f2ee; }
  .sh-hero { inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 80px var(--wrap-pad) 0; }
  .sh-eyebrow { display: flex; align-items: center; gap: 12px; font-size: 11.5px; letter-spacing: .24em;
    text-transform: uppercase; color: rgba(243,243,244,.66); margin-bottom: 24px; }
  .sh-h1 { margin: 0 0 26px; font-size: var(--fs-h1); line-height: 1.1; letter-spacing: -.03em;
    font-weight: var(--w-light); max-width: 22ch; color: #fff; text-wrap: pretty;
    text-shadow: 0 2px 40px rgba(0,0,0,.8); }
  .sh-lede { margin: 0 0 30px; font-weight: var(--w-light); font-size: var(--fs-body); line-height: 1.65; color: rgba(243,243,244,.7);
    max-width: 54ch; text-wrap: pretty; text-shadow: 0 1px 20px rgba(0,0,0,.9); }
  /* The caller's buttons need to be clickable through the non-interactive panel. */
  .sh-hero :global(a), .sh-hero :global(button) { pointer-events: auto; }
  .sh-scroll { position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%);
    font-size: 11px; letter-spacing: .22em; color: rgba(243,243,244,.45); }

  .sh-line { top: 50%; transform: translateY(-50%); max-width: 420px; }
  .sh-line.left { left: max(var(--wrap-pad), calc(50% - 560px)); }
  .sh-line.right { right: max(var(--wrap-pad), calc(50% - 560px)); text-align: right; }
  .sh-line.center { left: 50%; right: auto; transform: translate(-50%, -50%); text-align: center; max-width: 560px; }
  .sh-kicker { display: inline-flex; align-items: center; gap: 12px; font-size: 11.5px; letter-spacing: .22em;
    text-transform: uppercase; color: rgba(243,243,244,.66); margin-bottom: 12px; }
  .sh-h2 { margin: 0; font-size: var(--fs-h2); line-height: 1.14; letter-spacing: -.02em;
    font-weight: var(--w-body); color: #fff; text-wrap: pretty; text-shadow: 0 2px 30px rgba(0,0,0,.9); }
  .sh-note { margin: 13px 0 0; font-weight: var(--w-light); font-size: 15px; line-height: 1.65; color: rgba(243,243,244,.66);
    max-width: 46ch; text-shadow: 0 1px 18px rgba(0,0,0,.9); }
  .sh-line.right .sh-note { margin-left: auto; }

  .sh-hud { position: absolute; left: var(--wrap-pad); bottom: 24px; display: flex; align-items: center; gap: 10px;
    font-size: 11px; letter-spacing: .18em; color: rgba(243,243,244,.62); background: rgba(5,5,5,.45);
    border: 1px solid rgba(255,255,255,.14); padding: 9px 14px; backdrop-filter: blur(6px); pointer-events: none; }
  .sh-hud-dot { width: 7px; height: 7px; border-radius: 50%; background: #ed101d;
    box-shadow: 0 0 10px rgba(237,16,29,.8); animation: shPulse 1.8s ease infinite; }
  @keyframes shPulse { 50% { opacity: .35; } }

  @media (max-width: 760px) {
    /* The story stays scroll-driven with its stages OVER the world — that is the whole
       point of the section, and text sitting below it means the animation is never
       actually watched. What changes on a phone is the pace: the scroll track is a bit
       over half its desktop length, so four beats are reachable in a few flicks rather
       than a marathon, and each stage anchors to the bottom so the world stays visible
       above it (the same shape the homepage journey uses). */
    /* Same length as every other display — the caller sets one scroll per step, so a
       phone-only multiplier would give phones a different number of scrolls. */
    /* The opening panel centres its children, so the caller's action buttons sat at
       their label width instead of on the page's 24px rail like every other button. */
    .sh-hero :global(.page-hero-actions) { align-self: stretch; width: 100%; }
    .sh-line { top: auto; bottom: 15vh; transform: none; max-width: none; }
    .sh-line.left, .sh-line.right { left: var(--wrap-pad); right: var(--wrap-pad); text-align: left; }
    .sh-line.center { left: var(--wrap-pad); right: var(--wrap-pad); transform: none; text-align: left; }
    .sh-line.right .sh-note { margin-left: 0; }
    .sh-note { max-width: none; }
    /* A scrim under the text instead of dimming the artwork, so the world can play at
       full strength and the copy still holds contrast over whatever is behind it. */
    .sh-stage::after { content: ''; position: absolute; inset: auto 0 0; height: 62%; pointer-events: none;
      background: linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(5,5,5,.72) 55%, rgba(5,5,5,.92) 100%); }
    .sh-panel { z-index: 1; }
    .sh-hud { left: var(--wrap-pad); right: var(--wrap-pad); }
  }
  @media (prefers-reduced-motion: reduce) {
    .sh-hud-dot { animation: none; }
    /* No scroll track, so the overlaid panels would never advance past the first beat
       and three of the four stages would be unreachable. The static list carries the
       same content instead — the one case where reading beats watching. */
    .sh { height: 100vh !important; }
    .sh-line, .sh-scroll { display: none; }
    .sh-stage::after { display: none; }
    .sh-stages { display: grid; gap: 0; list-style: none; margin: 0; padding: 0; }
    .sh-stages-item { padding: 24px var(--wrap-pad); border-top: 1px solid rgba(255,255,255,.1); }
    .sh-stages-item:first-child { border-top: 0; }
    .sh-stages .sh-kicker { margin-bottom: 10px; }
    .sh-stages .sh-h2, .sh-stages .sh-note { text-shadow: none; max-width: none; }
    .sh-stages .sh-note { margin-top: 10px; }
  }
</style>
