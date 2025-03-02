import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/pngwing.com.png';
import "../App.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const closeNavbar = () => setIsOpen(false);

  return (
    <header className="rounded fixed-top">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          {/* Logo and Website Name */}
          <div className="text-center h1 navbar-brand">
            <img src={logo} width="38px" alt="Logo" /> Organize
          </div>

          {/* Navbar Toggler for mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarNavDropdown"
            aria-expanded={isOpen ? 'true' : 'false'}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/" onClick={closeNavbar}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/calendar" onClick={closeNavbar}>
                  Calendar
                </Link>
              </li>
              {/* Unchanged To-Do List Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  To Do List
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <Link className="dropdown-item" to="/tododaily" onClick={closeNavbar}>
                      Today
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/todoweekly" onClick={closeNavbar}>
                      Weekly
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/todomonthly" onClick={closeNavbar}>
                      Monthly
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/notes" onClick={closeNavbar}>
                  Notes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#" onClick={closeNavbar}>
                  Files
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#" onClick={closeNavbar}>
                  Progress
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
