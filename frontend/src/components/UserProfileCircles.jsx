import React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import "../App.css"

function UserProfileCircles ({ profileName, profilePicture, profileID }) {
  const navigate = useNavigate();

  // Navigate to the home page for the user profile
  const handleUser = () => {
    navigate(`/home/${profileID}`)
  }

  return (
    <>
      <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>
      <Grid container direction="column" spacing={0} onClick={handleUser}>
        <Grid item xs={12}>
          <img
            src={profilePicture}
            alt=""
            className="profile-picture"
            class="user-profile-image"
          />
        </Grid>
        <Grid item xs={12}>
          <Box 
            class="user-profile-name"
          >
            {profileName}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default UserProfileCircles;
