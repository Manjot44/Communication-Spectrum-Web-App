import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../App.css";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNotification } from "../services/notificationService";
import RecentSupportsBox from "../components/RecentSupportsBox";
import CategorySelectCheckboxes from "../components/CategorySelectCheckboxes";
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { PageWrapperStyle, Title, SharedAccordion } from "../Wrappers";

function SharedTemplates ({ token, setTokenFunc }) {
	const { profileID } = useParams();
	const [supportData, setSupportData] = useState(null);
	const [profileData, setProfileData] = useState(null);
	const [images, setImages] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
	const { notify } = useNotification();

  // Message that pops up when there are no Visual Supports to Load
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

  // UseEffect to fetch Visual Supports from the Database (CHANGE TO PUBLIC TEMPLATES)
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
      <PageWrapperStyle>
        <br />
        <Title variant="h3">
          <b>Public Templates</b>
        </Title>
        {/* Drop down menu where user can select filter categories */}
        <SharedAccordion>
					<AccordionSummary
						expandIcon={<ArrowDownwardIcon />}
						aria-controls="panel1-content"
						id="panel2-header"
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
        </SharedAccordion>
				<br/>
        {/* Box with Publicly Shared Templates */}
				<RecentSupportsBox
					profileData={profileData}
					supportData={filteredSupportData}
					token={token}
					setSupportData={setSupportData}
          noSupportMessage={noSupportMessage}
				/>
				<br />
      </PageWrapperStyle>
    </>
  );
}

export default SharedTemplates;
