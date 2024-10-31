import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import CreateOptionsModal from "../components/CreateOptionsModal";
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
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

function ChoiceBoards({ token, setTokenFunc }) {
  const { profileID } = useParams();
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [stepImages, setStepImages] = useState(Array(5).fill(null)); // Array to store images for each step
  const [createOptVis, setCreateOptVis] = useState(true); // Array to store images for each step

  // Toggle VS create option
  const toggleCreateOption = (boolView) => {
    setCreateOptVis(boolView);
  }

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
            {text || <span style={{ color: 'grey' }}>Insert Choice Board Name Here</span>}
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
                  onClick={() => toggleCreateOption(true)}
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
                    <b>Choices</b>
                    <div class='task-analyses-create-options' style={{ backgroundColor: '#000CA4' }}>
                    {createOptVis && (
                      <div class='choiceboard-create-opt'>
                        <CreateOptionsModal 
                          title={"Create from scratch"} 
                          open={true} 
                          handleClose={toggleCreateOption} 
                          pic={DriveFileRenameOutlineIcon}
                        >
                          Create your visual support from scratch
                        </CreateOptionsModal>
                        <CreateOptionsModal title={"Create from template"} open={true} handleClose={toggleCreateOption} pic={DriveFileRenameOutlineIcon}>
                          Add your own images and text with a structured template. 
                          {/* For quick and convenient visual supports on demand. */}
                        </CreateOptionsModal>
                        <CreateOptionsModal title={"Create from premade template"} open={true} handleClose={toggleCreateOption} pic={DriveFileRenameOutlineIcon}>
                          Use one of our pre-made templates to help create your visual support.
                        </CreateOptionsModal>
                      </div>
                    )}
                    </div>
                  </h4>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default ChoiceBoards;