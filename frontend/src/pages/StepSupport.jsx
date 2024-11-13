import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Grid, Card, Typography, CardContent } from "@mui/material";
import "../App.css";
import axios from "axios";
import dayjs from "dayjs";
import SelectDateCategoryComponent from "../components/SelectDateCategoryComponent.jsx";
import LoadTaskSteps from "../components/LoadTaskSteps.jsx";
import TaskHeader from "../components/Taskheader.jsx";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

function StepSupport({ token }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  // const data = state?.data;
  const { profileID } = useParams();
  const [text, setText] = useState(state.data.text);
  const [image, setImage] = useState(state.data.image);
  const [steps, setSteps] = useState(state.data.steps);
  const [stepImages, setStepImages] = useState(state.data.stepImages);
  const [stepNames, setStepNames] = useState(state.data.stepNames);
  const [stepTimes, setStepTimes] = useState(state.data.stepTimes);
  const [category, setCategory] = useState(state.data.category);
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState(dayjs());               // Date of the Visual Support
  const [isHorizontal, setIsHorizontal] = useState(false); // New state to toggle component type
  const [nameError, setNameError] = useState(false);       // State for task name error

  // Toggle between horizontal and vertical step display
  const toggleComponentType = () => {
    setIsHorizontal((prev) => !prev);
  };

  // Add a new step to the task analysis
  const addStep = () => {
    const newStep = { id: Date.now() };
    setSteps([...steps, newStep]);
    setStepImages([...stepImages, null]); // Initialize a placeholder for the new step's image
    setStepNames([...stepNames, null]);   // Initialize a placeholder for the new step's name
    setStepTimes([...stepTimes, null]);   // Initialize a placeholder for the new step's time
  };

  // Remove a step by index
  const removeStep = (index, id) => {
    setSteps(steps.filter((step) => step.id !== id));
    setStepImages(stepImages.filter((_, imgIndex) => imgIndex !== index));
    setStepNames(stepNames.filter((_, imgIndex) => imgIndex !== index));
    setStepTimes(stepTimes.filter((_, imgIndex) => imgIndex !== index));
  };

  // Update image for a specific step
  const updateStepImage = (index, newImage) => {
    const updatedImages = [...stepImages];
    updatedImages[index] = newImage;
    setStepImages(updatedImages);
  };

  // Update name for a specific step
  const updateStepName = (index, newName) => {
    const updatedNames = [...stepNames];
    updatedNames[index] = newName;
    setStepNames(updatedNames);
  };

  // Update time for a specific step
  const updateStepTime = (index, newTime) => {
    const updatedTimes = [...stepTimes];
    updatedTimes[index] = newTime;
    setStepTimes(updatedTimes);
  };

  // Delete an image change for a specific step
  const deleteStepImageChange = (index) => {
    const updatedImages = [...stepImages];
    updatedImages[index] = "";
    setStepImages(updatedImages);
  };

  // Create a new visual support
  const handleCreate = async () => {
    if (text.trim() === "") {
      setNameError(true); // Set error state if no name is entered
      return;
    }
    try {
      await axios.post(
        `http://localhost:5005/new_support/${profileID}`,
        {
          type: state.state.type,
          text,
          image,
          date,
          stepImages,
          stepNames,
          stepTimes,
          category,
          isHorizontal,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      navigate(`/home/${profileID}`);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <>
      <Navbar profileID={profileID} />
      <br />
      <div className="page-wrapper-style" style={{ padding: "0 1%" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <SelectDateCategoryComponent
              date={date}
              changeDate={(newDate) => setDate(newDate)}
              category={category}
              changeCategory={(e) => setCategory(e.target.value)}
              handleCreate={handleCreate}
              image={image}
              setImage={(image) => setImage(image)}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Card
              className="task-analyses-create-options"
              style={{ height: "87vh" }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  style={{ fontFamily: "Poppins" }}
                >
                  <TaskHeader
                    text={text}
                    setText={setText}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    nameError={nameError}
                    setNameError={setNameError}
                    toggleComponentType={toggleComponentType}
                    addStep={addStep}
                    defaultText={state.state.defaultText}
                    errorMsg={state.state.errorMsg}
                    addMsg={state.state.addMsg}
                    reactToPrintFn={reactToPrintFn}
                  />
                  <Grid container spacing={2} style={{ padding: "2%" }} >
                    <Grid
                      item
                      xs={12}
                      md={12}
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        overflowY: "scroll",
                        height: "75vh",
                      }}
                    >
                      <div
                        ref={contentRef}
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          height: "75vh",
                        }}
                      >
                        <LoadTaskSteps
                          steps={steps}
                          title={state.state.stepTitle}
                          stepImages={stepImages}
                          stepNames={stepNames}
                          stepTimes={stepTimes}
                          isHorizontal={isHorizontal}
                          removeStep={removeStep}
                          updateStepImage={updateStepImage}
                          updateStepName={updateStepName}
                          updateStepTime={updateStepTime}
                          deleteStepImageChange={deleteStepImageChange}
                          showCancel={true}
                          showTime={state.state.showTime}
                          label={state.state.label}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default StepSupport;
