<script>
  // Ported from the official IICL site (iicl.in). Edit copy, images or reorder <section> blocks freely.
  import Layout from '../Layout.svelte';
  import { PAGE_ART } from '../menu.js';
</script>

<Layout
  kicker="Industry"
  h1="Secure AI Automation for Banking Operations"
  lede="Secure AI automation for banking operations: customer service, document verification, loan processing and collections, with auditable human review."
  heroImage={PAGE_ART["banking"]}
  path="/banking"
  schemaType="Service"
  cta="Discuss a Banking AI Pilot"
  faqs={[
    { q: "Where should a bank start?", a: "A non-critical, high-volume workflow: customer service enquiries, document verification or collections support. Not credit decisions." },
    { q: "How do we evidence this to a regulator?", a: "Through the audit trail, model documentation and the human approval points built into the workflow. We assume the process will be examined and design for that." },
    { q: "Can it run inside our own environment?", a: "Yes. Deployment options include your own cloud tenancy and on-premise where policy requires it." },
    { q: "Does it make lending decisions?", a: "No. It can prepare, verify and route the work; the decision stays with your credit function and its governance." },
    { q: "What about existing core banking systems?", a: "Integration is through the interfaces your core banking, CRM, loan and payment systems already expose." },
  ]}
  autoFaq
>
  <section class="page-section">
    <div class="wrap section-split">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>Where AI actually helps</h2>
        <p class="statement">Built to be examined. <em>Not just to work.</em></p>
        <p class="para">Banking automation lives or dies on evidence. Every workflow assumes a regulator will eventually ask how a decision was reached and who approved it.</p>
        <p class="para">So the starting point is high volume and low risk — service enquiries, document verification, collections support. Not credit decisions.</p>
        <a class="cta-link" href="/contactus">Discuss a banking pilot <span class="arw">→</span></a>
      </div>
      <div class="split-media">
        <figure><img src="/img/banking.png" alt="Banking district towers representing financial institutions" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What changes</h2>
      <div class="section-body">
        <p class="para">Designed on the assumption that the process will be examined.</p>
      </div>
      <ul class="outcomes">
        <li class="outcome"><b>Auditable</b><span>Model documentation and approval points built in from the start.</span></li>
        <li class="outcome"><b>In-tenancy</b><span>Deployment in your own cloud, or on-premise where policy requires.</span></li>
        <li class="outcome"><b>Human</b><span>Lending decisions stay with your credit function and its governance.</span></li>
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
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Customer service</strong> — enquiries, statements and routine servicing across channels.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Document verification</strong> — KYC and onboarding paperwork checked and routed.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Loan processing</strong> — application preparation and completeness checks before review.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Collections</strong> — outreach, arrangement capture and escalation to your team.</span></li>
      </ul>
      <a class="cta-link" href="/contactus">See what a regulator-ready pilot looks like <span class="arw">→</span></a>
    </div>
  </section>
</Layout>
