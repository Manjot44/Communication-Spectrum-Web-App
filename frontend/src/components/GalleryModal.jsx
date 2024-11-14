import React, { useState, useEffect, useContext } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import { useNotification } from "../services/notificationService";
import { useParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import GalleryPhotoComponent from "./GalleryPhotoComponent";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "63%",
  height: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  textAlign: "center",
};

function GalleryModal ({ open, onClose, onSelectImage }) {
	const { profileID } = useParams();
	const [images, setImages] = useState(null);
	const { notify } = useNotification();
	const { token } = useContext(AuthContext); // Access token from context

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
				console.log(images);
      } catch (err) {
        notify("Failed to fetch images.");
      }
    };
    fetchImages();
  }, [profileID, token, open, notify, images]);

	return (
		<>
			<Modal open={open} onClose={onClose}>
				<Box sx={modalStyle}>
					<Typography variant="h4" component="h2" gutterBottom>
						<b>{"Choose Image From Gallery"}</b>
					</Typography>
					<Grid container spacing={2} sx={{ overflowY: 'scroll', height: "70%" }}>
						{images &&
							images.map((image) => (
								<GalleryPhotoComponent
									key={image.img_id}
									image={image.url}
									onClick={() => onSelectImage(image.url)}
								/>
						))}
					</Grid>
					<Box sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}>
						<Button variant="outlined" onClick={onClose} sx={{ width: "150px" }}>
							Cancel
						</Button>
					</Box>
				</Box>
			</Modal>
		</>
	);
}

export default GalleryModal;
