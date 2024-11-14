import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Typography, Card, CardContent, Button, TextField } from "@mui/material";
import "../App.css";
import dayjs from "dayjs";
import SelectDateCategoryComponent from "../components/SelectDateCategoryComponent.jsx";
import LoadTaskSteps from "../components/LoadTaskSteps.jsx";
import TaskHeader from "../components/Taskheader.jsx";
import Navbar from "../components/Navbar";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

function DailySchedules({ token, setTokenFunc }) {
  const { profileID } = useParams();
  const navigate = useNavigate();
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

  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });

  const toggleComponentType = () => {
    setIsHorizontal((prev) => !prev);
  };

  const addStep = () => {
    const newStep = { id: Date.now() };
    setSteps([...steps, newStep]);
    setStepImages([...stepImages, null]); // Initialize a placeholder for the new step's image
    setStepNames([...stepNames, ""]); // Initialize a placeholder for the new step's name
    setStepTimes([...stepTimes, ""]); // Initialize a placeholder for the new step's time
  };

  const removeStep = (index, id) => {
    setSteps(steps.filter((step) => step.id !== id));
    setStepImages(stepImages.filter((_, imgIndex) => imgIndex !== index));
    setStepNames(stepNames.filter((_, imgIndex) => imgIndex !== index));
    setStepTimes(stepTimes.filter((_, imgIndex) => imgIndex !== index));
  };

  const updateStepImage = (index, newImage) => {
    const updatedImages = [...stepImages];
    updatedImages[index] = newImage;
    setStepImages(updatedImages);
  };

  const updateStepName = (index, newName) => {
    const updatedNames = [...stepNames];
    updatedNames[index] = newName;
    setStepNames(updatedNames);
  };

  const updateStepTime = (index, newTime) => {
    const updatedTimes = [...stepTimes];
    updatedTimes[index] = newTime;
    setStepTimes(updatedTimes);
  };

  const deleteStepImageChange = (index) => {
    const updatedImages = [...stepImages];
    updatedImages[index] = "";
    setStepImages(updatedImages);
  };

  const handleCreate = async () => {
    if (text.trim() === "") {
      setNameError(true); // Set error state if no name is entered
      return;
    }
    try {
      await axios.post(
        `http://localhost:5005/new_support/${profileID}`,
        {
          type: "DailySchedule",
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

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Poppins"
        rel="stylesheet"
      ></link>
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
                    defaultText={"Insert Daily Schedule Name"}
                    errorMsg={"Please enter a name for this daily schedule"}
                    addMsg={"+ Add Task"}
                    reactToPrintFn={handlePrint}
                  />
                  <Grid container spacing={2} style={{ padding: "2%" }}>
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
                          title={"Task"}
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
                          showTime={false}
                          label={"Task Title"}
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

export default DailySchedules;