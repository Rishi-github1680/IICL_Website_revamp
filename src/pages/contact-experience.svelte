<script>
  // Dynamic Contact Experience page — mounts the config-driven engine (src/contact/).
  // Kept on its own noindex route so the live /contactus keeps working until this is
  // promoted. Arrives with ?intent=&product=&source=&cta=&utm_* — all allowlisted by
  // the engine; unknown values fall back to the general path.
  import Layout from '../Layout.svelte';
  import { PAGE_ART } from '../menu.js';
  import DynamicContact from '../contact/DynamicContact.svelte';
</script>

<Layout
  kicker="Company"
  h1="Tell us what you need"
  lede="One front door, many precise paths. We recognise where you came from, ask only the relevant questions, and route your enquiry to the right IICL team."
  heroImage={PAGE_ART['contactus']}
  path="/contact-experience"
  bandKicker="One front door"
  bandHeading="Answer a few relevant questions and we route it to the right team.">
  <section class="page-section">
    <div class="wrap">
      <DynamicContact />
    </div>
  </section>
</Layout>
