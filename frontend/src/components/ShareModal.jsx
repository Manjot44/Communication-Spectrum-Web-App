import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import ProfileBox from "./ProfileBox";

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

function ShareModal({ open, onClose, onConfirm, message, description, token }) {
	const [profiles, setProfileData] = useState([]);

	useEffect(() => {
    // Fetch the profiles when the component mounts
    axios
      .get("http://localhost:5005/get_clients", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setProfileData(response.data.clients);
      })
      .catch((error) => {
        console.error(
          "Error fetching profiles:",
          error.response ? error.response.data : error.message
        );
      });
  }, [token]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h4" component="h2" gutterBottom>
          <b>{message || "Are you sure you want to proceed?"}</b>
        </Typography>

        {/* Render description if provided */}
        {description && (
          <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
            <b>{description}</b>
          </Typography>
        )}
				<br />
				<Grid container spacing={2} sx={{ overflowY: 'scroll', height: "70%" }}>
					{profiles &&
						profiles.map((profile) => (
							<div
								style={{ display: "flex", alignItems: "center" }}
								key={profile.user_id}
							>
								<ProfileBox
									profileName={profile.name}
									profilePicture={profile.profile_pic}
									profileID={profile.user_id}
								/>
							</div>
					))}
				</Grid>

        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}>
          <Button
            variant="contained"
            color="success"
            onClick={onConfirm}
            sx={{ width: "100px" }}
          >
            Share
          </Button>
          <Button variant="outlined" onClick={onClose} sx={{ width: "100px" }}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ShareModal;
