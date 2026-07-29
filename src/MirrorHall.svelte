<script>
  // "Mirror Hall" — after getlayers.ai's layer of the same name: panels standing in a
  // dark hall, each reflected on a still floor below. Rebuilt in IICL's red-on-black
  // language. Every panel is a real link; the reflection is pure CSS (a flipped copy
  // under a fade), so nothing here costs a second image download.
  //
  // The rail is a native horizontal scroller with scroll-snap. That gives trackpad,
  // touch and keyboard panning for free; a small pointer handler adds click-and-drag
  // for mouse users, who otherwise have no way to pan. There are no arrow buttons —
  // the hall itself is the control.
  import { onMount } from 'svelte';
  import { hpan } from './hscroll.js';

  let { items = [], collection = 'Nº 01', title = '', sub = '', perView = 3,
        // The hall is the page heading when there is no hero above it.
        heading = 'h2', children } = $props();

  let railEl;
  let fit = $state(perView);
  let start = $state(0);           // index of the leftmost fully-visible panel

  const maxStart = $derived(Math.max(0, items.length - fit));

  // One panel + one gap, measured from the live layout rather than assumed.
  const stepPx = () => {
    const first = railEl?.firstElementChild;
    if (!first) return 1;
    const w = first.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(railEl).columnGap || '26') || 26;
    return w + gap;
  };

  const go = (i) => {
    const target = Math.max(0, Math.min(maxStart, i));
    railEl?.scrollTo({ left: target * stepPx(), behavior: 'smooth' });
  };

  onMount(() => {
    const wide = window.matchMedia('(min-width: 1081px)');
    const mid = window.matchMedia('(min-width: 721px)');
    const sync = () => { fit = wide.matches ? perView : mid.matches ? Math.min(2, perView) : 1; };
    sync();
    wide.addEventListener('change', sync);
    mid.addEventListener('change', sync);

    const el = railEl;
    // Keep the dots and counter in step with wherever the rail actually is.
    const onScroll = () => { start = Math.round(el.scrollLeft / stepPx()); };
    el.addEventListener('scroll', onScroll, { passive: true });

    // Mouse users pan with the wheel (see use:hpan below) — no dragging, so a
    // click on a panel is always just a click on the link.
    return () => {
      wide.removeEventListener('change', sync);
      mid.removeEventListener('change', sync);
      el.removeEventListener('scroll', onScroll);
    };
  });
</script>

<div class="mh">
  <header class="mh-head">
    <span class="mh-kicker mono">IICL — Collection {collection}</span>
    <svelte:element this={heading} class="mh-title">{title}</svelte:element>
    {#if sub}<p class="mh-sub">{sub}</p>{/if}
  </header>

  {@render children?.()}

  <div
    bind:this={railEl}
    use:hpan
    class="mh-rail"
    style="--per:{fit};"
  >
    {#each items as it, i (it.href)}
      <div class="mh-item">
        <span class="mh-label mono">{it.category}</span>
        <a class="mh-card" href={it.href} draggable="false" aria-label="{it.title} — {it.readTime}">
          <img src={it.img} alt={it.alt || ''} loading="lazy" draggable="false" />
          <span class="mh-scrim"></span>
          <span class="mh-meta">
            <strong>{it.title}</strong>
            <em class="mono">{it.readTime}</em>
          </span>
        </a>
        <div class="mh-mirror" aria-hidden="true">
          <img src={it.img} alt="" loading="lazy" draggable="false" />
        </div>
        <span class="mh-fade" aria-hidden="true"></span>
        <span class="mh-glow" aria-hidden="true"></span>
        <span class="mh-num mono" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
      </div>
    {/each}
  </div>

  {#if items.length > fit}
    <footer class="mh-foot">
      <span class="mh-dots">
        {#each Array(maxStart + 1) as _, i}
          <button
            class="mh-dot" class:on={i === start}
            onclick={() => go(i)}
            aria-label="Show articles {i + 1} to {Math.min(i + fit, items.length)}"
          ></button>
        {/each}
      </span>
      <span class="mh-hint mono" aria-hidden="true">Move the mouse to explore</span>
    </footer>
    <p class="mh-count mono" aria-live="polite">
      {String(Math.min(start + fit, items.length)).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
    </p>
  {/if}
</div>

<style>
  .mh { --red: #ee2f2e; --ember: #ff8d8b; position: relative; background: #050505; color: #f4f2ee;
    padding: 56px var(--wrap-pad) 40px; overflow: hidden; }
  /* The hall: a faint ceiling glow and a floor that catches red light. */
  .mh::before { content: ''; position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(60% 34% at 50% 0%, rgba(238,47,46,.16), transparent 70%),
      radial-gradient(70% 26% at 50% 78%, rgba(238,47,46,.1), transparent 70%); }
  .mono { font-family: var(--font-mono); }

  .mh-head { position: relative; text-align: center; margin-bottom: 36px; }
  .mh-kicker { display: block; font-size: 10.5px; letter-spacing: .34em; text-transform: uppercase; color: var(--ember); opacity: .85; }
  .mh-title { margin: 18px 0 0; font-size: clamp(34px, 4.6vw, 58px); font-weight: 300; letter-spacing: .01em; color: #fff; }
  .mh-sub { margin: 12px 0 0; font-size: 13.5px; letter-spacing: .06em; color: rgba(244,242,238,.55); }

  /* A native horizontal scroller: panels snap, and exactly `--per` fill the width.
     Percentages in flex-basis resolve against the scroller's own width, not its
     scroll width, so the sizing stays correct at any viewport. */
  .mh-rail { --gap: 26px; position: relative; display: flex; align-items: flex-end; gap: var(--gap);
    /* Proximity, not mandatory: mandatory quantises wheel panning, so a small tick
       either did nothing or jumped a whole panel. This still aligns on settle. */
    overflow-x: auto; overscroll-behavior-x: contain; scroll-snap-type: x proximity;
    scrollbar-width: none; -ms-overflow-style: none; padding: 0 2px 2px; }
  .mh-rail::-webkit-scrollbar { display: none; }

  .mh-item { position: relative; min-width: 0; scroll-snap-align: start;
    flex: 0 0 calc((100% - (var(--per) - 1) * var(--gap)) / var(--per));
    transition: opacity .5s ease, filter .5s ease; }
  .mh-label { display: block; text-align: center; font-size: 10px; letter-spacing: .3em; text-transform: uppercase;
    color: rgba(244,242,238,.62); margin-bottom: 14px; transition: color .3s; }
  .mh-item:hover .mh-label { color: var(--ember); }

  /* Landscape panels — blog cards stay horizontally rectangular. */
  .mh-card { position: relative; display: block; aspect-ratio: 16 / 10; border-radius: 6px; overflow: hidden;
    background: #0b0c0e; border: 1px solid rgba(255,255,255,.1); text-decoration: none;
    transform: translateZ(0); transition: transform .5s cubic-bezier(0.22,1,0.36,1), border-color .3s, box-shadow .5s; }
  .mh-card img { width: 100%; height: 100%; object-fit: cover; display: block; -webkit-user-drag: none; user-select: none;
    transition: transform .8s cubic-bezier(0.22,1,0.36,1); }
  .mh-scrim { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(5,5,5,.14), transparent 34%, transparent 56%, rgba(5,5,5,.92)); }
  .mh-meta { position: absolute; inset: auto 0 0; padding: 18px 18px 16px; display: grid; gap: 6px; }
  .mh-meta strong { font-size: 16.5px; line-height: 1.32; font-weight: 600; color: #fff; letter-spacing: -.01em; }
  .mh-meta em { font-style: normal; font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: var(--ember); }
  .mh-item:hover .mh-card { transform: translateY(-10px); border-color: rgba(238,47,46,.55);
    box-shadow: 0 26px 60px rgba(0,0,0,.6), 0 0 34px rgba(238,47,46,.22); }
  .mh-item:hover .mh-card img { transform: scale(1.05); }
  .mh-card:focus-visible { outline: 2px solid var(--red); outline-offset: 3px; }

  /* The still-water reflection: the same panel, flipped, dimmed, sinking into black. */
  .mh-mirror { height: 100px; margin-top: 2px; border-radius: 6px; overflow: hidden;
    transform: scaleY(-1); opacity: .5; filter: saturate(.85) brightness(.9);
    transition: transform .5s cubic-bezier(0.22,1,0.36,1), opacity .3s; }
  .mh-mirror img { width: 100%; height: 262px; object-fit: cover; object-position: bottom; display: block; }
  .mh-item:hover .mh-mirror { transform: scaleY(-1) translateY(-10px); opacity: .62; }
  .mh-fade { position: absolute; left: 0; right: 0; bottom: 0; height: 102px; pointer-events: none;
    background: linear-gradient(180deg, rgba(5,5,5,.4), #050505 88%); }
  /* Contact glow where the panel meets the floor. */
  .mh-glow { position: absolute; left: 8%; right: 8%; bottom: 88px; height: 26px; pointer-events: none;
    background: radial-gradient(50% 100% at 50% 100%, rgba(238,47,46,.34), transparent 75%);
    filter: blur(6px); opacity: .8; transition: opacity .3s; }
  .mh-item:hover .mh-glow { opacity: 1; }
  .mh-num { position: absolute; top: 38px; right: -6px; font-size: 10px; letter-spacing: .2em; color: rgba(244,242,238,.35); }

  .mh-foot { position: relative; margin-top: 28px; display: flex; align-items: center; justify-content: center; gap: 18px; }
  .mh-hint { font-size: 10px; letter-spacing: .24em; text-transform: uppercase; color: rgba(244,242,238,.4); }
  .mh-dots { display: flex; align-items: center; gap: 7px; }
  .mh-dot { width: 7px; height: 7px; padding: 0; border: 0; border-radius: 50%; cursor: pointer;
    background: rgba(244,242,238,.3); transition: background .25s, width .25s, border-radius .25s; }
  .mh-dot:hover { background: rgba(244,242,238,.6); }
  .mh-dot.on { width: 22px; border-radius: 999px; background: var(--red); }
  .mh-count { position: relative; margin: 12px 0 0; text-align: center;
    font-size: 11px; letter-spacing: .3em; color: rgba(244,242,238,.5); }

  @media (max-width: 720px) {
    .mh { padding: 44px var(--wrap-pad) 32px; }
    .mh-mirror, .mh-fade { display: none; }
    .mh-glow { bottom: -8px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .mh-card, .mh-card img, .mh-mirror, .mh-row, .mh-item { transition: none; }
    .mh-item:hover .mh-card { transform: none; }
  }
</style>
