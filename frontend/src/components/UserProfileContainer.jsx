import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import UserProfileCircles from "../components/UserProfileCircles";
import "bootstrap/dist/css/bootstrap.min.css";

function UserProfileContainer({ token, setTokenFunc }) {
  const navigate = useNavigate();
  const [profiles, setProfileData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:5005/store", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setProfileData(response.data.store.Users);
      })
      .catch((error) => {
        console.error(
          "Error fetching profiles:",
          error.response ? error.response.data : error.message
        );
      });
  }, [token]);

  // Navigate to the AddUser page
  const handleAddUser = () => {
      navigate('/AddUser');
  };

  return (
    <>
      <div class='d-flex justify-content-center' style={{ display:'flex' }} >
        <div style={{ width:'85%'}} >
          <Grid container spacing={2}>
              {profiles && Object.entries(profiles).map(profile => (
                <UserProfileCircles
                  profileName={profile[1].name}
                  profilePicture={profile[1].profilePicture}>
                </UserProfileCircles>
              ))}
              <Button
                onClick={handleAddUser}
                style={{
                  width: '200px',
                  height: '200px',
                  border: "1px solid #26C3BA",
                  fontSize: '2rem',
                  backgroundColor: '#26C3BA',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                +
              </Button>
          </Grid>
        </div>
      </div>
  </>
  );
}

export default UserProfileContainer;
