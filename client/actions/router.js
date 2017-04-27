import * as actionTypes from '../constants/action-types';

export function routeTo(url) {
  return {
    type: actionTypes.ROUTE_TO,
    url,
  };
}
