// Generates the industry hero artwork in public/img/industry/*.svg.
//
// One visual family: near-black base, IICL red accents, a neural mesh and particle
// field that read as "AI", plus a motif unique to each sector. Composition keeps the
// left ~45% quiet because the H1 and lede sit there.
//
// Deterministic — a fixed seed per industry means rebuilds produce identical files.
// Run with: node scripts/gen-industry-art.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../public/img/industry");
const W = 1600, H = 900;

// ── palette ──────────────────────────────────────────────────────────────────
const C = {
  base: "#07080a",
  deep: "#12060a",
  red: "#ee2f2e",
  redDim: "#b81c1c",
  ember: "#ff8d8b",
  ice: "#7fb2d9",
  line: "#2a1418",
};

// Deterministic RNG so the art never churns between builds.
const rng = (seed) => () => (
  (seed = (seed + 0x6d2b79f5) | 0),
  (((Math.imul(seed ^ (seed >>> 15), 1 | seed) ^ (Math.imul(seed ^ (seed >>> 7), 61 | seed) + seed)) >>> 14) & 0xffff) / 0xffff
);
const n = (v) => Math.round(v * 100) / 100;
const rndish = (r) => r() * 2 - 1; // -1..1 jitter

// ── shared chrome ────────────────────────────────────────────────────────────
function defs(id) {
  return `<defs>
  <radialGradient id="glow-${id}" cx="62%" cy="46%" r="55%">
    <stop offset="0%" stop-color="${C.red}" stop-opacity=".62"/>
    <stop offset="32%" stop-color="${C.redDim}" stop-opacity=".34"/>
    <stop offset="70%" stop-color="#4a0d12" stop-opacity=".16"/>
    <stop offset="100%" stop-color="${C.base}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="glow2-${id}" cx="86%" cy="22%" r="42%">
    <stop offset="0%" stop-color="${C.ember}" stop-opacity=".26"/>
    <stop offset="100%" stop-color="${C.base}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="vign-${id}" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="${C.base}" stop-opacity=".82"/>
    <stop offset="30%" stop-color="${C.base}" stop-opacity=".34"/>
    <stop offset="62%" stop-color="${C.base}" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="stroke-${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${C.ember}"/>
    <stop offset="55%" stop-color="${C.red}"/>
    <stop offset="100%" stop-color="${C.redDim}"/>
  </linearGradient>
  <filter id="soft-${id}" x="-30%" y="-30%" width="160%" height="160%">
    <feGaussianBlur stdDeviation="14"/>
  </filter>
  <filter id="bloom-${id}" x="-45%" y="-45%" width="190%" height="190%">
    <feGaussianBlur stdDeviation="9" result="b1"/>
    <feGaussianBlur stdDeviation="3" result="b2"/>
    <feMerge><feMergeNode in="b1"/><feMergeNode in="b2"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>`;
}

function grid() {
  const out = [];
  for (let x = 0; x <= W; x += 64) out.push(`M${x} 0V${H}`);
  for (let y = 0; y <= H; y += 64) out.push(`M0 ${y}H${W}`);
  return `<path d="${out.join("")}" stroke="#3d1a20" stroke-width="1" opacity=".85" fill="none"/>`;
}

// Neural mesh — the motif that makes every page read as "AI".
function mesh(r, count = 46) {
  const pts = Array.from({ length: count }, () => ({
    x: 560 + r() * 1040,
    y: 40 + r() * 820,
    s: 2 + r() * 3.4,
  }));
  const links = [];
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
      if (d < 190) links.push(`<line x1="${n(pts[i].x)}" y1="${n(pts[i].y)}" x2="${n(pts[j].x)}" y2="${n(pts[j].y)}" stroke="${C.red}" stroke-width="1.2" opacity="${n(0.12 + (1 - d / 190) * 0.4)}"/>`);
    }
  }
  const dots = pts.map((p) => {
    const hot = r() > 0.82;
    return `<circle cx="${n(p.x)}" cy="${n(p.y)}" r="${n(p.s)}" fill="${hot ? "#fff" : C.ember}" opacity="${n(0.45 + r() * 0.5)}"/>`;
  });
  return `<g>${links.join("")}${dots.join("")}</g>`;
}

// Fine dust across the whole frame for depth.
function dust(r, count = 200) {
  return Array.from({ length: count }, () => {
    const x = r() * W, y = r() * H, s = 0.6 + r() * 1.8;
    const hot = r() > 0.85;
    return `<circle cx="${n(x)}" cy="${n(y)}" r="${n(s)}" fill="${hot ? "#fff" : C.ember}" opacity="${n(0.16 + r() * 0.45)}"/>`;
  }).join("");
}

// ── HUD layer ────────────────────────────────────────────────────────────────
// Instrument-panel chrome laid over the motif: frame brackets, a targeting reticle,
// telemetry readouts, measurement callouts and scan lines. All of it sits right of
// x≈620 so the headline column stays clean.
const MONO = `font-family="ui-monospace, 'IBM Plex Mono', 'SFMono-Regular', Menlo, monospace"`;

function scanlines() {
  const rows = [];
  for (let y = 0; y < H; y += 4) rows.push(`M0 ${y}H${W}`);
  return `<path d="${rows.join("")}" stroke="#000" stroke-width="1.4" opacity=".17" fill="none"/>`;
}

// L-shaped brackets at the frame corners, plus centre edge ticks.
function hudFrame() {
  const m = 40, L = 58, sw = 2.4, o = ".62";
  const c = (x, y, sx, sy) =>
    `<path d="M${x + sx * L} ${y} H${x} V${y + sy * L}" fill="none" stroke="${C.red}" stroke-width="${sw}" opacity="${o}" stroke-linecap="square"/>`;
  const tick = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.red}" stroke-width="2" opacity=".4"/>`;
  return `<g>
    ${c(m, m, 1, 1)}${c(W - m, m, -1, 1)}${c(m, H - m, 1, -1)}${c(W - m, H - m, -1, -1)}
    ${tick(W / 2 - 26, m, W / 2 + 26, m)}${tick(W / 2 - 26, H - m, W / 2 + 26, H - m)}
    ${tick(W - m, H / 2 - 26, W - m, H / 2 + 26)}
  </g>`;
}

// Targeting reticle: segmented rings with degree ticks and a crosshair.
function hudReticle(cx, cy, rad) {
  const ticks = Array.from({ length: 36 }, (_, i) => {
    const a = (i / 36) * Math.PI * 2;
    const long = i % 3 === 0;
    const r1 = rad + 10, r2 = rad + (long ? 24 : 16);
    return `<line x1="${n(cx + Math.cos(a) * r1)}" y1="${n(cy + Math.sin(a) * r1)}" x2="${n(cx + Math.cos(a) * r2)}" y2="${n(cy + Math.sin(a) * r2)}" stroke="${C.red}" stroke-width="${long ? 2.2 : 1.3}" opacity="${long ? .68 : .38}"/>`;
  }).join("");
  const seg = (from, sweep, rr, op, sw) => {
    const a0 = (from * Math.PI) / 180, a1 = ((from + sweep) * Math.PI) / 180;
    const large = sweep > 180 ? 1 : 0;
    return `<path d="M${n(cx + Math.cos(a0) * rr)} ${n(cy + Math.sin(a0) * rr)} A ${rr} ${rr} 0 ${large} 1 ${n(cx + Math.cos(a1) * rr)} ${n(cy + Math.sin(a1) * rr)}" fill="none" stroke="${C.red}" stroke-width="${sw}" opacity="${op}"/>`;
  };
  const g = 18;
  return `<g>
    ${ticks}
    ${seg(-64, 108, rad, .8, 2.8)}${seg(116, 108, rad, .8, 2.8)}
    ${seg(28, 62, rad + 34, .34, 1.8)}${seg(208, 62, rad + 34, .34, 1.8)}
    <line x1="${cx - rad - 40}" y1="${cy}" x2="${cx - g}" y2="${cy}" stroke="${C.red}" stroke-width="1.5" opacity=".5"/>
    <line x1="${cx + g}" y1="${cy}" x2="${cx + rad + 40}" y2="${cy}" stroke="${C.red}" stroke-width="1.5" opacity=".5"/>
    <line x1="${cx}" y1="${cy - rad - 40}" x2="${cx}" y2="${cy - g}" stroke="${C.red}" stroke-width="1.5" opacity=".5"/>
    <line x1="${cx}" y1="${cy + g}" x2="${cx}" y2="${cy + rad + 40}" stroke="${C.red}" stroke-width="1.5" opacity=".5"/>
  </g>`;
}

// Telemetry readout: a bracketed panel of mono key/value rows with level bars.
function hudReadout(x, y, title, rows, r) {
  const w = 232, h = 34 + rows.length * 26;
  const body = rows.map((t, i) => {
    const yy = y + 40 + i * 26;
    const pct = 0.28 + r() * 0.66;
    return `<text x="${x + 12}" y="${yy}" ${MONO} font-size="12.5" letter-spacing="1.6" fill="${C.ember}" opacity=".86">${t}</text>
      <rect x="${x + w - 78}" y="${yy - 9}" width="66" height="5" rx="2.5" fill="${C.red}" opacity=".2"/>
      <rect x="${x + w - 78}" y="${yy - 9}" width="${n(66 * pct)}" height="5" rx="2.5" fill="${C.red}" opacity=".92"/>`;
  }).join("");
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#12060a" opacity=".55"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="none" stroke="${C.red}" stroke-width="1.5" opacity=".5"/>
    <path d="M${x} ${y + 14} V${y} H${x + 14}" fill="none" stroke="${C.ember}" stroke-width="2.6" opacity=".9"/>
    <path d="M${x + w} ${y + h - 14} V${y + h} H${x + w - 14}" fill="none" stroke="${C.ember}" stroke-width="2.6" opacity=".9"/>
    <text x="${x + 12}" y="${y + 21}" ${MONO} font-size="11.5" letter-spacing="2.4" fill="#fff" opacity=".92">${title}</text>
    <line x1="${x + 10}" y1="${y + 28}" x2="${x + w - 10}" y2="${y + 28}" stroke="${C.red}" stroke-width="1" opacity=".45"/>
    ${body}
  </g>`;
}

// Leader line from the motif out to a small label, like a callout on an instrument view.
function hudCallout(x1, y1, x2, y2, label) {
  const dir = x2 > x1 ? 1 : -1;
  const anchor = dir > 0 ? "start" : "end";
  return `<g>
    <circle cx="${x1}" cy="${y1}" r="3.6" fill="${C.ember}"/>
    <path d="M${x1} ${y1} L${x2} ${y2} h${dir * 62}" fill="none" stroke="${C.ember}" stroke-width="1.5" opacity=".72"/>
    <text x="${x2 + dir * 68}" y="${y2 + 4}" ${MONO} font-size="12" letter-spacing="1.8" fill="${C.ember}" opacity=".9" text-anchor="${anchor}">${label}</text>
  </g>`;
}

// ── per-industry motifs, drawn right-of-centre ───────────────────────────────
const S = (id) => `url(#stroke-${id})`;
const B = (id) => `filter="url(#bloom-${id})"`;

const MOTIF = {

  careers: (r, id) => {
    // Capability domains -> role scorecard -> mobilised pod.
    const CX = 1040, CY = 450;
    const dom = ["AI &amp; GENAI", "DATA", "CLOUD &amp; SRE", "SECURITY", "PRODUCT", "PLATFORMS"];
    const rows = dom.map((d, i) => {
      const y = 250 + i * 68;
      return `<g opacity="${n(0.9 - i * 0.05)}">
        <rect x="640" y="${y - 17}" width="196" height="34" rx="6" fill="none" stroke="${C.red}" stroke-width="2" opacity=".5"/>
        <circle cx="662" cy="${y}" r="4" fill="${C.ember}"/>
        <text x="678" y="${y + 4}" font-family="IBM Plex Mono, monospace" font-size="12" letter-spacing="1.4" fill="${C.ember}" opacity=".85">${d}</text>
        <path d="M836 ${y} C 900 ${y}, 930 ${CY}, ${CX - 116} ${CY}" fill="none" stroke="${C.red}" stroke-width="2.2" opacity="${n(0.5 - i * 0.03)}"/>
      </g>`;
    }).join("");

    // Role satellites around the scorecard core.
    const sat = [];
    for (let i = 0; i < 8; i++) {
      const a = -Math.PI / 2 + (i / 8) * Math.PI * 2;
      const sx = CX + Math.cos(a) * 172, sy = CY + Math.sin(a) * 172;
      sat.push(`<line x1="${n(CX + Math.cos(a) * 118)}" y1="${n(CY + Math.sin(a) * 118)}" x2="${n(sx - Math.cos(a) * 15)}" y2="${n(sy - Math.sin(a) * 15)}" stroke="${C.red}" stroke-width="2" opacity=".42"/>`);
      sat.push(`<circle cx="${n(sx)}" cy="${n(sy)}" r="14" fill="${C.base}" stroke="${C.red}" stroke-width="2.2" opacity=".8"/>`);
      sat.push(`<circle cx="${n(sx)}" cy="${n(sy)}" r="4" fill="${C.ember}" ${B(id)}/>`);
    }

    // The assembled pod: five seats filling up.
    const pod = [];
    for (let i = 0; i < 5; i++) {
      const y = 316 + i * 52;
      pod.push(`<rect x="1330" y="${y}" width="176" height="36" rx="6" fill="none" stroke="${C.red}" stroke-width="2" opacity="${n(0.78 - i * 0.1)}"/>`);
      pod.push(`<circle cx="1352" cy="${y + 18}" r="4.5" fill="${C.ember}" opacity="${n(0.95 - i * 0.14)}" ${B(id)}/>`);
      pod.push(`<rect x="1368" y="${y + 15}" width="${n(112 - i * 13)}" height="5" rx="2.5" fill="${C.red}" opacity="${n(0.6 - i * 0.08)}"/>`);
      pod.push(`<path d="M${n(CX + 190)} ${CY} C 1240 ${CY}, 1280 ${y + 18}, 1330 ${y + 18}" fill="none" stroke="${C.red}" stroke-width="1.8" opacity="${n(0.42 - i * 0.05)}"/>`);
    }

    return `
      ${rows}
      <circle cx="${CX}" cy="${CY}" r="118" fill="none" stroke="${S(id)}" stroke-width="5" opacity=".9" ${B(id)}/>
      <circle cx="${CX}" cy="${CY}" r="152" fill="none" stroke="${C.red}" stroke-width="2.2" opacity=".38" stroke-dasharray="5 13"/>
      <text x="${CX}" y="${CY - 4}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="13" letter-spacing="2.6" fill="${C.ember}">ROLE</text>
      <text x="${CX}" y="${CY + 18}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="13" letter-spacing="2.6" fill="${C.ember}">SCORECARD</text>
      ${sat.join("")}
      <rect x="1314" y="286" width="208" height="300" rx="10" fill="none" stroke="${C.red}" stroke-width="2.4" opacity=".55"/>
      ${pod.join("")}`;
  },

  healthcare: (r, id) => {
    // ECG trace with a bright pulse peak, ringed by monitoring orbits.
    const y = 470, x0 = 640;
    const seg = [];
    let x = x0;
    const beat = [[40,0],[16,-16],[14,26],[16,-92],[16,120],[14,-46],[18,8],[46,0]];
    for (let k = 0; k < 4; k++) for (const [dx, dy] of beat) { x += dx; seg.push(`${n(x)} ${n(y + dy * (k === 1 ? 1 : 0.55))}`); }
    return `
      <circle cx="1010" cy="470" r="250" fill="none" stroke="${C.red}" stroke-width="2.6" opacity="0.48"/>
      <circle cx="1010" cy="470" r="180" fill="none" stroke="${C.red}" stroke-width="2.3" opacity="0.37" stroke-dasharray="5 12"/>
      <polyline points="${seg.join(" ")}" fill="none" stroke="${S(id)}" stroke-width="6.4" stroke-linejoin="round" stroke-linecap="round" ${B(id)}/>
      <circle cx="${n(x0 + 40 + 16 + 14 + 16)}" cy="${n(y - 92 * 1)}" r="7" fill="#fff" ${B(id)}/>
      <g opacity="1">${[0,1,2,3].map(i=>`<rect x="${1180 + i*46}" y="${300 + i*34}" width="30" height="4" rx="2" fill="${C.ember}" opacity="${n(.5-i*.09)}"/>`).join("")}</g>
      <path d="M1272 588h34v-34h30v34h34v30h-34v34h-30v-34h-34z" fill="${C.red}" opacity="1"/>`;
  },

  manufacturing: (r, id) => {
    // Toothed gear rings over a conveyor, with a jointed robotic arm.
    const gear = (cx, cy, rad, teeth, op) => {
      const p = [];
      for (let i = 0; i < teeth; i++) {
        const a = (i / teeth) * Math.PI * 2;
        p.push(`<line x1="${n(cx + Math.cos(a) * rad)}" y1="${n(cy + Math.sin(a) * rad)}" x2="${n(cx + Math.cos(a) * (rad + 16))}" y2="${n(cy + Math.sin(a) * (rad + 16))}" stroke="${C.red}" stroke-width="5.7" opacity="${op}"/>`);
      }
      return `<g><circle cx="${cx}" cy="${cy}" r="${rad}" fill="none" stroke="${C.red}" stroke-width="4.0" opacity="${op}"/>${p.join("")}</g>`;
    };
    return `
      ${gear(1080, 400, 150, 18, .5)}
      ${gear(1310, 560, 90, 12, .32)}
      ${gear(900, 590, 60, 10, .26)}
      <circle cx="1080" cy="400" r="52" fill="none" stroke="${S(id)}" stroke-width="5.7" ${B(id)}/>
      <polyline points="700 760 700 600 830 470 980 470" fill="none" stroke="${S(id)}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" ${B(id)}/>
      <circle cx="700" cy="600" r="10" fill="${C.ember}"/><circle cx="830" cy="470" r="10" fill="${C.ember}"/>
      <g opacity="0.99">${Array.from({length:14},(_,i)=>`<rect x="${640+i*70}" y="790" width="44" height="8" rx="3" fill="${C.redDim}"/>`).join("")}</g>`;
  },

  finance: (r, id) => {
    // Candlesticks under a rising trend line.
    const bars = Array.from({ length: 16 }, (_, i) => {
      const x = 690 + i * 56;
      const mid = 620 - i * 17 - r() * 40;
      const h = 40 + r() * 120;
      const up = r() > 0.38;
      return `<line x1="${x}" y1="${n(mid - h / 2 - 22)}" x2="${x}" y2="${n(mid + h / 2 + 22)}" stroke="${up ? C.red : C.redDim}" stroke-width="3.1" opacity="1"/>
              <rect x="${x - 11}" y="${n(mid - h / 2)}" width="22" height="${n(h)}" rx="3" fill="${up ? C.red : "#3a1418"}" stroke="${up ? C.ember : C.redDim}" stroke-width="2.6" opacity="${up ? .8 : .6}"/>`;
    });
    const trend = Array.from({ length: 16 }, (_, i) => `${690 + i * 56} ${n(620 - i * 17 - 30)}`);
    return `${bars.join("")}
      <polyline points="${trend.join(" ")}" fill="none" stroke="${S(id)}" stroke-width="5.7" stroke-linecap="round" ${B(id)}/>
      <circle cx="${690 + 15 * 56}" cy="${n(620 - 15 * 17 - 30)}" r="8" fill="#fff" ${B(id)}/>`;
  },

  banking: (r, id) => {
    // Shield with concentric secure rings and transaction arcs.
    const arcs = Array.from({ length: 5 }, (_, i) =>
      `<path d="M760 ${300 + i * 74} Q1060 ${210 + i * 74} 1360 ${300 + i * 74}" fill="none" stroke="${C.red}" stroke-width="3.0" opacity="${n(.3 - i * .04)}" stroke-dasharray="${8 + i * 4} ${10 + i * 3}"/>`);
    return `${arcs.join("")}
      <circle cx="1060" cy="470" r="215" fill="none" stroke="${C.red}" stroke-width="2.3" opacity="0.44"/>
      <circle cx="1060" cy="470" r="160" fill="none" stroke="${C.red}" stroke-width="2.3" opacity="0.56" stroke-dasharray="4 10"/>
      <path d="M1060 330 L1180 382 V498 Q1180 590 1060 636 Q940 590 940 498 V382 Z" fill="none" stroke="${S(id)}" stroke-width="6.4" stroke-linejoin="round" ${B(id)}/>
      <path d="M1006 478 l36 38 74 -84" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" ${B(id)}/>
      ${[820, 1300].map((x) => `<circle cx="${x}" cy="470" r="9" fill="${C.ember}" ${B(id)}/>`).join("")}`;
  },

  legal: (r, id) => {
    // Balance scales — beam, two hanging pans on chains, column and base — beside a
    // stack of documents whose clauses are being read.
    const CX = 1090, BEAM = 360, ARM = 185;
    const pan = (cx) => `
      <line x1="${cx}" y1="${BEAM}" x2="${cx}" y2="${BEAM + 96}" stroke="${C.red}" stroke-width="2.6" opacity=".85"/>
      <line x1="${cx - 52}" y1="${BEAM + 100}" x2="${cx}" y2="${BEAM + 96}" stroke="${C.red}" stroke-width="2" opacity=".6"/>
      <line x1="${cx + 52}" y1="${BEAM + 100}" x2="${cx}" y2="${BEAM + 96}" stroke="${C.red}" stroke-width="2" opacity=".6"/>
      <path d="M${cx - 78} ${BEAM + 100} a 78 54 0 0 0 156 0 Z" fill="none" stroke="${S(id)}" stroke-width="5" stroke-linejoin="round" ${B(id)}/>`;
    return `
      <line x1="${CX}" y1="${BEAM}" x2="${CX}" y2="660" stroke="${S(id)}" stroke-width="6" stroke-linecap="round" ${B(id)}/>
      <path d="M${CX - 96} 674 h192" stroke="${S(id)}" stroke-width="9" stroke-linecap="round" ${B(id)}/>
      <line x1="${CX - ARM}" y1="${BEAM}" x2="${CX + ARM}" y2="${BEAM}" stroke="${S(id)}" stroke-width="7" stroke-linecap="round" ${B(id)}/>
      <circle cx="${CX}" cy="${BEAM}" r="14" fill="#fff" ${B(id)}/>
      ${pan(CX - ARM)}${pan(CX + ARM)}
      <g>${[0,1,2].map(i=>`<g transform="translate(${640 + i*26} ${470 + i*30})" opacity="${n(.45 + i*.22)}"><rect width="168" height="212" rx="9" fill="${C.base}" stroke="${C.red}" stroke-width="2.4"/>${[0,1,2,3,4].map(k=>`<rect x="24" y="${32+k*36}" width="${124 - k*18}" height="6" rx="3" fill="${k===1?"#fff":C.ember}" opacity="${k===1?".95":".6"}"/>`).join("")}</g>`).join("")}</g>`;
  },

  logistics: (r, id) => {
    // Waypoint route across a container grid.
    const pts = [[680,700],[820,560],[1000,610],[1160,430],[1350,470]];
    const pin = (x, y, big) => `<g><circle cx="${x}" cy="${y}" r="${big ? 13 : 8}" fill="${big ? "#fff" : C.ember}" ${B(id)}/><circle cx="${x}" cy="${y}" r="${big ? 30 : 20}" fill="none" stroke="${C.red}" stroke-width="3.0" opacity="0.99"/></g>`;
    return `
      <g opacity="0.75">${Array.from({length:5},(_,rw)=>Array.from({length:9},(_,cl)=>`<rect x="${660+cl*84}" y="${700+rw*30}" width="72" height="22" rx="3" fill="none" stroke="${C.redDim}" stroke-width="2.6"/>`).join("")).join("")}</g>
      <polyline points="${pts.map(p=>p.join(" ")).join(" ")}" fill="none" stroke="${S(id)}" stroke-width="6.4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="14 11" ${B(id)}/>
      ${pts.map((p,i)=>pin(p[0],p[1],i===pts.length-1)).join("")}
      <path d="M1140 250 h150 l40 44 h44 v58 h-234z" fill="none" stroke="${C.red}" stroke-width="4.0" opacity="1"/>
      <circle cx="1188" cy="352" r="15" fill="none" stroke="${C.red}" stroke-width="4.0" opacity="1"/>
      <circle cx="1330" cy="352" r="15" fill="none" stroke="${C.red}" stroke-width="4.0" opacity="1"/>`;
  },

  "supply-chain": (r, id) => {
    // Tiered hub-and-spoke flow: suppliers → hub → destinations.
    const tiers = [
      { x: 700, ys: [300, 470, 640] },
      { x: 1010, ys: [470] },
      { x: 1330, ys: [340, 470, 600] },
    ];
    const links = [];
    for (const y of tiers[0].ys) links.push(`<path d="M${tiers[0].x + 20} ${y} C 860 ${y}, 880 470, ${tiers[1].x - 34} 470" fill="none" stroke="${C.red}" stroke-width="3.7" opacity="0.94"/>`);
    for (const y of tiers[2].ys) links.push(`<path d="M${tiers[1].x + 34} 470 C 1160 470, 1180 ${y}, ${tiers[2].x - 20} ${y}" fill="none" stroke="${C.red}" stroke-width="3.7" opacity="0.94"/>`);
    const nodes = tiers.flatMap((t, ti) => t.ys.map((y) =>
      ti === 1
        ? `<g><circle cx="${t.x}" cy="${y}" r="34" fill="none" stroke="${S(id)}" stroke-width="6.4" ${B(id)}/><circle cx="${t.x}" cy="${y}" r="60" fill="none" stroke="${C.red}" stroke-width="2.6" opacity="0.71" stroke-dasharray="4 9"/><circle cx="${t.x}" cy="${y}" r="9" fill="#fff"/></g>`
        : `<rect x="${t.x - 20}" y="${y - 20}" width="40" height="40" rx="7" fill="none" stroke="${C.ember}" stroke-width="4.3" opacity="1"/>`));
    return links.join("") + nodes.join("");
  },

  "contact-centre": (r, id) => {
    // Concentric voice waves, a live waveform, and conversation bubbles.
    const rings = Array.from({ length: 5 }, (_, i) =>
      `<circle cx="880" cy="470" r="${70 + i * 62}" fill="none" stroke="${C.red}" stroke-width="3.3" opacity="${n(.42 - i * .07)}" stroke-dasharray="${i ? `${5 + i * 3} ${9 + i * 2}` : "0"}"/>`);
    const bars = Array.from({ length: 26 }, (_, i) => {
      const x = 1090 + i * 20;
      const h = 22 + Math.abs(Math.sin(i * 0.68)) * 130 * (0.45 + r() * 0.75);
      return `<rect x="${x}" y="${n(470 - h / 2)}" width="7" height="${n(h)}" rx="3.5" fill="${i % 6 === 0 ? C.ember : C.red}" opacity="${n(.5 + r() * .45)}"/>`;
    });
    return `${rings.join("")}<circle cx="880" cy="470" r="26" fill="${C.red}" ${B(id)}/><circle cx="880" cy="470" r="10" fill="#fff"/>
      ${bars.join("")}
      <path d="M1180 236 h150 q14 0 14 14 v72 q0 14 -14 14 h-96 l-30 30 v-30 h-24 q-14 0 -14 -14 v-72 q0 -14 14 -14z" fill="none" stroke="${C.ember}" stroke-width="4.0" opacity="1"/>`;
  },

  hr: (r, id) => {
    // Org graph of people-nodes across three tiers.
    const person = (x, y, s, hot) => `<g opacity="${hot ? 1 : .78}">
      <circle cx="${x}" cy="${y - s * 1.15}" r="${n(s * 0.62)}" fill="none" stroke="${hot ? S(id) : C.red}" stroke-width="${hot ? 3 : 2}" ${hot ? B(id) : ""}/>
      <path d="M${n(x - s)} ${n(y + s * 0.95)} a ${n(s)} ${n(s * 0.9)} 0 0 1 ${n(s * 2)} 0" fill="none" stroke="${hot ? S(id) : C.red}" stroke-width="${hot ? 3 : 2}" stroke-linecap="round" ${hot ? B(id) : ""}/></g>`;
    const tiers = [[[1060, 330, 28, true]], [[880, 520, 22, false], [1240, 520, 22, false]], [[760, 700, 18, false], [1000, 700, 18, false], [1120, 700, 18, false], [1360, 700, 18, false]]];
    const links = [
      `M1060 372 V470`, `M1060 400 H880 V478`, `M1060 400 H1240 V478`,
      `M880 560 V620 H760 V664`, `M880 560 V620 H1000 V664`,
      `M1240 560 V620 H1120 V664`, `M1240 560 V620 H1360 V664`,
    ].map((d) => `<path d="${d}" fill="none" stroke="${C.red}" stroke-width="3.3" opacity="0.86"/>`);
    return links.join("") + tiers.flat().map(([x, y, s, hot]) => person(x, y, s, hot)).join("");
  },

  // ── services ──
  "ai-genai-services": (r, id) => {
    // Layered network: input → hidden layers → output, fully connected.
    const cols = [[3, 760], [5, 950], [5, 1140], [2, 1340]];
    const nodes = cols.map(([count, x]) =>
      Array.from({ length: count }, (_, i) => ({ x, y: 470 + (i - (count - 1) / 2) * 96 })));
    const links = [];
    for (let c = 0; c < nodes.length - 1; c++)
      for (const a of nodes[c]) for (const b of nodes[c + 1])
        links.push(`<line x1="${a.x}" y1="${n(a.y)}" x2="${b.x}" y2="${n(b.y)}" stroke="${C.red}" stroke-width="1.4" opacity="${n(.16 + r() * .34)}"/>`);
    const dots = nodes.flatMap((col, c) => col.map((p) =>
      c === nodes.length - 1
        ? `<circle cx="${p.x}" cy="${n(p.y)}" r="17" fill="none" stroke="${S(id)}" stroke-width="4" ${B(id)}/><circle cx="${p.x}" cy="${n(p.y)}" r="6" fill="#fff"/>`
        : `<circle cx="${p.x}" cy="${n(p.y)}" r="13" fill="${C.base}" stroke="${C.red}" stroke-width="3" opacity=".95"/>`));
    return links.join("") + dots.join("");
  },

  "agentic-ai": (r, id) => {
    // Orchestrator core with specialist agents on an orbit, each linked back in.
    const cx = 1060, cy = 470, R = 230;
    const agents = Array.from({ length: 6 }, (_, i) => {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
      return { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R };
    });
    return `
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${C.red}" stroke-width="1.6" opacity=".34" stroke-dasharray="7 13"/>
      ${agents.map((p) => `<line x1="${cx}" y1="${cy}" x2="${n(p.x)}" y2="${n(p.y)}" stroke="${C.red}" stroke-width="2" opacity=".5"/>`).join("")}
      ${agents.map((p) => `<rect x="${n(p.x - 30)}" y="${n(p.y - 26)}" width="60" height="52" rx="9" fill="${C.base}" stroke="${C.ember}" stroke-width="2.6" opacity=".92"/>
        <circle cx="${n(p.x)}" cy="${n(p.y)}" r="8" fill="${C.red}"/>`).join("")}
      <circle cx="${cx}" cy="${cy}" r="62" fill="${C.base}" stroke="${S(id)}" stroke-width="5" ${B(id)}/>
      <circle cx="${cx}" cy="${cy}" r="22" fill="#fff" ${B(id)}/>`;
  },

  "web-mobile-dev": (r, id) => {
    // Desktop viewport and a phone, both showing wireframe blocks.
    const block = (x, y, w, h, o) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${C.red}" opacity="${o}"/>`;
    return `
      <rect x="700" y="290" width="440" height="300" rx="12" fill="${C.base}" stroke="${S(id)}" stroke-width="4.5" ${B(id)}/>
      <line x1="700" y1="336" x2="1140" y2="336" stroke="${C.red}" stroke-width="2.4" opacity=".7"/>
      ${[0,1,2].map(i=>`<circle cx="${724 + i*20}" cy="313" r="5" fill="${C.ember}" opacity=".85"/>`).join("")}
      ${block(726,362,180,110,.5)}${block(926,362,190,22,.75)}${block(926,398,190,14,.4)}${block(926,424,140,14,.4)}${block(926,458,96,26,.9)}
      ${block(726,496,390,14,.3)}${block(726,522,300,14,.24)}
      <rect x="1206" y="352" width="150" height="286" rx="22" fill="${C.base}" stroke="${S(id)}" stroke-width="4.5" ${B(id)}/>
      <rect x="1256" y="366" width="50" height="7" rx="3.5" fill="${C.red}" opacity=".8"/>
      ${block(1224,392,114,66,.5)}${block(1224,472,114,16,.6)}${block(1224,498,80,16,.35)}${block(1224,540,114,30,.9)}
      <circle cx="1281" cy="612" r="12" fill="none" stroke="${C.red}" stroke-width="2.4" opacity=".7"/>`;
  },

  "whatsapp-business": (r, id) => {
    // Conversation thread: alternating bubbles with delivery ticks and an order card.
    const bub = (x, y, w, h, mine) => `<path d="M${x} ${y} h${w} a14 14 0 0 1 14 14 v${h - 28} a14 14 0 0 1 -14 14 h-${w - (mine ? 18 : 0)} ${mine ? `l-0 18 l-22 -18 h-0` : ""} a14 14 0 0 1 -14 -14 v-${h - 28} a14 14 0 0 1 14 -14 z"
      fill="${mine ? "#2a0d11" : C.base}" stroke="${mine ? C.ember : C.red}" stroke-width="2.6" opacity=".95"/>`;
    const line = (x, y, w, o) => `<rect x="${x}" y="${y}" width="${w}" height="7" rx="3.5" fill="${C.ember}" opacity="${o}"/>`;
    const tick = (x, y) => `<path d="M${x} ${y} l7 8 l14 -17 M${x + 13} ${y} l7 8 l14 -17" fill="none" stroke="${C.ember}" stroke-width="2.6" stroke-linecap="round" opacity=".95"/>`;
    return `
      ${bub(700, 300, 260, 92, false)}${line(722,330,190,.75)}${line(722,352,130,.45)}
      ${bub(1000, 424, 300, 106, true)}${line(1024,456,240,.8)}${line(1024,478,170,.5)}${tick(1244,506)}
      ${bub(700, 566, 230, 86, false)}${line(722,594,160,.7)}${line(722,616,104,.42)}
      <rect x="1036" y="596" width="290" height="120" rx="12" fill="${C.base}" stroke="${S(id)}" stroke-width="4" ${B(id)}/>
      <rect x="1058" y="620" width="72" height="72" rx="8" fill="${C.red}" opacity=".45"/>
      ${line(1150,630,150,.85)}${line(1150,654,110,.5)}
      <rect x="1150" y="676" width="120" height="26" rx="13" fill="${C.red}" opacity=".95"/>`;
  },

  "erp-services": (r, id) => {
    // Business modules ringed around a shared data core.
    const cx = 1060, cy = 470;
    const mods = Array.from({ length: 6 }, (_, i) => {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
      return { x: cx + Math.cos(a) * 232, y: cy + Math.sin(a) * 232 };
    });
    return `
      ${mods.map((p) => `<line x1="${cx}" y1="${cy}" x2="${n(p.x)}" y2="${n(p.y)}" stroke="${C.red}" stroke-width="2.2" opacity=".46"/>`).join("")}
      ${mods.map((p, i) => `<g><rect x="${n(p.x - 46)}" y="${n(p.y - 34)}" width="92" height="68" rx="8" fill="${C.base}" stroke="${i % 2 ? C.ember : C.red}" stroke-width="3" opacity=".95"/>
        ${[0,1,2].map(k=>`<rect x="${n(p.x - 30)}" y="${n(p.y - 18 + k*14)}" width="${60 - k*16}" height="6" rx="3" fill="${C.ember}" opacity="${.8 - k*.22}"/>`).join("")}</g>`).join("")}
      <rect x="${cx - 66}" y="${cy - 52}" width="132" height="104" rx="12" fill="${C.base}" stroke="${S(id)}" stroke-width="5" ${B(id)}/>
      ${[0,1,2].map(k=>`<ellipse cx="${cx}" cy="${cy - 24 + k*24}" rx="42" ry="13" fill="none" stroke="${C.ember}" stroke-width="2.6" opacity="${.95 - k*.2}"/>`).join("")}`;
  },

  "staff-augmentation": (r, id) => {
    // Talent funnel: a wide candidate pool narrowing into a placed team.
    const head = (x, y, s, hot) => `<g opacity="${hot ? 1 : .8}">
      <circle cx="${x}" cy="${y - s * 1.2}" r="${n(s * 0.6)}" fill="none" stroke="${hot ? S(id) : C.red}" stroke-width="${hot ? 3.4 : 2.4}" ${hot ? B(id) : ""}/>
      <path d="M${n(x - s)} ${n(y + s)} a ${n(s)} ${n(s * 0.92)} 0 0 1 ${n(s * 2)} 0" fill="none" stroke="${hot ? S(id) : C.red}" stroke-width="${hot ? 3.4 : 2.4}" stroke-linecap="round" ${hot ? B(id) : ""}/></g>`;
    const pool = Array.from({ length: 9 }, (_, i) => head(700 + (i % 5) * 62, 320 + Math.floor(i / 5) * 84, 17, false));
    return `
      ${pool.join("")}
      <path d="M690 470 L1010 470 L1112 596 M1042 470 L1010 470" fill="none" stroke="${C.red}" stroke-width="2" opacity=".3"/>
      <path d="M660 300 L1060 470 L660 640" fill="none" stroke="${C.red}" stroke-width="2.4" opacity=".38" stroke-dasharray="9 11"/>
      <circle cx="1060" cy="470" r="30" fill="none" stroke="${S(id)}" stroke-width="4" ${B(id)}/>
      <path d="M1046 470 l10 11 l20 -24" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="1176" y="392" width="230" height="156" rx="12" fill="${C.base}" stroke="${S(id)}" stroke-width="4" ${B(id)}/>
      ${[0,1,2].map(i=>head(1228 + i*62, 500, 19, i === 1)).join("")}
      <line x1="1060" y1="470" x2="1176" y2="470" stroke="${C.ember}" stroke-width="3" opacity=".8"/>`;
  },

  // ── company pages ──
  aboutus: (r, id) => {
    // Two delivery hubs — Hyderabad and Raleigh — trading work across an arc.
    const HYD = { x: 760, y: 520 }, RAL = { x: 1360, y: 400 };
    const hub = (p, big) => `<g>
      <circle cx="${p.x}" cy="${p.y}" r="${big ? 54 : 44}" fill="${C.base}" stroke="${S(id)}" stroke-width="5" ${B(id)}/>
      <circle cx="${p.x}" cy="${p.y}" r="${big ? 18 : 14}" fill="#fff" ${B(id)}/>
      ${[1, 2, 3].map((k) => `<circle cx="${p.x}" cy="${p.y}" r="${(big ? 54 : 44) + k * 26}" fill="none" stroke="${C.red}" stroke-width="1.6" opacity="${n(.34 - k * .08)}"/>`).join("")}</g>`;
    const arcs = [0, 1, 2].map((k) =>
      `<path d="M${HYD.x} ${HYD.y} Q ${1060} ${300 - k * 74} ${RAL.x} ${RAL.y}" fill="none" stroke="${C.red}" stroke-width="${2.4 - k * .4}" opacity="${n(.6 - k * .16)}" stroke-dasharray="${10 + k * 5} ${9 + k * 4}"/>`).join("");
    const pulses = [0.3, 0.62].map((t) =>
      `<circle cx="${n(HYD.x + (RAL.x - HYD.x) * t)}" cy="${n(HYD.y + (300 - HYD.y) * Math.sin(Math.PI * t) * 0.9 + (RAL.y - HYD.y) * t * 0.4)}" r="6" fill="#fff" ${B(id)}/>`).join("");
    return `${arcs}${pulses}${hub(HYD, true)}${hub(RAL, false)}
      <path d="M660 690 h880" stroke="${C.red}" stroke-width="1.6" opacity=".28" stroke-dasharray="4 10"/>`;
  },

  blog: (r, id) => {
    // Stacked articles feeding a knowledge graph.
    const card = (x, y, o, hot) => `<g opacity="${o}">
      <rect x="${x}" y="${y}" width="230" height="150" rx="10" fill="${C.base}" stroke="${hot ? S(id) : C.red}" stroke-width="${hot ? 4 : 2.4}" ${hot ? B(id) : ""}/>
      <rect x="${x + 22}" y="${y + 26}" width="120" height="9" rx="4.5" fill="${C.ember}" opacity=".9"/>
      ${[0, 1, 2].map((k) => `<rect x="${x + 22}" y="${y + 56 + k * 22}" width="${186 - k * 40}" height="6" rx="3" fill="${C.ember}" opacity="${.55 - k * .12}"/>`).join("")}</g>`;
    const nodes = [[1330, 300], [1420, 430], [1300, 560], [1180, 660]];
    return `
      ${card(700, 560, .55, false)}${card(726, 470, .78, false)}${card(752, 380, 1, true)}
      ${nodes.map((p, i) => `<line x1="990" y1="455" x2="${p[0]}" y2="${p[1]}" stroke="${C.red}" stroke-width="1.8" opacity="${n(.5 - i * .07)}"/>`).join("")}
      ${nodes.map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="13" fill="${C.base}" stroke="${C.ember}" stroke-width="3"/>`).join("")}
      <circle cx="990" cy="455" r="9" fill="#fff" ${B(id)}/>`;
  },

  "use-cases": (r, id) => {
    // Scattered inbound contacts resolving into a measured outcome.
    const chaos = Array.from({ length: 22 }, (_, i) => {
      const x = 660 + (i % 6) * 40 + rndish(r) * 20, y = 330 + Math.floor(i / 6) * 74 + rndish(r) * 26;
      return `<rect x="${n(x)}" y="${n(y)}" width="16" height="16" rx="3" fill="none" stroke="${C.red}" stroke-width="2" opacity="${n(.35 + r() * .5)}" transform="rotate(${n(r() * 60 - 30)} ${n(x + 8)} ${n(y + 8)})"/>`;
    }).join("");
    const bars = [0, 1, 2].map((k) =>
      `<rect x="${1210}" y="${372 + k * 74}" width="${90 + k * 74}" height="20" rx="10" fill="${C.red}" opacity="${.45 + k * .22}"/>
       <rect x="${1210}" y="${372 + k * 74}" width="250" height="20" rx="10" fill="none" stroke="${C.red}" stroke-width="1.4" opacity=".3"/>`).join("");
    return `${chaos}
      <path d="M960 470 h150" stroke="${C.ember}" stroke-width="3" opacity=".85"/>
      <path d="M1086 458 l16 12 l-16 12" fill="none" stroke="${C.ember}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="1140" cy="470" r="44" fill="${C.base}" stroke="${S(id)}" stroke-width="5" ${B(id)}/>
      <path d="M1119 469 l14 16 l28 -34" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" ${B(id)}/>
      ${bars}`;
  },

  contactus: (r, id) => {
    // Inbound enquiries converging on a single point of contact.
    const rings = [0, 1, 2, 3].map((k) =>
      `<circle cx="1080" cy="470" r="${90 + k * 68}" fill="none" stroke="${C.red}" stroke-width="1.8" opacity="${n(.46 - k * .09)}" stroke-dasharray="${k ? `${6 + k * 4} ${10 + k * 3}` : "0"}"/>`).join("");
    const inbound = [[700, 300], [660, 470], [700, 650], [1450, 340], [1470, 600]].map((p) =>
      `<line x1="${p[0]}" y1="${p[1]}" x2="1080" y2="470" stroke="${C.red}" stroke-width="1.8" opacity=".4" stroke-dasharray="8 9"/>
       <circle cx="${p[0]}" cy="${p[1]}" r="9" fill="${C.ember}" opacity=".9"/>`).join("");
    return `${rings}${inbound}
      <rect x="998" y="418" width="164" height="106" rx="12" fill="${C.base}" stroke="${S(id)}" stroke-width="5" ${B(id)}/>
      <path d="M998 430 l82 56 l82 -56" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" ${B(id)}/>`;
  },

  helpdesk: (r, id) => {
    // Ticket queue triaged into a resolved state.
    const ticket = (x, y, o, hot) => `<g opacity="${o}">
      <rect x="${x}" y="${y}" width="210" height="66" rx="9" fill="${C.base}" stroke="${hot ? S(id) : C.red}" stroke-width="${hot ? 3.6 : 2.4}" ${hot ? B(id) : ""}/>
      <circle cx="${x + 28}" cy="${y + 33}" r="11" fill="none" stroke="${C.ember}" stroke-width="2.4"/>
      <rect x="${x + 52}" y="${y + 20}" width="128" height="7" rx="3.5" fill="${C.ember}" opacity=".8"/>
      <rect x="${x + 52}" y="${y + 38}" width="86" height="7" rx="3.5" fill="${C.ember}" opacity=".45"/></g>`;
    return `
      ${ticket(676, 300, .68, false)}${ticket(676, 392, .84, false)}${ticket(676, 484, 1, true)}${ticket(676, 576, .6, false)}
      <path d="M896 517 H1010" fill="none" stroke="${C.ember}" stroke-width="3" opacity=".85"/>
      <path d="M986 505 l16 12 l-16 12" fill="none" stroke="${C.ember}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="1130" cy="517" r="76" fill="none" stroke="${C.red}" stroke-width="2.2" opacity=".4" stroke-dasharray="6 12"/>
      <circle cx="1130" cy="517" r="50" fill="${C.base}" stroke="${S(id)}" stroke-width="5" ${B(id)}/>
      <path d="M1106 516 l16 18 l32 -38" fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" ${B(id)}/>
      <g opacity=".8">${[0,1,2].map(i=>`<rect x="1256" y="${446 + i*46}" width="${120 - i*26}" height="9" rx="4.5" fill="${C.ember}" opacity="${.85 - i*.22}"/>`).join("")}</g>`;
  },
};

// HUD content per page: where the reticle sits, what the readout says, and callouts.
// Labels are sector language, not decoration — they should look like real instrumentation.
const HUD = {
  careers:         { ret: [1040, 450, 152], rd: [1186, 128, "TEAM BUILD", ["DOMAINS", "ROLES", "MOBILISE"]], cal: [[1418, 600, 1500, 700, "POD READY"]] },
  healthcare:      { ret: [1010, 470, 250], rd: [1188, 116, "PATIENT FLOW", ["TRIAGE", "BOOKING", "REMINDERS"]], cal: [[1272, 604, 1352, 690, "ESCALATION"]] },
  manufacturing:   { ret: [1080, 400, 190], rd: [1176, 116, "LINE STATUS", ["UPTIME", "YIELD", "MAINT"]], cal: [[700, 600, 636, 690, "ROBOT ARM"]] },
  finance:         { ret: [1120, 430, 208], rd: [700, 116, "LEDGER", ["INVOICES", "RECON", "FORECAST"]], cal: [[1530, 385, 1436, 300, "TREND"]] },
  banking:         { ret: [1060, 470, 236], rd: [1200, 116, "CONTROLS", ["KYC", "AUDIT", "ACCESS"]], cal: [[1060, 636, 1180, 720, "VERIFIED"]] },
  legal:           { ret: [1090, 470, 250], rd: [1330, 140, "CLAUSES", ["EXTRACT", "RISK", "REVIEW"]], cal: [[706, 512, 640, 616, "CONTRACT"]] },
  logistics:       { ret: [1160, 430, 176], rd: [676, 116, "FLEET", ["ETA", "ROUTE", "POD"]], cal: [[1350, 470, 1436, 560, "DELIVERED"]] },
  "supply-chain":  { ret: [1010, 470, 210], rd: [1330, 130, "PLANNING", ["DEMAND", "STOCK", "SUPPLY"]], cal: [[700, 300, 636, 220, "SUPPLIER"]] },
  "contact-centre":{ ret: [880, 470, 236], rd: [1180, 116, "CHANNELS", ["VOICE", "CHAT", "HANDOVER"]], cal: [[1340, 470, 1428, 566, "LIVE"]] },
  hr:              { ret: [1060, 470, 250], rd: [1300, 130, "WORKFORCE", ["HIRING", "ATTENDANCE", "EXIT"]], cal: [[1060, 302, 1180, 220, "LEADERSHIP"]] },

  "ai-genai-services": { ret: [1050, 470, 254], rd: [676, 116, "MODEL", ["GROUNDING", "GUARDRAILS", "EVAL"]], cal: [[1340, 422, 1432, 330, "OUTPUT"]] },
  "agentic-ai":        { ret: [1060, 470, 292], rd: [676, 116, "ORCHESTRATOR", ["PLAN", "ACT", "VERIFY"]], cal: [[1060, 240, 1180, 168, "AGENT POOL"]] },
  "web-mobile-dev":    { ret: [920, 440, 250], rd: [676, 116, "BUILD", ["WEB", "MOBILE", "API"]], cal: [[1281, 638, 1400, 716, "RELEASE"]] },
  "whatsapp-business": { ret: [1000, 470, 268], rd: [676, 116, "CONVERSATION", ["LEAD", "ORDER", "SUPPORT"]], cal: [[1326, 656, 1424, 736, "PAYMENT"]] },
  "erp-services":      { ret: [1060, 470, 248], rd: [676, 116, "MODULES", ["FINANCE", "SUPPLY", "HR"]], cal: [[1292, 470, 1400, 560, "INTEGRATED"]] },
  "staff-augmentation":{ ret: [1060, 470, 232], rd: [676, 116, "PIPELINE", ["SOURCED", "SCREENED", "PLACED"]], cal: [[1290, 548, 1390, 640, "TEAM"]] },
  helpdesk:            { ret: [1130, 517, 200], rd: [676, 116, "QUEUE", ["P1", "SLA", "RESOLVED"]], cal: [[886, 517, 800, 690, "TRIAGE"]] },

  aboutus:    { ret: [1060, 460, 300], rd: [676, 116, "DELIVERY", ["HYDERABAD", "RALEIGH", "UPTIME"]], cal: [[760, 520, 660, 660, "INDIA"], [1360, 400, 1440, 268, "USA"]] },
  blog:       { ret: [990, 455, 250], rd: [1300, 116, "TOPICS", ["VOICE AI", "WHATSAPP", "AGENTS"]], cal: [[867, 380, 760, 250, "LATEST"]] },
  "use-cases":{ ret: [1140, 470, 214], rd: [676, 116, "OUTCOMES", ["ANSWERED", "RESOLVED", "MEASURED"]], cal: [[1460, 520, 1400, 660, "RESULT"]] },
  contactus:  { ret: [1080, 470, 258], rd: [676, 116, "ENQUIRY", ["ROUTED", "REPLIED", "SCOPED"]], cal: [[1080, 524, 1200, 660, "ONE DAY"]] },
};

// ── compose ──────────────────────────────────────────────────────────────────
const SEEDS = {
  healthcare: 11, manufacturing: 23, finance: 37, banking: 41, legal: 53,
  logistics: 67, "supply-chain": 79, "contact-centre": 89, hr: 97,
  "ai-genai-services": 103, "agentic-ai": 109, "web-mobile-dev": 127,
  "whatsapp-business": 131, "erp-services": 149, "staff-augmentation": 157, helpdesk: 163,
  aboutus: 173, blog: 179, "use-cases": 191, contactus: 197, careers: 211,
};

mkdirSync(OUT, { recursive: true });
for (const [key, motif] of Object.entries(MOTIF)) {
  const r = rng(SEEDS[key]);
  const id = key.replace(/[^a-z]/g, "");
  const hud = HUD[key];
  if (!hud) throw new Error(`No HUD spec for "${key}"`);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
${defs(id)}
<rect width="${W}" height="${H}" fill="${C.base}"/>
<rect width="${W}" height="${H}" fill="${C.deep}" opacity=".55"/>
${grid()}
<ellipse cx="1010" cy="440" rx="700" ry="520" fill="url(#glow-${id})"/>
<rect width="${W}" height="${H}" fill="url(#glow2-${id})"/>
${mesh(r)}
${hudReticle(...hud.ret)}
<g>${motif(r, id)}</g>
${dust(r)}
${hud.cal.map((c) => hudCallout(...c)).join("\n")}
${hudReadout(hud.rd[0], hud.rd[1], hud.rd[2], hud.rd[3], r)}
${hudFrame()}
${scanlines()}
<rect width="${W}" height="${H}" fill="url(#vign-${id})"/>
</svg>
`;
  writeFileSync(resolve(OUT, key + ".svg"), svg, "utf8");
}
console.log(`Wrote ${Object.keys(MOTIF).length} industry SVGs to public/img/industry/`);
