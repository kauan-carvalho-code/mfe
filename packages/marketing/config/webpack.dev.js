const { merge } = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common');

const { dependencies } = require('../package.json');

const devConfig = {
  mode: 'development',

  // DEV SERVER
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: 'index.html'
    }
  },

  // PLUGINS
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),

    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        '.': './src/bootstrap'
      },
      shared: dependencies,
    })
  ]
}; 

module.exports = merge(commonConfig, devConfig);