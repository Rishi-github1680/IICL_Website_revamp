// Ported from mukalingam.github.io (Scene3D "StreamField" act) into the IICL model system —
// elevated to tell point 3's story: two continent hubs, one delivery engine. Particle streams
// and flight arcs ship work between the two cores around the clock. Red/black palette.
import {
  THREE,
  createStage,
  createParticleMaterial,
  addAtmosphere,
  makeLineMaterial,
  isLowPower,
} from "./core.js";

const stage = createStage({
  cameraPosition: [0.3, 0.6, 11],
  target: [0.6, 0, 0],
  bloomStrength: 1.25,
  bloomRadius: 0.75,
  bloomThreshold: 0.08,
  fogDensity: 0.02,
  minDistance: 5.5,
  maxDistance: 15,
});

const engine = new THREE.Group();
engine.position.x = 0.85;
engine.rotation.set(0.06, -0.14, 0);
stage.scene.add(engine);
addAtmosphere(stage, isLowPower ? 400 : 800, 14);

// ── Two continent hubs ──
const HUB_X = 2.8;
function makeHub(x) {
  const hub = new THREE.Group();
  hub.position.x = x;
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.5, isLowPower ? 2 : 3),
    new THREE.MeshPhysicalMaterial({
      color: 0x180103, emissive: 0xed101d, emissiveIntensity: 1.4,
      metalness: 0.7, roughness: 0.16, transparent: true, opacity: 0.94,
    }),
  );
  hub.add(core);
  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 24, 16),
    new THREE.MeshBasicMaterial({ color: 0xff2733, transparent: true, opacity: 0.26, blending: THREE.AdditiveBlending }),
  );
  hub.add(glow);
  const wire = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.72, 1),
    new THREE.MeshBasicMaterial({ color: 0xff5962, transparent: true, opacity: 0.3, wireframe: true, blending: THREE.AdditiveBlending }),
  );
  hub.add(wire);
  // halo rings, like a port beacon
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.95 + i * 0.22, 0.008, 5, 90),
      new THREE.MeshBasicMaterial({ color: 0xed101d, transparent: true, opacity: 0.22 - i * 0.05, blending: THREE.AdditiveBlending }),
    );
    ring.rotation.x = Math.PI / 2.2 + i * 0.16;
    ring.userData.phase = i * 0.9;
    hub.add(ring);
  }
  engine.add(hub);
  return { hub, core, glow, wire };
}
const hubA = makeHub(-HUB_X); // Hyderabad — builds
const hubB = makeHub(HUB_X);  // Raleigh — delivers

// ── Particle delivery streams (the ported StreamField) ──
const N = isLowPower ? 1600 : 3200;
const pos = new Float32Array(N * 3);
const col = new Float32Array(N * 3);
const lane = new Float32Array(N); // signed speed: + ships east, − ships west
const rnd = (i, s) => Math.abs((Math.sin(i * s) * 43758.5453) % 1);
for (let i = 0; i < N; i++) {
  pos[i * 3] = (rnd(i, 12.9) - 0.5) * 2 * HUB_X;
  const spreadY = 0.15 + rnd(i, 45.1) * 0.85;
  pos[i * 3 + 1] = (rnd(i, 91.7) - 0.5) * 2.4 * spreadY * (1 - Math.abs(pos[i * 3]) / (HUB_X + 0.6)) - 0.1;
  pos[i * 3 + 2] = (rnd(i, 78.2) - 0.5) * 2.2;
  lane[i] = (i % 2 === 0 ? 1 : -1) * (0.5 + rnd(i, 33.3) * 1.3);
  if (rnd(i, 57.5) > 0.96) {
    col[i * 3] = 1; col[i * 3 + 1] = 0.72; col[i * 3 + 2] = 0.74;
  } else {
    const it = 0.35 + rnd(i, 21.3) * 0.6;
    col[i * 3] = it; col[i * 3 + 1] = 0.02 + it * 0.05; col[i * 3 + 2] = 0.03 + it * 0.07;
  }
}
const streamGeo = new THREE.BufferGeometry();
streamGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
streamGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
const stream = new THREE.Points(streamGeo, createParticleMaterial({ size: isLowPower ? 0.06 : 0.052, opacity: 0.75 }));
engine.add(stream);

// ── Flight arcs between the hubs ──
const arcCount = isLowPower ? 5 : 7;
const arcs = [];
for (let i = 0; i < arcCount; i++) {
  const lift = 1.1 + i * 0.42;
  const side = i % 2 === 0 ? 1 : -1;
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-HUB_X, 0, 0),
    new THREE.Vector3(0, lift * side * (i % 3 === 2 ? 0.5 : 1), side * (0.4 + i * 0.16)),
    new THREE.Vector3(HUB_X, 0, 0),
  );
  const points = curve.getPoints(70);
  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    makeLineMaterial(i % 3 === 0 ? 0xff5962 : 0xed101d, 0.3 - i * 0.02),
  );
  engine.add(line);
  arcs.push({ curve, line, phase: rnd(i, 7.7), speed: 0.1 + rnd(i, 3.3) * 0.16, dir: i % 2 === 0 ? 1 : -1 });
}

// Pulses travelling the arcs — shipments in flight.
const pulses = new THREE.InstancedMesh(
  new THREE.SphereGeometry(0.042, 8, 8),
  new THREE.MeshBasicMaterial({ color: 0xffd6d8 }),
  arcCount,
);
engine.add(pulses);
const dummy = new THREE.Object3D();
const pv = new THREE.Vector3();

stage.addUpdate((time, delta) => {
  engine.rotation.y = -0.14 + Math.sin(time * 0.16) * 0.06;

  for (const h of [hubA, hubB]) {
    h.core.rotation.y += delta * 0.2;
    h.core.material.emissiveIntensity = 1.1 + Math.sin(time * 2 + (h === hubB ? Math.PI : 0)) * 0.35;
    h.glow.scale.setScalar(0.9 + Math.sin(time * 2 + (h === hubB ? Math.PI : 0)) * 0.15);
    h.wire.rotation.y -= delta * 0.14;
    for (const child of h.hub.children) {
      if (child.geometry && child.geometry.type === "TorusGeometry") {
        child.rotation.z += delta * 0.2;
        child.scale.setScalar(1 + Math.sin(time * 1.3 + child.userData.phase) * 0.05);
      }
    }
  }

  // Streams: ship particles between the hubs, wrap at the far side (around the clock).
  const attr = streamGeo.attributes.position;
  for (let i = 0; i < N; i++) {
    let x = attr.getX(i) + lane[i] * delta;
    if (x > HUB_X) x = -HUB_X;
    if (x < -HUB_X) x = HUB_X;
    attr.setX(i, x);
    attr.setY(i, attr.getY(i) + Math.sin(time * 1.5 + i) * 0.0022);
  }
  attr.needsUpdate = true;

  for (let i = 0; i < arcs.length; i++) {
    const a = arcs[i];
    let t = (time * a.speed + a.phase) % 1;
    if (a.dir < 0) t = 1 - t;
    a.curve.getPoint(t, pv);
    dummy.position.copy(pv);
    dummy.scale.setScalar(0.7 + Math.sin(t * Math.PI) * 0.8);
    dummy.updateMatrix();
    pulses.setMatrixAt(i, dummy.matrix);
    a.line.material.opacity = 0.2 + Math.sin(time * 0.9 + i) * 0.07;
  }
  pulses.instanceMatrix.needsUpdate = true;
});
