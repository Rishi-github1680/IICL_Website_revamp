<script>
  // Use cases, back on their own page. These are workflow dossiers rather than
  // articles, so they get a different treatment from the journal: a numbered index
  // where each entry states the process, what was built and what it is meant to move —
  // readable without opening anything.
  //
  // Every entry is classified per Spec G12. Until a baseline, measurement period,
  // calculation and customer approval exist, they are illustrative and say so.
  import Layout from '../Layout.svelte';
  import { PAGE_ART } from '../menu.js';
  import { CASES } from '../posts.js';

  const DETAIL = {
    '/usecase-ivaak-healthcare': {
      process: 'Inbound patient calls, appointment booking and reminders',
      built: 'A voice agent answering every inbound call, booking against the existing scheduling system and escalating anything clinical to staff',
      moves: 'Calls answered at peak, fewer missed appointments, reception freed from repeat questions',
      systems: 'Scheduling platform · Telephony · WhatsApp',
    },
    '/usecase-ivaak-realestate': {
      process: 'Inbound property enquiries across ads, portals and social',
      built: 'Voice agents qualifying buyers on arrival and scheduling site visits straight into the sales calendar',
      moves: 'Enquiries contacted before they go cold, fewer lost between channels',
      systems: 'CRM · Telephony · Campaign sources',
    },
    '/usecase-ivaak-customercare': {
      process: 'Tier-one support arriving by voice, WhatsApp, chat and email',
      built: 'One agent handling the repeatable contacts and handing the rest to a person with the full conversation attached',
      moves: 'Shorter waits on routine contacts, context preserved through handover',
      systems: 'Help desk · WhatsApp · Chat · Email',
    },
  };
</script>

<Layout
  kicker="Insights"
  h1="Use Cases"
  lede="Complete workflows, described end to end: the process as it stood, what was built around it, and what the design is meant to improve."
  heroImage={PAGE_ART['use-cases']}
  path="/use-cases"
  cta="Discuss a Workflow"
  ctaHref="/contactus?intent=enterprise-ai-use-case"
  bandKicker="Start with one workflow"
  bandHeading="Tell us what the work looks like today and we will tell you honestly whether this approach suits it.">
  <section class="page-section">
    <div class="wrap">
      <p class="para uc-class">
        <strong>Illustrative scenarios.</strong> These describe representative workflow
        patterns, not measured customer deployments. We publish figures only with a
        baseline, a measurement period, a calculation method and the customer's approval.
      </p>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>The dossiers</h2>
      <ol class="uc-list">
        {#each CASES as c, i}
          {@const d = DETAIL[c.href] || {}}
          <li class="uc">
            <a class="uc-link" href={c.href}>
              <span class="uc-n mono">{String(i + 1).padStart(2, '0')}</span>
              <span class="uc-shot">
                <img src={c.img} alt={c.alt || ''} loading="lazy" />
              </span>
              <span class="uc-body">
                <span class="uc-cat mono">{c.category}</span>
                <strong class="uc-title">{c.title}</strong>
                <span class="uc-ex">{c.excerpt}</span>
                <span class="uc-rows">
                  <span><em class="mono">Process</em>{d.process}</span>
                  <span><em class="mono">Built</em>{d.built}</span>
                  <span><em class="mono">Designed to move</em>{d.moves}</span>
                  <span><em class="mono">Systems</em>{d.systems}</span>
                </span>
                <span class="uc-go mono">Read the full dossier &rarr;</span>
              </span>
            </a>
          </li>
        {/each}
      </ol>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>How we would scope yours</h2>
      <div class="section-body">
        <p class="para">We start from the process, not the technology: what happens today, how often, which systems are involved, who owns the decision, and what a measurable improvement would look like. Some candidates come out of that review better served by deterministic automation than by AI — we will say so.</p>
        <p class="para"><a class="inline-cta" href="/blog">Read the journal <span class="mono">&rarr;</span></a></p>
      </div>
    </div>
  </section>
</Layout>

<style>
  .mono { font-family: var(--font-mono); }
  .uc-class { padding: 14px 18px; border: 1px solid var(--line); border-left: 3px solid var(--brand);
    border-radius: 0 6px 6px 0; background: #fff; font-size: var(--fs-small); line-height: 1.65; color: var(--muted); }
  .uc-class strong { color: var(--ink); }

  .uc-list { list-style: none; margin: 16px 0 0; padding: 0; display: grid; gap: 1px;
    background: var(--line); border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
  .uc { background: #fff; }
  .uc-link { display: grid; grid-template-columns: 52px 232px 1fr; gap: 0 22px; padding: 22px 22px 22px 16px;
    text-decoration: none; transition: background .2s ease; align-items: start; }
  .uc-link:hover { background: #faf9f7; }
  .uc-n { font-size: 12px; color: var(--brand); padding-top: 4px; }
  /* Landscape thumbnail, matching the ratio the journal cards use. */
  .uc-shot { display: block; aspect-ratio: 16 / 10; border-radius: 8px; overflow: hidden;
    background: #0b0c0e; border: 1px solid var(--line); }
  .uc-shot img { width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform .5s cubic-bezier(0.22,1,0.36,1); }
  .uc-link:hover .uc-shot img { transform: scale(1.04); }

  .uc-body { display: grid; gap: 7px; }
  .uc-cat { font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--muted); }
  .uc-title { font-size: 19px; font-weight: var(--w-heading); color: var(--ink); letter-spacing: -.015em; }
  .uc-link:hover .uc-title { color: var(--brand); }
  .uc-ex { font-size: var(--fs-body); line-height: 1.6; color: #40434a; max-width: 74ch; }

  .uc-rows { display: grid; gap: 5px; margin-top: 6px; padding-top: 12px; border-top: 1px solid var(--line); }
  .uc-rows span { display: grid; grid-template-columns: 150px 1fr; gap: 14px;
    font-size: 13.5px; line-height: 1.5; color: var(--muted); }
  .uc-rows em { font-style: normal; font-size: 10.5px; letter-spacing: .14em;
    text-transform: uppercase; color: var(--brand); padding-top: 2px; }

  .uc-go { margin-top: 8px; font-size: 12px; letter-spacing: .1em; color: var(--brand); }
  .inline-cta { color: var(--brand); font-weight: var(--w-medium); text-decoration: none; }
  .inline-cta:hover { text-decoration: underline; }

  @media (max-width: 700px) {
    .uc-link { grid-template-columns: 1fr; gap: 14px 0; }
    .uc-shot { max-width: 100%; }
    .uc-rows span { grid-template-columns: 1fr; gap: 2px; }
  }
</style>
