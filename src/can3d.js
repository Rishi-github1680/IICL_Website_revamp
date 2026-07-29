// Can this visitor have 3D at all? One rule, decided in the PARENT page, synchronously,
// with zero network cost.
//
// This used to be decided inside the 3D iframe — which meant a device with no WebGL, or
// a phone on 2G, first downloaded the whole Three.js bundle just to be told it could not
// use it, and stared at an empty box until it finished. The fallback was gated behind the
// very payload it exists to replace. Deciding here means those visitors never request it.
//
// Spec F7: "Defer optional 3D... provide a static fallback for every optional visual
// module... do not allow optional visuals to block CTA interaction."

const params = typeof location !== 'undefined' ? new URLSearchParams(location.search) : new URLSearchParams();

// Cheap synchronous probe. Creating the real renderer is what ultimately throws, but
// this catches "WebGL disabled / unavailable" without touching the network.
function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

// A connection the visitor is paying for, or one too slow to carry a 3D bundle before
// they have scrolled past it. Either way the static backdrop is the better answer.
function connectionTooSlow() {
  const c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!c) return false;
  if (c.saveData) return true;
  return ['slow-2g', '2g'].includes(c.effectiveType);
}

/**
 * True when a 3D scene should be created for this visitor.
 * `?fallback=1` forces the static path so the backdrop can be reviewed on demand.
 */
export function can3D() {
  if (typeof window === 'undefined') return false;
  if (params.get('fallback') === '1') return false;
  if (connectionTooSlow()) return false;
  return hasWebGL();
}

/**
 * How long to wait for a scene to report its first rendered frame before giving up on
 * it and leaving the static backdrop in place. Generous enough for a mid-range phone
 * on a normal connection; short enough that a stalled fetch is not a blank box forever.
 */
export const READY_TIMEOUT_MS = 6000;
