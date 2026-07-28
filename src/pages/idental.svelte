<script>
  import ProductLayout from '../ProductLayout.svelte';
</script>

<ProductLayout
  h1="Manage Your Dental Clinic From Appointments to Patient Follow-Up"
  lede="Appointments, records, treatment plans, billing and WhatsApp reminders — one system for a single practice or a chain."
  heroBanner="/img/banners/A6-banner-idental.png"
  heroModel="/brain.html?transparent=1&ui=0"
  path="/idental"
  cta="Book an iDental Demo"
  specs={[
    { k: 'Built for', v: 'Dental clinics and chains' },
    { k: 'Covers', v: 'Appointments, records, billing' },
    { k: 'Reminders', v: 'WhatsApp and SMS' },
    { k: 'Scales to', v: 'Single practice or group' },
  ]}
  faqs={[
    { q: "Who is it built for?", a: "Individual dentists, multi-chair clinics and dental chains. The same system covers a single practice and a group with several locations." },
    { q: "What does it cover day to day?", a: "Appointments, patient records, treatment plans, billing, reminders and reporting, in one place rather than across a diary, a spreadsheet and a billing tool." },
    { q: "How does patient communication work?", a: "Confirmations, reminders and follow-ups go out over WhatsApp, which is where most patients will actually read them." },
    { q: "How is patient data protected?", a: "Role-based access, encryption in transit and at rest, audit logs and backups. Controls are designed to support your obligations under HIPAA and GDPR; we will walk your compliance lead through them before you commit." },
    { q: "Can we move our existing patient records in?", a: "Yes. Migration is scoped after we see the format your records are in, and run in stages so you can verify each batch." },
  ]}
>
  <section class="page-section">
    <div class="wrap section-split">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>What iDental does</h2>
        <p class="statement">One system for the whole practice — <em>from the first enquiry to the follow-up appointment.</em></p>
        <p class="para">Most clinics run on a diary, a spreadsheet and a billing tool that never quite agree. iDental replaces that with one record per patient covering history, treatment plan, billing and every message sent.</p>
        <p class="para">It is configured around how your clinic already books, treats and invoices — not the other way around.</p>
        <a class="cta-link" href="/contactus">See it set up for your clinic <span class="arw">→</span></a>
      </div>
      <div class="split-media">
        <figure><img src="/img/products/idental-1.png" alt="iDental.ai patient record and scheduling view" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What changes</h2>
      <div class="section-body">
        <p class="para">The gains are operational rather than theoretical — fewer empty chairs, less admin, cleaner billing.</p>
      </div>
      <ul class="outcomes">
        <li class="outcome"><b>Fewer</b><span>No-shows, because reminders reach patients on WhatsApp rather than voicemail.</span></li>
        <li class="outcome"><b>One</b><span>Record per patient — history, imaging, plan and invoices in the same place.</span></li>
        <li class="outcome"><b>Less</b><span>Admin per appointment, so clinical time goes to patients instead of paperwork.</span></li>
      </ul>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap section-split rev">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>Running a group, not just a clinic</h2>
        <p class="statement">Consistent across every branch. <em>Visible from one dashboard.</em></p>
        <p class="para">Multi-location practices lose control when each branch keeps its own system. iDental holds one patient view and one set of reports across all of them, so performance is comparable and patients get the same experience wherever they book.</p>
        <a class="cta-link" href="/contactus">Talk to us about a multi-branch rollout <span class="arw">→</span></a>
      </div>
      <div class="split-media">
        <figure><img src="/img/products/idental-2.png" alt="iDental.ai practice reporting across locations" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Where it fits</h2>
      <div class="section-body">
        <p class="para">The short version — what it means for your practice depends on how you run today.</p>
      </div>
      <ul class="feature-grid">
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Solo and small practices</strong> — the dentist stops being the administrator too.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Multi-branch groups</strong> — one patient view and comparable reporting across sites.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Patient engagement</strong> — booking, reminders and follow-ups on the channel patients actually open.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Tele-dentistry</strong> — remote consults, case sharing and virtual prescriptions.</span></li>
      </ul>
      <a class="cta-link" href="/contactus">Explore the full capability set <span class="arw">→</span></a>
    </div>
  </section>
</ProductLayout>
