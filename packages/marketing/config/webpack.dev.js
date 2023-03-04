const { merge } = require('webpack-merge');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common');

const { name, dependencies } = require('../package.json');

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
    new ModuleFederationPlugin({
      name: name,
      filename: 'remoteEntry.js',
      exposes: {
        '.': './src/bootstrap'
      },
      shared: dependencies,
    })
  ]
}; 

module.exports = merge(commonConfig, devConfig);