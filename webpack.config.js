const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  // create a dev server with the new version of webpack
  devServer: {
    static: {
      directory: path.join(__dirname, '/'),
    },
    compress: true,
    port: 3000,
  },
  // to enable source map where we can debug our app on the browser
  devtool: 'inline-source-map',
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
};
