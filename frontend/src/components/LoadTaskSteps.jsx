import React from "react";
import "../App.css";
import ChoiceBoardStep from "./ChoiceBoardStep";
import ChoiceBoardStepHorizontal from "./ChoiceBoardStepHorizontal";

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
  label
}) {
  return (
    <>
      {steps.map((step, index) =>
        isHorizontal ? (
          <ChoiceBoardStepHorizontal
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
          />
        ) : (
          <ChoiceBoardStep
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
          />
        )
      )}
    </>
  );
}

export default LoadTaskSteps;
