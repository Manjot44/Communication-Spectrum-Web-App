import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

// Image assets
// Logos
import Logo from "../assets/mycomms_white.png";

const Navbar = ({ profileID }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="MyComms logo" className="logo-img" />
      </div>
      <div className="navbar-links">
        <Link to={`/home/${profileID}`} className="nav-item">
          Home
        </Link>
        <Link to={`/supports/${profileID}`} className="nav-item">
          Supports
        </Link>
        <Link to={`/gallery/${profileID}`} className="nav-item">
          Gallery
        </Link>
        <Link to={`/sharedtemplates/${profileID}`} className="nav-item">
          Templates
        </Link>
        <Link to={`/settings/${profileID}`} className="nav-item">
          My Settings
        </Link>
      </div>
      <div className="profile-switch">
        <Link to="/UserManage">
          <button className="profile-btn">👤 Switch Profile</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;