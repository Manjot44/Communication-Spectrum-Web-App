// SupportSnapshot.jsx

import React from "react";
import { Grid, Card, Typography, TextField, Avatar } from "@mui/material";
import EditProfilePictureModal from "../components/EditProfilePictureModal";

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
      <Grid item xs={12} md={3}>
        <Card className="snapshot-style" style={{ height: "700px" }}>
          {/* Add avatar and name */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Avatar
              alt={profileData.name}
              src={profileData.profile_pic}
              style={avatarStyle}
              onClick={handleProfilePictureClick} // Open modal on click
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
      </Grid>

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
