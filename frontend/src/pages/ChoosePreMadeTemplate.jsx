import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Grid, Typography, Button, IconButton, Box, Card } from "@mui/material";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../App.css";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNotification } from "../services/notificationService";
import RecentSupportsBox from "../components/RecentSupportsBox";
import RecentSupports from "../components/RecentSupports";

function ChoosePreMadeTemplate ({ token, setTokenFunc }) {
	const { profileID } = useParams();
	const [supportData, setSupportData] = useState([]);
	const [profileData, setProfileData] = useState([]);
	const [images, setImages] = useState(null);
	const { notify, showNotification, notificationMessage } = useNotification();
  const { state } = useLocation(); // Comes from TemplateChoice.jsx
  const navigate = useNavigate();

  // Pretend this is the Pre-Made Template (ACTUAL DATA WILL COME FROM API REQUEST)
  const testSupport = { text: 'How to banana', image: 'https://media.istockphoto.com/id/619046500/photo/bananas.jpg?s=612x612&w=0&k=20&c=p5-v1iKwhOhw5cFjfx83qgaZcOBSVpUuicZi4VIGF2Y=', steps: [ { id: 1 }, { id: 2 }], stepImages: [null, null], stepNames: ["hey", "bob"], stepTimes: [null, null], category: '' }
  const supportType = { state: state.state, data: testSupport };

  // NEED TO FETCH PUBLIC TEMPLATES INSTEAD
	useEffect(() => {
    const fetchClient = async () => {
      try {
        const profileResponse = await axios.get(
          `http://localhost:5005/get_client/${profileID}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setProfileData(profileResponse.data.client);

        const supportResponse = await axios.get(
          `http://localhost:5005/get_client_support/${profileID}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setSupportData(supportResponse.data.client);
      } catch (err) {
        alert(err.response.data.error);
      }
    };

    fetchClient();
  }, [profileID, token]);
	
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
      } catch (err) {
        notify("Failed to fetch images.");
      }
    };
    fetchImages();
  }, [profileID, token, open, notify]);

  if (!images) return <LoadingSpinner />;

  return (
    <>
      <Navbar profileID={profileID} />
      <div className="page-wrapper-style">
        <br />
				<br />
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Poppins",
              color: "#000CA4",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              width: '100%'
            }}
          >
            <b>Choose Pre-Made {state.type}</b>
          </Typography>
        </Box>
				<br />
				<br/>
        <Card
          className="snapshot-style"
          style={{
            height: "700px",
            fontFamily: "Poppins",
            borderRadius: "15px",
            color: "#000CA4",
            padding: "20px",
          }}
        >
          <div
            style={{
              overflowY: "auto",
              height: "600px",
              padding: "15px",
            }}
          >
            <Grid container spacing={2} alignItems="stretch">
              {supportData.map((support) => (
                <Grid item key={support.support_id} xs={12} sm={6} md={4}>
                  <RecentSupports
                    profileData={support}
                    token={token}
                    onClick={async () => {navigate(state.state.temp, { state: supportType } )}}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </Card>
				<br />
      </div>
    </>
  );
}

export default ChoosePreMadeTemplate;
