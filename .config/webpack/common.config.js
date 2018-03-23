const webpack = require('webpack')
const {join, resolve} = require('path')
const {TsConfigPathsPlugin} = require('awesome-typescript-loader')

module.exports = {
  context: resolve(__dirname, '../../workspaces'),
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.json', '.ts', '.tsx', '.js'],
    plugins: [new TsConfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true
            }
          }
        ]
      },
      {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'},
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  optimization: {
    runtimeChunk: 'single'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.SYNCANO_PROJECT_INSTANCE': JSON.stringify(
        process.env.SYNCANO_PROJECT_INSTANCE
      ),
      'process.env.PUBLIC_URL': JSON.stringify(
        process.env.PUBLIC_URL
      )
    })
  ]
}
