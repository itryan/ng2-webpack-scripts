const helpers = require('./helpers')
  , path = require('path')
  ;

const ProvidePlugin = require('webpack/lib/ProvidePlugin')
  , DefinePlugin = require('webpack/lib/DefinePlugin')
  , LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
  , ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')
  ;

module.exports = function (options) {
  return {

    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [helpers.root('src'), helpers.root('node_modules')]
    },

    module: {
      rules: [
        {
          test: /\.ts$/, loader: 'awesome-typescript-loader', query: {
            sourceMap: false,
            inlineSourceMap: true,
            module: "commonjs",
            compilerOptions: { removeComments: true }
          }, exclude: [/\.e2e\.ts$/]
        },
        { test: /\.(js|ts)$/, loader: 'istanbul-instrumenter-loader', include: helpers.root('src'), exclude: [/\.(e2e|spec)\.ts$/, /node_modules/], enforce: 'post', }
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
}