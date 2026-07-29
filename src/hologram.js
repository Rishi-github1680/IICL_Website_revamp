import {
  THREE,
  createStage,
  createParticleMaterial,
  addAtmosphere,
  isLowPower,
} from "./core.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

const stage = createStage({
  cameraPosition: [0.4, 0.2, 9],
  target: [0, 0, 0],
  bloomStrength: 1.15,
  bloomRadius: 0.72,
  bloomThreshold: 0.08,
  fogDensity: 0.024,
  minDistance: 1.6, // allow the scroll to dolly all the way in
  maxDistance: 13,
  zoomNear: 0.52, // dive that still frames the whole brain — closer than this and
                  // the form is cropped at the sides by the time chapter 1 is on screen
});

const group = new THREE.Group();
stage.scene.add(group);
addAtmosphere(stage, isLowPower ? 420 : 820, 13);

const COUNT = isLowPower ? 13000 : 26000;
const TARGET_OPACITY = 0.7;
let particleMat = null; // set once the model is sampled → drives the fade-in

// core.js handles the scroll-zoom dolly; we also read it here to dim the particles as we fly in.
let zoom = 0;
window.addEventListener("message", (e) => {
  const d = e.data || {};
  if (typeof d.iiclZoom === "number") zoom = d.iiclZoom;
});

// Red + black palette, matching the other 3 models (rare bright highlights, mostly deep red).
function paint(colors, i) {
  if (Math.random() > 0.965) {
    colors[i * 3] = 1; colors[i * 3 + 1] = 0.72; colors[i * 3 + 2] = 0.74;
  } else {
    const it = 0.4 + Math.random() * 0.6;
    colors[i * 3] = it; colors[i * 3 + 1] = 0.02 + it * 0.05; colors[i * 3 + 2] = 0.03 + it * 0.07;
  }
}

new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).load("/brain_hologram.glb", (gltf) => {
  gltf.scene.updateMatrixWorld(true);
  const meshes = [];
  gltf.scene.traverse((o) => { if (o.isMesh && o.geometry && o.geometry.attributes.position) meshes.push(o); });
  if (!meshes.length) return;

  // Distribute the particle budget across meshes by triangle count.
  const weights = meshes.map((m) => (m.geometry.index ? m.geometry.index.count : m.geometry.attributes.position.count));
  const total = weights.reduce((a, b) => a + b, 0) || 1;

  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const tmp = new THREE.Vector3();
  let ptr = 0;

  for (let mi = 0; mi < meshes.length; mi++) {
    const mesh = meshes[mi];
    const share = mi === meshes.length - 1 ? COUNT - ptr : Math.floor(COUNT * (weights[mi] / total));
    let sampler;
    try { sampler = new MeshSurfaceSampler(mesh).build(); } catch (e) { continue; }
    const world = mesh.matrixWorld;
    for (let k = 0; k < share && ptr < COUNT; k++) {
      sampler.sample(tmp);
      tmp.applyMatrix4(world);
      positions[ptr * 3] = tmp.x; positions[ptr * 3 + 1] = tmp.y; positions[ptr * 3 + 2] = tmp.z;
      paint(colors, ptr);
      ptr++;
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  // Center at origin and normalize size so it frames like the other models.
  geo.computeBoundingBox();
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();
  geo.boundingBox.getCenter(center);
  geo.boundingBox.getSize(size);
  geo.translate(-center.x, -center.y, -center.z);
  const scale = 3.7 / (Math.max(size.x, size.y, size.z) || 1);

  const pts = new THREE.Points(geo, createParticleMaterial({ size: isLowPower ? 0.07 : 0.06, opacity: 0 }));
  pts.scale.setScalar(scale);
  group.add(pts);
  particleMat = pts.material; // fade-in ramps uOpacity from 0 → TARGET_OPACITY
});

stage.addUpdate((time, delta) => {
  if (particleMat) {
    // Fade in on load, and dim further as it zooms in so it doesn't wash out the overlaid text.
    const target = TARGET_OPACITY * (1 - zoom * 0.6);
    const u = particleMat.uniforms.uOpacity;
    u.value += (target - u.value) * (1 - Math.exp(-delta * 2.2));
  }
  group.rotation.y = time * 0.05;
  group.scale.setScalar(1 + Math.sin(time * 1.1) * 0.012);
});
