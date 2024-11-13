import React from "react";
import { Card, CardActions, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

function GalleryPhotoComponent({
  image,
  onDelete,
  onRemoveBackground,
  onClick,
  hasOptions
}) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "8px",
        display: "inline-block",
      }}
    >
      {/* Clickable Image Area */}
      <Box
        onClick={onClick}
        sx={{
          position: "relative",
          cursor: "pointer",
        }}
      >
        <img
          src={image}
          alt="Gallery"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "8px 8px 0 0",
          }}
        />

        {/* Overlay Effect */}
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            opacity: 0,
            transition: "opacity 0.3s",
            "&:hover": { opacity: 0.2 },
          }}
        />
      </Box>

      {/* Non-clickable Action Buttons */}
      {hasOptions && (
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton
            aria-label="delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <DeleteIcon />
          </IconButton>

          <IconButton
            aria-label="zoom-in"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveBackground();
            }}
          >
            <ZoomInIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
}

export default GalleryPhotoComponent;
