const {join, resolve} = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const prod = require('./prod.config.js')
const dev = require('./dev.config.js')
const fs = require('fs')

process.noDeprecation = true

module.exports = function(workspace) {
  if (workspace === true) {
    console.error(`\n Workspace name is required. \n\n Example: npm run dev website \n`)
    process.exit(1)
  }

  const envConfig = process.argv.indexOf('-p') !== -1 ? prod(workspace) : dev(workspace)
  const htmlConfig = getHTMLConfig(workspace)
  const config = merge(envConfig, {
    entry: `../workspaces/${workspace}`,
    output: {
      path: resolve(__dirname, '..', '..', `.build/${workspace}`),
    },
    plugins: [
      new HtmlWebpackPlugin(htmlConfig),
      new CopyWebpackPlugin([
        join(__dirname, '../.syncanoignore'),
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
    templateParameters: {
      trackjs: process.env.TRACKJS_KEY
    },
    template: resolve(__dirname, `./template.html`)
  }
  const favicon = resolve(__dirname, `../../workspaces/${workspace}/public/favicon.ico`)
  const template = resolve(__dirname, `../../workspaces/${workspace}/public/index.html`)

  if (fs.existsSync(favicon)) { html.favicon = favicon }
  if (fs.existsSync(template)) { html.template = template}

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
