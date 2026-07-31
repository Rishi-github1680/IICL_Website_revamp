<script>
  import { INDUSTRIES } from './menu.js';
  import './theme.css';
  import { onMount } from 'svelte';
  import { get3D } from './prefs.js';
  import { can3D, READY_TIMEOUT_MS } from './can3d.js';
  import { snapStory } from './scrollsnap.js';
  import Backdrop from './Backdrop.svelte';

  // Read once at construction: the switch reloads the page, so this never goes stale.
  // can3D() is a synchronous, zero-network check — a device without WebGL, or one on a
  // metered/2G connection, never requests the Three.js bundle at all.
  const no3D = !get3D() || !can3D();

  // The static backdrop is the default state. It stays up until a scene reports its
  // first rendered frame, so a slow fetch shows artwork rather than an empty box.
  let modelReady = $state(false);

  // Per-deploy cache-buster for the model iframe URLs (injected by vite.config.js).
  // Vercel's CDN caches the rarely-changing model .html with its old security headers;
  // a fresh ?b= key per deploy forces those pages to be re-served with current headers.
  const BUILD_ID = typeof __BUILD_ID__ !== 'undefined' ? __BUILD_ID__ : 'dev';
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
  // From the shared registry, so the strip cannot drift from the nav or the sitemap.
  const industries = INDUSTRIES.map((i) => ({ name: i.label, href: i.href, icon: i.icon }));
  // Four Enterprise AI + four GCC, per Spec B10. The workshop pricing/credit claim that
  // used to sit here is withdrawn under the Q7 default until the commercial owner
  // confirms it is a public fixed-fee offer.
  const faqs = [
    { q: 'What enterprise AI services does IICL provide?', group: 'Enterprise AI',
      a: 'Consulting and implementation across AI agents, Generative AI applications, enterprise RAG, document intelligence, predictive analytics and intelligent automation — from identifying the use case through to a governed production service.' },
    { q: 'How does IICL identify a suitable AI use case?', group: 'Enterprise AI',
      a: 'We start from the business process rather than the technology: the current baseline, who owns the decision, what information is approved for use, which systems are involved and what a measurable improvement would look like. Some processes come out of that conversation better suited to deterministic automation than to AI.' },
    { q: 'Can IICL integrate AI with our existing enterprise systems?', group: 'Enterprise AI',
      a: 'Yes — CRM, ERP, HR and finance platforms, databases and approved knowledge repositories, cloud and identity services, and web, chat, email and voice channels. Your applications remain the systems of record; the AI works through controlled interfaces.' },
    { q: 'How are data access, security, human approval and production readiness addressed?', group: 'Enterprise AI',
      a: 'Approved data, users, systems and purposes are defined before implementation, with access control, testing, audit evidence, monitoring and human approval designed around the specific workflow. Security and compliance depend on the final architecture, your environment and your own authorised functions — no solution is secure or compliant by default.' },

    { q: 'Which technology capabilities can IICL help GCCs build?', group: 'GCC Technology Teams',
      a: 'AI & GenAI, Data Platforms, Cloud & SRE, Cybersecurity, Product Engineering and Enterprise Platforms. The role mix, seniority, location and assessment approach are defined against your capability roadmap.' },
    { q: 'Which engagement models are available for GCC team expansion?', group: 'GCC Technology Teams',
      a: 'Permanent hiring, flexible technology teams, dedicated talent pods and project-based teams. Contract-to-hire may be considered where the minimum period, conversion terms and responsibilities are agreed in advance.' },
    { q: 'How quickly can IICL provide the first qualified shortlist?', group: 'GCC Technology Teams',
      a: 'Shortlist timing is confirmed at requirement alignment, once the role scorecard, location, work mode, commercial range and assessment process are agreed. Niche complexity, scale, candidate availability and market conditions all affect it, so we give you a plan for your specific role rather than a general figure.' },
    { q: 'Can IICL support dedicated pods, project teams and hiring across India?', group: 'GCC Technology Teams',
      a: 'Yes, where the roles, scope, delivery responsibilities, interfaces and governance model can be agreed. Our primary delivery and talent relationships include Hyderabad and Bengaluru, with sourcing across India according to role fit, your location, work mode and contract scope.' },
  ];

  // Refs
  let rootEl, journeyEl, heroPanelEl, ch1El, ch2El, ch3El, ch4El;
  let glowEl; // the stage glow, driven per frame so it can breathe at handoffs
  let m1El, m2El, m3El, m4El; // brain / voice agent / data stream / galaxy

  // ── Product explorer (galaxy stage) — hidden until "See all products" is clicked ──
  let exploring = $state(false);
  const postTo = (el, msg) => { try { if (el && el.contentWindow) el.contentWindow.postMessage(msg, '*'); } catch (e) {} };
  function enterExplore(e) {
    e.preventDefault();
    exploring = true;
    if (ch4El) ch4El.style.display = 'none';
    if (m4El) { m4El.style.pointerEvents = 'auto'; postTo(m4El, { iiclExplore: true }); }
    // "See all products" sits in the last chapter, whose window runs slightly past the
    // point where the sticky stage releases — so clicking it late left the galaxy (and
    // the product card inside it) already scrolling off the top of the screen. Park on
    // the last position where the stage still fills the viewport, so product view
    // always opens full-bleed.
    if (journeyEl) {
      const top = journeyEl.offsetTop + journeyEl.offsetHeight - window.innerHeight;
      if (window.scrollY > top - 4) window.scrollTo({ top, behavior: 'smooth' });
    }
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
      if (!e.data?.iiclReady) return;
      modelReady = true;
      clearTimeout(readyTimer);
      // The scene that just booted missed every message posted while it was still
      // loading — including the scatter state that makes it a cloud rather than a
      // formed model. Identify it by source and replay its current state, so it joins
      // the story exactly where the scroll says it should be.
      for (const el of [m1El, m2El, m3El, m4El]) {
        if (el && e.source === el.contentWindow) {
          if (el._scatter !== undefined) postTo(el, { iiclScatter: el._scatter });
          if (el._zoom !== undefined) postTo(el, { iiclZoom: el._zoom });
          if (el._pause !== undefined) postTo(el, { iiclPause: el._pause });
        }
      }
    };
    if (!no3D) {
      window.addEventListener('message', onReady);
      // If nothing renders in time, stop waiting and keep the backdrop. No blank box.
      readyTimer = setTimeout(() => { ready3D = false; }, READY_TIMEOUT_MS + 4000);
    }

    // Settle onto a stage when scrolling stops, so a chapter is never left frozen
    // half-way through its transition. Centres of the hero + four chapter windows.
    const stopSnap = snapStory(journeyEl, [0.02, 0.255, 0.455, 0.66, 0.92], { maxJump: 0.13 });

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
    // The chapters moved out of the stage and are ordinary content now, so only the
    // hero panel is still choreographed. The filter keeps the rest of the entries
    // harmless if any of them is ever put back or taken out again.
    const panels = () => [
      { el: heroPanelEl, w0: -0.1, w1: 0.15 },
      { el: ch1El, w0: 0.18, w1: 0.33 },
      { el: ch2El, w0: 0.38, w1: 0.53 },
      { el: ch3El, w0: 0.58, w1: 0.74 },
      { el: ch4El, w0: 0.8, w1: 1.05 }
    ].filter((p) => p.el);
    const models = () => [
      // Held back under the hero copy (H1, lede, two CTAs read over it), then back to
      // full strength for chapter 1, which only has a short headline beside it.
      { el: m1El, i0: -1, i1: 0.35, peak: (J) => 0.35 + 0.6 * smooth((J - 0.13) / 0.07) },  // brain
      // ── .glb DISABLED ── while the brain scene is commented out of the markup below,
      // the voice agent opens the journey instead of starting at 0.35, so the first
      // stretch is a live scene rather than an empty stage. Restore `i0: 0.35` at the
      // same time as the iframe.
      { el: m2El, i0: -1, i1: 0.56 },    // voice agent
      { el: m3El, i0: 0.56, i1: 0.78 },  // delivery stream
      { el: m4El, i0: 0.78, i1: 9 }      // galaxy
    // Any scene can be commented out of the markup without breaking the loop below,
    // which would otherwise dereference a missing iframe on the first frame.
    ].filter((m) => m.el);
    // Particle dissolve for the four chapter headlines: letters never move — they materialize
    // grain-by-grain in random order (and dissolve out the same way), in step with the models.
    for (const chEl of [ch1El, ch2El, ch3El, ch4El]) {
      if (!chEl) continue;
      // The text used to arrive as one block, which read as a popup beside the model.
      // Staggered, it reads as narration: the kicker leads, the headline condenses,
      // the body follows, the link lands last. On the way out it reverses — the
      // details leave before the title does.
      chEl._cascade = [
        { el: chEl.querySelector('.chapter-eyebrow'), th: 0.02 },
        { el: chEl.querySelector('.chapter-p'), th: 0.45 },
        { el: chEl.querySelector('.chapter-link'), th: 0.62 },
      ].filter((c) => c.el);
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
    // Ease displayed opacity toward the scroll-derived target. Time-based, not
    // per-frame: a fixed lerp factor converges at whatever rate the display refreshes,
    // so a 30 Hz device lagged and stages ghosted over each other. `rate` is the decay
    // constant in units of 1/second, so the settle looks the same on any panel.
    let lastT = performance.now();
    let dt = 1 / 60;
    const tick = () => {
      const now = performance.now();
      // Clamp: a backgrounded tab returns one enormous delta on wake.
      dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;
    };
    const ease = (el, target, rate) => {
      if (el._disp === undefined) el._disp = target;
      else el._disp += (target - el._disp) * (1 - Math.exp(-rate * dt));
      return el._disp;
    };
    const fadePanels = (J) => {
      for (const p of panels()) {
        // Ramp deliberately shorter than half the window, so every chapter has a
        // plateau where it is fully opaque and readable rather than always fading.
        const RAMP = 0.045;
        const inE = smooth((J - p.w0) / RAMP);
        const outE = 1 - smooth((J - (p.w1 - RAMP)) / RAMP);
        const o = ease(p.el, Math.max(0, Math.min(inE, outE)), 20);
        const drift = ((1 - o) * 14).toFixed(2);
        p.el.style.opacity = o.toFixed(3);
        p.el.style.transform = p.el.classList.contains('chapter')
          ? 'translateY(calc(-50% + ' + drift + 'px))'
          : 'translateY(' + drift + 'px)';
        p.el.style.visibility = o < 0.02 ? 'hidden' : 'visible';
        if (p.el._cascade && o > 0.001) {
          for (const c of p.el._cascade) {
            const co = Math.max(0, Math.min(1, (o - c.th) / 0.3));
            const ce = co * co * (3 - 2 * co);
            c.el.style.opacity = ce.toFixed(2);
            c.el.style.transform = 'translateY(' + ((1 - ce) * 8).toFixed(1) + 'px)';
          }
        }
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
    const fadeModels = (J, rawJ) => {
      const ahead = Math.max(J, rawJ ?? J);
      let maxO = 0;
      const r = journeyEl.getBoundingClientRect();
      const offscreen = r.bottom <= 0 || r.top >= (window.innerHeight || 1);
      // Nothing is fetched until the journey is within about a screen and a half of
      // view. Primary content and CTAs are usable long before any 3D context exists.
      const near = ready3D && r.top < (window.innerHeight || 1) * 1.5 && r.bottom > -(window.innerHeight || 1) * 0.5;
      for (const m of models()) {
        // Then load each model ~0.2 of scroll before it is shown, so only one 3D
        // context spins up at a time rather than four at once.
        if (near && m.el.dataset.src && ahead > m.i0 - 0.2) {
          m.el.src = m.el.dataset.src; delete m.el.dataset.src;
          // The scene's iiclReady message can race the parent's listener and be lost,
          // and then the holding backdrop never fades — the schematic stays up forever
          // (the bug users hit on the landing). The iframe's own load event is a reliable
          // fallback: once the document has loaded the scene paints within a frame or two,
          // so lift the backdrop shortly after regardless of the message.
          m.el.addEventListener('load', () => setTimeout(() => { modelReady = true; }, 350), { once: true });
        }
        // Handoff half-width. Each boundary is shared by two models and both windows are
        // centred on it, so one rises exactly as the other falls. Wider than the fade
        // needs, because the dispersed moment between shapes is the transition.
        const H = 0.075;
        const inE = m.i0 < 0 ? 1 : smooth((J - (m.i0 - H)) / (2 * H));
        const outE = m.i1 > 2 ? 1 : 1 - smooth((J - (m.i1 - H)) / (2 * H));
        const o = ease(m.el, Math.max(0, Math.min(inE, outE)), 16);
        const peak = typeof m.peak === 'function' ? m.peak(J) : (m.peak ?? 0.82);
        m.el.style.opacity = (o * peak).toFixed(3); // hold the models back so the text reads cleanly

        // Motion that never reverses. Scale used to follow opacity, so an outgoing
        // scene grew in and then shrank back out — its motion turned around at the
        // plateau, which is what made each handoff feel like a reset. `L` runs 0→1
        // across the scene's WHOLE visible life, so it enters slightly small and low,
        // passes through full size, and leaves slightly large and high: the camera
        // keeps travelling in the scroll direction through every boundary.
        const lifeA = m.i0 < 0 ? -0.12 : m.i0 - H;
        const lifeB = m.i1 > 2 ? 1 : m.i1 + H;
        const L = Math.min(1, Math.max(0, (J - lifeA) / Math.max(lifeB - lifeA, 0.001)));
        const sc = (0.95 + 0.11 * L).toFixed(4);
        const dy = ((0.5 - L) * 16).toFixed(1);
        // A breath of soft focus while dispersed (composited filter, quantized so the
        // style only changes in steps). A formed scene is always pin sharp.
        const bl = Math.round((1 - o) * 20) / 10;
        m.el.style.transform = 'translateY(' + dy + 'px) scale(' + sc + ')';
        m.el.style.filter = bl > 0 ? 'blur(' + bl + 'px)' : '';
        m.el.style.visibility = o < 0.002 ? 'hidden' : 'visible';
        const pause = offscreen || o < 0.002;
        if (m.el._pause !== pause) { m.el._pause = pause; post(m.el, { iiclPause: pause }); }
        // Fully dispersed by the time the shape is half-faded, and eased: dissolution
        // starts gently, accelerates through the middle and settles — grain drift,
        // not a linear wipe. At the boundary only formless clouds ever overlap.
        const sr = Math.min(1, (1 - o) * 2);
        const s = Math.round(sr * sr * (3 - 2 * sr) * 100) / 100;
        if (m.el._scatter !== s) { m.el._scatter = s; post(m.el, { iiclScatter: s }); }
        if (o > maxO) maxO = o;
        // One camera for the whole journey. Mapping zoom to each model's own span meant
        // the flight restarted at every handoff — the camera visibly rewound four times.
        // Driven from global progress, each scene continues the move the last one was
        // making, so the push through the story never breaks.
        const z = Math.round(Math.min(1, Math.max(0, J)) * 100) / 100;
        if (m.el._zoom !== z) { m.el._zoom = z; post(m.el, { iiclZoom: z }); }
      }
      // The stage glow swells while no scene is fully formed, so the dispersed moment
      // reads as an energy beat rather than a dip. Composited props only.
      if (glowEl) {
        const t = Math.min(1, Math.max(0, (1 - maxO) / 0.5));
        glowEl.style.opacity = (0.8 + 0.2 * t).toFixed(2);
        glowEl.style.transform = 'scale(' + (1 + 0.15 * t).toFixed(3) + ')';
      }
    };
    let raf;
    // Visual progress. The scroll — and above all the snap's glide — can jump an
    // entire handoff in half a second; slaved 1:1, the model swap concentrates into
    // the moments AFTER arrival, which is exactly the popout. V is a camera dolly,
    // not a scrubber: the scroll sets the destination, and the world flows there
    // over ~1.3s of critically-damped motion, so every dissolve-storm-condense
    // plays out in full no matter how abruptly the visitor scrolled.
    let V = -1;
    const frame = () => {
      tick();
      const J = journeyP();
      if (V < 0) V = J; // reloads restore scroll mid-journey; never replay from zero
      V += (J - V) * (1 - Math.exp(-dt * 2.4));
      if (Math.abs(J - V) < 0.0004) V = J;
      fadeModels(V, J);
      fadePanels(V);
      driveCursor();
      if (exploring && J < 0.8) exitExplore(); // scrolled away from the galaxy stage → leave explore
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);


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
      stopSnap();
      window.removeEventListener('message', onReady);
      clearTimeout(readyTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('message', onExploreDone);
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
    <div class="journey-stage" class:is-exploring={exploring}>
      <div bind:this={glowEl} class="journey-glow"></div>
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
        <!-- ── .glb SCENE DISABLED (temporary) ──────────────────────────────────
             hologram.html is the only homepage scene backed by a .glb — it loads
             /brain_hologram.glb through GLTFLoader (src/hologram.js). Commented out
             on request; the other three scenes are generated particle systems and
             fetch no model file, so they stay.

             TO RESTORE: uncomment the iframe below AND put the voice agent's window
             back to `i0: 0.35` in models() above. Both were changed together, and
             restoring only one leaves the opening either empty or double-covered.
        <iframe bind:this={m1El} data-src="hologram.html?transparent=1&ui=0&b={BUILD_ID}" title="AI brain hologram 3D model" loading="lazy" class="journey-model" style="opacity:1;"></iframe>
        ── end disabled scene ── -->
        <iframe bind:this={m2El} data-src="voice-agent.html?transparent=1&ui=0&scatter=1&b={BUILD_ID}" title="AI voice agent 3D model" class="journey-model" style="opacity:0;"></iframe>
        <iframe bind:this={m3El} data-src="data-stream.html?transparent=1&ui=0&scatter=1&b={BUILD_ID}" title="Global delivery stream 3D model" class="journey-model" style="opacity:0;"></iframe>
        <iframe bind:this={m4El} data-src="galaxy.html?transparent=1&ui=0&scatter=1&b={BUILD_ID}" title="Product galaxy 3D model" class="journey-model" style="opacity:0;"></iframe>
      {/if}
      <div class="journey-vignette"></div>

      <div bind:this={heroPanelEl} class="hero-panel">
        <div class="eyebrow">
          <span class="tick"></span>
          <span class="eyebrow-text">IICL &middot; Intelligence India.com</span>
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

    </div>
  </div>

  <!-- The four chapters, as content rather than as overlays timed to scroll positions.
       They used to be absolutely positioned inside the sticky stage and revealed one
       per screen, which cost four and a bit screens of scrolling and never showed more
       than one at a time. Here they are all on the page at once, and the journey above
       is a short piece of scenery instead of the thing you have to scroll through.
       No bind:this any more: the scroll choreography and the particle-dissolve pass
       both skip anything they cannot find, so moving these out disables both for the
       chapters while leaving the hero panel's own fade intact. -->
  <div class="section section-chapters">
    <div class="wrap">
      <div data-reveal class="section-head">
        <div class="label-row"><span class="tick"></span><span class="label">What we do</span></div>
        <h2 class="section-h2">Four lines of work, one delivery engine.</h2>
      </div>
      <div class="chapters">
        <article data-reveal class="chapter-card">
          <span class="mono chapter-kicker">01 — Agentic AI</span>
          <h3 class="chapter-h3">Agents that do the work, not just the talking.</h3>
          <p class="chapter-p">Agents that complete multi-step work across your ERP, help desk and CRM — inside a defined authority boundary, with material actions traceable.</p>
          <a href="/agentic-ai" class="chapter-link">Agentic AI services <span class="mono">→</span></a>
        </article>
        <article data-reveal class="chapter-card">
          <span class="mono chapter-kicker">02 — Voice AI</span>
          <h3 class="chapter-h3">Every call answered, in the languages your customers use.</h3>
          <p class="chapter-p">iVaak picks up in your customer's language, qualifies, resolves and hands off with a transcript — around the clock.</p>
          <a href="/ivaak" class="chapter-link">Meet iVaak <span class="mono">→</span></a>
        </article>
        <article data-reveal class="chapter-card">
          <span class="mono chapter-kicker">03 — Global network</span>
          <h3 class="chapter-h3">Two continents. One delivery engine.</h3>
          <p class="chapter-p">Hyderabad builds, the US team delivers — one connected network shipping enterprise AI around the clock, in your time zone.</p>
          <a href="/aboutus" class="chapter-link">About IICL <span class="mono">→</span></a>
        </article>
        <article data-reveal class="chapter-card">
          <span class="mono chapter-kicker">04 — At scale</span>
          <h3 class="chapter-h3">A product suite, across the industries we serve.</h3>
          <p class="chapter-p">Delivered from Hyderabad and the USA — WhatsApp commerce, voice AI, service management and enterprise workflows, built for enterprise and mid-market teams.</p>
          <!-- Opens the galaxy explorer, which lives in the journey above; enterExplore
               scrolls back to it so the product view opens full-bleed. -->
          <a href="#products" class="chapter-link" onclick={enterExplore}>See all products <span class="mono">→</span></a>
        </article>
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
        <h2 class="section-h2">IICL: enterprise AI engineering and implementation.</h2>
      </div>
      <div data-reveal class="def-body">
        <p class="def-p">IICL helps organisations identify, design, validate and operate enterprise AI solutions. Our work connects business workflows with approved data, enterprise applications, human decision rights and measurable operating outcomes.</p>
        <p class="def-p">We combine AI engineering, enterprise integration, specialised technology capability and product innovation through teams in India and the USA.</p>
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
            <!-- The name is real text, revealed on hover and focus. It is also the
                 link's accessible name, so a screen reader never depends on the mark. -->
            <a href={ind.href} class="ind-chip">
              <span class="ind-mark" style="--mark:url('{ind.icon}')" aria-hidden="true"></span>
              <span class="ind-name">{ind.name}</span>
            </a>
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
        <h2 class="section-h2">Enterprise delivery from India and the USA.</h2>
      </div>
      <div data-reveal class="def-body">
        <p class="def-p">IICL supports enterprise solution design and delivery through teams in India and the USA. The engagement model, working hours, onsite requirements and service responsibilities are confirmed for each scope.</p>
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
      <!-- Grouped by commercial pillar, so a reader scanning for one pathway is not
           filtering the other one out of a single undifferentiated list. -->
      <div class="faq-groups">
      {#each ['Enterprise AI', 'GCC Technology Teams'] as group}
        <div data-reveal class="faq-group">
          <h3 class="faq-group-h mono">{group}</h3>
          <div class="faq-list">
            {#each faqs.filter((q) => q.group === group) as q}
              <details class="faq-item" name="faq">
                <summary class="faq-q">{q.q}<span class="faq-mark" aria-hidden="true"></span></summary>
                <div class="faq-a"><p class="para">{q.a}</p></div>
              </details>
            {/each}
          </div>
        </div>
      {/each}
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
    padding: 10px 18px; background: var(--brand-solid); color: #fff; text-decoration: none;
    font-size: 14px; font-weight: 600; border-radius: 0 0 6px 6px; transition: top .18s ease; }
  :global(.skip-link:focus) { top: 0; }
  .iicl-root { width: 100%; background: #070707; font-family: var(--font); color: #f4f2ee; }
  .mono { font-family: var(--font-mono); }
  .journey a, .hero a { color: #f4f2ee; }
  /* Dark-stage links only. As a bare `a` rule this also hit the light sections
     lower down the page, where #f4f2ee on #f7f6f3 is 1.03:1 — invisible. */


  /* Product explorer exit */
  .explore-exit { position: fixed; top: 84px; right: 28px; z-index: 46; background: rgba(10,10,10,0.85); color: #f4f2ee;
    border: 1px solid rgba(238,47,46,0.5); padding: 10px 18px; font: inherit; font-size: 13.5px; cursor: pointer;
    border-radius: 4px; backdrop-filter: blur(8px); transition: background .2s; }
  .explore-exit:hover { background: #b81c1c; }

  /* Shared CTA / ghost buttons */
  .cta { display: inline-flex; align-items: center; gap: 10px; background: var(--brand-solid); color: #fff; text-decoration: none; font-weight: 600; font-size: 16px; padding: 16px 32px; transition: background .2s; }
  .cta:hover { background: #d61f1e; }
  .ghost { display: inline-flex; align-items: center; color: #f3f3f4; text-decoration: none; font-weight: 500; font-size: 16px; padding: 15px 32px; border: 1px solid rgba(243,243,244,0.28); transition: border-color .2s, color .2s; }
  .ghost:hover { border-color: rgba(243,243,244,0.6); color: #fff; }

  /* Custom cursor over the journey */

  /* Journey */
  /* Four stages. Height sets how much scroll each stage gets — the stage windows are
     fractions of progress, so shortening this paces them proportionally rather than
     dropping any. Was 620vh, which alone was over half the page's scroll. */
  /* The journey is scenery now, not the thing you scroll through. It was 460vh — over
     four screens — because each of the four chapters needed its own scroll position to
     arrive at. The chapters are content below the section, so the track only has to be
     long enough for the scenes to hand over to each other: one sticky screen plus one
     of travel. */
  .journey { height: 200vh; position: relative; background: #0a0a0a; }
  .journey-stage { position: sticky; top: 0; height: 100vh; min-height: 620px; overflow: hidden; cursor: none; background: radial-gradient(100% 100% at 50% 40%, #141414 0%, #0a0a0a 55%, #050505 100%); }
  .journey-stage a { cursor: none; }
  .journey-glow { position: absolute; top: 12%; left: 22%; right: 22%; height: 74%; opacity: 0.8; will-change: transform, opacity;
    background: radial-gradient(ellipse at center, rgba(238,47,46,0.11) 0%, rgba(238,47,46,0) 62%); pointer-events: none; }
  .journey-model { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; pointer-events: none; background: transparent;
    filter: brightness(var(--anim-dim)); }
  /* Product view is the exception: there the galaxy IS the content being read, so it
     runs at full strength like the card sitting on it. */
  .journey-stage.is-exploring .journey-model { filter: none; }
  .journey-flat { overflow: hidden; }
  /* Holds the stage until a scene renders; fades out once one does. */
  .journey-holding { transition: opacity .55s ease; }
  .journey-holding.is-gone { opacity: 0; }
  .journey-vignette { position: absolute; inset: 0; background: radial-gradient(130% 100% at 50% 50%, rgba(0,0,0,0) 62%, rgba(3,3,3,0.65) 100%); pointer-events: none; transition: opacity .4s ease; }

  /* ── Product view ──────────────────────────────────────────────────────────
     In explore mode the galaxy renders its own product card inside the iframe, and
     everything this stage normally lays over the scene is working against it. The
     card docks to the LEFT on desktop, which is exactly where the vignette is at its
     darkest, and to the BOTTOM under 860px, which is where the text scrim is at 90%
     black — so the card was being read through two layers of darkening that exist
     only to make the chapter copy legible. None of them are wanted here: the card is
     already opaque and carries its own contrast. Chapter 4 is also still faded in at
     this point in the scroll and would sit on top of the card, so it goes too. */
  .journey-stage.is-exploring .journey-vignette { opacity: 0; }
  .journey-stage.is-exploring::after { display: none; }
  .journey-stage.is-exploring .journey-glow { opacity: 0; }
  /* The scroll loop writes chapter opacity as an inline style every frame, so this
     has to out-rank it rather than race it. */

  .hero-panel { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 72px 32px 0; box-sizing: border-box; pointer-events: none; }
  .eyebrow { display: flex; align-items: center; gap: 12px; margin-bottom: 22px; }
  .tick { width: 26px; height: 2px; background: #ee2f2e; }
  .eyebrow-text { font-family: var(--font-mono); font-size: 12.5px; font-weight: 500; letter-spacing: 0.24em; text-transform: uppercase; color: rgba(243,243,244,0.6); }
  /* The approved brand line stays visible without becoming a second H1 (Spec B8). */
  .hero-brand { display: block; font-size: clamp(15px, 1.5vw, 19px); font-weight: 500;
    letter-spacing: .01em; color: rgba(244,242,238,.72); margin-bottom: 14px; }
  .hero-h1 { font-weight: var(--w-light); font-size: clamp(34px, 4.6vw, 62px); line-height: 1.06; letter-spacing: -0.025em; margin: 0 0 20px; max-width: 30ch; color: #fff; text-wrap: pretty; text-shadow: 0 2px 40px rgba(12,17,23,0.8); }
  .hero-lede { font-weight: var(--w-light); font-size: clamp(17px, 1.5vw, 20px); line-height: 1.6; color: rgba(243,243,244,0.68); max-width: 46ch; margin: 0 0 36px; text-wrap: pretty; text-shadow: 0 1px 24px rgba(12,17,23,0.9); }
  .hero-actions { display: flex; align-items: center; gap: 14px; pointer-events: auto; }
  .scroll-hint { position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%); font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.22em; color: rgba(243,243,244,0.45); }

  /* ── The four chapters, as content ──────────────────────────────────────────
     Dark band directly under the journey so it still reads as one continuous
     opening, then the page turns white for the sections below it. */
  .section-chapters { background: #0d0d0d; color: #f4f2ee; --ink: #f4f2ee; --muted: rgba(244,242,238,.6); --line: rgba(255,255,255,.12); }
  .section-chapters .section-h2 { color: #fff; }
  .section-chapters .label { color: #ff6b60; }
  .chapters { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1px;
    background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.1); border-radius: 10px; overflow: hidden; }
  .chapter-card { background: #0d0d0d; padding: 24px; display: flex; flex-direction: column; gap: 9px;
    transition: background .25s ease; }
  .chapter-card:hover { background: #131313; }
  .chapter-h3 { margin: 0; font-size: clamp(18px, 1.6vw, 21px); line-height: 1.24; letter-spacing: -.015em;
    font-weight: var(--w-heading); color: #fff; text-wrap: pretty; }
  .chapter-card .chapter-p { margin: 0; flex: 1; font-size: 14.5px; line-height: 1.6; color: rgba(244,242,238,.62); }
  .chapter-card .chapter-link { align-self: flex-start; border-bottom-width: 1px; font-size: 14.5px; }
  @media (max-width: 760px) { .chapters { grid-template-columns: 1fr; } }

  .chapter-kicker { font-family: var(--font-mono); font-size: 12.5px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(243,243,244,0.6); }
  .chapter-p { font-size: 17px; font-weight: var(--w-light); line-height: 1.65; color: rgba(243,243,244,0.72); margin: 0 0 24px; text-wrap: pretty; }
  .chapter-link { pointer-events: auto; display: inline-flex; align-items: center; gap: 8px; color: #fff; text-decoration: none; font-weight: 600; font-size: 15.5px; border-bottom: 2px solid #ee2f2e; padding-bottom: 4px; transition: color .2s; }
  .chapter-link:hover { color: var(--brand-ink); }

  /* Generic sections — light theme (everything below the hero is white) */
  .section { --ink: #16171a; --muted: #55585e; --line: #e6e3de; color: var(--ink); }
  .section-white { background: #ffffff; }
  .section-grey { background: #f7f6f3; }
  .section-dark { background: #f2f1ee; --ink: #16171a; --muted: #55585e; --line: #e0ddd7; color: var(--ink); border-top: 1px solid #e6e3de; border-bottom: 1px solid #e6e3de; }
  .wrap { max-width: var(--wrap-max); margin: 0 auto; padding: var(--space-section) var(--wrap-pad); box-sizing: border-box; }
  .section-head { max-width: 68ch; }
  .label-row { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
  .label { font-family: var(--font-mono); font-size: 11.5px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--brand-ink); }
  .section-h2 { font-weight: var(--w-heading); font-size: var(--fs-h2); line-height: 1.22; letter-spacing: -0.02em; margin: 0 0 var(--space-head); color: var(--ink); text-wrap: pretty; }
  .section-h2-wide { margin-bottom: 34px; }
  .section-h2-m0 { margin: 0; }

  .trust-strip { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
  .trust-strip a { display: inline-block; padding: 8px 15px; border: 1px solid #e6e3de; border-radius: 999px;
    font-size: 14px; color: #40434a; text-decoration: none; transition: border-color .2s, color .2s; }
  .trust-strip a:hover { border-color: #ee2f2e; color: #b81c1c; }

  .def-body { max-width: 78ch; display: grid; gap: 12px; }
  .def-p { margin: 0; font-size: var(--fs-body); line-height: 1.7; color: #40434a; }
  .proof-pending { color: #55585e; padding-left: 14px; border-left: 2px solid #e6e3de; }

  /* One wide row per outcome, each split into condition / response / evidence.
     Declared explicitly so the shared .outcomes rule cannot impose its own count. */
  .outcomes { list-style: none; margin: 0; padding: 0; display: grid;
    grid-template-columns: 1fr; gap: 12px; }
  .outcome { background: #fff; border: 1px solid var(--line); border-radius: 8px; padding: 18px 20px; display: grid;
    grid-template-columns: minmax(180px, 0.9fr) minmax(200px, 1.2fr) minmax(200px, 1.1fr);
    gap: 6px 24px; align-items: baseline; }
  .outcome-cond { font-size: 15.5px; font-weight: var(--w-heading); color: #16171a; }
  .outcome-resp { font-size: 14.5px; line-height: 1.55; color: #40434a; }
  .outcome-ev { font-size: 11.5px; line-height: 1.5; color: #55585e; }
  @media (max-width: 900px) { .outcome { grid-template-columns: 1fr; gap: 4px; } }

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
  /* The closing band is a light surface, so these read as ink on paper. Full width of
     the wrap, so the two cards sit on the same rail as everything above them. */
  .conv { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 18px;
    margin: 30px 0 22px; text-align: left; }
  .conv-card { background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 26px;
    display: flex; flex-direction: column; gap: 10px; transition: border-color .25s, transform .25s; }
  .conv-card:hover { border-color: #ee2f2e; transform: translateY(-3px); }
  .conv-h { margin: 0; font-size: 19px; font-weight: var(--w-heading); color: var(--ink); }
  .conv-p { margin: 0; font-size: 14.5px; line-height: 1.6; color: var(--muted); flex: 1; }
  .conv-card .cta { align-self: flex-start; font-size: 15px; padding: 13px 22px; }
  .conv-safety { margin: 0; font-size: 12.5px; line-height: 1.6; color: var(--muted); max-width: 78ch; }
  .section-lede { font-size: var(--fs-body); font-weight: var(--w-body); line-height: 1.65; color: var(--muted); margin: 0 0 32px; max-width: 62ch; text-wrap: pretty; }

  /* Services — two columns of hairline rows, deliberately a different rhythm. */
  .svc-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0 56px; }
  .svc-row { display: grid; grid-template-columns: 34px 1fr 20px; align-items: baseline; gap: 16px;
    padding: 20px 0; text-decoration: none; color: var(--ink); border-top: 1px solid var(--line);
    transition: color .2s; }
  .svc-row:hover { color: #b81c1c; }
  .svc-num { font-size: 11.5px; letter-spacing: .16em; color: var(--brand-ink); }
  .svc-body { display: flex; flex-direction: column; gap: 6px; }
  .svc-name { font-size: 18px; font-weight: 600; letter-spacing: -0.01em; }
  .svc-desc { font-size: 14.5px; line-height: 1.55; color: var(--muted); }
  .svc-go { font-size: 14px; color: var(--brand-ink); opacity: 0; transition: opacity .2s, transform .2s; transform: translateX(-5px); }
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
    font-size: 14px; color: var(--brand-ink); border: 1px solid #ee2f2e; border-radius: 50%; background: #fff; }
  .step-title { font-size: 21px; font-weight: 600; color: var(--ink); letter-spacing: -0.01em; }
  .step-desc { font-size: 15.5px; line-height: 1.6; color: var(--muted); }

  /* Stats — now a row under the framework rather than a section of their own. */

  /* Industries — a chip strip inside Services, not a section of its own. */
  .ind-strip { margin-top: 34px; padding-top: 26px; border-top: 1px solid var(--line); }
  .ind-strip-k { display: block; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 14px; }
  .ind-chips { display: flex; flex-wrap: wrap; gap: 10px; }
  .ind-mark { flex: none; display: block; width: 22px; height: 22px; background: currentColor;
    -webkit-mask: var(--mark) center / contain no-repeat; mask: var(--mark) center / contain no-repeat; }
  /* Collapsed to a 52px circle; the name expands out of it on hover or keyboard focus. */
  .ind-chip { display: inline-flex; align-items: center; justify-content: center; gap: 0;
    width: 44px; height: 44px; padding: 0 11px; box-sizing: border-box;
    color: var(--ink); text-decoration: none; background: #fff;
    border: 1px solid var(--line); border-radius: 999px;
    transition: width .34s cubic-bezier(0.22,1,0.36,1), border-color .2s, color .2s, background .2s; }
  .ind-chip:hover, .ind-chip:focus-visible {
    color: #fff; background: var(--brand-solid, #d81f1e); border-color: var(--brand-solid, #d81f1e); }

  .ind-name { display: block; max-width: 0; overflow: hidden; white-space: nowrap;
    font-size: 14px; font-weight: var(--w-medium); letter-spacing: -0.005em;
    opacity: 0; transform: translateX(-4px);
    transition: max-width .34s cubic-bezier(0.22,1,0.36,1), opacity .22s ease,
                transform .34s cubic-bezier(0.22,1,0.36,1), margin-left .34s cubic-bezier(0.22,1,0.36,1); }
  .ind-chip:hover, .ind-chip:focus-visible { width: auto; }
  .ind-chip:hover .ind-name, .ind-chip:focus-visible .ind-name {
    max-width: 220px; opacity: 1; transform: none; margin-left: 10px; }

  @media (prefers-reduced-motion: reduce) {
    .ind-chip { width: auto; }
    .ind-name { max-width: 220px; opacity: 1; transform: none; margin-left: 10px; transition: none; }
  }

  /* FAQ */
  .faq-wrap { display: block; }
  .faq-wrap > :global(:first-child) { margin-bottom: 26px; }
  /* The two pillars sit side by side, so a reader can see both sets at once rather
     than scrolling past one to reach the other. */
  .faq-groups { display: grid; grid-template-columns: 1fr 1fr; gap: 34px; align-items: start; }
  .faq-groups :global(.faq-list) { max-width: none; }
  .faq-group-h { margin: 0 0 10px; font-size: 10.5px; letter-spacing: .22em;
    text-transform: uppercase; color: #b81c1c; }

  /* CTA */
  .cta-wrap { text-align: center; display: flex; flex-direction: column; align-items: center; }
  .cta-inner { width: 100%; display: flex; flex-direction: column; align-items: center; }
  .cta-kicker { font-size: 12.5px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--brand-ink); margin-bottom: 20px; }
  .cta-h2 { font-weight: var(--w-body); font-size: clamp(30px, 3.6vw, 46px); line-height: 1.12; letter-spacing: -0.02em; margin: 0 0 20px; color: var(--ink); max-width: 32ch; text-wrap: pretty; }
  .cta-p { font-size: 17px; line-height: 1.6; color: var(--muted); max-width: 52ch; margin: 0 0 36px; text-wrap: pretty; }
  .cta-big { font-size: 16.5px; padding: 17px 38px; }

  /* ── Responsive. The homepage had no breakpoints at all: every grid was a fixed
     column count, so it overflowed below ~900px. ── */
  @media (max-width: 1040px) {
    .paths, .conv { grid-template-columns: 1fr; }
    .track { grid-template-columns: 1fr; gap: 32px; }
    .step::before { display: none; }

  }
  /* Tablet / iPad: the journey keeps its animation but needs a shorter scroll and
     chapters that sit inside the gutter rather than against a 580px half-measure. */
  @media (max-width: 900px) {
    /* Two FAQ columns on a phone gave each question a ~150px measure, so every
       question wrapped to four or five lines and the two pillars interleaved down
       the screen. Stacked, each group reads as one labelled run of questions. */
    .faq-groups { grid-template-columns: 1fr; gap: 22px; }
  }
  @media (max-width: 720px) {
    .svc-cols { grid-template-columns: 1fr; gap: 0; }
    /* A scrim behind the chapter text rather than dimming the scene. The models were
       held at 55% opacity to keep the copy readable, which is precisely what stopped
       the animation being worth watching on a phone. Full-strength scene, gradient
       under the text, same legibility. */
    .journey-stage::after { content: ''; position: absolute; inset: auto 0 0; height: 58%; pointer-events: none;
      z-index: 1; background: linear-gradient(180deg, rgba(6,6,6,0) 0%, rgba(6,6,6,.70) 52%, rgba(6,6,6,.90) 100%); }
    /* The panel's own 32px pad put the hero buttons on a different rail from the rest
       of the page; --wrap-pad is the one gutter number the whole site uses. */
    .hero-panel { z-index: 2; padding-inline: var(--wrap-pad); }
    /* No max-width: the 320px cap left the two hero buttons on a narrower rail than
       everything else on the page, floating 35px in from each edge instead of 24. */
    .hero-actions { flex-direction: column; align-items: stretch; width: 100%; }
    .cta, .ghost { justify-content: center; }
    /* Booking buttons that live inside a card span the card's content box rather
       than shrink-wrapping their label. The card carries a 24px pad, so the button
       sits exactly 24px in from each card edge. */
    .conv-card, .path { padding: 24px; }
    .conv-card .cta { align-self: stretch; justify-content: center; }
  }
</style>
