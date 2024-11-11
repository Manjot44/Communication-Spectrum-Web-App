import React, { useState } from "react";
import { Card, Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationModal from "./ConfirmationModal";
import ShareModal from "./ShareModal";
import IosShareIcon from '@mui/icons-material/IosShare';
import "../App.css";

function RecentSupports({ profileData, token, onDelete }) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Open confirmation modal
  const handleDeleteClick = () => {
    setIsConfirmModalOpen(true);
  };

  // Confirm deletion
  const confirmDeleteSupport = () => {
    onDelete(profileData.support_id); // Call the onDelete function passed from RecentSupportsBox
    setIsConfirmModalOpen(false); // Close the modal
  };

  // Open Share Modal
  const handleShareClick = () => {
    setIsShareModalOpen(true);
  }

  return (
    <Card
      className="recent-supports-style"
      style={{
        width: "100%", // Use 100% width to fit the container
        padding: "10px",
        textAlign: "center",
      }}
    >
      {/* Image container with a fixed aspect ratio */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "56.25%", // 16:9 aspect ratio (adjust this if needed)
          overflow: "hidden",
          borderRadius: "10px",
        }}
      >
        {profileData.title_img && (
          <img
            src={profileData.title_img}
            alt={profileData.title}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        )}
      </div>

      {/* Title and delete button container */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ marginTop: "10px", position: "relative" }}
      >
        <Typography
          variant="body1"
          style={{ fontSize: "1.2rem", textAlign: "center" }}
        >
          {profileData.title}
        </Typography>
        
        <IconButton
          aria-label="share"
          onClick={handleShareClick}
          style={{
            color: "grey",
            position: "absolute",
            right: 35,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <IosShareIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={handleDeleteClick}
          style={{
            color: "grey",
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      {/* Confirmation Modal for Deletion */}
      <ConfirmationModal
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)} // Close modal on cancel
        onConfirm={confirmDeleteSupport} // Confirm delete action
        message="Are you sure you want to delete this support?"
        description="This action cannot be undone. The support will be permanently deleted."
      />

      <ShareModal
        open={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)} // Close modal on cancel
        // onConfirm={confirmDeleteSupport} // Confirm delete action
        message="Share Visual Support"
        description="Please Select User Profiles To Share"
        token={token}
      />
    </Card>
  );
}

export default RecentSupports;
