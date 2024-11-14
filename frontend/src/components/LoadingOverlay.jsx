import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingOverlay = ({ initialMessage = "Removing background" }) => {
  const [message, setMessage] = useState(initialMessage);
  const [showFlip, setShowFlip] = useState(false);
  const loadingMessages = [
    "Processing image",
    "Enhancing details",
    "Almost done",
    "Analyzing image quality",
    "Refining edges",
    "Applying magic",
    "Clearing background",
    "Isolating subject",
    "Perfecting details",
    "Finalizing changes",
    "Adding the finishing touches",
  ];
  const [dots, setDots] = useState("");

  useEffect(() => {
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      setShowFlip(true);
      setTimeout(() => {
        setMessage(loadingMessages[messageIndex]);
        setShowFlip(false);
      }, 500);
      messageIndex = (messageIndex + 1) % loadingMessages.length;
    }, 3000);

    return () => clearInterval(messageInterval);
  }, []);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        textAlign: "center",
        background:
          "linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(34, 34, 34, 0.9))",
        backdropFilter: "blur(8px)",
        padding: 4,
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
        minWidth: "250px",
      }}
    >
      <CircularProgress color="inherit" sx={{ color: "#bbdefb" }} />{" "}
      {/* Light blue color */}
      <Typography
        variant="body1"
        sx={{
          color: "#e3f2fd",
          mt: 2,
          display: "inline-block",
          minWidth: "200px",
          whiteSpace: "nowrap",
          animation: showFlip ? "flipDown 0.5s ease-in-out" : "none",
          transformOrigin: "top",
          fontWeight: "500",
          "@keyframes flipDown": {
            "0%": { opacity: 0, transform: "rotateX(-90deg)" },
            "50%": { opacity: 0.5, transform: "rotateX(-45deg)" },
            "100%": { opacity: 1, transform: "rotateX(0deg)" },
          },
        }}
      >
        {message}
        <span>{dots}</span>
      </Typography>
    </Box>
  );
};

export default LoadingOverlay;
