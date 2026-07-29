<script>
  // Editorial article component for the blog index and any "related reading" block.
  // A large featured piece followed by a card grid. Image-forward, generous spacing,
  // and every card is a real link — the old index listed titles as plain paragraphs
  // with nothing to click.
  let { posts = [], featured = true, heading = '', kicker = '' } = $props();
  // $derived, not const — the blog page swaps `posts` when a category filter is picked.
  const lead = $derived(featured ? posts[0] : null);
  const rest = $derived(featured ? posts.slice(1) : posts);
</script>

<section class="ag">
  {#if heading}
    <header class="ag-head">
      {#if kicker}<span class="ag-kicker mono">{kicker}</span>{/if}
      <h2 class="ag-h2">{heading}</h2>
    </header>
  {/if}

  {#if lead}
    <a class="ag-lead" href={lead.href}>
      <div class="ag-lead-media">
        <img src={lead.img} alt={lead.alt || ''} loading="lazy" />
        <span class="ag-badge mono">Featured</span>
      </div>
      <div class="ag-lead-body">
        <div class="ag-meta">
          <span class="ag-cat mono">{lead.category}</span>
          <span class="ag-dot"></span>
          <span class="ag-time mono">{lead.readTime}</span>
        </div>
        <h3 class="ag-lead-title">{lead.title}</h3>
        <p class="ag-lead-excerpt">{lead.excerpt}</p>
        <span class="ag-go">Read the article <i class="mono">→</i></span>
      </div>
    </a>
  {/if}

  {#if rest.length}
    <div class="ag-grid">
      {#each rest as p, i}
        <a class="ag-card" href={p.href}>
          <div class="ag-card-media">
            <img src={p.img} alt={p.alt || ''} loading="lazy" />
            <span class="ag-num mono">{String(i + (featured ? 2 : 1)).padStart(2, '0')}</span>
          </div>
          <div class="ag-card-body">
            <div class="ag-meta">
              <span class="ag-cat mono">{p.category}</span>
              <span class="ag-dot"></span>
              <span class="ag-time mono">{p.readTime}</span>
            </div>
            <h3 class="ag-card-title">{p.title}</h3>
            <p class="ag-card-excerpt">{p.excerpt}</p>
            <span class="ag-go">Read <i class="mono">→</i></span>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</section>

<style>
  .ag { --red: #ee2f2e; --ink: #16171a; --muted: #55585e; --line: #e6e3de; }
  .ag :global(.mono), .mono { font-family: var(--font-mono); }

  .ag-head { margin: 0 0 40px; }
  .ag-kicker { display: block; font-size: 12px; letter-spacing: .2em; text-transform: uppercase; color: var(--brand-ink); margin-bottom: 14px; }
  .ag-h2 { margin: 0; font-size: clamp(28px, 3.4vw, 42px); line-height: 1.1; letter-spacing: -.025em; font-weight: 600; color: var(--ink); }

  .ag-meta { display: flex; align-items: center; gap: 10px; }
  .ag-cat { font-size: 11px; letter-spacing: .16em; text-transform: uppercase; color: var(--brand-ink); }
  .ag-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--line); }
  .ag-time { font-size: 11px; letter-spacing: .1em; color: var(--muted); }

  .ag-go { display: inline-flex; align-items: center; gap: 9px; margin-top: 18px; font-size: 14.5px; font-weight: 600; color: var(--ink); }
  .ag-go i { font-style: normal; color: var(--brand-ink); transition: transform .28s cubic-bezier(0.22,1,0.36,1); }

  /* ── Featured ── */
  .ag-lead { display: grid; grid-template-columns: 1.15fr 1fr; gap: 48px; align-items: center;
    text-decoration: none; color: inherit; padding-bottom: 52px; margin-bottom: 52px; border-bottom: 1px solid var(--line); }
  .ag-lead-media { position: relative; overflow: hidden; border-radius: 10px; background: #0c0c0c; aspect-ratio: 16/10; }
  .ag-lead-media img { width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform .7s cubic-bezier(0.22,1,0.36,1); }
  .ag-lead:hover .ag-lead-media img { transform: scale(1.05); }
  .ag-badge { position: absolute; top: 14px; left: 14px; background: var(--brand-solid, #d81f1e); color: #fff;
    font-size: 10px; letter-spacing: .18em; text-transform: uppercase; padding: 6px 11px; border-radius: 3px; }
  .ag-lead-title { margin: 16px 0 0; font-size: clamp(24px, 2.9vw, 36px); line-height: 1.16; letter-spacing: -.022em;
    font-weight: 600; color: var(--ink); transition: color .2s; }
  .ag-lead:hover .ag-lead-title { color: var(--brand-ink); }
  .ag-lead:hover .ag-go i { transform: translateX(6px); }
  .ag-lead-excerpt { margin: 14px 0 0; font-size: 16.5px; line-height: 1.65; color: var(--muted); max-width: 52ch; }

  /* ── Card grid ── */
  .ag-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; }
  .ag-card { display: flex; flex-direction: column; text-decoration: none; color: inherit;
    transition: transform .3s cubic-bezier(0.22,1,0.36,1); }
  .ag-card:hover { transform: translateY(-6px); }
  .ag-card-media { position: relative; overflow: hidden; border-radius: 10px; background: #0c0c0c; aspect-ratio: 16/10; }
  .ag-card-media img { width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform .7s cubic-bezier(0.22,1,0.36,1); }
  .ag-card:hover .ag-card-media img { transform: scale(1.07); }
  .ag-card-media::after { content: ''; position: absolute; inset: auto 0 0; height: 3px; background: var(--red);
    transform: scaleX(0); transform-origin: left; transition: transform .42s cubic-bezier(0.22,1,0.36,1); }
  .ag-card:hover .ag-card-media::after { transform: scaleX(1); }
  .ag-num { position: absolute; top: 12px; right: 14px; font-size: 11px; letter-spacing: .16em;
    color: #fff; text-shadow: 0 1px 6px rgba(0,0,0,.8); }
  .ag-card-body { padding: 18px 0 0; }
  .ag-card-title { margin: 14px 0 0; font-size: 20px; line-height: 1.28; letter-spacing: -.012em;
    font-weight: 600; color: var(--ink); transition: color .2s; }
  .ag-card:hover .ag-card-title { color: var(--brand-ink); }
  .ag-card:hover .ag-go i { transform: translateX(6px); }
  .ag-card-excerpt { margin: 11px 0 0; font-size: 15.5px; line-height: 1.6; color: var(--muted); }

  @media (max-width: 900px) {
    .ag-lead { grid-template-columns: 1fr; gap: 26px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ag-card, .ag-card-media img, .ag-lead-media img, .ag-go i, .ag-card-media::after { transition: none; }
    .ag-card:hover { transform: none; }
  }
</style>
