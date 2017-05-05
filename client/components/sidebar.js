import { Component } from 'preact';
import { connect } from 'preact-redux';
import { route } from 'preact-router';

import { Navigation as Nav, NavigationLink, Layout, Icon } from 'preact-mdl';

import { auth } from '../feathers';

const mapDispatchToProps = dispatch => ({
  handleLogout: () => {
    console.log('logout');
    dispatch(auth.logout());
    route('/');
  },
});

@connect(state => ({ ...state.routing, ...state.auth }), mapDispatchToProps)
export default class SideBar extends Component {
  go = (href) => {
    route(href);
    this.props.toggle();
  };
  
  render({ open, toggle, isSignedIn }, {}, {}) {
    return (
      <Layout.Drawer js={false} className={open ? 'is-visible' : null}>
        <Layout.Title>
          Voting App
        </Layout.Title>
        <Nav>
          <Link href="/" route={this.go} icon="home">Home</Link>
          {isSignedIn && [
            <Link href="/new" icon="add" route={this.go}>New Poll</Link>,
            <Link href="/me" icon="person" route={this.go}>Profile</Link>,
          ]}
          <Divider/>
          {isSignedIn ? [
            <Link icon="exit_to_app" route={this.props.handleLogout}>Log Out</Link>,
          ] : [
            <Link href="/register" route={this.go} icon="exit_to_app">Sign Up</Link>,
            <Link href="/login" route={this.go} icon="person_add">Log In</Link>,
          ]}
        </Nav>
      </Layout.Drawer >
    );
  }
}

const Link = ({ icon, href, route, children }) => (
  <NavigationLink href={href} route={route}>
    <Icon>{icon}</Icon>
    {children}
  </NavigationLink>
);

const Divider = () => (
  <div style={{
    borderTop: '1px solid #DDD',
    margin   : '5px 0',
    height   : '0',
    padding  : '0',
    fontSize : '0',
  }}/>
);
