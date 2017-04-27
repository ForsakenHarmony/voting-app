import { combineReducers } from 'redux';
import routing from './routing';
import user from './user';
import * as services from '../feathers';

export default combineReducers({
  users: services.users.reducer,
  polls: services.polls.reducer,
  votes: services.votes.reducer,
  auth : services.auth.reducer,
  user,
  routing,
});
