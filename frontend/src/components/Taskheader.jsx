import React from 'react';
import { Typography, Button } from '@mui/material';
import EditTitleComponent from './EditTitleComponent';

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
  addMsg
}) {
  return (
    <Typography
      variant="h6"
      gutterBottom
      style={{
        margin: "10px",
        fontFamily: "Poppins",
        color: "black",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
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
      <Button onClick={toggleComponentType}>Toggle Visual Style</Button>
      <Button onClick={addStep}>{addMsg}</Button>
    </Typography>
  );
}

export default TaskHeader;
