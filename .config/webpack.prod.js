const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  entry: '../src/index',
  plugins: [
    new CompressionPlugin()
  ]
})
