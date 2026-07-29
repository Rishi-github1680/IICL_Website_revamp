<script>
  // Enterprise AI & GenAI — the consulting and implementation service page (Spec Part C).
  //
  // Rewritten from a technology catalogue into a buyer journey. Three defects the G5
  // audit found are fixed here and must not come back:
  //   1. The page claimed MCP was "our proprietary standard". It is an open protocol.
  //      Describing a third party's open standard as proprietary is a false claim, and
  //      it was a release blocker (Spec C11, G15).
  //   2. Two sections shared the H2 "Standardized Context Windows for Multi-Agent AI
  //      Systems" — a copy/paste that left one section mislabelled.
  //   3. "Does our data get used to train models? No." was absolute. Whether that holds
  //      depends on the provider, the service configuration, the contract and the data
  //      path — none of which this page can promise on its own.
  import ServiceLayout from '../ServiceLayout.svelte';
  import { PAGE_ART } from '../menu.js';

  const PROBLEMS = [
    { cond: 'Repetitive knowledge work', dir: 'GenAI application, AI assistance or a bounded agent', ev: 'Eligible tasks, review effort and quality baseline' },
    { cond: 'High document volume', dir: 'Enterprise RAG or document intelligence', ev: 'Source ownership, document quality, retrieval and extraction cases' },
    { cond: 'Slow customer or employee response', dir: 'Conversational, voice or workflow AI', ev: 'Response baseline, language, handoff and channel requirements' },
    { cond: 'Fragmented process handoffs', dir: 'Intelligent automation and controlled integration', ev: 'Systems, permissions, failure states and reconciliation' },
    { cond: 'Complex operational decisions', dir: 'Predictive analytics or decision support', ev: 'Authoritative data, decision rights, model performance and escalation' },
  ];

  const SERVICES = [
    { t: 'AI agents', p: 'Support bounded workflows that need variable reasoning, approved tools and controlled action.', c: 'Identity, permissions, authority, evaluation, containment and AgentOps' },
    { t: 'Generative AI applications', p: 'Task-specific interfaces for drafting, summarising, analysing and assisting people.', c: 'Grounding, input and output protection, user review, privacy and quality' },
    { t: 'Enterprise RAG', p: 'Retrieve approved enterprise knowledge to support grounded responses and decisions.', c: 'Source ownership, permissions, freshness, citations, retrieval tests and retention' },
    { t: 'Document intelligence', p: 'Classify, extract, validate and route information from approved document sets.', c: 'Document quality, exception handling, confidence thresholds and human review' },
    { t: 'Predictive analytics', p: 'Use historical and current data to support forecasting, prioritisation or risk signals.', c: 'Data suitability, target definition, validation, drift and decision ownership' },
    { t: 'Intelligent automation', p: 'Connect AI-assisted decisions to deterministic workflow steps and enterprise systems.', c: 'Interfaces, transaction controls, idempotency, reconciliation and rollback' },
  ];

  const USE_CASES = [
    { f: 'Customer operations', u: 'Assisted resolution, multilingual engagement, request triage, knowledge retrieval and case preparation.', ctl: 'Identity, consent, handoff, source accuracy and customer-impact review' },
    { f: 'Sales and marketing', u: 'Lead qualification, account research, proposal support, campaign assistance and follow-up preparation.', ctl: 'Data permission, claim validation, external visibility and approval' },
    { f: 'HR and workforce', u: 'Employee support, policy retrieval, onboarding assistance and workflow coordination.', ctl: 'Personal-data boundaries, policy authority, fairness and human decision rights' },
    { f: 'Finance and business operations', u: 'Document review, reconciliation support, exception identification and report preparation.', ctl: 'Financial controls, separation of duties, audit evidence and approval' },
    { f: 'Document workflows', u: 'Classification, extraction, comparison, summarisation and controlled routing.', ctl: 'Source quality, field validation, exception handling and retention' },
    { f: 'Enterprise technology operations', u: 'Knowledge assistance, incident triage, change preparation and operational reporting.', ctl: 'System access, production boundaries, rollback and accountable ownership' },
  ];

  const STAGES = [
    { t: 'Discovery', q: 'What process and measurable outcome should change?', o: 'Opportunity statement, owner, baseline and constraints' },
    { t: 'Data and process review', q: 'Are the workflow, information and systems suitable?', o: 'Process map, data inventory, access requirements and exceptions' },
    { t: 'Proof of Value', q: 'Is there enough evidence of relevance, quality and feasibility?', o: 'Evaluation cases, measured results, limitations and a recommendation' },
    { t: 'Architecture and integration', q: 'How will it operate across approved enterprise systems?', o: 'Architecture, integration design, identity, permissions and data flows' },
    { t: 'Deployment readiness', q: 'Are security, quality, support and recovery acceptable?', o: 'Readiness evidence, runbooks, monitoring, approvals and residual risks' },
    { t: 'Production release', q: 'Has the authorised function approved the defined scope?', o: 'Release decision, approved operating scope and accountability' },
    { t: 'Monitoring and improvement', q: 'Does it remain effective, controlled and economically justified?', o: 'Outcome scorecard, quality review, incidents, cost and change decisions' },
  ];

  const INTEGRATIONS = [
    'CRM and customer-service platforms',
    'ERP and finance systems',
    'HR and workforce platforms',
    'Databases, data platforms and approved knowledge repositories',
    'Cloud and identity services',
    'APIs and controlled event or workflow interfaces',
    'Web, mobile, email, chat and voice channels',
  ];

  const GOVERNANCE = [
    'Approved purpose and accountable ownership',
    'Data, source and retention boundaries',
    'Identity, permissions and tool access',
    'Evaluation, validation and prohibited cases',
    'Human authority, escalation and recovery',
    'Monitoring, change control and incident response',
  ];

  const faqs = [
    { q: 'What is included in IICL’s Enterprise AI and GenAI services?',
      a: 'Consulting and implementation across AI agents, Generative AI applications, enterprise RAG, document intelligence, predictive analytics and intelligent automation — from identifying the use case through architecture, integration and governed production.' },
    { q: 'How does IICL select a suitable enterprise AI use case?',
      a: 'We start from the process, not the technology: the current baseline, the accountable owner, the information approved for use, the systems involved, and what a measurable improvement would look like. Some candidates come out of that review better served by deterministic automation than by AI.' },
    { q: 'What is Enterprise RAG and when is it appropriate?',
      a: 'Retrieval-augmented generation grounds responses in your own approved sources rather than in a model’s general training. It suits questions answerable from documents and records you own, where source attribution matters. It needs clear source ownership, retrieval permissions, freshness rules and tested retrieval quality — without those it produces confident answers from the wrong material.' },
    { q: 'Can IICL work with our selected cloud, model and enterprise applications?',
      a: 'We evaluate model and deployment choices against quality, security, privacy, compatibility, latency, cost and provider terms. Compatibility is validated for the proposed architecture rather than assumed.' },
    { q: 'Will our data be used to train an external model?',
      a: 'That depends on the provider, the service configuration, the contractual terms and the full data path — not on a single setting. We establish and document data use, retention and processing for the specific architecture before production access is authorised, so the answer is verifiable for your deployment rather than a general assurance.' },
    { q: 'How are privacy, identity and access controlled?',
      a: 'Approved data, users, systems and purposes are defined before implementation, with access control, task-specific identity, least privilege, audit evidence, monitoring and human approval designed around the workflow.' },
    { q: 'What is the difference between a demonstration, a Proof of Concept and a Proof of Value?',
      a: 'A demonstration illustrates a capability. A Proof of Concept tests whether the technical approach can work. A Proof of Value measures the workflow against representative cases, quality thresholds, controls, limitations and operating economics — it is the one that tells you whether to proceed.' },
    { q: 'How are AI quality and business value measured?',
      a: 'Against a baseline agreed before development, using an authoritative source, a defined calculation and a stated measurement period. Without those, any later improvement figure is an estimate, and we will describe it as one.' },
    { q: 'How long does enterprise AI implementation take?',
      a: 'It depends on use-case scope, data and integration readiness, evaluation requirements, security review and organisational approvals. We estimate it after discovery rather than quoting a universal duration.' },
    { q: 'What monitoring and support are required after production release?',
      a: 'Outcome and quality monitoring, exception and incident handling, cost oversight, change control, and periodic decisions to scale, maintain, restrict, redesign or retire the solution.' },
  ];
</script>

<ServiceLayout
  kicker="Service"
  h1="Enterprise AI Consulting and Implementation — from Use Case to Production"
  lede="IICL helps enterprises identify high-value AI opportunities, validate them through a Proof of Value, and implement secure, governed AI solutions across approved data, applications and business workflows."
  path="/ai-genai-services"
  cta="Book an AI Discovery Workshop"
  ctaHref="/contactus?intent=ai-discovery-workshop"
  heroImage={PAGE_ART['ai-genai-services']}
  {faqs}
>
  <!-- Scope signal + the first-fold trust language C2 specifies. -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What this service covers</h2>
      <ul class="scope">
        <li>AI agents</li><li>Generative AI applications</li><li>Enterprise RAG</li>
        <li>Document intelligence</li><li>Predictive analytics</li><li>Intelligent automation</li>
      </ul>
      <p class="para trust">Discovery-led. Evidence-tested. Integrated with enterprise systems. Governed for production.</p>
      <p class="para"><a class="anchor-cta" href="#ai-delivery-framework">See our AI delivery framework <span class="mono">→</span></a></p>
    </div>
  </section>

  <!-- Business problems, before any capability -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Apply enterprise AI where the workflow and evidence support it</h2>
      <div class="section-body">
        <p class="para">Enterprise AI creates value when it addresses a defined process condition, works with approved information and systems, and can be evaluated against a measurable outcome. We establish the current workflow, baseline, ownership, exceptions and constraints before recommending a technology pattern.</p>
      </div>
      <ul class="rows">
        {#each PROBLEMS as p}
          <li>
            <span class="row-a">{p.cond}</span>
            <span class="row-b">{p.dir}</span>
            <span class="row-c mono">Discovery evidence — {p.ev}</span>
          </li>
        {/each}
      </ul>
      <p class="para note">
        We should not recommend Generative AI where a deterministic rule, a conventional
        workflow, an analytics model or a human process can achieve the approved outcome
        more reliably and with less complexity.
      </p>
    </div>
  </section>

  <!-- Service portfolio -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Design the right AI pattern for the approved use case</h2>
      <div class="cards">
        {#each SERVICES as s}
          <article class="card">
            <h3>{s.t}</h3>
            <p>{s.p}</p>
            <span class="card-c mono">Implementation considerations — {s.c}</span>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <!-- Enterprise use cases -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Use cases across customer, employee and business operations</h2>
      <ul class="rows">
        {#each USE_CASES as u}
          <li>
            <span class="row-a">{u.f}</span>
            <span class="row-b">{u.u}</span>
            <span class="row-c mono">Control emphasis — {u.ctl}</span>
          </li>
        {/each}
      </ul>
      <p class="para note">
        These are representative solution patterns, not claims of production deployment or
        customer results. Suitability, controls and value have to be established for your
        own environment.
      </p>
    </div>
  </section>

  <!-- Delivery framework — the anchor the hero CTA points at (Spec C2, C5) -->
  <section id="ai-delivery-framework" class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Validate business relevance, technical feasibility and operating readiness</h2>
      <ol class="flow">
        {#each STAGES as st, i}
          <li class="flow-step">
            <b>{String(i + 1).padStart(2, '0')}</b>
            <strong>{st.t}</strong>
            <span>{st.q}</span>
          </li>
        {/each}
      </ol>
      <div class="outs">
        {#each STAGES as st, i}
          <p class="out"><span class="mono">{String(i + 1).padStart(2, '0')}</span> {st.o}</p>
        {/each}
      </div>
      <p class="para note">
        The one-day / two-week / up-to-three-month pathway is an illustrative commercial
        planning framework. Timing depends on use-case scope, data and integration
        readiness, evaluation requirements, security review and your approvals. The final
        plan is confirmed after discovery.
      </p>
    </div>
  </section>

  <!-- Technology and integration -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Connect AI to approved data, applications and channels</h2>
      <div class="section-body">
        <p class="para">We design around your selected environment and the interfaces approved for the workflow. Your enterprise applications and databases remain the authoritative systems of record.</p>
      </div>
      <ul class="list">
        {#each INTEGRATIONS as i}<li>{i}</li>{/each}
      </ul>
      <div class="section-body">
        <p class="para"><strong>How the connection is controlled.</strong> Read, prepare, recommend and write permissions are separated. Identity is task-specific and least-privilege. Tool parameters, target resources and transaction limits are validated. Duplicate writes are prevented and partial execution is reconciled. Failure, retry, rollback and escalation behaviour is defined. Long-term memory is kept separate from authoritative enterprise records.</p>
        <p class="para note">
          We do not publish provider logos as implied partnerships. A logo indicates
          compatibility only where the relationship, implementation relevance and
          permission to use it have been verified.
        </p>
      </div>
    </div>
  </section>

  <!-- Governance and security -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Define data, identity, authority and human responsibility before production</h2>
      <ol class="gov">
        {#each GOVERNANCE as g, i}
          <li><span class="mono">{String(i + 1).padStart(2, '0')}</span>{g}</li>
        {/each}
      </ol>
      <div class="section-body">
        <p class="para note">
          Security, privacy and compliance depend on the complete architecture, the
          selected providers, your environment, the configured controls and the operating
          procedures. IICL supplies the agreed design and implementation evidence; final
          organisational approval remains with your authorised functions. No solution is
          secure or compliant by default.
        </p>
      </div>
    </div>
  </section>

  <!-- Open standards. The previous version of this page described the Model Context
       Protocol as IICL's proprietary standard, which is not true (Spec C11, G15). -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Working with open standards</h2>
      <div class="section-body">
        <p class="para">The Model Context Protocol (MCP) is an open standard for connecting AI systems to tools and context sources. It is not IICL technology. Where MCP suits the selected tools and environment, we implement it inside an enterprise orchestration, security and governance architecture — the protocol handles the connection, and the controls we build around it are what make that connection safe to run in production.</p>
      </div>
    </div>
  </section>

  <!-- Evidence -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Show the baseline, scope, measurement method and verified result</h2>
      <div class="section-body">
        <p class="para">Every case study we publish states the initial process and baseline, the scope and users, the data and integration boundary, the evaluation or operating period, the result and how it was calculated, the relevant implementation and operating cost, the limitations and remaining human work, and the customer approval to publish it.</p>
        <p class="para pending"><span class="mono">Measures to define during discovery.</span></p>
      </div>
    </div>
  </section>

  <!-- Related GCC pathway — a contextual cross-link, not a second conversion goal (C11) -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Build the technology team behind the AI roadmap</h2>
      <div class="section-body">
        <p class="para">For GCCs and enterprises expanding AI, data, cloud, cybersecurity, product-engineering or enterprise-platform capability, IICL runs a separate team-expansion pathway with permanent hiring, flexible teams, dedicated pods and project-based models.</p>
        <p class="para"><a class="anchor-cta" href="/gcc-technology-teams">Explore GCC Technology Teams <span class="mono">→</span></a></p>
      </div>
    </div>
  </section>

  <!-- Final conversion -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Start with a defined process, baseline and measurable outcome</h2>
      <div class="section-body">
        <p class="para">We will help assess the workflow, the available information, your enterprise systems, the decision responsibilities and the evidence needed to identify the right AI solution and the next step.</p>
        <div class="cta-row">
          <a class="btn" href="/contactus?intent=ai-discovery-workshop">Book an AI Discovery Workshop <span class="mono">→</span></a>
          <a class="btn btn-ghost" href="/contactus?intent=enterprise-ai-use-case">Discuss an enterprise AI use case <span class="mono">→</span></a>
        </div>
        <p class="para note">
          The initial discussion establishes suitability and discovery requirements. Scope,
          architecture, responsibilities, evaluation activities, timing and fees are
          confirmed separately.
        </p>
        <p class="para safety">
          <strong>Please do not send sensitive material through this form.</strong>
          That means passwords, API keys, personal records, production data, security
          vulnerabilities or confidential architecture documents.
        </p>
      </div>
    </div>
  </section>
</ServiceLayout>

<style>
  .mono { font-family: var(--font-mono); }

  .scope { list-style: none; margin: 0 0 14px; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
  .scope li { font-family: var(--font-mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
    color: var(--brand); padding: 6px 12px; border-radius: 999px;
    border: 1px solid color-mix(in srgb, var(--brand) 26%, transparent); }
  .trust { font-weight: var(--w-medium); color: var(--ink); }
  .anchor-cta { color: var(--brand); font-weight: var(--w-medium); text-decoration: none; }
  .anchor-cta:hover { text-decoration: underline; }

  .rows { list-style: none; margin: 16px 0 0; padding: 0; display: grid; gap: 1px;
    background: var(--line); border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
  .rows li { background: #fff; padding: 16px 18px; display: grid; gap: 5px; }
  .row-a { font-size: 15.5px; font-weight: var(--w-heading); color: var(--ink); }
  .row-b { font-size: 14.5px; line-height: 1.55; color: #40434a; }
  .row-c { font-size: 11.5px; line-height: 1.5; color: var(--muted); }

  .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1px;
    margin-top: 16px; background: var(--line); border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
  .card { background: #fff; padding: 18px; }
  .card h3 { margin: 0 0 8px; font-size: 16px; font-weight: var(--w-heading); color: var(--ink); }
  .card p { margin: 0; font-size: 14.5px; line-height: 1.6; color: #40434a; }
  .card-c { display: block; margin-top: 12px; font-size: 11.5px; line-height: 1.55; color: var(--muted); }

  .outs { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 8px 20px; margin-top: 22px; }
  .out { margin: 0; font-size: 13.5px; line-height: 1.55; color: var(--muted); }
  .out span { color: var(--brand); margin-right: 6px; }

  .gov { list-style: none; margin: 16px 0 0; padding: 0; display: grid; gap: 1px;
    background: var(--line); border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
  .gov li { background: #fff; padding: 13px 16px; display: flex; gap: 12px; align-items: baseline;
    font-size: 14.5px; color: #40434a; }
  .gov span { font-size: 11px; color: var(--brand); }

  .pending { padding-left: 14px; border-left: 2px solid var(--line); color: var(--muted); }

  .cta-row { display: flex; flex-wrap: wrap; gap: 12px; margin: 18px 0 16px; }
  .btn { display: inline-flex; align-items: center; gap: 9px; padding: 13px 24px; border-radius: 8px;
    background: var(--brand); color: #fff; text-decoration: none; font-weight: var(--w-medium); font-size: 15px; }
  .btn:hover { filter: brightness(1.08); }
  .btn-ghost { background: transparent; color: var(--ink); border: 1px solid var(--line); }
  .btn-ghost:hover { border-color: var(--brand); color: var(--brand); filter: none; }

  .note { font-size: var(--fs-small); color: var(--muted); }
  .safety { padding: 12px 16px; border: 1px solid var(--line); border-radius: 6px;
    background: #fff; font-size: var(--fs-small); line-height: 1.6; }
</style>
