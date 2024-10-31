import {
  Grid,
  Card,
  Typography,
  CardContent,
  Button,
  TextField,
  Avatar,
} from "@mui/material";
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';

function InsertTextButton ({}) {
	return (
		<>
			<Button 
				variant="contained"
				style={{ width: '100%', height: '10vh', backgroundColor: '#6b4bef', fontFamily: 'Poppins' }}
			>
				<Grid container spacing={1}>
					<Grid item xs={12} md={4}>
						<FormatColorTextIcon style={{ height: '7vh', width: '7vh' }}/>
					</Grid>
					<Grid item xs={12} md={8} class="d-flex align-items-center justify-content-center">
						<h5>Insert Text</h5>
					</Grid>
				</Grid>
			</Button>
		</>
	);
}

export default InsertTextButton;
