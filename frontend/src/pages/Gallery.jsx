import React from "react";
import { Grid2, Typography, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import GalleryPhotoComponent from "../components/GalleryPhotoComponent";
import axios from 'axios';
import AddPhotoModal from "../components/AddPhotoModal";

function Gallery({ token, setTokenFunc }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [profilePicture, setProfilePicture] = React.useState('');
  const [profiles, setProfileData] = React.useState([]);

  // Refreshes page when new image is added
  function refreshPage() {
    window.location.reload();
  }

  // Handle the display of images
  React.useEffect(() => {
    axios.get('http://localhost:5005/store', {
        headers: {
            Authorization: token,
        }
    }).then((response) => {
        setProfileData(response.data.store.Photos);
    }).catch((error) => {
        console.error('Error fetching profiles:', error.response ? error.response.data : error.message);
    });
  }, [open]);

  let currentData = '';  // Variable to store existing data (if needed)
  const addImage = async () => {
    try {
      // Fetch existing store data
      const response = await axios.get('http://localhost:5005/store', {
          headers: {
              Authorization: token,
          },
      });

      currentData = response.data.store;  // Get existing data from the response
      
      // Make new ids for the user profiles
      const dictLength = Object.keys(currentData.Photos).length;
      let newId = 1
      if (dictLength !== 0) {
          const keysArray = Object.keys(currentData.Photos);
          newId = parseInt(keysArray[keysArray.length - 1]) + 1;
      }
      
      const store = {
        ...currentData,
        Profile: {
          ...currentData.Profile,
        },
        Users: {
          ...currentData.Users,
        },
        Photos: {
          ...currentData.Photos,
            [newId]: {
              link: profilePicture
            }
        }
      };

      // Send the updated data back to the server
      await axios.put('http://localhost:5005/store', 
          { store },  // Send the merged store data
          { headers: { Authorization: token } }
      );

      alert('Image added successfully');
      refreshPage();
    } catch (error) {
        console.error('Error creating user:', error);
        alert('An error occurred while creating the user.');
    }
  }

  return (
    <>
      <Navbar />
      <br />
      <Typography variant="h3" align="center" gutterBottom>
        Gallery
      </Typography>

      <AddPhotoModal 
        open={open}
        handleClose={handleClose}
        handleProfilePictureUpload={(pic) => setProfilePicture(pic)}
        handleUpload={addImage}
      />
      
      <div class='d-flex justify-content-center' style={{ display:'flex' }} >
        <div style={{ width:'85%'}} >
          <Grid2 container spacing={2}>
            
            {profiles && Object.entries(profiles).map(profile => (
                <GalleryPhotoComponent
                  profileName={""}
                  profilePicture={profile[1].link}>
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
