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

	if(!options.cover) {
		plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.js'));
	}

	plugins.push(new webpack.SourceMapDevToolPlugin({
			filename: '[file].map',
			exclude: /vendor/
		})
	);

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
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					include: [
						path.join(__dirname, 'app'),
						path.join(__dirname, 'test')
					],
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
}
