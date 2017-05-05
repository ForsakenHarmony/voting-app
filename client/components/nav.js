import { Component } from 'preact';
import { connect } from 'preact-redux';
import { route } from 'preact-router';

import {
  Layout,
  Button,
  Icon,
  Menu,
} from 'preact-mdl';

import { auth } from '../feathers';

const mapDispatchToProps = dispatch => ({
  handleLogout: () => {
    console.log('logout');
    dispatch(auth.logout());
    route('/');
  },
});

@connect(state => ({ ...state.routing, ...state.auth }), mapDispatchToProps)
export default class Nav extends Component {
  render({ url, isSignedIn, dispatch, toggleMenu }, {}, {}) {
    const { Item } = Menu;
    
    return (
      <Layout.Header manual>
        <div className="mdl-layout-icon">
          <Button icon onClick={toggleMenu}><Icon icon="menu"/></Button>
        </div>
        <Layout.HeaderRow>
          <Layout.Title>Voting App</Layout.Title>
          <Layout.Spacer/>
          {isSignedIn ? [
            <Button fab
                    accent
                    class="floating-action-button"
                    onClick={route.bind(null, '/new')}>
              <Icon>add</Icon>
            </Button>,
            <Button icon id="person-menu"><Icon>person</Icon></Button>,
            <Menu bottom-right for="person-menu">
              <Item onClick={route.bind(null, '/me')}>Profile</Item>
              <Item onClick={this.props.handleLogout}>Log Out</Item>
            </Menu>,
          ] : [
            <Button icon
                    onClick={route.bind(null, '/login')}>
              <Icon>exit_to_app</Icon>
            </Button>,
          ]}
        </Layout.HeaderRow>
      </Layout.Header>
    );
  }
}
