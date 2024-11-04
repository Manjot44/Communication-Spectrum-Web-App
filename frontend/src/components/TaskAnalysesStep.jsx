import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";
import VisualSupportImage from './VisualSupportImage';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from "@mui/material/IconButton";
import "../App.css";

function TaskAnalysesStep ({ image, setImage, index, deleteImage, removeStep, setName, stepName, setTime, stepTime }) {
  const handleTimeChange = (e) => {
    let input = e.target.value;
    
    // Regular expression to validate time in HH:MM:SS format
    const validTimeFormat = /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    
    // Allow typing if the format is valid or partial (for user-friendly input)
    if (input === "" || validTimeFormat.test(input) || /^(\d{0,2}:?\d{0,2}:?\d{0,2})$/.test(input)) {
      setTime(input);
    }
  };

  return (
    <>
      <Grid container direction="column" spacing={0} style={{ margin: '5px' }}>
        <Grid item xs={12}>
          <Box sx={{ height: '50px', width: '350px', color: 'white', display: 'flex', fontFamily: 'Poppins', fontWeight: 'bold', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000CA4', borderRadius: '15px 15px 0 0', position: 'relative', border: '1px solid #000CA4' }}>
            Step {index + 1}
            <IconButton
              aria-label="delete"
              onClick={removeStep}
              sx={{ position: 'absolute', right: 8, color: 'white' }}
              className="remove-step"
            >
              <CancelIcon/>
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} >
          <Box style={{ backgroundColor: 'white', width: '350px', height: '350px', padding: '15px', borderTop: '1px solid #000CA4', borderLeft: '1px solid #000CA4', borderRight: '1px solid #000CA4' }}>
            <VisualSupportImage uniqueID={index} imgHeight="35vh" image={image} setImage={setImage} deleteImage={deleteImage}/>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ height: '175px', width: '350px', color: 'black', fontFamily: 'Poppins', fontWeight: 'bold', backgroundColor: 'white', padding: '0 15px', borderRadius: '0 0 15px 15px', borderBottom: '1px solid #000CA4', borderLeft: '1px solid #000CA4', borderRight: '1px solid #000CA4' }}>
            <TextField
              label="Step Name"
              variant="outlined"
              fullWidth
              style={{
                marginTop: "15px",
                marginBottom: "20px",
                backgroundColor: "white",
              }}
              defaultValue={stepName}
              onChange={(e) => setName(e.target.value)}
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
              value={stepTime}
              onChange={handleTimeChange}
              inputProps={{ inputMode: 'numeric', pattern: "[0-9]*" }}
              placeholder="00:00:00"
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default TaskAnalysesStep;
