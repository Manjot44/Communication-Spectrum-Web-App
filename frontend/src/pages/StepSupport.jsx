import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Grid, Card, Typography, CardContent } from "@mui/material";
import "../App.css";
import axios from "axios";
import dayjs from "dayjs";
import SelectDateCategoryComponent from "../components/SelectDateCategoryComponent.jsx";
import LoadTaskSteps from "../components/LoadTaskSteps.jsx";
import TaskHeader from "../components/Taskheader.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx"; // Import LoadingSpinner
import { useReactToPrint } from "react-to-print";
import ChangeColourModal from "../components/ChangeColourModal.jsx";

function StepSupport({ token }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { profileID } = useParams();
  const [loading, setLoading] = useState(true); // Add loading state

  // Default values for state data properties to handle null cases
  const defaultData = {
    text: "",
    image: null,
    steps: [],
    stepImages: [],
    stepNames: [],
    stepTimes: [],
    category: "",
    type: "",
    defaultText: "",
    errorMsg: "",
    addMsg: "",
    stepTitle: "",
    showTime: false,
    label: "",
    showCategory: true,
  };

  // Destructure data from state or use defaultData
  const data = state?.data || defaultData;
  const [text, setText] = useState(data.text);
  const [image, setImage] = useState(data.image);
  const [steps, setSteps] = useState(data.steps);
  const [stepImages, setStepImages] = useState(data.stepImages);
  const [stepNames, setStepNames] = useState(data.stepNames);
  const [stepTimes, setStepTimes] = useState(data.stepTimes);
  const [category, setCategory] = useState(data.category);
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [stepColour, setStepColour] = useState('#000CA4');
  const [fontColour, setFontColour] = useState('white');
  const [colourModal, setColourModal] = useState(false);

  // Set loading to false once component is mounted
  useEffect(() => {
    setLoading(false);
  }, []);

  // Toggle between horizontal and vertical step display
  const toggleComponentType = () => {
    setIsHorizontal((prev) => !prev);
  };

  // Toggle colour change Modal
  const toggleColourModal = () => {
    setColourModal((prev) => !prev);
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

  // Move step to the left (swap with the previous step)
  const onMoveLeft = (index) => {
    // Do nothing if it's the first step
    if (index === 0) return;

    // Swap the current step with the previous one
    const newSteps = [...steps];
    const newStepImages = [...stepImages];
    const newStepNames = [...stepNames];
    const newStepTimes = [...stepTimes];

    // Swap step data with the previous step
    [newSteps[index - 1], newSteps[index]] = [newSteps[index], newSteps[index - 1]];
    [newStepImages[index - 1], newStepImages[index]] = [newStepImages[index], newStepImages[index - 1]];
    [newStepNames[index - 1], newStepNames[index]] = [newStepNames[index], newStepNames[index - 1]];
    [newStepTimes[index - 1], newStepTimes[index]] = [newStepTimes[index], newStepTimes[index - 1]];

    // Update state with the reordered arrays
    setSteps(newSteps);
    setStepImages(newStepImages);
    setStepNames(newStepNames);
    setStepTimes(newStepTimes);
  };

  // Move step to the right (swap with the next step)
  const onMoveRight = (index) => {
    // Do nothing if it's the last step
    if (index === steps.length - 1) return;

    // Swap the current step with the next one
    const newSteps = [...steps];
    const newStepImages = [...stepImages];
    const newStepNames = [...stepNames];
    const newStepTimes = [...stepTimes];

    // Swap step data with the next step
    [newSteps[index + 1], newSteps[index]] = [newSteps[index], newSteps[index + 1]];
    [newStepImages[index + 1], newStepImages[index]] = [newStepImages[index], newStepImages[index + 1]];
    [newStepNames[index + 1], newStepNames[index]] = [newStepNames[index], newStepNames[index + 1]];
    [newStepTimes[index + 1], newStepTimes[index]] = [newStepTimes[index], newStepTimes[index + 1]];

    // Update state with the reordered arrays
    setSteps(newSteps);
    setStepImages(newStepImages);
    setStepNames(newStepNames);
    setStepTimes(newStepTimes);
  };

  // Create a new visual support
  const handleCreate = async () => {
    if (text.trim() === "") {
      setNameError(true); // Set error state if no name is entered
      return;
    }
    try {
      const timestamp = dayjs().format("YYYY-MM-DD HH:mm:ss");
      await axios.post(
        `http://localhost:5005/new_support/${profileID}`,
        {
          type: data.type,
          text,
          image,
          date,
          stepImages,
          stepNames,
          stepTimes,
          category,
          isHorizontal,
          timestamp,
          stepColour,
          fontColour,
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

  // Show loading spinner while data is loading
  if (loading) {
    return <LoadingSpinner message="Loading data..." />;
  }

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
              showCategory={state.state?.showCategory}
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
                    defaultText={state.state?.defaultText}
                    errorMsg={state.state?.errorMsg}
                    addMsg={state.state?.addMsg}
                    reactToPrintFn={reactToPrintFn}
                    setColourModal={toggleColourModal}
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
                          title={state.state?.stepTitle}
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
                          showTime={state.state?.showTime}
                          label={state.state?.label}
                          fontColour={fontColour}
                          stepColour={stepColour}
                          totalSteps={steps.length}
                          onMoveLeft={onMoveLeft}
                          onMoveRight={onMoveRight}
                        />
                        <ChangeColourModal
                          open={colourModal}
                          onClose={toggleColourModal}
                          setStepColour={setStepColour}
                          setFontColour={setFontColour}
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