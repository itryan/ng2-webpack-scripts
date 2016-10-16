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
module.exports = function (options) {
  isProd = options.env === 'production';

  return {
    entry: {
      'polyfills': './webpack/polyfills.entry.ts',
      'vendor': './webpack/vendor.entry.ts',
      'main': './webpack/main.entry.ts'
    },

    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: [helpers.root('src'), helpers.root('node_modules')],
    },

    module: {
      loaders: [
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            'angular2-template-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        {
          test: /\.css$/,
          exclude: helpers.root('src'),
          loaders: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css'] })
        },
        {
          test: /\.scss$/,
          exclude: helpers.root('src/app'),
          loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css', 'postcss', 'sass'] })
        },
        { test: /\.scss$/, include: helpers.root('src/app'), loader: 'raw!postcss!sass' },
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [helpers.webpackScripts('index.html')]
        },
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file'
        }
      ],
    },

    plugins: [
      new ForkCheckerPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),
      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('src')
      ),
      new HtmlWebpackPlugin(webpackMerge(options.metadata, {
        template: path.resolve(__dirname, 'index.html'),
        chunksSortMode: 'dependency'
      })),
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
}
