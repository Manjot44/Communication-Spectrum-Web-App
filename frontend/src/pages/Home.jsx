import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Avatar,
  Modal,
  Box,
  Card,
} from "@mui/material";
import Navbar from "../components/Navbar";
import EditProfilePictureModal from "../components/EditProfilePictureModal";
import EnterUserDetails from "../pages/EnterUserDetails";
import VisualSupportTypes from "../components/VisualSupportTypes.jsx";
import SupportSnapshot from "../components/SupportSnapshot.jsx";
import RecentSupports from "../components/RecentSupports.jsx";
import RecentSupportsBox from "../components/RecentSupportsBox.jsx";
import "../App.css";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import NotificationPopup from "../components/NotificationPopup.jsx";

// Styles
const avatarStyle = {
  width: "100px",
  height: "100px",
  margin: "0 auto",
  cursor: "pointer", // shows cursor hand for clickable objects
};

// Adjust modal style for improved sizing
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "1600px",
  height: "auto",
  maxHeight: "80vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};

function Home({ token, setTokenFunc }) {
  const { profileID } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openEditDetailsModal, setOpenEditDetailsModal] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [supportData, setSupportData] = useState(null);
  const [showNotification, setShowNotification] = useState(false); // State to show/hide the notification
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const profileResponse = await axios.get(
          `http://localhost:5005/get_client/${profileID}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setProfileData(profileResponse.data.client);

        const supportResponse = await axios.get(
          `http://localhost:5005/get_client_support/${profileID}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setSupportData(supportResponse.data.client);
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
      // alert("Profile picture updated successfully!");
      setNotificationMessage("Profile picture updated successfully!");
      setShowNotification(true);
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("Failed to update profile picture.");
    } finally {
      setOpenEditModal(false);
    }
  };

  const handleEditDetailsClick = () => {
    setOpenEditDetailsModal(true);
  };

  if (!profileData) return <LoadingSpinner></LoadingSpinner>;

  return (
    <>
      <Navbar profileID={profileID} />
      {showNotification && (
        <NotificationPopup
          message={notificationMessage}
          duration={5000}
          onClose={() => notify("")}
        />
      )}
      <div class="page-wrapper-style">
        <br />
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          style={{ fontFamily: "Poppins", color: "#000CA4" }}
        >
          <b>Client Portal</b>
        </Typography>
        <VisualSupportTypes profileID={profileID} />
        <Grid
          container
          spacing={2}
          style={{ marginTop: "10px" }}
          justifyContent="center"
        >
          <Grid item xs={12} md={3}>
            <SupportSnapshot
              profileData={profileData}
              openEditModal={openEditModal}
              setOpenEditModal={setOpenEditModal}
              handleProfilePictureClick={handleProfilePictureClick}
              handleProfilePictureUpload={handleProfilePictureUpload}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <RecentSupportsBox
              profileData={profileData}
              supportData={supportData}
            />
          </Grid>
        </Grid>
        <br />
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

      {/* Edit Details Modal */}
      <Modal
        open={openEditDetailsModal}
        onClose={() => setOpenEditDetailsModal(false)}
      >
        <Box sx={modalStyle}>
          <EnterUserDetails
            token={token}
            profileData={profileData}
            isEditMode={true}
          />
        </Box>
      </Modal>
    </>
  );
}

export default Home;
