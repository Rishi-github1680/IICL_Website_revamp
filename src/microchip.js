import {
  THREE,
  createStage,
  createParticleMaterial,
  addAtmosphere,
  makeLineMaterial,
  isLowPower,
} from "./core.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const stage = createStage({
  cameraPosition: [6.4, 5.5, 8.1],
  target: [0.9, 0, 0],
  bloomStrength: 1.85,
  bloomRadius: 0.74,
  bloomThreshold: 0.08,
  fogDensity: 0.02,
  minDistance: 6,
  maxDistance: 15,
});

const chip = new THREE.Group();
chip.position.x = 1.15;
chip.rotation.set(-0.05, -0.12, -0.04);
stage.scene.add(chip);
addAtmosphere(stage, isLowPower ? 360 : 700, 15);

const boardMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x080808,
  metalness: 0.92,
  roughness: 0.27,
  clearcoat: 0.5,
  clearcoatRoughness: 0.22,
});
const board = new THREE.Mesh(new RoundedBoxGeometry(5.7, 0.28, 4.65, 8, 0.16), boardMaterial);
board.castShadow = true;
board.receiveShadow = true;
chip.add(board);

const underside = new THREE.Mesh(
  new RoundedBoxGeometry(5.28, 0.26, 4.24, 6, 0.12),
  new THREE.MeshStandardMaterial({ color: 0x250104, metalness: 0.85, roughness: 0.34 }),
);
underside.position.y = -0.19;
chip.add(underside);

const coreHousing = new THREE.Mesh(
  new RoundedBoxGeometry(2.45, 0.44, 2.04, 9, 0.16),
  new THREE.MeshPhysicalMaterial({
    color: 0x120103,
    metalness: 0.76,
    roughness: 0.16,
    clearcoat: 1,
    emissive: 0x4b0207,
    emissiveIntensity: 0.92,
  }),
);
coreHousing.position.y = 0.31;
coreHousing.castShadow = true;
chip.add(coreHousing);

const coreGlass = new THREE.Mesh(
  new RoundedBoxGeometry(1.83, 0.18, 1.43, 6, 0.12),
  new THREE.MeshPhysicalMaterial({
    color: 0xed101d,
    emissive: 0xed101d,
    emissiveIntensity: 3.1,
    metalness: 0.28,
    roughness: 0.1,
    transparent: true,
    opacity: 0.72,
    transmission: 0.12,
  }),
);
coreGlass.position.y = 0.6;
chip.add(coreGlass);

const coreGrid = new THREE.GridHelper(1.5, 10, 0xff5962, 0x7a0a12);
coreGrid.position.y = 0.705;
coreGrid.rotation.x = 0;
coreGrid.scale.z = 0.78;
coreGrid.material.transparent = true;
coreGrid.material.opacity = 0.62;
chip.add(coreGrid);

const coreFrame = new THREE.LineSegments(
  new THREE.EdgesGeometry(new RoundedBoxGeometry(2.45, 0.45, 2.04, 4, 0.15)),
  makeLineMaterial(0xff3440, 0.7),
);
coreFrame.position.y = 0.31;
chip.add(coreFrame);

const pinMaterial = new THREE.MeshStandardMaterial({
  color: 0x888888,
  emissive: 0x420307,
  emissiveIntensity: 0.35,
  metalness: 1,
  roughness: 0.2,
});
const pinGeometry = new RoundedBoxGeometry(0.12, 0.1, 0.48, 3, 0.025);
const pins = new THREE.InstancedMesh(pinGeometry, pinMaterial, 64);
const dummy = new THREE.Object3D();
let pinIndex = 0;
for (let side = 0; side < 4; side++) {
  for (let i = 0; i < 16; i++) {
    const t = -2.35 + i * (4.7 / 15);
    if (side < 2) {
      dummy.position.set(t, -0.02, side === 0 ? -2.48 : 2.48);
      dummy.rotation.y = 0;
    } else {
      dummy.position.set(side === 2 ? -3.02 : 3.02, -0.02, t * 0.88);
      dummy.rotation.y = Math.PI / 2;
    }
    dummy.updateMatrix();
    pins.setMatrixAt(pinIndex++, dummy.matrix);
  }
}
pins.instanceMatrix.needsUpdate = true;
chip.add(pins);

const tracePoints = [];
const tracePaths = [];
const traceCount = isLowPower ? 28 : 48;
for (let i = 0; i < traceCount; i++) {
  const horizontal = i % 2 === 0;
  const side = i % 4 < 2 ? -1 : 1;
  const lane = ((i % 12) - 5.5) * 0.29;
  const start = horizontal
    ? new THREE.Vector3(side * (1.28 + (i % 3) * 0.08), 0.19, lane * 0.72)
    : new THREE.Vector3(lane, 0.19, side * (1.08 + (i % 3) * 0.08));
  const elbow = horizontal
    ? new THREE.Vector3(side * (2.0 + (i % 5) * 0.13), 0.19, lane * 0.72)
    : new THREE.Vector3(lane, 0.19, side * (1.78 + (i % 5) * 0.12));
  const end = horizontal
    ? new THREE.Vector3(side * 2.75, 0.19, lane)
    : new THREE.Vector3(lane * 0.92, 0.19, side * 2.18);
  tracePoints.push(start.x, start.y, start.z, elbow.x, elbow.y, elbow.z);
  tracePoints.push(elbow.x, elbow.y, elbow.z, end.x, end.y, end.z);
  tracePaths.push({ start, elbow, end, phase: Math.random(), speed: 0.11 + Math.random() * 0.18 });
}
const tracesGeometry = new THREE.BufferGeometry();
tracesGeometry.setAttribute("position", new THREE.Float32BufferAttribute(tracePoints, 3));
const traces = new THREE.LineSegments(tracesGeometry, makeLineMaterial(0xff1e2c, 0.62));
chip.add(traces);

const solderMaterial = new THREE.MeshStandardMaterial({
  color: 0xff2733,
  emissive: 0xed101d,
  emissiveIntensity: 1.2,
  metalness: 0.9,
  roughness: 0.18,
});
const solderGeometry = new THREE.CylinderGeometry(0.035, 0.035, 0.025, 8);
const solders = new THREE.InstancedMesh(solderGeometry, solderMaterial, tracePaths.length * 2);
let solderIndex = 0;
for (const path of tracePaths) {
  for (const point of [path.elbow, path.end]) {
    dummy.position.copy(point);
    dummy.position.y += 0.01;
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    solders.setMatrixAt(solderIndex++, dummy.matrix);
  }
}
chip.add(solders);

const pulseGeometry = new THREE.SphereGeometry(0.055, 8, 8);
const pulseMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const pulses = new THREE.InstancedMesh(pulseGeometry, pulseMaterial, tracePaths.length);
const pulsePoint = new THREE.Vector3();
chip.add(pulses);

const dataCount = isLowPower ? 700 : 1500;
const dataPositions = new Float32Array(dataCount * 3);
const dataColors = new Float32Array(dataCount * 3);
for (let i = 0; i < dataCount; i++) {
  const edge = 2.4 + Math.random() * 1.4;
  const angle = Math.random() * Math.PI * 2;
  dataPositions[i * 3] = Math.cos(angle) * edge;
  dataPositions[i * 3 + 1] = -0.3 + Math.random() * 2.5;
  dataPositions[i * 3 + 2] = Math.sin(angle) * edge * 0.8;
  dataColors[i * 3] = 0.45 + Math.random() * 0.55;
  dataColors[i * 3 + 1] = 0.01;
  dataColors[i * 3 + 2] = 0.025;
}
const dataGeometry = new THREE.BufferGeometry();
dataGeometry.setAttribute("position", new THREE.BufferAttribute(dataPositions, 3));
dataGeometry.setAttribute("color", new THREE.BufferAttribute(dataColors, 3));
const dataField = new THREE.Points(dataGeometry, createParticleMaterial({ size: 0.04, opacity: 0.52 }));
chip.add(dataField);

stage.addUpdate((time, delta) => {
  chip.rotation.y += delta * 0.055;
  chip.rotation.z = -0.04 + Math.sin(time * 0.25) * 0.025;
  coreGlass.material.emissiveIntensity = 2.4 + Math.sin(time * 2.3) * 0.75;
  coreFrame.material.opacity = 0.48 + Math.sin(time * 1.7) * 0.18;
  dataField.rotation.y = -time * 0.055;

  for (let i = 0; i < tracePaths.length; i++) {
    const path = tracePaths[i];
    const progress = (time * path.speed + path.phase) % 1;
    if (progress < 0.56) {
      pulsePoint.lerpVectors(path.start, path.elbow, progress / 0.56);
    } else {
      pulsePoint.lerpVectors(path.elbow, path.end, (progress - 0.56) / 0.44);
    }
    dummy.position.copy(pulsePoint);
    dummy.position.y += 0.08;
    const pulseScale = 0.55 + Math.sin(progress * Math.PI) * 0.75;
    dummy.scale.setScalar(pulseScale);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    pulses.setMatrixAt(i, dummy.matrix);
  }
  pulses.instanceMatrix.needsUpdate = true;
});
