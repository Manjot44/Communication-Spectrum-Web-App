import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  Typography,
  Button,
  TextField,
  Avatar,
} from "@mui/material";
import Navbar from "../components/Navbar";
import '../App.css'
import VisualSupportTypes from "../components/VisualSupportTypes.jsx";
import SupportSnapshot from "../components/SupportSnapshot.jsx";
import RecentSupports from "../components/RecentSupports.jsx";

function Home({ token, setTokenFunc }) {
  const { profileID } = useParams(); 
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/get_client/${profileID}`, {
          headers: {
            Authorization: token,
          }
        });
        setProfileData(response.data.client);
      } catch (err) {
        alert(err.response.data.error);
      }
    };
  
    fetchClient();
  }, [profileID, token, open]);

  if (!profileData) return <div>Loading...</div>;
  
  return (
    <>
      <Navbar profileID={profileID}/>
      <br />
      <div class='page-wrapper-style'>
        <Typography variant="h3" align="center" gutterBottom>
          Client Portal
        </Typography>
        <VisualSupportTypes profileID={profileID} />
        <Grid
            container
            spacing={2}
            style={{ marginTop: "20px" }}
            justifyContent="center"
        >
            <SupportSnapshot profileData={profileData}/>
            <RecentSupports profileData={profileData}/>
        </Grid>
      </div>
    </>
  );
}

export default Home;
