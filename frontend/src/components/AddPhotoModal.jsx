import React from 'react';
import { Modal, Button, Typography } from '@mui/material';
import { ModalBox } from '../Wrappers';

function AddPhotoModal({ open, handleClose, handleProfilePictureUpload, handleUpload }) {
  // Function to handle profile picture upload
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
        <ModalBox>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload a Photo
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className='form-group'>
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
        </ModalBox>
      </Modal>
    </>
  );
}

export default AddPhotoModal;
