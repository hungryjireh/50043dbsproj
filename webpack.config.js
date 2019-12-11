const path = require('path');
const Dotenv = require('dotenv-webpack');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/dist');
var HtmlWebpackPlugin = require('html-webpack-plugin');


const webpack = require('webpack');


module.exports = {
  entry: { main: `${SRC_DIR}/index.js` },
  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s?css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIR, "index.html")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv()
  ],
  devServer: {
    contentBase: DIST_DIR,
    hot: true,
    port: 3000,
    open: true,
    historyApiFallback: true,
    }
};
