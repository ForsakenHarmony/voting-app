'use strict';

// Initializes the `polls` service on path `/api/polls`
const createService = require('feathers-rethinkdb');
const hooks         = require('./polls.hooks');
const filters       = require('./polls.filters');

module.exports = function polls() {
  const app      = this;
  const Model    = app.get('rethinkdbClient');
  const paginate = app.get('paginate');
  
  const options = {
    name: 'polls',
    Model,
    paginate,
    watch: false,
  };
  
  // Initialize our service with any options it requires
  app.use('/api/polls', createService(options));
  
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/polls');
  
  service.hooks(hooks);
  
  if (service.filter) {
    service.filter(filters);
  }
};
