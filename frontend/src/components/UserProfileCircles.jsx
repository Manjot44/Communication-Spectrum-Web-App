import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IosShareIcon from "@mui/icons-material/IosShare";
import "../App.css";
import { UserProfileCircleOuter, UserProfileCircle, UserProfileName, UserProfileCircleButtonBox } from "../Wrappers";

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
    <UserProfileCircleOuter onClick={handleUser} sx={{ padding: 2 }}>
      {/* Profile Picture */}
      <UserProfileCircle 
        component="img"
        src={profilePicture}
        alt=""
      />

      {/* Profile Name */}
      <UserProfileName variant="body1">
        {profileName}
      </UserProfileName>

      {/* Action Buttons */}
      <UserProfileCircleButtonBox>
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
      </UserProfileCircleButtonBox>
    </UserProfileCircleOuter>
  );
}

export default UserProfileCircles;
