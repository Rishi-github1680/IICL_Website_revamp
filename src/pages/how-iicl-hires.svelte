<script>
  // How IICL Hires — the exact "Talent Pathways" mock-up (talent-pathways.tsx, HiringPage
  // + HiringVisual). Site Nav/Footer replace the pack header/footer; mailto: actions become
  // production /contactus?intent= routes (README_DEVELOPER_HANDOFF). The three-business-day
  // first-shortlist figure is kept with the pack's full qualifying footnote — a qualified
  // target, not a guaranteed time-to-hire.
  import Nav from '../Nav.svelte';
  import Footer from '../Footer.svelte';
  import '../talent-pathways.css';
  import { breadcrumbSchema, serviceSchema, jsonLd } from '../seo.js';

  const PATH = '/how-iicl-hires';

  const stages = [
    { n: '01', title: 'Requirement intelligence', text: 'Align the business outcome, team context, seniority, location, work mode, commercials and decision owners.', output: 'Approved requirement brief' },
    { n: '02', title: 'Role scorecard',           text: 'Convert the job description into measurable outcomes, must-have evidence, trainable skills and rejection criteria.', output: 'Evidence-led role scorecard' },
    { n: '03', title: 'Talent map & sourcing',    text: 'Map primary and adjacent talent pools, target organisations, communities, constraints and outreach channels.', output: 'Search strategy + market signals' },
    { n: '04', title: 'Structured screening',     text: 'Validate motivation, experience claims, capability evidence, work-mode fit and the agreed commercial range.', output: 'Qualified candidate dossier' },
    { n: '05', title: 'Capability validation',    text: 'Use role-aligned technical, functional or portfolio evidence with qualified human reviewers.', output: 'Comparable assessment evidence' },
    { n: '06', title: 'Client decision',          text: 'Coordinate interviews, surface risks and drive clear select, hold or reject decisions with timely feedback.', output: 'Documented selection decision' },
    { n: '07', title: 'Close, onboard & continue', text: 'Coordinate offer, verification, notice-period risk, joining readiness and agreed post-joining governance.', output: 'Ready hire or mobilised team' },
  ];

  const principles = [
    ['01', 'Role clarity before search'],
    ['02', 'Evidence before recommendation'],
    ['03', 'Human-owned decisions'],
    ['04', 'Candidate privacy by design'],
  ];

  const dossier = [
    ['ROLE OUTCOMES',   'Evidence mapped to the agreed scorecard'],
    ['CAPABILITY PROOF', 'Projects, decisions and role-relevant depth'],
    ['CONSTRAINTS',     'Location, work mode, notice and availability'],
    ['MOTIVATION',      'Reason for change and opportunity alignment'],
    ['ASSESSMENT',      'Comparable reviewer evidence where agreed'],
    ['RISKS',           'Gaps, dependencies and points to validate'],
  ];

  const responsibilities = [
    ['Validate the role scorecard',                    'Name qualified decision owners'],
    ['Provide structured screening evidence',          'Run the agreed assessment stages'],
    ['Coordinate interviews and candidate experience', 'Return timely, evidence-based feedback'],
    ['Track closure and joining risks',                'Prepare offer, access and onboarding'],
  ];

  const governance = [
    ['CONSENT',      'Candidate representation and profile sharing use an approved purpose and consent basis.'],
    ['PRIVACY',      'Personal and assessment data stay outside website analytics and unauthorised channels.'],
    ['FAIRNESS',     'AI-assisted tools support the workflow; qualified humans retain consequential decisions.'],
    ['TRACEABILITY', 'Shortlist, feedback, hold, rejection and selection outcomes remain documented.'],
  ];

  let activeStage = $state(0);
  const prev = () => activeStage = (activeStage + stages.length - 1) % stages.length;
  const next = () => activeStage = (activeStage + 1) % stages.length;

  const schema = jsonLd(
    breadcrumbSchema([{ name: 'Home', href: '/' }, { name: 'How IICL Hires', href: PATH }]),
    serviceSchema({
      name: 'How IICL Hires',
      description: 'A transparent, evidence-led seven-stage process from role scorecard and talent intelligence to assessment, selection, onboarding and continuity.',
      path: PATH,
      serviceType: 'Evidence-led technology hiring process',
    }),
  );
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${schema}<\/script>`}
</svelte:head>

<a class="skip-link" href="#main">Skip to main content</a>
<Nav />

<div class="tp-root">
  <main id="main">
    <!-- Hero -->
    <section class="hero hero-hiring">
      <div class="hero-backdrop"></div>
      <div class="wrap hero-inner">
        <div class="hero-copy">
          <span class="eyebrow"><i></i>THE IICL TALENT ENGINE</span>
          <h1>See exactly how a requirement becomes a ready hire.</h1>
          <p>A transparent, evidence-led process from role scorecard and talent intelligence to assessment, selection, onboarding and continuity.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#hiring-process">Walk through the process <span aria-hidden="true">↗</span></a>
            <a class="button button-ghost" href="#hiring-final-cta">Share a requirement <span aria-hidden="true">↓</span></a>
          </div>
          <ul class="signal-row" aria-label="Capability signals">
            <li>Clear gates</li>
            <li>Human decisions</li>
            <li>Visible evidence</li>
          </ul>
        </div>
        <div class="hero-visual">
          <div class="hero-system hiring-system" aria-label="Seven-stage transparent hiring pipeline">
            <div class="system-grid"></div>
            <div class="pipeline-track">
              {#each stages as stage, i}
                <div class="pipeline-node">
                  <span>{stage.n}</span>
                  <i class={i < 5 ? 'complete' : ''}></i>
                </div>
              {/each}
            </div>
            <div class="pipeline-card">
              <span>VISIBLE OUTPUT</span>
              <strong>Evidence-backed shortlist</strong>
              <p>Every stage has a decision, owner and output.</p>
            </div>
            <div class="system-status">
              <span class="live-dot"></span>
              REQUIREMENT → EVIDENCE → READY HIRE
            </div>
          </div>
        </div>
      </div>
      <a class="scroll-cue" href="#page-content"><span>Explore</span><i></i></a>
    </section>

    <!-- Principles -->
    <section class="section section-paper" id="page-content">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow dark"><i></i>NO BLACK-BOX RECRUITMENT</span>
          <h2>Every stage has an owner, decision and evidence output.</h2>
          <p>This page lifts the process-heavy content out of the GCC page and turns it into a transparent experience useful to every IICL talent buyer.</p>
        </div>
        <div class="principle-strip">
          {#each principles as [n, label]}
            <div>
              <span>{n}</span>
              <strong>{label}</strong>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Seven-stage stepper -->
    <section class="section section-ink" id="hiring-process">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow dark"><i></i>THE SEVEN-STAGE TALENT ENGINE</span>
          <h2>Click through the complete requirement-to-readiness path.</h2>
          <p>The interactive stepper gives the development team a reusable component for both permanent hiring and team mobilisation.</p>
        </div>
        <div class="process-layout">
          <div class="process-rail" role="tablist" aria-label="Hiring stages">
            {#each stages as stage, i}
              <button type="button" role="tab" aria-selected={activeStage === i} class="process-step {activeStage === i ? 'is-active' : ''}" onclick={() => activeStage = i}>
                <span>{stage.n}</span>
                <strong>{stage.title}</strong>
                <i></i>
              </button>
            {/each}
          </div>
          <div class="process-detail" role="tabpanel">
            <span class="detail-number">{stages[activeStage].n}</span>
            <small>ACTIVE STAGE</small>
            <h3>{stages[activeStage].title}</h3>
            <p>{stages[activeStage].text}</p>
            <div class="output-card">
              <span>REQUIRED OUTPUT</span>
              <strong>{stages[activeStage].output}</strong>
            </div>
            <div class="stage-controls">
              <button type="button" onclick={prev}>← Previous</button>
              <button type="button" onclick={next}>Next stage →</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Candidate dossier -->
    <section class="section section-soft">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow dark"><i></i>WHAT A QUALIFIED PROFILE CONTAINS</span>
          <h2>Move from a résumé attachment to a decision-ready candidate dossier.</h2>
        </div>
        <div class="dossier">
          <div class="dossier-id">
            <span>PROFILE / 001</span>
            <div class="avatar-placeholder">HN</div>
            <strong>Candidate identity protected</strong>
            <small>Illustrative mock-up</small>
          </div>
          <div class="dossier-grid">
            {#each dossier as [title, copy]}
              <div>
                <span>{title}</span>
                <p>{copy}</p>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </section>

    <!-- Shared decisions -->
    <section class="section section-paper">
      <div class="wrap split-layout">
        <div class="section-heading">
          <span class="eyebrow dark"><i></i>SHARED DECISION DISCIPLINE</span>
          <h2>IICL and the customer each own critical parts of hiring quality.</h2>
        </div>
        <div class="responsibility-table">
          <div class="responsibility-head">
            <span>IICL</span>
            <span>Customer</span>
          </div>
          {#each responsibilities as [left, right]}
            <div class="responsibility-row">
              <span>{left}</span>
              <span>{right}</span>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Timing -->
    <section class="section evidence-band">
      <div class="wrap evidence-grid">
        <div>
          <span>QUALIFIED TIMING</span>
          <strong>First shortlist target</strong>
          <b>03</b>
          <small>business days*</small>
        </div>
        <p>*After the role scorecard, location, work mode, compensation or commercial range, and assessment process are confirmed. Niche complexity, scale and market conditions can require a different plan. This is not a guaranteed time-to-hire.</p>
      </div>
    </section>

    <!-- Governance -->
    <section class="section section-soft">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow dark"><i></i>GOVERNANCE BUILT INTO THE FLOW</span>
          <h2>Protect candidate trust while improving hiring visibility.</h2>
        </div>
        <div class="governance-grid">
          {#each governance as [title, copy]}
            <article>
              <span>{title}</span>
              <p>{copy}</p>
            </article>
          {/each}
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="final-cta" id="hiring-final-cta">
      <div class="cta-grid-bg"></div>
      <div class="wrap final-inner">
        <span class="eyebrow light"><i></i>START WITH ROLE CLARITY</span>
        <h2>Share the outcome, not only the job description.</h2>
        <p>IICL will help turn the requirement into a role scorecard, search strategy, assessment path and decision-ready hiring plan.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="/contactus?intent=talent-requirement">Structure a talent requirement <span aria-hidden="true">↗</span></a>
          <a class="button button-dark-ghost" href="/gcc-technology-teams">Explore GCC teams <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  </main>
</div>

<Footer />
