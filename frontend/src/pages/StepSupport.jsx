import React, { useEffect, useState, useRef, createContext } from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Grid, Card, CardContent } from "@mui/material";
import "../App.css";
import axios from "axios";
import dayjs from "dayjs";
import SelectDateCategoryComponent from "../components/SelectDateCategoryComponent.jsx";
import LoadTaskSteps from "../components/LoadTaskSteps.jsx";
import TaskHeader from "../components/Taskheader.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useReactToPrint } from "react-to-print";
import ChangeColourModal from "../components/ChangeColourModal.jsx";
import { StepSupportWrapper, PrintBox, OuterPrintBox } from "../Wrappers.jsx";

export const context = createContext(null);

function StepSupport({ token }) {
  // General React Functions
  const navigate = useNavigate();
  const { state } = useLocation();
  const { profileID } = useParams();
  const [loading, setLoading] = useState(true);

  // Destructure data from state
  const data = state?.data;
  const [text, setText] = useState(data?.title || "");
  const [image, setImage] = useState(data?.title_img || null);
  const [stepImages, setStepImages] = useState(data?.step_img || []);
  const [stepNames, setStepNames] = useState(data?.step_names || []);
  const [stepTimes, setStepTimes] = useState(data?.step_times || []);
  const [category, setCategory] = useState(data?.category || "");
  const [stepColour, setStepColour] = useState(data?.step_colour || '#000CA4');
  const [fontColour, setFontColour] = useState(data?.font_colour || 'white');
  const [isHorizontal, setIsHorizontal] = useState(data?.layout || false);
  const [date, setDate] = useState(dayjs(data?.date) || dayjs());
  const [isMade, setIsMade] = useState(data?.isMade || false);

  const [isEditing, setIsEditing] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [isPublic, setIsPublic] = useState(data.isPublic);
  const [colourModal, setColourModal] = useState(false);
  
  // Print to PDF Functions
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  // Set loading to false once component is mounted
  useEffect(() => {
    setLoading(false);
  }, []);

  // Function called when the "Toggle Visual Style" Button is clicked
  // Toggle between horizontal and vertical step display
  const toggleComponentType = () => {
    setIsHorizontal((prev) => !prev);
  };

  // Function called when "Customise Colour" Button is clicked
  // Toggle colour change Modal
  const toggleColourModal = () => {
    setColourModal((prev) => !prev);
  };

  // Function called when "+ Add Step" button is clicked
  // Add a new step to the task analysis
  const addStep = () => {
    setStepImages([...stepImages, null]); // Initialize a placeholder for the new step's image
    setStepNames([...stepNames, null]); // Initialize a placeholder for the new step's name
    setStepTimes([...stepTimes, null]); // Initialize a placeholder for the new step's time
  };

  // Function called when the delete (cross logo) icon is clicked on TaskStep component
  // Remove a step by index
  const removeStep = (index, id) => {
    setStepImages(stepImages.filter((_, imgIndex) => imgIndex !== index));
    setStepNames(stepNames.filter((_, imgIndex) => imgIndex !== index));
    setStepTimes(stepTimes.filter((_, imgIndex) => imgIndex !== index));
  };

  // Function called when the image box inside of TaskStep component is clicked
  // Update image for a specific step
  const updateStepImage = (index, newImage) => {
    const updatedImages = [...stepImages];
    updatedImages[index] = newImage;
    setStepImages(updatedImages);
  };

  // Function called when the Step Name box is clicked
  // Update name for a specific step
  const updateStepName = (index, newName) => {
    const updatedNames = [...stepNames];
    updatedNames[index] = newName;
    setStepNames(updatedNames);
  };

  // Function called when the Timer box is clicked
  // Update time for a specific step
  const updateStepTime = (index, newTime) => {
    const updatedTimes = [...stepTimes];
    updatedTimes[index] = newTime;
    setStepTimes(updatedTimes);
  };

  // Function called when the trash can icon on taskStep component is clicked
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
    const newStepImages = [...stepImages];
    const newStepNames = [...stepNames];
    const newStepTimes = [...stepTimes];

    // Swap step data with the previous step
    [newStepImages[index - 1], newStepImages[index]] = [newStepImages[index], newStepImages[index - 1]];
    [newStepNames[index - 1], newStepNames[index]] = [newStepNames[index], newStepNames[index - 1]];
    [newStepTimes[index - 1], newStepTimes[index]] = [newStepTimes[index], newStepTimes[index - 1]];

    // Update state with the reordered arrays
    setStepImages(newStepImages);
    setStepNames(newStepNames);
    setStepTimes(newStepTimes);
  };

  // Move step to the right (swap with the next step)
  const onMoveRight = (index) => {
    // Do nothing if it's the last step
    if (index === stepImages.length - 1) return;

    // Swap the current step with the next one
    const newStepImages = [...stepImages];
    const newStepNames = [...stepNames];
    const newStepTimes = [...stepTimes];

    // Swap step data with the next step
    [newStepImages[index + 1], newStepImages[index]] = [newStepImages[index], newStepImages[index + 1]];
    [newStepNames[index + 1], newStepNames[index]] = [newStepNames[index], newStepNames[index + 1]];
    [newStepTimes[index + 1], newStepTimes[index]] = [newStepTimes[index], newStepTimes[index + 1]];

    // Update state with the reordered arrays
    setStepImages(newStepImages);
    setStepNames(newStepNames);
    setStepTimes(newStepTimes);
  };

  // API Request to Create a new visual support
  const handleCreate = async () => {
    if (text.trim() === "") {
      setNameError(true);
      return;
    }
    try {
      const timestamp = dayjs().format("YYYY-MM-DD HH:mm:ss");
      const formattedDate = date.format("YYYY-MM-DD");
      await axios.post(
        `http://localhost:5005/new_support/${profileID}`,
        {
          type: state.state.type,
          text,
          image,
          date: formattedDate,
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

  // Show loading spinner while data is loading
  if (loading) {
    return <LoadingSpinner message="Loading data..." />;
  }

  return (
    <>
      <Navbar profileID={profileID} />
      <br />
      <StepSupportWrapper>
        <Grid container spacing={3}>
          {/* Left Menu Allowing Users to Select Date, Thumbnail and Category */}
          <Grid item xs={12} md={3}>
            <SelectDateCategoryComponent
              token={token}
              date={date}
              changeDate={(newDate) => setDate(newDate)}
              category={category}
              changeCategory={(e) => setCategory(e.target.value)}
              handleCreate={handleCreate}
              image={image}
              setImage={(image) => setImage(image)}
              showCategory={state.state?.showCategory}
              setIsPublic={(e) => setIsPublic(e.target.value)}
            />
          </Grid>
          {/* Right hand Box, where the details of a Visual Support Are Displayed */}
          <Grid item xs={12} md={9}>
              <Card>
                <CardContent>
                    {/* Header in Right hand box with buttons such as Print to pdf, customise colour etc. */}
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
                      <Grid item xs={12} md={12}>
                        <OuterPrintBox>
                          <PrintBox ref={contentRef}>
                            {/* Box that loads up the Visual Support Steps/Choices */}
                            <LoadTaskSteps
                              token={token}
                              title={state.state?.stepTitle}
                              isHorizontal={isHorizontal}
                              removeStep={removeStep}
                              deleteStepImageChange={deleteStepImageChange}
                              updateStepImage={updateStepImage}
                              updateStepName={updateStepName}
                              updateStepTime={updateStepTime}
                              stepImages={stepImages}
                              stepNames={stepNames}
                              stepTimes={stepTimes}
                              onMoveLeft={onMoveLeft}
                              onMoveRight={onMoveRight}
                              fontColour={fontColour}
                              stepColour={stepColour}
                              showCancel={true}
                              showTime={state.state?.showTime}
                              label={state.state?.label}
                              totalSteps={stepImages.length}
                            />
                            {/* Modal that allows user to adjust colour of TaskStep component */}
                            <ChangeColourModal
                              open={colourModal}
                              onClose={toggleColourModal}
                              setStepColour={setStepColour}
                              setFontColour={setFontColour}
                            />
                          </PrintBox>
                        </OuterPrintBox>
                      </Grid>
                    </Grid>
                </CardContent>
              </Card>
          </Grid>
        </Grid>
      </StepSupportWrapper>
    </>
  );
}

export default StepSupport;
