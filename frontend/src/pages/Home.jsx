import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import Navbar from "../components/Navbar";
import EditProfilePictureModal from "../components/EditProfilePictureModal";
import EnterUserDetails from "../pages/EnterUserDetails";
import VisualSupportTypes from "../components/VisualSupportTypes.jsx";
import SupportSnapshot from "../components/SupportSnapshot.jsx";
import RecentSupportsBox from "../components/RecentSupportsBox.jsx";
import "../App.css";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import NotificationPopup from "../components/NotificationPopup.jsx";

// Styles

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

function Home({ token }) {
  const { profileID } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openEditDetailsModal, setOpenEditDetailsModal] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [supportData, setSupportData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [blobUrl, setBlobUrl] = useState(null); // State to store the Blob URL

  // Cleanup Blob URL on update or component unmount
  useEffect(() => {
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl); // Clean up Blob URL
      }
    };
  }, [blobUrl])
  
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

  const handleProfilePictureUpload = (binaryData) => {
    setNewProfilePic(binaryData);
  };

  const handleUpload = async () => {
    try {
      await axios.put(
        `http://localhost:5005/admin/update_user_profilepicture/${profileID}`,
        newProfilePic, // Send binary data directly
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/octet-stream',
          },
        }
      );

      // Revoke the previous Blob URL if it exists
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }

      // Create a new Blob URL and update the profile picture with it
      const newBlobUrl = URL.createObjectURL(new Blob([newProfilePic]));
      setBlobUrl(newBlobUrl);

      setProfileData((prevData) => ({
        ...prevData,
        profile_pic: newBlobUrl,
      }));
      setNotificationMessage("Profile picture updated successfully!");
      setShowNotification(true);
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("Failed to update profile picture.");
    } finally {
      setOpenEditModal(false);
    }
  };

  // New function to handle saving profile changes
  const handleSaveProfile = async (updatedData) => {
    try {
      await axios.put(
        `http://localhost:5005/update_user_profile/${profileID}`,
        updatedData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setProfileData((prevData) => ({
        ...prevData,
        ...updatedData,
      }));
      setNotificationMessage("Profile updated successfully!");
      setShowNotification(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (!profileData) return <LoadingSpinner />;

  return (
    <>
      <Navbar profileID={profileID} />
      {showNotification && (
        <NotificationPopup
          message={notificationMessage}
          duration={5000}
          onClose={() => setShowNotification(false)}
        />
      )}
      <div className="page-wrapper-style">
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
              handleSaveProfile={handleSaveProfile} // Pass handleSaveProfile to SupportSnapshot
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <RecentSupportsBox
              profileData={profileData}
              supportData={supportData}
              token={token}
              setSupportData={setSupportData}
              title={`${profileData.name}'s Recent Supports`}
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
