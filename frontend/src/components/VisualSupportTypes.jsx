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
import { SnapshotStyleDiv } from '../Wrappers.jsx';
import { styled } from "@mui/system";

const CircularButton = styled(Button)({
  backgroundColor: '#6b4bef',
  border: '1px solid #6b4bef',
  borderRadius: '50%',
  width: '80px',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  margin: '0 auto',
  transition: 'backgroundColor 0.3s',
  "&:hover": {
    backgroundColor: '#4f49c5',
    border: '1px solid #000ca4',
  },
});

const ButtonText = styled(Typography)({
  textAlign: 'center',
  fontFamily: "Poppins",
  color: "#6B4BEF",
  width: '80px'
});

function VisualSupportTypes({ profileID }) {
	const navigate = useNavigate();

  // Function that navigates to relevant page based off
  // which visual support option hasbeen clicked
  const navigateToTemplate = (type) => {
    const config = getVisualSupportConfig(type, profileID);
    if (config) {
      navigate(`/chooseTemplate/${profileID}`, { state: config });
    }
  };

  return (
		<>
      <SnapshotStyleDiv>
        <h4 style={{ color: '#6B4BEF' }}>
          <b>Create a New Visual Support</b>
        </h4>
        <br />
        <Grid container spacing={2} justifyContent="space-around">
          <Grid item>
            <CircularButton variant="contained" onClick={() => navigateToTemplate("Task Analysis")}>
              <Task fontSize="large" />
            </CircularButton>
            <ButtonText>
              Task Analyses
            </ButtonText>
          </Grid>
          <Grid item>
            <CircularButton variant="contained" onClick={() => navigateToTemplate("Daily Schedule")}>
              <CalendarViewDay fontSize="large" />
            </CircularButton>
            <ButtonText>
              Daily Schedules
            </ButtonText>
          </Grid>
          <Grid item>
            <CircularButton variant="contained" onClick={() => navigateToTemplate("Weekly Calendar")}>
              <CalendarViewWeek fontSize="large" />
            </CircularButton>
            <ButtonText>
              Weekly Calendars
            </ButtonText>
          </Grid>
          <Grid item>
            <CircularButton variant="contained" onClick={() => navigateToTemplate("Social Story")}>
              <Group fontSize="large" />
            </CircularButton>
            <ButtonText>
              Social Stories
            </ButtonText>
          </Grid>
          <Grid item>
            <CircularButton variant="contained" onClick={() => navigateToTemplate("Environmental Support")}>
              <Warning fontSize="large" />
            </CircularButton>
            <ButtonText>
              Environmental Supports
            </ButtonText>
          </Grid>
          <Grid item>
            <CircularButton variant="contained" onClick={() => navigateToTemplate("Choice Board")}>
              <Checklist fontSize="large" />
            </CircularButton>
            <ButtonText>
              Choice Boards
            </ButtonText>
          </Grid>
          <Grid item>
            <CircularButton variant="contained" onClick={() => navigateToTemplate("First-Then")}>
              <CheckBox fontSize="large" />
            </CircularButton>
            <ButtonText>
              First-Then
            </ButtonText>
          </Grid>
        </Grid>
      </SnapshotStyleDiv>
		</>
	);
}

export default VisualSupportTypes;
