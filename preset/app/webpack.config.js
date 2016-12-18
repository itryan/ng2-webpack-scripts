const webpackMerge = require('webpack-merge')
  , path = require('path')
  , fs = require('fs')
  , helpers = require('../../config/helpers')
  , projectConfig = require('./project.config')  

/*
 * Webpack Constants
 */


module.exports = function (options) {

  var config;
  var env;  

  switch (process.env.NODE_ENV) {
    case 'test':
      config = require('../../config/webpack.test');
      env = 'test';
      break;
    case 'prod':
    case 'production':      
      config = require('../../config/webpack.prod');
      env = 'production'; 
      break;     
    case 'dev':
    case 'development':
    default:
      config = require('../../config/webpack.dev');
      env = 'development';
      break;
  }

  options = webpackMerge(projectConfig, options || {});
  options['env'] = env;

  var webpackConfig = config(options);

  // console.log(webpackConfig);
  var mergeFile = helpers.root('webpack/webpack.merge.js')
  if (fs.existsSync(mergeFile)) {
    var exConfig = require(mergeFile);
    webpackConfig = webpackMerge(webpackConfig, exConfig(options));
  }

  // console.log(webpackConfig);

  return webpackConfig;
};

