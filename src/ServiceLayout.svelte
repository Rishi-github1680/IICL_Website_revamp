<script>
  // Service pages get their own layout, deliberately different from the industry pages:
  // a split hero with a spec strip, then a two-column body with a sticky numbered index
  // that tracks scroll position. Long service pages were a single undifferentiated column
  // of prose; the index gives them navigable structure (SEO strategy: "add a table of
  // contents and shorter sections").
  import { onMount } from 'svelte';
  import Nav from './Nav.svelte';
  import Cursor from './Cursor.svelte';
  import Footer from './Footer.svelte';
  import { breadcrumbSchema, serviceSchema, faqSchema, jsonLd } from './seo.js';
  import { revealSections } from './fold.js';

  let {
    kicker = 'Service', h1 = '', lede = '', heroImage = null,
    specs = [],            // [{ k, v }] — the strip along the bottom of the hero
    path = '', faqs = null, cta = null, ctaHref = '/contactus',
    // The closing band used to hard-code "Start with one day" and a 1-day-workshop CTA.
    // Spec E section 2 forbids that fixed-duration message on the Agentic AI page, and
    // it was wrong on several others too, so pages now supply their own closing copy.
    bandKicker = 'Start with one process',
    bandHeading = "Bring us one process. We'll show you what an agent does with it.",
    // Pages that still write their own .faq-list markup opt out, so the questions are
    // not rendered twice. New pages should leave this on.
    autoFaq = true,
    children,
  } = $props();

  let rootEl, photoEl, bodyEl;
  let sections = $state([]);   // [{ id, title }]
  let active = $state(0);

  const trail = [{ name: 'Home', href: '/' }, { name: 'Services', href: '/#services' }];
  if (h1 && path) trail.push({ name: h1, href: path });
  const blocks = jsonLd(
    path ? breadcrumbSchema(trail) : null,
    path ? serviceSchema({ name: h1, description: lede, path }) : null,
    faqs && faqs.length ? faqSchema(faqs) : null,
  );

  function goTo(i) {
    // scroll-margin-top on [id] (theme.css) keeps the heading clear of the sticky nav.
    document.getElementById(sections[i].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onMount(() => {
    // Build the index from the section headings the page already renders.
    const nodes = [...bodyEl.querySelectorAll('.page-section')];
    sections = nodes.map((el, i) => {
      const h = el.querySelector('.section-h');
      const title = (h ? h.textContent : `Section ${i + 1}`).trim();
      const id = 'sec-' + (title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || i);
      el.id = id;
      return { id, title };
    });

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Track which section is in view for the index highlight.
    const spy = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        const i = nodes.indexOf(en.target);
        if (i >= 0) active = i;
      }
    }, { rootMargin: '-25% 0px -65% 0px' });
    nodes.forEach((el) => spy.observe(el));

    if (reduced) return () => spy.disconnect();

    const stopReveal = revealSections(bodyEl);

    let raf = 0, ticking = false;
    const apply = () => {
      ticking = false;
      const y = window.scrollY;
      if (y > window.innerHeight || !photoEl) return;
      photoEl.style.transform = `translate3d(0, ${(y * 0.2).toFixed(1)}px, 0) scale(${(1.04 - Math.min(y / 3600, 0.03)).toFixed(4)})`;
    };
    const onScroll = () => { if (!ticking) { ticking = true; raf = requestAnimationFrame(apply); } };
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      spy.disconnect(); stopReveal();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  });
</script>

<svelte:head>
  {@html blocks ? `<script type="application/ld+json">${blocks}<\/script>` : ''}
</svelte:head>

<div bind:this={rootEl} class="svc-root">
  <Cursor />
  <!-- Spec G14: a skip link, and a real <main> landmark for the page content. -->
  <a class="skip-link" href="#main">Skip to main content</a>
  <Nav />

  <header class="svc-hero">
    {#if heroImage}
      <img bind:this={photoEl} class="svc-photo" src={heroImage.img} alt={heroImage.alt} fetchpriority="high" decoding="async" />
    {/if}
    <div class="svc-scrim"></div>
    <div class="svc-hero-inner">
      <a class="svc-kicker" href="/#services"><span class="tick"></span>{kicker}</a>
      <h1 class="svc-h1">{h1}</h1>
      {#if lede}<p class="svc-lede">{lede}</p>{/if}
      <div class="svc-actions">
        <a href={ctaHref} class="cta">{cta || 'Talk to us'} <span class="mono">→</span></a>
        <a href="/#services" class="ghost-light">All services</a>
      </div>
    </div>

    <!-- The spec strip that used to sit here was removed: it read as a row of cards
         wedged under the hero. `specs` is still accepted so the pages keep their data
         and it can be brought back without editing every page. -->

  </header>

  <div bind:this={bodyEl} class="svc-body">
    <aside class="svc-index" aria-label="On this page">
      <div class="idx-inner">
        <p class="idx-title mono">On this page</p>
        <ol>
          {#each sections as s, i}
            <li>
              <button class="idx-btn" class:active={i === active} onclick={() => goTo(i)}>
                <span class="idx-num mono">{String(i + 1).padStart(2, '0')}</span>
                <span class="idx-label">{s.title}</span>
              </button>
            </li>
          {/each}
        </ol>
      </div>
    </aside>

    <main id="main" class="svc-content">
      {@render children?.()}

      <!-- Rendered from the same `faqs` prop that feeds the FAQ structured data, so the
           two cannot diverge (Spec F4: mark up only visible, verified content). -->
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
    </main>
  </div>

  <div class="cta-band">
    <div class="wrap">
      <span class="mono cta-kicker">{bandKicker}</span>
      <h2 class="cta-h2">{bandHeading}</h2>
      <a href={ctaHref} class="cta cta-big">{cta || 'Talk to us'} <span class="mono">→</span></a>
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
  .svc-root { --red: #ee2f2e; --ink: #16171a; --muted: #55585e; --line: #e6e3de;
    /* Service pages keep the pre-48px gutter — the sticky index rail already
       indents the content, so the wider site gutter doubled up here. */
    --wrap-pad: 32px;
    background: #fff; color: var(--ink); font-family: var(--font); min-height: 100vh; }
  .svc-root :global(.mono) { font-family: var(--font-mono); }
  .svc-root :global(.wrap) { max-width: var(--wrap-max); margin: 0 auto; padding: 0 var(--wrap-pad); box-sizing: border-box; }

  .cta { display: inline-flex; align-items: center; gap: 10px; background: var(--red); color: #fff; text-decoration: none;
    font-weight: 600; font-size: 16px; padding: 15px 30px; white-space: nowrap; transition: background .2s; }
  .cta:hover { background: #d61f1e; }
  .ghost-light { display: inline-flex; align-items: center; color: #f4f2ee; text-decoration: none; font-weight: 500;
    font-size: 16px; padding: 14px 30px; border: 1px solid rgba(255,255,255,0.28); transition: border-color .2s, background .2s; }
  .ghost-light:hover { border-color: var(--red); background: rgba(238,47,46,0.12); }

  /* ── Hero: text column left, artwork bleeding right, spec strip along the base ── */
  .svc-hero { position: relative; background: #060606; color: #f4f2ee; overflow: hidden;
    padding: 78px 0 0; min-height: 440px; display: flex; flex-direction: column; justify-content: flex-end; }
  .svc-photo { position: absolute; inset: -6% 0; width: 100%; height: 112%; object-fit: cover; object-position: center 34%;
    transform: scale(1.04); transform-origin: center center; will-change: transform; z-index: 0; }
  .svc-scrim { position: absolute; inset: 0; z-index: 1; pointer-events: none;
    background:
      linear-gradient(90deg, rgba(6,6,6,0.86) 0%, rgba(6,6,6,0.62) 38%, rgba(6,6,6,0.2) 68%, rgba(6,6,6,0.04) 100%),
      linear-gradient(180deg, rgba(6,6,6,0.42) 0%, rgba(6,6,6,0) 24%, rgba(6,6,6,0.5) 100%); }
  .svc-hero-inner { position: relative; z-index: 2; max-width: var(--wrap-max); width: 100%; margin: 0 auto;
    padding: 0 var(--wrap-pad) 40px; box-sizing: border-box; }
  .svc-kicker { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; color: var(--red);
    font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 22px; }
  :global(.tick) { width: 22px; height: 2px; background: var(--red); display: inline-block; }
  .svc-h1 { margin: 0; font-size: var(--fs-h1); line-height: 1.08; letter-spacing: -0.035em;
    font-weight: 600; color: #fff; max-width: 18ch; text-shadow: 0 2px 30px rgba(0,0,0,0.55); }
  .svc-lede { margin: 16px 0 0; max-width: 56ch; font-size: var(--fs-body); line-height: 1.65; color: rgba(244,242,238,0.74); }
  .svc-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 34px; }

  /* ── Body: sticky index rail beside the content column ── */
  .svc-body { max-width: var(--wrap-max); margin: 0 auto; padding: 0 var(--wrap-pad); box-sizing: border-box;
    display: grid; grid-template-columns: 220px 1fr; gap: 44px; align-items: start; }
  .svc-index { position: sticky; top: 84px; padding: 40px 0; }
  .idx-title { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin: 0 0 16px; }
  .svc-index ol { list-style: none; margin: 0; padding: 0; border-left: 1px solid var(--line); }
  .idx-btn { display: flex; gap: 12px; align-items: baseline; width: 100%; text-align: left; background: none;
    border: 0; border-left: 2px solid transparent; margin-left: -1px; padding: 9px 0 9px 16px; cursor: pointer;
    font: inherit; font-size: 14px; line-height: 1.4; color: var(--muted); transition: color .2s, border-color .2s; }
  .idx-btn:hover { color: var(--ink); }
  .idx-btn.active { color: var(--ink); font-weight: 600; border-left-color: var(--red); }
  .idx-num { font-size: 11px; color: var(--red); flex: none; }
  .idx-label { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }

  /* The column stays full width so split sections keep a usable image, but running
     text inside it is capped to a readable measure. */
  .svc-content { padding: 40px 0 8px; min-width: 0; }
  .svc-content :global(.section-body),
  .svc-content :global(.page-section > .wrap > .para),
  .svc-content :global(.page-section > .wrap > .statement) { max-width: 68ch; }
  /* Sections here are a single column with hairline rules — no full-bleed alternating bands. */
  .svc-content :global(.page-section) { padding: 0 0 44px; margin-bottom: 44px; border-bottom: 1px solid var(--line); }
  .svc-content :global(.page-section:last-child) { border-bottom: 0; }
  .svc-content :global(.page-section.shade) { background: none; }
  .svc-content :global(.wrap) { max-width: none; padding: 0; }
  /* Section headings on these pages are often a full sentence, so they are set at
     body-adjacent size — a 27px sentence wrapping to three lines reads as a banner,
     not a heading. */
  .svc-content :global(.section-h) { font-size: var(--fs-h2); font-weight: var(--w-heading); line-height: 1.4;
    letter-spacing: -0.01em; margin: 0 0 12px; gap: 12px; align-items: flex-start; }
  .svc-content :global(.section-h .tick) { margin-top: 12px; }
  .svc-content :global(.para) { font-size: var(--fs-body); line-height: 1.72; }
  .svc-content :global(.list li) { font-size: 15px; line-height: 1.6; }

  .svc-content :global(.page-section.reveal) { opacity: 0; transform: translateY(18px);
    transition: opacity .6s cubic-bezier(0.22, 1, 0.36, 1), transform .6s cubic-bezier(0.22, 1, 0.36, 1); }
  .svc-content :global(.page-section.reveal.is-in) { opacity: 1; transform: none; }

  .cta-band { position: relative; background: #0a0a0a; color: #f4f2ee; padding: 52px 0; text-align: center;
    background-image: linear-gradient(rgba(8,8,8,0.86), rgba(8,8,8,0.94)), url('/img/banners/A1-og-default.png');
    background-size: cover; background-position: center; }
  .cta-kicker { color: var(--red); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; }
  .cta-h2 { margin: 16px auto 26px; max-width: 20ch; font-size: var(--fs-h1); line-height: 1.1;
    letter-spacing: -0.02em; font-weight: 600; }
  .cta-big { padding: 18px 38px; }

  @media (max-width: 1040px) {
    .svc-body { grid-template-columns: 1fr; gap: 0; }
    /* Index becomes a horizontal strip that sticks under the nav. */
    .svc-index { position: sticky; top: 64px; padding: 0; z-index: 20; background: #fff;
      border-bottom: 1px solid var(--line); margin: 0 calc(var(--wrap-pad) * -1);
      /* A grid item defaults to min-width:auto, so the rail grew to fit its own
         content and overflow-x had nothing to clip. This lets it scroll instead. */
      min-width: 0; }
    .idx-inner { overflow-x: auto; padding: 12px var(--wrap-pad); }
    .idx-title { display: none; }
    .svc-index ol { display: flex; gap: 6px; border-left: 0; }
    .idx-btn { width: auto; white-space: nowrap; border-left: 0; border-bottom: 2px solid transparent;
      margin-left: 0; padding: 8px 12px; }
    .idx-btn.active { border-left-color: transparent; border-bottom-color: var(--red); }
    .idx-label { -webkit-line-clamp: 1; max-width: 26ch; }
    .svc-content { padding-top: 40px; }
  }
  @media (max-width: 760px) {
    .svc-h1 { max-width: none; }
    .svc-hero { padding-top: 84px; min-height: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .svc-content :global(.page-section.reveal) { opacity: 1; transform: none; transition: none; }
    .svc-photo { transform: none; }
  }

  /* On a narrow phone the CTA label is wider than the gutter allows, and
     white-space: nowrap turned that into a horizontal scrollbar. Let it wrap. */
  @media (max-width: 560px) {
    .cta, .cta-big { white-space: normal; max-width: 100%; padding: 14px 22px; font-size: 15px; text-align: center; }
  }
</style>
