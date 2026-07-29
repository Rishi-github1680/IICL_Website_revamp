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
      <div class="section-body">
        <p class="para">Delivering exceptional support experiences starts with a modern, AI-augmented Helpdesk system, one that is responsive, intelligent, and built for scale.</p>
        <p class="para">Our Helpdesk Services offer a full-stack support infrastructure designed for organizations seeking to reduce operational overhead, improve response times, and elevate user satisfaction. From IT ticketing and knowledge management to smart automation and real-time analytics, our platform transforms how support is delivered across internal teams and external customers.</p>
        <p class="para">Whether you’re supporting thousands of employees or millions of users, our Helpdesk framework is modular, secure, and built for enterprise velocity.</p>
        <ul class="list">
          <li>Helpdesk Services</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Managed help desk capabilities</h2>
      <div class="section-body">
        <p class="para">Unify all your support requests — whether they come via email, chat, voice, or social — into a centralized dashboard with intelligent routing and SLA tracking.</p>
        <p class="para">Reduce agent load and time-to-resolution with AI-powered automation integrated directly into the Helpdesk.</p>
        <p class="para">Give agents and users instant access to contextual documentation via dynamic, searchable knowledge-base (KB) modules.</p>
        <p class="para">Get complete visibility into your support operations with advanced reporting and real-time analytics.</p>
        <p class="para">Our Helpdesk services seamlessly connect with your existing IT ecosystem, CRM tools, HRMS, and custom apps.</p>
        <ul class="list">
          <li>Omni-Channel Ticketing System</li>
          <li>AI-Powered Automation</li>
          <li>Integrated Knowledge Management</li>
          <li>Real-Time Analytics and SLA Monitoring</li>
          <li>Flexible Integrations</li>
          <li>Intelligent auto-tagging and ticket classification</li>
          <li>Priority-based routing with escalation workflows</li>
          <li>API support for external form submissions or IoT device triggers</li>
          <li>Natural Language Query Handling (LLM-based)</li>
          <li>Suggested Responses and Knowledge Base Surfacing</li>
          <li>Smart Triage: Determine intent, urgency, and category instantly</li>
          <li>Auto-generated articles from resolved tickets</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Use Cases by Department</h2>
      <div class="section-body">
        <ul class="list">
          <li>Asset tracking, password resets, device provisioning</li>
          <li>ITSM-ready workflows for change management and incident reporting</li>
          <li>Answer employee queries on leave, benefits, payroll, and policies</li>
          <li>Confidential issue reporting, onboarding/offboarding workflows</li>
          <li>Handle bug reports, feature requests, usability issues</li>
          <li>Triage critical customer feedback directly to product teams</li>
          <li>Invoice inquiries, vendor onboarding, contract status checks</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Ready to Streamline Your Support?</h2>
      <div class="section-body">
        <p class="para">Whether you need a lightweight internal helpdesk or a full-scale multi-channel support solution, we’re ready to implement and deliver it efficiently.</p>
      </div>
    </div>
  </section>






  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Managed IT Help Desk Services</h2>
      <div class="section-body">
        <p class="para">Tell us the process you want to improve and we will tell you honestly whether this is the right service for it.</p>
        <ul class="list">
          <li>Staff augmentation</li>
          <li>Contact centre automation</li>
          <li>AI and GenAI services</li>
          <li>ERP support</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section faq-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Common questions</h2>
      <div class="faq-list">
        <details class="faq-item" name="faq">
          <summary class="faq-q">What hours is the desk staffed?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">Coverage is agreed per contract, from business hours in one region to extended or follow-the-sun cover. We will tell you what a given coverage level costs before you commit to it.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">Where is the team based?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">Primarily Hyderabad, India. Location, language coverage and named contacts are confirmed in writing as part of the agreement.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">How are response times measured?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">By priority level, with response and resolution targets and an agreed escalation path. Reporting covers ticket volume, response time, resolution time and recurring issues.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">How does handover work?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">We shadow your current process first, document what is undocumented, then take tickets in stages. Nothing transfers until the runbook is complete.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">Where does automation fit in?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">In ticket classification, routing, suggested responses and knowledge search. It shortens the path to an answer; a person still owns the resolution.</p></div>
        </details>
      </div>
    </div>
  </section>
</ServiceLayout>
