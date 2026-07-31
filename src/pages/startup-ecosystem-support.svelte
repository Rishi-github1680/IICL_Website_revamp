<script>
  // Startup Ecosystem Support — the exact "Talent Pathways" mock-up (talent-pathways.tsx,
  // StartupPage + StartupVisual). Site Nav/Footer replace the pack header/footer; mailto:
  // actions become production /contactus?intent= routes (README_DEVELOPER_HANDOFF).
  import Nav from '../Nav.svelte';
  import Footer from '../Footer.svelte';
  import '../talent-pathways.css';
  import { breadcrumbSchema, serviceSchema, jsonLd } from '../seo.js';

  const PATH = '/startup-ecosystem-support';

  const phases = [
    { code: '0→1',    title: 'Prove the product',    description: 'Shape the MVP, validate the experience and build the minimum dependable architecture.',   services: ['Product discovery', 'MVP engineering', 'AI/GenAI validation', 'Fractional architecture'] },
    { code: '1→10',   title: 'Build the engine',     description: 'Add specialist capability, strengthen delivery rhythm and remove fragile technology choices.', services: ['Dedicated product squad', 'Cloud & DevOps', 'Data foundations', 'Niche hiring'] },
    { code: '10→100', title: 'Scale with confidence', description: 'Evolve the platform, operating model and engineering organisation for enterprise growth.',  services: ['Platform & SRE', 'Security readiness', 'GCC capability pods', 'Managed delivery'] },
  ];

  const pillars = [
    ['PO', 'Product & experience', 'Discovery, product strategy, UX, MVP and platform evolution.'],
    ['AI', 'AI-native advantage',  'GenAI use-case validation, applied AI engineering and responsible scale.'],
    ['EN', 'Engineering velocity', 'Dedicated squads, architecture, quality and product delivery rhythm.'],
    ['CL', 'Cloud foundations',    'Cloud, DevOps, data foundations, observability, SRE and FinOps.'],
    ['SE', 'Security readiness',   'Practical security, identity, privacy and enterprise-buyer readiness.'],
    ['TA', 'Specialist talent',    'Niche permanent hiring, flexible specialists and capability pods.'],
  ];

  const tracks = [
    ['BUILD',    'Launch the product',      'A focused discovery, MVP or AI proof-of-value track with clear scope and acceptance.', 'Product studio'],
    ['BOOST',    'Add specialist velocity', 'Experienced engineers or a dedicated squad extend the founder’s core team.',           'Embedded capability'],
    ['BACKBONE', 'Strengthen for scale',    'Cloud, SRE, security, data and operating discipline prepare the platform for growth.', 'Scale foundation'],
  ];

  const decisions = [
    ['Outcome',      'What must change for the customer or business?'],
    ['Evidence',     'How will the product decision be validated?'],
    ['Architecture', 'What is reversible now—and what becomes expensive later?'],
    ['Ownership',    'Who owns product, technology, data and release decisions?'],
    ['Scale gate',   'What evidence justifies the next investment?'],
  ];

  const ecosystem = ['Founders', 'Product leaders', 'Investors', 'Accelerators', 'Enterprise buyers', 'Specialist talent'];

  const pad = (i) => String(i + 1).padStart(2, '0');
  let activePhase = $state(0);

  const schema = jsonLd(
    breadcrumbSchema([{ name: 'Home', href: '/' }, { name: 'Startup Ecosystem Support', href: PATH }]),
    serviceSchema({
      name: 'Startup Ecosystem Support',
      description: 'One integrated path for founders across product engineering, AI, cloud, governance and specialist talent from MVP to scale.',
      path: PATH,
      serviceType: 'Startup technology and talent partnership',
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
    <section class="hero hero-startup">
      <div class="hero-backdrop"></div>
      <div class="wrap hero-inner">
        <div class="hero-copy">
          <span class="eyebrow"><i></i>STARTUP ECOSYSTEM · BUILD TO SCALE</span>
          <h1>Turn a bold product thesis into scalable technology.</h1>
          <p>From the first architecture decision to a scale-ready engineering organisation, IICL gives founders one integrated path for product, AI, cloud and specialist talent.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#startup-final-cta">Map your scale journey <span aria-hidden="true">↗</span></a>
            <a class="button button-ghost" href="#founder-runway">See the founder runway <span aria-hidden="true">↓</span></a>
          </div>
          <ul class="signal-row" aria-label="Capability signals">
            <li>MVP to scale</li>
            <li>Product + talent</li>
            <li>Founder-speed governance</li>
          </ul>
        </div>
        <div class="hero-visual">
          <div class="hero-system startup-system" aria-label="Startup scale runway from product validation to platform scale">
            <div class="system-grid"></div>
            <div class="runway-line"></div>
            {#each phases as phase, i}
              <div class="runway-stop stop-{i + 1}">
                <span>{phase.code}</span>
                <strong>{phase.title}</strong>
                <i></i>
              </div>
            {/each}
            <div class="runway-pulse"></div>
            <div class="system-status">
              <span class="live-dot"></span>
              PRODUCT → PLATFORM → SCALE
            </div>
          </div>
        </div>
      </div>
      <a class="scroll-cue" href="#page-content"><span>Explore</span><i></i></a>
    </section>

    <!-- Pillars -->
    <section class="section section-paper" id="page-content">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow dark"><i></i>ONE PARTNER ACROSS THE SCALE CURVE</span>
          <h2>A startup should not rebuild its technology partnership at every stage.</h2>
          <p>This page is built from scratch around the founder journey. It unifies product engineering, AI, cloud, governance and specialist talent without making IICL look like an incubator or investor.</p>
        </div>
        <div class="pillar-grid">
          {#each pillars as [code, title, copy]}
            <article class="pillar-card">
              <span>{code}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          {/each}
        </div>
      </div>
    </section>

    <!-- Founder runway -->
    <section class="section section-ink" id="founder-runway">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow dark"><i></i>THE FOUNDER RUNWAY</span>
          <h2>Support that changes as the company changes.</h2>
          <p>Select a stage to see the relevant outcomes and IICL support model.</p>
        </div>
        <div class="phase-tabs" role="tablist" aria-label="Startup growth stages">
          {#each phases as phase, i}
            <button class="phase-tab {activePhase === i ? 'is-active' : ''}" role="tab" aria-selected={activePhase === i} type="button" onclick={() => activePhase = i}>
              <span>{phase.code}</span>
              <strong>{phase.title}</strong>
            </button>
          {/each}
        </div>
        <div class="phase-detail" role="tabpanel">
          <div>
            <span class="phase-code">{phases[activePhase].code}</span>
            <h3>{phases[activePhase].title}</h3>
            <p>{phases[activePhase].description}</p>
          </div>
          <ul>
            {#each phases[activePhase].services as service, i}
              <li><span>{pad(i)}</span>{service}</li>
            {/each}
          </ul>
        </div>
      </div>
    </section>

    <!-- Engagement tracks -->
    <section class="section section-soft">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow dark"><i></i>THREE ENGAGEMENT TRACKS</span>
          <h2>Choose the support layer the startup actually needs.</h2>
        </div>
        <div class="track-grid">
          {#each tracks as [code, title, copy, label]}
            <article>
              <span>{code}</span>
              <small>{label}</small>
              <h3>{title}</h3>
              <p>{copy}</p>
              <a href="#startup-final-cta">Discuss this track <span aria-hidden="true">↗</span></a>
            </article>
          {/each}
        </div>
      </div>
    </section>

    <!-- Decision board -->
    <section class="section section-paper">
      <div class="wrap split-layout">
        <div class="section-heading">
          <span class="eyebrow dark"><i></i>FOUNDER-SPEED, ENTERPRISE DISCIPLINE</span>
          <h2>Move quickly without hiding architecture and delivery decisions.</h2>
          <p>The design should show that speed and governance are not opposites. Keep decisions visible and apply control in proportion to the startup’s stage and customer obligations.</p>
        </div>
        <div class="decision-board">
          {#each decisions as [title, copy], i}
            <div>
              <span>{pad(i)}</span>
              <strong>{title}</strong>
              <p>{copy}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Ecosystem band -->
    <section class="section ecosystem-band">
      <div class="wrap">
        <span class="eyebrow light"><i></i>STARTUP ECOSYSTEM CONNECTIONS</span>
        <h2>Built for the network around the founder.</h2>
        <div class="ecosystem-row">
          {#each ecosystem as item, i}
            <div>
              <span>{pad(i)}</span>
              <strong>{item}</strong>
            </div>
          {/each}
        </div>
        <p>Partnership, referral, portfolio-support and co-innovation models should be described only after IICL confirms the relevant programme and commercial structure.</p>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="final-cta" id="startup-final-cta">
      <div class="cta-grid-bg"></div>
      <div class="wrap final-inner">
        <span class="eyebrow light"><i></i>MAP THE NEXT STAGE</span>
        <h2>Tell us what you are building—and what must be true next.</h2>
        <p>Start with the product thesis, current stage, team, technology constraints, target milestone and enterprise-readiness requirements.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="/contactus?intent=gcc-team-expansion&source=/startup-ecosystem-support">Map your startup scale journey <span aria-hidden="true">↗</span></a>
          <a class="button button-dark-ghost" href="/niche-technology-hiring">Explore niche hiring <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  </main>
</div>

<Footer />
