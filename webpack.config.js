const webpackMerge = require('webpack-merge')
  , path = require('path')
  , fs = require('fs')
  , helpers = require('./config/helpers')

/*
 * Webpack Constants
 */
const METADATA = {
  title: 'Angular2 Webpack Starter',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

module.exports = function (options) {

  var config;
  var env;

  switch (process.env.NODE_ENV) {
    case 'dev':
    case 'development':
    default:
      config = require('./config/webpack.dev');
      env = 'development';
  }

  options = webpackMerge({ metadata: METADATA }, options || {});
  options['env'] = env;

  var mergeFile = helpers.root('webpack/webpack.merge.js')
  var finalConfig = config(options);
  if (fs.existsSync(mergeFile)) {
    var exConfig = require(mergeFile);
    finalConfig = webpackMerge(finalConfig, exConfig(options));
  }

  return finalConfig;
};

