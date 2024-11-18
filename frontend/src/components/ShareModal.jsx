import React, { useState, useEffect } from "react";
import { Modal, Box, Typography } from "@mui/material";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import ProfileBox from "./ProfileBox";
import ProfessionalBox from "./ProfessionalBox.jsx";
import { ShareModalBox, PoppinsButton } from "../Wrappers.jsx";

function ShareModal({ open, onClose, onConfirm, message, description, token, profileType }) {
  const [profiles, setProfileData] = useState([]);
  const [selectedProfileIds, setSelectedProfileIds] = useState([]);

  useEffect(() => {
    // Fetch the profiles when the component mounts
    if (profileType === 'User') {
      axios
      .get("http://localhost:5005/get_clients", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setProfileData(response.data.clients);
      })
      .catch((error) => {
        console.error(
          "Error fetching profiles:",
          error.response ? error.response.data : error.message
        );
      });
    } else if (profileType === 'Pro') {
      console.log("Insert Profile type over here")
    }
  }, [token, profileType]);

  // Handle checkbox toggle
  const handleCheckboxToggle = (profileID) => {
    setSelectedProfileIds((prevSelectedIds) =>
      prevSelectedIds.includes(profileID)
        ? prevSelectedIds.filter((id) => id !== profileID) // Remove if already selected
        : [...prevSelectedIds, profileID] // Add if not selected
    );
    console.log(selectedProfileIds);
  };

  // Select all profiles
  const handleSelectAll = () => {
    const allProfileIds = profiles.map(profile => profile.user_id);
    setSelectedProfileIds(allProfileIds);
		console.log(selectedProfileIds);
  };

  // Deselect all profiles
  const handleDeselectAll = () => {
    setSelectedProfileIds([]);
		console.log(selectedProfileIds);
  };

  // Function to render the user profiles.
  // Based off profileType variable, either load
  // User profile or professional profiles
  const renderProfileComponents = () => {
    switch (profileType) {
      case 'User':
        return profiles.map((profile) => (
          <ProfileBox
            key={profile.user_id}
            profileName={profile.name}
            profilePicture={profile.profile_pic}
            profileID={profile.user_id}
            checked={selectedProfileIds.includes(profile.user_id)}
            onChange={() => handleCheckboxToggle(profile.user_id)}
          />
        ));
      case 'Pro':
        return <ProfessionalBox profileName={"Mushfiqur Rahman"}/>;
      default:
        return <Typography>No profile type selected</Typography>;
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ShareModalBox>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontFamily: 'Poppins' }}>
          <b>{message || "Are you sure you want to proceed?"}</b>
        </Typography>

        {/* Render description if provided */}
        {description && (
          <Typography variant="body1" color="textSecondary" sx={{ mt: 1, fontFamily: 'Poppins' }}>
            <b>{description}</b>
          </Typography>
        )}
        <br />

        {/* Box that renders the profiles */}
        <Grid container spacing={2} sx={{ overflowY: 'scroll', height: "70%" }}>
          {renderProfileComponents(profileType)}
        </Grid>

        {/* List of buttons at the bottom of the modal */}
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}>
					<PoppinsButton
            variant="contained"
            color="success"
            onClick={onConfirm}
            sx={{ width: "150px" }}
          >
            Share
          </PoppinsButton>
					<PoppinsButton
            variant="contained"
            onClick={handleSelectAll}
            sx={{ width: "150px" }}
          >
            Select All
          </PoppinsButton>
          <PoppinsButton
            variant="contained"
            onClick={handleDeselectAll}
            sx={{ width: "150px" }}
          >
            Deselect All
          </PoppinsButton>
          <PoppinsButton 
            variant="outlined"
            onClick={onClose}
            sx={{ width: "150px" }}
          >
            Cancel
          </PoppinsButton>
        </Box>
      </ShareModalBox>
    </Modal>
  );
}

export default ShareModal;
