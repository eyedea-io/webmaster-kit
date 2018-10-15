const webpack = require('webpack')
const {resolve} = require('path')
const {TsConfigPathsPlugin} = require('awesome-typescript-loader')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  context: resolve(__dirname, '../../workspaces'),
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.json', '.ts', '.tsx', '.js'],
    plugins: [new TsConfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
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
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          /node_modules\/mutationobserver-shim/
        ],
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
    new webpack.DefinePlugin({
      'process.env.SYNCANO_PROJECT_INSTANCE': JSON.stringify(
        process.env.SYNCANO_PROJECT_INSTANCE
      ),
      'process.env.SENTRY_URL': JSON.stringify(
        process.env.SENTRY_URL
      ),
      'process.env.PUBLIC_URL': JSON.stringify(
        process.env.PUBLIC_URL
      ),
      'process.env.TRACKJS_KEY': JSON.stringify(
        process.env.TRACKJS_KEY
      ),
      'process.env.LOCAL_STORAGE_KEY': JSON.stringify(
        process.env.LOCAL_STORAGE_KEY
      )
    })
  ]
}
