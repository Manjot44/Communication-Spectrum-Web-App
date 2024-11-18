import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import GridOnIcon from "@mui/icons-material/GridOn";
import UserProfileContainer from "../components/UserProfileContainer";
import UserProfileList from "../components/UserProfileList";
import Logo from "../assets/Mycommsproblue.png";
import "../App.css";
import { UserManageHeader, Title, UserManageOptions } from "../Wrappers";

function UserManage({ token, setTokenFunc }) {
  const navigate = useNavigate();
  const [isListView, setIsListView] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Logout function
  // Called when logout button pressed
  const logOut = async () => {
    localStorage.removeItem("token");
    await setTokenFunc(null);
    navigate("/");
  };

  // Function to navigate to settings
  // Called when the 'MY Settings" button clicked
  const goToSettings = () => {
    navigate("/settings");
  }

  // Function to toggle between grid and list view
  // Called when the Grid View/List View button is clicked
  const toggleView = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsListView(!isListView);
      setIsAnimating(false);
    }, 300);
  };

  // Function to go to add user page
  // Called when the "Create New User" button is clicked
  const handleAddUser = () => {
    navigate("/AddUser");
  };

  return (
    <>
      {/* Header with Logo and logout settings button- */}
      <UserManageHeader p={2}>
        <img
          src={Logo}
          alt="MyComms Logo"
          style={{ maxWidth: "15%", height: "auto" }}
        />
        <div>
          <Button style={{ marginRight: "20px" }} onClick={goToSettings}>
            My Settings
          </Button>
          <Button onClick={logOut}>
            LOG OUT
          </Button>
        </div>
      </UserManageHeader>
      <Title variant="h3">
        <b>Select User Profile</b>
      </Title>

      {/* Add new user button and the grid view buttons */}
      <UserManageOptions>
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
      </UserManageOptions>

      {/* Box displaying all user profiles */}
      <Box
        sx={{
          opacity: isAnimating ? 0 : 1,
          transition: "opacity 0.3s ease",
          mt: 2,
        }}
      >
        {isListView ? (
          <UserProfileList token={token} />
        ) : (
          <UserProfileContainer token={token} />
        )}
      </Box>
    </>
  );
}

export default UserManage;
