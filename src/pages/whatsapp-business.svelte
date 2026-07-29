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
      <h2 class="section-h"><span class="tick"></span>WhatsApp Business API</h2>
      <div class="section-body">
        <p class="para">Unlock the full potential of the world’s most popular messaging app WhatsApp with our enterprise-grade WhatsApp Business API services. We help brands deliver personalized, secure, and automated conversations across the customer journey using smart chatbots, transaction workflows, and real-time integrations.</p>
        <p class="para">From sales to support, our solutions turn WhatsApp into a powerful engine for lead generation, customer service, order fulfillment, notifications, and AI-assisted interactions, all with enterprise-level governance and automation.</p>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What We Offer</h2>
      <div class="section-body">
        <ul class="list">
          <li>Official WhatsApp Business API Enablement</li>
          <li>Smart Chatbots and AI Agents</li>
          <li>Conversational Commerce Flows</li>
          <li>System and CRM Integrations</li>
          <li>Automation, Campaigns and Analytics</li>
          <li>Business profile verification, template approval, and configuration setup</li>
          <li>Hosted and cloud API deployments (Meta Cloud API or BSP-hosted)</li>
          <li>Green tick verification and WhatsApp Commerce Catalog setup</li>
          <li>GPT-powered conversational agents for support, lead gen, and retention</li>
          <li>Contextual Q&amp;A, multilingual support, and dynamic handover to human agents</li>
          <li>Integration with your product or knowledge base using RAG + LLMs</li>
          <li>Lead scoring, appointment booking, and sentiment-aware messaging</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Latest Use Cases and Groundbreaking Work</h2>
      <div class="section-body">
        <p class="para">We’ve deployed GPT-4- and Claude-based WhatsApp bots that understand complex queries, retrieve contextual answers from PDFs or knowledge bases using RAG, and provide 24/7 support without generating hallucinations.</p>
        <p class="para">Built a WhatsApp-only shopping experience for hyperlocal D2C brands, from product discovery to payment and real-time delivery tracking, using interactive message templates and WhatsApp Catalogs.</p>
        <p class="para">Integrated AI-driven bots for microfinance and neobanking apps, enabling balance checks, loan EMI reminders, eKYC collection, and fraud alerts securely over WhatsApp using end-to-end encryption.</p>
        <p class="para">Deployed multilingual bots for appointment booking, report sharing, post-op care, and medicine reminders, integrated with HIS and secure document storage systems, workflows designed around the customer’s own regulatory obligations, which are confirmed per deployment.</p>
        <p class="para">Created auto-schedulers and drip campaigns for student onboarding, class reminders, exam prep tips, and fee collection for universities and edtech platforms, with counsellor workload reductions of around 60% commonly reported.</p>
      </div>
    </div>
  </section>


  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Ready to Engage Customers Where They Are?</h2>
      <div class="section-body">
        <p class="para">Let’s turn your WhatsApp inbox into a revenue engine and service powerhouse. Get your solution live fast, and at scale. We build everything from smart support bots and AI-powered commerce assistants to enterprise automation systems.</p>
      </div>
    </div>
  </section>






  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>WhatsApp Business API Integration and Automation</h2>
      <div class="section-body">
        <p class="para">Tell us the process you want to improve and we will tell you honestly whether this is the right service for it.</p>
        <ul class="list">
          <li>iWac.ai platform</li>
          <li>Contact centre automation</li>
          <li>AI and GenAI services</li>
          <li>Healthcare use cases</li>
        </ul>
      </div>
    </div>
  </section>


  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What the customer journey looks like</h2>
      <div class="section-body">
        <p class="para">One conversation, start to finish, without the customer leaving WhatsApp or repeating themselves.</p>
      </div>
      <ol class="flow">
        <li class="flow-step">
          <b>01</b>
          <strong>Arrival</strong>
          <span>From an ad, your website, a QR code or a saved number.</span>
        </li>
        <li class="flow-step">
          <b>02</b>
          <strong>Qualification</strong>
          <span>The agent establishes what they want and captures it into your CRM.</span>
        </li>
        <li class="flow-step">
          <b>03</b>
          <strong>Order</strong>
          <span>Catalogue, selection and confirmation inside the thread.</span>
        </li>
        <li class="flow-step">
          <b>04</b>
          <strong>Payment</strong>
          <span>A payment link from your existing gateway, with the receipt returned in-chat.</span>
        </li>
        <li class="flow-step">
          <b>05</b>
          <strong>Updates</strong>
          <span>Dispatch and delivery notifications on approved templates.</span>
        </li>
        <li class="flow-step">
          <b>06</b>
          <strong>Support</strong>
          <span>Follow-up questions handled, with handover to a person when it matters.</span>
        </li>
      </ol>
    </div>
  </section>

  <section class="page-section faq-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Common questions</h2>
      <div class="faq-list">
        <details class="faq-item" name="faq">
          <summary class="faq-q">How is this different from WhatsApp Business the app?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">The app suits one person answering messages by hand. The Business API connects WhatsApp to your website, CRM, ERP and payment gateway so enquiries, orders and updates flow automatically and more than one person can work the same inbox.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">Do we need Meta approval?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">Yes. Message templates for anything you initiate need Meta approval, and your business needs verification. We prepare and submit both as part of onboarding.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">Can we keep our existing number?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">Usually. A number currently on the WhatsApp Business app can be migrated, though it cannot be used in both places at once. We check this before any migration.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">What are the rules on messaging customers?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">You need consent before initiating a conversation, and initiated messages must use approved templates. Replies inside an open customer-service window are freer. We build the opt-in handling into the flow.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">How does this relate to iWac?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">The API integration is the service; iWac is our packaged platform built on it. If your requirement fits iWac, deploying it is faster and cheaper than a custom integration.</p></div>
        </details>
      </div>
    </div>
  </section>
</ServiceLayout>
