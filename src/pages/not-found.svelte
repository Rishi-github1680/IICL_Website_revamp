<script>
  // 404. The spec (G11) requires real recovery routes rather than a "notify me"
  // mailto, because no notification workflow exists behind it. The page is marked
  // noindex through the manifest, and Vercel serves 404.html with a real 404 status.
  import Nav from '../Nav.svelte';
  import Footer from '../Footer.svelte';

  const ROUTES = [
    { label: 'Home', href: '/', desc: 'Enterprise AI and GCC technology teams.' },
    { label: 'Enterprise AI & GenAI', href: '/ai-genai-services', desc: 'Consulting and implementation, from use case to production.' },
    { label: 'Agentic AI', href: '/agentic-ai', desc: 'Governed agents that work across enterprise systems.' },
    { label: 'GCC Technology Teams', href: '/gcc-technology-teams', desc: 'Build specialised technology capability in India.' },
    { label: 'Contact', href: '/contactus', desc: 'Tell us what you are trying to do.' },
  ];
</script>

<div class="nf-root">
  <Nav />

  <main class="nf-main">
    <div class="wrap">
      <span class="nf-code mono">404</span>
      <h1 class="nf-h1">That page isn't here</h1>
      <p class="nf-lede">
        The link may be out of date, or the page may have moved. Here is where most people are going.
      </p>

      <ul class="nf-routes">
        {#each ROUTES as r}
          <li>
            <a href={r.href}>
              <strong>{r.label}</strong>
              <span>{r.desc}</span>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </main>

  <Footer />
</div>

<style>
  .nf-root { background: #fff; color: var(--ink); font-family: var(--font); min-height: 100vh;
    display: flex; flex-direction: column; }
  .nf-main { flex: 1; padding: 80px 0 64px; }
  .nf-main :global(.wrap) { max-width: var(--wrap-max); margin: 0 auto; padding: 0 var(--wrap-pad); box-sizing: border-box; }
  .mono { font-family: var(--font-mono); }

  .nf-code { font-size: 12px; letter-spacing: .24em; color: #ee2f2e; }
  .nf-h1 { margin: 14px 0 0; font-size: var(--fs-h1); line-height: 1.08; letter-spacing: -.03em;
    font-weight: var(--w-heading); color: var(--ink); }
  .nf-lede { margin: 14px 0 0; max-width: 56ch; font-size: var(--fs-body); line-height: 1.65; color: var(--muted); }

  .nf-routes { list-style: none; margin: 30px 0 0; padding: 0; max-width: 760px;
    border-top: 1px solid var(--line); }
  .nf-routes li { border-bottom: 1px solid var(--line); }
  .nf-routes a { display: grid; gap: 3px; padding: 16px 2px; text-decoration: none;
    transition: padding-left .2s ease; }
  .nf-routes a:hover { padding-left: 8px; }
  .nf-routes strong { font-size: 16px; font-weight: var(--w-heading); color: var(--ink); }
  .nf-routes a:hover strong { color: #ee2f2e; }
  .nf-routes span { font-size: var(--fs-small); color: var(--muted); }
</style>
