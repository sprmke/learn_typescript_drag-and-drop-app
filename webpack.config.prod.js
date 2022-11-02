const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: false,
  module: {
    // use ts-loader to bundle our ts files
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    // include all TS and JS files on our bundle.js file
    extensions: ['.ts', '.js'],
  },
  plugins: [
    // automatically delete dist content when we rebuild our app
    new CleanWebpackPlugin(),
  ],
};
