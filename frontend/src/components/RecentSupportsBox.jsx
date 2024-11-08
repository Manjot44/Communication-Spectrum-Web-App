import React, { useState } from "react";
import { Grid, Typography, Card } from "@mui/material";
import RecentSupports from "../components/RecentSupports.jsx";
import "../App.css";
import LoadingSpinner from "./LoadingSpinner.jsx";
import axios from "axios";

function RecentSupportsBox({
  profileData,
  supportData,
  token,
  setSupportData,
}) {
  const loadingMessage = profileData
    ? `Loading ${profileData.name}'s recent supports...`
    : "Loading recent supports...";

  // Handle the deletion of a support item
  const handleDeleteSupport = async (supportId) => {
    try {
      await axios.delete(`http://localhost:5005/delete_support/${supportId}`, {
        headers: {
          Authorization: token,
        },
      });
      // Update the supportData state by removing the deleted item
      setSupportData((prevData) =>
        prevData.filter((support) => support.support_id !== supportId)
      );
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
          <b>{profileData.name}'s Recent Supports</b>
        </Typography>
        <div
          style={{
            overflowY: "auto",
            height: "600px",
          }}
        >
          <Grid container spacing={2} alignItems="stretch">
            {supportData &&
              supportData.map((support) => (
                <Grid item key={support.support_id} xs={12} sm={6} md={4}>
                  <RecentSupports
                    profileData={support}
                    token={token}
                    onDelete={handleDeleteSupport} // Pass the delete handler
                  />
                </Grid>
              ))}
          </Grid>
        </div>
      </Card>
    </>
  );
}

export default RecentSupportsBox;
