<script>
  // Ported from the official IICL site (iicl.in). Edit copy, images or reorder <section> blocks freely.
  import Layout from '../Layout.svelte';
  import { PAGE_ART } from '../menu.js';
</script>

<Layout
  kicker="Industry"
  h1="AI-Powered Contact Centre Automation"
  lede="Automate inbound and outbound contact centre work with AI voice agents, agent assist, intelligent routing and call summarisation, with human handover."
  heroImage={PAGE_ART["contact-centre"]}
  path="/contact-centre"
  schemaType="Service"
  cta="Assess an Industry Workflow"
  faqs={[
    { q: 'Will customers be stuck talking to a bot?', a: 'No. Handover rules are set by you, and the transfer carries the conversation context so the customer does not repeat themselves.' },
    { q: 'Which contacts should stay with people?', a: 'Complaints, anything sensitive, and anything where a judgement call matters. Routine status and information requests are the ones worth automating first.' },
    { q: 'What can we measure?', a: 'Response time, abandonment, resolution, quality and conversion, before and after, so the change is visible rather than asserted.' },
    { q: 'Which systems does it connect to?', a: 'CRM, ticketing, telephony, WhatsApp and your knowledge base.' },
    { q: 'Does it work in more than one language?', a: 'Multilingual handling is supported. We confirm the specific languages for your deployment and demonstrate them rather than quoting a number.' }
  ]}
  autoFaq
  bandKicker="Assess a workflow"
  bandHeading="Bring us one contact type. We will show you what can be handled and where a person takes over."
  ctaHref="/contactus?intent=enterprise-ai-use-case">
  <section class="page-section">
    <div class="wrap section-split">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>Where AI actually helps</h2>
        <p class="statement">Routine contacts handled. <em>Judgement calls escalated.</em></p>
        <p class="para">A contact centre does not need everything automated. It needs the repeatable contacts off the queue so people can take the ones that matter.</p>
        <p class="para">You set the handover rules, and every transfer carries the conversation, so the customer never starts again.</p>
        <a class="cta-link" href="/contactus">Request a contact centre demo <span class="arw">→</span></a>
      </div>
      <div class="split-media">
        <figure><img src="/img/contact-center.png" alt="Support agent working alongside an AI assistant" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What changes</h2>
      <div class="section-body">
        <p class="para">Complaints and anything sensitive stay with people, by design.</p>
      </div>
      <ul class="outcomes">
        <li class="outcome"><b>Measured</b><span>Response, abandonment and resolution compared before and after.</span></li>
        <li class="outcome"><b>Routed</b><span>Contacts reaching the right person the first time.</span></li>
        <li class="outcome"><b>Retained</b><span>Full context on every handover, so nobody repeats themselves.</span></li>
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
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Voice automation</strong> — inbound and outbound calls that follow a recognisable pattern.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Agent assist</strong> — live suggestions and knowledge lookup during the call.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Routing</strong> — intent-based distribution across voice, chat and WhatsApp.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Summarisation</strong> — call notes and dispositions written automatically.</span></li>
      </ul>
      <a class="cta-link" href="/contactus">See it modelled on your queue <span class="arw">→</span></a>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What changes on the floor</h2>
      <div class="section-body">
        <p class="para">The same volume of contacts, handled differently. This is the shift most operations are actually buying.</p>
      </div>
      <div class="compare">
        <div>
          <h4>Before</h4>
          <ul>
            <li>Customers navigate an IVR menu to reach the wrong queue</li>
            <li>Routine status questions consume trained agents' time</li>
            <li>Each channel keeps its own history, so context is lost</li>
            <li>Transfers start the conversation over</li>
            <li>Quality is sampled on a handful of calls a month</li>
          </ul>
        </div>
        <div>
          <h4>After</h4>
          <ul>
            <li>Callers state what they want and are routed on intent</li>
            <li>Routine contacts resolve on arrival, day or night</li>
            <li>One thread across voice, chat, email and WhatsApp</li>
            <li>Handover carries the full history to the person taking over</li>
            <li>Every interaction is transcribed, summarised and reviewable</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Systems, ownership and boundaries</h2>
      <div class="section-body">
        <p class="para">Before anything is designed we agree which systems hold the truth, who owns each decision, and what the system is never permitted to decide. That boundary is written down and does not move without your approval.</p>
      </div>
      <dl class="sysgrid">
        <div class="sysrow"><dt>Systems of record</dt><dd>CCaaS or telephony platform and the CRM or help desk of record</dd></div>
        <div class="sysrow"><dt>Channels</dt><dd>Voice, chat, email and WhatsApp, with one conversation history across them</dd></div>
        <div class="sysrow"><dt>Human owner</dt><dd>Team leaders and agents; the agent-assist layer never replaces the decision</dd></div>
        <div class="sysrow"><dt>Never automated</dt><dd>Complaint outcomes, goodwill decisions and anything a regulator treats as advice</dd></div>
        <div class="sysrow"><dt>Consent and disclosure</dt><dd>Callers are told they are speaking to an automated system, and recording consent is captured</dd></div>
        <div class="sysrow"><dt>Escalation</dt><dd>Handover carries the full transcript and context so the customer never repeats themselves</dd></div>
      </dl>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What we would measure</h2>
      <div class="section-body">
        <p class="para measures-note"><strong>Measures to validate, not results achieved.</strong> These are the measures we would agree during discovery and baseline before go-live. We publish figures only with a baseline, a measurement period, a calculation method and the customer&rsquo;s approval.</p>
        <ul class="list">
          <li>Share of contacts fully handled without a person</li>
          <li>Wait time on routine contacts</li>
          <li>Handover rate and what triggers it</li>
          <li>Quality scores on automated versus assisted contacts</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Related paths</h2>
      <ul class="pathlist">
          <li><a href="/ivaak">iVaak.ai</a><span>the voice agent handling inbound and outbound calls</span></li>
          <li><a href="/icognito">iCognito.ai</a><span>conversational AI across channels</span></li>
          <li><a href="/trufix">TruFix.ai</a><span>where resolution has to be verified, not just recorded</span></li>
          <li><a href="/gcc-technology-teams">GCC Technology Teams</a><span>building the CX engineering capability in-house</span></li>
      </ul>
    </div>
  </section>

</Layout>
