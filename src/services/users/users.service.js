'use strict';

// Initializes the `users` service on path `/api/users`
const createService = require('feathers-rethinkdb');
const hooks         = require('./users.hooks');
const filters       = require('./users.filters');

module.exports = function users() {
  const app      = this;
  const Model    = app.get('rethinkdbClient');
  const paginate = app.get('paginate');
  
  const options = {
    name: 'users',
    Model,
    paginate,
    watch: false,
  };
  
  // Initialize our service with any options it requires
  app.use('/api/users', createService(options));
  
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/users');
  
  service.hooks(hooks);
  
  if (service.filter) {
    service.filter(filters);
  }
};
