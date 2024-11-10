import React from "react";
import "../App.css";
import TaskAnalysesStep from "../components/TaskAnalysesStep";
import TaskAnalysesStepHorizontal from "../components/TaskAnalysesStepHorizontal";

function LoadTaskSteps({
	steps,
  stepImages,
  stepNames,
  stepTimes,
  isHorizontal,
  removeStep,
  updateStepImage,
  updateStepName,
  updateStepTime,
  deleteStepImageChange
}) {
  return (
    <>
      {steps.map((step, index) =>
        isHorizontal ? (
          <TaskAnalysesStepHorizontal
            key={step.id}
            index={index}
            image={stepImages[index]}
            removeStep={() => removeStep(index, step.id)}
            setImage={(newImage) => updateStepImage(index, newImage)}
            deleteImage={() => deleteStepImageChange(index)}
            setName={(newName) => updateStepName(index, newName)}
            stepName={stepNames[index]}
            setTime={(newTime) => updateStepTime(index, newTime)}
            stepTime={stepTimes[index]}
          />
        ) : (
          <TaskAnalysesStep
            key={step.id}
            index={index}
            image={stepImages[index]}
            removeStep={() => removeStep(index, step.id)}
            setImage={(newImage) => updateStepImage(index, newImage)}
            deleteImage={() => deleteStepImageChange(index)}
            setName={(newName) => updateStepName(index, newName)}
            stepName={stepNames[index]}
            setTime={(newTime) => updateStepTime(index, newTime)}
            stepTime={stepTimes[index]}
          />
        )
      )}
    </>
  );
}

export default LoadTaskSteps;
