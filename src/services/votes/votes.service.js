'use strict';

// Initializes the `votes` service on path `/api/votes`
const createService = require('feathers-rethinkdb');
const hooks         = require('./votes.hooks');
const filters       = require('./votes.filters');

module.exports = function users() {
  const app      = this;
  const Model    = app.get('rethinkdbClient');
  const paginate = app.get('paginate');
  
  const options = {
    name: 'votes',
    Model,
    paginate,
  };
  
  // Initialize our service with any options it requires
  app.use('/api/votes', createService(options));
  
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/votes');
  
  service.hooks(hooks);
  
  if (service.filter) {
    service.filter(filters);
  }
};
