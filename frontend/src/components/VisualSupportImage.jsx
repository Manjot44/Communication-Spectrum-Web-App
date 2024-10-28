import React, { useState } from 'react';

function VisualSupportImage({ image, setImage, uniqueID }) {
  
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
    <div
      style={{
        width: '100%',
        height: '30vh',
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
        onChange={handleImageChange}
      />
    </div>
  );
}

export default VisualSupportImage;
