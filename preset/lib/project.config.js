var helpers = require('../../config/helpers')
  , path = require('path')
  ;

module.exports = {
  entry: {
    'index': './src/index.ts'
  },
  testBundle: './spec-bundle.js',
  libraryTarget: 'umd'
}