<script>
  import ProductLayout from '../ProductLayout.svelte';
</script>

<ProductLayout
  h1="Ask Your Financial Data a Question, in Plain Language"
  lede="QuantaFin turns filings, books and models into answers you can trace back to the numbers they came from."
  heroBanner="/img/banners/A9-banner-quantafin.png"
  heroModel="/data-stream.html?transparent=1&ui=0"
  path="/quantafin"
  cta="Book a QuantaFin Demo"
  specs={[
    { k: 'Built for', v: 'Finance and analysis teams' },
    { k: 'Reads', v: 'Filings, books and models' },
    { k: 'Answers in', v: 'Plain language' },
    { k: 'Grounded in', v: 'Your own numbers' },
  ]}
  faqs={[
    { q: "What can we ask it?", a: "Questions about your financial data in plain language, such as comparing revenue between quarters. It returns the answer with the data table, the trend and its reasoning." },
    { q: "Where does it get the data?", a: "From your financial data sources, including SQL databases converted from spreadsheets. Connections are agreed during setup." },
    { q: "How do we know the numbers are right?", a: "Calculations run through a validation step, and every answer shows the underlying data and reasoning so a person can check the working. It supports your finance team's review; it does not replace it." },
    { q: "Who can see the financial data?", a: "Access is controlled by role and recorded. Deployment options are discussed before any data is connected." },
  ]}
>
  <section class="page-section">
    <div class="wrap section-split">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>What QuantaFin does</h2>
        <p class="statement">Ask your numbers a question in plain language — <em>and get an answer you can trace.</em></p>
        <p class="para">Compare revenue across quarters, test an assumption, check what moved and why. The answer comes back with the data table, the trend and the reasoning behind it.</p>
        <p class="para">It works from your filings, books and models — not from general knowledge about your industry.</p>
        <a class="cta-link" href="/contactus">See it run against your reporting <span class="arw">→</span></a>
      </div>
      <div class="split-media">
        <figure><img src="/img/products/quantafin-1.png" alt="QuantaFin financial question and answer view" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What changes</h2>
      <div class="section-body">
        <p class="para">The reporting cycle stops being the thing that decides how fast you can answer a question.</p>
      </div>
      <ul class="outcomes">
        <li class="outcome"><b>Seconds</b><span>From question to a reported figure, instead of a manual assembly cycle.</span></li>
        <li class="outcome"><b>Shown</b><span>Every answer carries its data and workings, so it can be signed off.</span></li>
        <li class="outcome"><b>Validated</b><span>Calculations run through a checking step before they reach you.</span></li>
      </ul>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap section-split rev">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>Answers you can sign off</h2>
        <p class="statement">In finance, an answer you cannot trace is an answer you cannot use.</p>
        <p class="para">Every response shows the underlying figures and the reasoning that produced them, so your team is reviewing working rather than trusting output. Access is controlled by role and recorded.</p>
        <a class="cta-link" href="/contactus">Talk through data access and controls <span class="arw">→</span></a>
      </div>
      <div class="split-media">
        <figure><img src="/img/products/quantafin-2.png" alt="QuantaFin traceable analysis with source figures" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Where it fits</h2>
      <div class="section-body">
        <p class="para">A sample of the questions it takes on day to day.</p>
      </div>
      <ul class="feature-grid">
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Reporting and close</strong> — on-demand reports and statement checks.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Planning</strong> — budgets and forecasts with assumptions stated, not buried.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Treasury</strong> — liquidity and cash burn tracked as they move.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Performance</strong> — EBITDA, ROI and unit economics on a consistent basis.</span></li>
      </ul>
      <a class="cta-link" href="/contactus">Explore the full capability set <span class="arw">→</span></a>
    </div>
  </section>
</ProductLayout>
