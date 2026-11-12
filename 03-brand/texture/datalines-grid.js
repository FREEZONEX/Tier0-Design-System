/**
 * 数据光束网格：透明网格上，品牌绿光束沿网格线流动。
 * 不依赖框架，任何网页都能用；遵循系统「减少动态效果」设置（只显示网格）。
 *
 * 用法：
 *   import { mountDatalinesGrid } from './datalines-grid.js'
 *   const stop = mountDatalinesGrid(document.querySelector('#hero-bg'), { cellSize: 50 })
 *   // 不再需要时：stop()
 *
 * 容器需要有宽高；函数会把网格画成容器背景，并在里面铺一张 canvas 画光束。
 */
const DEFAULTS = {
  beamColor: '#B2ED1D', // 光束
  gridColor: '#A3A3A3', // 网格
  gridOpacity: 0.45, // 网格线透明度（暗底建议 0.25）
  cellSize: 50, // 格子 24–120
  maxLines: 12, // 同时存在的光束数量 1–40
  baseSpeed: 2, // 速度 1–8
  lineLength: 150, // 拖尾长度 40–400
  spawnProbability: 0.1, // 每帧出现新光束的概率 0.02–0.5
}

function withAlpha(hex, a) {
  let h = hex.replace('#', '')
  if (h.length === 3) h = h.split('').map(c => c + c).join('')
  const n = parseInt(h.slice(0, 6), 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`
}

export function mountDatalinesGrid(container, options = {}) {
  const o = { ...DEFAULTS, ...options }
  const grid = withAlpha(o.gridColor, o.gridOpacity)
  if (getComputedStyle(container).position === 'static') container.style.position = 'relative'
  container.style.overflow = 'hidden'
  container.style.backgroundImage = `linear-gradient(to right, ${grid} 1px, transparent 1px), linear-gradient(to bottom, ${grid} 1px, transparent 1px)`
  container.style.backgroundSize = `${o.cellSize}px ${o.cellSize}px`

  const canvas = document.createElement('canvas')
  canvas.setAttribute('aria-hidden', 'true')
  Object.assign(canvas.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', pointerEvents: 'none' })
  container.appendChild(canvas)
  const ctx = canvas.getContext('2d')

  let W = 0, H = 0
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    W = container.clientWidth; H = container.clientHeight
    canvas.width = Math.max(1, Math.floor(W * dpr)); canvas.height = Math.max(1, Math.floor(H * dpr))
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  const ro = new ResizeObserver(resize); ro.observe(container); resize()

  const stopAll = () => { ro.disconnect(); cancelAnimationFrame(raf); canvas.remove() }
  let raf = 0
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return stopAll

  const lines = []
  const cs = o.cellSize
  const tick = () => {
    ctx.clearRect(0, 0, W, H)
    if (Math.random() < o.spawnProbability && lines.length < o.maxLines) {
      lines.push({ x: Math.floor(Math.random() * (W / cs)) * cs, y: -cs, h: [], dx: 0, dy: 1, sp: o.baseSpeed, len: Math.floor(Math.random() * o.lineLength * 0.5 + o.lineLength * 0.75) })
    }
    for (const l of lines) {
      l.h.push({ x: l.x, y: l.y })
      if (l.h.length > Math.max(2, Math.ceil(l.len / l.sp))) l.h.shift()
      l.x += l.dx * l.sp; l.y += l.dy * l.sp
      // 只在网格交点转向：向下时 30% 概率转横向，横向时 60% 概率转回向下
      if (l.x % cs === 0 && l.y % cs === 0) {
        const maxX = Math.floor(W / cs) * cs
        if ((l.x <= 0 && l.dx === -1) || (l.x >= maxX && l.dx === 1)) { l.dx = 0; l.dy = 1 }
        else if (l.dy === 1) { if (Math.random() < 0.3) { l.dy = 0; l.dx = Math.random() < 0.5 ? 1 : -1 } }
        else if (Math.random() < 0.6) { l.dy = 1; l.dx = 0 }
      }
      const t = l.h
      if (t.length < 2) continue
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 1.5
      const g = ctx.createLinearGradient(t[0].x, t[0].y, t[t.length - 1].x, t[t.length - 1].y)
      g.addColorStop(0, withAlpha(o.beamColor, 0)); g.addColorStop(0.6, withAlpha(o.beamColor, 0.35)); g.addColorStop(1, withAlpha(o.beamColor, 0.9))
      ctx.beginPath(); ctx.moveTo(t[0].x, t[0].y); for (let i = 1; i < t.length; i++) ctx.lineTo(t[i].x, t[i].y)
      ctx.strokeStyle = g; ctx.shadowBlur = 0; ctx.stroke()
      // 光束头部发光
      const hi = Math.max(0, t.length - 1 - Math.max(2, Math.ceil(20 / Math.max(1, l.sp))))
      ctx.beginPath(); ctx.moveTo(t[hi].x, t[hi].y); for (let i = hi + 1; i < t.length; i++) ctx.lineTo(t[i].x, t[i].y)
      ctx.strokeStyle = withAlpha(o.beamColor, 0.95); ctx.shadowColor = o.beamColor; ctx.shadowBlur = 12; ctx.stroke(); ctx.shadowBlur = 0
    }
    for (let i = lines.length - 1; i >= 0; i--) if (lines[i].h[0] && lines[i].h[0].y >= H + cs * 2) lines.splice(i, 1)
    raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
  return stopAll
}
