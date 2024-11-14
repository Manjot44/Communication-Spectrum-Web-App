import React from "react";
import { Box, Typography, Checkbox } from "@mui/material";
import { styled } from "@mui/material/styles";

const RedCheckbox = styled(Checkbox)({
  color: "#ff7c33",
  "&.Mui-checked": {
    color: "#ff7c33",
  },
});

function ProfessionalBox({ profileName, profilePicture, profileID, checked, onChange }) {
  return (
    <Box
      sx={{
        width: 200,
        height: 325,
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
        position: "relative",
        textAlign: "center",
        bgcolor: "background.paper",
        m: 1,
      }}
    >
      {/* Professional Name */}
      {/* Profile name */}
      <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold", borderBottom: '1px solid black' }}>
        {profileName}
      </Typography>

      {/* Professionals in which the User Profile has been shared to */}
      <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
        Shared With:
      </Typography>

			{/* Loop through list of professional users the user profile has been shared to */}
			<Typography variant="body1" sx={{ mt: 1 }}>
        Manjot
				Sanjam
      </Typography>

      {/* Red checkbox in bottom-right corner */}
      <RedCheckbox
        checked={checked}
        onChange={onChange}
        sx={{
          position: "absolute",
          bottom: 0,
          right: 8,
        }}
      />
    </Box>
  );
}

export default ProfessionalBox;
