const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require("webpack-md5-hash");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: { main: './src/index.js' },
  devtool: 'inline-cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
	  },
	  {
		  test: /\.scss$/,
		  use:  [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
	  }
	]
  },
  plugins: [
	new CleanWebpackPlugin(),
	new MiniCssExtractPlugin({
	  filename: 'style.[contenthash].css',
	}),
	new HtmlWebpackPlugin({
		inject: false,
		hash: true,
		template: './src/index.html',
		filename: 'index.html'
	}),
	new WebpackMd5Hash()
  ]
};