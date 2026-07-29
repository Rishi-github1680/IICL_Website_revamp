<script>
  // Shared chrome for every content page. Pages pass hero props + their sections as children.
  import { onMount } from 'svelte';
  import Nav from './Nav.svelte';
  import Cursor from './Cursor.svelte';
  import Footer from './Footer.svelte';
  import { HERO_BANNER_DEFAULT } from './menu.js';
  import { breadcrumbSchema, serviceSchema, productSchema, faqSchema, articleSchema, jsonLd } from './seo.js';
  import { revealSections } from './fold.js';
  import { show3D } from './prefs.js';
  import { can3D } from './can3d.js';
  import Backdrop from './Backdrop.svelte';
  import StoryHero from './StoryHero.svelte';
  let {
    kicker = '', h1 = '', lede = '', heroBanner = HERO_BANNER_DEFAULT, heroModel = null,
    // A scroll-driven story world in place of the flat hero — { panels, status, screens }.
    // Used only while models are on; with them off the normal hero (and its image) runs.
    heroStory = null,
    // heroImage = { img, alt }: a real photograph, rendered as an <img> so it stays sharp,
    // carries alt text and can parallax. Falls back to the CSS-background texture.
    heroImage = null,
    // SEO: pages opt into structured data by passing these.
    path = '', schemaType = '', faqs = null, cta = null, ctaHref = '/contactus',
    // The closing band used to hard-code "Start with one day" and a 1-day-workshop CTA.
    // Spec E section 2 forbids that fixed-duration message on the Agentic AI page, and
    // it was wrong on several others too, so pages now supply their own closing copy.
    // Neutral fallback. Every page sets its own — the previous default pitched an AI
    // agent on legal notices, careers and the sitemap alike.
    bandKicker = 'Talk to us',
    bandHeading = 'Tell us what the work looks like today.',
    // Product pages: external product website, rendered as a hero action.
    site = null,
    // Long-form article pages: reading-progress bar + editorial typography.
    article = false,
    // Publication metadata. Without a real date there is no Article markup — a
    // fabricated one is worse than none (Spec G12).
    published = null, updated = null, heroAlt = '',
    // Set false on pages that still write their own FAQ markup.
    autoFaq = false,
    children,
  } = $props();

  // The scene only runs if the page offers one AND the visitor has models on.
  // Zero-network capability check: a device without WebGL, or one on a metered or
  // 2G connection, never requests the Three.js bundle (Spec F7).
  const showModel = $derived(!!heroModel && $show3D && can3D());
  let modelReady = $state(false);

  let rootEl, photoEl, progressEl;

  onMount(() => {
    // A scene reports its first rendered frame; until then the backdrop holds. If it
    // never reports, the backdrop simply stays — a slow or failed 3D fetch degrades
    // to artwork rather than an empty box.
    const onReady = (e) => { if (e.data?.iiclReady) modelReady = true; };
    window.addEventListener('message', onReady);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    // Reveal sections as they enter the viewport.
    const stopReveal = revealSections(rootEl);

    // Hero parallax + article reading progress, batched into one scroll frame.
    if (!photoEl && !progressEl) return () => { window.removeEventListener('message', onReady); stopReveal(); };
    let raf = 0, ticking = false;
    const apply = () => {
      ticking = false;
      const y = window.scrollY;
      if (photoEl && y <= window.innerHeight) {
        photoEl.style.transform = `translate3d(0, ${(y * 0.22).toFixed(1)}px, 0) scale(${(1.04 - Math.min(y / 3400, 0.04)).toFixed(4)})`;
      }
      if (progressEl) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        progressEl.style.transform = `scaleX(${total > 0 ? (y / total).toFixed(4) : 0})`;
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('message', onReady);
      stopReveal();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  });
  const groupHref = { Service: '/#services', Product: '/#products', Industry: '/#industries', Company: '/aboutus', Legal: '/privacy-policy' };

  // Breadcrumb trail: Home › {group} › {this page}.
  // $derived, not module scope: props are reactive, and structured data that captured
  // only their initial values would go stale if one ever changed.
  const trail = $derived.by(() => {
    const t = [{ name: 'Home', href: '/' }];
    if (kicker && groupHref[kicker]) t.push({ name: kicker, href: groupHref[kicker] });
    if (h1 && path) t.push({ name: h1, href: path });
    return t;
  });

  const blocks = $derived(jsonLd(
    path ? breadcrumbSchema(trail) : null,
    schemaType === 'Service' ? serviceSchema({ name: h1, description: lede, path })
      : schemaType === 'Product' ? productSchema({ name: h1, description: lede, path })
      : null,
    faqs && faqs.length ? faqSchema(faqs) : null,
    article
      ? articleSchema({
          headline: h1, description: lede, path,
          image: heroImage?.img, datePublished: published, dateModified: updated,
        })
      : null,
  ));
</script>

<svelte:head>
  {@html blocks ? `<script type="application/ld+json">${blocks}<\/script>` : ''}
</svelte:head>

<div bind:this={rootEl} class="page-root" class:article-flow={article} class:industry={kicker === 'Industry'}>
  {#if article}
    <div class="read-progress" aria-hidden="true"><i bind:this={progressEl}></i></div>
  {/if}
  <!-- Spec G14: a skip link, and a real <main> landmark for the page content. -->
  <a class="skip-link" href="#main">Skip to main content</a>
  <Cursor />
  <Nav />

  {#if heroStory && $show3D}
    <!-- Scroll-driven story world in place of the flat hero. -->
    <StoryHero
      kicker={kicker}
      title={h1}
      lede={lede}
      panels={heroStory.panels}
      status={heroStory.status}
      screens={heroStory.screens}
    >
      <div class="page-hero-actions">
        <a href={ctaHref} class="cta">{cta || 'Talk to us'} <span class="mono">→</span></a>
        <a href="/#products" class="ghost-light">Explore the products</a>
      </div>
    </StoryHero>
  {:else}
  <!-- A page can supply both a 3D scene and a still image. The scene runs when the
       visitor has models switched on; otherwise the image stands in for it, so the
       hero is never empty and the iframe is never created. -->
  <header
    class="page-hero"
    class:has-model={showModel}
    class:has-photo={!!heroImage && !showModel}
    style={heroImage ? '' : `background-image: linear-gradient(90deg, rgba(6,6,6,0.88) 0%, rgba(6,6,6,0.64) 42%, rgba(6,6,6,0.18) 100%), url('${heroBanner}');`}
  >
    {#if showModel}
      <!-- Backdrop underneath, so the hero is never an empty box while the scene
           loads; it fades only once the scene reports its first frame. -->
      <div class="hero-model hero-model-flat" class:is-gone={modelReady} aria-hidden="true"><Backdrop /></div>
      <iframe class="hero-model" src={heroModel} title="Interactive 3D model" loading="lazy" aria-hidden="true"></iframe>
    {:else if heroImage}
      <img bind:this={photoEl} class="hero-photo" src={heroImage.img} alt={heroImage.alt} fetchpriority="high" decoding="async" />
      <div class="hero-scrim"></div>
    {/if}
    <div class="wrap">
      {#if kicker}
        <a class="page-kicker" href={groupHref[kicker] || '/'}><span class="tick"></span>{kicker}</a>
      {/if}
      <h1 class="page-h1">{h1}</h1>
      {#if lede}<p class="page-lede">{lede}</p>{/if}
      <div class="page-hero-actions">
        <a href={ctaHref} class="cta">{cta || 'Talk to us'} <span class="mono">→</span></a>
        {#if site}<a href={site} target="_blank" rel="noopener" class="ghost-light">Visit website <span class="mono">↗</span></a>{/if}
        <a href="/" class="ghost-light">Back to home</a>
      </div>
    </div>
  </header>
  {/if}

  <main id="main">
  {@render children?.()}

  <!-- Rendered from the `faqs` prop, which already feeds the FAQ structured data.
       Pages that still hand-write a .faq-list opt out by passing autoFaq={false}. -->
  {#if autoFaq && faqs && faqs.length}
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

  <div class="cta-band">
    <div class="wrap">
      <span class="mono cta-kicker">{bandKicker}</span>
      <h2 class="cta-h2">{bandHeading}</h2>
      <a href={ctaHref} class="cta cta-big">{cta || 'Talk to us'} <span class="mono">→</span></a>
    </div>
  </div>

  </main>

  <Footer />
</div>

<style>
  /* Off-screen until focused, then a solid, readable target. */
  :global(.skip-link) { position: absolute; left: 8px; top: -60px; z-index: 200;
    padding: 10px 18px; background: var(--brand-solid); color: #fff; text-decoration: none;
    font-size: 14px; font-weight: 600; border-radius: 0 0 6px 6px; transition: top .18s ease; }
  :global(.skip-link:focus) { top: 0; }
  .page-root { --red: #ee2f2e; --ink: #16171a; --muted: #55585e; --line: #e6e3de;
    background: #fff; color: var(--ink); font-family: var(--font); min-height: 100vh; }
  /* Industry pages run their grids tighter to the edge than the rest of the site. */
  /* No industry gutter override: the wider grids it existed for are capped at three
     across now, and it left industry pages starting 16px left of every other page. */
  .page-root :global(.mono) { font-family: var(--font-mono); }
  .page-root :global(.wrap) { max-width: var(--wrap-max); margin: 0 auto; padding: 0 var(--wrap-pad); box-sizing: border-box; }

  .cta { display: inline-flex; align-items: center; gap: 10px; background: var(--brand-solid); color: #fff; text-decoration: none; font-weight: 600; font-size: 16px; padding: 15px 30px; white-space: nowrap; transition: background .2s; }
  .cta:hover { background: #d61f1e; }
  .ghost-light { display: inline-flex; align-items: center; color: #f4f2ee; text-decoration: none; font-weight: 500; font-size: 16px; padding: 14px 30px; border: 1px solid rgba(255,255,255,0.28); transition: border-color .2s, background .2s; }
  .ghost-light:hover { border-color: var(--red); background: rgba(238,47,46,0.12); }

  /* Dark banner hero (A-series texture), text on the left */
  .page-hero { position: relative; padding: 76px 0 62px; background-color: #060606; background-size: cover; background-position: center center; background-repeat: no-repeat; color: #f4f2ee; overflow: hidden; }
  /* Product pages: a live 3D model rides the right side of the hero */
  .page-hero.has-model { min-height: 410px; display: flex; align-items: center; }
  .page-hero.has-model .wrap { position: relative; z-index: 2; width: 100%; }
  .hero-model { position: absolute; top: 0; right: -6%; width: 60%; height: 100%; border: 0; pointer-events: none; z-index: 1;
    -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 22%); mask-image: linear-gradient(90deg, transparent 0, #000 22%); }
  @media (max-width: 860px) { .hero-model { display: none; } .page-hero.has-model { min-height: 0; } }
  .page-hero::after { content: ''; position: absolute; inset: auto 0 0; height: 2px; background: linear-gradient(90deg, var(--red), transparent 60%); z-index: 3; }

  /* Photo hero (industry pages): a real image, kept legible by a scrim that is dense behind
     the text and clears to almost nothing on the right, so the photograph is actually seen. */
  .page-hero.has-photo { min-height: 430px; display: flex; align-items: center; padding: 82px 0 70px; }
  /* The photo is oversized so the parallax drift never exposes an edge, and anchored
     centre so nothing important crops out at any viewport ratio. */
  /* The still stand-in sits under the scene and fades out once it renders. */
  .hero-model-flat { overflow: hidden; transition: opacity .55s ease; }
  .hero-model-flat.is-gone { opacity: 0; }

  .hero-photo { position: absolute; inset: -6% 0; width: 100%; height: 112%; object-fit: cover; object-position: center 34%;
    transform: scale(1.04); transform-origin: center center; will-change: transform; z-index: 0; }
  /* Lighter scrim: dense only behind the headline column, clearing to almost nothing
     across the artwork so the image reads instead of being washed to black. */
  .hero-scrim { position: absolute; inset: 0; z-index: 1; pointer-events: none;
    background:
      linear-gradient(90deg, rgba(6,6,6,0.86) 0%, rgba(6,6,6,0.62) 32%, rgba(6,6,6,0.22) 60%, rgba(6,6,6,0.04) 100%),
      linear-gradient(180deg, rgba(6,6,6,0.4) 0%, rgba(6,6,6,0) 26%, rgba(6,6,6,0.22) 100%); }
  .page-hero.has-photo .wrap { position: relative; z-index: 2; width: 100%; }

  /* ── Article mode: long-form pages read like an essay, not a brochure ── */
  .read-progress { position: fixed; top: 0; left: 0; right: 0; height: 3px; z-index: 70;
    background: rgba(238,47,46,.14); pointer-events: none; }
  .read-progress i { display: block; height: 100%; background: linear-gradient(90deg, #b81c1c, #ee2f2e);
    transform: scaleX(0); transform-origin: left; }
  .article-flow :global(.section-body) { max-width: 66ch; }
  .article-flow :global(.para) { font-size: var(--fs-body); line-height: 1.85; }
  .article-flow :global(.list li) { font-size: 16.5px; line-height: 1.7; }
  /* Drop cap on the opening paragraph — the one flourish that says "article". */
  .article-flow :global(.page-section:first-of-type .section-body .para:first-of-type)::first-letter {
    float: left; font-size: 3.5em; line-height: .82; font-weight: 600; color: var(--brand-ink);
    padding: .04em .12em 0 0; }

  /* Challenge / Opportunity / Why IICL — these ran together as unlabelled paragraphs. */
  :global(.cow) { display: grid; gap: 1px; background: var(--line); border: 1px solid var(--line);
    border-left: 3px solid var(--red); margin: 4px 0 20px; }
  :global(.cow-row) { background: #fff; display: grid; grid-template-columns: 116px 1fr; gap: 20px;
    padding: 18px 22px; align-items: baseline; }
  :global(.cow-k) { font-size: 10.5px; letter-spacing: .16em; text-transform: uppercase; color: var(--brand-ink); }
  :global(.cow-row p) { margin: 0; font-size: 16px; line-height: 1.7; color: #33363c; }
  @media (max-width: 620px) {
    :global(.cow-row) { grid-template-columns: 1fr; gap: 7px; }
  }

  @keyframes faqIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: none; } }

  /* Scroll reveal for content sections. */
  :global(.page-section.reveal) { opacity: 0; transform: translateY(22px);
    transition: opacity .7s cubic-bezier(0.22, 1, 0.36, 1), transform .7s cubic-bezier(0.22, 1, 0.36, 1); }
  :global(.page-section.reveal.is-in) { opacity: 1; transform: none; }
  @media (prefers-reduced-motion: reduce) {
    :global(.page-section.reveal) { opacity: 1; transform: none; transition: none; }
    .hero-photo { transform: none; }
  }
  .page-kicker { display: inline-flex; align-items: center; gap: 10px; text-decoration: none;
    color: var(--brand-ink); font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 16px; }
  :global(.tick) { width: 22px; height: 2px; background: var(--red); display: inline-block; }
  .page-h1 { margin: 0; font-size: var(--fs-h1); line-height: 1.08; letter-spacing: -0.03em; font-weight: var(--w-light); color: #fff; max-width: 28ch; text-wrap: pretty; text-shadow: 0 2px 30px rgba(0,0,0,0.5); }
  .page-lede { margin: 16px 0 0; max-width: 66ch; font-weight: var(--w-light); font-size: var(--fs-body); line-height: 1.65; color: rgba(244,242,238,0.72); }
  .page-hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 26px; }

  /* Sections (white content) */
  :global(.page-section) { padding: var(--space-section) 0; border-bottom: 1px solid var(--line); }

  :global(.page-section.shade) { background: #f7f6f3; }
  :global(.section-h) { margin: 0 0 var(--space-head); font-size: var(--fs-h2); line-height: 1.25; letter-spacing: -0.02em; font-weight: var(--w-heading); color: var(--ink); display: flex; align-items: baseline; gap: 14px; }
  :global(.section-h .tick) { flex: none; margin-top: 14px; }
  :global(.para) { margin: 0 0 11px; font-size: var(--fs-body); font-weight: var(--w-body); line-height: 1.72; color: #40434a; }
  :global(.list) { margin: 6px 0 0; padding: 0; list-style: none; display: grid; gap: 9px; }
  :global(.list li) { position: relative; padding-left: 26px; font-size: 16px; line-height: 1.6; color: #33363c; }
  :global(.list li::before) { content: ''; position: absolute; left: 0; top: 9px; width: 9px; height: 9px; background: var(--red); }

  /* Feature cards (product pages) — nicer than bullets */
  :global(.feature-grid) { list-style: none; margin: 6px 0 0; padding: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--gap-grid); }
  :global(.feature-card) { display: flex; gap: 12px; align-items: flex-start; background: #fff; border: 1px solid var(--line); border-radius: 8px; padding: var(--space-card); font-size: 15px; line-height: 1.6; color: #40434a; box-shadow: var(--shadow-1); transition: transform .2s, box-shadow .2s, border-color .2s; }
  :global(.feature-card:hover) { transform: translateY(-3px); box-shadow: 0 14px 30px rgba(180,20,20,0.24); border-color: #b81c1c; background: #b81c1c; color: #fff; }
  :global(.fc-dot) { flex: none; width: 12px; height: 12px; margin-top: 5px; border-radius: 3px; background: var(--red); box-shadow: 0 0 0 4px rgba(238,47,46,0.12); }
  :global(.feature-card:hover .fc-dot) { background: #fff; box-shadow: 0 0 0 4px rgba(255,255,255,0.25); }
  :global(.split-media .dark-figure img) { background: #0a0a0a; }

  /* Criss-cross split: text one side, framed image the other; .rev flips it */
  :global(.section-split) { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
  :global(.section-split.rev .split-text) { order: 2; }
  :global(.split-text) { max-width: 60ch; }
  :global(.split-media) { position: relative; }
  :global(.split-media figure) { margin: 0; }
  :global(.split-media img) { width: 100%; display: block; border-radius: 8px; border: 1px solid var(--line);
    box-shadow: 0 20px 50px rgba(20,20,25,0.14); transition: transform .3s, box-shadow .3s; }
  :global(.split-media:hover img) { transform: translateY(-6px); box-shadow: 0 30px 70px rgba(20,20,25,0.22); }
  :global(.split-media::before) { content: ''; position: absolute; left: -14px; top: -14px; width: 64px; height: 64px; border-top: 2px solid var(--red); border-left: 2px solid var(--red); border-radius: 4px 0 0 0; }

  /* Non-split content keeps a comfortable measure */
  :global(.section-body) { max-width: 88ch; }

  /* ── Paired section header ──────────────────────────────────────────────
     A heading followed by a short intro and then a full-width grid used to
     stack: the intro stopped at its reading measure and left most of that row
     blank. Where that exact shape occurs, run heading and intro side by side
     and let the grid span underneath. Browsers without :has() just stack, which
     is the old behaviour — nothing breaks. */
  :global(.page-section .wrap:has(> .section-body + .feature-grid)),
  :global(.page-section .wrap:has(> .section-body + .outcomes)),
  :global(.page-section .wrap:has(> .section-body + .list)) {
    display: grid; grid-template-columns: minmax(260px, 0.78fr) minmax(0, 1.22fr);
    column-gap: 44px; align-items: start;
  }
  :global(.page-section .wrap:has(> .section-body + .feature-grid) > .section-h),
  :global(.page-section .wrap:has(> .section-body + .outcomes) > .section-h),
  :global(.page-section .wrap:has(> .section-body + .list) > .section-h) {
    grid-column: 1; grid-row: 1; margin-bottom: 0;
  }
  :global(.page-section .wrap:has(> .section-body + .feature-grid) > .section-body),
  :global(.page-section .wrap:has(> .section-body + .outcomes) > .section-body),
  :global(.page-section .wrap:has(> .section-body + .list) > .section-body) {
    grid-column: 2; grid-row: 1; max-width: none;
  }
  :global(.page-section .wrap:has(> .section-body + .feature-grid) > .feature-grid),
  :global(.page-section .wrap:has(> .section-body + .outcomes) > .outcomes),
  :global(.page-section .wrap:has(> .section-body + .list) > .list) {
    grid-column: 1 / -1; grid-row: 2; margin-top: 16px;
  }
  @media (max-width: 900px) {
    :global(.page-section .wrap:has(> .section-body + .feature-grid)),
    :global(.page-section .wrap:has(> .section-body + .outcomes)),
    :global(.page-section .wrap:has(> .section-body + .list)) { display: block; }
    :global(.page-section .wrap:has(> .section-body + .feature-grid) > .section-h),
    :global(.page-section .wrap:has(> .section-body + .outcomes) > .section-h),
    :global(.page-section .wrap:has(> .section-body + .list) > .section-h) { margin-bottom: var(--space-head); }
  }
  :global(.img-strip) { margin: 16px 0 0; display: flex; flex-wrap: wrap; gap: 22px 34px; align-items: center; }
  :global(.img-strip img) { height: 40px; width: auto; object-fit: contain; opacity: 0.85; }

  .cta-band { position: relative; background: #0a0a0a; color: #f4f2ee; padding: 52px 0; text-align: center;
    background-image: linear-gradient(rgba(8,8,8,0.74), rgba(8,8,8,0.88)), url('/img/banners/A1-og-default.png'); background-size: cover; background-position: center; background-repeat: no-repeat; }
  .cta-kicker { color: var(--brand-ink); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; }
  .cta-h2 { margin: 16px auto 26px; max-width: 30ch; text-wrap: pretty; font-size: var(--fs-h1); line-height: 1.1; letter-spacing: -0.02em; font-weight: 600; }
  .cta-big { padding: 18px 38px; }

  @media (max-width: 860px) {
    :global(.section-split) { grid-template-columns: 1fr; gap: 34px; }
    :global(.section-split.rev .split-text) { order: 0; }
    :global(.split-media::before) { display: none; }
    :global(.feature-grid) { grid-template-columns: 1fr; }
  }
  @media (max-width: 760px) {
    .page-h1 { max-width: none; }
    .page-hero { padding: 72px 0 56px; }
  }

  /* On a narrow phone the CTA label is wider than the gutter allows, and
     white-space: nowrap turned that into a horizontal scrollbar. Let it wrap. */
  @media (max-width: 560px) {
    .cta, .cta-big { white-space: normal; max-width: 100%; padding: 14px 22px; font-size: 15px; text-align: center; }
  }
</style>
