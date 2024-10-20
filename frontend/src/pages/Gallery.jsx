import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid2, Typography, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import GalleryPhotoComponent from "../components/GalleryPhotoComponent";
import axios from 'axios';
import AddPhotoModal from "../components/AddPhotoModal";

function Gallery({ token, setTokenFunc }) {
  const { profileID } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);

  // Refreshes page when new image is added
  function refreshPage() {
    window.location.reload();
  }

  // Handle the display of images
  useEffect(() => {
    axios.get(`http://localhost:5005/get_images/${profileID}`, {
        headers: {
            Authorization: token,
        }
    }).then((response) => {
        setImages(response.data.images);
    }).catch((error) => {
        console.error('Error fetching images:', error.response ? error.response.data : error.message);
    });
  }, [profileID, token, open]);

  const addImage = async () => {
    try {
      await axios.post(`http://localhost:5005/add_image/${profileID}`, {
        image
      },
      {
        headers: {
          Authorization: token,
        }
      });
      alert('Image added successfully');
      refreshPage();
    } catch (error) {
        console.error('Error adding image:', error);
        alert('An error occurred while adding the image.');
    }
  }

  return (
    <>
      <Navbar profileID={profileID}/>
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
      
      <div class='d-flex justify-content-center' style={{ display:'flex' }} >
        <div style={{ width:'85%'}} >
          <Grid2 container spacing={2}>
            
            {images && images.map(image => (
                <GalleryPhotoComponent
                  key={image.img_id}
                  image={image.url}>
                </GalleryPhotoComponent>
            ))}
            
            <Button
              onClick={handleOpen}
              style={{
                width: '250px',
                height: '250px',
                border: '1px solid #5A89F7'
              }}>
              +
            </Button>
          </Grid2>
        </div>
      </div>
    </>
  );
}

export default Gallery;
