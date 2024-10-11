import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import '../App.css';

// Image assets
// Logos
import Logo from "../assets/mycomms_white.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="MyComms logo" className="logo-img" />
      </div>
      <div className="navbar-links">
        <a href="/home" className="nav-item">
          Home
        </a>
        <a href="/explore" className="nav-item">
          Explore
        </a>
        <a href="/gallery" className="nav-item">
          Gallery
        </a>
        <a href="/templates" className="nav-item">
          Templates
        </a>
        <a href="/learn" className="nav-item">
          Learn
        </a>
        <a href="/categories" className="nav-item">
          Categories
        </a>
      </div>
      <div className="profile-switch">
        <Link to="/usermanage">
          <button className="profile-btn">👤 Switch Profile</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
