import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Grid, Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IosShareIcon from "@mui/icons-material/IosShare";
import "../App.css";

function UserProfileCircles({
  profileName,
  profilePicture,
  profileID,
  onDelete,
  onShare,
}) {
  const navigate = useNavigate();

  const handleUser = () => {
    navigate(`/home/${profileID}`);
  };

  return (
    <Grid item xs={12} sm={4} md={3} lg={2}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        onClick={handleUser}
      >
        <img
          src={profilePicture}
          alt=""
          className="user-profile-image"
          style={{ cursor: "pointer" }}
        />
        <Typography
          variant="body1"
          sx={{ fontFamily: "Poppins", mt: 1, fontWeight: 500 }}
        >
          {profileName}
        </Typography>
        <Box display="flex" justifyContent="center" mt={1}>
          <IconButton
            aria-label="delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="share"
            onClick={(e) => {
              e.stopPropagation();
              onShare();
            }}
            color="primary"
          >
            <IosShareIcon />
          </IconButton>
        </Box>
      </Box>
    </Grid>
  );
}

export default UserProfileCircles;
