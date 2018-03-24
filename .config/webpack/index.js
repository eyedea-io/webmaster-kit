const {join, resolve} = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const prod = require('./prod.config.js')
const dev = require('./dev.config.js')
const fs = require('fs')

process.noDeprecation = true

module.exports = function(workspace) {
  if (workspace === true) {
    console.error(`\n Workspace name is required. \n\n Example: yarn dev website \n`)
    process.exit(1)
  }

  const envConfig = process.argv.indexOf('-p') !== -1 ? prod : dev
  const htmlConfig = getHTMLConfig(workspace)
  const config = merge(envConfig, {
    entry: `../workspaces/${workspace}`,
    output: {
      path: resolve(__dirname, '..', '..', `.build/${workspace}`),
    },
    plugins: [
      new HtmlWebpackPlugin(htmlConfig),
      new CleanWebpackPlugin([workspace], {root: join(__dirname, '../../.build')}),
      new CopyWebpackPlugin([
        {
          context: join(__dirname, `../../workspaces/${workspace}/public`),
          from: '**/*',
          to: join(__dirname, `../../.build/${workspace}`)
        }
      ]),
    ]
  })

  return mergeWithCustomConfig(config, workspace)
}

function getHTMLConfig(workspace) {
  const html = {
    template: resolve(__dirname, `./template.html`)
  }
  const favicon = resolve(__dirname, `../../workspaces/${workspace}/public/favicon.ico`)
  const template = resolve(__dirname, `../../workspaces/${workspace}/public/index.html`)

  if (fs.existsSync(favicon)) { html.favicon = favicon }
  if (fs.existsSync(favicon)) { html.template = template}

  return html
}

function mergeWithCustomConfig(config, workspace) {
  const filepath = resolve(__dirname, `../../workspaces/${workspace}/webpack.config.js`)

  if (fs.existsSync(filepath)) {
    let customConfig = require(filepath)

    return typeof customConfig === 'function' ? customConfig(config) : customConfig
  }

  return config
}
