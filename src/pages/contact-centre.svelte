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
  cta="Request an AI Contact Centre Demo"
  faqs={[
    { q: 'Will customers be stuck talking to a bot?', a: 'No. Handover rules are set by you, and the transfer carries the conversation context so the customer does not repeat themselves.' },
    { q: 'Which contacts should stay with people?', a: 'Complaints, anything sensitive, and anything where a judgement call matters. Routine status and information requests are the ones worth automating first.' },
    { q: 'What can we measure?', a: 'Response time, abandonment, resolution, quality and conversion, before and after, so the change is visible rather than asserted.' },
    { q: 'Which systems does it connect to?', a: 'CRM, ticketing, telephony, WhatsApp and your knowledge base.' },
    { q: 'Does it work in more than one language?', a: 'Multilingual handling is supported. We confirm the specific languages for your deployment and demonstrate them rather than quoting a number.' }
  ]}
  autoFaq
>
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

</Layout>
