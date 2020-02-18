const path = require('path').resolve(__dirname, './dist')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: '[name].js',
    path,
    publicPath: ''
  },
  mode: 'development',
  devServer: {
    contentBase: path,
    index: 'index.html',
    port: 4200,
    open: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'awesome-typescript-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ]
};
