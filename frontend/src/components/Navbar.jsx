import React from "react";
import { Link } from "react-router-dom";
import '../App.css';
import Logo from "../assets/mycommspro.png";
import { NavBar, LogoBox, NavbarLink, NavbarLinks, SwitchProfileButton } from "../Wrappers";

const Navbar = ({ profileID }) => {
  return (
    <NavBar>
      <LogoBox>
        <img src={Logo} alt="MyComms logo" style={{ height: '40px', width: 'auto' }}/>
      </LogoBox>
      <NavbarLinks>
        <NavbarLink to={`/home/${profileID}`}>
          Home
        </NavbarLink>
        <NavbarLink to={`/supports/${profileID}`}>
          Supports
        </NavbarLink>
        <NavbarLink to={`/gallery/${profileID}`}>
          Gallery
        </NavbarLink>
        <NavbarLink to={`/sharedtemplates/${profileID}`}>
          Templates
        </NavbarLink>
        <NavbarLink to={`/settings/${profileID}`}>
          My Settings
        </NavbarLink>
      </NavbarLinks>
      <LogoBox>
        <Link to="/UserManage">
          <SwitchProfileButton variant="contained">
            👤 Switch Profile
          </SwitchProfileButton>
        </Link>
      </LogoBox>
    </NavBar>
  );
};

export default Navbar;
