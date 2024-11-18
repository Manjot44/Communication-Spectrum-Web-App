import React, { useState } from "react";
import { Modal, Button, Typography } from "@mui/material";
import axios from "axios";
import ImageCropperModal from "../components/ImageCropperModal"; // Import the ImageCropperModal component
import NotificationPopup from "../components/NotificationPopup"; // Import the NotificationPopup component
import { ModalBox } from "../Wrappers";

function EditProfilePictureModal({
  open,
  handleClose,
  profileID,
  token,
  setProfileData,
}) {
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showNotification, setShowNotification] = useState(false); // State for notification visibility
  const [notificationMessage, setNotificationMessage] = useState(""); // State for notification message

  // Convert image to base64 and open cropper
  // Function activated when user hits submit
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result); // Set the selected image as base64
      setIsCropperOpen(true); // Open the cropper modal
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle the cropped image
  const handleCropComplete = (croppedImage) => {
    setProfilePicture(croppedImage); // Set the cropped image as the profile picture
    setIsCropperOpen(false); // Close the cropper modal
  };

  // API Request to backend to save the new image
  const handleUpload = async () => {
    if (!profilePicture) {
      alert("Please upload an image before proceeding.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `http://localhost:5005/admin/update_user_profilepicture/${profileID}`,
        { profilePicture }, // base64 cropped image
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
      {/* Edit Profile picture Modal. Activates when user profile picture
          is clicked on. User is able to upload from computer */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
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
        </ModalBox>
      </Modal>

      {/* Image Cropper Modal */}
      <ImageCropperModal
        open={isCropperOpen}
        onClose={() => setIsCropperOpen(false)}
        image={selectedImage}
        onCropComplete={handleCropComplete}
        defaultAspect={1}                            // 1:1 aspect ratio for square crop
        circleCrop={true}                            // Show circular overlay for profile picture
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
