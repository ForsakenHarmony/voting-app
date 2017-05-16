'use strict';

// Application hooks that run for every service
// const iplogger = require('./hooks/ip-logger');

module.exports = {
  before: {
    all   : [/* iplogger() */],
    find  : [],
    get   : [],
    create: [],
    update: [],
    patch : [],
    remove: [],
  },
  
  after: {
    all   : [],
    find  : [],
    get   : [],
    create: [],
    update: [],
    patch : [],
    remove: [],
  },
  
  error: {
    all   : [],
    find  : [],
    get   : [],
    create: [],
    update: [],
    patch : [],
    remove: [],
  },
};
