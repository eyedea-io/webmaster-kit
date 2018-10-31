import * as Sentry from '@sentry/browser'
import {NODE_ENV, SENTRY_DSN} from '@website/config'

export const initSentry = () => {
  if (!SENTRY_DSN) {
    return
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: NODE_ENV,
  })
}
