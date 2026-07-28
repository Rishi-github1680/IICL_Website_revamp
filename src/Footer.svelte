<script>
  // Slate footer over a full-bleed world map. Data comes from menu.js.
  import { PRODUCTS as products, SERVICES as services, INDUSTRIES as industries } from './menu.js';
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

      <div class="ft-col">
        <h4>Services</h4>
        <ul>{#each services as s}<li><a href={s.href}>{s.label}</a></li>{/each}</ul>
      </div>
      <div class="ft-col">
        <h4>Industries</h4>
        <ul>{#each industries as s}<li><a href={s.href}>{s.label}</a></li>{/each}</ul>
      </div>
      <div class="ft-col">
        <h4>AI Solutions</h4>
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
        <h4>Social Links</h4>
        <ul><li><a href="https://www.linkedin.com/company/iiclconsulting" target="_blank" rel="noopener">LinkedIn</a></li></ul>
        <h4 class="ft-h4-gap">Company</h4>
        <ul>
          <li><a href="/aboutus">About Us</a></li>
          <li><a href="/careers">Careers</a></li>
          <li><a href="/use-cases">Use Cases</a></li>
          <li><a href="/blog">Blogs</a></li>
          <li><a href="/contactus">Contact Us</a></li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
        </ul>
      </div>
    </div>

    <div class="ft-bottom">
      <span>© {new Date().getFullYear()} Intelligence India.Com Limited. All Rights Reserved.</span>
    </div>
  </div>
</footer>

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
  .ft-wrap { position: relative; max-width: var(--wrap-max); margin: 0 auto; padding: 52px var(--wrap-pad) 0; box-sizing: border-box; }
  /* The footer sits on the same rail as the page, and the columns are centred as a
     group: `justify-content: center` on a fixed-width track stops the row drifting
     left when the wrap is wider than the content needs. */
  .ft-top { display: grid; grid-template-columns: minmax(240px, 1.4fr) repeat(4, minmax(140px, 1fr));
    gap: 26px 40px; align-items: start; justify-content: center; width: 100%; }

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
  .ft-h4-gap { margin-top: 22px !important; }
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

  .ft-bottom { margin-top: 34px; padding: 16px 0; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; }
  .ft-bottom span { font-size: 13px; color: rgba(255,255,255,0.5); }

  @media (max-width: 1080px) { .ft-top { grid-template-columns: 1fr 1fr 1fr; } }
  @media (max-width: 780px) { .ft-top { grid-template-columns: 1fr 1fr; gap: 28px; } }
  @media (max-width: 560px) { .ft-top { grid-template-columns: 1fr; } .ft-wrap { padding-top: 40px; } }
</style>
