'use strict'

const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware')
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware')
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware')
const ignoredFiles = require('react-dev-utils/ignoredFiles')
const paths = require('./paths')

module.exports = {
  historyApiFallback: {
    disableDotRule: true,
  },
  clientLogLevel: 'none',
  contentBase: paths.workspaceBuild,
  publicPath: '/',
  quiet: true,
  compress: true,
  hot: true,
  watchOptions: {
    ignored: ignoredFiles(paths.workspaces),
  },
  before(app, server) {
    app.use(evalSourceMapMiddleware(server))
    app.use(errorOverlayMiddleware())
    app.use(noopServiceWorkerMiddleware())
  },
}
