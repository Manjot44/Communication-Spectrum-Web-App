import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UserProfileCircles from "../components/UserProfileCircles";
import ConfirmationModal from "../components/ConfirmationModal"; // Import the ConfirmationModal
import IosShareIcon from '@mui/icons-material/IosShare';
import ShareModal from "./ShareModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function UserProfileContainer({ token }) {
  const navigate = useNavigate();
  const [profiles, setProfileData] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // State to control confirm modal
  const [userIdToDelete, setUserIdToDelete] = useState(null); // State to store the user ID for deletion
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

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

  // Function to open the confirmation modal for deleting a profile
  const handleDelete = (userId) => {
    setUserIdToDelete(userId); // Set the user ID to be deleted
    setIsConfirmModalOpen(true); // Open the confirmation modal
  };

  // Function to confirm and delete the profile
  const confirmDeleteProfile = async () => {
    try {
      await axios.delete(
        `http://localhost:5005/admin/delete_user/${userIdToDelete}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(`Profile with ID: ${userIdToDelete} deleted successfully`);
      // Remove the deleted profile from the UI
      setProfileData(
        profiles.filter((profile) => profile.user_id !== userIdToDelete)
      );
    } catch (error) {
      console.error("Error deleting profile:", error);
    } finally {
      setIsConfirmModalOpen(false); // Close the modal
      setUserIdToDelete(null); // Reset the user ID
    }
  };

  // Navigate to the AddUser page
  const handleAddUser = () => {
    navigate("/AddUser");
  };

  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ display: "flex" }}
      >
        <div style={{ width: "85%" }}>
          <Grid container spacing={2}>
            {profiles &&
              profiles.map((profile) => (
                <div
                  style={{ display: "flex", alignItems: "center", marginRight: '35px' }}
                  key={profile.user_id}
                >
                  
                  <Grid container spacing={0}>
                    <Grid item>
                      <UserProfileCircles
                        profileName={profile.name}
                        profilePicture={profile.profile_pic}
                        profileID={profile.user_id}
                      />
                    </Grid>
                    <Grid item>
                      <Grid container direction="column">
                        <Grid item>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDelete(profile.user_id)} // Trigger custom delete modal
                            style={{ color: "red" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <IconButton
                            aria-label="delete"
                            onClick={() => setIsShareModalOpen(true)} // Trigger custom delete modal
                          >
                            <IosShareIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              ))}
            <Button onClick={handleAddUser} className="add-user-button">
              +
            </Button>
          </Grid>
        </div>
      </div>

      {/* Confirmation Modal for Deletion */}
      <ConfirmationModal
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)} // Close modal on cancel
        onConfirm={confirmDeleteProfile} // Confirm delete action
        message="Are you sure you want to delete this profile?"
        description="This action cannot be undone. The profile will be permanently deleted."
      />

      <ShareModal
        open={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)} // Close modal on cancel
        message="Share User Profile"
        description="Select Professional Accounts to Share to"
        token={token}
        profileType={'Pro'}
      />
    </>
  );
}

export default UserProfileContainer;
