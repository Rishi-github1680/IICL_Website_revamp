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
  cta="Assess an Industry Workflow"
  faqs={[
    { q: "What data do you need to start?", a: "Machine data where it exists, plus maintenance records, quality records and whatever your ERP holds. If the records are on paper, that is worth knowing early because it changes the approach." },
    { q: "Does plant data have to leave the site?", a: "Not necessarily. On-premise and air-gapped deployments are available where site policy or connectivity requires it." },
    { q: "How small can a first project be?", a: "One machine or one line. That is usually the right size: enough to prove the result, small enough that a wrong answer costs little." },
    { q: "Who operates it once it is live?", a: "Your team. We train the operators and maintenance staff who will use it daily, and document the escalation route for when it flags something unexpected." },
  ]}
  autoFaq
  bandKicker="Assess a workflow"
  bandHeading="Bring us one plant or planning workflow. We will tell you what it actually needs."
  ctaHref="/contactus?intent=enterprise-ai-use-case">
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
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Systems, ownership and boundaries</h2>
      <div class="section-body">
        <p class="para">Before anything is designed we agree which systems hold the truth, who owns each decision, and what the system is never permitted to decide. That boundary is written down and does not move without your approval.</p>
      </div>
      <dl class="sysgrid">
        <div class="sysrow"><dt>Systems of record</dt><dd>MES, ERP and the SCADA or historian layer; IoT gateways where sensors are already deployed</dd></div>
        <div class="sysrow"><dt>Deployment</dt><dd>Edge where latency or connectivity demands it, cloud where it does not</dd></div>
        <div class="sysrow"><dt>Human owner</dt><dd>Plant supervisors and quality engineers; the operator retains override</dd></div>
        <div class="sysrow"><dt>Never automated</dt><dd>Safety interlocks, shutdown decisions and anything governed by a safety case</dd></div>
        <div class="sysrow"><dt>Data prerequisite</dt><dd>Labelled defect examples for vision, and maintenance history for prediction</dd></div>
        <div class="sysrow"><dt>Escalation</dt><dd>Low-confidence detections queue for operator review rather than acting</dd></div>
      </dl>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What we would measure</h2>
      <div class="section-body">
        <p class="para measures-note"><strong>Measures to validate, not results achieved.</strong> These are the measures we would agree during discovery and baseline before go-live. We publish figures only with a baseline, a measurement period, a calculation method and the customer&rsquo;s approval.</p>
        <ul class="list">
          <li>Unplanned downtime attributable to the covered assets</li>
          <li>Defect escape rate at the inspected station</li>
          <li>Forecast error against the current planning baseline</li>
          <li>Operator override rate, as a signal of model trust</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Related paths</h2>
      <ul class="pathlist">
          <li><a href="/supply-chain">Supply chain planning</a><span>demand, inventory and transport planning</span></li>
          <li><a href="/ai-genai-services">Enterprise AI &amp; GenAI</a><span>how a use case is scoped and taken to production</span></li>
          <li><a href="/gcc-technology-teams">GCC Technology Teams</a><span>building the data and platform capability in-house</span></li>
      </ul>
    </div>
  </section>

</Layout>
