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


function DailySchedules({ token, setTokenFunc }) {
  const { profileID } = useParams(); 
  const navigate = useNavigate();

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Poppins"
        rel="stylesheet"
      ></link>
      <Navbar profileID={profileID}/>
      <br />
      <Typography variant="h3" align="center" gutterBottom>
          Create New Daily Schedules
      </Typography>
      <br />
      <div>
        <Grid 
          container
          spacing={5} 
          justifyContent="space-evenly"
          style={{ height: '60vh' }}
        >
          <Grid item xs={12} sm={4}>
            <Card class='daily-schedules-type' style={{ height: '60vh' }} onClick={async () => {navigate(`/createDailySchedulesScratch/${profileID}`)}}>
              <CardContent>
                <Typography variant="h5" component="div" style={{ fontFamily: 'Poppins' }}>
                  <b>From Scratch</b>
                </Typography>
                <Typography variant="body2">
                  Create a visual support for different days of the week.
                </Typography>
                <br />
                <div class="d-flex justify-content-center">
                  <LibraryAddIcon style={{ height: '40vh', width: 'auto' }}/>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card class='daily-schedules-type' style={{ height: '60vh' }}>
              <CardContent>
                <Typography variant="h5" component="div" style={{ fontFamily: 'Poppins' }}>
                  <b>From Existing Template</b>
                </Typography>
                <Typography variant="body2">
                  Use existing templates to create your daily schedules.
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

export default DailySchedules;