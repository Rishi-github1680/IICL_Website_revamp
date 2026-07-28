import {
  THREE,
  createStage,
  addAtmosphere,
  makeLineMaterial,
  createParticleMaterial,
  isLowPower,
} from "./core.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const stage = createStage({
  cameraPosition: [0.5, 0.28, 10.2],
  target: [1.05, 0, 0],
  bloomStrength: 2.08,
  bloomRadius: 0.82,
  bloomThreshold: 0.035,
  fogDensity: 0.019,
  minDistance: 6,
  maxDistance: 15,
});

const engine = new THREE.Group();
engine.position.set(1.15, 0, 0);
engine.rotation.set(-0.06, -0.22, -0.025);
stage.scene.add(engine);
addAtmosphere(stage, isLowPower ? 420 : 900, 15);

const blackMetal = new THREE.MeshPhysicalMaterial({
  color: 0x080809,
  emissive: 0x310105,
  emissiveIntensity: 0.68,
  metalness: 0.92,
  roughness: 0.16,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
});

const smokedGlass = new THREE.MeshPhysicalMaterial({
  color: 0x170104,
  emissive: 0x520309,
  emissiveIntensity: 0.72,
  metalness: 0.34,
  roughness: 0.1,
  transparent: true,
  opacity: 0.38,
  transmission: 0.18,
  depthWrite: false,
});

const hotRed = new THREE.MeshPhysicalMaterial({
  color: 0xd80b17,
  emissive: 0xff1424,
  emissiveIntensity: 2.25,
  metalness: 0.56,
  roughness: 0.12,
});

// Layered memory architecture behind the active dialogue engine.
const memoryLayers = [];
for (let i = 0; i < 4; i++) {
  const width = 4.9 - i * 0.28;
  const height = 3.48 - i * 0.2;
  const layer = new THREE.Group();
  const plate = new THREE.Mesh(
    new RoundedBoxGeometry(width, height, 0.13, 6, 0.18),
    i === 0 ? blackMetal : smokedGlass.clone(),
  );
  plate.material.opacity = i === 0 ? 1 : 0.22 + i * 0.04;
  layer.add(plate);

  const edge = new THREE.LineSegments(
    new THREE.EdgesGeometry(
      new RoundedBoxGeometry(width, height, 0.14, 5, 0.18),
    ),
    makeLineMaterial(i === 3 ? 0xffd8da : 0xed101d, 0.2 + i * 0.11),
  );
  layer.add(edge);
  layer.position.z = -1.24 + i * 0.33;
  layer.rotation.z = (i - 1.5) * 0.018;
  engine.add(layer);
  memoryLayers.push(layer);
}

// Precision anchors make the chassis read like an engineered intelligence system.
for (const x of [-2.12, 2.12]) {
  for (const y of [-1.42, 1.42]) {
    const anchor = new THREE.Mesh(
      new THREE.CylinderGeometry(0.075, 0.075, 0.18, 16),
      hotRed.clone(),
    );
    anchor.rotation.x = Math.PI / 2;
    anchor.position.set(x, y, 0.08);
    engine.add(anchor);
  }
}

const coreGroup = new THREE.Group();
coreGroup.position.set(0.42, 0.03, 0.64);
engine.add(coreGroup);

const core = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.68, isLowPower ? 2 : 4),
  new THREE.MeshPhysicalMaterial({
    color: 0x360207,
    emissive: 0xff0f20,
    emissiveIntensity: 2.75,
    metalness: 0.56,
    roughness: 0.08,
    clearcoat: 1,
  }),
);
coreGroup.add(core);

const coreCage = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.98, 2),
  new THREE.MeshBasicMaterial({
    color: 0xff2733,
    wireframe: true,
    transparent: true,
    opacity: 0.34,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }),
);
coreGroup.add(coreCage);

const coreHalo = new THREE.Mesh(
  new THREE.SphereGeometry(1.12, 32, 24),
  new THREE.MeshBasicMaterial({
    color: 0x6a020a,
    wireframe: true,
    transparent: true,
    opacity: 0.07,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }),
);
coreGroup.add(coreHalo);

const semanticRings = [];
const ringSpecs = [
  [1.22, 0.024, 0, 0, 0],
  [1.5, 0.018, Math.PI / 2, 0.18, 0],
  [1.78, 0.014, 0.72, Math.PI / 2, 0.3],
  [2.06, 0.011, -0.55, Math.PI / 2, -0.18],
];
for (let i = 0; i < ringSpecs.length; i++) {
  const [radius, tube, rx, ry, rz] = ringSpecs[i];
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(radius, tube, 8, isLowPower ? 72 : 132),
    new THREE.MeshBasicMaterial({
      color: i === 2 ? 0xffffff : 0xed101d,
      transparent: true,
      opacity: i === 2 ? 0.62 : 0.48,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  ring.rotation.set(rx, ry, rz);
  ring.userData.speed = (i % 2 ? -1 : 1) * (0.07 + i * 0.025);
  coreGroup.add(ring);
  semanticRings.push(ring);
}

// A compact semantic graph inside the engine visualizes intent resolution.
const semanticPositions = [];
const semanticCount = isLowPower ? 22 : 38;
const goldenAngle = Math.PI * (3 - Math.sqrt(5));
for (let i = 0; i < semanticCount; i++) {
  const y = 1 - (i / Math.max(1, semanticCount - 1)) * 2;
  const radius = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = goldenAngle * i;
  semanticPositions.push(
    new THREE.Vector3(
      Math.cos(theta) * radius * 1.36,
      y * 1.36,
      Math.sin(theta) * radius * 0.76,
    ),
  );
}

const semanticNodes = new THREE.InstancedMesh(
  new THREE.SphereGeometry(0.038, 8, 8),
  new THREE.MeshBasicMaterial({ color: 0xffe4e5 }),
  semanticPositions.length,
);
const dummy = new THREE.Object3D();
for (let i = 0; i < semanticPositions.length; i++) {
  dummy.position.copy(semanticPositions[i]);
  dummy.scale.setScalar(i % 7 === 0 ? 1.7 : 1);
  dummy.updateMatrix();
  semanticNodes.setMatrixAt(i, dummy.matrix);
}
semanticNodes.instanceMatrix.needsUpdate = true;
coreGroup.add(semanticNodes);

const semanticEdges = [];
for (let i = 0; i < semanticPositions.length; i++) {
  const a = semanticPositions[i];
  const b = semanticPositions[(i * 7 + 5) % semanticPositions.length];
  const c = semanticPositions[(i + 3) % semanticPositions.length];
  semanticEdges.push(a.x, a.y, a.z, b.x, b.y, b.z);
  if (i % 3 === 0) semanticEdges.push(a.x, a.y, a.z, c.x, c.y, c.z);
}
const semanticMesh = new THREE.LineSegments(
  new THREE.BufferGeometry().setAttribute(
    "position",
    new THREE.Float32BufferAttribute(semanticEdges, 3),
  ),
  makeLineMaterial(0xff2733, 0.28),
);
coreGroup.add(semanticMesh);

// Conversation capsules orbit the engine as incoming prompts and generated responses.
const capsules = [];
const capsuleCount = isLowPower ? 8 : 12;
for (let i = 0; i < capsuleCount; i++) {
  const angle = (i / capsuleCount) * Math.PI * 2;
  const width = i % 3 === 0 ? 0.94 : 0.68;
  const capsule = new THREE.Group();
  const shell = new THREE.Mesh(
    new RoundedBoxGeometry(width, 0.34, 0.2, 5, 0.11),
    i % 2 ? smokedGlass.clone() : blackMetal.clone(),
  );
  shell.material.opacity = i % 2 ? 0.66 : 1;
  capsule.add(shell);

  const message = new THREE.Mesh(
    new RoundedBoxGeometry(width * (0.44 + (i % 4) * 0.08), 0.035, 0.035, 3, 0.015),
    new THREE.MeshBasicMaterial({ color: i % 5 === 0 ? 0xffffff : 0xed101d }),
  );
  message.position.z = 0.12;
  capsule.add(message);

  capsule.position.set(
    Math.cos(angle) * 2.28 + 0.38,
    Math.sin(angle) * 1.52,
    0.42 + Math.sin(angle * 2) * 0.5,
  );
  capsule.rotation.z = angle + Math.PI / 2;
  capsule.userData.angle = angle;
  capsule.userData.radius = 2.28;
  capsule.userData.phase = i * 0.62;
  engine.add(capsule);
  capsules.push(capsule);
}

// Four luminous data conduits feed language, context, memory and action into the core.
const conduits = [];
const conduitStarts = [
  new THREE.Vector3(-2.22, 1.18, 0.16),
  new THREE.Vector3(-2.22, -1.12, 0.05),
  new THREE.Vector3(2.34, 1.08, -0.05),
  new THREE.Vector3(2.34, -1.18, 0.08),
];
for (let i = 0; i < conduitStarts.length; i++) {
  const start = conduitStarts[i];
  const controlA = start.clone().lerp(new THREE.Vector3(0.42, 0.03, 0.64), 0.34);
  controlA.z += i % 2 ? 0.52 : -0.25;
  const controlB = start.clone().lerp(new THREE.Vector3(0.42, 0.03, 0.64), 0.72);
  controlB.y += i < 2 ? -0.18 : 0.18;
  const curve = new THREE.CatmullRomCurve3([
    start,
    controlA,
    controlB,
    new THREE.Vector3(0.42, 0.03, 0.64),
  ]);

  const tube = new THREE.Mesh(
    new THREE.TubeGeometry(curve, isLowPower ? 34 : 60, 0.014, 6, false),
    new THREE.MeshBasicMaterial({
      color: i === 2 ? 0xffffff : 0xed101d,
      transparent: true,
      opacity: 0.44,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  engine.add(tube);

  const pulse = new THREE.Mesh(
    new THREE.SphereGeometry(i === 2 ? 0.075 : 0.058, 12, 10),
    new THREE.MeshBasicMaterial({ color: i === 2 ? 0xffffff : 0xff2733 }),
  );
  engine.add(pulse);
  conduits.push({ curve, pulse, phase: i * 0.23, tube });
}

// Token helix: a premium visual shorthand for words being encoded into vectors.
const tokenCount = isLowPower ? 42 : 88;
const tokenGeometry = new THREE.BufferGeometry();
const tokenPositions = new Float32Array(tokenCount * 3);
const tokenColors = new Float32Array(tokenCount * 3);
for (let i = 0; i < tokenCount; i++) {
  const t = i / tokenCount;
  const angle = t * Math.PI * 8;
  const radius = 2.64 + Math.sin(t * Math.PI * 4) * 0.12;
  tokenPositions[i * 3] = 0.4 + Math.cos(angle) * radius;
  tokenPositions[i * 3 + 1] = -1.72 + t * 3.44;
  tokenPositions[i * 3 + 2] = -0.74 + Math.sin(angle) * 0.48;
  tokenColors[i * 3] = 0.78 + (i % 5 === 0 ? 0.22 : 0);
  tokenColors[i * 3 + 1] = i % 5 === 0 ? 0.68 : 0.012;
  tokenColors[i * 3 + 2] = i % 5 === 0 ? 0.7 : 0.035;
}
tokenGeometry.setAttribute("position", new THREE.BufferAttribute(tokenPositions, 3));
tokenGeometry.setAttribute("color", new THREE.BufferAttribute(tokenColors, 3));
const tokenHelix = new THREE.Points(
  tokenGeometry,
  createParticleMaterial({ size: 0.072, opacity: 0.8 }),
);
engine.add(tokenHelix);

// A small stack under the core reads as persistent context memory.
const memoryCells = [];
for (let i = 0; i < 5; i++) {
  const cell = new THREE.Mesh(
    new RoundedBoxGeometry(1.55 - i * 0.09, 0.12, 0.5, 4, 0.045),
    i === 4 ? hotRed.clone() : blackMetal.clone(),
  );
  cell.position.set(0.4, -1.56 - i * 0.14, 0.1 - i * 0.08);
  cell.material.emissiveIntensity = i === 4 ? 1.8 : 0.45 + i * 0.08;
  engine.add(cell);
  memoryCells.push(cell);
}

const dataCount = isLowPower ? 500 : 1100;
const dataPositions = new Float32Array(dataCount * 3);
const dataColors = new Float32Array(dataCount * 3);
for (let i = 0; i < dataCount; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 2.8 + Math.random() * 2.1;
  dataPositions[i * 3] = 0.4 + Math.cos(angle) * radius;
  dataPositions[i * 3 + 1] = (Math.random() - 0.5) * 4.9;
  dataPositions[i * 3 + 2] = -1.8 + Math.sin(angle) * radius * 0.38;
  const hot = Math.random() > 0.88;
  dataColors[i * 3] = hot ? 1 : 0.22 + Math.random() * 0.42;
  dataColors[i * 3 + 1] = hot ? 0.55 : 0.004;
  dataColors[i * 3 + 2] = hot ? 0.58 : 0.018;
}
const dataGeometry = new THREE.BufferGeometry();
dataGeometry.setAttribute("position", new THREE.BufferAttribute(dataPositions, 3));
dataGeometry.setAttribute("color", new THREE.BufferAttribute(dataColors, 3));
const dataCloud = new THREE.Points(
  dataGeometry,
  createParticleMaterial({ size: 0.043, opacity: 0.5 }),
);
engine.add(dataCloud);

stage.addUpdate((time, delta) => {
  engine.rotation.y = -0.22 + Math.sin(time * 0.13) * 0.075;
  engine.rotation.x = -0.06 + Math.sin(time * 0.1) * 0.018;

  core.rotation.x += delta * 0.18;
  core.rotation.y -= delta * 0.27;
  core.scale.setScalar(0.94 + Math.sin(time * 2.3) * 0.075);
  coreCage.rotation.x -= delta * 0.16;
  coreCage.rotation.y += delta * 0.21;
  coreHalo.rotation.y -= delta * 0.06;
  semanticMesh.material.opacity = 0.22 + Math.sin(time * 1.45) * 0.08;

  for (const ring of semanticRings) {
    ring.rotation.z += delta * ring.userData.speed;
    ring.rotation.y += delta * ring.userData.speed * 0.46;
  }

  for (let i = 0; i < memoryLayers.length; i++) {
    const layer = memoryLayers[i];
    layer.position.z = -1.24 + i * 0.33 + Math.sin(time * 0.64 + i * 0.7) * 0.035;
  }

  for (let i = 0; i < capsules.length; i++) {
    const capsule = capsules[i];
    const angle = capsule.userData.angle + time * (i % 2 ? -0.032 : 0.027);
    capsule.position.x = 0.38 + Math.cos(angle) * capsule.userData.radius;
    capsule.position.y = Math.sin(angle) * 1.52;
    capsule.position.z = 0.42 + Math.sin(angle * 2) * 0.5;
    capsule.rotation.z = angle + Math.PI / 2;
    capsule.scale.setScalar(0.93 + Math.sin(time * 1.8 + capsule.userData.phase) * 0.07);
  }

  for (let i = 0; i < conduits.length; i++) {
    const conduit = conduits[i];
    const progress = (time * (0.18 + i * 0.022) + conduit.phase) % 1;
    conduit.pulse.position.copy(conduit.curve.getPointAt(progress));
    conduit.pulse.scale.setScalar(0.8 + Math.sin(time * 5 + i) * 0.22);
    conduit.tube.material.opacity = 0.34 + Math.sin(time * 1.2 + i) * 0.12;
  }

  for (let i = 0; i < memoryCells.length; i++) {
    memoryCells[i].position.x = 0.4 + Math.sin(time * 0.7 + i * 0.5) * 0.035;
  }

  tokenHelix.rotation.y = time * 0.046;
  dataCloud.rotation.y = -time * 0.014;
});
