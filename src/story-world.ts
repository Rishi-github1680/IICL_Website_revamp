// THE CROSSING — one persistent, stateful world for the IICL homepage.
// A story every human reads at a glance: a dark landscape split by a canyon.
// The near side is alive with red signals; the far side is dark and silent.
//   the system studies the gap → extends a straight cantilever bridge → the
//   span collapses; the pieces fall into the canyon and STAY there → it
//   returns, the wreckage glows (it remembers) → it builds differently:
//   support pillars first, a new line beside the wreck → the crossing holds →
//   the first signal crosses and the far side lights up.
// Goal, failure, memory, better design, payoff — no captions required.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const smooth = (x: number) => {
	x = clamp01(x);
	return x * x * (3 - 2 * x);
};
const win = (p: number, a: number, b: number) => smooth((p - a) / (b - a));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const V3 = THREE.Vector3;
type Vec3 = THREE.Vector3;

export const PHASE = {
	gapFound: [0.05, 0.14],
	observe: [0.15, 0.3],
	attempt: [0.32, 0.42],
	failure: [0.42, 0.52],
	reexamine: [0.56, 0.66],
	response: [0.66, 0.79],
	integrate: [0.8, 0.9],
	coda: [0.9, 1.0]
} as const;

export interface WorldHandle {
	setProgress(p: number): void;
	setPointer(x: number, y: number): void;
	dispose(): void;
}

export function createWorld(canvas: HTMLCanvasElement): WorldHandle {
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const lowPower =
		window.matchMedia('(max-width: 700px)').matches ||
		(navigator.hardwareConcurrency ?? 8) <= 4;

	// ── renderer / scene / camera ──────────────────────────────────────────
	const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lowPower, powerPreference: 'high-performance' });
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.25 : 1.8));
	renderer.outputColorSpace = THREE.SRGBColorSpace;
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1.25;

	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0x050505);
	scene.fog = new THREE.FogExp2(0x050505, 0.016);
	const pmrem = new THREE.PMREMGenerator(renderer);
	scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
	scene.environmentIntensity = 0.25;
	pmrem.dispose();

	const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 160);
	camera.position.set(8, 7, 26);

	scene.add(new THREE.HemisphereLight(0x9a9aa4, 0x0d0708, 0.42));
	const key = new THREE.DirectionalLight(0xdfe4ee, 1.1);
	key.position.set(-6, 18, 14);
	scene.add(key);
	// pool of light over the canyon — the eye goes where the light is
	const stageLight = new THREE.SpotLight(0xe8e8f0, 1100, 46, 0.7, 0.6, 1.6);
	stageLight.position.set(-12, 16, 1);
	stageLight.target.position.set(-12, 0, 1);
	scene.add(stageLight, stageLight.target);
	// red follows whatever the system is doing right now
	const attention = new THREE.PointLight(0xff1a26, 0, 9, 2.0);
	scene.add(attention);
	// the far side wakes at the end
	const farLight = new THREE.PointLight(0xff3a30, 0, 16, 1.8);
	farLight.position.set(-21, 3, 3);
	scene.add(farLight);

	// ── terrain: two plateaus split by a canyon ────────────────────────────
	// near side (camera side): x > -8.5, low and calm
	// canyon: -15.5 < x < -8.5, floor far below
	// far side: x < -15.5, slightly elevated, silent
	const GW = lowPower ? 56 : 84;
	const GH = lowPower ? 30 : 44;
	const N = GW * GH;
	const wx = (ix: number) => (ix - GW / 2) * 1.0;
	const wz = (iz: number) => (iz - GH / 2) * 1.0;

	const SEED = 20260728;
	const hash2 = (x: number, y: number) => {
		const s = Math.sin(x * 127.1 + y * 311.7 + SEED) * 43758.5453;
		return s - Math.floor(s);
	};
	const noise2 = (x: number, y: number) => {
		const xi = Math.floor(x), yi = Math.floor(y);
		const u = smooth(x - xi), v = smooth(y - yi);
		return (
			hash2(xi, yi) * (1 - u) * (1 - v) +
			hash2(xi + 1, yi) * u * (1 - v) +
			hash2(xi, yi + 1) * (1 - u) * v +
			hash2(xi + 1, yi + 1) * u * v
		);
	};

	const CANYON_NEAR = -8.5, CANYON_FAR = -15.5, CANYON_BOTTOM = -4;
	const DECK_Y = 0.42; // bridge deck height

	const boxGeo = new THREE.BoxGeometry(1, 1, 1);
	const tileMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.3 });
	const floor = new THREE.InstancedMesh(boxGeo, tileMat, N);
	floor.frustumCulled = false;
	scene.add(floor);

	const FLOOR_TONE = new THREE.Color(0x232328);
	const CHAR = new THREE.Color(0x101013);
	const EMBER = new THREE.Color(0xd81a26);
	const baseCol: THREE.Color[] = [];
	// chasm-floor cells near the wreck — they char on impact, glow on recall
	const charAmount = new Float32Array(N);
	{
		const m = new THREE.Matrix4();
		const q = new THREE.Quaternion();
		const s = new V3();
		const pos = new V3();
		const c = new THREE.Color();
		for (let iz = 0; iz < GH; iz++)
			for (let ix = 0; ix < GW; ix++) {
				const i = iz * GW + ix;
				const x = wx(ix), z = wz(iz);
				let top: number, bottom: number;
				if (x > CANYON_NEAR) {
					top = 0.16 + noise2(ix * 0.14, iz * 0.14) * 0.28;
					bottom = x < CANYON_NEAR + 1.2 ? CANYON_BOTTOM - 0.2 : top - 0.3; // cliff face on the rim column
				} else if (x < CANYON_FAR) {
					top = 1.05 + noise2(ix * 0.11 + 9, iz * 0.11 + 4) * 0.45;
					if (x < -32) {
						const mn = noise2(ix * 0.05 + 31, iz * 0.05 + 17);
						if (mn > 0.52) top = 2.5 + (mn - 0.52) * 10;
					}
					bottom = x > CANYON_FAR - 1.2 ? CANYON_BOTTOM - 0.2 : top - 0.4; // far cliff face
				} else {
					top = CANYON_BOTTOM + 0.14 + noise2(ix * 0.2, iz * 0.2) * 0.1; // canyon floor rubble-flat
					bottom = CANYON_BOTTOM;
					const dxw = x - -12.5, dzw = z - -1;
					const d = Math.sqrt(dxw * dxw + dzw * dzw);
					if (d < 3.2) charAmount[i] = smooth(1 - d / 3.2);
				}
				const h = Math.max(top - bottom, 0.05);
				s.set(0.88, h, 0.88);
				pos.set(x, bottom + h / 2, z);
				m.compose(pos, q, s);
				floor.setMatrixAt(i, m);
				c.copy(FLOOR_TONE).multiplyScalar(0.82 + hash2(i, 17) * 0.36);
				if (x < CANYON_FAR) c.multiplyScalar(0.7); // the far side sits darker — asleep
				baseCol.push(c.clone());
				floor.setColorAt(i, c);
			}
	}

	// ── the far district: dark towers that wake at the end ─────────────────
	const TOWERS = 12;
	const district = new THREE.InstancedMesh(boxGeo, tileMat.clone(), TOWERS);
	district.frustumCulled = false;
	const towerCol = new THREE.Color(0x191920);
	const TOWER_LIT = new THREE.Color(0x8a3230);
	{
		const m = new THREE.Matrix4();
		const q = new THREE.Quaternion();
		const s = new V3();
		for (let i = 0; i < TOWERS; i++) {
			const x = -19.5 - hash2(i, 23) * 5;
			const z = 0.5 + (hash2(i, 29) - 0.35) * 8;
			const h = 1.4 + hash2(i, 31) * 2.6;
			s.set(1.1 + hash2(i, 37) * 0.7, h, 1.1 + hash2(i, 41) * 0.7);
			m.compose(new V3(x, 1.2 + h / 2, z), q, s);
			district.setMatrixAt(i, m);
			district.setColorAt(i, towerCol);
		}
	}
	scene.add(district);

	// ── bridge 1: the straight cantilever (design 01 — it will fail) ───────
	const slabMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.68, metalness: 0.5 });
	const SLAB_TONE = new THREE.Color(0x42424c);
	const DECK1_N = 8;
	const B1_Z = -1;
	const deck1 = new THREE.InstancedMesh(boxGeo, slabMat.clone(), DECK1_N);
	deck1.frustumCulled = false;
	const d1x = (k: number) => CANYON_NEAR - 0.35 - k * 0.95;
	const FALL_FROM = 3; // segments 3..7 tear off; 0..2 remain as the stub
	const restPos: Vec3[] = [], restQuat: THREE.Quaternion[] = [];
	for (let k = 0; k < DECK1_N; k++) {
		restPos.push(new V3(d1x(k) - 0.6 - hash2(k, 7) * 1.2, CANYON_BOTTOM + 0.35, B1_Z + (hash2(k, 5) - 0.5) * 2.2));
		restQuat.push(
			new THREE.Quaternion().setFromEuler(
				new THREE.Euler((hash2(k, 11) - 0.5) * 0.8, hash2(k, 13) * 6.28, (hash2(k, 3) - 0.5) * 1.1)
			)
		);
	}
	{
		const zero = new THREE.Matrix4().makeScale(0, 0, 0);
		for (let k = 0; k < DECK1_N; k++) {
			deck1.setMatrixAt(k, zero);
			deck1.setColorAt(k, SLAB_TONE);
		}
	}
	scene.add(deck1);

	// ── bridge 2: pillars first, then the deck — design 02, beside the wreck
	const B2_Z = 3;
	const PILLARS = 3;
	const pillars = new THREE.InstancedMesh(boxGeo, slabMat.clone(), PILLARS);
	pillars.frustumCulled = false;
	const pillarX = (j: number) => -10.3 - j * 2.2;
	{
		const zero = new THREE.Matrix4().makeScale(0, 0, 0);
		for (let j = 0; j < PILLARS; j++) {
			pillars.setMatrixAt(j, zero);
			pillars.setColorAt(j, SLAB_TONE);
		}
	}
	scene.add(pillars);
	const DECK2_N = 8;
	const deck2 = new THREE.InstancedMesh(boxGeo, slabMat.clone(), DECK2_N);
	deck2.frustumCulled = false;
	const d2x = (k: number) => CANYON_NEAR - 0.35 - k * 0.95;
	const d2y = (k: number) => DECK_Y + Math.sin(((k + 0.5) / DECK2_N) * Math.PI) * 0.32; // gentle arch
	{
		const zero = new THREE.Matrix4().makeScale(0, 0, 0);
		for (let k = 0; k < DECK2_N; k++) {
			deck2.setMatrixAt(k, zero);
			deck2.setColorAt(k, SLAB_TONE);
		}
	}
	scene.add(deck2);

	// ── ambient dust in the light ───────────────────────────────────────────
	{
		const n = lowPower ? 120 : 260;
		const pos = new Float32Array(n * 3);
		for (let i = 0; i < n; i++) {
			pos[i * 3] = -12 + (hash2(i, 91) * 2 - 1) * 16;
			pos[i * 3 + 1] = -3 + hash2(i, 93) * 12;
			pos[i * 3 + 2] = 1 + (hash2(i, 97) * 2 - 1) * 14;
		}
		const g = new THREE.BufferGeometry();
		g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
		scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0x5a5a62, size: 0.05, transparent: true, opacity: 0.26, sizeAttenuation: true, depthWrite: false })));
	}

	// ── pulses: red signals — the system's activity made visible ───────────
	const MAX_PULSES = lowPower ? 32 : 64;
	const pulsePos = new Float32Array(MAX_PULSES * 3).fill(9999);
	const pulseGeo = new THREE.BufferGeometry();
	pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePos, 3));
	const spriteCanvas = document.createElement('canvas');
	spriteCanvas.width = spriteCanvas.height = 64;
	{
		const ctx = spriteCanvas.getContext('2d')!;
		const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
		grad.addColorStop(0, 'rgba(255,255,255,1)');
		grad.addColorStop(0.25, 'rgba(255,80,80,0.9)');
		grad.addColorStop(1, 'rgba(255,0,0,0)');
		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, 64, 64);
	}
	const pulseMat = new THREE.PointsMaterial({ color: 0xff3340, size: 0.36, map: new THREE.CanvasTexture(spriteCanvas), sizeAttenuation: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false });
	const pulsePoints = new THREE.Points(pulseGeo, pulseMat);
	pulsePoints.frustumCulled = false;
	scene.add(pulsePoints);
	interface Pulse { path: Vec3[]; lens: number[]; total: number; t: number; speed: number; killAt: number; active: boolean }
	const pulses: Pulse[] = Array.from({ length: MAX_PULSES }, () => ({ path: [], lens: [], total: 0, t: 0, speed: 1, killAt: 1, active: false }));
	let frandState = 777;
	const frand = () => {
		frandState |= 0;
		frandState = (frandState + 0x6d2b79f5) | 0;
		let t = Math.imul(frandState ^ (frandState >>> 15), 1 | frandState);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
	const spawnPulse = (path: Vec3[], speed: number, killAt = 1) => {
		const p = pulses.find((x) => !x.active);
		if (!p || path.length < 2) return;
		p.path = path;
		p.lens = [];
		p.total = 0;
		for (let i = 1; i < path.length; i++) {
			p.total += path[i - 1].distanceTo(path[i]);
			p.lens.push(p.total);
		}
		p.t = 0;
		p.speed = speed;
		p.killAt = killAt;
		p.active = true;
	};
	const samplePath = (p: Pulse, out: Vec3) => {
		const d = p.t * p.total;
		let i = 0;
		while (i < p.lens.length - 1 && p.lens[i] < d) i++;
		const prev = i === 0 ? 0 : p.lens[i - 1];
		const segT = clamp01((d - prev) / (p.lens[i] - prev || 1));
		out.lerpVectors(p.path[i], p.path[i + 1], segT);
	};

	// ── camera narrative ────────────────────────────────────────────────────
	const CAM: { p: number; pos: Vec3; look: Vec3 }[] = [
		{ p: 0.0, pos: new V3(8, 7, 26), look: new V3(-12, 0, 0) },
		{ p: 0.13, pos: new V3(3, 5, 18), look: new V3(-11.5, 0.4, -1) },
		{ p: 0.24, pos: new V3(-2, 3.6, 10.5), look: new V3(-12, 0.2, -1) },
		{ p: 0.34, pos: new V3(-5.5, 3.2, 7.2), look: new V3(-12, 0.3, -1) },
		{ p: 0.46, pos: new V3(-6.5, 2.8, 7.6), look: new V3(-12.5, -1.8, -1) }, // follow the fall into the canyon
		{ p: 0.58, pos: new V3(-5.5, 3.2, 7.2), look: new V3(-12.5, -0.8, 0.8) }, // same vantage as the attempt — déjà vu
		{ p: 0.74, pos: new V3(-6.8, 3.4, 8.8), look: new V3(-12.5, 0.4, 3) },
		{ p: 0.88, pos: new V3(-9, 3.8, 10.5), look: new V3(-19.5, 1.8, 3) }, // across to the waking far side
		{ p: 1.0, pos: new V3(8.5, 7.5, 23), look: new V3(-13, 0.5, 1) }
	];
	const camPos = CAM[0].pos.clone(), camLook = CAM[0].look.clone();
	const wantPos = new V3(), wantLook = new V3();
	const sampleCamera = (p: number) => {
		let i = 0;
		while (i < CAM.length - 2 && CAM[i + 1].p < p) i++;
		const a = CAM[i], b = CAM[i + 1];
		const t = smooth((p - a.p) / (b.p - a.p));
		wantPos.lerpVectors(a.pos, b.pos, t);
		wantLook.lerpVectors(a.look, b.look, t);
	};

	if (import.meta.env.DEV)
		(window as unknown as Record<string, unknown>).__iiclDebug = { camera };

	// ── frame loop ──────────────────────────────────────────────────────────
	let pTarget = 0, pSmooth = 0;
	const pointer = { x: 0, y: 0 };
	let elapsed = 0, raf = 0, disposed = false;
	let pulseAcc = 0;
	const clock = new THREE.Clock();
	const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _s = new V3(), _p = new V3(), _c = new THREE.Color();
	const Q_IDENT = new THREE.Quaternion();

	const frame = () => {
		if (disposed) return;
		raf = requestAnimationFrame(frame);
		const dt = Math.min(clock.getDelta(), 0.05);
		elapsed += dt;
		pSmooth += (pTarget - pSmooth) * (1 - Math.exp(-dt * (reduced ? 6 : 3.5)));
		const p = pSmooth;

		// story amounts — pure functions of progress: reversible, replayable
		const o1 = win(p, PHASE.observe[0], PHASE.observe[0] + 0.09) * (1 - 0.8 * win(p, PHASE.failure[1], PHASE.failure[1] + 0.06));
		const g1 = win(p, PHASE.attempt[0], PHASE.attempt[1]);
		const f1 = win(p, PHASE.failure[0], PHASE.failure[1]);
		const recog = win(p, PHASE.reexamine[0], PHASE.reexamine[0] + 0.05) * (1 - win(p, PHASE.response[0] + 0.06, PHASE.integrate[0]));
		const g2 = win(p, PHASE.response[0], PHASE.response[1]);
		const integ = win(p, PHASE.integrate[0], PHASE.integrate[1]);

		// ── canyon-floor char: darkens on impact, glows on recall ───────────
		if (f1 > 0 || recog > 0) {
			for (let i = 0; i < N; i++) {
				if (charAmount[i] <= 0) continue;
				const char = charAmount[i] * smooth(f1);
				_c.copy(baseCol[i]).lerp(CHAR, char * 0.85);
				const emberAmt = char * (0.1 + recog * 0.8);
				if (emberAmt > 0) _c.lerp(EMBER, Math.min(emberAmt, 0.7));
				floor.setColorAt(i, _c);
			}
			if (floor.instanceColor) floor.instanceColor.needsUpdate = true;
		}

		// ── bridge 1: extend → tear off → wreckage that never moves again ───
		if (g1 > 0) {
			for (let k = 0; k < DECK1_N; k++) {
				const pop = clamp01(g1 * (DECK1_N + 1.5) - k);
				// sag: the unsupported tip droops as it reaches further
				const sag = k >= DECK1_N - 3 ? smooth(clamp01(g1 * 1.2 - 0.75)) * 0.18 * (k - (DECK1_N - 4)) : 0;
				if (f1 > 0 && k >= FALL_FROM) {
					const f = smooth(clamp01(f1 * 1.5 - (k - FALL_FROM) * 0.12));
					_p.set(d1x(k), DECK_Y - sag, B1_Z).lerp(restPos[k], f);
					_q.copy(Q_IDENT).slerp(restQuat[k], f);
					_s.set(0.95, 0.22, 1.7);
					_m.compose(_p, _q, _s);
					deck1.setMatrixAt(k, _m);
					_c.copy(SLAB_TONE).lerp(CHAR, f * 0.6).lerp(EMBER, recog * 0.5);
					deck1.setColorAt(k, _c);
				} else {
					_s.set(0.95 * smooth(pop), 0.22, 1.7);
					_p.set(d1x(k), DECK_Y - sag, B1_Z);
					_m.compose(_p, Q_IDENT, _s);
					deck1.setMatrixAt(k, _m);
					_c.copy(SLAB_TONE);
					if (f1 > 0) _c.lerp(CHAR, smooth(f1) * 0.5).lerp(EMBER, recog * 0.4);
					else _c.lerp(EMBER, smooth(pop) * 0.32 * g1);
					deck1.setColorAt(k, _c);
				}
			}
			deck1.instanceMatrix.needsUpdate = true;
			if (deck1.instanceColor) deck1.instanceColor.needsUpdate = true;
		}

		// ── bridge 2: pillars rise from the canyon floor, then the deck ─────
		if (g2 > 0) {
			const pillarPhase = clamp01(g2 / 0.4); // supports first — a different method, visibly
			for (let j = 0; j < PILLARS; j++) {
				const pop = smooth(clamp01(pillarPhase * (PILLARS + 0.5) - j));
				const h = (DECK_Y - 0.1 - CANYON_BOTTOM) * pop;
				_s.set(0.85, Math.max(h, 0.01), 0.85);
				_p.set(pillarX(j), CANYON_BOTTOM + Math.max(h, 0.01) / 2, B2_Z);
				_m.compose(_p, Q_IDENT, _s);
				pillars.setMatrixAt(j, _m);
				_c.copy(SLAB_TONE).multiplyScalar(1.05).lerp(EMBER, pop * 0.2 * (1 - integ));
				pillars.setColorAt(j, _c);
			}
			pillars.instanceMatrix.needsUpdate = true;
			if (pillars.instanceColor) pillars.instanceColor.needsUpdate = true;

			const deckPhase = clamp01((g2 - 0.35) / 0.65);
			for (let k = 0; k < DECK2_N; k++) {
				const pop = smooth(clamp01(deckPhase * (DECK2_N + 1.5) - k));
				_s.set(0.95 * pop, 0.22, 1.7);
				_p.set(d2x(k), d2y(k), B2_Z);
				_m.compose(_p, Q_IDENT, _s);
				deck2.setMatrixAt(k, _m);
				_c.copy(SLAB_TONE).multiplyScalar(1.08).lerp(EMBER, pop * 0.28 * (1 - integ * 0.7));
				deck2.setColorAt(k, _c);
			}
			deck2.instanceMatrix.needsUpdate = true;
			if (deck2.instanceColor) deck2.instanceColor.needsUpdate = true;
		}

		// ── the far side wakes ──────────────────────────────────────────────
		if (integ > 0) {
			for (let i = 0; i < TOWERS; i++) {
				const wake = smooth(clamp01(integ * (TOWERS + 2) * 0.4 - i * 0.3));
				_c.copy(towerCol).lerp(TOWER_LIT, wake);
				district.setColorAt(i, _c);
			}
			if (district.instanceColor) district.instanceColor.needsUpdate = true;
			farLight.intensity = integ * 26;
		} else farLight.intensity = 0;

		// ── attention: red light follows the work ───────────────────────────
		const att =
			o1 * 0.5 + g1 * 0.9 * (1 - f1) + recog * 0.8 + g2 * 0.8 + integ * 0.4 + f1 * (1 - f1) * 0.7;
		attention.intensity = Math.max(att, 0) * 16;
		if (integ > 0.2) {
			attention.position.set(-19, 2.5, 3);
		} else if (g2 > 0) {
			const deckPhase = clamp01((g2 - 0.35) / 0.65);
			const tip = deckPhase > 0 ? Math.min(Math.floor(deckPhase * DECK2_N), DECK2_N - 1) : 0;
			attention.position.set(deckPhase > 0 ? d2x(tip) : pillarX(Math.min(Math.floor(clamp01(g2 / 0.4) * PILLARS), PILLARS - 1)), deckPhase > 0 ? d2y(tip) + 0.8 : -1, B2_Z);
		} else if (recog > 0.01) {
			attention.position.set(-12.5, CANYON_BOTTOM + 1.2, B1_Z); // down at the wreck
		} else if (f1 > 0.4) {
			attention.position.set(d1x(FALL_FROM), -1.5, B1_Z);
		} else if (g1 > 0) {
			const tip = Math.min(Math.floor(g1 * DECK1_N), DECK1_N - 1);
			attention.position.set(d1x(tip), DECK_Y + 0.7, B1_Z);
		} else {
			attention.position.set(CANYON_NEAR + 0.5, 1, -1); // gathered at the rim
		}

		// ── pulses ──────────────────────────────────────────────────────────
		pulseAcc += dt;
		const spawnEvery = (interval: number, fn: () => void) => {
			if (pulseAcc > interval) { pulseAcc = 0; fn(); }
		};
		if (o1 > 0.15 && g1 === 0) {
			// studying the gap: signals run along the near rim and probe the edge
			spawnEvery(0.3 / Math.max(o1, 0.2), () => {
				const z0 = (frand() * 2 - 1) * 12;
				spawnPulse(
					[new V3(CANYON_NEAR + 4 + frand() * 4, 0.5, z0), new V3(CANYON_NEAR + 0.3, 0.5, z0 * 0.3 - 0.7)],
					3.6
				);
			});
		} else if (g1 > 0 && f1 < 0.2) {
			// design 01: signals run out along the growing deck
			spawnEvery(0.28, () => {
				const tip = Math.max(2, Math.min(Math.ceil(g1 * DECK1_N), DECK1_N));
				const path: Vec3[] = [new V3(CANYON_NEAR + 1.5, 0.5, B1_Z)];
				for (let k = 0; k < tip; k++) path.push(new V3(d1x(k), DECK_Y + 0.2, B1_Z));
				spawnPulse(path, 4.2);
			});
		} else if (f1 > 0.2 && f1 < 1) {
			// collapse: signals die at the break point
			spawnEvery(0.4, () => {
				const path: Vec3[] = [new V3(CANYON_NEAR + 1.5, 0.5, B1_Z)];
				for (let k = 0; k <= FALL_FROM; k++) path.push(new V3(d1x(k), DECK_Y + 0.2, B1_Z));
				spawnPulse(path, 2.8, 0.5 + frand() * 0.3);
			});
		} else if (recog > 0.3 && g2 < 0.05) {
			// re-examining: a slow signal descends the cliff and circles the wreck
			spawnEvery(0.7, () => {
				spawnPulse(
					[
						new V3(CANYON_NEAR + 0.3, 0.5, B1_Z),
						new V3(CANYON_NEAR - 0.6, -2.5, B1_Z),
						restPos[4].clone().add(new V3(0, 0.5, 0)),
						restPos[6].clone().add(new V3(0, 0.5, 0))
					],
					1.9
				);
			});
		} else if (g2 > 0.05 && g2 < 1) {
			// design 02: clean synchronized signals along the new line
			spawnEvery(0.5, () => {
				const deckPhase = clamp01((g2 - 0.35) / 0.65);
				const tip = Math.max(1, Math.min(Math.ceil(deckPhase * DECK2_N), DECK2_N));
				const path: Vec3[] = [new V3(CANYON_NEAR + 1.5, 0.5, B2_Z)];
				for (let k = 0; k < tip; k++) path.push(new V3(d2x(k), d2y(k) + 0.2, B2_Z));
				spawnPulse(path, 4.4);
				spawnPulse(path, 4.4, 0.94);
			});
		} else if (integ > 0.05 || p > PHASE.coda[0]) {
			// the payoff: signals cross the finished bridge and fan into the district
			spawnEvery(0.65, () => {
				const path: Vec3[] = [new V3(CANYON_NEAR + 2.5, 0.5, B2_Z)];
				for (let k = 0; k < DECK2_N; k += 2) path.push(new V3(d2x(k), d2y(k) + 0.2, B2_Z));
				path.push(new V3(CANYON_FAR - 1.5, 1.6, B2_Z));
				path.push(new V3(-19.5 - frand() * 4, 2 + frand() * 1.5, 0.5 + (frand() - 0.35) * 8));
				spawnPulse(path, 3.4);
			});
		}
		for (let i = 0; i < MAX_PULSES; i++) {
			const pl = pulses[i];
			if (!pl.active) { pulsePos[i * 3] = 9999; continue; }
			pl.t += (dt * pl.speed) / Math.max(pl.total, 0.001);
			if (pl.t >= pl.killAt) { pl.active = false; pulsePos[i * 3] = 9999; continue; }
			samplePath(pl, _p);
			pulsePos[i * 3] = _p.x;
			pulsePos[i * 3 + 1] = _p.y;
			pulsePos[i * 3 + 2] = _p.z;
		}
		pulseGeo.attributes.position.needsUpdate = true;

		// ── camera ──────────────────────────────────────────────────────────
		sampleCamera(p);
		const damp = 1 - Math.exp(-dt * 2.4);
		camPos.lerp(wantPos, damp);
		camLook.lerp(wantLook, damp);
		camera.position.copy(camPos);
		if (!reduced) {
			camera.position.x += pointer.x * 0.4;
			camera.position.y += pointer.y * 0.25 + Math.sin(elapsed * 0.23) * 0.07;
		}
		camera.lookAt(camLook);

		renderer.render(scene, camera);
	};

	const resize = () => {
		const w = canvas.clientWidth || window.innerWidth;
		const h = canvas.clientHeight || window.innerHeight;
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
		renderer.setSize(w, h, false);
	};
	resize();
	window.addEventListener('resize', resize, { passive: true });
	// The first resize() can run before the canvas has been laid out, leaving a
	// zero-width drawing buffer that only a later window resize would correct.
	// Observing the element itself catches that first layout, and any container
	// resize that does not come with a window resize.
	const ro = new ResizeObserver(resize);
	ro.observe(canvas);
	frame();

	return {
		setProgress(p: number) { pTarget = clamp01(p); },
		setPointer(x: number, y: number) { pointer.x = x; pointer.y = y; },
		dispose() {
			disposed = true;
			cancelAnimationFrame(raf);
			ro.disconnect();
			window.removeEventListener('resize', resize);
			renderer.dispose();
			scene.traverse((o) => {
				const mesh = o as THREE.Mesh;
				if (mesh.geometry) mesh.geometry.dispose();
				const m = mesh.material as THREE.Material | THREE.Material[] | undefined;
				if (Array.isArray(m)) m.forEach((x) => x.dispose());
				else if (m) m.dispose();
			});
		}
	};
}
