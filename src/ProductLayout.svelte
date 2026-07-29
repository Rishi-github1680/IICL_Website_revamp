<script>
  // Product detail pages. Split out of Layout.svelte because products need things
  // industry pages don't: the brand accent, a spec strip, a link to the product's own
  // site, and a rail of sibling products. Accent/site/siblings are all read from
  // PRODUCTS in menu.js by `path`, so a page never has to repeat them.
  import { onMount } from 'svelte';
  import Nav from './Nav.svelte';
  import Cursor from './Cursor.svelte';
  import Footer from './Footer.svelte';
  import { PRODUCTS } from './menu.js';
  import { revealSections } from './fold.js';
  import { show3D } from './prefs.js';
  import { can3D } from './can3d.js';
  import Backdrop from './Backdrop.svelte';
  import { breadcrumbSchema, productSchema, faqSchema, jsonLd } from './seo.js';

  let {
    h1 = '', lede = '', heroModel = null, heroBanner = null, path = '',
    specs = [],              // [{ k, v }] — the strip along the base of the hero
    faqs = null, cta = null, ctaHref = '/contactus',
    children,
  } = $props();

  const me = PRODUCTS.find((p) => p.href === path) || {};
  const accent = me.acc || '#ee2f2e';
  // Four fits one row; a full eight-card rail is longer than the page it sits under.
  const siblings = PRODUCTS.filter((p) => p.href !== path && !p.soon).slice(0, 4);

  let rootEl, bodyEl;

  // Zero-network capability check: a device without WebGL, or one on a metered or 2G
  // connection, never requests the Three.js bundle at all (Spec F7).
  const canModel = $derived(!!heroModel && $show3D && can3D());
  // The backdrop under the scene holds until the scene reports its first frame.
  let modelReady = $state(false);

  onMount(() => {
    // A scene reports its first rendered frame; until then the backdrop holds. If it
    // never reports, the backdrop simply stays — a slow or failed 3D fetch degrades
    // to artwork rather than an empty box.
    const onReady = (e) => { if (e.data?.iiclReady) modelReady = true; };
    window.addEventListener('message', onReady);

    const stop = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? () => {}
      : revealSections(bodyEl);
    return () => { window.removeEventListener('message', onReady); stop(); };
  });

  const trail = [{ name: 'Home', href: '/' }, { name: 'AI Solutions', href: '/#products' }];
  if (h1 && path) trail.push({ name: h1, href: path });
  const blocks = jsonLd(
    path ? breadcrumbSchema(trail) : null,
    path ? productSchema({ name: h1, description: lede, path }) : null,
    faqs && faqs.length ? faqSchema(faqs) : null,
  );
</script>

<svelte:head>
  {@html blocks ? `<script type="application/ld+json">${blocks}<\/script>` : ''}
</svelte:head>

<div bind:this={rootEl} class="pr-root" style="--acc:{accent};">
  <Cursor />
  <!-- Spec G14: a skip link, and a real <main> landmark for the page content. -->
  <a class="skip-link" href="#main">Skip to main content</a>
  <Nav />

  <header class="pr-hero" style={heroBanner ? `background-image:url('${heroBanner}');` : ''}>
    <div class="pr-glow" aria-hidden="true"></div>
    {#if heroModel}
      <!-- The backdrop is the base layer and is always drawn first, so the hero is
           never an empty box while the scene loads. It fades once the scene reports
           its first rendered frame; if that never comes, it simply stays. -->
      <div class="pr-model pr-model-flat" class:is-gone={modelReady} aria-hidden="true"><Backdrop /></div>
      {#if canModel}
        <iframe class="pr-model" src={heroModel} title="Interactive 3D model" loading="lazy" aria-hidden="true"></iframe>
      {/if}
    {/if}
    <div class="pr-scrim" aria-hidden="true"></div>

    <div class="pr-hero-inner">
      <a class="pr-kicker" href="/#products"><span class="pr-tick"></span>{me.tag || 'Product'}</a>
      <h1 class="pr-h1">{h1}</h1>
      {#if lede}<p class="pr-lede">{lede}</p>{/if}
      <div class="pr-actions">
        <a href={ctaHref} class="pr-cta">{cta || 'Book a demo'} <span class="mono">→</span></a>
        {#if me.site}
          <a href={me.site} target="_blank" rel="noopener" class="pr-ghost">
            Visit {me.label} <span class="mono">↗</span>
          </a>
        {/if}
      </div>
    </div>

    <!-- The spec strip that used to sit here was removed: it read as a row of cards
         wedged under the hero. `specs` is still accepted so the pages keep their data
         and it can be brought back without editing every page. -->

  </header>

  <main id="main" bind:this={bodyEl} class="pr-body">
    {@render children?.()}

    <!-- Rendered from the `faqs` prop, which already feeds the FAQ structured data.
         Pages used to repeat the same Q&A as markup, so the two could drift apart. -->
    {#if faqs && faqs.length}
      <section class="page-section faq-section">
        <div class="wrap">
          <h2 class="section-h"><span class="tick"></span>Common questions</h2>
          <div class="faq-list">
            {#each faqs as f}
              <details class="faq-item" name="faq">
                <summary class="faq-q">{f.q}<span class="faq-mark" aria-hidden="true"></span></summary>
                <div class="faq-a"><p class="para">{f.a}</p></div>
              </details>
            {/each}
          </div>
        </div>
      </section>
    {/if}
  </main>

  <!-- Sibling products: the old pages faked this with dot-bullet "feature cards"
       that were really just links. -->
  <section class="pr-more">
    <div class="wrap">
      <h2 class="pr-more-h">The rest of the suite</h2>
      <div class="pr-more-row">
        {#each siblings as s}
          <a class="pr-more-card" href={s.href} style="--acc:{s.acc};">
            <span class="mono pr-more-tag">{s.tag}</span>
            <span class="pr-more-name">{s.label}</span>
            <span class="pr-more-desc">{s.desc}</span>
          </a>
        {/each}
      </div>
    </div>
  </section>

  <div class="pr-band">
    <div class="wrap">
      <span class="mono pr-band-kicker">Start with one process</span>
      <h2 class="pr-band-h">See {me.label || h1} run against something you actually do.</h2>
      <a href={ctaHref} class="pr-cta pr-cta-big">{cta || 'Book a demo'} <span class="mono">→</span></a>
    </div>
  </div>

  <Footer />
</div>

<style>
  /* Off-screen until focused, then a solid, readable target. */
  :global(.skip-link) { position: absolute; left: 8px; top: -60px; z-index: 200;
    padding: 10px 18px; background: #ee2f2e; color: #fff; text-decoration: none;
    font-size: 14px; font-weight: 600; border-radius: 0 0 6px 6px; transition: top .18s ease; }
  :global(.skip-link:focus) { top: 0; }
  .pr-root { --ink: #16171a; --muted: #55585e; --line: #e6e3de;
    background: #fff; color: var(--ink); font-family: var(--font); min-height: 100vh; }
  .pr-root :global(.mono) { font-family: var(--font-mono); }
  .pr-root :global(.wrap) { max-width: var(--wrap-max); margin: 0 auto; padding: 0 var(--wrap-pad); box-sizing: border-box; }

  /* ── Hero ── */
  .pr-hero { position: relative; background: #08090b center / cover no-repeat; color: #f4f2ee;
    overflow: hidden; padding: 78px 0 0; display: flex; flex-direction: column; justify-content: flex-end; min-height: 430px; }
  /* The product's own colour, once, as light — not as a red wash over everything. */
  .pr-glow { position: absolute; top: -30%; right: -10%; width: 70%; height: 130%; pointer-events: none;
    background: radial-gradient(closest-side, color-mix(in srgb, var(--acc) 34%, transparent), transparent 72%); }
  /* The still stand-in sits under the scene and fades out once it renders. */
  .pr-model-flat { overflow: hidden; transition: opacity .55s ease; }
  .pr-model-flat.is-gone { opacity: 0; }
  .pr-model { position: absolute; top: 0; right: -4%; width: 56%; height: 100%; border: 0; pointer-events: none;
    -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 26%); mask-image: linear-gradient(90deg, transparent 0, #000 26%); }
  .pr-scrim { position: absolute; inset: 0; pointer-events: none;
    background: linear-gradient(90deg, rgba(8,9,11,0.88) 0%, rgba(8,9,11,0.66) 40%, rgba(8,9,11,0.2) 74%, rgba(8,9,11,0.04) 100%); }
  .pr-hero-inner { position: relative; z-index: 2; max-width: var(--wrap-max); width: 100%; margin: 0 auto;
    padding: 0 var(--wrap-pad) 40px; box-sizing: border-box; }

  .pr-kicker { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; color: var(--acc);
    font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 20px; }
  .pr-tick { width: 22px; height: 2px; background: var(--acc); display: inline-block; }
  .pr-h1 { margin: 0; font-size: var(--fs-h1); line-height: 1.08; letter-spacing: -0.035em;
    font-weight: 600; color: #fff; max-width: 17ch; }
  .pr-lede { margin: 16px 0 0; max-width: 54ch; font-size: var(--fs-body); line-height: 1.65; color: rgba(244,242,238,0.74); }
  .pr-actions { display: flex; flex-wrap: wrap; gap: 13px; margin-top: 32px; }

  .pr-cta { display: inline-flex; align-items: center; gap: 10px; background: var(--acc); color: #fff;
    text-decoration: none; font-weight: 600; font-size: 16px; padding: 15px 30px; transition: filter .2s, transform .2s; }
  .pr-cta:hover { filter: brightness(0.88); transform: translateY(-1px); }
  .pr-ghost { display: inline-flex; align-items: center; gap: 8px; color: #f4f2ee; text-decoration: none;
    font-weight: 500; font-size: 16px; padding: 14px 26px; border: 1px solid rgba(255,255,255,0.3);
    transition: border-color .2s, background .2s; }
  .pr-ghost:hover { border-color: var(--acc); background: color-mix(in srgb, var(--acc) 16%, transparent); }

  /* ── Body ──
     Narrower than the hero on purpose: at 1080px a 700px text block left a third of
     the row empty, which read as an unfinished page rather than as breathing room. */
  /* Same rail as every other content page — the old 1120px cap inset this body
     further than the rest of the site, which read as extra padding. */
  .pr-body { max-width: var(--wrap-max); margin: 0 auto; padding: 0 var(--wrap-pad); box-sizing: border-box; }

  /* .outcomes lives in theme.css and picks up this page's --acc automatically. */
  .pr-body :global(.page-section) { padding: var(--space-section) 0; border-bottom: 1px solid var(--line); }
  .pr-body :global(.page-section:last-child) { border-bottom: 0; }
  .pr-body :global(.page-section.shade) { background: none; }
  .pr-body :global(.wrap) { max-width: none; padding: 0; }
  .pr-body :global(.section-h) { margin: 0 0 var(--space-head); font-size: var(--fs-h2); line-height: 1.25;
    letter-spacing: -0.02em; font-weight: var(--w-heading); color: var(--ink); display: flex; align-items: baseline; gap: 13px; }
  .pr-body :global(.section-h .tick) { flex: none; width: 22px; height: 2px; background: var(--acc); margin-top: 12px; }
  .pr-body :global(.para) { margin: 0 0 11px; font-size: var(--fs-body); font-weight: var(--w-body); line-height: 1.72; color: #40434a; }
  .pr-body :global(.section-body) { max-width: none; }
  .pr-body :global(.list) { margin: 8px 0 0; padding: 0; list-style: none; display: grid; gap: 11px; }
  .pr-body :global(.list li) { position: relative; padding-left: 24px; font-size: 16px; line-height: 1.6; color: #33363c; }
  .pr-body :global(.list li::before) { content: ''; position: absolute; left: 0; top: 9px; width: 8px; height: 8px; background: var(--acc); }

  /* Capability tiles. The old cards flooded to solid red on hover and swallowed the
     text; these keep the accent as an edge and stay readable. */
  .pr-body :global(.feature-grid) { list-style: none; margin: 6px 0 0; padding: 0;
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .pr-body :global(.feature-card) { display: flex; gap: 12px; align-items: flex-start; background: #fbfaf8;
    border: 1px solid var(--line); border-left: 2px solid var(--acc); border-radius: 0 6px 6px 0;
    padding: 16px 18px; font-size: 15.5px; line-height: 1.55; color: #33363c;
    transition: background .2s, transform .2s; }
  .pr-body :global(.feature-card:hover) { background: #fff; transform: translateX(3px); }
  .pr-body :global(.fc-dot) { flex: none; width: 7px; height: 7px; margin-top: 7px; border-radius: 50%; background: var(--acc); }

  .pr-body :global(.section-split) { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
  .pr-body :global(.section-split.rev .split-text) { order: 2; }
  .pr-body :global(.split-text) { max-width: 60ch; }
  .pr-body :global(.split-media figure) { margin: 0; }
  .pr-body :global(.split-media img) { width: 100%; display: block; border-radius: 8px; border: 1px solid var(--line);
    box-shadow: 0 18px 44px rgba(20,20,25,0.13); }

  .pr-body :global(.page-section.reveal) { opacity: 0; transform: translateY(16px);
    transition: opacity .6s cubic-bezier(0.22,1,0.36,1), transform .6s cubic-bezier(0.22,1,0.36,1); }
  .pr-body :global(.page-section.reveal.is-in) { opacity: 1; transform: none; }

  /* ── Sibling products ── */
  .pr-more { background: #f7f6f3; border-top: 1px solid var(--line); padding: 56px 0 60px; }
  .pr-more-h { margin: 0 0 26px; font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--muted); font-weight: 600; }
  .pr-more-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .pr-more-card { display: grid; gap: 7px; align-content: start; text-decoration: none; background: #fff;
    border: 1px solid var(--line); border-top: 2px solid var(--acc); padding: 18px 18px 20px; color: var(--ink);
    transition: transform .2s, box-shadow .2s; }
  .pr-more-card:hover { transform: translateY(-4px); box-shadow: 0 16px 34px rgba(20,20,25,0.13); }
  .pr-more-tag { font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--acc); }
  .pr-more-name { font-size: 17px; font-weight: 600; letter-spacing: -0.01em; }
  .pr-more-desc { font-size: 13.5px; line-height: 1.5; color: var(--muted); }

  /* ── Closing band ── */
  .pr-band { background: #0a0b0d; color: #f4f2ee; padding: 66px 0; text-align: center; }
  .pr-band-kicker { color: var(--acc); font-size: 11.5px; letter-spacing: 0.18em; text-transform: uppercase; }
  .pr-band-h { margin: 16px auto 28px; max-width: 22ch; font-size: clamp(26px, 3.4vw, 40px); line-height: 1.12;
    letter-spacing: -0.02em; font-weight: 600; }
  .pr-cta-big { padding: 17px 36px; }

  @media (max-width: 980px) {
    .pr-more-row { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 860px) {
    .pr-model { display: none; }
    .pr-body :global(.section-split) { grid-template-columns: 1fr; gap: 30px; }
    .pr-body :global(.section-split.rev .split-text) { order: 0; }
    .pr-body :global(.feature-grid) { grid-template-columns: 1fr; }
  }
  @media (max-width: 720px) {
    .pr-hero { padding-top: 84px; min-height: 0; }
    .pr-h1 { max-width: none; }
    .pr-hero-inner { padding: 0 var(--wrap-pad) 32px; }
    .pr-body { padding: 0 var(--wrap-pad); }
    .pr-more-row { grid-template-columns: 1fr; }
    .pr-actions { flex-direction: column; align-items: stretch; }
    .pr-cta, .pr-ghost { justify-content: center; }
  }
  @media (prefers-reduced-motion: reduce) {
    .pr-body :global(.page-section.reveal) { opacity: 1; transform: none; transition: none; }
  }

  /* On a narrow phone the CTA label is wider than the gutter allows, and
     white-space: nowrap turned that into a horizontal scrollbar. Let it wrap. */
  @media (max-width: 560px) {
    .cta, .cta-big { white-space: normal; max-width: 100%; padding: 14px 22px; font-size: 15px; text-align: center; }
  }
</style>
