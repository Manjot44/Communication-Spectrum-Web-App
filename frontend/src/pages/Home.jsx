import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
import Navbar from "../components/Navbar";
import EditProfilePictureModal from "../components/EditProfilePictureModal";
import "../App.css";

// Styles
const avatarStyle = {
  width: "100px",
  height: "100px",
  margin: "0 auto",
  cursor: "pointer", // shows cursor hand for clickable objects
};

function Home({ token, setTokenFunc }) {
  const { profileID } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/get_client/${profileID}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setProfileData(response.data.client);
      } catch (err) {
        alert(err.response.data.error);
      }
    };

    fetchClient();
  }, [profileID, token]);

  const handleProfilePictureClick = () => {
    setOpenEditModal(true);
  };

  const handleProfilePictureUpload = (base64Image) => {
    setNewProfilePic(base64Image);
  };

  const handleUpload = async () => {
    try {
      await axios.put(
        `http://localhost:5005/admin/update_user_profilepicture/${profileID}`,
        {
          profilePicture: newProfilePic,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setProfileData((prevData) => ({
        ...prevData,
        profile_pic: newProfilePic,
      }));
      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("Failed to update profile picture.");
    } finally {
      setOpenEditModal(false);
    }
  };

  if (!profileData) return <div>Loading...</div>;

  return (
    <>
      <div style={{ paddingBottom: "20px" }}>
        <Navbar profileID={profileID} />
      </div>

      <div class="page-wrapper-style">
        <Typography variant="h3" align="center" gutterBottom>
          Client Portal
        </Typography>

        {/* 7 types of supports */}
        <Grid container spacing={2} justifyContent="space-around">
          <Grid item>
            <Button variant="contained" class="circular-icon-style">
              <Task fontSize="large" />
            </Button>
            <Typography align="center">Task Analyses</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class="circular-icon-style">
              <CalendarViewDay fontSize="large" />
            </Button>
            <Typography align="center">Daily Schedules</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class="circular-icon-style">
              <CalendarViewWeek fontSize="large" />
            </Button>
            <Typography align="center">Weekly Calendars</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class="circular-icon-style">
              <Group fontSize="large" />
            </Button>
            <Typography align="center">Social Stories</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class="circular-icon-style">
              <Warning fontSize="large" />
            </Button>
            <Typography align="center">Environmental Supports</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class="circular-icon-style">
              <CheckBox fontSize="large" />
            </Button>
            <Typography align="center">Choice Boards</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class="circular-icon-style">
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
          {/* Support Snapshot Section */}
          <Grid item xs={12} md={3}>
            <Card class="snapshot-style">
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <Avatar
                  alt={profileData.name}
                  src={profileData.profile_pic}
                  style={avatarStyle}
                  onClick={handleProfilePictureClick} // Opens the modal
                />
                <Typography variant="h6" style={{ marginTop: "10px" }}>
                  {profileData.name}
                </Typography>
              </div>
              <Typography variant="h6">Support Snapshot</Typography>
              <Typography variant="body1">{profileData.snapshot}</Typography>
              <Typography variant="h6" style={{ marginTop: "25px" }}>
                Interests
              </Typography>
              <Typography variant="body1">{profileData.interests}</Typography>
              <Typography variant="h6" style={{ marginTop: "25px" }}>
                Key Environments
              </Typography>
              <Typography variant="body1">{profileData.comm_env}</Typography>
            </Card>
          </Grid>

          {/* Recent Supports Section */}
          <Grid item xs={12} md={9}>
            <Card class="recent-supports-style">
              <Typography variant="h6">
                {profileData.name}'s Recent Supports
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Card class="support-card-style" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card class="support-card-style" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card class="support-card-style" />
                </Grid>
              </Grid>
            </Card>

            {/* Search Recent Supports Section */}
            <Card class="search-recent-supports-style">
              <Typography variant="h6">Search recent supports</Typography>
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                style={{ marginBottom: "20px" }}
              />
            </Card>
          </Grid>
        </Grid>
      </div>

      {/* Edit Profile Picture Modal */}
      <EditProfilePictureModal
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
        profileID={profileID}
        token={token}
        handleProfilePictureUpload={handleProfilePictureUpload}
        handleUpload={handleUpload}
        setProfileData={setProfileData}
      />
    </>
  );
}

export default Home;
