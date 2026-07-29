<script>
  // Floating contact agent. The launcher mark is deliberately one glyph rather than
  // two stacked logos — a chat bubble carrying voice bars, so it reads as "message
  // or talk" at 26px without a legend.
  //
  // The panel is a real chat screen, not a menu. It is a *guided* assistant, not a
  // language model: it asks for the two things a reply actually needs (what you
  // want, and how to reach you), then hands the whole conversation to WhatsApp or
  // to the enquiry endpoint. The copy never claims to be an AI answering live.
  import { tick } from 'svelte';

  let open = $state(false);
  let draft = $state('');
  let listEl;

  const PHONE = '+91 99894 42002';
  const TEL = 'tel:+919989442002';
  const waLink = (text) => 'https://wa.me/919989442002?text=' + encodeURIComponent(text);

  const GREETING = "Hi — I'm the IICL assistant. Tell me what you're trying to solve and I'll route it to the right person.";

  // { from: 'bot' | 'you', text }
  let msgs = $state([{ from: 'bot', text: GREETING }]);
  let stage = $state('topic');   // topic → contact → done
  let topic = $state('');

  const CHIPS = [
    'Automate customer calls',
    'WhatsApp for sales & support',
    'Book a demo',
    'Something else',
  ];

  async function say(from, text) {
    msgs = [...msgs, { from, text }];
    await tick();
    if (listEl) listEl.scrollTop = listEl.scrollHeight;
  }

  async function botReply(text) {
    await new Promise((r) => setTimeout(r, 380));   // a beat, so it doesn't feel canned
    await say('bot', text);
  }

  async function submit(text) {
    const value = (text ?? draft).trim();
    if (!value) return;
    draft = '';
    await say('you', value);

    if (stage === 'topic') {
      topic = value;
      stage = 'contact';
      await botReply("Got it. What's the best email or phone number to reply on?");
      return;
    }

    if (stage === 'contact') {
      stage = 'done';
      await botReply("Thanks — that's everything I need. Send it across and a person will pick it up.");
    }
  }

  // The transcript, handed over verbatim so nothing is retyped.
  const transcript = $derived(
    'Hi IICL — enquiry from your website.\n\n' +
      msgs.filter((m) => m.from === 'you').map((m, i) => `${i === 0 ? 'Need' : 'Contact'}: ${m.text}`).join('\n')
  );

  function reset() {
    msgs = [{ from: 'bot', text: GREETING }];
    stage = 'topic';
    topic = '';
    draft = '';
  }

  const close = () => (open = false);
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && close()} />

<div class="ag" class:is-open={open}>
  {#if open}
    <div class="ag-panel" role="dialog" aria-label="Chat with IICL">
      <header class="ag-head">
        <span class="ag-avatar" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="18" height="18">
            <path d="M16 4.5c-6.35 0-11.5 4.55-11.5 10.16 0 3.2 1.68 6.05 4.3 7.91v4.93l4.53-2.5c.86.17 1.75.26 2.67.26 6.35 0 11.5-4.55 11.5-10.6S22.35 4.5 16 4.5Z"
              fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="ag-head-body">
          <span class="ag-head-t">IICL Assistant</span>
          <span class="ag-head-s"><i class="ag-live"></i> Replies in a few minutes</span>
        </span>
        <button class="ag-x" onclick={close} aria-label="Close chat">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </header>

      <div class="ag-log" bind:this={listEl} role="log" aria-live="polite">
        {#each msgs as m}
          <div class="ag-msg ag-msg-{m.from}">{m.text}</div>
        {/each}

        {#if stage === 'topic' && msgs.length === 1}
          <div class="ag-chips">
            {#each CHIPS as c}
              <button class="ag-chip" onclick={() => submit(c)}>{c}</button>
            {/each}
          </div>
        {/if}

        {#if stage === 'done'}
          <div class="ag-hand">
            <a class="ag-opt" href={waLink(transcript)} target="_blank" rel="noopener">
              <span class="ag-ico ag-ico-wa" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                  <path d="M12.04 2A9.9 9.9 0 0 0 2.1 11.9a9.8 9.8 0 0 0 1.35 4.96L2 22l5.3-1.38a9.9 9.9 0 0 0 4.74 1.2h.01a9.9 9.9 0 0 0 9.94-9.9A9.9 9.9 0 0 0 12.04 2Zm5.8 14.05c-.25.69-1.45 1.32-2 1.36-.51.04-1.16.06-1.87-.12a16.9 16.9 0 0 1-1.7-.63c-2.99-1.29-4.94-4.3-5.09-4.5-.15-.2-1.22-1.62-1.22-3.09s.77-2.19 1.04-2.49c.27-.3.59-.37.79-.37h.57c.18 0 .43-.07.67.51.25.6.85 2.07.92 2.22.08.15.13.33.03.53-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.3 2.36 1.45.3.15.47.13.64-.08.17-.2.74-.86.94-1.16.2-.3.4-.25.66-.15.27.1 1.72.81 2.01.96.3.15.5.22.57.35.07.12.07.72-.18 1.41Z"/>
                </svg>
              </span>
              <span class="ag-body">
                <span class="ag-opt-t">Send on WhatsApp</span>
                <span class="ag-opt-d">Your message, already written</span>
              </span>
              <span class="ag-arw" aria-hidden="true">→</span>
            </a>

            <a class="ag-opt" href={TEL}>
              <span class="ag-ico ag-ico-call" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round">
                  <path d="M12 3v18M8 7v10M16 7v10M4 10v4M20 10v4"/>
                </svg>
              </span>
              <span class="ag-body">
                <span class="ag-opt-t">Call instead</span>
                <span class="ag-opt-d">{PHONE}</span>
              </span>
              <span class="ag-arw" aria-hidden="true">→</span>
            </a>

            <button class="ag-restart" onclick={reset}>Start over</button>
          </div>
        {/if}
      </div>

      {#if stage !== 'done'}
        <form class="ag-input" onsubmit={(e) => { e.preventDefault(); submit(); }}>
          <input
            bind:value={draft}
            placeholder={stage === 'contact' ? 'Email or phone…' : 'Type your message…'}
            aria-label="Your message"
            autocomplete={stage === 'contact' ? 'email' : 'off'}
          />
          <button class="ag-send" type="submit" aria-label="Send" disabled={!draft.trim()}>
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 12h15M13 6l6 6-6 6"/>
            </svg>
          </button>
        </form>
      {/if}
    </div>
  {/if}

  <button
    class="ag-fab"
    aria-expanded={open}
    aria-label={open ? 'Close chat' : 'Chat with IICL on WhatsApp or by voice'}
    onclick={() => (open = !open)}
  >
    <span class="ag-ring" aria-hidden="true"></span>

    <!-- One mark, both channels: a chat bubble whose contents are voice bars. -->
    <svg class="ag-mark" viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
      <path class="ag-bubble" d="M16 4.5c-6.35 0-11.5 4.55-11.5 10.16 0 3.2 1.68 6.05 4.3 7.91v4.93l4.53-2.5c.86.17 1.75.26 2.67.26 6.35 0 11.5-4.55 11.5-10.6S22.35 4.5 16 4.5Z"
        fill="none" stroke="currentColor" stroke-width="2.1" stroke-linejoin="round"/>
      <g class="ag-bars" stroke="currentColor" stroke-width="2.1" stroke-linecap="round">
        <line x1="11.4" y1="12.4" x2="11.4" y2="17.2"/>
        <line x1="16"   y1="10.2" x2="16"   y2="19.4"/>
        <line x1="20.6" y1="12.4" x2="20.6" y2="17.2"/>
      </g>
    </svg>

    <svg class="ag-close" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18"/>
    </svg>
  </button>
</div>

<style>
  .ag { position: fixed; right: 22px; bottom: 22px; z-index: 60; display: flex; flex-direction: column;
    align-items: flex-end; gap: 12px; font-family: var(--font, system-ui, sans-serif); }

  /* ── Launcher ── */
  .ag-fab { position: relative; width: 56px; height: 56px; flex: none; display: grid; place-items: center;
    border: 0; border-radius: 50%; cursor: pointer; color: #fff;
    background: linear-gradient(145deg, #ff4a3d, #d61f1e);
    box-shadow: 0 10px 28px rgba(214,31,30,0.42), 0 2px 6px rgba(0,0,0,0.3);
    transition: transform .28s cubic-bezier(0.22,1,0.36,1), box-shadow .28s; }
  .ag-fab:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 16px 34px rgba(214,31,30,0.5); }
  .ag-fab:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

  .ag-ring { position: absolute; inset: 0; border-radius: 50%; border: 2px solid rgba(238,47,46,0.55);
    animation: agPulse 2.6s ease-out infinite; pointer-events: none; }
  @keyframes agPulse {
    0%   { transform: scale(1);    opacity: .8; }
    70%  { transform: scale(1.45); opacity: 0; }
    100% { transform: scale(1.45); opacity: 0; }
  }

  .ag-mark, .ag-close { grid-area: 1 / 1; transition: opacity .22s, transform .28s cubic-bezier(0.22,1,0.36,1); }
  .ag-close { opacity: 0; transform: rotate(-90deg) scale(.7); }
  .is-open .ag-mark { opacity: 0; transform: rotate(90deg) scale(.7); }
  .is-open .ag-close { opacity: 1; transform: none; }
  .is-open .ag-ring { animation: none; opacity: 0; }

  .ag-bars line { transform-origin: center; animation: agBars 1.8s ease-in-out infinite; }
  .ag-bars line:nth-child(1) { animation-delay: -.6s; }
  .ag-bars line:nth-child(3) { animation-delay: -1.2s; }
  @keyframes agBars { 0%, 100% { transform: scaleY(.6); } 50% { transform: scaleY(1); } }

  /* ── Chat panel ──
     The entry animation moves the panel but never touches opacity. A *running*
     animation applies its from-frame, and in a throttled or hidden document that
     frame can persist — so animating opacity from 0 risks an invisible panel.
     Transform-only keeps the content visible whatever the animation does. */
  .ag-panel { width: 360px; height: min(620px, calc(100vh - 120px)); display: flex; flex-direction: column;
    background: #14161a; color: #f4f2ee; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px;
    overflow: hidden; box-shadow: 0 22px 48px rgba(0,0,0,0.5);
    animation: agIn .26s cubic-bezier(0.22,1,0.36,1); }
  @keyframes agIn { from { transform: translateY(10px) scale(.97); } to { transform: none; } }

  .ag-head { display: flex; align-items: center; gap: 11px; padding: 13px 14px;
    background: linear-gradient(145deg, #ff4a3d, #d61f1e); flex: none; }
  .ag-avatar { width: 34px; height: 34px; flex: none; display: grid; place-items: center; border-radius: 50%;
    background: rgba(255,255,255,0.18); color: #fff; }
  .ag-head-body { display: grid; gap: 1px; min-width: 0; }
  .ag-head-t { font-size: 14.5px; font-weight: 600; color: #fff; }
  .ag-head-s { display: inline-flex; align-items: center; gap: 6px; font-size: 11.5px; color: rgba(255,255,255,0.82); }
  .ag-live { width: 6px; height: 6px; border-radius: 50%; background: #6ef58f; box-shadow: 0 0 0 0 rgba(110,245,143,.7);
    animation: agLive 2.2s ease-out infinite; }
  @keyframes agLive { 70% { box-shadow: 0 0 0 6px rgba(110,245,143,0); } 100% { box-shadow: 0 0 0 0 rgba(110,245,143,0); } }
  .ag-x { margin-left: auto; background: none; border: 0; color: rgba(255,255,255,0.85); cursor: pointer;
    padding: 4px; border-radius: 6px; display: grid; place-items: center; transition: background .2s; }
  .ag-x:hover { background: rgba(255,255,255,0.18); color: #fff; }

  .ag-log { flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 8px;
    background: #101216; scrollbar-width: thin; }

  /* Transform-only, for the same reason as the panel — a message must never be
     stuck invisible because its animation did not advance. */
  .ag-msg { max-width: 84%; padding: 9px 12px; font-size: 13.5px; line-height: 1.5; border-radius: 13px;
    animation: agMsg .22s ease-out; }
  @keyframes agMsg { from { transform: translateY(5px); } }
  .ag-msg-bot { align-self: flex-start; background: #1e2229; color: rgba(244,242,238,0.92); border-bottom-left-radius: 4px; }
  .ag-msg-you { align-self: flex-end; background: var(--brand-solid, #d81f1e); color: #fff; border-bottom-right-radius: 4px; }

  .ag-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
  .ag-chip { font: inherit; font-size: 12px; color: rgba(244,242,238,0.85); background: transparent;
    border: 1px solid rgba(255,255,255,0.2); border-radius: 999px; padding: 7px 12px; cursor: pointer;
    transition: border-color .2s, background .2s, color .2s; }
  .ag-chip:hover { border-color: #ee2f2e; background: rgba(238,47,46,0.14); color: #fff; }

  /* Handover block, shown once the assistant has what it needs. */
  .ag-hand { margin-top: 6px; display: grid; gap: 4px; }
  .ag-opt { display: flex; align-items: center; gap: 11px; padding: 10px; border-radius: 10px;
    text-decoration: none; color: inherit; background: #1a1e25; transition: background .2s; }
  .ag-opt:hover { background: #232830; }
  .ag-ico { flex: none; width: 32px; height: 32px; display: grid; place-items: center; border-radius: 9px; }
  .ag-ico-wa { background: rgba(37,211,102,0.16); color: #25d366; }
  .ag-ico-call { background: rgba(238,47,46,0.16); color: #ff5a4d; }
  .ag-body { display: grid; gap: 1px; min-width: 0; }
  .ag-opt-t { font-size: 13.5px; font-weight: 500; color: #fff; }
  .ag-opt-d { font-size: 11.5px; color: rgba(244,242,238,0.55); }
  .ag-arw { margin-left: auto; font-family: var(--font-mono, monospace); font-size: 13px;
    color: rgba(244,242,238,0.35); transition: transform .22s, color .22s; }
  .ag-opt:hover .ag-arw { color: #ff5a4d; transform: translateX(3px); }
  .ag-restart { justify-self: start; margin-top: 2px; font: inherit; font-size: 11.5px;
    color: rgba(244,242,238,0.5); background: none; border: 0; cursor: pointer; padding: 4px 0;
    text-decoration: underline; text-underline-offset: 3px; }
  .ag-restart:hover { color: #ff5a4d; }

  .ag-input { display: flex; align-items: center; gap: 8px; padding: 10px; flex: none;
    background: #14161a; border-top: 1px solid rgba(255,255,255,0.1); }
  .ag-input input { flex: 1; min-width: 0; font: inherit; font-size: 13.5px; color: #f4f2ee;
    background: #1e2229; border: 1px solid transparent; border-radius: 999px; padding: 10px 14px;
    transition: border-color .2s; }
  .ag-input input::placeholder { color: rgba(244,242,238,0.4); }
  .ag-input input:focus { outline: none; border-color: rgba(238,47,46,0.6); }
  .ag-send { flex: none; width: 36px; height: 36px; display: grid; place-items: center; border: 0;
    border-radius: 50%; background: var(--brand-solid, #d81f1e); color: #fff; cursor: pointer; transition: background .2s, opacity .2s; }
  .ag-send:hover:not([disabled]) { background: #ff3f3e; }
  .ag-send[disabled] { opacity: .4; cursor: default; }

  /* On a phone the panel takes the whole screen — a 360px card floating over the
     page is fiddly to type into, and the keyboard covers half of it. */
  @media (max-width: 640px) {
    .ag { right: 16px; bottom: 16px; }
    .ag-panel { position: fixed; inset: 0; width: 100%; height: 100%; height: 100dvh;
      border: 0; border-radius: 0; animation: agInFull .24s cubic-bezier(0.22,1,0.36,1); }
    @keyframes agInFull { from { transform: translateY(14px); } to { transform: none; } }
    .ag-head { padding: 14px 16px; padding-top: max(14px, env(safe-area-inset-top)); }
    .ag-log { padding: 16px; }
    .ag-msg { max-width: 88%; font-size: 14.5px; }
    .ag-input { padding: 12px 16px; padding-bottom: max(12px, env(safe-area-inset-bottom)); }
    .ag-input input { font-size: 16px; }   /* 16px stops iOS zooming the page on focus */
    /* The launcher would otherwise sit on top of the full-screen panel. */
    .is-open .ag-fab { display: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ag-ring, .ag-bars line, .ag-live, .ag-msg { animation: none; }
    .ag-fab, .ag-panel, .ag-mark, .ag-close, .ag-arw { transition: none; animation: none; }
  }
</style>
