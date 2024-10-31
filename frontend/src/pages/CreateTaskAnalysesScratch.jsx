import React, { useState } from 'react';
import { Grid, Button, Typography, MenuItem, Select, FormControl, InputLabel, Box, Card, CardContent } from '@mui/material';
import Navbar from '../components/Navbar';
import TaskAnalysesStep from '../components/TaskAnalysesStep';
import TaskAnalysesStepHorizontal from '../components/TaskAnalysesStepHorizontal';

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function WeeklyCalendars({ token, setTokenFunc }) {
  const [layout, setLayout] = useState('vertical'); // Default to vertical layout
  const [steps, setSteps] = useState({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  });
  const [stepImages, setStepImages] = useState({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  });
  const [stepNames, setStepNames] = useState({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  });
  const [stepTimes, setStepTimes] = useState({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  });

  const handleLayoutChange = (event) => {
    setLayout(event.target.value);
  };

  const addStep = (day) => {
    const newStep = { id: `${day}-${Date.now()}` }; // Generate a unique ID for each step
    setSteps((prevSteps) => ({
      ...prevSteps,
      [day]: [...prevSteps[day], newStep],
    }));
    setStepImages((prevImages) => ({
      ...prevImages,
      [day]: [...prevImages[day], null],
    }));
    setStepNames((prevNames) => ({
      ...prevNames,
      [day]: [...prevNames[day], ""],
    }));
    setStepTimes((prevTimes) => ({
      ...prevTimes,
      [day]: [...prevTimes[day], ""],
    }));
  };

  const updateStepImage = (day, index, newImage) => {
    setStepImages((prevImages) => {
      const updatedImages = [...prevImages[day]];
      updatedImages[index] = newImage;
      return {
        ...prevImages,
        [day]: updatedImages,
      };
    });
  };

  const updateStepName = (day, index, newName) => {
    setStepNames((prevNames) => {
      const updatedNames = [...prevNames[day]];
      updatedNames[index] = newName;
      return {
        ...prevNames,
        [day]: updatedNames,
      };
    });
  };

  const updateStepTime = (day, index, newTime) => {
    setStepTimes((prevTimes) => {
      const updatedTimes = [...prevTimes[day]];
      updatedTimes[index] = newTime;
      return {
        ...prevTimes,
        [day]: updatedTimes,
      };
    });
  };

  const removeStep = (day, index, id) => {
    setSteps((prevSteps) => ({
      ...prevSteps,
      [day]: prevSteps[day].filter(step => step.id !== id),
    }));
    setStepImages((prevImages) => ({
      ...prevImages,
      [day]: prevImages[day].filter((_, imgIndex) => imgIndex !== index),
    }));
    setStepNames((prevNames) => ({
      ...prevNames,
      [day]: prevNames[day].filter((_, nameIndex) => nameIndex !== index),
    }));
    setStepTimes((prevTimes) => ({
      ...prevTimes,
      [day]: prevTimes[day].filter((_, timeIndex) => timeIndex !== index),
    }));
  };

  const deleteStepImageChange = (day, index) => {
    setStepImages((prevImages) => {
      const updatedImages = [...prevImages[day]];
      updatedImages[index] = '';
      return {
        ...prevImages,
        [day]: updatedImages,
      };
    });
  };

  return (
    <>
      <Navbar />
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h3" align="center" gutterBottom>
          Weekly Calendars
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel id="layout-select-label">Layout</InputLabel>
            <Select
              labelId="layout-select-label"
              value={layout}
              onChange={handleLayoutChange}
              label="Layout"
            >
              <MenuItem value="vertical">Vertical</MenuItem>
              <MenuItem value="horizontal">Horizontal</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={2} justifyContent="space-evenly">
          {daysOfWeek.map((day) => (
            <Grid item key={day} xs={12} sm={layout === 'vertical' ? 12 : 1}>
              <Card>
                <CardContent>
                  <Typography variant="h6" align="center">
                    {day}
                  </Typography>
                  <Button onClick={() => addStep(day)}>+ Add Step</Button>
                  <Grid container spacing={2} direction={layout === 'vertical' ? 'row' : 'column'} style={layout === 'horizontal' ? { overflowX: 'auto', whiteSpace: 'nowrap' } : {}}>
                    {steps[day].map((step, index) => (
                      layout === 'horizontal' ? (
                        <Box key={step.id} display="inline-block" style={{ width: '300px', marginRight: '16px' }}>
                          <TaskAnalysesStepHorizontal
                            index={index}
                            image={stepImages[day][index]}
                            removeStep={() => removeStep(day, index, step.id)}
                            setImage={(newImage) => updateStepImage(day, index, newImage)}
                            deleteImage={() => deleteStepImageChange(day, index)}
                            setName={(newName) => updateStepName(day, index, newName)}
                            stepName={stepNames[day][index]}
                            setTime={(newTime) => updateStepTime(day, index, newTime)}
                            stepTime={stepTimes[day][index]}
                          />
                        </Box>
                      ) : (
                        <Grid item key={step.id} xs={12} sm={6} md={4} lg={3}>
                          <TaskAnalysesStep
                            key={step.id}
                            index={index}
                            image={stepImages[day][index]}
                            removeStep={() => removeStep(day, index, step.id)}
                            setImage={(newImage) => updateStepImage(day, index, newImage)}
                            deleteImage={() => deleteStepImageChange(day, index)}
                            setName={(newName) => updateStepName(day, index, newName)}
                            stepName={stepNames[day][index]}
                            setTime={(newTime) => updateStepTime(day, index, newTime)}
                            stepTime={stepTimes[day][index]}
                          />
                        </Grid>
                      )
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default WeeklyCalendars;