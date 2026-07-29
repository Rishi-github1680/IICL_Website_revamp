<script>
  // GCC Technology Teams — the second commercial pillar (Spec Part D).
  //
  // The page presents IICL as a technology-capability partner, not a résumé supplier:
  // capability before recruitment terminology, engagement models kept distinct, and
  // timing stated only with the qualifications D2 requires.
  //
  // Claims deliberately NOT on this page, per the D11 register and the G16 defaults:
  //   · consultant / bench / mobilisable counts (100+, 60+, 500+) — Q8, unvalidated
  //   · the "first shortlist in three business days" figure — Q8, awaiting the
  //     talent-delivery owner's confirmation. The stage is described without the number.
  //   · the GCC Talent Map link — the landing page does not exist yet (task 4.8), and
  //     D5 §9 requires the route to resolve before publication. The section describes
  //     the resource and routes to a conversation instead of a 404.
  import Layout from '../Layout.svelte';
  import { PAGE_ART } from '../menu.js';

  const CONDITIONS = [
    { t: 'New capability launch', d: 'Define the leadership, foundational and scale roles a new function needs, in the order it needs them.', e: 'Capability charter, target operating model and dependency map' },
    { t: 'Niche-skill shortage', d: 'Build a targeted sourcing and assessment strategy where the obvious search has already failed.', e: 'Role outcomes, must-have skills, adjacent skills and market constraints' },
    { t: 'Product or platform acceleration', d: 'Form a dedicated or project-based team around a roadmap that is moving faster than hiring.', e: 'Roadmap, team interfaces, delivery scope and decision ownership' },
    { t: 'Capacity expansion', d: 'Add specialists inside your existing team boundaries without changing how the team works.', e: 'Team structure, duration, work mode, onboarding and performance model' },
    { t: 'Critical permanent hiring', d: 'Run niche and lateral search for the roles where a wrong hire costs a quarter.', e: 'Role scorecard, interview process, compensation range and decision SLA' },
    { t: 'Distributed India growth', d: 'Align sourcing to where the work actually has to happen, and how often.', e: 'Approved locations, onsite expectations, mobility and joining constraints' },
  ];

  const DOMAINS = [
    { t: 'AI & GenAI', cap: 'Machine learning, Generative AI, LLM applications, MLOps, AI platforms and responsible AI engineering.', roles: 'AI/ML engineers · GenAI engineers · Data scientists · MLOps engineers · AI architects' },
    { t: 'Data Platforms', cap: 'Data engineering, lakehouse and warehouse platforms, streaming, analytics engineering, governance and BI.', roles: 'Data engineers · Data architects · Analytics engineers · Platform engineers · Governance leads' },
    { t: 'Cloud & SRE', cap: 'Cloud engineering, platform engineering, DevOps, reliability, observability, infrastructure automation and FinOps.', roles: 'Cloud engineers · SREs · DevOps engineers · Architects · FinOps specialists' },
    { t: 'Cybersecurity', cap: 'Cloud security, application security, identity, SOC, detection engineering, governance and risk.', roles: 'Security engineers · IAM specialists · AppSec engineers · SOC specialists · GRC professionals' },
    { t: 'Product Engineering', cap: 'Full-stack engineering, mobile, quality engineering, APIs, microservices and product-platform delivery.', roles: 'Backend, frontend and mobile engineers · QA/SDET · Architects · Engineering leads' },
    { t: 'Enterprise Platforms', cap: 'SAP, ServiceNow, CRM, ERP, ITSM and enterprise application integration.', roles: 'Functional and technical consultants · Developers · Architects · Integration specialists' },
  ];

  const MODELS = [
    { t: 'Permanent hiring', when: 'You need long-term employees for critical or scalable capability.', us: 'Source, screen and coordinate qualified candidates against the approved role scorecard.', you: 'Own the final assessment, employment decision, offer, onboarding and employment obligations.' },
    { t: 'Flexible technology teams', when: 'Specialists are required for a defined period inside your operating model.', us: 'Provide the agreed talent, coordination and replacement or support responsibilities within contract scope.', you: 'Own day-to-day direction, access, environment, priorities and acceptance unless agreed otherwise.' },
    { t: 'Dedicated talent pods', when: 'A stable, multi-role unit is needed around a capability or roadmap.', us: 'Build the agreed pod structure and provide the contracted coordination or delivery layer.', you: 'Define outcomes, interfaces, product ownership, approvals and environment responsibilities.' },
    { t: 'Project-based teams', when: 'A defined scope, output and delivery governance can be established.', us: 'Provide the agreed project team, delivery model and reporting within the statement of work.', you: 'Approve requirements, dependencies, acceptance criteria and change decisions.' },
  ];

  const BRIEF = [
    'Business capability and delivery objective',
    'Product, platform or programme context',
    'Required role outcomes',
    'Must-have and trainable capabilities',
    'Seniority and leadership expectations',
    'Team composition and reporting interfaces',
    'Location and work mode',
    'Employment or engagement model',
    'Assessment stages and decision owners',
    'Compensation or commercial boundaries',
    'Target start window',
    'Access, onboarding and compliance dependencies',
  ];

  const PATH = [
    { t: 'Requirement alignment', d: 'Confirm the capability outcome, role scorecard, scale, model, location, work mode and timeline.', out: 'Approved requirement brief and decision process' },
    { t: 'Market and sourcing plan', d: 'Identify talent pools, constraints, channels and adjacent capability options.', out: 'Sourcing strategy and risk/assumption register' },
    { t: 'Search and screening', d: 'Source and evaluate profiles against the agreed criteria.', out: 'Evidence-backed candidate shortlist' },
    { t: 'Customer assessment', d: 'Coordinate technical, functional and leadership evaluation.', out: 'Documented decisions and timely feedback' },
    { t: 'Selection and closure', d: 'Align candidate interest, commercials, documentation and the offer process.', out: 'Accepted selection, subject to applicable checks' },
    { t: 'Onboarding and mobilisation', d: 'Complete the agreed verification, access, orientation and joining activities.', out: 'Team or individual ready under the approved engagement' },
    { t: 'Performance and continuity', d: 'Review the agreed service, delivery or placement responsibilities.', out: 'Governance record, issues, actions and improvement plan' },
  ];

  const QUALITY_US = [
    'Requirement and role-scorecard validation',
    'Structured initial screening',
    'Capability-aligned assessment evidence where agreed',
    'Identity and employment-document checks appropriate to the engagement',
    'Interview and feedback coordination',
    'Candidate consent and privacy handling',
    'Duplicate-profile and representation controls',
    'Offer, joining-risk and mobilisation tracking',
  ];
  const QUALITY_YOU = [
    'Named role and decision owners',
    'Agreed assessment stages',
    'Qualified interviewers',
    'Timely, evidence-based feedback',
    'Approved compensation or commercial boundaries',
    'Clear selection, hold and rejection outcomes',
    'Onboarding, access and workplace readiness',
  ];

  const faqs = [
    { q: 'Which technology capabilities can IICL help our GCC build?',
      a: 'IICL supports requirements across AI & GenAI, Data Platforms, Cloud & SRE, Cybersecurity, Product Engineering and Enterprise Platforms. The role mix, seniority, location and assessment approach are defined against your capability roadmap.' },
    { q: 'Which engagement models are available?',
      a: 'Permanent hiring, flexible technology teams, dedicated talent or delivery pods, and project-based teams. Contract-to-hire may be considered when its minimum period, conversion terms and responsibilities are agreed in advance.' },
    { q: 'How quickly can IICL provide the first qualified shortlist?',
      a: 'Shortlist timing is confirmed at requirement alignment, once the role scorecard, location, work mode, commercial range and assessment process are agreed. Niche complexity, scale, candidate availability and market conditions all affect it, so we give you a plan for your specific role rather than a general figure.' },
    { q: 'Can IICL support hiring and teams across India?',
      a: 'Our primary delivery and talent relationships include Hyderabad and Bengaluru, with sourcing and engagement support across India according to role fit, your location, work mode and contract scope. Availability varies by capability and requirement.' },
    { q: 'Can IICL support onsite, hybrid and remote teams?',
      a: 'Yes, subject to the approved role, location, secure-access, employment and operating requirements. Work mode and office attendance should be confirmed before sourcing begins.' },
    { q: 'How does IICL assess candidates?',
      a: 'The assessment path is aligned to the agreed role scorecard and may include structured screening, capability evidence and your own technical or functional evaluation. You retain the final employment or engagement decision unless a different responsibility is expressly contracted.' },
    { q: 'Does IICL use AI in recruitment?',
      a: 'We may use ATS, matching, workflow and AI-assisted tools to support authorised sourcing and screening. Human reviewers remain responsible for consequential employment or engagement decisions, and tool use must comply with approved privacy, fairness and governance requirements.' },
    { q: 'Can IICL build a complete dedicated pod or project team?',
      a: 'Yes, where the required roles, scope, delivery responsibilities, interfaces, acceptance criteria and governance model can be agreed. The team is designed for the specific capability rather than selected from a universal package.' },
    { q: 'What information should we share to begin?',
      a: 'The capability domain, business or delivery objective, role or team mix, seniority, scale, location, work mode, engagement preference, assessment stages and target start window. Please do not send candidate personal data, confidential architecture, credentials or restricted information through the website form.' },
    { q: 'Does the GCC Talent Map guarantee talent availability?',
      a: 'No. It is a planning resource. Current availability depends on the specific role, location, compensation, work mode, notice period, assessment requirements and market conditions.' },
  ];
</script>

<Layout
  kicker="Talent"
  h1="Build High-Impact GCC Technology Teams in India"
  lede="IICL helps GCCs and enterprises build specialised technology capability across AI & GenAI, Data Platforms, Cloud & SRE, Cybersecurity, Product Engineering and Enterprise Platforms — through permanent hiring, flexible teams, dedicated pods and project-based teams."
  heroImage={PAGE_ART['/gcc-technology-teams']}
  path="/gcc-technology-teams"
  schemaType="Service"
  cta="Plan Your GCC Team Expansion"
  ctaHref="/contactus?intent=gcc-team-expansion"
  {faqs}
  autoFaq
  bandKicker="Define the team"
  bandHeading="Tell us the capability domain, scale, location, engagement model and target start window.">
  <!-- Capability signal + the qualification D5 §1 requires in the first fold. -->
  <section class="page-section">
    <div class="wrap">
      <ul class="cap-signal">
        {#each DOMAINS as d}<li>{d.t}</li>{/each}
      </ul>
      <p class="para qualify">
        Team structure, shortlist timing and mobilisation depend on role complexity, scale,
        location, work mode, assessment requirements, candidate availability and your own
        decision readiness. We confirm the plan for your requirement rather than quoting a
        general one.
      </p>
    </div>
  </section>

  <!-- 2 — GCC growth conditions -->
  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Expand the team without losing alignment to product, platform and delivery priorities</h2>
      <div class="section-body">
        <p class="para">A GCC talent requirement is rarely only a vacancy list. It reflects a capability roadmap, delivery commitments, technology standards, a location strategy and an operating model. We define that context before confirming the role mix and engagement path.</p>
      </div>
      <div class="cond-grid">
        {#each CONDITIONS as c}
          <article class="cond">
            <h3>{c.t}</h3>
            <p>{c.d}</p>
            <span class="cond-e mono">Discovery evidence — {c.e}</span>
          </article>
        {/each}
      </div>
      <p class="para note">
        We should not recommend a staffing model before the capability outcome, role
        scorecard, decision process and engagement responsibilities are defined.
      </p>
    </div>
  </section>

  <!-- 3 — Priority technology domains -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Build depth across the technology domains driving GCC growth</h2>
      <div class="dom-grid">
        {#each DOMAINS as d}
          <article class="dom">
            <h3>{d.t}</h3>
            <p>{d.cap}</p>
            <span class="dom-roles mono">{d.roles}</span>
          </article>
        {/each}
      </div>
      <p class="para note">
        Role families are representative. They do not imply that every skill is
        continuously available — current availability is confirmed per requirement.
      </p>
    </div>
  </section>

  <!-- 4 — Engagement models -->
  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Match the engagement structure to the capability, duration and delivery responsibility</h2>
      <div class="model-grid">
        {#each MODELS as m}
          <article class="model">
            <h3>{m.t}</h3>
            <p class="model-when">{m.when}</p>
            <dl>
              <div><dt class="mono">IICL</dt><dd>{m.us}</dd></div>
              <div><dt class="mono">You</dt><dd>{m.you}</dd></div>
            </dl>
          </article>
        {/each}
      </div>
      <p class="para note">
        Contract-to-hire may be evaluated where the requirement, minimum engagement period,
        conversion conditions and applicable fee are agreed in writing before onboarding.
        Commercial terms are not published here; they are agreed per engagement.
      </p>
    </div>
  </section>

  <!-- 5 — Team and role design -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Translate the capability roadmap into roles, seniority, interfaces and decision rights</h2>
      <div class="section-body">
        <p class="para">A job description is an input, not a complete evaluation model. Before sourcing begins we align on the outcomes, evidence and decision criteria that define a qualified profile.</p>
      </div>
      <ul class="brief">
        {#each BRIEF as b, i}
          <li><span class="mono">{String(i + 1).padStart(2, '0')}</span>{b}</li>
        {/each}
      </ul>
    </div>
  </section>

  <!-- 6 — Requirement-to-mobilisation path -->
  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Use a transparent, evidence-based talent delivery path</h2>
      <ol class="flow">
        {#each PATH as p, i}
          <li class="flow-step">
            <b>{String(i + 1).padStart(2, '0')}</b>
            <strong>{p.t}</strong>
            <span>{p.d}</span>
          </li>
        {/each}
      </ol>
      <div class="outs">
        {#each PATH as p, i}
          <p class="out"><span class="mono">{String(i + 1).padStart(2, '0')}</span> {p.out}</p>
        {/each}
      </div>
      <p class="para note">
        Mobilisation planning begins after requirement alignment. Final joining and
        team-readiness dates depend on selection speed, notice periods, verification,
        access, relocation where applicable and your onboarding readiness.
      </p>
    </div>
  </section>

  <!-- 7 — Quality, governance and privacy -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Align screening evidence, customer assessment and candidate experience</h2>
      <div class="compare">
        <div>
          <h3>IICL</h3>
          <ul>{#each QUALITY_US as q}<li>{q}</li>{/each}</ul>
        </div>
        <div>
          <h3>Your decision discipline</h3>
          <ul>{#each QUALITY_YOU as q}<li>{q}</li>{/each}</ul>
        </div>
      </div>
      <div class="section-body">
        <p class="para note">
          <strong>Candidate data.</strong> Candidate information is collected, used, shared,
          retained and deleted according to an approved purpose, consent basis, access model
          and contractual requirement. Candidate profiles and assessment information are never
          transmitted through website analytics.
        </p>
        <p class="para note">
          <strong>AI-assisted recruitment.</strong> We may use ATS, search, matching, workflow
          or AI-assisted tools to support authorised talent-delivery activities. Final
          employment and engagement decisions remain with qualified human decision-makers. We
          do not claim that a proprietary model removes bias, guarantees fit, or makes hiring
          decisions on its own.
        </p>
      </div>
    </div>
  </section>

  <!-- 8 — Location and operating models -->
  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Align location and work mode to the GCC operating model</h2>
      <div class="section-body">
        <p class="para">Our primary delivery and talent relationships include Hyderabad and Bengaluru, with sourcing and engagement support across India according to role fit, your location, work-mode requirements and contract scope. We do not claim universal availability for every skill in every location.</p>
      </div>
      <ul class="list">
        <li>Primary work location and required office attendance</li>
        <li>Shift or collaboration hours</li>
        <li>Travel or mobility expectations</li>
        <li>Equipment and secure-access responsibilities</li>
        <li>Customer, IICL or shared supervision</li>
        <li>Applicable employment, contractual and workplace requirements</li>
      </ul>
    </div>
  </section>

  <!-- 9 — GCC Talent Map. The landing page is not published yet, so this routes to a
       conversation rather than a dead link (Spec D5 §9). -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Explore where niche technology capability is concentrating</h2>
      <div class="section-body">
        <p class="para">The IICL GCC Niche Technology Talent Map — India 2026 frames the shift from talent scale to capability depth across the six domains above. It is a planning resource: talent-market conditions change, and it should be read against your current role, location, compensation, work-mode and availability requirements.</p>
        <p class="para"><a class="inline-cta" href="/contactus?intent=gcc-team-expansion">Discuss a capability map for your GCC <span class="mono">→</span></a></p>
      </div>
    </div>
  </section>

  <!-- 10 — Evidence -->
  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Capability shown with definitions, dates and approved evidence</h2>
      <div class="section-body">
        <p class="para">We publish delivery evidence only when its meaning, measurement date, service scope and publication rights have been confirmed. Talent-network, bench and mobilisation figures are easy to quote and hard to substantiate, so they are not on this page.</p>
        <p class="para">What we will share in a qualified conversation: the sourcing approach for your domain, comparable role structures, assessment evidence and the constraints we expect for your location and work mode.</p>
        <p class="para note">Measures to define during discovery.</p>
      </div>
    </div>
  </section>

  <!-- 11 — Related pathways -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Connect technology capability to the enterprise roadmap</h2>
      <ul class="rel">
        <li><a href="/ai-genai-services"><strong>Enterprise AI &amp; GenAI</strong><span>Identify, validate and implement an enterprise AI use case.</span></a></li>
        <li><a href="/agentic-ai"><strong>Agentic AI</strong><span>Design governed agent workflows across enterprise systems.</span></a></li>
        <li><a href="/aboutus"><strong>About IICL</strong><span>Who we are and where we deliver from.</span></a></li>
      </ul>
    </div>
  </section>

  <!-- 13 — Final conversion -->
  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Define the team your GCC roadmap requires</h2>
      <div class="section-body">
        <p class="para">Share the technology domain, role or team requirement, location, work mode, engagement preference and target start window. We will help structure the capability brief, sourcing plan, assessment path and next step.</p>
        <div class="cta-row">
          <a class="btn" href="/contactus?intent=gcc-team-expansion">Plan Your GCC Team Expansion <span class="mono">→</span></a>
          <a class="btn btn-ghost" href="/contactus?intent=gcc-capability-requirement">Share a capability requirement <span class="mono">→</span></a>
        </div>
        <p class="para note">
          The initial discussion establishes requirement clarity and delivery feasibility.
          Scope, responsibilities, availability, commercials, service levels and timing are
          confirmed separately.
        </p>
        <p class="para safety">
          <strong>Please do not send sensitive material through the website form.</strong>
          That means candidate résumés, personal records, compensation details, passwords,
          production data, confidential architecture or security information.
        </p>
      </div>
    </div>
  </section>
</Layout>

<style>
  .mono { font-family: var(--font-mono); }

  .cap-signal { list-style: none; margin: 0 0 16px; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
  .cap-signal li { font-family: var(--font-mono); font-size: 11px; letter-spacing: .1em;
    text-transform: uppercase; color: var(--brand-ink); padding: 6px 12px;
    border: 1px solid color-mix(in srgb, var(--brand) 26%, transparent); border-radius: 999px; }
  .qualify { max-width: 74ch; color: var(--muted); }

  /* Real gaps with a border per card. The 1px-gap-over-background trick drew the
     dividers, but showed as a grey block wherever the last row was not full — six
     cards in a four-column track leave two. */
  .cond-grid, .dom-grid { display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 12px; margin-top: 16px; }
  .cond, .dom { background: #fff; padding: 20px; border: 1px solid var(--line); border-radius: 8px; }
  .cond h3, .dom h3 { margin: 0 0 8px; font-size: 16.5px; font-weight: var(--w-heading); color: var(--ink); }
  .cond p, .dom p { margin: 0; font-size: 14.5px; line-height: 1.6; color: #40434a; }
  .cond-e, .dom-roles { display: block; margin-top: 12px; font-size: 11.5px; line-height: 1.55; color: var(--muted); }

  .model-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-top: 16px; }
  .model { border: 1px solid var(--line); border-radius: 10px; padding: 20px; background: #fff; }
  .model h3 { margin: 0 0 6px; font-size: 17px; font-weight: var(--w-heading); color: var(--ink); }
  .model-when { margin: 0 0 14px; font-size: 14px; line-height: 1.6; color: #40434a; }
  .model dl { margin: 0; display: grid; gap: 10px; }
  .model dt { font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: var(--brand-ink); margin-bottom: 3px; }
  .model dd { margin: 0; font-size: 13.5px; line-height: 1.55; color: var(--muted); }

  .brief { list-style: none; margin: 16px 0 0; padding: 0;
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
     }
  .brief li { background: #fff; border: 1px solid var(--line); border-radius: 8px; padding: 13px 16px; display: flex; gap: 12px; align-items: baseline;
    font-size: 14.5px; color: #40434a; }
  .brief span { font-size: 11px; color: var(--brand-ink); }

  .outs { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 8px 20px; margin-top: 22px; }
  .out { margin: 0; font-size: 13.5px; line-height: 1.55; color: var(--muted); }
  .out span { color: var(--brand-ink); margin-right: 6px; }

  .rel { list-style: none; margin: 16px 0 0; padding: 0; border-top: 1px solid var(--line); }
  .rel li { border-bottom: 1px solid var(--line); }
  .rel a { display: grid; gap: 3px; padding: 16px 2px; text-decoration: none; transition: padding-left .2s ease; }
  .rel a:hover { padding-left: 8px; }
  .rel strong { font-size: 16px; font-weight: var(--w-heading); color: var(--ink); }
  .rel a:hover strong { color: var(--brand-ink); }
  .rel span { font-size: var(--fs-small); color: var(--muted); }

  .inline-cta { color: var(--brand-ink); font-weight: var(--w-medium); text-decoration: none; }
  .inline-cta:hover { text-decoration: underline; }

  .cta-row { display: flex; flex-wrap: wrap; gap: 12px; margin: 18px 0 16px; }
  .btn { display: inline-flex; align-items: center; gap: 9px; padding: 13px 24px; border-radius: 8px;
    background: var(--brand-solid, #d81f1e); color: #fff; text-decoration: none; font-weight: var(--w-medium); font-size: 15px; }
  .btn:hover { filter: brightness(1.08); }
  /* The second path is outlined so both read as equal destinations (Spec D5 §13). */
  .btn-ghost { background: transparent; color: var(--ink); border: 1px solid var(--line); }
  .btn-ghost:hover { border-color: var(--brand); color: var(--brand-ink); filter: none; }

  .note { font-size: var(--fs-small); color: var(--muted); max-width: 78ch; }
  .safety { padding: 12px 16px; border: 1px solid var(--line); border-radius: 6px;
    background: #fff; font-size: var(--fs-small); line-height: 1.6; max-width: 78ch; }
</style>
