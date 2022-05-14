const packageName = require('./package.json').name;

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
  },
  devServer: {
    port: 8001,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
  },
  publicPath: '//localhost:8001/',
};
