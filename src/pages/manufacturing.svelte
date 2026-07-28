<script>
  // Ported from the official IICL site (iicl.in). Edit copy, images or reorder <section> blocks freely.
  import Layout from '../Layout.svelte';
  import { PAGE_ART } from '../menu.js';
</script>

<Layout
  kicker="Industry"
  h1="AI and Automation for Manufacturing Operations"
  lede="Reduce downtime and quality escapes with AI for predictive maintenance, visual inspection, demand planning and energy optimisation on the plant floor."
  heroImage={PAGE_ART["manufacturing"]}
  path="/manufacturing"
  schemaType="Service"
  cta="Discuss a Manufacturing AI Pilot"
  faqs={[
    { q: "What data do you need to start?", a: "Machine data where it exists, plus maintenance records, quality records and whatever your ERP holds. If the records are on paper, that is worth knowing early because it changes the approach." },
    { q: "Does plant data have to leave the site?", a: "Not necessarily. On-premise and air-gapped deployments are available where site policy or connectivity requires it." },
    { q: "How small can a first project be?", a: "One machine or one line. That is usually the right size: enough to prove the result, small enough that a wrong answer costs little." },
    { q: "Who operates it once it is live?", a: "Your team. We train the operators and maintenance staff who will use it daily, and document the escalation route for when it flags something unexpected." },
  ]}
  autoFaq
>
  <section class="page-section">
    <div class="wrap section-split">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>Where AI actually helps</h2>
        <p class="statement">Downtime you saw coming. <em>Quality escapes you caught.</em></p>
        <p class="para">Plant floors already produce the data. It usually sits in machine logs, maintenance records and a quality spreadsheet that never meet.</p>
        <p class="para">Bringing them together is what makes prediction possible — starting with one machine or one line, small enough that a wrong answer costs little.</p>
        <a class="cta-link" href="/contactus">Discuss a single-line pilot <span class="arw">→</span></a>
      </div>
      <div class="split-media">
        <figure><img src="/img/manufucturing.png" alt="Robotic welding arm working on a production line" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What changes</h2>
      <div class="section-body">
        <p class="para">The first pilot is sized to prove a result, not to transform the plant.</p>
      </div>
      <ul class="outcomes">
        <li class="outcome"><b>Predicted</b><span>Failures flagged before the line stops, rather than after.</span></li>
        <li class="outcome"><b>Caught</b><span>Defects identified by vision inspection at line speed.</span></li>
        <li class="outcome"><b>On-site</b><span>Deployment where connectivity or site policy requires it.</span></li>
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
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Predictive maintenance</strong> — machine data and maintenance history turned into early warning.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Visual inspection</strong> — defect detection at line speed, consistent across every shift.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Demand and planning</strong> — production planned against forecast rather than last month.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Energy</strong> — consumption patterns and optimisation across the plant.</span></li>
      </ul>
      <a class="cta-link" href="/contactus">See what your data supports <span class="arw">→</span></a>
    </div>
  </section>
</Layout>
