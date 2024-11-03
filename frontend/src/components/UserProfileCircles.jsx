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
            // style={{ width: '200px', height: '200px', borderRadius: '50%', border:'1px solid black'}}
          />
        </Grid>
        <Grid item xs={12}>
          <Box 
            // sx={{ height: '40px', width: '200px', color: 'black', display: 'flex', fontFamily: 'Poppins', fontWeight: 'bold', justifyContent: 'center' }}
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
