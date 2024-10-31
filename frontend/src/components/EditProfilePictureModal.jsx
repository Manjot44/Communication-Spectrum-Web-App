import React, { useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function EditProfilePictureModal({
  open,
  handleClose,
  profileID,
  token,
  setProfileData,
}) {
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(false);

  // Convert image to base64
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!profilePicture) {
      alert("Please upload an image before proceeding.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5005/admin/update_user_profilepicture/${profileID}`,
        { profilePicture }, // is base64
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setProfileData((prevData) => ({
        ...prevData,
        profile_pic: profilePicture,
      }));

      alert("Profile picture updated successfully.");
      handleClose();
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("Failed to update profile picture.");
    } finally {
      setLoading(false);
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
            Upload a new Profile Picture
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
                className="form-control"
              />
            </div>
            <br />
            <Button onClick={handleUpload} disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default EditProfilePictureModal;
