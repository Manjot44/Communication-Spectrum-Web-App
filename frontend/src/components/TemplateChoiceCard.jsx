import {
  Card,
  Typography,
  CardContent,
} from "@mui/material";
import '../App.css';

function TemplateChoiceCard({ TemplateType, TemplateDesc, IconComponent, NavigateTo }) {
	return (
		<>
			<Card class='task-analyses-type' style={{ height: '60vh' }} onClick={NavigateTo}>
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
			</Card>
		</>
	);
}

export default TemplateChoiceCard;
