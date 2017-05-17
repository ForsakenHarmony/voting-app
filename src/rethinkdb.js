'use strict';

const rethinkdbdash = require('rethinkdbdash');

module.exports = function rethinkdb() {
  const app      = this;
  const config   = app.get('rethinkdb');
  config.servers[0].host = process.env.RETHINK_HOST || config.servers[0].host;
  const r        = rethinkdbdash(config);
  const oldSetup = app.setup;
  
  app.set('rethinkdbClient', r);
  
  app.setup = function setup(...args) {
    let promise = Promise.resolve();
    
    // Go through all services and call the RethinkDB `init`
    // which creates the database and tables if they do not exist
    Object.keys(app.services).forEach((path) => {
      const service = app.service(path);
      
      if (typeof service.init === 'function') {
        promise = promise.then(() => service.init());
      }
    });
    
    // Access the initialization if you want to run queries
    // right away that depend on the database and tables being created
    this.set('rethinkInit', promise);
    
    promise.then(() => oldSetup.apply(this, args));
    
    return this;
  };
};
