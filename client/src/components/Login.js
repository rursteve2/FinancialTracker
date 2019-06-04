import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'

class Login extends Component {
  render() {
    const { username, password, onFormChange, onLoginSubmit, isLoggedIn } = this.props
    const afterLogin = isLoggedIn ? <Redirect to="/daily"/> : null
    return (
      <div>
        {afterLogin}
        <div>
            <h2>Login</h2>
            <form className="login" onSubmit={onLoginSubmit}>
                <input type="text" placeholder="Username" name="username" value={username} onChange={onFormChange} required/>
                <input type="text" placeholder="Password" name="password" value={password} onChange={onFormChange} required/>
                <input type="submit"/>
            </form>
            <p>Or register <Link to="/register">here</Link></p>
        </div>
      </div>
    );
  }
}

export default Login;
