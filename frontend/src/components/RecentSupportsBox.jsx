import React, { useState, useMemo } from "react";
import { Grid, TextField } from "@mui/material";
import RecentSupports from "../components/RecentSupports.jsx";
import "../App.css";
import LoadingSpinner from "./LoadingSpinner.jsx";
import axios from "axios";
import dayjs from 'dayjs';
import NotificationPopup from "../components/NotificationPopup";
import { useNavigate, useParams } from "react-router-dom";
import { getVisualSupportConfig } from "./VisualSupportConfig.jsx";
import { SnapShotStyleCard, Title, InnerSnapShotBox, NoSupportsTypography } from "../Wrappers.jsx";

function RecentSupportsBox({
  profileData,
  supportData,
  token,
  setSupportData,
  title,
  noSupportMessage,
}) {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { profileID } = useParams();

  // Select message to load
  // Will load up message if user profile has 0 Visual Supports
  const loadingMessage = profileData
    ? `Loading ${profileData.name}'s recent supports...`
    : "Loading recent supports...";

  // API Request to delete a Visual Support
  const handleDeleteSupport = async (supportId) => {
    try {
      await axios.delete(`http://localhost:5005/delete_support/${supportId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSupportData((prevData) =>
        prevData.filter((support) => support.support_id !== supportId)
      );

      setNotificationMessage("Support has been deleted successfully.");
      setShowNotification(true);
    } catch (error) {
      console.error("Error deleting support:", error);
    }
  };

  const handleSupportClick = async (support) => {
    try {
      const timestamp = dayjs().format("YYYY-MM-DD HH:mm:ss");
      await axios.put(
        `http://localhost:5005/new_timestamp/${profileID}/${support.support_id}`, 
        { timestamp },
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const passInData = { 
        state: getVisualSupportConfig(support.type), 
        data: {...support, isMade: true} 
      };
  
      console.log(passInData)
      if (support.type === "Weekly Calendar") {
        navigate(`/weeklycalendars/${profileID}`, { state: passInData } )
      }
      else if (support.type === "First-Then") {
        navigate(`/firstthen/${profileID}`, { state: passInData })
      }
      else {
        navigate(`/stepsupport/${profileID}`, { state: passInData })
      }
    } catch (error) {
      console.error("Error deleting support:", error);
    }
    
    
  };

  // Function to filter out the Visual Supports.
  // Called when the user either types something in the search box
  // Or clicks on the category checkboxes
  const filteredSupports = useMemo(() => {
    if (!supportData) return [];
    if (!searchQuery) return supportData;
    const lowerCaseQuery = searchQuery.toLowerCase();

    return supportData.filter((support) => {
      const titleMatches = support.title
        ? support.title.toLowerCase().includes(lowerCaseQuery)
        : false;
      const tagsMatch =
        support.tags &&
        support.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery));

      return titleMatches || tagsMatch;
    });
  }, [supportData, searchQuery]);

  if (!profileData || !supportData) {
    return <LoadingSpinner message={loadingMessage} />;
  }

  return (
    <>
      <SnapShotStyleCard>
        <Title variant="h6" sx={{ textAlign: "left" }}>
          <b>{title}</b>
        </Title>

        {/* Search Input */}
        <TextField
          placeholder="Search visual supports"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            marginBottom: "20px",
          }}
        />

        {/* Box containing the recent support cards
            clicking on them will redirect to the viewing page */}
        <InnerSnapShotBox>
          {filteredSupports.length === 0 ? (
            <NoSupportsTypography variant="body1">
              {noSupportMessage}
            </NoSupportsTypography>
          ) : (
            <Grid container spacing={2} alignItems="stretch">
              {filteredSupports.map((support) => (
                <Grid item key={support.support_id} xs={12} sm={6} md={4}>
                  <RecentSupports
                    profileData={support}
                    token={token}
                    onDelete={handleDeleteSupport}
                    onClick={async () => handleSupportClick(support)}
                    showIcons={true}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </InnerSnapShotBox>
      </SnapShotStyleCard>

      {/* Notification Popup when the user profile has been changed */}
      {showNotification && (
        <NotificationPopup
          message={notificationMessage}
          duration={5000}
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
  );
}

export default RecentSupportsBox;
