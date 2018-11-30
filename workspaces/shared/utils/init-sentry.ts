import * as Sentry from '@sentry/browser'
import {RELEASE, SENTRY_DSN, SENTRY_ENV} from '@website/config'

export const initSentry = () => {
  if (!SENTRY_DSN) {
    return
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: SENTRY_ENV,
    release: RELEASE,
  })
}
