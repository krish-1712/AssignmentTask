import React from 'react';
import { Link } from 'react-router-dom';
import { BsPersonCircle, BsBoxArrowRight } from 'react-icons/bs'; // Import icons
import './Header.css'; // Import Header CSS for styling

function Header({ onLogout }) {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <h2>MyApp</h2>
        </Link>
      </div>

      <div className="header-right">
        <BsPersonCircle className="icon" />
        <button className="logout-btn" onClick={onLogout}>
          <BsBoxArrowRight className="icon" /> Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
