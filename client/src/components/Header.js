import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <div>
        <nav>
            <Link to="/">
                Home
            </Link>
            <ul>
                Login/Signup
            </ul>
            <ul>
                Two
            </ul>
            <ul>
                Three
            </ul>
        </nav>
      </div>
    );
  }
}

export default Header;
