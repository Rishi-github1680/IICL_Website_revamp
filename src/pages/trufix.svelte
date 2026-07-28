<script>
  import ProductLayout from '../ProductLayout.svelte';
</script>

<ProductLayout
  h1="Ticketing That Verifies the Fix Before It Closes"
  lede="Most ticketing tools track status. TruFix confirms the issue is genuinely gone before the ticket is signed off."
  heroBanner="/img/banners/A8-banner-trufix.png"
  heroModel="/microchip.html?transparent=1&ui=0"
  path="/trufix"
  cta="Book a TruFix Demo"
  specs={[
    { k: 'Verifies', v: 'That the fix actually held' },
    { k: 'Covers', v: 'IT and facilities tickets' },
    { k: 'Confirms via', v: 'Voice callback and WhatsApp' },
    { k: 'Keeps', v: 'A full audit trail' },
  ]}
  faqs={[
    { q: "What problem does TruFix solve?", a: "Tickets that get closed without the underlying issue being fixed. TruFix checks that the resolution actually holds before the ticket is signed off." },
    { q: "How is that different from a normal ticketing tool?", a: "Conventional tools track a ticket's status. TruFix adds a verification step, so 'closed' means confirmed rather than marked done." },
    { q: "What kinds of support does it suit?", a: "IT support and facilities support, where the same fault reappearing is a recurring and measurable cost." },
    { q: "Does it replace our service desk tool?", a: "Not necessarily. Talk to us about your current tooling and we will tell you whether integration or replacement makes more sense." },
  ]}
>
  <section class="page-section">
    <div class="wrap section-split">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>What TruFix does</h2>
        <p class="statement">Closed and fixed become the same thing.</p>
        <p class="para">A ticket marked resolved and a problem that is actually gone are not the same event. Most service desks only ever record the first one.</p>
        <p class="para">TruFix triages and routes automatically, then confirms the fix held before the ticket is allowed to close.</p>
        <a class="cta-link" href="/contactus">See it applied to your ticket queue <span class="arw">→</span></a>
      </div>
      <div class="split-media">
        <figure><img src="/img/products/trufix-1.png" alt="TruFix.ai ticket triage and routing" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What changes</h2>
      <div class="section-body">
        <p class="para">The reopened-ticket rate stops being a suspicion and becomes a number you can manage.</p>
      </div>
      <ul class="outcomes">
        <li class="outcome"><b>Confirmed</b><span>Every closure checked with the person who raised it, not assumed.</span></li>
        <li class="outcome"><b>Fewer</b><span>Repeat visits for the same fault, because it is caught before sign-off.</span></li>
        <li class="outcome"><b>Auditable</b><span>A full trail of what was done and who verified it.</span></li>
      </ul>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap section-split rev">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>What "verified" means</h2>
        <p class="statement">The ticket does not close on the technician's word alone.</p>
        <p class="para">When work is marked done, TruFix contacts whoever raised it by voice callback or WhatsApp. A confirmation closes the ticket; a denial reopens it and routes it back with the original context attached.</p>
        <a class="cta-link" href="/contactus">See how verification would work for you <span class="arw">→</span></a>
      </div>
      <div class="split-media">
        <figure><img src="/img/products/trufix-2.png" alt="TruFix.ai resolution verification and audit trail" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Where it fits</h2>
      <div class="section-body">
        <p class="para">Anywhere a recurring fault is a recurring cost.</p>
      </div>
      <ul class="feature-grid">
        <li class="feature-card"><span class="fc-dot"></span><span><strong>IT support</strong> — triage, routing, outage escalation and end-user verification.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Facilities and real estate</strong> — maintenance requests, safety incidents, tenant callbacks.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Healthcare</strong> — biomedical equipment and estates, with life-critical work prioritised.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Manufacturing and hospitality</strong> — plant-floor and property faults, tracked to confirmation.</span></li>
      </ul>
      <a class="cta-link" href="/contactus">Explore the full capability set <span class="arw">→</span></a>
    </div>
  </section>
</ProductLayout>
