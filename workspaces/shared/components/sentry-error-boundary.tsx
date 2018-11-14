import * as Sentry from '@sentry/core'
import * as React from 'react'

export interface State {
  error?: Error
}

export class SentryErrorBoundary extends React.Component<{}, State> {
  state = {error: null}

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({error})

    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })
      Sentry.captureException(error)
    })
  }

  render() {
    if (this.state.error) {
      // render fallback UI
      return (
        <div>
          An error occured. Component can not be displayed.
        </div>
      )
    }

    // when there's not an error, render children untouched
    return this.props.children
  }
}
