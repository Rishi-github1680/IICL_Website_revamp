<script>
  // Contracts — the engagement models IICL works under, presented with the same deck
  // as the careers page so the two read as a pair. Content differs; interaction does not.
  //
  // An earlier moving carousel was rejected here because the Apply button moved while
  // you reached for it. This one keeps the focused card — and its Apply button —
  // completely stationary. Side cards are targets that bring a role to the centre;
  // they never carry the primary action. Below ~900px it degrades to a plain grid.
  import { onMount } from 'svelte';
  import Layout from '../Layout.svelte';
  import { PAGE_ART } from '../menu.js';
  import { hpan } from '../hscroll.js';

  const ROLES = [
    { title: 'Fixed-Scope Delivery', team: 'Project', loc: 'Hyderabad / Remote', type: 'Statement of work',
      blurb: 'A defined output, acceptance criteria and delivery governance agreed up front. Suits work whose shape is already clear.',
      skills: ['Defined scope', 'Acceptance criteria', 'Milestones', 'Change control'] },
    { title: 'Dedicated Delivery Pod', team: 'Pod', loc: 'Hyderabad', type: 'Rolling term',
      blurb: 'A stable multi-role unit built around one capability or roadmap, with a contracted coordination layer.',
      skills: ['Multi-role team', 'Named leads', 'Roadmap-aligned', 'Monthly review'] },
    { title: 'Flexible Technology Team', team: 'Team', loc: 'Hyderabad / Remote', type: 'Time and materials',
      blurb: 'Specialists working inside your operating model for a defined period, directed day to day by your leads.',
      skills: ['Your direction', 'Defined period', 'Replacement cover', 'Scalable'] },
    { title: 'Contract-to-Hire', team: 'Hiring', loc: 'Hyderabad', type: 'Conversion term',
      blurb: 'An engagement with agreed conversion conditions, so a fit can become permanent on terms settled in advance.',
      skills: ['Minimum period', 'Conversion terms', 'Agreed in writing'] },
    { title: 'Managed AgentOps', team: 'Managed', loc: 'Remote', type: 'Service agreement',
      blurb: 'Monitoring, evaluation, support and revalidation for an approved production agent workflow.',
      skills: ['Monitoring', 'Evaluation', 'Incident handling', 'Reporting'] },
    { title: 'Advisory Retainer', team: 'Advisory', loc: 'Remote', type: 'Retainer',
      blurb: 'Architecture, governance and delivery review on a recurring basis, without carrying a full team.',
      skills: ['Architecture review', 'Governance', 'Delivery assurance'] },
  ];

  // Contract enquiries route through the approved contact intent, not a mailto, so the
// requirement is captured with the same form safety as every other conversion.
const apply = (r) => `/contactus?intent=gcc-capability-requirement`;

  const TEAMS = ['All', ...new Set(ROLES.map((r) => r.team))];
  let team = $state('All');
  const shown = $derived(team === 'All' ? ROLES : ROLES.filter((r) => r.team === team));

  let active = $state(0);
  let stageEl;
  // Per-card signed distance from the centre of the viewport, in card-steps.
  let dist = $state([]);

  const CARD = 300, GAP = 24;
  const step = () => CARD + GAP;

  // Recompute each card's pose from the live scroll position. This is what makes it
  // a coverflow: nothing is "selected", the geometry just follows the scroll.
  function measure() {
    if (!stageEl) return;
    const mid = stageEl.scrollLeft + stageEl.clientWidth / 2;
    const next = [];
    let best = 0, bestD = Infinity;
    for (let i = 0; i < shown.length; i++) {
      const centre = stageEl.clientWidth / 2 + i * step();   // padding centres card 0
      const d = (centre - mid) / step();
      next[i] = d;
      if (Math.abs(d) < bestD) { bestD = Math.abs(d); best = i; }
    }
    dist = next;
    active = best;
  }

  const go = (i) => {
    const n = shown.length;
    if (!n || !stageEl) return;
    const t = Math.max(0, Math.min(n - 1, i));
    stageEl.scrollTo({ left: t * step(), behavior: 'smooth' });
  };

  function pickTeam(t) { team = t; active = 0; stageEl?.scrollTo({ left: 0 }); }

  // Style for a card at signed distance d: rotate away, sink back, dim.
  function poseOf(i) {
    const d = dist[i] ?? (i - active);
    const a = Math.min(Math.abs(d), 3.2);
    return [
      `transform: rotateY(${(-d * 26).toFixed(2)}deg) translateZ(${(-a * 130).toFixed(0)}px) scale(${(1 - a * 0.04).toFixed(3)})`,
      `opacity: ${a < 0.5 ? 1 : Math.max(0.16, 0.62 - (a - 0.5) * 0.22).toFixed(2)}`,
      `filter: saturate(${Math.max(0.2, 1 - a * 0.3).toFixed(2)}) brightness(${Math.max(0.45, 1 - a * 0.17).toFixed(2)})`,
      `z-index: ${20 - Math.round(a * 4)}`,
    ].join(';');
  }

  // The deck pans with the mouse wheel (use:hpan); touch and trackpad scroll it
  // natively. No dragging, so a click on a card is only ever a click on the card.
  function deck(node) {
    stageEl = node;              // authoritative reference
    const pan = hpan(node);
    node.addEventListener('scroll', measure, { passive: true });
    requestAnimationFrame(measure);   // after first layout, so clientWidth is real

    return {
      destroy() {
        pan.destroy();
        node.removeEventListener('scroll', measure);
      },
    };
  }

  onMount(() => {
    const onKey = (e) => {
      if (!stageEl) return;
      const r = stageEl.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', measure);
    };
  });
</script>

<Layout
  kicker="Company"
  heroImage={PAGE_ART['contracts']}
  h1="How we contract for the work"
  lede="Fixed-scope delivery, dedicated pods, flexible teams, contract-to-hire, managed operations and advisory retainers — with the responsibilities of each stated before anything starts."
  path="/contracts"
  cta="Discuss an Engagement"
  ctaHref="/contactus?intent=gcc-capability-requirement"
  bandKicker="Engagement models"
  bandHeading="Tell us the scope, duration and where delivery responsibility should sit.">
  <section class="page-section deck-sec">
    <div class="wrap">
      <div class="deck-head">
        <h2 class="section-h"><span class="tick"></span>Engagement models</h2>
        <span class="deck-count mono">Six ways to work with us</span>
      </div>

      <div class="team-row" role="group" aria-label="Filter engagement models">
        {#each TEAMS as t}
          <button class="team-chip mono" class:active={team === t} onclick={() => pickTeam(t)}>{t}</button>
        {/each}
      </div>
    </div>

    <!-- The deck: full-bleed dark stage, cards fanned in 3D. -->
    <div class="stage-outer">
      <div
        class="stage"
        use:deck
        role="group" aria-roledescription="carousel" aria-label="Engagement models"
      >
        {#each shown as r, i (r.title)}
          <article class="card" class:is-active={i === active} style={poseOf(i)}>
            <span class="card-team mono">{r.team}</span>
            <h3 class="card-title">{r.title}</h3>
            <p class="card-blurb">{r.blurb}</p>

            <ul class="card-skills">
              {#each r.skills as sk}<li class="mono">{sk}</li>{/each}
            </ul>

            <dl class="card-facts">
              <div><dt class="mono">Location</dt><dd>{r.loc}</dd></div>
              <div><dt class="mono">Type</dt><dd>{r.type}</dd></div>
            </dl>

            <a class="card-apply" href={apply(r)} tabindex={i === active ? 0 : -1}>
              Apply Now <span class="mono">→</span>
            </a>
          </article>
        {/each}
      </div>

      <div class="deck-ctrl">
        <div class="dots" role="tablist" aria-label="Choose a role">
          {#each shown as r, i (r.title)}
            <button
              class="dot" class:on={i === active}
              onclick={() => go(i)}
              role="tab" aria-selected={i === active} aria-label={r.title}
            ></button>
          {/each}
        </div>
        <span class="deck-hint mono" aria-hidden="true">Drag to explore</span>
      </div>

      <p class="deck-live mono" aria-live="polite">
        {String(active + 1).padStart(2, '0')} / {String(shown.length).padStart(2, '0')} — {shown[active]?.title ?? ''}
      </p>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Don't see your role?</h2>
      <div class="section-body">
        <p class="para">We hire for judgement over job titles. If you've built something you're proud of and it's close to what we do, send it over with a few lines on what you'd want to work on.</p>
        <a class="cta-inline" href="mailto:reachus@iicl.in?subject=Application%20—%20Open%20application">Discuss this model <span class="mono">→</span></a>
      </div>
    </div>
  </section>
</Layout>

<style>
  .mono { font-family: var(--font-mono); }
  .deck-sec { padding-bottom: 0; }
  .deck-head { display: flex; align-items: baseline; gap: 16px; }
  .deck-count { font-size: 11px; letter-spacing: .18em; text-transform: uppercase; color: var(--brand-ink); }

  .team-row { display: flex; flex-wrap: wrap; gap: 8px; margin: 14px 0 0; }
  .team-chip { font-size: 10.5px; letter-spacing: .18em; text-transform: uppercase; color: #55585e;
    background: transparent; border: 1px solid #e6e3de; border-radius: 999px; padding: 7px 15px;
    cursor: pointer; font-family: var(--font-mono); transition: border-color .2s, color .2s, background .2s; }
  .team-chip:hover { border-color: #ee2f2e; color: #16171a; }
  .team-chip.active { background: var(--brand-solid); border-color: #ee2f2e; color: #fff; }

  /* ── Stage ────────────────────────────────────────────────────────────── */
  .stage-outer { margin-top: 28px; background: #08090b; padding: 44px 0 34px; position: relative; overflow: hidden;
    background-image: radial-gradient(60% 40% at 50% 0%, rgba(238,47,46,.15), transparent 70%); }
  /* A native horizontal scroller with the coverflow applied per card from the live
     scroll position — so trackpad, touch and drag all work, and nothing is "selected"
     except whichever card is nearest the centre. */
  .stage { position: relative; height: 470px; perspective: 1500px; transform-style: preserve-3d;
    display: flex; align-items: center; gap: 24px;
    /* Proximity so wheel panning is continuous; the coverflow pose follows scroll,
       and cards still settle centred when you stop. */
    overflow-x: auto; overscroll-behavior-x: contain; scroll-snap-type: x proximity;
    scrollbar-width: none; -ms-overflow-style: none;
    padding-inline: calc(50% - 150px); }
  .stage::-webkit-scrollbar { display: none; }

  .card { position: relative; flex: 0 0 300px; height: 400px; box-sizing: border-box;
    scroll-snap-align: center;
    display: flex; flex-direction: column; gap: 10px; padding: 24px 22px;
    background: linear-gradient(#14161a, #0c0d10); border: 1px solid rgba(255,255,255,.1);
    border-radius: 14px; color: #f4f2ee; transform-origin: center center;
    box-shadow: 0 24px 60px rgba(0,0,0,.55);
    transition: transform .62s cubic-bezier(0.22,1,0.36,1), opacity .5s ease, filter .5s ease; }
  .card.is-active { border-color: rgba(238,47,46,.55); box-shadow: 0 30px 80px rgba(0,0,0,.6), 0 0 44px rgba(238,47,46,.2); }

  .card-team { font-size: 9.5px; letter-spacing: .24em; text-transform: uppercase; color: #ff8d8b; }
  .card-title { margin: 0; font-size: 22px; line-height: 1.2; font-weight: var(--w-heading); letter-spacing: -.02em; color: #fff; }
  .card-blurb { margin: 0; font-size: 13.5px; line-height: 1.62; color: rgba(244,242,238,.68); }

  .card-skills { list-style: none; display: flex; flex-wrap: wrap; gap: 6px; margin: 2px 0 0; padding: 0; }
  .card-skills li { font-size: 9.5px; letter-spacing: .12em; text-transform: uppercase; color: rgba(244,242,238,.72);
    border: 1px solid rgba(255,255,255,.16); border-radius: 999px; padding: 4px 9px; }

  .card-facts { margin: auto 0 0; padding: 12px 0 0; border-top: 1px solid rgba(255,255,255,.1);
    display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .card-facts dt { font-size: 9px; letter-spacing: .18em; text-transform: uppercase; color: rgba(244,242,238,.42); }
  .card-facts dd { margin: 3px 0 0; font-size: 13px; color: #f4f2ee; }

  /* Stationary on the focused card — this is the button you reach for. */
  .card-apply { display: inline-flex; align-items: center; justify-content: center; gap: 8px; margin-top: 12px;
    background: var(--brand-solid); color: #fff; text-decoration: none; font-weight: var(--w-heading); font-size: 14.5px;
    padding: 12px 20px; border-radius: 8px; transition: background .2s, transform .2s; }
  .card-apply:hover { background: #d61f1e; transform: translateY(-2px); }
  .card:not(.is-active) .card-apply { opacity: 0; pointer-events: none; }

  /* ── Controls ─────────────────────────────────────────────────────────── */
  .deck-ctrl { position: relative; display: flex; align-items: center; justify-content: center; gap: 18px; margin-top: 24px; }
  .deck-hint { font-size: 10px; letter-spacing: .24em; text-transform: uppercase; color: rgba(244,242,238,.4); }
  .dots { display: flex; align-items: center; gap: 7px; }
  /* 24x24 minimum hit area (WCAG 2.2 AA 2.5.8 min target). The dot itself stays
     small; the target around it does not. */
  .dot::after { content: ''; position: absolute; left: 50%; top: 50%;
    width: 24px; height: 24px; transform: translate(-50%, -50%); }
  .dot { position: relative; width: 7px; height: 7px; padding: 0; border-radius: 50%; border: 0; cursor: pointer;
    background: rgba(244,242,238,.3); transition: background .25s, width .25s, border-radius .25s; }
  .dot:hover { background: rgba(244,242,238,.6); }
  .dot.on { width: 22px; border-radius: 999px; background: #ee2f2e; }
  .deck-live { position: relative; margin: 14px 0 0; text-align: center; font-size: 10.5px;
    letter-spacing: .2em; text-transform: uppercase; color: rgba(244,242,238,.5); }

  .cta-inline { display: inline-flex; align-items: center; gap: 10px; margin-top: 6px; background: var(--brand-solid);
    color: #fff; text-decoration: none; font-weight: var(--w-heading); font-size: 16px; padding: 13px 26px; transition: background .2s; }
  .cta-inline:hover { background: #d61f1e; }

  /* ── Narrow screens: the fan becomes a plain grid, every Apply visible ── */
  @media (max-width: 900px) {
    .stage-outer { padding: 30px var(--wrap-pad); }
    .stage { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px; height: auto; perspective: none; overflow: visible; padding-inline: 0;
      scroll-snap-type: none; cursor: default; }
    .card { position: static; flex: none; width: auto; height: auto; min-height: 340px;
      transform: none !important; opacity: 1 !important; filter: none !important; z-index: auto !important; }
    .card:not(.is-active) .card-apply { opacity: 1; pointer-events: auto; }
    .deck-ctrl, .deck-live { display: none; }
    .stage { cursor: default; }
  }
  @media (prefers-reduced-motion: reduce) {
    .card, .card-apply, .dot { transition: none; }
  }
</style>
