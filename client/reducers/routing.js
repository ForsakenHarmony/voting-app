import * as actionTypes from '../constants/action-types';

const initialState = {
  url: null,
};

export default function (state = initialState, action) {
  if (action.type === actionTypes.ROUTE_TO) {
    return { ...state, url: action.url };
  }
  return state;
}
