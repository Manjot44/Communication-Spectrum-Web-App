import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ProfileCheckBox } from "../Wrappers";

const ProfileOuterBox = styled(Box)({
  width: 150,
  height: 200,
  borderRadius: 2,
  boxShadow: 3,
  overflow: "hidden",
  position: "relative",
  textAlign: "center",
  backgroundColor: "white",
  m: 1,
});

const UserProfilePicBox = styled(Box)({
  width: "100%",
  height: "70%",
  objectFit: "cover",
});

function ProfileBox({ profileName, profilePicture, checked, onChange }) {
  return (
    <ProfileOuterBox sx={{ boxShadow: 3, m: 1 }}>
      <UserProfilePicBox 
        component="img"
        src={profilePicture}
        alt={profileName}
      />
      {/* Profile name */}
      <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
        {profileName}
      </Typography>
      {/* Checkbox in bottom-right corner */}
      <ProfileCheckBox
        checked={checked}
        onChange={onChange}
      />
    </ProfileOuterBox>
  );
}

export default ProfileBox;
