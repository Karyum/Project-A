const path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/client/ClientApp.jsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: 'transform-runtime'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
