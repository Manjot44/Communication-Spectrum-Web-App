import Grid from '@mui/material/Grid2';
import {
  Typography,
  Button,
} from "@mui/material";
import {
  Task,
  CalendarViewDay,
  CalendarViewWeek,
  Group,
  Warning,
  Checklist,
  CheckBox,
} from "@mui/icons-material";
import '../App.css'
import { useNavigate } from "react-router-dom";

function VisualSupportTypes({ profileID }) {
	const navigate = useNavigate();

  return (
		<>
			<div class="snapshot-style">
        <h4 style={{ color: '#6B4BEF' }}><b>Create a New Visual Support</b></h4>
        <br />
        <Grid container spacing={2} justifyContent="space-around">
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/taskanalyses/${profileID}`)}}>
              <Task fontSize="large" />
            </Button>
            <Typography align="center" style={{ fontFamily: "Poppins", color: "#6B4BEF" }}>Task Analyses</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/dailyschedules/${profileID}`)}}>
              <CalendarViewDay fontSize="large" />
            </Button>
            <Typography align="center" style={{ fontFamily: "Poppins", color: "#6B4BEF" }}>Daily Schedules</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/weeklycalendars/${profileID}`)}}>
              <CalendarViewWeek fontSize="large" />
            </Button>
            <Typography align="center" style={{ fontFamily: "Poppins", color: "#6B4BEF" }}>Weekly Calendars</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/socialstories/${profileID}`)}}>
              <Group fontSize="large" />
            </Button>
            <Typography align="center" style={{ fontFamily: "Poppins", color: "#6B4BEF" }}>Social Stories</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/envirsupports/${profileID}`)}}>
              <Warning fontSize="large" />
            </Button>
            <Typography align="center" style={{ fontFamily: "Poppins", color: "#6B4BEF" }}>Environmental Supports</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/choiceboards/${profileID}`)}}>
              <CheckBox fontSize="large" />
            </Button>
            <Typography align="center" style={{ fontFamily: "Poppins", color: "#6B4BEF" }}>Choice Boards</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/firstthen/${profileID}`)}}>
              <Checklist fontSize="large" />
            </Button>
            <Typography align="center" style={{ fontFamily: "Poppins", color: "#6B4BEF" }}>First-Then</Typography>
          </Grid>
        </Grid>
      </div>
		</>
	);
}

export default VisualSupportTypes;
