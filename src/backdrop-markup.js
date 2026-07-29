// The still stand-in for a 3D scene, as one markup string so the Svelte component
// (Backdrop.svelte) and the runtime injector (paintFallback in core.js) can never
// drift apart.
//
// It is drawn as a schematic rather than a glow: a labelled hub, satellites on
// concentric lanes, dashed links with signal moving along them, and a small
// readout. That reads as an infographic — the earlier version was three rings and
// a blur, which looked like a loading state rather than a picture of the product.
export const BACKDROP_HTML = `
<span class="ai-fb-wash"></span>
<svg class="ai-fb-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
    <pattern id="fbGrid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="1"/>
    </pattern>
    <radialGradient id="fbHubGlow">
      <stop offset="0%" stop-color="#ff5a4d" stop-opacity=".55"/>
      <stop offset="100%" stop-color="#ed101d" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="fbVignette">
      <stop offset="55%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity=".85"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="700" fill="url(#fbGrid)"/>

  <!-- Lanes -->
  <g fill="none" stroke="#ed101d" stroke-opacity=".16">
    <circle cx="600" cy="350" r="140"/>
    <circle cx="600" cy="350" r="228" stroke-opacity=".11"/>
    <circle cx="600" cy="350" r="316" stroke-opacity=".07"/>
  </g>

  <!-- Links from hub to each satellite, with signal travelling along them -->
  <g class="fb-links" stroke="#ff5a4d" stroke-width="1.4" stroke-opacity=".5" fill="none">
    <path d="M600 350 L 862 214"/>
    <path d="M600 350 L 878 470"/>
    <path d="M600 350 L 600 122"/>
    <path d="M600 350 L 330 268"/>
    <path d="M600 350 L 352 486"/>
    <path d="M600 350 L 640 578"/>
  </g>

  <!-- Satellites: a node, its ring, and a label plate -->
  <g class="fb-sats">
    <g transform="translate(862,214)"><circle r="9"/><circle class="fb-halo" r="20"/><rect x="18" y="-13" width="104" height="26" rx="6"/><text x="30" y="4">INTAKE</text></g>
    <g transform="translate(878,470)"><circle r="9"/><circle class="fb-halo" r="20"/><rect x="18" y="-13" width="116" height="26" rx="6"/><text x="30" y="4">DECISION</text></g>
    <g transform="translate(600,122)"><circle r="9"/><circle class="fb-halo" r="20"/><rect x="18" y="-13" width="112" height="26" rx="6"/><text x="30" y="4">CONTEXT</text></g>
    <g transform="translate(330,268)"><circle r="9"/><circle class="fb-halo" r="20"/><rect x="-140" y="-13" width="122" height="26" rx="6"/><text x="-128" y="4">SYSTEMS</text></g>
    <g transform="translate(352,486)"><circle r="9"/><circle class="fb-halo" r="20"/><rect x="-140" y="-13" width="122" height="26" rx="6"/><text x="-128" y="4">APPROVAL</text></g>
    <g transform="translate(640,578)"><circle r="9"/><circle class="fb-halo" r="20"/><rect x="18" y="-13" width="104" height="26" rx="6"/><text x="30" y="4">OUTCOME</text></g>
  </g>

  <!-- Hub -->
  <circle class="fb-hub-glow" cx="600" cy="350" r="120" fill="url(#fbHubGlow)"/>
  <g class="fb-hub" transform="translate(600,350)">
    <path class="fb-hub-plate" d="M0-46 39.8-23 39.8 23 0 46 -39.8 23 -39.8-23Z"/>
    <path class="fb-hub-ring" d="M0-64 55.4-32 55.4 32 0 64 -55.4 32 -55.4-32Z"/>
    <text y="6">IICL</text>
  </g>

  <!-- Readout, bottom left -->
  <g class="fb-meter" transform="translate(78,596)">
    <text y="-14">AGENT · RUNNING</text>
    <rect y="0" width="230" height="5" rx="2.5" class="fb-meter-bg"/>
    <rect y="0" width="230" height="5" rx="2.5" class="fb-meter-fill"/>
  </g>

  <rect width="1200" height="700" fill="url(#fbVignette)"/>
</svg>
`;
