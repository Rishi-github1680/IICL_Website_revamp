<script>
  // The journal. The page used to open with a standard dark hero above the hall, which
  // meant two full-bleed dark blocks stacked before any article was visible. The hall
  // is the landing now — it carries its own title and lede — so the first thing on the
  // page is the writing.
  //
  // Use cases used to sit here as a second grid. They are a different kind of evidence
  // with a different audience, so they have their own page again at /use-cases.
  import BareLayout from '../BareLayout.svelte';
  import MirrorHall from '../MirrorHall.svelte';
  import ArticleGrid from '../ArticleGrid.svelte';
  import { POSTS } from '../posts.js';

  // Two hubs rather than one list: a guide answers "how do I do this", a field note
  // records what we learned doing it. The audit asked for them separated and for
  // representative workflows labelled as guides rather than deployments.
  const GUIDES = POSTS.filter((p) => p.kind === 'guide');
  const NOTES = POSTS.filter((p) => p.kind !== 'guide');

  const CATS = ['All', ...new Set(POSTS.map((p) => p.category))];
  let active = $state('All');
  const filtered = $derived(active === 'All' ? POSTS : POSTS.filter((p) => p.category === active));
  const countFor = (c) => (c === 'All' ? POSTS.length : POSTS.filter((p) => p.category === c).length);

  // What each topic actually covers, so the filter row is a guide rather than a set of
  // bare labels.
  const TOPICS = [
    { t: 'AI Voice Agents', d: 'Latency, barge-in, multilingual handling and clean handover to a person.' },
    { t: 'IT Support & Automation', d: 'Ticket triage, resolution verification, and why "resolved" often is not.' },
    { t: 'WhatsApp & AI Chatbots', d: 'Commerce, payments and support inside one thread, on approved templates.' },
    { t: 'Adopting AI', d: 'Choosing the first process, scoping a Proof of Value, and where people stay in the loop.' },
    { t: 'Engineering', d: 'What integration really involves once an agent has to touch systems you already run.' },
  ];
</script>

<BareLayout
  title="The Journal"
  path="/blog"
  cta="Discuss a Workflow"
  ctaHref="/contactus?intent=enterprise-ai-use-case"
  bandKicker="Keep reading"
  bandHeading="Read the guide that matches your problem, or bring us the workflow behind it.">
  <!-- The hall is the landing: its own title, lede and filter row. -->
  <section class="page-section hall-sec">
    <MirrorHall
      items={filtered}
      collection="Nº 01"
      title="The Journal"
      heading="h1"
      sub="Field notes from the people who build these systems."
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

  <!-- Two hubs. Filtering narrows both; an empty hub hides itself. -->
  {#if filtered.filter((p) => p.kind === 'guide').length}
    <section class="page-section">
      <div class="wrap">
        <ArticleGrid posts={filtered.filter((p) => p.kind === 'guide')} featured={false}
          kicker="Implementation guides"
          heading="How to approach the decision" />
        <p class="para hub-note">Guides describe how we would approach a problem and what has to be true for it to work. They are not accounts of a specific customer deployment &mdash; those are the <a href="/use-cases">use cases</a>.</p>
      </div>
    </section>
  {/if}

  {#if filtered.filter((p) => p.kind !== 'guide').length}
    <section class="page-section">
      <div class="wrap">
        <ArticleGrid posts={filtered.filter((p) => p.kind !== 'guide')} featured={false}
          kicker="Field notes"
          heading="What the work actually involves" />
      </div>
    </section>
  {/if}

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What we write about</h2>
      <div class="section-body">
        <p class="para">These articles come from the engineers and consultants who deliver the work, not from a marketing team. They cover the questions that come up before a project starts.</p>
      </div>
      <ul class="topics">
        {#each TOPICS as t}
          <li><strong>{t.t}</strong><span>{t.d}</span></li>
        {/each}
      </ul>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Looking for deployments rather than articles?</h2>
      <div class="section-body">
        <p class="para">The use-case pages describe complete workflows end to end — what the process looked like, what was built, and what it is designed to improve.</p>
        <p class="para"><a class="inline-cta" href="/use-cases">See the use cases <span class="mono">&rarr;</span></a></p>
      </div>
    </div>
  </section>
</BareLayout>

<style>
  .page-section.hall-sec { padding: 0; border-bottom: 0; }

  .cat-row { position: relative; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin: -18px 0 46px; }
  .cat-chip { display: inline-flex; align-items: center; gap: 9px; font-size: 10.5px; letter-spacing: .22em;
    text-transform: uppercase; color: rgba(244,242,238,.62); background: transparent;
    border: 1px solid rgba(255,255,255,.18); border-radius: 999px; padding: 9px 18px; cursor: pointer;
    transition: border-color .25s, color .25s, background .25s; }
  .cat-chip:hover { border-color: rgba(238,47,46,.6); color: #fff; }
  .cat-chip.active { background: var(--brand-solid); border-color: #ee2f2e; color: #fff; }
  .cat-chip i { font-style: normal; font-size: 9.5px; padding: 1px 7px; border-radius: 999px; background: rgba(255,255,255,.14); }
  .mono { font-family: var(--font-mono); }

  .topics { list-style: none; margin: 16px 0 0; padding: 0; display: grid; gap: 12px; }
  .topics li { background: #fff; border: 1px solid var(--line); border-radius: 8px; padding: 15px 18px; display: grid; gap: 4px; }
  .topics strong { font-size: 15px; font-weight: var(--w-heading); color: var(--ink); }
  .topics span { font-size: 14px; line-height: 1.55; color: #40434a; }

  .hub-note { margin-top: 18px; max-width: 74ch; font-size: var(--fs-small); color: var(--muted); }
  .inline-cta { color: var(--brand-ink); font-weight: var(--w-medium); text-decoration: none; }
  .inline-cta:hover { text-decoration: underline; }
</style>
