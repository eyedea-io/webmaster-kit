const webpack = require('webpack')
const {join, resolve} = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {TsConfigPathsPlugin} = require('awesome-typescript-loader')

module.exports = {
  context: resolve(__dirname, '../src'),
  entry: {
    main: '../src/index'
  },
  output: {
    path: resolve(__dirname, '..', '.build'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.json', '.ts', '.tsx', '.js'],
    plugins: [
      new TsConfigPathsPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true
            }
          }
        ]
      },
      {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'},
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 2,
          name: 'vendors',
          enforce: true,
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Set app title in .config/webpack.common.js'
    }),
    new CleanWebpackPlugin(['.build'], {root: join(__dirname, '..')}),
    new webpack.DefinePlugin({
      'process.env.SYNCANO_PROJECT_INSTANCE': JSON.stringify(
        process.env.SYNCANO_PROJECT_INSTANCE
      )
    })
  ]
}
