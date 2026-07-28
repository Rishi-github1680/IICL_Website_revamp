<script>
  import ProductLayout from '../ProductLayout.svelte';
</script>

<ProductLayout
  h1="Attendance and Workforce Management That Cannot Be Gamed"
  lede="Face-recognition attendance with shift, leave and overtime handling, and workforce data your payroll can rely on."
  heroBanner="/img/banners/A7-banner-performedge.png"
  heroModel="/gyro-globe.html?transparent=1&ui=0"
  path="/performedge"
  cta="Book a PerformEdge Demo"
  specs={[
    { k: 'Attendance via', v: 'Facial recognition' },
    { k: 'Covers', v: 'Shifts, leave and overtime' },
    { k: 'Outputs', v: 'Reports and payroll feeds' },
    { k: 'Deploys', v: 'On-site or cloud' },
  ]}
  faqs={[
    { q: "How does the attendance capture work?", a: "Staff are recognised from their face at the point of entry, so attendance is recorded without cards, registers or proxy punching. Each record is timestamped and auditable." },
    { q: "What consent do we need from employees?", a: "Face data is biometric personal data. You need informed consent, a stated retention period and a process for handling refusals and deletion requests. We provide the technical controls; the consent process is yours to run, and we recommend confirming it with your legal adviser." },
    { q: "Where is the face data stored?", a: "According to your deployment choice, including on-premise options. Retention periods and deletion are configured to your policy rather than fixed by us." },
    { q: "How accurate is recognition?", a: "It depends on camera quality, lighting, positioning and network conditions, which is why we test on site before rollout rather than quoting a figure. The pilot tells you what to expect in your environment." },
    { q: "Does it connect to payroll?", a: "Yes, through API or export, so shift, leave and overtime data reaches payroll without re-keying." },
  ]}
>
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What PerformEdge does</h2>
      <p class="statement">Attendance that cannot be gamed — <em>and workforce data your payroll can rely on.</em></p>
      <div class="section-body">
        <p class="para">Cards get shared and registers get filled in afterwards. Staff are recognised at the entry point instead, so each record is timestamped, attributable and auditable.</p>
        <p class="para">Around that sits the rest of the picture: shifts, leave, overtime and the reports your managers actually act on.</p>
      </div>
      <a class="cta-link" href="/contactus">See it modelled on your sites <span class="arw">→</span></a>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What changes</h2>
      <div class="section-body">
        <p class="para">Attendance stops being a number people argue about at the end of the month.</p>
      </div>
      <ul class="outcomes">
        <li class="outcome"><b>No proxy</b><span>Punching — presence is tied to the person, not to a card.</span></li>
        <li class="outcome"><b>Live</b><span>Visibility of who is present, late or absent, as it happens.</span></li>
        <li class="outcome"><b>Clean</b><span>Shift, leave and overtime data reaching payroll without re-keying.</span></li>
      </ul>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap section-split rev">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>Biometric data, handled properly</h2>
        <p class="statement">Face data is personal data. <em>We treat it that way.</em></p>
        <p class="para">Deployment can be on-premise, and retention and deletion follow your policy rather than ours. You will need informed employee consent and a process for refusals — we provide the technical controls and will walk your legal adviser through them.</p>
        <p class="para">Accuracy depends on cameras, lighting and placement, so we pilot on your site rather than quote a figure.</p>
        <a class="cta-link" href="/contactus">Discuss a site pilot <span class="arw">→</span></a>
      </div>
      <div class="split-media">
        <figure class="dark-figure"><img src="/img/banners/A7-banner-performedge.png" alt="PerformEdge attendance capture at a site entry point" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Where it fits</h2>
      <div class="section-body">
        <p class="para">Strongest where headcount is high and entry points are many.</p>
      </div>
      <ul class="feature-grid">
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Manufacturing</strong> — shift-based workforces across multiple gates, with staffing kept to plan.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Corporate campuses</strong> — hybrid and flexible working tracked without swipe queues.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Education</strong> — student and faculty attendance, with records fit for audit.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Large enterprises</strong> — multi-site reporting on one consistent basis.</span></li>
      </ul>
      <a class="cta-link" href="/contactus">Explore the full capability set <span class="arw">→</span></a>
    </div>
  </section>
</ProductLayout>
