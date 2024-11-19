import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../App.css";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNotification } from "../services/notificationService";
import RecentSupports from "../components/RecentSupports";
import { Title, PageWrapperStyle, SnapShotStyleCard, InnerSnapShotBox } from "../Wrappers.jsx";

function ChoosePreMadeTemplate ({ token, setTokenFunc }) {
  const { profileID } = useParams();
	const { notify } = useNotification();
  const { state } = useLocation(); // Comes from TemplateChoice.jsx
  const navigate = useNavigate();

  // Visual Support Data
  const [supportData, setSupportData] = useState([]);
	const [images, setImages] = useState(null);

  // Pretend this is the Pre-Made Template (ACTUAL DATA WILL COME FROM API REQUEST)
  const testSupport = { text: 'How to banana', image: 'https://media.istockphoto.com/id/619046500/photo/bananas.jpg?s=612x612&w=0&k=20&c=p5-v1iKwhOhw5cFjfx83qgaZcOBSVpUuicZi4VIGF2Y=', steps: [ { id: 1 }, { id: 2 }], stepImages: [null, null], stepNames: ["hey", "bob"], stepTimes: [null, null], category: '' }
  const supportType = { state: state.state, data: testSupport };

  // NEED TO FETCH PUBLIC TEMPLATES INSTEAD
	useEffect(() => {
    const fetchClient = async () => {
      try {
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
	
	// API REQUEST to Fetch images
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
  }, [profileID, token, notify]);

  if (!images) return <LoadingSpinner />;

  return (
    <>
      <Navbar profileID={profileID} />
      <PageWrapperStyle>
        <br />
          <Title variant="h3" align="center" gutterBottom>
            <b>Choose Pre-Made {state.type}</b>
          </Title>
				<br/>
        <SnapShotStyleCard>
          <InnerSnapShotBox>
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
          </InnerSnapShotBox>
        </SnapShotStyleCard>
				<br />
      </PageWrapperStyle>
    </>
  );
}

export default ChoosePreMadeTemplate;
