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

  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(size, 24, 18),
    new THREE.MeshPhysicalMaterial({
      color: acc.clone().multiplyScalar(0.16), emissive: acc, emissiveIntensity: 0.9,
      metalness: 0.5 + (i % 3) * 0.15, roughness: 0.22 + (i % 4) * 0.08, transparent: true, opacity: 0.98,
    }),
  );
  galaxy.add(planet);

  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(size * 1.45, 16, 12),
    new THREE.MeshBasicMaterial({ color: acc, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending }),
  );
  planet.add(glow);

  let ring = null;
  if (i % 2 === 0) {
    ring = new THREE.Mesh(
      new THREE.TorusGeometry(size * 1.75, 0.008, 4, 60),
      new THREE.MeshBasicMaterial({ color: acc.clone().lerp(new THREE.Color("#ffffff"), 0.35), transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending }),
    );
    ring.rotation.x = Math.PI / 2.6 + i * 0.12;
    ring.rotation.y = 0.4;
    planet.add(ring);
  }

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
    planet, orbit, glow, ring, size, trailGeo,
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

if (!document.getElementById("iicl-fonts")) {
  const l = document.createElement("link");
  l.id = "iicl-fonts";
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap";
  document.head.appendChild(l);
}
const MONO = "'IBM Plex Mono',monospace";
const SANS = "'IBM Plex Sans',system-ui,sans-serif";

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

// The trademark plate — boxless, in the site's chapter language. No counter, no chrome.
const card = document.createElement("div");
card.id = "iicl-explore-card";
card.style.cssText =
  "position:fixed;left:0;top:0;transform:translateY(-50%);z-index:40;display:none;width:min(330px,74vw);" +
  "pointer-events:none;opacity:0;margin-top:18px;transition:opacity .45s ease,margin-top .45s ease;";
document.body.appendChild(card);
let cardX = -1, cardY = -1, cardSide = 0; // screen position rides beside the featured star

function renderCard() {
  const p = PRODUCTS[selected];
  const name = p.label.replace(/\.ai$/i, "");
  const acc = p.acc || "#ee2f2e";
  const bars = PRODUCTS.map((_, k) =>
    `<i data-idx="${k}" style="display:inline-block;height:2px;border-radius:1px;cursor:pointer;transition:all .3s;` +
    `width:${k === selected ? 26 : 13}px;background:${k === selected ? acc : "rgba(255,255,255,.2)"};"></i>`
  ).join("");
  card.innerHTML =
    `<div style="background:linear-gradient(rgba(16,17,21,.93),rgba(9,10,13,.95));` +
      `border:1px solid ${acc}4d;border-radius:14px;padding:20px 20px 18px;` +
      `box-shadow:0 22px 60px rgba(0,0,0,.6);backdrop-filter:blur(10px);">` +
      // Mark + tag on one line
      `<div style="display:flex;align-items:center;gap:11px;">` +
        (p.logo
          ? `<span style="position:relative;flex:none;width:34px;height:34px;border-radius:9px;background:${acc}26;">` +
            `<span style="position:absolute;inset:7px;background:${acc};` +
            `-webkit-mask:url('${p.logo}') center/contain no-repeat;mask:url('${p.logo}') center/contain no-repeat;"></span></span>`
          : "") +
        `<span style="font-family:${MONO};font-size:9.5px;letter-spacing:.22em;text-transform:uppercase;color:${acc};">` +
          `${(p.tag || "PRODUCT").toUpperCase()}</span>` +
      `</div>` +
      // Name
      `<div style="font-family:${SANS};font-size:clamp(24px,3.4vw,32px);font-weight:600;color:#fff;letter-spacing:-.025em;margin-top:14px;line-height:1.1;">` +
        `${name}<span style="color:${acc};">.ai</span></div>` +
      // What it does
      `<div style="font-family:${SANS};font-size:14px;line-height:1.62;color:rgba(244,242,238,.7);margin-top:9px;">${p.desc || ""}</div>` +
      // Divider + CTA
      `<div style="height:1px;background:rgba(255,255,255,.1);margin:16px 0 14px;"></div>` +
      `<a href="${p.href}" target="_top" style="pointer-events:auto;display:inline-flex;align-items:center;gap:8px;` +
        `font-family:${SANS};font-weight:600;font-size:14.5px;color:#fff;text-decoration:none;` +
        `background:${acc};padding:10px 18px;border-radius:8px;">Explore ${name} <span style="font-family:${MONO};">→</span></a>` +
      // Position in the set
      `<div style="pointer-events:auto;display:flex;align-items:center;gap:6px;margin-top:18px;">${bars}` +
        `<span style="flex:1;"></span>` +
        `<button data-nav="-1" style="background:none;border:0;padding:2px 6px;cursor:pointer;font-family:${MONO};font-size:17px;color:rgba(244,242,238,.55);transition:color .2s;">‹</button>` +
        `<button data-nav="1" style="background:none;border:0;padding:2px 6px;cursor:pointer;font-family:${MONO};font-size:17px;color:rgba(244,242,238,.55);transition:color .2s;">›</button>` +
      `</div>` +
    `</div>`;
  card.querySelectorAll("[data-idx]").forEach((b) => b.addEventListener("click", () => { const k = +b.dataset.idx; if (mode === "idle" && k !== selected) goTo(k); }));
  card.querySelectorAll("[data-nav]").forEach((b) => {
    b.addEventListener("mouseenter", () => (b.style.color = "#ff5a4d"));
    b.addEventListener("mouseleave", () => (b.style.color = "rgba(244,242,238,.55)"));
    b.addEventListener("click", () => {
      const next = selected + +b.dataset.nav;
      if (mode === "idle" && next >= 0 && next < PN) goTo(next);
    });
  });
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
  cardSide = 0; // re-pick the roomier side on arrival
  card.style.opacity = "0";
  card.style.marginTop = "18px";
  travel = { fromPos: stage.camera.position.clone(), fromLook: lookCur.clone(), toIdx: selected, t: 0, dur, arc };
  mode = "travel";
  setTimeout(() => {
    if (!explore) return;
    renderCard();
    card.style.opacity = "1";
    card.style.marginTop = "0px";
  }, dur * 520);
}

function setExplore(on) {
  explore = on;
  stage.controls.autoRotate = false;
  stage.controls.enabled = !on; // the flight system owns the camera while exploring
  card.style.display = on ? "block" : "none";
  hint.style.display = on ? "block" : "none";
  for (const el of labels) el.style.display = on ? "block" : "none";
  if (on) {
    driftA = 0;
    goTo(selected, 2.1, 0.9); // the dive
  } else {
    card.style.opacity = "0";
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
    p.planet.rotation.y += delta * 0.4;
    const pulse = 1 + Math.sin(time * 1.4 + i) * 0.06;
    p.planet.scale.setScalar(pulse * (sel ? 1.15 : 1));
    p.planet.material.emissiveIntensity = sel ? 1.35 : 0.9;
    p.orbit.material.opacity = sel ? 0.3 : 0.09;
    if (p.ring) p.ring.rotation.z += delta * 0.3;
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

    // The card rides beside the star it travels with.
    planets[selected].planet.getWorldPosition(proj);
    proj.project(stage.camera);
    const px = (proj.x * 0.5 + 0.5) * window.innerWidth;
    const py = (-proj.y * 0.5 + 0.5) * window.innerHeight;
    const cw = Math.min(330, window.innerWidth * 0.74);
    if (cardSide === 0) cardSide = px < window.innerWidth * 0.55 ? 1 : -1; // roomier side, then stick with it
    let txp = cardSide > 0 ? px + 84 : px - 84 - cw;
    txp = Math.max(16, Math.min(window.innerWidth - cw - 16, txp));
    const typ = Math.max(120, Math.min(window.innerHeight - 250, py));
    if (cardX < 0) { cardX = txp; cardY = typ; } // first frame: appear in place
    cardX += (txp - cardX) * (1 - Math.exp(-delta * 6));
    cardY += (typ - cardY) * (1 - Math.exp(-delta * 6));
    card.style.left = cardX.toFixed(1) + "px";
    card.style.top = cardY.toFixed(1) + "px";
  } else {
    sunLabel.style.display = "none";
  }
});

renderCard();
