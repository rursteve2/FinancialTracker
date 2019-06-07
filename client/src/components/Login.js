import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'

class Login extends Component {
  render() {
    const { username, password, onFormChange, onLoginSubmit, isLoggedIn } = this.props
    const afterLogin = isLoggedIn ? <Redirect to="/calendar/daily"/> : null
    return (
      <div className="login">
        {afterLogin}
        <div>
            <h2 className="loginheader">Login</h2>
            <form className="loginform" onSubmit={onLoginSubmit}>
                <input className="logininput" type="text" placeholder="Username" name="username" value={username} onChange={onFormChange} required/>
                <input className="logininput" type="password" placeholder="Password" name="password" value={password} onChange={onFormChange} required/>
                <button className="loginsubmit" type="submit">Submit</button>
            </form>
            <p className="loginredirect">Or register <Link to="/register">here</Link></p>
        </div>
      </div>
    );
  }
}

export default Login;
