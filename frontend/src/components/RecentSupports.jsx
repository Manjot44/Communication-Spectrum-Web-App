import {
  Grid,
  Card,
  Typography,
} from "@mui/material";
import '../App.css'

function RecentSupports ({ profileData }) {
	return (
		<>
			<Grid item xs={12} md={9}>
				<Card class='recent-supports-style' style={{ height: '700px' }}>
					<Typography variant="h6">{profileData.name}'s Recent Supports</Typography>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={4}>
							<Card class='support-card-style' />
						</Grid>
						<Grid item xs={12} sm={4}>
							<Card class='support-card-style' />
						</Grid>
						<Grid item xs={12} sm={4}>
							<Card class='support-card-style' />
						</Grid>
					</Grid>
				</Card>
			</Grid>
		</>
	);
}

export default RecentSupports;
