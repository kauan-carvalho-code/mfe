const { merge } = require('webpack-merge');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common');

const { name, dependencies } = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js'
  },

  // PLUGINS
  plugins: [
    new ModuleFederationPlugin({
      name,
      remotes: {
        '@marketing': `marketing@${domain}/marketing/remoteEntry.js`
      },
      shared: dependencies,
    })
  ],
};

module.exports = merge(commonConfig, prodConfig);