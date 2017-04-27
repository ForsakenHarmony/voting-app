import { Component } from 'preact';
import cx from 'classnames';
import { connect } from 'preact-redux';

@connect(state => ({ url: state.routing.url }))
class Nav extends Component {
  render({ url }, {}, {}) {
    return (
      <nav className="nav has-shadow">
        <div className="nav-left">
          <Tab href="/" currentUrl={url}>Home</Tab>
        </div>
      </nav>
    );
  }
}

const Tab = ({ href, currentUrl, icon, children, onClick }) => (
  <a href={href}
     className={cx('nav-item', 'is-tab', href === currentUrl && 'is-active')}
     onClick={onClick}>
    { icon && (
      <span className="icon is-marginless">
        <i className={'fa fa-' + icon}/>
      </span>
    )}
    { icon ? <span className="is-hidden-mobile" style={{ marginLeft: '0.5em' }}>
      {children}</span> : children }
  </a>
);

export default Nav;
