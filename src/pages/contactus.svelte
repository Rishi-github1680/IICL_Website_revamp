<script>
  import Layout from '../Layout.svelte';
  import { PAGE_ART } from '../menu.js';
  import { COMPANY } from '../seo.js';
  import { REQUIREMENTS, resolveIntent } from '../intents.js';

  // Every CTA arrives with ?intent=<value>. The raw value is checked against the
  // approved allowlist (Spec F3) and never rendered — an unknown or absent value
  // simply falls back to the general enquiry flow. `intentKey` is the validated key,
  // safe to pass on; the raw parameter never leaves this line.
  const rawIntent = typeof location !== 'undefined'
    ? new URLSearchParams(location.search).get('intent')
    : null;
  const intent = resolveIntent(rawIntent);
  const intentKey = intent ? rawIntent : null;

  let form = $state({
    name: '', company: '', email: '', phone: '',
    // Preselect the matching enquiry type when we recognise the intent.
    requirement: intent ? intent.label : '',
    message: '', website: '',
  });
  let status = $state('idle'); // idle | sending | error
  let error = $state('');

  async function submit(e) {
    e.preventDefault();
    if (status === 'sending') return;
    if (form.website) return; // honeypot: a bot filled the hidden field
    status = 'sending';
    error = '';
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Only the resolved key is sent — never the raw query value.
        body: JSON.stringify({ ...form, intent: intentKey }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'We could not send that just now.');
      }
      window.location.href = '/thank-you';
    } catch (err) {
      status = 'error';
      error = err.message;
    }
  }
</script>

<Layout
  kicker="Company"
  h1="Contact IICL"
  lede="Talk to IICL about AI agents, voice AI, WhatsApp automation, ERP, application development or staffing. Offices in Hyderabad, India and the USA."
  heroImage={PAGE_ART["contactus"]}
  path="/contactus"
  cta="Send Enquiry"
  ctaHref="#enquiry"
  bandKicker="Send an enquiry"
  bandHeading="Describe the work, not the technology. The more concrete the process, the more useful our first reply.">
  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Describe the work, not the technology.</h2>
      <div class="section-body">
        <p class="para">The more concrete the process, the more useful our first reply. Helpful detail: what the work involves today, roughly how much of it there is, and which systems it touches.</p>
        <p class="para">If you would rather look around first, see <a href="/#products">what we build</a>, the <a href="/blog">case studies</a>, or <a href="/aboutus">how we run a project</a>.</p>
      </div>
    </div>
  </section>

  <section id="enquiry" class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Send an enquiry</h2>
      <div class="section-body">
        {#if intent}
          <p class="para intent-lede"><strong>{intent.label}.</strong> {intent.lede}</p>
        {/if}
        <p class="para">Fields marked * are required. We reply by email within one working day unless you ask us to call.</p>

        <!-- Required on every conversion form (Spec B10, D5, E-AGQ1). -->
        <p class="para form-safety">
          <strong>Please do not send sensitive material through this form.</strong>
          That means passwords, API keys, personal or candidate records, production data,
          security vulnerabilities and confidential architecture documents. Anything of that
          kind should be exchanged through an approved channel once an engagement has started.
        </p>

        <form class="enq" onsubmit={submit} novalidate>
          <div class="row">
            <label class="field">
              <span>Name *</span>
              <input bind:value={form.name} name="name" type="text" autocomplete="name" required />
            </label>
            <label class="field">
              <span>Company *</span>
              <input bind:value={form.company} name="company" type="text" autocomplete="organization" required />
            </label>
          </div>

          <div class="row">
            <label class="field">
              <span>Work email *</span>
              <input bind:value={form.email} name="email" type="email" autocomplete="email" required />
            </label>
            <label class="field">
              <span>Mobile number *</span>
              <input bind:value={form.phone} name="phone" type="tel" autocomplete="tel" required />
            </label>
          </div>

          <label class="field">
            <span>What do you need? *</span>
            <select bind:value={form.requirement} name="requirement" required>
              <option value="" disabled selected>Select one</option>
              {#each REQUIREMENTS as r}<option value={r}>{r}</option>{/each}
            </select>
          </label>

          <label class="field">
            <span>Tell us about the process *</span>
            <textarea bind:value={form.message} name="message" rows="5" required
              placeholder="What happens today, how often, and which systems are involved."></textarea>
          </label>

          <!-- Honeypot: hidden from people, tempting to bots. Never shown, never submitted by humans. -->
          <input bind:value={form.website} name="website" type="text" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true" />

          <div class="actions">
            <button class="submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send enquiry'} <span class="mono">→</span>
            </button>
            <span class="note">We use these details to reply to you. See our <a href="/privacy-policy">privacy policy</a>.</span>
          </div>

          {#if status === 'error'}
            <p class="err" role="alert">
              {error} You can also email us directly at <a href="mailto:{COMPANY.email}">{COMPANY.email}</a>.
            </p>
          {/if}
        </form>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Our offices</h2>
      <div class="offices">
        <div class="office">
          <h3>India — Hyderabad</h3>
          <p class="para">{COMPANY.india.street}, {COMPANY.india.city} {COMPANY.india.postalCode}.</p>
          <p class="para">
            <a href="tel:+919989442002">{COMPANY.phone}</a><br />
            <a href="mailto:{COMPANY.email}">{COMPANY.email}</a><br />
            Monday to Friday, 9:30am – 6:30pm IST
          </p>
        </div>
        <div class="office">
          <h3>USA — Raleigh</h3>
          <p class="para">{COMPANY.usa.street}, {COMPANY.usa.city}, {COMPANY.usa.region} {COMPANY.usa.postalCode}.</p>
          <p class="para">
            <a href="mailto:{COMPANY.email}">{COMPANY.email}</a><br />
            Monday to Friday, 9:00am – 5:00pm ET
          </p>
        </div>
      </div>

    </div>
  </section>
</Layout>

<style>
  .enq { margin: 26px 0 0; max-width: 720px; display: grid; gap: 18px; }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .field { display: grid; gap: 7px; }
  .field span { font-size: 13.5px; font-weight: 600; color: #33363c; letter-spacing: 0.01em; }
  .intent-lede { padding: 12px 16px; border-left: 3px solid #ee2f2e;
    background: color-mix(in srgb, #ee2f2e 5%, transparent); border-radius: 0 6px 6px 0; }
  /* Deliberately plain and unmissable — this is a safety notice, not decoration. */
  .form-safety { padding: 12px 16px; border: 1px solid var(--line); border-radius: 6px;
    background: #fff; font-size: var(--fs-small); line-height: 1.6; }

  .field input, .field select, .field textarea {
    font: inherit; font-size: 15.5px; color: #16171a; background: #fff;
    border: 1px solid #d9d5ce; border-radius: 6px; padding: 12px 14px; width: 100%; box-sizing: border-box;
    transition: border-color .18s, box-shadow .18s;
  }
  .field textarea { resize: vertical; line-height: 1.6; }
  .field input:focus, .field select:focus, .field textarea:focus {
    outline: none; border-color: #ee2f2e; box-shadow: 0 0 0 3px rgba(238,47,46,0.14);
  }
  .hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }

  .actions { display: flex; flex-wrap: wrap; align-items: center; gap: 18px; margin-top: 8px; }
  /* Layout's .cta is scoped to Layout, so the submit button carries its own copy of the brand style. */
  .submit { display: inline-flex; align-items: center; gap: 10px; background: #ee2f2e; color: #fff;
    font: inherit; font-size: 16px; font-weight: 600; border: 0; border-radius: 0; padding: 15px 30px;
    cursor: pointer; transition: background .2s; }
  .submit:hover:not([disabled]) { background: #d61f1e; }
  .submit[disabled] { opacity: 0.6; cursor: default; }
  .submit .mono { font-family: 'IBM Plex Mono', monospace; }
  .note { font-size: 13.5px; color: #55585e; }
  .note a, .err a { color: #b81c1c; }
  .err { margin: 0; font-size: 14.5px; color: #b81c1c; }

  .offices { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 34px; }
  .office h3 { margin: 0 0 12px; font-size: 19px; font-weight: 600; color: #16171a; }
  .office a { color: #b81c1c; text-decoration: none; }
  .office a:hover { text-decoration: underline; }
  @media (max-width: 760px) {
    .row, .offices { grid-template-columns: 1fr; }
  }
</style>
