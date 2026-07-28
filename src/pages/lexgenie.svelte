<script>
  import ProductLayout from '../ProductLayout.svelte';
</script>

<ProductLayout
  h1="Review, Search and Manage Legal Documents Using AI"
  lede="Contract summaries, clause extraction, risk flagging and obligation tracking — with your lawyers reviewing every output."
  heroBanner="/img/banners/A5-banner-lexgenie.png"
  heroModel="/human-brain.html?transparent=1&ui=0"
  path="/lexgenie"
  cta="Book a LexGenie Demo"
  specs={[
    { k: 'Built for', v: 'Law firms and legal teams' },
    { k: 'Reads', v: 'Contracts and case documents' },
    { k: 'Returns', v: 'Summaries, clauses, risk flags' },
    { k: 'Sign-off', v: 'Your lawyers review every output' },
  ]}
  faqs={[
    { q: "Does LexGenie give legal advice?", a: "No, and it is not built to. It summarises, searches and surfaces relevant passages so a qualified professional can work faster. Every output requires review by a lawyer before it is relied on." },
    { q: "What can it do with a document?", a: "Summarise it, answer questions about it in plain language, and return citations, headnotes and suggested next steps alongside the passages it drew on." },
    { q: "Which languages does it handle?", a: "English and Arabic documents." },
    { q: "Is our client material used to train models?", a: "No. Documents are processed to answer your queries. Retention, access and deletion are agreed before onboarding." },
    { q: "Who can see uploaded documents?", a: "Access is controlled by role and recorded in an audit log. Deployment options, including private deployment, are discussed before any material is uploaded." },
  ]}
>
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What LexGenie does</h2>
      <p class="statement">Hours of document review, returned as minutes — <em>with a lawyer signing off every output.</em></p>
      <div class="section-body">
        <p class="para">Rising caseloads meet manual research and drafting bottlenecks. LexGenie reads the contract, judgment or bundle and gives back a summary, the relevant clauses and the passages it drew on.</p>
        <p class="para">It is an assistant to the professional, not a substitute for one — every output is written to be checked.</p>
      </div>
      <a class="cta-link" href="/contactus">See it run on your documents <span class="arw">→</span></a>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What changes</h2>
      <div class="section-body">
        <p class="para">The first pass stops consuming the hours that should go to judgement.</p>
      </div>
      <ul class="outcomes">
        <li class="outcome"><b>Seconds</b><span>To locate relevant law, precedent and clauses across a bundle.</span></li>
        <li class="outcome"><b>Traceable</b><span>Every answer cites the passage it came from, so it can be checked.</span></li>
        <li class="outcome"><b>Consistent</b><span>Summaries and headnotes in the same shape every time.</span></li>
      </ul>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap section-split rev">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>Built for confidential material</h2>
        <p class="statement">Client material is not training data. <em>Ever.</em></p>
        <p class="para">Documents are processed to answer your queries and nothing else. Access is controlled by role and recorded in an audit log, and retention, deletion and deployment — including private deployment — are agreed before anything is uploaded.</p>
        <a class="cta-link" href="/contactus">Discuss deployment and data handling <span class="arw">→</span></a>
      </div>
      <div class="split-media">
        <figure class="dark-figure"><img src="/img/banners/A5-banner-lexgenie.png" alt="LexGenie secure document review environment" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Where it fits</h2>
      <div class="section-body">
        <p class="para">A sample of the work it takes on — the rest depends on your practice area.</p>
      </div>
      <ul class="feature-grid">
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Law firms</strong> — case research, drafting support and client-ready summaries.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Corporate legal</strong> — contract risk flagging, clause reuse and obligation tracking.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Compliance</strong> — policy checks, regulatory review and multi-jurisdiction summaries.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Legal education</strong> — interactive case databases and research exercises.</span></li>
      </ul>
      <a class="cta-link" href="/contactus">Explore the full capability set <span class="arw">→</span></a>
    </div>
  </section>
</ProductLayout>
