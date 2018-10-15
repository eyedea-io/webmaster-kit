const webpack = require('webpack')
const {join, resolve} = require('path')
const merge = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const common = require('./common.config.js')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: join(__dirname, '..', '.build'),
    quiet: true,
    compress: true,
    hot: true
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
