import * as Sentry from '@sentry/browser/esm'

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENV,
    release: process.env.RELEASE,
    integrations: integrations => {
      return integrations.filter(integration => integration.name !== 'GlobalHandlers')
    },
  })
}

export const logError = (error: any) => Sentry.captureException(error)
