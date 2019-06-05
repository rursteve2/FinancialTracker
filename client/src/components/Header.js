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
            <Link to="/calendar/daily">
                Daily Expenses
            </Link>
            <Link to="/calendar/monthly">
                Monthly Expenses
            </Link>
            <Link to="/calendar">
                Calendar
            </Link>
        </nav>
      </div>
    );
  }
}

export default Header;
