<script>
  import { MENU } from './menu.js';
  let mobileOpen = $state(false);
  let openIdx = $state(-1);
  const toggle = (i) => { openIdx = openIdx === i ? -1 : i; };
  const close = () => { openIdx = -1; mobileOpen = false; };
  // Escape closes the panel and returns focus to the control that opened it, rather
  // than stranding it at the top of the document (Spec G14: keyboard-safe dismissal).
  const onEscape = () => {
    const i = openIdx;
    close();
    if (i >= 0) document.getElementById('navtrig-' + i)?.focus();
  };
  const onWindowClick = (e) => { if (!e.target.closest('.nav-group')) openIdx = -1; };

  // iicl.in groups its AI Solutions menu into two titled columns.
  const INDUSTRY_SOL = ['iCognito.ai', 'iDental.ai', 'LexGenie.ai'];
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && onEscape()} on:click={onWindowClick} />

<div class="nav-bar">
  <div class="nav-inner">
    <a href="/" class="brand" onclick={close}>
      <img class="brand-logo" src="/iicl_logo.png" alt="IICL" loading="lazy" decoding="async" />
    </a>

    <button class="hamburger" class:on={mobileOpen} aria-label="Menu" aria-expanded={mobileOpen} onclick={() => (mobileOpen = !mobileOpen)}>
      <span></span><span></span><span></span>
    </button>

    <nav class="nav-links" class:open={mobileOpen}>
      {#each MENU as item, i}
        {#if item.items || item.cols || item.mega === 'promo'}
          <div class="nav-group" class:active={openIdx === i} class:is-mega={!!item.mega}>
            <button
              class="nav-link nav-trigger"
              id="navtrig-{i}"
              aria-haspopup="true"
              aria-expanded={openIdx === i}
              aria-controls="navmenu-{i}"
              onclick={() => toggle(i)}
            >
              {item.label}<span class="caret" aria-hidden="true">▾</span>
            </button>

            {#if item.mega === 'promo'}
              <div class="dropdown mega mega-promo" id="navmenu-{i}" role="group" aria-labelledby="navtrig-{i}">
                <a href={item.highlight.href} class="mm-highlight" onclick={close}>
                  <img src={item.highlight.img} alt={item.highlight.title} loading="lazy" decoding="async" />
                  <span class="mm-h5">{item.highlight.title}</span>
                  <span class="mm-p">{item.highlight.text}</span>
                </a>
              </div>
            {:else if item.mega === 'products'}
              <!-- No image: the products are the content. Each row carries the product's
                   own accent dot and a one-line description, so the panel explains itself. -->
              <div class="dropdown mega mega-products" id="navmenu-{i}" role="group" aria-labelledby="navtrig-{i}">
                {#if item.services}
                  <div class="mm-col">
                    <span class="mm-h4">Services</span>
                    {#each item.services as svc}
                      <a href={svc.href} class="mm-item mm-item-svc" onclick={close}>
                        <span class="mm-name">{svc.label}</span>
                      </a>
                    {/each}
                  </div>
                {/if}
                <div class="mm-col">
                  <span class="mm-h4">Industry Solutions</span>
                  {#each item.items.filter((p) => INDUSTRY_SOL.includes(p.label)) as sub}
                    <svelte:element
                      this={sub.disabled ? 'span' : 'a'}
                      href={sub.disabled ? undefined : sub.href}
                      class="mm-item"
                      class:is-disabled={sub.disabled}
                      aria-disabled={sub.disabled ? 'true' : undefined}
                      onclick={sub.disabled ? undefined : close}
                    >
                      {#if sub.logo}
                        <span class="mm-logo" style="--mark:url('{sub.logo}'); --tone:{sub.acc}"></span>
                      {:else}
                        <span class="mm-dot" style="--dot:{sub.acc}"></span>
                      {/if}
                      <span class="mm-body">
                        <span class="mm-name">{sub.label}{#if sub.soon}<i class="mm-soon">Soon</i>{/if}</span>
                        {#if sub.desc}<span class="mm-desc">{sub.desc}</span>{/if}
                      </span>
                    </svelte:element>
                  {/each}
                </div>
                <div class="mm-col">
                  <span class="mm-h4">Business Solutions</span>
                  {#each item.items.filter((p) => !INDUSTRY_SOL.includes(p.label)) as sub}
                    <svelte:element
                      this={sub.disabled ? 'span' : 'a'}
                      href={sub.disabled ? undefined : sub.href}
                      class="mm-item"
                      class:is-disabled={sub.disabled}
                      aria-disabled={sub.disabled ? 'true' : undefined}
                      onclick={sub.disabled ? undefined : close}
                    >
                      {#if sub.logo}
                        <span class="mm-logo" style="--mark:url('{sub.logo}'); --tone:{sub.acc}"></span>
                      {:else}
                        <span class="mm-dot" style="--dot:{sub.acc}"></span>
                      {/if}
                      <span class="mm-body">
                        <span class="mm-name">{sub.label}{#if sub.soon}<i class="mm-soon">Soon</i>{/if}</span>
                        {#if sub.desc}<span class="mm-desc">{sub.desc}</span>{/if}
                      </span>
                    </svelte:element>
                  {/each}
                </div>
                <a href={item.highlight.href} class="mm-foot" onclick={close}>
                  <span class="mm-foot-t">{item.highlight.title}</span>
                  <span class="mm-foot-p">{item.highlight.text}</span>
                  <span class="mm-foot-arw" aria-hidden="true">→</span>
                </a>
              </div>
            {:else if item.mega === 'columns'}
              <div class="dropdown mega mega-columns" id="navmenu-{i}" role="group" aria-labelledby="navtrig-{i}">
                {#each item.cols as col}
                  <div class="mm-col">
                    <span class="mm-h4">{col.title}</span>
                    {#each col.links as sub}
                      <a href={sub.href} class="mm-row" onclick={close}>
                        {#if sub.icon}
                          <span class="mm-ico" style="--mark:url('{sub.icon}')"></span>
                        {:else}
                          <span class="mm-ico mm-ico-bare"></span>
                        {/if}
                        <span class="mm-row-t">{sub.label}</span>
                      </a>
                    {/each}
                  </div>
                {/each}
              </div>
            {:else}
              <div class="dropdown" id="navmenu-{i}" role="group" aria-labelledby="navtrig-{i}">
                {#each item.items as sub}
                  <a href={sub.href} class="mm-link" onclick={close}>{sub.label}</a>
                {/each}
              </div>
            {/if}
          </div>
        {:else}
          {#if item.cta}
            <a href={item.href} class="talk" onclick={close}>
              <span class="talk-dot" aria-hidden="true"></span>
              <span class="talk-text">{item.label}</span>
              <span class="talk-arrow" aria-hidden="true">→</span>
            </a>
          {:else}
            <a href={item.href} class="nav-link" onclick={close}>{item.label}</a>
          {/if}
        {/if}
      {/each}
    </nav>
  </div>
</div>

<style>
  .nav-bar { position: sticky; top: 0; z-index: 40; background: rgba(6,6,6,0.86); backdrop-filter: blur(18px);
    border-bottom: 1px solid rgba(238,47,46,0.22); animation: navDrop .55s cubic-bezier(0.22,1,0.36,1) both; }
  @keyframes navDrop { from { transform: translateY(-100%); opacity: 0; } to { transform: none; opacity: 1; } }
  .nav-inner { max-width: var(--wrap-max); margin: 0 auto; padding: 10px var(--wrap-pad); display: flex; align-items: center; justify-content: space-between; gap: 16px; box-sizing: border-box; }
  .brand { display: inline-flex; align-items: center; gap: 13px; text-decoration: none; flex: none; transition: opacity .2s; }
  .brand:hover { opacity: 0.82; }
  .brand-logo { height: 34px; width: auto; display: block; }
  /* The logo is 34px tall, so the link was a 34px-high tap target. On touch it needs
     44px; the extra comes from the link box, not the artwork, so nothing resizes. */
  @media (max-width: 980px) { .brand { min-height: 44px; } }
  .nav-links { display: flex; align-items: center; gap: 26px; }
  .nav-group { position: relative; }

  /* Light weight by design — the nav is a quiet rail, not a headline. */
  .nav-link { position: relative; font-family: inherit; font-size: 14.5px; font-weight: var(--w-body); letter-spacing: 0.005em;
    color: rgba(243,243,244,0.84); background: none; border: 0; cursor: pointer;
    text-decoration: none; white-space: nowrap; display: inline-flex; align-items: center; gap: 6px; padding: 4px 0;
    transition: color .2s, transform .24s cubic-bezier(0.22, 1, 0.36, 1); }
  /* A small lift on hover, so the word reacts to the pointer rather than only recolouring. */
  .nav-link:hover, .nav-group:hover .nav-trigger { color: #ff5a4d; transform: translateY(-2px); }
  .nav-link::after { content: ''; position: absolute; left: 0; right: 0; bottom: -3px; height: 2px; background: #ee2f2e;
    transform: scaleX(0); transform-origin: left; transition: transform .28s cubic-bezier(0.22,1,0.36,1); }
  .nav-link:hover::after, .nav-group:hover .nav-trigger::after, .nav-group.active .nav-trigger::after { transform: scaleX(1); }
  .caret { font-size: 9px; opacity: 0.7; transition: transform .25s; }
  .nav-group:hover .caret, .nav-group.active .caret { transform: rotate(180deg); }

  /* Not a button: a hairline pill with a live status dot. The red fills in from the
     left on hover and the arrow slides out — reads as "a line is open", not "click me". */
  .talk { position: relative; display: inline-flex; align-items: center; gap: 9px; overflow: hidden;
    text-decoration: none; font-size: 14px; font-weight: var(--w-body); letter-spacing: 0.01em; color: #f3f3f4;
    padding: 8px 17px; border: 1px solid rgba(238,47,46,0.55); border-radius: 999px;
    transition: border-color .3s, color .3s, transform .24s cubic-bezier(0.22, 1, 0.36, 1); }
  .talk::before { content: ''; position: absolute; inset: 0; background: #ee2f2e; z-index: 0;
    transform: scaleX(0); transform-origin: left; transition: transform .42s cubic-bezier(0.22,1,0.36,1); }
  .talk-dot, .talk-text, .talk-arrow { position: relative; z-index: 1; }
  .talk:hover { border-color: #ee2f2e; color: #fff; transform: translateY(-2px); }
  .talk:hover::before { transform: scaleX(1); }

  .talk-dot { width: 6px; height: 6px; border-radius: 50%; background: #ee2f2e; flex: none;
    box-shadow: 0 0 0 0 rgba(238,47,46,0.65); animation: talkPulse 2.2s ease-out infinite; transition: background .3s; }
  .talk:hover .talk-dot { background: #fff; animation: none; box-shadow: none; }
  @keyframes talkPulse {
    0% { box-shadow: 0 0 0 0 rgba(238,47,46,0.6); }
    70% { box-shadow: 0 0 0 7px rgba(238,47,46,0); }
    100% { box-shadow: 0 0 0 0 rgba(238,47,46,0); }
  }
  .talk-arrow { font-size: 13px; opacity: 0; margin-left: -14px;
    transition: opacity .32s ease, margin-left .32s cubic-bezier(0.22,1,0.36,1); }
  .talk:hover .talk-arrow { opacity: 1; margin-left: 0; }
  @media (prefers-reduced-motion: reduce) {
    .talk::before, .talk-arrow, .talk-dot { transition: none; animation: none; }
    .talk-arrow { opacity: 1; margin-left: 0; }
  }

  /* Invisible hover-bridge so trigger → panel never closes. Mega panels are centred and
     fixed now, so the old 360px-wide is-mega bridge is gone — it overflowed the viewport
     on the right-most group and widened the whole document. */
  .nav-group::after { content: ''; position: absolute; top: 100%; left: -24px; right: -24px; height: 40px; }

  /* Shared animated reveal */
  .dropdown { opacity: 0; visibility: hidden; transform: translateY(10px); pointer-events: none;
    transition: opacity .25s ease, transform .25s cubic-bezier(0.22,1,0.36,1), visibility .25s; }
  .nav-group:hover .dropdown, .nav-group.active .dropdown { opacity: 1; visibility: visible; transform: none; pointer-events: auto; }

  /* iicl.in panel language: white, 10px radius, soft shadow, 30px padding, no border */
  .dropdown:not(.mega) { position: absolute; top: 100%; left: 0; margin-top: 14px; min-width: 210px; background: #fff;
    padding: 22px 26px; display: flex; flex-direction: column; gap: 2px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
  /* Hung off the real bar height rather than a hard-coded 60px, which no longer
     matched the bar (it measures 58px) and left the panel floating a few pixels low. */
  .dropdown.mega { position: fixed; left: 0; right: 0; margin: 14px auto 0; top: var(--nav-h); box-sizing: border-box; display: grid;
    background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.1); padding: 30px; border-radius: 10px;
    max-height: calc(100dvh - var(--nav-h) - 28px); overflow-y: auto; }
  /* Two even link columns with a full-width footer CTA underneath. */
  /* Service rows sit slightly tighter than product rows — no logo tile to clear. */
  .mm-item-svc { align-items: center; }
  .mega-products { max-width: 720px; grid-template-columns: 1fr 1fr; gap: 8px 34px; padding: 24px 24px 10px; }
  /* Single promo panel — anchored under its trigger rather than spanning the viewport. */
  .dropdown.mega-promo { position: absolute; top: 100%; left: 0; right: auto; width: 340px; max-width: 340px;
    margin-top: 14px; grid-template-columns: 1fr; padding: 22px; }
  /* Anchored under its own trigger rather than centred on the viewport, and right-
     aligned because About Us sits near the end of the bar. `grid-auto-flow: column`
     with content-sized tracks means the panel is exactly as wide as the columns it
     actually has — a fixed 3-track grid left a whole empty column of dead space. */
  .dropdown.mega-columns { position: absolute; top: 100%; left: auto; right: 0; margin: 14px 0 0;
    width: max-content; max-width: min(660px, calc(100vw - 32px));
    grid-auto-flow: column; grid-auto-columns: minmax(136px, max-content);
    gap: 4px 34px; padding: 20px 22px; }
  /* Icon rows for the About Us panel. The icon is a mask so every glyph takes one
     ink colour — the source SVGs are a mix of palettes and looked scattered raw. */
  .mm-row { display: flex; align-items: center; gap: 10px; text-decoration: none;
    padding: 7px 10px; border-radius: 8px; transition: background .18s ease; }
  .mm-row:hover { background: #f6f5f3; }
  .mm-row:focus-visible { outline: 2px solid #ee2f2e; outline-offset: -2px; }
  /* No tile — the glyph sits directly on the panel. Masked so every icon takes one
     ink weight regardless of how its source SVG was drawn, and goes brand red on hover. */
  .mm-ico { position: relative; flex: none; width: 20px; height: 20px; }
  .mm-ico::before { content: ''; position: absolute; inset: 0; background: #45484e;
    -webkit-mask: var(--mark) center / contain no-repeat; mask: var(--mark) center / contain no-repeat;
    transition: background .18s ease; }
  /* Rows with no icon asset keep the glyph column so labels stay aligned. */
  .mm-ico-bare::before { -webkit-mask: none; mask: none; inset: 9px 3px; height: 2px; border-radius: 2px; background: #c9c6c1; }
  .mm-row:hover .mm-ico::before { background: #ee2f2e; }
  .mm-row-t { font-size: 14px; font-weight: var(--w-body); color: #1d1e22; line-height: 1.35; transition: color .18s; }
  .mm-row:hover .mm-row-t { color: var(--brand-ink); }

  /* Highlight block (AI Solutions left column) */
  .mm-highlight { display: block; text-decoration: none; }
  .mm-highlight img { width: 100%; border-radius: 8px; display: block; }
  .mm-h5 { display: block; margin-top: 14px; font-size: 16px; font-weight: 600; color: #16171a; transition: color .2s; }
  .mm-highlight:hover .mm-h5 { color: var(--brand-ink); }
  .mm-p { display: block; margin-top: 5px; font-size: 13px; line-height: 1.55; color: #66696f; }

  /* Titled link columns */
  .mm-col { display: flex; flex-direction: column; }
  /* Section labels read as labels — small, tracked, muted — so the product names lead. */
  .mm-h4 { font-size: 10.5px; font-weight: var(--w-medium); letter-spacing: 0.14em; text-transform: uppercase;
    color: #9a9ea6; margin: 0 0 6px; padding: 0 10px; }
  .mm-link { color: #1d1e22; text-decoration: none; font-size: 15px; padding: 7px 0; transition: color .18s; }
  .mm-link:hover { color: var(--brand-ink); }

  /* Product row: accent dot, name, one-line description. The whole row is the target. */
  .mm-item { display: flex; align-items: flex-start; gap: 11px; text-decoration: none;
    padding: 9px 10px; border-radius: 8px; transition: background .18s ease; }
  .mm-item:hover { background: #f6f5f3; }
  .mm-item:focus-visible { outline: 2px solid #ee2f2e; outline-offset: -2px; }
  .mm-dot { flex: none; width: 7px; height: 7px; margin-top: 7px; border-radius: 50%;
    background: var(--dot, #ee2f2e); transition: box-shadow .18s ease; }
  .mm-item:hover .mm-dot { box-shadow: 0 0 0 4px color-mix(in srgb, var(--dot, #ee2f2e) 18%, transparent); }

  /* Product mark. The SVG is a monochrome mask filled with the product's accent, so
     six different glyphs read as one family instead of six clashing palettes. The tile
     carries a wash of the same accent. */
  .mm-logo { flex: none; position: relative; width: 32px; height: 32px; border-radius: 9px;
    background: color-mix(in srgb, var(--tone, #ee2f2e) 11%, transparent);
    transition: background .18s ease; }
  .mm-logo::before { content: ''; position: absolute; inset: 6px; background: var(--tone, #ee2f2e);
    -webkit-mask: var(--mark) center / contain no-repeat; mask: var(--mark) center / contain no-repeat; }
  .mm-item:hover .mm-logo { background: color-mix(in srgb, var(--tone, #ee2f2e) 20%, transparent); }

  /* Not launched yet: visible in the list, but inert. */
  .mm-item.is-disabled { cursor: default; opacity: 0.5; }
  .mm-item.is-disabled:hover { background: transparent; }
  .mm-item.is-disabled:hover .mm-logo { background: #f4f2ef; transform: none; }
  .mm-item.is-disabled:hover .mm-name { color: #16171a; }
  .mm-body { display: grid; gap: 2px; min-width: 0; }
  .mm-name { font-size: 14.5px; font-weight: var(--w-medium); color: #16171a; line-height: 1.35; transition: color .18s; }
  .mm-item:hover .mm-name { color: var(--brand-ink); }
  .mm-desc { font-size: 12.5px; line-height: 1.45; color: #74777e; }
  .mm-soon { font-style: normal; margin-left: 7px; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase;
    color: #9a6b1f; background: #fdf3e0; border-radius: 999px; padding: 2px 7px; vertical-align: 1px; }

  /* Footer CTA spanning both columns. */
  .mm-foot { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr auto; align-items: center;
    gap: 2px 14px; margin-top: 8px; padding: 14px 14px; border-top: 1px solid #eceae6;
    text-decoration: none; border-radius: 0 0 10px 10px; transition: background .18s ease; }
  .mm-foot:hover { background: #f6f5f3; }
  .mm-foot-t { grid-column: 1; font-size: 14px; font-weight: var(--w-medium); color: #16171a; transition: color .18s; }
  .mm-foot:hover .mm-foot-t { color: var(--brand-ink); }
  .mm-foot-p { grid-column: 1; font-size: 12.5px; line-height: 1.45; color: #74777e; }
  .mm-foot-arw { grid-column: 2; grid-row: 1 / span 2; font-size: 15px; color: var(--brand-ink);
    transition: transform .22s cubic-bezier(0.22,1,0.36,1); }
  .mm-foot:hover .mm-foot-arw { transform: translateX(4px); }

  /* Hamburger. The three 24px bars are the mark; the button is sized to a full 44×44
     touch target around them (it measured 40×32 before, under the minimum on the one
     control the whole mobile navigation depends on). */
  .hamburger { display: none; flex-direction: column; align-items: center; justify-content: center;
    gap: 5px; background: none; border: 0; cursor: pointer; padding: 0; width: 44px; height: 44px; flex: none; }
  .hamburger span { width: 24px; height: 2px; background: #f4f2ee; display: block; transition: transform .25s, opacity .2s; }
  .hamburger.on span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.on span:nth-child(2) { opacity: 0; }
  .hamburger.on span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  @media (max-width: 980px) {
    .hamburger { display: flex; }
    /* The brand link and the hamburger are both 44px tall on touch. Trimming the bar's
       own padding keeps the header the same overall height it was (~57px) while the
       controls inside it grow to a proper tap size. */
    .nav-inner { padding-block: 6px; }
    /* Anchored to the bar itself (top: 100% inside the sticky .nav-bar) instead of a
       fixed 60px offset. The bar is 55-58px depending on breakpoint, so the constant
       left a visible gap between the bar and the sheet. 100dvh, not 100vh, so the
       sheet is not left scrolling under a mobile browser's collapsing address bar. */
    .nav-links { position: absolute; top: 100%; left: 0; right: 0; bottom: auto; flex-direction: column; align-items: stretch; gap: 0; background: #070707; border-bottom: 1px solid rgba(238,47,46,0.25); padding: 8px 20px 24px; max-height: calc(100dvh - var(--nav-h)); overflow-y: auto; overscroll-behavior: contain; display: none; }
    .nav-links.open { display: flex; }
    .nav-group { border-bottom: 1px solid rgba(255,255,255,0.06); }
    .nav-group::after { display: none; }
    .nav-link { padding: 15px 0; width: 100%; justify-content: space-between; font-size: 16px; }
    .nav-link::after { display: none; }
    .nav-links > .nav-link { border-bottom: 1px solid rgba(255,255,255,0.06); }
    .dropdown, .dropdown.mega { position: static; margin: 0; border: 0; box-shadow: none; padding: 0 0 12px; min-width: 0; max-width: none; background: transparent; border-radius: 0;
      opacity: 1; visibility: visible; transform: none; pointer-events: auto; display: none; }
    .dropdown.mega { grid-template-columns: 1fr; gap: 4px; }
    .nav-group:hover .dropdown { display: none; }
    .nav-group.active .dropdown { display: flex; }
    .nav-group.active .dropdown.mega { display: grid; }
    .mm-highlight { display: none; } /* promo block is a desktop luxury… */
    .mega-promo .mm-highlight { display: block; } /* …except when it IS the panel */
    .dropdown.mega-promo { width: auto; max-width: none; padding: 0 0 12px; }
    .mega-promo .mm-h5 { color: #f4f2ee; }
    .mega-promo .mm-p { color: rgba(244,242,238,0.6); }
    .mm-h4 { color: rgba(244,242,238,0.45); margin-top: 10px; padding: 0; }
    .mm-link { color: #f4f2ee; }
    /* Icon rows on the dark mobile sheet. */
    /* Undo the desktop anchoring and column flow — on the sheet it stacks. */
    .dropdown.mega-columns { position: static; width: auto; max-width: none; margin: 0;
      grid-auto-flow: row; grid-auto-columns: auto; padding: 0 0 10px; gap: 0; }
    .mm-row { padding: 9px 0; border-radius: 0; }
    .mm-row:hover { background: transparent; }
    .mm-ico::before { background: rgba(244,242,238,0.75); }
    .mm-row-t { color: #f4f2ee; }
    /* Product rows on the dark mobile sheet. */
    .mega-products { padding: 0 0 10px; gap: 0; }
    .mm-item { padding: 10px 0; border-radius: 0; }
    .mm-item:hover { background: transparent; }
    .mm-name { color: #f4f2ee; }
    .mm-desc { color: rgba(244,242,238,0.5); }
    .mm-foot { border-top: 1px solid rgba(255,255,255,0.08); padding: 14px 0; margin-top: 4px; }
    .mm-foot:hover { background: transparent; }
    .mm-foot-t { color: #f4f2ee; }
    .mm-foot-p { color: rgba(244,242,238,0.5); }
    .talk { align-self: flex-start; margin-top: 18px; padding: 12px 22px; font-size: 15px; }
    .talk-arrow { opacity: 1; margin-left: 0; }
  }
</style>
