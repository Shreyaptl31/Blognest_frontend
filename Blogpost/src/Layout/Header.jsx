import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

// logout 
const handleLogout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userName');
  window.location.href = '/login';
};


const Header = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        {/* website name */}
        <a className="navbar-brand blognest-logo" href="/dashboard">
          <span className="logo-gradient">Blognest</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* pages  */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-links font-semibold	">
            <li className="nav-item ms-2"><a className="nav-link " href="/dashboard">Home</a></li>
            <li className="nav-item ms-2"><a className="nav-link" href="/blog">Blog</a></li>
            <li className="nav-item ms-2"><a className="nav-link" href="/write">Write</a></li>
            <li className="nav-item ms-2"><a className="nav-link" href="/profile/:id">My Blog</a></li>
          </ul>

          {/* profile  */}
          <div className="dropdown profile-dropdown">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Profile" className="profile-icon dropdown-toggle" data-bs-toggle="dropdown" />
            <ul className="dropdown-menu dropdown-menu-end">
              <li className="dropdown-item text-center fw-bold">{userName || 'Guest'}</li>
              <li><a className="dropdown-item" href="/profile/:id">My Profile</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li> <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;