const { merge } = require('webpack-merge');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common');

const { name, dependencies } = require('../package.json');

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
    new ModuleFederationPlugin({
      name,
      remotes: {
        '@marketing': 'marketing@http://localhost:8081/remoteEntry.js'
      },
      shared: dependencies,
    })
  ]
}; 

module.exports = merge(commonConfig, devConfig);