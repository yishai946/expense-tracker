import React from 'react'
import { Link } from 'react-router-dom'

function Navigator() {
  return (
      <nav className="nav-container">
        <Link to="/">
          <img src="/home.png" className="icon" />
        </Link>
        <Link to="/expenses">
          <img src="minus.png" className="icon" />
        </Link>
        <Link to="/incomes">
          <img src="plus.png" className="icon" />
        </Link>
        <Link to="/settings">
          <img src="settings.png" className="icon" />
        </Link>
      </nav>
  );
}

export default Navigator