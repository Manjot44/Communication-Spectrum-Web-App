import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { Grid, Typography, Button, Card, CardContent } from "@mui/material";
import "../App.css";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import TaskAnalysesStep from "../components/TaskAnalysesStep";
import VisualSupportImage from "../components/VisualSupportImage";
import CategorySelectCheckboxes from "../components/CategorySelectCheckboxes";
import dayjs from "dayjs";
import TaskAnalysesStepHorizontal from "../components/TaskAnalysesStepHorizontal";
import DropdownComponent from "../components/DropdownComponent";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function DailySchedules({ token, setTokenFunc }) {
  const { profileID } = useParams();
  const [selectedDay, setSelectedDay] = useState("Monday"); // Default to Monday
  const [text, setText] = useState(""); // Name of the Visual Support
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = React.useState(dayjs()); // Date of the Visual Support
  const [isHorizontal, setIsHorizontal] = useState(false); // New state to toggle component type
  const [category, setCategory] = useState(""); // Variable storing category type

  // State to track visual supports for each day
  const [visualSupports, setVisualSupports] = useState({
    Monday: {
      steps: [],
      stepImages: [],
      stepNames: [],
      stepTimes: [],
      image: null,
    },
    Tuesday: {
      steps: [],
      stepImages: [],
      stepNames: [],
      stepTimes: [],
      image: null,
    },
    Wednesday: {
      steps: [],
      stepImages: [],
      stepNames: [],
      stepTimes: [],
      image: null,
    },
    Thursday: {
      steps: [],
      stepImages: [],
      stepNames: [],
      stepTimes: [],
      image: null,
    },
    Friday: {
      steps: [],
      stepImages: [],
      stepNames: [],
      stepTimes: [],
      image: null,
    },
    Saturday: {
      steps: [],
      stepImages: [],
      stepNames: [],
      stepTimes: [],
      image: null,
    },
    Sunday: {
      steps: [],
      stepImages: [],
      stepNames: [],
      stepTimes: [],
      image: null,
    },
  });

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const toggleComponentType = () => {
    setIsHorizontal((prev) => !prev); // Toggle between true and false
  };

  const addStep = () => {
    const newStep = { id: Date.now() };
    setVisualSupports((prevSupports) => ({
      ...prevSupports,
      [selectedDay]: {
        ...prevSupports[selectedDay],
        steps: [...prevSupports[selectedDay].steps, newStep],
        stepImages: [...prevSupports[selectedDay].stepImages, null],
        stepNames: [...prevSupports[selectedDay].stepNames, ""],
        stepTimes: [...prevSupports[selectedDay].stepTimes, ""],
      },
    }));
  };

  const removeStep = (index, id) => {
    setVisualSupports((prevSupports) => ({
      ...prevSupports,
      [selectedDay]: {
        ...prevSupports[selectedDay],
        steps: prevSupports[selectedDay].steps.filter((step) => step.id !== id),
        stepImages: prevSupports[selectedDay].stepImages.filter(
          (_, imgIndex) => imgIndex !== index
        ),
        stepNames: prevSupports[selectedDay].stepNames.filter(
          (_, imgIndex) => imgIndex !== index
        ),
        stepTimes: prevSupports[selectedDay].stepTimes.filter(
          (_, imgIndex) => imgIndex !== index
        ),
      },
    }));
  };

  const updateStepImage = (index, newImage) => {
    setVisualSupports((prevSupports) => {
      const updatedImages = [...prevSupports[selectedDay].stepImages];
      updatedImages[index] = newImage;
      return {
        ...prevSupports,
        [selectedDay]: {
          ...prevSupports[selectedDay],
          stepImages: updatedImages,
        },
      };
    });
  };

  const updateStepName = (index, newName) => {
    setVisualSupports((prevSupports) => {
      const updatedNames = [...prevSupports[selectedDay].stepNames];
      updatedNames[index] = newName;
      return {
        ...prevSupports,
        [selectedDay]: {
          ...prevSupports[selectedDay],
          stepNames: updatedNames,
        },
      };
    });
  };

  const updateStepTime = (index, newTime) => {
    setVisualSupports((prevSupports) => {
      const updatedTimes = [...prevSupports[selectedDay].stepTimes];
      updatedTimes[index] = newTime;
      return {
        ...prevSupports,
        [selectedDay]: {
          ...prevSupports[selectedDay],
          stepTimes: updatedTimes,
        },
      };
    });
  };

  const deleteStepImageChange = (index) => {
    setVisualSupports((prevSupports) => {
      const updatedImages = [...prevSupports[selectedDay].stepImages];
      updatedImages[index] = "";
      return {
        ...prevSupports,
        [selectedDay]: {
          ...prevSupports[selectedDay],
          stepImages: updatedImages,
        },
      };
    });
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const setImage = (newImage) => {
    setVisualSupports((prevSupports) => ({
      ...prevSupports,
      [selectedDay]: {
        ...prevSupports[selectedDay],
        image: newImage,
      },
    }));
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
            <Card
              className="task-analyses-create-options"
              style={{ height: "87vh" }}
            >
              <CardContent>
                <Typography
                  variant="h7"
                  component="div"
                  style={{ fontFamily: "Poppins" }}
                >
                  <b>Select Task Date</b>
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div
                    className="d-flex align-items-center"
                    style={{
                      height: "55vh",
                      width: "auto",
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    <DateCalendar
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                      style={{ color: "black", height: "37vh", width: "auto" }}
                    />
                  </div>
                </LocalizationProvider>
                <br />
                <Typography
                  variant="h7"
                  component="div"
                  style={{ fontFamily: "Poppins" }}
                >
                  <b>Select Task Category</b>
                </Typography>
                {/* <CategorySelectCheckboxes /> */}

                <div
                  className="d-flex align-items-center"
                  style={{
                    height: "75px",
                    backgroundColor: "white",
                    padding: "5px",
                    backgroundColor: "#f0f0f0",
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
                >
                  Create Visual Support
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            <Card
              className="task-analyses-create-options"
              style={{ backgroundColor: "#f0f0f0", height: "87vh" }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  style={{ fontFamily: "Poppins" }}
                >
                  <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    style={{ marginBottom: "20px" }}
                  >
                    {daysOfWeek.map((day) => (
                      <Grid item key={day}>
                        <Button
                          variant={
                            selectedDay === day ? "contained" : "outlined"
                          }
                          color={selectedDay === day ? "primary" : "default"}
                          onClick={() => handleDayClick(day)}
                        >
                          {day}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
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
                        onBlur={toggleEditing} // Stop editing when input loses focus
                        autoFocus
                      />
                    ) : (
                      <b onClick={toggleEditing} style={{ cursor: "pointer" }}>
                        {text || (
                          <span
                            style={{ color: "grey", fontFamily: "Poppins" }}
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
                  <Grid container spacing={2} style={{ padding: "2%" }}>
                    <Grid item xs={12} md={6}>
                      <VisualSupportImage
                        image={visualSupports[selectedDay].image}
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
                      {visualSupports[selectedDay].steps.map((step, index) =>
                        isHorizontal ? (
                          <TaskAnalysesStepHorizontal
                            key={step.id}
                            index={index}
                            image={
                              visualSupports[selectedDay].stepImages[index]
                            }
                            removeStep={() => removeStep(index, step.id)}
                            setImage={(newImage) =>
                              updateStepImage(index, newImage)
                            }
                            deleteImage={() => deleteStepImageChange(index)}
                            setName={(newName) =>
                              updateStepName(index, newName)
                            }
                            stepName={
                              visualSupports[selectedDay].stepNames[index]
                            }
                            setTime={(newTime) =>
                              updateStepTime(index, newTime)
                            }
                            stepTime={
                              visualSupports[selectedDay].stepTimes[index]
                            }
                          />
                        ) : (
                          <TaskAnalysesStep
                            key={step.id}
                            index={index}
                            image={
                              visualSupports[selectedDay].stepImages[index]
                            }
                            removeStep={() => removeStep(index, step.id)}
                            setImage={(newImage) =>
                              updateStepImage(index, newImage)
                            }
                            deleteImage={() => deleteStepImageChange(index)}
                            setName={(newName) =>
                              updateStepName(index, newName)
                            }
                            stepName={
                              visualSupports[selectedDay].stepNames[index]
                            }
                            setTime={(newTime) =>
                              updateStepTime(index, newTime)
                            }
                            stepTime={
                              visualSupports[selectedDay].stepTimes[index]
                            }
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

export default DailySchedules;
