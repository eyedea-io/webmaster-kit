const {join, resolve} = require('path')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const prod = require('./prod.config.js')
const dev = require('./dev.config.js')

module.exports = function(name) {
  const config = process.argv.indexOf('-p') !== -1 ? prod : dev

  return merge(config, {
    entry: `../workspaces/${name}`,
    output: {
      path: resolve(__dirname, '..', '..', `.build/${name}`),
    },
    plugins: [
      new CleanWebpackPlugin([name], {root: join(__dirname, '../../.build')}),
    ]
  })
}
