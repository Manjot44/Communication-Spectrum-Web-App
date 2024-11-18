import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import { Title } from "../Wrappers";

const LoadingSpinnerBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <LoadingSpinnerBox>
      <CircularProgress color="primary" />
      <Title>
        {message}
      </Title>
    </LoadingSpinnerBox>
  );
};

export default LoadingSpinner;
