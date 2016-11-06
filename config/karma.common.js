var helpers = require('./helpers')
  , path = require('path')
  ;
const srcPath = helpers.root('./')
  ;

module.exports = function (projectConfig) {
  return function (karmaConfig) {
    var testConfig = require('./webpack.test.js')(projectConfig);
    var bundleFile = projectConfig.testBundle; 
    karmaConfig.set({

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

      logLevel: karmaConfig.LOG_DEBUG,

      autoWatch: true,

      browsers: ['Chrome'],

      singleRun: true,

      concurrency: Infinity
    })
    
    // console.log(karmaConfig);
  }

}
