import React, { useState, useCallback } from "react";
import { Modal, Box, Slider, Button, Typography } from "@mui/material";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage"; // Import helper for cropping

const ImageCropperModal = ({ open, onClose, image, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1); // Default aspect ratio
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Capture the cropped area when user stops dragging
  const onCropAreaChange = useCallback((_, croppedArea) => {
    setCroppedAreaPixels(croppedArea);
  }, []);

  // Finalize cropping when the "Done" button is clicked
  const finalizeCrop = async () => {
    if (croppedAreaPixels) {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onCropComplete(croppedImage); // Pass cropped image back to parent
      onClose(); // Close the modal after completion
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Crop Image
        </Typography>
        <div style={{ width: "100%", height: 400, position: "relative" }}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropAreaChange}
          />
        </div>
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(e, newZoom) => setZoom(newZoom)}
          sx={{ width: "80%", mt: 2 }}
        />
        <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
          <Button onClick={() => setAspect(1)}>1:1</Button>
          <Button onClick={() => setAspect(4 / 3)}>4:3</Button>
          <Button onClick={() => setAspect(16 / 9)}>16:9</Button>
        </Box>
        <Button variant="contained" onClick={finalizeCrop} sx={{ mt: 2 }}>
          Done
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  p: 2,
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default ImageCropperModal;
