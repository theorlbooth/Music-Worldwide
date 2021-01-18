import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return <nav className="navbar">
    <div className="navbar-menu is-active">
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link className="button is-white" to="/Music-Worldwide">Home</Link>
            <Link className="button is-black" to="/Music-Worldwide/charts">Charts</Link>
            <Link className="button is-black" to="/Music-Worldwide/search">Artists</Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
}

export default Navbar