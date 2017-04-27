import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root';

// import thunk from 'redux-thunk';

let middleware = []; // [thunk];
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const logger = require('redux-logger');
  middleware         = [...middleware, logger];
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

const enhancer = (
  (process.env.NODE_ENV !== 'production' || undefined)
  && window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState, enhancer);
}

