import React, { useState } from "react";
import { Box, Typography, Checkbox } from "@mui/material";
import { styled } from "@mui/material/styles";

const RedCheckbox = styled(Checkbox)({
  color: "#ff7c33",
  "&.Mui-checked": {
    color: "#ff7c33",
  },
});

function ProfileBox({ profileName, profilePicture, profileID }) {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Box
      sx={{
        width: 150,
        height: 200,
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
        position: "relative",
        textAlign: "center",
        bgcolor: "background.paper",
        m: 1,
      }}
    >
      {/* Profile picture */}
      <Box
        component="img"
        src={profilePicture}
        alt={profileName}
        sx={{
          width: "100%",
          height: "70%",
          objectFit: "cover",
        }}
      />

      {/* Profile name */}
      <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
        {profileName}
      </Typography>

      {/* Red checkbox in bottom-right corner */}
      <RedCheckbox
        checked={checked}
        onChange={handleCheckboxChange}
        sx={{
          position: "absolute",
          bottom: 0,
          right: 8,
        }}
      />
    </Box>
  );
}

export default ProfileBox;
