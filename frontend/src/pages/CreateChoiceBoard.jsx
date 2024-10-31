import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { useParams, Link } from "react-router-dom";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  Button,
} from "@mui/material";
import '../App.css';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import ChoiceBoardStep from '../components/ChoiceBoardStep';
import VisualSupportImage from '../components/VisualSupportImage';
import CategorySelectCheckboxes from '../components/CategorySelectCheckboxes';
import dayjs from 'dayjs';
import ChoiceBoardStepHorizontal from '../components/ChoiceBoardStepHorizontal';
import DropdownComponent from '../components/DropdownComponent';

function CreateChoiceBoard({ token, setTokenFunc }) {
  const { profileID } = useParams();
  const [text, setText] = useState(""); // Name of the Visual Support
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [value, setValue] = React.useState(dayjs('2022-04-17')); // Date of the Visual Support
  const [steps, setSteps] = useState([]); // Array to track steps with unique IDs
  const [stepImages, setStepImages] = useState([]); // Array to store images for each step
  const [isHorizontal, setIsHorizontal] = useState(false); // New state to toggle component type
  const [stepNames, setStepNames] = useState([]) // Array to keep track of the step names
  const [stepTimes, setStepTimes] = useState([]) // Array to keep track of the step times
  const [category, setCategory] = useState('') // Variable storing category type

  const toggleComponentType = () => {
    setIsHorizontal(prev => !prev); // Toggle between true and false
  };

  const addStep = () => {
    const newStep = { id: Date.now() }; // Generate a unique ID for each step
    setSteps([...steps, newStep]);
    setStepImages([...stepImages, null]); // Initialize a placeholder for the new step's image
    setStepNames([...stepNames, null]); // Initialize a placeholder for the new step's name
    setStepTimes([...stepTimes, null]) // Initialize a placeholder for the new step's time
  };

  const removeStep = (index, id) => {
    setSteps(steps.filter(step => step.id !== id)); // Remove the step with the given ID
    setStepImages(stepImages.filter((_, imgIndex) => imgIndex !== index)); // Remove image at the specified index
    setStepNames(stepNames.filter((_, imgIndex) => imgIndex !== index)); // Remove the step name at specified index
    setStepTimes(stepTimes.filter((_, imgIndex) => imgIndex !== index))
  };

  const updateStepImage = (index, newImage) => {
    const updatedImages = [...stepImages];
    updatedImages[index] = newImage;
    setStepImages(updatedImages);
  };

  const updateStepName = (index, newName) => {
    const updatedNames = [...stepNames];
    updatedNames[index] = newName;
    setStepNames(updatedNames);
  }

  const updateStepTime = (index, newTime) => {
    const updatedTimes = [...stepTimes];
    updatedTimes[index] = newTime;
    setStepTimes(updatedTimes);
  }

  const deleteStepImageChange = (index) => {
    const updatedImages = [...stepImages];
    updatedImages[index] = '';
    setStepImages(updatedImages);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Poppins"
        rel="stylesheet"
      ></link>
      <Navbar profileID={profileID}/>
      <br />
      <div class='page-wrapper-style' style={{ padding: '0 1%' }}>
        <Grid container spacing={3}>
         
          <Grid item xs={12} md={12}>
            <Card class='task-analyses-create-options' style={{ backgroundColor: '#f0f0f0', height: '87vh' }}>
              <CardContent>
                <Typography variant="h5" component="div" style={{ fontFamily: 'Poppins' }}>
                  <Typography variant="h6" gutterBottom style={{ margin: '10px', fontFamily: 'Poppins', color: 'black', display: 'flex', justifyContent: 'space-between' }}>
                    {isEditing ? (
                      <input
                        type="text"
                        value={text}
                        onChange={handleTextChange}
                        onBlur={toggleEditing} // Stop editing when input loses focus
                        autoFocus
                      />
                    ) : (
                      <b onClick={toggleEditing} style={{ cursor: 'pointer' }}>
                        {text || <span style={{ color: 'grey', fontFamily: 'Poppins' }}>Insert Choice Board Name Here</span>}
                      </b>
                    )}
                    
                    <Button onClick={toggleComponentType}>
                      Toggle Visual Style
                    </Button>
                    <Button onClick={addStep}>
                      + Add Step
                    </Button>
                  </Typography>
                  <Grid container spacing={2} style={{ padding: '2%' }}>
                    {/* <Grid item xs={12} md={6}>
                      <VisualSupportImage image={image} setImage={setImage} uniqueID={-1} imgHeight={"55vh"} deleteImage={() => setImage(null)}/>
                    </Grid> */}
                    <Grid item xs={12} md={12} style={{ display: 'flex', flexWrap: 'wrap', overflowY: 'scroll', height: '75vh' }}>
                      {steps.map((step, index) => (
                        isHorizontal ? (
                          <ChoiceBoardStepHorizontal
                            key={step.id}
                            index={index}
                            image={stepImages[index]}
                            removeStep={() => removeStep(index, step.id)}
                            setImage={(newImage) => updateStepImage(index, newImage)}
                            deleteImage={() => deleteStepImageChange(index)}
                            setName={(newName) => updateStepName(index, newName)}
                            stepName={stepNames[index]}
                            setTime={(newTime) => updateStepTime(index, newTime)}
                            stepTime={stepTimes[index]}
                          />
                        ) : (
                          <ChoiceBoardStep
                            key={step.id}
                            index={index}
                            image={stepImages[index]}
                            removeStep={() => removeStep(index, step.id)}
                            setImage={(newImage) => updateStepImage(index, newImage)}
                            deleteImage={() => deleteStepImageChange(index)}
                            setName={(newName) => updateStepName(index, newName)}
                            stepName={stepNames[index]}
                            setTime={(newTime) => updateStepTime(index, newTime)}
                            stepTime={stepTimes[index]}
                          />
                        )
                      ))}
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default CreateChoiceBoard;
