import React, { useState } from "react";
import { Grid, Typography, Card } from "@mui/material";
import RecentSupports from "../components/RecentSupports.jsx";
import "../App.css";
import LoadingSpinner from "./LoadingSpinner.jsx";
import axios from "axios";
import NotificationPopup from "../components/NotificationPopup"; // Import your notification component
import { useNavigate, useParams } from "react-router-dom";

function RecentSupportsBox({
  profileData,
  supportData,
  token,
  setSupportData,
  title
}) {
  const [showNotification, setShowNotification] = useState(false); // State to control notification visibility
  const [notificationMessage, setNotificationMessage] = useState(""); // State for the notification message
  const navigate = useNavigate();
  const { profileID } = useParams();

  const loadingMessage = profileData
    ? `Loading ${profileData.name}'s recent supports...`
    : "Loading recent supports...";

  // Handle the deletion of a support item
  const handleDeleteSupport = async (supportId) => {
    try {
      await axios.delete(`http://localhost:5005/delete_support/${supportId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the supportData state by removing the deleted item
      setSupportData((prevData) =>
        prevData.filter((support) => support.support_id !== supportId)
      );

      // Show success notification
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
              {profileData.name} has no recent supports. Create some!
            </Typography>
          ) : (
            <Grid container spacing={2} alignItems="stretch">
              {supportData.map((support) => (
                <Grid item key={support.support_id} xs={12} sm={6} md={4}>
                  <RecentSupports
                    profileData={support}
                    token={token}
                    onDelete={handleDeleteSupport} // Pass the delete handler
                    onClick={async () => {navigate(`/viewsupport/${profileID}/${support.support_id}`)}}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </Card>

      {/* Notification Popup */}
      {showNotification && (
        <NotificationPopup
          message={notificationMessage}
          duration={5000} // Show for 5 seconds
          onClose={() => setShowNotification(false)} // Close the notification after it expires
        />
      )}
    </>
  );
}

export default RecentSupportsBox;
