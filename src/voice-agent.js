import {
  THREE,
  createStage,
  addAtmosphere,
  makeLineMaterial,
  isLowPower,
} from "./core.js";

const stage = createStage({
  cameraPosition: [0.4, 0.1, 9.4],
  target: [1, 0, 0],
  bloomStrength: 2.2,
  bloomRadius: 0.82,
  bloomThreshold: 0.025,
  fogDensity: 0.019,
  minDistance: 5.6,
  maxDistance: 14,
});

const voice = new THREE.Group();
voice.position.x = 1.18;
voice.rotation.set(-0.04, -0.12, 0);
stage.scene.add(voice);
addAtmosphere(stage, isLowPower ? 400 : 820, 14);

const core = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.88, isLowPower ? 3 : 5),
  new THREE.MeshPhysicalMaterial({
    color: 0x180103,
    emissive: 0xed101d,
    emissiveIntensity: 2.15,
    metalness: 0.7,
    roughness: 0.14,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    transparent: true,
    opacity: 0.94,
  }),
);
voice.add(core);

const innerCore = new THREE.Mesh(
  new THREE.SphereGeometry(0.48, 36, 24),
  new THREE.MeshBasicMaterial({
    color: 0xff2733,
    transparent: true,
    opacity: 0.28,
    blending: THREE.AdditiveBlending,
  }),
);
voice.add(innerCore);

const coreWire = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1.04, 2),
  new THREE.MeshBasicMaterial({
    color: 0xff5962,
    transparent: true,
    opacity: 0.34,
    wireframe: true,
    blending: THREE.AdditiveBlending,
  }),
);
voice.add(coreWire);

const ringMaterial = new THREE.MeshBasicMaterial({
  color: 0xed101d,
  transparent: true,
  opacity: 0.22,
  blending: THREE.AdditiveBlending,
});
const rings = [];
for (let i = 0; i < 5; i++) {
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.34 + i * 0.23, 0.008 + i * 0.001, 5, 160),
    ringMaterial.clone(),
  );
  ring.rotation.set(i * 0.3, i * 0.38, i * 0.2);
  ring.userData.phase = i * 0.72;
  voice.add(ring);
  rings.push(ring);
}

const channelCount = isLowPower ? 8 : 12;
const samples = isLowPower ? 130 : 220;
const channels = [];

function waveformY(x, time, layer) {
  const envelope = Math.exp(-Math.pow(x / 3.25, 4));
  const carrier = Math.sin(x * 4.15 - time * 3.2 + layer * 0.61);
  const harmonic = Math.sin(x * 8.4 + time * 2.1 - layer * 0.29) * 0.34;
  const voicePulse = Math.sin(time * 1.35 + layer * 0.48) * 0.18;
  return (carrier + harmonic) * envelope * (0.42 + voicePulse);
}

for (let layer = 0; layer < channelCount; layer++) {
  const positions = new Float32Array(samples * 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = makeLineMaterial(
    layer % 5 === 0 ? 0xffd6d8 : 0xed101d,
    layer % 5 === 0 ? 0.7 : 0.38,
  );
  const line = new THREE.Line(geometry, material);
  voice.add(line);
  channels.push({
    layer,
    geometry,
    line,
    depth: (layer - (channelCount - 1) / 2) * 0.17,
  });
}

const signalCount = isLowPower ? 12 : 24;
const signalGeometry = new THREE.SphereGeometry(0.045, 8, 8);
const signalMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const signals = new THREE.InstancedMesh(signalGeometry, signalMaterial, signalCount);
voice.add(signals);
const signalDummy = new THREE.Object3D();

const listeningNodes = new THREE.InstancedMesh(
  new THREE.OctahedronGeometry(0.04, 0),
  new THREE.MeshBasicMaterial({ color: 0xff2733 }),
  48,
);
const nodeDummy = new THREE.Object3D();
for (let i = 0; i < 48; i++) {
  const angle = (i / 48) * Math.PI * 2;
  const radius = 2.0 + Math.sin(i * 2.17) * 0.22;
  nodeDummy.position.set(
    Math.cos(angle) * radius,
    Math.sin(angle) * radius,
    Math.sin(angle * 3) * 0.34,
  );
  nodeDummy.rotation.set(angle, angle * 0.5, 0);
  nodeDummy.updateMatrix();
  listeningNodes.setMatrixAt(i, nodeDummy.matrix);
}
listeningNodes.instanceMatrix.needsUpdate = true;
voice.add(listeningNodes);

const axisLine = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-3.75, 0, 0),
    new THREE.Vector3(3.75, 0, 0),
  ]),
  makeLineMaterial(0x851019, 0.26),
);
voice.add(axisLine);

stage.addUpdate((time, delta) => {
  voice.rotation.y = -0.12 + Math.sin(time * 0.14) * 0.07;
  voice.rotation.x = -0.04 + Math.sin(time * 0.11) * 0.025;
  core.rotation.x += delta * 0.13;
  core.rotation.y -= delta * 0.17;
  core.material.emissiveIntensity = 1.75 + Math.sin(time * 2.35) * 0.55;
  innerCore.scale.setScalar(0.88 + Math.sin(time * 2.35) * 0.18);
  coreWire.rotation.x -= delta * 0.1;
  coreWire.rotation.z += delta * 0.13;

  for (const channel of channels) {
    const positions = channel.geometry.attributes.position;
    for (let i = 0; i < samples; i++) {
      const x = -3.65 + (i / (samples - 1)) * 7.3;
      const y = waveformY(x, time, channel.layer);
      const z =
        channel.depth +
        Math.sin(x * 0.85 + time * 0.42 + channel.layer * 0.4) * 0.055;
      positions.setXYZ(i, x, y, z);
    }
    positions.needsUpdate = true;
    channel.line.material.opacity =
      (channel.layer % 5 === 0 ? 0.58 : 0.3) + Math.sin(time + channel.layer) * 0.08;
  }

  for (let i = 0; i < signalCount; i++) {
    const layer = i % channelCount;
    const progress = (time * (0.1 + (i % 5) * 0.016) + i / signalCount) % 1;
    const x = -3.65 + progress * 7.3;
    signalDummy.position.set(
      x,
      waveformY(x, time, layer),
      (layer - (channelCount - 1) / 2) * 0.17,
    );
    signalDummy.scale.setScalar(0.7 + Math.sin(progress * Math.PI) * 0.9);
    signalDummy.updateMatrix();
    signals.setMatrixAt(i, signalDummy.matrix);
  }
  signals.instanceMatrix.needsUpdate = true;

  for (let i = 0; i < rings.length; i++) {
    const ring = rings[i];
    ring.rotation.z += delta * (i % 2 === 0 ? 0.08 : -0.06);
    const pulse = 1 + Math.sin(time * 1.4 + ring.userData.phase) * 0.055;
    ring.scale.setScalar(pulse);
    ring.material.opacity = 0.14 + Math.sin(time * 1.1 + i) * 0.06;
  }
  listeningNodes.rotation.z = time * 0.035;
});
