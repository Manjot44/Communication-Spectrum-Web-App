import React from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AddPhotoModal({ open, handleClose, handleProfilePictureUpload, handleUpload }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      handleProfilePictureUpload(reader.result);  // Set the base64 image
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload a Photo
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="form-group">
              <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="form-control"
              />
            </div>
            <br/>
            <Button onClick={handleUpload}>Upload</Button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default AddPhotoModal;
