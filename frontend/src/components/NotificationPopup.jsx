import React, { useState, useEffect } from "react";
import { Box, Typography, Fade, Paper } from "@mui/material";

const NotificationPopup = ({ message, duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Set a timer to hide the notification after the specified duration
    const timer = setTimeout(() => {
      setVisible(false); // Start fade-out
      if (onClose) onClose(); // Optional: Trigger any action after fade-out
    }, duration);

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, [duration, onClose]);

  return (
    <Fade in={visible} timeout={600}>
      <Paper
        elevation={3}
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          padding: "16px 24px",
          borderRadius: "8px",
          bgcolor: "#000CA4",
          color: "white",
          zIndex: 1500,
          minWidth: "250px",
          textAlign: "center",
          boxShadow: 3,
        }}
      >
        <Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
          {message}
        </Typography>
      </Paper>
    </Fade>
  );
};

export default NotificationPopup;
