import React, { useState } from "react";
import { Card, Typography, TextField, Avatar, Button } from "@mui/material";
import EditProfilePictureModal from "../components/EditProfilePictureModal";
import "../App.css";

const avatarStyle = {
  width: "100px",
  height: "100px",
  margin: "0 auto",
  cursor: "pointer",
  border: "0.2px solid lightgray",
};

function SupportSnapshot({
  profileData,
  openEditModal,
  setOpenEditModal,
  handleProfilePictureClick,
  handleProfilePictureUpload,
  handleSaveProfile,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profileData.name || "");
  const [snapshot, setSnapshot] = useState(profileData.snapshot || "");
  const [interests, setInterests] = useState(profileData.interests || "");
  const [commEnv, setCommEnv] = useState(profileData.comm_env || "");

  // Store initial values to reset changes on cancel
  const [initialValues, setInitialValues] = useState({
    name: profileData.name || "",
    snapshot: profileData.snapshot || "",
    interests: profileData.interests || "",
    commEnv: profileData.comm_env || "",
  });

  // Toggle editing mode and save changes
  const toggleEditing = () => {
    if (isEditing) {
      handleSaveProfile({ name, snapshot, interests, comm_env: commEnv });
    } else {
      // Store initial values when editing is first activated
      setInitialValues({ name, snapshot, interests, commEnv });
    }
    setIsEditing(!isEditing);
  };

  // Cancel changes and revert to initial values
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
        {/* Add avatar and name */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Avatar
            alt={name}
            src={profileData.profile_pic}
            style={avatarStyle}
            onClick={handleProfilePictureClick} // Open modal on click
          />
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
        {/* Toggle Edit Button */}
        <br />
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
