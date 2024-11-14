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
import { getVisualSupportConfig } from './VisualSupportConfig.jsx';

function VisualSupportTypes({ profileID }) {
	const navigate = useNavigate();

  const navigateToTemplate = (type) => {
    const config = getVisualSupportConfig(type, profileID);
    if (config) {
      navigate(`/chooseTemplate/${profileID}`, { state: config });
    }
  };

  return (
		<>
			<div class="snapshot-style">
        <h4 style={{ color: '#6B4BEF' }}><b>Create a New Visual Support</b></h4>
        <br />
        <Grid container spacing={2} justifyContent="space-around">
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={() => navigateToTemplate("Task Analysis")}>
              <Task fontSize="large" />
            </Button>
            <Typography align="center" style={{ fontFamily: "Poppins", color: "#6B4BEF" }}>Task Analyses</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={() => navigateToTemplate("Daily Schedule")}>
              <CalendarViewDay fontSize="large" />
            </Button>
            <Typography align="center" style={{ fontFamily: "Poppins", color: "#6B4BEF" }}>Daily Schedules</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={() => navigateToTemplate("Weekly Calendar")}>
              <CalendarViewWeek fontSize="large" />
            </Button>
            <Typography align="center" style={{ fontFamily: "Poppins", color: "#6B4BEF" }}>Weekly Calendars</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={() => navigateToTemplate("Social Story")}>
              <Group fontSize="large" />
            </Button>
            <Typography align="center" style={{ fontFamily: "Poppins", color: "#6B4BEF" }}>Social Stories</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={() => navigateToTemplate("Environmental Support")}>
              <Warning fontSize="large" />
            </Button>
            <Typography align="center" style={{ fontFamily: "Poppins", color: "#6B4BEF" }}>Environmental Supports</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={() => navigateToTemplate("Choice Board")}>
              <CheckBox fontSize="large" />
            </Button>
            <Typography align="center" style={{ fontFamily: "Poppins", color: "#6B4BEF" }}>Choice Boards</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={() => navigateToTemplate("First-Then")}>
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
