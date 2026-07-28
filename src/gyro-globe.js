// Ported from mukalingam.github.io (Scene3D "GyroRings" act) into the IICL model system —
// restyled red/black, plus a particle globe shell so it reads as a world under the gyroscope rings.
import {
  THREE,
  createStage,
  createParticleMaterial,
  addAtmosphere,
  makeLineMaterial,
  isLowPower,
} from "./core.js";

const stage = createStage({
  cameraPosition: [0.5, 0.25, 9.6],
  target: [0.9, 0, 0],
  bloomStrength: 1.2,
  bloomRadius: 0.75,
  bloomThreshold: 0.08,
  fogDensity: 0.02,
  minDistance: 5.5,
  maxDistance: 15,
});

const globe = new THREE.Group();
globe.position.x = 1.15;
globe.rotation.x = 0.12;
stage.scene.add(globe);
addAtmosphere(stage, isLowPower ? 400 : 800, 14);

// Core — dark sphere with a red pulse (the portfolio's icosahedron core, IICL palette).
const core = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.55, isLowPower ? 2 : 3),
  new THREE.MeshPhysicalMaterial({
    color: 0x180103,
    emissive: 0xed101d,
    emissiveIntensity: 1.3,
    metalness: 0.7,
    roughness: 0.16,
    transparent: true,
    opacity: 0.94,
  }),
);
globe.add(core);

const innerGlow = new THREE.Mesh(
  new THREE.SphereGeometry(0.34, 24, 16),
  new THREE.MeshBasicMaterial({ color: 0xff2733, transparent: true, opacity: 0.24, blending: THREE.AdditiveBlending }),
);
globe.add(innerGlow);

// Particle globe shell — fibonacci sphere in the red/black palette (repels from the cursor via core.js).
const shellCount = isLowPower ? 3600 : 7200;
const shellR = 2.05;
const positions = new Float32Array(shellCount * 3);
const colors = new Float32Array(shellCount * 3);
for (let i = 0; i < shellCount; i++) {
  const y = 1 - (i / (shellCount - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const th = i * 2.39996;
  positions[i * 3] = Math.cos(th) * r * shellR;
  positions[i * 3 + 1] = y * shellR;
  positions[i * 3 + 2] = Math.sin(th) * r * shellR;
  if (Math.random() > 0.965) {
    colors[i * 3] = 1; colors[i * 3 + 1] = 0.72; colors[i * 3 + 2] = 0.74;
  } else {
    const it = 0.35 + Math.random() * 0.6;
    colors[i * 3] = it; colors[i * 3 + 1] = 0.02 + it * 0.05; colors[i * 3 + 2] = 0.03 + it * 0.07;
  }
}
const shellGeo = new THREE.BufferGeometry();
shellGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
shellGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
const shell = new THREE.Points(shellGeo, createParticleMaterial({ size: isLowPower ? 0.055 : 0.048, opacity: 0.7 }));
globe.add(shell);

// Gyroscope rings — the portfolio's four orbits, in red tones.
const RING_CONF = [
  { r: 2.5, speed: 0.24, axis: "x", color: 0xed101d, opacity: 0.5 },
  { r: 2.9, speed: -0.18, axis: "y", color: 0xff5962, opacity: 0.38 },
  { r: 3.3, speed: 0.14, axis: "x", color: 0x8d0710, opacity: 0.42 },
  { r: 3.7, speed: -0.1, axis: "y", color: 0xed101d, opacity: 0.3 },
];
const rings = [];
for (let i = 0; i < RING_CONF.length; i++) {
  const c = RING_CONF[i];
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(c.r, 0.012, 6, 140),
    new THREE.MeshBasicMaterial({ color: c.color, transparent: true, opacity: c.opacity, blending: THREE.AdditiveBlending }),
  );
  ring.rotation.set(i * 0.9, i * 0.5, 0);
  ring.userData = { ...c, phase: i * 0.7 };
  globe.add(ring);
  rings.push(ring);
}

// Meridian hint — one faint lat/long wireframe to tie the shell to the rings.
const meridians = new THREE.LineSegments(
  new THREE.WireframeGeometry(new THREE.SphereGeometry(shellR * 0.998, 18, 12)),
  makeLineMaterial(0x6b0a10, 0.12),
);
globe.add(meridians);

// Orbiting signal nodes — small bright travellers on the two inner rings.
const nodeCount = isLowPower ? 8 : 14;
const nodes = new THREE.InstancedMesh(
  new THREE.OctahedronGeometry(0.055, 0),
  new THREE.MeshBasicMaterial({ color: 0xffd6d8 }),
  nodeCount,
);
globe.add(nodes);
const dummy = new THREE.Object3D();

stage.addUpdate((time, delta) => {
  globe.rotation.y += delta * 0.1;
  core.rotation.y -= delta * 0.16;
  core.material.emissiveIntensity = 1.05 + Math.sin(time * 2.1) * 0.35;
  innerGlow.scale.setScalar(0.9 + Math.sin(time * 2.1) * 0.14);
  shell.rotation.y = time * 0.03;

  for (const ring of rings) {
    if (ring.userData.axis === "x") ring.rotation.x += delta * ring.userData.speed;
    else ring.rotation.y += delta * ring.userData.speed;
    ring.material.opacity = ring.userData.opacity + Math.sin(time * 1.2 + ring.userData.phase) * 0.08;
  }

  for (let i = 0; i < nodeCount; i++) {
    const ring = rings[i % 2];
    const a = time * (0.35 + (i % 4) * 0.07) + (i / nodeCount) * Math.PI * 2;
    dummy.position.set(Math.cos(a) * ring.userData.r, Math.sin(a) * ring.userData.r, 0);
    dummy.position.applyEuler(ring.rotation);
    dummy.scale.setScalar(0.8 + Math.sin(a * 2) * 0.3);
    dummy.updateMatrix();
    nodes.setMatrixAt(i, dummy.matrix);
  }
  nodes.instanceMatrix.needsUpdate = true;
});
