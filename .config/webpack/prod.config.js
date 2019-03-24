const merge = require('webpack-merge')
const common = require('./common.config.js')
const ManifestPlugin = require('webpack-manifest-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const {resolve} = require('path')
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

const RELEASE = require('child_process').execSync('git rev-parse HEAD').toString().trim()

module.exports = (workspace) => merge(common({
  workspace,
  env: 'production'
}), {
  mode: 'production',
  devtool: 'source-map',
  bail: true,
  output: {
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    devtoolModuleFilenameTemplate: (info) => info.resource
  },
  plugins: getPlugins(workspace),
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
    ]
  }
})

function getPlugins(workspace) {
  const list = [
    new webpack.HashedModuleIdsPlugin(),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: { level: 9 },
      threshold: 10240,
      minRatio: 0.8,
    }),
    // new BrotliGzipPlugin({
    //   asset: '[path].br[query]',
    //   algorithm: 'brotli',
    //   test: /\.(js|css|html|svg)$/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    //   quality: 11,
    // }),
    // new BrotliGzipPlugin({
    //   asset: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.(js|css|html|svg)$/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // }),
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
