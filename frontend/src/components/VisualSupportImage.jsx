import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

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
      style={{
        width: '100%',
        height: `${imgHeight}`,
        border: '2px dashed #ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#666',
        backgroundColor: 'white',
        fontSize: '18px',
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
    <DeleteIcon onClick={deleteImage} style={{ color: 'black' }} />
    </>
  );
}

export default VisualSupportImage;
