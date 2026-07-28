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
  cta="Discuss Your Logistics Process"
  faqs={[
    { q: "Does this work with our existing TMS or WMS?", a: "Yes. Most of this work is integration with the systems you run, including TMS, WMS, GPS feeds, ERP and customer portals." },
    { q: "What if drivers have no signal?", a: "Mobile capture works offline and syncs when connectivity returns, which matters for proof of delivery on rural routes." },
    { q: "What data is needed for ETA prediction?", a: "Historical trip data, GPS traces and order records. The more history, the better the estimate, and we will tell you if there is not enough to be useful." },
    { q: "Where do operators usually start?", a: "Proof of delivery and shipment status, because both remove immediate manual follow-up and the improvement is visible within weeks." },
    { q: "Can customers track shipments themselves?", a: "Yes, through a portal or WhatsApp updates, which is usually what removes the status-chasing calls." },
  ]}
  autoFaq
>
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
</Layout>
