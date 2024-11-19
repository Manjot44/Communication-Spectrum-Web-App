import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";

const LoadingOverlayBox = styled(Box)({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  textAlign: "center",
  background:
    "linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(34, 34, 34, 0.9))",
  backdropFilter: "blur(8px)",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
  minWidth: "300px",
  padding: "25px"
});

const LoadingMessage = styled(Typography)({
  color: "#e3f2fd",
  mt: 2,
  display: "inline-block",
  minWidth: "200px",
  whiteSpace: "nowrap",
  transformOrigin: "top",
  fontWeight: "500",
  "@keyframes flipDown": {
    "0%": { opacity: 0, transform: "rotateX(-90deg)" },
    "50%": { opacity: 0.5, transform: "rotateX(-45deg)" },
    "100%": { opacity: 1, transform: "rotateX(0deg)" },
  },
});

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

  // Manages the OverLay box that comes up as it is loading
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
  });

  // Effect off the '...' within messgae being animated
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  return (
    <LoadingOverlayBox>
      <CircularProgress color="inherit" sx={{ color: "#bbdefb" }} />{" "}
      <LoadingMessage sx={{ animation: showFlip ? "flipDown 0.5s ease-in-out" : "none" }}>
        {message}
        <span>{dots}</span>
      </LoadingMessage>
    </LoadingOverlayBox>
  );
};

export default LoadingOverlay;
