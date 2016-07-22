var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (testMode) {
	var webpackConfig = {
		debug: true,
		entry: {
			app: ['./app/index.js'],
			vendor: ['./app/vendor.js']
		},
		output: {
			path: path.join(__dirname, 'dist'),
			filename: 'js/[name].js'
		},
		plugins: determinePlugins(testMode),
		resolve: {
			extensions: ['', '.js'],
			alias: {
				app: path.join(__dirname, 'app')
			}
		},
		module: {
			loaders: determineJsLoaders(testMode).concat([
				{
					test: /\.html$/,
					loader: 'html-loader'
				}
			])
		},
		resolveLoader: {
			root: path.join(__dirname, 'node_modules')
		}
	};

	if (testMode) {
		webpackConfig.entry = undefined; // karma will pass the proper argument for entry
	}

	return webpackConfig;

	function determinePlugins(testMode) {
		var plugins = [
			new HtmlWebpackPlugin({
				template: './app/index.html',
				inject: 'body',
				minify: false
			}),
			new webpack.SourceMapDevToolPlugin({
				filename: '[file].map',
				exclude: /vendor/
			})
		];
		if (!testMode) {
			plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.js'));
		}
		return plugins;
	}

	function determineJsLoaders(testMode) {
		if (testMode) {
			return [
				{ // transpile all files except testing sources with babel as usual
					test: /\.js$/,
					loader: 'babel?cacheDirectory',
					include: path.join(__dirname, 'test'),
					exclude: path.join(__dirname, 'node_modules')
				},
				{ // transpile and instrument only testing sources with babel-istanbul
					test: /\.js$/,
					loader: 'babel-istanbul?cacheDirectory',
					include: path.join(__dirname, 'app'),
					exclude: path.join(__dirname, 'node_modules')
				}
			];
		} else {
			return [
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
	}
};
