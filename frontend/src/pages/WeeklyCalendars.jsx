import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography, MenuItem, Select, FormControl, InputLabel, Box, TextField, Card, CardContent, Button, Switch, FormControlLabel } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Navbar from '../components/Navbar';
import WeeklyCalendarComponent from '../components/WeeklyCalendarComponent'; // Import the new component
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import dayjs from 'dayjs';
import SelectDateCategoryComponent from '../components/SelectDateCategoryComponent.jsx';
import LoadTaskSteps from '../components/LoadTaskSteps.jsx';
import TaskHeader from '../components/Taskheader.jsx';
import { useReactToPrint } from "react-to-print";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function WeeklyCalendars({ token, setTokenFunc }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { profileID } = useParams();
  const state = location.state || { data: {} }; // Ensure state is defined
  const data = state.data || {}; // Ensure data is defined
  const { type: initialType } = state.state || {}; // Extract type from state
  const [layout, setLayout] = useState('vertical'); // Default to vertical layout
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [text, setText] = useState(initialType || ""); // Name of the Visual Support
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(dayjs()); // Date of the Visual Support
  const [steps, setSteps] = useState([]); // Array to track steps with unique IDs
  const [stepImages, setStepImages] = useState([]); // Array to store images for each step
  const [isHorizontal, setIsHorizontal] = useState(false); // New state to toggle component type
  const [stepNames, setStepNames] = useState([]); // Array to keep track of the step names
  const [stepTimes, setStepTimes] = useState([]); // Array to keep track of the step times
  const [category, setCategory] = useState(""); // Variable storing category type
  const [nameError, setNameError] = useState(false); // State for task name error
  const type = initialType || "WeeklyCalendar"; // Define the type for the visual support

  useEffect(() => {
    if (date) {
      setEndDate(date.add(7, 'day'));
    }
  }, [date]);

  const handleLayoutChange = (event) => {
    setLayout(event.target.value);
  };

  const handleToggleLayout = () => {
    setLayout((prevLayout) => (prevLayout === 'vertical' ? 'horizontal' : 'vertical'));
  };

  const formatDateRange = (start, end) => {
    if (start && end) {
      return `Week starting from ${start.format('DD/MM/YYYY')} - ${end.format('DD/MM/YYYY')}`;
    }
    return '';
  };

  const formatDayWithDate = (dayIndex) => {
    if (date) {
      return date.add(dayIndex, 'day').format('ddd DD/MM');
    }
    return '';
  };

  const getOrderedDaysOfWeek = () => {
    if (!date) return daysOfWeek;
    const startDayIndex = date.day() - 1; // day() returns 0 for Sunday, 1 for Monday, etc.
    return [...daysOfWeek.slice(startDayIndex), ...daysOfWeek.slice(0, startDayIndex)];
  };

  // Toggle between horizontal and vertical step display
  const toggleComponentType = () => {
    setIsHorizontal((prev) => !prev);
  };

  // Add a new step to the task analysis
  const addStep = () => {
    const newStep = { id: Date.now() };
    setSteps([...steps, newStep]);
    setStepImages([...stepImages, null]); // Initialize a placeholder for the new step's image
    setStepNames([...stepNames, ""]); // Initialize a placeholder for the new step's name
    setStepTimes([...stepTimes, ""]); // Initialize a placeholder for the new step's time
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
          type,
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <link
        href="https://fonts.googleapis.com/css?family=Poppins"
        rel="stylesheet"
      ></link>
      <style>
        {`
          body {
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>
      <Navbar profileID={profileID} />
      <br />
      {endDate && (
        <Typography variant="h6" align="center" gutterBottom>
          Week ending on {endDate.format('DD/MM/YYYY')}
        </Typography>
      )}
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
            {/* <TextField
              label="Visual Support Task Name"
              value={text}
              onChange={(e) => setText(e.target.value)}
              fullWidth
              error={nameError}
              helperText={nameError ? "Please enter a name for this visual support" : ""}
            /> */}
            <FormControlLabel
              control={<Switch checked={layout === 'horizontal'} onChange={handleToggleLayout} />}
              label="Toggle Layout"
            />
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
                    toggleComponentType={state.state?.toggleComponentType}
                    addStep={addStep}
                    defaultText={"Insert Weekly Calendar Name"}
                    errorMsg={"Please enter a name for this weekly calendar"}
                    addMsg={state.state?.addMsg}
                    reactToPrintFn={reactToPrintFn}
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
                        {getOrderedDaysOfWeek().map((day, index) => (
                          <Grid item key={day} xs={12} sm={layout === 'vertical' ? 12 : 6} md={layout === 'vertical' ? 12 : 4} lg={layout === 'vertical' ? 12 : 3}>
                            <Typography variant="h6" align="center">
                              {formatDayWithDate(index)}
                            </Typography>
                            <WeeklyCalendarComponent layout={layout} />
                          </Grid>
                        ))}
                      </div>
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </LocalizationProvider>
  );
}

export default WeeklyCalendars;