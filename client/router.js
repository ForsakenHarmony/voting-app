import { Component } from 'preact';

import Router from 'preact-router';
import { Provider } from 'preact-redux';

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

class RouterComponent extends Component {
  render({ onChange }, {}, {}) {
    return (
      <Router onChange={onChange}>
        <Index path="/"/>
        <Login path="/login" key="/login"/>
        <Login register path="/register" key="/register"/>
        <Create path="/new"/>
        <Profile path="/me"/>
        <Poll path="/p/:id"/>
        <Poll res path="/p/:id/res"/>
        <NotFound default path="/404"/>
      </Router>
    );
  }
}
