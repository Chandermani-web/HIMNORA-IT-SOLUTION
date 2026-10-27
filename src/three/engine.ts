import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { gsap } from '../animations/register';
import { live, onAppReady, setSceneReady, type QualityTier } from '../animations/store';
import { initialTier, MAX_DPR, PARTICLES } from './quality';
import noise from './shaders/noise.glsl?raw';
import particlesVert from './shaders/particles.vert?raw';
import particlesFrag from './shaders/particles.frag?raw';

const ORANGE = 0xff6a00;
const MAX_PARTICLES = PARTICLES[2];
const SHARDS = 60;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const rand = (a: number, b: number) => a + Math.random() * (b - a);

/** Builds the brand "H" (two stems + crossbar) as a single extruded shape. */
function buildHGeometry() {
  const s = 0.2;
  const pts: [number, number][] = [
    [-6, -7], [-2.6, -7], [-2.6, -1.6], [2.6, -1.6], [2.6, -7], [6, -7],
    [6, 7], [2.6, 7], [2.6, 1.6], [-2.6, 1.6], [-2.6, 7], [-6, 7],
  ];
  const shape = new THREE.Shape();
  pts.forEach(([x, y], i) => (i === 0 ? shape.moveTo(x * s, y * s) : shape.lineTo(x * s, y * s)));
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.6,
    bevelEnabled: true,
    bevelSegments: 6,
    bevelSize: 0.04,
    bevelThickness: 0.04,
    curveSegments: 1,
  });
  geo.center();
  return geo;
}

/** A random point inside the H volume (used as shard targets). */
function pointInH(): THREE.Vector3 {
  const r = Math.random();
  let x: number, y: number;
  if (r < 0.4) {
    x = rand(-1.2, -0.52);
    y = rand(-1.4, 1.4);
  } else if (r < 0.8) {
    x = rand(0.52, 1.2);
    y = rand(-1.4, 1.4);
  } else {
    x = rand(-0.52, 0.52);
    y = rand(-0.32, 0.32);
  }
  return new THREE.Vector3(x, y, rand(-0.3, 0.3));
}

function glowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255,140,40,0.95)');
  grad.addColorStop(0.35, 'rgba(255,106,0,0.35)');
  grad.addColorStop(1, 'rgba(255,106,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class HeroEngine {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(35, 1, 0.1, 80);
  private root = new THREE.Group(); // scroll-driven transform
  private rig = new THREE.Group(); // pointer-driven rotation
  private hMesh!: THREE.Mesh;
  private shards!: THREE.InstancedMesh;
  private ico!: THREE.Mesh;
  private ringGroup = new THREE.Group();
  private dot!: THREE.Mesh;
  private glow!: THREE.Sprite;
  private shock!: THREE.Mesh;
  private particles!: THREE.Points;
  private pMat!: THREE.ShaderMaterial;

  private disposables: { dispose: () => void }[] = [];
  private pmrem: THREE.PMREMGenerator;

  private base = { x: 0, y: 0, s: 1 };
  private halfH = 1;
  private halfW = 1;
  private px = 0;
  private py = 0;

  private tier: QualityTier = initialTier();
  private frames = 0;
  private ema = 16;
  private lastCheck = 0;

  private routeVisible: boolean;
  private routeFade = { v: 0 };
  private introDone = false;
  private readyFired = false;
  private disposed = false;
  private offReady: (() => void) | null = null;

  // shards
  private sStart: THREE.Vector3[] = [];
  private sEnd: THREE.Vector3[] = [];
  private sRot: THREE.Euler[] = [];
  private sDelay: number[] = [];
  private shardProg = { v: 0 };
  private dummy = new THREE.Object3D();

  private onContextLost: (e: Event) => void;

  constructor(private canvas: HTMLCanvasElement, initialVisible: boolean, private onFail: () => void) {
    this.routeVisible = initialVisible;
    this.routeFade.v = initialVisible ? 1 : 0;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.onContextLost = (e) => {
      e.preventDefault();
      this.onFail();
    };
    canvas.addEventListener('webglcontextlost', this.onContextLost);

    this.camera.position.set(0, 0, 12);

    // Environment + lights
    this.pmrem = new THREE.PMREMGenerator(this.renderer);
    const envScene = new RoomEnvironment();
    this.scene.environment = this.pmrem.fromScene(envScene, 0.04).texture;
    envScene.dispose();

    const rim = new THREE.PointLight(ORANGE, 45, 24, 2);
    rim.position.set(3.5, 2.5, 4.5);
    const fill = new THREE.PointLight(0x2a3a8a, 30, 24, 2);
    fill.position.set(-4.5, -2, 3.5);
    this.scene.add(rim, fill);

    this.scene.add(this.root);
    this.root.add(this.rig);

    this.buildH();
    this.buildShards();
    this.buildOrbitals();
    this.buildParticles();

    this.applyTier(this.tier);
    this.resize();
    window.addEventListener('resize', this.resize);
    document.addEventListener('visibilitychange', this.onVisibility);

    this.offReady = onAppReady(() => this.playIntro());
  }

  // ------------------------------------------------------------ build
  private track<T extends { dispose: () => void }>(o: T): T {
    this.disposables.push(o);
    return o;
  }

  private buildH() {
    const geo = this.track(buildHGeometry());
    const mat = this.track(
      new THREE.MeshPhysicalMaterial({
        color: 0x0a0a0a,
        metalness: 0.9,
        roughness: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        envMapIntensity: 1.2,
      })
    );
    this.hMesh = new THREE.Mesh(geo, mat);
    this.hMesh.visible = false;
    this.rig.add(this.hMesh);

    // Shockwave ring (fires once after the assembly)
    const sg = this.track(new THREE.TorusGeometry(1, 0.02, 8, 96));
    const sm = this.track(new THREE.MeshBasicMaterial({ color: ORANGE, transparent: true, opacity: 0 }));
    this.shock = new THREE.Mesh(sg, sm);
    this.shock.visible = false;
    this.rig.add(this.shock);
  }

  private buildShards() {
    const geo = this.track(new THREE.BoxGeometry(0.34, 0.2, 0.2));
    const mat = this.hMesh.material as THREE.Material;
    this.shards = new THREE.InstancedMesh(geo, mat, SHARDS);
    for (let i = 0; i < SHARDS; i++) {
      const dir = new THREE.Vector3(rand(-1, 1), rand(-1, 1), rand(-0.3, 1)).normalize();
      this.sStart.push(dir.multiplyScalar(rand(5, 10)));
      this.sEnd.push(pointInH());
      this.sRot.push(new THREE.Euler(rand(-3, 3), rand(-3, 3), rand(-3, 3)));
      this.sDelay.push(Math.random() * 0.35);
    }
    this.writeShards(0);
    this.shards.visible = false; // revealed when the intro starts
    this.rig.add(this.shards);
  }

  private writeShards(v: number) {
    const d = this.dummy;
    for (let i = 0; i < SHARDS; i++) {
      const t = clamp((v - this.sDelay[i]) / 0.65, 0, 1);
      d.position.lerpVectors(this.sStart[i], this.sEnd[i], t);
      d.rotation.set(this.sRot[i].x * (1 - t), this.sRot[i].y * (1 - t), this.sRot[i].z * (1 - t));
      d.scale.setScalar(0.35 + 0.65 * t);
      d.updateMatrix();
      this.shards.setMatrixAt(i, d.matrix);
    }
    this.shards.instanceMatrix.needsUpdate = true;
  }

  private buildOrbitals() {
    // wireframe icosahedron shell
    const ig = this.track(new THREE.IcosahedronGeometry(2.7, 2));
    const im = this.track(
      new THREE.MeshBasicMaterial({ color: ORANGE, wireframe: true, transparent: true, opacity: 0.15 })
    );
    this.ico = new THREE.Mesh(ig, im);
    this.rig.add(this.ico);

    // tilted ring + orbiting orange dot
    const rg = this.track(new THREE.TorusGeometry(2.3, 0.008, 8, 160));
    const rm = this.track(new THREE.MeshBasicMaterial({ color: ORANGE, transparent: true, opacity: 0.55 }));
    this.ringGroup.add(new THREE.Mesh(rg, rm));
    this.ringGroup.rotation.set(1.15, 0.2, 0.4);

    const dg = this.track(new THREE.SphereGeometry(0.11, 24, 24));
    const dm = this.track(new THREE.MeshBasicMaterial({ color: ORANGE }));
    this.dot = new THREE.Mesh(dg, dm);

    const gt = this.track(glowTexture());
    const gm = this.track(new THREE.SpriteMaterial({ map: gt, transparent: true, depthWrite: false }));
    this.glow = new THREE.Sprite(gm);
    this.glow.scale.setScalar(1.1);
    this.dot.add(this.glow);

    this.ringGroup.add(this.dot);
    this.ringGroup.visible = false;
    this.rig.add(this.ringGroup);
  }

  private buildParticles() {
    const geo = this.track(new THREE.BufferGeometry());
    const pos = new Float32Array(MAX_PARTICLES * 3);
    const seed = new Float32Array(MAX_PARTICLES);
    const size = new Float32Array(MAX_PARTICLES);
    for (let i = 0; i < MAX_PARTICLES; i++) {
      // spherical shell, 3 → 8 units
      const r = rand(3, 8);
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(rand(-1, 1));
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos[i * 3 + 2] = r * Math.cos(ph) - 2;
      seed[i] = Math.random();
      size[i] = rand(2.5, 7);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));

    this.pMat = this.track(
      new THREE.ShaderMaterial({
        vertexShader: noise + particlesVert,
        fragmentShader: particlesFrag,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uPointer: { value: new THREE.Vector2(999, 999) },
          uPixelRatio: { value: 1 },
          uProgress: { value: 0 },
          uColorA: { value: new THREE.Color(ORANGE) },
          uColorB: { value: new THREE.Color(0x0a1030) },
        },
      })
    );
    this.particles = new THREE.Points(geo, this.pMat);
    this.particles.frustumCulled = false;
    this.rig.add(this.particles);
  }

  // ------------------------------------------------------------ intro
  private playIntro() {
    if (this.disposed) return;
    this.shards.visible = true;
    gsap
      .timeline({
        onComplete: () => {
          this.introDone = true;
          this.shards.visible = false;
          this.hMesh.visible = true;
          this.ringGroup.visible = true;
          this.fireShockwave();
        },
      })
      .to(this.shardProg, {
        v: 1,
        duration: 2.2,
        ease: 'power4.out',
        onUpdate: () => this.writeShards(this.shardProg.v),
      })
      .to(this.pMat.uniforms.uProgress, { value: 1, duration: 2.4, ease: 'power2.out' }, 0.2);
  }

  private fireShockwave() {
    const mat = this.shock.material as THREE.MeshBasicMaterial;
    this.shock.visible = true;
    this.shock.scale.setScalar(0.6);
    mat.opacity = 0.9;
    gsap.to(this.shock.scale, { x: 7, y: 7, z: 7, duration: 1.4, ease: 'expo.out' });
    gsap.to(mat, {
      opacity: 0,
      duration: 1.4,
      ease: 'power2.out',
      onComplete: () => {
        this.shock.visible = false;
      },
    });
    gsap.fromTo(this.hMesh.scale, { x: 1.06, y: 1.06, z: 1.06 }, { x: 1, y: 1, z: 1, duration: 1.2, ease: 'himnora' });
  }

  // ------------------------------------------------------------ public
  setRouteVisible(v: boolean) {
    this.routeVisible = v;
    gsap.to(this.routeFade, { v: v ? 1 : 0, duration: 0.8, ease: 'power2.inOut', overwrite: true });
  }

  start() {
    gsap.ticker.add(this.tick);
  }

  dispose() {
    this.disposed = true;
    gsap.ticker.remove(this.tick);
    this.offReady?.();
    gsap.killTweensOf([this.routeFade, this.shardProg, this.pMat?.uniforms?.uProgress, this.shock?.scale, this.hMesh?.scale]);
    window.removeEventListener('resize', this.resize);
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.canvas.removeEventListener('webglcontextlost', this.onContextLost);
    this.shards?.dispose();
    this.disposables.forEach((d) => d.dispose());
    (this.scene.environment as THREE.Texture | null)?.dispose();
    this.pmrem.dispose();
    this.renderer.dispose();
  }

  // ------------------------------------------------------------ internals
  private onVisibility = () => {
    /* tick() checks document.hidden every frame */
  };

  private applyTier(t: QualityTier) {
    this.tier = t;
    live.quality = t;
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR[t]);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.pMat.uniforms.uPixelRatio.value = dpr;
    this.particles.geometry.setDrawRange(0, PARTICLES[t]);
    this.ico.visible = t >= 1;
  }

  private resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    const aspect = w / h;
    this.halfH = Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)) * this.camera.position.z;
    this.halfW = this.halfH * aspect;
    const wide = aspect > 1.15 && w >= 900;
    if (wide) {
      this.base.x = this.halfW * 0.55;
      this.base.y = -0.1;
      this.base.s = Math.min(1.5, this.halfW * 0.23);
    } else {
      this.base.x = this.halfW * 0.5;
      this.base.y = this.halfH * 0.62;
      this.base.s = Math.min(0.62, this.halfW * 0.2);
    }
  };

  /** Rolling frame-time governor. Only ever steps DOWN a tier. */
  private govern(dtMs: number) {
    this.frames++;
    this.ema += (dtMs - this.ema) * 0.08;
    if (this.tier === 0) return;
    const warm = this.frames >= 60;
    if (warm && this.ema > 22 && this.frames - this.lastCheck > 90) {
      this.lastCheck = this.frames;
      this.applyTier((this.tier - 1) as QualityTier);
    }
  }

  private tick = (timeSec: number, deltaMs: number) => {
    if (this.disposed || document.hidden) return;

    const sp = clamp(window.scrollY / window.innerHeight, 0, 1.3);
    const scrollFade = 1 - clamp((sp - 0.35) / 0.6, 0, 1);
    const opacity = this.routeFade.v * scrollFade;
    this.canvas.style.opacity = String(opacity);

    if (!this.readyFired && this.frames >= 2) {
      this.readyFired = true;
      setSceneReady();
    }

    // Off-screen / hidden route: skip the work entirely
    if (opacity < 0.01) {
      this.frames++;
      return;
    }

    this.govern(deltaMs);

    const t = timeSec;
    this.pMat.uniforms.uTime.value = t;

    // pointer easing (lerp 0.06)
    this.px += (live.pointer.x - this.px) * 0.06;
    this.py += (live.pointer.y - this.py) * 0.06;
    this.rig.rotation.y = this.px * 0.38 + Math.sin(t * 0.3) * 0.06;
    this.rig.rotation.x = -this.py * 0.22 + Math.sin(t * 0.4 + 1.3) * 0.03;

    // scroll: drift up + shrink a little
    this.root.position.set(this.base.x, this.base.y + sp * 3.2 + Math.sin(t * 0.8) * 0.08, 0);
    this.root.scale.setScalar(this.base.s * (1 - 0.25 * sp));

    // orbitals
    if (this.ico.visible) {
      this.ico.rotation.y = -t * 0.12;
      this.ico.rotation.x = t * 0.07;
    }
    const a = t * 0.9;
    this.dot.position.set(Math.cos(a) * 2.3, Math.sin(a) * 2.3, 0);
    this.ringGroup.rotation.z = 0.4 + Math.sin(t * 0.2) * 0.1;

    // pointer in the scene plane (for particle repulsion)
    const pu = this.pMat.uniforms.uPointer.value as THREE.Vector2;
    if (live.pointer.px < -1000) pu.set(999, 999);
    else pu.set(live.pointer.x * this.halfW - this.root.position.x, live.pointer.y * this.halfH - this.root.position.y);
    // particles live inside rig, which is scaled; compensate so repulsion radius stays in screen space
    pu.divideScalar(this.root.scale.x || 1);

    this.renderer.render(this.scene, this.camera);
  };
}
