import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const SettingsCard = ({ title, children }) => (
  <Paper sx={{ padding: "30px", marginBottom: "20px", borderRadius: "8px", boxShadow: 3 }}>
    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "15px", color: "#000CA4" }}>
      {title}
    </Typography>
    <Box>{children}</Box>
  </Paper>
);

export default SettingsCard;
