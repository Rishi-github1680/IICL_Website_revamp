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
  cta="Request a Legal AI Demonstration"
  faqs={[
    { q: "Does this provide legal advice?", a: "No. It supports qualified professionals by summarising, searching and surfacing relevant passages. Every output requires review by a lawyer before it is relied on." },
    { q: "Is client material used to train models?", a: "No. Documents are processed to answer your queries. Retention and deletion are agreed before onboarding." },
    { q: "How is confidentiality maintained?", a: "Role-based permissions, audit logs and private deployment options. IICL is ISO 27001 certified and SOC 2 audited." },
    { q: "What if it summarises something incorrectly?", a: "That is why review is mandatory rather than advisory. Outputs cite the passages they came from, so a reviewer can check the source rather than trust the summary." },
    { q: "Which work does it suit?", a: "Contract review, document search, summarisation, obligation tracking and intake: high-volume reading where a professional still makes the judgement." },
  ]}
  autoFaq
>
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
</Layout>
