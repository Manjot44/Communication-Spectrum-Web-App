import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Button, IconButton } from "@mui/material";
import Navbar from "../components/Navbar";
import GalleryPhotoComponent from "../components/GalleryPhotoComponent";
import axios from "axios";
import AddPhotoModal from "../components/AddPhotoModal";
import CloseIcon from "@mui/icons-material/Close";

function Gallery({ token }) {
  const { profileID } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [image, setImage] = useState("");
  const [images, setImages] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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
        alert(err.response.data.error);
      }
    };
    fetchImages();
  }, [profileID, token, open]);

  // Add new image
  const addImage = async () => {
    if (image === "") {
      alert("Please Upload a File");
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
        alert("Image added successfully");
        setOpen(false);
        setImages((prevImages) => [
          ...prevImages,
          { img_id: Date.now(), url: image },
        ]);
      } catch (error) {
        console.error("Error adding image:", error);
        alert("An error occurred while adding the image.");
      }
    }
  };

  // Delete image
  const deleteImage = async (img_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5005/delete_image/${img_id}`, {
          headers: {
            Authorization: token,
          },
        });
        setImages(images.filter((img) => img.img_id !== img_id));
      } catch (error) {
        console.error("Error deleting image:", error);
        alert("An error occurred while deleting the image.");
      }
    }
  };

  const closeModal = () => setSelectedImage(null);

  if (!images) return <div>Loading...</div>;

  return (
    <>
      <Navbar profileID={profileID} />
      <br />
      <Typography variant="h3" align="center" gutterBottom>
        Gallery
      </Typography>

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
                  onDelete={() => deleteImage(image.img_id)}
                  onClick={() => setSelectedImage(image.url)} // Set the selected image on click
                />
              ))}

            <Button
              onClick={handleOpen}
              style={{
                width: "250px",
                height: "250px",
                border: "1px solid #5A89F7",
              }}
            >
              +
            </Button>
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
          onClick={closeModal} // Close on overlay click
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
    </>
  );
}

export default Gallery;
