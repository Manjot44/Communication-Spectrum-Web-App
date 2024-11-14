import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IosShareIcon from "@mui/icons-material/IosShare";
import "../App.css";

function UserProfileCircles({
  profileName,
  profilePicture,
  profileID,
  onDelete,
  onShare,
}) {
  const navigate = useNavigate();

  const handleUser = () => {
    navigate(`/home/${profileID}`);
  };

  return (
    <Box
      onClick={handleUser}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        padding: 2,
        borderRadius: "12px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "200px",
        height: "270px",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 8px 16px rgba(0, 112, 255, 0.5)",
        },
        position: "relative",
      }}
    >
      {/* Profile Picture */}
      <Box
        component="img"
        src={profilePicture}
        alt=""
        sx={{
          width: "80%",
          height: "auto",
          borderRadius: "50%",
          marginBottom: "12px",
          border: "2px solid #ddd",
        }}
      />

      {/* Profile Name */}
      <Typography
        variant="body1"
        sx={{
          fontWeight: "bold",
          fontFamily: "Poppins",
          color: "#333",
          textAlign: "center",
          marginBottom: "auto",
        }}
      >
        {profileName}
      </Typography>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "center",
          mt: "auto",
          paddingTop: "8px",
        }}
      >
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          color="error"
          size="small"
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onShare();
          }}
          color="primary"
          size="small"
        >
          <IosShareIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default UserProfileCircles;
