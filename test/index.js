/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */


const bluebird = require('bluebird');

window.Promise = bluebird;


// require all modules ending in ".test" from the
// current directory and all subdirectories
const tests_context = require.context('.', true, /\.test$/);
tests_context.keys().forEach(tests_context);
