import React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { TextField, Typography } from "@mui/material";
import VisualSupportImage from './VisualSupportImage';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function ChoiceBoardStep ({ 
  image,
  setImage,
  index,
  deleteImage,
  removeStep,
  setName,
  stepName,
  label,
  showCancel,
  showTime,
  stepTime,
  setTime,
  fontColour,
  stepColour,
  totalSteps,      // Pass the total number of steps as a prop
  onMoveLeft,      // Handler for moving left
  onMoveRight,
  count
}) {
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
          <Box sx={{ height: '50px', width: '350px', color: `${fontColour}`, display: 'flex', fontFamily: 'Poppins', fontWeight: 'bold', justifyContent: 'center', alignItems: 'center', backgroundColor: `${stepColour}`, borderRadius: '15px 15px 0 0', position: 'relative', border: `1px solid ${stepColour}` }}>
            {count > 0 && (
              <IconButton onClick={() => onMoveLeft(count)} sx={{ position: 'absolute', left: 8, color: 'white' }}>
                <ArrowBackIcon className="remove-step"/>
              </IconButton>
            )}
            {count < totalSteps - 1 && (
              <IconButton onClick={() => onMoveRight(count)} sx={{ position: 'absolute', left: 32, color: 'white' }}>
                <ArrowForwardIcon className="remove-step"/>
              </IconButton>
            )}
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              style={{ fontFamily: "Poppins" }}
            >
              <b>{index}</b>
            </Typography>
            {showCancel && (
              <IconButton
                aria-label="delete"
                onClick={removeStep}
                sx={{ position: 'absolute', right: 8, color: 'white' }}
                className="remove-step"
              >
                <CancelIcon/>
              </IconButton>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} >
          <Box style={{ backgroundColor: 'white', width: '350px', height: '350px', padding: '15px', borderTop: `1px solid ${stepColour}`, borderLeft: `1px solid ${stepColour}`, borderRight: `1px solid ${stepColour}` }}>
            <VisualSupportImage uniqueID={index} imgHeight="95%" image={image} setImage={setImage} deleteImage={deleteImage}/>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ height: showTime ? '175px':'100px' , width: '350px', color: 'black', fontFamily: 'Poppins', fontWeight: 'bold', backgroundColor: 'white', padding: '0 15px', borderRadius: '0 0 15px 15px', borderBottom: `1px solid ${stepColour}`, borderLeft: `1px solid ${stepColour}`, borderRight: `1px solid ${stepColour}` }}>
            <TextField
              label={label}
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
            {showTime && (
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
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ChoiceBoardStep;
