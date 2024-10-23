import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import UserProfileCircles from "../components/UserProfileCircles";
import "bootstrap/dist/css/bootstrap.min.css";

function UserProfileContainer({ token }) {
  const navigate = useNavigate();
  const [profiles, setProfileData] = React.useState([]);

  React.useEffect(() => {
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

  // Function to handle deletion of a profile
  const handleDelete = (userId) => {
    // Confirm before deletion
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this profile?"
    );
    if (confirmDelete) {
      // Send DELETE request to the backend
      axios
        .delete(`http://localhost:5005/admin/delete_user/${userId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(`Profile with ID: ${userId} deleted successfully`);
          // Remove the deleted profile from the UI
          setProfileData(
            profiles.filter((profile) => profile.user_id !== userId)
          );
        })
        .catch((error) => {
          console.error("Error deleting profile:", error);
        });
    }
  };

  // Navigate to the AddUser page
  const handleAddUser = () => {
    navigate("/AddUser");
  };

  return (
    <>
      <div class="d-flex justify-content-center" style={{ display: "flex" }}>
        <div style={{ width: "85%" }}>
          <Grid container spacing={2}>
            {profiles &&
              profiles.map((profile) => (
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  key={profile.user_id}
                >
                  <UserProfileCircles
                    profileName={profile.name}
                    profilePicture={profile.profile_pic}
                    profileID={profile.user_id}
                  />
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(profile.user_id)}
                    style={{ marginLeft: "10px", color: "red" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
            <Button
              onClick={handleAddUser}
              style={{
                width: "200px",
                height: "200px",
                border: "1px solid #26C3BA",
                fontSize: "2rem",
                backgroundColor: "#26C3BA",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              +
            </Button>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default UserProfileContainer;
