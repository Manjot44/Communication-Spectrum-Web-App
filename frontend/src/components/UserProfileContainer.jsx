import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import UserProfileCircles from "../components/UserProfileCircles";
import ConfirmationModal from "../components/ConfirmationModal";
import ShareModal from "./ShareModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function UserProfileContainer({ token }) {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5005/get_clients", {
        headers: { Authorization: token },
      })
      .then((response) => setProfiles(response.data.clients))
      .catch((error) => console.error("Error fetching profiles:", error));
  }, [token]);

  const handleDelete = (userId) => {
    setUserIdToDelete(userId);
    setIsConfirmModalOpen(true);
  };

  const confirmDeleteProfile = async () => {
    try {
      await axios.delete(
        `http://localhost:5005/admin/delete_user/${userIdToDelete}`,
        {
          headers: { Authorization: token },
        }
      );
      setProfiles(
        profiles.filter((profile) => profile.user_id !== userIdToDelete)
      );
    } catch (error) {
      console.error("Error deleting profile:", error);
    } finally {
      setIsConfirmModalOpen(false);
      setUserIdToDelete(null);
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ display: "flex" }}
      >
        <div style={{ width: "85%" }}>
          <Grid container spacing={2}>
            {profiles.map((profile) => (
              <UserProfileCircles
                key={profile.user_id}
                profileName={profile.name}
                profilePicture={profile.profile_pic}
                profileID={profile.user_id}
                onDelete={() => handleDelete(profile.user_id)}
                onShare={() => setIsShareModalOpen(true)}
              />
            ))}
          </Grid>
        </div>
      </div>

      <ConfirmationModal
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDeleteProfile}
        message="Are you sure you want to delete this profile?"
        description="This action cannot be undone. The profile will be permanently deleted."
      />

      <ShareModal
        open={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        message="Share User Profile"
        description="Select Professional Accounts to Share to"
        token={token}
        profileType="Pro"
      />
    </>
  );
}

export default UserProfileContainer;
