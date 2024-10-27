import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function GalleryPhotoComponent({ image, onDelete }) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img
        src={image}
        alt="Gallery Item"
        style={{ width: "100%", height: "auto" }}
      />
      <IconButton
        aria-label="delete"
        onClick={onDelete}
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          color: "red",
          backgroundColor: "white",
        }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

export default GalleryPhotoComponent;
