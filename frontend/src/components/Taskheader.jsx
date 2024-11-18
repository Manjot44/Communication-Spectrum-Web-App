import React from 'react';
import { Typography, Button } from '@mui/material';
import EditTitleComponent from './EditTitleComponent';
import { styled } from "@mui/system";
import "../App.css";
import { PoppinsButton } from '../Wrappers';

const TaskHeaderBox = styled(Typography)({
  margin: "10px",
  fontFamily: "Poppins",
  color: "black",
  display: "flex",
  justifyContent: "space-between",
});

function TaskHeader({
  text,
  setText,
  isEditing,
  setIsEditing,
  nameError,
  setNameError,
  toggleComponentType,
  addStep,
  defaultText,
  errorMsg,
  addMsg,
  reactToPrintFn,
  setColourModal
}) {
  return (
    <>
      <TaskHeaderBox variant='h6'>
        <EditTitleComponent
          text={text}
          changeText={setText}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          nameError={nameError}
          setNameError={setNameError}
          defaultText={defaultText}
          errorMsg={errorMsg}
        />
        <PoppinsButton onClick={reactToPrintFn}>Print to PDF</PoppinsButton>
        <PoppinsButton onClick={setColourModal}>Customise Colour</PoppinsButton>
        <PoppinsButton onClick={toggleComponentType}>Toggle Visual Style</PoppinsButton>
        <PoppinsButton onClick={addStep}>{addMsg}</PoppinsButton>
      </TaskHeaderBox>
    </>
  );
}

export default TaskHeader;
