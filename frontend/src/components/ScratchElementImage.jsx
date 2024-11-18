import React, { useRef } from 'react';
import { Button } from "@mui/material";

function ScratchElementImage() {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // Trigger the file input click
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file);
      // Handle the uploaded file here
    }
  };

  return (
    <div>
      <Button onClick={handleButtonClick}>Upload Photo</Button>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*" // Optional, restricts to image files only
      />
    </div>
  );
}

export default ScratchElementImage;
