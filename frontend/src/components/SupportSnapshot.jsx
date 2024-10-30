import React, { useState, useEffect } from "react";
import {
	Grid,
  Card,
  Typography,
  Button,
  TextField,
  Avatar,
} from "@mui/material";

const avatarStyle = {
  width: "100px",
  height: "100px",
  margin: "0 auto",
};

function SupportSnapshot ({ profileData }) {
	return (
		<>
			<Grid item xs={12} md={3}>
				<Card class='snapshot-style' style={{ height: '700px' }}>
					{/* Add avatar and name */}
					<div style={{ textAlign: "center", marginBottom: "20px" }}>
						<Avatar
							alt={profileData.name}
							src={profileData.profile_pic}
							style={avatarStyle}
						/>
						<Typography variant="h6" style={{ marginTop: "10px" }}>
							{profileData.name}
						</Typography>
					</div>

					<Typography variant="h6">
						Support Snapshot
					</Typography>

					<Typography variant="body1">
						{profileData.snapshot}
					</Typography>

					<Typography variant="h6" style={{ marginTop: "25px" }}>
						Interests
					</Typography>

					<Typography variant="body1">
						{profileData.interests}
					</Typography>

					<Typography variant="h6" style={{ marginTop: "25px" }}>
						Key Environments
					</Typography>

					<Typography variant="body1">
						{profileData.comm_env}
					</Typography>

					<br/>

					{/* Search Recent Supports */}
					<Card class='search-recent-supports-style'>
						<Typography variant="h6">Search recent supports</Typography>
						<TextField
							label="Search"
							variant="outlined"
							fullWidth
							style={{
								marginBottom: "20px",
							}}
						/>
					</Card>

				</Card>
      </Grid>
		</>
	);
}

export default SupportSnapshot;
