<script>
  // Ported from the official IICL site (iicl.in). Edit copy, images or reorder <section> blocks freely.
  import Layout from '../Layout.svelte';
  import { PAGE_ART } from '../menu.js';
</script>

<Layout
  kicker="Industry"
  h1="AI-Powered Legal Workflow Automation"
  lede="AI-assisted contract review, document search, summarisation and obligation tracking for law firms and corporate legal teams. Lawyers review every output."
  heroImage={PAGE_ART["legal"]}
  path="/legal"
  schemaType="Service"
  cta="Assess an Industry Workflow"
  faqs={[
    { q: "Does this provide legal advice?", a: "No. It supports qualified professionals by summarising, searching and surfacing relevant passages. Every output requires review by a lawyer before it is relied on." },
    { q: "Is client material used to train models?", a: "No. Documents are processed to answer your queries. Retention and deletion are agreed before onboarding." },
    { q: "How is confidentiality maintained?", a: "Role-based permissions, audit logs and private deployment options. IICL is ISO 27001 certified and SOC 2 audited." },
    { q: "What if it summarises something incorrectly?", a: "That is why review is mandatory rather than advisory. Outputs cite the passages they came from, so a reviewer can check the source rather than trust the summary." },
    { q: "Which work does it suit?", a: "Contract review, document search, summarisation, obligation tracking and intake: high-volume reading where a professional still makes the judgement." },
  ]}
  autoFaq
  bandKicker="Assess a workflow"
  bandHeading="Bring us one document or matter workflow. Professional review stays with your lawyers throughout."
  ctaHref="/contactus?intent=enterprise-ai-use-case">
  <section class="page-section">
    <div class="wrap section-split">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>Where AI actually helps</h2>
        <p class="statement">Faster reading. <em>The judgement stays with the lawyer.</em></p>
        <p class="para">High-volume reading is where legal teams lose their hours: contract review, document search, obligation tracking, matter intake.</p>
        <p class="para">AI takes the first pass and cites the passages it drew on, so a reviewer checks a source rather than trusting a summary.</p>
        <a class="cta-link" href="/contactus">Request a legal AI demonstration <span class="arw">→</span></a>
      </div>
      <div class="split-media">
        <figure><img src="/img/legal.png" alt="Gavel on a bench, representing legal practice" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What changes</h2>
      <div class="section-body">
        <p class="para">Every output is written to be checked, because review is mandatory rather than advisory.</p>
      </div>
      <ul class="outcomes">
        <li class="outcome"><b>Cited</b><span>Every output points back to the passage it came from.</span></li>
        <li class="outcome"><b>Private</b><span>Client material is never used to train models.</span></li>
        <li class="outcome"><b>Reviewed</b><span>A qualified professional signs off before anything is relied on.</span></li>
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
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Contract review</strong> — risk flagging, clause extraction and version comparison.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Document search</strong> — plain-language questions asked across a whole bundle.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Obligation tracking</strong> — dates, duties and renewals surfaced before they bite.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Matter intake</strong> — triage and client-ready summaries on arrival.</span></li>
      </ul>
      <a class="cta-link" href="/contactus">See it run on your document set <span class="arw">→</span></a>
    </div>
  </section>
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Systems, ownership and boundaries</h2>
      <div class="section-body">
        <p class="para">Before anything is designed we agree which systems hold the truth, who owns each decision, and what the system is never permitted to decide. That boundary is written down and does not move without your approval.</p>
      </div>
      <dl class="sysgrid">
        <div class="sysrow"><dt>Systems of record</dt><dd>Document management and contract lifecycle platforms, at matter-level permissions</dd></div>
        <div class="sysrow"><dt>Human owner</dt><dd>The responsible lawyer; professional review is mandatory on every output</dd></div>
        <div class="sysrow"><dt>Never automated</dt><dd>Legal advice, filing, execution and any position taken on a matter</dd></div>
        <div class="sysrow"><dt>Privilege</dt><dd>Privileged material stays inside your permission boundary and is never used to train a shared model</dd></div>
        <div class="sysrow"><dt>Citations</dt><dd>Extraction and summary outputs cite the source clause so the reviewer can verify</dd></div>
        <div class="sysrow"><dt>Retention</dt><dd>Retention and deletion follow the matter policy, not a platform default</dd></div>
      </dl>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What we would measure</h2>
      <div class="section-body">
        <p class="para measures-note"><strong>Measures to validate, not results achieved.</strong> These are the measures we would agree during discovery and baseline before go-live. We publish figures only with a baseline, a measurement period, a calculation method and the customer&rsquo;s approval.</p>
        <ul class="list">
          <li>First-pass review time per contract type</li>
          <li>Share of clauses extracted correctly at first pass</li>
          <li>Obligations captured against a manual sample</li>
          <li>Reviewer corrections per document, trending over time</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Related paths</h2>
      <ul class="pathlist">
          <li><a href="/ai-genai-services">Enterprise AI &amp; GenAI</a><span>how a use case is scoped and taken to production</span></li>
          <li><a href="/agentic-ai">Agentic AI</a><span>where document workflows need controlled action</span></li>
          <li><a href="/gcc-technology-teams">GCC Technology Teams</a><span>building the legal-tech capability in-house</span></li>
      </ul>
    </div>
  </section>

</Layout>
