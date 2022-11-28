const config = require('./webpack.config');
const webpack = require('webpack');

console.log('开始构建......');
console.time('compiler');
const conpiler = webpack(config());
new Promise((resolve, reject) => {
  conpiler.run((err, stats) => {
    resolve(stats);
  });
}).then(() => {
  console.log('构建完成!');
  console.timeEnd('compiler');
});
