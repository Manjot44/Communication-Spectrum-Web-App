import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import GridOnIcon from "@mui/icons-material/GridOn";
import UserProfileContainer from "../components/UserProfileContainer";
import UserProfileList from "../components/UserProfileList";
import Logo from "../assets/Mycommsproblue.png";
import "../App.css";

function UserManage({ token, setTokenFunc }) {
  const navigate = useNavigate();
  const [isListView, setIsListView] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const logOut = async () => {
    localStorage.removeItem("token");
    await setTokenFunc(null);
    navigate("/");
  };


  const goToSettings = () => {
    navigate("/settings");
  }

  const toggleView = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsListView(!isListView);
      setIsAnimating(false);
    }, 300); // Match with animation duration
  };

  const handleAddUser = () => {
    navigate("/AddUser");
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <img
          src={Logo}
          alt="MyComms Logo"
          style={{ maxWidth: "15%", height: "auto" }}
        />
        <div>
          <Button style={{ marginRight: "20px" }} onClick={goToSettings}>
            My Settings
          </Button>
          <Button style={{ width: "15%" }} onClick={logOut}>
            LOG OUT
          </Button>
        </div>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <Typography variant="h3" className="login-text">
          Select User Profile
        </Typography>
      </Box>

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
