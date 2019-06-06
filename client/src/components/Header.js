import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
      const { token, userId, logout } = this.props
    return (
      <div className="header">
        <nav>
            {token && userId ? 
            <a href="/" onClick={logout}>Logout</a> : 
            <Link to="/">
                Login/Signup
            </Link>}
            <Link to="/calendar/daily">
                Daily Expenses
            </Link>
            <Link to="/calendar/monthly">
                Monthly Expenses
            </Link>
        </nav>
      </div>
    );
  }
}

export default Header;
