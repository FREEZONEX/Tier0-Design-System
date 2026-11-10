// 首屏工作台：three.js 场景，正视图的工业工作台（台面、背板、屏幕、PLC、边缘盒子），
// 绿色小点沿线缆流动表示数据接入。向下滚动时镜头推近到台面；可切换「线框 / 材质」。
// 只依赖公开的 three.js。挂载到 [data-workbench] 节点，页面重绘时自动清理。
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

type Mode = 'material' | 'wire'
type MatKey = 'frame' | 'white' | 'dark' | 'light' | 'led' | 'green' | 'panel' | 'hatch' | 'bezel' | 'yellow' | 'orange' | 'red' | 'blue' | 'black'

const GREEN = '#B2ED1D'

function brushedTexture() {
  const c = document.createElement('canvas')
  c.width = 512
  c.height = 512
  const g = c.getContext('2d')!
  g.fillStyle = '#c4c8cc'
  g.fillRect(0, 0, 512, 512)
  for (let i = 0; i < 2600; i++) {
    const y = Math.random() * 512
    const light = Math.random() > 0.5
    g.strokeStyle = light ? `rgba(255,255,255,${Math.random() * 0.22})` : `rgba(60,66,72,${Math.random() * 0.14})`
    g.lineWidth = Math.random() * 1.2
    g.beginPath()
    const x = Math.random() * 512
    g.moveTo(x - 200, y)
    g.lineTo(x + 200, y + (Math.random() - 0.5) * 0.6)
    g.stroke()
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(2, 2)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

/** 屏幕内容：浅色控制台界面（数据树、读数、进度条），与门户早先的首屏控制台一致。 */
class Screen {
  canvas = document.createElement('canvas')
  texture: THREE.CanvasTexture
  constructor(private kind: 'main' | 'tree' | 'gauge') {
    this.canvas.width = kind === 'main' ? 880 : 400
    this.canvas.height = kind === 'main' ? 520 : 280
    this.texture = new THREE.CanvasTexture(this.canvas)
    this.texture.colorSpace = THREE.SRGBColorSpace
    this.texture.anisotropy = 8
    this.draw(0)
  }
  draw(t: number) {
    const g = this.canvas.getContext('2d')!
    const W = this.canvas.width
    const H = this.canvas.height
    const line = '#C9CDD1'
    const ink = '#050B14'
    const mute = '#5F656B'
    g.fillStyle = '#FFFFFF'
    g.fillRect(0, 0, W, H)
    g.lineWidth = 2
    g.strokeStyle = line
    if (this.kind === 'main') {
      g.font = '500 24px "IBM Plex Sans", sans-serif'
      g.fillStyle = ink
      g.fillText('Factory-A / Line-01', 28, 46)
      g.fillStyle = GREEN
      g.fillRect(W - 128, 28, 14, 14)
      g.fillStyle = ink
      g.fillText('运行中', W - 104, 44)
      g.beginPath(); g.moveTo(0, 68); g.lineTo(W, 68); g.stroke()
      const rows: [string, number, boolean][] = [['Factory-A', 0, false], ['Line-01', 1, false], ['CNC-03', 2, true], ['Metrics', 3, false], ['State', 3, false], ['Action', 3, false]]
      rows.forEach(([s, lv, on], i) => {
        const y = 92 + i * 44
        if (on) { g.fillStyle = GREEN; g.fillRect(16, y - 6, 400, 38) }
        g.fillStyle = ink
        g.fillRect(32 + lv * 26, y + 8, 10, 10)
        g.fillStyle = ink
        g.fillText(s, 54 + lv * 26, y + 21)
      })
      g.beginPath(); g.moveTo(436, 68); g.lineTo(436, H); g.stroke()
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
      g.fillStyle = '#EEF0F1'
      g.fillRect(468, 290, W - 500, 16)
      g.fillStyle = GREEN
      g.fillRect(468, 290, (W - 500) * pct, 16)
      g.strokeStyle = line
      for (let i = 0; i < 4; i++) { g.strokeRect(468 + i * 96, 340, 80, 120) ; g.fillStyle = i === 1 ? GREEN : '#D5D8DB'; g.fillRect(480 + i * 96, 352, 10, 10) }
    } else if (this.kind === 'tree') {
      const nodes: [number, number][] = [[70, 60], [200, 60], [330, 60], [135, 150], [265, 150], [200, 230]]
      const links = [[0, 3], [1, 3], [1, 4], [2, 4], [3, 5], [4, 5]]
      g.strokeStyle = '#B9BEC3'
      links.forEach(([a, b]) => { g.beginPath(); g.moveTo(...nodes[a]); g.lineTo(...nodes[b]); g.stroke() })
      nodes.forEach(([x, y], i) => { g.fillStyle = i === 5 ? GREEN : '#FFFFFF'; g.fillRect(x - 11, y - 11, 22, 22); g.strokeStyle = ink; g.strokeRect(x - 11, y - 11, 22, 22) })
      const k = (t / 1500) % 1
      g.fillStyle = GREEN
      g.fillRect(70 + 65 * k - 5, 60 + 90 * k - 5, 10, 10)
    } else {
      const p = 0.62 + Math.sin(t / 1300) * 0.08
      g.font = '20px "IBM Plex Sans", sans-serif'
      g.fillStyle = mute
      g.fillText('吞吐', 24, 40)
      g.fillStyle = ink
      g.font = '500 64px Inter, sans-serif'
      g.fillText(`${Math.round(p * 100)}`, 24, 120)
      for (let i = 0; i < 12; i++) { const h = 30 + Math.abs(Math.sin(i * 1.7 + t / 1600)) * 70; g.fillStyle = i === 11 ? GREEN : '#D5D8DB'; g.fillRect(24 + i * 30, H - 28 - h, 18, h) }
    }
    this.texture.needsUpdate = true
  }
  tick(t: number) { this.draw(t) }
}

function hatchMaterial(spacing: number) {
  return new THREE.ShaderMaterial({
    uniforms: { uBg: { value: new THREE.Color('#ffffff') }, uLine: { value: new THREE.Color('#050B14') }, uAlpha: { value: 0.3 }, uSpace: { value: spacing * Math.min(devicePixelRatio, 2) } },
    vertexShader: 'void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'uniform vec3 uBg; uniform vec3 uLine; uniform float uAlpha; uniform float uSpace; void main(){ float d = mod(gl_FragCoord.x + gl_FragCoord.y, uSpace); float l = 1.0 - smoothstep(0.0, 1.2, min(d, uSpace - d)); gl_FragColor = vec4(mix(uBg, uLine, l * uAlpha), 1.0); }',
    polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1,
  })
}

/** 台面：工业制图垫板的格纹（1cm 细线、5cm 粗线、刻度与对角参考线）。 */
function matTexture() {
  const c = document.createElement('canvas')
  const S = 640 // px per metre
  c.width = 3.2 * S
  c.height = 0.9 * S
  const g = c.getContext('2d')!
  g.fillStyle = '#F4F5F6'
  g.fillRect(0, 0, c.width, c.height)
  const cm = S / 100
  for (let i = 0; i * cm <= c.width; i++) {
    g.strokeStyle = i % 5 === 0 ? '#C4C9CE' : '#E3E6E9'
    g.lineWidth = i % 5 === 0 ? 1.4 : 0.8
    g.beginPath(); g.moveTo(i * cm, 0); g.lineTo(i * cm, c.height); g.stroke()
  }
  for (let i = 0; i * cm <= c.height; i++) {
    g.strokeStyle = i % 5 === 0 ? '#C4C9CE' : '#E3E6E9'
    g.lineWidth = i % 5 === 0 ? 1.4 : 0.8
    g.beginPath(); g.moveTo(0, i * cm); g.lineTo(c.width, i * cm); g.stroke()
  }
  g.strokeStyle = '#D2D6DA'
  g.lineWidth = 1
  for (const x of [0.8, 1.6, 2.4]) { g.beginPath(); g.moveTo((x - 0.45) * S, c.height); g.lineTo((x + 0.45) * S, 0); g.stroke(); g.beginPath(); g.moveTo((x - 0.45) * S, 0); g.lineTo((x + 0.45) * S, c.height); g.stroke() }
  g.beginPath(); g.arc(1.6 * S, 0.45 * S, 0.3 * S, 0, 6.3); g.stroke()
  g.fillStyle = '#9AA0A6'
  g.font = '13px "IBM Plex Mono", monospace'
  for (let i = 0; i <= 320; i += 10) g.fillText(String(i), i * cm + 4, c.height - 8)
  for (let i = 10; i < 90; i += 10) g.fillText(String(i), 6, c.height - i * cm - 4)
  g.strokeStyle = '#AEB4BA'
  g.lineWidth = 2
  g.strokeRect(1, 1, c.width - 2, c.height - 2)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

export class Workbench {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 50)
  private root = new THREE.Group()
  private mats: Record<MatKey, THREE.Material>
  private wire: Record<MatKey, THREE.Material>
  private edgeMat: THREE.LineBasicMaterial
  private guideMat!: THREE.LineBasicMaterial
  private guides = new THREE.Group()
  private holeMat = new THREE.MeshBasicMaterial({ color: '#dfe2e5', toneMapped: false })
  private cableMat = new THREE.MeshBasicMaterial({ color: '#30353a', toneMapped: false })
  private groundMat = hatchMaterial(9)
  private mouse = new THREE.Vector2()
  private pan = new THREE.Vector2()
  private spin: THREE.Object3D[] = []
  private matTop: THREE.MeshBasicMaterial
  private screens: Screen[] = []
  private flows: { curve: THREE.CatmullRomCurve3; dots: THREE.Mesh[]; speed: number; offset: number }[] = []
  private leds: { mesh: THREE.Mesh; phase: number }[] = []
  private lines: { seg: THREE.LineSegments; count: number; delay: number }[] = []
  private anchors: { el: HTMLElement; pos: THREE.Vector3 }[] = []
  private mode: Mode = 'wire'
  private progress = 0
  private raf = 0
  private visible = true
  private lastScreen = 0
  private start = 0
  private aspect = 1
  private io: IntersectionObserver
  private ro: ResizeObserver
  private reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

  constructor(private host: HTMLElement) {
    const canvas = host.querySelector('canvas')!
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.NeutralToneMapping
    this.renderer.toneMappingExposure = 0.95
    const pmrem = new THREE.PMREMGenerator(this.renderer)
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.03).texture

    const brushed = brushedTexture()
    const brushedDark = brushedTexture()
    this.mats = {
      frame: new THREE.MeshStandardMaterial({ color: '#ffffff', map: brushed, roughnessMap: brushed, metalness: 0.9, roughness: 0.36, envMapIntensity: 1.35 }),
      white: new THREE.MeshStandardMaterial({ color: '#f7f8f9', metalness: 0, roughness: 0.7 }),
      dark: new THREE.MeshStandardMaterial({ color: '#3a3f44', map: brushedDark, metalness: 0.6, roughness: 0.5 }),
      light: new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false }),
      led: new THREE.MeshBasicMaterial({ color: GREEN, toneMapped: false }),
      green: new THREE.MeshStandardMaterial({ color: '#b2ed1d', metalness: 0, roughness: 0.7 }),
      panel: new THREE.MeshStandardMaterial({ color: '#fbfbfa', metalness: 0, roughness: 0.95 }),
      hatch: new THREE.MeshStandardMaterial({ color: '#c9cdd1', map: brushedDark, metalness: 0.9, roughness: 0.55 }),
      bezel: new THREE.MeshStandardMaterial({ color: '#ffffff', map: brushed, metalness: 0.9, roughness: 0.34, envMapIntensity: 1.3 }),
      yellow: new THREE.MeshStandardMaterial({ color: '#ffc81a', metalness: 0, roughness: 0.55 }),
      orange: new THREE.MeshStandardMaterial({ color: '#ff6a1a', metalness: 0, roughness: 0.5 }),
      red: new THREE.MeshStandardMaterial({ color: '#e5402e', metalness: 0, roughness: 0.5 }),
      blue: new THREE.MeshStandardMaterial({ color: '#2f6fd8', metalness: 0, roughness: 0.6 }),
      black: new THREE.MeshStandardMaterial({ color: '#1b1e21', metalness: 0.3, roughness: 0.45 }),
    }
    const face = () => new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 })
    this.wire = { ...this.mats, hatch: hatchMaterial(6) }
    void face
    this.guideMat = new THREE.LineBasicMaterial({ color: '#050B14', transparent: true, opacity: 0.16 })
    this.edgeMat = new THREE.LineBasicMaterial({ color: '#050B14', transparent: true, opacity: 0.32 })
    this.matTop = new THREE.MeshBasicMaterial({ map: matTexture(), toneMapped: false })

    this.scene.add(new THREE.HemisphereLight('#ffffff', '#cfd3d7', 1.25))
    const key = new THREE.DirectionalLight('#ffffff', 1.6)
    key.position.set(2.5, 4, 6)
    const rim = new THREE.DirectionalLight('#ffffff', 0.6)
    rim.position.set(-3, 2, 3)
    this.scene.add(rim)
    this.scene.add(key)
    this.scene.add(this.root)
    this.build()
    this.setMode('material')
    this.applyTheme()

    this.io = new IntersectionObserver(([e]) => { this.visible = e.isIntersecting })
    this.io.observe(host)
    this.ro = new ResizeObserver(() => this.resize())
    this.ro.observe(host.querySelector('.wb-stage') as HTMLElement)
    this.resize()
    this.loop(0)
  }

  // ---------- building ----------
  private add(geo: THREE.BufferGeometry, key: MatKey, x: number, y: number, z: number, edges = true) {
    const m = new THREE.Mesh(geo, this.mats[key])
    m.position.set(x, y, z)
    m.userData.key = key
    if (edges && key !== 'led') {
      const eg = new THREE.EdgesGeometry(geo, 25)
      const l = new THREE.LineSegments(eg, this.edgeMat)
      m.add(l)
      this.lines.push({ seg: l, count: eg.attributes.position.count, delay: (x + 1.8) * 0.22 + (2.4 - y) * 0.12 })
    }
    this.root.add(m)
    return m
  }
  private box(w: number, h: number, d: number, key: MatKey, x: number, y: number, z: number, edges = true) {
    return this.add(new THREE.BoxGeometry(w, h, d), key, x, y, z, edges)
  }
  private cyl(r: number, len: number, key: MatKey, x: number, y: number, z: number, axis: 'x' | 'y' | 'z' = 'y') {
    const m = this.add(new THREE.CylinderGeometry(r, r, len, 28), key, x, y, z)
    if (axis === 'x') m.rotation.z = Math.PI / 2
    if (axis === 'z') m.rotation.x = Math.PI / 2
    return m
  }

  private build() {
    const F = 0.925 // 台面高度
    // ---------- 铝型材框架（T 形立柱、地脚、横梁） ----------
    this.box(3.0, 0.045, 0.85, 'white', 0, F - 0.0225, 0)
    this.box(3.02, 0.02, 0.86, 'frame', 0, F - 0.055, 0)
    this.box(2.6, 0.07, 0.05, 'frame', 0, F - 0.1, 0.38)
    for (const x of [-1.32, 1.32]) {
      this.box(0.09, F - 0.1, 0.09, 'frame', x, (F - 0.1) / 2, 0)
      for (let i = 0; i < 6; i++) this.box(0.008, 0.06, 0.004, 'dark', x, 0.18 + i * 0.1, 0.046, false)
      this.box(0.34, 0.05, 0.7, 'frame', x, 0.025, 0)
      this.box(0.06, 0.02, 0.06, 'black', x - 0.13, 0.01, 0.3)
      this.box(0.06, 0.02, 0.06, 'black', x + 0.13, 0.01, 0.3)
      // 上部立柱（带槽）
      this.box(0.065, 1.3, 0.065, 'frame', x, F + 0.65, -0.38)
      this.box(0.012, 1.24, 0.004, 'dark', x, F + 0.65, -0.346, false)
    }
    this.box(2.58, 0.05, 0.05, 'frame', 0, 0.3, 0)
    // 顶部灯架与灯
    this.box(2.76, 0.06, 0.08, 'frame', 0, F + 1.33, -0.38)
    this.box(2.3, 0.07, 0.22, 'frame', 0, F + 1.42, -0.2)
    this.box(2.2, 0.018, 0.16, 'light', 0, F + 1.381, -0.2)
    this.box(0.04, 0.12, 0.04, 'frame', -1.0, F + 1.38, -0.3)
    this.box(0.04, 0.12, 0.04, 'frame', 1.0, F + 1.38, -0.3)

    // ---------- 背板：左侧料盒架、中间面板、右侧百叶孔板 ----------
    this.box(2.58, 0.92, 0.015, 'panel', 0, F + 0.56, -0.4)
    for (const y of [F + 0.42, F + 0.64]) {
      this.box(0.86, 0.025, 0.05, 'frame', -0.86, y - 0.06, -0.37)
      for (let i = 0; i < 6; i++) {
        const x = -1.22 + i * 0.145
        this.box(0.13, 0.1, 0.14, 'yellow', x, y, -0.32)
        this.box(0.13, 0.03, 0.005, 'yellow', x, y + 0.035, -0.248, false)
        this.box(0.05, 0.016, 0.004, 'white', x, y - 0.02, -0.249, false)
      }
    }
    const slots: THREE.Vector3[] = []
    for (let ix = 0; ix < 9; ix++) for (let iy = 0; iy < 9; iy++) slots.push(new THREE.Vector3(0.62 + ix * 0.07, F + 0.2 + iy * 0.075, -0.391))
    const slot = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.032, 0.012), this.holeMat, slots.length)
    slots.forEach((p, i) => slot.setMatrixAt(i, new THREE.Matrix4().makeTranslation(p.x, p.y, p.z)))
    slot.userData.keep = true
    this.root.add(slot)
    // 仪器层板
    this.box(1.2, 0.025, 0.3, 'frame', 0.65, F + 0.86, -0.27)
    this.box(0.36, 0.17, 0.26, 'white', 0.3, F + 0.957, -0.27)
    this.screenPlane(new Screen('gauge'), 0.2, 0.12, 0.25, F + 0.965, -0.139)
    for (let i = 0; i < 3; i++) this.cyl(0.013, 0.02, i === 2 ? 'orange' : 'dark', 0.4, F + 1.0 - i * 0.04, -0.13, 'z')
    this.box(0.4, 0.15, 0.26, 'dark', 0.78, F + 0.947, -0.27)
    this.box(0.22, 0.09, 0.004, 'black', 0.72, F + 0.955, -0.138, false)
    this.box(0.02, 0.02, 0.006, 'led', 0.92, F + 0.98, -0.137, false)
    this.box(0.22, 0.12, 0.24, 'frame', 1.12, F + 0.935, -0.27)
    this.box(0.12, 0.028, 0.004, 'black', 1.1, F + 0.95, -0.148, false)
    this.cyl(0.016, 0.02, 'red', 1.08, F + 0.905, -0.14, 'z')
    this.cyl(0.016, 0.02, 'black', 1.15, F + 0.905, -0.14, 'z')
    // 立柱上的控制盒
    this.box(0.12, 0.3, 0.08, 'frame', 1.42, F + 0.62, -0.33)
    const btn: [MatKey, number][] = [['green', 0.08], ['red', 0.0], ['yellow', -0.08]]
    for (const [k, dy] of btn) this.cyl(0.018, 0.02, k, 1.42, F + 0.62 + dy, -0.28, 'z')

    // ---------- 主屏（支臂） ----------
    this.box(0.035, 0.22, 0.035, 'frame', 0.05, F + 0.2, -0.33)
    this.box(0.2, 0.012, 0.14, 'frame', 0.05, F + 0.006, -0.3)
    this.box(0.9, 0.55, 0.03, 'bezel', 0.05, F + 0.5, -0.31)
    this.screenPlane(new Screen('main'), 0.86, 0.51, 0.05, F + 0.5, -0.294)

    // ---------- 台面：PLC 托架与端子、边缘盒子、键盘 ----------
    this.box(1.0, 0.02, 0.26, 'frame', -0.82, F + 0.01, -0.12)
    this.box(0.98, 0.025, 0.02, 'frame', -0.82, F + 0.09, -0.2)
    this.box(0.14, 0.2, 0.13, 'frame', -1.24, F + 0.12, -0.18)
    for (let i = 0; i < 5; i++) this.box(0.09, 0.005, 0.004, 'dark', -1.24, F + 0.15 + i * 0.02, -0.114, false)
    const psu = this.box(0.016, 0.016, 0.005, 'led', -1.27, F + 0.06, -0.113, false)
    this.leds.push({ mesh: psu, phase: 1 })
    for (let i = 0; i < 6; i++) {
      const x = -1.1 + i * 0.085
      const h = i === 0 ? 0.2 : 0.17
      this.box(0.078, h, 0.12, i < 2 ? 'black' : 'dark', x, F + 0.02 + h / 2, -0.18)
      for (let k = 0; k < 3; k++) {
        const led = this.box(0.01, 0.01, 0.005, 'led', x - 0.02, F + 0.02 + h - 0.03 - k * 0.02, -0.118, false)
        this.leds.push({ mesh: led, phase: Math.random() * 6.28 })
      }
      this.box(0.05, 0.02, 0.005, 'blue', x + 0.008, F + 0.05, -0.118, false)
    }
    for (let i = 0; i < 12; i++) this.box(0.018, 0.06, 0.06, i % 4 === 3 ? 'frame' : 'green', -0.55 + i * 0.022, F + 0.05, -0.18)
    // 彩色接线（蓝、红）
    const wire = (pts: [number, number, number][], k: MatKey) => {
      const c = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)))
      const m = new THREE.Mesh(new THREE.TubeGeometry(c, 32, 0.0026, 6), this.mats[k])
      m.userData.keep = true
      this.root.add(m)
    }
    for (let i = 0; i < 12; i++) {
      const x = -0.55 + i * 0.022
      wire([[x, F + 0.02, -0.15], [x + 0.01, F + 0.012, -0.08], [x - 0.04 + i * 0.006, F + 0.012, 0.0]], i % 5 === 2 ? 'red' : 'blue')
    }
    this.box(0.38, 0.11, 0.24, 'black', 0.95, F + 0.055, -0.1)
    for (let i = 0; i < 9; i++) this.box(0.005, 0.07, 0.005, 'frame', 0.82 + i * 0.02, F + 0.055, 0.021, false)
    const edgeLed = this.box(0.016, 0.016, 0.006, 'led', 1.08, F + 0.08, 0.022, false)
    this.leds.push({ mesh: edgeLed, phase: 0 })
    this.box(0.03, 0.012, 0.006, 'orange', 1.08, F + 0.035, 0.022, false)
    this.box(0.46, 0.016, 0.15, 'frame', 0.1, F + 0.008, 0.22)
    for (let r = 0; r < 3; r++) for (let c = 0; c < 12; c++) this.box(0.028, 0.006, 0.028, c === 11 && r === 0 ? 'orange' : 'white', -0.105 + c * 0.037, F + 0.019, 0.17 + r * 0.04, false)
    this.box(0.07, 0.02, 0.1, 'white', 0.42, F + 0.01, 0.22)
    // 右侧摆臂平板
    this.box(0.3, 0.03, 0.03, 'frame', 1.5, F + 0.3, -0.1)
    this.box(0.28, 0.2, 0.02, 'bezel', 1.62, F + 0.42, -0.1)
    this.screenPlane(new Screen('tree'), 0.25, 0.17, 1.62, F + 0.42, -0.089)

    // ---------- 台下：伺服电机、抽屉柜、垃圾桶、工控机 ----------
    this.cyl(0.075, 0.22, 'black', -0.82, 0.42, 0.05, 'x')
    this.box(0.14, 0.15, 0.15, 'black', -0.64, 0.42, 0.05)
    this.cyl(0.02, 0.1, 'frame', -0.98, 0.42, 0.05, 'x')
    const fan = this.box(0.012, 0.12, 0.012, 'frame', -1.03, 0.42, 0.1)
    this.spin.push(fan)
    const mled = this.box(0.016, 0.016, 0.006, 'led', -0.64, 0.46, 0.128, false)
    this.leds.push({ mesh: mled, phase: 2 })
    this.box(0.44, 0.02, 0.3, 'frame', -0.78, 0.335, 0.05)
    this.box(0.48, 0.5, 0.5, 'white', 0.95, F - 0.37, 0.05)
    for (let i = 0; i < 3; i++) {
      this.box(0.46, 0.004, 0.004, 'frame', 0.95, F - 0.2 - i * 0.16, 0.302, false)
      this.box(0.14, 0.014, 0.01, 'frame', 0.95, F - 0.155 - i * 0.16, 0.306, false)
    }
    this.cyl(0.1, 0.28, 'white', -1.0, 0.19, 0.2)
    this.box(0.22, 0.02, 0.2, 'frame', -1.0, 0.04, 0.2)
    this.box(0.36, 0.42, 0.34, 'frame', 0.1, 0.32, -0.05)
    for (let i = 0; i < 8; i++) this.box(0.26, 0.006, 0.004, 'dark', 0.1, 0.18 + i * 0.03, 0.122, false)
    this.box(0.02, 0.02, 0.006, 'led', 0.22, 0.48, 0.123, false)

    // 地面线与地面斜线带
    const gp = [-30, 0, -0.6, 30, 0, -0.6]
    const gg = new THREE.BufferGeometry()
    gg.setAttribute('position', new THREE.Float32BufferAttribute(gp, 3))
    this.guides.add(new THREE.LineSegments(gg, this.guideMat))
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 0.09), this.groundMat)
    ground.position.set(0, -0.045, -0.6)
    this.guides.add(ground)
    this.scene.add(this.guides)

    // 数据流：细线缆 + 绿色小点
    const cable = (pts: [number, number, number][], n: number, speed: number) => {
      const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)))
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 96, 0.0021, 6), this.cableMat)
      tube.userData.keep = true
      this.root.add(tube)
      const dots: THREE.Mesh[] = []
      for (let i = 0; i < n * 4; i++) {
        const tail = i % 4
        const d = new THREE.Mesh(new THREE.SphereGeometry(0.0085 - tail * 0.0017, 12, 8), new THREE.MeshBasicMaterial({ color: GREEN, toneMapped: false, transparent: true, opacity: 1 - tail * 0.24 }))
        d.userData.tail = tail
        d.userData.keep = true
        this.root.add(d)
        dots.push(d)
      }
      this.flows.push({ curve, dots, speed, offset: Math.random() })
    }
    cable([[-0.9, F + 0.19, -0.13], [-0.6, F + 0.2, -0.05], [-0.3, F + 0.02, 0.0], [-0.05, F + 0.04, -0.25], [0.02, F + 0.22, -0.3]], 3, 0.08)
    cable([[0.82, F + 0.06, 0.03], [0.6, F + 0.015, 0.05], [0.3, F + 0.02, -0.15], [0.1, F + 0.15, -0.3]], 3, 0.1)
    cable([[1.08, F + 0.11, -0.1], [1.2, F + 0.4, -0.25], [1.08, F + 0.85, -0.3], [0.95, F + 0.88, -0.27]], 2, 0.12)
    cable([[1.12, F + 0.06, -0.12], [1.35, F + 0.12, -0.12], [1.47, F + 0.3, -0.1]], 2, 0.14)
    cable([[-0.64, 0.5, 0.06], [-0.4, 0.75, 0.1], [-0.5, F - 0.08, 0.1], [-0.6, F + 0.02, -0.05]], 2, 0.09)
    cable([[0.2, 0.5, 0.05], [0.4, 0.75, 0.1], [0.7, F - 0.07, 0.0], [0.85, F + 0.02, -0.05]], 2, 0.11)
  }

  private screenPlane(s: Screen, w: number, h: number, x: number, y: number, z: number) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: s.texture, toneMapped: false }))
    m.position.set(x, y, z)
    m.userData.keep = true
    this.root.add(m)
    this.screens.push(s)
  }

  // ---------- state ----------
  setMode(mode: Mode) {
    this.mode = mode
    this.root.traverse(o => {
      if (!(o instanceof THREE.Mesh) || o.userData.keep) return
      const key = o.userData.key as MatKey
      const base = mode === 'wire' ? this.wire[key] : this.mats[key]
      // 台面顶面始终是制图垫板
      o.material = o.userData.top ? [base, base, this.matTop, base, base, base] : base
    })
    this.edgeMat.opacity = 0.32
    this.host.dataset.mode = mode
  }

  applyTheme() {
    const css = getComputedStyle(document.documentElement)
    const bg = css.getPropertyValue('--background').trim() || '#FFFFFF'
    const fg = css.getPropertyValue('--foreground').trim() || '#050B14'
    const dark = new THREE.Color(bg).getHSL({ h: 0, s: 0, l: 0 }).l < 0.5
    this.groundMat.uniforms.uLine.value.set(fg)
    this.groundMat.uniforms.uBg.value.set(bg); this.groundMat.uniforms.uAlpha.value = 0.1
    this.holeMat.color.set(dark ? '#232c35' : '#C9CED3')
    this.cableMat.color.set(dark ? '#aab1b8' : '#30353a')
    this.edgeMat.color.set(fg)
    this.guideMat.color.set(fg)
  }

  setProgress(p: number) { this.progress = p }
  setMouse(x: number, y: number) { this.mouse.set(x, y) }

  addAnchor(el: HTMLElement, x: number, y: number, z: number) {
    this.anchors.push({ el, pos: new THREE.Vector3(x, y, z) })
  }

  private resize() {
    const stage = this.host.querySelector('.wb-stage') as HTMLElement
    const w = stage.clientWidth
    const h = stage.clientHeight
    if (!w || !h) return
    this.renderer.setSize(w, h, false)
    this.aspect = w / h
  }

  /** 固定正视角，鼠标带来轻微视差。 */
  private updateCamera() {
    const cam = this.camera
    const height = Math.max(2.7, 3.9 / this.aspect)
    const cy = 1.2
    const px = this.pan.x * 0.03
    const py = this.pan.y * 0.018
    cam.up.set(0, 1, 0)
    cam.position.set(px, cy + py, 10)
    cam.lookAt(px, cy + py, 0)
    cam.top = height / 2
    cam.bottom = -height / 2
    cam.right = (height * this.aspect) / 2
    cam.left = -cam.right
    cam.updateProjectionMatrix()
  }

  private loop = (t: number) => {
    if (!this.host.isConnected) return this.dispose()
    this.raf = requestAnimationFrame(this.loop)
    if (!this.visible) return
    if (!this.start) this.start = t
    const time = this.reduced ? 0 : t
    // 线框逐段画出
    const el = (t - this.start) / 1000
    if (el < 3.2) {
      for (const l of this.lines) {
        const k = this.reduced ? 1 : Math.min(1, Math.max(0, (el - l.delay) / 0.9))
        l.seg.geometry.setDrawRange(0, Math.floor((l.count * k) / 2) * 2)
      }
    } else if (this.lines.length) {
      for (const l of this.lines) l.seg.geometry.setDrawRange(0, Infinity)
      this.lines = []
    }
    this.pan.lerp(this.mouse, 0.06)
    for (const o of this.spin) o.rotation.x = time * 0.004
    this.updateCamera()
    for (const f of this.flows) {
      f.dots.forEach((d, i) => {
        const n = f.dots.length / 4
        const u = (((f.offset + time * 0.001 * f.speed + Math.floor(i / 4) / n - (d.userData.tail as number) * 0.012) % 1) + 1) % 1
        d.position.copy(f.curve.getPointAt(u))
      })
    }
    for (const l of this.leds) l.mesh.visible = this.reduced || Math.sin(time / 380 + l.phase) > -0.6
    if (t - this.lastScreen > 450) {
      this.lastScreen = t
      this.screens.forEach(s => s.tick(time))
    }
    this.renderer.render(this.scene, this.camera)
    const stage = this.host.querySelector('.wb-stage') as HTMLElement
    const w = stage.clientWidth
    const h = stage.clientHeight
    const v = new THREE.Vector3()
    for (const a of this.anchors) {
      v.copy(a.pos).project(this.camera)
      a.el.style.transform = `translate(${((v.x + 1) / 2) * w}px, ${((1 - v.y) / 2) * h}px)`
      a.el.style.opacity = String(Math.max(0, Math.min(1, el - 1.6)))
    }
  }

  dispose() {
    cancelAnimationFrame(this.raf)
    this.io.disconnect()
    this.ro.disconnect()
    this.root.traverse(o => {
      if (o instanceof THREE.Mesh || o instanceof THREE.LineSegments) o.geometry.dispose()
    })
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
  host.querySelectorAll<HTMLButtonElement>('[data-wb-mode]').forEach(b =>
    b.addEventListener('click', () => {
      wb.setMode(b.dataset.wbMode as Mode)
      host.querySelectorAll('[data-wb-mode]').forEach(x => x.setAttribute('aria-pressed', String(x === b)))
    }),
  )
  const onScroll = () => {
    if (!host.isConnected) return removeEventListener('scroll', onScroll)
    const r = host.getBoundingClientRect()
    const span = r.height - innerHeight
    const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0
    wb.setProgress(p)
    host.style.setProperty('--wb-p', p.toFixed(3))
  }
  host.addEventListener('pointermove', e => { const r = host.getBoundingClientRect(); wb.setMouse(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY) / innerHeight) * 2 - 1)) })
  addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  const mo = new MutationObserver(() => wb.applyTheme())
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'style'] })
  const mq = matchMedia('(prefers-color-scheme: dark)')
  const onMq = () => wb.applyTheme()
  mq.addEventListener('change', onMq)
  const head = document.getElementById('tok')
  const mo2 = new MutationObserver(() => wb.applyTheme())
  if (head) mo2.observe(head, { childList: true, characterData: true, subtree: true })
}

function scan() {
  document.querySelectorAll<HTMLElement>('[data-workbench]').forEach(h => {
    if (!live.has(h)) mount(h)
  })
}
document.addEventListener('portal:render', scan)
scan()
