<script>
  import './theme.css';
  import { onMount } from 'svelte';
  import { get3D } from './prefs.js';
  import { can3D, READY_TIMEOUT_MS } from './can3d.js';
  import Backdrop from './Backdrop.svelte';

  // Read once at construction: the switch reloads the page, so this never goes stale.
  // can3D() is a synchronous, zero-network check — a device without WebGL, or one on a
  // metered/2G connection, never requests the Three.js bundle at all.
  const no3D = !get3D() || !can3D();

  // The static backdrop is the default state. It stays up until a scene reports its
  // first rendered frame, so a slow fetch shows artwork rather than an empty box.
  let modelReady = $state(false);
  import Nav from './Nav.svelte';
  import Cursor from './Cursor.svelte';
  import Footer from './Footer.svelte';
  import { organizationSchema, websiteSchema, faqSchema, jsonLd } from './seo.js';

  // ── Content (ported verbatim from the design) ──────────────────────────
  const framework = [
    { num: '01', title: 'One-day workshop', desc: 'We sit with your team, map the processes worth automating, and leave you a scoped, priced plan — whether or not you continue with us.' },
    { num: '02', title: 'Two-week proof', desc: 'A working proof of concept on your data and your systems. Not slides — something your team can click, call and interrogate.' },
    { num: '03', title: 'Three-month delivery', desc: 'Production rollout with security review, integrations, training and a support runway. Live, measured, owned by you.' }
  ];
  // Spec B10: frame the buyer's problem before the capability. The response column
  // deliberately names a direction, not a product, and every row carries the evidence
  // discovery has to establish before anything is promised.
  const outcomes = [
    { cond: 'Repetitive specialist work', resp: 'AI-assisted or agentic workflow', ev: 'Baseline effort, eligible volume and review requirement' },
    { cond: 'Slow customer response', resp: 'Multilingual voice, chat or workflow automation', ev: 'Response baseline, completion and handoff quality' },
    { cond: 'Disconnected systems', resp: 'Controlled enterprise integration and orchestration', ev: 'Source ownership, interfaces, permissions and reconciliation' },
    { cond: 'Document and data overload', resp: 'Enterprise RAG, document intelligence or analytics', ev: 'Approved sources, retrieval quality and exception handling' },
    { cond: 'Inconsistent process decisions', resp: 'Decision support with deterministic policy and human authority', ev: 'Policy source, decision rights, quality threshold and escalation' },
  ];

  // Order matches the old iicl.in menu (AI Solutions → Services → Industries).
  const products = [
    { name: 'iCognito', tag: 'CONVERSATIONAL', desc: 'One assistant across WhatsApp, web and QR touchpoints.', href: '/icognito', acc: '#ff6361', logo: '/img/icognito.svg' },
    { name: 'iDental', tag: 'DENTAL SAAS', desc: 'Practice management for dentists and clinic owners.', href: '/idental', acc: '#ff413f', logo: '/img/idental.svg' },
    { name: 'iVaak', tag: 'VOICE AI', desc: 'Multilingual voice agents that answer, qualify and resolve calls.', href: '/ivaak', acc: '#ee2f2e', logo: '/img/ivaak.svg' },
    { name: 'TruFix', tag: 'AI TICKETING', desc: 'Ticketing that verifies resolutions instead of assuming them.', href: '/trufix', acc: '#c11514', logo: '/img/trufix.svg' },
    { name: 'iWAC', tag: 'WHATSAPP COMMERCE', desc: 'Sell, support and notify on the channel customers open.', href: '/iwac', acc: '#e35553', logo: '/img/iwac.svg' },
    { name: 'ChilliFries', tag: 'COMING SOON', desc: 'Our newest product — in build now.', href: '/chillifries', acc: '#ff7043', logo: '/img/chillifries.svg', soon: true, disabled: true },

    // Withdrawn from the site for now — pages still build, they are just unlinked.
    // { name: 'LexGenie', tag: 'LEGAL AI', desc: 'Contract and legal document review, drafting and Q&A.', href: '/lexgenie', acc: '#ff8d8b' },
    // { name: 'QuantaFin', tag: 'FINANCE', desc: 'GenAI financial analysis over filings, books and models.', href: '/quantafin', acc: '#d92a28' },
    // { name: 'PerformEdge', tag: 'WORKFORCE', desc: 'Facial-recognition attendance and workforce management.', href: '/performedge', acc: '#a01110' },
  ];
  const services = [
    { num: '01', name: 'Agentic AI', desc: 'Governed agents that work across enterprise systems.', href: '/agentic-ai' },
    { num: '02', name: 'AI & GenAI consulting', desc: 'Strategy to deployment, grounded in your data.', href: '/ai-genai-services' },
    { num: '03', name: 'Web & mobile development', desc: 'Applications built and maintained end to end.', href: '/web-mobile-dev' },
    { num: '04', name: 'WhatsApp Business API', desc: 'Commerce, support and notifications at scale.', href: '/whatsapp-business' },
    { num: '05', name: 'ERP implementation', desc: 'Selection, rollout and integration that sticks.', href: '/erp-services' },
    { num: '06', name: 'GCC technology teams', desc: 'Specialised capability, built around your roadmap.', href: '/gcc-technology-teams' },
    { num: '07', name: 'Managed IT help desk', desc: 'A help desk your users stop complaining about.', href: '/helpdesk' }
  ];
  const industries = [
    { name: 'Healthcare', href: '/healthcare' }, { name: 'Manufacturing', href: '/manufacturing' },
    { name: 'Finance', href: '/finance' }, { name: 'Banking', href: '/banking' },
    { name: 'Legal', href: '/legal' }, { name: 'Logistics', href: '/logistics' },
    { name: 'Supply chain', href: '/supply-chain' }, { name: 'Contact centre', href: '/contact-centre' },
    { name: 'HR', href: '/hr' }
  ];
  // Four Enterprise AI + four GCC, per Spec B10. The workshop pricing/credit claim that
  // used to sit here is withdrawn under the Q7 default until the commercial owner
  // confirms it is a public fixed-fee offer.
  const faqs = [
    { q: 'What enterprise AI services does IICL provide?',
      a: 'Consulting and implementation across AI agents, Generative AI applications, enterprise RAG, document intelligence, predictive analytics and intelligent automation — from identifying the use case through to a governed production service.' },
    { q: 'How does IICL identify a suitable AI use case?',
      a: 'We start from the business process rather than the technology: the current baseline, who owns the decision, what information is approved for use, which systems are involved and what a measurable improvement would look like. Some processes come out of that conversation better suited to deterministic automation than to AI.' },
    { q: 'Can IICL integrate AI with our existing enterprise systems?',
      a: 'Yes — CRM, ERP, HR and finance platforms, databases and approved knowledge repositories, cloud and identity services, and web, chat, email and voice channels. Your applications remain the systems of record; the AI works through controlled interfaces.' },
    { q: 'How are data access, security, human approval and production readiness addressed?',
      a: 'Approved data, users, systems and purposes are defined before implementation, with access control, testing, audit evidence, monitoring and human approval designed around the specific workflow. Security and compliance depend on the final architecture, your environment and your own authorised functions — no solution is secure or compliant by default.' },

    { q: 'Which technology capabilities can IICL help GCCs build?',
      a: 'AI & GenAI, Data Platforms, Cloud & SRE, Cybersecurity, Product Engineering and Enterprise Platforms. The role mix, seniority, location and assessment approach are defined against your capability roadmap.' },
    { q: 'Which engagement models are available for GCC team expansion?',
      a: 'Permanent hiring, flexible technology teams, dedicated talent pods and project-based teams. Contract-to-hire may be considered where the minimum period, conversion terms and responsibilities are agreed in advance.' },
    { q: 'How quickly can IICL provide the first qualified shortlist?',
      a: 'Shortlist timing is confirmed at requirement alignment, once the role scorecard, location, work mode, commercial range and assessment process are agreed. Niche complexity, scale, candidate availability and market conditions all affect it, so we give you a plan for your specific role rather than a general figure.' },
    { q: 'Can IICL support dedicated pods, project teams and hiring across India?',
      a: 'Yes, where the roles, scope, delivery responsibilities, interfaces and governance model can be agreed. Our primary delivery and talent relationships include Hyderabad and Bengaluru, with sourcing across India according to role fit, your location, work mode and contract scope.' },
  ];

  // Refs
  let rootEl, journeyEl, heroPanelEl, ch1El, ch2El, ch3El, ch4El;
  let m1El, m2El, m3El, m4El; // brain / voice agent / data stream / galaxy

  // ── Product explorer (galaxy stage) — hidden until "See all products" is clicked ──
  let exploring = $state(false);
  const postTo = (el, msg) => { try { if (el && el.contentWindow) el.contentWindow.postMessage(msg, '*'); } catch (e) {} };
  function enterExplore(e) {
    e.preventDefault();
    exploring = true;
    if (ch4El) ch4El.style.display = 'none';
    if (m4El) { m4El.style.pointerEvents = 'auto'; postTo(m4El, { iiclExplore: true }); }
  }
  function exitExplore() {
    if (!exploring) return;
    exploring = false;
    if (ch4El) ch4El.style.display = '';
    if (m4El) { m4El.style.pointerEvents = ''; postTo(m4El, { iiclExplore: false }); }
  }

  // Set once the page has loaded and gone idle; gates every 3D iframe fetch.
  let ready3D = false;

  onMount(() => {
    // 3D is held back until the page has loaded and the main thread is idle, so no
    // WebGL context competes with first render (Spec F7). Proximity is checked
    // separately in fadeModels — both conditions must hold before anything is fetched.
    // A scene announces its first rendered frame; until then the backdrop holds.
    let readyTimer = 0;
    const onReady = (e) => {
      if (e.data?.iiclReady) { modelReady = true; clearTimeout(readyTimer); }
    };
    if (!no3D) {
      window.addEventListener('message', onReady);
      // If nothing renders in time, stop waiting and keep the backdrop. No blank box.
      readyTimer = setTimeout(() => { ready3D = false; }, READY_TIMEOUT_MS + 4000);
    }

    const idle = window.requestIdleCallback || ((f) => setTimeout(f, 600));
    const arm3D = () => idle(() => { ready3D = true; }, { timeout: 2500 });
    if (document.readyState === 'complete') arm3D();
    else window.addEventListener('load', arm3D, { once: true });

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Reveal-on-scroll ──
    if (!reduced) {
      const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';
      const io = new IntersectionObserver((entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          io.unobserve(en.target);
          en.target.animate(
            [{ opacity: 0, transform: 'translateY(26px)' }, { opacity: 1, transform: 'translateY(0)' }],
            { duration: 800, delay: en.target._rvDelay || 0, easing: ease, fill: 'backwards' }
          );
        }
      }, { threshold: 0.12 });
      let groupCount = 0, lastTop = null;
      rootEl.querySelectorAll('[data-reveal]').forEach((el) => {
        const t = el.getBoundingClientRect().top;
        if (lastTop !== null && Math.abs(t - lastTop) < 8) groupCount++; else groupCount = 0;
        lastTop = t;
        el._rvDelay = Math.min(groupCount * 90, 450);
        io.observe(el);
      });
    }

    // ── Scroll-driven journey ──
    // With 3D switched off there are no scenes to hand between, so the journey
    // collapses to a single screen — the same shape as the reduced-motion path.
    if (reduced || no3D) {
      journeyEl.style.height = '100vh';
      [ch1El, ch2El, ch3El, ch4El].filter(Boolean).forEach((el) => { el.style.display = 'none'; });
      if (m1El) m1El.style.opacity = '1';
      return;
    }

    const smooth = (u) => (u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u));
    const journeyP = () => {
      const vh = window.innerHeight || 1;
      const total = journeyEl.offsetHeight - vh;
      return total <= 0 ? 0 : Math.max(0, Math.min(1, (window.scrollY - journeyEl.offsetTop) / total));
    };
    // Four-stage journey: brain → voice agent → delivery engine → product galaxy.
    const panels = () => [
      { el: heroPanelEl, w0: -0.1, w1: 0.15 },
      { el: ch1El, w0: 0.18, w1: 0.33 },
      { el: ch2El, w0: 0.38, w1: 0.53 },
      { el: ch3El, w0: 0.58, w1: 0.74 },
      { el: ch4El, w0: 0.8, w1: 1.05 }
    ];
    const models = () => [
      // Held back under the hero copy (H1, lede, two CTAs read over it), then back to
      // full strength for chapter 1, which only has a short headline beside it.
      { el: m1El, i0: -1, i1: 0.35, peak: (J) => 0.35 + 0.6 * smooth((J - 0.13) / 0.07) },  // brain
      { el: m2El, i0: 0.35, i1: 0.56 },  // voice agent
      { el: m3El, i0: 0.56, i1: 0.78 },  // delivery stream
      { el: m4El, i0: 0.78, i1: 9 }      // galaxy
    ];
    // Particle dissolve for the four chapter headlines: letters never move — they materialize
    // grain-by-grain in random order (and dissolve out the same way), in step with the models.
    for (const chEl of [ch1El, ch2El, ch3El, ch4El]) {
      if (!chEl) continue;
      const h = chEl.querySelector('.chapter-h2');
      if (!h) continue;
      const letters = [];
      for (const node of [...h.childNodes]) {
        if (node.nodeType !== 3) continue;
        const frag = document.createDocumentFragment();
        for (const word of node.textContent.split(/(\s+)/)) {
          if (!word.trim()) { frag.appendChild(document.createTextNode(word)); continue; }
          const w = document.createElement('span');
          w.style.cssText = 'display:inline-block;white-space:nowrap;';
          for (const chr of word) {
            const s = document.createElement('span');
            s.textContent = chr;
            s.style.display = 'inline-block';
            s._th = Math.random() * 0.8; // the point on the fade ramp where this grain condenses
            w.appendChild(s);
            letters.push(s);
          }
          frag.appendChild(w);
        }
        node.replaceWith(frag);
      }
      chEl._letters = letters;
    }

    // Tell each iframe how dispersed it should be (1 - opacity) and pause hidden ones.
    const post = (el, msg) => {
      try { if (el.contentWindow) el.contentWindow.postMessage(msg, '*'); } catch (e) {}
    };

    // Mouse: track for the custom cursor ring + forward into visible iframes.
    const mouse = { x: -100, y: -100, cx: -100, cy: -100, overLink: false, moved: false };
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.overLink = !!(e.target && e.target.closest && e.target.closest('a'));
      mouse.moved = true;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    // The global <Cursor /> draws the ring; here we only forward the pointer into the visible 3D iframes.
    const driveCursor = () => {
      if (mouse.moved) {
        mouse.moved = false;
        const p = { iiclPointer: { x: mouse.x / window.innerWidth, y: mouse.y / window.innerHeight } };
        for (const m of models()) if (!m.el._pause) post(m.el, p);
      }
    };
    // Lerp displayed opacity toward the scroll-derived target — smooths wheel steps.
    const ease = (el, target, k) => {
      el._disp = el._disp === undefined ? target : el._disp + (target - el._disp) * k;
      return el._disp;
    };
    const fadePanels = (J) => {
      for (const p of panels()) {
        const inE = smooth((J - p.w0) / 0.07);
        const outE = 1 - smooth((J - (p.w1 - 0.07)) / 0.07);
        const o = ease(p.el, Math.max(0, Math.min(inE, outE)), 0.16);
        const drift = ((1 - o) * 14).toFixed(2);
        p.el.style.opacity = o.toFixed(3);
        p.el.style.transform = p.el.classList.contains('chapter')
          ? 'translateY(calc(-50% + ' + drift + 'px))'
          : 'translateY(' + drift + 'px)';
        p.el.style.visibility = o < 0.02 ? 'hidden' : 'visible';
        // Particle dissolve: each letter condenses at its own point of the fade ramp — no movement.
        if (p.el._letters && o > 0.001) {
          for (const L of p.el._letters) {
            const lo = Math.max(0, Math.min(1, (o - L._th) / 0.18));
            L.style.opacity = (lo * lo * (3 - 2 * lo)).toFixed(2);
          }
        }
      }
    };
    // Sequential particle handoff between the REAL models: the outgoing model dissolves
    // grain-by-grain into a particle cloud (iiclScatter → the shared shader in core.js) and
    // fades BY the boundary; the incoming one starts as a scattered cloud there and condenses
    // into shape. Only the two dispersed clouds ever overlap — never two formed models.
    const fadeModels = (J) => {
      const r = journeyEl.getBoundingClientRect();
      const offscreen = r.bottom <= 0 || r.top >= (window.innerHeight || 1);
      // Nothing is fetched until the journey is within about a screen and a half of
      // view. Primary content and CTAs are usable long before any 3D context exists.
      const near = ready3D && r.top < (window.innerHeight || 1) * 1.5 && r.bottom > -(window.innerHeight || 1) * 0.5;
      for (const m of models()) {
        // Then load each model ~0.2 of scroll before it is shown, so only one 3D
        // context spins up at a time rather than four at once.
        if (near && m.el.dataset.src && J > m.i0 - 0.2) { m.el.src = m.el.dataset.src; delete m.el.dataset.src; }
        const H = 0.07; // handoff half-width in journey progress — wider = softer overlap of the two clouds
        const inE = m.i0 < 0 ? 1 : smooth((J - (m.i0 - 0.5 * H)) / (2 * H));
        const outE = m.i1 > 2 ? 1 : 1 - smooth((J - (m.i1 - 1.5 * H)) / (2 * H));
        const o = ease(m.el, Math.max(0, Math.min(inE, outE)), 0.11);
        const peak = typeof m.peak === 'function' ? m.peak(J) : (m.peak ?? 0.82);
        m.el.style.opacity = (o * peak).toFixed(3); // hold the models back so the text reads cleanly
        m.el.style.transform = 'scale(' + (0.96 + 0.04 * o).toFixed(4) + ')';
        m.el.style.visibility = o < 0.01 ? 'hidden' : 'visible';
        const pause = offscreen || o < 0.01;
        if (m.el._pause !== pause) { m.el._pause = pause; post(m.el, { iiclPause: pause }); }
        // Scatter leads the fade (pow < 1), so the dissolve is clearly visible while still opaque.
        const s = Math.round(Math.pow(1 - o, 0.6) * 100) / 100;
        if (m.el._scatter !== s) { m.el._scatter = s; post(m.el, { iiclScatter: s }); }
        // Scroll-driven zoom, mapped to each model's own stage span — every model flies in, then hands off
        // to the next while dispersing, so the stages read as one continuous motion.
        const zStart = m.i0 < 0 ? 0 : m.i0;
        const zEnd = m.i1 > 1 ? 1 : m.i1;
        const lz = Math.min(1, Math.max(0, (J - zStart) / Math.max(zEnd - zStart, 0.001)));
        const z = Math.round(lz * 100) / 100;
        if (m.el._zoom !== z) { m.el._zoom = z; post(m.el, { iiclZoom: z }); }
      }
    };
    let raf;
    const frame = () => {
      const J = journeyP();
      fadeModels(J);
      fadePanels(J);
      driveCursor();
      if (exploring && J < 0.8) exitExplore(); // scrolled away from the galaxy stage → leave explore
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // ── Stage-wise scroll snapping ──
    // After scrolling stops, glide to the nearest point so each stage lands cleanly.
    const snapJ = [0, 0.25, 0.45, 0.66, 0.92, 1]; // hero, then one stop per point
    let snapTimer, snapping = false;
    const onScrollSnap = () => {
      if (snapping) return;
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        const range = journeyEl.offsetHeight - window.innerHeight;
        if (range <= 0) return;
        const top = journeyEl.offsetTop;
        const J = (window.scrollY - top) / range;
        if (J < -0.01 || J > 1) return; // above/below the journey → free scroll
        let best = snapJ[0], bd = Infinity;
        for (const p of snapJ) { const d = Math.abs(p - J); if (d < bd) { bd = d; best = p; } }
        const targetY = Math.round(top + best * range);
        if (Math.abs(targetY - window.scrollY) > 3) {
          snapping = true;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
          setTimeout(() => { snapping = false; }, 700);
        }
      }, 150);
    };
    window.addEventListener('scroll', onScrollSnap, { passive: true });

    // The galaxy signals when the visitor scrolls past the last product — close and move on.
    const onExploreDone = (e) => {
      if (e.data && e.data.iiclExploreDone) {
        exitExplore();
        // The products section was removed — the galaxy is the product showcase now.
        // Land back on the chapter that launched it.
        ch4El?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
    window.addEventListener('message', onExploreDone);

    return () => {
      window.removeEventListener('message', onReady);
      clearTimeout(readyTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScrollSnap);
      window.removeEventListener('message', onExploreDone);
      clearTimeout(snapTimer);
    };
  });
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${jsonLd(organizationSchema(), websiteSchema(), faqSchema(faqs.map((f) => ({ q: f.q, a: f.a }))))}<\/script>`}
</svelte:head>

<div bind:this={rootEl} class="iicl-root">
  <!-- Spec G14: a skip link, and a real <main> landmark for the page content. -->
  <a class="skip-link" href="#main">Skip to main content</a>
  <Cursor />
  {#if exploring}
    <button class="explore-exit" onclick={exitExplore}>✕ Exit product view</button>
  {/if}
  <!-- Sticky nav (shared) -->
  <Nav />

  <!-- Journey (scroll-driven hero) -->
  <!-- id="products": the galaxy stage IS the product showcase now that the old
       products grid is gone, and /#products is linked from other pages. -->
  <main id="main">
  <div id="products" bind:this={journeyEl} class="journey">
    <div class="journey-stage">
      <div class="journey-glow"></div>
      {#if no3D}
        <!-- No WebGL, a metered connection, or models switched off: one still
             backdrop, and no iframe is ever created — nothing is fetched. -->
        <div class="journey-model journey-flat"><Backdrop label="Enterprise AI, illustrated" /></div>
      {:else}
        <!-- Base layer. The 3D iframes are transparent and paint over this; it only
             fades once a scene reports its first frame, so a slow connection shows
             artwork throughout rather than an empty box. -->
        <div class="journey-model journey-flat journey-holding" class:is-gone={modelReady} aria-hidden={modelReady}>
          <Backdrop label="Enterprise AI, illustrated" />
        </div>
        <iframe bind:this={m1El} data-src="hologram.html?transparent=1&ui=0" title="AI brain hologram 3D model" loading="lazy" class="journey-model" style="opacity:1;"></iframe>
        <iframe bind:this={m2El} data-src="voice-agent.html?transparent=1&ui=0" title="AI voice agent 3D model" class="journey-model" style="opacity:0;"></iframe>
        <iframe bind:this={m3El} data-src="data-stream.html?transparent=1&ui=0" title="Global delivery stream 3D model" class="journey-model" style="opacity:0;"></iframe>
        <iframe bind:this={m4El} data-src="galaxy.html?transparent=1&ui=0" title="Product galaxy 3D model" class="journey-model" style="opacity:0;"></iframe>
      {/if}
      <div class="journey-vignette"></div>

      <div bind:this={heroPanelEl} class="hero-panel">
        <div class="eyebrow">
          <span class="tick"></span>
          <span class="eyebrow-text">Intelligence India.Com Limited · India &amp; USA</span>
          <span class="tick"></span>
        </div>
        <span class="hero-brand">Enterprise AI, delivered.</span>
        <h1 class="hero-h1">Enterprise AI Solutions That Move from Pilot to Production</h1>
        <p class="hero-lede">
          IICL delivers secure enterprise AI solutions from discovery and Proof of Value
          through governed production — across Agentic AI, multilingual voice AI and
          intelligent business workflows.
        </p>
        <div class="hero-actions">
          <a href="/contactus?intent=ai-discovery-workshop" class="cta">Book an AI Discovery Workshop <span class="mono">→</span></a>
          <a href="/gcc-technology-teams" class="ghost">Explore GCC Technology Teams</a>
        </div>
        <span class="scroll-hint">SCROLL ↓</span>
      </div>

      <div bind:this={ch1El} class="chapter chapter-left">
        <div class="chapter-eyebrow">
          <span class="tick"></span>
          <span class="chapter-kicker">01 — Agentic AI</span>
        </div>
        <h2 class="chapter-h2">Agents that do the work, not just the talking.</h2>
        <p class="chapter-p">Agents that complete multi-step work across your ERP, help desk and CRM — inside a defined authority boundary, with material actions traceable.</p>
        <a href="/agentic-ai" class="chapter-link">Agentic AI services <span class="mono">→</span></a>
      </div>

      <div bind:this={ch2El} class="chapter chapter-right">
        <div class="chapter-eyebrow chapter-eyebrow-right">
          <span class="chapter-kicker">02 — Voice AI</span>
          <span class="tick"></span>
        </div>
        <h2 class="chapter-h2">Every call answered, in the languages your customers use.</h2>
        <p class="chapter-p">iVaak picks up in your customer's language, qualifies, resolves and hands off with a transcript — around the clock.</p>
        <a href="/ivaak" class="chapter-link">Meet iVaak <span class="mono">→</span></a>
      </div>

      <div bind:this={ch3El} class="chapter chapter-left">
        <div class="chapter-eyebrow">
          <span class="tick"></span>
          <span class="chapter-kicker">03 — Global network</span>
        </div>
        <h2 class="chapter-h2">Two continents. One delivery engine.</h2>
        <p class="chapter-p">Hyderabad builds, Raleigh delivers — one connected network shipping enterprise AI around the clock, in your time zone.</p>
        <a href="/aboutus" class="chapter-link">About IICL <span class="mono">→</span></a>
      </div>

      <div bind:this={ch4El} class="chapter chapter-right">
        <div class="chapter-eyebrow chapter-eyebrow-right">
          <span class="chapter-kicker">04 — At scale</span>
          <span class="tick"></span>
        </div>
        <h2 class="chapter-h2">A product suite, across the industries we serve.</h2>
        <p class="chapter-p">Delivered from Hyderabad and Raleigh — WhatsApp commerce, legal AI, workforce, finance and more, run in production for enterprise and mid-market teams.</p>
        <a href="#journey" class="chapter-link" onclick={enterExplore}>See all products <span class="mono">→</span></a>
      </div>
    </div>
  </div>

  <!-- Trust. Spec B10: with no approved customer logos, this is an industry-and-
       capability strip - never placeholders, and never "trusted by" beside unapproved marks. -->
  <div class="section section-white">
    <div class="wrap">
      <div data-reveal class="section-head">
        <div class="label-row"><span class="tick"></span><span class="label">Where we work</span></div>
        <h2 class="section-h2">Trusted across enterprise technology and industry workflows.</h2>
        <p class="section-lede">IICL designs AI solutions, specialist technology teams and digital capability around defined business requirements.</p>
      </div>
      <ul data-reveal class="trust-strip">
        {#each industries as ind}<li><a href={ind.href}>{ind.name}</a></li>{/each}
      </ul>
    </div>
  </div>

  <!-- Company definition - one clear statement of what IICL is (Spec B5 section 3). -->
  <div class="section section-grey">
    <div class="wrap">
      <div data-reveal class="section-head">
        <div class="label-row"><span class="tick"></span><span class="label">Who we are</span></div>
        <h2 class="section-h2">Intelligence India.Com Limited: enterprise AI engineering and implementation.</h2>
      </div>
      <div data-reveal class="def-body">
        <p class="def-p">IICL helps organisations identify, design, validate and operate enterprise AI solutions. Our work connects business workflows with approved data, enterprise applications, human decision rights and measurable operating outcomes.</p>
        <p class="def-p">We combine AI engineering, enterprise integration, specialised technology capability and product innovation through teams in Hyderabad, India and Raleigh, North Carolina, USA.</p>
      </div>
    </div>
  </div>

  <!-- Business outcomes - the problem before the capability (Spec B5 section 4). -->
  <div class="section section-white">
    <div class="wrap">
      <div data-reveal class="section-head">
        <div class="label-row"><span class="tick"></span><span class="label">Where it pays</span></div>
        <h2 class="section-h2 section-h2-wide">Where enterprise AI can remove delay, rework and manual coordination.</h2>
      </div>
      <ul class="outcomes">
        {#each outcomes as o}
          <li data-reveal class="outcome">
            <span class="outcome-cond">{o.cond}</span>
            <span class="outcome-resp">{o.resp}</span>
            <span class="outcome-ev mono">Evidence to establish - {o.ev}</span>
          </li>
        {/each}
      </ul>
      <p data-reveal class="framework-qualify">
        The right answer may be Agentic AI, Generative AI, analytics, deterministic
        automation or a human-led process. We recommend the simplest approach that can
        meet the approved outcome and control requirements.
      </p>
    </div>
  </div>

  <!-- Two equal commercial pathways (Spec A1, B10). Equal area, equal heading level,
       equal CTA weight — the GCC route is not a secondary service card. -->
  <div id="pathways" class="section section-white">
    <div class="wrap">
      <div data-reveal class="section-head">
        <div class="label-row"><span class="tick"></span><span class="label">Two enterprise growth paths</span></div>
        <h2 class="section-h2 section-h2-wide">Build Enterprise AI. Expand GCC technology capability.</h2>
      </div>
      <div class="paths">
        <article data-reveal class="path">
          <h3 class="path-h">Enterprise AI Solutions</h3>
          <p class="path-p">Identify, validate and implement enterprise AI across approved workflows, data and systems — from discovery and Proof of Value to governed production.</p>
          <a class="path-cta" href="/ai-genai-services">Explore Enterprise AI Solutions <span class="mono">→</span></a>
        </article>
        <article data-reveal class="path">
          <h3 class="path-h">GCC Technology Teams</h3>
          <p class="path-p">Build specialised technology capability across AI &amp; GenAI, Data Platforms, Cloud &amp; SRE, Cybersecurity, Product Engineering and Enterprise Platforms.</p>
          <a class="path-cta" href="/gcc-technology-teams">Explore GCC Technology Teams <span class="mono">→</span></a>
        </article>
      </div>
    </div>
  </div>

  <!-- Services -->
  <div id="services" class="section section-grey">
    <div class="wrap">
      <div data-reveal class="section-head">
        <div class="label-row"><span class="tick"></span><span class="label">Services</span></div>
        <h2 class="section-h2">Built with you, run for you.</h2>
        <p class="statement">Strategy, build and operations under one roof — <em>so nothing falls through the gaps between vendors.</em></p>
        <p class="section-lede">The delivery lines behind every engagement.</p>
      </div>
      <!-- Two columns of hairline rows — a different rhythm from the product index. -->
      <div class="svc-cols">
        {#each services as s}
          <a href={s.href} data-reveal class="svc-row">
            <span class="mono svc-num">{s.num}</span>
            <span class="svc-body">
              <span class="svc-name">{s.name}</span>
              <span class="svc-desc">{s.desc}</span>
            </span>
            <span class="mono svc-go">→</span>
          </a>
        {/each}
        <p data-reveal class="svc-note">
          More service lines in build.
          <a class="cta-link" href="/contactus">Talk to our solutions team <span class="arw">→</span></a>
        </p>
      </div>

      <!-- Industries used to own a whole section of its own. As a strip inside
           Services it stays discoverable without costing another screen. -->
      <div id="industries" data-reveal class="ind-strip">
        <span class="mono ind-strip-k">Industries we already work in</span>
        <div class="ind-chips">
          {#each industries as ind}
            <a href={ind.href} class="ind-chip">{ind.name}</a>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- How we work: the 1-2-3 framework, with the numbers that stand behind it.
       The counts that used to sit here are withdrawn under the Q3 default. -->
  <div class="section section-white">
    <div class="wrap">
      <div data-reveal class="section-head">
        <div class="label-row"><span class="tick"></span><span class="label">How we work</span></div>
        <h2 class="section-h2 section-h2-wide">From discovery to Proof of Value and production.</h2>
      </div>
      <!-- Three steps on one track: a rule runs through the numerals left to right. -->
      <ol class="track">
        {#each framework as f}
          <li data-reveal class="step">
            <span class="mono step-num">{f.num}</span>
            <span class="step-title">{f.title}</span>
            <span class="step-desc">{f.desc}</span>
          </li>
        {/each}
      </ol>
      <!-- Spec B2/B10 require this qualification wherever the planning framework is
           shown. Without it the strip reads as a universal delivery guarantee. -->
      <p data-reveal class="framework-qualify">
        Scope, readiness, evaluation requirements and organisational approvals determine
        the final delivery plan. This is a planning framework confirmed after discovery,
        not a universal implementation guarantee.
      </p>
    </div>
  </div>

  <!-- Proof. Spec B10 requires baseline, scope, period, method and approval before any
       number is published. Until that evidence is approved the section says so plainly
       rather than showing a figure nobody can stand behind. -->
  <div class="section section-grey">
    <div class="wrap">
      <div data-reveal class="section-head">
        <div class="label-row"><span class="tick"></span><span class="label">Evidence</span></div>
        <h2 class="section-h2">Evidence from real enterprise work.</h2>
      </div>
      <div data-reveal class="def-body">
        <p class="def-p">We publish a result only with the baseline it moved from, the scope and users it covered, the period it was measured over, how it was calculated, and the customer approval to say so. Anything short of that is an estimate, and we will describe it as one.</p>
        <p class="def-p proof-pending"><span class="mono">Measures to define during discovery.</span></p>
        <p class="def-p"><a class="path-cta" href="/blog">Read how we scope and govern this work <span class="mono">-&gt;</span></a></p>
      </div>
    </div>
  </div>

  <!-- Delivery presence (Spec B10). States where the teams are without claiming a
       round-the-clock capability or a delivery split that is not yet verified (Q5). -->
  <div class="section section-white">
    <div class="wrap">
      <div data-reveal class="section-head">
        <div class="label-row"><span class="tick"></span><span class="label">Delivery presence</span></div>
        <h2 class="section-h2">Enterprise delivery from Hyderabad and Raleigh.</h2>
      </div>
      <div data-reveal class="def-body">
        <p class="def-p">IICL supports enterprise solution design and delivery through teams in Hyderabad, India and Raleigh, North Carolina, USA. The engagement model, working hours, onsite requirements and service responsibilities are confirmed for each scope.</p>
      </div>
    </div>
  </div>

  <!-- FAQ -->
  <div class="section section-grey">
    <div class="wrap faq-wrap">
      <div data-reveal>
        <div class="label-row"><span class="tick"></span><span class="label">FAQ</span></div>
        <h2 class="section-h2 section-h2-m0">Before you write to us.</h2>
      </div>
      <div data-reveal class="faq-list">
        {#each faqs as q}
          <details class="faq-item">
            <summary class="faq-q">{q.q}<span class="mono faq-plus">+</span></summary>
            <p class="faq-a">{q.a}</p>
          </details>
        {/each}
        <div class="faq-cap"></div>
      </div>
    </div>
  </div>

  <!-- CTA -->
  <div class="section-dark">
    <div class="wrap cta-wrap">
      <div data-reveal class="cta-inner">
        <span class="mono cta-kicker">Choose the outcome you want to advance</span>
        <h2 class="cta-h2">Start with one AI workflow, or one GCC capability requirement.</h2>
        <p class="cta-p">We will help define the appropriate discovery, assessment, team model and next-step evidence.</p>

        <!-- Neither path may be visually secondary (Spec B10). -->
        <div class="conv">
          <article class="conv-card">
            <h3 class="conv-h">AI Discovery</h3>
            <p class="conv-p">Bring the business function, the current process and the outcome you want to move.</p>
            <a href="/contactus?intent=ai-discovery-workshop" class="cta">Book an AI Discovery Workshop <span class="mono">→</span></a>
          </article>
          <article class="conv-card">
            <h3 class="conv-h">GCC Team Expansion</h3>
            <p class="conv-p">Bring the capability domain, role or team requirement, location, engagement model and target start window.</p>
            <a href="/contactus?intent=gcc-team-expansion" class="cta">Plan Your GCC Team Expansion <span class="mono">→</span></a>
          </article>
        </div>

        <p class="conv-safety">
          Please do not submit passwords, API keys, personal records, production data,
          security vulnerabilities or confidential architecture documents through the
          website form.
        </p>
      </div>
    </div>
  </div>

  </main>

  <Footer />
</div>

<style>
  /* Off-screen until focused, then a solid, readable target. */
  :global(.skip-link) { position: absolute; left: 8px; top: -60px; z-index: 200;
    padding: 10px 18px; background: #ee2f2e; color: #fff; text-decoration: none;
    font-size: 14px; font-weight: 600; border-radius: 0 0 6px 6px; transition: top .18s ease; }
  :global(.skip-link:focus) { top: 0; }
  .iicl-root { width: 100%; background: #070707; font-family: var(--font); color: #f4f2ee; }
  .mono { font-family: var(--font-mono); }
  a { color: #f4f2ee; }

  /* Product explorer exit */
  .explore-exit { position: fixed; top: 84px; right: 28px; z-index: 46; background: rgba(10,10,10,0.85); color: #f4f2ee;
    border: 1px solid rgba(238,47,46,0.5); padding: 10px 18px; font: inherit; font-size: 13.5px; cursor: pointer;
    border-radius: 4px; backdrop-filter: blur(8px); transition: background .2s; }
  .explore-exit:hover { background: #b81c1c; }

  /* Shared CTA / ghost buttons */
  .cta { display: inline-flex; align-items: center; gap: 10px; background: #ee2f2e; color: #fff; text-decoration: none; font-weight: 600; font-size: 16px; padding: 16px 32px; transition: background .2s; }
  .cta:hover { background: #d61f1e; }
  .ghost { display: inline-flex; align-items: center; color: #f3f3f4; text-decoration: none; font-weight: 500; font-size: 16px; padding: 15px 32px; border: 1px solid rgba(243,243,244,0.28); transition: border-color .2s, color .2s; }
  .ghost:hover { border-color: rgba(243,243,244,0.6); color: #fff; }

  /* Custom cursor over the journey */

  /* Journey */
  /* Four stages. Height sets how much scroll each stage gets — the stage windows are
     fractions of progress, so shortening this paces them proportionally rather than
     dropping any. Was 620vh, which alone was over half the page's scroll. */
  .journey { height: 460vh; position: relative; background: #0a0a0a; }
  .journey-stage { position: sticky; top: 0; height: 100vh; min-height: 620px; overflow: hidden; cursor: none; background: radial-gradient(100% 100% at 50% 40%, #141414 0%, #0a0a0a 55%, #050505 100%); }
  .journey-stage a { cursor: none; }
  .journey-glow { position: absolute; top: 12%; left: 22%; right: 22%; height: 74%; background: radial-gradient(ellipse at center, rgba(238,47,46,0.09) 0%, rgba(238,47,46,0) 62%); pointer-events: none; }
  .journey-model { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; pointer-events: none; background: transparent; }
  .journey-flat { overflow: hidden; }
  /* Holds the stage until a scene renders; fades out once one does. */
  .journey-holding { transition: opacity .55s ease; }
  .journey-holding.is-gone { opacity: 0; }
  .journey-vignette { position: absolute; inset: 0; background: radial-gradient(130% 100% at 50% 50%, rgba(0,0,0,0) 62%, rgba(3,3,3,0.65) 100%); pointer-events: none; }

  .hero-panel { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 72px 32px 0; box-sizing: border-box; pointer-events: none; }
  .eyebrow { display: flex; align-items: center; gap: 12px; margin-bottom: 22px; }
  .tick { width: 26px; height: 2px; background: #ee2f2e; }
  .eyebrow-text { font-family: var(--font-mono); font-size: 12.5px; font-weight: 500; letter-spacing: 0.24em; text-transform: uppercase; color: rgba(243,243,244,0.6); }
  /* The approved brand line stays visible without becoming a second H1 (Spec B8). */
  .hero-brand { display: block; font-size: clamp(15px, 1.5vw, 19px); font-weight: 500;
    letter-spacing: .01em; color: rgba(244,242,238,.72); margin-bottom: 14px; }
  .hero-h1 { font-weight: 600; font-size: clamp(34px, 4.6vw, 62px); line-height: 1.06; letter-spacing: -0.025em; margin: 0 0 20px; max-width: 20ch; color: #fff; text-wrap: balance; text-shadow: 0 2px 40px rgba(12,17,23,0.8); }
  .hero-lede { font-size: clamp(17px, 1.5vw, 20px); line-height: 1.6; color: rgba(243,243,244,0.68); max-width: 46ch; margin: 0 0 36px; text-wrap: pretty; text-shadow: 0 1px 24px rgba(12,17,23,0.9); }
  .hero-actions { display: flex; align-items: center; gap: 14px; pointer-events: auto; }
  .scroll-hint { position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%); font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.22em; color: rgba(243,243,244,0.45); }

  .chapter { position: absolute; top: 50%; transform: translateY(-50%); max-width: 400px; opacity: 0; pointer-events: none; }
  .chapter-left { left: max(var(--wrap-pad), calc(50% - 580px)); }
  .chapter-right { right: max(var(--wrap-pad), calc(50% - 580px)); text-align: right; }
  .chapter-eyebrow { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
  .chapter-eyebrow-right { justify-content: flex-end; }
  .chapter-kicker { font-family: var(--font-mono); font-size: 12.5px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(243,243,244,0.6); }
  .chapter-h2 { font-weight: 600; font-size: clamp(28px, 3vw, 42px); line-height: 1.1; letter-spacing: -0.02em; margin: 0 0 16px; color: #fff; text-wrap: balance; }
  .chapter-p { font-size: 17px; line-height: 1.65; color: rgba(243,243,244,0.68); margin: 0 0 24px; text-wrap: pretty; }
  .chapter-link { pointer-events: auto; display: inline-flex; align-items: center; gap: 8px; color: #fff; text-decoration: none; font-weight: 600; font-size: 15.5px; border-bottom: 2px solid #ee2f2e; padding-bottom: 4px; transition: color .2s; }
  .chapter-right .chapter-link { justify-content: flex-end; }
  .chapter-link:hover { color: #ee2f2e; }

  /* Generic sections — light theme (everything below the hero is white) */
  .section { --ink: #16171a; --muted: #55585e; --line: #e6e3de; color: var(--ink); }
  .section-white { background: #ffffff; }
  .section-grey { background: #f7f6f3; }
  .section-dark { background: #f2f1ee; --ink: #16171a; --muted: #55585e; --line: #e0ddd7; color: var(--ink); border-top: 1px solid #e6e3de; border-bottom: 1px solid #e6e3de; }
  .wrap { max-width: var(--wrap-max); margin: 0 auto; padding: var(--space-section) var(--wrap-pad); box-sizing: border-box; }
  .section-head { max-width: 68ch; }
  .label-row { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
  .label { font-family: var(--font-mono); font-size: 11.5px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #ee2f2e; }
  .section-h2 { font-weight: var(--w-heading); font-size: var(--fs-h2); line-height: 1.22; letter-spacing: -0.02em; margin: 0 0 var(--space-head); color: var(--ink); text-wrap: balance; }
  .section-h2-wide { margin-bottom: 34px; }
  .section-h2-m0 { margin: 0; }

  .trust-strip { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
  .trust-strip a { display: inline-block; padding: 8px 15px; border: 1px solid #e6e3de; border-radius: 999px;
    font-size: 14px; color: #40434a; text-decoration: none; transition: border-color .2s, color .2s; }
  .trust-strip a:hover { border-color: #ee2f2e; color: #b81c1c; }

  .def-body { max-width: 78ch; display: grid; gap: 12px; }
  .def-p { margin: 0; font-size: var(--fs-body); line-height: 1.7; color: #40434a; }
  .proof-pending { color: #55585e; padding-left: 14px; border-left: 2px solid #e6e3de; }

  .outcomes { list-style: none; margin: 0; padding: 0; display: grid; gap: 1px;
    background: #e6e3de; border: 1px solid #e6e3de; border-radius: 8px; overflow: hidden; }
  .outcome { background: #fff; padding: 18px 20px; display: grid;
    grid-template-columns: minmax(180px, 0.9fr) minmax(200px, 1.2fr) minmax(200px, 1.1fr);
    gap: 6px 24px; align-items: baseline; }
  .outcome-cond { font-size: 15.5px; font-weight: var(--w-heading); color: #16171a; }
  .outcome-resp { font-size: 14.5px; line-height: 1.55; color: #40434a; }
  .outcome-ev { font-size: 11.5px; line-height: 1.5; color: #55585e; }
  

  /* -- Two equal commercial pathways. Identical cards: the equality is the point. ── */
  .paths { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .path { border: 1px solid var(--line, #e6e3de); border-radius: 12px; padding: 28px; background: #fff;
    display: flex; flex-direction: column; gap: 12px; transition: border-color .25s, transform .25s; }
  .path:hover { border-color: #ee2f2e; transform: translateY(-3px); }
  .path-h { margin: 0; font-size: clamp(20px, 2vw, 25px); font-weight: var(--w-heading); color: #16171a; letter-spacing: -.02em; }
  .path-p { margin: 0; font-size: var(--fs-body); line-height: 1.65; color: #40434a; flex: 1; }
  .path-cta { display: inline-flex; align-items: center; gap: 9px; margin-top: 4px;
    color: #b81c1c; font-weight: 600; font-size: 15.5px; text-decoration: none; }
  .path-cta:hover { text-decoration: underline; }

  /* The planning framework never appears without its qualification. */
  .framework-qualify { margin: 30px 0 0; max-width: 82ch; font-size: var(--fs-small);
    line-height: 1.65; color: #55585e; padding-left: 14px; border-left: 2px solid #e6e3de; }

  /* ── Closing conversion: two equal paths, not a primary and a fallback. ── */
  .conv { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin: 30px 0 22px; text-align: left; }
  .conv-card { border: 1px solid rgba(255,255,255,.16); border-radius: 12px; padding: 24px;
    display: flex; flex-direction: column; gap: 10px; transition: border-color .25s; }
  .conv-card:hover { border-color: rgba(238,47,46,.6); }
  .conv-h { margin: 0; font-size: 19px; font-weight: var(--w-heading); color: #fff; }
  .conv-p { margin: 0; font-size: 14.5px; line-height: 1.6; color: rgba(244,242,238,.66); flex: 1; }
  .conv-card .cta { align-self: flex-start; font-size: 15px; padding: 13px 22px; }
  .conv-safety { margin: 0; font-size: 12.5px; line-height: 1.6; color: rgba(244,242,238,.5); max-width: 78ch; }
  .section-lede { font-size: var(--fs-body); font-weight: var(--w-body); line-height: 1.65; color: var(--muted); margin: 0 0 32px; max-width: 62ch; text-wrap: pretty; }

  /* Services — two columns of hairline rows, deliberately a different rhythm. */
  .svc-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0 56px; }
  .svc-row { display: grid; grid-template-columns: 34px 1fr 20px; align-items: baseline; gap: 16px;
    padding: 20px 0; text-decoration: none; color: var(--ink); border-top: 1px solid var(--line);
    transition: color .2s; }
  .svc-row:hover { color: #b81c1c; }
  .svc-num { font-size: 11.5px; letter-spacing: .16em; color: #ee2f2e; }
  .svc-body { display: flex; flex-direction: column; gap: 6px; }
  .svc-name { font-size: 18px; font-weight: 600; letter-spacing: -0.01em; }
  .svc-desc { font-size: 14.5px; line-height: 1.55; color: var(--muted); }
  .svc-go { font-size: 14px; color: #ee2f2e; opacity: 0; transition: opacity .2s, transform .2s; transform: translateX(-5px); }
  .svc-row:hover .svc-go { opacity: 1; transform: none; }
  .svc-note { grid-column: 1 / -1; margin: 24px 0 0; padding-top: 20px; border-top: 1px solid var(--line);
    display: flex; flex-wrap: wrap; align-items: center; gap: 8px 18px;
    font-size: 15px; color: var(--muted); }

  /* Framework — three steps threaded by one horizontal rule through the numerals. */
  .track { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 44px; }
  .step { position: relative; display: flex; flex-direction: column; gap: 14px; padding-top: 62px; }
  /* The rule: sits at the numeral's vertical centre and runs to the next step. */
  .step::before { content: ''; position: absolute; top: 21px; left: 52px; right: -44px; height: 1px; background: var(--line); }
  .step:last-child::before { display: none; }
  .step-num { position: absolute; top: 0; left: 0; width: 42px; height: 42px; display: grid; place-items: center;
    font-size: 14px; color: #ee2f2e; border: 1px solid #ee2f2e; border-radius: 50%; background: #fff; }
  .step-title { font-size: 21px; font-weight: 600; color: var(--ink); letter-spacing: -0.01em; }
  .step-desc { font-size: 15.5px; line-height: 1.6; color: var(--muted); }

  /* Stats — now a row under the framework rather than a section of their own. */

  /* Industries — a chip strip inside Services, not a section of its own. */
  .ind-strip { margin-top: 34px; padding-top: 26px; border-top: 1px solid var(--line); }
  .ind-strip-k { display: block; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 14px; }
  .ind-chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .ind-chip { font-size: 14.5px; font-weight: 400; color: var(--ink); text-decoration: none; background: #fff;
    border: 1px solid var(--line); border-radius: 999px; padding: 8px 16px;
    transition: border-color .2s, color .2s, background .2s; }
  .ind-chip:hover { border-color: #ee2f2e; color: #fff; background: #ee2f2e; }

  /* FAQ */
  .faq-wrap { display: grid; grid-template-columns: 1fr 1.6fr; gap: 64px; }
  .faq-list { display: flex; flex-direction: column; }
  .faq-item { border-top: 1px solid var(--line); padding: 0; }
  .faq-q { cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 24px; padding: 20px 0; font-size: 17px; font-weight: 600; color: var(--ink); }
  .faq-q::-webkit-details-marker { display: none; }
  .faq-plus { color: #ee2f2e; }
  .faq-a { margin: 0; padding: 0 0 22px; font-size: 15.5px; line-height: 1.65; color: var(--muted); max-width: 62ch; }
  .faq-cap { border-top: 1px solid var(--line); }

  /* CTA */
  .cta-wrap { text-align: center; display: flex; flex-direction: column; align-items: center; }
  .cta-inner { display: flex; flex-direction: column; align-items: center; }
  .cta-kicker { font-size: 12.5px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #ee2f2e; margin-bottom: 20px; }
  .cta-h2 { font-weight: 600; font-size: clamp(30px, 3.6vw, 46px); line-height: 1.12; letter-spacing: -0.02em; margin: 0 0 20px; color: var(--ink); max-width: 24ch; text-wrap: balance; }
  .cta-p { font-size: 17px; line-height: 1.6; color: var(--muted); max-width: 52ch; margin: 0 0 36px; text-wrap: pretty; }

  /* ── Responsive. The homepage had no breakpoints at all: every grid was a fixed
     column count, so it overflowed below ~900px. ── */
  
  /* Tablet / iPad: the journey keeps its animation but needs a shorter scroll and
     chapters that sit inside the gutter rather than against a 580px half-measure. */
  
  
</style>
