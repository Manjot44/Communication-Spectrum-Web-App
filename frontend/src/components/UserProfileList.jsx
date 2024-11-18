import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  ListItemAvatar,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IosShareIcon from "@mui/icons-material/IosShare";
import ConfirmationModal from "../components/ConfirmationModal";
import ShareModal from "../components/ShareModal";
import { useNavigate } from "react-router-dom";

function UserProfileList({ token }) {
  const [profiles, setProfiles] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userNameToDelete, setUserNameToDelete] = useState(""); // Store the profile name
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5005/get_clients", {
        headers: { Authorization: token },
      })
      .then((response) => setProfiles(response.data.clients))
      .catch((error) => console.error("Error fetching profiles:", error));
  }, [token]);

  const handleDelete = (userId, userName) => {
    setUserIdToDelete(userId);
    setUserNameToDelete(userName); // Set the profile name for the modal message
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
      setUserNameToDelete("");
    }
  };

  return (
    <>
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        mt={3}
      >
        <List
          sx={{
            width: "60%",
            bgcolor: "background.paper",
            borderRadius: "8px",
          }}
        >
          {profiles.map((profile) => (
            <Paper
              key={profile.user_id}
              elevation={2}
              onClick={() => navigate(`/home/${profile.user_id}`)}
              sx={{
                borderRadius: "12px",
                mb: 2,
                overflow: "hidden",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 4px 15px rgba(0, 112, 255, 0.5)",
                },
              }}
            >
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={profile.profile_pic}
                    alt={profile.name}
                    sx={{ width: 48, height: 48 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={profile.name}
                  primaryTypographyProps={{
                    variant: "h6",
                    color: "textPrimary",
                    fontWeight: "500",
                  }}
                />
                <Box display="flex" alignItems="center">
                  <IconButton
                    onClick={() => handleDelete(profile.user_id, profile.name)} // Pass name to handleDelete
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => setIsShareModalOpen(true)}
                    color="primary"
                  >
                    <IosShareIcon />
                  </IconButton>
                </Box>
              </ListItem>
            </Paper>
          ))}
        </List>
      </Box>

      <ConfirmationModal
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDeleteProfile}
        message={`Are you sure you want to delete ${userNameToDelete}'s profile?`}
        description="This action cannot be undone."
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

export default UserProfileList;
