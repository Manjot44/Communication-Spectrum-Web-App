import React from "react";
import "../App.css";
import TaskStep from "./TaskStep";
import TaskStepHorizontal from "./TaskStepHorizontal";

function LoadTaskSteps({
	steps,
  title,
  isHorizontal,
  removeStep,
  deleteStepImageChange,
  updateStepImage,
  updateStepName,
  updateStepTime
}) {
  return (
    <>
      {steps.map((step, index) =>
        isHorizontal ? (
          <TaskStepHorizontal
            key={step.id}
            index={`${title} ${index + 1}`}
            removeStep={() => removeStep(index, step.id)}
            deleteImage={() => deleteStepImageChange(index)}
            count={index}
            updateStepImage={(newImage) => updateStepImage(index, newImage)}
            updateStepName={(newName) => updateStepName(index, newName)}
            updateStepTime={(newTime) => updateStepTime(index, newTime)}
            id={index}
          />
        ) : (
          <TaskStep
            key={step.id}
            index={`${title} ${index + 1}`}
            removeStep={() => removeStep(index, step.id)}
            deleteImage={() => deleteStepImageChange(index)}
            count={index}
            updateStepImage={(newImage) => updateStepImage(index, newImage)}
            updateStepName={(newName) => updateStepName(index, newName)}
            updateStepTime={(newTime) => updateStepTime(index, newTime)}
            id={index}
          />
        )
      )}
    </>
  );
}

export default LoadTaskSteps;
