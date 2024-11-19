import React, { useState, useEffect } from "react";
import { Box, Typography, Fade, Paper } from "@mui/material";
import { styled } from "@mui/material";

const RedBox = styled(Paper)({
  position: "fixed",
  bottom: 30,
  right: 30,
  padding: "16px 24px",
  borderRadius: "8px",
  backgroundColor: "#BF0603",
  color: "white",
  zIndex: 1500,
  minWidth: "250px",
  textAlign: "center",
  boxShadow: 3,
  overflow: "hidden",
  cursor: "pointer",
});

const WhiteBar = styled(Box)({
  position: "absolute",
  bottom: 0,
  left: 0,
  height: "4px",
  backgroundColor: "white",
  transition: "width 50ms linear",
});

const NotificationPopup = ({ message, duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const intervalTime = 50;
    const decrement = (100 / duration) * intervalTime;

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.max(prev - decrement, 0));
    }, intervalTime);

    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  return (
    <Fade in={visible} timeout={600}>
      <RedBox onClick={handleClose} elevation={3}>
        <Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
          {message}
        </Typography>
        <WhiteBar sx={{ width: `${progress}%` }}/>
      </RedBox>
    </Fade>
  );
};

export default NotificationPopup;
