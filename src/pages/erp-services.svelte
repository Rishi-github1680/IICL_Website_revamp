<script>
  // Ported from the official IICL site (iicl.in). Edit copy, images or reorder <section> blocks freely.
  import ServiceLayout from '../ServiceLayout.svelte';
  import { PAGE_ART } from '../menu.js';
</script>

<ServiceLayout
  autoFaq={false}
  kicker="Service"
  h1="ERP Consulting, Implementation and Integration"
  lede="ERP consulting, implementation, customisation, migration and support, connecting finance, HR, procurement, inventory and sales in one system."
  path="/erp-services"
  cta="Discuss a Defined Requirement"
  heroImage={PAGE_ART["erp-services"]}
  specs={[
    { k: "Services", v: "Consulting to rollout and support" },
    { k: "Modules", v: "Finance, HR, supply, sales" },
    { k: "Integration", v: "CRM, WhatsApp, apps, reporting" },
  ]}
  faqs={[
    { q: "How long does an ERP implementation take?", a: "It depends on the number of modules, how clean the data is and how much process change is involved. We give a timeline after an assessment rather than before, because an estimate made without seeing your data is a guess." },
    { q: "What happens to our existing data?", a: "It is mapped, cleaned and migrated in stages, with reconciliation at each stage so you can confirm nothing was lost. We run the old and new systems together until you are satisfied." },
    { q: "Will the business have to stop while we switch?", a: "No. Cutover is planned around your operations, usually module by module, with a rollback route at each step." },
    { q: "Do you work with our existing ERP?", a: "Yes. Much of our ERP work is integration and extension rather than replacement, connecting the ERP to your CRM, website, WhatsApp, mobile apps and reporting tools." },
    { q: "Who trains our team?", a: "We do, before go-live, with documentation written for the people doing the work rather than for the system administrator." },
  ]}
  bandKicker="Define the requirement"
  bandHeading="Bring us a defined ERP requirement and we will scope it against your systems, data and cutover constraints."
  ctaHref="/contactus?intent=enterprise-ai-use-case">
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>ERP Services</h2>
      <div class="section-body">
        <p class="para">We deliver next-generation ERP (Enterprise Resource Planning) solutions that help organizations unify their operations, optimize workflows, and make data-driven decisions in real-time. Whether you're looking to implement a new ERP system, modernize legacy platforms, or integrate intelligent automation into your existing stack, we’ve got you covered.</p>
        <p class="para">From finance to HR, supply chain to CRM, our ERP services are designed to break silos, increase visibility and improve business agility across every function.</p>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Our ERP Capabilities</h2>
      <div class="section-body">
        <ul class="list">
          <li>End-to-End ERP Implementation and Modernization</li>
          <li>ERP Integration and API Enablement</li>
          <li>AI and Analytics-Driven ERP Workflows</li>
          <li>Cloud ERP Deployment and DevOps</li>
          <li>Functional and technical consulting for SAP, Oracle, Microsoft Dynamics 365, Odoo, and custom-built ERP platforms</li>
          <li>Legacy ERP migration to cloud-native and modular microservices-based architectures</li>
          <li>Module-Based Rollout: Financials, Procurement, HRMS, CRM, Inventory, Sales, Compliance, and Manufacturing</li>
          <li>Seamless integration with CRM, SCM, HRMS, IoT, e-commerce, and BI tools</li>
          <li>API development for real-time data exchange between systems</li>
          <li>Middleware and ESB implementations using MuleSoft, Boomi, Apache Camel</li>
          <li>Predictive analytics for demand planning, risk mitigation, and cash flow forecasting</li>
          <li>AI-powered procurement and supply chain optimization</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Groundbreaking ERP Projects We’ve Delivered</h2>
      <div class="section-body">
        <p class="para">We deployed a real-time production monitoring system integrated with the ERP for a manufacturing client. IoT sensors push data from shop floor machines directly into the ERP, triggering alerts, inventory updates, and auto-generated maintenance tickets.</p>
        <p class="para">Implemented a voice-enabled ERP extension for a global finance team, allowing CFOs to query financial KPIs, generate budget variance reports, and forecast revenue using AI assistants embedded into the ERP UI.</p>
        <p class="para">Built an ERP solution for a retail chain that integrated inventory, POS, e-commerce, and last-mile delivery tracking — with real-time inventory sync across all sales channels and AI based stock replenishment alerts.</p>
        <p class="para">Deployed a custom ERP for a hospital network integrating HRMS, billing, diagnostics, pharmacy, and patient scheduling — with WhatsApp appointment automation, e-prescriptions, and lab integrations.</p>
        <p class="para">Delivered an ERP platform for a university covering admissions, timetable generation, LMS integration, fee collection, HR/payroll, and AI based student dropout prediction.</p>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Let’s Future-Proof Your Enterprise Backbone</h2>
      <div class="section-body">
        <p class="para">From core ERP implementation to intelligent extensions powered by AI and automation — we help you build an agile, connected, and intelligent enterprise. Whether you're starting fresh or looking to modernize, we’ll design a solution tailored to your scale, industry, and vision.</p>
      </div>
    </div>
  </section>






  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>ERP Consulting, Implementation and Integration</h2>
      <div class="section-body">
        <p class="para">Tell us the process you want to improve and we will tell you honestly whether this is the right service for it.</p>
        <ul class="list">
          <li>AI and GenAI services</li>
          <li>Supply chain planning</li>
          <li>Finance automation</li>
          <li>Manufacturing operations</li>
        </ul>
      </div>
    </div>
  </section>


  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>How an ERP rollout runs</h2>
      <div class="section-body">
        <p class="para">Seven stages, in this order. You always know which one you are in and what has to be signed off before the next begins.</p>
      </div>
      <ol class="flow">
        <li class="flow-step">
          <b>01</b>
          <strong>Assessment</strong>
          <span>What you run today, what it costs, and where the process actually breaks.</span>
        </li>
        <li class="flow-step">
          <b>02</b>
          <strong>Process mapping</strong>
          <span>How the work flows now, including the workarounds people have built.</span>
        </li>
        <li class="flow-step">
          <b>03</b>
          <strong>Configuration</strong>
          <span>The system set up against your chart of accounts, roles and approvals.</span>
        </li>
        <li class="flow-step">
          <b>04</b>
          <strong>Data migration</strong>
          <span>Extract, clean and load, with reconciliation you can check line by line.</span>
        </li>
        <li class="flow-step">
          <b>05</b>
          <strong>Testing</strong>
          <span>Run on your data with real cases and the failure cases written down.</span>
        </li>
        <li class="flow-step">
          <b>06</b>
          <strong>Training</strong>
          <span>The people who use it daily, trained before go-live, not after.</span>
        </li>
        <li class="flow-step">
          <b>07</b>
          <strong>Support</strong>
          <span>A hypercare period, then a defined support runway.</span>
        </li>
      </ol>
    </div>
  </section>

  <section class="page-section faq-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Common questions</h2>
      <div class="faq-list">
        <details class="faq-item" name="faq">
          <summary class="faq-q">How long does an ERP implementation take?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">It depends on the number of modules, how clean the data is and how much process change is involved. We give a timeline after an assessment rather than before, because an estimate made without seeing your data is a guess.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">What happens to our existing data?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">It is mapped, cleaned and migrated in stages, with reconciliation at each stage so you can confirm nothing was lost. We run the old and new systems together until you are satisfied.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">Will the business have to stop while we switch?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">No. Cutover is planned around your operations, usually module by module, with a rollback route at each step.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">Do you work with our existing ERP?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">Yes. Much of our ERP work is integration and extension rather than replacement, connecting the ERP to your CRM, website, WhatsApp, mobile apps and reporting tools.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">Who trains our team?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">We do, before go-live, with documentation written for the people doing the work rather than for the system administrator.</p></div>
        </details>
      </div>
    </div>
  </section>
</ServiceLayout>
