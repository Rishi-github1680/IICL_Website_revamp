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
      <h2 class="section-h"><span class="tick"></span>What this service covers</h2>
      <div class="section-body">
        <p class="para">ERP work is rarely a clean installation. Most of it is reconciling how the business actually runs against how the system expects it to run, and deciding which of the two changes.</p>
        <p class="para">We work in three shapes: implementing a new platform, extending one you already run, or integrating an existing ERP with the systems around it. The third is the most common, and the cheapest place to start when the ERP itself is not the problem.</p>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Platform scope</h2>
      <dl class="sysgrid">
        <div class="sysrow"><dt>Platforms</dt><dd>SAP, Oracle, Microsoft Dynamics 365, Odoo and custom-built ERP platforms</dd></div>
        <div class="sysrow"><dt>Modules</dt><dd>Finance, HR, procurement, inventory, manufacturing and sales</dd></div>
        <div class="sysrow"><dt>Integration</dt><dd>CRM, e-commerce, banking interfaces, WhatsApp, mobile applications and reporting</dd></div>
        <div class="sysrow"><dt>Deployment</dt><dd>Cloud, on-premise or hybrid, following your data residency requirements</dd></div>
        <div class="sysrow"><dt>Not in scope</dt><dd>Statutory accounting sign-off, tax advice and any decision reserved to your finance function</dd></div>
      </dl>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>How a rollout runs</h2>
      <ol class="stagelist">
        <li><strong>Discovery and fit assessment</strong><span>Current processes, data quality, integration surface and the gap between the platform and how you work. Output: a scoped requirement and the decisions that need making.</span></li>
        <li><strong>Data migration design</strong><span>Mapping, cleansing rules, reconciliation method and what will not be migrated. Data quality is assessed before a timeline is given, not after.</span></li>
        <li><strong>Configuration and build</strong><span>Module configuration, extensions and integrations, against a signed-off design.</span></li>
        <li><strong>Testing</strong><span>Unit, integration, and user acceptance testing owned by your process owners — not by us, because they are the people who will know if it is wrong.</span></li>
        <li><strong>Cutover</strong><span>Planned around your operating calendar, usually module by module, with a documented rollback route at each step.</span></li>
        <li><strong>Hypercare</strong><span>A defined post-go-live period with agreed response times, then a planned handover to support.</span></li>
      </ol>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Who owns what</h2>
      <dl class="sysgrid">
        <div class="sysrow"><dt>IICL owns</dt><dd>Solution design, configuration, build, migration execution, test support and cutover coordination within the agreed scope</dd></div>
        <div class="sysrow"><dt>You own</dt><dd>Process decisions, master data ownership, user acceptance sign-off, the go-live decision and business readiness</dd></div>
        <div class="sysrow"><dt>Shared</dt><dd>Risk register, change control and the cutover plan</dd></div>
        <div class="sysrow"><dt>Escalation</dt><dd>A named owner on each side, with the decision path agreed before build starts</dd></div>
      </dl>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Representative solution patterns</h2>
      <div class="section-body">
        <p class="para measures-note"><strong>Representative patterns, not customer case studies.</strong> These describe shapes of work we deliver. We publish named projects only with the customer&rsquo;s approval, the scope, the baseline, the measurement period and the method &mdash; none of which exists for these yet.</p>
      </div>      <div class="section-body">
        <ul class="list">
          <li>A finance and inventory rollout on a single platform, replacing spreadsheet reconciliation between two systems of record</li>
          <li>An integration layer connecting an existing ERP to a CRM and an e-commerce front end, so orders stop being rekeyed</li>
          <li>A legacy ERP migrated to a cloud deployment, module by module, with both systems running in parallel until reconciliation was clean</li>
          <li>Reporting consolidated onto one warehouse so finance and operations stopped producing different numbers for the same month</li>
        </ul>
      </div>
    </div>
  </section>

</ServiceLayout>
