// 首屏场景：three.js 透视建模。近景是一张工业工作台，背后是线描风格的工厂车间。
// 滚动时镜头后退，整个工作台成为首页主视觉。
// 配色只用 01-tokens 的灰阶、黑阶与品牌绿。只依赖公开的 three.js。
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

// ---------- Tier0 token 色阶 ----------
const T = {
  g25: '#FAFAFA', g50: '#F9F9F9', g100: '#F3F3F3', g200: '#EBEBEB', g300: '#D9D9D9', g400: '#878787', g500: '#737373',
  b500: '#343434', b600: '#242424', b700: '#1C1F1E', b900: '#050B14',
  green: '#B2ED1D', green300: '#CBF368', green200: '#DCF797', green700: '#7EA815',
}

type MatKey = 'ink' | 'peg' | 'alu' | 'laminate' | 'paint' | 'housing' | 'plastic' | 'rubber' | 'bin' | 'led' | 'light' | 'glass' | 'hall' | 'hallWall' | 'hallDark' | 'scenery' | 'sceneryMetal'
type Edge = 'near' | 'far' | 'none'

function brushedTexture(base: string) {
  const c = document.createElement('canvas')
  c.width = c.height = 512
  const g = c.getContext('2d')!
  g.fillStyle = base
  g.fillRect(0, 0, 512, 512)
  for (let i = 0; i < 3200; i++) {
    const y = Math.random() * 512
    g.strokeStyle = Math.random() > 0.5 ? `rgba(255,255,255,${Math.random() * 0.35})` : `rgba(52,52,52,${Math.random() * 0.12})`
    g.lineWidth = Math.random() * 1.1
    const x = Math.random() * 512
    g.beginPath()
    g.moveTo(x - 220, y)
    g.lineTo(x + 220, y)
    g.stroke()
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(3, 3)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function factoryTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 256
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#f1f1f1'
  ctx.fillRect(0, 0, 256, 256)
  let seed = 17
  for (let i = 0; i < 2400; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0
    const x = seed & 255
    const y = (seed >>> 8) & 255
    ctx.fillStyle = seed & 1 ? 'rgba(50,50,50,.045)' : 'rgba(255,255,255,.13)'
    ctx.fillRect(x, y, 1, 1)
  }
  ctx.strokeStyle = 'rgba(70,70,70,.16)'
  ctx.lineWidth = 1
  for (const p of [1, 128, 255]) {
    ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, 256); ctx.stroke()
  }
  ctx.strokeStyle = 'rgba(70,70,70,.12)'
  for (const p of [32, 224]) {
    ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(256, p); ctx.stroke()
  }
  ctx.fillStyle = 'rgba(70,70,70,.045)'
  for (let x = 16; x < 256; x += 32) ctx.fillRect(x, 0, 2, 256)
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

/** 屏幕内容。 */
class Screen {
  canvas = document.createElement('canvas')
  texture: THREE.CanvasTexture
  constructor(private kind: 'main' | 'tree' | 'scope' | 'psu') {
    const big = kind === 'main'
    this.canvas.width = big ? 880 : 400
    this.canvas.height = big ? 520 : 260
    this.texture = new THREE.CanvasTexture(this.canvas)
    this.texture.colorSpace = THREE.SRGBColorSpace
    this.texture.anisotropy = 8
    this.draw(0)
  }
  draw(t: number) {
    const g = this.canvas.getContext('2d')!
    const W = this.canvas.width
    const H = this.canvas.height
    const ink = T.b900
    const mute = T.g500
    g.fillStyle = '#FFFFFF'
    g.fillRect(0, 0, W, H)
    g.strokeStyle = T.g300
    g.lineWidth = 2
    if (this.kind === 'main') {
      g.font = '500 24px "IBM Plex Sans", sans-serif'
      g.fillStyle = ink
      g.fillText('Factory-A / Line-01', 28, 46)
      g.fillStyle = T.green
      g.fillRect(W - 128, 30, 14, 14)
      g.fillStyle = ink
      g.fillText('运行中', W - 104, 46)
      g.beginPath(); g.moveTo(0, 70); g.lineTo(W, 70); g.stroke()
      const rows: [string, number, boolean][] = [['Factory-A', 0, false], ['Line-01', 1, false], ['CNC-03', 2, true], ['Metrics', 3, false], ['State', 3, false], ['Action', 3, false]]
      g.font = '22px "IBM Plex Sans", sans-serif'
      rows.forEach(([s, lv, on], i) => {
        const y = 94 + i * 44
        if (on) { g.fillStyle = '#F2FBD9'; g.fillRect(16, y - 6, 400, 38); g.fillStyle = T.green; g.fillRect(16, y - 6, 4, 38) }
        g.fillStyle = on ? T.green : ink
        g.fillRect(32 + lv * 26, y + 8, 10, 10)
        g.fillStyle = ink
        g.fillText(s, 54 + lv * 26, y + 21)
      })
      g.beginPath(); g.moveTo(436, 70); g.lineTo(436, H); g.stroke()
      const v = 72.2 + Math.sin(t / 900) * 0.7
      const pct = 0.68 + Math.sin(t / 1300) * 0.06
      g.fillStyle = mute
      g.fillText('主轴温度', 468, 120)
      g.textAlign = 'right'
      g.fillText(`${Math.round(pct * 100)}%`, W - 32, 120)
      g.textAlign = 'left'
      g.fillStyle = ink
      g.font = '600 132px Inter, sans-serif'
      g.fillText(v.toFixed(1), 462, 256)
      const tw = g.measureText(v.toFixed(1)).width
      g.font = '26px "IBM Plex Sans", sans-serif'
      g.fillStyle = mute
      g.fillText('°C', 474 + tw, 256)
      g.fillStyle = T.g100
      g.fillRect(468, 290, W - 500, 16)
      g.fillStyle = T.green
      g.fillRect(468, 290, (W - 500) * pct, 16)
      for (let i = 0; i < 4; i++) {
        g.strokeRect(468 + i * 96, 340, 80, 120)
        g.fillStyle = i === 1 ? T.green : T.g300
        g.fillRect(480 + i * 96, 352, 10, 10)
      }
    } else if (this.kind === 'tree') {
      const nodes: [number, number][] = [[70, 56], [200, 56], [330, 56], [135, 140], [265, 140], [200, 215]]
      const links = [[0, 3], [1, 3], [1, 4], [2, 4], [3, 5], [4, 5]]
      g.strokeStyle = T.g400
      links.forEach(([a, b]) => { g.beginPath(); g.moveTo(...nodes[a]); g.lineTo(...nodes[b]); g.stroke() })
      nodes.forEach(([x, y], i) => { g.fillStyle = i === 5 ? T.green : '#FFFFFF'; g.fillRect(x - 11, y - 11, 22, 22); g.strokeStyle = ink; g.strokeRect(x - 11, y - 11, 22, 22) })
      const k = (t / 1500) % 1
      g.fillStyle = T.green
      g.fillRect(70 + 65 * k - 5, 56 + 84 * k - 5, 10, 10)
    } else if (this.kind === 'scope') {
      g.fillStyle = T.b700
      g.fillRect(0, 0, W, H)
      g.strokeStyle = T.b500
      g.lineWidth = 1
      for (let i = 1; i < 8; i++) { g.beginPath(); g.moveTo((W / 8) * i, 0); g.lineTo((W / 8) * i, H); g.stroke() }
      for (let i = 1; i < 5; i++) { g.beginPath(); g.moveTo(0, (H / 5) * i); g.lineTo(W, (H / 5) * i); g.stroke() }
      g.strokeStyle = T.green
      g.lineWidth = 3
      g.beginPath()
      for (let x = 0; x <= W; x += 4) {
        const y = H / 2 + Math.sin(x / 26 + t / 260) * 50 * Math.sin(x / 140 + t / 900)
        if (x) g.lineTo(x, y); else g.moveTo(x, y)
      }
      g.stroke()
    } else {
      g.fillStyle = T.b700
      g.fillRect(0, 0, W, H)
      g.fillStyle = T.green
      g.font = '600 96px "IBM Plex Mono", monospace'
      g.fillText((24 + Math.sin(t / 1100) * 0.02).toFixed(2), 24, 120)
      g.font = '28px "IBM Plex Mono", monospace'
      g.fillStyle = T.g400
      g.fillText('V   1.20 A', 30, 200)
    }
    this.texture.needsUpdate = true
  }
}

export class Workbench {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(34, 1, 0.05, 120)
  private root = new THREE.Group()
  private mats: Record<MatKey, THREE.Material>
  private edgeNear = new THREE.LineBasicMaterial({ color: T.b500, transparent: true, opacity: 0.38 })
  private edgeFar = new THREE.LineBasicMaterial({ color: T.g400, transparent: true, opacity: 0.35 })
  private gridMat = new THREE.LineBasicMaterial({ color: T.g400, transparent: true, opacity: 0.22 })
  private cableMat = new THREE.MeshStandardMaterial({ color: T.b600, roughness: 0.5 })
  private holeMat = new THREE.MeshBasicMaterial({ color: T.g500, toneMapped: false })
  private pegMat = new THREE.MeshBasicMaterial({ color: T.green700, toneMapped: false })
  private axisMat = new THREE.LineBasicMaterial({ color: T.b500, transparent: true, opacity: 0, depthWrite: false })
  private screens: Screen[] = []
  private flows: THREE.ShaderMaterial[] = []
  private leds: { mesh: THREE.Mesh; phase: number }[] = []
  private movers: ((t: number) => void)[] = []
  private anchors: { el: HTMLElement; pos: THREE.Vector3 }[] = []
  private progress = 0
  private raf = 0
  private visible = true
  private lastScreen = 0
  private aspect = 1
  private mouse = new THREE.Vector2()
  private pan = new THREE.Vector2()
  private io: IntersectionObserver
  private ro: ResizeObserver
  private reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

  constructor(private host: HTMLElement) {
    const canvas = host.querySelector('canvas')!
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.NeutralToneMapping
    this.renderer.toneMappingExposure = 1.0
    const pmrem = new THREE.PMREMGenerator(this.renderer)
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.03).texture
    this.scene.background = new THREE.Color(T.b900)
    this.scene.fog = new THREE.Fog(T.b900, 6, 28)

    const brushed = brushedTexture(T.g200)
    const brushedDark = brushedTexture(T.g400)
    const finish = factoryTexture()
    const concrete = factoryTexture()
    concrete.repeat.set(18, 38)
    this.mats = {
      alu: new THREE.MeshStandardMaterial({ color: '#ffffff', map: brushed, roughnessMap: brushed, metalness: 0.9, roughness: 0.28, envMapIntensity: 1.6 }),
      ink: new THREE.MeshStandardMaterial({ color: T.b900, metalness: 0.25, roughness: 0.42, envMapIntensity: 0.9 }),
      peg: new THREE.MeshBasicMaterial({ color: T.green, toneMapped: false }),
      laminate: new THREE.MeshStandardMaterial({ color: T.g100, roughness: 0.75 }),
      paint: new THREE.MeshStandardMaterial({ color: T.g50, roughness: 0.85 }),
      housing: new THREE.MeshStandardMaterial({ color: T.g300, map: brushedDark, metalness: 0.55, roughness: 0.45 }),
      plastic: new THREE.MeshStandardMaterial({ color: T.b600, roughness: 0.55 }),
      rubber: new THREE.MeshStandardMaterial({ color: T.b700, roughness: 0.9 }),
      bin: new THREE.MeshStandardMaterial({ color: T.green300, roughness: 0.6 }),
      led: new THREE.MeshBasicMaterial({ color: T.green, toneMapped: false }),
      light: new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false }),
      glass: new THREE.MeshStandardMaterial({ color: '#ffffff', transparent: true, opacity: 0.25, roughness: 0.1, metalness: 0 }),
      hall: new THREE.MeshStandardMaterial({ color: '#111820', map: concrete, roughness: 1 }),
      hallWall: new THREE.MeshBasicMaterial({ color: T.b900, fog: false, toneMapped: false }),
      scenery: new THREE.MeshStandardMaterial({ color: T.g50, map: finish, roughness: 0.9 }),
      sceneryMetal: new THREE.MeshStandardMaterial({ color: T.g200, map: finish, metalness: 0.2, roughness: 0.72 }),
      hallDark: new THREE.MeshStandardMaterial({ color: '#232b32', roughness: 1 }),
    }

    this.scene.add(new THREE.HemisphereLight('#ffffff', T.g300, 1.2))
    const key = new THREE.DirectionalLight('#ffffff', 1.5)
    key.position.set(3, 6, 6)
    this.scene.add(key)
    const rim = new THREE.DirectionalLight('#ffffff', 0.5)
    rim.position.set(-4, 3, 2)
    this.scene.add(rim)
    this.scene.add(this.root)
    this.buildHall()
    this.buildBench(0, 0, true)
    // 透视轴线：随后退逐渐出现，汇向灭点
    // 透视轴线：一点透视的「方盒」——工作台四个外角（左上、右上、左下、右下）
    // 沿纵深方向的平行线，往后汇向灭点、往前延伸到镜头，四根一组，不加其它方向的线
    const ap: number[] = []
    for (const x of [-1.52, 1.52]) for (const y of [0.002, 2.37]) { ap.push(x, y, 0.43, x, y, 14); ap.push(x, y, 0.43, x, y, -20) }
    const ag = new THREE.BufferGeometry()
    ag.setAttribute('position', new THREE.Float32BufferAttribute(ap, 3))
    const axes = new THREE.LineSegments(ag, this.axisMat)
    axes.renderOrder = -1
    this.scene.add(axes)
    this.applyTheme()

    this.io = new IntersectionObserver(([e]) => { this.visible = e.isIntersecting })
    this.io.observe(host)
    this.ro = new ResizeObserver(() => this.resize())
    this.ro.observe(host.querySelector('.wb-stage') as HTMLElement)
    this.resize()
    this.loop(0)
  }

  // ---------- primitives ----------
  private mesh(geo: THREE.BufferGeometry, key: MatKey, x: number, y: number, z: number, edge: Edge = 'near', parent: THREE.Object3D = this.root) {
    const m = new THREE.Mesh(geo, this.mats[key])
    m.position.set(x, y, z)
    if (edge !== 'none') m.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 40), edge === 'near' ? this.edgeNear : this.edgeFar))
    parent.add(m)
    return m
  }
  private box(w: number, h: number, d: number, key: MatKey, x: number, y: number, z: number, edge: Edge = 'near', parent?: THREE.Object3D) {
    const r = Math.min(w, h, d) * 0.12
    const geo = r > 0.002 && edge === 'near' ? new RoundedBoxGeometry(w, h, d, 2, Math.min(r, 0.008)) : new THREE.BoxGeometry(w, h, d)
    return this.mesh(geo, key, x, y, z, edge, parent)
  }
  private cyl(r: number, len: number, key: MatKey, x: number, y: number, z: number, axis: 'x' | 'y' | 'z' = 'y', edge: Edge = 'near', parent?: THREE.Object3D) {
    const m = this.mesh(new THREE.CylinderGeometry(r, r, len, 32), key, x, y, z, edge, parent)
    if (axis === 'x') m.rotation.z = Math.PI / 2
    if (axis === 'z') m.rotation.x = Math.PI / 2
    return m
  }
  private led(x: number, y: number, z: number, s = 0.012, parent?: THREE.Object3D) {
    const m = this.box(s, s, 0.005, 'led', x, y, z, 'none', parent)
    this.leds.push({ mesh: m, phase: Math.random() * 6.28 })
    return m
  }
  private tube(pts: [number, number, number][], r: number, mat: THREE.Material) {
    const c = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)))
    this.root.add(new THREE.Mesh(new THREE.TubeGeometry(c, 64, r, 8), mat))
    return c
  }
  private screen(s: Screen, w: number, h: number, x: number, y: number, z: number, parent: THREE.Object3D = this.root) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: s.texture, toneMapped: false }))
    m.position.set(x, y, z)
    parent.add(m)
    this.screens.push(s)
  }
  /** 数据流：线缆本身发光。绿色脉冲带一段渐隐的尾迹沿线缆滑动，没有额外几何体。 */
  private flow(pts: [number, number, number][], n: number, speed: number) {
    const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)))
    const len = curve.getLength()
    const mat = new THREE.ShaderMaterial({
      fog: true,
      uniforms: {
        ...THREE.UniformsUtils.clone(THREE.UniformsLib.fog),
        uTime: { value: 0 }, uLen: { value: len }, uN: { value: n }, uSpeed: { value: speed * 2.2 }, uOffset: { value: Math.random() },
        uBase: { value: new THREE.Color(T.b600) }, uGlow: { value: new THREE.Color(T.green) }, uCore: { value: new THREE.Color('#F7FDE8') },
      },
      vertexShader: `#include <fog_pars_vertex>
        varying vec2 vUv; varying vec3 vN;
        void main(){ vUv = uv; vN = normalize(normalMatrix * normal); vec4 mvPosition = modelViewMatrix * vec4(position,1.0); gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
        }`,
      fragmentShader: `
        #include <fog_pars_fragment>
        uniform float uTime, uLen, uN, uSpeed, uOffset; uniform vec3 uBase, uGlow, uCore;
        varying vec2 vUv; varying vec3 vN;
        void main(){
          float s = vUv.x * uLen;
          float period = uLen / uN;
          float head = (uTime * uSpeed + uOffset) * uLen;
          float d = mod(head - s, period);
          float tail = smoothstep(0.0, 1.0, exp(-d / 0.04));
          float core = 1.0 - smoothstep(0.0, 0.016, d);
          float shade = 0.72 + 0.28 * clamp(vN.y * 0.5 + vN.z * 0.5 + 0.5, 0.0, 1.0);
          vec3 c = mix(uBase * shade, uGlow, tail) + uGlow * tail * 0.25;
          c = mix(c, uCore, core * 0.65);
          gl_FragColor = vec4(c, 1.0);
          #include <fog_fragment>
        }`,
    })
    this.root.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 160, 0.0034, 10), mat))
    this.flows.push(mat)
  }

  // ---------- 工作台 ----------
  private buildBench(ox: number, oz: number, hero: boolean) {
    const F = 0.925
    const g = new THREE.Group()
    g.position.set(ox, 0, oz)
    this.root.add(g)
    const e: Edge = hero ? 'near' : 'far'
    // 背景工作台用场景材质，深色模式下统一压暗，不抢主工作台
    const bg = (k: MatKey): MatKey => hero ? k : k === 'alu' || k === 'housing' ? 'sceneryMetal' : k === 'paint' || k === 'laminate' ? 'scenery' : k
    const B = (w: number, h: number, d: number, k: MatKey, x: number, y: number, z: number, edge: Edge = e) => this.box(w, h, d, bg(k), x, y, z, edge, g)
    const C = (r: number, l: number, k: MatKey, x: number, y: number, z: number, a: 'x' | 'y' | 'z' = 'y', edge: Edge = e) => this.cyl(r, l, k ? bg(k) : k, x, y, z, a, edge, g)

    // 框架
    B(3.0, 0.045, 0.85, hero ? 'ink' : 'laminate', 0, F - 0.0225, 0)
    B(3.02, 0.022, 0.86, 'alu', 0, F - 0.056, 0)
    B(2.6, 0.07, 0.05, 'alu', 0, F - 0.1, 0.38)
    for (const x of [-1.32, 1.32]) {
      B(0.09, F - 0.1, 0.09, 'alu', x, (F - 0.1) / 2, 0)
      B(0.34, 0.05, 0.72, 'alu', x, 0.025, 0)
      B(0.06, 0.02, 0.06, 'rubber', x, 0.01, 0.33)
      B(0.065, 1.3, 0.065, 'alu', x, F + 0.65, -0.38)
      B(0.012, 1.26, 0.004, 'plastic', x, F + 0.65, -0.346, 'none')
      B(0.012, F - 0.16, 0.004, 'plastic', x, (F - 0.1) / 2, 0.046, 'none')
    }
    B(2.58, 0.05, 0.05, 'alu', 0, 0.3, 0)
    B(2.76, 0.06, 0.08, 'housing', 0, F + 1.33, -0.38)
    B(2.3, 0.07, 0.24, 'housing', 0, F + 1.42, -0.18)
    B(2.2, 0.016, 0.18, 'light', 0, F + 1.382, -0.18, 'none')
    B(2.58, 0.92, 0.015, hero ? 'peg' : 'paint', 0, F + 0.56, -0.4)
    if (!hero) return

    // 设备造型：白色哑光壳体 + 大圆角 + 圆形旋钮 + 网格孔（博朗 / Teenage Engineering）。
    // 品牌绿只用于信号：指示灯、数据脉冲、屏幕里的状态。实物一律中性色。
    const R = (w: number, h: number, d: number, r: number, k: MatKey, x: number, y: number, z: number) =>
      this.mesh(new RoundedBoxGeometry(w, h, d, 4, r), k, x, y, z, 'near', g)
    const knob = (r: number, x: number, y: number, z: number, k: MatKey = 'plastic') => {
      C(r, 0.016, k, x, y, z + 0.008, 'z')
      B(0.003, r * 0.9, 0.003, 'paint', x, y + r * 0.45, z + 0.017, 'none')
    }
    const grille = (cols: number, rows: number, step: number, x: number, y: number, z: number) => {
      const pts: THREE.Vector3[] = []
      for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) pts.push(new THREE.Vector3(x + i * step, y - j * step, z))
      const im = new THREE.InstancedMesh(new THREE.CircleGeometry(step * 0.28, 12), this.holeMat, pts.length)
      pts.forEach((p, i) => im.setMatrixAt(i, new THREE.Matrix4().makeTranslation(p.x, p.y, p.z)))
      g.add(im)
    }
    /** 屏幕：铝外框 + 深色细内框 + 画面，边界清楚但不压重。 */
    const display = (scr: Screen, w: number, h: number, x: number, y: number, z: number, frame = 0.022, k: MatKey = 'alu') => {
      R(w + frame * 2, h + frame * 2, 0.026, 0.01, k, x, y, z)
      B(w + 0.008, h + 0.008, 0.002, 'housing', x, y, z + 0.0135, 'none')
      this.screen(scr, w, h, x, y, z + 0.0148, g)
    }

    B(3.0, 0.01, 0.01, 'housing', 0, F - 0.03, 0.428, 'none')
    // 洞洞板：整块背板均匀打孔，浅灰
    const holes: THREE.Vector3[] = []
    const step = 0.04
    for (let x = -1.26; x <= 1.261; x += step) for (let y = F + 0.13; y <= F + 1.0; y += step) holes.push(new THREE.Vector3(x, y, -0.391))
    const hm = new THREE.InstancedMesh(new THREE.CircleGeometry(0.0045, 10), this.pegMat, holes.length)
    holes.forEach((p, i) => hm.setMatrixAt(i, new THREE.Matrix4().makeTranslation(p.x, p.y, p.z)))
    g.add(hm)
    for (const x of [-1.27, -0.02, 1.27]) for (const y of [F + 0.13, F + 0.99]) C(0.007, 0.004, 'alu', x, y, -0.39, 'z', 'none')

    for (const x of [-1.27, -0.02, 1.27]) for (const y of [F + 0.13, F + 0.99]) C(0.007, 0.004, 'alu', x, y, -0.39, 'z', 'none')
    for (const x of [-1.32, 1.32]) {
      B(0.05, 0.022, 0.003, 'plastic', x, F + 1.2, -0.346, 'none')
      B(0.03, 0.006, 0.002, 'alu', x, F + 1.2, -0.344, 'none')
    }
    // 台面下方拖链（线缆槽）
    for (let i = 0; i < 18; i++) B(0.045, 0.03, 0.05, 'plastic', -1.1 + i * 0.048, F - 0.14, -0.3, 'none')

    // ---- 左：工具墙（洞洞板 + 挂具）与零件抽屉柜 ----
    for (let i = 0; i < 4; i++) {
      const x = -1.18 + i * 0.05
      C(0.006, 0.16, 'alu', x, F + 0.33, -0.37)
      C(0.011, 0.07, i % 2 ? 'plastic' : 'bin', x, F + 0.44, -0.37)
    }
    for (let i = 0; i < 2; i++) B(0.012, 0.15, 0.01, 'plastic', -0.92 + i * 0.03, F + 0.32, -0.37)
    B(0.05, 0.05, 0.012, 'alu', -0.905, F + 0.42, -0.37)
    for (let i = 0; i < 3; i++) {
      C(0.04, 0.03, i === 1 ? 'bin' : 'housing', -0.74 + i * 0.1, F + 0.4, -0.36, 'z')
      C(0.016, 0.034, 'paint', -0.74 + i * 0.1, F + 0.4, -0.36, 'z')
    }
    C(0.045, 0.05, 'plastic', -0.5, F + 0.24, -0.36, 'z')
    // 零件抽屉柜
    B(0.66, 0.36, 0.2, 'paint', -0.92, F + 0.72, -0.3)
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) {
      const x = -1.18 + c * 0.13
      const y = F + 0.6 + r * 0.08
      B(0.115, 0.068, 0.012, 'housing', x, y, -0.196)
      B(0.04, 0.008, 0.008, 'plastic', x, y - 0.018, -0.186, 'none')
    }
    // ---- 右：百叶孔板 + 仪器层板 ----
    B(1.2, 0.025, 0.3, 'ink', 0.65, F + 0.86, -0.27)
    for (const x of [0.1, 1.2]) B(0.02, 0.06, 0.26, 'ink', x, F + 0.83, -0.27)
    B(0.4, 0.2, 0.26, 'paint', 0.32, F + 0.972, -0.27)
    display(new Screen('scope'), 0.21, 0.13, 0.27, F + 0.975, -0.15, 0.012)
    for (let i = 0; i < 3; i++) C(0.013, 0.02, i === 0 ? 'bin' : 'plastic', 0.455, F + 1.03 - i * 0.045, -0.13, 'z')
    B(0.3, 0.14, 0.24, 'housing', 0.72, F + 0.942, -0.27)
    this.screen(new Screen('psu'), 0.12, 0.06, 0.66, F + 0.96, -0.149, g)
    C(0.016, 0.02, 'plastic', 0.8, F + 0.96, -0.144, 'z')
    C(0.008, 0.02, 'bin', 0.78, F + 0.905, -0.144, 'z')
    C(0.008, 0.02, 'plastic', 0.83, F + 0.905, -0.144, 'z')
    B(0.12, 0.3, 0.08, 'alu', 1.42, F + 0.6, -0.34)
    C(0.02, 0.022, 'led', 1.42, F + 0.68, -0.29, 'z', 'none')
    C(0.02, 0.022, 'plastic', 1.42, F + 0.6, -0.29, 'z')
    C(0.02, 0.022, 'housing', 1.42, F + 0.52, -0.29, 'z')

    // ---- 主屏 ----
    B(0.035, 0.24, 0.035, 'ink', 0.05, F + 0.2, -0.33)
    B(0.2, 0.012, 0.15, 'ink', 0.05, F + 0.006, -0.3)
    display(new Screen('main'), 0.86, 0.5, 0.05, F + 0.52, -0.315, 0.024, 'ink')

    // ---- 台面左：放大镜灯、焊台、元件盘 ----
    B(0.22, 0.1, 0.16, 'housing', -0.72, F + 0.05, 0.18)
    this.led(-0.66, F + 0.07, 0.262, 0.012, g)
    B(0.06, 0.02, 0.006, 'plastic', -0.76, F + 0.06, 0.262, 'none')
    C(0.025, 0.06, 'alu', -0.55, F + 0.03, 0.2)
    const iron = C(0.008, 0.18, 'plastic', -0.53, F + 0.1, 0.2)
    iron.rotation.z = 0.5
    B(0.26, 0.012, 0.2, 'paint', -0.3, F + 0.006, 0.2)
    for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) B(0.05, 0.014, 0.07, c === 2 && r === 0 ? 'bin' : 'laminate', -0.39 + c * 0.06, F + 0.016, 0.16 + r * 0.08, 'none')

    // ---- 台面中后：PLC 托架 + 端子 + 接线 ----
    B(1.0, 0.02, 0.24, 'alu', -0.62, F + 0.01, -0.16)
    B(0.14, 0.2, 0.13, 'housing', -1.04, F + 0.12, -0.2)
    this.led(-1.07, F + 0.06, -0.133, 0.014, g)
    for (let i = 0; i < 6; i++) {
      const x = -0.9 + i * 0.085
      const h = i === 0 ? 0.2 : 0.17
      B(0.078, h, 0.12, i < 2 ? 'plastic' : 'housing', x, F + 0.02 + h / 2, -0.2)
      for (let k = 0; k < 3; k++) this.led(x - 0.02, F + 0.02 + h - 0.03 - k * 0.02, -0.138, 0.01, g)
    }
    for (let i = 0; i < 10; i++) B(0.018, 0.06, 0.06, i % 4 === 3 ? 'housing' : 'bin', -0.37 + i * 0.022, F + 0.05, -0.2)
    for (let i = 0; i < 10; i++) {
      const x = -0.37 + i * 0.022
      this.tube([[x, F + 0.02, -0.17], [x, F + 0.012, -0.1], [x - 0.05 + i * 0.008, F + 0.012, -0.02]], 0.0022, i % 4 === 1 ? this.mats.bin : this.cableMat)
    }

    // ---- 台面右：边缘盒子、交换机、键盘 ----
    B(0.38, 0.11, 0.24, 'plastic', 0.95, F + 0.055, -0.12)
    for (let i = 0; i < 9; i++) B(0.005, 0.07, 0.005, 'alu', 0.82 + i * 0.02, F + 0.055, 0.001, 'none')
    this.led(1.08, F + 0.08, 0.002, 0.016, g)
    B(0.4, 0.04, 0.2, 'alu', 0.55, F + 0.02, -0.2)
    for (let i = 0; i < 8; i++) B(0.03, 0.018, 0.005, 'plastic', 0.4 + i * 0.042, F + 0.02, -0.098, 'none')
    B(0.46, 0.016, 0.15, 'alu', 0.12, F + 0.008, 0.22)
    for (let r = 0; r < 3; r++) for (let c = 0; c < 12; c++) B(0.028, 0.006, 0.028, c === 11 && r === 0 ? 'bin' : 'paint', -0.085 + c * 0.037, F + 0.019, 0.17 + r * 0.04, 'none')
    B(0.06, 0.02, 0.1, 'paint', 0.45, F + 0.01, 0.22)
    // 两侧小屏：立柱夹座 + 两节铝摆臂 + 关节 + VESA 背板，屏幕不再悬空
    const link = (a: THREE.Vector3, b: THREE.Vector3, r: number, k: MatKey) => {
      const d = new THREE.Vector3().subVectors(b, a)
      const m = this.mesh(new THREE.CylinderGeometry(r, r, d.length(), 24), k, (a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2, 'near', g)
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize())
    }
    const arm = (s: number, y: number) => {
      B(0.1, 0.09, 0.1, 'ink', s * 1.32, y, -0.38)
      C(0.008, 0.004, 'alu', s * 1.32, y + 0.02, -0.328, 'z', 'none')
      C(0.008, 0.004, 'alu', s * 1.32, y - 0.02, -0.328, 'z', 'none')
      const p0 = new THREE.Vector3(s * 1.37, y, -0.35)
      const p1 = new THREE.Vector3(s * 1.5, y, -0.24)
      const p2 = new THREE.Vector3(s * 1.6, y, -0.16)
      link(p0, p1, 0.013, 'alu')
      link(p1, p2, 0.011, 'alu')
      C(0.019, 0.045, 'ink', p1.x, y, p1.z)
      C(0.017, 0.04, 'ink', p2.x, y, p2.z)
      R(0.1, 0.08, 0.014, 0.004, 'ink', s * 1.62, y, -0.137)
    }
    arm(1, F + 0.44)
    display(new Screen('tree'), 0.24, 0.16, 1.62, F + 0.44, -0.11, 0.016, 'ink')
    arm(-1, F + 0.48)
    display(new Screen('psu'), 0.22, 0.13, -1.62, F + 0.48, -0.11, 0.016, 'ink')

    // ---- 台下 ----
    // 右下柜体放到右侧、横梁后方，并落到地面；横条保持与柜体同步。
    B(0.48, 0.5, 0.5, 'ink', 0.9, 0.25, -0.42)
    for (let i = 0; i < 3; i++) B(0.14, 0.014, 0.01, 'alu', 0.9, 0.46 - i * 0.16, -0.14, 'none')
    C(0.075, 0.22, 'plastic', -0.82, 0.42, 0.05, 'x')
    B(0.14, 0.15, 0.15, 'plastic', -0.64, 0.42, 0.05)
    C(0.02, 0.1, 'alu', -0.98, 0.42, 0.05, 'x')
    const coupling = C(0.028, 0.04, 'bin', -1.04, 0.42, 0.05, 'x')
    this.movers.push(t => { coupling.rotation.x = t * 0.004 })
    this.led(-0.64, 0.46, 0.128, 0.014, g)
    B(0.44, 0.02, 0.3, 'alu', -0.78, 0.335, 0.05)
    B(0.36, 0.42, 0.34, 'housing', 0.1, 0.32, -0.05)
    for (let i = 0; i < 8; i++) B(0.26, 0.006, 0.004, 'plastic', 0.1, 0.18 + i * 0.03, 0.122, 'none')
    this.led(0.22, 0.48, 0.123, 0.016, g)
    C(0.1, 0.3, 'scenery', -1.75, 0.15, 0.25)

    // ---- 数据流 ----
    this.flow([[-0.7, F + 0.19, -0.15], [-0.45, F + 0.2, -0.08], [-0.2, F + 0.02, -0.02], [-0.02, F + 0.04, -0.26], [0.03, F + 0.22, -0.31]], 3, 0.08)
    this.flow([[0.82, F + 0.06, 0.0], [0.6, F + 0.015, 0.04], [0.3, F + 0.02, -0.14], [0.1, F + 0.15, -0.31]], 3, 0.1)
    this.flow([[1.08, F + 0.11, -0.12], [1.2, F + 0.4, -0.25], [1.0, F + 0.85, -0.3], [0.8, F + 0.88, -0.27]], 2, 0.12)
    this.flow([[1.12, F + 0.06, -0.12], [1.35, F + 0.12, -0.12], [1.47, F + 0.32, -0.1]], 2, 0.14)
    this.flow([[-0.64, 0.5, 0.06], [-0.4, 0.75, 0.1], [-0.5, F - 0.08, 0.1], [-0.6, F + 0.02, -0.08]], 2, 0.09)
    this.flow([[0.2, 0.52, 0.05], [0.4, 0.75, 0.1], [0.7, F - 0.07, 0.0], [0.85, F + 0.02, -0.08]], 2, 0.11)
    this.flow([[-0.92, F + 0.54, -0.2], [-0.8, F + 0.4, -0.3], [-0.6, F + 0.2, -0.22]], 2, 0.1)
  }

  // ---------- 工厂车间（线描） ----------
  private buildHall() {
    const W = 9
    const Z0 = -20
    const Z1 = 18
    const H = 7
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(W * 2, Z1 - Z0), this.mats.hall)
    floor.rotation.x = -Math.PI / 2
    floor.position.set(0, -0.001, (Z0 + Z1) / 2)
    this.root.add(floor)
    const gp: number[] = []
    for (let x = -W; x <= W; x += 1) gp.push(x, 0, Z0, x, 0, Z1)
    for (let z = Z0; z <= Z1; z += 1) gp.push(-W, 0, z, W, 0, z)
    for (const x of [-2.4, 2.4]) gp.push(x, 0.002, Z0, x, 0.002, Z1)
    const grid = new THREE.BufferGeometry()
    grid.setAttribute('position', new THREE.Float32BufferAttribute(gp, 3))
    this.root.add(new THREE.LineSegments(grid, this.gridMat))
    const wall = (w: number, h: number, x: number, y: number, z: number, ry: number) => {
      const m = this.mesh(new THREE.PlaneGeometry(w, h), 'hallWall', x, y, z, 'far')
      m.rotation.y = ry
    }
    wall(W * 2, H, 0, H / 2, Z0, 0)
    wall(Z1 - Z0, H, -W, H / 2, (Z0 + Z1) / 2, Math.PI / 2)
    wall(Z1 - Z0, H, W, H / 2, (Z0 + Z1) / 2, -Math.PI / 2)
    for (let i = -3; i <= 3; i++) {
      if (i === 0) continue
      this.box(1.8, 1.4, 0.05, 'scenery', i * 2.4, 4.6, Z0 + 0.03, 'far')
      this.box(0.03, 1.4, 0.06, 'scenery', i * 2.4, 4.6, Z0 + 0.04, 'far')
    }
    this.box(3.2, 3.6, 0.06, 'hallDark', 0, 1.8, Z0 + 0.03, 'far')
    for (let i = 0; i < 9; i++) this.box(3.2, 0.01, 0.07, 'scenery', 0, 0.4 + i * 0.4, Z0 + 0.04, 'none')
    for (let z = Z0 + 2; z <= Z1; z += 4) {
      for (const x of [-W + 0.3, W - 0.3]) this.box(0.3, H, 0.3, 'scenery', x, H / 2, z, 'far')
      const tp: number[] = []
      const n = 12
      for (let i = 0; i < n; i++) {
        const x0 = -W + (2 * W * i) / n
        const x1 = -W + (2 * W * (i + 1)) / n
        tp.push(x0, H - 0.8, z, x1, H - 0.8, z, x0, H, z, x1, H, z, x0, i % 2 ? H : H - 0.8, z, x1, i % 2 ? H - 0.8 : H, z)
      }
      const tg = new THREE.BufferGeometry()
      tg.setAttribute('position', new THREE.Float32BufferAttribute(tp, 3))
      this.root.add(new THREE.LineSegments(tg, this.edgeFar))
      for (const x of [-4, 4]) {
        const lp = new THREE.BufferGeometry()
        lp.setAttribute('position', new THREE.Float32BufferAttribute([x, H - 0.8, z, x, H - 1.6, z], 3))
        this.root.add(new THREE.LineSegments(lp, this.edgeFar))
        this.box(1.2, 0.06, 0.2, 'light', x, H - 1.63, z, 'far')
      }
    }
    this.box(W * 2 - 0.6, 0.3, 0.25, 'scenery', 0, 5.2, -6, 'far')

    // 输送线
    const CZ = -7.5
    this.box(12, 0.08, 0.7, 'scenery', 0, 0.8, CZ, 'far')
    for (let x = -6; x <= 6; x += 1.5) this.box(0.08, 0.8, 0.6, 'scenery', x, 0.4, CZ, 'far')
    for (let x = -5.9; x <= 5.9; x += 0.25) this.cyl(0.03, 0.66, 'scenery', x, 0.86, CZ, 'z', 'none')
    const crates: THREE.Mesh[] = []
    for (let i = 0; i < 6; i++) crates.push(this.box(0.45, 0.32, 0.45, i % 3 === 1 ? 'scenery' : 'scenery', 0, 1.06, CZ, 'far'))
    this.movers.push(t => crates.forEach((c, i) => { c.position.x = -6 + ((t * 0.00008 + i / crates.length) % 1) * 12 }))
    // 机械臂
    this.cyl(0.3, 0.3, 'scenery', 3.2, 0.15, CZ - 1.2, 'y', 'far')
    const turret = new THREE.Group()
    turret.position.set(3.2, 0.3, CZ - 1.2)
    this.root.add(turret)
    this.cyl(0.22, 0.4, 'scenery', 0, 0.2, 0, 'y', 'far', turret)
    const shoulder = new THREE.Group()
    shoulder.position.set(0, 0.45, 0)
    turret.add(shoulder)
    this.box(0.18, 1.1, 0.18, 'scenery', 0, 0.55, 0, 'far', shoulder)
    const elbow = new THREE.Group()
    elbow.position.set(0, 1.1, 0)
    shoulder.add(elbow)
    this.cyl(0.13, 0.26, 'scenery', 0, 0, 0, 'z', 'far', elbow)
    this.box(0.9, 0.14, 0.14, 'scenery', 0.45, 0, 0, 'far', elbow)
    this.box(0.1, 0.18, 0.16, 'housing', 0.92, -0.08, 0, 'far', elbow)
    this.movers.push(t => {
      turret.rotation.y = Math.sin(t * 0.0005) * 0.9
      shoulder.rotation.z = -0.35 + Math.sin(t * 0.0007) * 0.18
      elbow.rotation.z = -0.4 + Math.sin(t * 0.0009 + 1) * 0.25
    })
    // 货架
    for (const rz of [-11, -14]) {
      for (let x = -8.5; x <= -4.5; x += 1) this.box(0.08, 4, 0.08, 'sceneryMetal', x, 2, rz, 'far')
      for (let y = 0.2; y < 4; y += 1.25) {
        this.box(4.1, 0.06, 1.0, 'sceneryMetal', -6.5, y, rz + 0.45, 'far')
        for (let x = -8.25; x <= -5.3; x += 1) this.box(0.85, 0.8, 0.9, Math.round(x + y * 3) % 3 === 0 ? 'scenery' : 'scenery', x + 0.25, y + 0.43, rz + 0.45, 'far')
      }
    }
    for (const [x, z] of [[4.2, -9.5], [4.2, -13], [-0.2, -9.5], [-0.2, -13]] as [number, number][]) this.buildBench(x, z, false)
    // AGV
    const agv = new THREE.Group()
    this.root.add(agv)
    this.box(0.9, 0.22, 0.6, 'scenery', 0, 0.13, 0, 'far', agv)
    this.box(0.7, 0.4, 0.45, 'scenery', 0, 0.45, 0, 'far', agv)
        agv.rotation.y = Math.PI / 2
    this.movers.push(t => { agv.position.set(-1.8, 0, 6 - ((t * 0.00006) % 1) * 20) })
  }

  // ---------- 状态 ----------
  applyTheme() {
    const theme = document.documentElement.dataset.theme
    const dark = theme === 'dark' || (theme !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches)
    const bg = dark ? T.b900 : '#BFC1BD'
    this.scene.background = new THREE.Color(bg)
    ;(this.scene.fog as THREE.Fog).color.set(bg)
    ;(this.mats.hallWall as THREE.MeshBasicMaterial).color.set(bg)
    ;(this.scene.fog as THREE.Fog).near = dark ? 6 : 18
    ;(this.scene.fog as THREE.Fog).far = dark ? 28 : 48
    document.documentElement.style.setProperty('--wb-scene-bg', bg)
    // 深色模式：车间地面、墙面与网格转为深色中性灰，工作台本身不变
    ;(this.mats.hall as THREE.MeshStandardMaterial).color.set(dark ? '#0E1013' : '#797B75')
    ;(this.mats.hallDark as THREE.MeshStandardMaterial).color.set(dark ? '#16181C' : '#92948D')
    this.gridMat.color.set(dark ? '#2A2D33' : '#777A73')
    this.edgeFar.color.set(dark ? '#3A3E45' : '#82857D')
    ;(this.mats.scenery as THREE.MeshStandardMaterial).color.set(dark ? '#23262B' : '#999C94')
    ;(this.mats.sceneryMetal as THREE.MeshStandardMaterial).color.set(dark ? '#2C3036' : '#868981')
  }
  setProgress(p: number) { this.progress = p }
  /** 每帧渲染前调用：外层在这里同步滚动进度和舞台变换，保证镜头和外框在同一帧更新。 */
  beforeFrame: ((t: number) => void) | null = null
  addAnchor(el: HTMLElement, x: number, y: number, z: number) { this.anchors.push({ el, pos: new THREE.Vector3(x, y, z) }) }

  private resize() {
    const stage = this.host.querySelector('.wb-stage') as HTMLElement
    const w = stage.clientWidth
    const h = stage.clientHeight
    if (!w || !h) return
    this.renderer.setSize(w, h, false)
    this.aspect = w / h
    this.camera.aspect = this.aspect
    this.camera.updateProjectionMatrix()
    // 改尺寸会清空画布；立即重绘一帧，避免出现空白帧（闪烁）
    this.updateCamera()
    this.renderer.render(this.scene, this.camera)
  }

  /** 镜头后退，保留完整工作台供首页主视觉使用。 */
  private updateCamera() {
    const p = this.progress
    const e = 1 - Math.pow(1 - Math.min(1, p / 0.72), 3)
    const fit = Math.max(1, 1.55 / this.aspect)
    const z0 = 3.85 * fit
    const z = z0 + (8 - z0) * e
    const y = 1.3
    const px = this.pan.x * 0.08
    const py = this.pan.y * 0.04
    this.camera.position.set(px, y + py, z)
    this.camera.lookAt(px * 0.4, y + py * 0.5, z - 10)
    this.axisMat.opacity = 0.22 * Math.min(1, Math.max(0, (p - 0.08) / 0.3)) * (1 - Math.min(1, Math.max(0, (p - 0.7) / 0.25)))
  }

  private loop = (t: number) => {
    if (!this.host.isConnected) return this.dispose()
    this.raf = requestAnimationFrame(this.loop)
    this.beforeFrame?.(t)
    if (!this.visible) return
    const time = this.reduced ? 0 : t
    this.pan.lerp(this.mouse, 0.05)
    this.updateCamera()
    for (const m of this.movers) m(time)
    for (const f of this.flows) f.uniforms.uTime.value = time * 0.001
    for (const l of this.leds) l.mesh.visible = this.reduced || Math.sin(time / 380 + l.phase) > -0.6
    if (t - this.lastScreen > 120) {
      this.lastScreen = t
      this.screens.forEach(s => s.draw(time))
    }
    this.renderer.render(this.scene, this.camera)
    const stage = this.host.querySelector('.wb-stage') as HTMLElement
    const w = stage.clientWidth
    const h = stage.clientHeight
    const v = new THREE.Vector3()
    for (const a of this.anchors) {
      v.copy(a.pos).project(this.camera)
      a.el.style.transform = `translate(${((v.x + 1) / 2) * w}px, ${((1 - v.y) / 2) * h}px)`
      a.el.style.opacity = String(Math.max(0, Math.min(1, t / 1000 - 1.2) - this.progress * 6))
    }
  }

  dispose() {
    cancelAnimationFrame(this.raf)
    this.io.disconnect()
    this.ro.disconnect()
    this.root.traverse(o => { if (o instanceof THREE.Mesh || o instanceof THREE.LineSegments) o.geometry.dispose() })
    this.renderer.dispose()
  }
}

// ---------- mounting ----------
const live = new WeakSet<HTMLElement>()

function mount(host: HTMLElement) {
  live.add(host)
  let wb: Workbench
  try {
    wb = new Workbench(host)
  } catch {
    host.dataset.fallback = ''
    return
  }
  host.dataset.ready = ''
  host.querySelectorAll<HTMLElement>('[data-anchor]').forEach(el => {
    const [x, y, z] = (el.dataset.anchor || '0,0,0').split(',').map(Number)
    wb.addAnchor(el, x, y, z)
  })
  // 滚动只记录目标进度；所有读写放进渲染循环的同一帧里，并对进度做指数阻尼，过渡更顺。
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const stage = host.querySelector<HTMLElement>('.wb-stage')!
  const root = document.documentElement
  let cur = -1, lastT = 0, lastKey = '', copyOn = false, overlap = ''
  wb.beforeFrame = (t: number) => {
    const r = host.getBoundingClientRect()
    const span = r.height - innerHeight
    const target = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0
    const dt = lastT ? Math.min(64, t - lastT) : 16
    lastT = t
    if (cur < 0 || reduced || Math.abs(target - cur) > 0.5) cur = target
    else {
      cur += (target - cur) * (1 - Math.exp(-dt / 110))
      if (Math.abs(target - cur) < 0.0005) cur = target
    }
    const fullWidth = host.clientWidth
    const key = cur.toFixed(4) + '|' + fullWidth + '|' + innerHeight
    if (key === lastKey) return
    lastKey = key
    const p = cur
    // 收拢段用 smoothstep，起止都没有速度突变
    const lin = Math.min(1, Math.max(0, (p - 0.18) / 0.52))
    const settle = lin * lin * (3 - 2 * lin)
    const finalWidth = Math.min(1084, Math.max(0, fullWidth - 96))
    const fullHeight = innerHeight - 56
    const finalScale = finalWidth / fullWidth
    const scale = 1 + (finalScale - 1) * settle
    const finalCrop = Math.max(0, (fullHeight - finalWidth * 9 / 16 / finalScale) / 2)
    const crop = finalCrop * settle
    const frameTop = 96
    const visibleTop = 56 + (fullHeight * (1 - scale)) / 2 + crop * scale
    const rise = (frameTop - visibleTop) * settle
    stage.style.transform = `translate3d(0, ${rise.toFixed(2)}px, 0) scale(${scale.toFixed(5)})`
    stage.style.clipPath = `inset(${crop.toFixed(2)}px 0 round ${(12 * settle).toFixed(2)}px)`
    stage.style.setProperty('--frame-crop', `${crop.toFixed(2)}px`)
    const ov = `${Math.max(0, innerHeight - frameTop - finalWidth * 9 / 16 - 72 + 48)}px`
    if (ov !== overlap) { overlap = ov; root.style.setProperty('--wb-body-overlap', ov) }
    wb.setProgress(p)
    const ps = p.toFixed(3)
    host.style.setProperty('--wb-p', ps)
    root.style.setProperty('--wb-p', ps)
    // 文案出现和消失用不同阈值，停在临界点附近时不会来回闪
    const nextCopy = copyOn ? p >= 0.6 : p >= 0.66
    if (nextCopy !== copyOn) { copyOn = nextCopy; host.classList.toggle('wb-copy-visible', copyOn) }
  }
  const mo = new MutationObserver(() => wb.applyTheme())
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => wb.applyTheme())
}

function scan() {
  document.querySelectorAll<HTMLElement>('[data-workbench]').forEach(h => { if (!live.has(h)) mount(h) })
}
document.addEventListener('portal:render', scan)
scan()
