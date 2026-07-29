<script>
  // The Crossing — the story world on its own page, at full length. The world and all
  // the scroll machinery live in StoryHero; this page only supplies the copy.
  import Nav from '../Nav.svelte';
  import Footer from '../Footer.svelte';
  import StoryHero from '../StoryHero.svelte';

  const PANELS = [
    { n: '01 — The gap', h: 'First, it studies the gap.',
      note: 'The near side is alive. The far side is dark. Red signals gather at the edge, measuring the distance.',
      at: [0.17, 0.21, 0.27, 0.31] },
    { n: '02 — Attempt', h: 'It builds a bridge. The first design fails.',
      note: 'The span tears off and falls. The wreckage stays down in the canyon — remember it.',
      at: [0.36, 0.4, 0.47, 0.52] },
    { n: '03 — Memory', h: 'It goes back to the edge. And remembers.',
      note: 'The wreckage below glows — the lesson is still down there. This time: supports first, on a new line.',
      at: [0.6, 0.65, 0.76, 0.82] },
    { n: '04 — The crossing', h: 'The far side comes online.',
      note: 'The bridge that works carries its first signal, and the dark side of the canyon lights up. The wreckage stays below — the lesson that built the bridge that holds.',
      at: [0.91, 0.95, 1.5, 2] },
  ];

  const STATUS = [
    [0, 'SYSTEM ACTIVE — SCANNING TERRAIN'],
    [0.05, 'GAP DETECTED'],
    [0.15, 'MEASURING THE CROSSING'],
    [0.32, 'BUILDING BRIDGE — DESIGN 01'],
    [0.42, 'DESIGN 01 COLLAPSED — WRECKAGE LOGGED'],
    [0.56, 'RE-EXAMINING — WRECKAGE RECALLED'],
    [0.66, 'BUILDING BRIDGE — DESIGN 02 · SUPPORTED'],
    [0.8, 'CROSSING COMPLETE — FIRST SIGNAL SENT'],
    [0.9, 'FAR SIDE ONLINE'],
  ];
</script>

<div class="st-root">
  <Nav />

  <StoryHero
    kicker="Intelligence India.Com Limited"
    title="Every business stands on one side of a gap."
    lede="On the far side: what AI makes possible. Scroll — and watch an intelligent system work out how to get across. IICL builds the crossing."
    panels={PANELS}
    status={STATUS}
    screens={780}
  >
    <div class="st-actions">
      <a class="st-cta" href="/contactus">Build what comes next <span class="mono">→</span></a>
      <a class="st-ghost" href="/#products">Explore the products</a>
    </div>
  </StoryHero>

  <Footer />
</div>

<style>
  .st-root { background: #050505; color: #f4f2ee; font-family: var(--font); }
  .mono { font-family: var(--font-mono); }
  .st-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; }
  .st-cta { display: inline-flex; align-items: center; gap: 10px; background: var(--brand-solid, #d81f1e); color: #fff;
    text-decoration: none; font-weight: 600; font-size: 15.5px; padding: 15px 30px; transition: background .2s; }
  .st-cta:hover { background: #d61f1e; }
  .st-ghost { display: inline-flex; align-items: center; color: #f4f2ee; text-decoration: none; font-weight: 500;
    font-size: 15.5px; padding: 14px 30px; border: 1px solid rgba(243,243,244,0.28); transition: border-color .2s; }
  .st-ghost:hover { border-color: rgba(243,243,244,0.6); }
</style>
