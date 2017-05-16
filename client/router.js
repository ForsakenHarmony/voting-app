import { Component } from 'preact';

import Router from 'preact-router';
import { Provider, connect } from 'react-redux';

import store from './util/store';
import * as actions from './actions';
import { auth } from './feathers';

import App from './containers/app';
import NotFound from './containers/not-found';
import Index from './containers/index';
import Poll from './containers/poll';
import Create from './containers/create-poll';
import Login from './containers/login';
import Profile from './containers/profile';

store.dispatch(auth.authenticate()).catch(() => {
});

export default class Page extends Component {
  onChange = ({ url }) => {
    store.dispatch(actions.routeTo(url));
  };
  
  render({}, {}, {}) {
    return (
      <Provider store={store}>
        <App>
          <RouterComponent onChange={this.onChange}/>
        </App>
      </Provider>
    );
  }
}

@connect(state => ({ ...state.auth }))
class RouterComponent extends Component {
  render({ onChange, isSignedIn }, {}, {}) {
    return (
      <Router onChange={onChange}>
        <Index path="/"/>
        {isSignedIn ? [
          <Create path="/new"/>,
          <Profile path="/me"/>,
        ] : [
          <Login key="/login" path="/login"/>,
          <Login key="/register" path="/register" register/>,
        ]}
        <Poll path="/p/:id"/>
        <NotFound path="/404" default/>
      </Router>
    );
  }
}
