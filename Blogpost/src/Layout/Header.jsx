import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const handleLogout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userName');
  localStorage.removeItem('userId');
  window.location.href = '/login';
};

const Header = () => {
  const [userName, setUserName] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) setUserName(storedName);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const initials = userName
    ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'G';

  return (
    <nav className={`navbar navbar-expand-lg custom-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container-fluid px-4">

        {/* Logo */}
        <a className="navbar-brand blognest-logo" href="/dashboard">
          <span className="logo-icon">✦</span>
          <span className="logo-text">Blognest</span>
        </a>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="toggler-bar" />
          <span className="toggler-bar" />
          <span className="toggler-bar" />
        </button>

        {/* Nav links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-links">
            <li className="nav-item"><a className="nav-link" href="/dashboard">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="/blog">Explore</a></li>
            <li className="nav-item"><a className="nav-link" href="/write">Write</a></li>
            <li className="nav-item"><a className="nav-link" href="/profile/:id">My Blog</a></li>
          </ul>

          {/* Right side */}
          <div className="header-right">
            <a href="/write" className="write-btn">+ New Post</a>

            {/* Profile dropdown */}
            <div className="dropdown profile-dropdown">
              <div className="avatar-wrap dropdown-toggle" data-bs-toggle="dropdown">
                <div className="avatar-circle">{initials}</div>
              </div>
              <ul className="dropdown-menu dropdown-menu-end">
                <li className="dropdown-header">
                  <div className="avatar-circle sm">{initials}</div>
                  <div>
                    <p className="drop-name">{userName || 'Guest'}</p>
                    <p className="drop-role">Writer</p>
                  </div>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/profile/:id">
                  <span>👤</span> My Profile
                </a></li>
                <li><a className="dropdown-item" href="/write">
                  <span>✏️</span> Write Blog
                </a></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    <span>🚪</span> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;