// Static India map — the Sketchfab india_maps.glb, shown as ONE map, no colour, no
// rotation. Deliberately minimal (not core.js's createStage, which auto-rotates and
// applies the hero's red bloom): a plain lit scene, a grey material, a fixed camera.
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const params = new URLSearchParams(location.search);
const transparent = params.get("transparent") === "1";
// Match the model-page convention: a transparent body so the iframe shows the panel
// behind it (otherwise the dark model-page background shows as a black box).
if (transparent) {
  document.body.classList.add("transparent");
  // .transparent clears .model-shell, but the body/html still carry the dark model-page
  // colour (shows as a black box in the iframe). Force them transparent too.
  document.documentElement.style.background = "transparent";
  document.body.style.background = "transparent";
}
if (params.get("ui") === "0") document.body.classList.add("ui-hidden");
const container = document.getElementById("scene");

const scene = new THREE.Scene();
if (!transparent) scene.background = new THREE.Color(0x0a0b0e);

const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 5000);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: transparent });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
container.appendChild(renderer.domElement);

// Soft, even lighting so the extruded map reads in 3D without any colour.
scene.add(new THREE.AmbientLight(0xffffff, 1.15));
const key = new THREE.DirectionalLight(0xffffff, 1.25); key.position.set(0.6, 1.1, 0.8); scene.add(key);
const rim = new THREE.DirectionalLight(0xffffff, 0.55); rim.position.set(-0.7, 0.4, -0.6); scene.add(rim);

// No colour — one neutral grey material for the whole map.
const MONO = new THREE.MeshStandardMaterial({ color: 0xccced4, metalness: 0.0, roughness: 0.78 });

let model = null;

function fit() {
  const w = container.clientWidth || 1, h = container.clientHeight || 1;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  if (model) frame();
  renderer.render(scene, camera);
}

// Centre the map and look at it straight down its thinnest axis (the extrusion depth),
// so the map faces the camera. No rotation is ever applied after this.
function frame() {
  const box = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3(); box.getSize(size);
  const center = new THREE.Vector3(); box.getCenter(center);
  model.position.sub(center); // recentre at origin
  const s = [size.x, size.y, size.z];
  const thin = s.indexOf(Math.min(...s));       // extrusion axis → camera looks along it
  const w = s[(thin + 1) % 3], h = s[(thin + 2) % 3];
  const span = Math.max(w, h);
  const dist = (span / 2) / Math.tan((camera.fov * Math.PI / 180) / 2) * 1.18;
  const pos = [0, 0, 0]; pos[thin] = dist;
  camera.position.set(pos[0], pos[1], pos[2]);
  camera.up.set(thin === 1 ? 0 : 0, thin === 1 ? 0 : 1, thin === 1 ? -1 : 0); // keep north up
  camera.lookAt(0, 0, 0);
}

new GLTFLoader().load("/india_maps.glb", (gltf) => {
  model = gltf.scene;
  // Show one map: remove the bordered/frame duplicate.
  const border = model.getObjectByName("India_Map_With_Border_Grp");
  if (border) border.parent.remove(border);
  // No colour: one grey material across every mesh.
  model.traverse((o) => { if (o.isMesh) { o.material = MONO; o.castShadow = o.receiveShadow = false; } });
  scene.add(model);
  fit();
  // A few frames to settle layout, then it stays put (static — no rotation).
  let n = 0; (function settle(){ if (n++ < 8) { fit(); requestAnimationFrame(settle); } })();
}, undefined, (err) => { console.error("india-map load failed", err && err.message); });

window.addEventListener("resize", fit);
