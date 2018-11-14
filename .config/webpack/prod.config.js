const merge = require('webpack-merge')
const common = require('./common.config.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const {resolve, join} = require('path')
const BrotliGzipPlugin = require('brotli-gzip-webpack-plugin')

const RELEASE = require('child_process').execSync('git rev-parse --short HEAD').toString().trim()

module.exports = (workspace) => merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    devtoolModuleFilenameTemplate: (info) => info.resource
  },
  plugins: getPlugins(workspace)
})

function getPlugins(workspace) {
  const list = [
    new CleanWebpackPlugin([workspace], {root: join(__dirname, '../../.build')}),
    new BrotliGzipPlugin({
        asset: '[path].br[query]',
        algorithm: 'brotli',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8,
        quality: 11,
    }),
    new BrotliGzipPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      minify: true,
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          return;
        }

        console.log(message);
      },
    }),
  ]

  if (process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_ORG && process.env.SENTRY_PROJECT)  {
    list.push(
      new SentryWebpackPlugin({
        include: resolve(__dirname, `../../.build/${workspace}`),
        ext: ['map'],
        release: RELEASE,
        ignoreFile: '.sentrycliignore',
        ignore: ['node_modules', 'webpack.config.js'],
        configFile: 'sentry.properties'
      }),
    )
  }

  return list
}
