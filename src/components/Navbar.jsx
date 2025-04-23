import React, { useState } from 'react';
import './Navbar.css';

export default function Navbar({ onSignOut }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <nav className="navbar">
      <div className="logo">
        🛒 <strong>Home shop manager</strong>
      </div>

      <div className="profile-section">
        <img
          src="https://i.pravatar.cc/40"
          alt="Profile"
          className="profile-pic"
          onClick={toggleDropdown}
        />
        {showDropdown && (
          <div className="dropdown-menu">
            <div className="dropdown-item">Business setup</div>
            <div className="dropdown-divider" />
            <div className="dropdown-item" onClick={onSignOut}>Log out</div>
          </div>
        )}
      </div>
    </nav>
  );
}
