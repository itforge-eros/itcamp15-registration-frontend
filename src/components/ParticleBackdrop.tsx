import React from 'react'
import Particles, {IParticlesParams} from 'react-particles-js'

const particles: IParticlesParams = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: false
      }
    },
    size: {
      value: 5,
      random: true,
      anim: {
        speed: 4,
        size_min: 0.3
      }
    },
    line_linked: {
      enable: false
    },
    move: {
      random: true,
      speed: 1,
      direction: 'top',
      out_mode: 'out'
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'bubble'
      },
      onclick: {
        enable: true,
        mode: 'repulse'
      }
    },
    modes: {
      bubble: {
        distance: 250,
        duration: 2,
        size: 0,
        opacity: 0
      },
      repulse: {
        distance: 400,
        duration: 4
      }
    }
  }
}

export class ParticleBackdrop extends React.Component {
  state = {mounted: false}

  componentDidMount() {
    this.setState({mounted: true})
  }

  render() {
    if (!this.state.mounted) return null

    return (
      <Particles
        params={particles}
        className="particle-backdrop"
        canvasClassName="particle-backdrop-canvas"
      />
    )
  }
}
