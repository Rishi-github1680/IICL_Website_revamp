<script>
  // Ported from the official IICL site (iicl.in). Edit copy, images or reorder <section> blocks freely.
  import Layout from '../Layout.svelte';
  import { PAGE_ART } from '../menu.js';
</script>

<Layout
  kicker="Industry"
  h1="AI-Driven Supply Chain Planning and Optimisation"
  lede="AI-driven demand forecasting, inventory optimisation, order prioritisation and transport planning, starting from a review of the data you already hold."
  heroImage={PAGE_ART["supply-chain"]}
  path="/supply-chain"
  schemaType="Service"
  cta="Assess an Industry Workflow"
  faqs={[
    { q: "How much history do you need to forecast?", a: "Generally two to three years of sales history, plus stock, order, supplier and transport data. We assess what you hold before promising anything about accuracy." },
    { q: "What if our data is messy?", a: "That is the normal starting point. The data assessment exists to establish what is usable, and it comes before any forecasting work." },
    { q: "Can planners override the system?", a: "Yes, and they should be able to. Overrides are recorded, which over time shows where the model is consistently wrong and needs adjusting." },
    { q: "How does it handle seasonality and promotions?", a: "Both are modelled explicitly where you have the history for them. Promotions in particular need past promotion data to be predicted usefully." },
    { q: "Does this replace our planning team?", a: "No. It removes the spreadsheet work so planners spend their time on exceptions and supplier decisions." },
  ]}
  autoFaq
  bandKicker="Assess a workflow"
  bandHeading="Bring us one planning workflow. We will start from the data you already hold."
  ctaHref="/contactus?intent=enterprise-ai-use-case">
  <section class="page-section">
    <div class="wrap section-split">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>Where AI actually helps</h2>
        <p class="statement">Start with the data you have. <em>Not the data you wish you had.</em></p>
        <p class="para">Forecasting promises are easy to make and hard to keep. What decides the result is the history you actually hold and how usable it is.</p>
        <p class="para">So the first engagement is an assessment rather than a model — establishing honestly what your sales, stock, supplier and transport data can support.</p>
        <a class="cta-link" href="/contactus">Request a data assessment <span class="arw">→</span></a>
      </div>
      <div class="split-media">
        <figure><img src="/img/supply-chain.png" alt="Air and sea freight overlaid with live supply chain data" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What changes</h2>
      <div class="section-body">
        <p class="para">Messy data is the normal starting point, not a disqualification.</p>
      </div>
      <ul class="outcomes">
        <li class="outcome"><b>Assessed</b><span>What your data supports, established before anything is promised.</span></li>
        <li class="outcome"><b>Overridable</b><span>Planners can overrule the system, and the overrides are recorded.</span></li>
        <li class="outcome"><b>Explicit</b><span>Seasonality and promotions modelled where the history exists.</span></li>
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
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Demand forecasting</strong> — modelled from sales history, seasonality and promotions.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Inventory</strong> — stock levels and reorder points tuned to service targets.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Order prioritisation</strong> — allocation decisions when supply is short.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Transport planning</strong> — load and route planning against real demand.</span></li>
      </ul>
      <a class="cta-link" href="/contactus">See what your history supports <span class="arw">→</span></a>
    </div>
  </section>
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Systems, ownership and boundaries</h2>
      <div class="section-body">
        <p class="para">Before anything is designed we agree which systems hold the truth, who owns each decision, and what the system is never permitted to decide. That boundary is written down and does not move without your approval.</p>
      </div>
      <dl class="sysgrid">
        <div class="sysrow"><dt>Systems of record</dt><dd>ERP, WMS and TMS; supplier and demand history as held today</dd></div>
        <div class="sysrow"><dt>Data prerequisite</dt><dd>Enough clean demand history to evaluate a forecast — assessed before anything is built</dd></div>
        <div class="sysrow"><dt>Human owner</dt><dd>The planner; the system proposes and the planner commits</dd></div>
        <div class="sysrow"><dt>Never automated</dt><dd>Purchase commitment, supplier selection and allocation under shortage</dd></div>
        <div class="sysrow"><dt>Override</dt><dd>Planner overrides are captured as signal, not treated as error</dd></div>
        <div class="sysrow"><dt>Escalation</dt><dd>Forecast drift and unusual demand patterns raise to the planning owner</dd></div>
      </dl>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What we would measure</h2>
      <div class="section-body">
        <p class="para measures-note"><strong>Measures to validate, not results achieved.</strong> These are the measures we would agree during discovery and baseline before go-live. We publish figures only with a baseline, a measurement period, a calculation method and the customer&rsquo;s approval.</p>
        <ul class="list">
          <li>Forecast error against your current planning baseline</li>
          <li>Stock cover and shortage frequency on the covered SKUs</li>
          <li>Planner time spent on exceptions versus routine review</li>
          <li>Override rate and the reasons behind it</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Related paths</h2>
      <ul class="pathlist">
          <li><a href="/logistics">Logistics operations</a><span>where the constraint is execution rather than planning</span></li>
          <li><a href="/manufacturing">Manufacturing</a><span>where planning meets the plant floor</span></li>
          <li><a href="/ai-genai-services">Enterprise AI &amp; GenAI</a><span>how a use case is scoped and taken to production</span></li>
      </ul>
    </div>
  </section>

</Layout>
