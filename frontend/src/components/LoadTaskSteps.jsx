import React from "react";
import "../App.css";
import TaskStep from "./TaskStep";
import TaskStepHorizontal from "./TaskStepHorizontal";

function LoadTaskSteps({
	token,
  steps,
  title,
  isHorizontal,
  removeStep,
  deleteStepImageChange,
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
}) {
  return (
    <>
      {steps.map((step, index) =>
        isHorizontal ? (
          <TaskStepHorizontal
            token={token}
            key={step.id}
            title={`${title} ${index + 1}`}
            removeStep={() => removeStep(index, step.id)}
            deleteImage={() => deleteStepImageChange(index)}
            count={index}
            updateStepImage={(newImage) => updateStepImage(index, newImage)}
            updateStepName={(newName) => updateStepName(index, newName)}
            updateStepTime={(newTime) => updateStepTime(index, newTime)}
            stepImages={stepImages[index]}
            stepNames={stepNames[index]}
            stepTimes={stepTimes[index]}
            onMoveLeft={() => onMoveLeft(index)}
            onMoveRight={() => onMoveRight(index)}
            fontColour={fontColour}
            stepColour={stepColour}
            showCancel={showCancel}
            showTime={showTime}
            label={label}
            totalSteps={totalSteps}
            id={index}
          />
        ) : (
          <TaskStep
            token={token}
            key={step.id}
            title={`${title} ${index + 1}`}
            removeStep={() => removeStep(index, step.id)}
            deleteImage={() => deleteStepImageChange(index)}
            count={index}
            updateStepImage={(newImage) => updateStepImage(index, newImage)}
            updateStepName={(newName) => updateStepName(index, newName)}
            updateStepTime={(newTime) => updateStepTime(index, newTime)}
            stepImages={stepImages[index]}
            stepNames={stepNames[index]}
            stepTimes={stepTimes[index]}
            onMoveLeft={() => onMoveLeft(index)}
            onMoveRight={() => onMoveRight(index)}
            fontColour={fontColour}
            stepColour={stepColour}
            showCancel={showCancel}
            showTime={showTime}
            label={label}
            totalSteps={totalSteps}
            id={index}
          />
        )
      )}
    </>
  );
}

export default LoadTaskSteps;
