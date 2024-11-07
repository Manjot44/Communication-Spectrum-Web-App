import React from "react";
import { Grid, Typography, Card } from "@mui/material";
import RecentSupports from "../components/RecentSupports.jsx";
import "../App.css";

function RecentSupportsBox({ profileData, supportData }) {
  return (
    <>
      <Card
        className="snapshot-style"
        style={{
          height: "700px",
          fontFamily: "Poppins",
          borderRadius: "15px",
          color: "#000CA4",
          padding: "20px", // Add padding to prevent card content from touching the edges
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
            overflowY: "auto", // Change to "auto" to show scrollbar only when needed
            height: "600px",
          }}
        >
          <Grid
            container
            spacing={2}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "stretch", // Ensures cards take up the full height of each grid cell
            }}
          >
            {supportData &&
              supportData.map((support) => (
                <Grid
                  item
                  key={support.support_id}
                  xs={12}
                  sm={6}
                  md={4} // Adjusts based on screen size
                  style={{ display: "flex" }} // Ensures cards grow within the grid cell
                >
                  <RecentSupports profileData={support} style={{ flex: 1 }} />
                </Grid>
              ))}
          </Grid>
        </div>
      </Card>
    </>
  );
}

export default RecentSupportsBox;
