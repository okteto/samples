const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

module.exports = merge(require('./webpack.config.js'), {
  mode: 'production'
});