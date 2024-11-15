import React from "react";
import "../App.css";
import TaskStep from "./TaskStep";
import TaskStepHorizontal from "./TaskStepHorizontal";

function LoadTaskSteps({
	steps,
  title,
  stepImages,
  stepNames,
  stepTimes,
  isHorizontal,
  removeStep,
  updateStepImage,
  updateStepName,
  updateStepTime,
  deleteStepImageChange,
  showCancel,
  showTime,
  label,
  fontColour,
  stepColour
}) {
  return (
    <>
      {steps.map((step, index) =>
        isHorizontal ? (
          <TaskStepHorizontal
            key={step.id}
            index={`${title} ${index + 1}`}
            image={stepImages[index]}
            removeStep={() => removeStep(index, step.id)}
            setImage={(newImage) => updateStepImage(index, newImage)}
            deleteImage={() => deleteStepImageChange(index)}
            setName={(newName) => updateStepName(index, newName)}
            stepName={stepNames[index]}
            setTime={(newTime) => updateStepTime(index, newTime)}
            stepTime={stepTimes[index]}
            showCancel={showCancel}
            showTime={showTime}
            label={label}
            fontColour={fontColour}
            stepColour={stepColour}
          />
        ) : (
          <TaskStep
            key={step.id}
            index={`${title} ${index + 1}`}
            image={stepImages[index]}
            removeStep={() => removeStep(index, step.id)}
            setImage={(newImage) => updateStepImage(index, newImage)}
            deleteImage={() => deleteStepImageChange(index)}
            setName={(newName) => updateStepName(index, newName)}
            stepName={stepNames[index]}
            setTime={(newTime) => updateStepTime(index, newTime)}
            stepTime={stepTimes[index]}
            label={label}
            showCancel={showCancel}
            showTime={showTime}
            fontColour={fontColour}
            stepColour={stepColour}
          />
        )
      )}
    </>
  );
}

export default LoadTaskSteps;
