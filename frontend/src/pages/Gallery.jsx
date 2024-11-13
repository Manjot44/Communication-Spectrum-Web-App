import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Button, IconButton, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import GalleryPhotoComponent from "../components/GalleryPhotoComponent";
import axios from "axios";
import AddPhotoModal from "../components/AddPhotoModal";
import CloseIcon from "@mui/icons-material/Close";
import "../App.css";
import LoadingSpinner from "../components/LoadingSpinner";
import NotificationPopup from "../components/NotificationPopup";
import { useNotification } from "../services/notificationService";
import ConfirmationModal from "../components/ConfirmationModal"; // Import the ConfirmationModal

function Gallery({ token }) {
  const { profileID } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [image, setImage] = useState("");
  const [images, setImages] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageToDelete, setImageToDelete] = useState(null); // State to store the image to delete
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // State to control confirm modal

  const { notify, showNotification, notificationMessage } = useNotification();

  // Fetch images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/get_images/${profileID}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setImages(response.data.images);
      } catch (err) {
        notify("Failed to fetch images.");
      }
    };
    fetchImages();
  }, [profileID, token, open, notify]);

  // Add new image
  const addImage = async () => {
    if (image === "") {
      notify("Please upload a file.");
    } else {
      try {
        await axios.post(
          `http://localhost:5005/add_image/${profileID}`,
          { image },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setImages((prevImages) => [
          ...prevImages,
          { img_id: Date.now(), url: image },
        ]);
        notify("Image added successfully!");
        setOpen(false);
      } catch (error) {
        console.error("Error adding image:", error);
        notify("An error occurred while adding the image.");
      }
    }
  };

  // Open confirmation modal before deleting
  const confirmDeleteImage = (img_id) => {
    setImageToDelete(img_id);
    setIsConfirmModalOpen(true);
  };

  // Confirm deletion of the image
  const deleteImage = async () => {
    try {
      await axios.delete(
        `http://localhost:5005/delete_image/${imageToDelete}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setImages(images.filter((img) => img.img_id !== imageToDelete));
      notify("Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image:", error);
      notify("An error occurred while deleting the image.");
    } finally {
      setIsConfirmModalOpen(false);
      setImageToDelete(null);
    }
  };

  const closeModal = () => setSelectedImage(null);

  if (!images) return <LoadingSpinner />;

  return (
    <>
      <Navbar profileID={profileID} />
      <div className="page-wrapper-style">
        <br />
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Poppins",
              color: "#000CA4",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
            }}
          >
            <b>Gallery</b>
          </Typography>
          <Button
            sx={{ ml: "auto", backgroundColor: "#ff7c33" }}
            onClick={handleOpen}
            variant="contained"
          >
            + Add Photo
          </Button>
        </Box>

        <br />
        <br />

        <AddPhotoModal
          open={open}
          handleClose={handleClose}
          handleProfilePictureUpload={(pic) => setImage(pic)}
          handleUpload={addImage}
        />

        <div
          className="d-flex justify-content-center"
          style={{ display: "flex" }}
        >
          <div style={{ width: "85%" }}>
            <Grid container spacing={2}>
              {images &&
                images.map((image) => (
                  <GalleryPhotoComponent
                    key={image.img_id}
                    image={image.url}
                    onDelete={() => confirmDeleteImage(image.img_id)} // Use confirmDeleteImage instead of deleteImage
                    onClick={() => setSelectedImage(image.url)}
                    hasOptions={true}
                  />
                ))}
            </Grid>
          </div>
        </div>

        {/* Enlarged Image Overlay */}
        {selectedImage && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
            onClick={closeModal}
          >
            <div style={{ position: "relative" }}>
              <img
                src={selectedImage}
                alt="Enlarged View"
                style={{ maxHeight: "90vh", maxWidth: "90vw" }}
              />
              <IconButton
                onClick={closeModal}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        )}

        {/* Confirmation Modal for Deletion */}
        <ConfirmationModal
          open={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={deleteImage}
          message="Are you sure you want to delete this image?"
          description={"This action cannot be undone."}
        />

        {/* Notification Popup */}
        {showNotification && (
          <NotificationPopup
            message={notificationMessage}
            duration={5000}
            onClose={() => notify("")}
          />
        )}
      </div>
    </>
  );
}

export default Gallery;
