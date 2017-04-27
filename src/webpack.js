'use strict';

const webpack = require('webpack');
const hot     = require('webpack-hot-middleware');
const dev     = require('webpack-dev-middleware');
const config  = require('../build/webpack');

module.exports = function webpackMiddleware() {
  const app = this;
  
  const cfg = config(app.get('env'));
  
  cfg.entry.app.push('webpack-hot-middleware/client');
  
  const compiler = webpack(cfg);
  
  const devMiddleware = dev(compiler, { noInfo: true, publicPath: '/' });
  const hotMiddleware = hot(compiler);
  
  app.use(devMiddleware);
  app.use(hotMiddleware);
};
