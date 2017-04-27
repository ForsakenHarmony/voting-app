import { Component } from 'preact';
import cx from 'classnames';

import Modal from './modal';

import { post } from '../util/fetch';

import * as actions from '../actions';

class Login extends Component {
  handleLogin = async (e) => {
    e.preventDefault();
    if (!this.form.checkValidity()) return;
    
    this.setLoading(true);
    const { email, password, register } = this.state;
    
    const url = register ? '/api/auth/register' : '/api/auth/login';
    
    try {
      const result = await post(url, { email, password });
      if (result.status !== 200) {
        this.props.dispatch(actions.createMessage(
          register
            ? 'Email already in use'
            : 'Incorrect email/password.'
        ));
        return;
      }
      const body = await result.json();
      this.props.dispatch(actions.login(body.user));
      this.setLoading(false);
    } catch (e) {
      console.error(e);
      this.props.dispatch(actions.createMessage('An Error occurred, please try again.'));
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
  
  render({}, { open, loading, email, password, register }) {
    return (
      <span class="nav-item">
        <button class="button is-primary" onClick={this.open}>Log In</button>
        
        <Modal open={open} close={this.close}>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">{register ? 'Register' : 'Log In'}</p>
              <button class="delete" onClick={this.close}></button>
            </header>
            <section class="modal-card-body">
              <form ref={this.formRef} onSubmit={this.handleLogin}>
                <label class="label">Email</label>
                <p class="control has-icon">
                  <input type="email" name="email" class="input"
                         placeholder="Email" required
                         value={email} onChange={this.update}/>
                  <span class="icon is-small"><i class="fa fa-envelope"/></span>
                  <span class="help is-danger">This email is invalid</span>
                </p>
                <label class="label">Password</label>
                <p class="control has-icon">
                  <input type="password" class="input" name="password"
                         placeholder="Password" required minLength={8}
                         value={password} onChange={this.update}/>
                  <span class="icon is-small"><i class="fa fa-lock"/></span>

                  <span
                    class="help is-danger">This password is invalid (min 8 chars)</span>
                </p>
                <button type="submit" style={{ display: 'none' }}></button>
              </form>
            </section>
            <footer class="modal-card-foot">
              <button class={cx('button is-success', loading && 'is-loading')}
                      onClick={this.handleLogin}
                      type="submit">{register ? 'Register' : 'Log In'}</button>
              <button class="button" onClick={this.close}>Cancel</button>
              <spacer style={{ flexGrow: 1 }}></spacer>
              <button class="button is-pulled-right is-link"
                      onClick={this.toggleMode}>{register ? 'Log In' : 'Register'}</button>
            </footer>
          </div>
        </Modal>
      </span>
    );
  }
}

export default Login;
