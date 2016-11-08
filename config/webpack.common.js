const webpack = require('webpack')
  , webpackMerge = require('webpack-merge')
  , path = require('path')
  , helpers = require('./helpers')
  ;

/*
 * Webpack Plugins
 */
const CopyWebpackPlugin = require('copy-webpack-plugin')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin
  , AssetsPlugin = require('assets-webpack-plugin')
  , ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  ;

/*
 * Webpack configuration
 */
module.exports = function (projectConfig) {
  isProd = projectConfig.env === 'production';

  var awesomeTypeScriptOption = {
    "forkChecker": true,
    "useWebpackText": true,
  };

  var webpackConfig = {
    entry: projectConfig.entry,

    resolve: {
      extensions: ['.ts', '.js'],
      modules: [helpers.root('src'), helpers.root('node_modules')],
    },

    externals: [/^\@angular\//, /^rxjs\//],

    module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: ['angular2-template-loader', 'awesome-typescript-loader'],
          exclude: [/\.(spec|e2e)\.ts$/]
        },

        // css file outside src folder (usually from external library) will be passed to css-loader directly
        {
          test: /\.css$/,
          exclude: helpers.root('src/app'),
          loaders: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css'] })
        },

        // scss outside /src/app folder will be bundled into external css file
        {
          test: /\.scss$/,
          exclude: helpers.root('src/app'), //'style!css!postcss!sass'
          loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css', 'postcss', 'sass'] })
        },

        // src/app/**/*.scss folder (imported by component styleUrls property) will be resolved into string and passed to styles property
        { test: /\.css$/, include: helpers.root('src/app'), loader: 'raw!css' },
        // { test: /\.scss$/, include: helpers.root('src/app'), loader: 'raw!postcss!sass' },
        {
          test: /\.scss$/,
          include: helpers.root('src/app'), //'style!css!postcss!sass'
          loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css', 'postcss', 'sass'] })
        },
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [helpers.webpackScripts('index.html')]
        },
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file'
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file?name=fonts/[name].[hash].[ext]?'
        },
      ],
    },

    plugins: [
      new ForkCheckerPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: (projectConfig.commonChunks || []).reverse()
      }),
      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('src')
      ),

      new ExtractTextPlugin({ filename: 'css/[name].[hash].css', disable: false })
    ],

    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  };

  // attach plugins

  (projectConfig.htmlEntry || [])
    .forEach(index => webpackConfig.plugins.push(
      new HtmlWebpackPlugin(
        webpackMerge(projectConfig.metadata, {
          template: index,
          filename: path.basename(index),
          chunksSortMode: 'dependency'
        })
      )));

  return webpackConfig;
}
