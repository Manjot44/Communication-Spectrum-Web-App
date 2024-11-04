import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import "../App.css"

function VisualSupportImage({ uniqueID, imgHeight, image, setImage, deleteImage }) {  
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
      {!image && 'Click to select an image for Visual Support'}
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
    </>
  );
}

export default VisualSupportImage;
