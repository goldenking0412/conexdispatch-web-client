/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */


var webpack_config = require('./webpack.config.js')({
    env: 'test',
});
webpack_config.devtool = 'inline-source-map';


module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'sinon-chai'],
        reporters: ['mocha', 'coverage'],
        browsers: ['PhantomJS'],

        files: [
            './test/index.js',
        ],

        preprocessors: {
            './test/index.js': ['webpack', 'sourcemap'],
        },

        webpack: webpack_config,
        webpackMiddleware: {
            noInfo: true,
        },

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true,
        },

        plugins: [
            'karma-coverage',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-sinon-chai',
            'karma-sourcemap-loader',
            'karma-webpack',
        ],
    });
};
