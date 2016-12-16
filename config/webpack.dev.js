const helpers = require('./helpers')
  , webpack = require('webpack')
  , webpackMerge = require('webpack-merge')
  , commonConfig = require('./webpack.common.js')
  ;

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin')
  , NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin')
  ;

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development'
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
    devtool: 'cheap-module-source-map',
    output: {
      path: helpers.root('dist'),
      filename: '[name].js',
      chunkFilename: '[id].chunk.js',
      library: 'ac_[name]',
      libraryTarget: projectConfig.libraryTarget || 'var',
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: false,
        debug: true
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
      new NamedModulesPlugin(),
    ],

    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },

  }

  webpackConfig = webpackMerge(commonConfig(projectConfig), webpackConfig);

  return webpackConfig;
}
