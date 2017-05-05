'use strict';

const ajv = require('ajv');

const { authenticate }                  = require('feathers-authentication').hooks;
const { when, discard, validateSchema } = require('feathers-hooks-common');
const { restrictToOwner }               = require('feathers-authentication-hooks');

const { hashPassword } = require('feathers-authentication-local').hooks;

const schema = require('./users.schema');

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
    find  : [authenticate('jwt')],
    get   : [...restrict],
    create: [
      validateSchema(schema, ajv),
      hashPassword(),
    ],
    update: [...restrict, hashPassword()],
    patch : [...restrict, hashPassword()],
    remove: [...restrict],
  },
  
  after: {
    all   : [
      when(
        hook => hook.params.provider,
        discard('password')
      ),
    ],
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
