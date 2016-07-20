var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	debug: true,
	entry: {
		app: ['./app/index.js'],
		vendor: ['./app/vendor.js']
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'js/[name].js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './app/index.html',
			inject: 'body',
			minify: false
		}),
		new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.js'),
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map',
			exclude: /vendor/
		})
	],
	resolve: {
		extensions: ['', '.js'],
		alias: {
			app: path.join(__dirname, 'app')
		}
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: path.join(__dirname, 'app'),
				exclude: path.join(__dirname, 'node_modules')
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			}
		]
	},
	resolveLoader: {
		root: path.join(__dirname, 'node_modules')
	}
};
