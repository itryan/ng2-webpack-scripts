const webpackMerge = require('webpack-merge')
    , path = require('path')
    , fs = require('fs')
    , helpers = require('./config/helpers')

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
  
  options = options || { };
  options['env'] = env;
  console.log(options);

  var mergeFile = helpers.root('webpack/webpack.merge.js')
  var finalConfig = config(options);
  if (fs.existsSync(mergeFile))
  {
    var exConfig = require(mergeFile);
    finalConfig = webpackMerge(finalConfig, exConfig(options));
  }

  return finalConfig;
};

