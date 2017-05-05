import { Component } from 'preact';

import { Layout, LayoutContent, Snackbar } from 'preact-mdl';

import Nav from '../components/nav';
import SideBar from '../components/sidebar';

import emitter from '../util/emitter';

class App extends Component {
  toggleDrawer = () => {
    this.setState({ drawer: !this.state.drawer });
  };
  
  snackbarRef = (c) => {
    this.snackbar = c;
  };
  
  onMessage = (message) => {
    this.snackbar.base.MaterialSnackbar.showSnackbar({ message });
  };
  
  componentDidMount() {
    emitter.on('message', this.onMessage);
  }
  
  componentWillUnmount() {
    emitter.off('message', this.onMessage);
  }
  
  render({ children }, { drawer }, {}) {
    return (
      <Layout fixed-header id="app" js={false}>
        <Nav toggleMenu={this.toggleDrawer}/>
        <SideBar open={drawer} toggle={this.toggleDrawer}/>
        <LayoutContent id="main">
          {children}
        </LayoutContent>
        <div className={('mdl-layout__obfuscator') + (drawer ? ' is-visible' : '')}
             onClick={this.toggleDrawer}></div>
        <Snackbar ref={this.snackbarRef}/>
      </Layout>
    );
  }
}

export default App;
