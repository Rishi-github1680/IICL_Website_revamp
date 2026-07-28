<script>
  import Layout from '../Layout.svelte';
  import { PAGE_ART } from '../menu.js';
  import MirrorHall from '../MirrorHall.svelte';
  import ArticleGrid from '../ArticleGrid.svelte';
  import { POSTS, CASES } from '../posts.js';

  // Category filter. The hall shows whichever panels match.
  const CATS = ['All', ...new Set(POSTS.map((p) => p.category))];
  let active = $state('All');
  const filtered = $derived(active === 'All' ? POSTS : POSTS.filter((p) => p.category === active));
  const countFor = (c) => (c === 'All' ? POSTS.length : POSTS.filter((p) => p.category === c).length);
</script>

<Layout
  kicker="Company"
  h1="Blog"
  lede="Practical articles on enterprise AI agents, voice automation, WhatsApp commerce and industry AI adoption, written by the IICL delivery team."
  heroImage={PAGE_ART["blog"]}
  path="/blog"
  cta="Discuss Your AI Use Case"
>
  <section class="page-section hall-sec">
    <MirrorHall
      items={filtered}
      collection="Nº 01"
      title="The Journal"
      sub="Field notes from the people who build these systems — suspended over still water."
    >
      <div class="cat-row" role="group" aria-label="Filter articles by topic">
        {#each CATS as c}
          <button class="cat-chip mono" class:active={active === c} onclick={() => (active = c)}>
            {c} <i>{countFor(c)}</i>
          </button>
        {/each}
      </div>
    </MirrorHall>
  </section>

  <!-- The case studies belong beside the writing: same audience, different evidence. -->
  <section class="page-section">
    <div class="wrap">
      <ArticleGrid posts={CASES} featured={false} kicker="Use cases" heading="Deployments, and what changed" />
      <p class="para uc-more">
        Each one describes the problem, what was built and what was measured afterwards —
        <a href="/use-cases">see all use cases</a>.
      </p>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Written by the people who build the systems</h2>
      <div class="section-body">
        <p class="para">These articles come from the engineers and consultants who deliver this work, not from a marketing team. They cover the questions that come up before a project starts: which processes suit automation, what integration actually involves, where a person has to stay in the loop, and what tends to go wrong.</p>
        <p class="para">If you are researching a specific problem, the <a href="/use-cases">use cases</a> describe complete deployments, and the <a href="/ai-genai-services">services pages</a> explain how an engagement is scoped and governed.</p>
      </div>
    </div>
  </section>
</Layout>

<style>
  /* The hall is full-bleed and dark — strip the section chrome around it. */
  .hall-sec { padding: 0; border-bottom: 0; }

  .cat-row { position: relative; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin: -18px 0 46px; }
  .cat-chip { display: inline-flex; align-items: center; gap: 9px; font-size: 10.5px; letter-spacing: .22em;
    text-transform: uppercase; color: rgba(244,242,238,.62); background: transparent;
    border: 1px solid rgba(255,255,255,.18); border-radius: 999px; padding: 9px 18px; cursor: pointer;
    transition: border-color .25s, color .25s, background .25s; }
  .cat-chip:hover { border-color: rgba(238,47,46,.6); color: #fff; }
  .cat-chip.active { background: #ee2f2e; border-color: #ee2f2e; color: #fff; }
  .cat-chip i { font-style: normal; font-size: 9.5px; padding: 1px 7px; border-radius: 999px; background: rgba(255,255,255,.14); }
  .mono { font-family: var(--font-mono); }
  .uc-more { margin-top: 22px; }
  .uc-more a { color: #b81c1c; }
</style>
