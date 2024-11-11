import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import UserProfileContainer from "../components/UserProfileContainer";
import Logo from "../assets/mycomm.png";
import "../App.css";

function UserManage({ token, setTokenFunc }) {
  const navigate = useNavigate();

  const logOut = async() => {
    localStorage.removeItem('token');
    await setTokenFunc(null);
    navigate("/");
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Poppins"
        rel="stylesheet"
      ></link>
      <div class="d-flex justify-content-between">
        <img
          src={Logo}
          alt="MyComms Logo"
          style={{ maxWidth: "15%", height: "auto" }}
        />
        <Button style={{ width: "10%" }} onClick={logOut}>
          LOG OUT
        </Button>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <h1 class="login-text" style={{ marginTop: "15vh" }}>
          Select User Profile
        </h1>
      </div>
      <br />
      <UserProfileContainer token={token}></UserProfileContainer>
    </>
  );
}

export default UserManage;
