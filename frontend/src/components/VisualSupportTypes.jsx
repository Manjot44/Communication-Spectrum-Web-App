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
			<Grid container spacing={2} justifyContent="space-around">
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/taskanalyses/${profileID}`)}}>
              <Task fontSize="large" />
            </Button>
            <Typography align="center">Task Analyses</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/dailyschedules/${profileID}`)}}>
              <CalendarViewDay fontSize="large" />
            </Button>
            <Typography align="center">Daily Schedules</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/weeklycalendars/${profileID}`)}}>
              <CalendarViewWeek fontSize="large" />
            </Button>
            <Typography align="center">Weekly Calendars</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/socialstories/${profileID}`)}}>
              <Group fontSize="large" />
            </Button>
            <Typography align="center">Social Stories</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/envirsupports/${profileID}`)}}>
              <Warning fontSize="large" />
            </Button>
            <Typography align="center">Environmental Supports</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/choiceboards/${profileID}`)}}>
              <CheckBox fontSize="large" />
            </Button>
            <Typography align="center">Choice Boards</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/firstthen/${profileID}`)}}>
              <Checklist fontSize="large" />
            </Button>
            <Typography align="center">First-Then</Typography>
          </Grid>
        </Grid>
		</>
	);
}

export default VisualSupportTypes;
