/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

// NOTE: eslint-config-base-airbnb's config for `import/no-extraneous-dependencies` doesn't support PostCSS config files
const autoprefixer = require("autoprefixer"); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
    plugins: [
        autoprefixer({
            browsers: ["last 2 versions"]
        })
    ]
};
