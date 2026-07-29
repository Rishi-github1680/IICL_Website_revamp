<script>
  // Ported from the official IICL site (iicl.in). Edit copy, images or reorder <section> blocks freely.
  import Layout from '../Layout.svelte';
  import { PAGE_ART } from '../menu.js';
</script>

<Layout
  kicker="Industry"
  h1="AI and Automation for Logistics Operations"
  lede="AI for logistics operations: shipment tracking, ETA prediction, route planning, POD automation, billing accuracy and exception alerts."
  heroImage={PAGE_ART["logistics"]}
  path="/logistics"
  schemaType="Service"
  cta="Assess an Industry Workflow"
  faqs={[
    { q: "Does this work with our existing TMS or WMS?", a: "Yes. Most of this work is integration with the systems you run, including TMS, WMS, GPS feeds, ERP and customer portals." },
    { q: "What if drivers have no signal?", a: "Mobile capture works offline and syncs when connectivity returns, which matters for proof of delivery on rural routes." },
    { q: "What data is needed for ETA prediction?", a: "Historical trip data, GPS traces and order records. The more history, the better the estimate, and we will tell you if there is not enough to be useful." },
    { q: "Where do operators usually start?", a: "Proof of delivery and shipment status, because both remove immediate manual follow-up and the improvement is visible within weeks." },
    { q: "Can customers track shipments themselves?", a: "Yes, through a portal or WhatsApp updates, which is usually what removes the status-chasing calls." },
  ]}
  autoFaq
  bandKicker="Assess a workflow"
  bandHeading="Bring us one movement or exception workflow. We will tell you what it actually needs."
  ctaHref="/contactus?intent=enterprise-ai-use-case">
  <section class="page-section">
    <div class="wrap section-split">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>Where AI actually helps</h2>
        <p class="statement">Where the shipment is — <em>before the customer calls to ask.</em></p>
        <p class="para">Most logistics effort goes on chasing status. The customer calls the desk, the desk calls the driver, and the driver is somewhere without signal.</p>
        <p class="para">Automating status and proof of delivery breaks that loop first, and the improvement shows within weeks rather than quarters.</p>
        <a class="cta-link" href="/contactus">Discuss your delivery process <span class="arw">→</span></a>
      </div>
      <div class="split-media">
        <figure><img src="/img/logistics.png" alt="Freight lorry at a container terminal" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What changes</h2>
      <div class="section-body">
        <p class="para">Operators usually start here because the manual follow-up disappears immediately.</p>
      </div>
      <ul class="outcomes">
        <li class="outcome"><b>Self-serve</b><span>Customers track shipments themselves, so the chasing calls stop.</span></li>
        <li class="outcome"><b>Offline</b><span>Proof of delivery captured without signal and synced later.</span></li>
        <li class="outcome"><b>Predicted</b><span>ETAs from your own trip history, not a flat estimate.</span></li>
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
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Shipment tracking</strong> — status pulled across TMS, GPS feeds and customer portals.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Proof of delivery</strong> — mobile capture built to work on rural routes.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Route and ETA</strong> — planning and prediction from historical trip data.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Billing and exceptions</strong> — freight accuracy, with alerts when a trip goes wrong.</span></li>
      </ul>
      <a class="cta-link" href="/contactus">See where the chasing stops <span class="arw">→</span></a>
    </div>
  </section>
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Systems, ownership and boundaries</h2>
      <div class="section-body">
        <p class="para">Before anything is designed we agree which systems hold the truth, who owns each decision, and what the system is never permitted to decide. That boundary is written down and does not move without your approval.</p>
      </div>
      <dl class="sysgrid">
        <div class="sysrow"><dt>Systems of record</dt><dd>TMS and WMS; GPS and telematics feeds where fitted</dd></div>
        <div class="sysrow"><dt>Field capture</dt><dd>Proof of delivery works offline and reconciles when the device reconnects</dd></div>
        <div class="sysrow"><dt>Human owner</dt><dd>Control-tower and depot staff; drivers are never assessed automatically</dd></div>
        <div class="sysrow"><dt>Never automated</dt><dd>Route commitment to a customer, penalty decisions and driver performance judgements</dd></div>
        <div class="sysrow"><dt>Confidence</dt><dd>ETA predictions carry a confidence band, and low-confidence estimates are not sent to customers</dd></div>
        <div class="sysrow"><dt>Escalation</dt><dd>Exceptions raise to a named controller with the shipment context attached</dd></div>
      </dl>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What we would measure</h2>
      <div class="section-body">
        <p class="para measures-note"><strong>Measures to validate, not results achieved.</strong> These are the measures we would agree during discovery and baseline before go-live. We publish figures only with a baseline, a measurement period, a calculation method and the customer&rsquo;s approval.</p>
        <ul class="list">
          <li>Proof-of-delivery capture rate and dispute volume</li>
          <li>ETA accuracy against actual arrival</li>
          <li>Billing accuracy on the covered lanes</li>
          <li>Exception resolution time</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Related paths</h2>
      <ul class="pathlist">
          <li><a href="/supply-chain">Supply chain planning</a><span>where the constraint is planning rather than movement</span></li>
          <li><a href="/ai-genai-services">Enterprise AI &amp; GenAI</a><span>how a use case is scoped and taken to production</span></li>
          <li><a href="/gcc-technology-teams">GCC Technology Teams</a><span>building the logistics-tech capability in-house</span></li>
      </ul>
    </div>
  </section>

</Layout>
