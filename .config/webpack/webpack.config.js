const {resolve} = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs')
const webpack = require('webpack')
const tsResolve = require('resolve')
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin')
const typescriptFormatter = require('react-dev-utils/typescriptFormatter')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const pathsFactory = require('./paths')
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware')
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware')
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const ignoredFiles = require('react-dev-utils/ignoredFiles')
const ManifestPlugin = require('webpack-manifest-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

// tslint:disable: typedef
// tslint:disable: no-console
module.exports = function (workspace) {
  if (workspace === undefined) {
    console.error(`\n Workspace name is required. \n\n Example: npm run dev website \n`)
    process.exit(1)
  }

  const isEnvProduction = process.env.NODE_ENV === 'production'
  const isEnvDevelopment = process.env.NODE_ENV === 'development'
  const paths = pathsFactory(workspace)
  const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'
  const RELEASE = require('child_process').execSync('git rev-parse HEAD').toString().trim()
  const ENV_VARS = [
    'SYNCANO_PROJECT_INSTANCE',
    'SENTRY_DSN',
    'PUBLIC_URL',
    'LOCAL_STORAGE_KEY',
    'ROUTER_BASEPATH',
  ]

  return mergeWithCustomConfig({
    context: paths.workspaces,
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? 'source-map'
        : false
      : isEnvDevelopment && 'cheap-module-source-map',
    entry: `../workspaces/${workspace}`,
    output: {
      path: resolve(__dirname, '..', '..', `.build/${workspace}`),
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : 'static/js/bundle.js',
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : 'static/js/[name].chunk.js',
      publicPath: '/',
      pathinfo: true,
      devtoolModuleFilenameTemplate: isEnvProduction
        ? (info) => info.resource
        : ({absoluteResourcePath: arp}) => arp.startsWith('/') ? resolve(arp).replace(/\\/g, '/') : undefined,
    },
    devServer: isEnvDevelopment ? {
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
    } : undefined,
    resolve: {
      extensions: ['.json', '.ts', '.tsx', '.js', '.jsx', '.mjs'],
      plugins: [new TsconfigPathsPlugin({
        configFile: paths.tsconfig,
      })],
      alias: isEnvDevelopment ? {
        'react-dom': '@hot-loader/react-dom',
      } : {},
    },
    module: {
      strictExportPresence: true,
      rules: [
        {parser: {requireEnsure: false}},
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            /node_modules\/mutationobserver-shim/,
          ],
        },
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              exclude: [/node_modules/],
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    cacheDirectory: true,
                    cacheCompression: isEnvProduction,
                    compact: isEnvProduction,
                    customize: require.resolve(
                      'babel-preset-react-app/webpack-overrides'
                    ),
                    plugins: [
                      [
                        require.resolve('babel-plugin-named-asset-import'),
                        {
                          loaderMap: {
                            svg: {
                              ReactComponent: '@svgr/webpack?-svgo,+ref![path]',
                            },
                          },
                        },
                      ],
                    ],
                  },
                },
              ],
            },
            {
              loader: require.resolve('file-loader'),
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
        {
          test: /\.tsx?$/,
          exclude: [/node_modules/],
          loader: 'stylelint-custom-processor-loader',
          options: {
            configPath: './.config/stylelint.json',
          },
        },
      ].filter(Boolean),
    },
    optimization: {
      runtimeChunk: true,
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      minimize: isEnvProduction,
      minimizer: isEnvProduction ? [
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
      ] : undefined,
    },
    plugins: [
      isEnvProduction && new webpack.HashedModuleIdsPlugin(),
      isEnvProduction && new CompressionPlugin({
        filename: '[path].br[query]',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {level: 11},
        threshold: 10240,
        minRatio: 0.8,
      }),
      isEnvProduction && new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {level: 9},
        threshold: 10240,
        minRatio: 0.8,
      }),
      isEnvProduction && new ManifestPlugin({
        fileName: 'asset-manifest.json',
      }),
      isEnvProduction && new SWPrecacheWebpackPlugin({
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        minify: true,
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        logger(message) {
          if (message.indexOf('Total precache size is') === 0) {
            return
          }
          if (message.indexOf('Skipping static resource') === 0) {
            return
          }

          console.log(message)
        },
      }),
      isEnvDevelopment && new WatchMissingNodeModulesPlugin(),
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      isEnvDevelopment && new BundleAnalyzerPlugin({
        openAnalyzer: false,
        logLevel: 'warn',
      }),
      isEnvDevelopment && new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [
            'Server: http://localhost:8080',
            'Bundle: http://localhost:8888',
          ],
        },
      }),
      isEnvProduction &&
      process.env.SENTRY_AUTH_TOKEN &&
      process.env.SENTRY_ORG &&
      process.env.SENTRY_PROJECT && new SentryWebpackPlugin({
        include: resolve(__dirname, `../../.build/${workspace}`),
        ext: ['map'],
        release: RELEASE,
        ignoreFile: '.sentrycliignore',
        ignore: ['node_modules', 'webpack.config.js'],
        configFile: 'sentry.properties',
      }),
      new HtmlWebpackPlugin(getHTMLConfig(workspace, isEnvProduction)),
      new CopyWebpackPlugin([
        resolve(__dirname, '../.syncanoignore'),
        {
          context: resolve(__dirname, `../../workspaces/${workspace}/public`),
          from: '**/*',
          ignore: ['index.html'],
          to: resolve(__dirname, `../../.build/${workspace}`),
        },
      ]),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
      new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
      new ForkTsCheckerWebpackPlugin({
        async: isEnvDevelopment,
        useTypescriptIncrementalApi: true,
        checkSyntacticErrors: true,
        silent: true,
        tsconfig: paths.tsconfig,
        tslint: paths.tslint,
        formatter: isEnvProduction ? typescriptFormatter : undefined,
        typescript: tsResolve.sync('typescript', {
          basedir: paths.nodeModules,
        }),
        watch: [
          paths.sharedWorkspace,
          paths.workspace,
        ],
        reportFiles: [
          '**',
          '!**/__tests__/**',
          '!**/?(*.)(spec|test).*',
        ],
        logger: {
          ...console,
          info: (...args) => {
            if (typeof args[0] === 'string' && (
              /^Time/.test(args[0]) ||
              /^Version:/.test(args[0]) ||
              /No type errors found/.test(args[0]) ||
              /No lint errors found/.test(args[0])
            )) {
              return null
            }

            return console.info(...args)
          },
        },
      }),
      new webpack.DefinePlugin(
        ENV_VARS.reduce((all, name) => ({
          ...all,
          [`process.env.${name}`]: JSON.stringify(process.env[name]),
          [`process.env.RELEASE`]: JSON.stringify(RELEASE),
        }), {})
      ),
    ].filter(Boolean),
  }, workspace)
}

function getHTMLConfig(workspace, isEnvProduction) {
  const html = Object.assign({}, {
    favicon: undefined,
    inject: true,
    template: resolve(__dirname, `./template.html`),
  }, isEnvProduction ? {
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  } : undefined)
  const favicon = resolve(__dirname, `../../workspaces/${workspace}/public/favicon.ico`)
  const template = resolve(__dirname, `../../workspaces/${workspace}/public/index.html`)

  if (fs.existsSync(favicon)) {html.favicon = favicon}
  if (fs.existsSync(template)) {html.template = template}

  return html
}

function mergeWithCustomConfig(config, workspace) {
  const filepath = resolve(__dirname, `../../workspaces/${workspace}/webpack.config.js`)

  if (fs.existsSync(filepath)) {
    const customConfig = require(filepath)

    return typeof customConfig === 'function' ? customConfig(config) : customConfig
  }

  return config
}
