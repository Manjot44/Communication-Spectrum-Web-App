import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import "../App.css";
import ImageCropperModal from "../components/ImageCropperModal";
import CropIcon from '@mui/icons-material/Crop';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { IconButton, Menu, MenuItem } from '@mui/material';
import GalleryModal from './GalleryModal';

function VisualSupportImage({ uniqueID, imgHeight, image, setImage, deleteImage, token }) {
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For the menu anchor

  // Handle file upload
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

  // Open the file input for uploading
  const handleUploadClick = () => {
    document.getElementById(`fileInput-${uniqueID}`).click();
    handleCloseMenu();
  };

  // Open the gallery modal
  const handleGalleryClick = () => {
    setIsGalleryOpen(true);
    handleCloseMenu();
  };

  // Open the cropper modal
  const handleOpenCropper = () => setIsCropperOpen(true);

  // Close the cropper modal
  const handleCloseCropper = () => setIsCropperOpen(false);

  // Handle crop completion with base64 image
  const handleCropComplete = (croppedBase64) => {
    setImage(croppedBase64); // Save the cropped image as a base64 string
    setIsCropperOpen(false);
  };

  // Open the options menu
  const handleDivClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the options menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Handle selecting an image from the gallery
  const handleGallerySelect = (selectedImage) => {
    setImage(selectedImage);
    setIsGalleryOpen(false);
  };

  return (
    <>
      <div
        className="visual-support-image"
        style={{
          height: `${imgHeight}`,
          backgroundImage: image ? `url(${image})` : 'none',
          cursor: 'pointer'
        }}
        onClick={handleDivClick}
      >
        {!image && <AddPhotoAlternateIcon style={{ fontSize: 100, color: '#ccc' }} />}
        <input
          type="file"
          id={`fileInput-${uniqueID}`}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleUploadClick}>Upload from Computer</MenuItem>
        <MenuItem onClick={handleGalleryClick}>Choose from Gallery</MenuItem>
      </Menu>

      <IconButton
        aria-label="delete"
        onClick={deleteImage}
        style={{ color: "#5A89f7" }}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        aria-label="crop"
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

      <GalleryModal
        open={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onSelectImage={handleGallerySelect}
      />
    </>
  );
}

export default VisualSupportImage;
