import {
  THREE,
  createStage,
  createParticleMaterial,
  addAtmosphere,
  makeLineMaterial,
  isLowPower,
} from "./core.js";

const stage = createStage({
  cameraPosition: [0.6, 0.3, 11.2],
  target: [0.8, 0, 0],
  bloomStrength: 1.15,
  bloomRadius: 0.72,
  bloomThreshold: 0.1,
  fogDensity: 0.022,
  minDistance: 6.4,
  maxDistance: 16,
});

const network = new THREE.Group();
network.position.x = 1.2;
network.rotation.set(-0.06, -0.19, 0);
const nnScale = parseFloat(new URLSearchParams(location.search).get("scale"));
if (nnScale > 0) network.scale.setScalar(nnScale);
stage.scene.add(network);
addAtmosphere(stage, isLowPower ? 430 : 900, 14);

const layerX = [-3.5, -2.0, -0.35, 1.55, 3.3];
const layerCounts = [5, 8, 10, 8, 4];
const layers = [];
const nodes = [];

for (let layer = 0; layer < layerCounts.length; layer++) {
  const currentLayer = [];
  const count = layerCounts[layer];
  for (let i = 0; i < count; i++) {
    const y = (i - (count - 1) / 2) * (5.5 / Math.max(count - 1, 1));
    const z = Math.sin(i * 2.17 + layer * 1.63) * 0.68 + (Math.random() - 0.5) * 0.18;
    const position = new THREE.Vector3(layerX[layer], y, z);
    currentLayer.push(position);
    nodes.push({ position, layer, index: i });
  }
  layers.push(currentLayer);
}

const connectionPositions = [];
const edges = [];
for (let layer = 0; layer < layers.length - 1; layer++) {
  for (let a = 0; a < layers[layer].length; a++) {
    for (let b = 0; b < layers[layer + 1].length; b++) {
      const from = layers[layer][a];
      const to = layers[layer + 1][b];
      connectionPositions.push(from.x, from.y, from.z, to.x, to.y, to.z);
      edges.push({
        from,
        to,
        phase: Math.random(),
        speed: 0.08 + Math.random() * 0.18,
      });
    }
  }
}

const connectionsGeometry = new THREE.BufferGeometry();
connectionsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(connectionPositions, 3));
const connections = new THREE.LineSegments(
  connectionsGeometry,
  makeLineMaterial(0xb70a14, isLowPower ? 0.12 : 0.18),
);
network.add(connections);

const nodeGeometry = new THREE.IcosahedronGeometry(0.1, 2);
const nodeMaterials = [
  new THREE.MeshPhysicalMaterial({ color: 0x350207, emissive: 0xed101d, emissiveIntensity: 0.85, metalness: 0.76, roughness: 0.18 }),
  new THREE.MeshPhysicalMaterial({ color: 0x0b0b0b, emissive: 0x3c0207, emissiveIntensity: 0.6, metalness: 0.93, roughness: 0.2 }),
  new THREE.MeshPhysicalMaterial({ color: 0xc10f19, emissive: 0xed101d, emissiveIntensity: 1.25, metalness: 0.55, roughness: 0.14 }),
  new THREE.MeshPhysicalMaterial({ color: 0x170103, emissive: 0x8d0710, emissiveIntensity: 0.75, metalness: 0.9, roughness: 0.2 }),
  new THREE.MeshPhysicalMaterial({ color: 0xd98a8d, emissive: 0xff2432, emissiveIntensity: 0.95, metalness: 0.4, roughness: 0.12 }),
];

const nodeMeshes = [];
for (const node of nodes) {
  const mesh = new THREE.Mesh(nodeGeometry, nodeMaterials[node.layer]);
  mesh.position.copy(node.position);
  const importance = 0.85 + Math.abs(Math.sin(node.index * 1.7 + node.layer)) * 0.38;
  mesh.scale.setScalar(importance);
  mesh.userData.baseScale = importance;
  mesh.userData.phase = Math.random() * Math.PI * 2;
  network.add(mesh);
  nodeMeshes.push(mesh);
}

const haloMaterial = new THREE.MeshBasicMaterial({
  color: 0xed101d,
  transparent: true,
  opacity: 0.23,
  blending: THREE.AdditiveBlending,
});
for (let i = 0; i < nodes.length; i += 4) {
  const halo = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.007, 5, 52), haloMaterial);
  halo.position.copy(nodes[i].position);
  halo.rotation.y = Math.PI / 2;
  halo.userData.phase = i * 0.31;
  network.add(halo);
}

const activeEdgeCount = isLowPower ? 48 : 96;
const activeEdges = [];
for (let i = 0; i < activeEdgeCount; i++) {
  activeEdges.push(edges[Math.floor(Math.random() * edges.length)]);
}
const pulseGeometry = new THREE.SphereGeometry(0.05, 8, 8);
const pulseMaterial = new THREE.MeshBasicMaterial({ color: 0xffe6e7 });
const pulses = new THREE.InstancedMesh(pulseGeometry, pulseMaterial, activeEdges.length);
network.add(pulses);
const dummy = new THREE.Object3D();

const cloudCount = isLowPower ? 1400 : 3000;
const cloudPositions = new Float32Array(cloudCount * 3);
const cloudColors = new Float32Array(cloudCount * 3);
for (let i = 0; i < cloudCount; i++) {
  const x = -4.2 + Math.random() * 8.4;
  const y = (Math.random() - 0.5) * 6.4;
  const z = (Math.random() - 0.5) * 3.3;
  cloudPositions[i * 3] = x;
  cloudPositions[i * 3 + 1] = y;
  cloudPositions[i * 3 + 2] = z;
  const nearCenter = 1 - Math.min(1, Math.abs(x) / 4.2);
  cloudColors[i * 3] = 0.16 + nearCenter * 0.5;
  cloudColors[i * 3 + 1] = 0.006;
  cloudColors[i * 3 + 2] = 0.018;
}
const cloudGeometry = new THREE.BufferGeometry();
cloudGeometry.setAttribute("position", new THREE.BufferAttribute(cloudPositions, 3));
cloudGeometry.setAttribute("color", new THREE.BufferAttribute(cloudColors, 3));
const intelligenceCloud = new THREE.Points(
  cloudGeometry,
  createParticleMaterial({ size: 0.036, opacity: 0.4 }),
);
network.add(intelligenceCloud);

stage.addUpdate((time, delta) => {
  network.rotation.y = -0.19 + Math.sin(time * 0.18) * 0.07;
  network.rotation.x = -0.06 + Math.cos(time * 0.14) * 0.025;
  intelligenceCloud.rotation.x = Math.sin(time * 0.1) * 0.04;
  connections.material.opacity = (isLowPower ? 0.1 : 0.15) + Math.sin(time * 0.55) * 0.035;

  for (let i = 0; i < nodeMeshes.length; i++) {
    const mesh = nodeMeshes[i];
    const pulse = 1 + Math.sin(time * 1.9 + mesh.userData.phase) * 0.12;
    mesh.scale.setScalar(mesh.userData.baseScale * pulse);
    mesh.rotation.x += delta * 0.12;
    mesh.rotation.y += delta * 0.18;
  }

  for (let i = 0; i < activeEdges.length; i++) {
    const edge = activeEdges[i];
    const progress = (time * edge.speed + edge.phase) % 1;
    const smooth = progress * progress * (3 - 2 * progress);
    dummy.position.lerpVectors(edge.from, edge.to, smooth);
    const scale = 0.48 + Math.sin(progress * Math.PI) * 0.84;
    dummy.scale.setScalar(scale);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    pulses.setMatrixAt(i, dummy.matrix);
  }
  pulses.instanceMatrix.needsUpdate = true;
});
