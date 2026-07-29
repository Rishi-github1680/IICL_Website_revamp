<script>
  // Ported from the official IICL site (iicl.in). Edit copy, images or reorder <section> blocks freely.
  import ServiceLayout from '../ServiceLayout.svelte';
  import { PAGE_ART } from '../menu.js';
</script>

<ServiceLayout
  autoFaq={false}
  kicker="Service"
  h1="Custom Web and Mobile Application Development"
  lede="Custom enterprise portals, mobile apps, SaaS products and customer platforms, built with optional AI features and supported after launch."
  path="/web-mobile-dev"
  cta="Discuss a Defined Requirement"
  heroImage={PAGE_ART["web-mobile-dev"]}
  specs={[
    { k: "We build", v: "Web, mobile, SaaS, portals" },
    { k: "Stack", v: "React, Flutter, .NET, Java, Python" },
    { k: "After launch", v: "Maintenance and support" },
  ]}
  faqs={[
    { q: "Why Choose Us?", a: "AI-Native Development: Embed GPT and vision models, and search-enhanced LLMs natively into your app Design-Led Engineering: Figma to code workflows with pixel-perfect delivery Security First: We implement zero-trust, SOC2-ready architectures Built to Scale: Horizontal scaling, multi-region redundancy, and resilient microservices Post-Launch Success: Analytics, A/B testing, in-app surveys, and rapid iteration cycles" },
    { q: "Who owns the source code?", a: "You do. Ownership transfers on final payment, and we hand over the repository, build pipeline and documentation with it." },
    { q: "How long does a build take?", a: "It depends on scope, but our standard shape is a one-day workshop, a working prototype in about two weeks, and delivery inside three months. We would rather scope it down than miss a date." },
    { q: "Do you maintain the application after launch?", a: "Yes, under a support arrangement agreed up front, covering monitoring, fixes and a route for changes. You are not obliged to take it." },
    { q: "Can you work on an application someone else built?", a: "Often, yes. We start with a short technical review to establish what is there and what it would cost to take on, then tell you honestly whether continuing or rebuilding is the better option." },
    { q: "Do we have to include AI features?", a: "No. AI is worth adding where it removes real work, such as search, document handling or support. Where it does not, we will say so." },
  ]}
  bandKicker="Define the requirement"
  bandHeading="Bring us a defined product requirement and we will scope architecture, security, QA and ownership."
  ctaHref="/contactus?intent=enterprise-ai-use-case">

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What this service covers</h2>
      <div class="section-body">
        <p class="para">Custom application work where an off-the-shelf product does not fit: internal platforms, customer portals, mobile applications and the services behind them.</p>
        <p class="para">The technology choice matters far less than the decisions around it — who owns the code, how it is tested, what happens at release, and who supports it in six months. Those are settled before build starts.</p>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>How a build runs</h2>
      <ol class="stagelist">
        <li><strong>Discovery</strong><span>The problem, the users, the constraints and the systems it has to work with. Output: a scoped requirement and an architecture direction.</span></li>
        <li><strong>Architecture and design</strong><span>Data model, integration surface, authentication, and the non-functional requirements — performance, availability and security — stated as numbers rather than adjectives.</span></li>
        <li><strong>Build</strong><span>Iterative delivery against agreed acceptance criteria, with working software reviewable throughout.</span></li>
        <li><strong>Quality engineering</strong><span>Automated tests at unit, integration and end-to-end level; accessibility and security testing as part of the definition of done, not a phase at the end.</span></li>
        <li><strong>Release</strong><span>Deployment pipeline, environment strategy, rollback route and go-live checklist.</span></li>
        <li><strong>Support</strong><span>An agreed support model with response targets, or a documented handover to your team — decided at the start, not after launch.</span></li>
      </ol>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What is agreed before build starts</h2>
      <dl class="sysgrid">
        <div class="sysrow"><dt>Code ownership</dt><dd>Yours. Repositories, pipelines and infrastructure definitions are handed over as part of delivery</dd></div>
        <div class="sysrow"><dt>Accessibility</dt><dd>WCAG 2.2 AA as the target for customer-facing interfaces, tested rather than asserted</dd></div>
        <div class="sysrow"><dt>Security</dt><dd>Authentication model, data classification, secret handling and dependency policy agreed in design</dd></div>
        <div class="sysrow"><dt>Testing</dt><dd>Coverage expectations and the definition of done, written down</dd></div>
        <div class="sysrow"><dt>Environments</dt><dd>Who owns each environment and who can deploy to it</dd></div>
        <div class="sysrow"><dt>Support</dt><dd>Response targets, coverage hours and the escalation path</dd></div>
      </dl>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Technology</h2>
      <div class="section-body">
        <p class="para">We work across the mainstream web and mobile stacks. Which one is right depends on your existing team, your hosting, your integration surface and who will maintain it — not on what is currently fashionable.</p>
        <p class="para">If your team already runs a stack competently, that is usually the right answer, and we will say so.</p>
      </div>      <div class="section-body">
        <ul class="list">
          <li>Web: TypeScript with React, Svelte or the framework your team already runs</li>
          <li>Mobile: native or cross-platform, chosen against your distribution and device requirements</li>
          <li>Backend: Node, Python or JVM services, with the data platform your organisation already supports</li>
          <li>Infrastructure: your existing cloud, with infrastructure defined as code and handed over</li>
        </ul>
      </div>
    </div>
  </section>

</ServiceLayout>
