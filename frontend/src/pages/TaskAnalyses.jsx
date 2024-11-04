import React from 'react';
import Navbar from "../components/Navbar";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  Button,
  TextField,
  Avatar,
} from "@mui/material";
import '../App.css'
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

function TaskAnalyses({ token, setTokenFunc }) {
  const { profileID } = useParams(); 
  const navigate = useNavigate();

  return (
    <>
      <Navbar profileID={profileID}/>
      <div class="page-wrapper-style">
        <br />
        <Typography variant="h3" align="center" gutterBottom style={{ fontFamily: "Poppins", color: "#000CA4" }}>
          <b>Create New Task Analyses</b>
        </Typography>
        <br />
        <Grid 
          container
          spacing={5} 
          justifyContent="space-evenly"
          style={{ height: '60vh' }}
        >
          <Grid item xs={12} sm={4}>
            <Card class='task-analyses-type' style={{ height: '60vh' }} onClick={async () => {navigate(`/createTaskAnalysesScratch/${profileID}`)}}>
              <CardContent>
                <Typography variant="h5" component="div" style={{ fontFamily: 'Poppins' }}>
                  <b>Create From Template</b>
                </Typography>
                <Typography variant="body2">
                  Create a visual support using your own images and text with a structured template.
                </Typography>
                <br />
                <div class="d-flex justify-content-center">
                  <LibraryAddIcon style={{ height: '40vh', width: 'auto' }}/>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card class='task-analyses-type' style={{ height: '60vh' }}>
              <CardContent>
                <Typography variant="h5" component="div" style={{ fontFamily: 'Poppins' }}>
                  <b>Create From Existing Template</b>
                </Typography>
                <Typography variant="body2">
                  Use one of our pre-made templates to help create your visual support.
                </Typography>
                <br />
                <div class="d-flex justify-content-center">
                  <ImageSearchIcon style={{ height: '40vh', width: 'auto' }}/>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default TaskAnalyses;
