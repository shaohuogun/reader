const webpack = require('webpack');
const path = require('path');
const srcPath = path.resolve(__dirname, 'src/main/javascript');
const dstPath = path.resolve(__dirname, 'src/main/webapp/script');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const config = {
  entry: {
       portal: [path.join(srcPath, '/portal.js')],
       channel: [path.join(srcPath, '/channel.js')],
       message: [path.join(srcPath, '/message.js')]
    },
  output: {
    path: dstPath,
    filename: "[name].js",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: [nodeModulesPath],
      },
    ],
  },
};

module.exports = config;
