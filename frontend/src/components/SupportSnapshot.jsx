import React, { useState } from "react";
import {
  TextField,
  Avatar,
  Button,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import EditProfilePictureModal from "../components/EditProfilePictureModal";
import { SnapShotStyleCard, DarkBlueButton } from "../Wrappers";
import "../App.css";

const ButtonsBox = styled('div')({
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  marginTop: "10px",
});

const avatarContainerStyle = {
  position: "relative",
  width: "100px",
  height: "100px",
  margin: "0 auto",
  cursor: "pointer",
};

const avatarStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  border: "0.2px solid lightgray",
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  opacity: 0,
  transition: "opacity 0.3s ease",
};

const SupportSnapshot = ({
  profileData,
  openEditModal,
  setOpenEditModal,
  handleProfilePictureClick,
  handleProfilePictureUpload,
  handleSaveProfile,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profileData.name || "");
  const [snapshot, setSnapshot] = useState(profileData.snapshot || "");
  const [interests, setInterests] = useState(profileData.interests || "");
  const [commEnv, setCommEnv] = useState(profileData.comm_env || "");

  // Initial Values before editing are saved in case user cancels edits
  const [initialValues, setInitialValues] = useState({
    name: profileData.name || "",
    snapshot: profileData.snapshot || "",
    interests: profileData.interests || "",
    commEnv: profileData.comm_env || "",
  });

  // Function that toggles whether the user profile
  // Snapshot is in edit mode or not
  const toggleEditing = () => {
    if (isEditing) {
      handleSaveProfile({ name, snapshot, interests, comm_env: commEnv });
    } else {
      setInitialValues({ name, snapshot, interests, commEnv });
    }
    setIsEditing(!isEditing);
  };

  // The values of the user profiles details dont change
  // if the cancel button is clicked, set to initial values
  const handleCancel = () => {
    setName(initialValues.name);
    setSnapshot(initialValues.snapshot);
    setInterests(initialValues.interests);
    setCommEnv(initialValues.commEnv);
    setIsEditing(false);
  };

  return (
    <>
      <SnapShotStyleCard>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          {/* User profile picture, darken when hovering mouse over image */}
          <Box sx={avatarContainerStyle} onClick={handleProfilePictureClick}>
            <Avatar alt={name} src={profileData.profile_pic} sx={avatarStyle} />
            <Box
              sx={{
                ...overlayStyle,
                "&:hover": { opacity: 1 },
              }}
            >
              <EditIcon />
            </Box>
          </Box>
          
          {/* User Profile Details, changes if its in edit mode or not */}
          {isEditing ? (
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="Name"
              label="Name"
              style={{ marginTop: "10px" }}
            />
          ) : (
            <h5 style={{ marginTop: "10px" }}>
              <b>{name}</b>
            </h5>
          )}
        </div>

        <h5>
          <b>Support Snapshot</b>
        </h5>
        {isEditing ? (
          <TextField
            value={snapshot}
            onChange={(e) => setSnapshot(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder="Support Snapshot"
            multiline
            rows={3}
          />
        ) : (
          <h6>{snapshot}</h6>
        )}

        <h5>
          <b>Interests</b>
        </h5>
        {isEditing ? (
          <TextField
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder="Interests"
            multiline
            rows={3}
          />
        ) : (
          <h6>{interests}</h6>
        )}

        <h5>
          <b>Key Environments</b>
        </h5>
        {isEditing ? (
          <TextField
            value={commEnv}
            onChange={(e) => setCommEnv(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder="Key Environments"
            multiline
            rows={3}
          />
        ) : (
          <h6>{commEnv}</h6>
        )}

        {/* Buttons at the bottom of the snapshot */}
        <ButtonsBox>
          {isEditing ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={toggleEditing}
                style={{ fontFamily: "Poppins" }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleCancel}
                style={{ fontFamily: "Poppins" }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <DarkBlueButton 
              variant="contained"  
              onClick={toggleEditing}
              sx={{ width: '100%' }}
            >
              Edit Profile
            </DarkBlueButton>
          )}
        </ButtonsBox>
        <br />
      </SnapShotStyleCard>

      {/* Modal that pops up when you click on the  */}
      <EditProfilePictureModal
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
        profileID={profileData.profileID}
        handleProfilePictureUpload={handleProfilePictureUpload}
      />
    </>
  );
};

export default SupportSnapshot;
