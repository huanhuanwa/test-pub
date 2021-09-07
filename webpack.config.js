/*
 * Copyright 2019 Nazmul Idris. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const path = require('path');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const  CopyPlugin = require('copy-webpack-plugin');

module.exports = (opt) => {
  return {
    mode: 'production',
    entry: path.resolve(opt.path, './index.ts'),
    output: {
      path: path.resolve(opt.path, './dist'),
      filename: `${opt.name}.min.js`,
      library: opt.name,
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    externals: opt.externals,
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(opt.path, './package.json'),
            to:  path.resolve(opt.path, './dist')
          }
        ]
      })
    ],
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    optimization: {
      minimize: true
    }
  };
};