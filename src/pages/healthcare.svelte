<script>
  // Ported from the official IICL site (iicl.in). Edit copy, images or reorder <section> blocks freely.
  import Layout from '../Layout.svelte';
  import { PAGE_ART } from '../menu.js';
</script>

<Layout
  kicker="Industry"
  h1="AI and Digital Automation for Healthcare"
  lede="AI and automation for hospitals, clinics and diagnostic centres: appointment booking, call automation, reminders and patient support, with human review."
  heroImage={PAGE_ART["healthcare"]}
  path="/healthcare"
  schemaType="Service"
  cta="Discuss Your Healthcare Workflow"
  faqs={[
    { q: "Does AI make clinical decisions?", a: "No. These systems handle administrative and communication work: booking, reminders, enquiries and documentation. Clinical judgement stays with clinicians, and anything clinical in nature is escalated to a person." },
    { q: "How is patient data protected?", a: "IICL is ISO 27001 certified and SOC 2 audited. Access is role-based, activity is logged, and retention follows your policy. Your compliance lead should review the controls against your HIPAA and GDPR obligations before go-live." },
    { q: "Will it work with our hospital systems?", a: "We integrate through HIS, EMR and EHR interfaces including FHIR and HL7, plus payment and communication systems." },
    { q: "What happens when a patient asks something sensitive?", a: "It hands over to your staff with the conversation context attached. Which topics always escalate is configured with your clinical team, not by us." },
    { q: "Where do most providers start?", a: "Missed appointments and unanswered calls. Both are measurable before and after, which makes the result easy to judge." },
  ]}
  autoFaq
>
  <section class="page-section">
    <div class="wrap section-split">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>Where AI actually helps</h2>
        <p class="statement">Fewer missed calls and fewer empty slots — <em>with clinicians still making every clinical call.</em></p>
        <p class="para">The pressure in most hospitals and clinics is administrative before it is clinical: calls nobody can answer, appointments nobody confirms, follow-ups nobody has time to chase.</p>
        <p class="para">AI takes that layer. Booking, reminders, enquiries and documentation run automatically, and anything clinical escalates to your staff with the context attached.</p>
        <a class="cta-link" href="/contactus">Discuss your patient workflow <span class="arw">→</span></a>
      </div>
      <div class="split-media">
        <figure><img src="/img/healthcare.jpg" alt="Clinical team reviewing patient information on a connected display" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What changes</h2>
      <div class="section-body">
        <p class="para">The two most providers start with are measurable before and after, which makes the result easy to judge.</p>
      </div>
      <ul class="outcomes">
        <li class="outcome"><b>Answered</b><span>Every inbound call, including evenings and peak clinic hours.</span></li>
        <li class="outcome"><b>Fewer</b><span>No-shows, because reminders reach patients where they read them.</span></li>
        <li class="outcome"><b>Escalated</b><span>Anything clinical goes to your staff, never decided by a system.</span></li>
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
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Patient access</strong> — booking, rescheduling and reminders across phone and WhatsApp.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Front desk</strong> — enquiry handling, insurance and billing questions, document collection.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Diagnostics</strong> — report delivery, follow-up scheduling and recall campaigns.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Back office</strong> — coding support, claims preparation and records documentation.</span></li>
      </ul>
      <a class="cta-link" href="/contactus">See where it fits your organisation <span class="arw">→</span></a>
    </div>
  </section>
</Layout>
