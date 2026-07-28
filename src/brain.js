import {
  THREE,
  createStage,
  createParticleMaterial,
  addAtmosphere,
  makeLineMaterial,
  isLowPower,
} from "./core.js";

const stage = createStage({
  cameraPosition: [0.55, 0.15, 8.7],
  target: [0.7, 0, 0],
  bloomStrength: 2.15,
  bloomRadius: 0.82,
  bloomThreshold: 0.03,
  fogDensity: 0.024,
  minDistance: 5.2,
  maxDistance: 12,
});

const brain = new THREE.Group();
brain.position.x = 1.18;
brain.rotation.x = -0.04;
stage.scene.add(brain);
addAtmosphere(stage, isLowPower ? 420 : 820, 13);

const particleCount = isLowPower ? 9000 : 18000;
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);
const anchors = [[], []];

function brainPosition(index, surfaceBias = false) {
  const sideIndex = index % 2;
  const side = sideIndex === 0 ? -1 : 1;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const volume = surfaceBias
    ? 0.9 + Math.random() * 0.1
    : 0.34 + Math.pow(Math.random(), 0.22) * 0.66;
  const sx = Math.sin(phi) * Math.cos(theta);
  const sy = Math.cos(phi);
  const sz = Math.sin(phi) * Math.sin(theta);
  const fold = 1 + Math.sin(theta * 8 + phi * 5) * 0.055 + Math.sin(theta * 13 - phi * 3) * 0.025;
  const crown = 1 - Math.max(0, Math.abs(sy) - 0.72) * 0.36;
  const x = side * (0.26 + Math.abs(sx) * 1.34) * volume * fold * crown;
  const y = sy * 1.72 * volume * (1 + Math.sin(theta * 6) * 0.025);
  const z = sz * 1.34 * volume * fold;
  return [x, y, z, sideIndex];
}

for (let i = 0; i < particleCount; i++) {
  const [x, y, z, sideIndex] = brainPosition(i);
  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = z;

  const brightness = Math.random();
  if (brightness > 0.967) {
    colors[i * 3] = 1;
    colors[i * 3 + 1] = 0.72;
    colors[i * 3 + 2] = 0.74;
  } else {
    const intensity = 0.42 + Math.random() * 0.58;
    colors[i * 3] = intensity;
    colors[i * 3 + 1] = 0.018 + intensity * 0.055;
    colors[i * 3 + 2] = 0.03 + intensity * 0.07;
  }

  if (anchors[sideIndex].length < (isLowPower ? 190 : 360) && Math.random() > 0.91) {
    anchors[sideIndex].push(new THREE.Vector3(x, y, z));
  }
}

for (let side = 0; side < 2; side++) {
  while (anchors[side].length < (isLowPower ? 190 : 360)) {
    const index = side + Math.floor(Math.random() * (particleCount / 2)) * 2;
    anchors[side].push(new THREE.Vector3(
      positions[index * 3],
      positions[index * 3 + 1],
      positions[index * 3 + 2],
    ));
  }
}

const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
const brainParticles = new THREE.Points(
  particleGeometry,
  createParticleMaterial({ size: isLowPower ? 0.075 : 0.065, opacity: 0.95 }),
);
brain.add(brainParticles);

const lineCount = isLowPower ? 620 : 1240;
const linePositions = new Float32Array(lineCount * 6);
const signalSegments = [];
for (let i = 0; i < lineCount; i++) {
  const lobe = i % 2;
  const lobeAnchors = anchors[lobe];
  const aIndex = Math.floor(Math.random() * lobeAnchors.length);
  let bIndex = (aIndex + 2 + Math.floor(Math.random() * 31)) % lobeAnchors.length;
  if (bIndex === aIndex) bIndex = (bIndex + 1) % lobeAnchors.length;
  const a = lobeAnchors[aIndex];
  const b = lobeAnchors[bIndex];
  const offset = i * 6;
  linePositions[offset] = a.x;
  linePositions[offset + 1] = a.y;
  linePositions[offset + 2] = a.z;
  linePositions[offset + 3] = b.x;
  linePositions[offset + 4] = b.y;
  linePositions[offset + 5] = b.z;
  if (signalSegments.length < (isLowPower ? 45 : 92) && a.distanceToSquared(b) < 3.4) {
    signalSegments.push({
      a,
      b,
      phase: Math.random(),
      speed: 0.12 + Math.random() * 0.24,
    });
  }
}
const lineGeometry = new THREE.BufferGeometry();
lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
const neuralLines = new THREE.LineSegments(lineGeometry, makeLineMaterial(0xed101d, isLowPower ? 0.13 : 0.18));
brain.add(neuralLines);

const pulsePositions = new Float32Array(signalSegments.length * 3);
const pulseColors = new Float32Array(signalSegments.length * 3);
for (let i = 0; i < signalSegments.length; i++) {
  pulseColors[i * 3] = 1;
  pulseColors[i * 3 + 1] = i % 7 === 0 ? 0.86 : 0.08;
  pulseColors[i * 3 + 2] = i % 7 === 0 ? 0.88 : 0.11;
}
const pulseGeometry = new THREE.BufferGeometry();
pulseGeometry.setAttribute("position", new THREE.BufferAttribute(pulsePositions, 3));
pulseGeometry.setAttribute("color", new THREE.BufferAttribute(pulseColors, 3));
const signalPulses = new THREE.Points(
  pulseGeometry,
  createParticleMaterial({ size: 0.2, opacity: 1 }),
);
brain.add(signalPulses);

const coreMaterial = new THREE.MeshBasicMaterial({
  color: 0x5d050b,
  transparent: true,
  opacity: 0.1,
  wireframe: true,
  blending: THREE.AdditiveBlending,
});
const innerCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.62, 2), coreMaterial);
innerCore.scale.set(1.5, 1.12, 1.35);
brain.add(innerCore);

const haloMaterial = new THREE.MeshBasicMaterial({
  color: 0xed101d,
  transparent: true,
  opacity: 0.12,
  blending: THREE.AdditiveBlending,
});
for (let i = 0; i < 3; i++) {
  const halo = new THREE.Mesh(new THREE.TorusGeometry(2.05 + i * 0.24, 0.006, 5, 180), haloMaterial);
  halo.rotation.set(Math.PI / 2 + i * 0.48, i * 0.31, i * 0.2);
  brain.add(halo);
}

stage.addUpdate((time, delta) => {
  const breath = 1 + Math.sin(time * 1.15) * 0.015;
  brain.scale.setScalar(breath);
  brain.rotation.y += delta * 0.028;
  brain.rotation.z = Math.sin(time * 0.18) * 0.025;
  innerCore.rotation.x = time * 0.08;
  innerCore.rotation.y = -time * 0.12;

  const attribute = pulseGeometry.attributes.position;
  for (let i = 0; i < signalSegments.length; i++) {
    const segment = signalSegments[i];
    const progress = (time * segment.speed + segment.phase) % 1;
    const smooth = progress * progress * (3 - 2 * progress);
    attribute.setXYZ(
      i,
      THREE.MathUtils.lerp(segment.a.x, segment.b.x, smooth),
      THREE.MathUtils.lerp(segment.a.y, segment.b.y, smooth),
      THREE.MathUtils.lerp(segment.a.z, segment.b.z, smooth),
    );
  }
  attribute.needsUpdate = true;
});
