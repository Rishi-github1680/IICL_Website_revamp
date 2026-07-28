<script>
  import Layout from '../Layout.svelte';
  import { PAGE_ART } from '../menu.js';
  import ArticleGrid from '../ArticleGrid.svelte';
  import { CASES } from '../posts.js';
  import { countUp } from '../countup.js';



  // What all three had in common — the pattern worth recognising in your own operation.
  const PATTERN = [
    { t: 'A high volume of similar contacts', d: 'More inbound than the team could answer, and most of it routine. That is what makes automation worth the effort, and it is measurable before and after.' },
    { t: 'A person still handles the hard part', d: 'The system takes the routine contacts and hands anything sensitive or unusual to a person, with the conversation history attached. Nobody repeats themselves.' },
    { t: 'One channel first, then more', d: 'Each started on a single channel rather than everywhere at once, keeping the first deployment small enough to judge honestly and reverse if needed.' },
    { t: 'Existing systems stayed in place', d: 'None of these required replacing a CRM or a booking system. The work was integration with what the organisation already ran.' },
  ];
</script>

<Layout
  kicker="Company"
  h1="Real-World AI Use Cases"
  lede="See how organisations apply IICL's AI solutions in healthcare, real estate and customer care, with the workflow and outcome described in each case."
  heroImage={PAGE_ART["use-cases"]}
  path="/use-cases"
  cta="Discuss Your Use Case"
  faqs={[
    { q: 'Which of these is closest to your situation?', a: 'Describe the process that is taking too long today. If one of these patterns fits, we will say so; if it does not, we will tell you that too.' },
    { q: 'Do you only work on voice projects?', a: 'No. These three happen to be iVaak deployments because they are the ones cleared for publication. We also deliver WhatsApp commerce, document and contract review, ticketing, ERP integration and workforce systems.' },
    { q: 'Can we talk to a reference customer?', a: 'Where the client has agreed to it, yes. Ask during the workshop and we will tell you plainly which references are available for your sector.' }
  ]}
>
  <section class="page-section">
    <div class="wrap">
      <div class="section-body uc-intro">
        <p class="para">Each of these describes a real operational problem, what was built to address it, and what changed afterwards. They include what the work involved and where a person stays in the loop, so they are useful if you are weighing up something similar.</p>
      </div>
      <ArticleGrid posts={CASES} kicker="Case studies" heading="What these deployments actually involved" />
    </div>
  </section>

  <!-- The dossier: each deployment's before → after, measured. Figures are the ones
       published in the full case studies, not new claims. -->
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Before and after, measured</h2>
      <div class="section-body">
        <p class="para">The same numbers the full write-ups report, side by side. "Before" is the state each organisation described at the start; "after" is what the deployment measured.</p>
      </div>
      <div class="dossier">
        <article class="dz">
          <span class="dz-c tl"></span><span class="dz-c br"></span>
          <header class="dz-head">
            <span class="dz-cat mono">Healthcare</span>
            <h3 class="dz-title">Calls answered</h3>
          </header>
          <div class="dz-meters">
            <div class="m-row">
              <span class="m-k mono">Before</span>
              <div class="m-track"><i class="m-fill" style="--w:60%"></i></div>
              <span class="m-v mono">60%</span>
            </div>
            <div class="m-row">
              <span class="m-k mono">After</span>
              <div class="m-track"><i class="m-fill hot" style="--w:99%"></i></div>
              <span class="m-v mono hot-v" use:countUp>99%</span>
            </div>
          </div>
          <p class="dz-note">Missed appointments fell below <strong>8%</strong>, from roughly one in five lost before.</p>
          <a class="dz-link" href="/usecase-ivaak-healthcare">Read the clinic's story <span class="mono">→</span></a>
        </article>

        <article class="dz">
          <span class="dz-c tl"></span><span class="dz-c br"></span>
          <header class="dz-head">
            <span class="dz-cat mono">Real estate</span>
            <h3 class="dz-title">Leads contacted promptly</h3>
          </header>
          <div class="dz-meters">
            <div class="m-row">
              <span class="m-k mono">Before</span>
              <div class="m-track"><i class="m-fill" style="--w:65%"></i></div>
              <span class="m-v mono">65%</span>
            </div>
            <div class="m-row">
              <span class="m-k mono">After</span>
              <div class="m-track"><i class="m-fill hot" style="--w:100%"></i></div>
              <span class="m-v mono hot-v" use:countUp>100%</span>
            </div>
          </div>
          <p class="dz-note">Full response coverage across <strong>3,000+</strong> enquiries a month; over a third previously went uncontacted in the first half hour.</p>
          <a class="dz-link" href="/usecase-ivaak-realestate">Read the developer's story <span class="mono">→</span></a>
        </article>

        <article class="dz">
          <span class="dz-c tl"></span><span class="dz-c br"></span>
          <header class="dz-head">
            <span class="dz-cat mono">Customer care</span>
            <h3 class="dz-title">Tier-1, automated</h3>
          </header>
          <div class="dz-hero">
            <span class="dz-big mono" use:countUp>4</span>
            <span class="dz-big-k">channels handled by one agent</span>
          </div>
          <ul class="dz-chan mono">
            <li>Voice</li><li>WhatsApp</li><li>Chat</li><li>Email</li>
          </ul>
          <p class="dz-note">Routine enquiries resolved on arrival; waits shortened and CSAT lifted, with people handling everything sensitive.</p>
          <a class="dz-link" href="/usecase-ivaak-customercare">Read the support story <span class="mono">→</span></a>
        </article>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>The pattern they share</h2>
      <div class="section-body">
        <p class="para">All three began with the same shape of problem. If your operation looks like this, the same approach is likely to transfer — and if it does not, we would rather say so early.</p>
      </div>
      <ul class="feature-grid">
        {#each PATTERN as p}
          <li class="feature-card"><span class="fc-dot"></span><span><strong>{p.t}</strong><br />{p.d}</span></li>
        {/each}
      </ul>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Have a use case in mind?</h2>
      <div class="section-body">
        <p class="para">Tell us the process that is taking too long today and we will tell you honestly whether it is a good first candidate, and what proving it would involve.</p>
        <p class="para">Explore the products behind these deployments: <a href="/ivaak">iVaak voice agents</a>, <a href="/iwac">iWac for WhatsApp</a>, <a href="/healthcare">healthcare solutions</a> or <a href="/contact-centre">contact centre automation</a>.</p>
      </div>
    </div>
  </section>

  <section class="page-section shade faq-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Common questions</h2>
      <div class="faq-list">
        <details class="faq-item" name="faq">
          <summary class="faq-q">Which of these is closest to your situation?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">Describe the process that is taking too long today. If one of these patterns fits, we will say so; if it does not, we will tell you that too.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">Do you only work on voice projects?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">No. These three happen to be iVaak deployments because they are the ones cleared for publication. We also deliver WhatsApp commerce, document and contract review, ticketing, ERP integration and workforce systems.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">Can we talk to a reference customer?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">Where the client has agreed to it, yes. Ask during the workshop and we will tell you plainly which references are available for your sector.</p></div>
        </details>
      </div>
    </div>
  </section>
</Layout>

<style>
  .uc-intro { margin-bottom: 44px; }
  .mono { font-family: 'IBM Plex Mono', monospace; }

  /* ── Outcome dossiers — dark instrument tiles echoing the hero artwork ── */
  .dossier { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-top: 10px; }
  .dz { position: relative; background: #0b0c0e; border: 1px solid rgba(238,47,46,.32); border-radius: 10px;
    padding: 26px 26px 24px; display: flex; flex-direction: column; gap: 18px; overflow: hidden;
    background-image: linear-gradient(rgba(238,47,46,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(238,47,46,.05) 1px, transparent 1px);
    background-size: 26px 26px; }
  .dz-c { position: absolute; width: 13px; height: 13px; border: 2px solid #ee2f2e; opacity: .85; }
  .dz-c.tl { top: 8px; left: 8px; border-right: 0; border-bottom: 0; }
  .dz-c.br { bottom: 8px; right: 8px; border-left: 0; border-top: 0; }
  .dz-head { display: grid; gap: 6px; }
  .dz-cat { font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: #ff8d8b; }
  .dz-title { margin: 0; font-size: 21px; font-weight: 700; letter-spacing: -.015em; color: #fff; }

  /* Before → after meters. Direct labels on every bar; identity by lightness, not hue. */
  .dz-meters { display: grid; gap: 12px; }
  .m-row { display: grid; grid-template-columns: 52px 1fr 48px; gap: 12px; align-items: center; }
  .m-k { font-size: 10px; letter-spacing: .16em; text-transform: uppercase; color: rgba(244,242,238,.55); }
  .m-track { height: 10px; border-radius: 5px; background: rgba(255,255,255,.1); overflow: hidden; }
  .m-fill { display: block; height: 100%; border-radius: 5px; background: rgba(255,255,255,.38);
    width: 0; transition: width 1.1s cubic-bezier(0.22,1,0.36,1) .15s; }
  .m-fill.hot { background: linear-gradient(90deg, #b81c1c, #ee2f2e); box-shadow: 0 0 12px rgba(238,47,46,.4); }
  :global(.page-section.is-in) .m-fill { width: var(--w); }
  .m-v { font-size: 13.5px; color: rgba(244,242,238,.75); text-align: right; }
  .m-v.hot-v { color: #fff; font-weight: 600; }

  /* Hero-number variant (customer care tile). */
  .dz-hero { display: flex; align-items: baseline; gap: 14px; }
  .dz-big { font-size: 58px; line-height: 1; color: #fff; }
  .dz-big-k { font-size: 14.5px; line-height: 1.4; color: rgba(244,242,238,.7); max-width: 16ch; }
  .dz-chan { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; margin: 0; padding: 0; }
  .dz-chan li { font-size: 10.5px; letter-spacing: .14em; text-transform: uppercase; color: #ff8d8b;
    border: 1px solid rgba(238,47,46,.4); border-radius: 999px; padding: 5px 12px; }

  .dz-note { margin: 0; font-size: 14.5px; line-height: 1.65; color: rgba(244,242,238,.66); }
  .dz-note strong { color: #fff; }
  .dz-link { margin-top: auto; display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
    font-size: 14.5px; font-weight: 600; color: #fff; border-bottom: 2px solid #ee2f2e; align-self: flex-start;
    padding-bottom: 3px; transition: color .2s; }
  .dz-link:hover { color: #ff8d8b; }

  @media (prefers-reduced-motion: reduce) {
    .m-fill { width: var(--w) !important; transition: none; }
  }
</style>
