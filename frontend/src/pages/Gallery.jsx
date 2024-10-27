import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid2, Typography, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import GalleryPhotoComponent from "../components/GalleryPhotoComponent";
import axios from "axios";
import AddPhotoModal from "../components/AddPhotoModal";

function Gallery({ token, setTokenFunc }) {
  const { profileID } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [image, setImage] = useState("");
  const [images, setImages] = useState(null);

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

  // Remove background from image
  const removeBackground = async (img_id, img_url) => {
    try {
      const response = await axios.post(
        `http://localhost:5005/remove-background`,
        { base64Image: img_url },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const updatedImage = response.data.base64Image;

      // Update image URL in state
      setImages((prevImages) =>
        prevImages.map((img) =>
          img.img_id === img_id ? { ...img, url: updatedImage } : img
        )
      );

      alert("Background removed successfully.");
    } catch (error) {
      console.error("Error removing background:", error);
      alert("An error occurred while removing the background.");
    }
  };

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

      <div class="d-flex justify-content-center" style={{ display: "flex" }}>
        <div style={{ width: "85%" }}>
          <Grid2 container spacing={2}>
            {images &&
              images.map((image) => (
                <GalleryPhotoComponent
                  key={image.img_id}
                  image={image.url}
                  onDelete={() => deleteImage(image.img_id)}
                  onRemoveBackground={() =>
                    removeBackground(image.img_id, image.url)
                  }
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
          </Grid2>
        </div>
      </div>
    </>
  );
}

export default Gallery;
