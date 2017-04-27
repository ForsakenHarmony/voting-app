'use strict';

import { Component } from 'preact';

import Router from 'preact-router';
import { Provider } from 'preact-redux';

import store from './util/store';
import * as actions from './actions';

import App from './containers/app';
import NotFound from './containers/not-found';
import Index from './containers/index';
import Poll from './containers/poll';

class Page extends Component {
  onChange = ({ url }) => {
    console.log(url);
    store.dispatch(actions.routeTo(url));
  };
  
  render({}, {}, {}) {
    return (
      <Provider store={store}>
        <App>
          <Router onChange={this.onChange}>
            <Index path="/"/>
            <Poll path="/p/:id"/>
            <NotFound default path="/404"/>
          </Router>
        </App>
      </Provider>
    );
  }
}

export default Page;
