const webpack = require('webpack')
const {join} = require('path')
const merge = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const common = require('./common.config.js')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: join(__dirname, '..', '.build'),
    quiet: true,
    hot: true
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['Live at: http://localhost:8080']
      }
    }),
  ]
})
