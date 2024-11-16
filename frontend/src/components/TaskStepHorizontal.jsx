import React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import {
  TextField,
} from "@mui/material";
import VisualSupportImage from './VisualSupportImage';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function ChoiceBoardStepHorizontal ({ 
  image,
  setImage,
  index,
  deleteImage,
  removeStep,
  setName,
  stepName,
  showCancel,
  showTime,
  stepTime,
  setTime,
  label,
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
        <Grid item xs={12} style={{ color: `${fontColour}`, backgroundColor: `${stepColour}`, display: 'flex', fontWeight: 'bold', height: '50px', width: '550px', justifyContent: 'center', alignItems: 'center', position: 'relative', borderRadius: '15px 15px 0 0' }}>
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
          {index}
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
        </Grid>
        <Grid item xs={12}>
          {/* Inside Grid */}
          <Grid container spacing={0}>
            <Grid item xs={12} md={9} style={{ backgroundColor: 'white' }}>
              <Box sx={{ height: '230px', width: '350px' }} style={{ padding: '0 15px', alignItems: "center", justifyContent: "center", borderRadius: '0 0 0 15px', borderBottom: `1px solid ${stepColour}`, borderLeft: `1px solid ${stepColour}` }}>
                  <br/>
                  <TextField
                    label={label}
                    variant="outlined"
                    fullWidth
                    style={{
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
            <Grid item xs={12} md={3} style={{ backgroundColor: 'white' }}>
              <Box sx={{ height: '230px', width: '200px' }} style={{ padding: '0 5px', borderRadius: '0 0 15px 0', borderBottom: `1px solid ${stepColour}`, borderRight: `1px solid ${stepColour}` }}>
                <br />
                <VisualSupportImage uniqueID={index} imgHeight="65%" image={image} setImage={setImage} deleteImage={deleteImage}/>
                <br />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ChoiceBoardStepHorizontal;
