import { React } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import VisualSupportImage from './VisualSupportImage';
import { styled } from "@mui/system";
import { LeftArrow, LeftArrowIcon, RightArrow, RightArrowIcon, StepIndex, DeleteButton, CrossIcon, DescriptionBox } from "../Wrappers"

// Styled Components
const TopBox = styled(Box)({
  height: '50px',
  width: '350px',
  display: 'flex',
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '15px 15px 0 0',
  position: 'relative',
});

const MiddleBox = styled(Box)({
  backgroundColor: 'white',
  width: '350px',
  height: '350px',
  padding: '15px',
});

const BottomBox = styled(Box)({
  width: '350px',
  color: 'black',
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  backgroundColor: 'white',
  padding: '0 15px',
  borderRadius: '0 0 15px 15px',
});

function TaskStep ({
  token,
  title,
  deleteImage,
  removeStep,
  count,
  updateStepImage,
  updateStepName,
  updateStepTime,
  stepImages,
  stepNames,
  stepTimes,
  onMoveLeft,
  onMoveRight,
  fontColour,
  stepColour,
  showCancel,
  showTime,
  label,
  totalSteps,
  id,
}) {
  const handleTimeChange = (e) => {
    let input = e.target.value;
    
    // Regular expression to validate time in HH:MM:SS format
    const validTimeFormat = /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    
    // Allow typing if the format is valid or partial (for user-friendly input)
    if (input === "" || validTimeFormat.test(input) || /^(\d{0,2}:?\d{0,2}:?\d{0,2})$/.test(input)) {
      updateStepTime(input);
    }
  };

  return (
    <>
      <Grid container direction="column" spacing={0} style={{ margin: '5px' }}>
        <Grid item xs={12}>
          <TopBox sx={{
            color: `${fontColour}`,
            backgroundColor: `${stepColour}`,
            border: `1px solid ${stepColour}`
          }}>
            {/* Left Arrow. Appears for steps after the first step */}
            {count > 0 && (
              <LeftArrow onClick={onMoveLeft}>
                <LeftArrowIcon/>
              </LeftArrow>
            )}
            {/*  Right Arrow. Appears for steps before the last step */}
            {count < totalSteps - 1 && (
              <RightArrow onClick={onMoveRight}>
                <RightArrowIcon/>
              </RightArrow>
            )}
            <StepIndex variant="h6" gutterBottom>
              <b>{title}</b>
            </StepIndex>
            {/* Cross Button to Delete the Step. ShowCancel boolean to toggle if its 
                shown or not. Not shown in First-Then */}
            {showCancel && (
              <DeleteButton onClick={removeStep} aria-label="delete">
                <CrossIcon/>
              </DeleteButton>
            )}
          </TopBox>
        </Grid>
        <Grid item xs={12} >
          <MiddleBox style={{ 
            borderTop: `1px solid ${stepColour}`,
            borderLeft: `1px solid ${stepColour}`,
            borderRight: `1px solid ${stepColour}`
          }}>
            <VisualSupportImage
              token={token}
              uniqueID={id}
              imgHeight="95%" 
              image={stepImages} 
              setImage={updateStepImage} 
              deleteImage={deleteImage}
            />
          </MiddleBox>
        </Grid>
        <Grid item xs={12}>
          <BottomBox sx={{ 
            height: showTime ? '175px':'100px',
            borderBottom: `1px solid ${stepColour}`,
            borderLeft: `1px solid ${stepColour}`,
            borderRight: `1px solid ${stepColour}`
          }}>
            {/* Box with Description of each Step/Option */}
            <DescriptionBox 
              label={label}
              variant="outlined"
              defaultValue={stepNames}
              onChange={(e) => updateStepName(e.target.value)}
            />
            {/* Timer Box (Only for Task Analysis)*/}
            {showTime && (
              <DescriptionBox 
                label="Timer"
                variant="outlined"
                defaultValue={stepTimes}
                onChange={handleTimeChange}
                inputProps={{ inputMode: 'numeric', pattern: "[0-9]*" }}
                placeholder="00:00:00"
              />
            )}
          </BottomBox>
        </Grid>
      </Grid>
    </>
  );
}

export default TaskStep;
