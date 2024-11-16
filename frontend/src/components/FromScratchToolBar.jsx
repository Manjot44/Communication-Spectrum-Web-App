import React from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function FromScratchToolBar({ addBox, addElementImage, handleButtonClick, fileInputRef }) {
  return (
    <Box
      sx={{
        display: "flex", // Make it a flex container
        flexDirection: "row", // Horizontal layout
        alignItems: "center", // Vertically center the content
        justifyContent: "space-evenly", // Evenly space buttons
        height: "6vh", // Set toolbar height
        backgroundColor: "white", // Optional: Set background color
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)", // Optional: Add a shadow
        padding: "0 16px", // Add horizontal padding
        overflowX: "auto", // Allow horizontal scrolling if content overflows
      }}
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => addBox("title")}
      >
        Add Title
      </Button>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => addBox("body")}
      >
        Add Text
      </Button>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={addBox}
      >
        Add Box
      </Button>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleButtonClick}
      >
        Add Picture
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={addElementImage}
          accept="image/*"
        />
      </Button>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={addBox}
      >
        Add Timer
      </Button>
    </Box>
  );
}

export default FromScratchToolBar;
