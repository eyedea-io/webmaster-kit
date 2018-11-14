const webpack = require('webpack')
const {resolve} = require('path')
const {TsConfigPathsPlugin} = require('awesome-typescript-loader')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const RELEASE = require('child_process').execSync('git rev-parse --short HEAD').toString().trim()
const ENV_VARS = [
  'SYNCANO_PROJECT_INSTANCE',
  'SENTRY_DSN',
  'PUBLIC_URL',
  'TRACKJS_KEY',
  'LOCAL_STORAGE_KEY',
  'ROUTER_BASEPATH',
]

module.exports = {
  context: resolve(__dirname, '../../workspaces'),
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.json', '.ts', '.tsx', '.js'],
    plugins: [new TsConfigPathsPlugin({
      baseUrl: resolve(__dirname, '../../')
    })],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          /node_modules\/mutationobserver-shim/
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
              babelCore: '@babel/core',
              transpileOnly: true,
              useCache: true,
              reportFiles: [
                "workspaces/**/*.{ts,tsx}"
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/](react|react-dom|mobx|mobx-react|mobx-state-tree)[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: resolve('./tsconfig.json'),
      tslint: resolve('./tslint.json'),
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
