import React, { useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import axios from "axios";
import ImageCropperModal from "../components/ImageCropperModal"; // Import the ImageCropperModal component
import NotificationPopup from "../components/NotificationPopup"; // Import the NotificationPopup component

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
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showNotification, setShowNotification] = useState(false); // State for notification visibility
  const [notificationMessage, setNotificationMessage] = useState(""); // State for notification message
  const [blobUrl, setBlobUrl] = useState(null); // State to store Blob URL for cleanup

  // Cleanup Blob URL whenever it changes or component unmounts
  useEffect(() => {
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl]);

  // Convert image to binary data and open cropper
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const binaryData = new Uint8Array(reader.result); // Convert ArrayBuffer to Uint8Array
      setSelectedImage(binaryData); // Set binary data as the selected image
      setIsCropperOpen(true); // Open the cropper modal
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  // Handle the cropped image
  const handleCropComplete = (croppedImage) => {
    setProfilePicture(croppedImage); // Set the cropped image as the profile picture
    setIsCropperOpen(false); // Close the cropper modal
  };

  const handleUpload = async () => {
    if (!profilePicture) {
      alert("Please upload an image before proceeding.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `http://localhost:5005/admin/update_user_profilepicture/${profileID}`,
        profilePicture, // Send binary data directly
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/octet-stream', // Specify binary content type
          },
        }
      );
      
      // Revoke previous Blob URL and create a new one
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
      const newBlobUrl = URL.createObjectURL(new Blob([profilePicture]));
      setBlobUrl(newBlobUrl);

      setProfileData((prevData) => ({
        ...prevData,
        profile_pic: URL.createObjectURL(new Blob([profilePicture])), // Create a Blob URL for display
      }));

      setNotificationMessage("Profile picture updated successfully!"); // Set notification message
      setShowNotification(true); // Show notification
    } catch (error) {
      console.error("Error updating profile picture:", error);
      setNotificationMessage("Failed to update profile picture."); // Set error message
      setShowNotification(true);
    } finally {
      setLoading(false);
      handleClose(); // Close the modal after upload
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

      {/* Image Cropper Modal */}
      <ImageCropperModal
        open={isCropperOpen}
        onClose={() => setIsCropperOpen(false)}
        image={selectedImage}
        onCropComplete={handleCropComplete}
        defaultAspect={1} // 1:1 aspect ratio for square crop
        circleCrop={true} // Show circular overlay for profile picture
      />

      {/* Notification Popup */}
      {showNotification && (
        <NotificationPopup
          message={notificationMessage}
          duration={5000}
          onClose={() => setShowNotification(false)} // Hide notification after timeout
        />
      )}
    </>
  );
}

export default EditProfilePictureModal;
