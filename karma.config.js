var helpers = require('./config/helpers')
  , path = require('path')
  ;
const srcPath = helpers.root('./')
  ;

module.exports = function (config) {
  var testConfig = require('./config/webpack.test.js')();
  var bundleFile = './config/spec-bundle.js';
  console.log(srcPath);

  config.set({

    basePath: '',
    frameworks: ['jasmine'],
    files: [{ pattern: bundleFile, watched: false }],

    exclude: [],

    preprocessors: {
      [bundleFile]: ['webpack']
    },

    webpack: testConfig,

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_DEBUG,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: true,

    concurrency: Infinity
  })

}
