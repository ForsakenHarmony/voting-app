import { Component } from 'preact';
import cx from 'classnames';
import { connect } from 'preact-redux';

import { users, auth } from '../feathers';

@connect(state => state)
class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.form.checkValidity()) return;
    
    this.setLoading(true);
    const { email, password }    = this.state;
    const { dispatch, register } = this.props;
    
    console.log('LOGIN', register, email, password);
    
    if (register) {
      this.handleRegister(dispatch, email, password);
    } else {
      this.handleLogin(dispatch, email, password);
    }
  };
  
  handleLogin = async (dispatch, email, password) => {
    try {
      const authReq = await dispatch(
        auth.authenticate({ strategy: 'local', email, password })
      );
      console.log(authReq);
      this.setLoading(false);
    } catch (e) {
      this.setLoading(false);
      console.error(e);
    }
  };
  
  handleRegister = async (dispatch, email, password) => {
    try {
      const authReq = await dispatch(
        users.create({ email, password })
      );
      console.log(authReq);
      this.setLoading(false);
    } catch (e) {
      this.setLoading(false);
      console.error(e);
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
  
  render({ users, auth, dispatch, register }, { loading, email, password }, {}) {
    return (
      <div className="is-centered">
        <div className="card is-centered">
          <section className="card-content">
            <form ref={this.formRef} onSubmit={this.handleSubmit}>
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
                  <span className="help is-danger">
                    This email is invalid
                  </span>
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
              <button type="submit"
                      style={{ display: 'none' }}></button>
            </form>
          </section>
          <footer className="card-footer">
            <p className="card-footer-item">
              <button className={cx('button is-success', loading && 'is-loading')}
                      onClick={this.handleSubmit}>
                {register ? 'Register' : 'Log In'}
              </button>
            </p>
          </footer>
        </div>
      </div>
    );
  }
}

export default Login;
