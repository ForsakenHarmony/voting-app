'use strict';

const { authenticate } = require('feathers-authentication').hooks;

const {
        restrictToOwner,
        associateCurrentUser,
        queryWithCurrentUser,
      } = require('feathers-authentication-hooks');

const insertHasVoted     = require('../../hooks/insert-has-voted');
const removeVotesForPoll = require('../../hooks/remove-votes-for-poll');

const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField   : 'id',
    ownerField: 'creator',
  }),
];

module.exports = {
  before: {
    all   : [],
    find  : [
      queryWithCurrentUser({ idField: 'id', as: 'creator' }),
    ],
    get   : [],
    create: [
      authenticate('jwt'),
      associateCurrentUser({ idField: 'id', as: 'creator' }),
    ],
    update: [...restrict],
    patch : [...restrict],
    remove: [...restrict],
  },
  
  after: {
    all   : [],
    find  : [],
    get   : [
      insertHasVoted('api/votes'),
    ],
    create: [],
    update: [],
    patch : [],
    remove: [
      removeVotesForPoll('api/votes'),
    ],
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
