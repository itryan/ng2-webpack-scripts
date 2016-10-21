const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (options) {
  return {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'src/assets',
          to: 'assets'
        }
      ]),
    ]
  }
};

