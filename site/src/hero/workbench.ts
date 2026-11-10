// 首屏工作台：three.js 场景，正视图的工业工作台（台面、背板、屏幕、PLC、边缘盒子），
// 绿色小点沿线缆流动表示数据接入。向下滚动时镜头推近到台面；可切换「线框 / 材质」。
// 只依赖公开的 three.js。挂载到 [data-workbench] 节点，页面重绘时自动清理。
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

type Mode = 'material' | 'wire'
type MatKey = 'frame' | 'white' | 'dark' | 'light' | 'led' | 'green'

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

/** 主屏内容：深色控制台界面，左侧数据树，右侧趋势线。 */
class Screen {
  canvas = document.createElement('canvas')
  texture: THREE.CanvasTexture
  series: number[] = Array.from({ length: 48 }, (_, i) => 0.55 + Math.sin(i / 5) * 0.12)
  constructor(private kind: 'main' | 'tree' | 'gauge') {
    this.canvas.width = kind === 'main' ? 768 : 384
    this.canvas.height = kind === 'main' ? 456 : 272
    this.texture = new THREE.CanvasTexture(this.canvas)
    this.texture.colorSpace = THREE.SRGBColorSpace
    this.draw(0)
  }
  draw(t: number) {
    const g = this.canvas.getContext('2d')!
    const W = this.canvas.width
    const H = this.canvas.height
    g.fillStyle = '#0B1118'
    g.fillRect(0, 0, W, H)
    g.font = `${Math.round(H / 26)}px "IBM Plex Mono", monospace`
    if (this.kind === 'main') {
      g.fillStyle = '#151A19'
      g.fillRect(0, 0, W, 34)
      g.fillStyle = '#878787'
      g.fillText('tier0 / uns / Factory-A / Line-01', 16, 23)
      g.fillStyle = GREEN
      g.fillRect(W - 116, 13, 8, 8)
      g.fillStyle = '#d9d9d9'
      g.fillText('RUNNING', W - 100, 23)
      const tree = ['Factory-A', '  Line-01', '    CNC-03', '      Metrics', '      State', '    CNC-04', '  Line-02']
      tree.forEach((s, i) => {
        const on = i === 2
        if (on) {
          g.fillStyle = 'rgba(178,237,29,0.14)'
          g.fillRect(8, 52 + i * 30, 220, 26)
        }
        g.fillStyle = on ? GREEN : '#6b7075'
        g.fillRect(16 + s.search(/\S/) * 7, 62 + i * 30, 6, 6)
        g.fillStyle = on ? '#ffffff' : '#9a9a9a'
        g.fillText(s.trim(), 30 + s.search(/\S/) * 7, 70 + i * 30)
      })
      g.strokeStyle = '#1C1F1E'
      g.beginPath()
      g.moveTo(240, 34)
      g.lineTo(240, H)
      g.stroke()
      // readout
      const v = 72 + Math.sin(t / 900) * 0.8
      g.fillStyle = '#878787'
      g.fillText('SPINDLE_TEMP  °C', 264, 72)
      g.fillStyle = '#ffffff'
      g.font = `600 ${Math.round(H / 7)}px Inter, sans-serif`
      g.fillText(v.toFixed(1), 262, 140)
      // chart
      const x0 = 264
      const y0 = 180
      const cw = W - x0 - 24
      const ch = H - y0 - 40
      g.strokeStyle = '#1C1F1E'
      for (let i = 0; i <= 4; i++) {
        g.beginPath()
        g.moveTo(x0, y0 + (ch / 4) * i)
        g.lineTo(x0 + cw, y0 + (ch / 4) * i)
        g.stroke()
      }
      g.strokeStyle = GREEN
      g.lineWidth = 2.5
      g.beginPath()
      this.series.forEach((s, i) => {
        const x = x0 + (cw / (this.series.length - 1)) * i
        const y = y0 + ch * (1 - s)
        if (i) g.lineTo(x, y)
        else g.moveTo(x, y)
      })
      g.stroke()
      g.lineWidth = 1
    } else if (this.kind === 'tree') {
      g.strokeStyle = '#4a4f54'
      g.lineWidth = 2
      const nodes: [number, number][] = [[60, 60], [190, 60], [320, 60], [120, 160], [260, 160], [190, 230]]
      const links = [[0, 3], [1, 3], [1, 4], [2, 4], [3, 5], [4, 5]]
      links.forEach(([a, b]) => {
        g.beginPath()
        g.moveTo(...nodes[a])
        g.lineTo(...nodes[b])
        g.stroke()
      })
      nodes.forEach(([x, y], i) => {
        g.fillStyle = i === 5 ? GREEN : '#d9d9d9'
        g.fillRect(x - 9, y - 9, 18, 18)
      })
      const k = (t / 1400) % 1
      g.fillStyle = GREEN
      g.fillRect(60 + (120 - 60) * k - 4, 60 + 100 * k - 4, 8, 8)
    } else {
      g.fillStyle = '#878787'
      g.fillText('EDGE · 192.168.1.50', 18, 36)
      const p = 0.62 + Math.sin(t / 1300) * 0.08
      g.strokeStyle = '#1C1F1E'
      g.lineWidth = 16
      g.beginPath()
      g.arc(W / 2, H / 2 + 34, 82, Math.PI * 0.8, Math.PI * 2.2)
      g.stroke()
      g.strokeStyle = GREEN
      g.beginPath()
      g.arc(W / 2, H / 2 + 34, 82, Math.PI * 0.8, Math.PI * (0.8 + 1.4 * p))
      g.stroke()
      g.fillStyle = '#ffffff'
      g.font = `600 ${Math.round(H / 7)}px Inter, sans-serif`
      g.textAlign = 'center'
      g.fillText(`${Math.round(p * 100)}%`, W / 2, H / 2 + 48)
      g.textAlign = 'left'
      g.lineWidth = 1
    }
    this.texture.needsUpdate = true
  }
  tick(t: number) {
    if (this.kind === 'main') {
      this.series.shift()
      const last = this.series[this.series.length - 1]
      this.series.push(Math.min(0.92, Math.max(0.18, last + (Math.random() - 0.48) * 0.08)))
    }
    this.draw(t)
  }
}

export class Workbench {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100)
  private root = new THREE.Group()
  private mats: Record<MatKey, THREE.Material>
  private wireFace: THREE.MeshBasicMaterial
  private edgeMat: THREE.LineBasicMaterial
  private screens: Screen[] = []
  private flows: { curve: THREE.CatmullRomCurve3; dots: THREE.Mesh[]; speed: number; offset: number }[] = []
  private leds: { mesh: THREE.Mesh; phase: number }[] = []
  private anchors: { el: HTMLElement; pos: THREE.Vector3 }[] = []
  private mode: Mode = 'material'
  private progress = 0
  private raf = 0
  private visible = true
  private lastScreen = 0
  private io: IntersectionObserver
  private ro: ResizeObserver
  private reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

  constructor(private host: HTMLElement) {
    const canvas = host.querySelector('canvas')!
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.05
    const pmrem = new THREE.PMREMGenerator(this.renderer)
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

    const brushed = brushedTexture()
    this.mats = {
      frame: new THREE.MeshStandardMaterial({ color: '#dfe2e5', map: brushed, metalness: 0.85, roughness: 0.32 }),
      white: new THREE.MeshStandardMaterial({ color: '#f6f6f4', metalness: 0, roughness: 0.75 }),
      dark: new THREE.MeshStandardMaterial({ color: '#1d2124', metalness: 0.35, roughness: 0.45 }),
      light: new THREE.MeshBasicMaterial({ color: '#ffffff' }),
      led: new THREE.MeshBasicMaterial({ color: GREEN }),
      green: new THREE.MeshStandardMaterial({ color: '#a9d83a', metalness: 0.1, roughness: 0.6 }),
    }
    this.wireFace = new THREE.MeshBasicMaterial({ color: '#ffffff', polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 })
    this.edgeMat = new THREE.LineBasicMaterial({ color: '#050B14', transparent: true, opacity: 0.16 })

    this.scene.add(new THREE.HemisphereLight('#ffffff', '#c9ccd0', 1.1))
    const key = new THREE.DirectionalLight('#ffffff', 1.4)
    key.position.set(2, 4, 5)
    this.scene.add(key)
    this.scene.add(this.root)
    this.build()
    this.applyTheme()

    this.io = new IntersectionObserver(([e]) => {
      this.visible = e.isIntersecting
    })
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
    if (edges && key !== 'led' && key !== 'light') {
      const l = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 20), this.edgeMat)
      m.add(l)
    }
    this.root.add(m)
    return m
  }
  private box(w: number, h: number, d: number, key: MatKey, x: number, y: number, z: number, edges = true) {
    return this.add(new THREE.BoxGeometry(w, h, d), key, x, y, z, edges)
  }

  private build() {
    // 台面与框架
    this.box(3.2, 0.05, 0.9, 'white', 0, 0.9, 0)
    this.box(3.1, 0.06, 0.04, 'frame', 0, 0.845, 0.43)
    for (const x of [-1.52, 1.52]) {
      for (const z of [-0.4, 0.4]) this.box(0.05, 0.875, 0.05, 'frame', x, 0.4375, z)
      this.box(0.05, 0.05, 0.85, 'frame', x, 0.12, 0)
      this.box(0.05, 1.32, 0.05, 'frame', x, 1.585, -0.42)
    }
    this.box(3.0, 0.025, 0.7, 'white', 0, 0.24, 0)
    // 顶梁与灯条
    this.box(3.1, 0.06, 0.14, 'frame', 0, 2.22, -0.36)
    this.box(2.8, 0.025, 0.05, 'light', 0, 2.18, -0.31)
    // 背板（洞洞板）
    const holes: THREE.Vector3[] = []
    for (const px of [-1.0, 0, 1.0]) {
      this.box(0.96, 0.92, 0.02, 'white', px, 1.42, -0.44)
      if (px === 0) continue
      for (let ix = 0; ix < 13; ix++) for (let iy = 0; iy < 12; iy++) holes.push(new THREE.Vector3(px - 0.42 + ix * 0.07, 1.03 + iy * 0.07, -0.429))
    }
    const hole = new THREE.InstancedMesh(new THREE.CircleGeometry(0.0075, 10), new THREE.MeshBasicMaterial({ color: '#9aa0a6' }), holes.length)
    holes.forEach((p, i) => hole.setMatrixAt(i, new THREE.Matrix4().makeTranslation(p.x, p.y, p.z)))
    hole.userData.keep = true
    this.root.add(hole)

    // 主屏
    this.box(0.04, 0.3, 0.04, 'frame', 0, 1.06, -0.36)
    this.box(0.94, 0.58, 0.035, 'dark', 0, 1.47, -0.36)
    this.screenPlane(new Screen('main'), 0.88, 0.52, 0, 1.47, -0.341)
    // 侧屏
    this.box(0.42, 0.3, 0.03, 'white', -1.0, 1.55, -0.415)
    this.screenPlane(new Screen('tree'), 0.36, 0.24, -1.0, 1.55, -0.399)
    this.box(0.34, 0.25, 0.03, 'white', 1.0, 1.6, -0.415)
    this.screenPlane(new Screen('gauge'), 0.29, 0.2, 1.0, 1.6, -0.399)

    // 左侧：PLC 机架
    this.box(1.0, 0.025, 0.02, 'frame', -0.98, 1.08, -0.42)
    for (let i = 0; i < 9; i++) {
      const x = -1.38 + i * 0.1
      const h = i === 0 ? 0.24 : 0.2
      const key: MatKey = i === 0 ? 'white' : i < 3 ? 'dark' : 'white'
      this.box(0.088, h, 0.12, key, x, 0.925 + h / 2, -0.3)
      for (let k = 0; k < 3; k++) {
        const led = this.box(0.014, 0.014, 0.005, 'led', x - 0.02, 0.925 + h - 0.04 - k * 0.026, -0.238, false)
        this.leds.push({ mesh: led, phase: Math.random() * 6.28 })
      }
    }
    // 端子排（绿色端子：简单形状，可直接用品牌绿）
    for (let i = 0; i < 14; i++) this.box(0.024, 0.05, 0.06, i % 4 === 3 ? 'white' : 'green', -0.62 + i * 0.03, 0.95, -0.32)

    // 右侧：边缘盒子
    this.box(0.38, 0.12, 0.26, 'dark', 1.0, 0.985, -0.18)
    for (let i = 0; i < 7; i++) this.box(0.006, 0.07, 0.005, 'frame', 0.88 + i * 0.022, 0.985, -0.048, false)
    const edgeLed = this.box(0.02, 0.02, 0.006, 'led', 1.13, 1.0, -0.047, false)
    this.leds.push({ mesh: edgeLed, phase: 0 })
    // 小型 IO 模块
    this.box(0.2, 0.08, 0.14, 'white', 1.3, 0.965, 0.05)
    // 传感器（圆柱）
    const cyl = this.add(new THREE.CylinderGeometry(0.035, 0.035, 0.22, 24), 'frame', 1.42, 1.035, -0.3)
    cyl.rotation.z = 0
    // 键盘 / 平板
    this.box(0.52, 0.016, 0.17, 'dark', 0.05, 0.933, 0.22)
    this.box(0.24, 0.012, 0.32, 'white', -0.62, 0.931, 0.18)

    // 数据流：线缆 + 绿色小点
    const cable = (pts: [number, number, number][], n: number, speed: number) => {
      const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)))
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 64, 0.0055, 6), this.mats.dark)
      tube.userData.key = 'dark'
      tube.userData.cable = true
      this.root.add(tube)
      const dots: THREE.Mesh[] = []
      for (let i = 0; i < n; i++) {
        const d = new THREE.Mesh(new THREE.SphereGeometry(0.014, 12, 8), this.mats.led)
        d.userData.keep = true
        this.root.add(d)
        dots.push(d)
      }
      this.flows.push({ curve, dots, speed, offset: Math.random() })
    }
    cable([[-1.1, 0.95, -0.24], [-0.9, 0.93, -0.05], [-0.4, 0.93, -0.12], [-0.12, 1.0, -0.33], [0, 1.18, -0.36]], 3, 0.09)
    cable([[0.9, 0.99, -0.05], [0.7, 0.93, 0.0], [0.3, 0.93, -0.2], [0.1, 1.05, -0.35], [0.04, 1.2, -0.37]], 3, 0.11)
    cable([[-1.3, 1.17, -0.3], [-1.3, 1.3, -0.4], [-1.0, 1.4, -0.43]], 2, 0.13)
    cable([[1.18, 1.0, -0.27], [1.25, 1.25, -0.42], [1.0, 1.47, -0.43]], 2, 0.12)
    cable([[1.3, 0.97, 0.12], [1.15, 0.93, 0.1], [1.05, 0.96, -0.04]], 2, 0.15)

    // 地面阴影
    const sc = document.createElement('canvas')
    sc.width = sc.height = 256
    const sg = sc.getContext('2d')!
    const grad = sg.createRadialGradient(128, 128, 10, 128, 128, 128)
    grad.addColorStop(0, 'rgba(5,11,20,0.16)')
    grad.addColorStop(1, 'rgba(5,11,20,0)')
    sg.fillStyle = grad
    sg.fillRect(0, 0, 256, 256)
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 1.6), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false }))
    floor.rotation.x = -Math.PI / 2
    floor.userData.keep = true
    this.root.add(floor)
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
      if (key === 'led' || key === 'light') return
      o.material = mode === 'wire' && !o.userData.cable ? this.wireFace : this.mats[key]
    })
    this.edgeMat.opacity = mode === 'wire' ? 0.72 : 0.16
    this.host.dataset.mode = mode
  }

  applyTheme() {
    const css = getComputedStyle(document.documentElement)
    const bg = css.getPropertyValue('--background').trim() || '#FFFFFF'
    const fg = css.getPropertyValue('--foreground').trim() || '#050B14'
    const dark = new THREE.Color(bg).getHSL({ h: 0, s: 0, l: 0 }).l < 0.5
    this.wireFace.color.set(bg)
    this.edgeMat.color.set(fg)
    ;(this.mats.white as THREE.MeshStandardMaterial).color.set(dark ? '#2a2f33' : '#f6f6f4')
    this.renderer.toneMappingExposure = dark ? 0.9 : 1.05
  }

  setProgress(p: number) {
    this.progress = p
  }

  addAnchor(el: HTMLElement, x: number, y: number, z: number) {
    this.anchors.push({ el, pos: new THREE.Vector3(x, y, z) })
  }

  private resize() {
    const stage = this.host.querySelector('.wb-stage') as HTMLElement
    const w = stage.clientWidth
    const h = stage.clientHeight
    if (!w || !h) return
    this.renderer.setSize(w, h, false)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
  }

  private updateCamera() {
    const e = this.progress < 0.5 ? 2 * this.progress * this.progress : 1 - Math.pow(-2 * this.progress + 2, 2) / 2
    const narrow = this.camera.aspect < 1
    const pan = narrow ? 0 : -0.55
    const from = new THREE.Vector3(pan, 1.5, narrow ? 10.5 : 7.2)
    const to = new THREE.Vector3(0, 2.3, narrow ? 3.4 : 2.7)
    const lookFrom = new THREE.Vector3(pan, 1.5, 0)
    const lookTo = new THREE.Vector3(0, 1.05, -0.2)
    this.camera.position.lerpVectors(from, to, e)
    this.camera.lookAt(new THREE.Vector3().lerpVectors(lookFrom, lookTo, e))
  }

  private loop = (t: number) => {
    if (!this.host.isConnected) return this.dispose()
    this.raf = requestAnimationFrame(this.loop)
    if (!this.visible) return
    const time = this.reduced ? 0 : t
    this.updateCamera()
    for (const f of this.flows) {
      f.dots.forEach((d, i) => {
        const u = (f.offset + time * 0.001 * f.speed + i / f.dots.length) % 1
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
      a.el.style.opacity = String(Math.max(0, 1 - this.progress * 1.6))
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
