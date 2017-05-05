import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication-client';
import hooks from 'feathers-hooks';

import reduxifyServices from 'feathers-reduxify-services';
import reduxifyAuthentication from 'feathers-reduxify-authentication';

import io from 'socket.io-client';

const socket = io();
const app    = feathers();

app.configure(socketio(socket))
   .configure(hooks())
   .configure(authentication({
     storage: window.localStorage,
   }));

// app.authenticate().then((response) => {
//   console.info('Feathers Client has Authenticated with the JWT access token!');
//   console.log(response);
// }).catch((error) => {
//   console.info('We have not logged in with OAuth, yet.  This means there\'s no cookie storing the accessToken.  As a result, feathersClient.authenticate() failed.');
//   console.log(error);
// });

// try to login if auth token exists
// app.authenticate().catch(() => {});

export default app;

// Expose Redux action creators and reducers for Feathers' services
const services = reduxifyServices(app, [
  'api/users',
  'api/polls',
  'api/votes',
]);

const auth = reduxifyAuthentication(app);

const users = services['api/users'];
const polls = services['api/polls'];
const votes = services['api/votes'];

export { users, polls, votes, auth };
