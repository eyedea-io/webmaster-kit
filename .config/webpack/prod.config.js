const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const common = require('./common.config.js')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ]
})
