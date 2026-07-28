<script>
  // Ported from the official IICL site (iicl.in). Edit copy, images or reorder <section> blocks freely.
  import Layout from '../Layout.svelte';
  import { PAGE_ART } from '../menu.js';
</script>

<Layout
  kicker="Industry"
  h1="AI Automation for Human Resources"
  lede="AI automation across the employee lifecycle, covering recruitment, onboarding, attendance, engagement and exit, with fairness testing and human approval."
  heroImage={PAGE_ART["hr"]}
  path="/hr"
  schemaType="Service"
  cta="Discuss Your HR Automation Requirement"
  faqs={[
    { q: "Does the system reject candidates?", a: "No. It matches and prioritises so your recruiters read the most relevant applications first. A person makes every decision about a candidate." },
    { q: "How do you handle bias?", a: "By testing outcomes across groups, documenting what the matching considers, and keeping a human decision point. We would rather explain the limits than claim the problem is solved." },
    { q: "What employee data does it touch?", a: "Only what the workflow needs, from your HRMS, ATS, payroll or attendance systems. Scope is agreed before integration." },
    { q: "Do employees have to consent?", a: "For biometric attendance, yes, and you need a retention period and a route for refusals. Your legal adviser should confirm what applies in your jurisdiction." },
    { q: "Which HR process is the best first candidate?", a: "Whichever is high volume and rule-based: screening, onboarding paperwork or attendance. Engagement and performance work is better attempted once those are running." },
  ]}
  autoFaq
>
  <section class="page-section">
    <div class="wrap section-split">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>Where AI actually helps</h2>
        <p class="statement">Screening and paperwork automated. <em>Decisions about people are not.</em></p>
        <p class="para">The HR work worth automating is high volume and rule-based: screening, onboarding paperwork, attendance, routine policy questions.</p>
        <p class="para">Matching and prioritising is where AI helps. Rejecting a candidate is not — a person makes every decision about a person.</p>
        <a class="cta-link" href="/contactus">Discuss your HR automation <span class="arw">→</span></a>
      </div>
      <div class="split-media">
        <figure><img src="/img/hr.png" alt="Workplace overlaid with people and performance data" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What changes</h2>
      <div class="section-body">
        <p class="para">We would rather explain the limits than claim the bias problem is solved.</p>
      </div>
      <ul class="outcomes">
        <li class="outcome"><b>Prioritised</b><span>Recruiters read the most relevant applications first.</span></li>
        <li class="outcome"><b>Tested</b><span>Outcomes checked across groups, with the limits documented.</span></li>
        <li class="outcome"><b>Human</b><span>Every decision about a candidate is made by a person.</span></li>
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
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Recruitment</strong> — CV matching, prioritisation and interview scheduling.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Onboarding</strong> — paperwork, access requests and first-week guidance.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Employee services</strong> — policy, leave and payroll questions answered instantly.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Attendance</strong> — shift, leave and overtime tracked through to payroll.</span></li>
      </ul>
      <a class="cta-link" href="/contactus">See which process to start with <span class="arw">→</span></a>
    </div>
  </section>
</Layout>
