import React, { useState, useEffect } from "react";
import { Box, Typography, Fade, Paper } from "@mui/material";

const NotificationPopup = ({ message, duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100); // Start with 100% progress

  useEffect(() => {
    const intervalTime = 50; // Frequency of updates (in ms)
    const decrement = (100 / duration) * intervalTime; // Amount to decrease per interval

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.max(prev - decrement, 0);
        return newProgress;
      });
    }, intervalTime);

    // Set timeout to hide the notification after duration
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    // Clean up intervals and timeout on unmount
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
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
          bgcolor: "#BF0603",
          color: "white",
          zIndex: 1500,
          minWidth: "250px",
          textAlign: "center",
          boxShadow: 3,
          overflow: "hidden",
        }}
      >
        <Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
          {message}
        </Typography>

        {/* Progress bar */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "4px",
            width: `${progress}%`, // Set width to the progress percentage
            bgcolor: "white",
            transition: "width 50ms linear", // Smooth transition for each decrement
          }}
        />
      </Paper>
    </Fade>
  );
};

export default NotificationPopup;
