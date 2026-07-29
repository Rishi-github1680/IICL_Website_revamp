// Snap a scroll-driven story to its stages.
//
// Both the homepage journey and the /story hero are one sticky stage driven by scroll
// progress, not a stack of sections — so CSS scroll-snap has nothing to snap to, and
// putting `scroll-snap-type` on the document would snap every unrelated section too.
//
// This settles the page onto the nearest stage once the user stops scrolling, so a
// half-finished transition never sits frozen between two steps. It deliberately does
// not fight an in-progress gesture: it waits for scrolling to stop, and it gives up
// immediately if the user starts again.

/**
 * @param {HTMLElement} el        the tall scroll container (the sticky stage's parent)
 * @param {number[]} stops        stage positions as progress fractions, 0..1
 * @param {object} [opts]
 * @param {number} [opts.idleMs]  quiet time before settling
 * @param {number} [opts.maxJump] don't settle if further than this in progress terms —
 *                                a long flick is a deliberate move, not a near-miss
 */
export function snapStory(el, stops, { idleMs = 260, maxJump = 0.09 } = {}) {
  if (!el || !stops?.length) return () => {};
  // Snapping is motion the visitor did not ask for; honour the preference.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  let timer = 0;
  let settling = false;

  const span = () => el.offsetHeight - window.innerHeight;
  const progress = () => {
    const total = span();
    return total <= 0 ? 0 : (window.scrollY - el.offsetTop) / total;
  };

  const settle = () => {
    if (settling) return;
    const p = progress();
    // Only act while the story actually owns the viewport.
    if (p < -0.02 || p > 1.02) return;

    let best = stops[0];
    for (const s of stops) if (Math.abs(s - p) < Math.abs(best - p)) best = s;
    const delta = Math.abs(best - p);
    // Already there, or too far to be a near-miss.
    // A wider dead zone: if the reader has already settled somewhere legible, leave
    // them there. Only pull in when the stage is genuinely mid-transition.
    if (delta < 0.02 || delta > maxJump) return;

    settling = true;
    window.scrollTo({ top: Math.round(el.offsetTop + best * span()), behavior: 'smooth' });
    // Release once the smooth scroll has had time to finish; a hard timeout rather
    // than scrollend, which is not universally supported.
    setTimeout(() => { settling = false; }, 620);
  };

  const onScroll = () => {
    if (settling) return;
    clearTimeout(timer);
    timer = setTimeout(settle, idleMs);
  };
  // Any fresh input cancels a pending settle, so the page never yanks under a gesture.
  const cancel = () => { clearTimeout(timer); };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('wheel', cancel, { passive: true });
  window.addEventListener('touchstart', cancel, { passive: true });
  window.addEventListener('keydown', cancel);

  return () => {
    clearTimeout(timer);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('wheel', cancel);
    window.removeEventListener('touchstart', cancel);
    window.removeEventListener('keydown', cancel);
  };
}
