import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import {
  TextField,
} from "@mui/material";
import VisualSupportImage from './VisualSupportImage';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';

function ChoiceBoardStepHorizontal ({ image, setImage, index, deleteImage, removeStep, setName, stepName }) {
  return (
    <>
      <Grid container direction="column" spacing={0} style={{ margin: '5px' }}>
        <Grid item xs={12} style={{ color: 'white', backgroundColor: '#000CA4', display: 'flex', fontWeight: 'bold', height: '50px', width: '550px', justifyContent: 'center', alignItems: 'center', position: 'relative', borderRadius: '15px 15px 0 0' }}>
          {index}
          <IconButton
              aria-label="delete"
              onClick={removeStep}
              sx={{ position: 'absolute', right: 8, color: 'white' }}
              className="remove-step"
            >
              <CancelIcon/>
            </IconButton>
        </Grid>
        <Grid item xs={12}>
          {/* Inside Grid */}
          <Grid container spacing={0}>
            <Grid item xs={12} md={9} style={{ backgroundColor: 'white' }}>
              <Box sx={{ height: '230px', width: '350px' }} style={{ padding: '0 15px', alignItems: "center", justifyContent: "center", borderRadius: '0 0 0 15px', borderBottom: '1px solid #000CA4', borderLeft: '1px solid #000CA4' }}>
                  <br/>
                  <TextField
                    label="Choice Name"
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
              </Box>
            </Grid>
            <Grid item xs={12} md={3} style={{ backgroundColor: 'white' }}>
              <Box sx={{ height: '230px', width: '200px' }} style={{ padding: '0 5px', borderRadius: '0 0 15px 0', borderBottom: '1px solid #000CA4', borderRight: '1px solid #000CA4' }}>
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
