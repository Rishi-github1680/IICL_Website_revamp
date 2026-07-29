<script>
  // Built from the SAME manifest that generates sitemap.xml, so the HTML sitemap and
  // the machine-readable one cannot disagree. Spec G11 found the old hand-kept list
  // missing Agentic AI, GCC, the journal articles and the use-case pages.
  import Layout from '../Layout.svelte';
  import { PAGES } from '../pages.config.js';
  import { PRODUCTS, INDUSTRIES, TALENT, INSIGHTS } from '../menu.js';

  // Only routes that are actually indexable — the manifest already records which are
  // withheld and why (index / indexNote).
  const live = new Set(
    PAGES.filter((p) => (p.kind === 'home' || p.kind === 'page') && p.index !== false)
      .map((p) => (p.slug === 'index' ? '/' : '/' + p.slug)),
  );
  const keep = (arr) => arr.filter((l) => live.has(l.href.split('#')[0]));

  const GROUPS = [
    { title: 'Enterprise AI Solutions', links: keep([
      { label: 'Enterprise AI & GenAI', href: '/ai-genai-services' },
      { label: 'Agentic AI', href: '/agentic-ai' },
      ...PRODUCTS.filter((p) => !p.disabled),
    ]) },
    { title: 'GCC Technology Teams', links: keep(TALENT) },
    { title: 'Industries', links: keep(INDUSTRIES) },
    { title: 'Insights', links: keep(INSIGHTS) },
    { title: 'Journal', links: keep(
      PAGES.filter((p) => p.slug.startsWith('blog-') && p.index !== false)
        .map((p) => ({ label: p.title.replace(/ \| IICL.*$/, ''), href: '/' + p.slug })),
    ) },
    { title: 'Use cases', links: keep(
      PAGES.filter((p) => p.slug.startsWith('usecase-') && p.index !== false)
        .map((p) => ({ label: p.title.replace(/ \| IICL.*$/, ''), href: '/' + p.slug })),
    ) },
    { title: 'Company', links: keep([
      { label: 'Home', href: '/' },
      { label: 'About IICL', href: '/aboutus' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contract and engagement models', href: '/contracts' },
      { label: 'Contact', href: '/contactus' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
    ]) },
  ].filter((g) => g.links.length);

  // Anything indexable that none of the groups above picked up. Without this the
  // human sitemap silently drifts from sitemap.xml every time a route is added.
  const listed = new Set(GROUPS.flatMap((g) => g.links.map((l) => l.href.split('#')[0])));
  const missed = PAGES
    .filter((p) => (p.kind === 'home' || p.kind === 'page') && p.index !== false)
    .map((p) => ({ label: p.title.replace(/ \| IICL.*$/, '').replace(/ - IICL.*$/, ''),
                   href: p.slug === 'index' ? '/' : '/' + p.slug }))
    .filter((l) => !listed.has(l.href));
  if (missed.length) GROUPS.push({ title: 'Other pages', links: missed });
</script>

<Layout
  kicker="Company"
  h1="Sitemap"
  lede="Every page on this site, in one list."
  path="/sitemap"
  cta="Navigate to a Relevant Page"
  bandKicker="Everything in one list"
  bandHeading="Every indexable page on the IICL website.">
  <section class="page-section">
    <div class="wrap">
      <div class="sm-grid">
        {#each GROUPS as g}
          <div class="sm-col">
            <h2 class="sm-h">{g.title}</h2>
            <ul class="sm-list">
              {#each g.links as l}
                <li>
                  {#if l.disabled}
                    <span class="sm-soon">{l.label} <i>soon</i></span>
                  {:else}
                    <a href={l.href}>{l.label}</a>
                  {/if}
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>
  </section>
</Layout>

<style>
  .sm-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
  .sm-h { margin: 0 0 12px; font-size: 11.5px; font-weight: var(--w-medium); letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--muted); }
  .sm-list { list-style: none; margin: 0; padding: 0; }
  .sm-list li { margin: 0 0 6px; }
  .sm-list a { color: var(--ink); text-decoration: none; font-size: 15px; line-height: 1.6;
    border-bottom: 1px solid transparent; transition: color .18s, border-color .18s; }
  .sm-list a:hover { color: var(--brand-ink); border-bottom-color: var(--brand); }
  .sm-soon { font-size: 15px; color: var(--muted); }
  .sm-soon i { font-style: normal; font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
    color: var(--brand-ink); border: 1px solid color-mix(in srgb, var(--brand) 40%, transparent);
    border-radius: 999px; padding: 1px 6px; margin-left: 4px; }

  @media (max-width: 900px) { .sm-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 520px) { .sm-grid { grid-template-columns: 1fr; } }
</style>
