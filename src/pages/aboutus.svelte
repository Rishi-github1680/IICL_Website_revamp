<script>
  import { onMount } from 'svelte';
  import Layout from '../Layout.svelte';
  import { PAGE_ART, MENU } from '../menu.js';
  import { COMPANY } from '../seo.js';
  import { countUp } from '../countup.js';

  // The eight products, for the marquee strip (name + brand accent + link).
  const PRODUCTS = (MENU.find((m) => m.mega === 'products') || { items: [] }).items;

  // Live local time in each delivery hub — the "two continents, one engine" story, made literal.
  let hydTime = $state('');
  let ralTime = $state('');
  onMount(() => {
    const fmt = (tz) => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz }).format(new Date());
    const tick = () => { hydTime = fmt('Asia/Kolkata'); ralTime = fmt('America/New_York'); };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  });

  const STATS = [
    { v: '20+', k: 'Years in global IT services' },
    { v: '08', k: 'SaaS products in production' },
    { v: '09', k: 'Industries served today' },
    { v: '02', k: 'Delivery centres — Hyderabad & Raleigh' },
  ];

  // "Why enterprises choose IICL" — these were titles and descriptions run together
  // as loose paragraphs, with one heading left with no body at all.
  const REASONS = [
    { t: 'Transparent and ethical AI', d: 'Fairness, explainability and regulatory alignment are built in, so you get AI you can defend to a regulator, not just deploy.' },
    { t: 'Agents that act, not just chat', d: 'Autonomous agents plan, decide and execute across your enterprise systems, with the approval points agreed before anything goes live.' },
    { t: 'Client-centric customisation', d: 'Every solution is scoped to your industry, your customers and your systems. Nothing is dropped in from a template.' },
    { t: 'Multi-industry expertise', d: 'Healthcare, manufacturing, finance, banking, legal, logistics, supply chain, contact centre and HR — nine sectors in production today.' },
  ];

  // The old page promised six steps and then listed five unlabelled lines.
  const PROCESS = [
    { t: 'Map the process', d: 'We document how the work runs today, including the exceptions people work around.' },
    { t: 'Agree the scope', d: 'What the system will do, what it will not, and who approves what — written down before we build.' },
    { t: 'Build against your systems', d: 'Developed on your data and your integrations, not in a demo environment.' },
    { t: 'Test on real cases', d: 'Checked against your data with the failure cases documented, not hidden.' },
    { t: 'Roll out in stages', d: 'Usually one process or one team first, so problems surface while they are still small.' },
    { t: 'Support and measure', d: 'A support runway, and the before-and-after numbers that show whether it worked.' },
  ];

  const CAPABILITIES = [
    { t: 'Generative AI', d: 'Automating content creation and decision support with traceable reasoning.' },
    { t: 'Multimodal systems', d: 'Text, vision, speech and structured data combined into one workflow.' },
    { t: 'Predictive analytics', d: 'Forecasting and prioritisation built on the data you already hold.' },
    { t: 'Autonomous agents', d: 'Multi-step execution across ERP, CRM and help desk, with human approval.' },
  ];
</script>

<Layout
  kicker="Company"
  h1="About Intelligence India.Com Limited"
  lede="Intelligence India.Com Limited builds AI agents, enterprise software and automation platforms, with delivery teams operating across India and the USA."
  heroImage={PAGE_ART["aboutus"]}
  path="/aboutus"
  cta="Discuss a Partnership"
  faqs={[
    { q: 'Where does IICL operate from?', a: 'Delivery runs from Hyderabad, India, with a US presence in Raleigh, North Carolina. Both offices are reachable on +91 99894 42002 or reachus@iicl.in.' },
    { q: 'How does an engagement usually start?', a: 'With a one-day workshop that maps the processes worth automating and ends with a scoped, priced plan — whether or not you continue with us.' },
    { q: 'Is IICL certified?', a: 'IICL is ISO 27001 certified and SOC 2 audited. Your compliance lead is welcome to review the controls before anything goes to production.' }
  ]}
>
  <!-- Who we are -->
  <section class="page-section">
    <div class="wrap section-split">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>Who we are</h2>
        <p class="para">IICL builds intelligent systems that change how enterprises operate, scale and make decisions. We work at the join between traditional enterprise systems and modern automation — the place where most AI projects actually stall.</p>
        <p class="para">The company grew out of two decades in global IT services, with a leadership team carrying 25 years of domain experience. That background is why our engagements start with your existing systems and constraints rather than a greenfield assumption.</p>
        <p class="para">Alongside consulting and delivery, we run eight SaaS products in production, covering voice, WhatsApp commerce, legal document review, dental practice management, workforce attendance, financial analysis and IT ticketing.</p>
      </div>
      <div class="split-media">
        <figure><img src="/img/about-us.jpg" alt="The IICL team working on enterprise AI delivery" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <!-- Numbers -->
  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Where we stand today</h2>
      <div class="stat-row">
        {#each STATS as s}
          <div class="stat"><span class="stat-v mono" use:countUp>{s.v}</span><span class="stat-k">{s.k}</span></div>
        {/each}
      </div>

      <!-- The eight products, on a slow ticker. Pause on hover; every name is a link. -->
      <div class="marq" aria-label="IICL products in production">
        <div class="marq-track">
          {#each [0, 1] as dup}
            {#each PRODUCTS as p (p.href + dup)}
              <a class="marq-item" href={p.href} aria-hidden={dup === 1} tabindex={dup === 1 ? -1 : 0}>
                <span class="marq-dot" style="background:{p.acc};"></span>
                <span class="marq-name">{p.label}</span>
                <span class="marq-tag mono">{p.tag}</span>
              </a>
            {/each}
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- What we do -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What we build</h2>
      <div class="section-body">
        <p class="para">Four capabilities carry most of our delivery work. Engagements usually combine two or three of them rather than one in isolation.</p>
      </div>
      <ul class="feature-grid">
        {#each CAPABILITIES as c}
          <li class="feature-card"><span class="fc-dot"></span><span><strong>{c.t}</strong><br />{c.d}</span></li>
        {/each}
      </ul>
    </div>
  </section>

  <!-- Why choose us -->
  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Why enterprises choose IICL</h2>
      <ul class="feature-grid">
        {#each REASONS as r}
          <li class="feature-card"><span class="fc-dot"></span><span><strong>{r.t}</strong><br />{r.d}</span></li>
        {/each}
      </ul>
    </div>
  </section>

  <!-- Delivery process -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>How we deliver</h2>
      <div class="section-body">
        <p class="para">Every engagement follows the same six steps, so you always know what happens next and where the decision points sit.</p>
      </div>
      <ol class="flow">
        {#each PROCESS as p, i}
          <li class="flow-step">
            <b>{String(i + 1).padStart(2, '0')}</b>
            <strong>{p.t}</strong>
            <span>{p.d}</span>
          </li>
        {/each}
      </ol>
    </div>
  </section>

  <!-- Mission and vision -->
  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Mission and vision</h2>
      <div class="mv">
        <div class="mv-card">
          <span class="mv-k mono">Mission</span>
          <p>To help businesses adopt AI automation that is secure, useful and actually used. That means starting from a real process, proving the result before the full build, and leaving a person in control of the decisions that matter.</p>
        </div>
        <div class="mv-card">
          <span class="mv-k mono">Vision</span>
          <p>To become the most trusted enabler of intelligent enterprise transformation — building scalable AI products and automation platforms that businesses can rely on in production, not just in pilots.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Trust -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Security and compliance</h2>
      <div class="section-body">
        <p class="para">IICL is <strong>ISO 27001 certified</strong> and <strong>SOC 2 audited</strong>. Access is role-based, activity is logged, and data retention follows your policy. Every engagement includes a security review before anything reaches production, and your compliance lead is welcome to walk the controls with us first.</p>
        <p class="para">Where your obligations extend further — HIPAA, GDPR or the Indian DPDP Act — we map our controls against them and tell you plainly what is covered and what remains yours to satisfy.</p>
      </div>
    </div>
  </section>

  <!-- Offices -->
  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Where we operate</h2>
      <div class="offices">
        <div class="office">
          <div class="office-head">
            <span class="office-k mono">India — Hyderabad</span>
            {#if hydTime}<span class="office-clock mono"><i class="office-pulse"></i>{hydTime} IST</span>{/if}
          </div>
          <p class="para">{COMPANY.india.street}, {COMPANY.india.city} {COMPANY.india.postalCode}.</p>
          <p class="para office-note">Our delivery teams work from here.</p>
        </div>
        <div class="office">
          <div class="office-head">
            <span class="office-k mono">United States — Raleigh</span>
            {#if ralTime}<span class="office-clock mono"><i class="office-pulse"></i>{ralTime} ET</span>{/if}
          </div>
          <p class="para">{COMPANY.usa.street}, {COMPANY.usa.city}, {COMPANY.usa.region} {COMPANY.usa.postalCode}.</p>
          <p class="para office-note">Client engagement across US time zones.</p>
        </div>
      </div>
      <p class="para office-contact">
        Reach either office on <a href="tel:+919989442002">{COMPANY.phone}</a> or <a href="mailto:{COMPANY.email}">{COMPANY.email}</a>,
        or <a href="/contactus">send an enquiry</a>.
      </p>
    </div>
  </section>

  <!-- Visible answers for the FAQ structured data declared above. -->
  <section class="page-section faq-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Common questions</h2>
      <div class="faq-list">
        <details class="faq-item" name="faq">
          <summary class="faq-q">Where does IICL operate from?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">Delivery runs from Hyderabad, India, with a US presence in Raleigh, North Carolina. Both offices are reachable on +91 99894 42002 or reachus@iicl.in.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">How does an engagement usually start?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">With a one-day workshop that maps the processes worth automating and ends with a scoped, priced plan — whether or not you continue with us.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">Is IICL certified?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">IICL is ISO 27001 certified and SOC 2 audited. Your compliance lead is welcome to review the controls before anything goes to production.</p></div>
        </details>
      </div>
    </div>
  </section>
</Layout>

<style>
  /* Stats */
  .stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: #e6e3de; border: 1px solid #e6e3de; margin-top: 8px; }
  .stat { background: #fff; padding: 26px 22px; display: flex; flex-direction: column; gap: 8px; }
  .stat-v { font-size: clamp(30px, 3.4vw, 42px); line-height: 1; color: #16171a; }
  .stat-k { font-size: 14px; line-height: 1.5; color: #55585e; }

  /* Mission / vision */
  .mv { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 8px; }
  .mv-card { background: #fff; border: 1px solid #e6e3de; border-top: 3px solid #ee2f2e; padding: 26px 26px 28px; }
  .mv-k { display: block; font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: #ee2f2e; margin-bottom: 14px; }
  .mv-card p { margin: 0; font-size: 16px; line-height: 1.7; color: #33363c; }

  /* Product marquee — a slow ticker of everything in production. */
  .marq { margin-top: 24px; overflow: hidden; border: 1px solid #e6e3de; background: #0b0c0e; border-radius: 6px;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
    mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); }
  .marq-track { display: flex; width: max-content; animation: marq 36s linear infinite; }
  .marq:hover .marq-track { animation-play-state: paused; }
  .marq-item { display: inline-flex; align-items: baseline; gap: 10px; padding: 18px 30px; text-decoration: none; white-space: nowrap;
    border-right: 1px solid rgba(255,255,255,.08); transition: background .2s; }
  .marq-item:hover { background: rgba(238,47,46,.12); }
  .marq-dot { align-self: center; width: 9px; height: 9px; border-radius: 50%; flex: none; box-shadow: 0 0 10px rgba(238,47,46,.55); }
  .marq-name { font-size: 16.5px; font-weight: 600; color: #f4f2ee; }
  .marq-tag { font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: rgba(244,242,238,.55); }
  @keyframes marq { to { transform: translateX(-50%); } }
  @media (prefers-reduced-motion: reduce) {
    .marq-track { animation: none; }
    .marq { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
  }

  /* Offices */
  .offices { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 8px; }
  .office { background: #fff; border: 1px solid #e6e3de; padding: 24px 26px; }
  .office-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 12px; }
  .office-head .office-k { margin-bottom: 0; }
  .office-clock { display: inline-flex; align-items: center; gap: 7px; font-size: 12px; color: #16171a;
    background: #f4f1ec; border: 1px solid #e6e3de; border-radius: 999px; padding: 4px 12px; }
  .office-pulse { width: 7px; height: 7px; border-radius: 50%; background: #ee2f2e; animation: opulse 2.4s ease infinite; }
  @keyframes opulse { 50% { opacity: .35; } }
  @media (prefers-reduced-motion: reduce) { .office-pulse { animation: none; } }
  .office-k { display: block; font-size: 11px; letter-spacing: .18em; text-transform: uppercase; color: #ee2f2e; margin-bottom: 12px; }
  .office-note { color: #55585e; margin-bottom: 0; }
  .office-contact { margin-top: 24px; }
  .office-contact a, .office a { color: #b81c1c; }

  @media (max-width: 860px) {
    .stat-row { grid-template-columns: repeat(2, 1fr); }
    .mv, .offices { grid-template-columns: 1fr; }
  }
  @media (max-width: 520px) {
    .stat-row { grid-template-columns: 1fr; }
    .step { flex-direction: column; gap: 8px; }
  }
</style>
