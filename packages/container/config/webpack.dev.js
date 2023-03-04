const { merge } = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common');

const { dependencies } = require('../package.json');

const devConfig = {
  mode: 'development',

  // DEV SERVER
  devServer: {
    port: 8080,
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
      name: 'container',
      remotes: {
        '@marketing': 'marketing@http://localhost:8081/remoteEntry.js'
      },
      shared: dependencies,
    })
  ]
}; 

module.exports = merge(commonConfig, devConfig);