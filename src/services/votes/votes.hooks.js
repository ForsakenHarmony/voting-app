'use strict';

const { iff, getItems, disallow } = require('feathers-hooks-common');
const { associateCurrentUser }    = require('feathers-authentication-hooks');

const checkVoteUnique = require('../../hooks/check-vote-unique');

module.exports = {
  before: {
    all   : [],
    find  : [
      iff(
        hook => hook.params.query.count,
        (hook) => {
          hook.params.paginate = {};
          
          hook.params.rethinkdb
            = hook.service.table
                  .getAll(hook.params.query.pollId, { index: 'pollId' })
                  .group('option')
                  .count();
        }
      ),
    ],
    get   : [],
    create: [
      iff(
        hook => hook.params.authenticated,
        associateCurrentUser({ idField: 'id', as: 'creator' })
      ),
      iff(
        hook => hook.params.ip,
        (hook) => {
          hook.data.ip = hook.params.ip;
        }
      ),
      checkVoteUnique(),
    ],
    update: [disallow('external')],
    patch : [disallow('external')],
    remove: [disallow('external')],
  },
  
  after: {
    all   : [],
    find  : [
      iff(
        hook => hook.params.query.count,
        (hook) => {
          const data  = getItems(hook);
          hook.result = data.reduce((acc, val) => {
            acc[val.group] = val.reduction;
            return acc;
          }, {});
        }
      ),
    ],
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
