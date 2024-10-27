import React from "react";
import { Card, CardMedia, CardActions, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

const GalleryPhotoComponent = ({ image, onDelete, onRemoveBackground }) => {
  return (
    <Card style={{ maxWidth: 250, margin: "10px" }}>
      {" "}
      {/* Adjusted styling */}
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="Gallery Image"
        style={{ objectFit: "cover" }}
      />
      <CardActions>
        {/* Delete button */}
        <IconButton onClick={onDelete} aria-label="delete">
          <DeleteIcon />
        </IconButton>
        {/* Remove Background button */}
        <IconButton onClick={onRemoveBackground} aria-label="remove background">
          <AutoFixHighIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default GalleryPhotoComponent;
