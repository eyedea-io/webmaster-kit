const {TsConfigPathsPlugin} = require('awesome-typescript-loader')
const {resolve} = require('path')
const commonConfig = require('../webpack/common.config')
const merge = require('webpack-merge')

module.exports = {
  hot: true,
  rootPath: '../../',
  publicPath: './workspaces/website/public',
  watchDirs: ['__fixtures__', 'workspaces'],
  proxiesPath: './.config/cosmos/proxies.tsx',
  webpack: (config, { env }) => {
    config.resolve.extensions = config.resolve.extensions || []
    config.resolve.extensions.push('.json', '.ts', '.tsx', '.js')

    config.resolve.plugins = config.resolve.plugins || []
    config.resolve.plugins.push(new TsConfigPathsPlugin({
      baseUrl: resolve(__dirname, '../../')
    }))

    config.module.rules.push({
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader']
    })

    config.module.rules.push({
      test: /\.tsx?$/,
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
    })

    return merge(commonConfig, config)
  }
};
