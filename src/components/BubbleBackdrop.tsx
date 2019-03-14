import React, {Component} from 'react'

interface BubblyProps {
  animate: boolean
  shadowColor: string
  bubbleCount?: number
  blur: number
  colorStart: string
  colorStop: string
  bubbleFunc?: () => string
  angleFunc?: () => number
  velocityFunc?: () => number
  radiusFunc?: () => number
  compose: string
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

const r = () => Math.random()

const canvasStyle: React.CSSProperties = {
  position: 'fixed',
  zIndex: -1,
  left: 0,
  top: 0,
  minWidth: '100vw',
  minHeight: '100vh'
}

export class BubbleBackdrop extends Component<BubblyProps> {
  canvas?: HTMLCanvasElement
  canvasContext?: CanvasRenderingContext2D
  rafHandle: number = 0
  bubbles?: Bubble[]
  gradient?: CanvasGradient

  static defaultProps: BubblyProps = {
    animate: true,
    shadowColor: '#fff',
    blur: 4,
    colorStart: '#2AE',
    colorStop: '#17B',
    compose: 'lighter'
  }

  componentDidMount() {
    if (typeof window === 'undefined') return

    this.initialize()
    this.draw()
  }

  initialize = () => {
    const {canvas} = this
    if (!canvas) return

    const {shadowColor, blur, colorStart, colorStop} = this.props
    const {width, height} = canvas

    const context = canvas.getContext('2d')
    if (!context) return

    context.shadowColor = shadowColor
    context.shadowBlur = blur

    const gradient = context.createLinearGradient(0, height, width, 0)
    gradient.addColorStop(0, colorStart)
    gradient.addColorStop(1, colorStop)
    this.gradient = gradient

    const {
      bubbleCount = Math.floor((width + height) * 0.02),
      bubbleFunc = () => `hsla(0, 0%, 100%, ${r() * 0.1})`,
      angleFunc = () => r() * Math.PI * 2,
      radiusFunc = () => 4 + (r() * width) / 25,
      velocityFunc = () => 0.1 + r() * 0.5
    } = this.props

    this.bubbles = [...Array(bubbleCount)].map(() => {
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
  }

  setCanvas = (canvas: HTMLCanvasElement) => {
    this.canvas = canvas
  }

  draw = () => {
    const {canvas, bubbles, canvasContext: context} = this
    const {animate, compose} = this.props

    if (!canvas || !context) return
    if (!canvas.parentNode) return cancelAnimationFrame(this.rafHandle)

    const {width, height} = canvas

    if (!!animate) {
      this.rafHandle = requestAnimationFrame(this.draw)
    }

    context.globalCompositeOperation = 'source-over'

    if (this.gradient) {
      context.fillStyle = this.gradient
    }

    context.fillRect(0, 0, width, height)
    context.globalCompositeOperation = compose

    if (!bubbles) return

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

  render() {
    return <canvas ref={this.setCanvas} style={canvasStyle} />
  }
}
