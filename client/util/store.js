import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/root';

import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

const middleware = [thunk, promise()];
// if (process.env.NODE_ENV !== 'production') {
//   // eslint-disable-next-line global-require
//   const createLogger = require('redux-logger').createLogger;
//   const logger       = createLogger();
//   middleware.push(logger);
// }

function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      (process.env.NODE_ENV !== 'production' || undefined)
      && window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}

const store = configureStore();

export default store;
