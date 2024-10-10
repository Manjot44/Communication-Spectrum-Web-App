import React from "react";
import {
  Grid2,
  Card,
  Typography,
  Button,
  TextField,
  Avatar,
  Box
} from "@mui/material";
import {
  Task,
  CalendarViewDay,
  CalendarViewWeek,
  Group,
  Warning,
  Checklist,
  CheckBox,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserProfileCircles from "../components/UserProfileCircles";
import GalleryPhotoComponent from "../components/GalleryPhotoComponent";
import Grid from "@mui/material/Grid";
import Modal from '@mui/material/Modal';
import axios from 'axios';


function Gallery({ token, setTokenFunc }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [profilePicture, setProfilePicture] = React.useState('');
  const [profiles, setProfileData] = React.useState([]);
  const navigate = useNavigate();

  // Handle profile picture upload
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        setProfilePicture(reader.result);  // Store base64 image
    };
    if (file) {
        reader.readAsDataURL(file);  // Convert to base64
    }
  };

  // Sort out upload button
  const handleUpload = () => {
    addImage();
    handleClose();
  }

  // Handle the display of images
  React.useEffect(() => {
    axios.get('http://localhost:5005/store', {
        headers: {
            Authorization: token,
        }
    }).then((response) => {
        setProfileData(response.data.store.Photos);
        console.log(response.data.store)
    }).catch((error) => {
        console.log(token);
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
      navigate('/home');
      navigate('/gallery');
    } catch (error) {
        console.error('Error creating user:', error);
        alert('An error occurred while creating the user.');
    }
  }

  return (
    <>
      <div style={{ paddingBottom: "20px" }}>
        <Navbar />
      </div>
      <Typography variant="h3" align="center" gutterBottom>
        Gallery
      </Typography>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload a Photo
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
            <br/>
            <Button onClick={handleUpload}>Upload</Button>
          </Typography>
        </Box>
      </Modal>
      
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

// Styles
const pageWrapperStyle = {
  padding: "0 120px", // padding of the page left and right space
};

const circularIconStyle = {
  backgroundColor: "#6C63FF",
  borderRadius: "50%",
  width: "80px",
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  margin: "0 auto",
};

const snapshotStyle = {
  padding: "20px",
  minHeight: "390px", // match the height of support
  backgroundColor: "#f0f0f0",
};

const recentSupportsStyle = {
  padding: "20px",
  marginBottom: "20px",
  backgroundColor: "#f9f9f9",
};

const supportCardStyle = {
  backgroundColor: "orange",
  height: "150px",
};

const searchRecentSupportsStyle = {
  padding: "20px",
  backgroundColor: "#f9f9f9",
};

const avatarStyle = {
  width: "100px",
  height: "100px",
  margin: "0 auto",
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default Gallery;
