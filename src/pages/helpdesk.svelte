<script>
  // Ported from the official IICL site (iicl.in). Edit copy, images or reorder <section> blocks freely.
  import ServiceLayout from '../ServiceLayout.svelte';
  import { PAGE_ART } from '../menu.js';
</script>

<ServiceLayout
  autoFaq={false}
  kicker="Service"
  h1="Managed IT Help Desk Services"
  lede="Managed IT help desk covering user support, application support, incident management and access requests across phone, email, chat and WhatsApp."
  path="/helpdesk"
  cta="Discuss a Defined Requirement"
  heroImage={PAGE_ART["helpdesk"]}
  specs={[
    { k: "Coverage", v: "User, application, incident, access" },
    { k: "Channels", v: "Phone, email, chat, portal, WhatsApp" },
    { k: "Reporting", v: "Volume, response, resolution, repeats" },
  ]}
  faqs={[
    { q: "What hours is the desk staffed?", a: "Coverage is agreed per contract, from business hours in one region to extended or follow-the-sun cover. We will tell you what a given coverage level costs before you commit to it." },
    { q: "Where is the team based?", a: "Primarily Hyderabad, India. Location, language coverage and named contacts are confirmed in writing as part of the agreement." },
    { q: "How are response times measured?", a: "By priority level, with response and resolution targets and an agreed escalation path. Reporting covers ticket volume, response time, resolution time and recurring issues." },
    { q: "How does handover work?", a: "We shadow your current process first, document what is undocumented, then take tickets in stages. Nothing transfers until the runbook is complete." },
    { q: "Where does automation fit in?", a: "In ticket classification, routing, suggested responses and knowledge search. It shortens the path to an answer; a person still owns the resolution." },
  ]}
  bandKicker="Define the requirement"
  bandHeading="Bring us your support scope and we will set out coverage, boundaries, transition and reporting."
  ctaHref="/contactus?intent=enterprise-ai-use-case">

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What this service covers</h2>
      <div class="section-body">
        <p class="para">A managed help desk is a service boundary before it is a technology. What matters at procurement is what is in scope, what is explicitly not, how quickly you can expect a response, and what happens when something falls outside both.</p>
        <p class="para">We run first-line and second-line support across the channels your people already use, on your ITSM platform or ours, with the escalation path agreed before transition begins.</p>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Coverage and boundaries</h2>
      <dl class="sysgrid">
        <div class="sysrow"><dt>Channels</dt><dd>Phone, email, chat, self-service portal and WhatsApp</dd></div>
        <div class="sysrow"><dt>Scope</dt><dd>User support, application support, incident management, service requests and access requests</dd></div>
        <div class="sysrow"><dt>Platforms</dt><dd>Your existing ITSM tool where you have one; we do not require a migration to work with you</dd></div>
        <div class="sysrow"><dt>Coverage hours</dt><dd>Agreed per engagement — business hours, extended or 24x7. We state the model in the contract rather than implying always-on</dd></div>
        <div class="sysrow"><dt>Not in scope</dt><dd>Changes to production systems outside the agreed change process, and any approval reserved to your IT owner</dd></div>
        <div class="sysrow"><dt>Escalation</dt><dd>Named escalation contacts on both sides, with thresholds agreed before go-live</dd></div>
      </dl>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Service levels</h2>
      <div class="section-body">
        <p class="para measures-note"><strong>Service levels are agreed per engagement, not published as a blanket promise.</strong> Response and resolution targets depend on your ticket profile, coverage hours and the systems in scope. We set them against your actual volumes during transition.</p>
      </div>      <div class="section-body">
        <ul class="list">
          <li>Response targets by priority, defined against your incident classification</li>
          <li>Resolution targets separated from response targets, because they are different commitments</li>
          <li>Measurement method and reporting period agreed in writing</li>
          <li>What is excluded from the clock: waiting on you, waiting on a third-party vendor, and scheduled change windows</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Transition</h2>
      <ol class="stagelist">
        <li><strong>Discovery</strong><span>Current ticket volumes and profile, systems in scope, existing documentation and known pain points.</span></li>
        <li><strong>Knowledge capture</strong><span>Runbooks and known-error records built with your team. Where documentation does not exist, we say so rather than assuming it.</span></li>
        <li><strong>Pilot</strong><span>A defined subset of the scope, run in parallel, to validate volumes and targets before full transition.</span></li>
        <li><strong>Transition</strong><span>Phased handover with your team available for escalation.</span></li>
        <li><strong>Steady state</strong><span>Agreed reporting cadence, a named service owner and a scheduled service review.</span></li>
      </ol>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Governance and reporting</h2>
      <div class="section-body">
        <ul class="list">
          <li>Volume, category and trend reporting on an agreed cadence</li>
          <li>SLA attainment against the agreed targets, with the calculation shown</li>
          <li>Recurring-incident analysis, so support work feeds back into fixing causes</li>
          <li>A named service owner and a scheduled review with your IT owner</li>
          <li>Access, joiner-mover-leaver handling and audit evidence within your control framework</li>
        </ul>
      </div>
    </div>
  </section>

</ServiceLayout>
