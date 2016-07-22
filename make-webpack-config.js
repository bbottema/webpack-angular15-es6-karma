var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (options) {
	var plugins = [];

	plugins.push(new HtmlWebpackPlugin({
		template: './app/index.html',
		inject: 'body',
		minify: false
	}));

	if (!options.cover) {
		plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.js'));
	}

	plugins.push(new webpack.SourceMapDevToolPlugin({
			filename: '[file].map',
			exclude: /vendor/
		})
	);

	let jsLoaders;

	if (options.cover) {
		jsLoaders = [
			// transpile all files except testing sources with babel as usual
			{
				test: /\.js$/,
				loader: 'babel',
				include: [
					path.join(__dirname, 'test'),
				],
				exclude: path.join(__dirname, 'node_modules')
			},
			// transpile and instrument only testing sources with babel-istanbul
			{
				test: /\.js$/,
				loader: 'babel-istanbul',
				include: [
					path.join(__dirname, 'app'),
				],
				exclude: path.join(__dirname, 'node_modules'),
				query: {
					// cacheDirectory: true
				},
			},
		];
	} else {
		jsLoaders = [
			{
				test: /\.js$/,
				loader: 'babel',
				include: [
					path.join(__dirname, 'app'),
					path.join(__dirname, 'test')
				],
				exclude: path.join(__dirname, 'node_modules')
			}
		];
	}
	return {
		debug: true,
		entry: {
			app: ['./app/index.js'],
			vendor: ['./app/vendor.js']
		},
		output: {
			path: path.join(__dirname, 'dist'),
			filename: 'js/[name].js'
		},
		plugins: plugins,
		resolve: {
			extensions: ['', '.js'],
			alias: {
				app: path.join(__dirname, 'app')
			}
		},
		module: {
			loaders: jsLoaders.concat([
				{
					test: /\.html$/,
					loader: 'html-loader'
				}
			]),
		},
		resolveLoader: {
			root: path.join(__dirname, 'node_modules')
		}
	};
}
