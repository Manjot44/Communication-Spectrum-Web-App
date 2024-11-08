import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import "../App.css";
import ImageCropperModal from "../components/ImageCropperModal";
import CropIcon from '@mui/icons-material/Crop';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function VisualSupportImage({ uniqueID, imgHeight, image, setImage, deleteImage }) {
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDivClick = () => {
    document.getElementById(`fileInput-${uniqueID}`).click();
  };
  
  // Open cropper modal
  const handleOpenCropper = () => setIsCropperOpen(true);

  // Close cropper modal
  const handleCloseCropper = () => setIsCropperOpen(false);

  // Handle crop completion with base64 image
  const handleCropComplete = (croppedBase64) => {
    setImage(croppedBase64); // Save the cropped image as a base64 string
    setIsCropperOpen(false);
  };

  return (
    <>
    <div
      class="visual-support-image"
      style={{
        height: `${imgHeight}`,
        backgroundImage: image ? `url(${image})` : 'none'
      }}
      onClick={handleDivClick}
    >
      {!image && <AddPhotoAlternateIcon style={{ fontSize: 100, color: '#ccc' }} />}
      <input
        type="file"
        id={`fileInput-${uniqueID}`}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageChange} />
    </div>
    <IconButton
      aria-label="delete"
      onClick={deleteImage}
      style={{ color: "#5A89f7" }}
    >
      <DeleteIcon />
    </IconButton>
    <IconButton
      aria-label="delete"
      onClick={handleOpenCropper}
      style={{ color: "#5A89f7" }}
    >
      <CropIcon />
    </IconButton>
    <ImageCropperModal
      open={isCropperOpen}
      onClose={handleCloseCropper}
      image={image}
      onCropComplete={handleCropComplete}
    />
    </>
  );
}

export default VisualSupportImage;
