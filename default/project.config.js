var helpers = require('../config/helpers')
  , path = require('path')
  ;

module.exports = {
  metadata: {
    title: 'Angular2 Webpack Starter',
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer()
  },
  entry: {
    'polyfills': './webpack/polyfills.entry.ts',
    'vendor': './webpack/vendor.entry.ts',
    'main': './webpack/main.entry.ts'
  },
  htmlEntry: [path.resolve(__dirname, 'index.html'),],
  commonChunks: ['polyfills', 'vendor'],
  testBundle: './spec-bundle.js',
}