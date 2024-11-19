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
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import VisualSupportTypes from "../components/VisualSupportTypes.jsx";
import { PageWrapperStyle, Title, SupportsHeader, AddSupport, SharedAccordion } from "../Wrappers";

function Supports({ token }) {
  const { profileID } = useParams();
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState(null);
  const { notify } = useNotification();
  const [supportData, setSupportData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // For popup
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  // UseEffect to fetch user profiles Visual Supports from the Database
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

  // Filtered support data based on selected categories
  const filteredSupportData = supportData
    ? supportData.filter(
        (support) =>
          selectedCategories.length === 0 ||
          selectedCategories.includes(support.category)
      )
    : null;

  if (!images || !profileData) return <LoadingSpinner />;

  return (
    <>
      <Navbar profileID={profileID} />
      <PageWrapperStyle>
        <br />
        <SupportsHeader>
          <Title variant="h3" style={{ textAlign: "center" }}>
            <b>Visual Supports Gallery</b>
          </Title>
          <AddSupport onClick={handleClickOpen} variant="contained">
            + Add Visual Support
          </AddSupport>
        </SupportsHeader>
        <br />
        {/* Drop down menu where user can select filter categories */}
        <SharedAccordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel2-header"
          >
            <Typography variant="h6" sx={{ fontFamily: "Poppins" }}>
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
        <br />
        {/* Box containing user profiles Visual Support Templates */}
        <RecentSupportsBox
          profileData={profileData}
          supportData={filteredSupportData}
          token={token}
          setSupportData={setSupportData}
          title={`${profileData?.name || "Profile"}'s Supports`}
          noSupportMessage={noSupportMessage}
        />
        <br />
      </PageWrapperStyle>
      {/* Small window that opens when user clicks on Add Visual Support
          Users able to choose what type of visual support they want to make */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <VisualSupportTypes profileID={profileID} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Supports;
