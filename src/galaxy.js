// Point 4 — "At scale" as a product galaxy. Eight product planets on concentric orbits around
// the IICL core sun, wrapped in galaxy dust. The explorer is the site's signature moment:
// entering dives the camera into the system, you travel alongside a product star, and a scroll
// flies you along an arc to the next one. All of it stays hidden until the hero sends iiclExplore.
import {
  THREE,
  createStage,
  createParticleMaterial,
  addAtmosphere,
  isLowPower,
} from "./core.js";
import { MENU } from "./menu.js";

const PRODUCTS = (MENU.find((m) => m.mega === "products") || { items: [] }).items;
const PN = PRODUCTS.length;

const stage = createStage({
  cameraPosition: [0.4, 3.8, 10.2],
  target: [0.6, -0.3, 0],
  bloomStrength: 1.25,
  bloomRadius: 0.75,
  bloomThreshold: 0.08,
  fogDensity: 0.02,
  minDistance: 4.5,
  maxDistance: 15,
});
const homePos = stage.camera.position.clone();
const homeLook = stage.controls.target.clone();

const galaxy = new THREE.Group();
galaxy.position.x = 0.8;
galaxy.rotation.x = 0.14;
stage.scene.add(galaxy);
addAtmosphere(stage, isLowPower ? 380 : 760, 15);

// ── Galaxy dust ──
const N = isLowPower ? 2800 : 6000;
const ARMS = 3;
const R_MAX = 4.3;
const pos = new Float32Array(N * 3);
const col = new Float32Array(N * 3);
const rnd = (i, s) => Math.abs((Math.sin(i * s) * 43758.5453) % 1);
for (let i = 0; i < N; i++) {
  const frac = Math.pow(rnd(i, 12.9), 0.72);
  const arm = i % ARMS;
  const r = 0.25 + frac * R_MAX;
  const theta = frac * 4.6 + (arm / ARMS) * Math.PI * 2 + (rnd(i, 45.1) - 0.5) * (0.32 + frac * 0.4);
  const thick = (1 - frac) * 0.4 + 0.05;
  pos[i * 3] = Math.cos(theta) * r + (rnd(i, 78.2) - 0.5) * 0.2;
  pos[i * 3 + 1] = (rnd(i, 91.7) - 0.5) * 2 * thick - 0.12;
  pos[i * 3 + 2] = Math.sin(theta) * r + (rnd(i, 33.3) - 0.5) * 0.2;
  if (rnd(i, 57.5) > 0.972) {
    col[i * 3] = 1; col[i * 3 + 1] = 0.72; col[i * 3 + 2] = 0.74;
  } else {
    const it = (0.24 + (1 - frac) * 0.42) * (0.6 + rnd(i, 21.3) * 0.55);
    col[i * 3] = it; col[i * 3 + 1] = 0.02 + it * 0.05; col[i * 3 + 2] = 0.03 + it * 0.07;
  }
}
const dustGeo = new THREE.BufferGeometry();
dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
dustGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
galaxy.add(new THREE.Points(dustGeo, createParticleMaterial({ size: isLowPower ? 0.05 : 0.044, opacity: 0.6 })));

// ── Core sun ──
const core = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.42, isLowPower ? 2 : 3),
  new THREE.MeshPhysicalMaterial({
    color: 0x180103, emissive: 0xed101d, emissiveIntensity: 1.5,
    metalness: 0.7, roughness: 0.16, transparent: true, opacity: 0.94,
  }),
);
galaxy.add(core);
const coreGlow = new THREE.Mesh(
  new THREE.SphereGeometry(0.62, 24, 16),
  new THREE.MeshBasicMaterial({ color: 0xff2733, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending }),
);
galaxy.add(coreGlow);
// The sun is the only body with an energy lattice — reads as the engine, not a product.
const coreWire = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.56, 1),
  new THREE.MeshBasicMaterial({ color: 0xff5962, transparent: true, opacity: 0.3, wireframe: true, blending: THREE.AdditiveBlending }),
);
galaxy.add(coreWire);

// Product badge textures: the whole planet — accent glow, dark coin, accent ring and
// the white product mark — baked into ONE canvas, drawn as ONE sprite. The first cut
// layered a flat sprite with a 3D glow sphere and a torus ring; those meshes cut
// through the sprite plane and z-fought as the planet orbited, which is what read as
// flicker/shaking. A single textured sprite has nothing to fight with.
//
// The icons are stroke="currentColor" line art, which resolves to nothing outside a
// DOM context — the colour is substituted in before rasterising. The badge (glow +
// coin + ring) is drawn immediately so a planet is never blank; the mark lands on the
// same canvas when its fetch resolves.
const _badgeTex = new Map();
function badgeTexture(url, accHex) {
  const key = url + accHex;
  if (_badgeTex.has(key)) return _badgeTex.get(key);

  const S = 256, mid = S / 2;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d");

  // Soft accent halo, widest first so everything else sits on top of it.
  const halo = ctx.createRadialGradient(mid, mid, S * 0.18, mid, mid, S * 0.5);
  halo.addColorStop(0, accHex + "59");
  halo.addColorStop(0.65, accHex + "1f");
  halo.addColorStop(1, accHex + "00");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, S, S);

  // The coin: near-black disc with a crisp accent ring.
  ctx.beginPath();
  ctx.arc(mid, mid, S * 0.32, 0, Math.PI * 2);
  ctx.fillStyle = "#0c0d10";
  ctx.fill();
  ctx.lineWidth = S * 0.02;
  ctx.strokeStyle = accHex;
  ctx.stroke();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  _badgeTex.set(key, tex);

  fetch(url)
    .then((r) => (r.ok ? r.text() : Promise.reject(new Error(r.status))))
    .then((svg) => new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg.replace(/currentColor/g, "#ffffff"));
    }))
    .then((img) => {
      // Mark centred inside the coin, well clear of the ring.
      const m = S * 0.36;
      ctx.drawImage(img, mid - m / 2, mid - m / 2, m, m);
      tex.needsUpdate = true;
    })
    .catch(() => {});   // a missing icon leaves a clean coin, not a broken scene

  return tex;
}

// ── Product planets — clean concentric lanes, every planet carrying its brand accent.
// The signature move: each planet pulls a comet tail of light along its lane, so the whole
// system reads as one streamlined machine in motion — flat, ordered, alive.
const TRAIL_N = isLowPower ? 36 : 60;
const planets = [];
for (let i = 0; i < PN; i++) {
  const orbitR = 1.35 + i * 0.4;
  const size = 0.11 + (i % 3) * 0.025;
  const acc = new THREE.Color(PRODUCTS[i].acc || "#ed101d");

  const orbit = new THREE.Mesh(
    new THREE.TorusGeometry(orbitR, 0.0045, 4, 160),
    new THREE.MeshBasicMaterial({ color: acc, transparent: true, opacity: 0.09, blending: THREE.AdditiveBlending }),
  );
  orbit.rotation.x = Math.PI / 2;
  galaxy.add(orbit);

  // Each product rides its lane as its own badge — glow, coin, ring and mark are all
  // in the sprite's texture, so there are no extra meshes to z-fight against it.
  // `planet` stays a group so the animation positions and scales it as before.
  const planet = new THREE.Group();
  galaxy.add(planet);

  const mark = new THREE.Sprite(new THREE.SpriteMaterial({
    map: badgeTexture(PRODUCTS[i].logo, PRODUCTS[i].acc || "#ed101d"),
    transparent: true, opacity: 0.98, depthWrite: false,
  }));
  // The coin occupies ~64% of the texture, so the badge runs a little larger than
  // the old sphere did to keep the visible disc at a comparable size.
  mark.scale.setScalar(size * 5.4);
  planet.add(mark);

  // Comet tail: a strand of grains sweeping the lane behind the planet, brightest at the head.
  const tp = new Float32Array(TRAIL_N * 3);
  const tc = new Float32Array(TRAIL_N * 3);
  for (let k = 0; k < TRAIL_N; k++) {
    const fall = Math.pow(1 - k / TRAIL_N, 2.2); // head bright, tail whispering out
    tc[k * 3] = acc.r * fall;
    tc[k * 3 + 1] = acc.g * fall;
    tc[k * 3 + 2] = acc.b * fall;
  }
  const trailGeo = new THREE.BufferGeometry();
  trailGeo.setAttribute("position", new THREE.BufferAttribute(tp, 3));
  trailGeo.setAttribute("color", new THREE.BufferAttribute(tc, 3));
  const trail = new THREE.Points(trailGeo, createParticleMaterial({ size: 0.034, opacity: 0.85 }));
  galaxy.add(trail);

  planets.push({
    planet, mark, orbit, size, trailGeo, trail,
    orbitR,
    a: i * 2.75,                        // current orbital angle
    orbitSpeed: 0.09 / (0.8 + i * 0.3), // Kepler-ish: inner lanes run faster
  });
}

// ══ Explorer — dive in and travel star to star ══
let explore = false;
let selected = 0;
let mode = "off"; // off | travel | idle
let travel = null;
let driftA = 0; // slow circling while flying alongside a star

// Both faces are self-hosted and already loaded by styles.css, which this page links.
// The runtime <link> to fonts.googleapis.com that used to sit here pulled a third
// -party stylesheet into an iframe that had no other network dependency, and asked for
// IBM Plex Sans — a third family the design system does not use.
const MONO = "'IBM Plex Mono',ui-monospace,monospace";
const SANS = "'Inter',system-ui,-apple-system,sans-serif";

// Clear any earlier instances (dev HMR re-evaluates this module).
for (const id of ["iicl-explore-card", "iicl-explore-hint", "iicl-explore-labels"]) {
  const old = document.getElementById(id);
  if (old) old.remove();
}
const labelWrap = document.createElement("div");
labelWrap.id = "iicl-explore-labels";
document.body.appendChild(labelWrap);

// Planets carry no floating label of their own: the plate below is the product
// card, and duplicating it beside the planet meant two cards for one product.
const labels = [];

// The core gets its own label — it's IICL, not a product.
const sunLabel = document.createElement("div");
sunLabel.style.cssText =
  "position:fixed;left:0;top:0;z-index:39;display:none;text-align:center;user-select:none;pointer-events:none;" +
  `font-family:${MONO};font-size:10px;letter-spacing:.22em;color:rgba(255,255,255,.8);` +
  "text-shadow:0 1px 8px rgba(0,0,0,.9);";
sunLabel.innerHTML = `<span>IICL CORE</span><div style="width:1px;height:16px;margin:5px auto 0;background:rgba(255,255,255,.4);"></div>`;
labelWrap.appendChild(sunLabel);

// The product card. It is DOCKED to one side of the viewport rather than tracking the
// planet's projected position. Chasing the planet meant two damped systems — the camera
// easing toward its berth, and the card easing toward the camera's projection of it —
// running against each other, which wobbled and periodically put the card on top of the
// planet it was describing. The camera already frames the planet to the right (see
// anchor()), so the card sits left and stays put.
const CARD_CSS = `
#iicl-explore-card{position:fixed;z-index:40;display:none;pointer-events:none;
  left:clamp(20px,4vw,64px);top:50%;transform:translateY(-50%);width:min(340px,38vw);
  opacity:0;transition:opacity .5s ease,transform .5s cubic-bezier(.22,1,.36,1)}
#iicl-explore-card.is-in{opacity:1}
.gx-card{position:relative;pointer-events:auto;padding:22px 22px 18px;border-radius:16px;
  background:linear-gradient(160deg,rgba(20,21,26,.94),rgba(9,10,13,.96));
  border:1px solid var(--gx-line);box-shadow:0 24px 70px rgba(0,0,0,.66);backdrop-filter:blur(14px)}
.gx-card::before{content:'';position:absolute;left:22px;right:22px;top:0;height:1px;
  background:linear-gradient(90deg,transparent,var(--gx-acc),transparent);opacity:.75}
.gx-top{display:flex;align-items:center;gap:12px;margin-bottom:16px}
.gx-mark{position:relative;flex:none;width:40px;height:40px;border-radius:11px;
  background:var(--gx-tint);display:grid;place-items:center}
.gx-mark i{position:absolute;inset:9px;background:var(--gx-acc);
  -webkit-mask:var(--gx-logo) center/contain no-repeat;mask:var(--gx-logo) center/contain no-repeat}
.gx-tag{font-size:9.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--gx-acc);line-height:1.3}
.gx-count{display:block;margin-top:3px;font-size:9.5px;letter-spacing:.16em;color:rgba(244,242,238,.38)}
.gx-name{font-size:clamp(24px,2.6vw,31px);font-weight:600;letter-spacing:-.025em;color:#fff;line-height:1.08}
.gx-name span{color:var(--gx-acc)}
.gx-desc{margin-top:10px;font-size:14px;line-height:1.6;color:rgba(244,242,238,.68)}
.gx-rule{height:1px;background:rgba(255,255,255,.09);margin:18px 0 15px}
.gx-cta{display:inline-flex;align-items:center;gap:9px;padding:11px 20px;border-radius:9px;
  background:var(--gx-acc);color:#fff;text-decoration:none;font-size:14.5px;font-weight:600;
  transition:filter .2s,transform .2s}
.gx-cta:hover{filter:brightness(1.1);transform:translateX(2px)}
.gx-foot{display:flex;align-items:center;gap:7px;margin-top:18px}
.gx-bar{height:3px;border-radius:2px;cursor:pointer;transition:width .35s,background .35s;border:0;padding:0}
.gx-nav{margin-left:auto;display:flex;gap:2px}
.gx-nav button{background:none;border:0;padding:3px 7px;cursor:pointer;font-size:17px;
  color:rgba(244,242,238,.5);transition:color .2s}
.gx-nav button:hover:not(:disabled){color:#fff}
.gx-nav button:disabled{opacity:.25;cursor:default}
@media (max-width:860px){
  #iicl-explore-card{left:16px;right:16px;width:auto;top:auto;bottom:22px;transform:none}
  #iicl-explore-card.is-in{transform:none}
  .gx-desc{display:none}
}`;
const cardStyle = document.createElement("style");
cardStyle.textContent = CARD_CSS;
document.head.appendChild(cardStyle);

const card = document.createElement("div");
card.id = "iicl-explore-card";
document.body.appendChild(card);

function renderCard() {
  const p = PRODUCTS[selected];
  const name = p.label.replace(/\.ai$/i, "");
  const acc = p.acc || "#ee2f2e";
  card.style.setProperty("--gx-acc", acc);
  card.style.setProperty("--gx-tint", acc + "24");
  card.style.setProperty("--gx-line", acc + "4d");
  if (p.logo) card.style.setProperty("--gx-logo", `url('${p.logo}')`);

  const bars = PRODUCTS.map((_, k) =>
    `<button class="gx-bar" data-idx="${k}" aria-label="Product ${k + 1}" style="width:${k === selected ? 24 : 12}px;` +
    `background:${k === selected ? acc : "rgba(255,255,255,.22)"}"></button>`
  ).join("");

  card.innerHTML =
    `<div class="gx-card">` +
      `<div class="gx-top">` +
        (p.logo ? `<span class="gx-mark"><i></i></span>` : "") +
        `<span class="gx-tag">${(p.tag || "PRODUCT").toUpperCase()}` +
          `<span class="gx-count">${String(selected + 1).padStart(2, "0")} / ${String(PN).padStart(2, "0")}</span>` +
        `</span>` +
      `</div>` +
      `<div class="gx-name">${name}<span>.ai</span></div>` +
      (p.desc ? `<div class="gx-desc">${p.desc}</div>` : "") +
      `<div class="gx-rule"></div>` +
      `<a class="gx-cta" href="${p.href}" target="_top">Explore ${name} <span>&rarr;</span></a>` +
      `<div class="gx-foot">${bars}` +
        `<span class="gx-nav">` +
          `<button data-nav="-1" aria-label="Previous product"${selected === 0 ? " disabled" : ""}>&lsaquo;</button>` +
          `<button data-nav="1" aria-label="Next product"${selected === PN - 1 ? " disabled" : ""}>&rsaquo;</button>` +
        `</span>` +
      `</div>` +
    `</div>`;

  card.querySelectorAll("[data-idx]").forEach((b) =>
    b.addEventListener("click", () => { const k = +b.dataset.idx; if (mode === "idle" && k !== selected) goTo(k); }));
  card.querySelectorAll("[data-nav]").forEach((b) =>
    b.addEventListener("click", () => {
      const next = selected + +b.dataset.nav;
      if (mode === "idle" && next >= 0 && next < PN) goTo(next);
    }));
}

const hint = document.createElement("div");
hint.id = "iicl-explore-hint";
hint.style.cssText =
  "position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:40;display:none;white-space:nowrap;" +
  `color:rgba(244,242,238,.4);font-size:10px;letter-spacing:.18em;font-family:${MONO};`;
hint.textContent = "SCROLL — NEXT PRODUCT";
document.body.appendChild(hint);

// ── Camera flight system ──
const UP = new THREE.Vector3(0, 1, 0);
const _p = new THREE.Vector3(), _c = new THREE.Vector3(), _out = new THREE.Vector3(), _tan = new THREE.Vector3();
const camPos = new THREE.Vector3(), camLook = new THREE.Vector3();
const lookCur = homeLook.clone();
const smoothT = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));

// Camera berth beside planet i: outside it, slightly above, looking past it into the system.
function anchor(i, drift, outPos, outLook) {
  planets[i].planet.getWorldPosition(_p);
  galaxy.getWorldPosition(_c);
  _out.copy(_p).sub(_c); _out.y = 0;
  if (_out.lengthSq() < 1e-6) _out.set(1, 0, 0);
  _out.normalize();
  _tan.crossVectors(UP, _out).normalize();
  const ox = 2.3, tx = -1.35, ca = Math.cos(drift), sa = Math.sin(drift); // negative side → planet frames right, card stays clear left
  outPos.copy(_p)
    .addScaledVector(_out, ox * ca - tx * sa)
    .addScaledVector(_tan, ox * sa + tx * ca)
    .addScaledVector(UP, 0.55 + Math.sin(drift * 2.3) * 0.05);
  outLook.copy(_p).lerp(_c, 0.24);
}

function goTo(i, dur = 1.6, arc = 0.55) {
  selected = ((i % PN) + PN) % PN;
  card.classList.remove("is-in");
  travel = { fromPos: stage.camera.position.clone(), fromLook: lookCur.clone(), toIdx: selected, t: 0, dur, arc };
  mode = "travel";
  setTimeout(() => {
    if (!explore) return;
    renderCard();
    card.classList.add("is-in");
  }, dur * 520);
}

function setExplore(on) {
  explore = on;
  stage.controls.autoRotate = false;
  stage.controls.enabled = !on; // the flight system owns the camera while exploring
  card.style.display = on ? "block" : "none";
  if (!on) card.classList.remove("is-in");
  hint.style.display = on ? "block" : "none";
  for (const el of labels) el.style.display = on ? "block" : "none";
  if (on) {
    driftA = 0;
    goTo(selected, 2.1, 0.9); // the dive
  } else {
    travel = { fromPos: stage.camera.position.clone(), fromLook: lookCur.clone(), toIdx: -1, t: 0, dur: 1.3, arc: 0.6 };
    mode = "travel";
  }
}
window.addEventListener("message", (e) => {
  const d = e.data || {};
  if (typeof d.iiclExplore === "boolean") setExplore(d.iiclExplore);
});

// Scroll = fly to the next star. One flight at a time; no wrap-around —
// scrolling past the last product hands control back to the page.
let wheelAcc = 0;
window.addEventListener("wheel", (e) => {
  if (!explore) return;
  e.preventDefault();
  if (mode !== "idle") return;
  wheelAcc += e.deltaY;
  if (Math.abs(wheelAcc) > 45) {
    const dir = wheelAcc > 0 ? 1 : -1;
    wheelAcc = 0;
    const next = selected + dir;
    if (next >= PN) {
      // Past the last product: tell the hero to close the explorer and continue down the page.
      try { window.parent.postMessage({ iiclExploreDone: true }, "*"); } catch (err) {}
      return;
    }
    if (next < 0) return; // before the first: stay
    goTo(next);
  }
}, { passive: false });

// ── Frame loop ──
const proj = new THREE.Vector3();
stage.addUpdate((time, delta) => {
  if (!explore && mode === "off") galaxy.rotation.y += delta * 0.055;

  core.rotation.y -= delta * 0.2;
  core.material.emissiveIntensity = (explore ? 0.7 : 1.2) + Math.sin(time * 2) * (explore ? 0.15 : 0.35);
  coreGlow.material.opacity = explore ? 0.07 : 0.16;
  coreGlow.scale.setScalar(0.92 + Math.sin(time * 2) * 0.12);
  coreWire.rotation.x += delta * 0.12;
  coreWire.rotation.z -= delta * 0.09;
  coreWire.material.opacity = explore ? 0.18 : 0.3;

  for (let i = 0; i < PN; i++) {
    const p = planets[i];
    const sel = explore && i === selected;
    // Real orbital revolution — slowed while exploring so the camera glides with its star.
    p.a += delta * p.orbitSpeed * (explore ? 0.3 : 1);
    p.planet.position.set(Math.cos(p.a) * p.orbitR, 0, Math.sin(p.a) * p.orbitR);
    // A camera-facing badge holds still: no spin, and no breathing pulse — the
    // constant size wobble on a flat logo read as shaking rather than life.
    p.planet.scale.setScalar(sel ? 1.18 : 1);
    // In product view the other planets recede, so it is unambiguous which one the
    // card is describing. Eased rather than switched, so entering and leaving the view
    // is a fade instead of a jump. Outside product view they all read equally.
    const wantMark = !explore ? 0.96 : sel ? 1 : 0.2;
    const wantOrbit = !explore ? 0.09 : sel ? 0.3 : 0.04;
    const wantTrail = !explore ? 0.85 : sel ? 0.9 : 0.14;
    const k = 1 - Math.exp(-delta * 4);
    p.mark.material.opacity += (wantMark - p.mark.material.opacity) * k;
    p.orbit.material.opacity += (wantOrbit - p.orbit.material.opacity) * k;
    p.trail.material.opacity += (wantTrail - p.trail.material.opacity) * k;
    // Comet tail follows the lane behind the planet, with a soft sinusoidal shimmer.
    const tattr = p.trailGeo.attributes.position;
    for (let k = 0; k < TRAIL_N; k++) {
      const ang = p.a - (k + 1) * 0.028;
      tattr.setXYZ(
        k,
        Math.cos(ang) * p.orbitR,
        Math.sin(time * 2.1 + k * 0.5 + i) * 0.012,
        Math.sin(ang) * p.orbitR,
      );
    }
    tattr.needsUpdate = true;
  }

  // Flight
  if (mode === "travel" && travel) {
    travel.t += delta / travel.dur;
    const s = smoothT(travel.t);
    if (travel.toIdx === -1) { camPos.copy(homePos); camLook.copy(homeLook); }
    else anchor(travel.toIdx, driftA, camPos, camLook);
    stage.camera.position.copy(travel.fromPos).lerp(camPos, s).addScaledVector(UP, Math.sin(Math.PI * s) * travel.arc);
    lookCur.copy(travel.fromLook).lerp(camLook, s);
    stage.camera.lookAt(lookCur);
    if (travel.t >= 1) {
      const home = travel.toIdx === -1;
      travel = null;
      mode = home ? "off" : "idle";
      if (home) stage.controls.enabled = true;
    }
  } else if (mode === "idle" && explore) {
    // Traveling with the star: a slow circling drift beside it, tightly damped so it never wobbles.
    driftA += delta * 0.028;
    anchor(selected, driftA, camPos, camLook);
    stage.camera.position.lerp(camPos, 1 - Math.exp(-delta * 6));
    lookCur.lerp(camLook, 1 - Math.exp(-delta * 6));
    stage.camera.lookAt(lookCur);
  }

  if (explore) {
    // Sun label
    core.getWorldPosition(proj);
    proj.y += 0.8;
    proj.project(stage.camera);
    if (proj.z > 1) sunLabel.style.display = "none";
    else {
      sunLabel.style.display = "block";
      sunLabel.style.transform =
        `translate(${((proj.x * 0.5 + 0.5) * window.innerWidth).toFixed(1)}px,${((-proj.y * 0.5 + 0.5) * window.innerHeight).toFixed(1)}px) translate(-50%,-100%)`;
    }

  } else {
    sunLabel.style.display = "none";
  }
});

renderCard();
