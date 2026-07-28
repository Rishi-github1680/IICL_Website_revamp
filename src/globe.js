import {
  THREE,
  createStage,
  createParticleMaterial,
  addAtmosphere,
  makeLineMaterial,
  isLowPower,
} from "./core.js";

const stage = createStage({
  cameraPosition: [0.6, 0.25, 8.6],
  target: [0.85, 0, 0],
  bloomStrength: 2.0,
  bloomRadius: 0.8,
  bloomThreshold: 0.04,
  fogDensity: 0.022,
  minDistance: 6,
  maxDistance: 15,
});

const globe = new THREE.Group();
globe.position.x = 1.15;
stage.scene.add(globe);
const planet = new THREE.Group(); // spins; carries surface, arcs, hubs
planet.rotation.z = 0.41; // Earth-like axial tilt
globe.add(planet);
addAtmosphere(stage, isLowPower ? 420 : 880, 14);

const R = 2.15;

// ── Continents: layered sine "noise", damped at the poles ──
function landValue(x, y, z) {
  return (
    Math.sin(x * 3.1 + z * 2.3) * Math.cos(y * 2.7) * 0.5 +
    Math.sin(x * 6.7 - y * 5.1 + z * 4.3) * 0.3 +
    Math.sin(x * 13.0 + y * 11.0 - z * 9.0) * 0.2
  );
}

// ── Surface points (fibonacci sphere) ──
const dotCount = isLowPower ? 5200 : 12000;
const dotPos = new Float32Array(dotCount * 3);
const dotCol = new Float32Array(dotCount * 3);
const golden = Math.PI * (3 - Math.sqrt(5));
for (let i = 0; i < dotCount; i++) {
  const y = 1 - (i / (dotCount - 1)) * 2;
  const ring = Math.sqrt(Math.max(0, 1 - y * y));
  const th = golden * i;
  const x = Math.cos(th) * ring;
  const z = Math.sin(th) * ring;
  dotPos[i * 3] = x * R;
  dotPos[i * 3 + 1] = y * R;
  dotPos[i * 3 + 2] = z * R;
  const polar = Math.max(0, Math.abs(y) - 0.78) * 4.5; // fade the ice caps
  const land = landValue(x, y, z) > 0.42 - Math.abs(y) * 0.12;
  const city = land && Math.random() > 0.93; // scattered bright "city lights"
  let t = land ? 0.78 + Math.random() * 0.22 : 0.16 + Math.random() * 0.12;
  t *= 1 - Math.min(0.75, polar);
  if (city) {
    dotCol[i * 3] = 1;
    dotCol[i * 3 + 1] = 0.62;
    dotCol[i * 3 + 2] = 0.64;
  } else {
    dotCol[i * 3] = t;
    dotCol[i * 3 + 1] = t * 0.05;
    dotCol[i * 3 + 2] = t * 0.07;
  }
}
const dotGeo = new THREE.BufferGeometry();
dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPos, 3));
dotGeo.setAttribute("color", new THREE.BufferAttribute(dotCol, 3));
planet.add(new THREE.Points(dotGeo, createParticleMaterial({ size: isLowPower ? 0.05 : 0.042, opacity: 0.92 })));

// ── Graticule: latitude rings + meridians ──
const gratMat = makeLineMaterial(0x8a0d14, 0.09);
const circlePts = (segments = 96) => {
  const pts = [];
  for (let s = 0; s <= segments; s++) {
    const a = (s / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a), 0, Math.sin(a)));
  }
  return pts;
};
for (let lat = -60; lat <= 60; lat += 30) {
  const rad = (lat * Math.PI) / 180;
  const ring = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(circlePts().map((p) => p.clone().multiplyScalar(R * Math.cos(rad)))),
    gratMat,
  );
  ring.position.y = R * Math.sin(rad);
  planet.add(ring);
}
for (let lon = 0; lon < 180; lon += 30) {
  const meridian = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(circlePts().map((p) => new THREE.Vector3(p.x * R, p.z * R, 0))),
    gratMat,
  );
  meridian.rotation.y = (lon * Math.PI) / 180;
  planet.add(meridian);
}

// ── Fresnel atmosphere glow ──
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(R * 1.14, 48, 32),
  new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide,
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        // Rim-only halo: the particle planet is see-through, so keep the disc centre dark.
        float rim = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.5);
        gl_FragColor = vec4(1.0, 0.11, 0.14, 1.0) * rim * 0.55;
      }
    `,
  }),
);
globe.add(atmosphere);

// ── Orbital rings: two concentric rings on a static mount so they never wobble
// (parenting them to the spinning+tilted planet made the plane precess).
const ringMount = new THREE.Group();
ringMount.rotation.z = 0.41; // match the axial tilt, but no spin
globe.add(ringMount);
const ringSpecs = [
  { radius: R * 1.34, opacity: 0.16, tube: 0.006 },
  { radius: R * 1.52, opacity: 0.06, tube: 0.004 },
];
for (const spec of ringSpecs) {
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(spec.radius, spec.tube, 5, 200),
    new THREE.MeshBasicMaterial({
      color: 0xed101d,
      transparent: true,
      opacity: spec.opacity,
      blending: THREE.AdditiveBlending,
    }),
  );
  ring.rotation.x = Math.PI / 2;
  ringMount.add(ring);
}

// ── Hubs — prefer land sites ──
const hubCount = isLowPower ? 20 : 34;
const hubs = [];
let guard = 0;
while (hubs.length < hubCount && guard++ < 4000) {
  const u = Math.random();
  const v = Math.random();
  const th = 2 * Math.PI * u;
  const ph = Math.acos(2 * v - 1);
  const p = new THREE.Vector3(Math.sin(ph) * Math.cos(th), Math.cos(ph), Math.sin(ph) * Math.sin(th));
  if (Math.abs(p.y) > 0.85) continue;
  if (landValue(p.x, p.y, p.z) > 0.42 - Math.abs(p.y) * 0.12 || guard > 2000) {
    hubs.push(p.multiplyScalar(R));
  }
}

// ── Arcs: apex-bright gradient lines between hubs ──
const arcSeg = 30;
const arcs = [];
const arcCount = isLowPower ? 26 : 50;
const arcPositions = [];
const arcColors = [];
for (let i = 0; i < arcCount; i++) {
  const a = hubs[Math.floor(Math.random() * hubs.length)];
  let b = hubs[Math.floor(Math.random() * hubs.length)];
  if (a === b) b = hubs[(hubs.indexOf(a) + 3) % hubs.length];
  const mid = a.clone().add(b).multiplyScalar(0.5);
  mid.setLength(R * (1 + (a.distanceTo(b) / (R * 2)) * 0.6));
  const pts = [];
  for (let s = 0; s <= arcSeg; s++) {
    const t = s / arcSeg;
    pts.push(new THREE.Vector3()
      .addScaledVector(a, (1 - t) * (1 - t))
      .addScaledVector(mid, 2 * (1 - t) * t)
      .addScaledVector(b, t * t));
    if (s < arcSeg) {
      const glow = 0.35 + Math.sin((t + 0.5 / arcSeg) * Math.PI) * 0.65; // brightest at apex
      arcPositions.push(pts[s].x, pts[s].y, pts[s].z);
      arcColors.push(glow, glow * 0.09, glow * 0.11);
    }
  }
  arcPositions.push(pts[arcSeg].x, pts[arcSeg].y, pts[arcSeg].z);
  arcColors.push(0.35, 0.03, 0.04);
  arcs.push({ pts, phase: Math.random(), speed: 0.14 + Math.random() * 0.26 });
}
// Rebuild as segments so all arcs share one draw call
const segPos = [];
const segCol = [];
let cursor = 0;
for (let i = 0; i < arcCount; i++) {
  for (let s = 0; s < arcSeg; s++) {
    const p0 = (cursor + s) * 3;
    const p1 = (cursor + s + 1) * 3;
    segPos.push(arcPositions[p0], arcPositions[p0 + 1], arcPositions[p0 + 2], arcPositions[p1], arcPositions[p1 + 1], arcPositions[p1 + 2]);
    segCol.push(arcColors[p0], arcColors[p0 + 1], arcColors[p0 + 2], arcColors[p1], arcColors[p1 + 1], arcColors[p1 + 2]);
  }
  cursor += arcSeg + 1;
}
const arcGeo = new THREE.BufferGeometry();
arcGeo.setAttribute("position", new THREE.Float32BufferAttribute(segPos, 3));
arcGeo.setAttribute("color", new THREE.Float32BufferAttribute(segCol, 3));
const arcMat = new THREE.LineBasicMaterial({
  vertexColors: true,
  transparent: true,
  opacity: 0.55,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});
planet.add(new THREE.LineSegments(arcGeo, arcMat));

// ── Hub nodes + glow halos ──
const hubGeo = new THREE.IcosahedronGeometry(0.05, 1);
const hubMat = new THREE.MeshPhysicalMaterial({
  color: 0xed101d, emissive: 0xed101d, emissiveIntensity: 2.2, metalness: 0.5, roughness: 0.16,
});
const hubMesh = new THREE.InstancedMesh(hubGeo, hubMat, hubs.length);
const dummy = new THREE.Object3D();
hubs.forEach((h, i) => {
  dummy.position.copy(h);
  dummy.scale.setScalar(0.8 + Math.random() * 0.9);
  dummy.updateMatrix();
  hubMesh.setMatrixAt(i, dummy.matrix);
});
planet.add(hubMesh);

const hubGlowPos = new Float32Array(hubs.length * 3);
const hubGlowCol = new Float32Array(hubs.length * 3);
hubs.forEach((h, i) => {
  hubGlowPos[i * 3] = h.x;
  hubGlowPos[i * 3 + 1] = h.y;
  hubGlowPos[i * 3 + 2] = h.z;
  hubGlowCol[i * 3] = 1;
  hubGlowCol[i * 3 + 1] = 0.1;
  hubGlowCol[i * 3 + 2] = 0.13;
});
const hubGlowGeo = new THREE.BufferGeometry();
hubGlowGeo.setAttribute("position", new THREE.BufferAttribute(hubGlowPos, 3));
hubGlowGeo.setAttribute("color", new THREE.BufferAttribute(hubGlowCol, 3));
planet.add(new THREE.Points(hubGlowGeo, createParticleMaterial({ size: 0.18, opacity: 0.35 })));

// ── Signal pulses: two per arc, opposite phases ──
const pulseGeo = new THREE.SphereGeometry(0.038, 8, 8);
const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffb3b8 });
const pulses = new THREE.InstancedMesh(pulseGeo, pulseMat, arcs.length * 2);
planet.add(pulses);

stage.addUpdate((time, delta) => {
  planet.rotation.y += delta * 0.055;
  globe.rotation.z = Math.sin(time * 0.16) * 0.02;
  arcMat.opacity = 0.48 + Math.sin(time * 0.7) * 0.09;
  for (let i = 0; i < arcs.length; i++) {
    const arc = arcs[i];
    for (let k = 0; k < 2; k++) {
      const progress = (time * arc.speed + arc.phase + k * 0.5) % 1;
      const f = progress * arcSeg;
      const idx = Math.min(arcSeg - 1, Math.floor(f));
      dummy.position.lerpVectors(arc.pts[idx], arc.pts[idx + 1], f - idx);
      dummy.scale.setScalar(0.4 + Math.sin(progress * Math.PI) * 0.6);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      pulses.setMatrixAt(i * 2 + k, dummy.matrix);
    }
  }
  pulses.instanceMatrix.needsUpdate = true;
});
