<script>
  // Dynamic Contact Experience — the shared schema renderer (handoff PDF §02/§05).
  // One engine, three steps, config-driven by contact-schema.js. Reads routing context
  // from the URL (allowlisted), renders the intent's contact + requirement schema, then
  // a review/consent/routing summary, and POSTs a validated record to the server, which
  // re-validates and resolves the owner queue. Answers/PII never touch the URL or analytics.
  import { onMount, tick } from 'svelte';
  import {
    INTENTS, GENERAL_ROUTER, CONSENT, resolveContext, requirementFields, PRODUCT_VARIANTS,
  } from './contact-schema.js';

  let ctx = $state({ intent: 'general', product: null, source: '', ctaId: '', utm: {} });
  let intent = $state('general');
  let product = $state(null);
  let step = $state(1);              // 1 contact · 2 requirement · 3 review
  let values = $state({});
  let consent = $state({ enquiry: false, marketing: false, retention: false });
  let website = $state('');          // honeypot
  let errors = $state({});
  let status = $state('idle');       // idle | sending | error | done
  let serverError = $state('');
  let result = $state(null);         // { submissionId, message }
  let showPaths = $state(false);
  let formEl;

  const schema = $derived(INTENTS[intent] || INTENTS.general);
  const contactFields = $derived(schema.contact);
  const reqFields = $derived(requirementFields(intent, product));
  const owner = $derived(schema.owner);
  const productLabel = $derived(product && PRODUCT_VARIANTS[product] ? PRODUCT_VARIANTS[product].label : null);

  // ── Analytics: routing quality only, never answers/PII (PDF §13) ──
  function track(evt, extra = {}) {
    const payload = { event: evt, intent, product: product || undefined,
      source: ctx.source || undefined, cta: ctx.ctaId || undefined, ...ctx.utm, ...extra };
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(payload);
      window.dispatchEvent(new CustomEvent('iicl-contact', { detail: payload }));
    }
  }

  onMount(() => {
    ctx = resolveContext(location.search);
    intent = ctx.intent;
    product = ctx.product;
    track('contact_path_view');
    track('contact_step_start', { step: 1 });
  });

  function setIntent(next) {
    if (next === intent) { showPaths = false; return; }
    intent = next;
    // Product only applies to product-demo; drop a stale product ID otherwise.
    if (!INTENTS[next]?.product) product = null;
    errors = {};
    showPaths = false;
    track('contact_path_change');
  }

  function fieldsForStep(n) {
    if (n === 1) return contactFields;
    if (n === 2) return reqFields;
    return [];
  }

  function validate(n) {
    const errs = {};
    for (const f of fieldsForStep(n)) {
      const v = (values[f.name] ?? '').toString().trim();
      if (f.required && !v) errs[f.name] = `${f.label} is required.`;
      else if (f.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) errs[f.name] = 'That email does not look right.';
    }
    if (n === 3 && !consent.enquiry) errs.consentEnquiry = 'Please agree so we can respond and route your enquiry.';
    if (n === 3 && schema.professional && !consent.retention) errs.consentRetention = 'Please confirm retention consent to proceed.';
    return errs;
  }

  async function focusFirstError(errs) {
    await tick();
    const first = Object.keys(errs)[0];
    const el = formEl?.querySelector(`[name="${first}"]`) || formEl?.querySelector('[data-error]');
    el?.focus?.();
  }

  async function next() {
    const errs = validate(step);
    errors = errs;
    if (Object.keys(errs).length) { track('contact_validation_error', { step, errorCode: Object.keys(errs)[0] }); return focusFirstError(errs); }
    track('contact_step_complete', { step });
    step = Math.min(3, step + 1);
    track('contact_step_start', { step });
  }
  function back() { step = Math.max(1, step - 1); }

  async function submit(e) {
    e?.preventDefault?.();
    if (status === 'sending') return;
    if (website) return; // honeypot
    const errs = validate(3);
    errors = errs;
    if (Object.keys(errs).length) { track('contact_validation_error', { step: 3, errorCode: Object.keys(errs)[0] }); return focusFirstError(errs); }

    // Split values into contact vs requirement by the schema (keeps the payload structured).
    const contact = {}, requirement = {};
    for (const f of contactFields) contact[f.name] = values[f.name] ?? '';
    for (const f of reqFields) if (f.type !== 'file') requirement[f.name] = values[f.name] ?? '';

    status = 'sending'; serverError = '';
    track('contact_submit_attempt', { step: 3 });
    try {
      const res = await fetch('/api/contact/enquiries', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent, product,
          attribution: { source: ctx.source, ctaId: ctx.ctaId, utm: ctx.utm },
          contact, requirement,
          consent: { enquiry: consent.enquiry, marketing: consent.marketing,
            retention: schema.professional ? consent.retention : undefined, version: CONSENT.version },
          website,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || body.status !== 'accepted') throw new Error(body.message || body.error || 'We could not route that just now.');
      result = body; status = 'done';
      track('contact_submit_success');
    } catch (err) {
      status = 'error'; serverError = err.message;
      track('contact_submit_failure', { errorCode: 'submit' });
    }
  }
</script>

<div class="dc">
  {#if status === 'done'}
    <div class="dc-done" role="status">
      <span class="dc-eyebrow">Enquiry routed</span>
      <h2>{result?.message || 'Your enquiry has been routed.'}</h2>
      <p>It is with our <strong>{owner}</strong> team. Reference <code>{result?.submissionId}</code>. We reply within one working day unless you ask us to call.</p>
      <a class="dc-btn" href="/">Back to home <span aria-hidden="true">→</span></a>
    </div>
  {:else}
    <!-- Path selector: preselected, but changeable (PDF §17 path selector). -->
    <div class="dc-path">
      <div>
        <span class="dc-eyebrow">You are contacting</span>
        <strong>{schema.label}{#if productLabel} · {productLabel}{/if}</strong>
        <small>Routes to {owner}</small>
      </div>
      <button type="button" class="dc-change" onclick={() => showPaths = !showPaths} aria-expanded={showPaths}>
        {showPaths ? 'Close' : 'Not right? Change path'}
      </button>
    </div>
    {#if showPaths}
      <div class="dc-router" role="group" aria-label="Choose a different path">
        {#each GENERAL_ROUTER as r}
          <button type="button" class="dc-route {intent === r.intent ? 'is-active' : ''}" onclick={() => setIntent(r.intent)}>
            {r.label}
          </button>
        {/each}
      </div>
    {/if}

    <ol class="dc-steps" aria-hidden="true">
      {#each ['Your details', 'Your requirement', 'Review & consent'] as s, i}
        <li class={step === i + 1 ? 'is-active' : step > i + 1 ? 'is-done' : ''}><b>{i + 1}</b>{s}</li>
      {/each}
    </ol>

    <form class="dc-form" bind:this={formEl} onsubmit={submit} novalidate>
      <!-- STEP 1 · contact -->
      {#if step === 1}
        <div class="dc-grid">
          {#each contactFields as f}
            <label class="dc-field {f.type === 'textarea' ? 'wide' : ''}">
              <span>{f.label}{#if f.required} *{/if}</span>
              {#if f.type === 'textarea'}
                <textarea bind:value={values[f.name]} name={f.name} rows="3" data-error={errors[f.name] ? '' : undefined}></textarea>
              {:else}
                <input bind:value={values[f.name]} name={f.name} type={f.type} autocomplete={f.autocomplete} data-error={errors[f.name] ? '' : undefined} />
              {/if}
              {#if errors[f.name]}<em class="dc-err">{errors[f.name]}</em>{/if}
            </label>
          {/each}
        </div>
        {#if schema.router}
          <p class="dc-hint">You can also pick a direction above to jump straight to the right questions.</p>
        {/if}

      <!-- STEP 2 · requirement -->
      {:else if step === 2}
        <div class="dc-grid">
          {#each reqFields as f}
            <label class="dc-field {f.type === 'textarea' || f.type === 'file' ? 'wide' : ''}">
              <span>{f.label}{#if f.required} *{/if}</span>
              {#if f.type === 'textarea'}
                <textarea bind:value={values[f.name]} name={f.name} rows="4" data-error={errors[f.name] ? '' : undefined}></textarea>
              {:else if f.type === 'select'}
                <select bind:value={values[f.name]} name={f.name} data-error={errors[f.name] ? '' : undefined}>
                  <option value="" disabled selected>Select one</option>
                  {#each f.options as o}<option value={o}>{o}</option>{/each}
                </select>
              {:else if f.type === 'file'}
                <input name={f.name} type="file" accept={f.accept} onchange={(e) => values[f.name] = e.target.files?.[0]?.name || ''} />
              {:else}
                <input bind:value={values[f.name]} name={f.name} type={f.type} data-error={errors[f.name] ? '' : undefined} />
              {/if}
              {#if f.help}<small class="dc-help">{f.help}</small>{/if}
              {#if errors[f.name]}<em class="dc-err">{errors[f.name]}</em>{/if}
            </label>
          {/each}
        </div>

      <!-- STEP 3 · review + consent + routing -->
      {:else}
        <div class="dc-review">
          <h3>Review</h3>
          <dl>
            {#each [...contactFields, ...reqFields] as f}
              {#if values[f.name]}
                <div><dt>{f.label}</dt><dd>{values[f.name]}</dd></div>
              {/if}
            {/each}
          </dl>
          <div class="dc-owner"><span>This enquiry will be routed to</span><strong>{owner}</strong></div>
        </div>
        <div class="dc-consent">
          <label class="dc-check" data-error={errors.consentEnquiry ? '' : undefined}>
            <input type="checkbox" bind:checked={consent.enquiry} name="consentEnquiry" />
            <span>{CONSENT.enquiry}</span>
          </label>
          {#if errors.consentEnquiry}<em class="dc-err">{errors.consentEnquiry}</em>{/if}
          {#if schema.professional}
            <label class="dc-check" data-error={errors.consentRetention ? '' : undefined}>
              <input type="checkbox" bind:checked={consent.retention} name="consentRetention" />
              <span>{CONSENT.professionalRetention}</span>
            </label>
            {#if errors.consentRetention}<em class="dc-err">{errors.consentRetention}</em>{/if}
          {/if}
          <label class="dc-check">
            <input type="checkbox" bind:checked={consent.marketing} name="consentMarketing" />
            <span>{CONSENT.marketing}</span>
          </label>
        </div>
        <p class="dc-safety"><strong>Please do not send sensitive material</strong> — passwords, personal or candidate records, production data, security details or confidential architecture. Exchange those through an approved channel once an engagement starts.</p>
      {/if}

      <!-- Honeypot -->
      <input bind:value={website} name="website" type="text" tabindex="-1" autocomplete="off" class="dc-hp" aria-hidden="true" />

      {#if status === 'error'}
        <p class="dc-err" role="alert">{serverError} You can also email <a href="mailto:reachus@iicl.in">reachus@iicl.in</a>.</p>
      {/if}

      <div class="dc-actions">
        {#if step > 1}<button type="button" class="dc-btn ghost" onclick={back}>← Back</button>{/if}
        {#if step < 3}
          <button type="button" class="dc-btn" onclick={next}>Continue <span aria-hidden="true">→</span></button>
        {:else}
          <button type="submit" class="dc-btn" disabled={status === 'sending'}>{status === 'sending' ? 'Routing…' : 'Send enquiry'} <span aria-hidden="true">→</span></button>
        {/if}
      </div>
    </form>
  {/if}
</div>

<style>
  .dc { max-width: 760px; }
  .dc-eyebrow { display: block; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: .16em;
    text-transform: uppercase; color: var(--brand-ink); }
  .dc-path { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;
    padding: 16px 18px; background: #fff; border: 1px solid var(--line); border-radius: 8px; }
  .dc-path strong { display: block; margin-top: 4px; font-size: 17px; color: var(--ink); }
  .dc-path small { display: block; margin-top: 3px; font-size: 12.5px; color: var(--muted); }
  .dc-change { background: none; border: 0; color: var(--brand-ink); font: inherit; font-size: 13.5px; font-weight: 600; cursor: pointer; white-space: nowrap; }
  .dc-router { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 8px; }
  .dc-route { font: inherit; font-size: 13.5px; padding: 9px 14px; background: #fff; color: var(--ink);
    border: 1px solid var(--line); border-radius: 999px; cursor: pointer; transition: border-color .18s, color .18s; }
  .dc-route:hover { border-color: var(--brand); color: var(--brand-ink); }
  .dc-route.is-active { background: var(--ink); color: #fff; border-color: var(--ink); }

  .dc-steps { list-style: none; display: flex; gap: 8px; margin: 22px 0; padding: 0; }
  .dc-steps li { flex: 1; display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--muted);
    padding-bottom: 8px; border-bottom: 2px solid var(--line); }
  .dc-steps li b { width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center;
    font-family: var(--font-mono); font-size: 11px; background: var(--line); color: var(--muted); }
  .dc-steps li.is-active { color: var(--ink); border-bottom-color: var(--brand); }
  .dc-steps li.is-active b, .dc-steps li.is-done b { background: var(--brand-solid); color: #fff; }

  .dc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .dc-field { display: grid; gap: 6px; }
  .dc-field.wide { grid-column: 1 / -1; }
  .dc-field > span { font-size: 13.5px; font-weight: 600; color: #33363c; }
  .dc-field input, .dc-field select, .dc-field textarea {
    font: inherit; font-size: 15px; color: var(--ink); background: #fff; border: 1px solid #d9d5ce;
    border-radius: 6px; padding: 11px 13px; width: 100%; box-sizing: border-box; transition: border-color .18s, box-shadow .18s; }
  .dc-field textarea { resize: vertical; line-height: 1.6; }
  .dc-field :focus { outline: none; border-color: var(--brand); box-shadow: 0 0 0 3px rgba(238,47,46,0.14); }
  .dc-field [data-error] { border-color: #b81c1c; }
  .dc-help { font-size: 12px; color: var(--muted); }
  .dc-err { font-size: 13px; color: #b81c1c; font-style: normal; }
  .dc-hint { margin: 14px 0 0; font-size: 13px; color: var(--muted); }
  .dc-hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }

  .dc-review h3 { margin: 0 0 10px; font-size: 16px; color: var(--ink); }
  .dc-review dl { margin: 0 0 16px; display: grid; gap: 8px; }
  .dc-review dl > div { display: grid; grid-template-columns: 190px 1fr; gap: 14px; padding: 8px 0; border-bottom: 1px solid var(--line-soft); }
  .dc-review dt { font-size: 13px; color: var(--muted); }
  .dc-review dd { margin: 0; font-size: 14.5px; color: var(--ink); overflow-wrap: anywhere; }
  .dc-owner { display: flex; flex-direction: column; gap: 3px; padding: 14px 16px; border-left: 3px solid var(--brand);
    background: color-mix(in srgb, #ee2f2e 4%, transparent); border-radius: 0 6px 6px 0; }
  .dc-owner span { font-size: 12.5px; color: var(--muted); }
  .dc-owner strong { font-size: 16px; color: var(--ink); }

  .dc-consent { margin: 18px 0 0; display: grid; gap: 12px; }
  .dc-check { display: grid; grid-template-columns: auto 1fr; gap: 10px; align-items: start; font-size: 14px; color: #40434a; cursor: pointer; }
  .dc-check input { margin-top: 3px; }
  .dc-safety { margin: 16px 0 0; padding: 12px 16px; border: 1px solid var(--line); border-radius: 6px; background: #fff; font-size: 13px; line-height: 1.6; color: #40434a; }

  .dc-actions { display: flex; gap: 12px; align-items: center; margin-top: 22px; }
  .dc-btn { display: inline-flex; align-items: center; gap: 9px; background: var(--brand-solid); color: #fff;
    font: inherit; font-size: 15px; font-weight: 600; border: 0; border-radius: 0; padding: 13px 26px; cursor: pointer; text-decoration: none; transition: background .2s; }
  .dc-btn:hover:not([disabled]) { background: #d61f1e; }
  .dc-btn[disabled] { opacity: .6; cursor: default; }
  .dc-btn.ghost { background: transparent; color: var(--ink); border: 1px solid var(--line); }
  .dc-btn.ghost:hover { border-color: var(--brand); color: var(--brand-ink); background: transparent; }

  .dc-done { padding: 8px 0; }
  .dc-done h2 { margin: 8px 0 12px; font-size: var(--fs-h2); font-weight: var(--w-light); letter-spacing: -.02em; color: var(--ink); }
  .dc-done p { font-size: var(--fs-body); line-height: 1.7; color: #40434a; }
  .dc-done code { font-family: var(--font-mono); font-size: 13px; background: var(--paper-2); padding: 1px 6px; border-radius: 4px; }
  .dc-done .dc-btn { margin-top: 18px; }

  @media (max-width: 620px) { .dc-grid { grid-template-columns: 1fr; } .dc-steps li span { display: none; }
    .dc-review dl > div { grid-template-columns: 1fr; gap: 2px; } }
</style>
