const webpack = require('webpack')
const {resolve} = require('path')
const merge = require('webpack-merge')
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware')
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware')
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const common = require('./common.config.js')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const pathsFactory = require('./paths.js')
const ignoredFiles = require('react-dev-utils/ignoredFiles')

const devtoolModuleFilenameTemplate = (info) => {
  const {absoluteResourcePath} = info

  return absoluteResourcePath.startsWith('/') ? resolve(absoluteResourcePath).replace(/\\/g, '/') : undefined
}

process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

module.exports = (workspace) => {
  const paths = pathsFactory(workspace)

  return merge(common({
    workspace,
    env: 'development'
  }), {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
      filename: 'static/js/bundle.js',
      chunkFilename: 'static/js/[name].chunk.js',
      publicPath: '/',
      pathinfo: true,
      devtoolModuleFilenameTemplate,
    },
    devServer: {
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
      }
    },
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom'
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: [/node_modules/],
          loader: 'stylelint-custom-processor-loader',
          options: {
            configPath: './.config/stylelint.json'
          }
        }
      ]
    },
    plugins: [
      new WatchMissingNodeModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        logLevel: 'warn',
      }),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [
            'Server: http://localhost:8080',
            'Bundle: http://localhost:8888'
          ],
        }
      }),
    ]
  })
}
