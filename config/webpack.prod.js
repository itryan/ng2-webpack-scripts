const helpers = require('./helpers')
  , webpack = require('webpack')
  , webpackMerge = require('webpack-merge')
  , commonConfig = require('./webpack.common.js')
  ;

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin')
  , WebpackMd5Hash = require('webpack-md5-hash')
  , UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
  , NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin')
  ;

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'production'
  , HOST = process.env.HOST || 'localhost'
  , PORT = process.env.PORT || 3000
  , HMR = helpers.webpackScripts('hot')
  , METADATA = webpackMerge(commonConfig.metadata, {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: HMR
  })
  ;

/**
 * Webpack configuration
 */
module.exports = function (projectConfig) {
  projectConfig = webpackMerge({ env: ENV }, projectConfig);

  var webpackConfig = {

    // metadata: METADATA,
    devtool: 'source-map',
    output: {
      path: helpers.root('dist'),
      filename: '[name].[chunkhash].bundle.js',
      sourceMapFilename: '[name].[chunkhash].bundle.map',
      chunkFilename: '[id].[chunkhash].chunk.js'
    },

    plugins: [
      new WebpackMd5Hash(),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
          htmlLoader: {
            minimize: true,
            removeAttributeQuotes: false,
            caseSensitive: true,
            customAttrSurround: [
              [/#/, /(?:)/],
              [/\*/, /(?:)/],
              [/\[?\(?/, /(?:)/]
            ],
            customAttrAssign: [/\)?\]?=/]
          },
        }        
      }),
      new UglifyJsPlugin({
        beautify: false, 
        output: {
          comments: false
        }, 
        mangle: {
          screw_ie8: true
        }, 
        compress: {
          screw_ie8: true,
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          negate_iife: false,
        },
      }),      
      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': JSON.stringify(METADATA.HMR),
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
          'HMR': JSON.stringify(METADATA.HMR),
        }
      }),
    ],
  }

  webpackConfig = webpackMerge(commonConfig(projectConfig), webpackConfig);

  return webpackConfig;
}
