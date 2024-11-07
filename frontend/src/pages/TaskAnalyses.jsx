import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Card, Typography, CardContent, Button } from "@mui/material";
import "../App.css";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import TaskAnalysesStep from "../components/TaskAnalysesStep";
import VisualSupportImage from "../components/VisualSupportImage";
import ImageCropperModal from "../components/ImageCropperModal";
import DropdownComponent from "../components/DropdownComponent";
import axios from "axios";
import dayjs from "dayjs";
import TaskAnalysesStepHorizontal from "../components/TaskAnalysesStepHorizontal";

function TaskAnalyses({ token }) {
  const navigate = useNavigate();
  const { profileID } = useParams();
  const [text, setText] = useState(""); // Name of the Visual Support
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [value, setValue] = useState(dayjs()); // Date of the Visual Support
  const [steps, setSteps] = useState([]); // Array to track steps with unique IDs
  const [stepImages, setStepImages] = useState([]); // Array to store images for each step
  const [isHorizontal, setIsHorizontal] = useState(false); // New state to toggle component type
  const [stepNames, setStepNames] = useState([]); // Array to keep track of the step names
  const [stepTimes, setStepTimes] = useState([]); // Array to keep track of the step times
  const [category, setCategory] = useState(""); // Variable storing category type
  const [isCropperOpen, setIsCropperOpen] = useState(false); // Cropper modal open state
  const [nameError, setNameError] = useState(false); // State for task name error

  // Toggle between horizontal and vertical step display
  const toggleComponentType = () => {
    setIsHorizontal((prev) => !prev);
  };

  // Add a new step to the task analysis
  const addStep = () => {
    const newStep = { id: Date.now() };
    setSteps([...steps, newStep]);
    setStepImages([...stepImages, null]); // Initialize a placeholder for the new step's image
    setStepNames([...stepNames, null]); // Initialize a placeholder for the new step's name
    setStepTimes([...stepTimes, null]); // Initialize a placeholder for the new step's time
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

  // Handle text change for the task analysis name
  const handleTextChange = (event) => {
    setText(event.target.value);
    setNameError(false); // Reset error state when user types
  };

  // Toggle editing state for task name
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  // Open cropper modal
  const handleOpenCropper = () => setIsCropperOpen(true);

  // Close cropper modal
  const handleCloseCropper = () => setIsCropperOpen(false);

  // Handle crop completion with base64 image
  const handleCropComplete = (croppedBase64) => {
    setImage(croppedBase64); // Save the cropped image as a base64 string
    setIsCropperOpen(false);
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
          value,
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
                  <b>Select Task Date</b>
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div
                    className="d-flex align-items-center"
                    style={{ height: "55vh", width: "auto" }}
                  >
                    <DateCalendar
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                    />
                  </div>
                </LocalizationProvider>
                <br />
                <Typography
                  variant="h5"
                  component="div"
                  style={{ fontFamily: "Poppins" }}
                >
                  <b>Select Task Category</b>
                </Typography>

                <div
                  className="d-flex align-items-center"
                  style={{
                    height: "75px",
                    backgroundColor: "white",
                    padding: "5px",
                  }}
                >
                  <DropdownComponent
                    id="country-form"
                    label="Select Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    options={[
                      { value: "Self-Care", label: "Self-Care" },
                      { value: "Routines", label: "Routines" },
                      { value: "School", label: "School" },
                      { value: "Work", label: "Work" },
                      { value: "Fun Activities", label: "Fun Activities" },
                      {
                        value: "Emotional Regulation",
                        label: "Emotional Regulation",
                      },
                      {
                        value: "Beliefs and Practices",
                        label: "Beliefs and Practices",
                      },
                      {
                        value: "Health and Wellbeing",
                        label: "Health and Wellbeing",
                      },
                      { value: "Transport", label: "Transport" },
                      { value: "Events", label: "Events" },
                      { value: "Places", label: "Places" },
                      { value: "Other", label: "Other" },
                    ]}
                    width="100%"
                  />
                </div>

                <br />
                <Button
                  variant="contained"
                  style={{
                    width: "100%",
                    backgroundColor: "#26c3ba",
                    fontFamily: "Poppins",
                  }}
                  onClick={handleCreate}
                >
                  Create Visual Support
                </Button>
              </CardContent>
            </Card>
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
                    {isEditing ? (
                      <input
                        type="text"
                        value={text}
                        onChange={handleTextChange}
                        onBlur={toggleEditing}
                        autoFocus
                        style={{ borderColor: nameError ? "red" : "inherit" }}
                      />
                    ) : (
                      <b onClick={toggleEditing} style={{ cursor: "pointer" }}>
                        {text || (
                          <span
                            style={{
                              color: nameError ? "red" : "grey",
                              fontFamily: "Poppins",
                            }}
                          >
                            Insert Task Name Here
                          </span>
                        )}
                      </b>
                    )}
                    <Button onClick={toggleComponentType}>
                      Toggle Visual Style
                    </Button>
                    <Button onClick={addStep}>+ Add Step</Button>
                  </Typography>
                  {nameError && (
                    <Typography
                      variant="body2"
                      style={{ color: "red", marginLeft: "10px" }}
                    >
                      Please enter a task name
                    </Typography>
                  )}
                  <Grid container spacing={2} style={{ padding: "2%" }}>
                    <Grid item xs={12} md={6}>
                      <VisualSupportImage
                        image={image}
                        setImage={setImage}
                        uniqueID={-1}
                        imgHeight={"55vh"}
                        deleteImage={() => setImage(null)}
                      />
                      <Button
                        onClick={handleOpenCropper}
                        variant="outlined"
                        sx={{ mt: 2 }}
                      >
                        Crop Image
                      </Button>
                      <ImageCropperModal
                        open={isCropperOpen}
                        onClose={handleCloseCropper}
                        image={image}
                        onCropComplete={handleCropComplete}
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
                      {steps.map((step, index) =>
                        isHorizontal ? (
                          <TaskAnalysesStepHorizontal
                            key={step.id}
                            index={index}
                            image={stepImages[index]}
                            removeStep={() => removeStep(index, step.id)}
                            setImage={(newImage) =>
                              updateStepImage(index, newImage)
                            }
                            deleteImage={() => deleteStepImageChange(index)}
                            setName={(newName) =>
                              updateStepName(index, newName)
                            }
                            stepName={stepNames[index]}
                            setTime={(newTime) =>
                              updateStepTime(index, newTime)
                            }
                            stepTime={stepTimes[index]}
                          />
                        ) : (
                          <TaskAnalysesStep
                            key={step.id}
                            index={index}
                            image={stepImages[index]}
                            removeStep={() => removeStep(index, step.id)}
                            setImage={(newImage) =>
                              updateStepImage(index, newImage)
                            }
                            deleteImage={() => deleteStepImageChange(index)}
                            setName={(newName) =>
                              updateStepName(index, newName)
                            }
                            stepName={stepNames[index]}
                            setTime={(newTime) =>
                              updateStepTime(index, newTime)
                            }
                            stepTime={stepTimes[index]}
                          />
                        )
                      )}
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
