'use strict';

const handler  = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');

module.exports = function middleware() {
  // Add your custom middleware here. Remember, that
  // in Express the order matters, `notFound` and
  // the error handler have to go last.
  const app = this;
  
  app.use(notFound());
  app.use(handler());
};
