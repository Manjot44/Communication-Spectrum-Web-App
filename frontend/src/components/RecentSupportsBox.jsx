import React, { useState } from "react";
import { Grid, Typography, Card } from "@mui/material";
import RecentSupports from "../components/RecentSupports.jsx";
import "../App.css";
import LoadingSpinner from "./LoadingSpinner.jsx";
import axios from "axios";
import NotificationPopup from "../components/NotificationPopup";
import { useNavigate, useParams } from "react-router-dom";

function RecentSupportsBox({
  profileData,
  supportData,
  token,
  setSupportData,
  title,
  noSupportMessage, // Add the noSupportMessage prop
}) {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
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
        <div
          style={{
            overflowY: "auto",
            height: "600px",
            padding: "15px",
          }}
        >
          {supportData.length === 0 ? ( // Check if there are no supports
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: "20px", color: "#666" }}
            >
              {noSupportMessage} {/* Display the specific message here */}
            </Typography>
          ) : (
            <Grid container spacing={2} alignItems="stretch">
              {supportData.map((support) => (
                <Grid item key={support.support_id} xs={12} sm={6} md={4}>
                  <RecentSupports
                    profileData={support}
                    token={token}
                    onDelete={handleDeleteSupport}
                    onClick={async () => {
                      navigate(
                        `/viewsupport/${profileID}/${support.support_id}`
                      );
                    }}
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
