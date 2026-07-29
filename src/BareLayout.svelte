<script>
  // Page chrome without a hero. Some pages open on their own full-bleed block — the
  // journal opens on the mirror hall, which carries its own title and lede — and
  // stacking a standard dark hero above that meant two dark blocks before any content.
  //
  // Everything else Layout provides is here: nav, skip link, main landmark, breadcrumb
  // schema, closing CTA band, footer.
  import { onMount } from 'svelte';
  import Nav from './Nav.svelte';
  import Cursor from './Cursor.svelte';
  import Footer from './Footer.svelte';
  import { breadcrumbSchema, jsonLd } from './seo.js';
  import { revealSections } from './fold.js';

  let {
    title = '', path = '', cta = null, ctaHref = '/contactus',
    // Neutral fallback. Every page sets its own — the previous default pitched an AI
    // agent on legal notices, careers and the sitemap alike.
    bandKicker = 'Talk to us',
    bandHeading = 'Tell us what the work looks like today.',
    children,
  } = $props();

  let rootEl;
  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    return revealSections(rootEl);
  });

  const blocks = $derived(jsonLd(
    path ? breadcrumbSchema([{ name: 'Home', href: '/' }, { name: title, href: path }]) : null,
  ));
</script>

<svelte:head>
  {@html blocks ? `<script type="application/ld+json">${blocks}<\/script>` : ''}
</svelte:head>

<div bind:this={rootEl} class="page-root">
  <Cursor />
  <a class="skip-link" href="#main">Skip to main content</a>
  <Nav />

  <main id="main">
    {@render children?.()}
  </main>

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
  :global(.skip-link) { position: absolute; left: 8px; top: -60px; z-index: 200;
    padding: 10px 18px; background: #ee2f2e; color: #fff; text-decoration: none;
    font-size: 14px; font-weight: 600; border-radius: 0 0 6px 6px; transition: top .18s ease; }
  :global(.skip-link:focus) { top: 0; }

  /* No padding-top: .nav-bar is position:sticky, so it occupies normal flow already.
     Adding padding here pushed the nav down and left a white band above it. */
  .page-root { --red: #ee2f2e; --ink: #16171a; --muted: #55585e; --line: #e6e3de;
    background: #fff; color: var(--ink); font-family: var(--font); min-height: 100vh; }
  .page-root :global(.mono) { font-family: var(--font-mono); }
  .page-root :global(.wrap) { max-width: var(--wrap-max); margin: 0 auto; padding: 0 var(--wrap-pad); box-sizing: border-box; }
  .page-root :global(.page-section) { padding: var(--space-section) 0; border-bottom: 1px solid var(--line); }
  .page-root :global(.page-section.shade) { background: #faf9f7; }
  .page-root :global(.section-h) { margin: 0 0 var(--space-head); font-size: var(--fs-h2); line-height: 1.25;
    letter-spacing: -0.02em; font-weight: var(--w-heading); color: var(--ink);
    display: flex; align-items: baseline; gap: 14px; }
  .page-root :global(.section-body) { max-width: 78ch; }
  .page-root :global(.para) { margin: 0 0 11px; font-size: var(--fs-body); font-weight: var(--w-body);
    line-height: 1.72; color: #40434a; }

  .cta-band { background: #0a0a0a; color: #f4f2ee; text-align: center; padding: 56px 0; }
  .cta-kicker { font-size: 10.5px; letter-spacing: .24em; text-transform: uppercase; color: #ff5a4d; }
  .cta-h2 { margin: 16px auto 26px; max-width: 20ch; font-size: var(--fs-h1); line-height: 1.1;
    letter-spacing: -0.02em; font-weight: 600; }
  .cta { display: inline-flex; align-items: center; gap: 10px; background: var(--red); color: #fff;
    text-decoration: none; font-weight: 600; font-size: 16px; padding: 15px 30px; transition: background .2s; }
  .cta:hover { background: #d61f1e; }

  @media (max-width: 560px) {
    .cta, .cta-big { white-space: normal; max-width: 100%; padding: 14px 22px; font-size: 15px; text-align: center; }
  }
</style>
