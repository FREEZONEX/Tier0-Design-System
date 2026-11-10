// 首屏工作台：three.js 场景，正视图的工业工作台（台面、背板、屏幕、PLC、边缘盒子），
// 绿色小点沿线缆流动表示数据接入。向下滚动时镜头推近到台面；可切换「线框 / 材质」。
// 只依赖公开的 three.js。挂载到 [data-workbench] 节点，页面重绘时自动清理。
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

type Mode = 'material' | 'wire'
type MatKey = 'frame' | 'white' | 'dark' | 'light' | 'led' | 'green' | 'panel' | 'hatch' | 'bezel'

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
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.1
    const pmrem = new THREE.PMREMGenerator(this.renderer)
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.03).texture

    const brushed = brushedTexture()
    const brushedDark = brushedTexture()
    this.mats = {
      frame: new THREE.MeshStandardMaterial({ color: '#f1f3f5', map: brushed, roughnessMap: brushed, metalness: 1, roughness: 0.42, envMapIntensity: 1.25 }),
      white: new THREE.MeshStandardMaterial({ color: '#f3f4f5', metalness: 0, roughness: 0.82 }),
      dark: new THREE.MeshStandardMaterial({ color: '#4a4f55', map: brushedDark, roughnessMap: brushedDark, metalness: 1, roughness: 0.5, envMapIntensity: 1.1 }),
      light: new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false }),
      led: new THREE.MeshBasicMaterial({ color: GREEN, toneMapped: false }),
      green: new THREE.MeshStandardMaterial({ color: '#b2ed1d', metalness: 0, roughness: 0.7 }),
      panel: new THREE.MeshStandardMaterial({ color: '#fbfbfa', metalness: 0, roughness: 0.95 }),
      hatch: new THREE.MeshStandardMaterial({ color: '#c9cdd1', map: brushedDark, metalness: 0.9, roughness: 0.55 }),
      bezel: new THREE.MeshStandardMaterial({ color: '#f1f3f5', map: brushed, metalness: 1, roughness: 0.4 }),
    }
    const face = () => new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 })
    this.wire = { frame: face(), white: face(), dark: face(), light: face(), led: this.mats.led, green: new THREE.MeshBasicMaterial({ color: GREEN, toneMapped: false }), panel: face(), hatch: hatchMaterial(6), bezel: face() }
    this.guideMat = new THREE.LineBasicMaterial({ color: '#050B14', transparent: true, opacity: 0.16 })
    this.edgeMat = new THREE.LineBasicMaterial({ color: '#050B14', transparent: true, opacity: 0.62 })
    this.matTop = new THREE.MeshBasicMaterial({ map: matTexture(), toneMapped: false })

    this.scene.add(new THREE.HemisphereLight('#ffffff', '#d5d8db', 1.0))
    const key = new THREE.DirectionalLight('#ffffff', 1.2)
    key.position.set(1.5, 3, 6)
    this.scene.add(key)
    this.scene.add(this.root)
    this.build()
    this.setMode('wire')
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
    // 台面（顶面为制图垫板）与框架
    const top = this.box(3.2, 0.05, 0.9, 'white', 0, 0.9, 0)
    top.userData.top = true
    this.box(3.1, 0.07, 0.04, 'frame', 0, 0.84, 0.43)
    for (const x of [-1.52, 1.52]) {
      for (const z of [-0.4, 0.4]) this.box(0.06, 0.875, 0.06, 'frame', x, 0.4375, z)
      this.box(0.06, 0.06, 0.74, 'frame', x, 0.14, 0)
      this.box(0.06, 1.36, 0.06, 'frame', x, 1.605, -0.42)
      this.box(0.1, 0.02, 0.1, 'dark', x, 0.01, 0.4)
    }
    this.box(2.98, 0.03, 0.7, 'white', 0, 0.27, 0)
    this.box(2.98, 0.05, 0.04, 'frame', 0, 0.14, 0.38)
    // 顶梁、灯条、线槽
    this.box(3.1, 0.08, 0.14, 'frame', 0, 2.25, -0.36)
    this.box(2.7, 0.022, 0.05, 'light', 0, 2.199, -0.31)
    this.box(3.0, 0.045, 0.03, 'frame', 0, 1.92, -0.43)
    // 背板（洞洞板）
    const holes: THREE.Vector3[] = []
    for (const px of [-1.0, 0, 1.0]) {
      this.box(0.96, 0.9, 0.02, 'panel', px, 1.42, -0.44)
      if (px === 0) continue
      for (let ix = 0; ix < 13; ix++) for (let iy = 0; iy < 12; iy++) holes.push(new THREE.Vector3(px - 0.42 + ix * 0.07, 1.035 + iy * 0.07, -0.429))
    }
    const hole = new THREE.InstancedMesh(new THREE.CircleGeometry(0.005, 10), this.holeMat, holes.length)
    holes.forEach((p, i) => hole.setMatrixAt(i, new THREE.Matrix4().makeTranslation(p.x, p.y, p.z)))
    hole.userData.keep = true
    this.root.add(hole)

    // 主屏
    this.box(0.035, 0.26, 0.035, 'frame', 0, 1.055, -0.36)
    this.box(0.26, 0.012, 0.16, 'frame', 0, 0.931, -0.33)
    this.box(0.97, 0.6, 0.03, 'bezel', 0, 1.475, -0.36)
    this.screenPlane(new Screen('main'), 0.92, 0.545, 0, 1.475, -0.344)
    // 左屏（HMI）、右屏
    this.box(0.44, 0.31, 0.03, 'bezel', -1.0, 1.6, -0.415)
    this.screenPlane(new Screen('tree'), 0.4, 0.27, -1.0, 1.6, -0.399)
    this.box(0.36, 0.26, 0.03, 'bezel', 1.0, 1.62, -0.415)
    this.screenPlane(new Screen('gauge'), 0.32, 0.22, 1.0, 1.62, -0.399)
    // 洞洞板上的挂件：线槽盒、工具
    this.box(0.3, 0.06, 0.05, 'frame', -1.25, 1.2, -0.4)
    this.box(0.012, 0.2, 0.012, 'frame', -0.72, 1.22, -0.42)
    this.box(0.012, 0.16, 0.012, 'frame', -0.68, 1.2, -0.42)
    this.box(0.012, 0.24, 0.012, 'frame', -0.64, 1.24, -0.42)
    this.box(0.22, 0.14, 0.06, 'dark', 1.28, 1.22, -0.4)
    for (let i = 0; i < 4; i++) this.box(0.03, 0.03, 0.01, i === 1 ? 'green' : 'white', 1.205 + i * 0.05, 1.22, -0.366)

    // 左侧：DIN 导轨 + 电源 + PLC 模块
    this.box(1.12, 0.03, 0.02, 'frame', -0.94, 1.03, -0.4)
    this.box(0.16, 0.26, 0.14, 'frame', -1.4, 0.925 + 0.13, -0.3)
    for (let i = 0; i < 6; i++) this.box(0.1, 0.006, 0.005, 'dark', -1.4, 1.02 + i * 0.022, -0.228, false)
    for (let i = 0; i < 8; i++) {
      const x = -1.25 + i * 0.1
      const h = i < 2 ? 0.24 : 0.2
      this.box(0.09, h, 0.12, i < 2 ? 'dark' : 'white', x, 0.925 + h / 2, -0.3)
      this.box(0.06, 0.03, 0.005, 'frame', x, 0.925 + 0.035, -0.238, false)
      for (let k = 0; k < 3; k++) {
        const led = this.box(0.012, 0.012, 0.005, 'led', x - 0.022, 0.925 + h - 0.035 - k * 0.024, -0.238, false)
        this.leds.push({ mesh: led, phase: Math.random() * 6.28 })
      }
    }
    // 端子排
    for (let i = 0; i < 16; i++) this.box(0.022, 0.055, 0.06, i % 4 === 3 ? 'frame' : 'green', -0.42 + i * 0.026, 0.9525, -0.31)

    // 右侧：交换机、边缘盒子、IO 模块、信号灯塔、传感器
    this.box(0.44, 0.045, 0.24, 'frame', 0.62, 0.9475, -0.2)
    for (let i = 0; i < 8; i++) this.box(0.03, 0.02, 0.005, 'dark', 0.45 + i * 0.045, 0.948, -0.078, false)
    this.box(0.4, 0.13, 0.26, 'dark', 1.08, 0.99, -0.2)
    for (let i = 0; i < 9; i++) this.box(0.005, 0.08, 0.005, 'frame', 0.93 + i * 0.02, 0.99, -0.068, false)
    const edgeLed = this.box(0.018, 0.018, 0.006, 'led', 1.22, 1.02, -0.067, false)
    this.leds.push({ mesh: edgeLed, phase: 0 })
    this.box(0.012, 0.012, 0.006, 'frame', 1.22, 0.985, -0.067, false)
    this.box(0.18, 0.09, 0.14, 'white', 1.4, 0.97, 0.1)
    this.cyl(0.03, 0.04, 'dark', 1.42, 0.945, -0.32)
    this.cyl(0.012, 0.16, 'frame', 1.42, 1.04, -0.32)
    this.cyl(0.028, 0.05, 'white', 1.42, 1.145, -0.32)
    this.cyl(0.028, 0.05, 'white', 1.42, 1.2, -0.32)
    this.cyl(0.028, 0.05, 'green', 1.42, 1.255, -0.32)
    // 台面上的物件
    this.box(0.5, 0.016, 0.16, 'frame', 0.02, 0.933, 0.24)
    this.box(0.07, 0.022, 0.11, 'white', 0.4, 0.936, 0.24)
    this.box(0.26, 0.012, 0.34, 'frame', -0.72, 0.931, 0.14)
    this.cyl(0.035, 0.09, 'frame', -1.2, 0.97, 0.22)
    this.box(0.3, 0.008, 0.03, 'frame', 0.9, 0.929, 0.3)

    // 下层：电机 + 泵、收纳箱
    this.cyl(0.11, 0.34, 'frame', -0.95, 0.4, 0, 'x')
    for (let i = 0; i < 7; i++) this.cyl(0.118, 0.012, 'dark', -1.07 + i * 0.04, 0.4, 0, 'x')
    const fan = this.box(0.012, 0.16, 0.012, 'dark', -0.635, 0.4, 0.06)
    this.spin.push(fan)
    this.cyl(0.03, 0.14, 'frame', -0.71, 0.4, 0, 'x')
    this.box(0.18, 0.2, 0.2, 'hatch', -0.55, 0.385, 0)
    this.cyl(0.05, 0.1, 'frame', -0.41, 0.4, 0, 'x')
    this.box(0.5, 0.02, 0.26, 'frame', -0.85, 0.295, 0)
    this.box(0.5, 0.26, 0.4, 'white', 0.3, 0.415, 0)
    this.box(0.5, 0.03, 0.42, 'frame', 0.3, 0.56, 0)
    this.box(0.42, 0.2, 0.4, 'hatch', 0.95, 0.385, 0)
    this.box(0.14, 0.03, 0.01, 'frame', 0.95, 0.42, 0.205, false)

    // 制图辅助线：地面线、台面线、边界线、30° 参考线与尺寸线
    const gp: number[] = []
    const L = (x1: number, y1: number, x2: number, y2: number) => gp.push(x1, y1, -0.6, x2, y2, -0.6)
    L(-30, 0, 30, 0)
    const gg = new THREE.BufferGeometry()
    gg.setAttribute('position', new THREE.Float32BufferAttribute(gp, 3))
    this.guides.add(new THREE.LineSegments(gg, this.guideMat))
    // 地面：斜线填充带
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 0.09), this.groundMat)
    ground.position.set(0, -0.045, -0.6)
    this.guides.add(ground)
    this.scene.add(this.guides)

    // 数据流：细线缆 + 绿色小点
    const cable = (pts: [number, number, number][], n: number, speed: number) => {
      const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)))
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 96, 0.0021, 6), this.cableMat)
      tube.userData.keep = true
      tube.userData.cable = true
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
    cable([[-1.0, 0.95, -0.22], [-0.8, 0.935, 0.0], [-0.35, 0.935, -0.1], [-0.1, 1.0, -0.33], [-0.02, 1.2, -0.34]], 3, 0.08)
    cable([[0.95, 0.99, -0.06], [0.75, 0.935, 0.04], [0.3, 0.935, -0.16], [0.1, 1.02, -0.33], [0.03, 1.2, -0.34]], 3, 0.1)
    cable([[-1.15, 1.17, -0.3], [-1.2, 1.32, -0.4], [-1.02, 1.44, -0.42]], 2, 0.12)
    cable([[1.2, 1.06, -0.2], [1.24, 1.3, -0.4], [1.02, 1.49, -0.42]], 2, 0.11)
    cable([[1.4, 0.975, 0.02], [1.3, 0.935, 0.0], [1.2, 0.96, -0.08]], 2, 0.14)
    cable([[0.62, 0.95, -0.08], [0.6, 0.935, 0.05], [0.3, 0.935, 0.2]], 2, 0.13)
    cable([[-0.72, 0.94, 0.0], [-0.6, 0.935, -0.2], [-0.3, 0.96, -0.3]], 2, 0.12)
    cable([[-0.78, 0.4, 0.1], [-0.3, 0.3, 0.2], [0.05, 0.33, 0.22]], 2, 0.09)
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
    this.edgeMat.opacity = mode === 'wire' ? 0.62 : 0.14
    this.host.dataset.mode = mode
  }

  applyTheme() {
    const css = getComputedStyle(document.documentElement)
    const bg = css.getPropertyValue('--background').trim() || '#FFFFFF'
    const fg = css.getPropertyValue('--foreground').trim() || '#050B14'
    const dark = new THREE.Color(bg).getHSL({ h: 0, s: 0, l: 0 }).l < 0.5
    const set = (k: MatKey, c: string) => (this.wire[k] as THREE.MeshBasicMaterial).color.set(c)
    // 层次：背板最浅，框架白，前景硬件逐级加深
    set('panel', dark ? '#0a1119' : '#FCFCFB'); set('frame', dark ? '#0f161e' : '#FFFFFF'); set('light', dark ? '#ffffff' : '#FFFFFF')
    set('white', dark ? '#1c242c' : '#E6E8EA'); set('dark', dark ? '#3a444e' : '#33383d'); set('bezel', dark ? '#0f161e' : '#FFFFFF')
    for (const h of [this.wire.hatch as THREE.ShaderMaterial, this.groundMat]) { h.uniforms.uBg.value.set(dark ? '#0f161e' : '#FFFFFF'); h.uniforms.uLine.value.set(fg) }
    this.groundMat.uniforms.uBg.value.set(bg); this.groundMat.uniforms.uAlpha.value = 0.1
    this.holeMat.color.set(dark ? '#232c35' : '#DDE0E3')
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

  /** 两段都是正视角：先正面推近台面，再切到台面俯视图并继续推近垫板。 */
  private updateCamera() {
    const p = this.progress
    const ss = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }
    const SWITCH = 0.62
    let height: number
    const cam = this.camera
    if (p < SWITCH) {
      const e = ss(0, SWITCH, p)
      const h0 = Math.max(2.75, 3.7 / this.aspect)
      height = h0 + (0.62 - h0) * e
      const cy = 1.2 + (0.99 - 1.2) * e
      cam.up.set(0, 1, 0)
      const px = this.pan.x * 0.035 * (1 - e)
      const py = this.pan.y * 0.02 * (1 - e)
      cam.position.set(px, cy + py, 10)
      cam.lookAt(px, cy + py, 0)
      this.guides.visible = true
    } else {
      const e = ss(SWITCH, 1, p)
      const h0 = 0.9
      height = h0 + (0.66 - h0) * e
      const cx = 0.28 * e
      const cz = 0.02 + 0.1 * e
      this.guides.visible = false
      cam.up.set(0, 0, -1)
      cam.position.set(cx, 1.85, cz)
      cam.lookAt(cx, 0, cz)
    }
    cam.top = height / 2
    cam.bottom = -height / 2
    cam.right = (height * this.aspect) / 2
    cam.left = -cam.right
    cam.updateProjectionMatrix()
    const fade = Math.min(1, Math.abs(p - SWITCH) / 0.06)
    this.renderer.domElement.style.opacity = String(fade)
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
      a.el.style.opacity = String(Math.max(0, Math.min(1, el - 1.6) - this.progress * 8))
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
