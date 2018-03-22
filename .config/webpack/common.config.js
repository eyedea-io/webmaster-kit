const webpack = require('webpack')
const {join, resolve} = require('path')
const {TsConfigPathsPlugin} = require('awesome-typescript-loader')

module.exports = {
  context: resolve(__dirname, '../../workspaces'),
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
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
    occurrenceOrder: true ,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5
				},
        vendors: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.SYNCANO_PROJECT_INSTANCE': JSON.stringify(
        process.env.SYNCANO_PROJECT_INSTANCE
      )
    })
  ]
}
