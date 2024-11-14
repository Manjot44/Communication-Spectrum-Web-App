import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Box } from "@mui/material";
import UserProfileCircles from "../components/UserProfileCircles";
import ConfirmationModal from "../components/ConfirmationModal";
import ShareModal from "./ShareModal";

function UserProfileContainer({ token }) {
  const [profiles, setProfiles] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5005/get_clients", {
        headers: { Authorization: token },
      })
      .then((response) => setProfiles(response.data.clients))
      .catch((error) => console.error("Error fetching profiles:", error));
  }, [token]);

  const handleDelete = (userId) => {
    setUserIdToDelete(userId);
    setIsConfirmModalOpen(true);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          maxWidth: "90%",
          margin: "0 auto",
          mt: 4,
          padding: 2,
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{
            maxWidth: "1000px",
          }}
        >
          {profiles.map((profile) => (
            <Grid item key={profile.user_id} xs={12} sm={6} md={4} lg={3}>
              <UserProfileCircles
                profileName={profile.name}
                profilePicture={profile.profile_pic}
                profileID={profile.user_id}
                onDelete={() => handleDelete(profile.user_id)}
                onShare={() => setIsShareModalOpen(true)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <ConfirmationModal
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => {
          // Confirm delete action
        }}
        message="Are you sure you want to delete this profile?"
        description="This action cannot be undone. The profile will be permanently deleted."
      />

      <ShareModal
        open={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        message="Share User Profile"
        description="Select Professional Accounts to Share to"
        token={token}
        profileType="Pro"
      />
    </>
  );
}

export default UserProfileContainer;
