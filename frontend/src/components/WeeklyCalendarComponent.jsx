import React, { useState } from 'react';
import { Grid, Button, Typography, Card, CardContent, TextField, Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

function WeeklyCalendarComponent({ day, layout }) {
  const [steps, setSteps] = useState([]);
  const [stepImages, setStepImages] = useState([]);
  const [stepNames, setStepNames] = useState([]);
  const [stepTimes, setStepTimes] = useState([]);

  const addStep = () => {
    const newStep = { id: `${day}-${Date.now()}` }; // Generate a unique ID for each step
    setSteps((prevSteps) => [...prevSteps, newStep]);
    setStepImages((prevImages) => [...prevImages, null]);
    setStepNames((prevNames) => [...prevNames, ""]);
    setStepTimes((prevTimes) => [...prevTimes, ""]);
  };

  const updateStepImage = (index, newImage) => {
    setStepImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = newImage;
      return updatedImages;
    });
  };

  const updateStepName = (index, newName) => {
    setStepNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames[index] = newName;
      return updatedNames;
    });
  };

  const updateStepTime = (index, newTime) => {
    setStepTimes((prevTimes) => {
      const updatedTimes = [...prevTimes];
      updatedTimes[index] = newTime;
      return updatedTimes;
    });
  };

  const removeStep = (index) => {
    setSteps((prevSteps) => prevSteps.filter((_, i) => i !== index));
    setStepImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setStepNames((prevNames) => prevNames.filter((_, i) => i !== index));
    setStepTimes((prevTimes) => prevTimes.filter((_, i) => i !== index));
  };

  const deleteStepImageChange = (index) => {
    setStepImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = '';
      return updatedImages;
    });
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateStepImage(index, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDivClick = (index) => {
    document.getElementById(`fileInput-${day}-${index}`).click();
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" align="center">
          {day}
        </Typography>
        <Button onClick={addStep}>+ Add Step</Button>
        <Grid container spacing={2} direction={layout === 'vertical' ? 'row' : 'column'}>
          {steps.map((step, index) => (
            <Grid item key={step.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent>
                  <Box sx={{ height: '50px', width: '100%', color: 'white', display: 'flex', fontFamily: 'Poppins', fontWeight: 'bold', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000CA4', borderRadius: '15px 15px 0 0', position: 'relative' }}>
                    Step {index + 1}
                    <CancelIcon sx={{ position: 'absolute', right: 8, top: 8 }} onClick={() => removeStep(index)} />
                  </Box>
                  <Grid container spacing={2} style={{ padding: '2%' }}>
                    <Grid item xs={12}>
                      <div
                        style={{
                          width: '100%',
                          height: '200px',
                          border: '2px dashed #ccc',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          cursor: 'pointer',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          color: '#666',
                          backgroundColor: 'white',
                          fontSize: '18px',
                          backgroundImage: stepImages[index] ? `url(${stepImages[index]})` : 'none'
                        }}
                        onClick={() => handleDivClick(index)}
                      >
                        {!stepImages[index] && 'Click to select an image for this step'}
                        <input
                          type="file"
                          id={`fileInput-${day}-${index}`}
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(event) => handleImageChange(index, event)}
                        />
                      </div>
                      {stepImages[index] && (
                        <Button onClick={() => deleteStepImageChange(index)} style={{ marginTop: '10px' }}>Delete Image</Button>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Step Name"
                        value={stepNames[index]}
                        onChange={(e) => updateStepName(index, e.target.value)}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Step Time"
                        value={stepTimes[index]}
                        onChange={(e) => updateStepTime(index, e.target.value)}
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default WeeklyCalendarComponent;