import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { styled } from "@mui/material";

export const SettingsPaper = styled(Paper)({
  padding: '30px',
  marginBottom: "20px",
  borderRadius: "8px",
  boxShadow: 3
});

const SettingsCard = ({ title, children }) => (
  <Paper sx={{ boxShadow: 3, padding: "30px" }}>
    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "15px", color: "#000CA4", fontFamily: 'Poppins' }}>
      {title}
    </Typography>
    <Box>{children}</Box>
  </Paper>
);

export default SettingsCard;
