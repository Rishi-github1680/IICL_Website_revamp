import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

export { THREE };

const params = new URLSearchParams(window.location.search);
export const quality = params.get("quality") || "auto";
export const isLowPower =
  quality === "low" ||
  (quality === "auto" &&
    (window.matchMedia("(max-width: 700px)").matches ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)));
export const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (params.get("ui") === "0") document.body.classList.add("ui-hidden");
if (params.get("transparent") === "1") document.body.classList.add("transparent");

// All particle materials share pointer-repulsion uniforms, updated by the active stage.
const particleMats = [];

export function createStage({
  cameraPosition = [0, 0, 8],
  target = [0, 0, 0],
  bloomStrength = 1.7,
  bloomRadius = 0.72,
  bloomThreshold = 0.08,
  fogDensity = 0.026,
  minDistance = 4,
  maxDistance = 15,
  zoomNear = 0.55, // journey scroll-zoom: final camera distance as a fraction of the start distance
} = {}) {
  const container = document.getElementById("scene");
  const transparent = params.get("transparent") === "1";
  const scene = new THREE.Scene();
  scene.background = transparent ? null : new THREE.Color(0x050505);
  scene.fog = new THREE.FogExp2(0x050505, fogDensity);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.08, 100);
  camera.position.set(...cameraPosition);

  const renderer = new THREE.WebGLRenderer({
    antialias: !isLowPower,
    alpha: transparent,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLowPower ? 1.25 : 1.8));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.shadowMap.enabled = !isLowPower;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), bloomStrength, bloomRadius, bloomThreshold);
  composer.addPass(bloom);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.045;
  controls.enablePan = false;
  controls.minDistance = minDistance;
  controls.maxDistance = maxDistance;
  controls.rotateSpeed = 0.46;
  controls.zoomSpeed = 0.7;
  controls.target.set(...target);
  controls.autoRotate = !reducedMotion;
  controls.autoRotateSpeed = 0.36;

  const pointer = new THREE.Vector2(); // NDC (-1..1)
  let repelTarget = 0;
  window.addEventListener("pointermove", (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
    repelTarget = 1;
  }, { passive: true });

  const ambient = new THREE.HemisphereLight(0xffffff, 0x200003, 0.42);
  const redLight = new THREE.PointLight(0xff1726, 46, 16, 1.7);
  redLight.position.set(3.5, 2.5, 4);
  const rimLight = new THREE.DirectionalLight(0xffced0, 2.4);
  rimLight.position.set(-4, 5, 5);
  scene.add(ambient, redLight, rimLight);

  const updaters = [];
  const clock = new THREE.Clock();
  let visible = true;

  // Host page (hero) drives disperse/re-form, pause and scroll-zoom via postMessage.
  let scatter = 0;
  let paused = false;
  let zoomT = 0;
  let zoomActive = false; // only dolly when the journey drives us — never fight manual OrbitControls zoom
  let exploreMode = false; // a model's own explore UI has taken the camera — stand down
  const baseDist = camera.position.distanceTo(controls.target);
  window.addEventListener("message", (event) => {
    const data = event.data || {};
    if (typeof data.iiclScatter === "number") scatter = data.iiclScatter;
    if (typeof data.iiclPause === "boolean") paused = data.iiclPause;
    if (typeof data.iiclZoom === "number") { zoomT = data.iiclZoom; zoomActive = true; }
    if (typeof data.iiclExplore === "boolean") exploreMode = data.iiclExplore;
    // Hero forwards the mouse (iframes are pointer-events: none there).
    if (data.iiclPointer) {
      pointer.x = data.iiclPointer.x * 2 - 1;
      pointer.y = -(data.iiclPointer.y * 2 - 1);
      repelTarget = 1;
    }
  });

  function resize() {
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    composer.setSize(width, height);
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", () => { visible = !document.hidden; });

  let elapsed = 0;
  let scatterS = 0;
  let repel = 0;
  const ray = new THREE.Vector3();
  const pointerWorld = new THREE.Vector3(999, 999, 999);
  function frame() {
    requestAnimationFrame(frame);
    if (!visible || paused) return;
    const delta = Math.min(clock.getDelta(), 0.05);
    elapsed += reducedMotion ? delta * 0.08 : delta;
    controls.update();
    // Journey scroll-zoom: dolly the camera toward the model over this stage (shared by every model).
    if (zoomActive) {
      const want = baseDist * (1 - zoomT * (1 - zoomNear));
      const dir = camera.position.clone().sub(controls.target);
      dir.setLength(dir.length() + (want - dir.length()) * (1 - Math.exp(-delta * 4)));
      camera.position.copy(controls.target).add(dir);
    }
    // Disperse: critically-damped approach. Meshes drift apart gently via scene scale;
    // the real dissolve happens per-particle in the shader (uScatter) so grains leave
    // one by one, swirl, and condense back — never a hard whole-scene jump.
    scatterS += (scatter - scatterS) * (1 - Math.exp(-delta * 5));
    const s = scatterS * scatterS * (3 - 2 * scatterS);
    scene.scale.setScalar(1 + s * 0.85); // meshes drift apart too, so mesh-heavy models join the dissolve
    scene.rotation.y = s * 0.25;
    camera.position.x += (pointer.x * 0.08 - camera.position.x * 0.002) * 0.008;
    camera.position.y += (pointer.y * 0.06 - camera.position.y * 0.002) * 0.008;
    // Project the cursor onto the model's depth and feed the repulsion uniforms.
    ray.set(pointer.x, pointer.y, 0.5).unproject(camera).sub(camera.position).normalize();
    const focus = camera.position.distanceTo(controls.target);
    pointerWorld.copy(camera.position).addScaledVector(ray, focus);
    repel += (repelTarget * (1 - s) - repel) * (1 - Math.exp(-delta * 6));
    for (const mat of particleMats) {
      mat.uniforms.uPointer.value.lerp(pointerWorld, 1 - Math.exp(-delta * 12));
      mat.uniforms.uRepel.value = repel;
      mat.uniforms.uScatter.value = s;
      mat.uniforms.uTime.value = elapsed;
    }
    for (const update of updaters) update(elapsed, delta);
    composer.render();
  }
  frame();

  return {
    THREE,
    scene,
    camera,
    renderer,
    composer,
    controls,
    lights: { ambient, redLight, rimLight },
    addUpdate(update) { updaters.push(update); },
  };
}

export function createParticleMaterial({
  size = 0.07,
  opacity = 1,
  blending = THREE.AdditiveBlending,
} = {}) {
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending,
    uniforms: {
      uSize: { value: size * Math.min(window.devicePixelRatio, 1.8) },
      uOpacity: { value: opacity },
      uPointer: { value: new THREE.Vector3(999, 999, 999) },
      uRepel: { value: 0 },
      uScatter: { value: 0 },
      uTime: { value: 0 },
    },
    vertexColors: true,
    vertexShader: `
      uniform float uSize;
      uniform vec3 uPointer;
      uniform float uRepel;
      uniform float uScatter;
      uniform float uTime;
      varying vec3 vColor;
      varying float vFade;
      void main() {
        vColor = color;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vec3 away = wp.xyz - uPointer;
        float dist = length(away);
        float force = smoothstep(0.85, 0.0, dist) * uRepel;
        wp.xyz += (away / max(dist, 0.001)) * force * 0.45;
        // Per-grain dissolve: each particle owns a departure threshold, an escape
        // direction and a swirl speed derived from its rest position — so the model
        // sheds grains progressively and re-condenses the same way in reverse.
        float h1 = fract(sin(dot(position, vec3(127.1, 311.7, 74.7))) * 43758.5453);
        float h2 = fract(sin(dot(position, vec3(269.5, 183.3, 246.1))) * 43758.5453);
        float h3 = fract(sin(dot(position, vec3(113.5, 271.9, 124.6))) * 43758.5453);
        float g = smoothstep(h1 * 0.55, h1 * 0.55 + 0.45, uScatter);
        if (g > 0.0) {
          // vortex: grains spiral around the model axis while escaping
          float ang = g * (1.2 + h2 * 2.4);
          float cs = cos(ang), sn = sin(ang);
          wp.xz = mat2(cs, -sn, sn, cs) * wp.xz;
          vec3 esc = normalize(vec3(h1, h2, h3) * 2.0 - 1.0 + wp.xyz * 0.3);
          wp.xyz += esc * g * (1.4 + h3 * 2.8);
          // free grains shimmer — a faint turbulence so the cloud feels alive
          wp.xyz += vec3(
            sin(uTime * 1.9 + h1 * 6.283),
            cos(uTime * 1.5 + h2 * 6.283),
            sin(uTime * 1.2 + h3 * 6.283)
          ) * g * 0.16;
        }
        vFade = 1.0 - g * (0.45 + h2 * 0.3);
        vec4 mvPosition = viewMatrix * wp;
        gl_PointSize = uSize * (330.0 / max(1.0, -mvPosition.z)) * (1.0 - g * 0.35);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float uOpacity;
      varying vec3 vColor;
      varying float vFade;
      void main() {
        vec2 c = gl_PointCoord - vec2(0.5);
        float d = length(c);
        if (d > 0.5) discard;
        float glow = smoothstep(0.5, 0.0, d);
        float core = smoothstep(0.16, 0.0, d);
        gl_FragColor = vec4(vColor * (1.0 + core * 1.9), (glow * 0.72 + core) * uOpacity * vFade);
      }
    `,
  });
  particleMats.push(material);
  return material;
}

export function addAtmosphere(stage, count = isLowPower ? 450 : 900, spread = 15) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 3 + Math.random() * spread;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
    positions[i * 3 + 1] = Math.cos(phi) * radius;
    positions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius;
    const tone = Math.random() > 0.82 ? 0.8 : 0.18 + Math.random() * 0.18;
    colors[i * 3] = tone;
    colors[i * 3 + 1] = tone * 0.08;
    colors[i * 3 + 2] = tone * 0.1;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const points = new THREE.Points(geometry, createParticleMaterial({ size: 0.045, opacity: 0.55 }));
  stage.scene.add(points);
  stage.addUpdate((time) => {
    points.rotation.y = time * 0.012;
    points.rotation.x = Math.sin(time * 0.08) * 0.04;
  });
  return points;
}

export function makeLineMaterial(color = 0xed101d, opacity = 0.2) {
  return new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}
