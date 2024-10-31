import {
  Grid,
  Card,
  Typography,
} from "@mui/material";
import '../App.css'

function RecentSupports ({ profileData }) {
  return (
    <Card className="recent-supports-style" style={{ width: '400px', height: '300px', padding: '10px', textAlign: 'center' }}>
      {profileData.title_img && (
        <img
          src={profileData.title_img}
          alt={`${profileData.title}`}
          style={{ width: '90%', borderRadius: '10px' }}
        />
      )}

      <Typography variant="body1" style={{ marginTop: '10px', fontSize: '1.2rem'}}>
        {profileData.title}
      </Typography>
    </Card>
  );
}

export default RecentSupports;
