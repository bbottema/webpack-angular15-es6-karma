module.exports = function (config) {
	config.set({
		browsers: ['PhantomJS'],
		phantomjsLauncher: {
			exitOnResourceError: true // exit phantomjs on ResourceError (useful if karma exits without killing phantom)
		},
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
		webpack: require('./make-webpack-config')(true)
	});
};
