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
  cta="Share Your Application Requirement"
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
>
  <section class="page-section">
    <div class="wrap section-split">
      <div class="split-text">
      <h2 class="section-h"><span class="tick"></span>Web/Mobile App Development</h2>
        <p class="para">We design and develop high-performance web and mobile applications that are fast, secure, scalable, and user-centric. Whether you're building a consumer-facing platform, a mission-critical enterprise tool, or a cross-platform SaaS product, our team leverages the latest in design systems, frontend/backend technologies, and cloud-native architecture to deliver unmatched digital experiences.</p>
        <p class="para">We don’t just build apps, we engineer platforms that are future-proof, intuitive, and ready to scale.</p>
      </div>
      <div class="split-media">
        <figure><img src="/img/connect-today.png" alt="6. Offline Sync, Biometric Authentication, Push Notifications, and Background Services - connect today" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Modern Web Application Development</h2>
      <div class="section-body">
        <p class="para">Our web apps are built using cutting-edge frameworks and real-time data pipelines to meet modern UX expectations and enterprise reliability needs.</p>
        <p class="para">Technologies: React.js, Vue.js, Next.js, Remix</p>
        <p class="para">What it means: SPAs load a single HTML page and dynamically update the content without full page reloads, resulting in fast, app-like user experiences.</p>
        <p class="para">Why it matters: Users expect fast, seamless interactions without lags or refreshes, especially in SaaS, dashboards, and e-commerce platforms.</p>
        <p class="para">Applications: Real-time analytics dashboards, Admin consoles, Interactive customer portals</p>
        <p class="para">What it means: Micro-frontend architecture breaks a large frontend app into smaller, independently deployable modules managed by different teams or services.</p>
        <ul class="list">
          <li>AI-driven B2B workflow platform with embedded LLM co-pilots and task routing</li>
          <li>Geospatial intelligence dashboards for logistics firms integrating with live GPS/IoT feeds</li>
          <li>Self-serve low-code portals for enterprise clients to manage custom app flows</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Mobile App Development</h2>
      <div class="section-body">
        <p class="para">Build native-quality mobile apps with modern performance and seamless cross-device compatibility. We develop iOS and Android apps using both native stacks and cross-platform frameworks like Flutter, React Native, and Kotlin Multiplatform.</p>
        <p class="para">What it means: Our mobile UIs are designed following the Apple Human Interface Guidelines (HIG) and Google’s Material Design system, ensuring that users feel at home on their devices.</p>
        <p class="para">Why it matters: Familiarity breeds trust. A well-designed interface reduces the learning curve and improves engagement, retention, and satisfaction.</p>
        <p class="para">Use Cases: eCommerce apps, employee productivity tools, fintech wallets, fitness and wellness apps</p>
        <p class="para">What it means: We use modern cross-platform frameworks like Flutter, React Native, and Kotlin Multiplatform to write a single codebase that runs on both iOS and Android , without compromising performance.</p>
        <p class="para">Why it matters: You get faster time to market, lower maintenance costs, and consistent user experience, all while still achieving native-like performance and responsiveness.</p>
        <ul class="list">
          <li>Native feel across iOS and Android Devices</li>
          <li>Seamless gestures, transitions, and animations</li>
          <li>Accessibility-compliant design for inclusive use</li>
          <li>Usability-tested workflows to reduce drop-offs</li>
          <li>Development cycles commonly 40–60% faster</li>
          <li>Custom native integrations where needed (e.g., camera, sensors)</li>
          <li>Smooth animations and device-level optimization</li>
          <li>Unified design system across platforms</li>
          <li>On-device sentiment analysis</li>
          <li>Voice assistants and natural language queries</li>
          <li>Smart recommendations based on past actions</li>
          <li>AI-driven content tagging or categorization</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Backend and DevOps Engineering.</h2>
      <div class="section-body">
        <ul class="list">
          <li>Node.js, Python, Go, .NET Core, and Java/Spring Boot</li>
          <li>RESTful and GraphQL APIs</li>
          <li>Firebase, Supabase, Hasura, and Prisma for rapid prototyping</li>
          <li>AWS, Azure, and GCP deployments with CI/CD and containerization (Docker, Kubernetes)</li>
        </ul>
      </div>
    </div>
  </section>


  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Let’s Build the Future Together</h2>
      <div class="section-body">
        <p class="para">Whether it’s a consumer app, a digital platform, or a custom enterprise tool, we help you turn bold ideas into real-world digital products , beautifully engineered and loved by users.</p>
      </div>
    </div>
  </section>






  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Custom Web and Mobile Application Development</h2>
      <div class="section-body">
        <p class="para">Tell us the process you want to improve and we will tell you honestly whether this is the right service for it.</p>
        <ul class="list">
          <li>AI and GenAI services</li>
          <li>WhatsApp Business API</li>
          <li>ERP integration</li>
          <li>Staff augmentation</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section faq-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Common questions</h2>
      <div class="faq-list">
        <details class="faq-item" name="faq">
          <summary class="faq-q">Why Choose Us?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">AI-Native Development: Embed GPT and vision models, and search-enhanced LLMs natively into your app</p>
        <p class="para">Design-Led Engineering: Figma to code workflows with pixel-perfect delivery</p>
        <p class="para">Security First: We implement zero-trust, SOC2-ready architectures</p>
        <p class="para">Built to Scale: Horizontal scaling, multi-region redundancy, and resilient microservices</p>
        <p class="para">Post-Launch Success: Analytics, A/B testing, in-app surveys, and rapid iteration cycles</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">Who owns the source code?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">You do. Ownership transfers on final payment, and we hand over the repository, build pipeline and documentation with it.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">How long does a build take?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">It depends on scope, but our standard shape is a one-day workshop, a working prototype in about two weeks, and delivery inside three months. We would rather scope it down than miss a date.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">Do you maintain the application after launch?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">Yes, under a support arrangement agreed up front, covering monitoring, fixes and a route for changes. You are not obliged to take it.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">Can you work on an application someone else built?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">Often, yes. We start with a short technical review to establish what is there and what it would cost to take on, then tell you honestly whether continuing or rebuilding is the better option.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">Do we have to include AI features?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">No. AI is worth adding where it removes real work, such as search, document handling or support. Where it does not, we will say so.</p></div>
        </details>
      </div>
    </div>
  </section>
</ServiceLayout>
