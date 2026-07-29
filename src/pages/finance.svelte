<script>
  // Ported from the official IICL site (iicl.in). Edit copy, images or reorder <section> blocks freely.
  import Layout from '../Layout.svelte';
  import { PAGE_ART } from '../menu.js';
</script>

<Layout
  kicker="Industry"
  h1="AI-Powered Finance and Accounting Automation"
  lede="Automate invoice processing, reconciliation, forecasting and expense review, with human approval, audit logs and access control at every step."
  heroImage={PAGE_ART["finance"]}
  path="/finance"
  schemaType="Service"
  cta="Assess an Industry Workflow"
  faqs={[
    { q: "Does anything post without a human approving it?", a: "Only where you decide it should. The default is that the system prepares and a person approves, with the approval recorded." },
    { q: "How is an audit trail maintained?", a: "Every action is logged with who or what performed it, what changed and when. The trail is exportable for your auditors." },
    { q: "Which systems does it connect to?", a: "ERP, accounting software, banking channels, payment gateways and reporting tools." },
    { q: "Where is our financial data held?", a: "Per your data residency requirements, which we agree before integration. IICL is ISO 27001 certified and SOC 2 audited." },
    { q: "What is the usual first process?", a: "Invoice processing or reconciliation. Both are repetitive, measurable, and low risk to pilot because the output is checked anyway." },
  ]}
  autoFaq
  bandKicker="Assess a workflow"
  bandHeading="Bring us one finance process. We will tell you where automation helps and where approval must stay."
  ctaHref="/contactus?intent=enterprise-ai-use-case">
  <section class="page-section">
    <div class="wrap section-split">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>Where AI actually helps</h2>
        <p class="statement">The system prepares. <em>A person still approves.</em></p>
        <p class="para">Invoice processing, reconciliation and expense review are repetitive, high volume and already checked by someone — which makes them the safest place to start.</p>
        <p class="para">Every action is logged with who or what performed it, so the audit trail is a by-product of the work rather than a reconstruction afterwards.</p>
        <a class="cta-link" href="/contactus">Request a finance automation assessment <span class="arw">→</span></a>
      </div>
      <div class="split-media">
        <figure><img src="/img/finance.png" alt="Automated finance processing represented by a robotic hand and currency" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What changes</h2>
      <div class="section-body">
        <p class="para">Control is the point. Speed is what you get once the control is in place.</p>
      </div>
      <ul class="outcomes">
        <li class="outcome"><b>Approved</b><span>Nothing posts without a person signing it off, unless you decide otherwise.</span></li>
        <li class="outcome"><b>Logged</b><span>Every action attributed and exportable for your auditors.</span></li>
        <li class="outcome"><b>Faster</b><span>Close cycles, because the preparation is already done.</span></li>
      </ul>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Where it is applied</h2>
      <div class="section-body">
        <p class="para">A sample of the work, not the full scope.</p>
      </div>
      <ul class="feature-grid">
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Accounts payable</strong> — invoice capture, matching and exception routing.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Reconciliation</strong> — bank, ledger and intercompany matched automatically.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Forecasting</strong> — cash and revenue projections built from your own history.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Expenses</strong> — policy checks, with out-of-line claims flagged for review.</span></li>
      </ul>
      <a class="cta-link" href="/contactus">See how it fits your close process <span class="arw">→</span></a>
    </div>
  </section>
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Systems, ownership and boundaries</h2>
      <div class="section-body">
        <p class="para">Before anything is designed we agree which systems hold the truth, who owns each decision, and what the system is never permitted to decide. That boundary is written down and does not move without your approval.</p>
      </div>
      <dl class="sysgrid">
        <div class="sysrow"><dt>Systems of record</dt><dd>ERP and the accounting ledger; banking interfaces and statement feeds</dd></div>
        <div class="sysrow"><dt>Human owner</dt><dd>The approver named in your delegation of authority; the system prepares, a person commits</dd></div>
        <div class="sysrow"><dt>Never automated</dt><dd>Payment release, journal posting and any entry that changes the ledger without approval</dd></div>
        <div class="sysrow"><dt>Separation of duties</dt><dd>Preparation and approval stay in different hands, and the system cannot hold both</dd></div>
        <div class="sysrow"><dt>Evidence</dt><dd>Every automated step writes an auditable record exportable to your auditors</dd></div>
        <div class="sysrow"><dt>Escalation</dt><dd>Exceptions, mismatches and anything outside tolerance route to a named owner</dd></div>
      </dl>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What we would measure</h2>
      <div class="section-body">
        <p class="para measures-note"><strong>Measures to validate, not results achieved.</strong> These are the measures we would agree during discovery and baseline before go-live. We publish figures only with a baseline, a measurement period, a calculation method and the customer&rsquo;s approval.</p>
        <ul class="list">
          <li>Invoice cycle time from receipt to approval</li>
          <li>Share of reconciliations matched without manual intervention</li>
          <li>Exception volume and how long exceptions wait</li>
          <li>Rework caused by incorrect extraction</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Related paths</h2>
      <ul class="pathlist">
          <li><a href="/banking">Banking operations</a><span>if you are a bank rather than a finance function</span></li>
          <li><a href="/erp-services">ERP services</a><span>if the finance system itself is the constraint</span></li>
          <li><a href="/ai-genai-services">Enterprise AI &amp; GenAI</a><span>how a use case is scoped and taken to production</span></li>
      </ul>
    </div>
  </section>

</Layout>
