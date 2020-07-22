import React from 'react';
import { Link } from 'react-router-dom';

// import Course from './Course';

const Header = (props) => {
    return (
        <div id="root">
        <div>
          <div className="header">
            <div className="bounds">
              <h1 className="header--logo">Courses</h1>
              <nav>
              <Link to="/signup" className="signup">Sign Up</Link>
              <Link to="/signin" className="signin">Sign In</Link>

              </nav>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Header;


