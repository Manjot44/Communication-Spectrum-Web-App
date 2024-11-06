import React from "react";
import {
  Grid,
  Typography,
  Card
} from "@mui/material";
import RecentSupports from "../components/RecentSupports.jsx";
import "../App.css";

function RecentSupportsBox({ profileData, supportData }) {
	return (
		<>
			<Card className="snapshot-style" style={{ height: "700px", fontFamily: "Poppins", borderRadius: '15px', color: '#000CA4' }}>
				<Typography variant="h6" style={{ marginBottom: "10px", fontFamily: 'Poppins' }}>
					<b>{profileData.name}'s Recent Supports</b>
				</Typography>
				<div
						style={{
							overflowY: "scroll",
							height: "600px"
						}}
				>
					<Grid
						container
						spacing={2}
						style={{ display: "flex", flexWrap: "wrap" }}
					>
							{supportData &&
							supportData.map((support) => (
								<Grid item key={support.support_id} xs={12} sm={6} md={4}>
									<RecentSupports profileData={support} />
								</Grid>
							))}
					</Grid>
				</div>
			</Card>
		</>
	);
}

export default RecentSupportsBox;
