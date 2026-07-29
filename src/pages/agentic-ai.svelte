<script>
  // Agentic AI — the governed-agent service page (Spec Part E, sequence
  // AGH1 → AGF1 → AGU1 → AGC1 → AGD1 → AGS1 → AGM1 → AGQ1).
  //
  // The previous version led with "Autonomous AI Agents That Execute Multi-Step Work"
  // and three "fleets". The G6 finding was that it sold autonomy without ever showing
  // the authority boundary that makes autonomy safe to buy. This version leads with
  // governance and puts the controls on the page.
  //
  // Two rules that must not be relaxed here:
  //   · No fixed-duration promise. Spec E§2: the one-day / two-week / three-month
  //     message "must not appear as a universal Agentic AI delivery promise".
  //     Progression is gated on evidence, not on a number of weeks.
  //   · No unqualified "autonomous". An agent's permissions must read as narrower than
  //     its capabilities, everywhere on the page.
  import ServiceLayout from '../ServiceLayout.svelte';
  import { PAGE_ART } from '../menu.js';

  // AGF1 — what makes an enterprise agent useful and governable
  const FOUNDATION = [
    { t: 'Defined objective', d: 'A bounded task outcome, a completion condition and an accountable business owner.' },
    { t: 'Approved context', d: 'Authorised knowledge and task state, retrieved within user, workflow and data boundaries.' },
    { t: 'Reasoning and planning', d: 'Selection of permitted next steps inside the defined workflow — not unrestricted goal pursuit.' },
    { t: 'Controlled tools', d: 'Allowlisted applications, APIs and operations, with validated parameters and targets.' },
    { t: 'Authority and validation', d: 'Deterministic permissions, approval thresholds, prohibited actions and output checks.' },
    { t: 'Observation and recovery', d: 'Traceable actions, monitoring, exception handling, reconciliation, rollback and safe stopping.' },
  ];

  const COMPARE = [
    { a: 'Deterministic automation', b: 'Stable rules and predictable paths.', c: 'Handles variation only where explicitly designed' },
    { a: 'AI assistant', b: 'Retrieval, summarising, drafting and recommendations.', c: 'Normally needs a person to complete the action' },
    { a: 'Agentic workflow', b: 'Variable, multi-step work needing approved retrieval, reasoning and tool use.', c: 'Requires stronger evaluation, identity, authority and operational controls' },
    { a: 'Multi-agent system', b: 'Genuinely separate responsibilities, tools, knowledge or permission boundaries.', c: 'Adds handoff, coordination, security, reliability and cost complexity' },
  ];

  // AGU1 — workflow families
  const WORKFLOWS = [
    { t: 'Customer operations', out: 'Improve response, resolution and continuity across channels.', work: 'Understand requests, retrieve approved account context, prepare resolutions, update cases and escalate exceptions.', auth: 'Prepare, or approval-first' },
    { t: 'Sales and revenue operations', out: 'Reduce follow-up gaps and improve qualified progression.', work: 'Research approved accounts, prepare outreach, schedule next steps, update CRM and identify stalled opportunities.', auth: 'Prepare; limited reversible actions' },
    { t: 'Enterprise service management', out: 'Improve request fulfilment and operational coordination.', work: 'Classify requests, retrieve knowledge, prepare actions, update tickets and escalate impact.', auth: 'Approval-first, then limited action' },
    { t: 'Knowledge and document workflows', out: 'Turn controlled enterprise information into traceable work.', work: 'Retrieve approved sources, compare documents, identify gaps, generate grounded outputs and route exceptions.', auth: 'Observe, prepare or recommend' },
    { t: 'Workforce and talent operations', out: 'Improve coordination without delegating consequential employment decisions.', work: 'Support role intake, employee queries, interview coordination and process updates.', auth: 'Prepare; decisions stay human-owned' },
    { t: 'Finance and business operations', out: 'Reduce manual coordination across bounded operational processes.', work: 'Reconcile defined records, prepare transactions, identify exceptions and route approvals.', auth: 'Approval-controlled' },
  ];

  // AGC1 — architecture layers
  const LAYERS = [
    { t: 'Experience and trigger', r: 'A user, event, application or approved agent handoff starts a workflow.', i: 'Authenticate the source and establish the authorised purpose' },
    { t: 'Workflow state and orchestration', r: 'Maintains task state, step boundaries, retries and completion logic.', i: 'Bounded workflows, idempotency and explicit stopping conditions' },
    { t: 'Model and agent runtime', r: 'Interprets intent, retrieves context and proposes permitted next steps.', i: 'Select models against quality, latency, privacy, compatibility, cost and provider terms' },
    { t: 'Approved knowledge', r: 'Supplies authorised enterprise context.', i: 'Retrieval permissions, source ownership, freshness and citations where applicable' },
    { t: 'Tool registry and integration', r: 'Exposes approved applications, APIs and operations.', i: 'Allowlist tools, separate read and write operations, validate parameters' },
    { t: 'Policy, validation and human authority', r: 'Enforces permissions, limits, approvals and prohibited actions.', i: 'Keep consequential controls outside the model and record decisions' },
    { t: 'Observability, security and recovery', r: 'Records material actions and supports containment and reconciliation.', i: 'Structured traces, alerts, circuit breakers, revocation and recovery procedures' },
  ];

  // AGD1 — evidence-gated lifecycle
  const PHASES = [
    { t: 'Discover and baseline', q: 'Is there a defined workflow and a measurable reason to intervene?', e: 'Approved opportunity statement and baseline' },
    { t: 'Design controls and architecture', q: 'What is the simplest suitable design and authority boundary?', e: 'Architecture, authority matrix and test plan' },
    { t: 'Build and simulate', q: 'Can the workflow execute safely in a controlled environment?', e: 'Working controlled build and simulation evidence' },
    { t: 'Run a Proof of Value', q: 'Does it produce sufficient business and operational evidence?', e: 'PoV report, limitations, measured results and a recommendation' },
    { t: 'Run a controlled pilot', q: 'Can it operate with limited real users and bounded authority?', e: 'Pilot results, revised controls and a readiness assessment' },
    { t: 'Authorise production', q: 'Are quality, security, ownership and recovery controls acceptable?', e: 'A formal proceed, restricted proceed, remediate or stop decision' },
    { t: 'Operate, improve and retire', q: 'Does the agent remain effective and controlled?', e: 'Scorecards, change records, incidents and a periodic portfolio decision' },
  ];

  const STAGE_DIFF = [
    { s: 'Demonstration', y: 'Illustrates a capability or interaction.', n: 'Customer-specific suitability or verified results' },
    { s: 'Proof of Concept', y: 'Tests whether the technical approach can work.', n: 'Complete business value or production readiness' },
    { s: 'Proof of Value', y: 'Measures workflow quality, relevance, controls and operating feasibility.', n: 'Safe performance at unrestricted scale' },
    { s: 'Controlled pilot', y: 'Tests limited real operation with bounded users, data and authority.', n: 'Approval for broader or higher-impact operation' },
    { s: 'Production service', y: 'Operates within an approved scope, controls and support model.', n: 'Permanent approval without monitoring and review' },
  ];

  // AGS1 — authority tiers
  const TIERS = [
    { t: 'Observe', a: 'Retrieve and analyse approved information without changing a system.', h: 'Reviews when required' },
    { t: 'Prepare', a: 'Draft a response, transaction or update.', h: 'Reviews and executes' },
    { t: 'Recommend', a: 'Present a proposed decision with its evidence.', h: 'Makes the decision' },
    { t: 'Act within limits', a: 'Perform predefined reversible actions inside deterministic thresholds.', h: 'Reviews monitoring and exceptions' },
    { t: 'Approval-controlled action', a: 'Prepare a consequential action, then pause.', h: 'Approves or rejects' },
    { t: 'Prohibited action', a: 'Stop and escalate.', h: 'Handles it outside the agent' },
  ];

  const CONTROLS = [
    { t: 'Accountability and inventory', d: 'Purpose, owners, version, systems and scope.', e: 'Agent register, ownership matrix and approved use-case statement' },
    { t: 'Identity and delegated access', d: 'Agent identity, initiating-user context, authentication, credential duration and revocation.', e: 'Identity design, permission map and access tests' },
    { t: 'Data and context boundaries', d: 'Data classes, knowledge sources, retrieval filters, retention, residency and memory treatment.', e: 'Data-flow map, source approvals and handling rules' },
    { t: 'Tool and transaction controls', d: 'Allowed tools, read and write scope, parameters, targets, rate and transaction limits.', e: 'Tool register, permission tests and prohibited-action tests' },
    { t: 'Instruction and output protection', d: 'Untrusted-content isolation, prompt-injection defence, structured outputs and sensitive-data filtering.', e: 'Adversarial tests and validation records' },
    { t: 'Human authority', d: 'Approval thresholds, qualified reviewers, evidence, expiry, escalation and separation of duties.', e: 'Authority matrix and approval-flow tests' },
    { t: 'Monitoring and containment', d: 'Structured traces, anomaly detection, circuit breakers, revocation, reconciliation and rollback.', e: 'Alerts, containment tests and recovery procedures' },
    { t: 'Lifecycle governance', d: 'Provider review, security review, release, change control, revalidation, incidents and retirement.', e: 'Release decision, change history and incident plan' },
  ];

  const THREATS = [
    { t: 'Goal hijacking and prompt injection', c: 'Treat user content, documents, websites and retrieved records as untrusted; isolate instructions from content and validate proposed actions.' },
    { t: 'Tool misuse', c: 'Allowlist tools and operations, validate parameters, restrict targets and enforce limits outside the model.' },
    { t: 'Identity and privilege abuse', c: 'Separate identities, short-lived credentials, least privilege, revocation and access review.' },
    { t: 'Data exfiltration', c: 'Retrieval permission, output filtering, destination control and sensitive-data detection across every output path.' },
    { t: 'Memory poisoning', c: 'Validate memory writes, isolate users and workflows, expire unnecessary context and keep enterprise systems authoritative.' },
    { t: 'Approval manipulation', c: 'Deterministic risk classification, authenticated reviewers, sufficient evidence, expiry and escalation.' },
    { t: 'Cascading multi-agent failure', c: 'Authenticate handoffs, validate messages, limit delegation depth and implement circuit breakers.' },
    { t: 'Supply-chain compromise', c: 'Review models, connectors, tools, packages and providers; track versions and retest material changes.' },
  ];

  // AGM1 — measurement
  const SCORECARD = [
    { t: 'Business outcome', q: 'Did the workflow improve the approved objective?', m: 'Resolution, completion, backlog reduction, capacity released or risk reduction' },
    { t: 'Process performance', q: 'Did the end-to-end process improve?', m: 'Cycle time, handoffs, rework, exceptions and service-level attainment' },
    { t: 'User and customer experience', q: 'Is the workflow useful and appropriately adopted?', m: 'Adoption, abandonment, handoff quality, satisfaction and reviewer effort' },
    { t: 'Agent quality and authority', q: 'Did it behave correctly and stay within limits?', m: 'Task completion, groundedness, tool accuracy, approval adherence and prohibited-action attempts' },
    { t: 'Reliability and recovery', q: 'Can the service operate and recover predictably?', m: 'Availability, latency, failed or duplicate actions, recovery time and incidents' },
    { t: 'Unit economics', q: 'Does the outcome justify total operating cost?', m: 'Cost per task, cost per successful completion, review cost and support effort' },
  ];

  const READINESS = [
    { t: 'Defined business outcome', d: 'A specific process result that can be measured.' },
    { t: 'Accountable process owner', d: 'A business owner who can define scope and accept outcomes.' },
    { t: 'Known baseline', d: 'Current volume, cycle time, effort, quality, exceptions or cost.' },
    { t: 'Bounded workflow', d: 'A starting condition, permitted steps and completion criteria.' },
    { t: 'Approved information', d: 'Knowledge and records with defined access rights.' },
    { t: 'Accessible systems', d: 'Suitable APIs, applications or controlled integration methods.' },
    { t: 'Authority boundaries', d: 'What the agent may observe, prepare, recommend, execute or never perform.' },
    { t: 'Representative evaluation cases', d: 'Routine, ambiguous, exceptional, prohibited and failure scenarios.' },
    { t: 'Operational ownership', d: 'Teams responsible for monitoring, approvals, incidents and improvement.' },
  ];

  const faqs = [
    { q: 'What makes a workflow agentic?',
      a: 'It can determine and execute permitted next steps towards a defined task objective using approved context, tools and controls — while staying bounded by identity, permissions, validation, approval and stopping rules.' },
    { q: 'How is Agentic AI different from conventional automation?',
      a: 'Conventional automation suits predictable rules and fixed process paths. Agentic AI supports variable reasoning, retrieval and tool selection. Business-critical rules should stay deterministic wherever possible.' },
    { q: 'Does every implementation require multiple agents?',
      a: 'No. We recommend the simplest architecture that can complete the approved workflow reliably. Multiple agents are justified only where responsibilities, tools, knowledge or permission boundaries are genuinely separate.' },
    { q: 'Will the agent replace our existing enterprise systems?',
      a: 'Normally no. Your approved applications and databases remain the systems of record. The agent operates through controlled interfaces and writes material outcomes to the appropriate system.' },
    { q: 'Can IICL work with our selected models and cloud environment?',
      a: 'We evaluate model and deployment choices against quality, security, privacy, compatibility, latency, cost and provider terms. Compatibility is validated for the proposed architecture rather than assumed.' },
    { q: 'Will our enterprise data be used to train external models?',
      a: 'That depends on the selected provider, the service configuration, the contractual terms and the data path. Data use, retention, processing and provider controls are confirmed before production access is authorised.' },
    { q: 'Can an agent execute actions without human approval?',
      a: 'Only within explicitly approved deterministic boundaries. Consequential, high-impact or difficult-to-reverse actions may remain human-controlled regardless of how well the model performs.' },
    { q: 'Is an Agentic AI solution secure or compliant by default?',
      a: 'No. Security and compliance depend on the complete architecture, configuration, providers, your environment and the operating procedures. Final approval remains with your authorised functions.' },
    { q: 'What is the difference between a demonstration and a Proof of Value?',
      a: 'A demonstration illustrates capability. A Proof of Value measures the workflow against representative cases, business outcomes, quality thresholds, authority controls, security scenarios, limitations and operating economics.' },
    { q: 'How long does implementation take?',
      a: 'It depends on workflow scope, data and integration readiness, evaluation requirements, security review, organisational approvals and production operating requirements. We estimate it after discovery rather than promising a universal duration.' },
    { q: 'How will success be measured?',
      a: 'We establish the baseline, process outcome, quality requirements, authority adherence, reliability, human-review effort and total operating cost before any scaling decision is made.' },
    { q: 'What happens after production launch?',
      a: 'The approved workflow requires monitoring, evaluation, incident handling, cost oversight, change control and periodic decisions to scale, maintain, restrict, redesign or retire it.' },
  ];
</script>

<ServiceLayout
  kicker="Service"
  h1="Governed AI Agents That Work Across Enterprise Systems"
  lede="IICL designs, validates, integrates and operates Agentic AI workflows that use approved enterprise knowledge, controlled tools and defined authority to complete measurable work across your applications and data."
  path="/agentic-ai"
  cta="Assess an Agentic Workflow"
  ctaHref="/contactus?intent=agentic-ai-workflow-assessment"
  bandKicker="Start with one workflow"
  bandHeading="Bring us one workflow, one accountable owner and one measurable outcome."
  heroImage={PAGE_ART['agentic-ai']}
  {faqs}
>
  <!-- AGH1 trust strip + the qualification that frames the whole page -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Where an agent earns its authority</h2>
      <ul class="scope">
        <li>Workflow-first design</li><li>Controlled enterprise tools</li>
        <li>Human authority where required</li><li>Measurable operating evidence</li>
      </ul>
      <p class="para">Start with one workflow, one accountable owner and one measurable outcome. The appropriate model, platform, integration pattern and level of autonomy are determined only after the operating requirements and risks are understood.</p>
      <p class="para"><a class="anchor-cta" href="#agentic-architecture">Explore the governed architecture <span class="mono">→</span></a></p>
    </div>
  </section>

  <!-- AGF1 — foundation -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What makes an enterprise agent useful — and governable</h2>
      <div class="section-body">
        <p class="para">An enterprise agent is more than a conversational interface. It can determine permitted next steps towards a defined task objective, retrieve approved context, use authorised tools and respond to exceptions. Its usefulness depends on the workflow it completes; its trustworthiness depends on the controls that constrain it.</p>
      </div>
      <div class="cards">
        {#each FOUNDATION as f}
          <article class="card"><h3>{f.t}</h3><p>{f.d}</p></article>
        {/each}
      </div>
      <p class="para note">
        Business-critical rules, permissions, transaction limits, approvals and prohibited
        actions should remain deterministic wherever possible. Model confidence must not
        replace enterprise policy.
      </p>

      <h3 class="sub-h">Choosing the simplest approach that works</h3>
      <ul class="rows">
        {#each COMPARE as c}
          <li><span class="row-a">{c.a}</span><span class="row-b">{c.b}</span><span class="row-c mono">Limitation — {c.c}</span></li>
        {/each}
      </ul>
      <p class="para note">
        We recommend the simplest architecture that can complete the approved workflow
        reliably. Multiple agents are introduced only where separating responsibility,
        knowledge, tools or authority creates a defensible operating benefit.
      </p>
    </div>
  </section>

  <!-- AGU1 — workflow opportunities -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Start where reasoning, actions and exceptions meet</h2>
      <div class="section-body">
        <p class="para">Strong candidates have a measurable process outcome, approved information, defined system actions, representative exceptions and an accountable owner. We assess the workflow before recommending whether it needs an agent, an AI-assisted step, or deterministic automation.</p>
      </div>
      <ul class="rows">
        {#each WORKFLOWS as w}
          <li>
            <span class="row-a">{w.t}</span>
            <span class="row-b"><strong>{w.out}</strong> {w.work}</span>
            <span class="row-c mono">Initial authority — {w.auth}</span>
          </li>
        {/each}
      </ul>
      <p class="para note">
        High-impact financial, legal, employment, healthcare, safety or irreversible
        decisions require stronger governance and may remain permanently human-controlled.
      </p>
    </div>
  </section>

  <!-- AGC1 — governed architecture -->
  <section id="agentic-architecture" class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>From natural-language intent to controlled enterprise action</h2>
      <div class="section-body">
        <p class="para">We separate reasoning from authority. The agent may interpret the task and propose the next step, while identity, data access, tool permissions, validation, approval and transaction controls determine what can actually occur.</p>
      </div>
      <ol class="layers">
        {#each LAYERS as l, i}
          <li>
            <span class="mono layer-n">{String(i + 1).padStart(2, '0')}</span>
            <span class="layer-b"><strong>{l.t}</strong>{l.r}</span>
            <span class="layer-c mono">{l.i}</span>
          </li>
        {/each}
      </ol>
      <!-- The execution path as selectable text, not only as artwork (Spec E§5 AGC1). -->
      <pre class="path" aria-label="Controlled execution path">Verified trigger
  &rarr; Workflow state and agent runtime  (+ approved knowledge)
    &rarr; Deterministic policy and authority gate
        &#9500;&#9472; Approval required &rarr; authorised reviewer
        &#9492;&#9472; Permitted         &rarr; allowlisted tool
              &rarr; Enterprise system
                &rarr; Audit, monitoring and recovery</pre>
      <div class="section-body">
        <p class="para note">
          Enterprise applications and databases remain authoritative. Long-term agent
          memory must not silently become an alternative system of record.
        </p>
        <p class="para note">
          Where the Model Context Protocol suits the selected tools and environment, IICL
          implements that open standard inside an enterprise orchestration, security and
          governance architecture. MCP is not IICL technology.
        </p>
      </div>
    </div>
  </section>

  <!-- AGD1 — evidence-gated delivery -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Progress on evidence, not on a predetermined number of weeks</h2>
      <div class="section-body">
        <p class="para">We progress an Agentic AI workflow only when the evidence required at the current gate has been reviewed and accepted. Timing depends on workflow scope, data readiness, integrations, evaluation requirements, security review, organisational approvals and operating readiness.</p>
      </div>
      <ol class="flow">
        {#each PHASES as p, i}
          <li class="flow-step">
            <b>{String(i + 1).padStart(2, '0')}</b>
            <strong>{p.t}</strong>
            <span>{p.q}</span>
          </li>
        {/each}
      </ol>
      <div class="outs">
        {#each PHASES as p, i}
          <p class="out"><span class="mono">{String(i + 1).padStart(2, '0')}</span> {p.e}</p>
        {/each}
      </div>

      <h3 class="sub-h">What each stage does and does not establish</h3>
      <ul class="rows">
        {#each STAGE_DIFF as d}
          <li><span class="row-a">{d.s}</span><span class="row-b">{d.y}</span><span class="row-c mono">Does not establish — {d.n}</span></li>
        {/each}
      </ul>

      <h3 class="sub-h">Controlled rollout</h3>
      <div class="section-body">
        <p class="para">Offline evaluation, then shadow mode, then approval-first mode, then limited action mode, then approved operating mode. Higher-impact actions may remain permanently approval-controlled.</p>
        <p class="para note">
          Failure to meet a gate is valid evidence. It may lead to redesigning the
          workflow, reducing agent authority, selecting simpler automation, or stopping.
        </p>
      </div>
    </div>
  </section>

  <!-- AGS1 — security, authority and governance -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Give every agent a verifiable identity, limited authority and a safe stop</h2>
      <div class="section-body">
        <p class="para">We design Agentic AI workflows around explicit identities, approved data boundaries, task-specific tools, deterministic authority rules, human-approval requirements and traceable actions. Controls are validated against the workflow, the deployment environment and your risk requirements before production is authorised.</p>
        <p class="para emphasis">An agent must never receive unrestricted enterprise access merely because it can interpret natural-language instructions. Its permissions must remain narrower than its potential capabilities.</p>
      </div>

      <h3 class="sub-h">Authority tiers</h3>
      <ul class="rows">
        {#each TIERS as t}
          <li><span class="row-a">{t.t}</span><span class="row-b">{t.a}</span><span class="row-c mono">Human role — {t.h}</span></li>
        {/each}
      </ul>
      <p class="para note">
        Model confidence must not be the sole authority mechanism. Consequential-action
        rules are enforced through deterministic policy, identity and transaction controls
        outside the model.
      </p>

      <h3 class="sub-h">Eight control domains</h3>
      <ul class="rows">
        {#each CONTROLS as c}
          <li><span class="row-a">{c.t}</span><span class="row-b">{c.d}</span><span class="row-c mono">Evidence — {c.e}</span></li>
        {/each}
      </ul>

      <h3 class="sub-h">Agent-specific threats and controls</h3>
      <ul class="rows">
        {#each THREATS as t}
          <li><span class="row-a">{t.t}</span><span class="row-b">{t.c}</span></li>
        {/each}
      </ul>

      <h3 class="sub-h">Containment</h3>
      <div class="section-body">
        <p class="para">Every production design defines how to detect abnormal behaviour, pause the workflow, revoke credentials, disable tools, preserve evidence, identify affected records, reconcile or reverse incomplete actions, notify owners, correct the control and retest before restoring service.</p>
        <p class="para emphasis">A kill switch is not sufficient unless the organisation can identify what the agent already accessed or changed, and reconcile the resulting business state.</p>
        <p class="para note">
          Security and compliance depend on the final architecture, your environment, the
          selected providers, the configured controls and the operating procedures. No
          Agentic AI implementation should be described as compliant or secure by default.
          IICL does not replace your legal, regulatory, privacy, information-security or
          risk-acceptance functions.
        </p>
      </div>
    </div>
  </section>

  <!-- AGM1 — value, observability and operations -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Measure the outcome, observe the workflow, scale only what creates value</h2>
      <div class="section-body">
        <p class="para emphasis">Agent activity is not automatically business value. Sessions, messages, tool calls and automated steps matter only when they contribute to an approved process outcome without creating unacceptable errors, risk, cost or downstream work.</p>
      </div>
      <ul class="rows">
        {#each SCORECARD as sc}
          <li><span class="row-a">{sc.t}</span><span class="row-b">{sc.q}</span><span class="row-c mono">{sc.m}</span></li>
        {/each}
      </ul>
      <p class="para note">
        Without an agreed baseline and an authoritative measurement source, any later
        improvement claim is an estimate — not a verified outcome. Time saved is not
        automatically cash saved, released capacity has to be measured and its use
        explained, and revenue uplift needs an agreed attribution method.
      </p>

      <h3 class="sub-h">Engagement pathways</h3>
      <ul class="list">
        <li><strong>Workflow Assessment</strong> — suitability, baseline, authority boundaries and evaluation requirements</li>
        <li><strong>Proof of Value</strong> — business relevance, quality, controls, economics and limitations</li>
        <li><strong>Controlled Pilot</strong> — limited real operation with bounded users, data and actions</li>
        <li><strong>Production Enablement</strong> — integration, security, operational readiness and release</li>
        <li><strong>Managed AgentOps</strong> — monitoring, evaluation, support, optimisation, revalidation and reporting</li>
      </ul>
      <p class="para note">
        Scope, responsibilities, service levels, environments, integrations, evaluation
        requirements, operating model, timing and fees are confirmed after discovery.
        Managed AgentOps does not transfer your business ownership, approval authority,
        security governance or regulatory accountability to IICL.
      </p>
    </div>
  </section>

  <!-- AGQ1 — readiness -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Identify one measurable workflow before designing the agent</h2>
      <div class="section-body">
        <p class="para">We begin with a defined business process — not a predetermined model, platform or number of agents.</p>
        <p class="para emphasis">Not every process requires Agentic AI. Deterministic workflow automation, an AI-assisted step, analytics or a human-led process may achieve the required outcome with less complexity and risk.</p>
      </div>
      <ul class="rows">
        {#each READINESS as r}
          <li><span class="row-a">{r.t}</span><span class="row-b">{r.d}</span></li>
        {/each}
      </ul>
      <p class="para note">
        This is a directional check, not a score, a certification or production approval.
      </p>
    </div>
  </section>

  <!-- Final conversion -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Start with one workflow, one outcome and a defined authority boundary</h2>
      <div class="section-body">
        <p class="para">We will assess the current process, the measurable outcome, the approved information, the enterprise systems, the permitted actions, the human decisions and the evidence needed to determine the appropriate next step.</p>
        <div class="cta-row">
          <a class="btn" href="/contactus?intent=agentic-ai-workflow-assessment">Assess an Agentic Workflow <span class="mono">→</span></a>
          <a class="btn btn-ghost" href="/contactus?intent=agentic-ai-value-assessment">Build an Agentic AI value case <span class="mono">→</span></a>
        </div>
        <p class="para small-links">
          <a class="anchor-cta" href="/contactus?intent=agentic-ai-architecture">Discuss agent architecture</a>
          <span class="sep">·</span>
          <a class="anchor-cta" href="/contactus?intent=agentic-ai-security-assessment">Assess agent security and authority</a>
          <span class="sep">·</span>
          <a class="anchor-cta" href="/contactus?intent=agentic-ai-managed-operations">Discuss Managed AgentOps</a>
        </p>
        <p class="para note">
          The initial discussion establishes suitability and discovery requirements. Scope,
          responsibilities, architecture, environments, evaluation activities, timing and
          fees are confirmed separately.
        </p>
        <p class="para safety">
          <strong>Please do not send sensitive material through this form.</strong>
          That means passwords, API keys, confidential architecture documents, personal
          records, production data or security vulnerabilities. Sensitive discovery
          information should be exchanged through an approved channel once an engagement
          has started.
        </p>
      </div>
    </div>
  </section>
</ServiceLayout>

<style>
  .mono { font-family: var(--font-mono); }

  .scope { list-style: none; margin: 0 0 14px; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
  .scope li { font-family: var(--font-mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
    color: var(--brand-ink); padding: 6px 12px; border-radius: 999px;
    border: 1px solid color-mix(in srgb, var(--brand) 26%, transparent); }
  .anchor-cta { color: var(--brand-ink); font-weight: var(--w-medium); text-decoration: none; }
  .anchor-cta:hover { text-decoration: underline; }
  .sep { color: var(--muted); margin: 0 8px; }
  .small-links { font-size: var(--fs-small); }

  .sub-h { margin: 26px 0 0; font-size: 16px; font-weight: var(--w-heading); color: var(--ink); }

  .rows { list-style: none; margin: 14px 0 0; padding: 0; display: grid; gap: 1px;
    background: var(--line); border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
  .rows li { background: #fff; padding: 15px 18px; display: grid; gap: 5px; }
  .row-a { font-size: 15px; font-weight: var(--w-heading); color: var(--ink); }
  .row-b { font-size: 14.5px; line-height: 1.55; color: #40434a; }
  .row-c { font-size: 11.5px; line-height: 1.5; color: var(--muted); }

  .cards { display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 12px; margin-top: 14px; }
  .card { background: #fff; padding: 18px; border: 1px solid var(--line); border-radius: 8px; }
  .card h3 { margin: 0 0 7px; font-size: 15.5px; font-weight: var(--w-heading); color: var(--ink); }
  .card p { margin: 0; font-size: 14px; line-height: 1.6; color: #40434a; }

  .layers { list-style: none; margin: 14px 0 0; padding: 0; display: grid; gap: 1px;
    background: var(--line); border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
  .layers li { background: #fff; padding: 15px 18px; display: grid; gap: 5px; }
  .layer-n { font-size: 11px; color: var(--brand-ink); }
  .layer-b { font-size: 14.5px; line-height: 1.55; color: #40434a; }
  .layer-b strong { display: block; font-size: 15px; color: var(--ink); }
  .layer-c { font-size: 11.5px; line-height: 1.5; color: var(--muted); }

  .path { margin: 18px 0 0; padding: 18px; overflow-x: auto; border: 1px solid var(--line);
    border-radius: 8px; background: #fbfaf9; font-family: var(--font-mono);
    font-size: 12.5px; line-height: 1.75; color: #40434a; }

  .outs { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 8px 20px; margin-top: 20px; }
  .out { margin: 0; font-size: 13.5px; line-height: 1.55; color: var(--muted); }
  .out span { color: var(--brand-ink); margin-right: 6px; }

  .emphasis { font-weight: var(--w-medium); color: var(--ink); padding-left: 14px; border-left: 2px solid var(--brand); }

  .cta-row { display: flex; flex-wrap: wrap; gap: 12px; margin: 18px 0 14px; }
  .btn { display: inline-flex; align-items: center; gap: 9px; padding: 13px 24px; border-radius: 8px;
    background: var(--brand-solid, #d81f1e); color: #fff; text-decoration: none; font-weight: var(--w-medium); font-size: 15px; }
  .btn:hover { filter: brightness(1.08); }
  .btn-ghost { background: transparent; color: var(--ink); border: 1px solid var(--line); }
  .btn-ghost:hover { border-color: var(--brand); color: var(--brand-ink); filter: none; }

  .note { font-size: var(--fs-small); color: var(--muted); }
  .safety { padding: 12px 16px; border: 1px solid var(--line); border-radius: 6px;
    background: #fff; font-size: var(--fs-small); line-height: 1.6; }
</style>
