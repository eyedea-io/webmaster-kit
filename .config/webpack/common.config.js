const webpack = require('webpack')
const tsResolve = require('resolve')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin')
const typescriptFormatter = require('react-dev-utils/typescriptFormatter')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const pathsFactory = require('./paths.js')

const RELEASE = require('child_process').execSync('git rev-parse HEAD').toString().trim()
const ENV_VARS = [
  'SYNCANO_PROJECT_INSTANCE',
  'SENTRY_DSN',
  'PUBLIC_URL',
  'LOCAL_STORAGE_KEY',
  'ROUTER_BASEPATH',
]

module.exports = ({env, workspace}) => {
  const paths = pathsFactory(workspace)
  const isEnvProduction = env === 'production'
  const isEnvDevelopment = env === 'development'

  return {
    context: paths.workspaces,
    output: {
      publicPath: '/',
      filename: '[name].[contenthash].js',
    },
    resolve: {
      extensions: ['.json', '.ts', '.tsx', '.js', '.jsx', '.mjs'],
      plugins: [new TsconfigPathsPlugin({
        configFile: paths.tsconfig,
      })]
    },
    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            /node_modules\/mutationobserver-shim/
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
                  }
                },
              ]
            },
            {
              loader: require.resolve('file-loader'),
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            }
          ]
        },
      ]
    },
    optimization: {
      runtimeChunk: true,
      splitChunks: {
        chunks: 'all',
        name: false,
      }
    },
    plugins: [
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
          paths.workspace
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
          }
        }
      }),
      new webpack.DefinePlugin(
        ENV_VARS.reduce((all, name) => ({
          ...all,
          [`process.env.${name}`]: JSON.stringify(process.env[name]),
          [`process.env.RELEASE`]: JSON.stringify(RELEASE),
        }), {})
      )
    ]
  }
}
