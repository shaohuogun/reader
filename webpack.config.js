const webpack = require('webpack');
const path = require('path');
const srcPath = path.resolve(__dirname, 'src/main/javascript');
const dstPath = path.resolve(__dirname, 'src/main/webapp/script');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const config = {
  entry: {
    entry: path.join(srcPath, '/entry.js'),
    home: path.join(srcPath, '/home.js'),
    mine: path.join(srcPath, '/mine.js'),
    tool: path.join(srcPath, '/tool.js'),
    about: path.join(srcPath, '/about.js'),
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
