<script>
  // Ported from the official IICL site (iicl.in). Edit copy, images or reorder <section> blocks freely.
  import ServiceLayout from '../ServiceLayout.svelte';
  import { PAGE_ART } from '../menu.js';
</script>

<ServiceLayout
  autoFaq={false}
  kicker="Service"
  h1="WhatsApp Business API Integration for Sales and Customer Service"
  lede="Connect WhatsApp to your website, CRM, ERP and payment gateway to generate leads, take orders, send updates and automate customer support."
  path="/whatsapp-business"
  cta="Discuss a Defined Requirement"
  heroImage={PAGE_ART["whatsapp-business"]}
  specs={[
    { k: "Official", v: "Meta WhatsApp Business API" },
    { k: "Handles", v: "Leads, orders, payments, support" },
    { k: "Integrates", v: "Website, CRM, ERP, payments" },
  ]}
  faqs={[
    { q: "How is this different from WhatsApp Business the app?", a: "The app suits one person answering messages by hand. The Business API connects WhatsApp to your website, CRM, ERP and payment gateway so enquiries, orders and updates flow automatically and more than one person can work the same inbox." },
    { q: "Do we need Meta approval?", a: "Yes. Message templates for anything you initiate need Meta approval, and your business needs verification. We prepare and submit both as part of onboarding." },
    { q: "Can we keep our existing number?", a: "Usually. A number currently on the WhatsApp Business app can be migrated, though it cannot be used in both places at once. We check this before any migration." },
    { q: "What are the rules on messaging customers?", a: "You need consent before initiating a conversation, and initiated messages must use approved templates. Replies inside an open customer-service window are freer. We build the opt-in handling into the flow." },
    { q: "How does this relate to iWac?", a: "The API integration is the service; iWac is our packaged platform built on it. If your requirement fits iWac, deploying it is faster and cheaper than a custom integration." },
  ]}
  bandKicker="Define the requirement"
  bandHeading="Bring us your WhatsApp use case and we will set out onboarding, templates, consent and integration responsibilities."
  ctaHref="/contactus?intent=enterprise-ai-use-case">

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What this service covers</h2>
      <div class="section-body">
        <p class="para">Connecting the WhatsApp Business Platform to the systems you already run, so enquiries, orders, updates and support happen in the channel your customers use — under Meta&rsquo;s rules rather than around them.</p>
        <p class="para">Most of the work is not the chat interface. It is opt-in handling, template approval, session-window management, payment handoff and the integration back into your CRM or ERP.</p>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Meta platform responsibilities</h2>
      <div class="section-body">
        <p class="para measures-note"><strong>Meta owns the platform decisions, not IICL.</strong> Business verification, display-name approval, template approval, messaging limits and the green tick are all Meta&rsquo;s to grant. We prepare and submit the application and manage the process; we cannot guarantee an outcome, and you should treat any supplier who does with caution.</p>
      </div>      <dl class="sysgrid">
        <div class="sysrow"><dt>We handle</dt><dd>Business Solution Provider onboarding, number provisioning or migration, template drafting and submission, and the technical integration</dd></div>
        <div class="sysrow"><dt>Meta decides</dt><dd>Business verification, display name, template approval, quality rating, messaging tier and the verified badge</dd></div>
        <div class="sysrow"><dt>You provide</dt><dd>Business verification documents, the approved sender identity and sign-off on message content</dd></div>
        <div class="sysrow"><dt>Opt-in</dt><dd>Consent must be captured before the first message. We design the capture point; the lawful basis remains yours</dd></div>
        <div class="sysrow"><dt>Session window</dt><dd>Free-form replies are limited to the 24-hour service window; outside it only approved templates may be sent</dd></div>
        <div class="sysrow"><dt>Payments</dt><dd>Handled by your payment provider through a payment link or native flow. IICL does not hold card data</dd></div>
      </dl>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What the customer journey looks like</h2>
      <ol class="stagelist">
        <li><strong>Entry</strong><span>A click-to-WhatsApp ad, a website widget, a QR code or an existing conversation. Consent is captured at this point.</span></li>
        <li><strong>Qualification</strong><span>The assistant establishes what the customer wants, grounded in your catalogue or knowledge base rather than generating an answer from nothing.</span></li>
        <li><strong>Action</strong><span>Order placement, booking, status check or document collection, written back to your system of record.</span></li>
        <li><strong>Payment</strong><span>A payment link or native flow issued by your provider, with the confirmation reflected in the conversation.</span></li>
        <li><strong>Handover</strong><span>Anything outside the defined scope routes to a person, with the full conversation attached.</span></li>
        <li><strong>Follow-up</strong><span>Approved templates only, within messaging limits and honouring opt-out.</span></li>
      </ol>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Integration surface</h2>
      <div class="section-body">
        <ul class="list">
          <li>CRM and help desk, so a WhatsApp conversation is the same record as any other channel</li>
          <li>ERP or order management, for stock, pricing and order status</li>
          <li>Payment provider, for links and reconciliation</li>
          <li>Catalogue or knowledge base, as the grounding source for answers</li>
          <li>Analytics, with message content excluded from the event payload</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Representative solution patterns</h2>
      <div class="section-body">
        <p class="para measures-note"><strong>Representative patterns, not customer case studies.</strong> We publish named deployments only with the customer&rsquo;s approval, the baseline, the measurement period and the calculation method.</p>
      </div>      <div class="section-body">
        <ul class="list">
          <li>Inbound enquiries qualified in-thread and written to the CRM, with handover to sales when the customer is ready</li>
          <li>Order status and delivery updates sent as approved templates, replacing a queue of "where is my order" calls</li>
          <li>Appointment booking and reminders, with rescheduling handled in the same conversation</li>
          <li>Document collection for onboarding, with validation before the file reaches a person</li>
        </ul>
      </div>
    </div>
  </section>

</ServiceLayout>
