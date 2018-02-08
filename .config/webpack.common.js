const webpack = require('webpack')
const {join, resolve} = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: resolve(__dirname, '../src'),
  output: {
    path: resolve(__dirname, '..', '.build'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
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
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Set app title in .config/webpack.common.js'
    }),
    new CleanWebpackPlugin(['.build'], {root: join(__dirname, '..')}),
    new webpack.DefinePlugin({
      'process.env.SYNCANO_PROJECT_INSTANCE': JSON.stringify(
        process.env.SYNCANO_PROJECT_INSTANCE
      )
    })
  ]
}
