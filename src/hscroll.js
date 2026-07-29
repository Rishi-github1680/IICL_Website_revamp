// Svelte action: pan a horizontal rail from the mouse position.
//
// Wheel-based panning was wrong here — every page already scrolls vertically, so
// hijacking the wheel over a rail fought the page. Instead the rail follows the
// pointer: move the mouse toward the right of the rail and the cards travel left
// to meet it, like sliding a card table. The wheel is left alone entirely.
//
// Touch and trackpad already pan these natively and are not touched. Only a real
// mouse drives this, so a tap on a phone still just opens the card.
export function hpan(node, opts = {}) {
  // Fraction of the rail's width at each end that maps to "fully parked" — without
  // it, the ends are only reachable by pinning the pointer to the very edge.
  const inset = opts.inset ?? 0.12;

  let target = node.scrollLeft;
  let raf = 0;
  let active = false;

  const max = () => node.scrollWidth - node.clientWidth;

  const frame = () => {
    const gap = target - node.scrollLeft;
    // Ease in, so the rail glides rather than snapping to the pointer.
    if (Math.abs(gap) < 0.5) {
      node.scrollLeft = target;
      raf = 0;
      return;
    }
    node.scrollLeft += gap * 0.12;
    raf = requestAnimationFrame(frame);
  };

  const run = () => { if (!raf) raf = requestAnimationFrame(frame); };

  const onMove = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const span = max();
    if (span <= 1) return;

    const r = node.getBoundingClientRect();
    // Position within the rail, 0 → 1, with the dead zones at each end removed.
    const raw = (e.clientX - r.left) / r.width;
    const ratio = Math.min(1, Math.max(0, (raw - inset) / (1 - inset * 2)));

    if (!active) {
      active = true;
      // Snapping would fight a continuously moving target.
      node.style.scrollSnapType = 'none';
    }
    target = ratio * span;
    run();
  };

  const onLeave = () => {
    active = false;
    // Let the rail settle onto a card once the pointer is away.
    node.style.scrollSnapType = '';
  };

  node.addEventListener('pointermove', onMove, { passive: true });
  node.addEventListener('pointerleave', onLeave);

  return {
    destroy() {
      cancelAnimationFrame(raf);
      node.style.scrollSnapType = '';
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
    },
  };
}
