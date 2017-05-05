'use strict';

const { authenticate } = require('feathers-authentication').hooks;

const {
        restrictToOwner,
        associateCurrentUser,
        queryWithCurrentUser,
      } = require('feathers-authentication-hooks');

const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField   : 'id',
    ownerField: 'id',
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
