<script>
  // GCC Technology Teams — the exact "Talent Pathways" mock-up from the handoff pack
  // (source/app/talent-pathways.tsx, GccPage). Layout, content and the CSS-drawn
  // capability-core hero are reproduced verbatim; only the integration points the pack
  // itself asks for are adapted: the site's own Nav/Footer replace the mock-up header
  // and footer, and mailto: actions become production /contactus?intent= routes
  // (README_DEVELOPER_HANDOFF, "Integration guidance").
  import Nav from '../Nav.svelte';
  import Footer from '../Footer.svelte';
  import '../talent-pathways.css';
  import { breadcrumbSchema, serviceSchema, jsonLd } from '../seo.js';

  const PATH = '/gcc-technology-teams';
  // Per-deploy cache-buster for the model iframe (see IICLHero) so a header change is
  // never masked by a stale CDN copy of india-map.html.
  const BUILD_ID = typeof __BUILD_ID__ !== 'undefined' ? __BUILD_ID__ : 'dev';
  // City pins overlaid on the static India render (% of the panel).
  const mapPins = [
    { name: 'NCR', left: 40, top: 27 },
    { name: 'MUM', left: 29, top: 58 },
    { name: 'PUN', left: 34, top: 60 },
    { name: 'HYD', left: 42, top: 63 },
    { name: 'BLR', left: 41, top: 77 },
    { name: 'CHE', left: 46, top: 76 },
  ];

  const domains = [
    { code: 'AI', name: 'AI & GenAI',           summary: 'ML engineering, GenAI applications, MLOps, AI platforms and responsible AI.',        roles: 'AI/ML Engineers · GenAI Engineers · MLOps · AI Architects' },
    { code: 'DP', name: 'Data Platforms',       summary: 'Data engineering, lakehouse, streaming, analytics engineering and governance.',      roles: 'Data Engineers · Data Architects · Analytics Engineers · Governance Leads' },
    { code: 'SR', name: 'Cloud & SRE',          summary: 'Cloud, platform engineering, reliability, observability, automation and FinOps.',    roles: 'Cloud Engineers · SREs · Platform Engineers · FinOps Specialists' },
    { code: 'CY', name: 'Cybersecurity',        summary: 'Cloud security, AppSec, identity, SOC, detection engineering and governance.',       roles: 'Security Engineers · IAM · AppSec · SOC · GRC Professionals' },
    { code: 'PE', name: 'Product Engineering',  summary: 'Full-stack, mobile, APIs, microservices, quality engineering and architecture.',     roles: 'Backend · Frontend · Full-stack · Mobile · SDET · Engineering Leads' },
    { code: 'EP', name: 'Enterprise Platforms', summary: 'SAP, ServiceNow, CRM, ERP, ITSM and enterprise application integration.',           roles: 'Consultants · Developers · Architects · Integration Specialists' },
  ];

  const conditions = [
    ['01', 'New capability launch', 'Design leadership, foundational and scale roles around the target operating model.'],
    ['02', 'Niche-skill shortage',  'Build a focused sourcing and assessment strategy for scarce or emerging capability.'],
    ['03', 'Product acceleration',  'Form a dedicated pod or project team around a defined roadmap and interfaces.'],
    ['04', 'Capacity expansion',    'Add flexible specialists without weakening team boundaries and accountability.'],
  ];

  const models = [
    ['Permanent hiring',          'Critical and scalable long-term capability', 'IICL sources and screens against the agreed role scorecard.'],
    ['Flexible technology teams', 'Specialists for a defined period',           'Talent integrates into the customer operating model with agreed support.'],
    ['Dedicated capability pods', 'Stable multi-role unit around a roadmap',     'A pod is designed around outcomes, interfaces and governance.'],
    ['Project-based teams',       'Defined scope and acceptance criteria',       'Delivery structure is agreed through a statement of work.'],
  ];

  const flow = [
    ['01', 'Roadmap',      'Outcomes, priorities and constraints'],
    ['02', 'Team design',  'Roles, seniority and interfaces'],
    ['03', 'Market plan',  'Talent pools and sourcing risks'],
    ['04', 'Assessment',   'Comparable capability evidence'],
    ['05', 'Mobilisation', 'Selection, access and onboarding'],
    ['06', 'Continuity',   'Governance and improvement'],
  ];


  const pad = (i) => String(i + 1).padStart(2, '0');

  const schema = jsonLd(
    breadcrumbSchema([{ name: 'Home', href: '/' }, { name: 'GCC Technology Teams', href: PATH }]),
    serviceSchema({
      name: 'GCC Technology Teams',
      description: 'Establish and expand high-impact GCC technology teams across AI, data, cloud, cybersecurity, product engineering and enterprise platforms.',
      path: PATH,
      serviceType: 'Technology team building and specialist hiring',
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
    <section class="hero hero-gcc">
      <div class="hero-backdrop"></div>
      <div class="wrap hero-inner">
        <div class="hero-copy">
          <span class="eyebrow"><i></i>GCC TECHNOLOGY TEAMS · INDIA</span>
          <h1>Build the capability your GCC roadmap demands.</h1>
          <p>IICL helps GCCs establish and expand high-impact technology teams across AI, data, cloud, cybersecurity, product engineering and enterprise platforms.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#gcc-final-cta">Plan your GCC expansion <span aria-hidden="true">↗</span></a>
            <a class="button button-ghost" href="#gcc-capabilities">Explore the capability model <span aria-hidden="true">↓</span></a>
          </div>
          <ul class="signal-row" aria-label="Capability signals">
            <li>Capability-led design</li>
            <li>India-wide sourcing</li>
            <li>Four engagement models</li>
          </ul>
        </div>
        <div class="hero-visual">
          <div class="hero-system gcc-system" aria-label="Capability network connecting six technology domains to a GCC roadmap">
            <div class="system-grid"></div>
            <div class="orbit orbit-one"></div>
            <div class="orbit orbit-two"></div>
            <div class="system-core">
              <span>GCC</span>
              <strong>Capability Core</strong>
              <small>INDIA</small>
            </div>
            {#each domains as d, i}
              <div class="orbit-node node-{i + 1}">
                <b>{d.code}</b>
                <span>{d.name}</span>
              </div>
            {/each}
            <div class="system-status">
              <span class="live-dot"></span>
              ROADMAP → TEAM → SCALE
            </div>
          </div>
        </div>
      </div>
      <a class="scroll-cue" href="#page-content">
        <span>Explore</span>
        <i></i>
      </a>
    </section>

    <!-- Conditions -->
    <section class="section section-paper" id="page-content">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow dark"><i></i>BUILD CAPABILITY AROUND THE ROADMAP</span>
          <h2>A GCC requirement is more than a vacancy list.</h2>
          <p>It reflects the product roadmap, platform priorities, technology standards, location strategy and operating model. The redesigned page starts with that context—not a wall of job titles.</p>
        </div>
        <div class="condition-grid">
          {#each conditions as [n, title, copy]}
            <article class="condition-card">
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <i aria-hidden="true">→</i>
            </article>
          {/each}
        </div>
      </div>
    </section>

    <!-- Capability architecture -->
    <section class="section section-ink" id="gcc-capabilities">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow dark"><i></i>CAPABILITY ARCHITECTURE</span>
          <h2>Six technology domains. One connected GCC system.</h2>
          <p>Each domain card carries capability areas, representative role families and a clear bridge into the niche-hiring pathway.</p>
        </div>
        <div class="domain-grid">
          {#each domains as d, i}
            <article class="domain-card">
              <div class="domain-top">
                <span>{pad(i)}</span>
                <b>{d.code}</b>
              </div>
              <h3>{d.name}</h3>
              <p>{d.summary}</p>
              <small>{d.roles}</small>
              <a href="/niche-technology-hiring">Explore niche roles <span aria-hidden="true">↗</span></a>
            </article>
          {/each}
        </div>
      </div>
    </section>

    <!-- Engagement models -->
    <section class="section section-paper">
      <div class="wrap split-layout">
        <div class="section-heading">
          <span class="eyebrow dark"><i></i>ENGAGEMENT MODELS</span>
          <h2>Match the team model to the capability and delivery responsibility.</h2>
          <p>The page should help a GCC buyer compare the four models without forcing a commercial package before discovery.</p>
        </div>
        <div class="model-list">
          {#each models as [title, when, response], i}
            <article>
              <span>{pad(i)}</span>
              <div>
                <h3>{title}</h3>
                <p>{when}</p>
                <small>{response}</small>
              </div>
            </article>
          {/each}
        </div>
      </div>
    </section>

    <!-- Expansion flow -->
    <section class="section section-soft">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow dark"><i></i>GCC EXPANSION FLOW</span>
          <h2>From capability roadmap to an integrated technology team.</h2>
        </div>
        <ol class="horizontal-flow">
          {#each flow as [n, title, copy]}
            <li>
              <b>{n}</b>
              <strong>{title}</strong>
              <span>{copy}</span>
            </li>
          {/each}
        </ol>
      </div>
    </section>

    <!-- Insight / talent map -->
    <section class="section insight-section">
      <div class="wrap insight-grid">
        <div>
          <span class="eyebrow light"><i></i>IICL GCC INSIGHT · INDIA 2026</span>
          <h2>Explore where niche capability is concentrating.</h2>
          <p>Use a GCC Technology Talent Map as a planning asset—not as a promise of instant availability. Show capability depth, city signals, work-mode considerations and market constraints with a visible methodology and review date.</p>
          <a class="button button-light" href="/niche-technology-hiring">Open the niche capability view <span aria-hidden="true">↗</span></a>
        </div>
        <div class="map-panel" aria-label="Conceptual India talent map">
          <iframe class="india-map-frame" src="/india-map.html?transparent=1&ui=0&b={BUILD_ID}" title="3D map of India" loading="lazy"></iframe>
          {#each mapPins as p}
            <span class="map-pin" style="left:{p.left}%;top:{p.top}%"><i></i>{p.name}</span>
          {/each}
          <div class="map-caption">
            <b>CAPABILITY DEPTH</b>
            <span>Research layer · illustrative mock-up</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="final-cta" id="gcc-final-cta">
      <div class="cta-grid-bg"></div>
      <div class="wrap final-inner">
        <span class="eyebrow light"><i></i>DEFINE THE TEAM</span>
        <h2>Bring us the capability roadmap—not only the open roles.</h2>
        <p>Share the domain, outcome, team context, scale, location, work mode and intended start window. IICL will structure the requirement, model and next step.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="/contactus?intent=gcc-team-expansion">Plan your GCC team expansion <span aria-hidden="true">↗</span></a>
          <a class="button button-dark-ghost" href="/how-iicl-hires">See how IICL hires <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  </main>
</div>

<Footer />
