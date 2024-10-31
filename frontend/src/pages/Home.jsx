import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import '../App.css'
import VisualSupportTypes from "../components/VisualSupportTypes.jsx";
import SupportSnapshot from "../components/SupportSnapshot.jsx";
import RecentSupports from "../components/RecentSupports.jsx";

function Home({ token, setTokenFunc }) {
  const { profileID } = useParams(); 
  const [profileData, setProfileData] = useState(null);
  const [supportData, setSupportData] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const profileResponse = await axios.get(`http://localhost:5005/get_client/${profileID}`, {
          headers: {
            Authorization: token,
          }
        });
        setProfileData(profileResponse.data.client);

        const supportResponse = await axios.get(`http://localhost:5005/get_client_support/${profileID}`, {
          headers: {
            Authorization: token,
          }
        });
        setSupportData(supportResponse.data.client);
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
            
            <Grid item xs={12} md={9} style={{ display: 'flex', flexDirection: 'column', overflowX: 'scroll', height: '75vh' }}>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>
                {profileData.name}'s Recent Supports
              </Typography>
              <Grid container spacing={2} style={{ display: 'flex', flexWrap: 'wrap' }}>
                {supportData && supportData.map((support) => (
                  <Grid item key={support.support_id} xs={12} sm={6} md={4}>
                    <RecentSupports profileData={support} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Home;
