'use strict';

const authentication = require('feathers-authentication');
const { discard }    = require('feathers-hooks-common');
const jwt            = require('feathers-authentication-jwt');
const local          = require('feathers-authentication-local');

module.exports = function auth() {
  const app    = this;
  const config = app.get('authentication');
  
  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());
  
  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('api/auth').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies),
        // console.log,
      ],
      remove: [
        authentication.hooks.authenticate('jwt'),
      ],
    },
    after : {
      create: [
        (hook) => {
          hook.result.data = hook.params.user;
        },
        discard('data.password'),
      ],
    },
  });
};
