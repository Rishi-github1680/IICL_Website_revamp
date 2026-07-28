// Scroll-reveal for content sections, with a dead-man's switch: content must never be
// left stranded at opacity 0. If the observer never reports — a hidden/background
// document, an embedded view, a browser that throttles it — the animation is dropped
// and the sections are shown plainly.
export function revealSections(rootEl, selector = '.page-section') {
  const nodes = [...rootEl.querySelectorAll(selector)];
  if (!nodes.length) return () => {};

  let reported = false;
  const io = new IntersectionObserver((entries) => {
    reported = true;
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      io.unobserve(en.target);
      en.target.classList.add('is-in');
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  nodes.forEach((el) => { el.classList.add('reveal'); io.observe(el); });

  const bail = setTimeout(() => {
    if (!reported) nodes.forEach((el) => el.classList.remove('reveal'));
  }, 2000);

  return () => { clearTimeout(bail); io.disconnect(); };
}
