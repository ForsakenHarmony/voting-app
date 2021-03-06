import { render } from 'preact';

import 'material-design-lite/material';

import App from './router';

if (process.env.NODE_ENV !== 'production') {
  // require('debug').enable('*');
  require('preact/devtools');
}

if (module.hot) {
  module.hot.accept('./router.js', () => {
    const App = require('./router').default;
    render(
      <App/>
      , document.getElementById('appRoot')
      , document.querySelector('#appRoot > div')
    );
  });
}

render(
  <App/>
  , document.getElementById('appRoot')
  , document.querySelector('#appRoot > div')
);
