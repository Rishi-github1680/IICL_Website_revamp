<script>
  import { onMount } from 'svelte';
  let ring;
  onMount(() => {
    // Only on devices with a real pointer (skip touch).
    if (!window.matchMedia('(pointer: fine)').matches) return;

    // Hide the OS pointer everywhere; the ring is the website cursor.
    const hide = document.createElement('style');
    hide.textContent = '*{cursor:none !important}';
    document.head.appendChild(hide);

    let x = -100, y = -100, cx = -100, cy = -100, shown = false;
    const onMove = (e) => {
      x = e.clientX; y = e.clientY;
      if (!shown) { shown = true; ring.style.opacity = '1'; }
    };
    const onDown = () => ring.classList.add('down');
    const onUp = () => ring.classList.remove('down');
    const onLeave = () => { ring.style.opacity = '0'; };
    const onEnter = () => { if (shown) ring.style.opacity = '1'; };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    let raf;
    const frame = () => {
      cx += (x - cx) * 0.35; cy += (y - cy) * 0.35;
      ring.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      hide.remove();
    };
  });
</script>

<div bind:this={ring} class="iicl-cursor" aria-hidden="true"><i></i></div>

<style>
  .iicl-cursor {
    position: fixed; top: 0; left: 0; z-index: 99999; width: 30px; height: 30px;
    border: 1.6px solid #ee2f2e; border-radius: 50%; pointer-events: none;
    opacity: 0; display: grid; place-items: center;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.15), 0 0 14px rgba(238,47,46,0.35);
    transition: opacity .3s ease, background .18s ease, border-color .18s ease;
    will-change: transform;
  }
  .iicl-cursor i { width: 4px; height: 4px; border-radius: 50%; background: #ee2f2e; }
  .iicl-cursor:global(.down) { background: rgba(238,47,46,0.28); }
  @media (pointer: coarse) { .iicl-cursor { display: none; } }
</style>
