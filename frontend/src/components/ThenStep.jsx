import React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";
import VisualSupportImage from './VisualSupportImage';

function ThenStep({ image, setImage }) {
  return (
    <>
      <Grid container direction="column" spacing={0} style={{ margin: '15px', width: '45%' }}>
        <Grid item xs={12}>
          <Box sx={{
            height: '60px', 
            color: 'white', 
            display: 'flex', 
            fontFamily: 'Poppins', 
            fontWeight: 'bold', 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: '#000CA4', 
            borderRadius: '15px 15px 0 0',
          }}>
            Then - 2
          </Box>
        </Grid>
        <Grid item xs={12} style={{ backgroundColor: 'white', height: '500px', padding: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <VisualSupportImage image={image} setImage={setImage} uniqueID={1} imgHeight="100%" imgWidth="100%" />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{
            color: 'black', 
            fontFamily: 'Poppins', 
            fontWeight: 'bold', 
            backgroundColor: 'white', 
            padding: '10px 15px', 
            borderRadius: '0 0 15px 15px'
          }}>
            <TextField
              label="Step Name"
              variant="outlined"
              fullWidth
              style={{
                marginBottom: "20px",
                backgroundColor: "white",
              }}
            />
            <TextField
              label="Timer"
              variant="outlined"
              fullWidth
              style={{
                marginBottom: "20px",
                backgroundColor: "white",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ThenStep;
