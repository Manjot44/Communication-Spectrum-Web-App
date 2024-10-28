import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { useParams, Link } from "react-router-dom";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  Button,
  TextField,
  Avatar,
} from "@mui/material";
// import Grid from '@mui/material/Grid2';
import '../App.css';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import TaskAnalysesStep from '../components/TaskAnalysesStep';
import VisualSupportImage from '../components/VisualSupportImage';

function CreateTaskAnalysesScratch({ token, setTokenFunc }) {
  const { profileID } = useParams();
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [stepImages, setStepImages] = useState(Array(5).fill(null)); // Array to store images for each step

  // Function to update image for a specific step
  const handleStepImageChange = (index, newImage) => {
    setStepImages((prev) => {
      const updatedImages = [...prev];
      updatedImages[index] = newImage;
      return updatedImages;
    });
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
      <Typography variant="h4" align="center" gutterBottom>
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
            {text || <span style={{ color: 'grey' }}>Insert Task Name Here</span>}
          </b>
        )}
      </Typography>
      <br />
      <div class='page-wrapper-style' style={{ padding: '0 50px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2.5}>
            <Card class='task-analyses-create-options' style={{ height: '80vh' }}>
              <CardContent>
                <Typography variant="h5" component="div" style={{ fontFamily: 'Poppins' }}>
                  <b>Visual Support Options</b>
                </Typography>
                <br />
                <TextField
                    label="Search Assets/Shapes"
                    variant="filled"
                    fullWidth
                    style={{
                      marginBottom: "20px",
                      backgroundColor: "white",
                    }}
                />
                <br/>

                <VisualSupportImage image={image} setImage={setImage} uniqueID={-1}/>
                {/* <VisualSupportImage /> */}
                <br />
                <Button 
                  variant="contained"
                  style={{ width: '100%', height: '10vh', backgroundColor: '#6b4bef', fontFamily: 'Poppins' }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={4}>
                      <PhotoCameraBackIcon style={{ height: '7vh', width: '7vh' }}/>
                    </Grid>
                    <Grid item xs={12} md={8} class="d-flex align-items-center justify-content-center">
                      <h5>Pick From Gallery</h5>
                    </Grid>
                  </Grid>
                </Button>
                <br />
                <br />
                <Button 
                  variant="contained"
                  style={{ width: '100%', height: '10vh', backgroundColor: '#6b4bef', fontFamily: 'Poppins' }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={4}>
                      <FormatColorTextIcon style={{ height: '7vh', width: '7vh' }}/>
                    </Grid>
                    <Grid item xs={12} md={8} class="d-flex align-items-center justify-content-center">
                      <h5>Insert Text</h5>
                    </Grid>
                  </Grid>
                </Button>
                <br/>
                <br/>
                <Button 
                  variant="contained"
                  style={{ width: '100%', backgroundColor: '#26c3ba', fontFamily: 'Poppins' }}
                >
                  Create Visual Support
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={9.5}>
            <Card class='task-analyses-create-options' style={{ backgroundColor: '#f0f0f0', height: '80vh' }}>
              <CardContent>
                <Typography variant="h5" component="div" style={{ fontFamily: 'Poppins' }}>
                  <h4 style={{ fontFamily: 'Poppins', color: 'black' }}>
                    <b>Task Steps</b>
                  </h4>
                  <div style={{ height: '70vh', color: 'black', backgroundColor: 'transparent', overflowY: 'scroll', display: 'flex', flexWrap: 'wrap' }}>
                    {[...Array(7)].map((_, index) => (
                      <TaskAnalysesStep
                        key={index}
                        image={stepImages[index]}
                        setImage={(newImage) => handleStepImageChange(index, newImage)}
                        index={index}
                      />
                    ))}
                  </div>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default CreateTaskAnalysesScratch;
