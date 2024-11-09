import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Card, Typography, CardContent, Button } from "@mui/material";
import "../App.css";
import VisualSupportImage from "../components/VisualSupportImage";
import axios from "axios";
import dayjs from "dayjs";
import SelectDateCategoryComponent from "../components/SelectDateCategoryComponent.jsx";
import EditTitleComponent from "../components/EditTitleComponent.jsx";
import LoadTaskSteps from "../components/LoadTaskSteps.jsx";

function TaskAnalyses({ token }) {
  const navigate = useNavigate();
  const { profileID } = useParams();
  const [text, setText] = useState("");                    // Name of the Visual Support
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(dayjs());               // Date of the Visual Support
  const [steps, setSteps] = useState([]);                  // Array to track steps with unique IDs
  const [stepImages, setStepImages] = useState([]);        // Array to store images for each step
  const [isHorizontal, setIsHorizontal] = useState(false); // New state to toggle component type
  const [stepNames, setStepNames] = useState([]);          // Array to keep track of the step names
  const [stepTimes, setStepTimes] = useState([]);          // Array to keep track of the step times
  const [category, setCategory] = useState("");            // Variable storing category type
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
          text,
          image, // This is now a base64 image string
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
                      defaultText="Insert Task Name"
                      errorMsg="Please enter a task name"
                    />
                    <Button onClick={toggleComponentType}>
                      Toggle Visual Style
                    </Button>
                    <Button onClick={addStep}>
                      + Add Step
                    </Button>
                  </Typography>
                  <Grid container spacing={2} style={{ padding: "2%" }}>
                    <Grid item xs={12} md={6}>
                      <VisualSupportImage
                        image={image}
                        setImage={setImage}
                        uniqueID={-1}
                        imgHeight={"55vh"}
                        deleteImage={() => setImage(null)}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        overflowY: "scroll",
                        height: "75vh",
                      }}
                    >
                      <LoadTaskSteps
                        steps={steps}
                        stepImages={stepImages}
                        stepNames={stepNames}
                        stepTimes={stepTimes}
                        isHorizontal={isHorizontal}
                        removeStep={removeStep}
                        updateStepImage={updateStepImage}
                        updateStepName={updateStepName}
                        updateStepTime={updateStepTime}
                        deleteStepImageChange={deleteStepImageChange}
                      />
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

export default TaskAnalyses;
