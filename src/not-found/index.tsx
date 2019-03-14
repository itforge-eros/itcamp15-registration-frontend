import React, {Component} from 'react'

interface NotFoundProps {
  page?: string
}

interface State {
  ready: boolean
}

export default class NotFound extends Component<NotFoundProps, State> {
  state = {ready: false}

  componentDidMount() {
    this.setState({ready: true})
  }

  render() {
    const {ready} = this.state

    // TODO: Add Loader for Dynamic Routes?
    if (!ready) return null

    return (
      <div>
        <h1>404 - Oh no's! We couldn't find that page :(</h1>
      </div>
    )
  }
}
