export function registerErrorsListener() {
  const captureError = async (error: Error | undefined) => {
    const {logError} = await import(/* webpackChunkName: "sentry" */ '@shared/utils/sentry')
    logError(error)
  }
  window.onerror = (_message, _url, _line, _column, error) => captureError(error)
  window.onunhandledrejection = event => captureError(event.reason)
}
