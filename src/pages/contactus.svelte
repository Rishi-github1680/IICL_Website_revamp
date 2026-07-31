<script>
  // Contact IICL — the Dynamic Contact Experience (handoff PDF).
  //
  // This page used to render one fixed form plus a hand-rolled ?intent= lookup. It now
  // mounts the shared, configuration-driven engine in src/contact/: the URL carries
  // routing context (intent, product, source, cta, utm — all allowlisted), the engine
  // renders that intent's contact + requirement schema across three steps, and the
  // server resolves the owner queue. Adding a path is a config change in
  // contact-schema.js, not another page-specific form.
  //
  // The old /api/contact endpoint and src/intents.js are no longer used by this page;
  // submissions go to /api/contact/enquiries, which re-validates everything server-side.
  import Layout from '../Layout.svelte';
  import { PAGE_ART } from '../menu.js';
  import { COMPANY } from '../seo.js';
  import DynamicContact from '../contact/DynamicContact.svelte';
</script>

<Layout
  kicker="Company"
  h1="One front door. Many precise paths."
  lede="Tell us what you are trying to change. We recognise where you arrived from, ask only the questions relevant to that journey, and route the enquiry to the right IICL team."
  heroImage={PAGE_ART["contactus"]}
  path="/contactus"
  cta="Send an enquiry"
  ctaHref="#enquiry"
  bandKicker="Send an enquiry"
  bandHeading="Describe the work, not the technology. The more concrete the process, the more useful our first reply.">

  <section id="enquiry" class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Send an enquiry</h2>
      <div class="section-body">
        <p class="para">
          Fields marked * are required. We reply within one working day unless you ask us
          to call. If the path shown is not the right one, you can change it at any point
          without re-entering your details.
        </p>
      </div>
      <DynamicContact />
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Our offices</h2>
      <div class="offices">
        <div class="office">
          <h3>India — Hyderabad</h3>
          <p class="para">{COMPANY.india.street}, {COMPANY.india.city} {COMPANY.india.postalCode}.</p>
          <p class="para">
            <a href="tel:+919989442002">{COMPANY.phone}</a><br />
            <a href="mailto:{COMPANY.email}">{COMPANY.email}</a><br />
            Monday to Friday, 9:30am – 6:30pm IST
          </p>
        </div>
        <div class="office">
          <h3>United States</h3>
          <p class="para">{COMPANY.usa.street}, {COMPANY.usa.city}, {COMPANY.usa.region} {COMPANY.usa.postalCode}.</p>
          <p class="para">
            <a href="mailto:{COMPANY.email}">{COMPANY.email}</a><br />
            Monday to Friday, 9:00am – 5:00pm ET
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Worth reading first</h2>
      <ul class="pathlist">
        <li>
          <a href="/ai-genai-services">Enterprise AI &amp; GenAI</a>
          <span>Consulting and implementation, use case to production</span>
        </li>
        <li>
          <a href="/agentic-ai">Agentic AI</a>
          <span>Bounded workflows, controlled tools and a defined authority boundary</span>
        </li>
        <li>
          <a href="/gcc-technology-teams">GCC Technology Teams</a>
          <span>Building specialised technology capability in India</span>
        </li>
      </ul>
    </div>
  </section>
</Layout>

<style>
  .offices { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
  .office h3 { margin: 0 0 12px; font-size: 19px; font-weight: 600; color: #16171a; }
  .office a { color: #b81c1c; text-decoration: none; }
  .office a:hover { text-decoration: underline; }
  /* Each office lists its phone and email on their own <br>-separated lines, so these
     are standalone targets rather than links inside a sentence — and on a phone they
     are the two most likely things anyone taps on this page. Line-height alone gave
     them ~20px. */
  @media (max-width: 900px) {
    .office a { display: inline-flex; align-items: center; min-height: 44px; }
  }
  @media (max-width: 760px) {
    .offices { grid-template-columns: 1fr; gap: 26px; }
  }
</style>
