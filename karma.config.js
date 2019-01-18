/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

const webpack_config = require("./webpack.config.js")({
    env: "test"
});

webpack_config.devtool = "inline-source-map";

module.exports = function karma_config(config) {
    config.set({
        frameworks: ["mocha", "sinon-chai"],
        reporters: ["mocha", "coverage"],
        browsers: ["ChromeHeadless"],

        files: ["./test/index.js"],

        preprocessors: {
            "./test/index.js": ["webpack", "sourcemap"]
        },

        webpack: webpack_config,
        webpackMiddleware: {
            noInfo: true
        },

        plugins: [
            "karma-chrome-launcher",
            "karma-coverage",
            "karma-mocha-reporter",
            "karma-mocha",
            "karma-sinon-chai",
            "karma-sourcemap-loader",
            "karma-webpack"
        ]
    });
};
