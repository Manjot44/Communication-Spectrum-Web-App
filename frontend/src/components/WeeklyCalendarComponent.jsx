import React from 'react';
import { Grid, Button, Typography, Card, CardContent } from '@mui/material';
import TaskStep from './TaskStep';

function WeeklyCalendarComponent({
  token,
  day,
  tasks,
  addTask,
  removeTask,
  updateTask,
  moveLeft,
  moveRight,
  layout,
  stepColour,
  fontColour,
  title,
}) {
  return (
    <Card
      style={{
        flex: "0 0 auto", // Prevent shrinking
        height: layout ? "100%" : "auto", // Full height in horizontal mode
        maxHeight: layout ? "100%" : "75vh", // Constrain height for tasks
        width: layout ? "450px" : "100%", // Fixed width for horizontal layout
        marginBottom: "10px", // Space between cards
        overflow: "hidden", // Prevent card content from overflowing
      }}
    >
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%", // Ensure it takes the full height of the card
        }}
      >
        <Typography variant="h6" align="center" style={{ marginBottom: "10px" }}>
          {title || day}
        </Typography>
        <Button
          onClick={() => addTask(day)}
          style={{ marginBottom: "10px", width: "100%" }}
        >
          + Add Task
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: layout ? "column" : "row", // Horizontal or vertical task layout
            gap: layout ? "15px" : "75px", // Spacing between tasks
            overflowY: layout ? "auto" : "hidden", // Scroll vertically in vertical mode
            overflowX: layout ? "hidden" : "auto", // Scroll horizontally in horizontal mode
          }}
        >
          {tasks.map((task, index) => (
            <div
              key={task.id}
              style={{
                flex: "0 0 auto", 
                width: layout ? "100%" : "300px", 
              }}
            >
              <TaskStep
                token={token}
                index={task.id}
                image={task.image}
                setImage={(newImage) => updateTask(day, task.id, 'image', newImage)}
                title={`Task ${index + 1}`}
                deleteImage={() => updateTask(day, task.id, 'image', null)}
                removeStep={() => removeTask(day, task.id)}
                setName={(newName) => updateTask(day, task.id, 'name', newName)}
                stepName={task.name}
                label="Task Name"
                showCancel={true}
                showTime={false}
                fontColour={fontColour}
                stepColour={stepColour}
                totalSteps={tasks.length}
                onMoveLeft={(index) => moveLeft(day, index)}
                onMoveRight={(index) => moveRight(day, index)}
                count={index}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default WeeklyCalendarComponent;
