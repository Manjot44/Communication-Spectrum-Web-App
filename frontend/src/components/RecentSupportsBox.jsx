import React, { useState, useMemo } from "react";
import { Grid, Typography, Card, TextField } from "@mui/material";
import RecentSupports from "../components/RecentSupports.jsx";
import "../App.css";
import LoadingSpinner from "./LoadingSpinner.jsx";
import axios from "axios";
import dayjs from 'dayjs';
import NotificationPopup from "../components/NotificationPopup";
import { useNavigate, useParams } from "react-router-dom";
import { getVisualSupportConfig } from "./VisualSupportConfig.jsx";

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

  const loadingMessage = profileData
    ? `Loading ${profileData.name}'s recent supports...`
    : "Loading recent supports...";

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
        <Typography
          variant="h6"
          style={{ marginBottom: "10px", fontFamily: "Poppins" }}
        >
          <b>{title}</b>
        </Typography>

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

        <div
          style={{
            overflowY: "auto",
            height: "600px",
            padding: "15px",
          }}
        >
          {filteredSupports.length === 0 ? (
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: "20px", color: "#666" }}
            >
              {noSupportMessage}
            </Typography>
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
        </div>
      </Card>

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
