import { React, useContext } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import VisualSupportImage from './VisualSupportImage';
import { context } from '../pages/StepSupport';
import { styled } from "@mui/system";
import { LeftArrow, LeftArrowIcon, RightArrow, RightArrowIcon, StepIndex, DeleteButton, CrossIcon, DescriptionBox } from "../Wrappers"

// Styled Components
const TopBox = styled(Box)({
  display: 'flex',
  fontWeight: 'bold',
  height: '50px',
  width: '550px',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  borderRadius: '15px 15px 0 0',
});

const MiddleBox = styled(Box)({
  height: '230px',
  width: '350px',
  padding: '0 15px',
  alignItems: "center",
  justifyContent: "center",
  borderRadius: '0 0 0 15px',
});

const BottomBox = styled(Box)({
  height: '230px',
  width: '200px',
  padding: '0 5px',
  borderRadius: '0 0 15px 0'
});

function TaskStepHorizontal ({
  token,
  index,
  deleteImage,
  removeStep,
  count,
  updateStepImage,
  updateStepName,
  updateStepTime,
  id
}) {
  const {
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
    totalSteps
  } = useContext(context);

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
          <TopBox style={{ 
            color: `${fontColour}`, 
            backgroundColor: `${stepColour}`}}
          >
            {/* Left Arrow. Appears for steps after the first step */}
            {count > 0 && (
              <LeftArrow onClick={() => onMoveLeft(count)}>
                <LeftArrowIcon/>
              </LeftArrow>
            )}
            {/*  Right Arrow. Appears for steps before the last step */}
            {count < totalSteps - 1 && (
              <RightArrow onClick={() => onMoveRight(count)}>
                <RightArrowIcon/>
              </RightArrow>
            )}
            <StepIndex variant="h6" gutterBottom>
              <b>{index}</b>
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
        <Grid item xs={12}>
          {/* Inside Grid */}
          <Grid container spacing={0}>
            <Grid item xs={12} md={9} style={{ backgroundColor: 'white' }}>
              <MiddleBox style={{ 
                borderBottom: `1px solid ${stepColour}`,
                borderLeft: `1px solid ${stepColour}`
              }}>
                <br/>
                {/* Box with Description of each Step/Option */}
                {/* <DescriptionBox 
                  label={label}
                  variant="outlined"
                  defaultValue={stepNames[count]}
                  onChange={(e) => updateStepName(e.target.value)}
                /> */}
                {showTime ? (
                  <DescriptionBox
                    // id="standard-multiline-flexible"
                    label={label}
                    variant="outlined"
                    defaultValue={stepNames[count]}
                    onChange={(e) => updateStepName(e.target.value)}
                  />
                ) : (
                  <DescriptionBox 
                    id="outlined-multiline-static"
                    label={label}
                    // variant="outlined"
                    multiline
                    rows={4}
                    defaultValue={stepNames[count]}
                    onChange={(e) => updateStepName(e.target.value)}
                  />
                )}
                {/* Timer Box (Only for Task Analysis)*/}
                {showTime && (
                  <DescriptionBox 
                    label="Timer"
                    variant="outlined"
                    defaultValue={stepTimes[count]}
                    onChange={handleTimeChange}
                    inputProps={{ inputMode: 'numeric', pattern: "[0-9]*" }}
                    placeholder="00:00:00"
                  />
                )}
              </MiddleBox>
            </Grid>
            <Grid item xs={12} md={3} style={{ backgroundColor: 'white' }}>
              <BottomBox style={{
                borderBottom: `1px solid ${stepColour}`,
                borderRight: `1px solid ${stepColour}`
              }}>
                <br />
                <VisualSupportImage
                  token={token}
                  uniqueID={id}
                  imgHeight="65%"
                  image={stepImages[count]}
                  setImage={updateStepImage}
                  deleteImage={deleteImage}
                />
                <br />
              </BottomBox>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default TaskStepHorizontal;
