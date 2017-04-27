import * as actionTypes from '../constants/action-types';

export function login() {
  return {
    type: actionTypes.LOGIN,
  };
}

export function logout() {
  return {
    type: actionTypes.LOGOUT,
  };
}
