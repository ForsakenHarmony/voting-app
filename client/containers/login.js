import { Component } from 'preact';
import { connect } from 'react-redux';
import { route } from 'preact-router';
import { Button, Card, CardText, TextField } from 'preact-mdl';

import { auth, users } from '../feathers';

import emitter from '../util/emitter';

@connect(({ auth, users }) => ({ auth, users }))
class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.form.checkValidity()) return;
    // return;
    
    this.setLoading(true);
    const { email, password }    = this.state;
    const { dispatch, register } = this.props;
    
    if (register) {
      this.handleRegister(dispatch, email, password);
    } else {
      this.handleLogin(dispatch, email, password);
    }
  };
  
  handleLogin = async (dispatch, email, password) => {
    try {
      await dispatch(
        auth.authenticate({ strategy: 'local', email, password })
      );
      route('/me');
    } catch (e) {
      this.setError('Username/Email incorrect');
    }
    this.setLoading(false);
  };
  
  handleRegister = async (dispatch, email, password) => {
    try {
      await dispatch(
        users.create({ email, password })
      );
      route('/login');
    } catch (e) {
      this.setError('User already exists');
    }
    this.setLoading(false);
  };
  
  setLoading = (val) => {
    this.setState({ loading: val });
  };
  
  formRef = (el) => {
    this.form = el;
  };
  
  update = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({ valid: this.form.checkValidity() });
  };
  
  setError = (error) => {
    emitter.emit('message', error);
    this.setState({ error });
  };
  
  switchState = () => {
    route(this.props.register ? '/login' : '/register');
  };
  
  render({ users, auth, dispatch, register }, { loading, email, password, valid, error }, {}) {
    return (
      <Card shadow={2} class="centered" id="login">
        <CardText>
          <form ref={this.formRef} onSubmit={this.handleSubmit}>
            <h4>{(register ? 'Sign Up' : 'Log In')}</h4>
            <TextField floating-label
                       required
                       type="email"
                       name="email"
                       label="Email"
                       value={email}
                       onInput={this.update}/>
            <TextField floating-label
                       required
                       minLength={8}
                       type="password"
                       name="password"
                       label="Password"
                       value={password}
                       onInput={this.update}/>
            <button type="submit" style={{ display: 'none' }}></button>
            <button-bar>
              <Button primary
                      raised
                      type="submit"
                      disabled={!valid || loading}
                      onClick={this.handleSubmit}>
                {(register ? 'Sign Up' : 'Log In') + (loading ? '...' : '')}
              </Button>
            </button-bar>
            <button-bar>
              <Button accent onClick={this.switchState}>
                {(register ? 'Already have an account?' : 'Need to sign up?')}
              </Button>
            </button-bar>
          </form>
        </CardText>
      </Card>
    );
  }
}

export default Login;
