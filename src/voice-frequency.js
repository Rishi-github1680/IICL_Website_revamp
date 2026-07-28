import {
  THREE,
  createStage,
  addAtmosphere,
  makeLineMaterial,
  isLowPower,
} from "./core.js";

const stage = createStage({
  cameraPosition: [0.7, 3.1, 10.2],
  target: [1, 0.25, 0],
  bloomStrength: 2.0,
  bloomRadius: 0.78,
  bloomThreshold: 0.045,
  fogDensity: 0.018,
  minDistance: 6.2,
  maxDistance: 16,
});

const spectrum = new THREE.Group();
spectrum.position.set(1.16, -0.45, 0);
spectrum.rotation.set(-0.08, -0.14, 0);
stage.scene.add(spectrum);
addAtmosphere(stage, isLowPower ? 380 : 780, 15);

const bandCount = isLowPower ? 64 : 96;
const barGeometry = new THREE.BoxGeometry(0.065, 1, 0.15);
barGeometry.translate(0, 0.5, 0);
const barMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x250104,
  emissive: 0xed101d,
  emissiveIntensity: 1.45,
  metalness: 0.76,
  roughness: 0.2,
  clearcoat: 0.7,
});
const bars = new THREE.InstancedMesh(barGeometry, barMaterial, bandCount);
bars.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
spectrum.add(bars);

const dummy = new THREE.Object3D();
const color = new THREE.Color();
const bandHeights = new Float32Array(bandCount);
const xPositions = new Float32Array(bandCount);
const zPositions = new Float32Array(bandCount);
for (let i = 0; i < bandCount; i++) {
  const t = i / (bandCount - 1);
  xPositions[i] = -4.15 + t * 8.3;
  zPositions[i] = Math.sin(t * Math.PI * 2.2) * 0.42;
  const brightness = 0.42 + Math.sin(t * Math.PI) * 0.58;
  color.setRGB(brightness, 0.008 + brightness * 0.025, 0.018 + brightness * 0.035);
  if (i % 17 === 0) color.setRGB(1, 0.72, 0.74);
  bars.setColorAt(i, color);
}
bars.instanceColor.needsUpdate = true;

const waveLines = [];
const waveLineCount = isLowPower ? 3 : 5;
for (let layer = 0; layer < waveLineCount; layer++) {
  const positions = new Float32Array(bandCount * 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const line = new THREE.Line(
    geometry,
    makeLineMaterial(layer === 0 ? 0xffffff : 0xff2733, layer === 0 ? 0.76 : 0.35),
  );
  line.position.z = layer * 0.12;
  spectrum.add(line);
  waveLines.push({ geometry, layer, line });
}

const grid = new THREE.GridHelper(9.2, 24, 0x7c0a12, 0x2b080b);
grid.position.y = -0.03;
grid.material.transparent = true;
grid.material.opacity = 0.4;
spectrum.add(grid);

const baseline = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-4.4, 0.01, 0),
    new THREE.Vector3(4.4, 0.01, 0),
  ]),
  makeLineMaterial(0xff2733, 0.7),
);
spectrum.add(baseline);

const reticleMaterial = new THREE.MeshBasicMaterial({
  color: 0xed101d,
  transparent: true,
  opacity: 0.18,
  blending: THREE.AdditiveBlending,
});
const reticles = [];
for (let i = 0; i < 4; i++) {
  const reticle = new THREE.Mesh(
    new THREE.TorusGeometry(1.15 + i * 0.42, 0.008, 5, 140),
    reticleMaterial.clone(),
  );
  reticle.position.set(0, 1.55, -1.55 - i * 0.12);
  reticle.userData.phase = i * 0.7;
  spectrum.add(reticle);
  reticles.push(reticle);
}

const harmonicNodes = new THREE.InstancedMesh(
  new THREE.SphereGeometry(0.045, 8, 8),
  new THREE.MeshBasicMaterial({ color: 0xffe5e7 }),
  bandCount,
);
harmonicNodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
spectrum.add(harmonicNodes);

function frequencyHeight(index, time) {
  const t = index / (bandCount - 1);
  const low = Math.exp(-Math.pow((t - 0.16) / 0.11, 2)) * (0.9 + Math.sin(time * 2.2) * 0.25);
  const voice = Math.exp(-Math.pow((t - 0.43) / 0.16, 2)) * (1.8 + Math.sin(time * 3.1 + t * 22) * 0.55);
  const clarity = Math.exp(-Math.pow((t - 0.71) / 0.1, 2)) * (1.05 + Math.sin(time * 4.2 - t * 17) * 0.32);
  const harmonic = Math.abs(Math.sin(t * 38 - time * 2.7)) * 0.34;
  return 0.16 + low + voice + clarity + harmonic;
}

stage.addUpdate((time) => {
  spectrum.rotation.y = -0.14 + Math.sin(time * 0.12) * 0.07;
  spectrum.rotation.z = Math.sin(time * 0.1) * 0.012;

  for (let i = 0; i < bandCount; i++) {
    const height = frequencyHeight(i, time);
    bandHeights[i] = height;
    dummy.position.set(xPositions[i], 0, zPositions[i]);
    dummy.scale.set(1, height, 1);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    bars.setMatrixAt(i, dummy.matrix);

    dummy.position.set(xPositions[i], height + 0.06, zPositions[i]);
    dummy.scale.setScalar(i % 13 === 0 ? 1.45 : 0.72);
    dummy.updateMatrix();
    harmonicNodes.setMatrixAt(i, dummy.matrix);
  }
  bars.instanceMatrix.needsUpdate = true;
  harmonicNodes.instanceMatrix.needsUpdate = true;

  for (const wave of waveLines) {
    const positions = wave.geometry.attributes.position;
    for (let i = 0; i < bandCount; i++) {
      positions.setXYZ(
        i,
        xPositions[i],
        bandHeights[i] + 0.08 + wave.layer * 0.06,
        zPositions[i] + wave.layer * 0.09,
      );
    }
    positions.needsUpdate = true;
    wave.line.material.opacity =
      (wave.layer === 0 ? 0.66 : 0.26) + Math.sin(time + wave.layer) * 0.08;
  }

  for (let i = 0; i < reticles.length; i++) {
    const reticle = reticles[i];
    const pulse = 1 + Math.sin(time * 1.45 + reticle.userData.phase) * 0.08;
    reticle.scale.setScalar(pulse);
    reticle.rotation.z = time * (i % 2 === 0 ? 0.035 : -0.03);
    reticle.material.opacity = 0.12 + Math.sin(time * 1.1 + i) * 0.045;
  }
});
