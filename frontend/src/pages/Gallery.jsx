import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import GalleryPhotoComponent from "../components/GalleryPhotoComponent";
import axios from "axios";
import AddPhotoModal from "../components/AddPhotoModal";
import "../App.css";
import LoadingSpinner from "../components/LoadingSpinner";
import NotificationPopup from "../components/NotificationPopup";
import { useNotification } from "../services/notificationService";
import ConfirmationModal from "../components/ConfirmationModal";
import LoadingOverlay from "../components/LoadingOverlay"; // Import the new LoadingOverlay component
import { removeBackground } from "@imgly/background-removal";
import { PageWrapperStyle, Title, GalleryBox, Centred, ImageOverlayOuter, ImageOverlayInner, CrossIcon, DeleteButton } from "../Wrappers.jsx";

function Gallery({ token }) {
  const { profileID } = useParams();
  
  // Main Data in the Gallery
  const [image, setImage] = useState("");
  const [images, setImages] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [imageToEdit, setImageToEdit] = useState(null);

  // Functions that help with opening/closing various modals
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isRemoveBackgroundModalOpen, setIsRemoveBackgroundModalOpen] = useState(false);
  const [isRemovingBackground, setIsRemovingBackground] = useState(false); 
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
    setImage("");
    console.log("Image Added")
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

  // Handle background removal confirmation
  const confirmRemoveBackground = (img_id) => {
    setImageToEdit(img_id);
    setIsRemoveBackgroundModalOpen(true);
  };

  // Remove background from image
  const handleRemoveBackground = async () => {
    setIsRemoveBackgroundModalOpen(false);
    setIsRemovingBackground(true); // Start loading

    const imageToProcess = images.find((img) => img.img_id === imageToEdit);
    if (!imageToProcess) return;

    try {
      const base64Response = await fetch(imageToProcess.url);
      const blob = await base64Response.blob();

      const processedBlob = await removeBackground(blob, {
        output: { format: "image/png" },
      });

      const reader = new FileReader();
      reader.onloadend = async () => {
        const updatedImage = reader.result;

        await axios.put(
          `http://localhost:5005/update_image/${imageToEdit}`,
          { image: updatedImage },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setImages((prevImages) =>
          prevImages.map((img) =>
            img.img_id === imageToEdit ? { ...img, url: updatedImage } : img
          )
        );
        notify("Background removed successfully!");
      };
      reader.readAsDataURL(processedBlob);
    } catch (error) {
      console.error("Failed to remove background:", error);
      notify("Failed to remove background from image.");
    } finally {
      setIsRemovingBackground(false); // Stop loading
    }
  };

  const closeModal = () => setSelectedImage(null);

  if (!images) return <LoadingSpinner />;

  return (
    <>
      <Navbar profileID={profileID} />
      <PageWrapperStyle>
        <br />
        {/* Main box where all the images in Gallery Load */}
        <GalleryBox>
          <Title variant="h3" align="center" gutterBottom sx={{ position: "absolute", transform: "translateX(-50%)", left: "50%" }}>
            <b>Photo Gallery</b>
          </Title>
          <Button
            sx={{ ml: "auto", backgroundColor: "#ff7c33" }}
            onClick={handleOpen}
            variant="contained"
          >
            + Add Photo
          </Button>
        </GalleryBox>
        <br />

        {/* Modal allowing user to upload image from computer to gallery */}
        <AddPhotoModal
          open={open}
          handleClose={handleClose}
          handleProfilePictureUpload={(pic) => setImage(pic)}
          handleUpload={addImage}
        />

        {/* Box where all the images within gallery loads
            Pass through data from API request to GalleryPhotoComponent */}
        <Centred>
            <Grid container spacing={2}>
              {images &&
                images.map((image) => (
                  <GalleryPhotoComponent
                    key={image.img_id}
                    image={image.url}
                    onDelete={() => confirmDeleteImage(image.img_id)}
                    onRemoveBackground={() =>
                      confirmRemoveBackground(image.img_id)
                    }
                    onClick={() => setSelectedImage(image.url)}
                    hasOptions={true}
                  />
                ))}
            </Grid>
        </Centred>

        {/* Loading Overlay for Background Removal */}
        {isRemovingBackground && (
          <LoadingOverlay message="Removing background..." />
        )}

        {/* Enlarged Image Overlay 
            Users can view images closer up, they also have the option to close this view*/}
        {selectedImage && (
          <ImageOverlayOuter onClick={closeModal}>
            <ImageOverlayInner>
              <img
                src={selectedImage}
                alt="Enlarged View"
                style={{ maxHeight: "90vh", maxWidth: "90vw" }}
              />
              <DeleteButton 
                onClick={closeModal} 
                sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <CrossIcon />
              </DeleteButton>
            </ImageOverlayInner>
          </ImageOverlayOuter>
        )}

        {/* Delete Image Modal */}
        <ConfirmationModal
          open={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={deleteImage}
          message="Are you sure you want to delete this image?"
          description="This action cannot be undone."
        />

        {/* Remove background Modal */}
        <ConfirmationModal
          open={isRemoveBackgroundModalOpen}
          onClose={() => setIsRemoveBackgroundModalOpen(false)}
          onConfirm={handleRemoveBackground}
          message="Remove background from this image?"
          description="This will modify the image permanently."
        />

        {/* Notification Popup */}
        {showNotification && (
          <NotificationPopup
            message={notificationMessage}
            duration={5000}
            onClose={() => notify("")}
          />
        )}
      </PageWrapperStyle>
    </>
  );
}

export default Gallery;
