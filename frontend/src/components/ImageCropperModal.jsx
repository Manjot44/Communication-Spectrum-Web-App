import React, { useState, useCallback, useEffect } from "react";
import { Modal, Box, Slider, Button, Typography } from "@mui/material";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage";

const ImageCropperModal = ({
  open,
  onClose,
  image,
  onCropComplete,
  defaultAspect = 4 / 3,
  circleCrop = false,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(defaultAspect);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [lastCropArea, setLastCropArea] = useState(null);
  const [originalAspect, setOriginalAspect] = useState(defaultAspect);

  // Set the original image and calculate the original aspect ratio
  useEffect(() => {
    if (image && originalImage !== image) {
      setOriginalImage(image);
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setOriginalAspect(img.width / img.height);
      };
    }
  }, [image, originalImage]);

  // Reset crop parameters each time the modal opens, displaying the previous crop if it exists
  useEffect(() => {
    if (open) {
      setCrop(lastCropArea?.crop || { x: 0, y: 0 });
      setZoom(lastCropArea?.zoom || 1);
      setAspect(defaultAspect);
    }
  }, [open, lastCropArea, defaultAspect]);

  // Capture the cropped area when user stops dragging
  const onCropAreaChange = useCallback((_, croppedArea) => {
    setCroppedAreaPixels(croppedArea);
  }, []);

  // Finalize cropping when the "Done" button is clicked
  const finalizeCrop = async () => {
    if (croppedAreaPixels) {
      const croppedBlob = await getCroppedImg(originalImage, croppedAreaPixels);
      onCropComplete(croppedBlob); // Pass the Blob to the parent component
      setLastCropArea({ crop, zoom });
      onClose();
    }
  };
  
  // Revert to the original image and reset cropping coordinates
  const handleRevertCrop = () => {
    onCropComplete(originalImage);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setAspect(defaultAspect);
    setLastCropArea(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Crop Image
        </Typography>
        <div style={{ width: "100%", height: "70vh", position: "relative" }}>
          <Cropper
            image={originalImage}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            cropShape={circleCrop && aspect === 1 ? "round" : "rect"} // Use "round" for circle crop
            showGrid={false} // Optional: removes grid lines when cropping
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropAreaChange}
          />
        </div>

        <Typography variant="body1" sx={{ mt: 2 }}>
          Zoom
        </Typography>
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(e, newZoom) => setZoom(newZoom)}
          sx={{ width: "80%" }}
        />

        {!circleCrop && (
          <>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Aspect Ratio
            </Typography>
            <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
              <Button onClick={() => setAspect(1)}>1:1</Button>
              <Button onClick={() => setAspect(4 / 3)}>4:3</Button>
              <Button onClick={() => setAspect(16 / 9)}>16:9</Button>
              <Button onClick={() => setAspect(originalAspect)}>
                Original
              </Button>
            </Box>
          </>
        )}

        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button variant="contained" onClick={finalizeCrop}>
            Done
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleRevertCrop}
          >
            Revert Crop
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  maxWidth: "1000px",
  height: "80vh",
  bgcolor: "background.paper",
  p: 2,
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default ImageCropperModal;
