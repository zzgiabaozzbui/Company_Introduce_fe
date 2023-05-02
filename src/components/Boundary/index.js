import React, { Component } from "react"

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    // Update state to show the fallback UI during the next render phase
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // logging the error details
  }

  render() {
    if (this.state.hasError) {
      // Return the fallback UI
      return (
        <h3 style={{ textAlign: "center" }}>
          Unfortunately, something went wrong.
        </h3>
      )
    }

    return this.props.children
  }
}
