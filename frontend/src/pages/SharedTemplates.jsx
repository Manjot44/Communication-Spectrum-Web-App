import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../App.css";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNotification } from "../services/notificationService";
import RecentSupportsBox from "../components/RecentSupportsBox";
import CategorySelectCheckboxes from "../components/CategorySelectCheckboxes";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function SharedTemplates ({ token, setTokenFunc }) {
	const { profileID } = useParams();
	const [supportData, setSupportData] = useState(null);
	const [profileData, setProfileData] = useState(null);
	const [images, setImages] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
	const { notify } = useNotification();

  const noSupportMessage =
    selectedCategories.length > 0
      ? `${
          profileData?.name || "This profile"
        } has no supports in the selected categories. Create some!`
      : `${
          profileData?.name || "This profile"
        } has no recent supports. Create some!`;

  const handleCategoryChange = (category, isSelected) => {
    setSelectedCategories((prevSelected) =>
      isSelected
        ? [...prevSelected, category]
        : prevSelected.filter((item) => item !== category)
    );
  };

  // Filtered support data based on selected categories
  const filteredSupportData = supportData
    ? supportData.filter(
        (support) =>
          selectedCategories.length === 0 ||
          selectedCategories.includes(support.category)
      )
    : null;

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
  }, [profileID, token, notify]);

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
            }}
          >
            <b>Public Templates</b>
          </Typography>
        </Box>
				<br />
				<br />
				<Accordion sx={{ borderRadius: '15px', fontFamily: 'Poppins', border: 'none', color: '#000CA4' }}>
					<AccordionSummary
						expandIcon={<ArrowDownwardIcon />}
						aria-controls="panel1-content"
						id="panel2-header"
						style={{ border: "none" }}
					>
						<Typography variant="h6">
							<b>Filter by Category</b>
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							<CategorySelectCheckboxes
                handleCategoryChange={handleCategoryChange}
							/>
						</Typography>
					</AccordionDetails>
				</Accordion>
				<br/>
				<RecentSupportsBox
					profileData={profileData}
					supportData={filteredSupportData}
					token={token}
					setSupportData={setSupportData}
          noSupportMessage={noSupportMessage}
				/>
				<br />
      </div>
    </>
  );
}

export default SharedTemplates;
