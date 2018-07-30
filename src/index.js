import React from 'react'

export default class WatchHoverable extends React.Component {
  state = {
    scheduledCallbacks: this.props.schedule,
    currentHoveringStart: 0,
    cumulatedHoveringTime: 0
  }

  checkScheduledCallbacks = () => {
    if (this.state.scheduledCallbacks.length) {
      const [[minTime, cb], ...rest] = this.state.scheduledCallbacks
      if (this.state.cumulatedHoveringTime >= minTime) {
        cb(this.state)
        this.setState(s => ({
          ...s,
          scheduledCallbacks: s.scheduledCallbacks.slice(1)
        }))
      }
    }
  }
  setCurrentHoveringStart = () =>
    this.setState(s => ({ ...s, currentHoveringStart: Date.now() }))

  setCumulatedHoveringTime = () =>
    this.setState(
      s => ({
        ...s,
        cumulatedHoveringTime:
          s.cumulatedHoveringTime + (Date.now() - s.currentHoveringStart),
        currentHoveringStart: 0
      }),
      this.checkScheduledCallbacks
    )

  render() {
    const { component: Component, schedule, interval, ...props } = this.props

    return (
      <Component
        {...props}
        onMouseEnter={this.setCurrentHoveringStart}
        onMouseLeave={this.setCumulatedHoveringTime}
      />
    )
  }
}
