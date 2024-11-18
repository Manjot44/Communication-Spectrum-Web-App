import React from 'react';
import { Typography, Button } from '@mui/material';
import EditTitleComponent from './EditTitleComponent';
import { styled } from "@mui/system";
import "../App.css";

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
        <Button onClick={reactToPrintFn}>Print to PDF</Button>
        <Button onClick={setColourModal}>Customise Colour</Button>
        <Button onClick={toggleComponentType}>Toggle Visual Style</Button>
        <Button onClick={addStep}>{addMsg}</Button>
      </TaskHeaderBox>
    </>
  );
}

export default TaskHeader;
