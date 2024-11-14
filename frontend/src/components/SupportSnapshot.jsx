import React, { useState } from "react";
import {
  Card,
  TextField,
  Avatar,
  Button,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditProfilePictureModal from "../components/EditProfilePictureModal";
import "../App.css";

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

  const [initialValues, setInitialValues] = useState({
    name: profileData.name || "",
    snapshot: profileData.snapshot || "",
    interests: profileData.interests || "",
    commEnv: profileData.comm_env || "",
  });

  const toggleEditing = () => {
    if (isEditing) {
      handleSaveProfile({ name, snapshot, interests, comm_env: commEnv });
    } else {
      setInitialValues({ name, snapshot, interests, commEnv });
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setName(initialValues.name);
    setSnapshot(initialValues.snapshot);
    setInterests(initialValues.interests);
    setCommEnv(initialValues.commEnv);
    setIsEditing(false);
  };

  return (
    <>
      <Card
        className="snapshot-style"
        style={{
          height: "700px",
          fontFamily: "Poppins",
          borderRadius: "15px",
          color: "#000CA4",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Box sx={avatarContainerStyle} onClick={handleProfilePictureClick}>
            <Avatar alt={name} src={profileData.profile_pic} sx={avatarStyle} />
            <Box
              sx={{
                ...overlayStyle,
                "&:hover": { opacity: 1 }, // Show overlay on hover
              }}
            >
              <EditIcon />
            </Box>
          </Box>

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

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
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
            <Button
              variant="contained"
              color="primary"
              onClick={toggleEditing}
              style={{
                backgroundColor: "#000CA4",
                width: "100%",
                borderRadius: "20px",
                fontFamily: "Poppins",
              }}
            >
              Edit Profile
            </Button>
          )}
        </div>
        <br />
      </Card>

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
