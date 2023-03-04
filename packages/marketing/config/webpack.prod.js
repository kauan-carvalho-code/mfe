const { merge } = require('webpack-merge');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common');

const { name, dependencies } = require('../package.json');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js'
  },

  // PLUGINS
  plugins: [
    new ModuleFederationPlugin({
      name,
      filename: 'remoteEntry.js',
      exposes: {
        '.': './src/bootstrap'
      },
      shared: dependencies,
    })
  ],
};

module.exports = merge(commonConfig, prodConfig);