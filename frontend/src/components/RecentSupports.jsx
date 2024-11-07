import React from "react";
import { Card, Typography } from "@mui/material";
import "../App.css";

function RecentSupports({ profileData }) {
  return (
    <Card
      className="recent-supports-style"
      style={{
        width: "100%", // Use 100% width to fit the container
        padding: "10px",
        textAlign: "center",
      }}
    >
      {/* Image container with a fixed aspect ratio */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "56.25%", // 16:9 aspect ratio (adjust this if needed)
          overflow: "hidden",
          borderRadius: "10px",
        }}
      >
        {profileData.title_img && (
          <img
            src={profileData.title_img}
            alt={profileData.title}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        )}
      </div>

      <Typography
        variant="body1"
        style={{ marginTop: "10px", fontSize: "1.2rem" }}
      >
        {profileData.title}
      </Typography>
    </Card>
  );
}

export default RecentSupports;
