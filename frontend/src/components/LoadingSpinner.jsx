import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CircularProgress color="primary" />
      <Typography
        variant="h6"
        sx={{ mt: 2, fontFamily: "Poppins", color: "#000CA4" }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
