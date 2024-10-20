import React from 'react';
import Grid from '@mui/material/Grid2';

function GalleryPhotoComponent ({ image }) {
  return (
    <>
      <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>
      <Grid container direction="column" spacing={0}>
        <Grid item xs={12}>
          <img
            src={image}
            alt=""
            className="profile-picture"
            style={{ width: '250px', height: '250px', border:'1px solid black'}}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <Box sx={{ height: '40px', width: '200px', color: 'black', display: 'flex', fontFamily: 'Poppins', fontWeight: 'bold', justifyContent: 'center' }}>
            {profileName}
          </Box>
        </Grid> */}
      </Grid>
    </>
  );
}

export default GalleryPhotoComponent;
