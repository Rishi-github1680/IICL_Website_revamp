// Svelte action: animate a number from 0 to its rendered value when it scrolls
// into view. The final value lives in the markup, so a failed animation, reduced
// motion, or a crawler all see the correct number — the animation only ever
// replaces intermediate frames.
//   <span use:countUp>99%</span>   <span use:countUp>20+</span>   <span use:countUp>08</span>
export function countUp(node, { duration = 1300 } = {}) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const original = node.textContent;
  const m = original.match(/^([^0-9]*)([\d,.]+)([\s\S]*)$/);
  if (!m) return;
  const target = parseFloat(m[2].replace(/,/g, ''));
  if (!isFinite(target)) return;
  const decimals = (m[2].split('.')[1] || '').length;
  // "08" keeps its zero-padding while counting.
  const pad = /^0\d/.test(m[2]) ? m[2].length : 0;
  const grouped = m[2].includes(',');

  let raf = 0;
  const fmt = (v) => {
    let s = v.toFixed(decimals);
    if (grouped) s = Number(s).toLocaleString('en-US', { minimumFractionDigits: decimals });
    if (pad) s = s.padStart(pad, '0');
    return m[1] + s + m[3];
  };

  const io = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    io.disconnect();
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      node.textContent = fmt(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
      else node.textContent = original;
    };
    raf = requestAnimationFrame(step);
  }, { threshold: 0.4 });
  io.observe(node);

  return {
    destroy() {
      io.disconnect();
      cancelAnimationFrame(raf);
      node.textContent = original;
    },
  };
}
