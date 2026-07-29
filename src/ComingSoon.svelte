<script>
  // Fallback for pages that don't exist yet: the logo under orbiting rings, a playful
  // "not there yet" headline, and a notify-me flow (mailto — zero backend needed).
  import Nav from './Nav.svelte';
  import Cursor from './Cursor.svelte';
  let {
    kicker = 'Under construction',
    h1 = "This page isn't there yet",
    sub = "We're working on it. It'll be worth the wait.",
    page = '',
  } = $props();

  // Mouse parallax on the logo — the one interactive flourish.
  let dx = $state(0), dy = $state(0);
  const onMove = (e) => {
    dx = (e.clientX / window.innerWidth - 0.5) * 26;
    dy = (e.clientY / window.innerHeight - 0.5) * 26;
  };
  const notify = `mailto:reachus@iicl.in?subject=${encodeURIComponent(`Notify me when ${page || 'this page'} is live`)}`;
</script>

<svelte:window on:mousemove={onMove} />

<div class="cs-root">
  <Cursor />
  <Nav />
  <main class="cs">
    <div class="cs-stage" style="transform: translate3d({dx}px, {dy}px, 0)">
      <span class="cs-ring r1" aria-hidden="true"></span>
      <span class="cs-ring r2" aria-hidden="true"></span>
      <img class="cs-logo" src="/iicl_logo.png" alt="IICL logo" loading="lazy" decoding="async" />
    </div>
    <span class="cs-kicker mono">{kicker}</span>
    <h1 class="cs-h1">{h1}<span class="cs-caret" aria-hidden="true">_</span></h1>
    <p class="cs-sub">{sub}</p>
    <div class="cs-actions">
      <a class="cs-cta" href={notify}>Notify me when it's live <span class="mono">→</span></a>
      <a class="cs-ghost" href="/">Back to home</a>
    </div>
  </main>
</div>

<style>
  .cs-root { min-height: 100vh; background: radial-gradient(60% 50% at 50% 30%, #131315, #060606 75%);
    color: #f4f2ee; font-family: 'IBM Plex Sans', system-ui, sans-serif; display: flex; flex-direction: column; }
  .mono { font-family: 'IBM Plex Mono', monospace; }
  .cs { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 80px 24px 100px; }

  .cs-stage { position: relative; width: 190px; height: 190px; display: grid; place-items: center;
    margin-bottom: 38px; transition: transform .25s ease-out; }
  .cs-logo { width: 96px; height: auto; animation: bob 3.2s ease-in-out infinite; }
  .cs-ring { position: absolute; inset: 0; border-radius: 50%; border: 1px dashed rgba(238,47,46,.5);
    animation: spin 14s linear infinite; }
  .cs-ring.r2 { inset: 22px; border-color: rgba(255,255,255,.18); animation-duration: 9s; animation-direction: reverse; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }

  .cs-kicker { font-size: 11px; letter-spacing: .3em; text-transform: uppercase; color: #ff8d8b; }
  .cs-h1 { margin: 16px 0 0; font-size: clamp(32px, 5vw, 56px); font-weight: 700; letter-spacing: -0.03em; color: #fff; }
  .cs-caret { color: #ee2f2e; animation: blink 1s steps(1) infinite; }
  @keyframes blink { 50% { opacity: 0; } }
  .cs-sub { margin: 18px 0 0; max-width: 46ch; font-size: 17px; line-height: 1.7; color: rgba(244,242,238,.66); }

  .cs-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-top: 36px; }
  .cs-cta { display: inline-flex; align-items: center; gap: 10px; background: #ee2f2e; color: #fff;
    text-decoration: none; font-weight: 600; font-size: 16px; padding: 15px 30px; transition: background .2s, transform .2s; }
  .cs-cta:hover { background: #d61f1e; transform: translateY(-2px); }
  .cs-ghost { display: inline-flex; align-items: center; color: #f4f2ee; text-decoration: none; font-weight: 500;
    font-size: 16px; padding: 14px 30px; border: 1px solid rgba(255,255,255,.28); transition: border-color .2s; }
  .cs-ghost:hover { border-color: #ee2f2e; }

  @media (prefers-reduced-motion: reduce) {
    .cs-logo, .cs-ring, .cs-caret { animation: none; }
    .cs-stage { transition: none; transform: none !important; }
  }
</style>
