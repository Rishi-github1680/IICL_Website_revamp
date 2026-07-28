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
  cta="Request a Supply Chain Data Assessment"
  faqs={[
    { q: "How much history do you need to forecast?", a: "Generally two to three years of sales history, plus stock, order, supplier and transport data. We assess what you hold before promising anything about accuracy." },
    { q: "What if our data is messy?", a: "That is the normal starting point. The data assessment exists to establish what is usable, and it comes before any forecasting work." },
    { q: "Can planners override the system?", a: "Yes, and they should be able to. Overrides are recorded, which over time shows where the model is consistently wrong and needs adjusting." },
    { q: "How does it handle seasonality and promotions?", a: "Both are modelled explicitly where you have the history for them. Promotions in particular need past promotion data to be predicted usefully." },
    { q: "Does this replace our planning team?", a: "No. It removes the spreadsheet work so planners spend their time on exceptions and supplier decisions." },
  ]}
  autoFaq
>
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
</Layout>
