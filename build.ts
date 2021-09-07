/* eslint-disable no-console */
const minimist = require('minimist');
const rawArgs = process.argv.slice(2);
const args = minimist(rawArgs);
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const fs = require('fs');
const path = require('path');
const packages = fs.readdirSync(path.resolve(__dirname, './packages/component'));
 
// 获取外部依赖配置
function getExternals (dependencies) {
  let externals = {};
  if (dependencies) {
    Object.keys(dependencies).forEach(p => {
      externals[p] = `commonjs ${p}`;
    });
    return externals;
  }
}
const packageWebpackConfig = {};
 
// 遍历所有的包生成配置参数
packages.forEach(item => {
  let packagePath = path.resolve(__dirname, './packages/component', item);
  const { name, dependencies } = require(path.resolve(packagePath, 'package.json'));
  packageWebpackConfig[item] = {
    path: packagePath,
    name,
    externals: getExternals(dependencies)
  };
});
 
function build (configs) {
  // 遍历执行配置项
  configs.forEach(config => {
    webpack(webpackConfig(config), (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }
 
      console.log(stats.toString({
        chunks: false, // 使构建过程更静默无输出
        colors: true // 在控制台展示颜色
      }));
      if (stats.hasErrors()) {
        return;
      }
      console.log(`${config.name} build successed!`);
    });
  });
}
 
console.log('\n===> running build');
 
// 根据 -p 参数获取执行对应的webpack配置项
if (args.p) {
  if (packageWebpackConfig[args.p]) {
    build([packageWebpackConfig[args.p]]);
  } else {
    console.error(`${args.p} package is not find!`);
  }
} else {
  // 执行所有配置
  build(Object.values(packageWebpackConfig));
}
