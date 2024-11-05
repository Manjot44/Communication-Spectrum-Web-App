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
  const taskAnalyses = { title: "Create New Task Analyses", scratch: `/taskanalyses/${profileID}`, temp: `/taskanalyses/${profileID}`, exist: `/taskanalyses/${profileID}` };
  const socialStory = { title: "Create New Social Story", scratch: `/socialstories/${profileID}`, temp: `/socialstories/${profileID}`, exist: `/socialstories/${profileID}` };
  const envirSupport = { title: "Create New Environment Support", scratch: `/envirsupports/${profileID}`, temp: `/envirsupports/${profileID}`, exist: `/envirsupports/${profileID}` };
  const choiceBoard = { title: "Create New Choice Board", scratch: `/choiceboards/${profileID}`, temp: `/choiceboards/${profileID}`, exist: `/choiceboards/${profileID}` };
  const firstThen = { title: "Create New First-Then", scratch: `/firstthen/${profileID}`, temp: `/firstthen/${profileID}`, exist: `/firstthen/${profileID}` };

  return (
		<>
			<div class="snapshot-style">
        <h4 style={{ color: '#6B4BEF' }}><b>Create a New Visual Support</b></h4>
        <br />
        <Grid container spacing={2} justifyContent="space-around">
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/chooseTemplate/${profileID}`, { state: taskAnalyses })}}>
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
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/chooseTemplate/${profileID}`, { state: socialStory })}}>
              <Group fontSize="large" />
            </Button>
            <Typography align="center" style={{ fontFamily: "Poppins", color: "#6B4BEF" }}>Social Stories</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/chooseTemplate/${profileID}`, { state: envirSupport })}}>
              <Warning fontSize="large" />
            </Button>
            <Typography align="center" style={{ fontFamily: "Poppins", color: "#6B4BEF" }}>Environmental Supports</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/chooseTemplate/${profileID}`, { state: choiceBoard })}}>
              <CheckBox fontSize="large" />
            </Button>
            <Typography align="center" style={{ fontFamily: "Poppins", color: "#6B4BEF" }}>Choice Boards</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/chooseTemplate/${profileID}`, { state: firstThen })}}>
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
