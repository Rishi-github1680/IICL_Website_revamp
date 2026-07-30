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

  // Accurate India boundary (Natural Earth, public domain) projected to viewBox
  // 0 0 260 263; cities placed from their real lat/lon in the same projection.
  const mapCities = [
    { name: 'NCR', x: 82.7, y: 68.8 },
    { name: 'MUM', x: 45.5, y: 155.7 },
    { name: 'PUN', x: 54.2, y: 160.8 },
    { name: 'HYD', x: 93.5, y: 171.1 },
    { name: 'BLR', x: 85.9, y: 211.4 },
    { name: 'CHE', x: 108.6, y: 210.4 },
  ];
  const INDIA_PATH = 'M88 6 L97.1 16.7 L96.2 24.1 L99.6 28.8 L99.3 33.4 L93.2 32.2 L95.6 42.3 L104 48 L115.8 54.4 L110.4 58.6 L107.1 67.1 L115.3 70.5 L123.3 75 L134.4 80.1 L146 81.3 L150.9 85.9 L157.4 86.8 L167.7 88.9 L174.7 88.8 L175.7 85.2 L174.6 79.4 L175.2 75.5 L180.4 73.5 L181.1 80.7 L181.3 82.5 L189 86 L194.4 84.6 L201.5 85.2 L208.4 84.9 L209 79.3 L205.6 76.4 L212.4 75.3 L220.1 68.5 L229.9 62.7 L237 64.9 L243.1 61.1 L247.1 66.8 L244.2 70.6 L253.4 71.9 L254 75.4 L251 77.1 L251.7 82.7 L245.7 81 L234.7 87.3 L234.9 92.6 L230.2 100.2 L229.8 104.6 L226 112.2 L219.4 110.1 L219.1 119.5 L217.2 122.6 L218.1 126.5 L213.9 128.7 L209.4 114.2 L207.1 114.2 L205.7 120.1 L201 115.3 L203.6 110.1 L207.4 109.6 L211.3 101.9 L206.5 100.3 L198.6 100.5 L190.5 99.2 L189.8 92.9 L185.7 92.4 L179 88.5 L176 94.7 L182.1 99.5 L176.8 102.9 L174.9 106.2 L180.2 108.7 L178.7 114.2 L181.6 121 L183 128.5 L181.8 131.9 L176 131.7 L165.5 133.6 L166 140.5 L161.5 145.9 L149.3 152 L139.8 162.8 L133.4 168.5 L124.9 174.5 L124.9 178.7 L120.7 180.9 L113 184.2 L109.1 184.7 L106.5 191.6 L108.3 203.5 L108.8 211 L105.2 219.7 L105.1 235.2 L100.7 235.6 L96.9 242.6 L99.5 245.6 L91.7 248.2 L88.9 254.4 L85.5 257 L77.4 248.5 L73.5 235.7 L70.2 226.5 L67.3 222.2 L62.8 213.4 L60.6 202 L59.2 196.4 L51.5 183.8 L47.9 166.2 L45.4 154.5 L45.4 143.4 L43.8 134.9 L31.4 140.4 L25.5 139.3 L14.4 128.2 L18.5 124.9 L16 121.3 L6 113.6 L11.7 107.5 L30.3 107.5 L28.6 99.7 L23.9 95.1 L22.9 88.1 L17.4 84 L26.7 74.4 L36.6 75.1 L45.4 65.6 L50.8 56.3 L59 47.2 L58.9 40.7 L66.1 35.4 L59.2 30.9 L56.3 24.7 L53.3 16.7 L57.5 12.8 L70.3 15 L79.8 13.7 L88 6 Z';

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
          <svg class="india-map" viewBox="0 0 260 263" role="img" aria-label="India, showing major GCC technology cities">
            <path class="india-outline" d={INDIA_PATH} />
            {#each mapCities as c}
              <g class="map-city">
                <circle cx={c.x} cy={c.y} r="3.4" />
                <text x={c.x + 8} y={c.y + 3.2}>{c.name}</text>
              </g>
            {/each}
          </svg>
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
