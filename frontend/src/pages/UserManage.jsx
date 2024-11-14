import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import GridOnIcon from "@mui/icons-material/GridOn";
import UserProfileContainer from "../components/UserProfileContainer";
import UserProfileList from "../components/UserProfileList";
import Logo from "../assets/mycomm.png";
import "../App.css";

function UserManage({ token, setTokenFunc }) {
  const navigate = useNavigate();
  const [isListView, setIsListView] = useState(false);

  const logOut = async () => {
    localStorage.removeItem("token");
    await setTokenFunc(null);
    navigate("/");
  };

  const toggleView = () => setIsListView(!isListView);

  const handleAddUser = () => {
    navigate("/AddUser"); // Navigate to the AddUser page
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Poppins"
        rel="stylesheet"
      ></link>
      <div className="d-flex justify-content-between">
        <img
          src={Logo}
          alt="MyComms Logo"
          style={{ maxWidth: "15%", height: "auto" }}
        />
        <Button style={{ width: "10%" }} onClick={logOut}>
          LOG OUT
        </Button>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <h1 className="login-text" style={{ marginTop: "15vh" }}>
          Select User Profile
        </h1>
      </div>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={2}
        gap={2}
      >
        <Button
          onClick={toggleView}
          variant="contained"
          color="primary"
          startIcon={isListView ? <GridOnIcon /> : <ListIcon />}
        >
          {isListView ? "Grid View" : "List View"}
        </Button>
        <Button onClick={handleAddUser} variant="contained" color="secondary">
          + Create New User
        </Button>
      </Box>

      <br />
      {isListView ? (
        <UserProfileList token={token} />
      ) : (
        <UserProfileContainer token={token} />
      )}
    </>
  );
}

export default UserManage;
