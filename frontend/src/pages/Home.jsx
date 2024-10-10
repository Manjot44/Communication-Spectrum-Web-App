import React from "react";
import {
  Grid,
  Card,
  Typography,
  Button,
  TextField,
  Avatar,
} from "@mui/material";
import {
  Task,
  CalendarViewDay,
  CalendarViewWeek,
  Group,
  Warning,
  Checklist,
  CheckBox,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();

  function goToUserManage() {
    navigate("/usermanage");
  }

  return (
    <>
      <div style={{ paddingBottom: "20px" }}>
        <Navbar />
      </div>

      {/* Wrapper for padding on sides */}
      <div style={pageWrapperStyle}>
        {/* Title */}
        <Typography variant="h3" align="center" gutterBottom>
          Client Portal
        </Typography>

        {/* 7 types of supports */}
        <Grid container spacing={2} justifyContent="space-around">
          <Grid item>
            <Button variant="contained" style={circularIconStyle}>
              <Task fontSize="large" />
            </Button>
            <Typography align="center">Task Analyses</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" style={circularIconStyle}>
              <CalendarViewDay fontSize="large" />
            </Button>
            <Typography align="center">Daily Schedules</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" style={circularIconStyle}>
              <CalendarViewWeek fontSize="large" />
            </Button>
            <Typography align="center">Weekly Calendars</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" style={circularIconStyle}>
              <Group fontSize="large" />
            </Button>
            <Typography align="center">Social Stories</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" style={circularIconStyle}>
              <Warning fontSize="large" />
            </Button>
            <Typography align="center">Environmental Supports</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" style={circularIconStyle}>
              <CheckBox fontSize="large" />
            </Button>
            <Typography align="center">Choice Boards</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" style={circularIconStyle}>
              <Checklist fontSize="large" />
            </Button>
            <Typography align="center">First-Then</Typography>
          </Grid>
        </Grid>

        {/* Support snapshot and Recent supports */}
        <Grid
          container
          spacing={2}
          style={{ marginTop: "20px" }}
          justifyContent="center"
        >
          <Grid item xs={12} md={3}>
            <Card style={snapshotStyle}>
              {/* Add avatar and name */}
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <Avatar
                  alt="Jamie"
                  src="../assets/jamie-jamieson.jpg"
                  style={avatarStyle}
                />
                <Typography variant="h6" style={{ marginTop: "10px" }}>
                  Jamie Jamieson
                </Typography>
              </div>

              <Typography variant="h6">Support Snapshot</Typography>
              <Typography variant="body1">
                Jamie uses verbal language and visual supports. He needs visual
                forewarnings for changes and non-preferred routines.
              </Typography>
              <Typography variant="h6" style={{ marginTop: "25px" }}>
                Notes
              </Typography>
              <Typography variant="body2">
                Various notes about Jamie. There are many notes about Jamie. So
                many, we decided not to put them all here. But thankfully we can
                see the size of text is smaller here, which allows us to write a
                bit more if we need to. Great design.
              </Typography>
            </Card>
          </Grid>

          {/* Recent supports and Search recent supports */}
          <Grid item xs={12} md={9}>
            {/* Jamie's Recent Supports */}
            <Card style={recentSupportsStyle}>
              <Typography variant="h6">Jamie's Recent Supports</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Card style={supportCardStyle} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card style={supportCardStyle} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card style={supportCardStyle} />
                </Grid>
              </Grid>
            </Card>

            {/* Search Recent Supports */}
            <Card style={searchRecentSupportsStyle}>
              <Typography variant="h6">Search recent supports</Typography>
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                style={{
                  marginBottom: "20px",
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

// Styles
const pageWrapperStyle = {
  padding: "0 120px", // padding of the page left and right space
};

const circularIconStyle = {
  backgroundColor: "#6C63FF",
  borderRadius: "50%",
  width: "80px",
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  margin: "0 auto",
};

const snapshotStyle = {
  padding: "20px",
  minHeight: "390px", // match the height of support
  backgroundColor: "#f0f0f0",
};

const recentSupportsStyle = {
  padding: "20px",
  marginBottom: "20px",
  backgroundColor: "#f9f9f9",
};

const supportCardStyle = {
  backgroundColor: "orange",
  height: "150px",
};

const searchRecentSupportsStyle = {
  padding: "20px",
  backgroundColor: "#f9f9f9",
};

const avatarStyle = {
  width: "100px",
  height: "100px",
  margin: "0 auto",
};

export default Home;
