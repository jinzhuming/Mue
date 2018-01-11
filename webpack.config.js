const webpack = require('webpack')

module.exports = {
  context: __dirname,
  entry: __dirname + '/src/index.ts',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'none',
  module: {
    loaders: [{
      test: /\.ts$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }]
  }
}
