import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ProfileCheckBox } from "../Wrappers";

const ProfessionalUserBox = styled(Box)({
  width: 200,
  height: 325,
  borderRadius: 2,
  boxShadow: 3,
  overflow: "hidden",
  position: "relative",
  textAlign: "center",
  backgroundColor: "white",
  m: 1,
});

function ProfessionalBox({ profileName, checked, onChange }) {
  return (
    <ProfessionalUserBox sx={{ boxShadow: 3 }}>
      {/* Professional Profile Name */}
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

      {/* Checkbox in bottom-right corner */}
      <ProfileCheckBox
        checked={checked}
        onChange={onChange}
      />
    </ProfessionalUserBox>
  );
}

export default ProfessionalBox;
