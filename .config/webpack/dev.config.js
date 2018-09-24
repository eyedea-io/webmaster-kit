const webpack = require('webpack')
const {join} = require('path')
const merge = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const common = require('./common.config.js')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: join(__dirname, '..', '.build'),
    quiet: true,
    hot: true
  },
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      logLevel: 'warn',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['Live at: http://localhost:8080'],
        notes: ['Analyze bundle at: http://localhost:8888']
      }
    }),
  ]
})
