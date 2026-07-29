<script>
  // The still stand-in for a 3D scene, used when the visitor has switched models off
  // or when WebGL is unavailable. Markup comes from backdrop-markup.js so this and
  // paintFallback() in core.js always draw the same thing; styling is backdrop.css,
  // which both stylesheets import.
  import { BACKDROP_HTML } from './backdrop-markup.js';

  let {
    label = 'Diagram of an IICL agent at work',
    // Pages with their own artwork pass it here; it sits behind the schematic.
    img = null,
    imgAlt = '',
  } = $props();
</script>

<div class="ai-fb" role="img" aria-label={label}>
  {#if img}<img class="ai-fb-photo" src={img} alt={imgAlt} loading="lazy" />{/if}
  {@html BACKDROP_HTML}
</div>
