import React from 'react';
import { Typography, Button } from '@mui/material';
import EditTitleComponent from './EditTitleComponent';

function TaskHeaderScratch({
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
  handleSaveBtn
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
      <Button onClick={reactToPrintFn}>Print to PDF</Button>
      <Button onClick={handleSaveBtn}>Save</Button>
    </Typography>
  );
}

export default TaskHeaderScratch;
