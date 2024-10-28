import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import {
  Card,
  Typography,
  CardContent,
  Button,
  TextField,
  Avatar,
} from "@mui/material";
import VisualSupportImage from './VisualSupportImage';

function TaskAnalysesStep ({ image, setImage, index }) {
  // const [image, setImage] = useState(null);

  // // Handle Image Change in Visual Support Options box
  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleDivClick = () => {
  //   document.getElementById('fileInput').click();
  // };

  return (
    <>
      <Grid container direction="column" spacing={0} style={{ margin: '10px' }}>
        <Grid item xs={12}>
          <Box sx={{ height: '50px', width: '350px', color: 'white', display: 'flex', fontFamily: 'Poppins', fontWeight: 'bold', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000CA4', borderRadius: '15px 15px 0 0' }}>
            Step {index + 1}
          </Box>
        </Grid>
        <Grid item xs={12} style={{ backgroundColor: 'white', width: '350px', height: '350px', padding: '15px' }}>
          {/* <div style={{ border: '1px dotted black', height: '100%', width: '100%' }}>
            <img
              alt=""
              className="profile-picture"
            />
          </div> */}
          {/* <VisualSupportImage style={{ height: '100%', width: '100%' }}/> */}

          <VisualSupportImage image={image} setImage={setImage} uniqueID={index}/>
          {/* <VisualSupportImage /> */}

        </Grid>
        <Grid item xs={12}>
          <Box sx={{ height: '150px', width: '350px', color: 'black', fontFamily: 'Poppins', fontWeight: 'bold', backgroundColor: 'white', padding: '0 15px', borderRadius: '0 0 15px 15px' }}>
          <TextField
            label="Step Name"
            variant="outlined"
            fullWidth
            style={{
              marginBottom: "20px",
              backgroundColor: "white",
            }}
          />
          <br />
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

export default TaskAnalysesStep;
