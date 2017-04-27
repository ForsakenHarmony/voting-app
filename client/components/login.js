import { Component } from 'preact';
import cx from 'classnames';
import { connect } from 'preact-redux';
import { route } from 'preact-router';

import Modal from './modal';

import { users, auth } from '../feathers';

// import { post } from '../util/fetch';

import * as actions from '../actions';

@connect(state => state)
class Login extends Component {
  handleLogin = async (e) => {
    e.preventDefault();
    if (!this.form.checkValidity()) return;
    
    this.setLoading(true);
    const { email, password, register } = this.state;
    const { dispatch }                  = this.props;
    
    // const url = register ? '/api/auth/register' : '/api/auth/login';
    
    console.log('LOGIN', register, email, password);
    
    if (register) {
      dispatch(users.create({ email, password }));
    } else {
      dispatch(auth.create({ strategy: 'local', email, password }));
    }
  };
  
  setLoading = val => this.setState({ loading: val });
  
  formRef = (el) => {
    this.form = el;
  };
  
  update = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  
  open = () => {
    this.setState({ open: true });
  };
  
  close = () => {
    this.setState({ open: false });
  };
  
  toggleMode = () => {
    this.setState({ register: !this.state.register });
  };
  
  render({ users, auth, dispatch }, { open, loading, email, password, register }, {}) {
    if (auth && auth.data && auth.data.accessToken) {
      window.localStorage.setItem('feathers-jwt', auth.data.accessToken);
      dispatch(actions.login());
      route('/');
    }
    return (
      <span className="nav-item">
        <button className="button is-light" onClick={this.open}>Log In</button>
        
        <Modal open={open} close={this.close}>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{register ? 'Register' : 'Log In'}</p>
              <button className="delete" onClick={this.close}></button>
            </header>
            <section className="modal-card-body">
              <form ref={this.formRef} onSubmit={this.handleLogin}>
                <div className="field">
                  <label className="label">Email</label>
                  <p className="control">
                    <input required
                         type="email"
                         name="email"
                         className="input"
                         placeholder="Email"
                         value={email}
                         onChange={this.update}/>
                    <span className="help is-danger">This email is invalid</span>
                  </p>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <p className="control">
                    <input required
                           type="password"
                           className="input"
                           name="password"
                           placeholder="Password"
                           minLength={8}
                           value={password}
                           onChange={this.update}/>
                    <span className="help is-danger">
                      This password is invalid (min 8 chars)
                    </span>
                  </p>
                </div>
                <button type="submit" style={{ display: 'none' }}></button>
              </form>
            </section>
            <footer className="modal-card-foot">
              <button className={cx('button is-success', loading && 'is-loading')}
                      type="submit"
                      onClick={this.handleLogin}>{register ? 'Register' : 'Log In'}</button>
              <button className="button" onClick={this.close}>Cancel</button>
              <spacer style={{ flexGrow: 1 }}></spacer>
              <button className="button is-pulled-right is-link"
                      onClick={this.toggleMode}>{register ? 'Log In' : 'Register'}</button>
            </footer>
          </div>
        </Modal>
      </span>
    );
  }
}

export default Login;
