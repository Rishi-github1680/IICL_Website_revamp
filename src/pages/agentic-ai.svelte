<script>
  import ServiceLayout from '../ServiceLayout.svelte';
  import { PAGE_ART } from '../menu.js';
</script>

<ServiceLayout
  kicker="Service"
  h1="Autonomous AI Agents That Execute Multi-Step Work"
  lede="Design, deploy and orchestrate autonomous AI agents that carry out multi-step work across your systems, with human approval built into the workflow."
  path="/agentic-ai"
  cta="Discuss Your AI Use Case"
  heroImage={PAGE_ART["agentic-ai"]}
  specs={[
    { k: "Agents do", v: "Multi-step work across systems" },
    { k: "Oversight", v: "Human approval on every action" },
    { k: "Connects to", v: "ERP, CRM, help desk, email" },
  ]}
  faqs={[
    { q: "What makes an agent different from a chatbot?", a: "A chatbot replies. An agent completes a task: it reads the request, gathers what it needs from your systems, acts and reports back. It is judged on the work finishing, not on the answer sounding right." },
    { q: "Which processes suit an agent?", a: "Multi-step work that follows recognisable rules, touches more than one system, and happens often enough to be worth automating." },
    { q: "What stops an agent doing something wrong?", a: "Scoped permissions, approval steps on consequential actions, and a full log of what it did. An agent gets access to what its task requires and nothing more." },
    { q: "Can several agents work together?", a: "Yes. Workflows can chain agents, data sources and tools, with each step recorded." },
    { q: "How do we know it is working?", a: "The proof of concept is run against your process with a measure agreed in advance, so success is defined before the build rather than after." },
  ]}
>
  <section class="page-section">
    <div class="wrap section-split">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>What an agent actually does</h2>
        <p class="statement">A chatbot answers. <em>An agent finishes the job.</em></p>
        <p class="para">It reads the request, pulls what it needs from your systems, takes the action and reports back — across several steps, without someone shepherding each one.</p>
        <p class="para">Where a rules engine breaks on the exception, an agent plans around it and asks for approval when the decision matters.</p>
        <a class="cta-link" href="/contactus">See what this looks like on your process <span class="arw">→</span></a>
      </div>
      <div class="split-media">
        <figure><img src="/img/agentic1.png" alt="Autonomous AI agents executing multi-step enterprise work" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap section-split">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>Agents built for your work</h2>
        <p class="statement">Built once. Evolved continuously. <em>Deployed anywhere.</em></p>
        <p class="para">Agents are configured to a domain rather than bought off a shelf — finance, operations, legal, compliance — each with full logging and audit.</p>
        <ul class="list">
          <li>Reads both structured and unstructured data</li>
          <li>Handles branching logic and remembers context between steps</li>
          <li>Connects to internal systems, databases and SaaS platforms</li>
          <li>Escalates below a confidence threshold you set</li>
        </ul>
      </div>
      <div class="split-media">
        <figure><img src="/img/agentic2.png" alt="Configuring a custom autonomous agent" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap section-split rev">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>Chaining agents into a workflow</h2>
        <p class="statement">One agent solves a task. <em>Several solve a process.</em></p>
        <p class="para">The workflow builder chains agents, data sources and tools so non-linear work runs end to end, with every step recorded.</p>
        <ul class="list">
          <li>Compose workflows from agents you already have</li>
          <li>Set the data sources and tools each agent may reach</li>
          <li>Tune prompts automatically to each agent's role</li>
        </ul>
      </div>
      <div class="split-media">
        <figure><img src="/img/agentic3.png" alt="Workflow builder chaining multiple agents" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap section-split">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>Recruitment fleet</h2>
        <p class="statement">Hiring that stops being reactive.</p>
        <p class="para">Sourcing, screening and ranking are split across agents, so the team spends its time on candidates worth meeting rather than on the first pass.</p>
        <ul class="list">
          <li>Parses CVs and matches them against the role</li>
          <li>Pre-screens conversationally, at any hour</li>
          <li>Ranks on skill fit, experience and intent</li>
          <li>Writes back to your ATS and calendars</li>
        </ul>
      </div>
      <div class="split-media">
        <figure><img src="/img/agentic4.png" alt="Recruitment agents screening and ranking candidates" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap section-split rev">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>HR fleet</h2>
        <p class="statement">The HR questions that never stop, answered without a queue.</p>
        <p class="para">An always-on assistant in Slack, Teams or your intranet, answering from policy rather than memory — with role-based access and a log of every response.</p>
        <ul class="list">
          <li>Leave, payroll and benefits answered from current policy</li>
          <li>Guided onboarding, appraisals and asset requests</li>
          <li>Pulse surveys with sentiment tracking</li>
          <li>Connects to your HRMS and knowledge base</li>
        </ul>
      </div>
      <div class="split-media">
        <figure><img src="/img/agentic5.png" alt="HR assistant answering employee queries" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Customer support fleet</h2>
      <p class="statement">Every channel, one memory — <em>and a person on the calls that need one.</em></p>
      <div class="section-body">
        <p class="para">Chat, email, WhatsApp, IVR and voice handled by agents that carry context between them, built for volumes where hiring is not the answer.</p>
        <ul class="list">
          <li>Multi-turn conversation with memory and intent recognition</li>
          <li>Voice agents for inbound and outbound calls, multilingual</li>
          <li>Live integration with CRM, ticketing, ERP and product APIs</li>
          <li>Routing, escalation and handover with the full context attached</li>
        </ul>
      </div>
      <a class="cta-link" href="/contactus">Explore the full capability set <span class="arw">→</span></a>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Start with one process</h2>
      <p class="statement">Bring us the work that takes too long. <em>We'll tell you honestly if it suits an agent.</em></p>
      <div class="section-body">
        <p class="para">The first engagement is scoped around a single process with a measure agreed before the build, so success is defined in advance rather than argued afterwards.</p>
        <p class="para">Related: <a href="/ai-genai-services">AI and GenAI services</a>, <a href="/iCognito">iCognito.ai</a>, <a href="/use-cases">use cases</a>.</p>
      </div>
      <a class="cta-link" href="/contactus">Talk to our solutions team <span class="arw">→</span></a>
    </div>
  </section>

  <section class="page-section faq-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Common questions</h2>
      <div class="faq-list">
        <details class="faq-item" name="faq">
          <summary class="faq-q">What makes an agent different from a chatbot?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">A chatbot replies. An agent completes a task: it reads the request, gathers what it needs from your systems, acts and reports back. It is judged on the work finishing, not on the answer sounding right.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">Which processes suit an agent?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">Multi-step work that follows recognisable rules, touches more than one system, and happens often enough to be worth automating.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">What stops an agent doing something wrong?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">Scoped permissions, approval steps on consequential actions, and a full log of what it did. An agent gets access to what its task requires and nothing more.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">Can several agents work together?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">Yes. Workflows can chain agents, data sources and tools, with each step recorded.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">How do we know it is working?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">The proof of concept is run against your process with a measure agreed in advance, so success is defined before the build rather than after.</p></div>
        </details>
      </div>
    </div>
  </section>
</ServiceLayout>
