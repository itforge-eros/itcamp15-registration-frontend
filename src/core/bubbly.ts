interface BubblyConfig {
  animate?: boolean
  canvas?: HTMLCanvasElement
  shadowColor?: string
  bubbleCount?: number
  blur?: number
  colorStart?: string
  colorStop?: string
  bubbleFunc?: () => string
  angleFunc?: () => number
  velocityFunc?: () => number
  radiusFunc?: () => number
  compose?: string
}

interface Bubble {
  /** Fill Style */
  f: string

  /** X Position */
  x: number

  /** Y Position */
  y: number

  /** Radius */
  r: number

  /** Angle */
  a: number

  /** Velocity */
  v: number
}

export function bubbly(config: BubblyConfig = {}) {
  if (typeof window === 'undefined') return

  const r = () => Math.random()

  const {
    animate = true,
    canvas = document.createElement('canvas'),
    shadowColor = '#fff',
    blur = 4,
    colorStart = '#2AE',
    colorStop = '#17B',
    compose = 'lighter'
  } = config

  let {width, height} = canvas

  if (canvas.parentNode === null) {
    canvas.setAttribute(
      'style',
      'position:fixed;z-index:-1;left:0;top:0;min-width:100vw;min-height:100vh;'
    )

    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight

    document.body.appendChild(canvas)
  }

  const context = canvas.getContext('2d')
  if (!context) return

  context.shadowColor = shadowColor
  context.shadowBlur = blur

  const gradient = context.createLinearGradient(width / 2, 0, width / 2, height)
  gradient.addColorStop(0, colorStart)
  gradient.addColorStop(1, colorStop)

  const {
    bubbleCount = Math.floor((width + height) * 0.02),
    bubbleFunc = () => `hsla(0, 0%, 100%, ${r() * 0.1})`,
    angleFunc = () => r() * Math.PI * 2,
    radiusFunc = () => 4 + (r() * width) / 25,
    velocityFunc = () => 0.1 + r() * 0.5
  } = config

  const bubbles = [...Array(bubbleCount)].map(() => {
    const bubble: Bubble = {
      f: bubbleFunc(),
      x: r() * width,
      y: r() * height,
      r: radiusFunc(),
      a: angleFunc(),
      v: velocityFunc()
    }

    return bubble
  })

  let rafHandle = 0

  function draw() {
    if (!context) return
    if (!canvas.parentNode) return cancelAnimationFrame(rafHandle)

    if (!!animate) rafHandle = requestAnimationFrame(draw)

    context.globalCompositeOperation = 'source-over'
    context.fillStyle = gradient
    context.fillRect(0, 0, width, height)
    context.globalCompositeOperation = compose

    bubbles.forEach(bubble => {
      context.beginPath()
      context.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2)
      context.fillStyle = bubble.f
      context.fill()

      // update positions for next draw
      bubble.x += Math.cos(bubble.a) * bubble.v
      bubble.y += Math.sin(bubble.a) * bubble.v

      if (bubble.x - bubble.r > width) {
        bubble.x = -bubble.r
      }

      if (bubble.x + bubble.r < 0) {
        bubble.x = width + bubble.r
      }

      if (bubble.y - bubble.r > height) {
        bubble.y = -bubble.r
      }

      if (bubble.y + bubble.r < 0) {
        bubble.y = height + bubble.r
      }
    })
  }

  draw()
}
