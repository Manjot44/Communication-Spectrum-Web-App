import React from "react";
import { Card, CardActions, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { styled } from "@mui/material";

const ImageCard = styled(Card)({
  maxWidth: 345,
  margin: "8px",
  display: "inline-block",
});

const ClickableBox = styled(Box)({
  position: "relative",
  cursor: "pointer",
});

const OverlayBox = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "#000",
  opacity: 0,
  transition: "opacity 0.3s",
  "&:hover": { opacity: 0.2 },
});

const CardImage = styled('img')({
  width: "100%",
  height: "auto",
  borderRadius: "8px 8px 0 0",
});

function GalleryPhotoComponent({
  image,
  onDelete,
  onRemoveBackground,
  onClick,
  hasOptions,
}) {
  return (
    <ImageCard>
      {/* Image + Overlay */}
      <ClickableBox onClick={onClick}>
        <CardImage src={image} alt="Gallery"/>
        <OverlayBox/>
      </ClickableBox>

      {/* Action Buttons */}
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
            aria-label="remove background"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Magic wand icon clicked");
              onRemoveBackground();
            }}
          >
            <AutoFixHighIcon />
          </IconButton>
        </CardActions>
      )}
    </ImageCard>
  );
}

export default GalleryPhotoComponent;
