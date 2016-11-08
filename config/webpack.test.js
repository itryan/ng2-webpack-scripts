const helpers = require('./helpers')
  , path = require('path')
  ;

const ProvidePlugin = require('webpack/lib/ProvidePlugin')
  , DefinePlugin = require('webpack/lib/DefinePlugin')
  , LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
  , ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')
  ;

module.exports = function (projectConfig) {

  var awesomeTypeScriptOption = {
    sourceMap: false,
    inlineSourceMap: true,
    module: "commonjs",
    compilerOptions: { removeComments: true }
  };

  var webpackConfig = {

    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [helpers.root('src'), helpers.root('node_modules')]
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: [
            { loader: 'angular2-template-loader' },
            { loader: 'awesome-typescript-loader', query: awesomeTypeScriptOption },            
          ],
          exclude: [/\.e2e\.ts$/]
        },
        { test: /\.(js|ts)$/, loader: 'istanbul-instrumenter-loader', include: helpers.root('src'), exclude: [/\.(e2e|spec)\.ts$/, /node_modules/], enforce: 'post', },
        { test: /\.html$/, loader: 'raw-loader', exclude: projectConfig.htmlEntry }
      ]
    },
    plugins: [
      new DefinePlugin({
      }),
      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('src')
      ),
      new LoaderOptionsPlugin({
        debug: true,
        options: {
          tslint: { emitErrors: false, failOnHint: false, resourcePath: 'src' },
        }
      }),
    ],

  };

  return webpackConfig;
}