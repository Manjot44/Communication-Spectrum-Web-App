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
  Card
} from "@mui/material";
import Navbar from "../components/Navbar";
import EditProfilePictureModal from "../components/EditProfilePictureModal";
import EnterUserDetails from "../pages/EnterUserDetails";
import VisualSupportTypes from "../components/VisualSupportTypes.jsx";
import SupportSnapshot from "../components/SupportSnapshot.jsx";
import RecentSupports from "../components/RecentSupports.jsx";
import "../App.css";

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
      alert("Profile picture updated successfully!");
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

  if (!profileData) return <div>Loading...</div>;

  return (
    <>
      <Navbar profileID={profileID} />
      <div class="page-wrapper-style">
        <br />
        <Typography variant="h3" align="center" gutterBottom style={{ fontFamily: "Poppins", color: "#000CA4" }}>
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
          <Grid
            item
            xs={12}
            md={9}
          >
            <Card className="snapshot-style" style={{ height: "700px", fontFamily: "Poppins", borderRadius: '15px', color: '#000CA4' }}>
              <Typography variant="h6" style={{ marginBottom: "10px", fontFamily: 'Poppins' }}>
                <b>{profileData.name}'s Recent Supports</b>
              </Typography>
              <div
                  style={{
                    overflowY: "scroll",
                    height: "600px"
                  }}
              >
                <Grid
                  container
                  spacing={2}
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                    {supportData &&
                    supportData.map((support) => (
                      <Grid item key={support.support_id} xs={12} sm={6} md={4}>
                        <RecentSupports profileData={support} />
                      </Grid>
                    ))}
                </Grid>
              </div>
            </Card>
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
