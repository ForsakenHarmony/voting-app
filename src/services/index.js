'use strict';

const users    = require('./users/users.service.js');
const polls    = require('./polls/polls.service.js');
const votes    = require('./votes/votes.service.js');

module.exports = function services() {
  const app = this;
  
  app.configure(users);
  app.configure(polls);
  app.configure(votes);
};
