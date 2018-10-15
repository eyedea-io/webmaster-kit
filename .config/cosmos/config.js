const {TsConfigPathsPlugin} = require('awesome-typescript-loader')

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
    config.resolve.plugins.push(new TsConfigPathsPlugin())

    config.module.rules.push({
        test: /\.tsx?$/,
        use: [
          'babel-loader'
        ]
      })

    return config
  }
};
