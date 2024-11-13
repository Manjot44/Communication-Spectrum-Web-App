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
  const taskAnalyses = { 
    title: "Create New Task Analyses", 
    scratch: `/stepsupport/${profileID}`, 
    temp: `/stepsupport/${profileID}`, 
    exist: `/choosepremadetemplate/${profileID}`,
    type: "Task Analysis",
    defaultText: "Insert Task Name",
    errorMsg: "Please enter a task name",
    addMsg: "+ Add Step",
    stepTitle: "Step",
    showTime: true,
    label: "Task Step"
  };
  const dailySchedule = { 
    title: "Create New Daily Schedule", 
    scratch: `/dailyschedules/${profileID}`, 
    temp: `/dailyschedules/${profileID}`, 
    exist: `/choosepremadetemplate/${profileID}` 
  };
  const weeklyCalendars = { 
    title: "Create New Weekly Calendar", 
    scratch: `/weeklycalendars/${profileID}`, 
    temp: `/weeklycalendars/${profileID}`, 
    exist: `/choosepremadetemplate/${profileID}` 
  };
  const socialStory = { 
    title: "Create New Social Story", 
    scratch: `/stepsupport/${profileID}`, 
    temp: `/stepsupport/${profileID}`, 
    exist: `/choosepremadetemplate/${profileID}`,
    type: "Social Story",
    defaultText: "Insert Social Story Name",
    errorMsg: "Please enter a name for this social story",
    addMsg: "+ Add Story Point",
    stepTitle: "Story Point",
    showTime: false,
    label: "Story Point Description"
  };
  const envirSupport = { 
    title: "Create New Environment Support", 
    scratch: `/stepsupport/${profileID}`, 
    temp: `/stepsupport/${profileID}`, 
    exist: `/choosepremadetemplate/${profileID}`,
    type: "Environmental Support",
    defaultText: "Insert Environmental Support Name",
    errorMsg: "Please enter a name for this environmental support",
    addMsg: "+ Add Environmental Support",
    stepTitle: "Environment Support",
    showTime: false,
    label: "Environmental Support Description"
  };
  const choiceBoard = { 
    title: "Create New Choice Board", 
    scratch: `/stepsupport/${profileID}`, 
    temp: `/stepsupport/${profileID}`, 
    exist: `/choosepremadetemplate/${profileID}`,
    type: "Choice Board",
    defaultText: "Insert Choice Board Name",
    errorMsg: "Please enter a name for this choice board",
    addMsg: "+ Add Choice",
    stepTitle: "Choice",
    showTime: false,
    label: "Choice Name"
  };
  const firstThen = { 
    title: "Create New First-Then", 
    scratch: `/firstthen/${profileID}`, 
    temp: `/firstthen/${profileID}`, 
    exist: `/choosepremadetemplate/${profileID}`,
    type: `First-Then`
  };

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
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/chooseTemplate/${profileID}`, { state: dailySchedule })}}>
              <CalendarViewDay fontSize="large" />
            </Button>
            <Typography align="center" style={{ fontFamily: "Poppins", color: "#6B4BEF" }}>Daily Schedules</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" class='circular-icon-style' onClick={async () => {navigate(`/chooseTemplate/${profileID}`, { state: weeklyCalendars })}}>
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
