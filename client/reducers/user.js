import * as actionTypes from '../constants/action-types';

const jwt = JSON.parse(localStorage.getItem('feathers-jwt'));

const initialState = {
  loggedin: Boolean(jwt),
};

export default function (state = initialState, action) {
  if (action.type === actionTypes.LOGIN) {
    return { loggedin: true };
  } else if (action.type === actionTypes.LOGOUT) {
    return { loggedin: false };
  }
  return state;
}
