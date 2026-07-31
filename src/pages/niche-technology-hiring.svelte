<script>
  // Niche Technology Hiring — the exact "Talent Pathways" mock-up (talent-pathways.tsx,
  // NichePage + NicheVisual). Site Nav/Footer replace the pack header/footer; mailto: actions
  // become production /contactus?intent= routes (README_DEVELOPER_HANDOFF).
  import Nav from '../Nav.svelte';
  import Footer from '../Footer.svelte';
  import '../talent-pathways.css';
  import { breadcrumbSchema, serviceSchema, jsonLd } from '../seo.js';

  const PATH = '/niche-technology-hiring';

  const domains = [
    { code: 'AI', name: 'AI & GenAI',           summary: 'ML engineering, GenAI applications, MLOps, AI platforms and responsible AI.',     roles: 'AI/ML Engineers · GenAI Engineers · MLOps · AI Architects' },
    { code: 'DP', name: 'Data Platforms',       summary: 'Data engineering, lakehouse, streaming, analytics engineering and governance.',   roles: 'Data Engineers · Data Architects · Analytics Engineers · Governance Leads' },
    { code: 'SR', name: 'Cloud & SRE',          summary: 'Cloud, platform engineering, reliability, observability, automation and FinOps.', roles: 'Cloud Engineers · SREs · Platform Engineers · FinOps Specialists' },
    { code: 'CY', name: 'Cybersecurity',        summary: 'Cloud security, AppSec, identity, SOC, detection engineering and governance.',    roles: 'Security Engineers · IAM · AppSec · SOC · GRC Professionals' },
    { code: 'PE', name: 'Product Engineering',  summary: 'Full-stack, mobile, APIs, microservices, quality engineering and architecture.',  roles: 'Backend · Frontend · Full-stack · Mobile · SDET · Engineering Leads' },
    { code: 'EP', name: 'Enterprise Platforms', summary: 'SAP, ServiceNow, CRM, ERP, ITSM and enterprise application integration.',        roles: 'Consultants · Developers · Architects · Integration Specialists' },
  ];

  const playbook = [
    ['01', 'Decode the scarce capability', 'Define what the role must achieve and which evidence really predicts success.'],
    ['02', 'Map adjacent talent',          'Identify transferable platforms, problem patterns, sectors and learning curves.'],
    ['03', 'Search beyond job boards',     'Use targeted organisations, communities, referrals, research and specialist networks.'],
    ['04', 'Validate real depth',          'Probe decisions, trade-offs, failure modes and role-relevant artefacts—not only terminology.'],
    ['05', 'Feed the market back',         'Use compensation, location, notice and response data to reshape an unrealistic brief early.'],
  ];

  const matrix = [
    ['Depth',         'Architecture and implementation choices',    'Role-level fit'],
    ['Judgement',     'Trade-offs, failure modes and constraints',  'Senior autonomy'],
    ['Context',       'Scale, industry and operating environment',  'Transferability'],
    ['Learning',      'New capability acquired and applied',        'Adjacent-skill potential'],
    ['Collaboration', 'Interfaces, influence and ownership',        'Team fit'],
  ];

  const marketSignals = ['Compensation', 'Location', 'Work mode', 'Notice period', 'Skill adjacency', 'Candidate response'];

  const pad = (i) => String(i + 1).padStart(2, '0');
  let activeDomain = $state(0);

  const schema = jsonLd(
    breadcrumbSchema([{ name: 'Home', href: '/' }, { name: 'Niche Technology Hiring', href: PATH }]),
    serviceSchema({
      name: 'Niche Technology Hiring',
      description: 'Domain-led search, adjacent-skill mapping and evidence-based assessment to reach specialised technologists beyond conventional keyword sourcing.',
      path: PATH,
      serviceType: 'Specialised technology talent search',
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
    <section class="hero hero-niche">
      <div class="hero-backdrop"></div>
      <div class="wrap hero-inner">
        <div class="hero-copy">
          <span class="eyebrow"><i></i>NICHE TECHNOLOGY HIRING · INDIA</span>
          <h1>Find the skills the market does not surface easily.</h1>
          <p>IICL combines domain-led search, adjacent-skill mapping and evidence-based assessment to reach specialised technologists beyond conventional keyword sourcing.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#niche-final-cta">Start a niche search <span aria-hidden="true">↗</span></a>
            <a class="button button-ghost" href="#niche-domains">Explore priority domains <span aria-hidden="true">↓</span></a>
          </div>
          <ul class="signal-row" aria-label="Capability signals">
            <li>Market intelligence</li>
            <li>Adjacent-skill mapping</li>
            <li>Evidence matrix</li>
          </ul>
        </div>
        <div class="hero-visual">
          <div class="hero-system niche-system" aria-label="Niche capability radar showing six priority technology domains">
            <div class="system-grid"></div>
            <div class="radar-ring radar-one"></div>
            <div class="radar-ring radar-two"></div>
            <div class="radar-ring radar-three"></div>
            <div class="radar-sweep"></div>
            <div class="radar-core">SEARCH<br />INTELLIGENCE</div>
            {#each domains as d, i}
              <div class="radar-node radar-{i + 1}">
                <i></i>
                <span>{d.code}</span>
              </div>
            {/each}
            <div class="system-status">
              <span class="live-dot"></span>
              SIGNALS BEYOND KEYWORDS
            </div>
          </div>
        </div>
      </div>
      <a class="scroll-cue" href="#page-content"><span>Explore</span><i></i></a>
    </section>

    <!-- Thesis -->
    <section class="section section-paper" id="page-content">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow dark"><i></i>WHY NICHE HIRING NEEDS ITS OWN PAGE</span>
          <h2>Hard-to-hire is often a search-design problem.</h2>
          <p>This route gives niche hiring the prominence requested. It owns scarce-skill search intent and keeps the GCC page focused on capability expansion.</p>
        </div>
        <div class="niche-thesis">
          <div>
            <span>CONVENTIONAL SEARCH</span>
            <strong>Title + keywords + database</strong>
            <p>Misses adjacent talent, emerging capability and credible specialists with non-standard career paths.</p>
          </div>
          <i aria-hidden="true">→</i>
          <div>
            <span>IICL NICHE SEARCH</span>
            <strong>Outcome + evidence + market graph</strong>
            <p>Finds capability signals across experience, problem context, platforms, sectors and learning agility.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Capability radar -->
    <section class="section section-ink" id="niche-domains">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow dark"><i></i>PRIORITY NICHE DOMAINS</span>
          <h2>Explore the capability radar.</h2>
          <p>Select a domain to see the representative search focus. Availability is always requirement-specific.</p>
        </div>
        <div class="radar-layout">
          <div class="domain-selector" role="tablist" aria-label="Niche technology domains">
            {#each domains as d, i}
              <button type="button" role="tab" aria-selected={activeDomain === i} class="domain-button {activeDomain === i ? 'is-active' : ''}" onclick={() => activeDomain = i}>
                <span>{d.code}</span>
                <strong>{d.name}</strong>
              </button>
            {/each}
          </div>
          <div class="domain-detail" role="tabpanel">
            <div class="detail-orbit">
              <span>{domains[activeDomain].code}</span>
              <i></i>
              <i></i>
            </div>
            <small>ACTIVE CAPABILITY</small>
            <h3>{domains[activeDomain].name}</h3>
            <p>{domains[activeDomain].summary}</p>
            <div>
              <span>REPRESENTATIVE ROLE FAMILIES</span>
              <strong>{domains[activeDomain].roles}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Playbook -->
    <section class="section section-soft">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow dark"><i></i>THE NICHE SEARCH PLAYBOOK</span>
          <h2>A market-learning loop, not a one-time database query.</h2>
        </div>
        <ol class="playbook">
          {#each playbook as [n, title, copy]}
            <li>
              <span>{n}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </li>
          {/each}
        </ol>
      </div>
    </section>

    <!-- Evidence matrix -->
    <section class="section section-paper">
      <div class="wrap split-layout">
        <div class="section-heading">
          <span class="eyebrow dark"><i></i>EVIDENCE MATRIX</span>
          <h2>Evaluate what the candidate has proved—not how many keywords match.</h2>
          <p>The exact assessment method changes by role, but the evidence structure stays consistent and explainable.</p>
        </div>
        <div class="matrix">
          <div class="matrix-row matrix-head">
            <span>Signal</span>
            <span>Evidence</span>
            <span>Decision</span>
          </div>
          {#each matrix as [signal, evidence, decision]}
            <div class="matrix-row">
              <strong>{signal}</strong>
              <span>{evidence}</span>
              <span>{decision}</span>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Market signals -->
    <section class="section market-band">
      <div class="wrap market-grid">
        <div>
          <span class="eyebrow light"><i></i>MARKET REALITY CHECK</span>
          <h2>Let the market improve the requirement.</h2>
        </div>
        <div class="market-signals">
          {#each marketSignals as signal, i}
            <div>
              <span>{pad(i)}</span>
              <strong>{signal}</strong>
            </div>
          {/each}
        </div>
        <p>Share early search signals with the customer so the scorecard, location, level or engagement model can change before the search stalls.</p>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="final-cta" id="niche-final-cta">
      <div class="cta-grid-bg"></div>
      <div class="wrap final-inner">
        <span class="eyebrow light"><i></i>START THE SEARCH INTELLIGENCE</span>
        <h2>Bring us the capability problem everyone says is hard to hire.</h2>
        <p>We will help define the evidence, adjacent talent pools, market constraints and search plan before presenting profiles.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="/contactus?intent=gcc-capability-requirement&source=/niche-technology-hiring">Start a niche technology search <span aria-hidden="true">↗</span></a>
          <a class="button button-dark-ghost" href="/how-iicl-hires">See the hiring process <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  </main>
</div>

<Footer />
