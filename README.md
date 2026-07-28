# IICL Premium 3D Models

Three original, interactive WebGL modules for deployment inside a custom website:

- `brain.html` — particle-based AI brain with live synaptic signals
- `microchip.html` — metallic AI processor with luminous circuit pulses
- `neural-network.html` — layered neural network with animated inference paths

The visual system uses IICL-inspired black, red and white styling. Three.js and
all runtime code are bundled during production build, so the deployed package
does not depend on an external CDN.

## Production build

```bash
npm install
npm run build
```

Upload the complete `dist` folder to your website, for example:

```text
/public/iicl-3d/
```

## Embed any model

```html
<iframe
  src="/iicl-3d/brain.html?ui=0"
  title="Interactive AI Brain"
  loading="lazy"
  allow="fullscreen"
  style="width:100%;height:720px;border:0;background:#050505"
></iframe>
```

Replace `brain.html` with `microchip.html` or `neural-network.html`.

## Query options

| Parameter | Values | Use |
| --- | --- | --- |
| `ui` | `1` or `0` | Show or hide the IICL HUD and model copy |
| `transparent` | `1` | Use a transparent WebGL background |
| `quality` | `auto`, `high`, `low` | Select particle density and rendering load |

Example for a transparent hero visual:

```html
<iframe
  src="/iicl-3d/neural-network.html?ui=0&transparent=1&quality=high"
  title="Interactive AI Neural Network"
  style="width:100%;height:680px;border:0;background:transparent"
></iframe>
```

## Recommended deployment

- Desktop hero: `quality=high`, 620–820 px height
- General responsive sections: `quality=auto`, 500–700 px height
- Mobile-only sections: `quality=low`, 420–560 px height
- For accessibility, the animation automatically slows when the visitor has
  reduced-motion enabled.

## Brand controls

The primary visual tokens are at the top of `src/styles.css`:

```css
--black: #050505;
--red: #ed101d;
--red-hot: #ff3340;
--white: #f4f2ee;
```

The modules are procedural WebGL experiences rather than static GLB files. This
keeps the particle motion, bloom, live signals and pointer interaction intact.
