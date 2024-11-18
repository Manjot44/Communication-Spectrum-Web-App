import {
  Card,
  Typography,
  CardContent,
} from "@mui/material";
import '../App.css';
import { styled } from "@mui/system";

const TemplateChoiceBox = styled(Card)({
	backgroundColor: '#ff7c33',
	color: 'white',
	borderRadius: '15px',
	fontFamily: "Poppins",
	height: '60vh',
	transition: 'transform 0.3s',
	"&:hover": {
		transform: 'scale(1.05)',
		backgroundColor: '#f49f72',
	},
});

function TemplateChoiceCard({ TemplateType, TemplateDesc, IconComponent, NavigateTo }) {
	return (
		<>
			<TemplateChoiceBox onClick={NavigateTo}>
				<CardContent>
					<Typography variant="h5" component="div" style={{ fontFamily: 'Poppins' }}>
						<b>{TemplateType}</b>
					</Typography>
					<Typography variant="body2">
						{TemplateDesc}
					</Typography>
					<br />
					<div class="d-flex justify-content-center">
						<IconComponent style={{ height: '40vh', width: 'auto' }}/>
					</div>
				</CardContent>
			</TemplateChoiceBox>
		</>
	);
}

export default TemplateChoiceCard;
