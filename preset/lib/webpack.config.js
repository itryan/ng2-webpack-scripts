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
    case 'dev':
    case 'development':
    default:
      config = require('../../config/webpack.dev');
      env = 'development';
  }

  options = webpackMerge(projectConfig, options || {});
  options['env'] = env;

  var mergeFile = helpers.root('webpack/webpack.merge.js')
  var webpackConfig = config(options);

  var extConfig = {
    externals: [/^\@angular\//, /^rxjs\//],
  }

  webpackConfig = webpackMerge(webpackConfig, extConfig);

  if (fs.existsSync(mergeFile)) {
    var exFileConfig = require(mergeFile);
    webpackConfig = webpackMerge(webpackConfig, exFileConfig(options));
  }

  return webpackConfig;
};

