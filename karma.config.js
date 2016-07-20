module.exports = function (config) {
	config.set({
		browsers: ['Chrome'],
		coverageReporter: {
			reporters: [
				{ type: 'html', subdir: 'html' },
				{ type: 'lcovonly', subdir: '.' }
			]
		},
		files: ['./tests.webpack.js'],
		frameworks: ['jasmine'],
		preprocessors: { './tests.webpack.js': ['webpack'] },
		reporters: ['progress', 'coverage'],
		webpack: configureWebpack()
	});

	function configureWebpack(webpackConfigFunction) {
		var webpackConfig = require('./webpack.config');
		webpackConfig.entry = undefined; // karma will pass the proper argument for entry
		return webpackConfig;
	}
};
