import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <nav>
            <Link to="/">
                Login/Signup
            </Link>
            <Link to="/daily">
                Daily Expenses
            </Link>
            <Link to="/monthly">
                Monthly Expenses
            </Link>
        </nav>
      </div>
    );
  }
}

export default Header;
