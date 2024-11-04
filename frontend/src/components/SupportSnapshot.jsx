// SupportSnapshot.jsx

import React from "react";
import { Grid, Card, Typography, TextField, Avatar } from "@mui/material";
import EditProfilePictureModal from "../components/EditProfilePictureModal";
import "../App.css"

const avatarStyle = {
  width: "100px",
  height: "100px",
  margin: "0 auto",
  cursor: "pointer",
};

function SupportSnapshot({
  profileData,
  openEditModal,
  setOpenEditModal,
  handleProfilePictureClick,
  handleProfilePictureUpload,
}) {
  return (
    <>
      <Card className="snapshot-style" style={{ height: "700px", fontFamily: "Poppins", borderRadius: '15px', color: '#000CA4' }}>
        {/* Add avatar and name */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Avatar
            alt={profileData.name}
            src={profileData.profile_pic}
            style={avatarStyle}
            onClick={handleProfilePictureClick} // Open modal on click
          />
          <h5 style={{ marginTop: "10px" }}>
            <b>{profileData.name}</b>
          </h5>
        </div>

        <h5><b>Support Snapshot</b></h5>
        <h6>{profileData.snapshot}</h6>

        <h5><b>Interests</b></h5>
        <h6>{profileData.interests}</h6>

        <h5><b>Key Environments</b></h5>
        <h6>{profileData.comm_env}</h6>

        <br />

        {/* Search Recent Supports */}
        <Card className="search-recent-supports-style">
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
      </Card>


      {/* Edit Profile Picture Modal */}
      <EditProfilePictureModal
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
        profileID={profileData.profileID}
        handleProfilePictureUpload={handleProfilePictureUpload}
      />
    </>
  );
}

export default SupportSnapshot;
