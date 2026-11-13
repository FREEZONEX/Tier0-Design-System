import { addPropertyControls, ControlType } from "framer"
import { useEffect, useRef } from "react"

/**
 * Transparent grid with Tier0 green data beams.
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 900
 */
export default function DatalinesWithGrid(props) {
    const {
        beamColor = "#B2ED1D",
        gridColor = "#A3A3A3",
        cellSize = 50,
        maxLines = 12,
        baseSpeed = 2,
        lineLength = 150,
        spawnProbability = 0.1,
        style,
    } = props

    const containerRef = useRef(null)
    const canvasRef = useRef(null)
    const position = style?.position

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let frameId = 0
        let active = true
        const lines = []

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            const width = container.clientWidth
            const height = container.clientHeight
            const nextWidth = Math.max(1, Math.floor(width * dpr))
            const nextHeight = Math.max(1, Math.floor(height * dpr))
            if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
                canvas.width = nextWidth
                canvas.height = nextHeight
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            }
            return { width, height }
        }

        const observer = new ResizeObserver(resize)
        observer.observe(container)
        resize()

        const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
        if (reduced) return () => observer.disconnect()

        const tick = () => {
            if (!active) return
            const { width, height } = resize()
            ctx.clearRect(0, 0, width, height)

            if (Math.random() < spawnProbability && lines.length < maxLines) {
                lines.push({
                    x:
                        Math.floor(Math.random() * (width / cellSize)) *
                        cellSize,
                    y: -cellSize,
                    history: [],
                    dx: 0,
                    dy: 1,
                    speed: baseSpeed,
                    lineLengthPx: Math.floor(
                        Math.random() * lineLength * 0.5 + lineLength * 0.75
                    ),
                })
            }

            for (const line of lines) {
                line.history.push({ x: line.x, y: line.y })
                const historyLimit = Math.max(
                    2,
                    Math.ceil(line.lineLengthPx / line.speed)
                )
                if (line.history.length > historyLimit) line.history.shift()

                line.x += line.dx * line.speed
                line.y += line.dy * line.speed

                if (line.x % cellSize === 0 && line.y % cellSize === 0) {
                    const maxX = Math.floor(width / cellSize) * cellSize
                    if (line.x <= 0 && line.dx === -1) {
                        line.dx = 0
                        line.dy = 1
                    } else if (line.x >= maxX && line.dx === 1) {
                        line.dx = 0
                        line.dy = 1
                    } else if (line.dy === 1) {
                        if (Math.random() < 0.3) {
                            line.dy = 0
                            line.dx = Math.random() < 0.5 ? 1 : -1
                        }
                    } else if (Math.random() < 0.6) {
                        line.dy = 1
                        line.dx = 0
                    }
                }

                if (line.history.length < 2) continue
                const trail = line.history
                const tail = trail[0]
                const head = trail[trail.length - 1]

                ctx.lineCap = "round"
                ctx.lineJoin = "round"
                ctx.lineWidth = 1.5

                const gradient = ctx.createLinearGradient(
                    tail.x,
                    tail.y,
                    head.x,
                    head.y
                )
                gradient.addColorStop(0, withAlpha(beamColor, 0))
                gradient.addColorStop(0.6, withAlpha(beamColor, 0.35))
                gradient.addColorStop(1, withAlpha(beamColor, 0.9))

                ctx.beginPath()
                ctx.moveTo(trail[0].x, trail[0].y)
                for (let i = 1; i < trail.length; i++)
                    ctx.lineTo(trail[i].x, trail[i].y)
                ctx.strokeStyle = gradient
                ctx.shadowBlur = 0
                ctx.stroke()

                const headCount = Math.max(
                    2,
                    Math.ceil(20 / Math.max(1, line.speed))
                )
                const headIndex = Math.max(0, trail.length - 1 - headCount)
                ctx.beginPath()
                ctx.moveTo(trail[headIndex].x, trail[headIndex].y)
                for (let i = headIndex + 1; i < trail.length; i++)
                    ctx.lineTo(trail[i].x, trail[i].y)
                ctx.strokeStyle = withAlpha(beamColor, 0.95)
                ctx.shadowColor = beamColor
                ctx.shadowBlur = 12
                ctx.stroke()
                ctx.shadowBlur = 0
            }

            for (let i = lines.length - 1; i >= 0; i--) {
                const tail = lines[i].history[0]
                if (tail && tail.y >= height + cellSize * 2) lines.splice(i, 1)
            }

            frameId = requestAnimationFrame(tick)
        }

        frameId = requestAnimationFrame(tick)
        return () => {
            active = false
            cancelAnimationFrame(frameId)
            observer.disconnect()
        }
    }, [beamColor, cellSize, maxLines, baseSpeed, lineLength, spawnProbability])

    return (
        <div
            ref={containerRef}
            style={{
                ...style,
                position:
                    !position || position === "static" ? "relative" : position,
                overflow: "hidden",
                backgroundColor: "transparent",
                backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
                backgroundSize: `${cellSize}px ${cellSize}px`,
                backgroundPosition: "0 0",
            }}
        >
            <canvas
                ref={canvasRef}
                aria-hidden
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                }}
            />
        </div>
    )
}

function withAlpha(color, alpha) {
    const value = color.trim()
    const hex = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(value)
    if (hex) {
        let digits = hex[1]
        if (digits.length === 3)
            digits = digits
                .split("")
                .map((char) => char + char)
                .join("")
        if (digits.length === 8) digits = digits.slice(0, 6)
        const parsed = parseInt(digits, 16)
        return `rgba(${(parsed >> 16) & 255},${(parsed >> 8) & 255},${parsed & 255},${alpha})`
    }
    const rgb = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i.exec(value)
    if (rgb) return `rgba(${rgb[1]},${rgb[2]},${rgb[3]},${alpha})`
    return value
}

addPropertyControls(DatalinesWithGrid, {
    beamColor: {
        type: ControlType.Color,
        title: "光束",
        defaultValue: "#B2ED1D",
    },
    gridColor: {
        type: ControlType.Color,
        title: "网格",
        defaultValue: "#A3A3A3",
    },
    cellSize: {
        type: ControlType.Number,
        title: "格子",
        defaultValue: 50,
        min: 24,
        max: 120,
        step: 2,
    },
    maxLines: {
        type: ControlType.Number,
        title: "光束数量",
        defaultValue: 12,
        min: 1,
        max: 40,
        step: 1,
    },
    baseSpeed: {
        type: ControlType.Number,
        title: "速度",
        defaultValue: 2,
        min: 1,
        max: 8,
        step: 1,
    },
    lineLength: {
        type: ControlType.Number,
        title: "拖尾",
        defaultValue: 150,
        min: 40,
        max: 400,
        step: 10,
    },
    spawnProbability: {
        type: ControlType.Number,
        title: "出现频率",
        defaultValue: 0.1,
        min: 0.02,
        max: 0.5,
        step: 0.02,
    },
})
