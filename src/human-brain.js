import {
  THREE,
  createStage,
  addAtmosphere,
  makeLineMaterial,
  isLowPower,
} from "./core.js";

const stage = createStage({
  cameraPosition: [0.5, 0.35, 9.6],
  target: [0.9, -0.05, 0],
  bloomStrength: 1.95,
  bloomRadius: 0.76,
  bloomThreshold: 0.045,
  fogDensity: 0.021,
  minDistance: 5.8,
  maxDistance: 14,
});

const brain = new THREE.Group();
brain.position.set(1.18, 0.02, 0);
brain.rotation.set(-0.08, -0.18, -0.025);
stage.scene.add(brain);
addAtmosphere(stage, isLowPower ? 420 : 860, 14);

const cerebralMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x220104,
  emissive: 0x440208,
  emissiveIntensity: 0.68,
  metalness: 0.72,
  roughness: 0.28,
  clearcoat: 0.86,
  clearcoatRoughness: 0.2,
});

const cerebralWireMaterial = new THREE.MeshBasicMaterial({
  color: 0xa90a14,
  transparent: true,
  opacity: 0.08,
  wireframe: true,
  blending: THREE.AdditiveBlending,
});

function createHemisphere(side) {
  const geometry = new THREE.SphereGeometry(
    1.5,
    isLowPower ? 38 : 64,
    isLowPower ? 28 : 46,
  );
  const attribute = geometry.attributes.position;

  for (let i = 0; i < attribute.count; i++) {
    const x = attribute.getX(i);
    const y = attribute.getY(i);
    const z = attribute.getZ(i);
    const longitude = Math.atan2(z, x);
    const latitude = Math.atan2(y, Math.hypot(x, z));
    const fold =
      1 +
      Math.sin(longitude * 9 + latitude * 5 + side * 0.7) * 0.045 +
      Math.sin(longitude * 15 - latitude * 7) * 0.018;
    const crown = 1 - Math.max(0, Math.abs(y / 1.5) - 0.72) * 0.2;

    attribute.setXYZ(
      i,
      x * 0.82 * fold * crown,
      y * 1.12 * fold,
      z * 1.02 * fold,
    );
  }

  geometry.computeVertexNormals();
  const mesh = new THREE.Mesh(geometry, cerebralMaterial);
  mesh.position.set(side * 0.47, 0.28, 0);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  brain.add(mesh);

  const wire = new THREE.Mesh(geometry.clone(), cerebralWireMaterial);
  wire.position.copy(mesh.position);
  wire.scale.setScalar(1.006);
  brain.add(wire);
}

createHemisphere(-1);
createHemisphere(1);

const fissure = new THREE.Mesh(
  new THREE.TorusGeometry(1.42, 0.024, 8, 110),
  new THREE.MeshBasicMaterial({
    color: 0x020202,
    transparent: true,
    opacity: 0.9,
  }),
);
fissure.position.y = 0.24;
fissure.rotation.y = Math.PI / 2;
fissure.scale.set(1, 1.1, 0.78);
brain.add(fissure);

const cerebellumMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x160103,
  emissive: 0x5a0309,
  emissiveIntensity: 0.82,
  metalness: 0.64,
  roughness: 0.32,
  clearcoat: 0.6,
});
const cerebellumGeometry = new THREE.SphereGeometry(0.72, 36, 24);
for (const side of [-1, 1]) {
  const lobe = new THREE.Mesh(cerebellumGeometry, cerebellumMaterial);
  lobe.position.set(side * 0.48, -1.18, -0.98);
  lobe.scale.set(1, 0.72, 0.78);
  brain.add(lobe);

  const ridges = new THREE.Mesh(
    cerebellumGeometry.clone(),
    new THREE.MeshBasicMaterial({
      color: 0xed101d,
      transparent: true,
      opacity: 0.1,
      wireframe: true,
    }),
  );
  ridges.position.copy(lobe.position);
  ridges.scale.copy(lobe.scale).multiplyScalar(1.012);
  brain.add(ridges);
}

const brainstem = new THREE.Mesh(
  new THREE.CapsuleGeometry(0.27, 1.05, 10, 22),
  new THREE.MeshPhysicalMaterial({
    color: 0x0f0f10,
    emissive: 0x5c0309,
    emissiveIntensity: 0.8,
    metalness: 0.9,
    roughness: 0.22,
  }),
);
brainstem.position.set(0, -1.82, -0.42);
brainstem.rotation.x = -0.16;
brain.add(brainstem);

const circuitGroup = new THREE.Group();
brain.add(circuitGroup);
const paths = [];
const pathCount = isLowPower ? 34 : 64;
const pathMaterial = makeLineMaterial(0xff1e2d, 0.68);

function surfacePoint(side) {
  const theta = Math.random() * Math.PI * 2;
  const phi = 0.18 + Math.random() * (Math.PI - 0.36);
  const sx = Math.abs(Math.sin(phi) * Math.cos(theta));
  const sy = Math.cos(phi);
  const sz = Math.sin(phi) * Math.sin(theta);
  const fold = 1 + Math.sin(theta * 9 + phi * 5) * 0.035;
  return new THREE.Vector3(
    side * (0.49 + sx * 1.22 * fold),
    0.28 + sy * 1.66 * fold,
    sz * 1.5 * fold,
  );
}

const nodeGeometry = new THREE.SphereGeometry(0.035, 8, 8);
const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xffd8da });
const nodes = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, pathCount * 2);
const nodeDummy = new THREE.Object3D();
let nodeIndex = 0;

for (let i = 0; i < pathCount; i++) {
  const side = i % 2 === 0 ? -1 : 1;
  const start = surfacePoint(side);
  let end = surfacePoint(side);
  if (start.distanceToSquared(end) > 4.8) {
    end = start.clone().lerp(end, 0.46);
    end.x = side * Math.max(0.52, Math.abs(end.x));
  }
  const midpoint = start.clone().lerp(end, 0.5);
  const lobeCenter = new THREE.Vector3(side * 0.47, 0.28, 0);
  midpoint.add(midpoint.clone().sub(lobeCenter).normalize().multiplyScalar(0.18));
  const curve = new THREE.QuadraticBezierCurve3(start, midpoint, end);
  const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(isLowPower ? 18 : 30));
  circuitGroup.add(new THREE.Line(geometry, pathMaterial));
  paths.push({
    curve,
    phase: Math.random(),
    speed: 0.1 + Math.random() * 0.2,
  });

  for (const point of [start, end]) {
    nodeDummy.position.copy(point);
    nodeDummy.scale.setScalar(i % 7 === 0 ? 1.8 : 1);
    nodeDummy.updateMatrix();
    nodes.setMatrixAt(nodeIndex++, nodeDummy.matrix);
  }
}
nodes.instanceMatrix.needsUpdate = true;
circuitGroup.add(nodes);

const pulsePaths = paths.filter((_, index) => index % 2 === 0);
const pulses = new THREE.InstancedMesh(
  new THREE.SphereGeometry(0.055, 8, 8),
  new THREE.MeshBasicMaterial({ color: 0xffffff }),
  pulsePaths.length,
);
circuitGroup.add(pulses);
const pulseDummy = new THREE.Object3D();

const scanRing = new THREE.Mesh(
  new THREE.TorusGeometry(1.88, 0.012, 6, 150),
  new THREE.MeshBasicMaterial({
    color: 0xed101d,
    transparent: true,
    opacity: 0.34,
    blending: THREE.AdditiveBlending,
  }),
);
scanRing.rotation.x = Math.PI / 2;
brain.add(scanRing);

const cognitionCore = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.5, 2),
  new THREE.MeshBasicMaterial({
    color: 0xed101d,
    transparent: true,
    opacity: 0.12,
    wireframe: true,
    blending: THREE.AdditiveBlending,
  }),
);
cognitionCore.position.y = 0.18;
brain.add(cognitionCore);

stage.addUpdate((time, delta) => {
  brain.rotation.y = -0.18 + Math.sin(time * 0.16) * 0.1;
  brain.rotation.z = -0.025 + Math.sin(time * 0.12) * 0.018;
  cognitionCore.rotation.x += delta * 0.16;
  cognitionCore.rotation.y -= delta * 0.21;
  cognitionCore.scale.setScalar(1 + Math.sin(time * 2.1) * 0.08);
  pathMaterial.opacity = 0.56 + Math.sin(time * 1.15) * 0.12;
  scanRing.position.y = -1.25 + ((time * 0.32) % 1) * 2.9;
  scanRing.scale.setScalar(0.82 + Math.sin(time * 1.05) * 0.06);

  for (let i = 0; i < pulsePaths.length; i++) {
    const path = pulsePaths[i];
    const progress = (time * path.speed + path.phase) % 1;
    pulseDummy.position.copy(path.curve.getPoint(progress));
    pulseDummy.scale.setScalar(0.7 + Math.sin(progress * Math.PI) * 0.8);
    pulseDummy.updateMatrix();
    pulses.setMatrixAt(i, pulseDummy.matrix);
  }
  pulses.instanceMatrix.needsUpdate = true;
});
