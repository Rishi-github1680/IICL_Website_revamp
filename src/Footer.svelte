<script>
  // Slate footer over a full-bleed world map, laid out as a sitemap.
  // The floating contact agent rides along here so every page that has a footer
  // gets it, rather than wiring it into four separate layouts.
  import { PRODUCTS as products, INDUSTRIES, TALENT, INSIGHTS } from './menu.js';
  import Assistant from './Assistant.svelte';

  // Inline marks rather than image files — there are no social icons in /img, and
  // two paths cost less than two more network requests. Add an entry here (with a
  // real profile URL) to bring another network in.
  const SOCIAL = [
    {
      label: 'IICL on LinkedIn',
      href: 'https://www.linkedin.com/company/iiclconsulting',
      svg: `<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.7c0-1.36-.03-3.11-2-3.11-2 0-2.3 1.48-2.3 3.01V21h-4V9Z"/></svg>`,
    },
  ];
</script>

<footer class="ft">
  <div class="ft-wrap">
    <div class="ft-top">
      <div class="ft-brand">
        <img class="ft-logo" src="/img/logo-footer.svg" alt="Intelligence India.Com Limited (IICL) logo" />
        <p class="ft-legal-name">Intelligence India.Com Limited</p>
        <p class="ft-addr-blk">
          <a href="https://www.google.com/maps/search/?api=1&query=1%20Glenwood%20Ave%20%235%2C%20Raleigh%2C%20NC%2027603" target="_blank" rel="noopener">
            <strong>USA:</strong> 1 Glenwood Ave #5, Raleigh, NC 27603, United States.
          </a>
          <a href="https://www.google.com/maps/search/?api=1&query=Jains%20Sadguru%20Images%20Capital%20Park%2C%20Image%20Gardens%20Road%2C%20Madhapur%2C%20Hyderabad%20500084" target="_blank" rel="noopener">
            <strong>INDIA:</strong> Unit No. 308 &amp; 309, Jains Sadguru Image's Capital Park, Image Gardens Road, Madhapur, Hyderabad 500084.
          </a>
        </p>
        <p class="ft-contact">
          <a href="tel:+919989442002">+91 99894 42002</a>
          <a href="mailto:reachus@iicl.in">reachus@iicl.in</a>
        </p>
      </div>

      <!-- Solution-first (Spec FT1): Enterprise AI and GCC are the two commercial
           pathways, so each gets its own group rather than hiding inside "Services". -->
      <div class="ft-col ft-col-wide">
        <h4>Enterprise AI Solutions</h4>
        <ul>
          <li><a href="/ai-genai-services">Enterprise AI &amp; GenAI</a></li>
          <li><a href="/agentic-ai">Agentic AI</a></li>
        </ul>
        <ul class="ft-products">
          {#each products as s}
            <li>
              {#if s.disabled}
                <span class="ft-prod is-disabled" aria-disabled="true">
                  {#if s.logo}<span class="ft-logo-mark" style="--mark:url('{s.logo}')"></span>{/if}{s.label}
                </span>
              {:else}
                <a class="ft-prod" href={s.href}>
                  {#if s.logo}<span class="ft-logo-mark" style="--mark:url('{s.logo}')"></span>{/if}{s.label}
                </a>
              {/if}
            </li>
          {/each}
        </ul>
      </div>

      <div class="ft-col">
        <h4>GCC Technology Teams</h4>
        <ul>
          {#each TALENT as t}<li><a href={t.href}>{t.label}</a></li>{/each}
        </ul>
        <h4 class="ft-h4-gap">Industries</h4>
        <ul>
          {#each INDUSTRIES.slice(0, 5) as s}<li><a href={s.href}>{s.label}</a></li>{/each}
        </ul>
      </div>

      <div class="ft-col">
        <h4>Insights</h4>
        <ul>
          {#each INSIGHTS as s}<li><a href={s.href}>{s.label}</a></li>{/each}
        </ul>
        <h4 class="ft-h4-gap">Company</h4>
        <ul>
          <li><a href="/aboutus">About IICL</a></li>
          <li><a href="/careers">Careers</a></li>
          <li><a href="/contactus">Contact</a></li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/sitemap">Sitemap</a></li>
        </ul>
      </div>
    </div>

    <!-- Actions row above the divider: the CTA now sits in the opposite corner from
         the brand block, with the social marks alongside it on the right. -->
    <div class="ft-actions">
      <!-- FT1 requires both commercial paths in the footer, not just one. -->
      <a class="ft-cta" href="/contactus?intent=ai-discovery-workshop">Book an AI Discovery Workshop <span class="ft-cta-arw">→</span></a>
      <a class="ft-cta ft-cta-alt" href="/contactus?intent=gcc-team-expansion">Plan Your GCC Team Expansion <span class="ft-cta-arw">→</span></a>
      <div class="ft-social">
        {#each SOCIAL as s}
          <a class="ft-soc" href={s.href} target="_blank" rel="noopener" aria-label={s.label} title={s.label}>
            {@html s.svg}
          </a>
        {/each}
      </div>
    </div>

    <div class="ft-bottom">
      <span>© {new Date().getFullYear()} Intelligence India.Com Limited. All Rights Reserved.</span>
    </div>
  </div>
</footer>

<Assistant />

<style>
  /* Slate base with the world map filling the whole footer edge to edge. `cover`
     rather than `contain` — contained, the 2256px-wide map sat in a letterboxed
     band and read as a small constrained picture. A soft top gradient keeps the
     seam with the section above from looking like a hard join. */
  .ft { position: relative; isolation: isolate; background: #121820; color: #fff; font-family: var(--font); overflow: hidden; }
  .ft::before { content: ''; position: absolute; inset: 0; z-index: -2;
    background: url('/img/map.png') center / cover no-repeat; opacity: 0.09; pointer-events: none; }
  /* Readability overlay — the map stays visible, the links stay legible. */
  .ft::after { content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none;
    background: linear-gradient(180deg, rgba(18,24,32,0.86) 0%, rgba(18,24,32,0.6) 42%, rgba(18,24,32,0.82) 100%); }
  /* Equal inset on all four corners — the block is centred on the page rail and sits
     the same distance from every edge, so no side reads as heavier than another. */
  .ft-wrap { position: relative; max-width: var(--wrap-max); margin: 0 auto;
    padding: var(--wrap-pad); box-sizing: border-box; }
  /* The footer sits on the same rail as the page, and the columns are centred as a
     group: `justify-content: center` on a fixed-width track stops the row drifting
     left when the wrap is wider than the content needs. */
  /* Brand · AI Solutions (widest, it leads) · Explore · Company. */
  .ft-top { display: grid; grid-template-columns: minmax(240px, 1.35fr) minmax(190px, 1.1fr) repeat(2, minmax(130px, 0.8fr));
    gap: 26px 44px; align-items: start; justify-content: center; width: 100%; }

  .ft-brand { max-width: 34ch; }
  .ft-logo { width: 52px; height: auto; display: block; }
  .ft-legal-name { margin: 13px 0 0; font-size: 14.5px; font-weight: var(--w-medium); color: #fff; letter-spacing: 0.01em; }
  .ft-addr-blk { margin: 11px 0 0; display: flex; flex-direction: column; gap: 9px; }
  .ft-addr-blk a { color: rgba(255,255,255,0.7); text-decoration: none; font-size: 13.5px; line-height: 1.6; transition: color .2s; }
  .ft-addr-blk a:hover { color: #ee2f2e; }
  .ft-addr-blk strong { color: #fff; font-weight: 600; }
  .ft-contact { margin: 13px 0 0; display: flex; flex-direction: column; gap: 4px; }
  .ft-contact a { color: rgba(255,255,255,0.86); text-decoration: none; font-size: 14.5px; transition: color .2s; }
  .ft-contact a:hover { color: #ee2f2e; }

  /* Column heads align on one baseline with the brand name; links sit on a tighter
     rhythm so each column reads as a block rather than a loose scatter. */
  .ft-col h4 { font-size: 11px; font-weight: var(--w-medium); letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(255,255,255,0.45); margin: 0 0 12px; }
  .ft-col ul { list-style: none; margin: 0; padding: 0; }
  .ft-col li { margin: 0 0 4px; }
  .ft-col a { display: inline-block; color: rgba(255,255,255,0.82); text-decoration: none; font-size: 14px;
    font-weight: var(--w-body); line-height: 1.55; padding: 2px 0; transition: color .2s, transform .2s; }
  .ft-col a:hover { color: #ee2f2e; transform: translateX(2px); }

  /* Product rows carry their mark. The tile keeps mixed-weight logos aligned
     and readable against the dark footer. */
  .ft-products li { margin-bottom: 2px; }
  /* `.ft-col a` also matches this link and would otherwise win on specificity and
     force display:inline-block, which collapsed the mark to zero width. */
  .ft-col a.ft-prod, .ft-prod { display: inline-flex; align-items: center; gap: 9px; }
  /* Same monochrome mask as the nav; on the dark footer it takes the light ink.
     display is explicit: an inline span ignores width/height. */
  .ft-logo-mark { display: inline-block; position: relative; width: 22px; height: 22px; flex: none; border-radius: 6px;
    background: rgba(255,255,255,0.07); transition: background .2s; }
  .ft-logo-mark::before { content: ''; position: absolute; inset: 4px; background: rgba(255,255,255,0.8);
    -webkit-mask: var(--mark) center / contain no-repeat; mask: var(--mark) center / contain no-repeat;
    transition: background .2s; }
  .ft-prod:hover .ft-logo-mark { background: rgba(238,47,46,0.2); }
  .ft-prod:hover .ft-logo-mark::before { background: #ee2f2e; }
  .ft-prod.is-disabled { color: rgba(255,255,255,0.42); cursor: default; font-size: 14px; line-height: 1.55; padding: 2px 0; }
  .ft-prod.is-disabled:hover .ft-logo-mark { background: rgba(255,255,255,0.08); }

  /* No bottom padding of its own — the wrap's equal inset provides the final gap. */
  /* Actions row: CTA at the right-hand end, social marks beside it, above the rule. */
  .ft-actions { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 12px; margin-top: 30px; }

  /* The one action in the footer, so it is filled rather than outlined — it should
     read as the brightest thing down here. */
  .ft-cta { display: inline-flex; align-items: center; gap: 9px;
    padding: 12px 24px; background: #ee2f2e; border-radius: 999px;
    color: #fff; text-decoration: none; font-size: 14.5px; font-weight: var(--w-medium);
    box-shadow: 0 6px 20px rgba(238,47,46,0.32);
    transition: background .25s, transform .25s cubic-bezier(0.22,1,0.36,1), box-shadow .25s; }
  .ft-cta:hover { background: #ff3f3e; transform: translateY(-2px); box-shadow: 0 10px 26px rgba(238,47,46,0.44); }
  .ft-cta-arw { font-family: var(--font-mono); font-size: 13px; transition: transform .25s cubic-bezier(0.22,1,0.36,1); }
  .ft-cta:hover .ft-cta-arw { transform: translateX(3px); }

  /* The second path is outlined rather than filled, so the two read as equal
     destinations without two solid red blocks competing. */
  .ft-cta-alt { background: transparent; border: 1px solid rgba(255,255,255,.28); box-shadow: none; }
  .ft-cta-alt:hover { background: rgba(238,47,46,.14); border-color: #ee2f2e; box-shadow: none; }

  .ft-social { display: flex; gap: 10px; }
  .ft-soc { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%;
    color: rgba(255,255,255,0.72); border: 1px solid rgba(255,255,255,0.16);
    transition: color .22s, border-color .22s, background .22s, transform .22s; }
  .ft-soc:hover { color: #fff; background: #ee2f2e; border-color: #ee2f2e; transform: translateY(-2px); }

  .ft-bottom { margin-top: 16px; padding: 16px 0 0; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; }
  .ft-bottom span { font-size: 13px; color: rgba(255,255,255,0.5); }

  
  
  
</style>
