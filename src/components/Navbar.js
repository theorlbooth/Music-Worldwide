import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return <nav className="navbar">
    <div className="navbar-menu is-active">
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link className="button is-light" to="/project-2">Home</Link>
            <Link className="button is-info" to="/project-2/charts">Charts</Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
}

export default Navbar